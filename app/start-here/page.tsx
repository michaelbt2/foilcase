import { Metadata } from 'next'
import StartHerePage from './StartHerePage'

export const metadata: Metadata = {
  title: 'Start Here — How Foilcase Works | Foilcase',
  description: 'Learn how to use Foilcase to track your trading card collection, monitor values, organize your vault, and connect with the collector community.',
}

export default function Page() {
  return <StartHerePage />
}