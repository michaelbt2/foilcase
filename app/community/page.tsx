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
  faTrophy, faCrown, faBolt,
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
  const [activeTier, setActiveTier] = useState('all')
  useEffect(() => { loadProfiles() }, [])

  useEffect(() => {
    if (user) {
      loadFollowing()
      loadUserCardCount()
    }
  }, [user])

  useEffect(() => { filterProfiles() }, [searchVal, profiles, activeTab, activeTier])

  const loadProfiles = async () => {
    setLoading(true)
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (!profileData) { setLoading(false); return }

    const enriched = await Promise.all(profileData.map(async (p) => {
      const { data: cards } = await supabase
        .from('cards')
        .select('value, qty, created_at')
        .eq('user_id', p.id)
        .neq('status', 'sold')
        .order('created_at', { ascending: false })

      const { count: followerCount } = await supabase
        .from('followers')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', p.id)

      const cardCount = cards?.reduce((s,c) => s+(c.qty||1), 0) || 0
      const totalValue = cards?.reduce((s,c) => s+(c.value||0)*(c.qty||1), 0) || 0
      const lastCardAdded = cards?.[0]?.created_at || null

      return { ...p, cardCount, totalValue, followerCount: followerCount || 0, lastCardAdded }
    }))

    setProfiles(enriched)
    setLoading(false)
  }

  const loadFollowing = async () => {
    if (!user) return
    const { data } = await supabase
      .from('followers')
      .select('following_id')
      .eq('follower_id', user.id)
    if (data) setFollowing(new Set(data.map(f => f.following_id)))
  }

  const loadUserCardCount = async () => {
    if (!user) return
    const { data } = await supabase
      .from('cards')
      .select('qty')
      .eq('user_id', user.id)
      .neq('status', 'sold')
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
  // Tier filter
  if (activeTier !== 'all') {
    const tier = TIERS.find(t => t.label === activeTier)
    if (tier) {
      result = result.filter(p => {
        const count = p.cardCount || 0
        return count >= tier.min && (tier.max === Infinity || count <= tier.max)
      })
    }
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
      await supabase.from('followers').delete()
        .eq('follower_id', user.id)
        .eq('following_id', profileId)
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

  // Tier calculations for signed-in user
  const currentTier = TIERS.find(t => userCardCount >= t.min && (t.max === Infinity || userCardCount <= t.max)) || TIERS[0]
  const nextTier = user ? TIERS[TIERS.indexOf(currentTier) + 1] : null
  const tierPct = nextTier
    ? Math.min(100, Math.round(((userCardCount - currentTier.min) / (nextTier.min - currentTier.min)) * 100))
    : 100

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
        .community-main{max-width:1200px;margin:0 auto;padding:28px 24px}
        .tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:24px}
        .tab{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid #EFEFEF;background:#fff;color:#555;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
        .tab:hover{border-color:#D8D8D8;color:#0D0D0D}
        .tab.on{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .profiles-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
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
        .loading-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
        .skeleton{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:20px;height:200px;animation:pulse 1.5s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @media(max-width:768px){.community-stats-inner{gap:16px}.profiles-grid{grid-template-columns:1fr}}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="community-hero">
        <div className="community-hero-inner">
          <h1 className="community-hero-title">Discover <em>collectors</em></h1>
          <p className="community-hero-sub">Browse public vaults, follow collectors, and find cards for sell</p>
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

      {/* MAIN */}
      <div className="community-main">

        {/* ACHIEVEMENT TIERS */}
        <div style={{background:'#fff',border:'1px solid #EFEFEF',borderRadius:'8px',padding:'20px 24px',marginBottom:'20px',boxShadow:'0 1px 3px rgba(0,0,0,.06)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontSize:'13px',fontWeight:700,color:'#0D0D0D'}}>
              <FontAwesomeIcon icon={faTrophy} style={{color:'#E8820C',marginRight:'6px'}}/>
              Collector Achievements
            </div>
            <div style={{fontSize:'12px',color:'#9A9A9A'}}>Add cards to your vault to level up</div>
          </div>

          {/* Tier row */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'8px',marginBottom: user ? '20px' : '0'}}>
            {TIERS.map(tier => {
              const achieved = userCardCount >= tier.min
              const isCurrent = userCardCount >= tier.min && (tier.max === Infinity || userCardCount <= tier.max)
              return (
                <div key={tier.label} style={{
                  display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',
                  padding:'12px 8px',borderRadius:'8px',
                  border:`1.5px solid ${isCurrent ? tier.border : achieved ? tier.border : '#EFEFEF'}`,
                  background:isCurrent ? tier.bg : achieved ? tier.bg : '#F7F7F7',
                  opacity: user ? (achieved ? 1 : 0.45) : 1,
                  transition:'all .2s',
                  position:'relative',
                }}>
                  {isCurrent && user && (
                    <div style={{position:'absolute',top:'-8px',left:'50%',transform:'translateX(-50%)',background:tier.color,color:'#fff',fontSize:'9px',fontWeight:700,padding:'2px 8px',borderRadius:'100px',whiteSpace:'nowrap'}}>
                      YOUR TIER
                    </div>
                  )}
                  <div style={{width:'36px',height:'36px',borderRadius:'50%',background:achieved&&user?tier.bg:'#EFEFEF',display:'flex',alignItems:'center',justifyContent:'center',border:`2px solid ${achieved&&user?tier.border:'#E0E0E0'}`}}>
                    <FontAwesomeIcon icon={tier.icon} style={{color:achieved&&user?tier.color:'#9A9A9A',fontSize:'16px'}}/>
                  </div>
                  <div style={{fontSize:'12px',fontWeight:700,color:achieved&&user?tier.color:'#9A9A9A'}}>{tier.label}</div>
                  <div style={{fontSize:'10px',color:'#9A9A9A',textAlign:'center'}}>
                    {tier.max === Infinity ? `${tier.min}+ cards` : `${tier.min}–${tier.max} cards`}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Personal progress bar for signed-in users */}
          {user && (
            <div style={{borderTop:'1px solid #EFEFEF',paddingTop:'16px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:'28px',height:'28px',borderRadius:'50%',background:currentTier.bg,display:'flex',alignItems:'center',justifyContent:'center',border:`2px solid ${currentTier.border}`}}>
                    <FontAwesomeIcon icon={currentTier.icon} style={{color:currentTier.color,fontSize:'12px'}}/>
                  </div>
                  <div>
                    <div style={{fontSize:'13px',fontWeight:700,color:'#0D0D0D'}}>
                      You are a <span style={{color:currentTier.color}}>{currentTier.label}</span>
                    </div>
                    <div style={{fontSize:'11px',color:'#9A9A9A'}}>{userCardCount} card{userCardCount!==1?'s':''} in your vault</div>
                  </div>
                </div>
                {nextTier ? (
                  <div style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'12px',color:'#9A9A9A'}}>
                    <span>{nextTier.min - userCardCount} cards to</span>
                    <div style={{display:'flex',alignItems:'center',gap:'4px',fontWeight:700,color:nextTier.color}}>
                      <FontAwesomeIcon icon={nextTier.icon} style={{fontSize:'11px'}}/>
                      {nextTier.label}
                    </div>
                  </div>
                ) : (
                  <div style={{fontSize:'12px',fontWeight:700,color:currentTier.color}}>
                    <FontAwesomeIcon icon={faCrown} style={{marginRight:'4px'}}/>
                    Maximum tier reached!
                  </div>
                )}
              </div>
              <div style={{height:'6px',background:'#EFEFEF',borderRadius:'100px',overflow:'hidden'}}>
                <div style={{width:`${tierPct}%`,height:'100%',background:currentTier.color,borderRadius:'100px',transition:'width .6s ease'}}></div>
              </div>
              {nextTier && (
                <div style={{display:'flex',justifyContent:'space-between',marginTop:'4px',fontSize:'10px',color:'#9A9A9A'}}>
                  <span>{currentTier.min} cards</span>
                  <span>{nextTier.min} cards</span>
                </div>
              )}
            </div>
          )}

          {/* CTA for signed-out users */}
          {!user && (
            <div style={{borderTop:'1px solid #EFEFEF',paddingTop:'16px',textAlign:'center'}}>
              <Link href="/sign-up" style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'8px 20px',borderRadius:'100px',background:'#1B6FF0',color:'#fff',textDecoration:'none',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'13px',fontWeight:600}}>
                Start collecting to earn achievements
              </Link>
            </div>
          )}
        </div>

        {/* Tabs */}
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px',marginBottom:'16px'}}>
  <div className="tabs" style={{margin:0}}>
    {tabs.map(t => (
      <button key={t.id} className={`tab${activeTab===t.id?' on':''}`} onClick={() => setActiveTab(t.id)}>
        <FontAwesomeIcon icon={t.icon} style={{fontSize:'11px'}}/>
        {t.label}
      </button>
    ))}
  </div>
</div>

{/* Tier filter pills */}
<div style={{display:'flex',alignItems:'center',gap:'6px',flexWrap:'wrap',marginBottom:'20px'}}>
  <span style={{fontSize:'11px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.06em',marginRight:'4px'}}>Tier:</span>
  <button
    onClick={() => setActiveTier('all')}
    style={{display:'inline-flex',alignItems:'center',gap:'5px',padding:'5px 12px',borderRadius:'100px',fontSize:'12px',fontWeight:600,cursor:'pointer',border:`1.5px solid ${activeTier==='all'?'#0D0D0D':'#EFEFEF'}`,background:activeTier==='all'?'#0D0D0D':'#fff',color:activeTier==='all'?'#fff':'#555',transition:'all .15s',fontFamily:'Plus Jakarta Sans,sans-serif'}}
  >
    All
  </button>
  {TIERS.map(tier => {
    const count = profiles.filter(p => {
      const c = p.cardCount || 0
      return c >= tier.min && (tier.max === Infinity || c <= tier.max)
    }).length
    return (
      <button
        key={tier.label}
        onClick={() => setActiveTier(activeTier === tier.label ? 'all' : tier.label)}
        style={{
          display:'inline-flex',alignItems:'center',gap:'5px',
          padding:'5px 12px',borderRadius:'100px',fontSize:'12px',fontWeight:600,
          cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',transition:'all .15s',
          border:`1.5px solid ${activeTier===tier.label?tier.border:'#EFEFEF'}`,
          background:activeTier===tier.label?tier.bg:'#fff',
          color:activeTier===tier.label?tier.color:'#555',
        }}
      >
        <FontAwesomeIcon icon={tier.icon} style={{fontSize:'10px',color:activeTier===tier.label?tier.color:'#9A9A9A'}}/>
        {tier.label}
        <span style={{fontSize:'10px',color:activeTier===tier.label?tier.color:'#9A9A9A',fontWeight:500}}>({count})</span>
      </button>
    )
  })}
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
                </div>

                {/* Stats */}
                <div className="profile-stats">
                  <div className="profile-stat">
                    <div className="profile-stat-val">{p.cardCount||0}</div>
                    <div className="profile-stat-lbl">Cards</div>
                  </div>
                  <div className="profile-stat">
                    <div className="profile-stat-val" style={{color:'#00A861'}}>${fmtNum(p.totalValue||0)}</div>
                    <div className="profile-stat-lbl">Value</div>
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
      </div>
    </>
  )
}