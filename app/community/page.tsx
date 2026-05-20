'use client'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '../lib/supabase'
import Nav from '../components/Nav'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass, faLayerGroup, faChartLine, faMedal,
  faFire, faStar, faUsers, faUserPlus, faGlobe, faArrowRight,
  faTrophy, faCrown, faBolt, faFootball, faBaseball, faBasketball,
  faHockeyPuck, faFutbol, faGamepad, faFilter,
} from '@fortawesome/free-solid-svg-icons'

function fmtNum(n: number) {
  if (n >= 1000) return (n/1000).toFixed(1).replace('.0','') + 'K'
  return n.toFixed(0)
}

function getCollectorBadge(cardCount: number) {
  if (cardCount >= 500) return { icon: faCrown, color: '#F5A623', bg: '#FEF9EC', label: 'Legend' }
  if (cardCount >= 250) return { icon: faTrophy, color: '#E8820C', bg: '#FEF3E2', label: 'Elite' }
  if (cardCount >= 100) return { icon: faMedal, color: '#7B4FCA', bg: '#F2ECFB', label: 'Veteran' }
  if (cardCount >= 25)  return { icon: faStar, color: '#1B6FF0', bg: '#EBF2FF', label: 'Enthusiast' }
  return { icon: faLayerGroup, color: '#9A9A9A', bg: '#F7F7F7', label: 'Collector' }
}

const TIERS = [
  { label:'Collector', min:1, max:24, icon:faLayerGroup, color:'#9A9A9A', bg:'#F7F7F7', border:'#E0E0E0' },
  { label:'Enthusiast', min:25, max:99, icon:faStar, color:'#1B6FF0', bg:'#EBF2FF', border:'#C5D8FF' },
  { label:'Veteran', min:100, max:249, icon:faMedal, color:'#7B4FCA', bg:'#F2ECFB', border:'#D4BAF0' },
  { label:'Elite', min:250, max:499, icon:faTrophy, color:'#E8820C', bg:'#FEF3E2', border:'#F5C880' },
  { label:'Legend', min:500, max:Infinity, icon:faCrown, color:'#F5A623', bg:'#FEF9EC', border:'#FDDBA0' },
]

const SPORTS_LIST = [
  { v:'Football', icon:faFootball, color:'#1B6FF0', bg:'#EBF2FF' },
  { v:'Baseball', icon:faBaseball, color:'#00A861', bg:'#E6F9F0' },
  { v:'Basketball', icon:faBasketball, color:'#E8820C', bg:'#FEF3E2' },
  { v:'Hockey', icon:faHockeyPuck, color:'#7B4FCA', bg:'#F2ECFB' },
  { v:'Soccer', icon:faFutbol, color:'#0097A7', bg:'#E0F7FA' },
  { v:'Gaming', icon:faGamepad, color:'#D93025', bg:'#FDECEA' },
]

interface Profile {
  id: string
  username: string
  display_name: string
  bio: string
  is_public: boolean
  created_at: string
  cardCount?: number
  totalValue?: number
  followerCount?: number
  lastCardAdded?: string
  sports?: string[]
}

