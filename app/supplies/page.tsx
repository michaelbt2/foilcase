'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShield, faBoxOpen, faTrophy, faDisplay, faTruck, faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'

const categories = [
  { id: 'all', label: 'All Supplies', icon: faLayerGroup },
  { id: 'storage', label: 'Storage & Protection', icon: faShield },
  { id: 'organization', label: 'Organization', icon: faBoxOpen },
  { id: 'grading', label: 'Grading & Submission', icon: faTrophy },
  { id: 'display', label: 'Display', icon: faDisplay },
  { id: 'shipping', label: 'Shipping', icon: faTruck },
]

const products = [
  // Storage & Protection
  {
    id: 1,
    category: 'storage',
    name: 'Ultra Pro Penny Sleeves 100ct',
    desc: 'Essential protection for every card in your collection',
    img: 'https://m.media-amazon.com/images/I/61MeeY1RyjL._AC_SX679_.jpg',
    url: 'https://www.amazon.com/Ultra-Pro-Sleeves-Standard-Trading/dp/B08B9GVG36?tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },
  {
    id: 2,
    category: 'storage',
    name: 'Ultra Pro Top Loaders 25ct',
    desc: 'Rigid protection for your most valuable cards',
    img: 'https://m.media-amazon.com/images/I/71onuytTxmL._AC_SX466_.jpg',
    url: 'https://www.amazon.com/Ultra-Pro-Baseball-Football-Basketball/dp/B004KHV24W?tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },
  {
    id: 3,
    category: 'storage',
    name: 'Ultra Pro Semi-Rigid Card Savers 200ct',
    desc: 'Preferred by PSA and BGS for grading submissions',
    img: 'https://m.media-amazon.com/images/I/61PHbiG9eUL._AC_SX679_.jpg',
    url: 'https://www.amazon.com/Ultra-Pro-Rigid-Sleeves-200ct/dp/B000ETP9RG?tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },
  {
    id: 4,
    category: 'storage',
    name: 'Ultra Pro One-Touch Magnetic Holder 35pt',
    desc: 'Premium display and protection for key cards',
    img: 'https://placehold.co/400x400/EBF2FF/1B6FF0?text=One-Touch',
    url: 'https://www.amazon.com/s?k=ultra+pro+one+touch+magnetic+holder+35pt&tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },
  {
    id: 5,
    category: 'storage',
    name: 'BCW Resealable Team Bags',
    desc: 'Perfect for storing graded slabs and thick cards',
    img: 'https://placehold.co/400x400/EBF2FF/1B6FF0?text=Team+Bags',
    url: 'https://www.amazon.com/s?k=BCW+team+bags+trading+cards&tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },

  // Organization
  {
    id: 6,
    category: 'organization',
    name: 'Ultra Pro 9-Pocket Pages 100ct',
    desc: 'Side-loading pages for binders — holds 900 cards',
    img: 'https://placehold.co/400x400/E6F9F0/00A861?text=9-Pocket+Pages',
    url: 'https://www.amazon.com/s?k=ultra+pro+9+pocket+pages+100ct&tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },
  {
    id: 7,
    category: 'organization',
    name: 'Ultra Pro Pro-Binder',
    desc: 'Premium 3-ring binder built for trading cards',
    img: 'https://placehold.co/400x400/E6F9F0/00A861?text=Pro-Binder',
    url: 'https://www.amazon.com/s?k=ultra+pro+pro+binder+trading+cards&tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },
  {
    id: 8,
    category: 'organization',
    name: 'BCW 800ct Storage Box',
    desc: 'Sturdy cardboard box for bulk card storage',
    img: 'https://placehold.co/400x400/E6F9F0/00A861?text=800ct+Box',
    url: 'https://www.amazon.com/s?k=BCW+800+count+storage+box&tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },
  {
    id: 9,
    category: 'organization',
    name: 'BCW 5000ct Storage Box',
    desc: 'Large capacity storage for serious collectors',
    img: 'https://placehold.co/400x400/E6F9F0/00A861?text=5000ct+Box',
    url: 'https://www.amazon.com/s?k=BCW+5000+count+storage+box&tag=foilcase-20',
    badge: null,
    badgeColor: '',
    badgeBg: '',
  },

  // Grading & Submission
  {
    id: 10,
    category: 'grading',
    name: 'Ultra Pro Card Savers 200ct',
    desc: 'Semi-rigid holders required for PSA/BGS submissions',
    img: 'https://placehold.co/400x400/F2ECFB/7B4FCA?text=Card+Savers',
    url: 'https://www.amazon.com/s?k=ultra+pro+card+savers+semi+rigid+200ct&tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },
  {
    id: 11,
    category: 'grading',
    name: 'Bubble Mailers 6x9 50ct',
    desc: 'Padded mailers for safely shipping cards to graders',
    img: 'https://placehold.co/400x400/F2ECFB/7B4FCA?text=Bubble+Mailers',
    url: 'https://www.amazon.com/s?k=bubble+mailers+6x9+50+pack&tag=foilcase-20',
    badge: null,
    badgeColor: '',
    badgeBg: '',
  },
  {
    id: 12,
    category: 'grading',
    name: 'Trading Card Submission Box',
    desc: 'Sturdy boxes designed for grading submissions',
    img: 'https://placehold.co/400x400/F2ECFB/7B4FCA?text=Submission+Box',
    url: 'https://www.amazon.com/s?k=trading+card+grading+submission+box&tag=foilcase-20',
    badge: null,
    badgeColor: '',
    badgeBg: '',
  },

  // Display
  {
    id: 13,
    category: 'display',
    name: 'Ultra Pro Acrylic Display Case',
    desc: 'Crystal clear acrylic case for showcasing key cards',
    img: 'https://placehold.co/400x400/FEF3E2/E8820C?text=Display+Case',
    url: 'https://www.amazon.com/s?k=ultra+pro+acrylic+card+display+case&tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },
  {
    id: 14,
    category: 'display',
    name: 'Graded Card Slab Stand',
    desc: 'Display your PSA and BGS slabs on desk or shelf',
    img: 'https://placehold.co/400x400/FEF3E2/E8820C?text=Slab+Stand',
    url: 'https://www.amazon.com/s?k=graded+card+slab+display+stand&tag=foilcase-20',
    badge: null,
    badgeColor: '',
    badgeBg: '',
  },
  {
    id: 15,
    category: 'display',
    name: 'Trading Card Wall Display Frame',
    desc: 'Wall-mount frame to showcase your favorite cards',
    img: 'https://placehold.co/400x400/FEF3E2/E8820C?text=Display+Frame',
    url: 'https://www.amazon.com/s?k=trading+card+display+frame+wall+mount&tag=foilcase-20',
    badge: null,
    badgeColor: '',
    badgeBg: '',
  },

  // Shipping
  {
    id: 16,
    category: 'shipping',
    name: 'Bubble Mailers 6x9 50ct',
    desc: 'Standard padded mailers for eBay card sales',
    img: 'https://placehold.co/400x400/FDECEA/D93025?text=Bubble+Mailers',
    url: 'https://www.amazon.com/s?k=bubble+mailers+6x9+50+pack&tag=foilcase-20',
badge: null,
badgeColor: '',
badgeBg: '',
  },
  {
    id: 17,
    category: 'shipping',
    name: 'Small Cardboard Shipping Boxes',
    desc: 'For safely shipping valuable graded cards',
    img: 'https://placehold.co/400x400/FDECEA/D93025?text=Shipping+Boxes',
    url: 'https://www.amazon.com/s?k=small+cardboard+boxes+card+shipping&tag=foilcase-20',
    badge: null,
    badgeColor: '',
    badgeBg: '',
  },
  {
    id: 18,
    category: 'shipping',
    name: '"Do Not Bend" Self-Inking Stamp',
    desc: 'Protect your shipments from postal damage',
    img: 'https://placehold.co/400x400/FDECEA/D93025?text=DNB+Stamp',
    url: 'https://www.amazon.com/s?k=do+not+bend+stamp+self+inking&tag=foilcase-20',
    badge: null,
    badgeColor: '',
    badgeBg: '',
  },
]

export default function Supplies() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <>
      <style>{`
        .supplies-hero{background:#0D0D0D;padding:48px 24px;position:relative;overflow:hidden;text-align:center}
        .supplies-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .supplies-hero-inner{max-width:680px;margin:0 auto;position:relative;z-index:1}
        .supplies-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(27,111,240,.2);color:#7EB6FF;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:20px}
        .supplies-title{font-size:clamp(28px,5vw,42px);font-weight:800;color:#fff;letter-spacing:-1.5px;line-height:1.08;margin-bottom:12px}
        .supplies-title em{font-style:italic;color:#7EB6FF}
        .supplies-sub{font-size:15px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:8px}
        .supplies-disclosure{font-size:12px;color:rgba(255,255,255,.4);margin-top:8px}
        .supplies-layout{max-width:1100px;margin:0 auto;padding:32px 24px;display:grid;grid-template-columns:220px 1fr;gap:28px;align-items:start}
        .supplies-sidebar{position:sticky;top:78px;display:flex;flex-direction:column;gap:4px}
        .supplies-sidebar-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;margin-bottom:10px;padding:0 12px}
        .cat-btn{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;font-size:14px;font-weight:500;color:#555;cursor:pointer;transition:all .15s;border:none;background:transparent;font-family:'Plus Jakarta Sans',sans-serif;text-align:left;width:100%}
        .cat-btn:hover{background:#F7F7F7;color:#0D0D0D}
        .cat-btn.on{background:#EBF2FF;color:#1B6FF0;font-weight:600}
        .supplies-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
        .product-card{background:#fff;border:1px solid #EFEFEF;border-radius:12px;overflow:hidden;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;flex-direction:column}
        .product-card:hover{box-shadow:0 8px 28px rgba(0,0,0,.10);border-color:#D8D8D8;transform:translateY(-2px)}
.product-card:hover .product-link{gap:8px}
        .product-img{height:200px;display:flex;align-items:center;justify-content:center;background:#F7F7F7;overflow:hidden;position:relative;padding:16px}
        .product-img img{max-width:100%;max-height:100%;object-fit:contain}
        .product-badge{position:absolute;top:10px;left:10px;font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px}
        .product-body{padding:16px;flex:1;display:flex;flex-direction:column;gap:8px}
        .product-name{font-size:14px;font-weight:700;color:#0D0D0D;line-height:1.3}
        .product-desc{font-size:12px;color:#9A9A9A;line-height:1.5;flex:1}
        .product-btn{display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 16px;borderRadius:100px;background:#0D0D0D;color:#fff;border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;border-radius:100px;transition:all .15s;margin-top:4px}
        .product-btn:hover{background:#1B6FF0;color:#fff}
        .results-label{font-size:13px;color:#9A9A9A;margin-bottom:16px}
        @media(max-width:860px){.supplies-layout{grid-template-columns:1fr}.supplies-sidebar{position:static;flex-direction:row;flex-wrap:wrap;gap:6px;margin-bottom:8px}.cat-btn{width:auto;padding:6px 14px;border-radius:100px;border:1.5px solid #EFEFEF}.cat-btn.on{background:#0D0D0D;color:#fff;border-color:#0D0D0D}}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="supplies-hero">
        <div className="supplies-hero-inner">
          <div className="supplies-eyebrow">
            <FontAwesomeIcon icon={faShield}/>Collector Supplies
          </div>
          <h1 className="supplies-title">
            Everything a serious<br/><em>collector needs</em>
          </h1>
          <p className="supplies-sub">
            Supplies for storing, organizing, displaying, and shipping your trading card collection.
          </p>
          <p className="supplies-disclosure">
            As an Amazon Associate, Foilcase earns from qualifying purchases.
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="supplies-layout">

        {/* SIDEBAR */}
        <aside className="supplies-sidebar">
          <div className="supplies-sidebar-title">Browse by Category</div>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`cat-btn${activeCategory===cat.id?' on':''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <FontAwesomeIcon icon={cat.icon} style={{fontSize:'13px',width:'14px'}}/>
              {cat.label}
            </button>
          ))}
        </aside>

        {/* PRODUCTS */}
        <div>
          <div className="results-label">
            <strong style={{color:'#0D0D0D'}}>{filtered.length}</strong> product{filtered.length!==1?'s':''}{activeCategory!=='all'?` in ${categories.find(c=>c.id===activeCategory)?.label}`:''}
          </div>
          <div className="supplies-grid">
            {filtered.map(p => (
              <a key={p.id} className="product-card" href={p.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                <div className="product-img">

                  <img src={p.img} alt={p.name}/>
                </div>
                <div className="product-body">
                  <div className="product-name">{p.name}</div>
                  <div className="product-desc">{p.desc}</div>
                  <div className="product-link" style={{display:'inline-flex',alignItems:'center',gap:'4px',fontSize:'13px',fontWeight:600,color:'#1B6FF0',marginTop:'4px',transition:'gap .15s'}}>
  View on Amazon →
</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}