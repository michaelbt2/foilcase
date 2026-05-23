import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleLayout from '../components/ArticleLayout'
import HowToValueCards from '../articles/how-to-value-your-trading-card-collection'
import PSAVsBGSVsSGC from '../articles/psa-vs-bgs-vs-sgc-grading-comparison'
import WhatIsARookieCard from '../articles/what-is-a-rookie-card'
import HowToOrganizeCards from '../articles/how-to-organize-trading-card-collection'
import HowToSellCardsOnEbay from '../articles/how-to-sell-trading-cards-on-ebay'

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