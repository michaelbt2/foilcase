'use client'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '../lib/supabase'
import Nav from '../components/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass, faPlus, faPen, faTrash, faTag, faFolder, faFolderOpen,
  faLayerGroup, faBoxOpen, faMedal, faChartLine, faGrip, faBars, faXmark,
  faRotateLeft, faShield, faRightToBracket, faUserPlus, faFootball, faBaseball,
  faBasketball, faHockeyPuck, faFutbol, faGamepad, faCheck, faFlagCheckered, faChevronLeft, faChevronRight,
  faHandFist, faGolfBallTee, faPersonRunning, faChevronDown, faChevronUp, faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

const sportEmoji: Record<string,string> = {
  Football:'🏈', Baseball:'⚾', Basketball:'🏀',
  Hockey:'🏒', Soccer:'⚽', 'Gaming / TCG':'🎮', Gaming:'🎮'
}

interface Card {
  id:string; player:string; year:string; brand:string; set_name:string; sport:string;
  cardnum:string; folder_id:string; status:string; grader:string; grade:string;
  qty:number; condition:string; cost:number; value:number; attrs:string[];
  notes:string; created_at:string; img:string; user_id:string; card_image_url:string;
}
interface Folder { id:string; name:string; color:string; emoji:string; user_id:string }

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

const SPORTS = [
  {v:'all', l:'All Sports', icon:null},
  {v:'Football', l:'Football', icon:faFootball},
  {v:'Baseball', l:'Baseball', icon:faBaseball},
  {v:'Basketball', l:'Basketball', icon:faBasketball},
  {v:'Hockey', l:'Hockey', icon:faHockeyPuck},
  {v:'Soccer', l:'Soccer', icon:faFutbol},
  {v:'Gaming', l:'Gaming / TCG', icon:faGamepad},
  {v:'Wrestling', l:'Wrestling', icon:faHandFist},
  {v:'Racing', l:'Racing', icon:faFlagCheckered},
  {v:'Tennis', l:'Tennis', icon:faPersonRunning},
  {v:'UFC', l:'UFC / MMA', icon:faHandFist},
  {v:'Golf', l:'Golf', icon:faGolfBallTee},
  {v:'Boxing', l:'Boxing', icon:faHandFist},
]

export default function Collection() {
  const { user, isLoaded } = useUser()
  const [cards, setCards]               = useState<Card[]>([])
  const [folders, setFolders]           = useState<Folder[]>([])
  const [loading, setLoading]           = useState(true)
  const [activeFolder, setActiveFolder] = useState('all')
  const [filters, setFilters]           = useState({ sport:'all', grading:'all', status:'all', date:'all' })
  const [searchVal, setSearchVal]       = useState('')
  const [sortVal, setSortVal]           = useState('date-desc')
  const [viewMode, setViewMode]         = useState<'grid'|'list'>('grid')
  const [selected, setSelected]         = useState<Set<string>>(new Set())
  const [showAdd, setShowAdd]           = useState(false)
  const [showFolder, setShowFolder]     = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)
  const [editingId, setEditingId]       = useState<string|null>(null)
  const [removingId, setRemovingId]     = useState<string|null>(null)
  const [toast, setToast]               = useState<string|null>(null)
  const [selectedGrader, setSelectedGrader] = useState('Raw')
  const [selectedScore, setSelectedScore]   = useState('')
  const [selectedStatus, setSelectedStatus] = useState('have')
  const [newFolderName, setNewFolderName]   = useState('')
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['sport','grading','status','date'])
  const [selectedCard, setSelectedCard] = useState<Card|null>(null)
  const [form, setForm] = useState({
    player:'', year:'', brand:'', set_name:'', sport:'', cardnum:'',
    folder_id:'', qty:'1', condition:'', cost:'', value:'', notes:'', card_image_url:''
  })
  const [formAttrs, setFormAttrs] = useState<string[]>([])

const [currentPage, setCurrentPage] = useState(1)
const CARDS_PER_PAGE = 24

  const toggleFilterSection = (key: string) =>
    setExpandedFilters(prev => prev.includes(key) ? prev.filter(k=>k!==key) : [...prev,key])

 useEffect(() => {
  if (isLoaded && user) loadData()
}, [isLoaded, user?.id])

  const loadData = async () => {
    if (!user) return
    setLoading(true)
    const [{ data: cardsData }, { data: foldersData }] = await Promise.all([
      supabase.from('cards').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('folders').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
    ])
    setCards(cardsData || [])
    setFolders(foldersData || [])
    setLoading(false)
  }

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800) }

  const filtered = cards.filter(c => {
    if (searchVal && !['player','set_name','year','brand','cardnum'].some(k => String(c[k as keyof Card]).toLowerCase().includes(searchVal.toLowerCase()))) return false
    if (filters.sport !== 'all' && !c.sport.startsWith(filters.sport)) return false
    if (filters.grading === 'graded' && (!c.grader || c.grader === 'Raw')) return false
    if (filters.grading === 'raw' && c.grader && c.grader !== 'Raw') return false
    if (filters.status !== 'all' && c.status !== filters.status) return false
    if (filters.date !== 'all') {
      const cutoff = Date.now() - parseInt(filters.date)*86400000
      if (new Date(c.created_at).getTime() < cutoff) return false
    }
    if (activeFolder !== 'all' && c.folder_id !== activeFolder) return false
    return true
  }).sort((a,b) => {
    if (sortVal === 'date-desc') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    if (sortVal === 'date-asc')  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    if (sortVal === 'value-desc') return (b.value||0) - (a.value||0)
    if (sortVal === 'value-asc')  return (a.value||0) - (b.value||0)
    if (sortVal === 'alpha') return a.player.localeCompare(b.player)
    if (sortVal === 'gain') return ((b.value||0)-(b.cost||0)) - ((a.value||0)-(a.cost||0))
    return 0
  })
