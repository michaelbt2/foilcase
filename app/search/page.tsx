import { Metadata } from 'next'
import SearchPage from './SearchPage'

export const metadata: Metadata = {
  title: 'Search Trading Cards — Live eBay Pricing | Foilcase',
  description: 'Search millions of trading cards with live eBay pricing and sold comps. Find current values for sports cards, Pokémon, Magic, and more.',
}

export default function Page() {
  return <SearchPage />
}