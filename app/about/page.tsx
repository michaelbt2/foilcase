'use client'
import Nav from '../components/Nav'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../components/Footer'
import {
  faLayerGroup, faChartLine, faUsers, faRocket,
  faHeart, faStar, faTrophy, faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

export default function About() {
  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#fff;color:#0D0D0D;-webkit-font-smoothing:antialiased}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 16px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .15s;border:none;white-space:nowrap}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF;transform:translateY(-1px)}
        .btn-outline{background:transparent;color:#0D0D0D;border:1.5px solid #D8D8D8}
        .btn-outline:hover{border-color:#0D0D0D}
        .about-hero{background:#0D0D0D;padding:80px 24px;position:relative;overflow:hidden;text-align:center}
        .about-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .about-hero-inner{max-width:680px;margin:0 auto;position:relative;z-index:1}
        .about-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(27,111,240,.2);color:#7EB6FF;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:20px}
        .about-hero-title{font-size:clamp(32px,5vw,52px);font-weight:800;color:#fff;letter-spacing:-1.5px;line-height:1.08;margin-bottom:20px}
        .about-hero-title em{font-style:italic;color:#7EB6FF}
        .about-hero-sub{font-size:17px;color:rgba(255,255,255,.6);line-height:1.7;max-width:560px;margin:0 auto}
        .section{padding:72px 24px}
        .section-inner{max-width:1100px;margin:0 auto}
        .section-inner-narrow{max-width:720px;margin:0 auto}
        .mission-card{background:#F7F7F7;border-radius:20px;padding:48px;display:flex;gap:32px;align-items:flex-start}
        .mission-icon{width:56px;height:56px;background:#EBF2FF;border-radius:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .mission-title{font-size:24px;font-weight:800;letter-spacing:-.5px;margin-bottom:12px}
        .mission-text{font-size:16px;color:#555;line-height:1.75}
        .values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
        .value-card{background:#fff;border:1px solid #EFEFEF;border-radius:16px;padding:28px;box-shadow:0 1px 3px rgba(0,0,0,.06);transition:all .2s}
        .value-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.08);border-color:#D8D8D8}
        .value-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
        .value-title{font-size:17px;font-weight:700;margin-bottom:8px}
        .value-text{font-size:14px;color:#555;line-height:1.65}
        .who-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px}
        .who-card{border-radius:16px;padding:32px;display:flex;gap:20px;align-items:flex-start}
        .who-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:22px}
        .who-title{font-size:18px;font-weight:700;margin-bottom:8px}
        .who-text{font-size:14px;line-height:1.65}
        .cta-section{background:#0D0D0D;border-radius:20px;padding:64px 56px;text-align:center;position:relative;overflow:hidden}
        .cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 600px 400px at 50% 100%,rgba(27,111,240,.25),transparent)}
        .cta-title{font-size:36px;font-weight:800;color:#fff;letter-spacing:-.8px;margin-bottom:12px;position:relative;z-index:1}
        .cta-title em{font-style:italic;color:#7EB6FF}
        .cta-sub{font-size:16px;color:rgba(255,255,255,.6);margin-bottom:32px;position:relative;z-index:1}
        .cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
        .btn-white{background:#fff;color:#0D0D0D}
        .btn-white:hover{background:#F7F7F7;transform:translateY(-1px)}
        .btn-dim{background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.2)}
        .btn-dim:hover{background:rgba(255,255,255,.15)}
        .divider{height:1px;background:#EFEFEF;margin:0}
        @media(max-width:860px){.values-grid{grid-template-columns:1fr}.who-grid{grid-template-columns:1fr}.mission-card{flex-direction:column}.cta-section{padding:40px 28px}}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="about-hero">
        <div className="about-hero-inner">
          <div className="about-eyebrow">
            <FontAwesomeIcon icon={faHeart}/>Our Story
          </div>
          <h1 className="about-hero-title">Built by collectors, <em>for collectors</em></h1>
          <p className="about-hero-sub">
            Foilcase was founded to give every collector — young and old — a better way to track, value, and share the cards they love most.
          </p>
        </div>
      </div>

      {/* MISSION */}
      <section className="section" style={{background:'#fff'}}>
        <div className="section-inner">
          <div className="mission-card">
            <div className="mission-icon">
              <FontAwesomeIcon icon={faRocket} style={{color:'#1B6FF0',fontSize:'24px'}}/>
            </div>
            <div>
              <div className="mission-title">Our Mission</div>
              <p className="mission-text">
                The trading card hobby has exploded in recent years — but the tools available to collectors haven't kept up. Spreadsheets, sticky notes, and memory aren't good enough for collections that matter.
              </p>
              <p className="mission-text" style={{marginTop:'16px'}}>
                Foilcase was built to change that. We give collectors a beautiful, simple place to catalog their most prized cards, track real market values, understand their profit and loss when cards are sold, and show off their collections to the community. Whether you collect Pokémon, sports cards, or anything in between — your collection deserves a proper home.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* VALUES */}
      <section className="section" style={{background:'#fff'}}>
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'8px'}}>
            <div style={{fontSize:'12px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#1B6FF0',marginBottom:'12px'}}>What we believe</div>
            <h2 style={{fontSize:'clamp(28px,4vw,38px)',fontWeight:800,letterSpacing:'-1px',marginBottom:'16px'}}>Built around what matters to collectors</h2>
            <p style={{fontSize:'16px',color:'#555',maxWidth:'520px',margin:'0 auto',lineHeight:1.65}}>Every decision we make starts with one question — does this make collecting more enjoyable?</p>
          </div>
          <div className="values-grid">
            {[
              {
                icon: faLayerGroup, color:'#1B6FF0', bg:'#EBF2FF',
                title:'Your collection, organized',
                text:'Every card you own in one place. Search, filter, sort, and browse your vault the way you want. No more spreadsheets or guesswork.'
              },
              {
                icon: faChartLine, color:'#00A861', bg:'#E6F9F0',
                title:'Real market data',
                text:'Live eBay pricing so you always know what your cards are worth. Track value over time and understand your collection\'s true market position.'
              },
              {
                icon: faUsers, color:'#7B4FCA', bg:'#F2ECFB',
                title:'Community first',
                text:'Collecting is better together. Follow other collectors, discover new vaults, and connect with people who share your passion for the hobby.'
              },
              {
                icon: faStar, color:'#F5A623', bg:'#FEF9EC',
                title:'Achievements that mean something',
                text:'Level up as your collection grows. From Collector to Legend — your tier reflects your dedication to the hobby and unlocks community recognition.'
              },
              {
                icon: faTrophy, color:'#E8820C', bg:'#FEF3E2',
                title:'P&L that\'s actually useful',
                text:'Know exactly what you paid, what it\'s worth today, and what you made when you sell. Make smarter decisions about buying and selling.'
              },
              {
                icon: faHeart, color:'#D93025', bg:'#FDECEA',
                title:'Free to start',
                text:'We believe every collector deserves access to great tools regardless of the size of their collection or their budget. Start your vault free today.'
              },
            ].map(v => (
              <div key={v.title} className="value-card">
                <div className="value-icon" style={{background:v.bg}}>
                  <FontAwesomeIcon icon={v.icon} style={{color:v.color,fontSize:'18px'}}/>
                </div>
                <div className="value-title">{v.title}</div>
                <div className="value-text">{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* WHO IT'S FOR */}
      <section className="section" style={{background:'#F7F7F7'}}>
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'8px'}}>
            <div style={{fontSize:'12px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#1B6FF0',marginBottom:'12px'}}>Who it's for</div>
            <h2 style={{fontSize:'clamp(28px,4vw,38px)',fontWeight:800,letterSpacing:'-1px',marginBottom:'16px'}}>Every kind of collector</h2>
            <p style={{fontSize:'16px',color:'#555',maxWidth:'520px',margin:'0 auto',lineHeight:1.65}}>From kids opening their first pack to seasoned investors managing high-value portfolios.</p>
          </div>
          <div className="who-grid">
            {[
              {
                emoji:'🏈', bg:'#EBF2FF', color:'#1B6FF0',
                title:'Sports card collectors',
                text:'Football, basketball, baseball, hockey, soccer — track every rookie card, auto, and numbered parallel across every sport you collect. Know what every card is worth today.'
              },
              {
                emoji:'🎮', bg:'#FDECEA', color:'#D93025',
                title:'TCG & Gaming collectors',
                text:'Pokémon, Magic the Gathering, Lorcana, and beyond. Your TCG collection deserves the same care as any sports collection. Track every holo, PSA slab, and chase card.'
              },
              {
                emoji:'📈', bg:'#E6F9F0', color:'#00A861',
                title:'Card investors',
                text:'Buy low, sell high — and actually know if you did. Foilcase tracks your cost basis, current market value, and realized gains so your collection works like a portfolio.'
              },
              {
                emoji:'🧒', bg:'#FEF9EC', color:'#F5A623',
                title:'New collectors',
                text:'Just getting started? Foilcase is the perfect companion from day one. Build your vault, learn what your cards are worth, and connect with a community that loves the hobby as much as you do.'
              },
            ].map(w => (
              <div key={w.title} className="who-card" style={{background:'#fff',border:'1px solid #EFEFEF',boxShadow:'0 1px 3px rgba(0,0,0,.06)'}}>
                <div className="who-icon" style={{background:w.bg}}>
                  <span>{w.emoji}</span>
                </div>
                <div>
                  <div className="who-title">{w.title}</div>
                  <div className="who-text" style={{color:'#555'}}>{w.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* CTA */}
      <section className="section" style={{background:'#F7F7F7'}}>
        <div className="section-inner">
          <div className="cta-section">
            <h2 className="cta-title">Ready to build your <em>dream vault?</em></h2>
            <p className="cta-sub">Join collectors tracking their most prized cards. Start free — no credit card required.</p>
            <div className="cta-actions">
              <Link className="btn btn-white" style={{padding:'12px 24px',fontSize:'15px'}} href="/collection">
                <FontAwesomeIcon icon={faRocket}/>Start your vault free
              </Link>
              <Link className="btn btn-dim" style={{padding:'12px 24px',fontSize:'15px'}} href="/community">
                <FontAwesomeIcon icon={faUsers}/>Browse collectors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}