import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const clientId     = process.env.EBAY_CLIENT_ID!
    const clientSecret = process.env.EBAY_CLIENT_SECRET!
    const credentials  = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const tokenResponse = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
    })

    const tokenData = await tokenResponse.json()
    if (!tokenResponse.ok) {
      return NextResponse.json({ error: 'Token failed', details: tokenData })
    }

    // Call Analytics API for buy.browse rate limits
    const limitsResponse = await fetch(
      'https://api.ebay.com/developer/analytics/v1_beta/rate_limit',
      {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
          'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
        }
      }
    )

    const limitsText = await limitsResponse.text()

    let limitsData
    try {
      limitsData = JSON.parse(limitsText)
    } catch {
      return NextResponse.json({
        status: limitsResponse.status,
        raw: limitsText,
      })
    }

    // Extract the key numbers
    const resources = limitsData?.rateLimits?.[0]?.resources || []
    const summary = resources.map((r: any) => ({
      name: r.name,
      rates: r.rates?.map((rate: any) => ({
        limit: rate.limit,
        remaining: rate.remaining,
        used: rate.limit - rate.remaining,
        percentUsed: Math.round(((rate.limit - rate.remaining) / rate.limit) * 100) + '%',
        resetsAt: rate.reset,
        windowSeconds: rate.timeWindow,
        windowHours: Math.round(rate.timeWindow / 3600),
      }))
    }))

    return NextResponse.json({
      status: limitsResponse.status,
      summary,
      raw: limitsData,
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}