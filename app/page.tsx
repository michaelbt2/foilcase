'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Nav from './components/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faXmark,
  faChevronRight,
  faRocket,
  faLayerGroup,
  faBolt,
  faChartLine,
  faUsers,
  faShield,
} from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const [activeSport, setActiveSport] = useState('⚾ Baseball')
  const [searchVal, setSearchVal] = useState('')
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  const sports = ['⚾ Baseball','🏈 Football','🏀 Basketball','🏒 Hockey','⚽ Soccer','🎮 Gaming / TCG']

  const handleSearch = () => {
    if (searchVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`)
    } else {
      router.push('/search')
    }
  }

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#fff;color:#0D0D0D;-webkit-font-smoothing:antialiased}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 16px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .15s;border:none;white-space:nowrap}
        .btn-ghost{background:transparent;color:#555}
        .btn-ghost:hover{background:#F7F7F7;color:#0D0D0D}
        .btn-outline{background:transparent;color:#0D0D0D;border:1.5px solid #D8D8D8}
        .btn-outline:hover{border-color:#0D0D0D}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF;transform:translateY(-1px);box-shadow:0 4px 12px rgba(27,111,240,.35)}
        .btn-xl{padding:14px 28px;font-size:16px}
        .btn-white{background:#fff;color:#0D0D0D}
        .btn-white:hover{background:#F7F7F7;transform:translateY(-1px)}
        .btn-dim{background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.2)}
        .btn-dim:hover{background:rgba(255,255,255,.15)}
        .hero{max-width:1160px;margin:0 auto;padding:96px 24px 80px;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:6px;background:#EBF2FF;color:#1B6FF0;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:20px}
        .hero h1{font-size:clamp(36px,5vw,56px);font-weight:800;line-height:1.08;letter-spacing:-1.5px;color:#0D0D0D;margin-bottom:20px}
        .hero h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#1B6FF0}
        .hero-sub{font-size:17px;color:#555;line-height:1.65;margin-bottom:32px;max-width:440px}
        .hero-actions{display:flex;gap:10px;flex-wrap:wrap}
        .hero-stats{display:flex;gap:32px;margin-top:48px;padding-top:28px;border-top:1px solid #EFEFEF}
        .hero-stat-val{font-size:22px;font-weight:800;letter-spacing:-.5px;color:#0D0D0D}
        .hero-stat-lbl{font-size:12px;color:#9A9A9A;margin-top:2px}
        .hero-visual{position:relative}
        .card-vault-ui{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:24px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,.10);animation:floatUI 6s ease-in-out infinite}
        @keyframes floatUI{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .ui-search{background:#fff;border:1px solid #EFEFEF;border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:8px;margin-bottom:14px;font-size:13px;color:#9A9A9A;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .ui-cards-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px}
        .ui-card{background:#fff;border-radius:10px;overflow:hidden;border:1px solid #EFEFEF;box-shadow:0 1px 3px rgba(0,0,0,.06);transition:transform .2s}
        .ui-card:hover{transform:translateY(-3px)}
        .ui-card-img{height:80px;display:flex;align-items:center;justify-content:center;font-size:28px;position:relative}
        .ui-card-badge{position:absolute;top:6px;right:6px;font-size:9px;font-weight:700;padding:2px 5px;border-radius:4px}
        .badge-blue{background:#1B6FF0;color:#fff}
        .badge-green{background:#00A861;color:#fff}
        .badge-amber{background:#E8820C;color:#fff}
        .ui-card-body{padding:8px 10px 10px}
        .ui-card-name{font-size:11px;font-weight:700;color:#0D0D0D}
        .ui-card-set{font-size:10px;color:#9A9A9A;margin-top:1px}
        .ui-card-price{font-size:11px;font-weight:700;color:#1B6FF0;margin-top:4px}
        .ui-progress-row{display:flex;align-items:center;gap:8px;font-size:11px;color:#555}
        .ui-progress-bar{flex:1;height:5px;background:#EFEFEF;border-radius:10px;overflow:hidden}
        .ui-progress-fill{height:100%;background:#1B6FF0;border-radius:10px}
        .floating-badge{position:absolute;background:#fff;border:1px solid #EFEFEF;border-radius:10px;padding:8px 12px;box-shadow:0 4px 16px rgba(0,0,0,.08);font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px}
        .badge-tl{top:-16px;left:-24px;animation:floatBadge 4s ease-in-out infinite}
        .badge-br{bottom:-16px;right:-20px;animation:floatBadge 4s ease-in-out infinite 1.5s}
        @keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .logo-bar{border-top:1px solid #EFEFEF;border-bottom:1px solid #EFEFEF;background:#F7F7F7;padding:20px 24px}
        .logo-bar-inner{max-width:1160px;margin:0 auto;display:flex;align-items:center;gap:16px}
        .logo-bar-label{font-size:12px;color:#9A9A9A;font-weight:600;white-space:nowrap}
        .sport-pill{padding:5px 14px;background:#fff;border:1px solid #EFEFEF;border-radius:100px;font-size:13px;font-weight:600;color:#555;cursor:pointer;transition:all .15s;white-space:nowrap;font-family:inherit}
        .sport-pill:hover,.sport-pill.active{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .section{padding:80px 24px}
        .section-inner{max-width:1160px;margin:0 auto}
        .section-eyebrow{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1B6FF0;margin-bottom:12px}
        .section-title{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-1px;line-height:1.12;color:#0D0D0D;margin-bottom:16px}
        .section-title em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#1B6FF0}
        .section-sub{font-size:16px;color:#555;line-height:1.65;max-width:520px;margin-bottom:48px}
        .search-hero-box{background:#fff;border:1.5px solid #EFEFEF;border-radius:20px;padding:6px 6px 6px 20px;display:flex;align-items:center;gap:12px;box-shadow:0 4px 16px rgba(0,0,0,.07);max-width:640px;margin-bottom:20px;transition:all .15s}
        .search-hero-box:focus-within{border-color:#1B6FF0;box-shadow:0 0 0 4px rgba(27,111,240,.12)}
        .search-hero-box input{flex:1;border:none;outline:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;color:#0D0D0D;background:transparent}
        .search-hero-box input::placeholder{color:#9A9A9A}
        .filter-chip{padding:5px 12px;background:#F7F7F7;border:1px solid #EFEFEF;border-radius:100px;font-size:12px;font-weight:600;color:#555;cursor:pointer;transition:all .15s;font-family:inherit}
        .filter-chip:hover{background:#EFEFEF;color:#0D0D0D}
        .filter-chip.active{background:#EBF2FF;color:#1B6FF0;border-color:#C5D8FF}
        .search-results-box{background:#fff;border:1.5px solid #EFEFEF;border-radius:14px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.08);margin-top:16px}
        .search-results-header{padding:10px 16px;background:#F7F7F7;border-bottom:1px solid #EFEFEF;font-size:12px;color:#9A9A9A;font-weight:600}
        .search-result-item{padding:14px 16px;border-bottom:1px solid #EFEFEF;display:flex;align-items:center;gap:12px;cursor:pointer;transition:background .12s;text-decoration:none;color:inherit}
        .search-result-item:last-child{border-bottom:none}
        .search-result-item:hover{background:#F7F7F7}
        .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .step{padding:28px;border:1px solid #EFEFEF;border-radius:20px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);transition:all .2s}
        .step:hover{box-shadow:0 4px 16px rgba(0,0,0,.07);transform:translateY(-2px)}
        .step-num{width:36px;height:36px;background:#0D0D0D;color:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;margin-bottom:16px}
        .step-title{font-size:17px;font-weight:700;margin-bottom:8px}
        .step-desc{font-size:14px;color:#555;line-height:1.6}
        .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .testimonial{background:#fff;border:1px solid #EFEFEF;border-radius:20px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,.06);transition:all .2s}
        .testimonial:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}
        .testimonial-stars{color:#F5A623;font-size:13px;letter-spacing:1px;margin-bottom:12px}
        .testimonial-text{font-size:14px;color:#555;line-height:1.65;margin-bottom:16px;font-style:italic}
        .testimonial-author{display:flex;align-items:center;gap:10px}
        .author-avatar{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#fff}
        .author-name{font-size:13px;font-weight:700;color:#0D0D0D}
        .author-handle{font-size:12px;color:#9A9A9A}
        .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .pricing-card{background:#fff;border:1.5px solid #EFEFEF;border-radius:20px;padding:28px;transition:all .2s;position:relative}
        .pricing-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}
        .pricing-card.featured{border-color:#1B6FF0;box-shadow:0 0 0 4px rgba(27,111,240,.08)}
        .pricing-popular{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:#1B6FF0;color:#fff;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:100px;white-space:nowrap}
        .plan-name{font-size:13px;font-weight:700;color:#9A9A9A;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px}
        .plan-price{font-size:40px;font-weight:800;letter-spacing:-1.5px;color:#0D0D0D;line-height:1;margin-bottom:4px}
        .plan-price span{font-size:16px;font-weight:500;color:#9A9A9A;letter-spacing:0}
        .plan-desc{font-size:13px;color:#9A9A9A;margin-bottom:20px}
        .plan-divider{height:1px;background:#EFEFEF;margin-bottom:20px}
        .plan-features{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:24px}
        .plan-features li{font-size:13.5px;color:#555;display:flex;gap:8px;align-items:flex-start}
        .plan-features li::before{content:'✓';color:#00A861;font-weight:700;font-size:13px;margin-top:1px;flex-shrink:0}
        .plan-features li.dim{color:#D8D8D8}
        .plan-features li.dim::before{color:#D8D8D8}
        .cta-banner{background:#0D0D0D;border-radius:20px;padding:64px 56px;display:flex;align-items:center;justify-content:space-between;gap:32px;position:relative;overflow:hidden}
        .cta-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 600px 400px at 80% 50%,rgba(27,111,240,.25),transparent);pointer-events:none}
        .cta-text h2{font-size:36px;font-weight:800;color:#fff;letter-spacing:-.8px;margin-bottom:10px}
        .cta-text h2 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#7EB6FF}
        .cta-text p{font-size:15px;color:rgba(255,255,255,.6)}
        .cta-actions{display:flex;gap:10px;flex-shrink:0}
        footer{border-top:1px solid #EFEFEF;padding:48px 24px 32px}
        .footer-inner{max-width:1160px;margin:0 auto}
        .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:40px}
        .footer-brand-desc{font-size:14px;color:#9A9A9A;line-height:1.65;margin-top:12px;max-width:240px}
        .footer-col-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;margin-bottom:16px}
        .footer-links{list-style:none;display:flex;flex-direction:column;gap:10px}
        .footer-links a{font-size:14px;color:#555;transition:color .15s;text-decoration:none}
        .footer-links a:hover{color:#0D0D0D}
        .footer-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:24px;border-top:1px solid #EFEFEF;font-size:13px;color:#9A9A9A}
        @media(max-width:860px){
          .hero{grid-template-columns:1fr;gap:40px;padding:48px 20px 40px}
          .hero-visual{display:none}
          .steps{grid-template-columns:1fr}
          .testimonials-grid{grid-template-columns:1fr}
          .pricing-grid{grid-template-columns:1fr}
          .footer-grid{grid-template-columns:1fr 1fr}
          .cta-banner{flex-direction:column;padding:40px 28px;text-align:center}
          .cta-actions{justify-content:center}
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="hero">
        <div>
          <div className="hero-eyebrow">
            <span style={{width:6,height:6,borderRadius:'50%',background:'#1B6FF0',display:'inline-block'}}></span>
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
    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
      <FontAwesomeIcon icon={faLayerGroup} style={{color:'#1B6FF0',fontSize:'14px'}}/>
      <div className="hero-stat-val">2.4M+</div>
    </div>
    <div className="hero-stat-lbl">Cards in database</div>
  </div>
  <div>
    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
      <FontAwesomeIcon icon={faShield} style={{color:'#1B6FF0',fontSize:'14px'}}/>
      <div className="hero-stat-val">18K+</div>
    </div>
    <div className="hero-stat-lbl">Sets catalogued</div>
  </div>
  <div>
    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
      <FontAwesomeIcon icon={faBolt} style={{color:'#1B6FF0',fontSize:'14px'}}/>
      <div className="hero-stat-val">Free</div>
    </div>
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
              <div style={{background:'#fff',border:'1px solid #EFEFEF',borderRadius:'10px',padding:'12px',boxShadow:'0 1px 3px rgba(0,0,0,.05)'}}>
                <div style={{fontSize:'11px',fontWeight:700,color:'#555',marginBottom:'8px'}}>Set Completion</div>
                {[{label:'2024 Topps Series 1',pct:78},{label:'2023 Prizm Basketball',pct:45}].map((row,i) => (
                  <div className="ui-progress-row" key={i} style={{marginBottom:i===0?'6px':0}}>
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
              <span style={{color:'#00A861'}}>↑</span> $4,280 collection value
            </div>
          </div>
        </div>
      </div>



      {/* SEARCH SECTION */}
      <section className="section" style={{background:'#F7F7F7'}}>
        <div className="section-inner">
          <div style={{maxWidth:'720px',margin:'0 auto',textAlign:'center'}}>
            <div className="section-eyebrow">
  <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight:'6px'}}/>Powerful Search
</div>
            <h2 className="section-title">Find any card <em>instantly</em></h2>
            <p className="section-sub" style={{margin:'0 auto 36px'}}>Search across millions of cards by player, year, brand, set, parallel, or card number — powered by live eBay data.</p>
          </div>
          <div style={{maxWidth:'640px',margin:'0 auto'}}>
            <div className="search-hero-box">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'#1B6FF0',fontSize:'16px',width:'16px',flexShrink:0}}/>
              <input
                type="text"
                placeholder="Search by player, set, card number..."
                value={searchVal}
                onChange={e => { setSearchVal(e.target.value); setShowResults(e.target.value.length > 1) }}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
              />
              <button
                className="btn btn-primary"
                style={{padding:'8px 18px',fontSize:'14px'}}
                onClick={handleSearch}
              >Search</button>
            </div>
            
            {showResults && (
              <div className="search-results-box">
                <div className="search-results-header">Showing live results — press Enter or click Search</div>
                {[
                  {emoji:'⚾',name:`${searchVal} RC Auto`,set:'2018 Topps Chrome · #SP · /99',price:'$2,100'},
                  {emoji:'⚾',name:`${searchVal} Gold Parallel`,set:'2024 Topps Chrome · /50',price:'$890'},
                  {emoji:'⚾',name:`${searchVal} Base Card`,set:'2024 Topps Series 1',price:'$12'},
                ].map((r,i) => (
                  <div
                    className="search-result-item"
                    key={i}
                    onClick={handleSearch}
                  >
                    <span style={{fontSize:'24px'}}>{r.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:'14px',fontWeight:700}}>{r.name}</div>
                      <div style={{fontSize:'12px',color:'#9A9A9A'}}>{r.set}</div>
                    </div>
                    <div style={{fontSize:'14px',fontWeight:800,color:'#1B6FF0'}}>{r.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{background:'#fff'}}>
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'56px'}}>
            <div className="section-eyebrow">
  <FontAwesomeIcon icon={faRocket} style={{marginRight:'6px'}}/>How it works
</div>
            <h2 className="section-title">Start collecting in <em>minutes</em></h2>
            <p className="section-sub" style={{margin:'0 auto'}}>FoilCase makes it effortless to catalog, track, and grow your collection — whether you have 10 cards or 10,000.</p>
          </div>
          <div className="steps">
            {[
              {n:'1',title:'Create your free vault',desc:'Sign up in seconds with your email or Google account. No credit card required to start tracking your collection.'},
              {n:'2',title:'Search and add cards',desc:'Find any card from millions of listings. Add to your vault with condition, grade, and notes in one click.'},
              {n:'3',title:'Track, trade, and grow',desc:'Monitor set completion, discover your collection\'s value, and connect with other collectors to find your next great card.'},
            ].map(step => (
              <div className="step" key={step.n}>
                <div className="step-num" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
  {step.n === '1' ? <FontAwesomeIcon icon={faRocket}/> : step.n === '2' ? <FontAwesomeIcon icon={faMagnifyingGlass}/> : <FontAwesomeIcon icon={faChartLine}/>}
</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{background:'#F7F7F7'}}>
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div className="section-eyebrow">
  <FontAwesomeIcon icon={faUsers} style={{marginRight:'6px'}}/>Community
</div>
            <h2 className="section-title">Loved by <em>collectors</em></h2>
          </div>
          <div className="testimonials-grid">
            {[
              {initials:'TK',bg:'#1B6FF0',text:'"Finally a card database that actually has everything. I searched for a 1987 Topps error card I\'ve had for years and it was right there with real pricing."',name:'Tom K.',handle:'Baseball collector · 12 years'},
              {initials:'MR',bg:'#00A861',text:'"The set completion tracker is a game changer. I can finally see exactly which cards I need to finish my 2023 Prizm basketball set without keeping a spreadsheet."',name:'Maria R.',handle:'Basketball & Pokemon collector'},
              {initials:'JD',bg:'#E8820C',text:'"Imported my 600-card collection in about 5 minutes with the CSV upload. Zero headaches. Everything mapped perfectly to the database."',name:'James D.',handle:'Multi-sport collector · Texas'},
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
      {/* <section className="section" id="pricing" style={{background:'#fff'}}>
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div className="section-eyebrow">Pricing</div>
            <h2 className="section-title">Start free, <em>upgrade anytime</em></h2>
            <p className="section-sub" style={{margin:'0 auto'}}>FoilCase is free to use. Upgrade for unlimited tracking, ad-free browsing, and advanced features.</p>
          </div>
          <div className="pricing-grid">
            {[
              {name:'Free',price:'$0',period:'/ month',desc:'Everything you need to start',featured:false,features:['Browse full card database','Track up to 500 cards','5 active trades at a time','Wishlist with 20 cards','Basic search & filters','Forum access'],dim:['Ad-free experience','Price history charts','CSV import / export'],cta:'Get started free',ctaClass:'btn-outline'},
              {name:'Collector Pro',price:'$5',period:'/ month',desc:'For the serious collector',featured:true,features:['Unlimited card tracking','Unlimited active trades','Unlimited wishlist','Advanced search & filters','Price history charts','Price drop alerts','Portfolio value tracking','Ad-free experience'],dim:['CSV bulk import / export'],cta:'Start Collector Pro',ctaClass:'btn-primary'},
              {name:'Vault Elite',price:'$12',period:'/ month',desc:'Power features for power collectors',featured:false,features:['Everything in Collector Pro','CSV bulk import & export','Collection insurance report','Priority support','Early access to new features','Elite badge on profile','API access (coming soon)'],dim:[],cta:'Start Vault Elite',ctaClass:'btn-outline'},
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
                <Link className={`btn ${plan.ctaClass}`} style={{width:'100%',justifyContent:'center'}} href="/collection">{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA BANNER */}
      <section className="section" style={{background:'#F7F7F7'}}>
        <div className="section-inner">
          <div className="cta-banner">
            <div className="cta-text">
              <h2>Ready to build your <em>dream vault?</em></h2>
              <p>Join thousands of collectors tracking millions of cards. Start free — no credit card required.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-white btn-xl" href="/collection">
  <FontAwesomeIcon icon={faRocket} style={{marginRight:'6px'}}/>Create free vault
</Link>
<Link className="btn btn-dim btn-xl" href="/browse">
  <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight:'6px'}}/>Browse cards
</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <Link className="btn-ghost" href="/" style={{display:'inline-flex',alignItems:'center',gap:'8px',textDecoration:'none',fontWeight:800,fontSize:'16px',color:'#0D0D0D',marginBottom:'12px'}}>
                <div style={{width:'26px',height:'26px',background:'#1B6FF0',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'13px'}}>🃏</div>
                FoilCase
              </Link>
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
              {['Privacy','Terms','Contact'].map(l => <a key={l} href="#" style={{color:'#9A9A9A',textDecoration:'none'}}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}