const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE)
const paginated = filtered.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE)
  const hasActiveFilters = filters.sport !== 'all' || filters.grading !== 'all' || filters.status !== 'all' || filters.date !== 'all'
  useEffect(() => {
  setCurrentPage(1)
}, [filters, searchVal, activeFolder, sortVal])
  const activecards = cards.filter(c => c.status !== 'sold')
  const totalCards  = activecards.reduce((s,c) => s+(c.qty||1), 0)
  const totalValue  = activecards.reduce((s,c) => s+(c.value||0)*(c.qty||1), 0)
  const totalCost   = activecards.reduce((s,c) => s+(c.cost||0)*(c.qty||1), 0)
  const totalGraded = activecards.filter(c => c.grader && c.grader !== 'Raw').length
  const totalSets   = new Set(activecards.map(c => c.set_name)).size
  const gain        = totalValue - totalCost
  const gainPct     = totalCost > 0 ? ((gain/totalCost)*100).toFixed(0) : '0'
  const folderCount = (fid: string) => cards.filter(c => c.folder_id === fid).reduce((s,c)=>s+(c.qty||1),0)

  const openAdd = () => {
    setEditingId(null)
    setForm({ player:'', year:'', brand:'', set_name:'', sport:'', cardnum:'', folder_id:'', qty:'1', condition:'', cost:'', value:'', notes:'', card_image_url:'' })
    setFormAttrs([])
    setSelectedGrader('Raw')
    setSelectedScore('')
    setSelectedStatus('have')
    setShowAdd(true)
  }

  const openEdit = (id: string) => {
    const c = cards.find(x => x.id === id)
    if (!c) return
    setEditingId(id)
    setForm({ player:c.player, year:c.year, brand:c.brand, set_name:c.set_name, sport:c.sport, cardnum:c.cardnum, folder_id:c.folder_id||'', qty:String(c.qty||1), condition:c.condition, cost:String(c.cost||''), value:String(c.value||''), notes:c.notes||'', card_image_url:c.card_image_url||'' })
    setFormAttrs(c.attrs||[])
    setSelectedGrader(c.grader||'Raw')
    setSelectedScore(c.grade||'')
    setSelectedStatus(c.status||'have')
    setShowAdd(true)
  }

  const saveCard = async () => {
    if (!user) return
    if (!form.player || !form.set_name || !form.sport) { showToast('⚠️ Player, Set, and Sport are required'); return }
    const card = {
      user_id: user.id,
      player:form.player, year:form.year, brand:form.brand, set_name:form.set_name,
      sport:form.sport, cardnum:form.cardnum, folder_id:form.folder_id||null,
      status:selectedStatus, grader:selectedGrader, grade:selectedScore,
      qty:parseInt(form.qty)||1, condition:form.condition,
      cost:parseFloat(form.cost)||0, value:parseFloat(form.value)||0,
      attrs:formAttrs, notes:form.notes,
      img: sportEmoji[form.sport]||'🃏',
      card_image_url: form.card_image_url || null,
    }
    if (editingId) {
      const { error } = await supabase.from('cards').update(card).eq('id', editingId)
      if (error) { showToast('❌ Error: ' + error.message); return }
      showToast('✏️ Card updated!')
    } else {
      const { error } = await supabase.from('cards').insert(card)
      if (error) { showToast('❌ Error: ' + error.message); return }
      showToast('✅ Card added to your vault!')
    }
    setShowAdd(false)
    loadData()
  }

  const markSold = async (id: string) => {
    const card = cards.find(c => c.id === id)
    if (!card) return
    const newStatus = card.status === 'sold' ? 'have' : 'sold'
    await supabase.from('cards').update({ status: newStatus }).eq('id', id)
    showToast(newStatus === 'sold' ? '💰 Marked as sold' : '↩ Moved back to vault')
    loadData()
  }

  const confirmRemove = async () => {
    if (!removingId) return
    await supabase.from('cards').delete().eq('id', removingId)
    setRemovingId(null)
    setShowConfirm(false)
    showToast('Card removed')
    loadData()
  }

  const createFolder = async () => {
    if (!user) return
    if (!newFolderName.trim()) { showToast('⚠️ Enter a folder name'); return }
    await supabase.from('folders').insert({
      user_id: user.id,
      name: newFolderName.trim(),
      color: 'blue',
      emoji: '📁'
    })
    setNewFolderName('')
    showToast(`📁 "${newFolderName}" created`)
    loadData()
  }

  const deleteFolder = async (id: string) => {
    await supabase.from('folders').delete().eq('id', id)
    await supabase.from('cards').update({ folder_id: null }).eq('folder_id', id)
    showToast('Folder removed')
    loadData()
  }

  const toggleAttr = (a: string) => setFormAttrs(prev => prev.includes(a)?prev.filter(x=>x!==a):[...prev,a])
  const toggleSelect = (id: string) => setSelected(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n })
  const gradeScores = (g: string) => g==='BGS'
    ? ['10','9.5','9','8.5','8','7.5','7','6.5','6','5','4']
    : ['10','9','8','7','6','5','4','3','2','1','A']

  const statusMap: Record<string,string> = { have:'status-have', trade:'status-trade', sold:'status-sold' }
  const statusLbl: Record<string,string> = { have:'Owned', trade:'Trade', sold:'Sold' }

  // Filter checkbox component to reduce repetition
  const FilterCheckbox = ({ value, label, icon, filterKey, count }: { value:string, label:string, icon?:any, filterKey:keyof typeof filters, count?:number }) => {
    const isActive = filters[filterKey] === value
    return (
      <label style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',fontSize:'13px',fontWeight:500,color:isActive?'#0D0D0D':'#555'}}>
        <div
          onClick={() => setFilters(prev => ({...prev, [filterKey]:value}))}
          style={{width:'18px',height:'18px',borderRadius:'4px',border:`2px solid ${isActive?'#1B6FF0':'#D8D8D8'}`,background:isActive?'#1B6FF0':'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,cursor:'pointer',transition:'all .15s'}}
        >
          {isActive && <FontAwesomeIcon icon={faCheck} style={{color:'#fff',fontSize:'9px'}}/>}
        </div>
        {icon && <FontAwesomeIcon icon={icon} style={{color:isActive?'#1B6FF0':'#9A9A9A',fontSize:'12px',width:'14px'}}/>}
        <span onClick={() => setFilters(prev => ({...prev, [filterKey]:value}))} style={{flex:1}}>{label}</span>
        {count !== undefined && <span style={{fontSize:'11px',color:'#9A9A9A',fontWeight:400}}>{count}</span>}
      </label>
    )
  }

  // Filter section header component
  const FilterHeader = ({ label, filterKey }: { label:string, filterKey:string }) => (
    <div
      onClick={() => toggleFilterSection(filterKey)}
      style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',color:'#9A9A9A',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer',marginBottom:expandedFilters.includes(filterKey)?'10px':'0'}}
    >
      {label}
      <FontAwesomeIcon icon={expandedFilters.includes(filterKey) ? faChevronUp : faChevronDown} style={{fontSize:'9px'}}/>
    </div>
  )

  if (!isLoaded) {
    return (
      <>
        <Nav />
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'16px',fontWeight:600,color:'#555'}}>Loading...</div>
          </div>
        </div>
      </>
    )
  }

  if (!user) {
    return (
      <>
        <Nav />
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'80vh',fontFamily:'Plus Jakarta Sans,sans-serif',background:'#F7F7F7'}}>
          <div style={{background:'#fff',border:'1px solid #EFEFEF',borderRadius:'16px',padding:'48px 40px',maxWidth:'440px',width:'100%',textAlign:'center',boxShadow:'0 4px 24px rgba(0,0,0,.06)'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',marginBottom:'32px'}}>
              <div style={{width:'32px',height:'32px',background:'#1B6FF0',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <FontAwesomeIcon icon={faLayerGroup} style={{color:'#fff',fontSize:'14px'}}/>
              </div>
              <span style={{fontSize:'18px',fontWeight:800,letterSpacing:'-.4px',color:'#0D0D0D'}}>FoilCase</span>
            </div>
            <div style={{width:'64px',height:'64px',background:'#EBF2FF',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
              <FontAwesomeIcon icon={faShield} style={{color:'#1B6FF0',fontSize:'28px'}}/>
            </div>
            <div style={{fontSize:'22px',fontWeight:800,letterSpacing:'-.5px',color:'#0D0D0D',marginBottom:'8px'}}>Your vault awaits</div>
            <div style={{fontSize:'14px',color:'#9A9A9A',lineHeight:1.6,marginBottom:'28px'}}>Sign in to access your personal card collection, track values, and manage your vault from any device.</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'28px',textAlign:'left'}}>
              {[
                {icon:faLayerGroup, color:'#1B6FF0', bg:'#EBF2FF', text:'Track your entire card collection in one place'},
                {icon:faChartLine, color:'#00A861', bg:'#E6F9F0', text:'Monitor real-time market values from eBay'},
                {icon:faMedal, color:'#7B4FCA', bg:'#F2ECFB', text:'Manage graded cards, folders, and wishlists'},
              ].map((item, i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 14px',background:'#F7F7F7',borderRadius:'8px'}}>
                  <div style={{width:'32px',height:'32px',background:item.bg,borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <FontAwesomeIcon icon={item.icon} style={{color:item.color,fontSize:'13px'}}/>
                  </div>
                  <div style={{fontSize:'13px',fontWeight:600,color:'#555'}}>{item.text}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <a href="/sign-in" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'12px 24px',borderRadius:'100px',background:'#1B6FF0',color:'#fff',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',fontWeight:700,textDecoration:'none'}}>
                <FontAwesomeIcon icon={faRightToBracket}/>Log in to your vault
              </a>
              <a href="/sign-up" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'12px 24px',borderRadius:'100px',background:'transparent',color:'#0D0D0D',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',fontWeight:600,textDecoration:'none',border:'1.5px solid #D8D8D8'}}>
                <FontAwesomeIcon icon={faUserPlus}/>Create a free account
              </a>
            </div>
            <div style={{fontSize:'12px',color:'#9A9A9A',marginTop:'20px'}}>Free to start · No credit card required</div>
          </div>
        </div>
      </>
    )
  }

  if (loading) {
    return (
      <>
        <Nav />
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'16px',fontWeight:600,color:'#555'}}>Loading your vault...</div>
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
        .page-header{background:#fff;border-bottom:1px solid #EFEFEF;padding:14px 0}
        .page-header-inner{max-width:1240px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:16px}
        .breadcrumb{display:flex;align-items:center;gap:6px;font-size:12px;color:#9A9A9A}
        .breadcrumb a{color:#9A9A9A;text-decoration:none}
        .breadcrumb a:hover{color:#1B6FF0}
        .app-layout{max-width:1240px;margin:0 auto;padding:24px;display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start}
        .sidebar{display:flex;flex-direction:column;gap:12px;position:sticky;top:78px;max-height:calc(100vh - 98px);overflow-y:auto}
        .sidebar-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .sidebar-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;margin-bottom:10px}
        .vault-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#1B6FF0,#7EB6FF);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#fff;flex-shrink:0}
        .folder-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;cursor:pointer;transition:all .12s;border:1px solid transparent}
        .folder-item:hover{background:#F7F7F7}
        .folder-item.active{background:#EBF2FF;border-color:#C5D8FF}
        .folder-name{font-size:13px;font-weight:500;flex:1}
        .folder-count{font-size:11px;color:#9A9A9A;background:#F7F7F7;padding:2px 7px;border-radius:100px;font-weight:600}
        .folder-item.active .folder-count{background:rgba(27,111,240,.15);color:#1B6FF0}
        .add-folder-btn{display:flex;align-items:center;gap:6px;padding:7px 10px;border-radius:6px;cursor:pointer;color:#1B6FF0;font-size:13px;font-weight:600;margin-top:4px;border:1.5px dashed #C5D8FF;background:transparent;font-family:'Plus Jakarta Sans',sans-serif;width:100%;transition:all .15s}
        .add-folder-btn:hover{background:#EBF2FF}
        .content{display:flex;flex-direction:column;gap:14px}
        .dash-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        .dash-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:18px 20px;box-shadow:0 1px 3px rgba(0,0,0,.06);transition:all .2s}
        .dash-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.07);transform:translateY(-1px)}
        .dash-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px;margin-bottom:10px}
        .dash-val{font-size:24px;font-weight:800;letter-spacing:-.5px;line-height:1}
        .dash-lbl{font-size:12px;color:#9A9A9A;margin-top:4px}
        .dash-delta{font-size:11px;font-weight:600;margin-top:6px}
        .delta-up{color:#00A861}
        .delta-dn{color:#D93025}
        .toolbar{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .search-box{flex:1;min-width:180px;display:flex;align-items:center;gap:8px;background:#F7F7F7;border:1.5px solid #EFEFEF;border-radius:100px;padding:7px 14px;transition:all .15s}
        .search-box:focus-within{border-color:#1B6FF0;background:#fff;box-shadow:0 0 0 3px rgba(27,111,240,.1)}
        .search-box input{border:none;outline:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:#0D0D0D;flex:1;background:transparent}
        .search-box input::placeholder{color:#9A9A9A}
        .sort-select{padding:7px 12px;border:1.5px solid #EFEFEF;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;color:#0D0D0D;background:#fff;cursor:pointer;outline:none}
        .view-toggle{display:flex;gap:2px;background:#F7F7F7;border-radius:8px;padding:3px}
        .vbtn{padding:5px 8px;border-radius:6px;border:none;background:transparent;cursor:pointer;color:#9A9A9A;font-size:15px;transition:all .12s}
        .vbtn.on{background:#fff;color:#0D0D0D;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .results-lbl{font-size:12px;color:#9A9A9A;white-space:nowrap}
        .bulk-bar{display:flex;align-items:center;gap:8px;padding:8px 14px;background:#EBF2FF;border-radius:100px;font-size:13px;font-weight:600;color:#1B6FF0}
        .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
        .cards-list{display:flex;flex-direction:column;gap:10px}
        .card-tile{background:#fff;border:1px solid #EFEFEF;border-radius:8px;overflow:hidden;cursor:pointer;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);position:relative;display:flex;flex-direction:column;animation:fadeUp .35s ease both}
        .card-tile:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.10);border-color:#D8D8D8}
        .card-tile.sold-card{opacity:.6}
        .card-tile.sel{border-color:#1B6FF0;box-shadow:0 0 0 2px #C5D8FF}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.card-cb{position:absolute;top:10px;left:10px;z-index:10;width:20px;height:20px;border-radius:4px;border:2px solid #D8D8D8;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;transition:all .15s;opacity:0;box-shadow:0 1px 3px rgba(0,0,0,.15)}        .card-tile:hover .card-cb,.card-tile.sel .card-cb{opacity:1}
        .card-tile.sel .card-cb{background:#1B6FF0;border-color:#1B6FF0}
        .card-status{position:absolute;top:10px;right:10px;z-index:10;font-size:9px;font-weight:700;padding:3px 7px;border-radius:100px;letter-spacing:.04em;text-transform:uppercase}
        .status-have{background:#E6F9F0;color:#00A861}
        .status-trade{background:#FEF3E2;color:#E8820C}
        .status-sold{background:#E5E5E5;color:#777}
        .card-img{aspect-ratio:2.5/3.5;width:100%;display:flex;align-items:center;justify-content:center;font-size:48px;position:relative;flex-shrink:0;overflow:hidden;background:#F7F7F7}
        .card-img img{width:100%;height:100%;object-fit:cover}
        .grade-chip{position:absolute;bottom:8px;left:8px;font-size:10px;font-weight:800;padding:3px 8px;border-radius:4px}
        .grade-PSA{background:#002FA7;color:#fff}
        .grade-BGS{background:#C41E3A;color:#fff}
        .grade-SGC{background:#1A6B2A;color:#fff}
        .card-body{padding:11px 13px 8px;flex:1;display:flex;flex-direction:column}
        .card-player{font-size:13px;font-weight:700;color:#0D0D0D;line-height:1.2;margin-bottom:2px}
        .card-set{font-size:11px;color:#9A9A9A;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .card-attrs{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px}
        .attr-tag{font-size:11px;font-weight:600;padding:3px 8px;border-radius:100px;background:#F0F0F0;color:#444;border:1px solid #E0E0E0}
        .card-fins{display:flex;justify-content:space-between;align-items:flex-end;margin-top:auto;padding-top:8px;border-top:1px solid #EFEFEF}
        .fin-lbl{font-size:9px;color:#9A9A9A;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
        .fin-val{font-size:13px;font-weight:800;color:#0D0D0D}
        .fin-pos{color:#00A861}
        .fin-neg{color:#D93025}
        .card-actions{display:flex;gap:4px;padding:0 13px 11px;opacity:0;transition:opacity .15s}
        .card-tile:hover .card-actions{opacity:1}
.act-btn{flex:1;padding:8px 4px;border-radius:6px;font-size:11px;font-weight:700;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .12s;text-align:center;display:flex;align-items:center;justify-content:center;gap:3px;white-space:nowrap}
.act-rm{background:#FDECEA;color:#D93025;flex:0 0 36px}
.act-rm:hover{background:#D93025;color:#fff}        .act-edit{background:#F7F7F7;color:#555}
        .act-edit:hover{background:#EFEFEF;color:#0D0D0D}
        .act-sold{background:#F7F7F7;color:#555}
        .act-sold:hover{background:#EFEFEF;color:#0D0D0D}
        .act-rm{background:#FDECEA;color:#D93025}
        .act-rm:hover{background:#D93025;color:#fff}
        .list-tile{background:#fff;border:1px solid #EFEFEF;border-radius:8px;overflow:hidden;display:flex;align-items:center;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);animation:fadeUp .35s ease both}
        .list-tile:hover{box-shadow:0 4px 16px rgba(0,0,0,.07);border-color:#D8D8D8}
        .list-tile.sold-card{opacity:.6}
        .list-img{width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;margin:8px 0 8px 12px;border-radius:6px;overflow:hidden}
        .list-main{flex:1;padding:10px 12px;min-width:0}
        .list-player{font-size:14px;font-weight:700;color:#0D0D0D}
        .list-set{font-size:12px;color:#9A9A9A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .list-meta{display:flex;align-items:center;gap:20px;padding:0 16px;flex-shrink:0}
        .lm-lbl{font-size:10px;color:#9A9A9A;font-weight:600;text-transform:uppercase}
        .lm-val{font-size:14px;font-weight:800}
        .list-acts{display:flex;gap:6px;padding:0 14px;opacity:0;transition:opacity .15s;flex-shrink:0}
        .list-tile:hover .list-acts{opacity:1}
        .empty-state{background:#fff;border:1.5px dashed #D8D8D8;border-radius:8px;padding:64px 24px;text-align:center}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 14px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .15s;border:none;white-space:nowrap}
        .btn-ghost{background:transparent;color:#555}
        .btn-ghost:hover{background:#F7F7F7;color:#0D0D0D}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF;transform:translateY(-1px)}
        .btn-outline{background:transparent;color:#0D0D0D;border:1.5px solid #D8D8D8}
        .btn-outline:hover{border-color:#0D0D0D}
        .btn-danger{background:#FDECEA;color:#D93025;border:1.5px solid #FFBBB7}
        .btn-danger:hover{background:#D93025;color:#fff}
        .btn-sm{padding:5px 11px;font-size:12px}
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:400;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
        .modal{background:#fff;border-radius:8px;width:100%;max-width:520px;max-height:92vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.18)}
        .modal-lg{max-width:660px}
        .modal-hdr{padding:20px 24px 16px;border-bottom:1px solid #EFEFEF;display:flex;align-items:center;justify-content:space-between}
        .modal-hdr-title{font-size:17px;font-weight:800;letter-spacing:-.3px}
        .modal-close{width:28px;height:28px;border-radius:50%;border:none;background:#F7F7F7;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;color:#555;transition:all .12s}
        .modal-close:hover{background:#EFEFEF;color:#0D0D0D}
        .modal-body{padding:20px 24px}
        .modal-footer{padding:16px 24px;border-top:1px solid #EFEFEF;display:flex;gap:8px;justify-content:flex-end}
        .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .form-group{display:flex;flex-direction:column;gap:5px}
        .form-group.full{grid-column:1/-1}
        .form-label{font-size:12px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.07em}
        .form-input,.form-select{width:100%;padding:9px 12px;border:1.5px solid #EFEFEF;border-radius:6px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:#0D0D0D;background:#fff;outline:none;transition:border-color .15s}
        .form-input:focus,.form-select:focus{border-color:#1B6FF0;box-shadow:0 0 0 3px rgba(27,111,240,.1)}
        .grader-row{display:flex;gap:6px}
        .grader-btn{flex:1;padding:7px 0;border-radius:6px;border:1.5px solid #EFEFEF;font-size:12px;font-weight:700;cursor:pointer;background:#fff;color:#555;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s;text-align:center}
        .g-Raw{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .g-PSA{background:#002FA7;color:#fff;border-color:#002FA7}
        .g-BGS{background:#C41E3A;color:#fff;border-color:#C41E3A}
        .g-SGC{background:#1A6B2A;color:#fff;border-color:#1A6B2A}
        .score-row{display:flex;flex-wrap:wrap;gap:4px}
        .score-btn{padding:4px 9px;border-radius:4px;border:1px solid #EFEFEF;font-size:11px;font-weight:700;cursor:pointer;background:#fff;color:#555;font-family:'Plus Jakarta Sans',sans-serif;transition:all .1s}
        .score-btn.sel{background:#1B6FF0;color:#fff;border-color:#1B6FF0}
        .status-sel{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
        .status-opt{padding:8px;border-radius:6px;border:1.5px solid #EFEFEF;font-size:12px;font-weight:600;cursor:pointer;text-align:center;transition:all .12s;background:#fff;font-family:'Plus Jakarta Sans',sans-serif}
        .s-have{background:#E6F9F0;color:#00A861;border-color:#A8DFC4}
        .s-trade{background:#FEF3E2;color:#E8820C;border-color:#F5C880}
        .s-sold{background:#FDECEA;color:#D93025;border-color:#FFBBB7}
        .fchip{padding:5px 10px;background:#F7F7F7;border:1px solid #EFEFEF;border-radius:100px;font-size:12px;font-weight:600;color:#555;cursor:pointer;transition:all .12s;font-family:'Plus Jakarta Sans',sans-serif}
        .fchip:hover{background:#EFEFEF;color:#0D0D0D}
        .fchip.on{background:#0D0D0D;color:#fff}
        .toast{position:fixed;bottom:24px;right:24px;z-index:999;background:#0D0D0D;color:#fff;border-radius:8px;padding:12px 18px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toastIn .3s cubic-bezier(.34,1.56,.64,1);max-width:320px}
        @keyframes toastIn{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}
        @media(max-width:960px){.app-layout{grid-template-columns:1fr}.sidebar{position:static}.dash-stats{grid-template-columns:1fr 1fr}}
      `}</style>

      <Nav />

      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <a href="/">Home</a><span>›</span>
            <strong style={{color:'#0D0D0D'}}>My Vault</strong>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button className="btn btn-sm" style={{background:'#F7F7F7',color:'#0D0D0D',border:'1.5px solid #D8D8D8',display:'inline-flex',alignItems:'center',gap:'6px'}} onClick={() => setShowFolder(true)}>
  <FontAwesomeIcon icon={faPlus} style={{color:'#9A9A9A'}}/>New Folder
</button>
<button className="btn btn-primary" onClick={openAdd}>
  <FontAwesomeIcon icon={faPlus}/>Add Card
</button>
          </div>
        </div>
      </div>

      <div className="app-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">

          {/* User info */}
          <div className="sidebar-card">
  <div style={{fontSize:'14px',fontWeight:700,marginBottom:'2px'}}>{user?.firstName ? `${user.firstName}'s Vault` : 'My Vault'}</div>
  <div style={{fontSize:'11px',color:'#9A9A9A'}}>{user?.emailAddresses?.[0]?.emailAddress}</div>
</div>

          {/* Folders */}
          <div className="sidebar-card">
            <div className="sidebar-title">Folders</div>
            <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
              <div className={`folder-item${activeFolder==='all'?' active':''}`} onClick={() => setActiveFolder('all')}>
                <FontAwesomeIcon icon={faFolderOpen} style={{width:'16px',color:activeFolder==='all'?'#1B6FF0':'#9A9A9A'}}/>
                <span className="folder-name">All Cards</span>
                <span className="folder-count">{cards.reduce((s,c)=>s+(c.qty||1),0)}</span>
              </div>
              {folders.map(f => (
                <div key={f.id} className={`folder-item${activeFolder===f.id?' active':''}`} onClick={() => setActiveFolder(f.id)}>
                  <FontAwesomeIcon icon={activeFolder===f.id ? faFolderOpen : faFolder} style={{width:'16px',color:activeFolder===f.id?'#1B6FF0':'#9A9A9A'}}/>
                  <span className="folder-name">{f.name}</span>
                  <span className="folder-count">{folderCount(f.id)}</span>
                </div>
              ))}
            </div>
            <button className="add-folder-btn" onClick={() => setShowFolder(true)}>
              <FontAwesomeIcon icon={faPlus}/>New Folder
            </button>
          </div>

          {/* Filters */}
          <div className="sidebar-card">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
              <div className="sidebar-title" style={{margin:0}}>Filters</div>
              {hasActiveFilters && (
                <button onClick={() => setFilters({sport:'all',grading:'all',status:'all',date:'all'})} style={{fontSize:'11px',fontWeight:600,color:'#1B6FF0',background:'none',border:'none',cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
                  Clear all
                </button>
              )}
            </div>

            {/* Sport */}
            <div style={{marginBottom:'4px',paddingBottom:'16px',borderBottom:'1px solid #EFEFEF'}}>
              <FilterHeader label="Sport" filterKey="sport"/>
              {expandedFilters.includes('sport') && (
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {SPORTS.map(o => (
                    <FilterCheckbox
                      key={o.v}
                      value={o.v}
                      label={o.l}
                      icon={o.icon}
                      filterKey="sport"
                      count={o.v === 'all' ? cards.length : cards.filter(c => c.sport.startsWith(o.v)).length}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Grading */}
            <div style={{marginBottom:'4px',paddingBottom:'16px',borderBottom:'1px solid #EFEFEF'}}>
              <FilterHeader label="Grading" filterKey="grading"/>
              {expandedFilters.includes('grading') && (
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  <FilterCheckbox value="all" label="All" filterKey="grading" count={cards.length}/>
                  <FilterCheckbox value="graded" label="Graded" filterKey="grading" count={cards.filter(c=>c.grader&&c.grader!=='Raw').length}/>
                  <FilterCheckbox value="raw" label="Raw" filterKey="grading" count={cards.filter(c=>!c.grader||c.grader==='Raw').length}/>
                </div>
              )}
            </div>

            {/* Status */}
            <div style={{marginBottom:'4px',paddingBottom:'16px',borderBottom:'1px solid #EFEFEF'}}>
              <FilterHeader label="Status" filterKey="status"/>
              {expandedFilters.includes('status') && (
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  <FilterCheckbox value="all" label="All" filterKey="status" count={cards.length}/>
                  <FilterCheckbox value="have" label="In Vault" filterKey="status" count={cards.filter(c=>c.status==='have').length}/>
                  <FilterCheckbox value="trade" label="For Trade" filterKey="status" count={cards.filter(c=>c.status==='trade').length}/>
                  <FilterCheckbox value="sold" label="Sold" filterKey="status" count={cards.filter(c=>c.status==='sold').length}/>
                </div>
              )}
            </div>

            {/* Date Added */}
            <div>
              <FilterHeader label="Date Added" filterKey="date"/>
              {expandedFilters.includes('date') && (
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  <FilterCheckbox value="all" label="All Time" filterKey="date"/>
                  <FilterCheckbox value="7" label="Last 7 days" filterKey="date"/>
                  <FilterCheckbox value="30" label="Last 30 days" filterKey="date"/>
                  <FilterCheckbox value="90" label="Last 90 days" filterKey="date"/>
                  <FilterCheckbox value="365" label="This year" filterKey="date"/>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="content">

          {/* DASH STATS */}
          <div className="dash-stats">
            <div className="dash-card">
              <div className="dash-icon" style={{background:'#EBF2FF'}}><FontAwesomeIcon icon={faLayerGroup} style={{color:'#1B6FF0'}}/></div>
              <div className="dash-val">{totalCards}</div>
              <div className="dash-lbl">Total Cards</div>
              <div className="dash-delta delta-up">↑ {cards.filter(c=>{const d=new Date(c.created_at).getTime();return Date.now()-d<30*86400000}).length} this month</div>
            </div>
            <div className="dash-card">
              <div className="dash-icon" style={{background:'#E6F9F0'}}><FontAwesomeIcon icon={faChartLine} style={{color:'#00A861'}}/></div>
              <div className="dash-val" style={{color:'#00A861'}}>${fmtNum(totalValue)}</div>
              <div className="dash-lbl">Est. Collection Value</div>
              <div className={`dash-delta ${gain>=0?'delta-up':'delta-dn'}`}>{gain>=0?'+':'-'}${fmtNum(Math.abs(gain))} ({gain>=0?'+':''}{gainPct}%)</div>
            </div>
            <div className="dash-card">
              <div className="dash-icon" style={{background:'#F2ECFB'}}><FontAwesomeIcon icon={faMedal} style={{color:'#7B4FCA'}}/></div>
              <div className="dash-val">{totalGraded}</div>
              <div className="dash-lbl">Graded Cards</div>
              <div className="dash-delta" style={{color:'#9A9A9A'}}>{totalCards>0?Math.round((totalGraded/totalCards)*100):0}% of total</div>
            </div>
            <div className="dash-card">
              <div className="dash-icon" style={{background:'#FEF3E2'}}><FontAwesomeIcon icon={faBoxOpen} style={{color:'#E8820C'}}/></div>
              <div className="dash-val">{totalSets}</div>
              <div className="dash-lbl">Unique Sets</div>
              <div className="dash-delta" style={{color:'#9A9A9A'}}>{new Set(activecards.map(c=>c.brand).filter(Boolean)).size} brands</div>
            </div>
          </div>

          {/* TOOLBAR */}
          <div className="toolbar">
            <div className="search-box">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'#9A9A9A',width:'14px'}}/>
              <input type="text" placeholder="Search your vault..." value={searchVal} onChange={e=>setSearchVal(e.target.value)}/>
            </div>
            <select className="sort-select" value={sortVal} onChange={e=>setSortVal(e.target.value)}>
              <option value="date-desc">Newest Added</option>
              <option value="date-asc">Oldest Added</option>
              <option value="value-desc">Highest Value</option>
              <option value="value-asc">Lowest Value</option>
              <option value="alpha">A–Z Player</option>
              <option value="gain">Best Gain</option>
            </select>
            <div className="view-toggle">
              <button className={`vbtn${viewMode==='grid'?' on':''}`} onClick={()=>setViewMode('grid')}><FontAwesomeIcon icon={faGrip}/></button>
              <button className={`vbtn${viewMode==='list'?' on':''}`} onClick={()=>setViewMode('list')}><FontAwesomeIcon icon={faBars}/></button>
            </div>
            {selected.size > 0 && (
              <div className="bulk-bar">
                {selected.size} selected
                <button className="btn btn-sm" style={{background:'#F7F7F7',color:'#555',border:'1px solid #EFEFEF'}} onClick={async()=>{await Promise.all([...selected].map(id=>markSold(id)));setSelected(new Set())}}>
                  <FontAwesomeIcon icon={faTag}/>Mark Sold
                </button>
                <button className="btn btn-sm btn-danger" onClick={async()=>{await Promise.all([...selected].map(id=>supabase.from('cards').delete().eq('id',id)));setSelected(new Set());showToast(`${selected.size} cards removed`);loadData()}}>
                  <FontAwesomeIcon icon={faTrash}/>Remove
                </button>
                <button className="btn btn-sm btn-ghost" onClick={()=>setSelected(new Set())}>
                  <FontAwesomeIcon icon={faXmark}/>
                </button>
              </div>
            )}
          </div>

          {/* CARDS */}
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div style={{fontSize:'48px',marginBottom:'16px',color:'#D8D8D8'}}>
                <FontAwesomeIcon icon={faFolderOpen}/>
              </div>
              <div style={{fontSize:'18px',fontWeight:700,marginBottom:'8px'}}>{cards.length === 0 ? 'Your vault is empty' : 'No cards found'}</div>
              <div style={{fontSize:'14px',color:'#9A9A9A',marginBottom:'24px'}}>{cards.length === 0 ? 'Start building your collection by adding your first card.' : 'Try adjusting your filters.'}</div>
              <button className="btn btn-primary" onClick={openAdd}>+ Add Your First Card</button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="cards-grid">
              {paginated.map((c,i) => {
                const gain = (c.value||0)-(c.cost||0)
                const isSold = c.status==='sold'
                const isSel = selected.has(c.id)
                return (
                  <div key={c.id} className={`card-tile${isSold?' sold-card':''}${isSel?' sel':''}`} style={{animationDelay:`${i*.03}s`}} onClick={() => setSelectedCard(c)}>
                    <div className="card-cb" onClick={e=>{e.stopPropagation();toggleSelect(c.id)}}>{isSel?'✓':''}</div>
                    <div className={`card-status ${statusMap[c.status]||'status-have'}`}>{statusLbl[c.status]||'Owned'}</div>
                    <div className="card-img" style={{background:c.card_image_url?'#000':cardBg(c.sport)}}>
                      {c.card_image_url
                        ? <img src={c.card_image_url} alt={c.player} onError={e=>{(e.target as HTMLImageElement).style.display='none'}}/>
                        : <span style={{fontSize:'48px'}}>{sportEmoji[c.sport]||'🃏'}</span>
                      }
                      {c.grader && c.grader!=='Raw' && <div className={`grade-chip grade-${c.grader}`}>{c.grader} {c.grade}</div>}
                    </div>
                    <div className="card-body">
                      <div className="card-player">{c.player}</div>
                      <div className="card-set">
                        {[c.year, c.brand!=='Unknown'?c.brand:'', c.set_name!=='Unknown'?c.set_name:''].filter(Boolean).join(' ')}
                        {c.cardnum?` · ${c.cardnum}`:''}
                      </div>
                      <div className="card-attrs">
                        {(c.attrs||[]).map(a => <span key={a} className="attr-tag">{attrLabel(a)}</span>)}
                      </div>
                      <div className="card-fins">
                        <div><div className="fin-lbl">Cost</div><div className="fin-val">{c.cost?`$${c.cost}`:'-'}</div></div>
                        <div style={{textAlign:'center'}}><div className="fin-lbl">Value</div><div className="fin-val" style={{color:'#1B6FF0'}}>{c.value?`$${c.value}`:'-'}</div></div>
                        <div style={{textAlign:'right'}}><div className="fin-lbl">Gain</div><div className={`fin-val ${gain>=0?'fin-pos':'fin-neg'}`}>{c.cost?(gain>=0?'+':'')+`$${Math.abs(gain)}`:'-'}</div></div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button className="act-btn act-edit" onClick={e=>{e.stopPropagation();openEdit(c.id)}}><FontAwesomeIcon icon={faPen}/>Edit</button>
                      <button className="act-btn act-sold" onClick={e=>{e.stopPropagation();markSold(c.id)}}><FontAwesomeIcon icon={isSold?faRotateLeft:faTag}/>{isSold?'Mark Owned':'Mark Sold'}</button>
                      <button className="act-btn act-rm" onClick={e=>{e.stopPropagation();setRemovingId(c.id);setShowConfirm(true)}}><FontAwesomeIcon icon={faTrash}/></button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="cards-list">
              {paginated.map((c,i) => {
                const gain = (c.value||0)-(c.cost||0)
                const isSold = c.status==='sold'
                const isSel = selected.has(c.id)
                return (
                  <div key={c.id} className={`list-tile${isSold?' sold-card':''}${isSel?' sel':''}`} style={{animationDelay:`${i*.025}s`}} onClick={() => setSelectedCard(c)}>
                    <div style={{padding:'0 0 0 12px',cursor:'pointer'}} onClick={e=>{e.stopPropagation();toggleSelect(c.id)}}>
  <div className="card-cb" style={{position:'relative',top:0,left:0,opacity:1,width:18,height:18,fontSize:10,background:isSel?'#1B6FF0':'#fff',borderColor:isSel?'#1B6FF0':'#D8D8D8'}}>{isSel?'✓':''}</div>
</div>
                    <div className="list-img" style={{background:c.card_image_url?'#000':cardBg(c.sport)}}>
                      {c.card_image_url
                        ? <img src={c.card_image_url} alt={c.player} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e=>{(e.target as HTMLImageElement).style.display='none'}}/>
                        : <span>{sportEmoji[c.sport]||'🃏'}</span>
                      }
                    </div>
                    <div className="list-main">
                      <div className="list-player">{c.player}</div>
                      <div className="list-set">
                        {[c.year, c.brand!=='Unknown'?c.brand:'', c.set_name!=='Unknown'?c.set_name:''].filter(Boolean).join(' ')}
                        {c.cardnum?` · ${c.cardnum}`:''}
                      </div>
                      <div className="card-attrs" style={{marginTop:'4px'}}>
                        {(c.attrs||[]).map(a => <span key={a} className="attr-tag">{attrLabel(a)}</span>)}
                      </div>
                    </div>
                    <div className="list-meta">
  <div><div className="lm-lbl">Grade</div><div className="lm-val" style={{fontSize:'12px'}}>{c.grader&&c.grader!=='Raw'?`${c.grader} ${c.grade}`:'Raw'}</div></div>
  <div><div className="lm-lbl">Cost</div><div className="lm-val">{c.cost?`$${c.cost}`:'-'}</div></div>
  <div><div className="lm-lbl">Value</div><div className="lm-val" style={{color:'#1B6FF0'}}>{c.value?`$${c.value}`:'-'}</div></div>
  <div><div className="lm-lbl">Gain</div><div className={`lm-val ${gain>=0?'fin-pos':'fin-neg'}`}>{c.cost?(gain>=0?'+':'')+`$${Math.abs(gain)}`:'-'}</div></div>
</div>
                    <div className="list-acts">
  <button className="act-btn act-edit" style={{flex:'none',padding:'6px 10px'}} onClick={e=>{e.stopPropagation();openEdit(c.id)}}><FontAwesomeIcon icon={faPen}/>Edit</button>
  <button className="act-btn act-sold" style={{flex:'none',padding:'6px 10px'}} onClick={e=>{e.stopPropagation();markSold(c.id)}}>
    <FontAwesomeIcon icon={isSold?faRotateLeft:faTag}/>{isSold?'Mark Owned':'Mark Sold'}
  </button>
  <button className="act-btn act-rm" style={{flex:'none',padding:'6px 10px'}} onClick={e=>{e.stopPropagation();setRemovingId(c.id);setShowConfirm(true)}}><FontAwesomeIcon icon={faTrash}/></button>
</div>
                  </div>
                )
              })}
            </div>
          )}
          {/* PAGINATION */}
{totalPages > 1 && (
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 0',borderTop:'1px solid #EFEFEF',marginTop:'8px'}}>
    <div style={{fontSize:'13px',color:'#9A9A9A'}}>
      Showing <strong style={{color:'#0D0D0D'}}>{((currentPage-1)*CARDS_PER_PAGE)+1}–{Math.min(currentPage*CARDS_PER_PAGE, filtered.length)}</strong> of <strong style={{color:'#0D0D0D'}}>{filtered.length}</strong> cards
    </div>
    <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
      <button
        onClick={() => setCurrentPage(p => Math.max(1, p-1))}
        disabled={currentPage === 1}
        style={{width:'32px',height:'32px',borderRadius:'6px',border:'1.5px solid #EFEFEF',background:currentPage===1?'#F7F7F7':'#fff',color:currentPage===1?'#D8D8D8':'#0D0D0D',cursor:currentPage===1?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'13px',fontWeight:600,transition:'all .15s'}}
      >
        <FontAwesomeIcon icon={faChevronLeft}/>
      </button>
      {Array.from({length:totalPages},(_,i)=>i+1).filter(p => p===1 || p===totalPages || Math.abs(p-currentPage)<=1).reduce((acc:number[],p,i,arr)=>{
        if(i>0 && p-arr[i-1]>1) acc.push(-1)
        acc.push(p)
        return acc
      },[] as number[]).map((p,i) => p===-1 ? (
        <span key={`ellipsis-${i}`} style={{width:'32px',height:'32px',display:'flex',alignItems:'center',justifyContent:'center',color:'#9A9A9A',fontSize:'13px'}}>...</span>
      ) : (
        <button
          key={p}
          onClick={() => setCurrentPage(p)}
          style={{width:'32px',height:'32px',borderRadius:'6px',border:`1.5px solid ${currentPage===p?'#1B6FF0':'#EFEFEF'}`,background:currentPage===p?'#1B6FF0':'#fff',color:currentPage===p?'#fff':'#0D0D0D',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'13px',fontWeight:600,transition:'all .15s'}}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
        disabled={currentPage === totalPages}
        style={{width:'32px',height:'32px',borderRadius:'6px',border:'1.5px solid #EFEFEF',background:currentPage===totalPages?'#F7F7F7':'#fff',color:currentPage===totalPages?'#D8D8D8':'#0D0D0D',cursor:currentPage===totalPages?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'13px',fontWeight:600,transition:'all .15s'}}
      >
        <FontAwesomeIcon icon={faChevronRight}/>
      </button>
    </div>
  </div>
)}
        </main>
      </div>

      {/* ADD / EDIT MODAL */}
      {showAdd && (
        <div className="overlay" onClick={()=>setShowAdd(false)}>
          <div className="modal modal-lg" onClick={e=>e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-hdr-title">{editingId?'Edit Card':'Add Card to Vault'}</div>
              <button className="modal-close" onClick={()=>setShowAdd(false)}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
  {/* Required fields first */}
  <div className="form-group">
    <label className="form-label">Player / Subject <span style={{color:'#D93025'}}>*</span></label>
    <input className="form-input" placeholder="e.g. Patrick Mahomes" value={form.player} onChange={e=>setForm(p=>({...p,player:e.target.value}))}/>
  </div>
  <div className="form-group">
    <label className="form-label">Set Name <span style={{color:'#D93025'}}>*</span></label>
    <input className="form-input" placeholder="e.g. Prizm Football" value={form.set_name} onChange={e=>setForm(p=>({...p,set_name:e.target.value}))}/>
  </div>
  <div className="form-group">
    <label className="form-label">Sport / Category <span style={{color:'#D93025'}}>*</span></label>
    <select className="form-select" value={form.sport} onChange={e=>setForm(p=>({...p,sport:e.target.value}))}>
      <option value="">Select...</option>
      {['Football','Baseball','Basketball','Hockey','Soccer','Gaming / TCG','Wrestling','Racing','Tennis','UFC','Golf','Boxing','Non-Sport','Other'].map(s=><option key={s}>{s}</option>)}
    </select>
  </div>
  <div className="form-group">
    <label className="form-label">Year</label>
    <input className="form-input" type="number" placeholder="2024" value={form.year} onChange={e=>setForm(p=>({...p,year:e.target.value}))}/>
  </div>

  {/* Optional fields */}
  <div className="form-group">
    <label className="form-label">Brand</label>
    <select className="form-select" value={form.brand} onChange={e=>setForm(p=>({...p,brand:e.target.value}))}>
      <option value="">Select...</option>
      {['Panini','Topps','Bowman','Upper Deck','Leaf','SAGE','Donruss','Fleer','Score','Other'].map(b=><option key={b}>{b}</option>)}
    </select>
  </div>
  <div className="form-group">
    <label className="form-label">Card Number</label>
    <input className="form-input" placeholder="e.g. #200 or /99" value={form.cardnum} onChange={e=>setForm(p=>({...p,cardnum:e.target.value}))}/>
  </div>
  <div className="form-group">
    <label className="form-label">Folder</label>
    <select className="form-select" value={form.folder_id} onChange={e=>setForm(p=>({...p,folder_id:e.target.value}))}>
      <option value="">No folder</option>
      {folders.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}
    </select>
  </div>
  <div className="form-group">
    <label className="form-label">Quantity</label>
    <input className="form-input" type="number" min="1" value={form.qty} onChange={e=>setForm(p=>({...p,qty:e.target.value}))}/>
  </div>

  {/* Status */}
  <div className="form-group full">
    <label className="form-label">Status</label>
    <div className="status-sel">
      {[
        {v:'have', l:'In My Vault', icon:faLayerGroup, color:'#00A861', bg:'#E6F9F0', border:'#A8DFC4'},
        {v:'trade', l:'For Trade', icon:faArrowRightArrowLeft, color:'#E8820C', bg:'#FEF3E2', border:'#F5C880'},
        {v:'sold', l:'Sold', icon:faTag, color:'#D93025', bg:'#FDECEA', border:'#FFBBB7'},
      ].map(s=>(
        <button
          key={s.v}
          onClick={()=>setSelectedStatus(s.v)}
          style={{
            padding:'10px',
            borderRadius:'6px',
            border:`1.5px solid ${selectedStatus===s.v?s.border:'#EFEFEF'}`,
            background:selectedStatus===s.v?s.bg:'#fff',
            color:selectedStatus===s.v?s.color:'#555',
            fontFamily:'Plus Jakarta Sans,sans-serif',
            fontSize:'12px',
            fontWeight:600,
            cursor:'pointer',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            gap:'6px',
            transition:'all .15s',
          }}
        >
          <FontAwesomeIcon icon={s.icon} style={{fontSize:'12px'}}/>
          {s.l}
        </button>
      ))}
    </div>
  </div>

  {/* Grading */}
  <div className="form-group full">
    <label className="form-label">Grading</label>
    <div className="grader-row">
      {['Raw','PSA','BGS','SGC'].map(g=>(
        <button key={g} className={`grader-btn${selectedGrader===g?' g-'+g:''}`} onClick={()=>{setSelectedGrader(g);setSelectedScore('')}}>{g==='Raw'?'Ungraded':g}</button>
      ))}
    </div>
  </div>
  {selectedGrader !== 'Raw' && (
    <div className="form-group full">
      <label className="form-label">Grade Score</label>
      <div className="score-row">
        {gradeScores(selectedGrader).map(s=>(
          <button key={s} className={`score-btn${selectedScore===s?' sel':''}`} onClick={()=>setSelectedScore(s)}>{s}</button>
        ))}
      </div>
    </div>
  )}

  <div className="form-group">
    <label className="form-label">Condition</label>
    <select className="form-select" value={form.condition} onChange={e=>setForm(p=>({...p,condition:e.target.value}))}>
      <option value="">Select...</option>
      {['Mint (M)','Near Mint-Mint (NM-MT)','Near Mint (NM)','Excellent-Mint (EX-MT)','Excellent (EX)','Very Good (VG)','Good (G)'].map(c=><option key={c}>{c}</option>)}
    </select>
  </div>
  <div className="form-group">
    <label className="form-label">Cost Paid ($)</label>
    <input className="form-input" type="number" placeholder="0.00" value={form.cost} onChange={e=>setForm(p=>({...p,cost:e.target.value}))}/>
  </div>
  <div className="form-group">
    <label className="form-label">Current Value ($)</label>
    <input className="form-input" type="number" placeholder="0.00" value={form.value} onChange={e=>setForm(p=>({...p,value:e.target.value}))}/>
  </div>
  <div className="form-group full">
    <label className="form-label">Card Attributes</label>
    <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
      {[{v:'rc',l:'Rookie (RC)'},{v:'auto',l:'Autograph'},{v:'patch',l:'Patch/Relic'},{v:'numbered',l:'Numbered'},{v:'chrome',l:'Chrome'},{v:'refractor',l:'Refractor'},{v:'shortprint',l:'Short Print'},{v:'1of1',l:'1 of 1'}].map(a=>(
        <button key={a.v} className={`fchip${formAttrs.includes(a.v)?' on':''}`} onClick={()=>toggleAttr(a.v)}>{a.l}</button>
      ))}
    </div>
  </div>
  <div className="form-group full">
    <label className="form-label">Card Image URL</label>
    <input className="form-input" placeholder="Paste an image URL from eBay, COMC, or any image host..." value={form.card_image_url} onChange={e=>setForm(p=>({...p,card_image_url:e.target.value}))}/>
    {form.card_image_url && (
      <div style={{marginTop:'8px',display:'flex',alignItems:'flex-start',gap:'12px'}}>
        <img src={form.card_image_url} alt="Card preview" style={{width:'60px',height:'84px',objectFit:'cover',borderRadius:'6px',border:'1px solid #EFEFEF'}} onError={e=>{(e.target as HTMLImageElement).style.display='none'}}/>
        <div style={{fontSize:'12px',color:'#9A9A9A',lineHeight:1.5,paddingTop:'4px'}}>Preview above. If the image doesn't appear the URL may not be publicly accessible.</div>
      </div>
    )}
  </div>
  <div className="form-group full">
    <label className="form-label">Notes</label>
    <textarea className="form-input" style={{minHeight:'64px',resize:'vertical'}} placeholder="Serial number, purchase story, condition notes..." value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))}/>
  </div>
</div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveCard}>Save to Vault</button>
            </div>
          </div>
        </div>
      )}

      {/* FOLDER MODAL */}
      {showFolder && (
        <div className="overlay" onClick={()=>setShowFolder(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-hdr-title">Manage Folders</div>
              <button className="modal-close" onClick={()=>setShowFolder(false)}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
            <div className="modal-body">
              <div className="form-group" style={{marginBottom:'16px'}}>
                <label className="form-label">New Folder Name</label>
                <div style={{display:'flex',gap:'8px'}}>
                  <input className="form-input" style={{flex:1}} placeholder="e.g. PC Cards" value={newFolderName} onChange={e=>setNewFolderName(e.target.value)}/>
                  <button className="btn btn-primary" onClick={createFolder}>Create</button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" style={{marginBottom:'8px'}}>Your Folders</label>
                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  {folders.length === 0 ? (
                    <div style={{fontSize:'13px',color:'#9A9A9A',padding:'8px 0'}}>No folders yet — create one above.</div>
                  ) : folders.map(f => (
                    <div key={f.id} style={{display:'flex',alignItems:'center',gap:'10px',padding:'8px 10px',border:'1px solid #EFEFEF',borderRadius:'6px'}}>
                      <FontAwesomeIcon icon={faFolder} style={{color:'#9A9A9A',width:'14px'}}/>
                      <span style={{flex:1,fontSize:'13px',fontWeight:600}}>{f.name}</span>
                      <span style={{fontSize:'11px',color:'#9A9A9A'}}>{folderCount(f.id)} cards</span>
                      <button className="btn btn-sm btn-danger" onClick={()=>deleteFolder(f.id)}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={()=>setShowFolder(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM REMOVE */}
      {showConfirm && (
        <div className="overlay" onClick={()=>setShowConfirm(false)}>
          <div className="modal" style={{maxWidth:'360px'}} onClick={e=>e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-hdr-title">Remove Card</div>
              <button className="modal-close" onClick={()=>setShowConfirm(false)}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
            <div className="modal-body" style={{textAlign:'center'}}>
              <div style={{fontSize:'40px',marginBottom:'12px',color:'#D93025'}}><FontAwesomeIcon icon={faTrash}/></div>
              <div style={{fontSize:'14px',color:'#555',marginBottom:'6px'}}>Are you sure you want to remove</div>
              <div style={{fontSize:'15px',fontWeight:700,marginBottom:'16px'}}>{cards.find(c=>c.id===removingId)?.player || 'this card'}?</div>
              <div style={{fontSize:'12px',color:'#D93025'}}>This action cannot be undone.</div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={()=>setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmRemove}>Remove Card</button>
            </div>
          </div>
        </div>
      )}

      {/* CARD DETAIL MODAL */}
      {selectedCard && (
        <div className="overlay" onClick={() => setSelectedCard(null)}>
          <div className="modal modal-lg" style={{maxWidth:'700px'}} onClick={e => e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-hdr-title">{selectedCard.player}</div>
              <button className="modal-close" onClick={() => setSelectedCard(null)}>
                <FontAwesomeIcon icon={faXmark}/>
              </button>
            </div>
            <div className="modal-body">
              <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:'24px'}}>
                <div style={{aspectRatio:'2.5/3.5',borderRadius:'8px',overflow:'hidden',background:selectedCard.card_image_url?'#000':cardBg(selectedCard.sport),display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {selectedCard.card_image_url
                    ? <img src={selectedCard.card_image_url} alt={selectedCard.player} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    : <span style={{fontSize:'64px'}}>{sportEmoji[selectedCard.sport]||'🃏'}</span>
                  }
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                  <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                    <span className={`card-status ${statusMap[selectedCard.status]||'status-have'}`} style={{position:'static',fontSize:'11px'}}>
                      {statusLbl[selectedCard.status]||'Owned'}
                    </span>
                    {selectedCard.grader && selectedCard.grader !== 'Raw' && (
                      <span className={`grade-chip grade-${selectedCard.grader}`} style={{position:'static',fontSize:'11px'}}>
                        {selectedCard.grader} {selectedCard.grade}
                      </span>
                    )}
                  </div>
                  <div>
                    <div style={{fontSize:'22px',fontWeight:800,letterSpacing:'-.5px',color:'#0D0D0D',marginBottom:'4px'}}>{selectedCard.player}</div>
                    <div style={{fontSize:'14px',color:'#9A9A9A'}}>
                      {[selectedCard.year, selectedCard.brand, selectedCard.set_name].filter(Boolean).join(' ')}
                      {selectedCard.cardnum ? ` · ${selectedCard.cardnum}` : ''}
                    </div>
                  </div>
                  {(selectedCard.attrs||[]).length > 0 && (
                    <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                      {(selectedCard.attrs||[]).map(a => <span key={a} className="attr-tag">{attrLabel(a)}</span>)}
                    </div>
                  )}
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
                    {[
                      {lbl:'Cost Paid', val:selectedCard.cost?`$${selectedCard.cost}`:'-', color:'#0D0D0D'},
                      {lbl:'Current Value', val:selectedCard.value?`$${selectedCard.value}`:'-', color:'#1B6FF0'},
                      {lbl:'Gain/Loss', val:selectedCard.cost?(((selectedCard.value||0)-(selectedCard.cost||0))>=0?'+':'')+`$${Math.abs((selectedCard.value||0)-(selectedCard.cost||0))}`:'-', color:(selectedCard.value||0)>=(selectedCard.cost||0)?'#00A861':'#D93025'},
                    ].map(s => (
                      <div key={s.lbl} style={{background:'#F7F7F7',borderRadius:'8px',padding:'12px',textAlign:'center'}}>
                        <div style={{fontSize:'10px',fontWeight:700,color:'#9A9A9A',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:'4px'}}>{s.lbl}</div>
                        <div style={{fontSize:'18px',fontWeight:800,color:s.color}}>{s.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                    {[
  {lbl:'Sport', val:selectedCard.sport},
  {lbl:'Year', val:selectedCard.year||'-'},
  {lbl:'Brand', val:selectedCard.brand||'-'},
  {lbl:'Set Name', val:selectedCard.set_name||'-'},
  {lbl:'Card Number', val:selectedCard.cardnum||'-'},
  {lbl:'Condition', val:selectedCard.condition||'-'},
  {lbl:'Quantity', val:String(selectedCard.qty||1)},
  {lbl:'Grading', val:selectedCard.grader&&selectedCard.grader!=='Raw'?`${selectedCard.grader} ${selectedCard.grade}`:'Raw (Ungraded)'},
  {lbl:'Added', val:new Date(selectedCard.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})},
].map(row => (
                      <div key={row.lbl} style={{display:'flex',justifyContent:'space-between',fontSize:'13px',paddingBottom:'8px',borderBottom:'1px solid #EFEFEF'}}>
                        <span style={{color:'#9A9A9A',fontWeight:500}}>{row.lbl}</span>
                        <span style={{fontWeight:600,color:'#0D0D0D'}}>{row.val}</span>
                      </div>
                    ))}
                    {selectedCard.notes && (
                      <div style={{fontSize:'13px',paddingBottom:'8px',borderBottom:'1px solid #EFEFEF'}}>
                        <div style={{color:'#9A9A9A',fontWeight:500,marginBottom:'4px'}}>Notes</div>
                        <div style={{fontWeight:500,color:'#0D0D0D',lineHeight:1.5}}>{selectedCard.notes}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setSelectedCard(null)}>Close</button>
              <button className="btn btn-outline" onClick={() => { setSelectedCard(null); markSold(selectedCard.id) }}>
                <FontAwesomeIcon icon={selectedCard.status==='sold'?faRotateLeft:faTag}/>
                {selectedCard.status==='sold'?'Mark Owned':'Mark Sold'}
              </button>
              <button className="btn btn-primary" onClick={() => { setSelectedCard(null); openEdit(selectedCard.id) }}>
                <FontAwesomeIcon icon={faPen}/>Edit Card
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  )
}
