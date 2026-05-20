import { NextRequest, NextResponse } from 'next/server'

let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getEbayToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken
  const clientId     = process.env.EBAY_CLIENT_ID!
  const clientSecret = process.env.EBAY_CLIENT_SECRET!
  const credentials  = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
  })
  const data = await response.json()
  if (!response.ok) throw new Error(`eBay auth failed: ${data.error_description}`)
  cachedToken = data.access_token
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000
  return cachedToken!
}

// Preset queries covering popular players across sports
const FEED_QUERIES = [
  // Football — 3 queries
  { q: '"Patrick Mahomes"', sport: 'Football' },
  { q: '"Josh Allen"', sport: 'Football' },
  { q: '"Caleb Williams" rookie', sport: 'Football' },
  // Basketball — 3 queries
  { q: '"LeBron James"', sport: 'Basketball' },
  { q: '"Victor Wembanyama" prizm', sport: 'Basketball' },
  { q: '"Stephen Curry" prizm', sport: 'Basketball' },
  // Baseball — 3 queries
  { q: '"Shohei Ohtani"', sport: 'Baseball' },
  { q: '"Juan Soto"', sport: 'Baseball' },
  { q: '"Ronald Acuna" prizm', sport: 'Baseball' },
  // Hockey — 2 queries
  { q: '"Connor McDavid"', sport: 'Hockey' },
  { q: '"Nathan MacKinnon"', sport: 'Hockey' },
  // Gaming — 2 queries
  { q: 'Charizard PSA', sport: 'Gaming' },
  { q: 'Pikachu card PSA', sport: 'Gaming' },
]

function isNotCard(title: string) {
  const t = title.toLowerCase()
  return (
    t.includes('jersey') || t.includes('bobblehead') || t.includes('figure') ||
    t.includes('helmet') || t.includes('cleats') || t.includes('funko') ||
    t.includes('poster') || t.includes('signed football') || t.includes('lot of') ||
    t.includes('bundle') || t.includes('sealed tin') || t.includes('photo') ||
    t.includes('magnet') || t.includes('lithograph') || t.includes('framed') ||
    t.includes('print') || t.includes('canvas') || t.includes('ornament') ||
    t.includes('statue') || t.includes('plaque') || t.includes('pin ') ||
    t.includes('keychain') || t.includes('sticker') || t.includes('patch only') ||
    t.includes('wristband') || t.includes('hat ') || t.includes(' hat') ||
    t.includes('shirt') || t.includes('hoodie') || t.includes('chaser pack') ||
    t.includes('presale') || t.includes('pre-sale') || t.includes('mystery')
  )
}

function parseGrade(title: string) {
  const m = title.match(/(PSA|BGS|SGC|CGC)\s*(?:GEM\s*MT\s*)?(\d+\.?\d*)/i)
  return m ? `${m[1].toUpperCase()} ${m[2]}` : null
}

function parsePrintRun(title: string) {
  const m = title.match(/\/(\d+)/)
  return m ? parseInt(m[1]) : null
}

function parseYear(title: string) {
  const m = title.match(/\b(19|20)\d{2}\b/)
  return m ? m[0] : 'Unknown'
}

export async function GET(request: NextRequest) {
  try {
    const token = await getEbayToken()

    // Fetch active listings and sold comps for all queries in parallel
    const results = await Promise.all(
      FEED_QUERIES.map(async ({ q, sport }) => {
        const [activeRes, soldRes] = await Promise.all([
          fetch(
            `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(q)}&filter=categoryIds:212&limit=20`,
            { headers: { 'Authorization': `Bearer ${token}`, 'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US' } }
          ).then(r => r.json()),

          fetch(
            `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(q)}&filter=categoryIds:212,buyingOptions:{FIXED_PRICE},itemEndDate:[${new Date(Date.now() - 30 * 86400000).toISOString()}..${new Date().toISOString()}]&limit=20`,
            { headers: { 'Authorization': `Bearer ${token}`, 'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US' } }
          ).then(r => r.json()),
        ])

        const active = (activeRes.itemSummaries || []).filter((i: any) => !isNotCard(i.title))
        const sold   = (soldRes.itemSummaries  || []).filter((i: any) => !isNotCard(i.title))

        // Compute avg sold price across all sold items for this query
        const soldPrices = sold.map((i: any) => parseFloat(i.price?.value || '0')).filter(Boolean)
        const avgSold = soldPrices.length
          ? soldPrices.reduce((a: number, b: number) => a + b, 0) / soldPrices.length
          : null

        // Best deals — active listings significantly below avg sold
        const deals = avgSold
          ? active
              .map((i: any) => {
                const price = parseFloat(i.price?.value || '0')
                const saving = avgSold - price
                const savingPct = Math.round((saving / avgSold) * 100)
                return {
                  id: i.itemId,
                  title: i.title,
                  price,
                  avgSold: Math.round(avgSold * 100) / 100,
                  saving: Math.round(saving * 100) / 100,
                  savingPct,
                  image: i.image?.imageUrl || i.thumbnailImages?.[0]?.imageUrl || null,
                  itemWebUrl: i.itemWebUrl,
                  sport,
                  year: parseYear(i.title),
                  grade: parseGrade(i.title),
                  printRun: parsePrintRun(i.title),
                }
              })
              .filter((i: any) => i.savingPct >= 20 && i.price >= 20 && i.price < 300 && i.saving >= 15)
              .sort((a: any, b: any) => b.savingPct - a.savingPct)
              .slice(0, 3)
          : []

        // Recently sold — last 5 sold items with price
        const recentSold = sold
          .slice(0, 5)
          .map((i: any) => ({
            id: i.itemId,
            title: i.title,
            price: parseFloat(i.price?.value || '0'),
            image: i.image?.imageUrl || i.thumbnailImages?.[0]?.imageUrl || null,
            itemWebUrl: i.itemWebUrl,
            sport,
            year: parseYear(i.title),
            grade: parseGrade(i.title),
            soldDate: i.itemEndDate || null,
          }))
          .filter((i: any) => i.price > 0)

        return { sport, deals, recentSold, avgSold, query: q }
      })
    )

    // Flatten and sort all deals by saving %
    const allDeals = results
      .flatMap(r => r.deals)
      .sort((a, b) => b.savingPct - a.savingPct)
      .slice(0, 12)

// Interleave results across sports so every sport is represented
const allRecentSold: any[] = []
const maxPerQuery = 2
results.forEach(r => {
  allRecentSold.push(...r.recentSold.slice(0, maxPerQuery))
})
// Fill remaining slots with any leftover items
const usedIds = new Set(allRecentSold.map(i => i.id))
results.forEach(r => {
  r.recentSold.slice(maxPerQuery).forEach((i: any) => {
    if (!usedIds.has(i.id) && allRecentSold.length < 30) {
      allRecentSold.push(i)
      usedIds.add(i.id)
    }
  })
})

    // Market summary per sport
    const sportSummary = results.map(r => ({
      sport: r.sport,
      avgSold: r.avgSold,
      dealCount: r.deals.length,
    }))

    return NextResponse.json({
      deals: allDeals,
      recentSold: allRecentSold,
      sportSummary,
      generatedAt: new Date().toISOString(),
    })

  } catch (error: any) {
    console.error('Browse feed error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}