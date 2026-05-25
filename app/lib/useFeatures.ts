import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from './supabase'

interface Features {
  isCollector: boolean
  isBetaTester: boolean
  plan: string
  loading: boolean
}

export function useFeatures(): Features {
  const { user, isLoaded } = useUser()
  const [plan, setPlan] = useState('free')
  const [isBetaTester, setIsBetaTester] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return
    if (!user) { setLoading(false); return }

    supabase
      .from('profiles')
      .select('plan, is_beta_tester')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setPlan(data.plan || 'free')
          setIsBetaTester(data.is_beta_tester || false)
        }
        setLoading(false)
      })
  }, [user?.id, isLoaded])

  return {
    isCollector: plan === 'collector' || isBetaTester,
    isBetaTester,
    plan,
    loading,
  }
}