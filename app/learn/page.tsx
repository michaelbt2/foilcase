import { Metadata } from 'next'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Learn — Trading Card Collecting Guides & Resources | Foilcase',
  description: 'Free guides and resources for trading card collectors. Learn how to value, organize, grade, and sell your card collection.',
}

const articles = [
  {
    slug: 'how-to-value-your-trading-card-collection',
    title: 'How to Value Your Trading Card Collection',
    description: 'A complete guide to understanding what your cards are worth using sold comps, grading, and market data.',
    category: 'Valuing Cards',
    readTime: '8 min',
    date: 'May 2026',
  },
  {
    slug: 'psa-vs-bgs-vs-sgc-grading-comparison',
    title: 'PSA vs BGS vs SGC — Which Grading Company is Best?',
    description: 'A complete comparison of the three major card grading companies to help you choose the right one for your cards.',
    category: 'Grading',
    readTime: '10 min',
    date: 'May 2026',
  },
  {
    slug: 'what-is-a-rookie-card',
    title: 'What is a Rookie Card? Complete Guide for Collectors',
    description: 'Everything you need to know about rookie cards — what makes them official, why they\'re valuable, and how to identify them.',
    category: 'Getting Started',
    readTime: '7 min',
    date: 'May 2026',
  },
  {
    slug: 'how-to-organize-trading-card-collection',
    title: 'How to Organize Your Trading Card Collection',
    description: 'A step-by-step guide to organizing, storing, and tracking your trading card collection — from beginner to advanced.',
    category: 'Getting Started',
    readTime: '9 min',
    date: 'May 2026',
  },
  {
    slug: 'how-to-sell-trading-cards-on-ebay',
    title: 'How to Sell Trading Cards on eBay — Complete Guide',
    description: 'Everything you need to know to sell trading cards on eBay — from researching prices to packaging and shipping.',
    category: 'Selling & Trading',
    readTime: '12 min',
    date: 'May 2026',
  },
  {
    slug: 'charizard-card-value-guide',
    title: 'Charizard Card Value Guide — What is it Worth in 2026?',
    description: 'A complete guide to Charizard card values across all sets and editions — from Base Set 1st Edition to modern special illustration rares.',
    category: 'TCG',
    readTime: '9 min',
    date: 'May 2026',
  },
  {
    slug: 'patrick-mahomes-rookie-card-guide',
    title: 'Patrick Mahomes Rookie Card — Complete Collector\'s Guide',
    description: 'Everything collectors need to know about Patrick Mahomes rookie cards — values, parallels, grading, and what to buy.',
    category: 'Sports Cards',
    readTime: '10 min',
    date: 'May 2026',
  },
  {
    slug: 'panini-prizm-collectors-guide',
    title: 'Panini Prizm — Complete Collector\'s Guide',
    description: 'Everything you need to know about Panini Prizm — the most popular modern trading card set across football, basketball, and baseball.',
    category: 'Sports Cards',
    readTime: '11 min',
    date: 'May 2026',
  },
]

const categories = [
  { label: 'Getting Started', color: '#1B6FF0', bg: '#EBF2FF' },
  { label: 'Grading', color: '#7B4FCA', bg: '#F2ECFB' },
  { label: 'Valuing Cards', color: '#00A861', bg: '#E6F9F0' },
  { label: 'Sports Cards', color: '#E8820C', bg: '#FEF3E2' },
  { label: 'TCG', color: '#D93025', bg: '#FDECEA' },
  { label: 'Selling & Trading', color: '#0097A7', bg: '#E0F7FA' },
]

export default function LearnHub() {
  return (
    <>
      <style>{`
        .learn-hero{background:#0D0D0D;padding:64px 24px;position:relative;overflow:hidden;text-align:center}
        .learn-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .learn-hero-inner{max-width:680px;margin:0 auto;position:relative;z-index:1}
        .learn-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(27,111,240,.2);color:#7EB6FF;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:20px}
        .learn-title{font-size:clamp(28px,5vw,46px);font-weight:800;color:#fff;letter-spacing:-1.5px;line-height:1.08;margin-bottom:16px}
        .learn-title em{font-style:italic;color:#7EB6FF}
        .learn-sub{font-size:16px;color:rgba(255,255,255,.6);line-height:1.7}
        .learn-layout{max-width:1100px;margin:0 auto;padding:48px 24px}
        .learn-categories{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:48px}
        .learn-category{padding:6px 16px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:'Plus Jakarta Sans',sans-serif}
        .learn-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}
        .learn-card{background:#fff;border:1px solid #EFEFEF;border-radius:12px;padding:24px;text-decoration:none;transition:all .2s;display:block;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .learn-card:hover{border-color:#D8D8D8;box-shadow:0 8px 28px rgba(0,0,0,.10);transform:translateY(-2px)}
        .learn-card-category{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#1B6FF0;margin-bottom:10px}
        .learn-card-title{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:8px;line-height:1.25}
        .learn-card-desc{font-size:14px;color:#555;line-height:1.6;margin-bottom:16px}
        .learn-card-meta{display:flex;align-items:center;gap:8px;font-size:12px;color:#9A9A9A}
        .learn-card-dot{width:3px;height:3px;border-radius:50%;background:#D8D8D8}
        .learn-empty{background:#fff;border:1.5px dashed #D8D8D8;border-radius:12px;padding:48px 24px;text-align:center;grid-column:1/-1}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="learn-hero">
        <div className="learn-hero-inner">
          <div className="learn-eyebrow">Collector Resources</div>
          <h1 className="learn-title">The collector's <em>knowledge hub</em></h1>
          <p className="learn-sub">Free guides to help you value, organize, grade, and grow your trading card collection.</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="learn-layout">

        {/* Categories */}
        <div className="learn-categories">
          {categories.map(c => (
            <span key={c.label} className="learn-category" style={{background:c.bg,color:c.color}}>
              {c.label}
            </span>
          ))}
        </div>

        {/* Articles grid */}
        <div className="learn-grid">
          {articles.map(a => (
            <Link key={a.slug} href={`/learn/${a.slug}`} className="learn-card">
              <div className="learn-card-category">{a.category}</div>
              <div className="learn-card-title">{a.title}</div>
              <div className="learn-card-desc">{a.description}</div>
              <div className="learn-card-meta">
                <span>{a.readTime} read</span>
                <div className="learn-card-dot"/>
                <span>{a.date}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <Footer />
    </>
  )
}