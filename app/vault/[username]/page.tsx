'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { supabase } from '../../lib/supabase'
import Nav from '../../components/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLayerGroup, faChartLine, faMedal, faBoxOpen, faGlobe,
  faLock, faUserPlus, faUserMinus, faGrip, faBars,
  faFootball, faBaseball, faBasketball, faHockeyPuck,
  faFutbol, faGamepad, faTag,
} from '@fortawesome/free-solid-svg-icons'

const sportEmoji: Record<string,string> = {
  Football:'🏈', Baseball:'⚾', Basketball:'🏀',
  Hockey:'🏒', Soccer:'⚽', 'Gaming / TCG':'🎮', Gaming:'🎮'
}

const SPORTS = [
  {v:'all', l:'All'},
  {v:'Football', l:'Football', icon:faFootball},
  {v:'Baseball', l:'Baseball', icon:faBaseball},
  {v:'Basketball', l:'Basketball', icon:faBasketball},
  {v:'Hockey', l:'Hockey', icon:faHockeyPuck},
  {v:'Soccer', l:'Soccer', icon:faFutbol},
  {v:'Gaming', l:'Gaming / TCG', icon:faGamepad},
]

function cardBg(sport: string) {
  const bgs: Record<string,string> = {
    Football:'linear-gradient(135deg,#EBF2FF,#C5D8FF)',
    Baseball:'linear-gradient(135deg,#E6F9F0,#A8DFC4)',
    Basketball:'linear-gradient(135deg,#FEF3E2,#FDDBA0)',
    Hockey:'linear-gradient(135deg,#F2ECFB,#D4BAF0)',
    Soccer:'linear-gradient(135deg,#E0F7FA,#A5E8F0)',
    Gaming:'linear-gradient(135deg,#FDECEA,#F9C0BB)',
    'Gaming / TCG':'linear-gradient(135deg,#FDECEA,#F9C0BB)',
  }
  return bgs[sport] || 'linear-gradient(135deg,#F7F7F7,#EFEFEF)'
}

function attrLabel(a: string) {
  const map: Record<string,string> = {
    rc:'RC', auto:'Auto', patch:'Patch', numbered:'#',
    chrome:'Chrome', refractor:'Refractor', shortprint:'SP', '1of1':'1/1'
  }
  return map[a] || a
}

function fmtNum(n: number) {
  if (n >= 1000) return (n/1000).toFixed(1).replace('.0','') + 'K'
  return n.toFixed(0)
}

