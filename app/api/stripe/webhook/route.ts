import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.supabase_user_id
        const subscriptionId = session.subscription as string

        if (!userId) break

        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const periodEnd = (subscription as any).current_period_end
          ? new Date((subscription as any).current_period_end * 1000).toISOString()
          : null

        await supabase
          .from('profiles')
          .update({
            plan: 'collector',
            stripe_subscription_id: subscriptionId,
            subscription_status: 'active',
            plan_expires_at: periodEnd,
          })
          .eq('id', userId)

        console.log(`✅ Collector plan activated for user ${userId}`)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        let userId = subscription.metadata?.supabase_user_id

        console.log('🔍 subscription.metadata:', subscription.metadata)
        console.log('🔍 subscription.customer:', subscription.customer)

        // Fallback — look up user by stripe_customer_id
        if (!userId) {
          const customerId = subscription.customer as string
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .single()
          console.log('🔍 profile lookup:', profile, 'error:', error)
          if (profile) userId = profile.id
        }

        console.log('🔍 userId:', userId)

        if (!userId) break

        const cancelAt = (subscription as any).cancel_at
const currentPeriodEnd = (subscription as any).current_period_end 
  || subscription.items?.data?.[0]?.current_period_end

const periodEnd = cancelAt
  ? new Date(cancelAt * 1000).toISOString()
  : currentPeriodEnd
    ? new Date(currentPeriodEnd * 1000).toISOString()
    : null
        const status = subscription.status
        const cancelAtPeriodEnd = subscription.cancel_at_period_end || !!(subscription as any).cancel_at

        console.log('🔍 cancelAtPeriodEnd:', cancelAtPeriodEnd, 'cancel_at:', (subscription as any).cancel_at)
        console.log('🔍 status:', status)
        console.log('🔍 About to update Supabase...')

        await supabase
          .from('profiles')
          .update({
            plan: status === 'active' ? 'collector' : 'free',
            subscription_status: cancelAtPeriodEnd ? 'canceling' : status,
            plan_expires_at: periodEnd,
          })
          .eq('id', userId)

        console.log('🔍 Supabase update complete')
        console.log(`🔄 Subscription updated for user ${userId}: ${status}, canceling: ${cancelAtPeriodEnd}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        let userId = subscription.metadata?.supabase_user_id

        // Fallback — look up user by stripe_customer_id
        if (!userId) {
          const customerId = subscription.customer as string
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .single()
          if (profile) userId = profile.id
        }

        if (!userId) break

        await supabase
          .from('profiles')
          .update({
            plan: 'free',
            stripe_subscription_id: null,
            subscription_status: 'free',
            plan_expires_at: null,
          })
          .eq('id', userId)

        console.log(`❌ Subscription canceled for user ${userId}`)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!profile) break

        await supabase
          .from('profiles')
          .update({ subscription_status: 'past_due' })
          .eq('id', profile.id)

        console.log(`⚠️ Payment failed for customer ${customerId}`)
        break
      }
    }

    return NextResponse.json({ received: true })

  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}