import { Metadata } from 'next'
import CollectionPage from './CollectionPage'

export const metadata: Metadata = {
  title: 'My Vault — Track Your Card Collection | Foilcase',
  description: 'Manage your trading card collection. Track values, organize by sport, upload card images, and monitor your collection\'s worth in real time.',
}

export default function Page() {
  return <CollectionPage />
}