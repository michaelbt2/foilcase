import * as amplitude from '@amplitude/analytics-browser'

let initialized = false

export function initAmplitude() {
  if (initialized) return
  if (typeof window === 'undefined') return
  if (!process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) return

  amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, {
    defaultTracking: {
      pageViews: true,
      sessions: true,
      formInteractions: false,
      fileDownloads: false,
    },
    // Only log in production
    optOut: process.env.NODE_ENV !== 'production',
  })

  initialized = true
}

export function identify(userId: string, traits?: Record<string, any>) {
  if (typeof window === 'undefined') return
  amplitude.setUserId(userId)
  if (traits) {
    const identifyEvent = new amplitude.Identify()
    Object.entries(traits).forEach(([key, value]) => {
      identifyEvent.set(key, value)
    })
    amplitude.identify(identifyEvent)
  }
}

export function track(event: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return
  amplitude.track(event, properties)
}

export function resetUser() {
  if (typeof window === 'undefined') return
  amplitude.reset()
}

// Typed event helpers
export const analytics = {
  // Auth
  signUpCompleted: (method: string) =>
    track('sign_up_completed', { method }),
  signInCompleted: (method: string) =>
    track('sign_in_completed', { method }),

  // Vault
  cardAdded: (props: { sport: string, hasImage: boolean, fromSearch: boolean }) =>
    track('card_added', props),
  cardEdited: (props: { sport: string }) =>
    track('card_edited', props),
  cardDeleted: () =>
    track('card_deleted'),
  vaultMadePublic: () =>
    track('vault_made_public'),
  vaultShared: () =>
    track('vault_shared'),

  // Search
  searchPerformed: (props: { query: string, resultCount: number, sport: string }) =>
    track('search_performed', props),
  cardViewedOnEbay: (props: { player: string, sport: string, price: number }) =>
    track('card_viewed_on_ebay', props),
  cardAddedFromSearch: (props: { player: string, sport: string }) =>
    track('card_added_from_search', props),

  // Community
  collectorFollowed: (props: { followedUsername: string }) =>
    track('collector_followed', props),
  vaultVisited: (props: { username: string, cardCount: number }) =>
    track('vault_visited', props),
  playerSearchPerformed: (props: { query: string, resultCount: number }) =>
    track('player_search_performed', props),

  // Market
  marketSportFiltered: (props: { sport: string }) =>
    track('market_sport_filtered', props),
  auctionClicked: (props: { sport: string, grade: string }) =>
    track('auction_clicked', props),
  marketListingClicked: (props: { sport: string, price: number }) =>
    track('market_listing_clicked', props),

  // Page views (manual)
  pageViewed: (props: { page: string }) =>
    track('page_viewed', props),
}