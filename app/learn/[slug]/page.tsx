import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleLayout from '../components/ArticleLayout'
import HowToValueCards from '../articles/how-to-value-your-trading-card-collection'

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