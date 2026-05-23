import { Metadata } from 'next'
import MarketPage from './MarketPage'

export const metadata: Metadata = {
  title: 'Trading Card Market — Live Listings & Auctions | Foilcase',
  description: 'Browse live trading card listings and auctions ending soon. Real-time eBay market data across football, basketball, baseball, hockey, Pokémon and Magic.',
}

export default function Page() {
  return <MarketPage />
}