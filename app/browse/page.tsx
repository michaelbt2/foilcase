'use client'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { useUser } from '@clerk/nextjs'
import { supabase } from '../lib/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass, faFire, faArrowUpRightFromSquare,
  faPlus, faChartLine, faBolt, faFootball, faBaseball,
  faBasketball, faHockeyPuck, faGamepad, faFutbol,
  faArrowTrendUp, faTag, faLayerGroup
} from '@fortawesome/free-solid-svg-icons'

const sportEmoji: Record<string,string> = {
  Football:'🏈', Baseball:'⚾', Basketball:'🏀',
  Hockey:'🏒', Soccer:'⚽', Gaming:'🎮'
}

const sportIcons: Record<string,any> = {
  Football: faFootball, Baseball: faBaseball, Basketball: faBasketball,
  Hockey: faHockeyPuck, Soccer: faFutbol, Gaming: faGamepad,
}

const sportColors: Record<string,{bg:string,color:string,border:string}> = {
  Football:   { bg:'#EBF2FF', color:'#1B6FF0', border:'#C5D8FF' },
  Baseball:   { bg:'#E6F9F0', color:'#00A861', border:'#A8DFC4' },
  Basketball: { bg:'#FEF3E2', color:'#E8820C', border:'#F5C880' },
  Hockey:     { bg:'#F2ECFB', color:'#7B4FCA', border:'#D4BAF0' },
  Soccer:     { bg:'#E0F7FA', color:'#0097A7', border:'#A5E8F0' },
  Gaming:     { bg:'#FDECEA', color:'#D93025', border:'#FFBBB7' },
}

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n) + '…' : str
}

function fmtPrice(p: number) {
  return p ? `$${p.toFixed(2)}` : '—'
}

