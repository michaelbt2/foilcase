'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '../components/Nav'
import { useUser } from '@clerk/nextjs'
import { supabase } from '../lib/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faXmark,
  faPlus,
  faStar,
  faArrowUpRightFromSquare,
  faSliders,
  faFire,
  faCircleCheck,
  faChevronUp,
  faChevronDown,
  faGrip,
  faBars,
  faFootball,
  faBaseball,
  faBasketball,
  faHockeyPuck,
  faGamepad,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'


const RECENT_SEARCHES = ['Patrick Mahomes','2024 Prizm Football','Charizard PSA 10','Shohei Ohtani RC','LeBron James']
const TRENDING_FALLBACK = ['Caleb Williams RC','2025 Prizm Football','Mahomes Gold /10','Wembanyama Prizm','Charizard 1st Edition']
const PER_PAGE = 24

const sportEmoji: Record<string,string> = { Football:'🏈', Baseball:'⚾', Basketball:'🏀', Hockey:'🏒', Soccer:'⚽', Gaming:'🎮' }

function attrLabel(a: string) {
  const map: Record<string,string> = { rc:'RC', auto:'Auto', patch:'Patch', numbered:'Numbered', chrome:'Chrome', refractor:'Refractor', shortprint:'SP', '1of1':'1/1' }
  return map[a] || a
}

function cardBg(sport: string) {
  const bgs: Record<string,string> = {
    Football:'linear-gradient(135deg,#EBF2FF,#C5D8FF)',
    Baseball:'linear-gradient(135deg,#E6F9F0,#A8DFC4)',
    Basketball:'linear-gradient(135deg,#FEF3E2,#FDDBA0)',
    Hockey:'linear-gradient(135deg,#F2ECFB,#D4BAF0)',
    Soccer:'linear-gradient(135deg,#E0F7FA,#A5E8F0)',
    Gaming:'linear-gradient(135deg,#FDECEA,#F9C0BB)',
  }
  return bgs[sport] || 'linear-gradient(135deg,#EBF2FF,#C5D8FF)'
}