export default function Community() {
  const { user } = useUser()
  const [profiles, setProfiles]           = useState<Profile[]>([])
  const [filtered, setFiltered]           = useState<Profile[]>([])
  const [loading, setLoading]             = useState(true)
  const [searchVal, setSearchVal]         = useState('')
  const [activeTab, setActiveTab]         = useState('featured')
  const [following, setFollowing]         = useState<Set<string>>(new Set())
  const [followLoading, setFollowLoading] = useState<string|null>(null)
  const [userCardCount, setUserCardCount] = useState(0)
  const [activeTier, setActiveTier]       = useState('all')
  const [activeSport, setActiveSport]     = useState('all')

  useEffect(() => { loadProfiles() }, [])
  useEffect(() => {
    if (user) { loadFollowing(); loadUserCardCount() }
  }, [user])
  useEffect(() => { filterProfiles() }, [searchVal, profiles, activeTab, activeTier, activeSport])

  const loadProfiles = async () => {
    setLoading(true)
    const { data: profileData } = await supabase
      .from('profiles').select('*').eq('is_public', true)
      .order('created_at', { ascending: false })

    if (!profileData) { setLoading(false); return }

    const enriched = await Promise.all(profileData.map(async (p) => {
      const { data: cards } = await supabase
        .from('cards')
        .select('value, qty, created_at, sport')
        .eq('user_id', p.id)
        .neq('status', 'sold')
        .order('created_at', { ascending: false })

      const { count: followerCount } = await supabase
        .from('followers').select('*', { count: 'exact', head: true })
        .eq('following_id', p.id)

      const cardCount  = cards?.reduce((s,c) => s+(c.qty||1), 0) || 0
      const totalValue = cards?.reduce((s,c) => s+(c.value||0)*(c.qty||1), 0) || 0
      const lastCardAdded = cards?.[0]?.created_at || null

      // Collect unique sports
      const sports = [...new Set((cards||[]).map(c => c.sport).filter(Boolean))] as string[]

      return { ...p, cardCount, totalValue, followerCount: followerCount || 0, lastCardAdded, sports }
    }))

    setProfiles(enriched)
    setLoading(false)
  }

  const loadFollowing = async () => {
    if (!user) return
    const { data } = await supabase.from('followers').select('following_id').eq('follower_id', user.id)
    if (data) setFollowing(new Set(data.map(f => f.following_id)))
  }

  const loadUserCardCount = async () => {
    if (!user) return
    const { data } = await supabase.from('cards').select('qty').eq('user_id', user.id).neq('status', 'sold')
    const count = data?.reduce((s,c) => s+(c.qty||1), 0) || 0
    setUserCardCount(count)
  }

  const filterProfiles = () => {
    let result = [...profiles]
    if (searchVal) {
      result = result.filter(p =>
        p.username?.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.display_name?.toLowerCase().includes(searchVal.toLowerCase())
      )
    }
    if (activeTier !== 'all') {
      const tier = TIERS.find(t => t.label === activeTier)
      if (tier) {
        result = result.filter(p => {
          const count = p.cardCount || 0
          return count >= tier.min && (tier.max === Infinity || count <= tier.max)
        })
      }
    }
    if (activeSport !== 'all') {
      result = result.filter(p => (p.sports||[]).some(s => s.startsWith(activeSport)))
    }
    if (activeTab === 'most-followed') {
      result = result.sort((a,b) => (b.followerCount||0) - (a.followerCount||0))
    } else if (activeTab === 'newest') {
      result = result.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (activeTab === 'active') {
      const cutoff = Date.now() - 7 * 86400000
      result = result
        .filter(p => p.lastCardAdded && new Date(p.lastCardAdded).getTime() > cutoff)
        .sort((a,b) => new Date(b.lastCardAdded||0).getTime() - new Date(a.lastCardAdded||0).getTime())
    } else {
      result = result.sort((a,b) => (b.followerCount||0) - (a.followerCount||0))
    }
    setFiltered(result)
  }

  const toggleFollow = async (profileId: string) => {
    if (!user) { window.location.href = '/sign-in'; return }
    setFollowLoading(profileId)
    if (following.has(profileId)) {
      await supabase.from('followers').delete().eq('follower_id', user.id).eq('following_id', profileId)
      setFollowing(prev => { const n = new Set(prev); n.delete(profileId); return n })
      setProfiles(prev => prev.map(p => p.id === profileId ? {...p, followerCount:(p.followerCount||1)-1} : p))
    } else {
      await supabase.from('followers').insert({ follower_id: user.id, following_id: profileId })
      setFollowing(prev => new Set([...prev, profileId]))
      setProfiles(prev => prev.map(p => p.id === profileId ? {...p, followerCount:(p.followerCount||0)+1} : p))
    }
    setFollowLoading(null)
  }

  const tabs = [
    {id:'featured', label:'Featured', icon:faStar},
    {id:'most-followed', label:'Most Followed', icon:faUsers},
    {id:'newest', label:'Newest', icon:faFire},
    {id:'active', label:'Active this week', icon:faBolt},
  ]

  const currentTier = TIERS.find(t => userCardCount >= t.min && (t.max === Infinity || userCardCount <= t.max)) || TIERS[0]
  const nextTier = user ? TIERS[TIERS.indexOf(currentTier) + 1] : null
  const tierPct = nextTier
    ? Math.min(100, Math.round(((userCardCount - currentTier.min) / (nextTier.min - currentTier.min)) * 100))
    : 100

  const hasActiveFilters = activeTier !== 'all' || activeSport !== 'all'

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#F7F7F7;color:#0D0D0D;-webkit-font-smoothing:antialiased}
        .community-hero{background:#0D0D0D;padding:48px 24px;position:relative;overflow:hidden}
        .community-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .community-hero-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;text-align:center}
        .community-hero-title{font-size:clamp(28px,5vw,44px);font-weight:800;color:#fff;letter-spacing:-1px;line-height:1.1;margin-bottom:8px}
        .community-hero-title em{font-style:italic;color:#7EB6FF}
        .community-hero-sub{font-size:15px;color:rgba(255,255,255,.5);margin-bottom:28px}
        .search-bar{display:flex;align-items:center;gap:10px;background:#fff;border-radius:12px;padding:8px 8px 8px 20px;box-shadow:0 8px 32px rgba(0,0,0,.3);max-width:560px;margin:0 auto}
        .search-bar input{flex:1;border:none;outline:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;color:#0D0D0D;background:transparent}
        .search-bar input::placeholder{color:#9A9A9A}
        .search-bar-btn{background:#1B6FF0;color:#fff;border:none;border-radius:8px;padding:8px 18px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer}
        .community-layout{max-width:1200px;margin:0 auto;padding:28px 24px;display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start}
        .sidebar{display:flex;flex-direction:column;gap:12px;position:sticky;top:78px}
        .sidebar-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .sidebar-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between}
        .sidebar-clear{font-size:11px;font-weight:600;color:#1B6FF0;cursor:pointer;text-transform:none;letter-spacing:0}
        .sidebar-clear:hover{text-decoration:underline}
        .filter-btn{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;border-radius:6px;border:1.5px solid #EFEFEF;background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:600;color:#555;cursor:pointer;transition:all .15s;margin-bottom:4px}
        .filter-btn:hover{border-color:#D8D8D8;color:#0D0D0D}
        .filter-btn.on{border-color:#0D0D0D;background:#0D0D0D;color:#fff}
        .filter-btn.tier-on{color:var(--tier-color);border-color:var(--tier-border);background:var(--tier-bg)}
        .filter-count{margin-left:auto;font-size:10px;font-weight:500;opacity:.7}
        .tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
        .tab{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid #EFEFEF;background:#fff;color:#555;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
        .tab:hover{border-color:#D8D8D8;color:#0D0D0D}
        .tab.on{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .profiles-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
        .profile-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06);transition:all .2s;display:flex;flex-direction:column;gap:14px}
        .profile-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);transform:translateY(-2px);border-color:#D8D8D8}
        .profile-header{display:flex;align-items:flex-start;gap:12px}
        .profile-avatar{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .profile-info{flex:1;min-width:0}
        .profile-name{font-size:15px;font-weight:800;color:#0D0D0D;letter-spacing:-.3px}
        .profile-username{font-size:12px;color:#9A9A9A;margin-top:1px}
        .profile-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
        .profile-stat{background:#F7F7F7;border-radius:6px;padding:10px;text-align:center}
        .profile-stat-val{font-size:15px;font-weight:800;color:#0D0D0D;letter-spacing:-.3px}
        .profile-stat-lbl{font-size:10px;color:#9A9A9A;text-transform:uppercase;letter-spacing:.05em;margin-top:1px}
        .profile-actions{display:flex;gap:8px}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 14px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .15s;border:none;white-space:nowrap}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF}
        .btn-outline{background:transparent;color:#0D0D0D;border:1.5px solid #D8D8D8}
        .btn-outline:hover{border-color:#0D0D0D}
        .btn-sm{padding:6px 12px;font-size:12px}
        .empty-state{background:#fff;border:1.5px dashed #D8D8D8;border-radius:8px;padding:64px 24px;text-align:center;grid-column:1/-1}
        .loading-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
        .skeleton{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:20px;height:200px;animation:pulse 1.5s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @media(max-width:900px){.community-layout{grid-template-columns:1fr}.sidebar{position:static}}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="community-hero">
        <div className="community-hero-inner">
          <h1 className="community-hero-title">Discover <em>collectors</em></h1>
          <p className="community-hero-sub">Browse public vaults, follow collectors, and find cards for trade</p>
          <div className="search-bar">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'#9A9A9A',flexShrink:0}}/>
            <input
              type="text"
              placeholder="Search collectors by name or username..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <button className="search-bar-btn">Search</button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="community-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">

          {/* ACHIEVEMENT TIERS */}
          <div className="sidebar-card">
            <div style={{background:'#fff',border:'1px solid #EFEFEF',borderRadius:'8px',padding:'16px',marginBottom:'12px',boxShadow:'0 1px 3px rgba(0,0,0,.06)'}}>
              <div style={{marginBottom:'12px'}}>
  <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#9A9A9A',display:'flex',alignItems:'center',gap:'6px',marginBottom:'2px'}}>
    <FontAwesomeIcon icon={faTrophy} style={{color:'#E8820C'}}/>
    Achievements
  </div>
  <div style={{fontSize:'10px',color:'#9A9A9A',paddingLeft:'18px'}}>Add cards to level up</div>
</div>

              {/* Tier row */}
              <div style={{display:'flex',flexDirection:'column',gap:'6px',marginBottom: user ? '12px' : '0'}}>
                {TIERS.map(tier => {
                  const achieved = userCardCount >= tier.min
                  const isCurrent = userCardCount >= tier.min && (tier.max === Infinity || userCardCount <= tier.max)
                  return (
                    <div key={tier.label} style={{
                      display:'flex',alignItems:'center',gap:'8px',padding:'8px 10px',borderRadius:'6px',
                      border:`1.5px solid ${isCurrent?tier.border:achieved?tier.border:'#EFEFEF'}`,
                      background:isCurrent?tier.bg:achieved?tier.bg:'#F7F7F7',
                      opacity: 1,
                      position:'relative',
                    }}>
                      <div style={{width:'24px',height:'24px',borderRadius:'50%',background:achieved&&user?tier.bg:'#F0F0F0',display:'flex',alignItems:'center',justifyContent:'center',border:`1.5px solid ${achieved&&user?tier.border:'#C8C8C8'}`,flexShrink:0}}>
  <FontAwesomeIcon icon={tier.icon} style={{color:achieved&&user?tier.color:'#666',fontSize:'11px'}}/>
</div>
<div style={{flex:1}}>
  <div style={{fontSize:'12px',fontWeight:700,color:achieved&&user?tier.color:'#444'}}>{tier.label}</div>
  <div style={{fontSize:'10px',color:'#666'}}>{tier.max===Infinity?`${tier.min}+ cards`:`${tier.min}–${tier.max}`}</div>
</div>
                      {isCurrent && user && (
                        <div style={{fontSize:'9px',fontWeight:700,background:tier.color,color:'#fff',padding:'2px 6px',borderRadius:'100px',flexShrink:0}}>YOU</div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Progress bar */}
              {user && (
                <div style={{borderTop:'1px solid #EFEFEF',paddingTop:'12px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px',fontSize:'11px'}}>
                    <span style={{color:currentTier.color,fontWeight:700}}>{currentTier.label}</span>
                    {nextTier && <span style={{color:'#9A9A9A'}}>{nextTier.min - userCardCount} to {nextTier.label}</span>}
                    {!nextTier && <span style={{color:currentTier.color,fontWeight:700}}>Max tier!</span>}
                  </div>
                  <div style={{height:'5px',background:'#EFEFEF',borderRadius:'100px',overflow:'hidden'}}>
                    <div style={{width:`${tierPct}%`,height:'100%',background:currentTier.color,borderRadius:'100px',transition:'width .6s ease'}}/>
                  </div>
                  <div style={{fontSize:'10px',color:'#9A9A9A',marginTop:'4px'}}>{userCardCount} card{userCardCount!==1?'s':''} in your vault</div>
                </div>
              )}

              {!user && (
                <div style={{borderTop:'1px solid #EFEFEF',paddingTop:'12px',textAlign:'center'}}>
                  <Link href="/sign-up" style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'7px 16px',borderRadius:'100px',background:'#1B6FF0',color:'#fff',textDecoration:'none',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'12px',fontWeight:600}}>
                    Start collecting
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* FILTERS */}
          <div className="sidebar-card">
            <div className="sidebar-title">
              <span><FontAwesomeIcon icon={faFilter} style={{marginRight:'6px'}}/>Filters</span>
              {hasActiveFilters && (
                <span className="sidebar-clear" onClick={() => { setActiveTier('all'); setActiveSport('all') }}>Clear all</span>
              )}
            </div>

            {/* Tier filter */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontSize:'11px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'8px'}}>Tier</div>
              <button
                className={`filter-btn${activeTier==='all'?' on':''}`}
                onClick={() => setActiveTier('all')}
              >
                <FontAwesomeIcon icon={faLayerGroup} style={{fontSize:'11px'}}/>
                All Tiers
                <span className="filter-count">({profiles.length})</span>
              </button>
              {TIERS.map(tier => {
                const count = profiles.filter(p => {
                  const c = p.cardCount || 0
                  return c >= tier.min && (tier.max === Infinity || c <= tier.max)
                }).length
                const isOn = activeTier === tier.label
                return (
                  <button
                    key={tier.label}
                    className="filter-btn"
                    onClick={() => setActiveTier(isOn ? 'all' : tier.label)}
                    style={{
                      borderColor: isOn ? tier.border : '#EFEFEF',
                      background: isOn ? tier.bg : '#fff',
                      color: isOn ? tier.color : '#555',
                    }}
                  >
                    <FontAwesomeIcon icon={tier.icon} style={{fontSize:'11px',color:isOn?tier.color:'#9A9A9A'}}/>
                    {tier.label}
                    <span className="filter-count" style={{color:isOn?tier.color:'#9A9A9A'}}>({count})</span>
                  </button>
                )
              })}
            </div>

            {/* Sport filter */}
            <div>
              <div style={{fontSize:'11px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'8px'}}>Sport</div>
              <button
                className={`filter-btn${activeSport==='all'?' on':''}`}
                onClick={() => setActiveSport('all')}
              >
                <FontAwesomeIcon icon={faLayerGroup} style={{fontSize:'11px'}}/>
                All Sports
                <span className="filter-count">({profiles.length})</span>
              </button>
              {SPORTS_LIST.map(sport => {
                const count = profiles.filter(p => (p.sports||[]).some(s => s.startsWith(sport.v))).length
                if (count === 0) return null
                const isOn = activeSport === sport.v
                return (
                  <button
                    key={sport.v}
                    className="filter-btn"
                    onClick={() => setActiveSport(isOn ? 'all' : sport.v)}
                    style={{
                      borderColor: isOn ? sport.color : '#EFEFEF',
                      background: isOn ? sport.bg : '#fff',
                      color: isOn ? sport.color : '#555',
                    }}
                  >
                    <FontAwesomeIcon icon={sport.icon} style={{fontSize:'11px',color:isOn?sport.color:'#9A9A9A'}}/>
                    {sport.v}
                    <span className="filter-count" style={{color:isOn?sport.color:'#9A9A9A'}}>({count})</span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main>
          {/* Tabs */}
          <div className="tabs">
            {tabs.map(t => (
              <button key={t.id} className={`tab${activeTab===t.id?' on':''}`} onClick={() => setActiveTab(t.id)}>
                <FontAwesomeIcon icon={t.icon} style={{fontSize:'11px'}}/>
                {t.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div style={{fontSize:'13px',color:'#9A9A9A',marginBottom:'16px'}}>
            <strong style={{color:'#0D0D0D'}}>{filtered.length}</strong> collector{filtered.length!==1?'s':''} found
            {hasActiveFilters && <span> · <span style={{color:'#1B6FF0',cursor:'pointer',fontWeight:600}} onClick={() => { setActiveTier('all'); setActiveSport('all') }}>Clear filters</span></span>}
          </div>

          {/* Profiles grid */}
          {loading ? (
            <div className="loading-grid">
              {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton"/>)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div style={{fontSize:'40px',marginBottom:'16px'}}>👥</div>
              <div style={{fontSize:'18px',fontWeight:700,marginBottom:'8px'}}>
                {searchVal ? 'No collectors found' : 'No public vaults yet'}
              </div>
              <div style={{fontSize:'14px',color:'#9A9A9A',marginBottom:'24px'}}>
                {searchVal ? `No collectors matching "${searchVal}"` : 'Be the first to make your vault public!'}
              </div>
              {!searchVal && (
                <Link href="/settings" className="btn btn-primary">Make my vault public</Link>
              )}
            </div>
          ) : (
            <div className="profiles-grid">
              {filtered.map((p, i) => (
                <div key={p.id} className="profile-card" style={{animationDelay:`${i*.04}s`}}>

                  {/* Header */}
                  <div className="profile-header">
                    <div className="profile-avatar" style={{background:getCollectorBadge(p.cardCount||0).bg,border:`2px solid ${TIERS.find(t => p.cardCount!==undefined && p.cardCount>=t.min && (t.max===Infinity||p.cardCount<=t.max))?.border||'#E0E0E0'}`}}>
                      <FontAwesomeIcon icon={getCollectorBadge(p.cardCount||0).icon} style={{color:getCollectorBadge(p.cardCount||0).color,fontSize:'20px'}}/>
                    </div>
                    <div className="profile-info">
                      <div className="profile-name">{p.display_name || p.username}</div>
                      <div className="profile-username">@{p.username}</div>
                      <div style={{display:'inline-flex',alignItems:'center',gap:'4px',marginTop:'4px',padding:'2px 8px',borderRadius:'100px',background:getCollectorBadge(p.cardCount||0).bg,fontSize:'10px',fontWeight:700,color:getCollectorBadge(p.cardCount||0).color}}>
                        <FontAwesomeIcon icon={getCollectorBadge(p.cardCount||0).icon} style={{fontSize:'9px'}}/>
                        {getCollectorBadge(p.cardCount||0).label}
                      </div>
                    </div>

                    {/* Sport icons */}
                    {(p.sports||[]).length > 0 && (
                      <div style={{display:'flex',gap:'4px',flexWrap:'wrap',justifyContent:'flex-end',flexShrink:0}}>
                        {SPORTS_LIST.filter(s => (p.sports||[]).some(ps => ps.startsWith(s.v))).map(s => (
                          <div key={s.v} title={s.v} style={{width:'22px',height:'22px',borderRadius:'50%',background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',border:`1px solid ${s.color}22`}}>
                            <FontAwesomeIcon icon={s.icon} style={{color:s.color,fontSize:'10px'}}/>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                 <div className="profile-stats">
  <div className="profile-stat">
    <div className="profile-stat-val">{p.cardCount||0}</div>
    <div className="profile-stat-lbl">Cards</div>
  </div>
  <div className="profile-stat">
    <div className="profile-stat-val">{p.followerCount||0}</div>
    <div className="profile-stat-lbl">Followers</div>
  </div>
</div>

                  {/* Actions */}
                  <div className="profile-actions">
                    <Link href={`/vault/${p.username}`} className="btn btn-outline btn-sm" style={{flex:1,justifyContent:'center'}}>
                      <FontAwesomeIcon icon={faArrowRight}/>View Vault
                    </Link>
                    {user && user.id !== p.id && (
                      <button
                        className={`btn btn-sm ${following.has(p.id)?'btn-outline':'btn-primary'}`}
                        onClick={() => toggleFollow(p.id)}
                        disabled={followLoading === p.id}
                        style={{flex:1,justifyContent:'center'}}
                      >
                        <FontAwesomeIcon icon={faUserPlus}/>
                        {followLoading === p.id ? '...' : following.has(p.id) ? 'Following' : 'Follow'}
                      </button>
                    )}
                    {!user && (
                      <Link href="/sign-up" className="btn btn-primary btn-sm" style={{flex:1,justifyContent:'center'}}>
                        <FontAwesomeIcon icon={faUserPlus}/>Follow
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}