export default function PublicVault() {
  const params = useParams()
  const username = params.username as string
  const { user } = useUser()

  const [profile, setProfile]       = useState<any>(null)
  const [cards, setCards]           = useState<any[]>([])
  const [loading, setLoading]       = useState(true)
  const [notFound, setNotFound]     = useState(false)
  const [isPrivate, setIsPrivate]   = useState(false)
  const [activeSport, setActiveSport] = useState('all')
  const [viewMode, setViewMode]     = useState<'grid'|'list'>('grid')
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)
  const [followLoading, setFollowLoading] = useState(false)

  useEffect(() => {
    if (username) loadVault()
  }, [username])

  useEffect(() => {
    if (user && profile) checkFollowing()
  }, [user, profile])

  const loadVault = async () => {
    setLoading(true)

    // Load profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (!profileData) { setNotFound(true); setLoading(false); return }
    if (!profileData.is_public) { setIsPrivate(true); setLoading(false); return }

    setProfile(profileData)

    // Load cards
    const { data: cardsData } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', profileData.id)
      .neq('status', 'sold')
      .order('created_at', { ascending: false })

    setCards(cardsData || [])

    // Load follower count
    const { count } = await supabase
      .from('followers')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', profileData.id)

    setFollowerCount(count || 0)
    setLoading(false)
  }

  const checkFollowing = async () => {
    if (!user || !profile) return
    const { data } = await supabase
      .from('followers')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', profile.id)
      .single()
    setIsFollowing(!!data)
  }

  const toggleFollow = async () => {
    if (!user) { window.location.href = '/sign-in'; return }
    setFollowLoading(true)
    if (isFollowing) {
      await supabase.from('followers').delete()
        .eq('follower_id', user.id)
        .eq('following_id', profile.id)
      setIsFollowing(false)
      setFollowerCount(c => c - 1)
    } else {
      await supabase.from('followers').insert({
        follower_id: user.id,
        following_id: profile.id,
      })
      setIsFollowing(true)
      setFollowerCount(c => c + 1)
    }
    setFollowLoading(false)
  }

  const filtered = cards.filter(c =>
    activeSport === 'all' || c.sport.startsWith(activeSport)
  )

  const totalValue  = cards.reduce((s,c) => s+(c.value||0)*(c.qty||1), 0)
  const totalGraded = cards.filter(c => c.grader && c.grader !== 'Raw').length
  const totalSets   = new Set(cards.map(c => c.set_name)).size
  const isOwner     = user?.id === profile?.id

  if (loading) {
    return (
      <>
        <Nav />
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'16px',fontWeight:600,color:'#555'}}>Loading vault...</div>
          </div>
        </div>
      </>
    )
  }

  if (notFound) {
    return (
      <>
        <Nav />
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🔍</div>
            <div style={{fontSize:'20px',fontWeight:800,marginBottom:'8px'}}>Vault not found</div>
            <div style={{fontSize:'14px',color:'#9A9A9A',marginBottom:'24px'}}>No collector with the username <strong>@{username}</strong> exists.</div>
            <a href="/community" style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'10px 20px',borderRadius:'100px',background:'#1B6FF0',color:'#fff',textDecoration:'none',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',fontWeight:600}}>Browse collectors</a>
          </div>
        </div>
      </>
    )
  }

  if (isPrivate) {
    return (
      <>
        <Nav />
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
          <div style={{textAlign:'center'}}>
            <div style={{width:'64px',height:'64px',background:'#F7F7F7',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
              <FontAwesomeIcon icon={faLock} style={{color:'#9A9A9A',fontSize:'28px'}}/>
            </div>
            <div style={{fontSize:'20px',fontWeight:800,marginBottom:'8px'}}>This vault is private</div>
            <div style={{fontSize:'14px',color:'#9A9A9A',marginBottom:'24px'}}>@{username} hasn't made their collection public yet.</div>
            <a href="/community" style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'10px 20px',borderRadius:'100px',background:'#1B6FF0',color:'#fff',textDecoration:'none',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',fontWeight:600}}>Browse collectors</a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#F7F7F7;color:#0D0D0D;-webkit-font-smoothing:antialiased}
        .vault-hero{background:#fff;border-bottom:1px solid #EFEFEF;padding:32px 24px}
        .vault-hero-inner{max-width:1200px;margin:0 auto;display:flex;align-items:flex-start;gap:24px;flex-wrap:wrap}
        .vault-avatar{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#1B6FF0,#7EB6FF);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#fff;flex-shrink:0}
        .vault-info{flex:1;min-width:0}
        .vault-display-name{font-size:24px;font-weight:800;letter-spacing:-.5px;margin-bottom:2px}
        .vault-username{font-size:14px;color:#9A9A9A;margin-bottom:8px}
        .vault-bio{font-size:14px;color:#555;line-height:1.6;margin-bottom:12px;max-width:500px}
        .vault-meta{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
        .vault-meta-item{font-size:13px;color:#9A9A9A;display:flex;align-items:center;gap:4px}
        .vault-actions{display:flex;gap:8px;flex-shrink:0}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 16px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;border:none;transition:all .15s;text-decoration:none;white-space:nowrap}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF}
        .btn-outline{background:transparent;color:#0D0D0D;border:1.5px solid #D8D8D8}
        .btn-outline:hover{border-color:#0D0D0D}
        .vault-stats{background:#F7F7F7;border-bottom:1px solid #EFEFEF;padding:16px 24px}
        .vault-stats-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        .vault-stat{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:16px 20px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .vault-stat-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;margin-bottom:8px}
        .vault-stat-val{font-size:20px;font-weight:800;letter-spacing:-.5px}
        .vault-stat-lbl{font-size:11px;color:#9A9A9A;margin-top:2px}
        .vault-main{max-width:1200px;margin:0 auto;padding:24px}
        .sport-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px}
        .sport-tab{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid #EFEFEF;background:#fff;color:#555;transition:all .15s;font-family:'Plus Jakarta Sans,sans-serif'}
        .sport-tab:hover{border-color:#D8D8D8;color:#0D0D0D}
        .sport-tab.on{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
        .view-toggle{display:flex;gap:2px;background:#F7F7F7;border-radius:8px;padding:3px}
        .vbtn{padding:5px 8px;border-radius:6px;border:none;background:transparent;cursor:pointer;color:#9A9A9A;font-size:15px;transition:all .12s}
        .vbtn.on{background:#fff;color:#0D0D0D;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
        .card-tile{background:#fff;border:1px solid #EFEFEF;border-radius:8px;overflow:hidden;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;flex-direction:column;animation:fadeUp .3s ease both}
        .card-tile:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.10);border-color:#D8D8D8}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .card-img{aspect-ratio:2.5/3.5;width:100%;display:flex;align-items:center;justify-content:center;font-size:48px;position:relative;overflow:hidden;background:#F7F7F7}
        .card-img img{width:100%;height:100%;object-fit:cover}
        .card-status{position:absolute;top:8px;right:8px;font-size:9px;font-weight:700;padding:3px 7px;border-radius:100px;letter-spacing:.04em;text-transform:uppercase}
        .status-trade{background:#FEF3E2;color:#E8820C}
        .grade-chip{position:absolute;bottom:8px;left:8px;font-size:10px;font-weight:800;padding:3px 8px;border-radius:4px}
        .grade-PSA{background:#002FA7;color:#fff}
        .grade-BGS{background:#C41E3A;color:#fff}
        .grade-SGC{background:#1A6B2A;color:#fff}
        .card-body{padding:11px 13px 12px;flex:1;display:flex;flex-direction:column}
        .card-player{font-size:13px;font-weight:700;color:#0D0D0D;line-height:1.2;margin-bottom:2px}
        .card-set{font-size:11px;color:#9A9A9A;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .card-attrs{display:flex;flex-wrap:wrap;gap:4px}
        .attr-tag{font-size:11px;font-weight:600;padding:3px 8px;border-radius:100px;background:#F0F0F0;color:#444;border:1px solid #E0E0E0}
        .cards-list{display:flex;flex-direction:column;gap:10px}
        .list-tile{background:#fff;border:1px solid #EFEFEF;border-radius:8px;overflow:hidden;display:flex;align-items:center;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .list-tile:hover{box-shadow:0 4px 16px rgba(0,0,0,.07);border-color:#D8D8D8}
        .list-img{width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;margin:10px 0 10px 14px;border-radius:6px;overflow:hidden;background:#F7F7F7}
        .list-img img{width:100%;height:100%;object-fit:cover}
        .list-main{flex:1;padding:10px 14px;min-width:0}
        .list-player{font-size:14px;font-weight:700;color:#0D0D0D}
        .list-set{font-size:12px;color:#9A9A9A;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .list-attrs{display:flex;gap:4px;margin-top:5px;flex-wrap:wrap}
        .list-right{padding:0 20px;flex-shrink:0;text-align:right}
        .list-val{font-size:16px;font-weight:800;color:#1B6FF0}
        .list-val-lbl{font-size:10px;color:#9A9A9A;font-weight:600;text-transform:uppercase;margin-bottom:2px}
        .empty-state{background:#fff;border:1.5px dashed #D8D8D8;border-radius:8px;padding:64px 24px;text-align:center}
        @media(max-width:768px){.vault-stats-inner{grid-template-columns:1fr 1fr}.vault-hero-inner{flex-direction:column}}
      `}</style>

      <Nav />

      {/* VAULT HERO */}
      <div className="vault-hero">
        <div className="vault-hero-inner">
          <div className="vault-avatar">
            {(profile.display_name || profile.username || '?')[0].toUpperCase()}
          </div>
          <div className="vault-info">
            <div className="vault-display-name">{profile.display_name || profile.username}</div>
            <div className="vault-username">@{profile.username}</div>
            {profile.bio && <div className="vault-bio">{profile.bio}</div>}
            <div className="vault-meta">
              <div className="vault-meta-item">
                <FontAwesomeIcon icon={faLayerGroup} style={{color:'#1B6FF0'}}/>
                {cards.length} cards
              </div>
              <div className="vault-meta-item">
                <FontAwesomeIcon icon={faGlobe} style={{color:'#9A9A9A'}}/>
                Public vault
              </div>
              <div className="vault-meta-item">
                <FontAwesomeIcon icon={faUserPlus} style={{color:'#9A9A9A'}}/>
                {followerCount} follower{followerCount !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          <div className="vault-actions">
            {isOwner ? (
              <a href="/settings" className="btn btn-outline">
                Edit Profile
              </a>
            ) : (
              <button
                className={`btn ${isFollowing ? 'btn-outline' : 'btn-primary'}`}
                onClick={toggleFollow}
                disabled={followLoading}
              >
                <FontAwesomeIcon icon={isFollowing ? faUserMinus : faUserPlus}/>
                {followLoading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
            <button
              className="btn btn-outline"
              onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!') }}
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* VAULT STATS */}
      <div className="vault-stats">
        <div className="vault-stats-inner">
          <div className="vault-stat">
            <div className="vault-stat-icon" style={{background:'#EBF2FF'}}>
              <FontAwesomeIcon icon={faLayerGroup} style={{color:'#1B6FF0'}}/>
            </div>
            <div className="vault-stat-val">{cards.length}</div>
            <div className="vault-stat-lbl">Total Cards</div>
          </div>
          <div className="vault-stat">
            <div className="vault-stat-icon" style={{background:'#E6F9F0'}}>
              <FontAwesomeIcon icon={faChartLine} style={{color:'#00A861'}}/>
            </div>
            <div className="vault-stat-val" style={{color:'#00A861'}}>${fmtNum(totalValue)}</div>
            <div className="vault-stat-lbl">Est. Value</div>
          </div>
          <div className="vault-stat">
            <div className="vault-stat-icon" style={{background:'#F2ECFB'}}>
              <FontAwesomeIcon icon={faMedal} style={{color:'#7B4FCA'}}/>
            </div>
            <div className="vault-stat-val">{totalGraded}</div>
            <div className="vault-stat-lbl">Graded Cards</div>
          </div>
          <div className="vault-stat">
            <div className="vault-stat-icon" style={{background:'#FEF3E2'}}>
              <FontAwesomeIcon icon={faBoxOpen} style={{color:'#E8820C'}}/>
            </div>
            <div className="vault-stat-val">{totalSets}</div>
            <div className="vault-stat-lbl">Unique Sets</div>
          </div>
        </div>
      </div>

      {/* VAULT MAIN */}
      <div className="vault-main">

        {/* Sport tabs */}
        <div className="sport-tabs">
          {SPORTS.filter(s => s.v === 'all' || cards.some(c => c.sport.startsWith(s.v))).map(s => (
            <button
              key={s.v}
              className={`sport-tab${activeSport===s.v?' on':''}`}
              onClick={() => setActiveSport(s.v)}
            >
              {s.icon && <FontAwesomeIcon icon={s.icon} style={{fontSize:'12px'}}/>}
              {s.l}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div style={{fontSize:'13px',color:'#9A9A9A'}}>
            <strong style={{color:'#0D0D0D'}}>{filtered.length}</strong> card{filtered.length!==1?'s':''}
          </div>
          <div className="view-toggle">
            <button className={`vbtn${viewMode==='grid'?' on':''}`} onClick={()=>setViewMode('grid')}>
              <FontAwesomeIcon icon={faGrip}/>
            </button>
            <button className={`vbtn${viewMode==='list'?' on':''}`} onClick={()=>setViewMode('list')}>
              <FontAwesomeIcon icon={faBars}/>
            </button>
          </div>
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{fontSize:'40px',marginBottom:'16px'}}>🃏</div>
            <div style={{fontSize:'18px',fontWeight:700,marginBottom:'8px'}}>No cards yet</div>
            <div style={{fontSize:'14px',color:'#9A9A9A'}}>
              {activeSport === 'all'
                ? `@${username} hasn't added any cards yet.`
                : `No ${activeSport} cards in this vault.`
              }
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="cards-grid">
            {filtered.map((c,i) => (
              <div key={c.id} className="card-tile" style={{animationDelay:`${i*.03}s`}}>
                <div className="card-img" style={{background:c.card_image_url?'#000':cardBg(c.sport)}}>
                  {c.card_image_url
                    ? <img src={c.card_image_url} alt={c.player}/>
                    : <span style={{fontSize:'48px'}}>{sportEmoji[c.sport]||'🃏'}</span>
                  }
                  {c.status === 'trade' && (
                    <div className="card-status status-trade">
                      <FontAwesomeIcon icon={faTag} style={{marginRight:'3px'}}/>For Trade
                    </div>
                  )}
                  {c.grader && c.grader !== 'Raw' && (
                    <div className={`grade-chip grade-${c.grader}`}>{c.grader} {c.grade}</div>
                  )}
                </div>
                <div className="card-body">
                  <div className="card-player">{c.player}</div>
                  <div className="card-set">
                    {[c.year, c.brand!=='Unknown'?c.brand:'', c.set_name!=='Unknown'?c.set_name:''].filter(Boolean).join(' ')}
                    {c.cardnum?` · ${c.cardnum}`:''}
                  </div>
                  <div className="card-attrs">
                    {(c.attrs||[]).map((a:string) => (
                      <span key={a} className="attr-tag">{attrLabel(a)}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cards-list">
            {filtered.map((c,i) => (
              <div key={c.id} className="list-tile" style={{animationDelay:`${i*.025}s`}}>
                <div className="list-img" style={{background:c.card_image_url?'#000':cardBg(c.sport)}}>
                  {c.card_image_url
                    ? <img src={c.card_image_url} alt={c.player} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    : <span>{sportEmoji[c.sport]||'🃏'}</span>
                  }
                </div>
                <div className="list-main">
                  <div className="list-player">{c.player}</div>
                  <div className="list-set">
                    {[c.year, c.brand!=='Unknown'?c.brand:'', c.set_name!=='Unknown'?c.set_name:''].filter(Boolean).join(' ')}
                    {c.cardnum?` · ${c.cardnum}`:''}
                  </div>
                  <div className="list-attrs">
                    {(c.attrs||[]).map((a:string) => (
                      <span key={a} className="attr-tag">{attrLabel(a)}</span>
                    ))}
                    {c.status === 'trade' && (
                      <span className="attr-tag" style={{background:'#FEF3E2',color:'#E8820C',border:'1px solid #F5C880'}}>
                        <FontAwesomeIcon icon={faTag} style={{marginRight:'3px'}}/>For Trade
                      </span>
                    )}
                  </div>
                </div>
                {c.grader && c.grader !== 'Raw' && (
                  <div style={{padding:'0 16px',flexShrink:0}}>
                    <div style={{fontSize:'10px',color:'#9A9A9A',fontWeight:600,textTransform:'uppercase',marginBottom:'2px'}}>Grade</div>
                    <div style={{fontSize:'13px',fontWeight:700}}>{c.grader} {c.grade}</div>
                  </div>
                )}
                {c.value > 0 && (
                  <div className="list-right">
                    <div className="list-val-lbl">Value</div>
                    <div className="list-val">${c.value}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}