import { NextResponse } from 'next/server'

export async function GET() {
  // Only available in local development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }

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
      return NextResponse.json({ status: limitsResponse.status, raw: limitsText })
    }

    // Extract just the buy.browse data — the most important one
    const browseResource = limitsData?.rateLimits
      ?.find((r: any) => r.apiName === 'Browse')
      ?.resources
      ?.find((r: any) => r.name === 'buy.browse')

    const browseRates = browseResource?.rates?.[0]

    return NextResponse.json({
      status: limitsResponse.status,
      buy_browse: browseRates ? {
        limit: browseRates.limit,
        used: browseRates.count,
        remaining: browseRates.remaining,
        percentUsed: Math.round((browseRates.count / browseRates.limit) * 100) + '%',
        resetsAt: browseRates.reset,
      } : null,
      all_limits: limitsData,
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}