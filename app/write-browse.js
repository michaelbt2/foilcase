const fs = require('fs');

const content = `'use client'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { useUser } from '@clerk/nextjs'
import { supabase } from '../lib/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass, faFire, faArrowUpRightFromSquare,
  faPlus, faChartLine, faBolt, faFootball, faBaseball,
  faBasketball, faHockeyPuck, faGamepad, faFutbol,
  faArrowTrendUp, faTag,
} from '@fortawesome/free-solid-svg-icons'

const sportEmoji = {
  Football:'🏈', Baseball:'⚾', Basketball:'🏀',
  Hockey:'🏒', Soccer:'⚽', Gaming:'🎮'
}

const sportIcons = {
  Football: faFootball, Baseball: faBaseball, Basketball: faBasketball,
  Hockey: faHockeyPuck, Soccer: faFutbol, Gaming: faGamepad,
}

const sportColors = {
  Football:   { bg:'#EBF2FF', color:'#1B6FF0', border:'#C5D8FF' },
  Baseball:   { bg:'#E6F9F0', color:'#00A861', border:'#A8DFC4' },
  Basketball: { bg:'#FEF3E2', color:'#E8820C', border:'#F5C880' },
  Hockey:     { bg:'#F2ECFB', color:'#7B4FCA', border:'#D4BAF0' },
  Soccer:     { bg:'#E0F7FA', color:'#0097A7', border:'#A5E8F0' },
  Gaming:     { bg:'#FDECEA', color:'#D93025', border:'#FFBBB7' },
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n) + '…' : str
}

function fmtPrice(p) {
  return p ? '$' + p.toFixed(2) : '—'
}

function timeAgo(dateStr) {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return mins + 'm ago'
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return hrs + 'h ago'
  return Math.floor(hrs / 24) + 'd ago'
}

export default function Browse() {
  const { user } = useUser()
  const [data, setData]           = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [activeSport, setActiveSport] = useState('all')
  const [toast, setToast]         = useState(null)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800) }

  useEffect(() => { loadFeed() }, [])

  const loadFeed = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/browse-feed')
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setData(json)
    } catch (e) {
      setError('Could not load market data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const addToVault = async (item) => {
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
      showToast('✅ Added to your vault!')
    } catch {
      showToast('❌ Something went wrong.')
    }
  }

  const SPORTS = ['all','Football','Baseball','Basketball','Hockey','Gaming']

  const filteredDeals = data?.deals?.filter((d) =>
    activeSport === 'all' || d.sport === activeSport
  ) || []

  const filteredSold = data?.recentSold?.filter((d) =>
    activeSport === 'all' || d.sport === activeSport
  ) || []

  const sportSummaryMap = {}
  data?.sportSummary?.forEach((s) => {
    if (!sportSummaryMap[s.sport]) sportSummaryMap[s.sport] = { avgSold: 0, count: 0 }
    sportSummaryMap[s.sport].avgSold += s.avgSold
    sportSummaryMap[s.sport].count++
  })
  Object.keys(sportSummaryMap).forEach(k => {
    sportSummaryMap[k].avgSold = sportSummaryMap[k].avgSold / sportSummaryMap[k].count
  })

  return (
    <>
      <style>{\`
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
        .deal-actions{display:flex;gap:6px;padding:0 14px 12px;opacity:0;transition:opacity .15s}
        .deal-card:hover .deal-actions{opacity:1}
        .act-btn{flex:1;padding:6px 0;border-radius:6px;font-size:11px;font-weight:700;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .12s;display:flex;align-items:center;justify-content:center;gap:4px;text-decoration:none}
        .act-ebay{background:#EBF2FF;color:#1B6FF0}
        .act-ebay:hover{background:#1B6FF0;color:#fff}
        .act-vault{background:#EBF2FF;color:#1B6FF0}
        .act-vault:hover{background:#1B6FF0;color:#fff}
        .sold-feed{display:flex;flex-direction:column;gap:8px}
        .sold-item{background:#fff;border:1px solid #EFEFEF;border-radius:8px;display:flex;align-items:center;gap:14px;padding:12px 16px;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);animation:fadeUp .3s ease both;text-decoration:none;color:inherit}
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
        .market-bar{background:#fff;border-bottom:1px solid #EFEFEF;padding:12px 24px}
        .market-bar-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:24px;overflow-x:auto}
        .market-stat{display:flex;align-items:center;gap:8px;flex-shrink:0;padding:0 16px;border-right:1px solid #EFEFEF}
        .market-stat:first-child{padding-left:0}
        .market-stat:last-child{border-right:none}
        .market-stat-val{font-size:15px;font-weight:800;color:#0D0D0D}
        .market-stat-lbl{font-size:11px;color:#9A9A9A}
        .toast{position:fixed;bottom:24px;right:24px;z-index:999;background:#0D0D0D;color:#fff;border-radius:8px;padding:12px 18px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toastIn .3s cubic-bezier(.34,1.56,.64,1);max-width:320px}
        @keyframes toastIn{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}
        .empty-section{background:#fff;border:1.5px dashed #D8D8D8;border-radius:8px;padding:40px 24px;text-align:center;color:#9A9A9A;font-size:14px}
        @media(max-width:768px){.deals-grid{grid-template-columns:repeat(2,1fr)}.sport-grid{grid-template-columns:repeat(3,1fr)}}
      \`}</style>

      <Nav />

      <div className="browse-hero">
        <div className="browse-hero-inner">
          <h1 className="browse-hero-title">What's happening in the <em>market</em></h1>
          <p className="browse-hero-sub">Live deals, recent sales, and market intelligence — updated in real time</p>
          <div className="sport-pills">
            {SPORTS.map(s => (
              <button
                key={s}
                className={"sport-pill" + (activeSport===s ? ' on' : '')}
                onClick={() => setActiveSport(s)}
              >
                {s === 'all' ? '🃏 All Sports' : sportEmoji[s] + ' ' + s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!loading && data && (
        <div className="market-bar">
          <div className="market-bar-inner">
            <div className="market-stat">
              <FontAwesomeIcon icon={faBolt} style={{color:'#F5A623',fontSize:'16px'}}/>
              <div>
                <div className="market-stat-val">{data.deals?.length || 0} deals</div>
                <div className="market-stat-lbl">Below avg sold</div>
              </div>
            </div>
            <div className="market-stat">
              <FontAwesomeIcon icon={faChartLine} style={{color:'#00A861',fontSize:'16px'}}/>
              <div>
                <div className="market-stat-val">{data.recentSold?.length || 0} sales</div>
                <div className="market-stat-lbl">Tracked today</div>
              </div>
            </div>
            {Object.entries(sportSummaryMap).slice(0,4).map(([sport, info]) => (
              <div className="market-stat" key={sport}>
                <FontAwesomeIcon icon={sportIcons[sport]||faTag} style={{color:sportColors[sport]?.color||'#9A9A9A',fontSize:'16px'}}/>
                <div>
                  <div className="market-stat-val">{fmtPrice(info.avgSold)}</div>
                  <div className="market-stat-lbl">Avg {sport} sale</div>
                </div>
              </div>
            ))}
            <div className="market-stat">
              <FontAwesomeIcon icon={faArrowTrendUp} style={{color:'#1B6FF0',fontSize:'16px'}}/>
              <div>
                <div className="market-stat-val">{new Date(data.generatedAt).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}</div>
                <div className="market-stat-lbl">Last updated</div>
              </div>
            </div>
          </div>
        </div>
      )}

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

          <div>
            <div className="section-header">
              <div>
                <div className="section-title">
                  <FontAwesomeIcon icon={faBolt} style={{color:'#F5A623'}}/>
                  Best Deals Right Now
                </div>
                <div className="section-sub">Cards listed significantly below their average sold price</div>
              </div>
              <a href="/search" className="section-link">Search all cards →</a>
            </div>
            {filteredDeals.length === 0 ? (
              <div className="empty-section">No deals found for this sport right now. Try another sport or check back soon.</div>
            ) : (
              <div className="deals-grid">
                {filteredDeals.map((deal, i) => {
                  const sc = sportColors[deal.sport] || {bg:'#F7F7F7',color:'#555',border:'#E0E0E0'}
                  return (
                    <div key={deal.id} className="deal-card" style={{animationDelay: i*.04+'s'}}>
                      <div className="deal-img">
                        {deal.image
                          ? <img src={deal.image} alt={deal.title}/>
                          : <span>{sportEmoji[deal.sport]||'🃏'}</span>
                        }
                        <div className="deal-badge">{deal.savingPct}% below avg</div>
                        <div className="deal-sport-badge" style={{background:sc.bg,color:sc.color}}>
                          {sportEmoji[deal.sport]} {deal.sport}
                        </div>
                      </div>
                      <div className="deal-body">
                        <div className="deal-title">{truncate(deal.title, 60)}</div>
                        {deal.grade && (
                          <div style={{fontSize:'11px',fontWeight:700,color:'#002FA7',background:'#EEF2FF',padding:'2px 7px',borderRadius:'100px',display:'inline-flex',width:'fit-content'}}>{deal.grade}</div>
                        )}
                        <div className="deal-prices">
                          <div>
                            <div style={{fontSize:'10px',color:'#9A9A9A',fontWeight:600,textTransform:'uppercase',letterSpacing:'.04em'}}>Listed</div>
                            <div className="deal-listed">{fmtPrice(deal.price)}</div>
                          </div>
                          <div style={{textAlign:'right'}}>
                            <div style={{fontSize:'10px',color:'#9A9A9A',fontWeight:600,textTransform:'uppercase',letterSpacing:'.04em'}}>Avg Sold</div>
                            <div style={{fontSize:'14px',fontWeight:800,color:'#00A861'}}>{fmtPrice(deal.avgSold)}</div>
                            <div style={{fontSize:'10px',color:'#00A861',fontWeight:600}}>Save {fmtPrice(deal.saving)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="deal-actions">
                        <a href={deal.itemWebUrl} target="_blank" rel="noopener noreferrer" className="act-btn act-ebay">
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>eBay
                        </a>
                        <button className="act-btn act-vault" onClick={() => addToVault(deal)}>
                          <FontAwesomeIcon icon={faPlus}/>Vault
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div>
            <div className="section-header">
              <div>
                <div className="section-title">
                  <FontAwesomeIcon icon={faChartLine} style={{color:'#00A861'}}/>
                  Recently Sold
                </div>
                <div className="section-sub">Latest transactions across the market</div>
              </div>
            </div>
            {filteredSold.length === 0 ? (
              <div className="empty-section">No recent sales found for this sport.</div>
            ) : (
              <div className="sold-feed">
                {filteredSold.map((item, i) => {
                  const sc = sportColors[item.sport] || {bg:'#F7F7F7',color:'#555',border:'#E0E0E0'}
                  return (
                    
                      key={item.id + i}
                      href={item.itemWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sold-item"
                      style={{animationDelay: i*.03+'s'}}
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
                  
                    key={sport}
                    href={'/search?q=' + encodeURIComponent(sport + ' card')}
                    className="sport-card"
                  >
                    <div className="sport-icon" style={{background:colors.bg,border:'1.5px solid ' + colors.border}}>
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

      {toast && <div className="toast">{toast}</div>}
    </>
  )
}
`;

fs.writeFileSync('app/browse/page.tsx', content);
console.log('Browse page written successfully');