import { NextRequest, NextResponse } from 'next/server'

// ── Token cache ──
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

// ── Title parser ──
function parseCardTitle(title: string, player: string) {
  const yearMatch = title.match(/\b(19|20)\d{2}\b/)
  const year = yearMatch ? yearMatch[0] : 'Unknown'

  const brands = [
    'Panini','Topps','Bowman','Upper Deck','Leaf','Donruss',
    'Fleer','Score','Pacific','Playoff','Skybox','Pro Set',
    'Hoops','Finest','Flair','SP','SPx','Select','Mosaic',
    'Prizm','Optic','Contenders','Absolute','Certified','Spectra',
  ]
  const brand = brands.find(b => title.toLowerCase().includes(b.toLowerCase())) || 'Unknown'

  const setPatterns = [
    /Panini\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i,
    /Topps\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i,
    /Bowman\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i,
  ]
  let setName = brand
  for (const pattern of setPatterns) {
    const match = title.match(pattern)
    if (match) { setName = match[0].trim(); break }
  }

  const cardNumMatch = title.match(/#\s*[\w-]+/)
  const cardNum = cardNumMatch ? cardNumMatch[0].replace(/\s/,'') : ''

  const parallels = [
    { name:'Gold',      keywords:['Gold'] },
    { name:'Silver',    keywords:['Silver','Holo','Prizm'] },
    { name:'Blue',      keywords:['Blue'] },
    { name:'Red',       keywords:['Red'] },
    { name:'Green',     keywords:['Green'] },
    { name:'Purple',    keywords:['Purple'] },
    { name:'Orange',    keywords:['Orange'] },
    { name:'Pink',      keywords:['Pink'] },
    { name:'Black',     keywords:['Black'] },
    { name:'Refractor', keywords:['Refractor'] },
    { name:'Chrome',    keywords:['Chrome'] },
    { name:'Auto',      keywords:['Auto','Autograph'] },
    { name:'Patch',     keywords:['Patch','Relic','Mem'] },
  ]
  const parallel = parallels.find(p =>
    p.keywords.some(k => title.toLowerCase().includes(k.toLowerCase()))
  )?.name || 'Base'

  const printRunMatch = title.match(/\/(\d+)/)
  const printRun = printRunMatch ? parseInt(printRunMatch[1]) : null

  const gradeMatch = title.match(/(PSA|BGS|SGC|CGC)\s*(?:GEM\s*MT\s*)?(\d+\.?\d*)/i)
  const grade = gradeMatch ? `${gradeMatch[1].toUpperCase()} ${gradeMatch[2]}` : null

  const attrs: string[] = []
  if (title.match(/\bRC\b|\bRookie\b/i)) attrs.push('rc')
  if (title.match(/\bAuto\b|\bAutograph\b/i)) attrs.push('auto')
  if (title.match(/\bPatch\b|\bRelic\b|\bMem\b/i)) attrs.push('patch')
  if (printRun) attrs.push('numbered')
  if (title.match(/\bChrome\b/i)) attrs.push('chrome')
  if (title.match(/\bRefractor\b/i)) attrs.push('refractor')
  if (title.match(/\b1\/1\b|\bone.of.one\b/i)) attrs.push('1of1')

  const footballTeams = ['Chiefs','Patriots','Eagles','Cowboys','49ers','Packers','Bills','Ravens','Bengals','Dolphins','Broncos','Raiders','Rams','Chargers','Steelers','Lions','Bears','Vikings','Falcons','Saints','Panthers','Buccaneers','Seahawks','Cardinals','Commanders','Giants','Jets','Texans','Colts','Jaguars','Titans','Browns']
  const baseballTeams = ['Yankees','Red Sox','Dodgers','Cubs','Cardinals','Giants','Mets','Braves','Phillies','Astros','Athletics','Blue Jays','Mariners','Angels','Rangers','Padres','Rockies','Diamondbacks','Brewers','Reds','Pirates','Orioles','Rays','Twins','Tigers','White Sox','Royals','Nationals','Marlins','Guardians']
  const basketballTeams = ['Lakers','Celtics','Warriors','Bulls','Heat','Nets','Knicks','76ers','Bucks','Suns','Clippers','Nuggets','Mavericks','Spurs','Thunder','Rockets','Grizzlies','Jazz','Pelicans','Hawks','Hornets','Pacers','Pistons','Cavaliers','Magic','Raptors','Wizards','Kings','Timberwolves','Trail Blazers']

  let sport = 'Unknown'
  if (footballTeams.some(t => title.includes(t))) sport = 'Football'
  else if (baseballTeams.some(t => title.includes(t))) sport = 'Baseball'
  else if (basketballTeams.some(t => title.includes(t))) sport = 'Basketball'
  else if (title.match(/\bNFL\b/i)) sport = 'Football'
  else if (title.match(/\bMLB\b|\bBaseball\b/i)) sport = 'Baseball'
  else if (title.match(/\bNBA\b|\bBasketball\b/i)) sport = 'Basketball'
  else if (title.match(/\bNHL\b|\bHockey\b/i)) sport = 'Hockey'
  else if (title.match(/\bPokemon\b|\bMagic\b|\bYu-Gi-Oh\b/i)) sport = 'Gaming'

  return { year, brand, setName, cardNum, parallel, printRun, grade, attrs, sport }
}

// ── Filter out irrelevant listings ──
function filterRelevantCards(items: any[], player: string) {
  const playerLower = player.toLowerCase()
  const playerWords = playerLower.split(' ').filter(w => w.length > 2)
  return items.filter(item => {
    const title = item.title.toLowerCase()
    const hasPlayer = title.includes(playerLower) ||
      playerWords.filter(w => title.includes(w)).length >= 2
    const isLot = title.includes('complete your set') ||
                  title.includes('lot of') ||
                  title.includes('bundle') ||
                  title.includes('2 card min') ||
                  title.includes('read desc') ||
                  title.includes('buy 4') ||
                  title.includes('buy 3') ||
                  title.includes('get 3') ||
                  title.includes('ships free') ||
                  (title.includes('you pick') && !title.includes(playerLower)) ||
                  (/\d+-\d+/.test(title) && !title.includes(playerLower))
    const isNotCard = title.includes('jersey') ||
                      title.includes('bobblehead') ||
                      title.includes('football ball') ||
                      title.includes('mcfarlane') ||
                      title.includes('figure') ||
                      title.includes('collectors tin') ||
                      title.includes('sealed tin') ||
                      title.includes(' coa') ||
                      title.includes('signed football') ||
                      title.includes('mini helmet') ||
                      title.includes('helmet') ||
                      title.includes('cleats') ||
                      title.includes('funko') ||
                      title.includes('poster') ||
                      title.includes('book') ||
                      title.includes('magazine') ||
                      title.includes('photo')
    return hasPlayer && !isLot && !isNotCard
  })
}

// ── Deduplication ──
function deduplicateCards(items: any[], player: string) {
  const seen = new Map<string, any>()

  for (const item of items) {
    const parsed = parseCardTitle(item.title, player)
    const key = `${parsed.year}-${parsed.brand}-${parsed.setName}-${parsed.cardNum}-${parsed.parallel}`.toLowerCase()

    if (!seen.has(key)) {
      seen.set(key, {
        id: item.itemId,
        ebayItemId: item.itemId,
        title: item.title,
        player,
        year: parsed.year,
        brand: parsed.brand,
        setName: parsed.setName,
        cardNum: parsed.cardNum,
        parallel: parsed.parallel,
        printRun: parsed.printRun,
        grade: parsed.grade,
        attrs: parsed.attrs,
        sport: parsed.sport,
        price: parseFloat(item.price?.value || '0'),
        currency: item.price?.currency || 'USD',
        image: item.image?.imageUrl || item.thumbnailImages?.[0]?.imageUrl || null,
        condition: item.condition || 'Unknown',
        itemWebUrl: item.itemWebUrl,
        seller: item.seller?.username,
        listingCount: 1,
        lowestPrice: parseFloat(item.price?.value || '0'),
        highestPrice: parseFloat(item.price?.value || '0'),
      })
    } else {
      const existing = seen.get(key)!
      const price = parseFloat(item.price?.value || '0')
      existing.listingCount++
      existing.lowestPrice = Math.min(existing.lowestPrice, price)
      existing.highestPrice = Math.max(existing.highestPrice, price)
      existing.price = existing.lowestPrice
    }
  }

  return Array.from(seen.values())
}

// ── Main route handler ──
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const player  = searchParams.get('player') || ''
  const sport   = searchParams.get('sport') || ''
  const year    = searchParams.get('year') || ''
  const set     = searchParams.get('set') || ''
  const limit   = parseInt(searchParams.get('limit') || '50')

  if (!player && !set) {
    return NextResponse.json({ error: 'player or set query required' }, { status: 400 })
  }

  try {
    const token = await getEbayToken()

    // Split query intelligently — quoted player name + free keywords
    const words = player.trim().split(/\s+/)
    let playerName = player
    let keywords: string[] = []

    if (words.length >= 3) {
      const nameSuffixes = ['jr','sr','ii','iii','iv','v']
      let splitAt = 2
      if (words[2] && nameSuffixes.includes(words[2].toLowerCase())) {
        splitAt = 3
      }
      playerName = words.slice(0, splitAt).join(' ')
      keywords = words.slice(splitAt)
    }

    let query = `"${playerName}"`
    if (keywords.length > 0) query += ` ${keywords.join(' ')}`
    if (year)  query += ` ${year}`
    if (set)   query += ` ${set}`
    if (sport === 'Football')   query += ' football'
    if (sport === 'Baseball')   query += ' baseball'
    if (sport === 'Basketball') query += ' basketball'
    if (sport === 'Hockey')     query += ' hockey'

    // Fetch active listings and sold comps in parallel
    const offsets = [0, 50, 100, 150]

    const [activeResults, soldResults] = await Promise.all([
      Promise.all(offsets.map(async (offset) => {
        const response = await fetch(
          `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&filter=categoryIds:212&limit=50&offset=${offset}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
              'Content-Type': 'application/json',
            }
          }
        )
        const data = await response.json()
        return data.itemSummaries || []
      })),

      Promise.all([0, 50].map(async (offset) => {
        const now = new Date().toISOString()
        const past = new Date(Date.now() - 90 * 86400000).toISOString()
        const response = await fetch(
          `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&filter=categoryIds:212,buyingOptions:{FIXED_PRICE},itemEndDate:[${past}..${now}]&limit=50&offset=${offset}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
              'Content-Type': 'application/json',
            }
          }
        )
        const data = await response.json()
        return data.itemSummaries || []
      }))
    ])

    // Process active listings using playerName for filtering
    const allActive = activeResults.flat()
    const filteredActive = filterRelevantCards(allActive, playerName)
    const deduplicated = deduplicateCards(filteredActive, playerName)

    // Process sold comps using playerName for filtering
    const allSold = soldResults.flat()
    const filteredSold = filterRelevantCards(allSold, playerName)

    // Build sold price map
    const soldMap = new Map<string, {
      prices: number[],
      lastSold: string | null,
    }>()

    for (const item of filteredSold) {
      const parsed = parseCardTitle(item.title, playerName)
      const key = `${parsed.year}-${parsed.brand}-${parsed.setName}-${parsed.cardNum}-${parsed.parallel}`.toLowerCase()
      const price = parseFloat(item.price?.value || '0')
      if (!price) continue

      if (!soldMap.has(key)) {
        soldMap.set(key, { prices: [], lastSold: null })
      }
      const entry = soldMap.get(key)!
      entry.prices.push(price)
      const endDate = item.itemEndDate || null
      if (endDate && (!entry.lastSold || endDate > entry.lastSold)) {
        entry.lastSold = endDate
      }
    }

    // Attach sold data to each deduped card
    const enriched = deduplicated.map(card => {
      const key = `${card.year}-${card.brand}-${card.setName}-${card.cardNum}-${card.parallel}`.toLowerCase()
      const sold = soldMap.get(key)

      if (sold && sold.prices.length > 0) {
        const sorted = [...sold.prices].sort((a,b) => a - b)
        const avg = sorted.reduce((s,p) => s+p, 0) / sorted.length
        return {
          ...card,
          soldData: {
            avgPrice: Math.round(avg * 100) / 100,
            lowPrice: sorted[0],
            highPrice: sorted[sorted.length - 1],
            soldCount: sorted.length,
            lastSold: sold.lastSold,
          }
        }
      }
      return { ...card, soldData: null }
    })

// Sort: cards with sold data first, then by sold count desc, then year desc
enriched.sort((a, b) => {
  const aHasSold = a.soldData && a.soldData.soldCount > 1 ? 1 : 0
  const bHasSold = b.soldData && b.soldData.soldCount > 1 ? 1 : 0
  if (bHasSold !== aHasSold) return bHasSold - aHasSold
  if (bHasSold && aHasSold) return b.soldData.soldCount - a.soldData.soldCount
  if (b.year !== a.year) return parseInt(b.year) - parseInt(a.year)
  return a.price - b.price
})

    return NextResponse.json({
      total: enriched.length,
      ebayTotal: allActive.length,
      soldTotal: allSold.length,
      query,
      cards: enriched.slice(0, limit),
    })

  } catch (error: any) {
    console.error('Card search error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}