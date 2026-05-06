import { NextRequest, NextResponse } from 'next/server'

let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getEbayToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken
  }

  const clientId = process.env.EBAY_CLIENT_ID!
  const clientSecret = process.env.EBAY_CLIENT_SECRET!
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(`eBay auth failed: ${data.error_description || 'Unknown error'}`)
  }

  cachedToken = data.access_token
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000
  return cachedToken!
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const type = searchParams.get('type') || 'active'

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 })
  }

  try {
    const token = await getEbayToken()

    if (type === 'sold') {
      // Search sold listings for price history
      const response = await fetch(
        `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&filter=categoryIds:212&sort=endDate&limit=10`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
            'Content-Type': 'application/json',
          }
        }
      )
      const data = await response.json()
      return NextResponse.json(data)
    } else {
      // Search active listings
      const response = await fetch(
        `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&filter=categoryIds:212&limit=10`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
            'Content-Type': 'application/json',
          }
        }
      )
      const data = await response.json()
      return NextResponse.json(data)
    }
  } catch (error: any) {
    console.error('eBay API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}