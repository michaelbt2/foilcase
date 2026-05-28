const EPN_CAMPAIGN_ID = '5339152426'
const EPN_ROTATION_ID = '711-53200-19255-0'
const EPN_TOOL_ID = '10001'
const EPN_CUSTOM_ID = 'foilcase'

/**
 * Appends eBay Partner Network affiliate parameters to any eBay URL.
 * Works for item listings, search results, and user store URLs.
 */
export function ebayAffiliateUrl(url: string): string {
  if (!url) return url
  
  try {
    const u = new URL(url)
    
    // Only append to eBay domains
    if (!u.hostname.includes('ebay.com')) return url
    
    u.searchParams.set('mkevt', '1')
    u.searchParams.set('mkcid', '1')
    u.searchParams.set('mkrid', EPN_ROTATION_ID)
    u.searchParams.set('campid', EPN_CAMPAIGN_ID)
    u.searchParams.set('toolid', EPN_TOOL_ID)
    u.searchParams.set('customid', EPN_CUSTOM_ID)
    
    return u.toString()
  } catch {
    // If URL parsing fails return original
    return url
  }
}

/**
 * Builds an eBay user store URL with affiliate tag.
 */
export function ebayUserUrl(username: string): string {
  if (!username) return ''
  return ebayAffiliateUrl(`https://www.ebay.com/usr/${username}`)
}

/**
 * Builds an eBay search URL with affiliate tag.
 * Useful for linking to search results for a specific card.
 */
export function ebaySearchUrl(query: string): string {
  if (!query) return ''
  const base = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}`
  return ebayAffiliateUrl(base)
}