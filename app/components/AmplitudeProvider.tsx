'use client'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { initAmplitude, identify } from '../lib/analytics'

export default function AmplitudeProvider() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    initAmplitude()
  }, [])

  useEffect(() => {
    if (!isLoaded || !user) return
    identify(user.id, {
      email: user.primaryEmailAddress?.emailAddress,
      username: user.username,
      createdAt: user.createdAt,
    })
  }, [user, isLoaded])

  return null
}