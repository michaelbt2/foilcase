'use client'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLayerGroup, faChartLine, faUsers, faMagnifyingGlass,
  faRocket, faShieldHalved, faStar, faTrophy, faMedal,
  faCrown, faTag, faArrowUpRightFromSquare, faGlobe,
  faChartBar, faFolder, faArrowRight, faBolt,
} from '@fortawesome/free-solid-svg-icons'

const sections = [
  { id: 'your-vault',   label: 'Your Vault' },
  { id: 'value',        label: 'Track Value' },
  { id: 'organize',     label: 'Organize' },
  { id: 'community',    label: 'Community' },
  { id: 'search',       label: 'Search' },
  { id: 'market',       label: 'Market' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'get-started',  label: 'Get Started' },
]

const TIERS = [
  { label:'Collector', min:1, max:24, icon:faLayerGroup, color:'#9A9A9A', bg:'#F7F7F7', border:'#E0E0E0' },
  { label:'Enthusiast', min:25, max:99, icon:faStar, color:'#1B6FF0', bg:'#EBF2FF', border:'#C5D8FF' },
  { label:'Veteran', min:100, max:249, icon:faMedal, color:'#7B4FCA', bg:'#F2ECFB', border:'#D4BAF0' },
  { label:'Elite', min:250, max:499, icon:faTrophy, color:'#E8820C', bg:'#FEF3E2', border:'#F5C880' },
  { label:'Legend', min:500, max:Infinity, icon:faCrown, color:'#F5A623', bg:'#FEF9EC', border:'#FDDBA0' },
]

function BrowserMockup({ src, alt, url }: { src: string, alt: string, url: string }) {
  return (
    <div style={{borderRadius:'12px',overflow:'hidden',border:'1px solid #EFEFEF',boxShadow:'0 8px 40px rgba(0,0,0,.10)',transform:'perspective(1000px) rotateX(2deg)',transformOrigin:'top center'}}>
      <div style={{background:'#E8E8E8',padding:'10px 14px',display:'flex',alignItems:'center',gap:'6px',borderBottom:'1px solid #D8D8D8'}}>
        <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#FF5F57',flexShrink:0}}/>
        <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#FFBD2E',flexShrink:0}}/>
        <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#28C840',flexShrink:0}}/>
        <div style={{flex:1,background:'#fff',borderRadius:'4px',padding:'3px 10px',fontSize:'11px',color:'#9A9A9A',marginLeft:'8px'}}>{url}</div>
      </div>
      <img src={src} alt={alt} style={{width:'100%',display:'block'}}/>
    </div>
  )
}

