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

        // Get subscription details
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
        const userId = subscription.metadata?.supabase_user_id

        if (!userId) break

        const periodEnd = (subscription as any).current_period_end
  ? new Date((subscription as any).current_period_end * 1000).toISOString()
  : null
        const status = subscription.status
        const cancelAtPeriodEnd = subscription.cancel_at_period_end

        await supabase
          .from('profiles')
          .update({
            plan: status === 'active' ? 'collector' : 'free',
            subscription_status: cancelAtPeriodEnd ? 'canceling' : status,
            plan_expires_at: periodEnd,
          })
          .eq('id', userId)

        console.log(`🔄 Subscription updated for user ${userId}: ${status}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.supabase_user_id

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