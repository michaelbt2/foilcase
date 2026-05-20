import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

export async function GET() {
  try {
    // Get searches from the last 7 days
    const cutoff = new Date(Date.now() - 7 * 86400000).toISOString()

    const { data, error } = await supabase
      .from('searches')
      .select('query')
      .gte('created_at', cutoff)

    if (error) throw error

    if (!data || data.length === 0) {
      return NextResponse.json({ trending: [] })
    }

    // Count occurrences of each query
    const counts: Record<string, number> = {}
    data.forEach(({ query }) => {
      const q = query.trim().toLowerCase()
      if (q.length < 2) return
      counts[q] = (counts[q] || 0) + 1
    })

    // Sort by count descending, take top 10
    const trending = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([query, count]) => ({
        query,
        count,
        // Capitalize first letter of each word for display
        label: query.replace(/\b\w/g, c => c.toUpperCase()),
      }))

    return NextResponse.json({ trending })

  } catch (error: any) {
    console.error('Trending error:', error)
    return NextResponse.json({ trending: [] })
  }
}