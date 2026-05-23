import { Metadata } from 'next'
import AboutPage from './AboutPage'

export const metadata: Metadata = {
  title: 'About Foilcase — The Modern Trading Card Vault',
  description: 'Foilcase is the modern home for trading card collectors. Learn about our mission to help collectors track, value, and share their collections.',
}

export default function Page() {
  return <AboutPage />
}