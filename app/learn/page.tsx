'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

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
  {
    slug: 'what-is-card-grading',
    title: 'What is Card Grading? Complete Beginner\'s Guide',
    description: 'Everything you need to know about professional card grading — what it is, how it works, which company to choose, and whether it\'s worth it.',
    category: 'Grading',
    readTime: '10 min',
    date: 'May 2026',
  },
  {
    slug: 'how-to-store-trading-cards',
    title: 'How to Store Trading Cards — Complete Guide',
    description: 'The complete guide to storing trading cards properly — from penny sleeves to graded slabs, environmental conditions, and common mistakes to avoid.',
    category: 'Getting Started',
    readTime: '9 min',
    date: 'May 2026',
  },
  {
    slug: 'trading-card-investment-guide',
    title: 'Trading Card Investment Guide — Is it Worth It?',
    description: 'A comprehensive guide to investing in trading cards — what makes a good investment, strategies, risks, and how to research the market.',
    category: 'Valuing Cards',
    readTime: '12 min',
    date: 'May 2026',
  },
]

const categories = [
  { label: 'All', color: '#0D0D0D', bg: '#F7F7F7' },
  { label: 'Getting Started', color: '#1B6FF0', bg: '#EBF2FF' },
  { label: 'Grading', color: '#7B4FCA', bg: '#F2ECFB' },
  { label: 'Valuing Cards', color: '#00A861', bg: '#E6F9F0' },
  { label: 'Sports Cards', color: '#E8820C', bg: '#FEF3E2' },
  { label: 'TCG', color: '#D93025', bg: '#FDECEA' },
  { label: 'Selling & Trading', color: '#0097A7', bg: '#E0F7FA' },
]

export default function LearnHub() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const activeCat = categories.find(c => c.label === activeCategory)

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
        .learn-pills-bar{background:#fff;border-bottom:1px solid #EFEFEF;padding:14px 0}
        .learn-pills-inner{max-width:1100px;margin:0 auto;padding:0 24px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
        .learn-pill{display:inline-flex;align-items:center;padding:6px 16px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid transparent;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s}
        .learn-pill:hover{opacity:.85}
        .learn-layout{max-width:1100px;margin:0 auto;padding:40px 24px}
        .learn-results-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
        .learn-results-count{font-size:14px;color:#9A9A9A}
        .learn-results-count strong{color:#0D0D0D}
        .learn-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}
        .learn-card{background:#fff;border:1px solid #EFEFEF;border-radius:12px;padding:24px;text-decoration:none;transition:all .2s;display:block;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .learn-card:hover{border-color:#D8D8D8;box-shadow:0 8px 28px rgba(0,0,0,.10);transform:translateY(-2px)}
        .learn-card-category{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px}
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

      {/* PILLS BAR */}
      <div className="learn-pills-bar">
        <div className="learn-pills-inner">
          {categories.map(c => {
            const isActive = activeCategory === c.label
            return (
              <button
                key={c.label}
                className="learn-pill"
                onClick={() => setActiveCategory(c.label)}
                style={{
                  background: isActive ? c.color : '#fff',
                  color: isActive ? '#fff' : '#555',
                  borderColor: isActive ? c.color : '#EFEFEF',
                }}
              >
                {c.label}
                {c.label !== 'All' && (
                  <span style={{
                    marginLeft:'6px',
                    fontSize:'11px',
                    fontWeight:700,
                    padding:'1px 6px',
                    borderRadius:'100px',
                    background: isActive ? 'rgba(255,255,255,.25)' : '#F7F7F7',
                    color: isActive ? '#fff' : '#9A9A9A',
                  }}>
                    {articles.filter(a => a.category === c.label).length}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* MAIN */}
      <div className="learn-layout">

        {/* Results header */}
        <div className="learn-results-header">
          <div className="learn-results-count">
            <strong>{filtered.length}</strong> article{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && <> in <strong>{activeCategory}</strong></>}
          </div>
          {activeCategory !== 'All' && (
            <button
              onClick={() => setActiveCategory('All')}
              style={{fontSize:'13px',fontWeight:600,color:'#1B6FF0',background:'none',border:'none',cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif'}}
            >
              Clear filter ×
            </button>
          )}
        </div>

        {/* Articles grid */}
        <div className="learn-grid">
          {filtered.length === 0 ? (
            <div className="learn-empty">
              <div style={{fontSize:'32px',marginBottom:'12px'}}>📚</div>
              <div style={{fontSize:'16px',fontWeight:700,color:'#0D0D0D',marginBottom:'6px'}}>No articles in this category yet</div>
              <div style={{fontSize:'14px',color:'#9A9A9A'}}>Check back soon — we're adding new guides regularly.</div>
            </div>
          ) : (
            filtered.map(a => {
              const cat = categories.find(c => c.label === a.category)
              return (
                <Link key={a.slug} href={`/learn/${a.slug}`} className="learn-card">
                  <div className="learn-card-category" style={{color: cat?.color || '#1B6FF0'}}>{a.category}</div>
                  <div className="learn-card-title">{a.title}</div>
                  <div className="learn-card-desc">{a.description}</div>
                  <div className="learn-card-meta">
                    <span>{a.readTime} read</span>
                    <div className="learn-card-dot"/>
                    <span>{a.date}</span>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}