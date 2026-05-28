'use client'
import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { supabase } from '../../lib/supabase'
import Nav from '../../components/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLayerGroup, faChartLine, faMedal, faBoxOpen, faGlobe,
  faLock, faUserPlus, faUserMinus, faGrip, faBars,
  faFootball, faBaseball, faBasketball, faHockeyPuck,
  faFutbol, faGamepad, faTag, faArrowUpRightFromSquare, faStar, faTrophy, faCrown, faShareNodes, faShoppingCart,
  faArrowRight, faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { analytics } from '../../lib/analytics'
import Footer from '../../components/Footer'
import { ebayAffiliateUrl, ebayUserUrl } from '../../lib/ebay'

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

const SPORT_COLORS: Record<string,{bg:string,color:string}> = {
  Football:{bg:'#EBF2FF',color:'#1B6FF0'},
  Baseball:{bg:'#E6F9F0',color:'#00A861'},
  Basketball:{bg:'#FEF3E2',color:'#E8820C'},
  Hockey:{bg:'#F2ECFB',color:'#7B4FCA'},
  Soccer:{bg:'#E0F7FA',color:'#0097A7'},
  Gaming:{bg:'#FDECEA',color:'#D93025'},
  'Gaming / TCG':{bg:'#FDECEA',color:'#D93025'},
}

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

function getCollectorBadge(cardCount: number) {
  if (cardCount >= 500) return { icon: faCrown, color: '#F5A623', bg: '#FEF9EC', label: 'Legend' }
  if (cardCount >= 250) return { icon: faTrophy, color: '#E8820C', bg: '#FEF3E2', label: 'Elite' }
  if (cardCount >= 100) return { icon: faMedal, color: '#7B4FCA', bg: '#F2ECFB', label: 'Veteran' }
  if (cardCount >= 25)  return { icon: faStar, color: '#1B6FF0', bg: '#EBF2FF', label: 'Enthusiast' }
  return { icon: faLayerGroup, color: '#9A9A9A', bg: '#F7F7F7', label: 'Collector' }
}

const TIERS = [
  { label:'Collector', min:1, max:24, border:'#E0E0E0' },
  { label:'Enthusiast', min:25, max:99, border:'#C5D8FF' },
  { label:'Veteran', min:100, max:249, border:'#D4BAF0' },
  { label:'Elite', min:250, max:499, border:'#F5C880' },
  { label:'Legend', min:500, max:Infinity, border:'#FDDBA0' },
]