function SearchContent() {
  const { user } = useUser()
  const searchParams = useSearchParams()
  const [query, setQuery]             = useState('')
  const [submitted, setSubmitted]     = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [liveResults, setLiveResults] = useState<any[]>([])
  const [searching, setSearching]     = useState(false)
  const [searchError, setSearchError] = useState<string|null>(null)
  const [sport, setSport]             = useState('all')
  const [grading, setGrading]         = useState('all')
  const [sortBy, setSortBy]           = useState('relevance')
  const [priceMin, setPriceMin]       = useState('')
  const [priceMax, setPriceMax]       = useState('')
  const [yearMin, setYearMin]         = useState('')
  const [yearMax, setYearMax]         = useState('')
  const [activeAttrs, setActiveAttrs] = useState<string[]>([])
  const [viewMode, setViewMode]       = useState<'grid'|'list'>('grid')
  const [toast, setToast]             = useState<string|null>(null)
  const [page, setPage]               = useState(1)
  const [trending, setTrending]       = useState<string[]>(TRENDING_FALLBACK)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800) }

  const addToVault = async (c: any) => {
    if (!user) {
      showToast('⚠️ Please sign in to add cards to your vault')
      return
    }
    const card = {
      user_id: user.id,
      player: c.player,
      year: String(c.year),
      brand: c.brand !== 'Unknown' ? c.brand : '',
      set_name: c.setName || '',
      sport: c.sport !== 'Unknown' ? c.sport : '',
      cardnum: c.cardNum || '',
      folder_id: null,
      status: 'have',
      grader: 'Raw',
      grade: c.grade || '',
      qty: 1,
      condition: c.condition || '',
      cost: 0,
      value: c.price || 0,
      attrs: c.attrs || [],
      notes: '',
      img: c.sport === 'Football' ? '🏈'
          : c.sport === 'Baseball' ? '⚾'
          : c.sport === 'Basketball' ? '🏀'
          : c.sport === 'Hockey' ? '🏒'
          : c.sport === 'Gaming' ? '🎮' : '🃏',
    }
    try {
      const { error } = await supabase.from('cards').insert(card)
      if (error) { showToast('❌ Error: ' + error.message); return }
      showToast(`✅ ${c.player} added to your vault!`)
    } catch (e: any) {
      showToast('❌ Something went wrong. Please try again.')
    }
  }

  const toggleAttr = (a: string) => setActiveAttrs(prev => prev.includes(a) ? prev.filter(x=>x!==a) : [...prev,a])

  const runSearch = async (q: string) => {
    if (!q.trim()) return
    setQuery(q)
    setSubmitted(true)
    setShowDropdown(false)
    setSearching(true)
    setSearchError(null)
    setLiveResults([])
    setPage(1)

    // Log search query — fire and forget, don't block results
    supabase.from('searches').insert({
      query: q.trim().toLowerCase(),
      user_id: user?.id || null,
    }).then(() => {})

    try {
      const sportParam = sport !== 'all' ? `&sport=${encodeURIComponent(sport)}` : ''
      const res = await fetch(`/api/card-search?player=${encodeURIComponent(q)}${sportParam}&limit=72`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setLiveResults(data.cards || [])
    } catch (e: any) {
      setSearchError('Could not load results. Please try again.')
    } finally {
      setSearching(false)
    }
  }

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) { setQuery(q); runSearch(q) }
  }, [])

  useEffect(() => { setPage(1) }, [sport, grading, priceMin, priceMax, yearMin, yearMax, activeAttrs, sortBy])

  useEffect(() => {
    fetch('/api/trending')
      .then(r => r.json())
      .then(data => {
        if (data.trending && data.trending.length >= 3) {
          setTrending(data.trending.map((t: any) => t.label))
        }
      })
      .catch(() => {})
  }, [])

  const filtered = liveResults.filter((c: any) => {
    if (sport !== 'all' && c.sport !== sport) return false
    if (grading === 'graded' && !c.grade) return false
    if (grading === 'raw' && c.grade) return false
    if (priceMin && c.price < parseInt(priceMin)) return false
    if (priceMax && c.price > parseInt(priceMax)) return false
    if (yearMin && parseInt(c.year) < parseInt(yearMin)) return false
    if (yearMax && parseInt(c.year) > parseInt(yearMax)) return false
    if (activeAttrs.length > 0 && !activeAttrs.every((a: string) => (c.attrs||[]).includes(a))) return false
    return true
  }).sort((a: any, b: any) => {
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'price-asc')  return a.price - b.price
    if (sortBy === 'year-desc')  return parseInt(b.year) - parseInt(a.year)
    if (sortBy === 'year-asc')   return parseInt(a.year) - parseInt(b.year)
    return 0
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const hasActiveFilters = sport !== 'all' || grading !== 'all' || priceMin || priceMax || yearMin || yearMax || activeAttrs.length > 0
  const clearFilters = () => { setSport('all'); setGrading('all'); setPriceMin(''); setPriceMax(''); setYearMin(''); setYearMax(''); setActiveAttrs([]) }
  const fmtPrice = (p: number) => p ? `$${p.toFixed(2)}` : '—'

  return (
    <>
      <style>{`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Plus Jakarta Sans',sans-serif;background:#F7F7F7;color:#0D0D0D;-webkit-font-smoothing:antialiased}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 14px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .15s;border:none;white-space:nowrap}
  .btn-primary{background:#1B6FF0;color:#fff}
  .btn-primary:hover{background:#0A4DBF;transform:translateY(-1px)}
  .btn-outline{background:transparent;color:#0D0D0D;border:1.5px solid #D8D8D8}
  .btn-outline:hover{border-color:#0D0D0D}
  .search-hero{background:#0D0D0D;padding:48px 24px 40px;position:relative;overflow:hidden}
  .search-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
  .search-hero-inner{max-width:720px;margin:0 auto;position:relative;z-index:1}
  .search-hero-title{font-size:clamp(28px,5vw,44px);font-weight:800;color:#fff;letter-spacing:-1px;line-height:1.1;margin-bottom:8px;text-align:center}
  .search-hero-title em{font-style:italic;color:#7EB6FF}
  .search-hero-sub{font-size:15px;color:rgba(255,255,255,.5);text-align:center;margin-bottom:28px}
  .search-bar-wrap{position:relative}
  .search-bar{display:flex;align-items:center;gap:10px;background:#fff;border-radius:8px;padding:8px 8px 8px 20px;box-shadow:0 8px 32px rgba(0,0,0,.3);transition:box-shadow .2s}
  .search-bar:focus-within{box-shadow:0 8px 32px rgba(0,0,0,.3),0 0 0 3px rgba(27,111,240,.4)}
  .search-bar input{flex:1;border:none;outline:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;color:#0D0D0D;background:transparent}
  .search-bar input::placeholder{color:#9A9A9A}
  .search-bar-btn{background:#1B6FF0;color:#fff;border:none;border-radius:6px;padding:10px 20px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .15s;white-space:nowrap}
  .search-bar-btn:hover{background:#0A4DBF}
  .search-clear{background:transparent;border:none;cursor:pointer;color:#9A9A9A;font-size:18px;padding:4px;display:flex;align-items:center;justify-content:center}
  .search-clear:hover{color:#0D0D0D}
  .search-dropdown{position:absolute;top:calc(100% + 8px);left:0;right:0;background:#fff;border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,.15);z-index:100;overflow:hidden;animation:dropIn .15s ease}
  @keyframes dropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
  .dropdown-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;padding:10px 16px 4px}
  .dropdown-item{display:flex;align-items:center;gap:12px;padding:9px 16px;cursor:pointer;transition:background .12s}
  .dropdown-item:hover{background:#F7F7F7}
  .dropdown-item-img{width:36px;height:36px;border-radius:6px;object-fit:cover;flex-shrink:0;background:#EFEFEF;display:flex;align-items:center;justify-content:center;font-size:18px}
  .dropdown-item-name{font-size:13px;font-weight:600;color:#0D0D0D;flex:1}
  .search-pills{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;justify-content:center}
  .search-pill{padding:5px 14px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:100px;font-size:12px;font-weight:600;color:rgba(255,255,255,.7);cursor:pointer;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
  .search-pill:hover{background:rgba(255,255,255,.2);color:#fff}
  .main-layout{max-width:1200px;margin:0 auto;padding:24px;display:grid;grid-template-columns:240px 1fr;gap:20px;align-items:start}
  .sidebar{display:flex;flex-direction:column;gap:12px;position:sticky;top:78px}
  .filter-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
  .filter-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between}
  .filter-clear{font-size:11px;font-weight:600;color:#1B6FF0;cursor:pointer;text-transform:none;letter-spacing:0}
  .filter-clear:hover{text-decoration:underline}
  .filter-group-label{font-size:11px;font-weight:700;color:#9A9A9A;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px;margin-top:12px}
  .fchips{display:flex;flex-wrap:wrap;gap:5px}
  .fchip{padding:5px 10px;background:#F7F7F7;border:1px solid #EFEFEF;border-radius:100px;font-size:12px;font-weight:600;color:#555;cursor:pointer;transition:all .12s;font-family:'Plus Jakarta Sans',sans-serif;border:none}
  .fchip:hover{background:#EFEFEF;color:#0D0D0D}
  .fchip.on{background:#0D0D0D;color:#fff}
  .price-range{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}
  .range-input{width:100%;padding:7px 10px;border:1.5px solid #EFEFEF;border-radius:6px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:#0D0D0D;background:#fff;outline:none;transition:border-color .15s}
  .range-input:focus{border-color:#1B6FF0}
  .range-input::placeholder{color:#9A9A9A}
  .trending-item{display:flex;align-items:center;gap:12px;padding:8px 10px;background:#fff;border:1px solid #EFEFEF;border-radius:8px;cursor:pointer;transition:all .15s;margin-bottom:6px}
  .trending-item:hover{border-color:#D8D8D8;box-shadow:0 2px 8px rgba(0,0,0,.06)}
  .trending-rank{font-size:13px;font-weight:800;color:#D8D8D8;width:20px;flex-shrink:0}
  .trending-name{font-size:13px;font-weight:600;flex:1}
  .results-header{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:16px}
  .results-count{font-size:14px;font-weight:700;color:#0D0D0D;flex:1}
  .results-count span{color:#9A9A9A;font-weight:400}
  .sort-select{padding:7px 12px;border:1.5px solid #EFEFEF;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;color:#0D0D0D;background:#fff;cursor:pointer;outline:none}
  .view-toggle{display:flex;gap:2px;background:#F7F7F7;border-radius:8px;padding:3px}
  .vbtn{padding:5px 8px;border-radius:6px;border:none;background:transparent;cursor:pointer;color:#9A9A9A;font-size:15px;transition:all .12s}
  .vbtn.on{background:#fff;color:#0D0D0D;box-shadow:0 1px 3px rgba(0,0,0,.06)}
  .af-pill{display:flex;align-items:center;gap:4px;padding:3px 10px;background:#EBF2FF;border:1px solid #C5D8FF;border-radius:100px;font-size:11px;font-weight:600;color:#1B6FF0;cursor:pointer;transition:all .15s}
  .af-pill:hover{background:#FDECEA;color:#D93025;border-color:#FFBBB7}
  .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
  .card-tile{background:#fff;border:1px solid #EFEFEF;border-radius:8px;overflow:hidden;cursor:pointer;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;flex-direction:column;animation:fadeUp .3s ease both}
  .card-tile:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.10);border-color:#D8D8D8}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  .card-img{height:250px;display:flex;align-items:center;justify-content:center;font-size:48px;position:relative;overflow:hidden;background:#F7F7F7}
  .card-img img{width:100%;height:100%;object-fit:cover}
  .card-img span{font-size:48px}
  .grade-chip{position:absolute;bottom:8px;left:8px;font-size:9px;font-weight:800;padding:3px 7px;border-radius:4px;background:#002FA7;color:#fff}
  .card-body{padding:11px 13px 8px;flex:1;display:flex;flex-direction:column}
  .card-player{font-size:13px;font-weight:700;color:#0D0D0D;line-height:1.2;margin-bottom:2px}
  .card-set{font-size:11px;color:#9A9A9A;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .card-attrs{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}
  .attr-tag{font-size:9px;font-weight:700;padding:2px 6px;border-radius:100px}
  .tag-rc{background:#E6F9F0;color:#00A861}
  .tag-auto{background:#FEF3E2;color:#E8820C}
  .tag-numbered{background:#F2ECFB;color:#7B4FCA}
  .tag-chrome{background:#EBF2FF;color:#1B6FF0}
  .tag-other{background:#F7F7F7;color:#555}
  .card-footer{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:8px;border-top:1px solid #EFEFEF}
  .card-price{font-size:15px;font-weight:800;color:#0D0D0D;letter-spacing:-.3px}
  .card-condition{font-size:10px;color:#9A9A9A}
  .card-actions{display:flex;gap:4px;padding:0 13px 11px;opacity:0;transition:opacity .15s}
  .card-tile:hover .card-actions{opacity:1}
  .act-btn{flex:1;padding:5px 0;border-radius:6px;font-size:10px;font-weight:700;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .12s;text-align:center;display:flex;align-items:center;justify-content:center;text-decoration:none}
  .act-view{background:#EBF2FF;color:#1B6FF0}
  .act-view:hover{background:#1B6FF0;color:#fff}
  .act-add{background:#EBF2FF;color:#1B6FF0}
  .act-add:hover{background:#1B6FF0;color:#fff}
  .act-want{background:#F7F7F7;color:#555}
  .act-want:hover{background:#F2ECFB;color:#7B4FCA}
  .cards-list{display:flex;flex-direction:column;gap:10px}
  .list-tile{background:#fff;border:1px solid #EFEFEF;border-radius:8px;overflow:hidden;display:flex;align-items:center;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);animation:fadeUp .3s ease both}
  .list-tile:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);border-color:#D8D8D8;transform:translateY(-1px)}
  .list-img{width:80px;height:80px;display:flex;align-items:center;justify-content:center;font-size:36px;flex-shrink:0;margin:12px 0 12px 16px;border-radius:6px;overflow:hidden;background:#EFEFEF}
  .list-img img{width:100%;height:100%;object-fit:cover}
  .list-main{flex:1;padding:12px 16px;min-width:0}
  .list-player{font-size:16px;font-weight:800;color:#0D0D0D;letter-spacing:-.3px;line-height:1.2;margin-bottom:3px}
  .list-set{font-size:12px;color:#9A9A9A;margin-bottom:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .list-tags{display:flex;gap:5px;flex-wrap:wrap;align-items:center}
  .list-pill{font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px;letter-spacing:.03em;white-space:nowrap}
  .pill-parallel{background:#F0F0F0;color:#444}
  .pill-year{background:#EBF2FF;color:#1B6FF0}
  .pill-condition{background:#F7F7F7;color:#555;border:1px solid #EFEFEF}
  .pill-grade{background:#002FA7;color:#fff}
  .pill-rc{background:#E6F9F0;color:#00A861}
  .pill-auto{background:#FEF3E2;color:#E8820C}
  .pill-numbered{background:#F2ECFB;color:#7B4FCA}
  .pill-chrome{background:#EBF2FF;color:#1B6FF0}
  .pill-sealed{background:#FFF8E0;color:#92700A}
  .list-right{display:flex;padding:0 20px 0 8px;flex-shrink:0;flex-direction:column;align-items:flex-end;gap:4px}
  .list-price{font-size:20px;font-weight:800;color:#0D0D0D;letter-spacing:-.5px}
  .list-price-lbl{font-size:10px;color:#9A9A9A;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  .list-actions{display:flex;gap:6px;padding:0 14px;opacity:0;transition:opacity .15s;flex-shrink:0}
  .list-tile:hover .list-actions{opacity:1}
  .empty-state{background:#fff;border:1.5px dashed #D8D8D8;border-radius:8px;padding:64px 24px;text-align:center}
  .disc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-top:14px}
  .disc-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:14px;cursor:pointer;transition:all .18s;box-shadow:0 1px 3px rgba(0,0,0,.05)}
  .disc-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.09)}
  .disc-title{font-size:16px;font-weight:800;letter-spacing:-.3px;margin-bottom:14px;display:flex;align-items:center;gap:8px}
  .toast{position:fixed;bottom:24px;right:24px;z-index:999;background:#0D0D0D;color:#fff;border-radius:8px;padding:12px 18px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toastIn .3s cubic-bezier(.34,1.56,.64,1);max-width:320px}
  @keyframes toastIn{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}
  .pagination-btn{padding:8px 18px;border-radius:100px;border:1.5px solid #EFEFEF;background:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s;color:#0D0D0D}
  .pagination-btn:hover:not(:disabled){border-color:#1B6FF0;color:#1B6FF0}
  .pagination-btn:disabled{color:#D8D8D8;cursor:not-allowed}
  .pagination-page{width:36px;height:36px;border-radius:100px;border:1.5px solid #EFEFEF;background:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s;color:#0D0D0D;display:inline-flex;align-items:center;justify-content:center}
  .pagination-page:hover{border-color:#1B6FF0;color:#1B6FF0}
  .pagination-page.on{background:#1B6FF0;color:#fff;border-color:#1B6FF0}
  @media(max-width:860px){.main-layout{grid-template-columns:1fr}.sidebar{position:static}.cards-grid{grid-template-columns:repeat(2,1fr)}}
`}</style>

      <Nav />

      {/* HERO SEARCH */}
      <div className="search-hero">
        <div className="search-hero-inner">
          <h1 className="search-hero-title">Find any card <em>instantly</em></h1>
          <p className="search-hero-sub">Search millions of cards with live eBay pricing</p>
          <div className="search-bar-wrap">
            <div className="search-bar">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'#1B6FF0',fontSize:'16px',flexShrink:0,width:'16px'}}/>
              <input
                type="text"
                placeholder="Player name, set, year, brand..."
                value={query}
                onChange={e => { setQuery(e.target.value); setShowDropdown(e.target.value.length > 1) }}
                onKeyDown={e => { if (e.key === 'Enter') runSearch(query) }}
                autoComplete="off"
              />
              {query && (
                <button className="search-clear" onClick={() => { setQuery(''); setSubmitted(false); setLiveResults([]); setShowDropdown(false) }}>
                  <FontAwesomeIcon icon={faXmark} style={{fontSize:'14px'}}/>
                </button>
              )}
              <button className="search-bar-btn" onClick={() => runSearch(query)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight:'6px'}}/>Search
              </button>
            </div>

            {showDropdown && (
              <div className="search-dropdown">
                <div className="dropdown-label">Recent searches</div>
                {RECENT_SEARCHES.filter(r => r.toLowerCase().includes(query.toLowerCase())).slice(0,4).map(r => (
                  <div key={r} className="dropdown-item" onClick={() => runSearch(r)}>
                    <div className="dropdown-item-img">🕐</div>
                    <div className="dropdown-item-name">{r}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

         
        </div>
      </div>

      {/* RESULTS or DISCOVERY */}
      {submitted ? (
        <div className="main-layout">

          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="filter-card">
              <div className="filter-title">
                Filters
                {hasActiveFilters && <span className="filter-clear" onClick={clearFilters}>Clear all</span>}
              </div>
              <div className="filter-group-label">Grading</div>
              <div className="fchips">
                {[{v:'all',l:'All'},{v:'graded',l:'Graded'},{v:'raw',l:'Raw'}].map(o => (
                  <button key={o.v} className={`fchip${grading===o.v?' on':''}`} onClick={() => setGrading(o.v)}>{o.l}</button>
                ))}
              </div>
              <div className="filter-group-label">Card Type</div>
              <div className="fchips">
                {[{v:'rc',l:'Rookie'},{v:'auto',l:'Auto'},{v:'numbered',l:'Numbered'},{v:'chrome',l:'Chrome'},{v:'patch',l:'Patch'}].map(a => (
                  <button key={a.v} className={`fchip${activeAttrs.includes(a.v)?' on':''}`} onClick={() => toggleAttr(a.v)}>{a.l}</button>
                ))}
              </div>
              <div className="filter-group-label">Price Range ($)</div>
              <div className="price-range">
                <input className="range-input" type="number" placeholder="Min" value={priceMin} onChange={e=>setPriceMin(e.target.value)}/>
                <input className="range-input" type="number" placeholder="Max" value={priceMax} onChange={e=>setPriceMax(e.target.value)}/>
              </div>
              <div className="filter-group-label">Year Range</div>
              <div className="price-range">
                <input className="range-input" type="number" placeholder="From" value={yearMin} onChange={e=>setYearMin(e.target.value)}/>
                <input className="range-input" type="number" placeholder="To" value={yearMax} onChange={e=>setYearMax(e.target.value)}/>
              </div>
            </div>

            <div className="filter-card">
              <div className="filter-title">🔥 Trending</div>
              {trending.map((t,i) => (
                <div key={t} className="trending-item" onClick={() => runSearch(t)}>
                  <span className="trending-rank">#{i+1}</span>
                  <span className="trending-name">{t}</span>
                  <FontAwesomeIcon icon={faChevronUp} style={{color:'#00A861',fontSize:'11px'}}/>
                </div>
              ))}
            </div>
          </aside>

          {/* RESULTS */}
          <main>
            <div className="results-header">
              <div className="results-count">
                {searching
                  ? <span>Searching for "<strong>{query}</strong>"...</span>
                  : <>
                      {filtered.length} result{filtered.length!==1?'s':''}{' '}
                      <span>for "{query}"</span>
                      {totalPages > 1 && <span> · page {page} of {totalPages}</span>}
                    </>
                }
              </div>

              {hasActiveFilters && (
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                  {sport!=='all' && <div className="af-pill" onClick={()=>setSport('all')}>{sport} ×</div>}
                  {grading!=='all' && <div className="af-pill" onClick={()=>setGrading('all')}>{grading} ×</div>}
                  {activeAttrs.map(a => <div key={a} className="af-pill" onClick={()=>toggleAttr(a)}>{attrLabel(a)} ×</div>)}
                  {(priceMin||priceMax) && <div className="af-pill" onClick={()=>{setPriceMin('');setPriceMax('')}}>${priceMin||'0'}–${priceMax||'∞'} ×</div>}
                  {(yearMin||yearMax) && <div className="af-pill" onClick={()=>{setYearMin('');setYearMax('')}}>{yearMin||'?'}–{yearMax||'?'} ×</div>}
                </div>
              )}

              <select className="sort-select" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                <option value="relevance">Most Relevant</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="year-desc">Newest First</option>
                <option value="year-asc">Oldest First</option>
              </select>

              <div className="view-toggle">
                <button className={`vbtn${viewMode==='grid'?' on':''}`} onClick={()=>setViewMode('grid')}>
                  <FontAwesomeIcon icon={faGrip}/>
                </button>
                <button className={`vbtn${viewMode==='list'?' on':''}`} onClick={()=>setViewMode('list')}>
                  <FontAwesomeIcon icon={faBars}/>
                </button>
              </div>
            </div>

            {searching ? (
              <div className="empty-state">
                <div style={{fontSize:'40px',marginBottom:'16px'}}>🔍</div>
                <div style={{fontSize:'18px',fontWeight:700,marginBottom:'8px'}}>Searching for "{query}"...</div>
                <div style={{fontSize:'14px',color:'#9A9A9A'}}>Finding real cards with live pricing</div>
              </div>
            ) : searchError ? (
              <div className="empty-state">
                <div style={{fontSize:'40px',marginBottom:'16px'}}>⚠️</div>
                <div style={{fontSize:'18px',fontWeight:700,marginBottom:'8px',color:'#D93025'}}>{searchError}</div>
                <button className="btn btn-primary" onClick={() => runSearch(query)}>Try Again</button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <div style={{fontSize:'40px',marginBottom:'16px'}}>🔍</div>
                <div style={{fontSize:'18px',fontWeight:700,marginBottom:'8px'}}>No cards found</div>
                <div style={{fontSize:'14px',color:'#9A9A9A',marginBottom:'20px'}}>Try adjusting your filters or search for something else.</div>
                <button className="btn btn-primary" onClick={clearFilters}>Clear filters</button>
              </div>
            ) : viewMode === 'grid' ? (
              <>
                <div className="cards-grid">
                  {paginated.map((c: any, i: number) => (
                    <div key={c.id} className="card-tile" style={{animationDelay:`${i*.04}s`}}>
                      <div className="card-img" style={{background:cardBg(c.sport)}}>
                        {c.image
                          ? <img src={c.image} alt={c.player}/>
                          : <span>{sportEmoji[c.sport]||'🃏'}</span>
                        }
                        {c.grade && <div className="grade-chip">{c.grade}</div>}
                      </div>
                      <div className="card-body">
                        <div className="card-player">{c.player}</div>
                        <div className="card-set">{c.year} {c.brand} · {c.setName} · {c.parallel}</div>
                        <div className="card-attrs">
                          {(c.attrs||[]).map((a: string) => (
                            <span key={a} className={`attr-tag tag-${['rc','auto','numbered','chrome'].includes(a)?a:'other'}`}>{attrLabel(a)}</span>
                          ))}
                          {c.grade && <span className="attr-tag" style={{background:'#EEF2FF',color:'#3730A3'}}>{c.grade}</span>}
                        </div>
                        <div className="card-footer" style={{flexDirection:'column',alignItems:'flex-start',gap:'4px'}}>
                          {c.soldData && c.soldData.soldCount > 1 ? (
                            <>
                              <div style={{display:'flex',justifyContent:'space-between',width:'100%',alignItems:'flex-end'}}>
                                <div>
                                  <div style={{fontSize:'9px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.04em'}}>Avg Sold</div>
                                  <div style={{fontSize:'15px',fontWeight:800,color:'#00A861'}}>{fmtPrice(c.soldData.avgPrice)}</div>
                                </div>
                                <div style={{textAlign:'right'}}>
                                  <div style={{fontSize:'9px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.04em'}}>Listed</div>
                                  <div style={{fontSize:'13px',fontWeight:800,color:'#1B6FF0'}}>{fmtPrice(c.price)}</div>
                                </div>
                              </div>
                              <div style={{fontSize:'10px',color:'#9A9A9A'}}>{c.soldData.soldCount} sales · {fmtPrice(c.soldData.lowPrice)}–{fmtPrice(c.soldData.highPrice)}</div>
                            </>
                          ) : (
                            <>
                              <div className="card-price">{fmtPrice(c.price)}</div>
                              <div className="card-condition">{c.condition}</div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="card-actions">
                        <a href={c.itemWebUrl} target="_blank" rel="noopener noreferrer" className="act-btn act-view">
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{marginRight:'4px'}}/>eBay
                        </a>
                        <button className="act-btn act-add" onClick={()=>addToVault(c)}>
                          <FontAwesomeIcon icon={faPlus} style={{marginRight:'4px'}}/>Vault
                        </button>
                        <button className="act-btn act-want" onClick={()=>showToast(`⭐ ${c.player} wishlisted!`)}>
                          <FontAwesomeIcon icon={faStarRegular}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',marginTop:'24px',paddingTop:'24px',borderTop:'1px solid #EFEFEF',flexWrap:'wrap'}}>
                    <button className="pagination-btn" disabled={page===1} onClick={()=>{setPage(p=>p-1);window.scrollTo({top:0,behavior:'smooth'})}}>← Prev</button>
                    {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
                      <button key={p} className={`pagination-page${page===p?' on':''}`} onClick={()=>{setPage(p);window.scrollTo({top:0,behavior:'smooth'})}}>{p}</button>
                    ))}
                    <button className="pagination-btn" disabled={page===totalPages} onClick={()=>{setPage(p=>p+1);window.scrollTo({top:0,behavior:'smooth'})}}>Next →</button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="cards-list">
                  {paginated.map((c: any, i: number) => (
                    <div key={c.id} className="list-tile" style={{animationDelay:`${i*.03}s`}}>
                      <div className="list-img" style={{background:cardBg(c.sport)}}>
                        {c.image
                          ? <img src={c.image} alt={c.player}/>
                          : <span>{sportEmoji[c.sport]||'🃏'}</span>
                        }
                      </div>
                      <div className="list-main">
                        <div className="list-player">
                          {[c.year, c.brand !== 'Unknown' ? c.brand : '', c.setName !== 'Unknown' ? c.setName : ''].filter(Boolean).join(' ')}
                          {c.cardNum ? ` · ${c.cardNum}` : ''}
                        </div>
                        <div className="list-set">
                          {c.player}
                          {c.parallel && c.parallel !== 'Base' ? ` · ${c.parallel}` : ''}
                          {c.sport && c.sport !== 'Unknown' ? ` · ${c.sport}` : ''}
                        </div>
                        <div className="list-tags">
                          {c.parallel && c.parallel !== 'Base' && <span className="list-pill pill-parallel">✦ {c.parallel}</span>}
                          {c.year && c.year !== 'Unknown' && <span className="list-pill pill-year">{c.year}</span>}
                          {c.condition && c.condition !== 'Unknown' && (
                            <span className="list-pill pill-condition">
                              {c.condition === 'New/Factory Sealed' ? '🔒 Sealed' : c.condition === 'Graded' ? '🏅 Graded' : c.condition === 'Ungraded' ? 'Raw' : c.condition}
                            </span>
                          )}
                          {c.grade && <span className="list-pill pill-grade">{c.grade}</span>}
                          {(c.attrs||[]).map((a: string) => (
                            <span key={a} className={`list-pill pill-${a==='rc'?'rc':a==='auto'?'auto':a==='numbered'?'numbered':a==='chrome'?'chrome':'condition'}`}>{attrLabel(a)}</span>
                          ))}
                          {c.sport && c.sport !== 'Unknown' && <span className="list-pill pill-condition">{sportEmoji[c.sport]} {c.sport}</span>}
                        </div>
                      </div>
                      <div className="list-right">
                        {c.soldData && c.soldData.soldCount > 1 ? (
                          <>
                            <div style={{textAlign:'right',marginBottom:'6px'}}>
                              <div className="list-price-lbl">Avg Sold</div>
                              <div className="list-price" style={{color:'#00A861',fontSize:'17px'}}>{fmtPrice(c.soldData.avgPrice)}</div>
                              <div style={{fontSize:'10px',color:'#9A9A9A'}}>{c.soldData.soldCount} sales · {fmtPrice(c.soldData.lowPrice)}–{fmtPrice(c.soldData.highPrice)}</div>
                              {c.soldData.lastSold && (
                                <div style={{fontSize:'10px',color:'#00A861',fontWeight:600}}>↑ {new Date(c.soldData.lastSold).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>
                              )}
                            </div>
                            <div style={{textAlign:'right'}}>
                              <div className="list-price-lbl">Listed From</div>
                              <div style={{fontSize:'14px',fontWeight:800,color:'#1B6FF0'}}>{fmtPrice(c.price)}</div>
                              {c.listingCount > 1 && <div style={{fontSize:'10px',color:'#9A9A9A'}}>{c.listingCount} listings</div>}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="list-price-lbl">Market Price</div>
                            <div className="list-price">{fmtPrice(c.price)}</div>
                            {c.listingCount > 1 && <div style={{fontSize:'10px',color:'#9A9A9A'}}>{c.listingCount} listings</div>}
                          </>
                        )}
                        {c.printRun && <div style={{fontSize:'11px',color:'#7B4FCA',fontWeight:700,marginTop:'2px'}}>/{c.printRun}</div>}
                      </div>
                      <div className="list-actions">
                        <a href={c.itemWebUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{fontSize:'12px',padding:'5px 12px',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'5px'}}>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>eBay
                        </a>
                        <button className="btn btn-primary" style={{fontSize:'12px',padding:'5px 12px',display:'inline-flex',alignItems:'center',gap:'5px'}} onClick={()=>addToVault(c)}>
                          <FontAwesomeIcon icon={faPlus}/>Vault
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',marginTop:'24px',paddingTop:'24px',borderTop:'1px solid #EFEFEF',flexWrap:'wrap'}}>
                    <button className="pagination-btn" disabled={page===1} onClick={()=>{setPage(p=>p-1);window.scrollTo({top:0,behavior:'smooth'})}}>← Prev</button>
                    {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
                      <button key={p} className={`pagination-page${page===p?' on':''}`} onClick={()=>{setPage(p);window.scrollTo({top:0,behavior:'smooth'})}}>{p}</button>
                    ))}
                    <button className="pagination-btn" disabled={page===totalPages} onClick={()=>{setPage(p=>p+1);window.scrollTo({top:0,behavior:'smooth'})}}>Next →</button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      ) : (
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'28px 24px'}}>

          {/* Trending Searches */}
          <div style={{marginBottom:'32px'}}>
            <div className="disc-title">
              <FontAwesomeIcon icon={faFire} style={{color:'#E8820C'}}/>Trending Searches
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'8px'}}>
              {trending.map((t,i) => (
                <div key={t} className="trending-item" onClick={() => runSearch(t)}>
                  <span className="trending-rank">#{i+1}</span>
                  <span className="trending-name">{t}</span>
                  <FontAwesomeIcon icon={faChevronUp} style={{color:'#00A861',fontSize:'11px'}}/>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Players by Sport */}
          <div>
            <div className="disc-title">
              <FontAwesomeIcon icon={faStar} style={{color:'#F5A623'}}/>Popular Players
            </div>
            {[
              {sport:'Football', icon:faFootball, color:'#1B6FF0', bg:'#EBF2FF', players:['Patrick Mahomes','Josh Allen','Caleb Williams','Joe Burrow','Lamar Jackson','Tom Brady']},
              {sport:'Basketball', icon:faBasketball, color:'#E8820C', bg:'#FEF3E2', players:['LeBron James','Stephen Curry','Victor Wembanyama','Jayson Tatum','Luka Doncic','Nikola Jokic']},
              {sport:'Baseball', icon:faBaseball, color:'#00A861', bg:'#E6F9F0', players:['Shohei Ohtani','Juan Soto','Ronald Acuna Jr','Julio Rodriguez','Fernando Tatis Jr','Mike Trout']},
              {sport:'Hockey', icon:faHockeyPuck, color:'#7B4FCA', bg:'#F2ECFB', players:['Connor McDavid','Nathan MacKinnon','Sidney Crosby','Auston Matthews','Leon Draisaitl','Cale Makar']},
              {sport:'Gaming / TCG', icon:faGamepad, color:'#D93025', bg:'#FDECEA', players:['Charizard','Pikachu','Black Lotus','Mox Ruby','Lorcana Elsa','Mewtwo']},
            ].map(group => (
              <div key={group.sport} style={{marginBottom:'28px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px',paddingBottom:'8px',borderBottom:'1px solid #EFEFEF'}}>
                  <div style={{width:'28px',height:'28px',borderRadius:'8px',background:group.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <FontAwesomeIcon icon={group.icon} style={{color:group.color,fontSize:'13px'}}/>
                  </div>
                  <span style={{fontSize:'14px',fontWeight:700,color:'#0D0D0D'}}>{group.sport}</span>
                </div>
                <div className="disc-grid">
                  {group.players.map(p => (
                    <div key={p} className="disc-card" onClick={() => runSearch(p)}>
                      <div style={{width:'36px',height:'36px',borderRadius:'8px',background:group.bg,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'8px'}}>
                        <FontAwesomeIcon icon={group.icon} style={{color:group.color,fontSize:'14px'}}/>
                      </div>
                      <div style={{fontSize:'12px',fontWeight:700,color:'#0D0D0D',lineHeight:1.2}}>{p}</div>
                      <div style={{fontSize:'10px',color:'#9A9A9A',marginTop:'2px'}}>Search cards →</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
              {title:'Product', links:[{l:'Browse Cards',h:'/browse'},{l:'Search Database',h:'/search'},{l:'My Vault',h:'/collection'},{l:'Community',h:'/community'}]},
              {title:'Sports', links:[{l:'Baseball',h:'/search?q=baseball'},{l:'Basketball',h:'/search?q=basketball'},{l:'Football',h:'/search?q=football'},{l:'Hockey',h:'/search?q=hockey'},{l:'Soccer',h:'/search?q=soccer'},{l:'Gaming / TCG',h:'/search?q=pokemon'}]},
              {title:'Company', links:[{l:'About Us',h:'#'},{l:'Community',h:'/community'},{l:'Contact',h:'#'},{l:'Privacy Policy',h:'#'},{l:'Terms of Service',h:'#'}]},
            ].map(col => (
              <div key={col.title}>
                <div style={{fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#9A9A9A',marginBottom:'16px'}}>{col.title}</div>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
                  {col.links.map(link => (
                    <li key={link.l}>
                      <a href={link.h} style={{fontSize:'14px',color:'#555',textDecoration:'none',transition:'color .15s'}}
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

export default function Search() {
  return (
    <Suspense fallback={
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'40px',marginBottom:'16px'}}>🔍</div>
          <div style={{fontSize:'16px',fontWeight:600,color:'#555'}}>Loading search...</div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}