function timeAgo(dateStr: string | null) {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function Browse() {
  const { user } = useUser()
  const [data, setData]           = useState<any>(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string|null>(null)
  const [activeSport, setActiveSport] = useState('all')
  const [toast, setToast]         = useState<string|null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800) }

  useEffect(() => { loadFeed() }, [])

  const loadFeed = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/browse-feed')
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setData(json)
    } catch (e: any) {
      setError('Could not load market data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const addToVault = async (item: any) => {
    if (!user) { showToast('⚠️ Sign in to add cards to your vault'); return }
    try {
      await supabase.from('cards').insert({
        user_id: user.id,
        player: item.title.slice(0, 60),
        year: item.year || '',
        brand: '', set_name: '', sport: item.sport || '',
        cardnum: '', folder_id: null, status: 'have',
        grader: item.grade ? item.grade.split(' ')[0] : 'Raw',
        grade: item.grade ? item.grade.split(' ')[1] || '' : '',
        qty: 1, condition: '', cost: 0, value: item.price || 0,
        attrs: [], notes: '',
        img: sportEmoji[item.sport] || '🃏',
      })
      showToast(`✅ Added to your vault!`)
    } catch {
      showToast('❌ Something went wrong.')
    }
  }

  const SPORTS = ['all','Football','Baseball','Basketball','Hockey','Gaming']

  const filteredDeals = data?.deals?.filter((d: any) =>
    activeSport === 'all' || d.sport === activeSport
  ) || []

  const filteredSold = data?.recentSold?.filter((d: any) =>
    activeSport === 'all' || d.sport === activeSport
  ) || []

  // Aggregate sport summary
  const sportSummaryMap: Record<string, {avgSold: number, count: number}> = {}
  data?.sportSummary?.forEach((s: any) => {
    if (!sportSummaryMap[s.sport]) {
      sportSummaryMap[s.sport] = { avgSold: 0, count: 0 }
    }
    sportSummaryMap[s.sport].avgSold += s.avgSold
    sportSummaryMap[s.sport].count++
  })
  Object.keys(sportSummaryMap).forEach(k => {
    sportSummaryMap[k].avgSold = sportSummaryMap[k].avgSold / sportSummaryMap[k].count
  })

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#F7F7F7;color:#0D0D0D;-webkit-font-smoothing:antialiased}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 14px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .15s;border:none;white-space:nowrap}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF}
        .btn-outline{background:transparent;color:#0D0D0D;border:1.5px solid #D8D8D8}
        .btn-outline:hover{border-color:#0D0D0D}
        .browse-hero{background:#0D0D0D;padding:48px 24px 40px;position:relative;overflow:hidden}
        .browse-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .browse-hero-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1}
        .browse-hero-title{font-size:clamp(28px,5vw,44px);font-weight:800;color:#fff;letter-spacing:-1px;line-height:1.1;margin-bottom:8px;text-align:center}
        .browse-hero-title em{font-style:italic;color:#7EB6FF}
        .browse-hero-sub{font-size:15px;color:rgba(255,255,255,.5);text-align:center;margin-bottom:28px}
        .sport-pills{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
        .sport-pill{padding:7px 18px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif;display:inline-flex;align-items:center;gap:6px}
        .sport-pill:hover{background:rgba(255,255,255,.15);color:#fff}
        .sport-pill.on{background:#1B6FF0;color:#fff;border-color:#1B6FF0}
        .browse-main{max-width:1200px;margin:0 auto;padding:28px 24px;display:flex;flex-direction:column;gap:32px}
        .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
        .section-title{font-size:18px;font-weight:800;letter-spacing:-.4px;display:flex;align-items:center;gap:8px}
        .section-sub{font-size:13px;color:#9A9A9A;margin-top:2px}
        .section-link{font-size:13px;font-weight:600;color:#1B6FF0;text-decoration:none;cursor:pointer}
        .section-link:hover{text-decoration:underline}
        .deals-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
        .deal-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;overflow:hidden;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;flex-direction:column;animation:fadeUp .3s ease both}
        .deal-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.10);border-color:#D8D8D8}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .deal-img{height:200px;overflow:hidden;position:relative;background:#F7F7F7;display:flex;align-items:center;justify-content:center;font-size:48px}
        .deal-img img{width:100%;height:100%;object-fit:cover}
        .deal-badge{position:absolute;top:8px;left:8px;background:#00A861;color:#fff;font-size:10px;font-weight:800;padding:3px 8px;border-radius:100px;letter-spacing:.04em}
        .deal-sport-badge{position:absolute;top:8px;right:8px;font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px}
        .deal-body{padding:12px 14px;flex:1;display:flex;flex-direction:column;gap:6px}
        .deal-title{font-size:12px;font-weight:700;color:#0D0D0D;line-height:1.3}
        .deal-prices{display:flex;align-items:flex-end;justify-content:space-between;margin-top:auto;padding-top:8px;border-top:1px solid #EFEFEF}
        .deal-listed{font-size:18px;font-weight:800;color:#1B6FF0;letter-spacing:-.3px}
        .deal-avg{font-size:11px;color:#9A9A9A}
        .deal-avg span{color:#00A861;font-weight:700}
        .deal-actions{display:flex;gap:6px;padding:0 14px 12px;opacity:0;transition:opacity .15s}
        .deal-card:hover .deal-actions{opacity:1}
        .act-btn{flex:1;padding:6px 0;border-radius:6px;font-size:11px;font-weight:700;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .12s;display:flex;align-items:center;justify-content:center;gap:4px;text-decoration:none}
        .act-ebay{background:#EBF2FF;color:#1B6FF0}
        .act-ebay:hover{background:#1B6FF0;color:#fff}
        .act-vault{background:#EBF2FF;color:#1B6FF0}
        .act-vault:hover{background:#1B6FF0;color:#fff}
        .sold-feed{display:flex;flex-direction:column;gap:8px}
        .sold-item{background:#fff;border:1px solid #EFEFEF;border-radius:8px;display:flex;align-items:center;gap:14px;padding:12px 16px;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);animation:fadeUp .3s ease both}
        .sold-item:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);border-color:#D8D8D8}
        .sold-img{width:48px;height:67px;border-radius:5px;overflow:hidden;flex-shrink:0;background:#F7F7F7;display:flex;align-items:center;justify-content:center;font-size:24px}
        .sold-img img{width:100%;height:100%;object-fit:cover}
        .sold-info{flex:1;min-width:0}
        .sold-title{font-size:13px;font-weight:700;color:#0D0D0D;line-height:1.3;margin-bottom:4px}
        .sold-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
        .sold-sport{font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px}
        .sold-year{font-size:11px;color:#9A9A9A}
        .sold-right{text-align:right;flex-shrink:0}
        .sold-price{font-size:17px;font-weight:800;color:#0D0D0D;letter-spacing:-.3px}
        .sold-time{font-size:11px;color:#9A9A9A;margin-top:2px}
        .sport-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px}
        .sport-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:20px 16px;display:flex;flex-direction:column;align-items:center;gap:10px;cursor:pointer;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);text-decoration:none}
        .sport-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.09);border-color:#D8D8D8}
        .sport-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}
        .sport-card-name{font-size:14px;font-weight:700;color:#0D0D0D}
        .sport-card-avg{font-size:12px;color:#9A9A9A}
        .loading-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px;gap:16px}
        .loading-spinner{width:40px;height:40px;border:3px solid #EFEFEF;border-top-color:#1B6FF0;border-radius:50%;animation:spin 1s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        .toast{position:fixed;bottom:24px;right:24px;z-index:999;background:#0D0D0D;color:#fff;border-radius:8px;padding:12px 18px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toastIn .3s cubic-bezier(.34,1.56,.64,1);max-width:320px}
        @keyframes toastIn{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}
        .empty-section{background:#fff;border:1.5px dashed #D8D8D8;border-radius:8px;padding:40px 24px;text-align:center;color:#9A9A9A;font-size:14px}
        @media(max-width:768px){.deals-grid{grid-template-columns:repeat(2,1fr)}.sport-grid{grid-template-columns:repeat(3,1fr)}}
      `}</style>

      <Nav />



     
<div className="browse-hero">
  <div className="browse-hero-inner">
    <h1 className="browse-hero-title">What's happening in the <em>market</em></h1>
    <p className="browse-hero-sub">Live deals, recent sales, and market intelligence — updated in real time</p>

    {/* LIVE STATS — inside hero */}
    {!loading && data && (
      <div style={{display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center',marginTop:'24px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.12)',borderRadius:'8px',padding:'10px 16px'}}>
          <FontAwesomeIcon icon={faBolt} style={{color:'#F5A623',fontSize:'14px'}}/>
          <div>
            <div style={{fontSize:'14px',fontWeight:800,color:'#fff'}}>{data.recentSold?.length || 0} listings</div>
            <div style={{fontSize:'10px',color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:'.06em'}}>Active now</div>
          </div>
        </div>
        {Object.entries(sportSummaryMap).slice(0,4).map(([sport, info]) => (
          <div key={sport} style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.12)',borderRadius:'8px',padding:'10px 16px'}}>
            <FontAwesomeIcon icon={sportIcons[sport]||faTag} style={{color:sportColors[sport]?.color||'#9A9A9A',fontSize:'14px'}}/>
            <div>
              <div style={{fontSize:'14px',fontWeight:800,color:'#fff'}}>{fmtPrice(info.avgSold)}</div>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:'.06em'}}>Avg {sport} Sale</div>
            </div>
          </div>
        ))}
        <div style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.12)',borderRadius:'8px',padding:'10px 16px'}}>
          <FontAwesomeIcon icon={faArrowTrendUp} style={{color:'#7EB6FF',fontSize:'14px'}}/>
          <div>
            <div style={{fontSize:'14px',fontWeight:800,color:'#fff'}}>{data ? new Date(data.generatedAt).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}) : '--'}</div>
            <div style={{fontSize:'10px',color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:'.06em'}}>Last updated</div>
          </div>
        </div>
      </div>
    )}

    {/* Loading placeholder so hero doesn't jump */}
    {loading && (
      <div style={{display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center',marginTop:'24px'}}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{width:'120px',height:'52px',background:'rgba(255,255,255,.06)',borderRadius:'8px',border:'1px solid rgba(255,255,255,.08)'}}/>
        ))}
      </div>
    )}
  </div>
</div>

{/* SPORT PILLS — below hero, above content */}
<div style={{background:'#fff',borderBottom:'1px solid #EFEFEF',padding:'14px 24px'}}>
  <div style={{maxWidth:'1200px',margin:'0 auto',display:'flex',gap:'8px',flexWrap:'wrap',alignItems:'center'}}>
    <span style={{fontSize:'11px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.08em',marginRight:'4px'}}>Filter:</span>
    {SPORTS.map(s => (
      <button
        key={s}
        onClick={() => setActiveSport(s)}
        style={{
          display:'inline-flex',alignItems:'center',gap:'6px',
          padding:'6px 14px',borderRadius:'100px',fontSize:'13px',fontWeight:600,
          cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',transition:'all .15s',
          border:`1.5px solid ${activeSport===s?'#0D0D0D':'#EFEFEF'}`,
          background:activeSport===s?'#0D0D0D':'#fff',
          color:activeSport===s?'#fff':'#555',
        }}
      >
        {s === 'all'
          ? <><FontAwesomeIcon icon={faLayerGroup} style={{fontSize:'11px'}}/>All Sports</>
          : <><FontAwesomeIcon icon={sportIcons[s]} style={{fontSize:'11px'}}/>  {s}</>
        }
      </button>
    ))}
  </div>
</div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"/>
          <div style={{fontSize:'15px',fontWeight:600,color:'#555'}}>Loading live market data...</div>
          <div style={{fontSize:'13px',color:'#9A9A9A'}}>Scanning eBay for deals and recent sales</div>
        </div>
      ) : error ? (
        <div style={{maxWidth:'1200px',margin:'40px auto',padding:'0 24px'}}>
          <div className="empty-section">
            <div style={{fontSize:'32px',marginBottom:'12px'}}>⚠️</div>
            <div style={{fontWeight:700,marginBottom:'8px',color:'#D93025'}}>{error}</div>
            <button className="btn btn-primary" style={{marginTop:'12px'}} onClick={loadFeed}>Try Again</button>
          </div>
        </div>
      ) : (
        <div className="browse-main">

          {/* RECENTLY SOLD */}
          <div>
            <div className="section-header">
              <div>
                <div className="section-title">
  <FontAwesomeIcon icon={faChartLine} style={{color:'#00A861'}}/>
  On the market now
</div>
<div className="section-sub">Active listings across popular players</div>
              </div>
            </div>

            {filteredSold.length === 0 ? (
              <div className="empty-section">No recent sales found for this sport.</div>
            ) : (
              <div className="sold-feed">
                {filteredSold.map((item: any, i: number) => {
                  const sc = sportColors[item.sport] || {bg:'#F7F7F7',color:'#555',border:'#E0E0E0'}
                  return (
                    <a
                      key={item.id + i}
                      href={item.itemWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sold-item"
                      style={{textDecoration:'none',animationDelay:`${i*.03}s`}}
                    >
                      <div className="sold-img">
                        {item.image
                          ? <img src={item.image} alt={item.title}/>
                          : <span>{sportEmoji[item.sport]||'🃏'}</span>
                        }
                      </div>
                      <div className="sold-info">
                        <div className="sold-title">{truncate(item.title, 70)}</div>
                        <div className="sold-meta">
                          <span className="sold-sport" style={{background:sc.bg,color:sc.color}}>
                            {sportEmoji[item.sport]} {item.sport}
                          </span>
                          {item.year && item.year !== 'Unknown' && (
                            <span className="sold-year">{item.year}</span>
                          )}
                          {item.grade && (
                            <span style={{fontSize:'10px',fontWeight:700,color:'#002FA7',background:'#EEF2FF',padding:'2px 7px',borderRadius:'100px'}}>{item.grade}</span>
                          )}
                        </div>
                      </div>
                      <div className="sold-right">
                        <div className="sold-price">{fmtPrice(item.price)}</div>
                        <div className="sold-time">{timeAgo(item.soldDate) || 'Recently'}</div>
                      </div>
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* BROWSE BY SPORT */}
          <div>
            <div className="section-header">
              <div>
                <div className="section-title">
                  <FontAwesomeIcon icon={faFire} style={{color:'#E8820C'}}/>
                  Browse by Sport
                </div>
                <div className="section-sub">Search live market data by sport</div>
              </div>
            </div>
            <div className="sport-grid">
              {Object.entries(sportColors).map(([sport, colors]) => {
                const avg = sportSummaryMap[sport]?.avgSold
                return (
                  <a
                    key={sport}
                    href={`/search?q=${encodeURIComponent(sport + ' card')}`}
                    className="sport-card"
                  >
                    <div className="sport-icon" style={{background:colors.bg,border:`1.5px solid ${colors.border}`}}>
                      <FontAwesomeIcon icon={sportIcons[sport]} style={{color:colors.color,fontSize:'20px'}}/>
                    </div>
                    <div className="sport-card-name">{sport}</div>
                    {avg && (
                      <div className="sport-card-avg">Avg sale {fmtPrice(avg)}</div>
                    )}
                  </a>
                )
              })}
            </div>
          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid #EFEFEF',padding:'48px 24px 32px',background:'#fff',marginTop:'48px'}}>
        <div style={{maxWidth:'1160px',margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'48px',marginBottom:'40px'}}>
            <div>
              <a href="/" style={{display:'inline-flex',alignItems:'center',gap:'8px',textDecoration:'none',fontWeight:800,fontSize:'16px',color:'#0D0D0D',marginBottom:'12px'}}>
                <div style={{width:'26px',height:'26px',background:'#1B6FF0',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'13px'}}>
                  <FontAwesomeIcon icon={faLayerGroup} style={{fontSize:'11px'}}/>
                </div>
                foilcase
              </a>
              <div style={{fontSize:'14px',color:'#9A9A9A',lineHeight:1.65,marginTop:'12px',maxWidth:'240px'}}>The definitive online database and collection tracker for trading card enthusiasts worldwide.</div>
            </div>
            {[
              {title:'Product', links:[{l:'Browse',h:'/browse'},{l:'Search',h:'/search'},{l:'My Vault',h:'/collection'},{l:'Community',h:'/community'}]},
              {title:'Sports', links:[{l:'Baseball',h:'/search?q=baseball'},{l:'Basketball',h:'/search?q=basketball'},{l:'Football',h:'/search?q=football'},{l:'Hockey',h:'/search?q=hockey'},{l:'Soccer',h:'/search?q=soccer'},{l:'Gaming / TCG',h:'/search?q=pokemon'}]},
              {title:'Company', links:[{l:'About Us',h:'#'},{l:'Community',h:'/community'},{l:'Contact',h:'#'},{l:'Privacy Policy',h:'#'},{l:'Terms of Service',h:'#'}]},
            ].map(col => (
              <div key={col.title}>
                <div style={{fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#9A9A9A',marginBottom:'16px'}}>{col.title}</div>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
                  {col.links.map(link => (
                    <li key={link.l}>
                      <a href={link.h} style={{fontSize:'14px',color:'#555',textDecoration:'none'}}
                        onMouseOver={e=>(e.currentTarget.style.color='#0D0D0D')}
                        onMouseOut={e=>(e.currentTarget.style.color='#555')}
                      >{link.l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'24px',borderTop:'1px solid #EFEFEF',fontSize:'13px',color:'#9A9A9A',flexWrap:'wrap',gap:'12px'}}>
            <div>© 2026 foilcase. All rights reserved.</div>
            <div style={{display:'flex',gap:'16px'}}>
              {[{l:'Privacy',h:'#'},{l:'Terms',h:'#'},{l:'Contact',h:'#'}].map(link => (
                <a key={link.l} href={link.h} style={{color:'#9A9A9A',textDecoration:'none'}}>{link.l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

{toast && <div className="toast">{toast}</div>}
    </>
  )
}