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
} from '@fortawesome/free-solid-svg-icons'

function fmtNum(n: number) {
  if (n >= 1000) return (n/1000).toFixed(1).replace('.0','') + 'K'
  return n.toFixed(0)
}

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
}

export default function Community() {
  const { user } = useUser()
  const [profiles, setProfiles]       = useState<Profile[]>([])
  const [filtered, setFiltered]       = useState<Profile[]>([])
  const [loading, setLoading]         = useState(true)
  const [searchVal, setSearchVal]     = useState('')
  const [activeTab, setActiveTab]     = useState('featured')
  const [following, setFollowing]     = useState<Set<string>>(new Set())
  const [followLoading, setFollowLoading] = useState<string|null>(null)

  useEffect(() => {
    loadProfiles()
  }, [])

  useEffect(() => {
    if (user) loadFollowing()
  }, [user])

  useEffect(() => {
    filterProfiles()
  }, [searchVal, profiles, activeTab])

  const loadProfiles = async () => {
    setLoading(true)

    // Load all public profiles
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (!profileData) { setLoading(false); return }

    // Load card counts and values for each profile
    const enriched = await Promise.all(profileData.map(async (p) => {
      const { data: cards } = await supabase
        .from('cards')
        .select('value, qty')
        .eq('user_id', p.id)
        .neq('status', 'sold')

      const { count: followerCount } = await supabase
        .from('followers')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', p.id)

      const cardCount = cards?.reduce((s,c) => s+(c.qty||1), 0) || 0
      const totalValue = cards?.reduce((s,c) => s+(c.value||0)*(c.qty||1), 0) || 0

      return { ...p, cardCount, totalValue, followerCount: followerCount || 0 }
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

  const filterProfiles = () => {
    let result = [...profiles]
    if (searchVal) {
      result = result.filter(p =>
        p.username?.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.display_name?.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.bio?.toLowerCase().includes(searchVal.toLowerCase())
      )
    }
    if (activeTab === 'top-value') {
      result = result.sort((a,b) => (b.totalValue||0) - (a.totalValue||0))
    } else if (activeTab === 'most-followed') {
      result = result.sort((a,b) => (b.followerCount||0) - (a.followerCount||0))
    } else if (activeTab === 'most-cards') {
      result = result.sort((a,b) => (b.cardCount||0) - (a.cardCount||0))
    } else if (activeTab === 'newest') {
      result = result.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
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
      await supabase.from('followers').insert({
        follower_id: user.id,
        following_id: profileId,
      })
      setFollowing(prev => new Set([...prev, profileId]))
      setProfiles(prev => prev.map(p => p.id === profileId ? {...p, followerCount:(p.followerCount||0)+1} : p))
    }
    setFollowLoading(null)
  }

  const tabs = [
    {id:'featured', label:'Featured', icon:faStar},
    {id:'top-value', label:'Top Value', icon:faChartLine},
    {id:'most-followed', label:'Most Followed', icon:faUsers},
    {id:'most-cards', label:'Most Cards', icon:faLayerGroup},
    {id:'newest', label:'Newest', icon:faFire},
  ]

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
        .community-stats{background:#fff;border-bottom:1px solid #EFEFEF;padding:16px 24px}
        .community-stats-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:32px;justify-content:center}
        .community-stat{text-align:center}
        .community-stat-val{font-size:20px;font-weight:800;color:#0D0D0D}
        .community-stat-lbl{font-size:11px;color:#9A9A9A;text-transform:uppercase;letter-spacing:.06em}
        .community-main{max-width:1200px;margin:0 auto;padding:28px 24px}
        .tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:24px}
        .tab{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid #EFEFEF;background:#fff;color:#555;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
        .tab:hover{border-color:#D8D8D8;color:#0D0D0D}
        .tab.on{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .profiles-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
        .profile-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06);transition:all .2s;display:flex;flex-direction:column;gap:14px}
        .profile-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);transform:translateY(-2px);border-color:#D8D8D8}
        .profile-header{display:flex;align-items:flex-start;gap:12px}
        .profile-avatar{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#1B6FF0,#7EB6FF);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#fff;flex-shrink:0}
        .profile-info{flex:1;min-width:0}
        .profile-name{font-size:15px;font-weight:800;color:#0D0D0D;letter-spacing:-.3px}
        .profile-username{font-size:12px;color:#9A9A9A;margin-top:1px}
        .profile-bio{font-size:13px;color:#555;line-height:1.5;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
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
          <p className="community-hero-sub">Browse public vaults, follow collectors, and find cards For Trade</p>
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

      {/* COMMUNITY STATS */}
      <div className="community-stats">
        <div className="community-stats-inner">
          <div className="community-stat">
            <div className="community-stat-val">{profiles.length}</div>
            <div className="community-stat-lbl">Public Vaults</div>
          </div>
          <div className="community-stat">
            <div className="community-stat-val">{fmtNum(profiles.reduce((s,p) => s+(p.cardCount||0), 0))}</div>
            <div className="community-stat-lbl">Cards Tracked</div>
          </div>
          <div className="community-stat">
            <div className="community-stat-val">${fmtNum(profiles.reduce((s,p) => s+(p.totalValue||0), 0))}</div>
            <div className="community-stat-lbl">Total Value</div>
          </div>
          <div className="community-stat">
            <div className="community-stat-val">{profiles.filter(p => (p.cardCount||0) > 0).length}</div>
            <div className="community-stat-lbl">Active Collectors</div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="community-main">

        {/* Tabs */}
        <div className="tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`tab${activeTab===t.id?' on':''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <FontAwesomeIcon icon={t.icon} style={{fontSize:'11px'}}/>
              {t.label}
            </button>
          ))}
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
              {searchVal
                ? `No collectors matching "${searchVal}"`
                : 'Be the first to make your vault public!'
              }
            </div>
            {!searchVal && (
              <Link href="/settings" className="btn btn-primary">
                Make my vault public
              </Link>
            )}
          </div>
        ) : (
          <div className="profiles-grid">
            {filtered.map((p, i) => (
              <div key={p.id} className="profile-card" style={{animationDelay:`${i*.04}s`}}>

                {/* Header */}
                <div className="profile-header">
                  <div className="profile-avatar">
                    {(p.display_name || p.username || '?')[0].toUpperCase()}
                  </div>
                  <div className="profile-info">
                    <div className="profile-name">{p.display_name || p.username}</div>
                    <div className="profile-username">@{p.username}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'4px',fontSize:'11px',color:'#9A9A9A',flexShrink:0}}>
                    <FontAwesomeIcon icon={faGlobe} style={{fontSize:'10px'}}/>
                    Public
                  </div>
                </div>

                {/* Bio */}
                {p.bio && <div className="profile-bio">{p.bio}</div>}

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