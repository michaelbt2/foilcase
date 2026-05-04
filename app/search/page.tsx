'use client'
import { useState, useEffect, useRef } from 'react'

interface CardResult {
  id: string
  player: string
  year: string
  brand: string
  set: string
  sport: string
  cardnum: string
  parallel: string
  price: string
  priceNum: number
  graded: boolean
  grade: string
  attrs: string[]
  img: string
  bg: string
  trending: 'up' | 'down' | 'flat'
  trendPct: string
  collectors: number
}

const ALL_CARDS: CardResult[] = [
  { id:'1',  player:'Patrick Mahomes II',   year:'2024', brand:'Panini',      set:'Prizm Football',       sport:'Football',   cardnum:'#200',   parallel:'Silver Prizm', price:'$340',   priceNum:340,   graded:false, grade:'',      attrs:['chrome'],              img:'🏈', bg:'linear-gradient(135deg,#EBF2FF,#C5D8FF)', trending:'up',   trendPct:'+84%',  collectors:3241 },
  { id:'2',  player:'Patrick Mahomes II',   year:'2024', brand:'Panini',      set:'Prizm Football',       sport:'Football',   cardnum:'#200',   parallel:'Gold /10',     price:'$4,200', priceNum:4200,  graded:true,  grade:'PSA 10',attrs:['chrome','numbered'],   img:'🏈', bg:'linear-gradient(135deg,#FEF3E2,#FDDBA0)', trending:'up',   trendPct:'+12%',  collectors:284  },
  { id:'3',  player:'Patrick Mahomes II',   year:'2017', brand:'Panini',      set:'Prizm Football',       sport:'Football',   cardnum:'#269',   parallel:'Silver Prizm', price:'$1,250', priceNum:1250,  graded:true,  grade:'PSA 9', attrs:['rc','chrome'],         img:'🏈', bg:'linear-gradient(135deg,#EBF2FF,#C5D8FF)', trending:'up',   trendPct:'+22%',  collectors:8420 },
  { id:'4',  player:'Caleb Williams',       year:'2024', brand:'Panini',      set:'Prizm Football',       sport:'Football',   cardnum:'#301',   parallel:'Silver Prizm', price:'$185',   priceNum:185,   graded:false, grade:'',      attrs:['rc','chrome'],         img:'🏈', bg:'linear-gradient(135deg,#EBF2FF,#C5D8FF)', trending:'up',   trendPct:'+45%',  collectors:1820 },
  { id:'5',  player:'Marvin Harrison Jr.',  year:'2024', brand:'Panini',      set:'Prizm Football',       sport:'Football',   cardnum:'#302',   parallel:'Silver Prizm', price:'$120',   priceNum:120,   graded:false, grade:'',      attrs:['rc','chrome'],         img:'🏈', bg:'linear-gradient(135deg,#EBF2FF,#C5D8FF)', trending:'up',   trendPct:'+38%',  collectors:940  },
  { id:'6',  player:'Shohei Ohtani',        year:'2018', brand:'Topps',       set:'Topps Chrome',         sport:'Baseball',   cardnum:'#150',   parallel:'Base',         price:'$2,100', priceNum:2100,  graded:true,  grade:'PSA 10',attrs:['rc','auto','chrome'],   img:'⚾', bg:'linear-gradient(135deg,#E6F9F0,#A8DFC4)', trending:'up',   trendPct:'+18%',  collectors:5820 },
  { id:'7',  player:'Shohei Ohtani',        year:'2024', brand:'Topps',       set:'Topps Chrome',         sport:'Baseball',   cardnum:'#200',   parallel:'Silver Refractor',price:'$340',priceNum:340,  graded:false, grade:'',      attrs:['chrome'],              img:'⚾', bg:'linear-gradient(135deg,#E6F9F0,#A8DFC4)', trending:'flat', trendPct:'0%',    collectors:2140 },
  { id:'8',  player:'Victor Wembanyama',    year:'2023', brand:'Panini',      set:'Prizm Basketball',     sport:'Basketball', cardnum:'#RC-1',  parallel:'Silver Prizm', price:'$380',   priceNum:380,   graded:true,  grade:'BGS 9.5',attrs:['rc','chrome'],        img:'🏀', bg:'linear-gradient(135deg,#FEF3E2,#FDDBA0)', trending:'up',   trendPct:'+28%',  collectors:2840 },
  { id:'9',  player:'LeBron James',         year:'2003', brand:'Topps',       set:'Topps Chrome',         sport:'Basketball', cardnum:'#111',   parallel:'Refractor',    price:'$4,800', priceNum:4800,  graded:true,  grade:'PSA 10',attrs:['rc','chrome'],         img:'🏀', bg:'linear-gradient(135deg,#FEF3E2,#FDDBA0)', trending:'up',   trendPct:'+5%',   collectors:9200 },
  { id:'10', player:'Connor McDavid',       year:'2015', brand:'Upper Deck',  set:'Young Guns',           sport:'Hockey',     cardnum:'#201',   parallel:'Base',         price:'$680',   priceNum:680,   graded:false, grade:'',      attrs:['rc'],                  img:'🏒', bg:'linear-gradient(135deg,#F2ECFB,#D4BAF0)', trending:'up',   trendPct:'+14%',  collectors:3100 },
  { id:'11', player:'Charizard',            year:'1999', brand:'Wizards',     set:'Pokemon Base Set',     sport:'Gaming',     cardnum:'#4',     parallel:'Holo',         price:'$9,999', priceNum:9999,  graded:true,  grade:'PSA 9', attrs:['shortprint'],          img:'🎮', bg:'linear-gradient(135deg,#FDECEA,#F9C0BB)', trending:'up',   trendPct:'+8%',   collectors:12400},
  { id:'12', player:'Pikachu',              year:'1999', brand:'Wizards',     set:'Pokemon Base Set',     sport:'Gaming',     cardnum:'#58',    parallel:'Base',         price:'$420',   priceNum:420,   graded:true,  grade:'PSA 10',attrs:[],                      img:'🎮', bg:'linear-gradient(135deg,#FDECEA,#F9C0BB)', trending:'flat', trendPct:'-2%',   collectors:4200 },
  { id:'13', player:'Erling Haaland',       year:'2024', brand:'Topps',       set:'Chrome UCL',           sport:'Soccer',     cardnum:'#EH-1',  parallel:'Silver',       price:'$85',    priceNum:85,    graded:false, grade:'',      attrs:['chrome'],              img:'⚽', bg:'linear-gradient(135deg,#E0F7FA,#A5E8F0)', trending:'up',   trendPct:'+32%',  collectors:820  },
  { id:'14', player:'Jalen Hurts',          year:'2020', brand:'Panini',      set:'Prizm Football',       sport:'Football',   cardnum:'#340',   parallel:'Silver Prizm', price:'$280',   priceNum:280,   graded:false, grade:'',      attrs:['rc','chrome'],         img:'🏈', bg:'linear-gradient(135deg,#EBF2FF,#C5D8FF)', trending:'up',   trendPct:'+55%',  collectors:2100 },
  { id:'15', player:'CJ Stroud',            year:'2023', brand:'Panini',      set:'Prizm Football',       sport:'Football',   cardnum:'#310',   parallel:'Silver Prizm', price:'$165',   priceNum:165,   graded:false, grade:'',      attrs:['rc','chrome'],         img:'🏈', bg:'linear-gradient(135deg,#EBF2FF,#C5D8FF)', trending:'down', trendPct:'-12%',  collectors:1480 },
  { id:'16', player:'Julio Rodriguez',      year:'2022', brand:'Bowman',      set:'Bowman Chrome',        sport:'Baseball',   cardnum:'#BCP-1', parallel:'Base',         price:'$145',   priceNum:145,   graded:false, grade:'',      attrs:['rc','chrome'],         img:'⚾', bg:'linear-gradient(135deg,#E6F9F0,#A8DFC4)', trending:'flat', trendPct:'+2%',   collectors:890  },
  { id:'17', player:'Bijan Robinson',       year:'2023', brand:'Panini',      set:'Select Football',      sport:'Football',   cardnum:'#BR-1',  parallel:'Concourse',    price:'$95',    priceNum:95,    graded:false, grade:'',      attrs:['rc'],                  img:'🏈', bg:'linear-gradient(135deg,#EBF2FF,#C5D8FF)', trending:'down', trendPct:'-8%',   collectors:1020 },
  { id:'18', player:'Luka Doncic',          year:'2018', brand:'Panini',      set:'Prizm Basketball',     sport:'Basketball', cardnum:'#280',   parallel:'Silver Prizm', price:'$1,800', priceNum:1800,  graded:true,  grade:'PSA 10',attrs:['rc','chrome'],         img:'🏀', bg:'linear-gradient(135deg,#FEF3E2,#FDDBA0)', trending:'up',   trendPct:'+10%',  collectors:6800 },
]

