import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from './supabase'

interface Features {
  isCollector: boolean
  isBetaTester: boolean
  plan: string
  subscriptionStatus: string
  planExpiresAt: string | null
  loading: boolean
}

export function useFeatures(): Features {
  const { user, isLoaded } = useUser()
  const [plan, setPlan] = useState('free')
  const [isBetaTester, setIsBetaTester] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState('free')
  const [planExpiresAt, setPlanExpiresAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return
    if (!user) { setLoading(false); return }

    supabase
      .from('profiles')
      .select('plan, is_beta_tester, subscription_status, plan_expires_at')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setPlan(data.plan || 'free')
          setIsBetaTester(data.is_beta_tester || false)
          setSubscriptionStatus(data.subscription_status || 'free')
          setPlanExpiresAt(data.plan_expires_at || null)
        }
        setLoading(false)
      })
  }, [user?.id, isLoaded])

  return {
    isCollector: plan === 'collector' || isBetaTester,
    isBetaTester,
    plan,
    subscriptionStatus,
    planExpiresAt,
    loading,
  }
}