export default function PublicVault() {
  const params = useParams()
  const searchParams = useSearchParams()
  const username = params.username as string
  const { user } = useUser()

  const [profile, setProfile]             = useState<any>(null)
  const [cards, setCards]                 = useState<any[]>([])
  const [wants, setWants]                 = useState<any[]>([])
  const [loading, setLoading]             = useState(true)
  const [notFound, setNotFound]           = useState(false)
  const [isPrivate, setIsPrivate]         = useState(false)
  const [activeSport, setActiveSport]     = useState('all')
  const [viewMode, setViewMode]           = useState<'grid'|'list'>('grid')
  const [isFollowing, setIsFollowing]     = useState(false)
  const [followerCount, setFollowerCount] = useState(0)
  const [followLoading, setFollowLoading] = useState(false)
  const [selectedCard, setSelectedCard]   = useState<any>(null)
  const [cardImageTab, setCardImageTab]   = useState<'front'|'back'>('front')
  const [lightboxImage, setLightboxImage] = useState<string|null>(null)
  const [activeVaultTab, setActiveVaultTab] = useState<'vault'|'wantlist'>(
    searchParams.get('tab') === 'wantlist' ? 'wantlist' : 'vault'
  )

  useEffect(() => { if (username) loadVault() }, [username])
  useEffect(() => { if (user && profile) checkFollowing() }, [user, profile])
  useEffect(() => { if (selectedCard) setCardImageTab('front') }, [selectedCard?.id])

  const loadVault = async () => {
    setLoading(true)
    const { data: profileData } = await supabase
      .from('profiles').select('*').eq('username', username).single()

    if (!profileData) { setNotFound(true); setLoading(false); return }
    if (!profileData.is_public) { setIsPrivate(true); setLoading(false); return }
    setProfile(profileData)

    const { data: cardsData } = await supabase
      .from('cards').select('*').eq('user_id', profileData.id)
      .neq('status', 'sold').order('created_at', { ascending: false })

    setCards(cardsData || [])

    const { data: wantsData } = await supabase
      .from('wants').select('*').eq('user_id', profileData.id)
      .order('created_at', { ascending: false })

    setWants(wantsData || [])

    analytics.vaultVisited({ username: profileData.username, cardCount: cardsData?.length || 0 })

    const { count } = await supabase
      .from('followers').select('*', { count: 'exact', head: true })
      .eq('following_id', profileData.id)

    setFollowerCount(count || 0)
    setLoading(false)
  }

  const checkFollowing = async () => {
    if (!user || !profile) return
    const { data } = await supabase.from('followers').select('id')
      .eq('follower_id', user.id).eq('following_id', profile.id).single()
    setIsFollowing(!!data)
  }

  const toggleFollow = async () => {
    if (!user) { window.location.href = '/sign-in'; return }
    setFollowLoading(true)
    if (isFollowing) {
      await supabase.from('followers').delete()
        .eq('follower_id', user.id).eq('following_id', profile.id)
      setIsFollowing(false)
      setFollowerCount(c => c - 1)
    } else {
      await supabase.from('followers').insert({ follower_id: user.id, following_id: profile.id })
      setIsFollowing(true)
      setFollowerCount(c => c + 1)
    }
    setFollowLoading(false)
  }

  const filtered = cards.filter(c => activeSport === 'all' || c.sport.startsWith(activeSport))
  const totalGraded = cards.filter(c => c.grader && c.grader !== 'Raw').length
  const totalSets   = new Set(cards.map(c => c.set_name)).size
  const isOwner     = user?.id === profile?.id

  if (loading) return (
    <>
      <Nav />
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
        <div style={{fontSize:'16px',fontWeight:600,color:'#555'}}>Loading vault...</div>
      </div>
    </>
  )

  if (notFound) return (
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

  if (isPrivate) return (
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

  return (
    <>
      <style>{`
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
        .vault-stats{background:#F7F7F7;border-bottom:1px solid #EFEFEF;padding:16px 24px}
        .vault-stats-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .vault-stat{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:16px 20px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .vault-stat-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;margin-bottom:8px}
        .vault-stat-val{font-size:20px;font-weight:800;letter-spacing:-.5px}
        .vault-stat-lbl{font-size:11px;color:#9A9A9A;margin-top:2px}
        .vault-main{max-width:1200px;margin:0 auto;padding:24px}
        .vault-tab-toggle{display:flex;gap:8px;margin-bottom:24px}
        .vault-tab-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 18px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid #EFEFEF;background:#fff;color:#555;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
        .vault-tab-pill:hover{border-color:#D8D8D8;color:#0D0D0D}
        .vault-tab-pill.on{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .sport-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px}
        .sport-tab{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid #EFEFEF;background:#fff;color:#555;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
        .sport-tab:hover{border-color:#D8D8D8;color:#0D0D0D}
        .sport-tab.on{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
        .view-toggle{display:flex;gap:2px;background:#F7F7F7;border-radius:8px;padding:3px}
        .vbtn{padding:5px 8px;border-radius:6px;border:none;background:transparent;cursor:pointer;color:#9A9A9A;font-size:15px;transition:all .12s}
        .vbtn.on{background:#fff;color:#0D0D0D;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
        .card-tile{background:#fff;border:1px solid #EFEFEF;border-radius:8px;overflow:hidden;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;flex-direction:column;animation:fadeUp .3s ease both;cursor:pointer}
        .card-tile:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.10);border-color:#D8D8D8}
        .card-img{aspect-ratio:2.5/3.5;width:100%;display:flex;align-items:center;justify-content:center;font-size:48px;position:relative;overflow:hidden;background:#F7F7F7}
        .card-img img{width:100%;height:100%;object-fit:cover}
        .card-status{position:absolute;top:8px;right:8px;font-size:9px;font-weight:700;padding:3px 7px;border-radius:100px;letter-spacing:.04em;text-transform:uppercase}
        .status-trade{background:#FEF3E2;color:#E8820C}
        .status-sale{background:#EBF2FF;color:#1B6FF0}
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
        .list-tile{background:#fff;border:1px solid #EFEFEF;border-radius:8px;overflow:hidden;display:flex;align-items:center;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);cursor:pointer}
        .list-tile:hover{box-shadow:0 4px 16px rgba(0,0,0,.07);border-color:#D8D8D8}
        .list-img{width:60px;height:84px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;margin:10px 0 10px 14px;border-radius:6px;overflow:hidden;background:#F7F7F7}
        .list-img img{width:100%;height:100%;object-fit:cover}
        .list-main{flex:1;padding:10px 14px;min-width:0}
        .list-player{font-size:14px;font-weight:700;color:#0D0D0D}
        .list-set{font-size:12px;color:#9A9A9A;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .list-attrs{display:flex;gap:4px;margin-top:5px;flex-wrap:wrap}
        .want-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
        .want-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;flex-direction:column;gap:10px;transition:all .2s}
        .want-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);border-color:#D8D8D8;transform:translateY(-2px)}
        .card-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:400;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
        .card-modal{background:#fff;border-radius:12px;width:100%;max-width:680px;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,.2);animation:modalIn .2s ease}
        .card-modal-body{display:grid;grid-template-columns:260px 1fr;flex:1;overflow:hidden}
        .card-modal-left{background:#F7F7F7;border-right:1px solid #EFEFEF;padding:20px;display:flex;flex-direction:column;gap:12px;overflow-y:auto}
        .card-modal-right{padding:24px;overflow-y:auto;display:flex;flex-direction:column;gap:16px}
        .card-modal-img{border-radius:8px;overflow:hidden;background:#EFEFEF;display:flex;align-items:center;justify-content:center;aspect-ratio:2.5/3.5}
        .card-modal-img img{width:100%;height:100%;object-fit:cover;cursor:zoom-in}
        .card-modal-tab{display:flex;gap:4px;background:#EFEFEF;border-radius:8px;padding:3px}
        .card-modal-tab-btn{flex:1;padding:5px;border-radius:6px;border:none;font-size:12px;font-weight:600;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s;background:transparent;color:#9A9A9A}
        .card-modal-tab-btn.on{background:#fff;color:#0D0D0D;box-shadow:0 1px 3px rgba(0,0,0,.08)}
        .modal-hdr{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #EFEFEF;flex-shrink:0}
        .modal-hdr-title{font-size:15px;font-weight:700;color:#0D0D0D}
        .modal-close{width:28px;height:28px;border-radius:50%;border:none;background:#F7F7F7;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;color:#555;transition:all .15s}
        .modal-close:hover{background:#EFEFEF;color:#0D0D0D}
        .detail-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #EFEFEF;font-size:13px}
        .detail-row:last-child{border-bottom:none}
        .detail-lbl{color:#9A9A9A;font-weight:500}
        .detail-val{font-weight:600;color:#0D0D0D;text-align:right}
        .lightbox-overlay{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;cursor:zoom-out;animation:fadeIn .2s ease}
        .lightbox-img{max-width:90vw;max-height:90vh;object-fit:contain;border-radius:8px;box-shadow:0 24px 64px rgba(0,0,0,.5);animation:scaleIn .2s ease}
        .lightbox-close{position:fixed;top:20px;right:24px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.1);border:none;cursor:pointer;color:#fff;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all .15s}
        .lightbox-close:hover{background:rgba(255,255,255,.2)}
        @media(max-width:768px){.vault-stats-inner{grid-template-columns:1fr 1fr}.vault-hero-inner{flex-direction:column}.card-modal-body{grid-template-columns:1fr}.card-modal-left{border-right:none;border-bottom:1px solid #EFEFEF}}
      `}</style>

      <Nav />

      {/* VAULT HERO */}
      <div className="vault-hero">
        <div className="vault-hero-inner">
          <div className="vault-avatar" style={{background:getCollectorBadge(cards.length).bg,border:`3px solid ${TIERS.find(t => cards.length>=t.min && (t.max===Infinity||cards.length<=t.max))?.border||'#E0E0E0'}`}}>
            <FontAwesomeIcon icon={getCollectorBadge(cards.length).icon} style={{color:getCollectorBadge(cards.length).color,fontSize:'28px'}}/>
          </div>
          <div className="vault-info">
            <div className="vault-display-name">{profile.display_name || profile.username}</div>
            <div className="vault-username">@{profile.username}</div>
            {profile.bio && <div className="vault-bio">{profile.bio}</div>}
            {profile.ebay_username && (
              <a
                href={ebayUserUrl(profile.ebay_username)}
                target="_blank"
                rel="noopener noreferrer"
                style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'5px 12px',borderRadius:'100px',background:'#EBF2FF',border:'1px solid #C5D8FF',fontSize:'12px',fontWeight:600,color:'#1B6FF0',textDecoration:'none',marginBottom:'10px',transition:'all .15s'}}
                onMouseOver={e=>{e.currentTarget.style.background='#1B6FF0';e.currentTarget.style.color='#fff'}}
                onMouseOut={e=>{e.currentTarget.style.background='#EBF2FF';e.currentTarget.style.color='#1B6FF0'}}
              >
                🛒 Shop on eBay → @{profile.ebay_username}
              </a>
            )}
            <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap',marginTop:'8px'}}>
              <div className="vault-meta">
                <div className="vault-meta-item">
                  <FontAwesomeIcon icon={faUserPlus} style={{color:'#9A9A9A'}}/>
                  {followerCount} follower{followerCount !== 1 ? 's' : ''}
                </div>
              </div>
              <div style={{display:'flex',gap:'8px'}}>
                {isOwner ? (
                  <a href="/settings" className="btn btn-outline btn-sm">Edit profile</a>
                ) : (
                  <button
                    className={`btn btn-sm ${isFollowing ? 'btn-outline' : 'btn-primary'}`}
                    onClick={toggleFollow}
                    disabled={followLoading}
                  >
                    <FontAwesomeIcon icon={isFollowing ? faUserMinus : faUserPlus}/>
                    {followLoading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                )}
                <button
                  className="btn btn-sm"
                  style={{background:'transparent',color:'#0D0D0D',fontWeight:600,border:'1.5px solid #D8D8D8'}}
                  onMouseOver={e=>{e.currentTarget.style.background='#F7F7F7';e.currentTarget.style.borderColor='#0D0D0D'}}
                  onMouseOut={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='#D8D8D8'}}
                  onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); analytics.vaultShared() }}
                >
                  <FontAwesomeIcon icon={faShareNodes}/>
                  Share vault
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VAULT STATS */}
      <div className="vault-stats">
        <div className="vault-stats-inner">
          <div className="vault-stat">
            <div className="vault-stat-icon" style={{background:'#EBF2FF',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <FontAwesomeIcon icon={faLayerGroup} style={{color:'#1B6FF0'}}/>
            </div>
            <div className="vault-stat-val">{cards.length}</div>
            <div className="vault-stat-lbl">Total Cards</div>
          </div>
          <div className="vault-stat">
            <div className="vault-stat-icon" style={{background:'#F2ECFB',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <FontAwesomeIcon icon={faMedal} style={{color:'#7B4FCA'}}/>
            </div>
            <div className="vault-stat-val">{totalGraded}</div>
            <div className="vault-stat-lbl">Graded Cards</div>
          </div>
          <div className="vault-stat">
            <div className="vault-stat-icon" style={{background:'#FEF3E2',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <FontAwesomeIcon icon={faBoxOpen} style={{color:'#E8820C'}}/>
            </div>
            <div className="vault-stat-val">{totalSets}</div>
            <div className="vault-stat-lbl">Unique Sets</div>
          </div>
        </div>
      </div>

      {/* VAULT MAIN */}
      <div className="vault-main">

        {/* Tab toggle */}
        <div className="vault-tab-toggle">
          <button
            className={`vault-tab-pill${activeVaultTab === 'vault' ? ' on' : ''}`}
            onClick={() => setActiveVaultTab('vault')}
          >
            <FontAwesomeIcon icon={faLayerGroup} style={{fontSize:'11px'}}/>
            My Vault <span style={{opacity:.6,fontWeight:500}}>({cards.length})</span>
          </button>
          <button
            className={`vault-tab-pill${activeVaultTab === 'wantlist' ? ' on' : ''}`}
            onClick={() => setActiveVaultTab('wantlist')}
          >
            <FontAwesomeIcon icon={faStar} style={{fontSize:'11px'}}/>
            Want List <span style={{opacity:.6,fontWeight:500}}>({wants.length})</span>
          </button>
        </div>

        {/* VAULT TAB */}
        {activeVaultTab === 'vault' && (
          <>
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
                  {activeSport === 'all' ? `@${username} hasn't added any cards yet.` : `No ${activeSport} cards in this vault.`}
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="cards-grid">
                {filtered.map((c,i) => (
                  <div key={c.id} className="card-tile" style={{animationDelay:`${i*.03}s`}}>
                    <div className="card-img" style={{background:c.card_image_url?'#000':cardBg(c.sport),cursor:c.card_image_url?'zoom-in':'pointer'}}>
                      {c.card_image_url
                        ? <img src={c.card_image_url} alt={c.player} onClick={e=>{e.stopPropagation();setLightboxImage(c.card_image_url)}}/>
                        : <span style={{fontSize:'48px'}}>{sportEmoji[c.sport]||'🃏'}</span>
                      }
                      {c.card_image_back_url && (
                        <button
                          onClick={e=>{e.stopPropagation();setLightboxImage(c.card_image_back_url)}}
                          style={{position:'absolute',bottom:'8px',right:'8px',background:'rgba(0,0,0,.6)',color:'#fff',border:'none',borderRadius:'4px',fontSize:'9px',fontWeight:700,padding:'3px 6px',cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',letterSpacing:'.04em'}}
                        >BACK</button>
                      )}
                      {c.status === 'trade' && (
                        <div className="card-status status-trade">
                          <FontAwesomeIcon icon={faTag} style={{marginRight:'3px'}}/>For Trade
                        </div>
                      )}
                      {c.status === 'sale' && <div className="card-status status-sale">For Sale</div>}
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
                          <span key={a} className="attr-tag">
                            {a === 'numbered' && c.print_run ? c.print_run : attrLabel(a)}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedCard(c)}
                        style={{marginTop:'8px',width:'100%',padding:'6px 0',borderRadius:'6px',border:'1.5px solid #EFEFEF',background:'#fff',fontSize:'11px',fontWeight:600,color:'#555',cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',transition:'all .15s'}}
                        onMouseOver={e=>{e.currentTarget.style.borderColor='#1B6FF0';e.currentTarget.style.color='#1B6FF0'}}
                        onMouseOut={e=>{e.currentTarget.style.borderColor='#EFEFEF';e.currentTarget.style.color='#555'}}
                      >View card details</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="cards-list">
                {filtered.map((c,i) => (
                  <div key={c.id} className="list-tile" style={{animationDelay:`${i*.025}s`}}>
                    <div
                      className="list-img"
                      style={{background:c.card_image_url?'#000':cardBg(c.sport),cursor:c.card_image_url?'zoom-in':'default',position:'relative'}}
                      onClick={()=>{ if(c.card_image_url) setLightboxImage(c.card_image_url) }}
                    >
                      {c.card_image_url
                        ? <img src={c.card_image_url} alt={c.player} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                        : <span>{sportEmoji[c.sport]||'🃏'}</span>
                      }
                      {c.card_image_back_url && (
                        <button
                          onClick={e=>{e.stopPropagation();setLightboxImage(c.card_image_back_url)}}
                          style={{position:'absolute',bottom:'3px',right:'3px',background:'rgba(0,0,0,.6)',color:'#fff',border:'none',borderRadius:'3px',fontSize:'8px',fontWeight:700,padding:'2px 4px',cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',letterSpacing:'.04em'}}
                        >BACK</button>
                      )}
                    </div>
                    <div className="list-main">
                      <div className="list-player">{c.player}</div>
                      <div className="list-set">
                        {[c.year, c.brand!=='Unknown'?c.brand:'', c.set_name!=='Unknown'?c.set_name:''].filter(Boolean).join(' ')}
                        {c.cardnum?` · ${c.cardnum}`:''}
                      </div>
                      <div className="list-attrs">
                        {(c.attrs||[]).map((a:string) => (
                          <span key={a} className="attr-tag">
                            {a === 'numbered' && c.print_run ? c.print_run : attrLabel(a)}
                          </span>
                        ))}
                        {c.status === 'trade' && (
                          <span className="attr-tag" style={{background:'#FEF3E2',color:'#E8820C',border:'1px solid #F5C880'}}>
                            <FontAwesomeIcon icon={faTag} style={{marginRight:'3px'}}/>For Trade
                          </span>
                        )}
                        {c.status === 'sale' && c.ebay_listing_url && (
                          <a
                            href={ebayAffiliateUrl(c.ebay_listing_url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="attr-tag"
                            style={{background:'#EBF2FF',color:'#1B6FF0',border:'1px solid #C5D8FF',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'4px'}}
                            onClick={e => e.stopPropagation()}
                          >View on eBay</a>
                        )}
                      </div>
                    </div>
                    {c.grader && c.grader !== 'Raw' && (
                      <div style={{padding:'0 16px',flexShrink:0}}>
                        <div style={{fontSize:'10px',color:'#9A9A9A',fontWeight:600,textTransform:'uppercase',marginBottom:'2px'}}>Grade</div>
                        <div style={{fontSize:'13px',fontWeight:700}}>{c.grader} {c.grade}</div>
                      </div>
                    )}
                    <div style={{padding:'0 14px',flexShrink:0}}>
                      <button
                        onClick={() => setSelectedCard(c)}
                        style={{padding:'6px 12px',borderRadius:'6px',border:'1.5px solid #EFEFEF',background:'#fff',fontSize:'11px',fontWeight:600,color:'#555',cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',transition:'all .15s',whiteSpace:'nowrap'}}
                        onMouseOver={e=>{e.currentTarget.style.borderColor='#1B6FF0';e.currentTarget.style.color='#1B6FF0'}}
                        onMouseOut={e=>{e.currentTarget.style.borderColor='#EFEFEF';e.currentTarget.style.color='#555'}}
                      >View details</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* WANT LIST TAB */}
        {activeVaultTab === 'wantlist' && (
          <>
            {wants.length === 0 ? (
              <div style={{textAlign:'center',padding:'60px 24px'}}>
                <div style={{fontSize:'40px',marginBottom:'16px'}}>⭐</div>
                <div style={{fontSize:'18px',fontWeight:700,marginBottom:'8px'}}>No want list yet</div>
                <div style={{fontSize:'14px',color:'#9A9A9A'}}>@{username} hasn't added any cards to their want list.</div>
              </div>
            ) : (
              <>
                <div style={{fontSize:'13px',color:'#9A9A9A',marginBottom:'16px'}}>
                  <strong style={{color:'#0D0D0D'}}>{wants.length}</strong> card{wants.length!==1?'s':''} on this want list
                </div>
                <div className="want-grid">
                  {wants.map((w, i) => {
                    const sc = SPORT_COLORS[w.sport] || {bg:'#F7F7F7',color:'#555'}
                    return (
                      <div key={w.id} className="want-card" style={{animationDelay:`${i*.03}s`}}>
                        {/* Card image / sport thumbnail */}
                        <div style={{width:'100%',aspectRatio:'2.5/3.5',borderRadius:'6px',overflow:'hidden',background:w.img?'#000':cardBg(w.sport),display:'flex',alignItems:'center',justifyContent:'center',fontSize:'48px'}}>
                          {w.img
                            ? <img src={w.img} alt={w.player} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                            : <span>{sportEmoji[w.sport]||'🃏'}</span>
                          }
                        </div>

                        {/* Info */}
                        <div>
                          <div style={{fontSize:'14px',fontWeight:700,color:'#0D0D0D',marginBottom:'3px',lineHeight:1.2}}>{w.player}</div>
                          <div style={{fontSize:'12px',color:'#9A9A9A',marginBottom:'6px'}}>
                            {[w.year, w.brand, w.set_name].filter(v => v && v !== 'Unknown').join(' ') || 'Any'}
                          </div>
                          <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>
                            {w.sport && (
                              <span style={{fontSize:'10px',fontWeight:700,padding:'2px 8px',borderRadius:'100px',background:sc.bg,color:sc.color}}>{w.sport}</span>
                            )}
                            {w.condition_pref && (
                              <span style={{fontSize:'10px',fontWeight:600,padding:'2px 8px',borderRadius:'100px',background:'#F0F0F0',color:'#444'}}>{w.condition_pref}</span>
                            )}
                            {w.max_budget && (
                              <span style={{fontSize:'10px',fontWeight:600,padding:'2px 8px',borderRadius:'100px',background:'#E6F9F0',color:'#00A861'}}>Up to ${w.max_budget}</span>
                            )}
                          </div>
                        </div>

                        {/* Search button */}
                        <a
                          href={`/search?q=${encodeURIComponent(w.player)}`}
                          style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'6px',padding:'7px 0',borderRadius:'6px',border:'1.5px solid #EFEFEF',background:'#fff',fontSize:'12px',fontWeight:600,color:'#555',textDecoration:'none',transition:'all .15s',width:'100%'}}
                          onMouseOver={e=>{e.currentTarget.style.borderColor='#1B6FF0';e.currentTarget.style.color='#1B6FF0'}}
                          onMouseOut={e=>{e.currentTarget.style.borderColor='#EFEFEF';e.currentTarget.style.color='#555'}}
                        >
                          <FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize:'10px'}}/>
                          Search eBay
                        </a>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImage(null)}>✕</button>
          <img src={lightboxImage} className="lightbox-img" alt="Card enlarged view"/>
        </div>
      )}

      {/* CARD DETAIL MODAL */}
      {selectedCard && (
        <div className="card-modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="card-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-hdr-title">{selectedCard.player}</div>
              <button className="modal-close" onClick={() => setSelectedCard(null)}>✕</button>
            </div>
            <div className="card-modal-body">
              <div className="card-modal-left">
                {selectedCard.card_image_back_url && (
                  <div className="card-modal-tab">
                    <button className={`card-modal-tab-btn${cardImageTab==='front'?' on':''}`} onClick={() => setCardImageTab('front')}>Front</button>
                    <button className={`card-modal-tab-btn${cardImageTab==='back'?' on':''}`} onClick={() => setCardImageTab('back')}>Back</button>
                  </div>
                )}
                <div className="card-modal-img" style={{background:(cardImageTab==='front'?selectedCard.card_image_url:selectedCard.card_image_back_url)?'#000':cardBg(selectedCard.sport)}}>
                  {cardImageTab === 'front' ? (
                    selectedCard.card_image_url
                      ? <img src={selectedCard.card_image_url} alt={selectedCard.player} onClick={()=>setLightboxImage(selectedCard.card_image_url)}/>
                      : <span style={{fontSize:'64px'}}>{sportEmoji[selectedCard.sport]||'🃏'}</span>
                  ) : (
                    selectedCard.card_image_back_url
                      ? <img src={selectedCard.card_image_back_url} alt={`${selectedCard.player} back`} onClick={()=>setLightboxImage(selectedCard.card_image_back_url)}/>
                      : <span style={{fontSize:'64px'}}>{sportEmoji[selectedCard.sport]||'🃏'}</span>
                  )}
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  {selectedCard.status === 'trade' && (
                    <div style={{background:'#FEF3E2',color:'#E8820C',border:'1px solid #F5C880',borderRadius:'6px',padding:'8px 12px',fontSize:'12px',fontWeight:700,textAlign:'center'}}>
                      <FontAwesomeIcon icon={faTag} style={{marginRight:'6px'}}/>For Trade
                    </div>
                  )}
                  {selectedCard.status === 'sale' && selectedCard.ebay_listing_url && (
                    <a
                      href={ebayAffiliateUrl(selectedCard.ebay_listing_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{background:'#1B6FF0',color:'#fff',borderRadius:'6px',padding:'8px 12px',fontSize:'12px',fontWeight:700,textAlign:'center',textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>View on eBay
                    </a>
                  )}
                </div>
              </div>
              <div className="card-modal-right">
                <div>
                  <div style={{fontSize:'22px',fontWeight:800,letterSpacing:'-.5px',color:'#0D0D0D',marginBottom:'4px'}}>{selectedCard.player}</div>
                  <div style={{fontSize:'13px',color:'#9A9A9A'}}>
                    {[selectedCard.year, selectedCard.brand!=='Unknown'?selectedCard.brand:'', selectedCard.set_name!=='Unknown'?selectedCard.set_name:''].filter(Boolean).join(' ')}
                    {selectedCard.cardnum ? ` · ${selectedCard.cardnum}` : ''}
                  </div>
                </div>
                {(selectedCard.attrs||[]).length > 0 && (
                  <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                    {(selectedCard.attrs||[]).map((a:string) => (
                      <span key={a} className="attr-tag">
                        {a === 'numbered' && selectedCard.print_run ? selectedCard.print_run : attrLabel(a)}
                      </span>
                    ))}
                  </div>
                )}
                <div style={{background:'#F7F7F7',borderRadius:'8px',padding:'4px 14px'}}>
                  {[
                    {lbl:'Sport', val:selectedCard.sport},
                    {lbl:'Year', val:selectedCard.year||'-'},
                    {lbl:'Brand', val:selectedCard.brand!=='Unknown'?selectedCard.brand:'-'},
                    {lbl:'Set Name', val:selectedCard.set_name!=='Unknown'?selectedCard.set_name:'-'},
                    {lbl:'Card Number', val:selectedCard.cardnum||'-'},
                    {lbl:'Condition', val:selectedCard.condition||'-'},
                    {lbl:'Grading', val:selectedCard.grader&&selectedCard.grader!=='Raw'?`${selectedCard.grader} ${selectedCard.grade}`:'Raw (Ungraded)'},
                    {lbl:'Quantity', val:String(selectedCard.qty||1)},
                  ].filter(r => r.val && r.val !== '-' && r.val !== 'Unknown').map(r => (
                    <div key={r.lbl} className="detail-row">
                      <span className="detail-lbl">{r.lbl}</span>
                      <span className="detail-val">{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}