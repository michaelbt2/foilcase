'use client'
import Nav from '../components/Nav'
import Link from 'next/link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faPlus,
  faStar,
  faGrip,
  faBars,
  faFire,
  faLayerGroup,
  faFilter,
  faArrowUpRightFromSquare,
  faChevronRight,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

const brandData = [
  {
    id: 'panini',
    name: 'Panini America',
    letter: 'P',
    color: 'linear-gradient(135deg,#0A5CB8,#1B82F0)',
    meta: '847 sets · 2.1M cards · Official NFL licensee',
    years: [
      {
        year: '2025',
        sets: [
          { id:'prizm25', name:'Prizm Football', cards:400, parallels:'40+', rating:'9.8', tags:['New','RC','Chrome'], bg:'linear-gradient(135deg,#0A5CB8,#7EB6FF,#0A5CB8)', pct:12, parallel:'Silver Prizm', price:'$340' },
          { id:'donruss25', name:'Donruss Football', cards:350, parallels:'20+', rating:'8.4', tags:['New','Rated RC'], bg:'linear-gradient(135deg,#C41E3A,#FF6B6B,#8B0000)', pct:0, parallel:'Base', price:'$12' },
          { id:'certified25', name:'Certified Football', cards:250, parallels:'15+', rating:'8.1', tags:['New','Auto'], bg:'linear-gradient(135deg,#2A5298,#FFD700,#2A5298)', pct:0, parallel:'Base', price:'$28' },
        ]
      },
      {
        year: '2024',
        sets: [
          { id:'prizm24', name:'Prizm Football', cards:400, parallels:'40+', rating:'9.6', tags:['RC','Chrome'], bg:'linear-gradient(135deg,#0A3D8A,#4A90D9,#0A3D8A)', pct:34, parallel:'Silver Prizm', price:'$285' },
          { id:'select24', name:'Select Football', cards:300, parallels:'30+', rating:'8.9', tags:['RC','Premium'], bg:'linear-gradient(135deg,#6A0DAD,#C084FC,#6A0DAD)', pct:58, parallel:'Concourse', price:'$95' },
          { id:'absolute24', name:'Absolute Football', cards:280, parallels:'20+', rating:'7.8', tags:['Auto','RC'], bg:'linear-gradient(135deg,#8B4513,#D2691E,#4A2200)', pct:0, parallel:'Base', price:'$18' },
          { id:'black24', name:'Black Football', cards:100, parallels:'10+', rating:'9.2', tags:['Ultra Premium'], bg:'linear-gradient(135deg,#111,#444,#111)', pct:5, parallel:'Base', price:'$220' },
          { id:'contenders24', name:'Contenders Football', cards:200, parallels:'15+', rating:'8.6', tags:['Auto','Ticket RC'], bg:'linear-gradient(135deg,#1A5C2A,#3AB55A,#1A5C2A)', pct:22, parallel:'Base', price:'$32' },
          { id:'mosaic24', name:'Mosaic Football', cards:400, parallels:'25+', rating:'8.3', tags:['Chrome','RC'], bg:'linear-gradient(135deg,#C75000,#FF8C42,#8B3000)', pct:71, parallel:'Base', price:'$22' },
        ]
      },
      {
        year: '2023',
        sets: [
          { id:'prizm23', name:'Prizm Football', cards:400, parallels:'40+', rating:'9.5', tags:['RC','Chrome'], bg:'linear-gradient(135deg,#063070,#2563EB,#063070)', pct:88, parallel:'Silver Prizm', price:'$180' },
          { id:'optic23', name:'Donruss Optic Football', cards:300, parallels:'25+', rating:'8.7', tags:['Chrome','RC'], bg:'linear-gradient(135deg,#7A1010,#FF4545,#7A1010)', pct:45, parallel:'Base', price:'$28' },
          { id:'spectra23', name:'Spectra Football', cards:150, parallels:'15+', rating:'9.0', tags:['Premium','Auto'], bg:'linear-gradient(135deg,#2D0050,#9B59B6,#2D0050)', pct:8, parallel:'Base', price:'$85' },
        ]
      },
    ]
  },
  {
    id: 'topps',
    name: 'Topps / Bowman',
    letter: 'T',
    color: 'linear-gradient(135deg,#A61020,#D63A4A)',
    meta: '410 sets · 890K cards · Official NFL partner',
    years: [
      {
        year: '2025',
        sets: [
          { id:'topps25', name:'Chrome Football', cards:220, parallels:'18+', rating:'9.1', tags:['New','Chrome','RC'], bg:'linear-gradient(135deg,#A61020,#FF6B6B,#7A0B18)', pct:0, parallel:'Base Refractor', price:'$45' },
          { id:'bowman25', name:'Chrome University Football', cards:120, parallels:'12+', rating:'8.8', tags:['New','Prospect Auto'], bg:'linear-gradient(135deg,#1D6A3B,#4CAF7D,#0F3D20)', pct:3, parallel:'Base', price:'$38' },
          { id:'cosmic25', name:'Cosmic Chrome Football', cards:180, parallels:'20+', rating:'8.5', tags:['New','Premium'], bg:'linear-gradient(135deg,#0D0033,#5B2D8E,#0D1A66)', pct:0, parallel:'Base', price:'$62' },
        ]
      },
      {
        year: '2024',
        sets: [
          { id:'topps24', name:'Chrome Football', cards:220, parallels:'18+', rating:'8.8', tags:['Chrome','RC'], bg:'linear-gradient(135deg,#8B0000,#CC2222,#5A0000)', pct:52, parallel:'Base Refractor', price:'$38' },
        ]
      },
    ]
  },
  {
    id: 'leaf',
    name: 'Leaf Trading Cards',
    letter: 'L',
    color: 'linear-gradient(135deg,#7A5200,#C8860A)',
    meta: '67 sets · 140K cards · Independent manufacturer',
    years: [
      {
        year: '2024',
        sets: [
          { id:'leafmetal24', name:'Metal Football', cards:80, parallels:'8+', rating:'7.9', tags:['Auto','RC'], bg:'linear-gradient(135deg,#4A3200,#C8860A,#4A3200)', pct:0, parallel:'Base', price:'$24' },
          { id:'leafvivid24', name:'Vivid Football', cards:60, parallels:'6+', rating:'8.2', tags:['Auto','Premium'], bg:'linear-gradient(135deg,#1A4A8A,#5BAFF5,#1A2A6A)', pct:0, parallel:'Base', price:'$48' },
        ]
      },
    ]
  },
]

