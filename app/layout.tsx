import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import AmplitudeProvider from './components/AmplitudeProvider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'Foilcase — The Trading Card Vault Built for Collectors',
    template: '%s | Foilcase',
  },
  description: 'Track your trading card collection, discover real-time eBay pricing, and connect with collectors. Free vault for sports cards, Pokémon, Magic, and more.',
  metadataBase: new URL('https://foilcase.com'),
  openGraph: {
    type: 'website',
    siteName: 'Foilcase',
    title: 'Foilcase — The Trading Card Vault Built for Collectors',
    description: 'Track your trading card collection, discover real-time eBay pricing, and connect with collectors. Free vault for sports cards, Pokémon, Magic, and more.',
    url: 'https://foilcase.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foilcase — The Trading Card Vault Built for Collectors',
    description: 'Track your trading card collection, discover real-time eBay pricing, and connect with collectors. Free vault for sports cards, Pokémon, Magic, and more.',
  },
  keywords: [
    'trading card collection tracker',
    'sports card vault',
    'card collection app',
    'trading card value tracker',
    'sports card organizer',
    'Pokemon card tracker',
    'trading card price guide',
    'sports card database',
    'card collection manager',
    'trading card community',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
        </head>
        <body>
          <AmplitudeProvider/>
          <Analytics />
          <SpeedInsights />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}