export default function StartHere() {
  const [active, setActive] = useState('your-vault')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <style>{`
        .sh-hero{background:#0D0D0D;padding:64px 24px;position:relative;overflow:hidden;text-align:center}
        .sh-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .sh-hero-inner{max-width:680px;margin:0 auto;position:relative;z-index:1}
        .sh-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(27,111,240,.2);color:#7EB6FF;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:20px}
        .sh-hero-title{font-size:clamp(28px,5vw,46px);font-weight:800;color:#fff;letter-spacing:-1.5px;line-height:1.08;margin-bottom:16px}
        .sh-hero-title em{font-style:italic;color:#7EB6FF}
        .sh-hero-sub{font-size:16px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:32px}
        .sh-layout{max-width:1100px;margin:0 auto;padding:48px 24px;display:grid;grid-template-columns:220px 1fr;gap:40px;align-items:start}
        .sh-nav{position:sticky;top:78px;display:flex;flex-direction:column;gap:2px}
        .sh-nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:14px;font-weight:500;color:#555;cursor:pointer;transition:all .15s;border:none;background:transparent;font-family:'Plus Jakarta Sans',sans-serif;text-align:left;width:100%}
        .sh-nav-item:hover{background:#F7F7F7;color:#0D0D0D}
        .sh-nav-item.on{background:#EBF2FF;color:#1B6FF0;font-weight:600}
        .sh-nav-dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0;opacity:.5}
        .sh-nav-item.on .sh-nav-dot{opacity:1}
        .sh-content{display:flex;flex-direction:column;gap:64px}
        .sh-section{scroll-margin-top:90px}
        .sh-section-eyebrow{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1B6FF0;margin-bottom:12px;display:flex;align-items:center;gap:6px}
        .sh-section-title{font-size:clamp(22px,3vw,32px);font-weight:800;letter-spacing:-1px;color:#0D0D0D;margin-bottom:12px;line-height:1.15}
        .sh-section-title em{font-style:italic;color:#1B6FF0}
        .sh-section-body{font-size:15px;color:#555;line-height:1.75;margin-bottom:24px}
        .sh-feature-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;margin-top:24px}
        .sh-feature{background:#fff;border:1px solid #EFEFEF;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .sh-feature-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
        .sh-feature-title{font-size:14px;font-weight:700;color:#0D0D0D;margin-bottom:6px}
        .sh-feature-desc{font-size:13px;color:#555;line-height:1.6}
        .sh-step{display:flex;gap:16px;padding:20px;background:#fff;border:1px solid #EFEFEF;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);margin-bottom:12px}
        .sh-step-num{width:32px;height:32px;border-radius:50%;background:#0D0D0D;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0}
        .sh-step-title{font-size:14px;font-weight:700;color:#0D0D0D;margin-bottom:4px}
        .sh-step-desc{font-size:13px;color:#555;line-height:1.6}
        .sh-cta{background:#0D0D0D;border-radius:16px;padding:48px;text-align:center;position:relative;overflow:hidden}
        .sh-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 600px 300px at 50% 100%,rgba(27,111,240,.25),transparent)}
        .sh-cta-title{font-size:clamp(24px,4vw,36px);font-weight:800;color:#fff;letter-spacing:-.8px;margin-bottom:10px;position:relative;z-index:1}
        .sh-cta-title em{font-style:italic;color:#7EB6FF}
        .sh-cta-sub{font-size:15px;color:rgba(255,255,255,.6);margin-bottom:28px;position:relative;z-index:1}
        .sh-cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
        .sh-divider{height:1px;background:#EFEFEF;margin:0}
        @media(max-width:860px){.sh-layout{grid-template-columns:1fr}.sh-nav{position:static;flex-direction:row;flex-wrap:wrap;gap:6px;margin-bottom:32px}.sh-nav-item{width:auto;padding:6px 12px}.sh-nav-dot{display:none}}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="sh-hero">
        <div className="sh-hero-inner">
          <div className="sh-eyebrow">
            <FontAwesomeIcon icon={faRocket}/>Welcome to foilcase
          </div>
          <h1 className="sh-hero-title">
            Your trading card collection,<br/><em>finally organized</em>
          </h1>
          <p className="sh-hero-sub">
            Foilcase is the modern home for your card collection — track every card, understand its value, and connect with collectors who share your passion.
          </p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/collection" className="btn btn-primary" style={{padding:'12px 24px',fontSize:'15px'}}>
              <FontAwesomeIcon icon={faRocket}/>Start your vault free
            </Link>
            <button
              onClick={() => scrollTo('your-vault')}
              className="btn btn-outline"
              style={{padding:'12px 24px',fontSize:'15px',background:'rgba(255,255,255,.08)',color:'#fff',borderColor:'rgba(255,255,255,.2)'}}
            >
              See how it works
            </button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="sh-layout">

        {/* LEFT NAV */}
        <nav className="sh-nav">
          {sections.map(s => (
            <button
              key={s.id}
              className={`sh-nav-item${active===s.id?' on':''}`}
              onClick={() => scrollTo(s.id)}
            >
              <div className="sh-nav-dot"/>
              {s.label}
            </button>
          ))}
        </nav>

        {/* CONTENT */}
        <div className="sh-content">

          {/* YOUR VAULT */}
          <div id="your-vault" className="sh-section">
            <div className="sh-section-eyebrow">
              <FontAwesomeIcon icon={faLayerGroup}/>The Foundation
            </div>
            <h2 className="sh-section-title">Your vault is your <em>collection home</em></h2>
            <p className="sh-section-body">
              Every collector needs a reliable place to keep track of what they own. Your foilcase vault is exactly that — a beautiful, searchable database of every card in your collection. Add cards manually or pull them directly from live eBay listings. Your vault works for any sport, any era, any format.
            </p>
            <div className="sh-feature-grid">
              {[
                { icon:faLayerGroup, color:'#1B6FF0', bg:'#EBF2FF', title:'Every card in one place', desc:'Football, basketball, baseball, hockey, Pokémon, Magic — your entire collection under one roof.' },
                { icon:faShieldHalved, color:'#00A861', bg:'#E6F9F0', title:'Public or private', desc:'Keep your vault private or share it with the world. You control who sees your collection.' },
                { icon:faTag, color:'#E8820C', bg:'#FEF3E2', title:'Track what matters', desc:'Condition, grading, cost paid, current value, status (owned, for sale, for trade, sold).' },
              ].map(f => (
                <div key={f.title} className="sh-feature">
                  <div className="sh-feature-icon" style={{background:f.bg}}>
                    <FontAwesomeIcon icon={f.icon} style={{color:f.color,fontSize:'18px'}}/>
                  </div>
                  <div className="sh-feature-title">{f.title}</div>
                  <div className="sh-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:'24px',display:'flex',gap:'10px'}}>
              <Link href="/collection" className="btn btn-primary">
                <FontAwesomeIcon icon={faArrowRight}/>Create my free vault
              </Link>
            </div>
          </div>

          {/* VAULT SCREENSHOT */}
          <BrowserMockup
            src="/images/vault-preview.png"
            alt="Foilcase vault page"
            url="foilcase.com/collection"
          />

          <div className="sh-divider"/>

          {/* TRACK VALUE */}
          <div id="value" className="sh-section">
            <div className="sh-section-eyebrow">
              <FontAwesomeIcon icon={faChartLine}/>Collection Value
            </div>
            <h2 className="sh-section-title">Always know what your collection is <em>worth</em></h2>
            <p className="sh-section-body">
              Every card you add can have a cost paid and current value attached to it. foilcase automatically calculates your total collection value, your total cost basis, and your overall gain or loss — giving you a real P&L view of your collection like a portfolio.
            </p>
            <div className="sh-feature-grid">
              {[
                { icon:faChartLine, color:'#00A861', bg:'#E6F9F0', title:'Real-time collection value', desc:'See the total estimated value of everything you own at a glance on your vault dashboard.' },
                { icon:faChartBar, color:'#1B6FF0', bg:'#EBF2FF', title:'P&L tracking', desc:'Know exactly what you paid, what it\'s worth today, and what you made when cards are sold.' },
                { icon:faBolt, color:'#F5A623', bg:'#FEF9EC', title:'Live eBay pricing', desc:'Search for any card and see real sold comps and active listing prices from eBay instantly.' },
              ].map(f => (
                <div key={f.title} className="sh-feature">
                  <div className="sh-feature-icon" style={{background:f.bg}}>
                    <FontAwesomeIcon icon={f.icon} style={{color:f.color,fontSize:'18px'}}/>
                  </div>
                  <div className="sh-feature-title">{f.title}</div>
                  <div className="sh-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sh-divider"/>

          {/* ORGANIZE */}
          <div id="organize" className="sh-section">
            <div className="sh-section-eyebrow">
              <FontAwesomeIcon icon={faFolder}/>Organization
            </div>
            <h2 className="sh-section-title">Organize your collection <em>your way</em></h2>
            <p className="sh-section-body">
              Whether you organize by player, by set, by sport, or by investment tier — foilcase gives you the tools to build a structure that makes sense for how you collect.
            </p>
            <div className="sh-step">
              <div className="sh-step-num">1</div>
              <div>
                <div className="sh-step-title">Create folders</div>
                <div className="sh-step-desc">Group cards into custom folders — "PC Cards", "For Trade", "Investment Pieces", anything you want.</div>
              </div>
            </div>
            <div className="sh-step">
              <div className="sh-step-num">2</div>
              <div>
                <div className="sh-step-title">Filter and sort</div>
                <div className="sh-step-desc">Filter by sport, grading status, condition, date added, or status. Sort by value, player name, or newest.</div>
              </div>
            </div>
            <div className="sh-step">
              <div className="sh-step-num">3</div>
              <div>
                <div className="sh-step-title">Upload card images</div>
                <div className="sh-step-desc">Add front and back photos of each card. Your vault becomes a beautiful visual gallery of your collection.</div>
              </div>
            </div>
            <div className="sh-step">
              <div className="sh-step-num">4</div>
              <div>
                <div className="sh-step-title">Mark cards for sale or trade</div>
                <div className="sh-step-desc">Set cards as For Sale (with your eBay listing URL) or For Trade so other collectors can find them in your public vault.</div>
              </div>
            </div>
          </div>

          <div className="sh-divider"/>

          {/* COMMUNITY */}
          <div id="community" className="sh-section">
            <div className="sh-section-eyebrow">
              <FontAwesomeIcon icon={faUsers}/>Community
            </div>
            <h2 className="sh-section-title">Show off your collection, <em>discover others</em></h2>
            <p className="sh-section-body">
              Make your vault public and join a growing community of collectors. Follow collectors whose taste you admire, discover cards for sale or trade in their vaults, and search for specific players across all public collections.
            </p>
            <div className="sh-feature-grid">
              {[
                { icon:faGlobe, color:'#1B6FF0', bg:'#EBF2FF', title:'Public vault', desc:'Share your vault at foilcase.com/vault/yourusername. Anyone can browse your collection.' },
                { icon:faUsers, color:'#7B4FCA', bg:'#F2ECFB', title:'Follow collectors', desc:'Follow collectors who inspire you. Build a feed of vaults worth watching.' },
                { icon:faMagnifyingGlass, color:'#00A861', bg:'#E6F9F0', title:'Search by player', desc:'Find which collectors own a specific player\'s cards across all public vaults.' },
              ].map(f => (
                <div key={f.title} className="sh-feature">
                  <div className="sh-feature-icon" style={{background:f.bg}}>
                    <FontAwesomeIcon icon={f.icon} style={{color:f.color,fontSize:'18px'}}/>
                  </div>
                  <div className="sh-feature-title">{f.title}</div>
                  <div className="sh-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:'24px',display:'flex',gap:'10px'}}>
              <Link href="/community" className="btn btn-primary">
                <FontAwesomeIcon icon={faArrowRight}/>Browse collectors
              </Link>
            </div>
          </div>

          {/* COMMUNITY SCREENSHOT */}
          <BrowserMockup
            src="/images/community-preview.png"
            alt="Foilcase community page"
            url="foilcase.com/community"
          />

          <div className="sh-divider"/>

          {/* SEARCH */}
          <div id="search" className="sh-section">
            <div className="sh-section-eyebrow">
              <FontAwesomeIcon icon={faMagnifyingGlass}/>Search
            </div>
            <h2 className="sh-section-title">Find any card with <em>live pricing</em></h2>
            <p className="sh-section-body">
              Search millions of cards by player name, set, year, or brand — powered by live eBay data. Every result shows real sold comps alongside active listing prices so you always know what a card is actually worth before you buy or sell.
            </p>
            <div className="sh-feature-grid">
              {[
                { icon:faMagnifyingGlass, color:'#1B6FF0', bg:'#EBF2FF', title:'Smart search', desc:'Search by player, set, year, brand, or card number. Results are ranked by data quality.' },
                { icon:faChartLine, color:'#00A861', bg:'#E6F9F0', title:'Sold comps', desc:'See average sold price, price range, and number of recent sales alongside active listings.' },
                { icon:faArrowUpRightFromSquare, color:'#E8820C', bg:'#FEF3E2', title:'Add to vault instantly', desc:'Found a card you own? Click "+ Vault" to add it directly from search results.' },
              ].map(f => (
                <div key={f.title} className="sh-feature">
                  <div className="sh-feature-icon" style={{background:f.bg}}>
                    <FontAwesomeIcon icon={f.icon} style={{color:f.color,fontSize:'18px'}}/>
                  </div>
                  <div className="sh-feature-title">{f.title}</div>
                  <div className="sh-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:'24px'}}>
              <Link href="/search" className="btn btn-primary">
                <FontAwesomeIcon icon={faMagnifyingGlass}/>Search cards
              </Link>
            </div>
          </div>

          <div className="sh-divider"/>

          {/* MARKET */}
          <div id="market" className="sh-section">
            <div className="sh-section-eyebrow">
              <FontAwesomeIcon icon={faBolt}/>Market
            </div>
            <h2 className="sh-section-title">Live market intelligence, <em>updated in real time</em></h2>
            <p className="sh-section-body">
              The Market page gives you a pulse on what's happening across the hobby right now. See active listings across popular players, filter by sport, and catch graded card auctions ending soon — all powered by live eBay data.
            </p>
            <div className="sh-feature-grid">
              {[
                { icon:faChartLine, color:'#1B6FF0', bg:'#EBF2FF', title:'On the market now', desc:'Active listings across popular players in Football, Basketball, Baseball, Hockey, Pokémon and more.' },
                { icon:faBolt, color:'#D93025', bg:'#FDECEA', title:'Ending soon', desc:'Graded card auctions ending within 2 hours — catch deals before they close.' },
                { icon:faChartBar, color:'#00A861', bg:'#E6F9F0', title:'Browse by sport', desc:'Filter listings by sport to focus on what matters to your collection.' },
              ].map(f => (
                <div key={f.title} className="sh-feature">
                  <div className="sh-feature-icon" style={{background:f.bg}}>
                    <FontAwesomeIcon icon={f.icon} style={{color:f.color,fontSize:'18px'}}/>
                  </div>
                  <div className="sh-feature-title">{f.title}</div>
                  <div className="sh-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:'24px'}}>
              <Link href="/market" className="btn btn-primary">
                <FontAwesomeIcon icon={faArrowRight}/>View market
              </Link>
            </div>
          </div>

          <div className="sh-divider"/>

          {/* ACHIEVEMENTS */}
          <div id="achievements" className="sh-section">
            <div className="sh-section-eyebrow">
              <FontAwesomeIcon icon={faTrophy}/>Achievements
            </div>
            <h2 className="sh-section-title">Level up as your collection <em>grows</em></h2>
            <p className="sh-section-body">
              foilcase rewards collectors who build serious collections. As you add cards to your vault you'll progress through five tiers — each one representing a deeper commitment to the hobby and unlocking community recognition.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:'8px'}}>
              {TIERS.map((tier, i) => (
                <div key={tier.label} style={{display:'flex',alignItems:'center',gap:'16px',padding:'16px 20px',background:'#fff',border:`1.5px solid ${tier.border}`,borderRadius:'10px',boxShadow:'0 1px 3px rgba(0,0,0,.06)'}}>
                  <div style={{width:'40px',height:'40px',borderRadius:'50%',background:tier.bg,display:'flex',alignItems:'center',justifyContent:'center',border:`2px solid ${tier.border}`,flexShrink:0}}>
                    <FontAwesomeIcon icon={tier.icon} style={{color:tier.color,fontSize:'18px'}}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'15px',fontWeight:700,color:tier.color,marginBottom:'2px'}}>{tier.label}</div>
                    <div style={{fontSize:'13px',color:'#555'}}>{tier.max===Infinity?`${tier.min}+ cards in your vault`:`${tier.min}–${tier.max} cards in your vault`}</div>
                  </div>
                  <div style={{fontSize:'12px',fontWeight:700,color:tier.color,background:tier.bg,padding:'4px 10px',borderRadius:'100px',border:`1px solid ${tier.border}`}}>
                    {['Just starting','Building momentum','Serious collector','Elite collector','Hall of Fame'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sh-divider"/>

          {/* GET STARTED */}
          <div id="get-started" className="sh-section">
            <div className="sh-cta">
              <h2 className="sh-cta-title">Ready to build your <em>dream vault?</em></h2>
              <p className="sh-cta-sub">Free to start. No credit card required. Your collection deserves a proper home.</p>
              <div className="sh-cta-actions">
                <Link href="/collection" className="btn btn-white" style={{padding:'12px 24px',fontSize:'15px',background:'#fff',color:'#0D0D0D'}}>
                  <FontAwesomeIcon icon={faRocket}/>Start your vault free
                </Link>
                <Link href="/community" className="btn btn-dim" style={{padding:'12px 24px',fontSize:'15px'}}>
                  <FontAwesomeIcon icon={faUsers}/>Browse collectors
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}