const tagColors: Record<string,{bg:string,color:string}> = {
  'New':          { bg:'#FDECEA', color:'#D93025' },
  'RC':           { bg:'#E6F9F0', color:'#00A861' },
  'Rated RC':     { bg:'#E6F9F0', color:'#00A861' },
  'Ticket RC':    { bg:'#E6F9F0', color:'#00A861' },
  'Prospect Auto':{ bg:'#FEF3E2', color:'#E8820C' },
  'Chrome':       { bg:'#EBF2FF', color:'#1B6FF0' },
  'Auto':         { bg:'#FEF3E2', color:'#E8820C' },
  'Premium':      { bg:'#F2ECFB', color:'#7B4FCA' },
  'Ultra Premium':{ bg:'#F2ECFB', color:'#7B4FCA' },
}

export default function Browse() {
  const [activeSport, setActiveSport] = useState('football')
  const [activeBrands, setActiveBrands] = useState<string[]>(['panini'])
  const [activeYear, setActiveYear] = useState('modern')
  const [searchVal, setSearchVal] = useState('')
  const [sortVal, setSortVal] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid'|'list'>('grid')
  const [selectedModal, setSelectedModal] = useState<string|null>(null)
  const [toast, setToast] = useState<string|null>(null)
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set())

  const sports = [
    {id:'baseball',label:'⚾ Baseball'},
    {id:'football',label:'🏈 Football'},
    {id:'basketball',label:'🏀 Basketball'},
    {id:'hockey',label:'🏒 Hockey'},
    {id:'soccer',label:'⚽ Soccer'},
    {id:'gaming',label:'🎮 Gaming / TCG'},
  ]

  const toggleBrand = (id: string) => {
    setActiveBrands(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    )
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2800)
  }

  const toggleWishlist = (id: string) => {
    setWishlisted(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id); showToast('Removed from wishlist') }
      else { next.add(id); showToast('⭐ Added to wishlist!') }
      return next
    })
  }

  const quickAdd = (type: string, name: string) => {
    showToast(type === 'have' ? `✅ ${name} added to vault!` : `⭐ ${name} added to wishlist!`)
  }

  const filteredBrands = brandData.filter(b =>
    activeBrands.length === 0 || activeBrands.includes(b.id)
  )

  const getModalSet = () => {
    for (const brand of brandData) {
      for (const yr of brand.years) {
        const found = yr.sets.find(s => s.id === selectedModal)
        if (found) return { set: found, brand, year: yr.year }
      }
    }
    return null
  }

  const allSets = brandData.flatMap(b => b.years.flatMap(y => y.sets))
  const totalSets = allSets.length
  const totalCards = allSets.reduce((s,c) => s + c.cards, 0)

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
        .page-header{background:#fff;border-bottom:1px solid #EFEFEF;padding:0 24px}
        .page-header-inner{max-width:1200px;margin:0 auto}
        .breadcrumb{display:flex;align-items:center;gap:6px;font-size:12px;color:#9A9A9A;padding:12px 0 0}
        .breadcrumb a{color:#9A9A9A;text-decoration:none}
        .breadcrumb a:hover{color:#1B6FF0}
        .sport-selector{display:flex;gap:4px;overflow-x:auto;padding-bottom:0;-webkit-overflow-scrolling:touch}
        .sport-selector::-webkit-scrollbar{display:none}
        .sport-tab{display:flex;align-items:center;gap:6px;padding:10px 16px;border-radius:6px 6px 0 0;font-size:13px;font-weight:600;cursor:pointer;border:1px solid transparent;border-bottom:none;color:#555;white-space:nowrap;transition:all .15s;background:transparent;position:relative;bottom:-1px;font-family:'Plus Jakarta Sans',sans-serif}
        .sport-tab:hover{color:#0D0D0D;background:#F7F7F7;border-color:#EFEFEF}
        .sport-tab.active{color:#1B6FF0;background:#fff;border-color:#EFEFEF;border-bottom-color:#fff}
        .main-layout{max-width:1200px;margin:0 auto;padding:24px;display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start}
        .sidebar{display:flex;flex-direction:column;gap:12px;position:sticky;top:78px}
        .sidebar-card{background:#fff;border:1px solid #EFEFEF;border-radius:20px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .sidebar-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;margin-bottom:10px}
        .brand-filter{background:#fff;border:1px solid #EFEFEF;border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06);margin-bottom:12px}
        .brand-search{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #EFEFEF}
        .brand-search input{border:none;outline:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:#0D0D0D;flex:1;background:transparent}
        .brand-search input::placeholder{color:#9A9A9A}
        .brand-item{display:flex;align-items:center;gap:10px;padding:9px 14px;cursor:pointer;transition:background .12s;border-bottom:1px solid #EFEFEF}
        .brand-item:last-child{border-bottom:none}
        .brand-item:hover{background:#F7F7F7}
        .brand-item.active{background:#EBF2FF}
        .brand-check{width:16px;height:16px;border-radius:4px;border:1.5px solid #D8D8D8;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:9px;color:white;transition:all .12s}
        .brand-item.active .brand-check{background:#1B6FF0;border-color:#1B6FF0}
        .brand-logo{width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;color:#fff}
        .brand-name{font-size:13px;font-weight:600;flex:1}
        .brand-count{font-size:11px;color:#9A9A9A}
        .filter-chips{display:flex;flex-wrap:wrap;gap:5px}
        .fchip{padding:5px 10px;background:#F7F7F7;border:1px solid #EFEFEF;border-radius:100px;font-size:12px;font-weight:600;color:#555;cursor:pointer;transition:all .12s;font-family:'Plus Jakarta Sans',sans-serif}
        .fchip:hover{border-color:#D8D8D8;color:#0D0D0D}
        .fchip.on{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .stats-bar{background:#fff;border:1px solid #EFEFEF;border-radius:14px;padding:12px 16px;display:flex;gap:0;margin-bottom:16px;overflow-x:auto}
        .stat-bar-item{display:flex;align-items:center;gap:10px;padding:0 20px;flex:1;min-width:100px;border-right:1px solid #D8D8D8}
        .stat-bar-item:first-child{padding-left:4px}
        .stat-bar-item:last-child{border-right:none}
        .stat-bar-val{font-size:16px;font-weight:800;color:#0D0D0D}
        .stat-bar-lbl{font-size:11px;color:#9A9A9A}
        .spotlight{background:#0D0D0D;border-radius:20px;padding:20px 24px;margin-bottom:16px;display:flex;align-items:center;gap:16px;position:relative;overflow:hidden}
        .spotlight::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 500px 300px at 85% 50%,rgba(27,111,240,.3),transparent);pointer-events:none}
        .spotlight-badge{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:10px 14px;flex-shrink:0;font-size:24px}
        .spotlight-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#7EB6FF;margin-bottom:3px}
        .spotlight-title{font-size:16px;font-weight:800;color:#fff;margin-bottom:3px}
        .spotlight-desc{font-size:12px;color:rgba(255,255,255,.5)}
        .spotlight-actions{display:flex;gap:8px;flex-shrink:0}
        .btn-spotlight{background:#fff;color:#0D0D0D;padding:7px 14px;border-radius:100px;font-size:13px;font-weight:700;cursor:pointer;border:none;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s}
        .btn-spotlight:hover{transform:translateY(-1px)}
        .btn-spotlight-outline{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.25);padding:7px 14px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s}
        .btn-spotlight-outline:hover{background:rgba(255,255,255,.18)}
        .toolbar{background:#fff;border:1px solid #EFEFEF;border-radius:20px;padding:10px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .search-box{flex:1;min-width:180px;display:flex;align-items:center;gap:8px;background:#F7F7F7;border:1.5px solid #EFEFEF;border-radius:100px;padding:7px 14px;transition:all .15s}
        .search-box:focus-within{border-color:#1B6FF0;background:#fff;box-shadow:0 0 0 3px rgba(27,111,240,.1)}
        .search-box input{border:none;outline:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:#0D0D0D;flex:1;background:transparent}
        .search-box input::placeholder{color:#9A9A9A}
        .sort-select{padding:7px 12px;border:1.5px solid #EFEFEF;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;color:#0D0D0D;background:#fff;cursor:pointer;outline:none}
        .sort-select:focus{border-color:#1B6FF0}
        .view-toggle{display:flex;gap:2px;background:#F7F7F7;border-radius:10px;padding:3px}
        .vbtn{padding:5px 8px;border-radius:7px;border:none;background:transparent;cursor:pointer;color:#9A9A9A;font-size:15px;transition:all .12s}
        .vbtn.on{background:#fff;color:#0D0D0D;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .results-label{font-size:12px;color:#9A9A9A;white-space:nowrap}
        .brand-section{margin-bottom:28px}
        .brand-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-bottom:12px;border-bottom:1.5px solid #EFEFEF}
        .brand-badge{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:900;color:#fff;flex-shrink:0;box-shadow:0 4px 16px rgba(0,0,0,.1)}
        .brand-section-name{font-size:18px;font-weight:800;letter-spacing:-.4px}
        .brand-section-meta{font-size:12px;color:#9A9A9A;margin-top:2px}
        .brand-view-all{font-size:13px;font-weight:600;color:#1B6FF0;text-decoration:none;cursor:pointer}
        .brand-view-all:hover{text-decoration:underline}
        .year-group{margin-bottom:16px}
        .year-group-label{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#555;margin-bottom:10px}
        .year-dot{width:6px;height:6px;border-radius:50%;background:#1B6FF0}
        .sets-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(176px,1fr));gap:12px}
        .set-card{background:#fff;border:1px solid #EFEFEF;border-radius:14px;overflow:hidden;cursor:pointer;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;flex-direction:column}
        .set-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.1);border-color:#D8D8D8}
        .set-card-banner{height:72px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
        .set-card-shine{position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15) 0%,transparent 60%)}
        .set-card-banner-text{position:relative;z-index:1;color:white;text-shadow:0 1px 4px rgba(0,0,0,.4);font-size:10px;font-weight:800;letter-spacing:.05em;text-align:center;padding:0 8px}
        .set-card-body{padding:10px 12px 8px;flex:1;display:flex;flex-direction:column}
        .set-card-year{font-size:10px;font-weight:700;color:#9A9A9A;margin-bottom:2px;text-transform:uppercase;letter-spacing:.06em}
        .set-card-name{font-size:13px;font-weight:700;color:#0D0D0D;line-height:1.25;margin-bottom:6px}
        .set-card-stats{display:flex;align-items:center;justify-content:space-between;margin-top:auto}
        .set-stat-val{font-size:13px;font-weight:800;color:#0D0D0D}
        .set-stat-lbl{font-size:10px;color:#9A9A9A}
        .set-card-tags{display:flex;gap:4px;flex-wrap:wrap;margin-top:6px}
        .set-tag{font-size:9px;font-weight:700;padding:2px 6px;border-radius:100px;letter-spacing:.04em;text-transform:uppercase}
        .set-progress{margin-top:6px}
        .set-progress-bar{height:3px;background:#EFEFEF;border-radius:10px;overflow:hidden}
        .set-progress-fill{height:100%;border-radius:10px;background:#1B6FF0}
        .set-progress-label{font-size:10px;color:#9A9A9A;margin-top:2px}
        .set-quick-add{display:flex;gap:4px;padding:0 10px 10px;opacity:0;transition:opacity .15s}
        .set-card:hover .set-quick-add{opacity:1}
        .set-quick-btn{flex:1;padding:5px 0;border-radius:6px;font-size:10px;font-weight:700;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .12s;text-align:center}
        .qb-have{background:#E6F9F0;color:#00A861}
        .qb-have:hover{background:#00A861;color:#fff}
        .qb-want{background:#EBF2FF;color:#1B6FF0}
        .qb-want:hover{background:#1B6FF0;color:#fff}
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:400;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
        .modal{background:#fff;border-radius:20px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.18)}
        .modal-banner{height:120px;display:flex;align-items:center;justify-content:center;font-size:48px;position:relative;border-radius:20px 20px 0 0;overflow:hidden}
        .modal-close{position:absolute;top:14px;right:14px;z-index:10;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.2);border:none;cursor:pointer;color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
        .modal-body{padding:20px 24px 28px}
        .modal-set-name{font-size:22px;font-weight:800;letter-spacing:-.5px;margin-bottom:4px}
        .modal-set-sub{font-size:13px;color:#9A9A9A;margin-bottom:16px}
        .modal-stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
        .modal-stat{background:#F7F7F7;border-radius:10px;padding:12px 14px;text-align:center}
        .modal-stat-val{font-size:20px;font-weight:800;color:#0D0D0D}
        .modal-stat-lbl{font-size:11px;color:#9A9A9A;margin-top:2px}
        .modal-section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9A9A9A;margin-bottom:8px;margin-top:14px}
        .parallel-list{display:flex;flex-wrap:wrap;gap:6px}
        .parallel-tag{padding:4px 10px;border-radius:100px;font-size:12px;font-weight:600;border:1px solid #EFEFEF;background:#F7F7F7;color:#555}
        .modal-actions{display:flex;gap:8px;margin-top:18px}
        .modal-actions .btn{flex:1;padding:10px;justify-content:center;border-radius:14px}
        .toast{position:fixed;bottom:24px;right:24px;z-index:999;background:#0D0D0D;color:#fff;border-radius:14px;padding:12px 18px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toastIn .3s cubic-bezier(.34,1.56,.64,1)}
        @keyframes toastIn{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}
        .empty-state{background:#fff;border:1.5px dashed #D8D8D8;border-radius:20px;padding:48px 24px;text-align:center}
        @media(max-width:900px){.main-layout{grid-template-columns:1fr}.sidebar{position:static}}
      `}</style>

      {/* NAV */}
<Nav />

      {/* MAIN LAYOUT */}
      <div className="main-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-card">
            <div className="sidebar-title">Year Range</div>
            <div className="filter-chips">
              {[
                {id:'vintage',label:'Vintage'},
                {id:'90s',label:'90s'},
                {id:'2000s',label:'2000s'},
                {id:'2010s',label:'2010s'},
                {id:'modern',label:'Modern'},
              ].map(y => (
                <button
                  key={y.id}
                  className={`fchip${activeYear===y.id?' on':''}`}
                  onClick={() => setActiveYear(y.id)}
                >{y.label}</button>
              ))}
            </div>
          </div>

          <div className="sidebar-card" style={{padding:0}}>
            <div style={{padding:'12px 14px 8px'}}>
              <div className="sidebar-title" style={{margin:0}}>Brand</div>
            </div>
            <div className="brand-search">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'#9A9A9A',width:'14px'}}/>
              <input type="text" placeholder="Search brands..."/>
            </div>
            <div>
              {brandData.map(b => (
                <div
                  key={b.id}
                  className={`brand-item${activeBrands.includes(b.id)?' active':''}`}
                  onClick={() => toggleBrand(b.id)}
                >
                  <div className="brand-check">{activeBrands.includes(b.id)?'✓':''}</div>
                  <div className="brand-logo" style={{background:b.color}}>{b.letter}</div>
                  <div className="brand-name">{b.name}</div>
                  <div className="brand-count">{b.years.reduce((s,y)=>s+y.sets.length,0)} sets</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-title">Card Type</div>
            <div className="filter-chips">
              {['Base','Rookie (RC)','Autograph','Relic / Patch','Numbered','Chrome','Refractor'].map(t => (
                <button key={t} className="fchip">{t}</button>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-title">Product Tier</div>
            <div className="filter-chips">
              {['All Tiers','💰 Budget','🥈 Mid-Range','💎 Premium','👑 Ultra Premium'].map((t,i) => (
                <button key={t} className={`fchip${i===2?' on':''}`}>{t}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main>

          {/* STATS BAR */}
          <div className="stats-bar">
            {[
  {icon:faLayerGroup, color:'#1B6FF0', val:'3.07M', lbl:'Football cards'},
  {icon:faFire, color:'#E8820C', val:totalSets.toString(), lbl:'Sets catalogued'},
  {icon:faFilter, color:'#7B4FCA', val:'3', lbl:'Active brands'},
  {icon:faStar, color:'#F5A623', val:'2025', lbl:'Latest year'},
].map(s => (
  <div className="stat-bar-item" key={s.lbl}>
    <FontAwesomeIcon icon={s.icon} style={{fontSize:'18px',color:s.color,width:'18px'}}/>
                <div>
                  <div className="stat-bar-val">{s.val}</div>
                  <div className="stat-bar-lbl">{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>

          {/* SPOTLIGHT */}
          <div className="spotlight">
            <div className="spotlight-badge">🔥</div>
            <div style={{flex:1}}>
              <div className="spotlight-label">🆕 Just Released</div>
              <div className="spotlight-title">2025 Panini Prizm Football</div>
              <div className="spotlight-desc">The most collected football set of the year. Silver Prizms, rookie autos, and 40+ parallels.</div>
            </div>
            <div className="spotlight-actions">
              <Link
  href="/search?q=2025+Panini+Prizm+Football"
  className="btn-spotlight"
  style={{textDecoration:'none'}}
>Search Cards</Link>
              <button className="btn-spotlight-outline" onClick={() => quickAdd('have','2025 Prizm')}>
  <FontAwesomeIcon icon={faPlus} style={{marginRight:'5px'}}/>Add to Vault
</button>
            </div>
          </div>

          {/* TOOLBAR */}
          <div className="toolbar">
            <div className="search-box">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'#9A9A9A',width:'14px'}}/>
              <input
                type="text"
                placeholder='Search sets...'
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
              />
            </div>
            <select
              className="sort-select"
              value={sortVal}
              onChange={e => setSortVal(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alpha">A–Z</option>
            </select>
            <div className="view-toggle">
              <button className={`vbtn${viewMode==='grid'?' on':''}`} onClick={() => setViewMode('grid')}>
  <FontAwesomeIcon icon={faGrip}/>
</button>
<button className={`vbtn${viewMode==='list'?' on':''}`} onClick={() => setViewMode('list')}>
  <FontAwesomeIcon icon={faBars}/>
</button>
            </div>
            <div className="results-label">
              Showing <strong>{filteredBrands.reduce((s,b)=>s+b.years.reduce((ss,y)=>ss+y.sets.filter(set=>!searchVal||set.name.toLowerCase().includes(searchVal.toLowerCase())).length,0),0)}</strong> sets
            </div>
          </div>

          {/* BRAND SECTIONS */}
          {filteredBrands.length === 0 ? (
            <div className="empty-state">
              <div style={{fontSize:'36px',marginBottom:'12px'}}>📦</div>
              <div style={{fontSize:'16px',fontWeight:700,marginBottom:'8px'}}>No brands selected</div>
              <div style={{fontSize:'14px',color:'#9A9A9A'}}>Select a brand from the sidebar to browse sets.</div>
            </div>
          ) : (
            filteredBrands.map(brand => (
              <div className="brand-section" key={brand.id}>
                <div className="brand-section-header">
                  <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                    <div className="brand-badge" style={{background:brand.color}}>{brand.letter}</div>
                    <div>
                      <div className="brand-section-name">{brand.name}</div>
                      <div className="brand-section-meta">{brand.meta}</div>
                    </div>
                  </div>
                  <a className="brand-view-all">
  View all {brand.name} <FontAwesomeIcon icon={faChevronRight} style={{fontSize:'11px',marginLeft:'2px'}}/>
</a>
                </div>

                {brand.years.map(yr => {
                  const filtered = yr.sets.filter(s =>
                    !searchVal || s.name.toLowerCase().includes(searchVal.toLowerCase())
                  )
                  if (filtered.length === 0) return null
                  return (
                    <div className="year-group" key={yr.year}>
                      <div className="year-group-label">
                        <span className="year-dot" style={{background: yr.year==='2025'?'#1B6FF0':yr.year==='2024'?'#9A9A9A':'#D8D8D8'}}></span>
                        {yr.year}
                      </div>
                      <div className="sets-grid">
                        {filtered.map((set,i) => (
                          <div
                            className="set-card"
                            key={set.id}
                            style={{animationDelay:`${i*0.04}s`}}
                            onClick={() => setSelectedModal(set.id)}
                          >
                            <div className="set-card-banner" style={{background:set.bg}}>
                              <div className="set-card-shine"></div>
                              <div className="set-card-banner-text">{set.name.split(' ')[0]}</div>
                            </div>
                            <div className="set-card-body">
                              <div className="set-card-year">{yr.year} · {brand.name.split(' ')[0]}</div>
                              <div className="set-card-name">{set.name}</div>
                              <div className="set-card-stats">
                                <div><div className="set-stat-val">{set.cards}</div><div className="set-stat-lbl">cards</div></div>
                                <div><div className="set-stat-val">{set.parallels}</div><div className="set-stat-lbl">parallels</div></div>
                                <div><div className="set-stat-val">⭐ {set.rating}</div><div className="set-stat-lbl">rating</div></div>
                              </div>
                              <div className="set-card-tags">
                                {set.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="set-tag"
                                    style={{
                                      background: tagColors[tag]?.bg || '#F7F7F7',
                                      color: tagColors[tag]?.color || '#555',
                                    }}
                                  >{tag}</span>
                                ))}
                              </div>
                              {set.pct > 0 && (
                                <div className="set-progress">
                                  <div className="set-progress-bar">
                                    <div className="set-progress-fill" style={{width:`${set.pct}%`,background:set.pct>70?'#00A861':'#1B6FF0'}}></div>
                                  </div>
                                  <div className="set-progress-label">{set.pct}% in your vault</div>
                                </div>
                              )}
                            </div>
                            <div className="set-quick-add">
  <Link
  href={`/search?q=${encodeURIComponent(set.name)}`}
  className="set-quick-btn qb-have"
  style={{textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:'4px'}}
  onClick={e => e.stopPropagation()}
>
  <FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize:'10px'}}/>Search
</Link>
<button
  className="set-quick-btn qb-want"
  onClick={e => { e.stopPropagation(); quickAdd('want', set.name) }}
>
  <FontAwesomeIcon icon={faStarRegular} style={{marginRight:'3px'}}/>Want
</button>
</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </main>
      </div>

      {/* SET DETAIL MODAL */}
      {selectedModal && (() => {
        const result = getModalSet()
        if (!result) return null
        const { set, brand, year } = result
        return (
          <div className="overlay" onClick={() => setSelectedModal(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-banner" style={{background:set.bg}}>
                <button className="modal-close" onClick={() => setSelectedModal(null)}>✕</button>
              </div>
              <div className="modal-body">
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'8px'}}>
                  {set.tags.map(tag => (
                    <span key={tag} className="set-tag" style={{background:tagColors[tag]?.bg||'#F7F7F7',color:tagColors[tag]?.color||'#555'}}>{tag}</span>
                  ))}
                </div>
                <div className="modal-set-name">{year} {set.name}</div>
                <div className="modal-set-sub">{brand.name} · {year} · NFL Licensed</div>
                <div className="modal-stats-row">
                  <div className="modal-stat"><div className="modal-stat-val">{set.cards}</div><div className="modal-stat-lbl">Total cards</div></div>
                  <div className="modal-stat"><div className="modal-stat-val">{set.parallels}</div><div className="modal-stat-lbl">Parallels</div></div>
                  <div className="modal-stat"><div className="modal-stat-val">⭐ {set.rating}</div><div className="modal-stat-lbl">Rating</div></div>
                </div>
                <div className="modal-section-title">Base Parallel Price</div>
                <div style={{fontSize:'28px',fontWeight:800,color:'#1B6FF0',letterSpacing:'-.5px'}}>{set.price}</div>
                <div style={{fontSize:'12px',color:'#9A9A9A',marginTop:'2px'}}>Avg recent sale · {set.parallel}</div>
                <div className="modal-section-title">Notable Parallels</div>
                <div className="parallel-list">
                  {['Silver','Blue /199','Green /99','Red /75','Purple /49','Orange /149','Gold /10','Black 1/1'].map(p => (
                    <span key={p} className="parallel-tag">{p}</span>
                  ))}
                </div>
                <div className="modal-actions">
  <Link
    href={`/search?q=${encodeURIComponent(set.name)}`}
    className="btn btn-outline"
    style={{flex:1,justifyContent:'center',textDecoration:'none',padding:'10px'}}
    onClick={() => setSelectedModal(null)}
  >🔍 Search Cards</Link>
  <button className="btn btn-primary" onClick={() => { quickAdd('have', set.name); setSelectedModal(null) }}>
  <FontAwesomeIcon icon={faPlus} style={{marginRight:'5px'}}/>Add to Vault
</button>
<button className="btn btn-outline" onClick={() => { toggleWishlist(set.id); setSelectedModal(null) }}>
  <FontAwesomeIcon icon={wishlisted.has(set.id) ? faStar : faStarRegular}/>
</button>
</div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* TOAST */}
      {toast && (
        <div className="toast">{toast}</div>
      )}
    </>
  )
}