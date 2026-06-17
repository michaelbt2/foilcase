import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleLayout from '../components/ArticleLayout'
import HowToValueCards from '../articles/how-to-value-your-trading-card-collection'
import PSAVsBGSVsSGC from '../articles/psa-vs-bgs-vs-sgc-grading-comparison'
import WhatIsARookieCard from '../articles/what-is-a-rookie-card'
import HowToOrganizeCards from '../articles/how-to-organize-trading-card-collection'
import HowToSellCardsOnEbay from '../articles/how-to-sell-trading-cards-on-ebay'
import CharizardCardValueGuide from '../articles/charizard-card-value-guide'
import PatrickMahomesRookieCardGuide from '../articles/patrick-mahomes-rookie-card-guide'
import PaniniPrizmCollectorsGuide from '../articles/panini-prizm-collectors-guide'
import WhatIsCardGrading from '../articles/what-is-card-grading'
import HowToStoreCards from '../articles/how-to-store-trading-cards'
import TradingCardInvestmentGuide from '../articles/trading-card-investment-guide'
import MostExpensivePokemonCards from '../articles/most-expensive-pokemon-cards'
import PSAGradingCostTurnaroundTime from '../articles/psa-grading-cost-turnaround-time'
import HowToShipTradingCards from '../articles/how-to-ship-trading-cards'

const articles: Record<string, any> = {
  'how-to-value-your-trading-card-collection': {
    title: 'How to Value Your Trading Card Collection',
    description: 'A complete guide to understanding what your cards are worth using sold comps, grading, and market data.',
    category: 'Valuing Cards',
    readTime: '8 min',
    date: 'May 2026',
    slug: 'how-to-value-your-trading-card-collection',
    component: HowToValueCards,
  },
  'psa-vs-bgs-vs-sgc-grading-comparison': {
    title: 'PSA vs BGS vs SGC — Which Grading Company is Best?',
    description: 'A complete comparison of the three major card grading companies to help you choose the right one for your cards.',
    category: 'Grading',
    readTime: '10 min',
    date: 'May 2026',
    slug: 'psa-vs-bgs-vs-sgc-grading-comparison',
    component: PSAVsBGSVsSGC,
  },
  'what-is-a-rookie-card': {
    title: 'What is a Rookie Card? Complete Guide for Collectors',
    description: 'Everything you need to know about rookie cards — what makes them official, why they\'re valuable, and how to identify them.',
    category: 'Getting Started',
    readTime: '7 min',
    date: 'May 2026',
    slug: 'what-is-a-rookie-card',
    component: WhatIsARookieCard,
  },
  'how-to-organize-trading-card-collection': {
    title: 'How to Organize Your Trading Card Collection',
    description: 'A step-by-step guide to organizing, storing, and tracking your trading card collection — from beginner to advanced.',
    category: 'Getting Started',
    readTime: '9 min',
    date: 'May 2026',
    slug: 'how-to-organize-trading-card-collection',
    component: HowToOrganizeCards,
  },
  'how-to-sell-trading-cards-on-ebay': {
    title: 'How to Sell Trading Cards on eBay — Complete Guide',
    description: 'Everything you need to know to sell trading cards on eBay — from researching prices to packaging and shipping.',
    category: 'Selling & Trading',
    readTime: '12 min',
    date: 'May 2026',
    slug: 'how-to-sell-trading-cards-on-ebay',
    component: HowToSellCardsOnEbay,
  },
  'charizard-card-value-guide': {
    title: 'Charizard Card Value Guide — What is it Worth in 2026?',
    description: 'A complete guide to Charizard card values across all sets and editions — from Base Set 1st Edition to modern special illustration rares.',
    category: 'TCG',
    readTime: '9 min',
    date: 'May 2026',
    slug: 'charizard-card-value-guide',
    component: CharizardCardValueGuide,
  },
  'patrick-mahomes-rookie-card-guide': {
    title: 'Patrick Mahomes Rookie Card — Complete Collector\'s Guide',
    description: 'Everything collectors need to know about Patrick Mahomes rookie cards — values, parallels, grading, and what to buy.',
    category: 'Sports Cards',
    readTime: '10 min',
    date: 'May 2026',
    slug: 'patrick-mahomes-rookie-card-guide',
    component: PatrickMahomesRookieCardGuide,
  },
  'panini-prizm-collectors-guide': {
    title: 'Panini Prizm — Complete Collector\'s Guide',
    description: 'Everything you need to know about Panini Prizm — the most popular modern trading card set across football, basketball, and baseball.',
    category: 'Sports Cards',
    readTime: '11 min',
    date: 'May 2026',
    slug: 'panini-prizm-collectors-guide',
    component: PaniniPrizmCollectorsGuide,
  },
  'what-is-card-grading': {
  title: 'What is Card Grading? Complete Beginner\'s Guide',
  description: 'Everything you need to know about professional card grading — what it is, how it works, which company to choose, and whether it\'s worth it.',
  category: 'Grading',
  readTime: '10 min',
  date: 'May 2026',
  slug: 'what-is-card-grading',
  component: WhatIsCardGrading,
},
'how-to-store-trading-cards': {
  title: 'How to Store Trading Cards — Complete Guide',
  description: 'The complete guide to storing trading cards properly — from penny sleeves to graded slabs, environmental conditions, and common mistakes to avoid.',
  category: 'Getting Started',
  readTime: '9 min',
  date: 'May 2026',
  slug: 'how-to-store-trading-cards',
  component: HowToStoreCards,
},
'trading-card-investment-guide': {
  title: 'Trading Card Investment Guide — Is it Worth It?',
  description: 'A comprehensive guide to investing in trading cards — what makes a good investment, strategies, risks, and how to research the market.',
  category: 'Valuing Cards',
  readTime: '12 min',
  date: 'May 2026',
  slug: 'trading-card-investment-guide',
  component: TradingCardInvestmentGuide,
},
'most-expensive-pokemon-cards': {
  title: 'Most Expensive Pokémon Cards Ever Sold',
  description: 'A complete guide to the most valuable Pokémon cards ever sold — from the 1999 Base Set 1st Edition Charizard to rare trophy cards worth millions.',
  category: 'TCG',
  readTime: '10 min',
  date: 'June 2026',
  slug: 'most-expensive-pokemon-cards',
  component: MostExpensivePokemonCards,
},
'psa-grading-cost-turnaround-time': {
  title: 'PSA Grading Cost and Turnaround Time — 2025 Guide',
  description: 'Everything you need to know about PSA grading costs, current turnaround times, and how to choose the right service level for your cards.',
  category: 'Grading',
  readTime: '9 min',
  date: 'June 2026',
  slug: 'psa-grading-cost-turnaround-time',
  component: PSAGradingCostTurnaroundTime,
},
'how-to-ship-trading-cards': {
  title: 'How to Ship Trading Cards Safely — Complete Guide',
  description: 'The complete guide to shipping trading cards safely — from basic raw card shipping to sending high-value graded slabs across the country.',
  category: 'Getting Started',
  readTime: '8 min',
  date: 'June 2026',
  slug: 'how-to-ship-trading-cards',
  component: HowToShipTradingCards,
},
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]
  if (!article) notFound()
  const Content = article.component
  return (
    <ArticleLayout meta={article}>
      <Content />
    </ArticleLayout>
  )
}