const RECENT_SEARCHES = ['Patrick Mahomes','2024 Prizm Football','Charizard PSA 10','Shohei Ohtani RC','LeBron James']
const TRENDING = ['Caleb Williams RC','2025 Prizm Football','Mahomes Gold /10','Wembanyama Prizm','Charizard 1st Edition']

const sportEmoji: Record<string,string> = { Football:'🏈', Baseball:'⚾', Basketball:'🏀', Hockey:'🏒', Soccer:'⚽', Gaming:'🎮' }

function attrLabel(a: string) {
  const map: Record<string,string> = { rc:'RC', auto:'Auto', patch:'Patch', numbered:'Numbered', chrome:'Chrome', refractor:'Refractor', shortprint:'SP', '1of1':'1/1' }
  return map[a] || a
}

export default function Search() {
  const [query, setQuery]           = useState('')
  const [submitted, setSubmitted]   = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [results, setResults]       = useState<CardResult[]>([])
  const [sport, setSport]           = useState('all')
  const [grading, setGrading]       = useState('all')
  const [sortBy, setSortBy]         = useState('relevance')
  const [priceMin, setPriceMin]     = useState('')
  const [priceMax, setPriceMax]     = useState('')
  const [yearMin, setYearMin]       = useState('')
  const [yearMax, setYearMax]       = useState('')
  const [activeAttrs, setActiveAttrs] = useState<string[]>([])
  const [viewMode, setViewMode]     = useState<'grid'|'list'>('grid')
  const [toast, setToast]           = useState<string|null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800) }

  const toggleAttr = (a: string) => setActiveAttrs(prev => prev.includes(a) ? prev.filter(x=>x!==a) : [...prev,a])

  const runSearch = (q: string) => {
    setQuery(q)
    setSubmitted(true)
    setShowDropdown(false)
    let res = ALL_CARDS.filter(c => {
      if (!q.trim()) return true
      const search = q.toLowerCase()
      return (
        c.player.toLowerCase().includes(search) ||
        c.set.toLowerCase().includes(search) ||
        c.year.includes(search) ||
        c.brand.toLowerCase().includes(search) ||
        c.sport.toLowerCase().includes(search) ||
        c.parallel.toLowerCase().includes(search) ||
        c.cardnum.toLowerCase().includes(search)
      )
    })
    setResults(res)
  }

  const filtered = results.filter(c => {
    if (sport !== 'all' && c.sport !== sport) return false
    if (grading === 'graded' && !c.graded) return false
    if (grading === 'raw' && c.graded) return false
    if (priceMin && c.priceNum < parseInt(priceMin)) return false
    if (priceMax && c.priceNum > parseInt(priceMax)) return false
    if (yearMin && parseInt(c.year) < parseInt(yearMin)) return false
    if (yearMax && parseInt(c.year) > parseInt(yearMax)) return false
    if (activeAttrs.length > 0 && !activeAttrs.every(a => c.attrs.includes(a))) return false
    return true
  }).sort((a,b) => {
    if (sortBy === 'price-desc') return b.priceNum - a.priceNum
    if (sortBy === 'price-asc')  return a.priceNum - b.priceNum
    if (sortBy === 'collectors') return b.collectors - a.collectors
    if (sortBy === 'trending')   return (b.trendPct.startsWith('+')?1:-1) - (a.trendPct.startsWith('+')?1:-1)
    if (sortBy === 'year-desc')  return parseInt(b.year) - parseInt(a.year)
    if (sortBy === 'year-asc')   return parseInt(a.year) - parseInt(b.year)
    return 0
  })

  const suggestions = query.length > 1
    ? ALL_CARDS.filter(c => c.player.toLowerCase().includes(query.toLowerCase()) || c.set.toLowerCase().includes(query.toLowerCase())).slice(0,6)
    : []

  const hasActiveFilters = sport !== 'all' || grading !== 'all' || priceMin || priceMax || yearMin || yearMax || activeAttrs.length > 0

  const clearFilters = () => { setSport('all'); setGrading('all'); setPriceMin(''); setPriceMax(''); setYearMin(''); setYearMax(''); setActiveAttrs([]) }

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#F7F7F7;color:#0D0D0D;-webkit-font-smoothing:antialiased}
        nav{position:sticky;top:0;z-index:200;background:rgba(255,255,255,.92);backdrop-filter:blur(16px);border-bottom:1px solid #EFEFEF;height:58px;display:flex;align-items:center}
        .nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;width:100%;display:flex;align-items:center;gap:20px}
        .nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:#0D0D0D;font-weight:800;font-size:16px;letter-spacing:-.4px}
        .nav-logo-icon{width:26px;height:26px;background:#1B6FF0;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px}
        .nav-links{display:flex;gap:2px;list-style:none}
        .nav-links a{text-decoration:none;color:#555;font-size:14px;font-weight:500;padding:5px 10px;border-radius:6px;transition:all .15s}
        .nav-links a:hover{color:#0D0D0D;background:#F7F7F7}
        .nav-links a.active{color:#1B6FF0;background:#EBF2FF}
        .nav-actions{display:flex;align-items:center;gap:8px;margin-left:auto}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 14px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .15s;border:none;white-space:nowrap}
        .btn-ghost{background:transparent;color:#555}
        .btn-ghost:hover{background:#F7F7F7;color:#0D0D0D}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF;transform:translateY(-1px)}
        .btn-outline{background:transparent;color:#0D0D0D;border:1.5px solid #D8D8D8}
        .btn-outline:hover{border-color:#0D0D0D}

        /* HERO SEARCH */
        .search-hero{background:#0D0D0D;padding:48px 24px 40px;position:relative;overflow:hidden}
        .search-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .search-hero-inner{max-width:720px;margin:0 auto;position:relative;z-index:1}
        .search-hero-title{font-size:clamp(28px,5vw,44px);font-weight:800;color:#fff;letter-spacing:-1px;line-height:1.1;margin-bottom:8px;text-align:center}
        .search-hero-title em{font-style:italic;color:#7EB6FF}
        .search-hero-sub{font-size:15px;color:rgba(255,255,255,.5);text-align:center;margin-bottom:28px}
        .search-bar-wrap{position:relative}
        .search-bar{display:flex;align-items:center;gap:10px;background:#fff;border-radius:16px;padding:8px 8px 8px 20px;box-shadow:0 8px 32px rgba(0,0,0,.3);transition:box-shadow .2s}
        .search-bar:focus-within{box-shadow:0 8px 32px rgba(0,0,0,.3),0 0 0 3px rgba(27,111,240,.4)}
        .search-bar input{flex:1;border:none;outline:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;color:#0D0D0D;background:transparent}
        .search-bar input::placeholder{color:#9A9A9A}
        .search-bar-btn{background:#1B6FF0;color:#fff;border:none;border-radius:10px;padding:10px 20px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .15s;white-space:nowrap}
        .search-bar-btn:hover{background:#0A4DBF}
        .search-clear{background:transparent;border:none;cursor:pointer;color:#9A9A9A;font-size:18px;padding:4px;display:flex;align-items:center;justify-content:center;transition:color .15s}
        .search-clear:hover{color:#0D0D0D}

        /* DROPDOWN */
        .search-dropdown{position:absolute;top:calc(100% + 8px);left:0;right:0;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.15);z-index:100;overflow:hidden;animation:dropIn .15s ease}
        @keyframes dropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .dropdown-section{padding:8px 0}
        .dropdown-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;padding:6px 16px 4px}
        .dropdown-item{display:flex;align-items:center;gap:12px;padding:9px 16px;cursor:pointer;transition:background .12s}
        .dropdown-item:hover{background:#F7F7F7}
        .dropdown-item-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
        .dropdown-item-main{flex:1;min-width:0}
        .dropdown-item-name{font-size:13px;font-weight:600;color:#0D0D0D;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .dropdown-item-sub{font-size:11px;color:#9A9A9A;margin-top:1px}
        .dropdown-item-price{font-size:13px;font-weight:800;color:#1B6FF0;flex-shrink:0}
        .dropdown-divider{height:1px;background:#EFEFEF;margin:4px 0}

        /* QUICK PILLS */
        .search-pills{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;justify-content:center}
        .search-pill{padding:5px 14px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:100px;font-size:12px;font-weight:600;color:rgba(255,255,255,.7);cursor:pointer;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
        .search-pill:hover{background:rgba(255,255,255,.2);color:#fff}

        /* SPORT TABS */
        .sport-tabs{background:#fff;border-bottom:1px solid #EFEFEF;padding:0 24px;overflow-x:auto;display:flex;gap:0}
        .sport-tabs::-webkit-scrollbar{display:none}
        .sport-tab{padding:12px 18px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:transparent;color:#555;border-bottom:2px solid transparent;white-space:nowrap;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
        .sport-tab:hover{color:#0D0D0D}
        .sport-tab.on{color:#1B6FF0;border-bottom-color:#1B6FF0}

        /* MAIN LAYOUT */
        .main-layout{max-width:1200px;margin:0 auto;padding:24px;display:grid;grid-template-columns:240px 1fr;gap:20px;align-items:start}

        /* SIDEBAR */
        .sidebar{display:flex;flex-direction:column;gap:12px;position:sticky;top:78px}
        .filter-card{background:#fff;border:1px solid #EFEFEF;border-radius:16px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .filter-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between}
        .filter-clear{font-size:11px;font-weight:600;color:#1B6FF0;cursor:pointer;text-transform:none;letter-spacing:0}
        .filter-clear:hover{text-decoration:underline}
        .fchips{display:flex;flex-wrap:wrap;gap:5px}
        .fchip{padding:5px 10px;background:#F7F7F7;border:1px solid #EFEFEF;border-radius:100px;font-size:12px;font-weight:600;color:#555;cursor:pointer;transition:all .12s;font-family:'Plus Jakarta Sans',sans-serif;border:none}
        .fchip:hover{background:#EFEFEF;color:#0D0D0D}
        .fchip.on{background:#0D0D0D;color:#fff}
        .price-range{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px}
        .range-input{width:100%;padding:7px 10px;border:1.5px solid #EFEFEF;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:#0D0D0D;background:#fff;outline:none;transition:border-color .15s}
        .range-input:focus{border-color:#1B6FF0}
        .range-input::placeholder{color:#9A9A9A}
        .active-filters-bar{display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:8px 0}
        .af-pill{display:flex;align-items:center;gap:4px;padding:3px 10px;background:#EBF2FF;border:1px solid #C5D8FF;border-radius:100px;font-size:11px;font-weight:600;color:#1B6FF0;cursor:pointer;transition:all .15s}
        .af-pill:hover{background:#FDECEA;color:#D93025;border-color:#FFBBB7}

        /* RESULTS */
        .results-header{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:16px}
        .results-count{font-size:14px;font-weight:700;color:#0D0D0D;flex:1}
        .results-count span{color:#9A9A9A;font-weight:400}
        .sort-select{padding:7px 12px;border:1.5px solid #EFEFEF;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;color:#0D0D0D;background:#fff;cursor:pointer;outline:none}
        .view-toggle{display:flex;gap:2px;background:#F7F7F7;border-radius:10px;padding:3px}
        .vbtn{padding:5px 8px;border-radius:7px;border:none;background:transparent;cursor:pointer;color:#9A9A9A;font-size:15px;transition:all .12s}
        .vbtn.on{background:#fff;color:#0D0D0D;box-shadow:0 1px 3px rgba(0,0,0,.06)}

        /* CARD GRID */
        .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
        .card-tile{background:#fff;border:1px solid #EFEFEF;border-radius:16px;overflow:hidden;cursor:pointer;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;flex-direction:column;animation:fadeUp .3s ease both}
        .card-tile:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.10);border-color:#D8D8D8}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .card-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:48px;position:relative}
        .grade-chip{position:absolute;bottom:8px;left:8px;font-size:9px;font-weight:800;padding:3px 7px;border-radius:5px;background:#002FA7;color:#fff}
        .trend-chip{position:absolute;top:8px;right:8px;font-size:9px;font-weight:700;padding:2px 7px;border-radius:100px}
        .trend-up{background:#ECFDF5;color:#059669}
        .trend-down{background:#FEF2F2;color:#DC2626}
        .trend-flat{background:#F7F7F7;color:#9A9A9A}
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
        .card-collectors{font-size:10px;color:#9A9A9A}
        .card-actions{display:flex;gap:4px;padding:0 13px 11px;opacity:0;transition:opacity .15s}
        .card-tile:hover .card-actions{opacity:1}
        .act-btn{flex:1;padding:5px 0;border-radius:6px;font-size:10px;font-weight:700;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .12s;text-align:center}
        .act-view{background:#EBF2FF;color:#1B6FF0}
        .act-view:hover{background:#1B6FF0;color:#fff}
        .act-add{background:#E6F9F0;color:#00A861}
        .act-add:hover{background:#00A861;color:#fff}
        .act-want{background:#F7F7F7;color:#555}
        .act-want:hover{background:#F2ECFB;color:#7B4FCA}

        /* LIST VIEW */
        .cards-list{display:flex;flex-direction:column;gap:10px}
        .list-tile{background:#fff;border:1px solid #EFEFEF;border-radius:14px;overflow:hidden;display:flex;align-items:center;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);animation:fadeUp .3s ease both}
        .list-tile:hover{box-shadow:0 4px 16px rgba(0,0,0,.07);border-color:#D8D8D8}
        .list-img{width:64px;height:64px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;margin:10px 0 10px 14px;border-radius:10px}
        .list-main{flex:1;padding:10px 14px;min-width:0}
        .list-player{font-size:14px;font-weight:700;color:#0D0D0D}
        .list-set{font-size:12px;color:#9A9A9A;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .list-tags{display:flex;gap:4px;margin-top:5px;flex-wrap:wrap}
        .list-right{display:flex;align-items:center;gap:20px;padding:0 16px;flex-shrink:0}
        .lr-item{text-align:center}
        .lr-lbl{font-size:10px;color:#9A9A9A;font-weight:600;text-transform:uppercase}
        .lr-val{font-size:14px;font-weight:800;color:#0D0D0D}
        .list-actions{display:flex;gap:6px;padding:0 14px;opacity:0;transition:opacity .15s;flex-shrink:0}
        .list-tile:hover .list-actions{opacity:1}

        /* DISCOVERY SECTIONS */
        .discovery{max-width:1200px;margin:0 auto;padding:0 24px 40px}
        .disc-section{margin-bottom:32px}
        .disc-title{font-size:16px;font-weight:800;letter-spacing:-.3px;margin-bottom:14px;display:flex;align-items:center;gap:8px}
        .disc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}
        .disc-card{background:#fff;border:1px solid #EFEFEF;border-radius:14px;padding:14px;cursor:pointer;transition:all .18s;box-shadow:0 1px 3px rgba(0,0,0,.05)}
        .disc-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.09)}
        .disc-card-icon{font-size:28px;margin-bottom:8px}
        .disc-card-name{font-size:13px;font-weight:700;color:#0D0D0D;line-height:1.2}
        .disc-card-sub{font-size:11px;color:#9A9A9A;margin-top:2px}
        .disc-card-price{font-size:13px;font-weight:800;color:#1B6FF0;margin-top:6px}
        .trending-list{display:flex;flex-direction:column;gap:6px}
        .trending-item{display:flex;align-items:center;gap:12px;padding:10px 14px;background:#fff;border:1px solid #EFEFEF;border-radius:12px;cursor:pointer;transition:all .15s}
        .trending-item:hover{border-color:#D8D8D8;box-shadow:0 2px 8px rgba(0,0,0,.06)}
        .trending-rank{font-size:13px;font-weight:800;color:#D8D8D8;width:20px;flex-shrink:0}
        .trending-name{font-size:13px;font-weight:600;flex:1}
        .trending-arrow{font-size:12px;font-weight:700}

        /* EMPTY */
        .empty-state{background:#fff;border:1.5px dashed #D8D8D8;border-radius:20px;padding:64px 24px;text-align:center;grid-column:1/-1}

        /* TOAST */
        .toast{position:fixed;bottom:24px;right:24px;z-index:999;background:#0D0D0D;color:#fff;border-radius:14px;padding:12px 18px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toastIn .3s cubic-bezier(.34,1.56,.64,1);max-width:320px}
        @keyframes toastIn{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}
        @media(max-width:860px){.main-layout{grid-template-columns:1fr}.sidebar{position:static}.cards-grid{grid-template-columns:repeat(2,1fr)}}
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a className="nav-logo" href="/"><div className="nav-logo-icon">🃏</div>FoilCase</a>
          <ul className="nav-links">
            <li><a href="/browse">Browse</a></li>
            <li><a href="/collection">My Collection</a></li>
            <li><a href="/search" className="active">Search</a></li>
          </ul>
          <div className="nav-actions">
            <a className="btn btn-ghost" href="#">Log in</a>
            <a className="btn btn-primary" href="#">Get started free</a>
          </div>
        </div>
      </nav>

      {/* HERO SEARCH */}
      <div className="search-hero">
        <div className="search-hero-inner">
          <h1 className="search-hero-title">Find any card <em>instantly</em></h1>
          <p className="search-hero-sub">Search 2.4 million cards by player, set, year, brand, or parallel</p>

          <div className="search-bar-wrap">
            <div className="search-bar">
              <span style={{fontSize:'20px',color:'#9A9A9A',flexShrink:0}}>🔍</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Player name, set, year, brand..."
                value={query}
                onChange={e => { setQuery(e.target.value); setShowDropdown(e.target.value.length > 1); setSubmitted(false) }}
                onKeyDown={e => { if (e.key === 'Enter') runSearch(query) }}
                onFocus={() => { if (query.length > 1) setShowDropdown(true) }}
                autoComplete="off"
              />
              {query && (
                <button className="search-clear" onClick={() => { setQuery(''); setSubmitted(false); setShowDropdown(false); setResults([]); inputRef.current?.focus() }}>✕</button>
              )}
              <button className="search-bar-btn" onClick={() => runSearch(query)}>Search</button>
            </div>

            {/* Autocomplete Dropdown */}
            {showDropdown && suggestions.length > 0 && (
              <div className="search-dropdown">
                <div className="dropdown-section">
                  <div className="dropdown-label">Cards matching "{query}"</div>
                  {suggestions.map(c => (
                    <div key={c.id} className="dropdown-item" onClick={() => runSearch(c.player)}>
                      <div className="dropdown-item-icon" style={{background:c.bg}}>{c.img}</div>
                      <div className="dropdown-item-main">
                        <div className="dropdown-item-name">{c.player} — {c.parallel}</div>
                        <div className="dropdown-item-sub">{c.year} {c.brand} {c.set} · {c.cardnum}</div>
                      </div>
                      <div className="dropdown-item-price">{c.price}</div>
                    </div>
                  ))}
                </div>
                {RECENT_SEARCHES.some(r => r.toLowerCase().includes(query.toLowerCase())) && (
                  <>
                    <div className="dropdown-divider"/>
                    <div className="dropdown-section">
                      <div className="dropdown-label">Recent searches</div>
                      {RECENT_SEARCHES.filter(r => r.toLowerCase().includes(query.toLowerCase())).slice(0,3).map(r => (
                        <div key={r} className="dropdown-item" onClick={() => runSearch(r)}>
                          <div className="dropdown-item-icon" style={{background:'#F7F7F7',fontSize:'14px'}}>🕐</div>
                          <div className="dropdown-item-main">
                            <div className="dropdown-item-name">{r}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Quick search pills */}
          {!submitted && (
            <div className="search-pills">
              {RECENT_SEARCHES.map(r => (
                <button key={r} className="search-pill" onClick={() => runSearch(r)}>{r}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SPORT TABS — shown after search */}
      {submitted && (
        <div className="sport-tabs">
          {[
            {id:'all',label:'All Sports'},
            {id:'Football',label:'🏈 Football'},
            {id:'Baseball',label:'⚾ Baseball'},
            {id:'Basketball',label:'🏀 Basketball'},
            {id:'Hockey',label:'🏒 Hockey'},
            {id:'Soccer',label:'⚽ Soccer'},
            {id:'Gaming',label:'🎮 Gaming'},
          ].map(s => (
            <button key={s.id} className={`sport-tab${sport===s.id?' on':''}`} onClick={() => setSport(s.id)}>{s.label}</button>
          ))}
        </div>
      )}

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

              <div style={{marginBottom:'14px'}}>
                <div style={{fontSize:'11px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'6px'}}>Grading</div>
                <div className="fchips">
                  {[{v:'all',l:'All'},{v:'graded',l:'Graded'},{v:'raw',l:'Raw'}].map(o => (
                    <button key={o.v} className={`fchip${grading===o.v?' on':''}`} onClick={() => setGrading(o.v)}>{o.l}</button>
                  ))}
                </div>
              </div>

              <div style={{marginBottom:'14px'}}>
                <div style={{fontSize:'11px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'6px'}}>Card Type</div>
                <div className="fchips">
                  {[{v:'rc',l:'Rookie'},{v:'auto',l:'Auto'},{v:'numbered',l:'Numbered'},{v:'chrome',l:'Chrome'},{v:'shortprint',l:'SP'}].map(a => (
                    <button key={a.v} className={`fchip${activeAttrs.includes(a.v)?' on':''}`} onClick={() => toggleAttr(a.v)}>{a.l}</button>
                  ))}
                </div>
              </div>

              <div style={{marginBottom:'14px'}}>
                <div style={{fontSize:'11px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'6px'}}>Price Range ($)</div>
                <div className="price-range">
                  <input className="range-input" type="number" placeholder="Min" value={priceMin} onChange={e=>setPriceMin(e.target.value)}/>
                  <input className="range-input" type="number" placeholder="Max" value={priceMax} onChange={e=>setPriceMax(e.target.value)}/>
                </div>
              </div>

              <div>
                <div style={{fontSize:'11px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'6px'}}>Year Range</div>
                <div className="price-range">
                  <input className="range-input" type="number" placeholder="From" value={yearMin} onChange={e=>setYearMin(e.target.value)}/>
                  <input className="range-input" type="number" placeholder="To" value={yearMax} onChange={e=>setYearMax(e.target.value)}/>
                </div>
              </div>
            </div>

            {/* Trending sidebar */}
            <div className="filter-card">
              <div className="filter-title">🔥 Trending Now</div>
              <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                {TRENDING.map((t,i) => (
                  <div key={t} className="trending-item" onClick={() => runSearch(t)}>
                    <span className="trending-rank">#{i+1}</span>
                    <span className="trending-name">{t}</span>
                    <span className="trending-arrow" style={{color:'#00A861'}}>↑</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* RESULTS */}
          <main>
            <div className="results-header">
              <div className="results-count">
                {filtered.length > 0 ? (
                  <>{filtered.length} result{filtered.length!==1?'s':''} <span>for "{query}"</span></>
                ) : (
                  <>No results <span>for "{query}"</span></>
                )}
              </div>

              {/* Active filter pills */}
              {hasActiveFilters && (
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap',flex:'0 0 auto'}}>
                  {sport!=='all' && <div className="af-pill" onClick={()=>setSport('all')}>{sportEmoji[sport]} {sport} ×</div>}
                  {grading!=='all' && <div className="af-pill" onClick={()=>setGrading('all')}>{grading} ×</div>}
                  {activeAttrs.map(a => <div key={a} className="af-pill" onClick={()=>toggleAttr(a)}>{attrLabel(a)} ×</div>)}
                  {(priceMin||priceMax) && <div className="af-pill" onClick={()=>{setPriceMin('');setPriceMax('')}}>${priceMin||'0'} – ${priceMax||'∞'} ×</div>}
                  {(yearMin||yearMax) && <div className="af-pill" onClick={()=>{setYearMin('');setYearMax('')}}>{yearMin||'?'} – {yearMax||'?'} ×</div>}
                </div>
              )}

              <select className="sort-select" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                <option value="relevance">Most Relevant</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="collectors">Most Collected</option>
                <option value="trending">Trending</option>
                <option value="year-desc">Newest First</option>
                <option value="year-asc">Oldest First</option>
              </select>

              <div className="view-toggle">
                <button className={`vbtn${viewMode==='grid'?' on':''}`} onClick={()=>setViewMode('grid')}>⊞</button>
                <button className={`vbtn${viewMode==='list'?' on':''}`} onClick={()=>setViewMode('list')}>☰</button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <div style={{fontSize:'40px',marginBottom:'12px'}}>🔍</div>
                <div style={{fontSize:'18px',fontWeight:700,marginBottom:'8px'}}>No cards found</div>
                <div style={{fontSize:'14px',color:'#9A9A9A',marginBottom:'20px'}}>Try adjusting your filters or search for something else.</div>
                <button className="btn btn-primary" onClick={clearFilters}>Clear filters</button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="cards-grid">
                {filtered.map((c,i) => (
                  <div key={c.id} className="card-tile" style={{animationDelay:`${i*.04}s`}}>
                    <div className="card-img" style={{background:c.bg}}>
                      {c.img}
                      {c.graded && <div className="grade-chip">{c.grade}</div>}
                      <div className={`trend-chip ${c.trending==='up'?'trend-up':c.trending==='down'?'trend-down':'trend-flat'}`}>
                        {c.trending==='up'?'↑':c.trending==='down'?'↓':'→'} {c.trendPct}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card-player">{c.player}</div>
                      <div className="card-set">{c.year} {c.brand} · {c.set} · {c.parallel}</div>
                      <div className="card-attrs">
                        {c.attrs.map(a => (
                          <span key={a} className={`attr-tag tag-${['rc','auto','numbered','chrome'].includes(a)?a:'other'}`}>{attrLabel(a)}</span>
                        ))}
                        {c.graded && <span className="attr-tag" style={{background:'#EEF2FF',color:'#3730A3'}}>{c.grade}</span>}
                      </div>
                      <div className="card-footer">
                        <div className="card-price">{c.price}</div>
                        <div className="card-collectors">👥 {c.collectors.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button className="act-btn act-view" onClick={()=>window.location.href='/cards/'+c.id}>View</button>
                      <button className="act-btn act-add" onClick={()=>showToast(`✅ ${c.player} added to vault!`)}>+ Have</button>
                      <button className="act-btn act-want" onClick={()=>showToast(`⭐ ${c.player} added to wishlist!`)}>★ Want</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="cards-list">
                {filtered.map((c,i) => (
                  <div key={c.id} className="list-tile" style={{animationDelay:`${i*.03}s`}}>
                    <div className="list-img" style={{background:c.bg}}>{c.img}</div>
                    <div className="list-main">
                      <div className="list-player">{c.player} — {c.parallel}</div>
                      <div className="list-set">{c.year} {c.brand} {c.set} · {c.cardnum}</div>
                      <div className="list-tags">
                        {c.attrs.map(a=><span key={a} className={`attr-tag tag-${['rc','auto','numbered','chrome'].includes(a)?a:'other'}`}>{attrLabel(a)}</span>)}
                        {c.graded && <span className="attr-tag" style={{background:'#EEF2FF',color:'#3730A3'}}>{c.grade}</span>}
                      </div>
                    </div>
                    <div className="list-right">
                      <div className="lr-item"><div className="lr-lbl">Price</div><div className="lr-val">{c.price}</div></div>
                      <div className="lr-item"><div className="lr-lbl">Trend</div><div className="lr-val" style={{color:c.trending==='up'?'#00A861':c.trending==='down'?'#D93025':'#9A9A9A'}}>{c.trendPct}</div></div>
                      <div className="lr-item"><div className="lr-lbl">Collectors</div><div className="lr-val">{c.collectors.toLocaleString()}</div></div>
                    </div>
                    <div className="list-actions">
                      <button className="btn btn-outline" style={{fontSize:'12px',padding:'5px 12px'}} onClick={()=>window.location.href='/cards/'+c.id}>View</button>
                      <button className="btn btn-primary" style={{fontSize:'12px',padding:'5px 12px'}} onClick={()=>showToast(`✅ ${c.player} added to vault!`)}>+ Add</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      ) : (

        /* DISCOVERY — shown before searching */
        <div className="discovery" style={{marginTop:'24px'}}>

          <div className="disc-section">
            <div className="disc-title">🔥 Trending Searches</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'8px'}}>
              {TRENDING.map((t,i) => (
                <div key={t} className="trending-item" onClick={() => runSearch(t)}>
                  <span className="trending-rank">#{i+1}</span>
                  <span className="trending-name">{t}</span>
                  <span className="trending-arrow" style={{color:'#00A861'}}>↑</span>
                </div>
              ))}
            </div>
          </div>

          <div className="disc-section">
            <div className="disc-title">⭐ Most Collected Cards</div>
            <div className="disc-grid">
              {ALL_CARDS.sort((a,b)=>b.collectors-a.collectors).slice(0,8).map(c => (
                <div key={c.id} className="disc-card" onClick={() => runSearch(c.player)}>
                  <div className="disc-card-icon">{c.img}</div>
                  <div className="disc-card-name">{c.player}</div>
                  <div className="disc-card-sub">{c.year} {c.set}</div>
                  <div className="disc-card-price">{c.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="disc-section">
            <div className="disc-title">🆕 Recently Added to Database</div>
            <div className="disc-grid">
              {ALL_CARDS.slice(0,8).map(c => (
                <div key={c.id} className="disc-card" onClick={() => runSearch(c.player)}>
                  <div className="disc-card-icon">{c.img}</div>
                  <div className="disc-card-name">{c.player}</div>
                  <div className="disc-card-sub">{c.year} {c.brand} {c.sport}</div>
                  <div className="disc-card-price">{c.price}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </>
  )
}