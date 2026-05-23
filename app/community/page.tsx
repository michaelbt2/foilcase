import { Metadata } from 'next'
import CommunityPage from './CommunityPage'

export const metadata: Metadata = {
  title: 'Collector Community — Browse Public Vaults | Foilcase',
  description: 'Discover collectors, browse public card vaults, follow your favorite collectors, and find cards for sale or trade. Join the Foilcase community.',
}

export default function Page() {
  return <CommunityPage />
}