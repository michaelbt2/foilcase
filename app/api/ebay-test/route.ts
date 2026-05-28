import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const clientId = process.env.EBAY_CLIENT_ID!
    const clientSecret = process.env.EBAY_CLIENT_SECRET!
    
    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'Missing eBay credentials', clientId: !!clientId, clientSecret: !!clientSecret })
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
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

    // Test a simple search with the token
    const searchResponse = await fetch(
      'https://api.ebay.com/buy/browse/v1/item_summary/search?q=mahomes+card&limit=3',
      {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
          'Content-Type': 'application/json',
        }
      }
    )

    const searchData = await searchResponse.json()

    return NextResponse.json({
      tokenOk: true,
      tokenExpiresIn: tokenData.expires_in,
      searchStatus: searchResponse.status,
      searchTotal: searchData.total,
      firstResult: searchData.itemSummaries?.[0]?.title || null,
      rawError: searchData.errors || null,
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}