'use client'
import Nav from './components/Nav'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [activeSport, setActiveSport] = useState('⚾ Baseball')
  const [searchVal, setSearchVal] = useState('')
  const [showResults, setShowResults] = useState(false)

  const sports = ['⚾ Baseball','🏈 Football','🏀 Basketball','🏒 Hockey','⚽ Soccer','🎮 Gaming / TCG']

  return (
    <>
      <style>{`
        nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--gray-2);
        }
        .nav-inner {
          max-width: var(--max-w); margin: 0 auto;
          padding: 0 24px; height: 60px;
          display: flex; align-items: center; gap: 32px;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none; color: var(--ink);
          font-weight: 800; font-size: 17px;
          letter-spacing: -0.4px; flex-shrink: 0;
        }
        .nav-logo-icon {
          width: 28px; height: 28px;
          background: var(--blue); border-radius: 7px;
          display: flex; align-items: center;
          justify-content: center; color: white; font-size: 14px;
        }
        .nav-links {
          display: flex; gap: 4px; list-style: none; flex: 1;
        }
        .nav-links a {
          text-decoration: none; color: var(--gray-5);
          font-size: 14px; font-weight: 500;
          padding: 6px 10px; border-radius: 6px;
          transition: all 0.15s;
        }
        .nav-links a:hover { color: var(--ink); background: var(--gray-1); }
        .nav-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .btn {
          display: inline-flex; align-items: center;
          justify-content: center; gap: 6px;
          padding: 8px 16px; border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: all 0.15s; border: none; white-space: nowrap;
        }
        .btn-ghost { background: transparent; color: var(--gray-5); }
        .btn-ghost:hover { background: var(--gray-1); color: var(--ink); }
        .btn-outline {
          background: transparent; color: var(--ink);
          border: 1.5px solid var(--gray-3);
        }
        .btn-outline:hover { border-color: var(--ink); }
        .btn-primary { background: var(--blue); color: white; }
        .btn-primary:hover {
          background: var(--blue-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(27,111,240,0.35);
        }
        .btn-xl { padding: 14px 28px; font-size: 16px; }
        .hero {
          max-width: var(--max-w); margin: 0 auto;
          padding: 96px 24px 80px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 64px; align-items: center;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--blue-light); color: var(--blue);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 100px; margin-bottom: 20px;
        }
        .hero h1 {
          font-size: clamp(36px, 5vw, 56px); font-weight: 800;
          line-height: 1.08; letter-spacing: -1.5px;
          color: var(--ink); margin-bottom: 20px;
        }
        .hero h1 em {
          font-family: 'Instrument Serif', serif;
          font-style: italic; font-weight: 400; color: var(--blue);
        }
        .hero-sub {
          font-size: 17px; color: var(--gray-5);
          line-height: 1.65; margin-bottom: 32px; max-width: 440px;
        }
        .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .hero-stats {
          display: flex; gap: 32px; margin-top: 48px;
          padding-top: 28px; border-top: 1px solid var(--gray-2);
        }
        .hero-stat-val {
          font-size: 22px; font-weight: 800;
          letter-spacing: -0.5px; color: var(--ink);
        }
        .hero-stat-lbl { font-size: 12px; color: var(--gray-4); margin-top: 2px; }
        .hero-visual { position: relative; }
        .card-vault-ui {
          background: var(--gray-1); border: 1px solid var(--gray-2);
          border-radius: 24px; padding: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          animation: floatUI 6s ease-in-out infinite;
        }
        @keyframes floatUI {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .ui-search {
          background: white; border: 1px solid var(--gray-2);
          border-radius: 10px; padding: 10px 14px;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 14px; font-size: 13px; color: var(--gray-4);
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .ui-cards-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;
          margin-bottom: 14px;
        }
        .ui-card {
          background: white; border-radius: 10px; overflow: hidden;
          border: 1px solid var(--gray-2);
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          transition: transform 0.2s;
        }
        .ui-card:hover { transform: translateY(-3px); }
        .ui-card-img {
          height: 80px; display: flex;
          align-items: center; justify-content: center; font-size: 28px;
          position: relative;
        }
        .ui-card-badge {
          position: absolute; top: 6px; right: 6px;
          font-size: 9px; font-weight: 700; padding: 2px 5px;
          border-radius: 4px;
        }
        .badge-blue { background: var(--blue); color: white; }
        .badge-green { background: var(--green); color: white; }
        .badge-amber { background: var(--amber); color: white; }
        .ui-card-body { padding: 8px 10px 10px; }
        .ui-card-name { font-size: 11px; font-weight: 700; color: var(--ink); }
        .ui-card-set { font-size: 10px; color: var(--gray-4); margin-top: 1px; }
        .ui-card-price { font-size: 11px; font-weight: 700; color: var(--blue); margin-top: 4px; }
        .ui-progress-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: var(--gray-5);
        }
        .ui-progress-bar {
          flex: 1; height: 5px; background: var(--gray-2);
          border-radius: 10px; overflow: hidden;
        }
        .ui-progress-fill { height: 100%; background: var(--blue); border-radius: 10px; }
        .floating-badge {
          position: absolute; background: white;
          border: 1px solid var(--gray-2); border-radius: 10px;
          padding: 8px 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          font-size: 12px; font-weight: 600;
          display: flex; align-items: center; gap: 6px;
        }
        .badge-tl { top: -16px; left: -24px; animation: floatBadge 4s ease-in-out infinite; }
        .badge-br { bottom: -16px; right: -20px; animation: floatBadge 4s ease-in-out infinite 1.5s; }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .logo-bar {
          border-top: 1px solid var(--gray-2);
          border-bottom: 1px solid var(--gray-2);
          background: var(--gray-1); padding: 20px 24px;
        }
        .logo-bar-inner {
          max-width: var(--max-w); margin: 0 auto;
          display: flex; align-items: center; gap: 16px;
        }
        .logo-bar-label { font-size: 12px; color: var(--gray-4); font-weight: 600; white-space: nowrap; }
        .sport-pill {
          padding: 5px 14px; background: white;
          border: 1px solid var(--gray-2); border-radius: 100px;
          font-size: 13px; font-weight: 600; color: var(--gray-5);
          cursor: pointer; transition: all 0.15s; white-space: nowrap;
          font-family: inherit;
        }
        .sport-pill:hover { background: var(--ink); color: white; border-color: var(--ink); }
        .sport-pill.active { background: var(--ink); color: white; border-color: var(--ink); }
        .section { padding: 80px 24px; }
        .section-inner { max-width: var(--max-w); margin: 0 auto; }
        .section-eyebrow {
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--blue); margin-bottom: 12px;
        }
        .section-title {
          font-size: clamp(28px, 4vw, 40px); font-weight: 800;
          letter-spacing: -1px; line-height: 1.12;
          color: var(--ink); margin-bottom: 16px;
        }
        .section-title em {
          font-family: 'Instrument Serif', serif;
          font-style: italic; font-weight: 400; color: var(--blue);
        }
        .section-sub {
          font-size: 16px; color: var(--gray-5);
          line-height: 1.65; max-width: 520px; margin-bottom: 48px;
        }
        .steps {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 24px;
        }
        .step {
          padding: 28px; border: 1px solid var(--gray-2);
          border-radius: 20px; background: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          transition: all 0.2s;
        }
        .step:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .step-num {
          width: 36px; height: 36px; background: var(--ink);
          color: white; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 800; margin-bottom: 16px;
        }
        .step-title { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
        .step-desc { font-size: 14px; color: var(--gray-5); line-height: 1.6; }
        .search-hero {
          background: white; border: 1.5px solid var(--gray-2);
          border-radius: 20px; padding: 6px 6px 6px 20px;
          display: flex; align-items: center; gap: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          max-width: 640px; margin-bottom: 20px; transition: all 0.15s;
        }
        .search-hero:focus-within {
          border-color: var(--blue);
          box-shadow: 0 0 0 4px rgba(27,111,240,0.12);
        }
        .search-hero input {
          flex: 1; border: none; outline: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px; color: var(--ink); background: transparent;
        }
        .search-hero input::placeholder { color: var(--gray-4); }
        .filter-chip {
          padding: 5px 12px; background: var(--gray-1);
          border: 1px solid var(--gray-2); border-radius: 100px;
          font-size: 12px; font-weight: 600; color: var(--gray-5);
          cursor: pointer; transition: all 0.15s; font-family: inherit;
        }
        .filter-chip:hover { background: var(--gray-2); color: var(--ink); }
        .filter-chip.active { background: var(--blue-light); color: var(--blue); border-color: var(--blue-mid); }
        .search-results {
          background: white; border: 1.5px solid var(--gray-2);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08); margin-top: 16px;
        }
        .search-results-header {
          padding: 10px 16px; background: var(--gray-1);
          border-bottom: 1px solid var(--gray-2);
          font-size: 12px; color: var(--gray-4); font-weight: 600;
        }
        .search-result-item {
          padding: 14px 16px; border-bottom: 1px solid var(--gray-2);
          display: flex; align-items: center; gap: 12px; cursor: pointer;
          transition: background 0.12s;
        }
        .search-result-item:last-child { border-bottom: none; }
        .search-result-item:hover { background: var(--gray-1); }
        .testimonials-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 16px;
        }
        .testimonial {
          background: white; border: 1px solid var(--gray-2);
          border-radius: 20px; padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          transition: all 0.2s;
        }
        .testimonial:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .testimonial-stars { color: #F5A623; font-size: 13px; letter-spacing: 1px; margin-bottom: 12px; }
        .testimonial-text {
          font-size: 14px; color: var(--gray-5);
          line-height: 1.65; margin-bottom: 16px; font-style: italic;
        }
        .testimonial-author { display: flex; align-items: center; gap: 10px; }
        .author-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 13px; color: white;
        }
        .author-name { font-size: 13px; font-weight: 700; color: var(--ink); }
        .author-handle { font-size: 12px; color: var(--gray-4); }
        .pricing-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 16px;
        }
        .pricing-card {
          background: white; border: 1.5px solid var(--gray-2);
          border-radius: 20px; padding: 28px; transition: all 0.2s; position: relative;
        }
        .pricing-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .pricing-card.featured { border-color: var(--blue); box-shadow: 0 0 0 4px rgba(27,111,240,0.08); }
        .pricing-popular {
          position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
          background: var(--blue); color: white; font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 100px; white-space: nowrap;
        }
        .plan-name {
          font-size: 13px; font-weight: 700; color: var(--gray-4);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;
        }
        .plan-price {
          font-size: 40px; font-weight: 800; letter-spacing: -1.5px;
          color: var(--ink); line-height: 1; margin-bottom: 4px;
        }
        .plan-price span { font-size: 16px; font-weight: 500; color: var(--gray-4); letter-spacing: 0; }
        .plan-desc { font-size: 13px; color: var(--gray-4); margin-bottom: 20px; }
        .plan-divider { height: 1px; background: var(--gray-2); margin-bottom: 20px; }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .plan-features li {
          font-size: 13.5px; color: var(--gray-5);
          display: flex; gap: 8px; align-items: flex-start;
        }
        .plan-features li::before { content: '✓'; color: var(--green); font-weight: 700; font-size: 13px; margin-top: 1px; flex-shrink: 0; }
        .plan-features li.dim { color: var(--gray-3); }
        .plan-features li.dim::before { color: var(--gray-3); }
        .cta-banner {
          background: var(--ink); border-radius: 20px;
          padding: 64px 56px; display: flex;
          align-items: center; justify-content: space-between;
          gap: 32px; position: relative; overflow: hidden;
        }
        .cta-banner::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 600px 400px at 80% 50%, rgba(27,111,240,0.25), transparent);
          pointer-events: none;
        }
        .cta-text h2 {
          font-size: 36px; font-weight: 800; color: white;
          letter-spacing: -0.8px; margin-bottom: 10px;
        }
        .cta-text h2 em {
          font-family: 'Instrument Serif', serif;
          font-style: italic; font-weight: 400; color: #7EB6FF;
        }
        .cta-text p { font-size: 15px; color: rgba(255,255,255,0.6); }
        .cta-actions { display: flex; gap: 10px; flex-shrink: 0; }
        .btn-white { background: white; color: var(--ink); }
        .btn-white:hover { background: var(--gray-1); transform: translateY(-1px); }
        .btn-dim {
          background: rgba(255,255,255,0.1); color: white;
          border: 1.5px solid rgba(255,255,255,0.2);
        }
        .btn-dim:hover { background: rgba(255,255,255,0.15); }
        footer { border-top: 1px solid var(--gray-2); padding: 48px 24px 32px; }
        .footer-inner { max-width: var(--max-w); margin: 0 auto; }
        .footer-grid {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px; margin-bottom: 40px;
        }
        .footer-brand-desc {
          font-size: 14px; color: var(--gray-4);
          line-height: 1.65; margin-top: 12px; max-width: 240px;
        }
        .footer-col-title {
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--gray-4); margin-bottom: 16px;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-links a { font-size: 14px; color: var(--gray-5); transition: color 0.15s; }
        .footer-links a:hover { color: var(--ink); }
        .footer-bottom {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 24px; border-top: 1px solid var(--gray-2);
          font-size: 13px; color: var(--gray-4);
        }
        @media (max-width: 860px) {
          .hero { grid-template-columns: 1fr; gap: 40px; padding: 48px 20px 40px; }
          .hero-visual { display: none; }
          .steps { grid-template-columns: 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .pricing-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .cta-banner { flex-direction: column; padding: 40px 28px; text-align: center; }
          .cta-actions { justify-content: center; }
        }
      `}</style>

      {/* NAV */}
      <Nav />

      {/* HERO */}
      <div className="hero">
        <div>
          <div className="hero-eyebrow">
            <span style={{width:6,height:6,borderRadius:'50%',background:'var(--blue)',display:'inline-block'}}></span>
            Now in public beta
          </div>
          <h1>The trading card vault <em>built for collectors</em></h1>
          <p className="hero-sub">Track your collection, discover every set, and trade with confidence. The definitive database for sports, gaming, and non-sport cards.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-xl" href="/collection">Start your vault free</Link>
            <Link className="btn btn-outline btn-xl" href="/browse">Browse cards</Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-val">2.4M+</div>
              <div className="hero-stat-lbl">Cards in database</div>
            </div>
            <div>
              <div className="hero-stat-val">18K+</div>
              <div className="hero-stat-lbl">Sets catalogued</div>
            </div>
            <div>
              <div className="hero-stat-val">Free</div>
              <div className="hero-stat-lbl">To start collecting</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div style={{position:'relative',padding:'20px'}}>
            <div className="floating-badge badge-tl">
              <span>✅</span> 847 cards tracked
            </div>
            <div className="card-vault-ui">
              <div className="ui-search">
                <span>🔍</span>
                <span>Search 2.4M cards...</span>
              </div>
              <div className="ui-cards-grid">
                {[
                  {emoji:'⚾',bg:'linear-gradient(135deg,#EBF2FF,#D0E4FF)',badge:'AUTO',badgeClass:'badge-blue',name:'Shohei Ohtani',set:'2024 Topps Chrome',price:'$340'},
                  {emoji:'🏀',bg:'linear-gradient(135deg,#E6F9F0,#B8EDD6)',badge:'RC',badgeClass:'badge-green',name:'V. Wembanyama',set:'2023 Panini Prizm',price:'$180'},
                  {emoji:'🏈',bg:'linear-gradient(135deg,#FEF3E2,#FDDBA0)',badge:'/25',badgeClass:'badge-amber',name:'P. Mahomes',set:'2023 Select Gold',price:'$520'},
                ].map((card,i) => (
                  <div className="ui-card" key={i}>
                    <div className="ui-card-img" style={{background:card.bg}}>
                      {card.emoji}
                      <span className={`ui-card-badge ${card.badgeClass}`}>{card.badge}</span>
                    </div>
                    <div className="ui-card-body">
                      <div className="ui-card-name">{card.name}</div>
                      <div className="ui-card-set">{card.set}</div>
                      <div className="ui-card-price">{card.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:'white',border:'1px solid var(--gray-2)',borderRadius:'10px',padding:'12px',boxShadow:'0 1px 3px rgba(0,0,0,0.05)'}}>
                <div style={{fontSize:'11px',fontWeight:700,color:'var(--gray-5)',marginBottom:'8px'}}>Set Completion</div>
                {[
                  {label:'2024 Topps Series 1',pct:78},
                  {label:'2023 Prizm Basketball',pct:45},
                ].map((row,i) => (
                  <div className="ui-progress-row" key={i} style={{marginBottom: i===0?'6px':0}}>
                    <span style={{fontSize:'11px',minWidth:'110px'}}>{row.label}</span>
                    <div className="ui-progress-bar">
                      <div className="ui-progress-fill" style={{width:`${row.pct}%`}}></div>
                    </div>
                    <span>{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="floating-badge badge-br">
              <span style={{color:'var(--green)'}}>↑</span> $4,280 collection value
            </div>
          </div>
        </div>
      </div>

      {/* SPORT PILLS */}
      <div className="logo-bar">
        <div className="logo-bar-inner">
          <span className="logo-bar-label">Browse by sport</span>
          <div style={{width:'1px',height:'24px',background:'var(--gray-3)',flexShrink:0}}></div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {sports.map(s => (
              <button
                key={s}
                className={`sport-pill${activeSport===s?' active':''}`}
                onClick={() => setActiveSport(s)}
              >{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <section className="section" style={{background:'var(--gray-1)'}}>
        <div className="section-inner">
          <div style={{maxWidth:'720px',margin:'0 auto',textAlign:'center'}}>
            <div className="section-eyebrow">Powerful Search</div>
            <h2 className="section-title">Find any card <em>instantly</em></h2>
            <p className="section-sub" style={{margin:'0 auto 36px'}}>Search across 2.4 million cards by player, year, brand, set, parallel, or card number.</p>
          </div>
          <div style={{maxWidth:'640px',margin:'0 auto'}}>
            <div className="search-hero">
              <span style={{fontSize:'18px'}}>🔍</span>
              <input
                type="text"
                placeholder='Search by player, set, card number...'
                value={searchVal}
                onChange={e => { setSearchVal(e.target.value); setShowResults(e.target.value.length > 1); }}
              />
              <a className="btn btn-primary" style={{padding:'8px 18px',fontSize:'14px'}} href="#">Search</a>
            </div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {['All Sports','⚾ Baseball','🏈 Football','🏀 Basketball','🎮 Gaming','Rookie Cards','Autographs'].map((chip,i) => (
                <button key={chip} className={`filter-chip${i===0?' active':''}`}>{chip}</button>
              ))}
            </div>
            {showResults && (
              <div className="search-results">
                <div className="search-results-header">3 results found</div>
                {[
                  {emoji:'⚾',name:'Shohei Ohtani RC Auto',set:'2018 Topps Chrome · #SP-SO · /99',price:'$2,100'},
                  {emoji:'⚾',name:'Shohei Ohtani Gold Parallel',set:'2024 Topps Chrome · #200 · /50',price:'$890'},
                  {emoji:'⚾',name:'Shohei Ohtani Base Card',set:'2024 Topps Series 1 · #150',price:'$12'},
                ].map((r,i) => (
                  <div className="search-result-item" key={i}>
                    <span style={{fontSize:'24px'}}>{r.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:'14px',fontWeight:700}}>{r.name}</div>
                      <div style={{fontSize:'12px',color:'var(--gray-4)'}}>{r.set}</div>
                    </div>
                    <div style={{fontSize:'14px',fontWeight:800,color:'var(--blue)'}}>{r.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{background:'white'}}>
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'56px'}}>
            <div className="section-eyebrow">How it works</div>
            <h2 className="section-title">Start collecting in <em>minutes</em></h2>
            <p className="section-sub" style={{margin:'0 auto'}}>FoilCase makes it effortless to catalog, track, and grow your collection — whether you have 10 cards or 10,000.</p>
          </div>
          <div className="steps">
            {[
              {n:'1',title:'Create your free vault',desc:'Sign up in seconds with your email or Google account. No credit card required to start tracking your collection.'},
              {n:'2',title:'Search and add cards',desc:'Find any card from our database of 2.4M+ cards. Add to your vault with condition, grade, and notes in one click.'},
              {n:'3',title:'Track, trade, and grow',desc:'Monitor set completion, discover your collection\'s value, and connect with other collectors to find your next great card.'},
            ].map(step => (
              <div className="step" key={step.n}>
                <div className="step-num">{step.n}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{background:'var(--gray-1)'}}>
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div className="section-eyebrow">Community</div>
            <h2 className="section-title">Loved by <em>collectors</em></h2>
          </div>
          <div className="testimonials-grid">
            {[
              {initials:'TK',bg:'var(--blue)',text:'"Finally a card database that actually has everything. I searched for a 1987 Topps error card I\'ve had for years and it was right there with front and back images."',name:'Tom K.',handle:'Baseball collector · 12 years'},
              {initials:'MR',bg:'var(--green)',text:'"The set completion tracker is a game changer. I can finally see exactly which cards I need to finish my 2023 Prizm basketball set without keeping a spreadsheet."',name:'Maria R.',handle:'Basketball & Pokemon collector'},
              {initials:'JD',bg:'var(--amber)',text:'"Imported my 600-card collection in about 5 minutes with the CSV upload. Zero headaches. Everything mapped perfectly to the database."',name:'James D.',handle:'Multi-sport collector · Texas'},
            ].map(t => (
              <div className="testimonial" key={t.name}>
                <div className="testimonial-stars">★★★★★</div>
                <div className="testimonial-text">{t.text}</div>
                <div className="testimonial-author">
                  <div className="author-avatar" style={{background:t.bg}}>{t.initials}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-handle">{t.handle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing" style={{background:'white'}}>
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div className="section-eyebrow">Pricing</div>
            <h2 className="section-title">Start free, <em>upgrade anytime</em></h2>
            <p className="section-sub" style={{margin:'0 auto'}}>FoilCase is free to use. Upgrade for unlimited tracking, ad-free browsing, and advanced features.</p>
          </div>
          <div className="pricing-grid">
            {[
              {name:'Free',price:'$0',period:'/ month',desc:'Everything you need to start',featured:false,features:['Browse full card database','Track up to 500 cards','5 active trades at a time','Wishlist with 20 cards','Basic search & filters','Forum access'],dim:['Ad-free experience','Price history charts','CSV import / export'],cta:'Get started free',ctaClass:'btn-outline'},
              {name:'Collector Pro',price:'$5',period:'/ month',desc:'For the serious collector',featured:true,features:['Unlimited card tracking','Unlimited active trades','Unlimited wishlist','Advanced search & filters','Price history charts','Price drop & availability alerts','Portfolio value tracking','Ad-free experience'],dim:['CSV bulk import / export'],cta:'Start Collector Pro',ctaClass:'btn-primary'},
              {name:'Vault Elite',price:'$12',period:'/ month',desc:'Power features for power collectors',featured:false,features:['Everything in Collector Pro','CSV bulk import & export','Collection insurance report','Priority mod support','Early access to new features','Elite badge on profile','API access (coming soon)','Personalized card recommendations'],dim:[],cta:'Start Vault Elite',ctaClass:'btn-outline'},
            ].map(plan => (
              <div className={`pricing-card${plan.featured?' featured':''}`} key={plan.name}>
                {plan.featured && <div className="pricing-popular">Most popular</div>}
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">{plan.price} <span>{plan.period}</span></div>
                <div className="plan-desc">{plan.desc}</div>
                <div className="plan-divider"></div>
                <ul className="plan-features">
                  {plan.features.map(f => <li key={f}>{f}</li>)}
                  {plan.dim.map(f => <li key={f} className="dim">{f}</li>)}
                </ul>
                <a className={`btn ${plan.ctaClass}`} style={{width:'100%',justifyContent:'center'}} href="#">{plan.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section" style={{background:'var(--gray-1)'}}>
        <div className="section-inner">
          <div className="cta-banner">
            <div className="cta-text">
              <h2>Ready to build your <em>dream vault?</em></h2>
              <p>Join thousands of collectors tracking millions of cards. Start free — no credit card required.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-white btn-xl" href="/collection">Create free vault</Link>
              <Link className="btn btn-dim btn-xl" href="/browse">Browse cards</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <a className="nav-logo" href="/" style={{marginBottom:'12px',display:'inline-flex'}}>
                <div className="nav-logo-icon">🃏</div>
                FoilCase
              </a>
              <div className="footer-brand-desc">The definitive online database and collection tracker for trading card enthusiasts worldwide.</div>
            </div>
            {[
              {title:'Product',links:['Browse Cards','Search Database','My Collection','Wishlists','Set Checklists','Pricing']},
              {title:'Sports',links:['Baseball','Basketball','Football','Hockey','Soccer','Gaming / TCG']},
              {title:'Company',links:['About Us','Blog','Community Forums','Contact','Privacy Policy','Terms of Service']},
            ].map(col => (
              <div key={col.title}>
                <div className="footer-col-title">{col.title}</div>
                <ul className="footer-links">
                  {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <div>© 2026 FoilCase, Inc. All rights reserved.</div>
            <div style={{display:'flex',gap:'16px'}}>
              {['Privacy','Terms','Contact'].map(l => <a key={l} href="#" style={{color:'var(--gray-4)'}}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}