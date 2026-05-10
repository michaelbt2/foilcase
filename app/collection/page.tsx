'use client'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '../lib/supabase'
import Nav from '../components/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faPlus,
  faPen,
  faTrash,
  faTag,
  faFolder,
  faFolderOpen,
  faLayerGroup,
  faArrowUpRightFromSquare,
  faStar,
  faCircleCheck,
  faArrowRightArrowLeft,
  faBoxOpen,
  faMedal,
  faChartLine,
  faGrip,
  faBars,
  faXmark,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

const uid = () => Math.random().toString(36).slice(2,10)

const sportEmoji: Record<string,string> = {
  Football:'🏈', Baseball:'⚾', Basketball:'🏀',
  Hockey:'🏒', Soccer:'⚽', 'Gaming / TCG':'🎮', Gaming:'🎮'
}
const colorMap: Record<string,string> = {
  blue:'#1B6FF0', green:'#00A861', red:'#D93025',
  amber:'#E8820C', purple:'#7B4FCA', teal:'#0891B2', ink:'#0D0D0D'
}
const emojiMap: Record<string,string> = {
  blue:'📁', green:'🌟', red:'❤️', amber:'👑', purple:'💜', teal:'🌊', ink:'⬛'
}

interface Card {
  id:string; player:string; year:string; brand:string; set_name:string; sport:string;
  cardnum:string; folder_id:string; status:string; grader:string; grade:string;
  qty:number; condition:string; cost:number; value:number; attrs:string[];
  notes:string; created_at:string; img:string; user_id:string;
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
  const [selectedColor, setSelectedColor]   = useState('blue')
  const [newFolderName, setNewFolderName]   = useState('')
  const [form, setForm] = useState({
    player:'', year:'', brand:'', set_name:'', sport:'', cardnum:'',
    folder_id:'', qty:'1', condition:'', cost:'', value:'', notes:''
  })
  const [formAttrs, setFormAttrs] = useState<string[]>([])

  useEffect(() => {
    if (isLoaded && user) {
      loadData()
    }
  }, [isLoaded, user])

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
    setForm({ player:'', year:'', brand:'', set_name:'', sport:'', cardnum:'', folder_id:'', qty:'1', condition:'', cost:'', value:'', notes:'' })
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
    setForm({ player:c.player, year:c.year, brand:c.brand, set_name:c.set_name, sport:c.sport, cardnum:c.cardnum, folder_id:c.folder_id||'', qty:String(c.qty||1), condition:c.condition, cost:String(c.cost||''), value:String(c.value||''), notes:c.notes||'' })
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
      img: sportEmoji[form.sport]||'🃏'
    }
    if (editingId) {
      const { error } = await supabase.from('cards').update(card).eq('id', editingId)
      if (error) { showToast('❌ Error: ' + error.message); console.error(error); return }
      showToast('✏️ Card updated!')
    } else {
      const { error } = await supabase.from('cards').insert(card)
      if (error) { showToast('❌ Error: ' + error.message); console.error(error); return }
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
    showToast('🗑 Card removed')
    loadData()
  }

  const createFolder = async () => {
    if (!user) return
    if (!newFolderName.trim()) { showToast('⚠️ Enter a folder name'); return }
    await supabase.from('folders').insert({
      user_id: user.id,
      name: newFolderName.trim(),
      color: selectedColor,
      emoji: emojiMap[selectedColor]||'📁'
    })
    setNewFolderName('')
    showToast(`📁 "${newFolderName}" created`)
    loadData()
  }

  const deleteFolder = async (id: string) => {
    await supabase.from('folders').delete().eq('id', id)
    await supabase.from('cards').update({ folder_id: null }).eq('folder_id', id)
    showToast('🗑 Folder removed')
    loadData()
  }

  const toggleAttr = (a: string) => setFormAttrs(prev => prev.includes(a)?prev.filter(x=>x!==a):[...prev,a])
  const toggleSelect = (id: string) => setSelected(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n })

  const gradeScores = (g: string) => g==='BGS'
    ? ['10','9.5','9','8.5','8','7.5','7','6.5','6','5','4']
    : ['10','9','8','7','6','5','4','3','2','1','A']

  const statusMap: Record<string,string> = { have:'status-have', trade:'status-trade', sold:'status-sold' }
  const statusLbl: Record<string,string> = { have:'Have', trade:'Trade', sold:'Sold' }

  if (!isLoaded) {
  return (
    <>
      <Nav />
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'40px',marginBottom:'16px'}}>🃏</div>
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
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'40px',marginBottom:'16px'}}>🔒</div>
          <div style={{fontSize:'18px',fontWeight:700,marginBottom:'8px',color:'#0D0D0D'}}>Sign in to view your vault</div>
          <div style={{fontSize:'14px',color:'#9A9A9A',marginBottom:'24px'}}>Your collection is saved securely to your account.</div>
          <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
            <a href="/sign-in" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',padding:'10px 24px',borderRadius:'100px',background:'#1B6FF0',color:'#fff',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',fontWeight:600,textDecoration:'none',transition:'all .15s'}}>Log in</a>
            <a href="/sign-up" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',padding:'10px 24px',borderRadius:'100px',background:'transparent',color:'#0D0D0D',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',fontWeight:600,textDecoration:'none',border:'1.5px solid #D8D8D8',transition:'all .15s'}}>Create account</a>
          </div>
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
          <div style={{fontSize:'40px',marginBottom:'16px'}}>🃏</div>
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
        .page-header{background:#fff;border-bottom:1px solid #EFEFEF;padding:14px 24px}
        .page-header-inner{max-width:1240px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px}
        .breadcrumb{display:flex;align-items:center;gap:6px;font-size:12px;color:#9A9A9A}
        .breadcrumb a{color:#9A9A9A;text-decoration:none}
        .breadcrumb a:hover{color:#1B6FF0}
        .app-layout{max-width:1240px;margin:0 auto;padding:24px;display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start}
        .sidebar{display:flex;flex-direction:column;gap:12px;position:sticky;top:78px}
        .sidebar-card{background:#fff;border:1px solid #EFEFEF;border-radius:20px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .sidebar-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;margin-bottom:10px}
        .vault-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#1B6FF0,#7EB6FF);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#fff;flex-shrink:0}
        .vs-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
        .vs-item{background:#F7F7F7;border-radius:10px;padding:10px 12px;text-align:center}
        .vs-val{font-size:18px;font-weight:800;letter-spacing:-.5px}
        .vs-lbl{font-size:10px;color:#9A9A9A;margin-top:1px}
        .folder-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;cursor:pointer;transition:all .12s;border:1px solid transparent}
        .folder-item:hover{background:#F7F7F7}
        .folder-item.active{background:#EBF2FF;border-color:#C5D8FF}
        .folder-name{font-size:13px;font-weight:500;flex:1}
        .folder-count{font-size:11px;color:#9A9A9A;background:#F7F7F7;padding:2px 7px;border-radius:100px;font-weight:600}
        .folder-item.active .folder-count{background:rgba(27,111,240,.15);color:#1B6FF0}
        .add-folder-btn{display:flex;align-items:center;gap:6px;padding:7px 10px;border-radius:10px;cursor:pointer;color:#1B6FF0;font-size:13px;font-weight:600;margin-top:4px;border:1.5px dashed #C5D8FF;background:transparent;font-family:'Plus Jakarta Sans',sans-serif;width:100%;transition:all .15s}
        .add-folder-btn:hover{background:#EBF2FF}
        .filter-group{margin-bottom:12px}
        .filter-group-label{font-size:11px;font-weight:700;color:#9A9A9A;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
        .fchips{display:flex;flex-wrap:wrap;gap:5px}
        .fchip{padding:5px 10px;background:#F7F7F7;border:1px solid #EFEFEF;border-radius:100px;font-size:12px;font-weight:600;color:#555;cursor:pointer;transition:all .12s;font-family:'Plus Jakarta Sans',sans-serif;border:none}
        .fchip:hover{background:#EFEFEF;color:#0D0D0D}
        .fchip.on{background:#0D0D0D;color:#fff}
        .content{display:flex;flex-direction:column;gap:14px}
        .dash-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        .dash-card{background:#fff;border:1px solid #EFEFEF;border-radius:20px;padding:18px 20px;box-shadow:0 1px 3px rgba(0,0,0,.06);transition:all .2s}
        .dash-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.07);transform:translateY(-1px)}
        .dash-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;margin-bottom:10px}
        .dash-val{font-size:24px;font-weight:800;letter-spacing:-.5px;line-height:1}
        .dash-lbl{font-size:12px;color:#9A9A9A;margin-top:4px}
        .dash-delta{font-size:11px;font-weight:600;margin-top:6px}
        .delta-up{color:#00A861}
        .delta-dn{color:#D93025}
        .toolbar{background:#fff;border:1px solid #EFEFEF;border-radius:20px;padding:10px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .search-box{flex:1;min-width:180px;display:flex;align-items:center;gap:8px;background:#F7F7F7;border:1.5px solid #EFEFEF;border-radius:100px;padding:7px 14px;transition:all .15s}
        .search-box:focus-within{border-color:#1B6FF0;background:#fff;box-shadow:0 0 0 3px rgba(27,111,240,.1)}
        .search-box input{border:none;outline:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:#0D0D0D;flex:1;background:transparent}
        .search-box input::placeholder{color:#9A9A9A}
        .sort-select{padding:7px 12px;border:1.5px solid #EFEFEF;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;color:#0D0D0D;background:#fff;cursor:pointer;outline:none}
        .view-toggle{display:flex;gap:2px;background:#F7F7F7;border-radius:10px;padding:3px}
        .vbtn{padding:5px 8px;border-radius:7px;border:none;background:transparent;cursor:pointer;color:#9A9A9A;font-size:15px;transition:all .12s}
        .vbtn.on{background:#fff;color:#0D0D0D;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .results-lbl{font-size:12px;color:#9A9A9A;white-space:nowrap}
        .bulk-bar{display:flex;align-items:center;gap:8px;padding:8px 14px;background:#EBF2FF;border-radius:100px;font-size:13px;font-weight:600;color:#1B6FF0}
        .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
        .cards-list{display:flex;flex-direction:column;gap:10px}
        .card-tile{background:#fff;border:1px solid #EFEFEF;border-radius:20px;overflow:hidden;cursor:pointer;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);position:relative;display:flex;flex-direction:column;animation:fadeUp .35s ease both}
        .card-tile:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.10);border-color:#D8D8D8}
        .card-tile.sold-card{opacity:.6}
        .card-tile.sel{border-color:#1B6FF0;box-shadow:0 0 0 2px #C5D8FF}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .card-cb{position:absolute;top:10px;left:10px;z-index:10;width:20px;height:20px;border-radius:5px;border:2px solid rgba(255,255,255,.8);background:rgba(0,0,0,.15);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;transition:all .15s;opacity:0}
        .card-tile:hover .card-cb,.card-tile.sel .card-cb{opacity:1}
        .card-tile.sel .card-cb{background:#1B6FF0;border-color:#1B6FF0}
        .card-status{position:absolute;top:10px;right:10px;z-index:10;font-size:9px;font-weight:700;padding:3px 7px;border-radius:100px;letter-spacing:.04em;text-transform:uppercase}
        .status-have{background:#E6F9F0;color:#00A861}
        .status-trade{background:#FEF3E2;color:#E8820C}
        .status-sold{background:#E5E5E5;color:#777}
        .card-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:48px;position:relative;flex-shrink:0}
        .grade-chip{position:absolute;bottom:8px;left:8px;font-size:10px;font-weight:800;padding:3px 8px;border-radius:5px}
        .grade-PSA{background:#002FA7;color:#fff}
        .grade-BGS{background:#C41E3A;color:#fff}
        .grade-SGC{background:#1A6B2A;color:#fff}
        .card-body{padding:11px 13px 8px;flex:1;display:flex;flex-direction:column}
        .card-player{font-size:13px;font-weight:700;color:#0D0D0D;line-height:1.2;margin-bottom:2px}
        .card-set{font-size:11px;color:#9A9A9A;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .card-attrs{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px}
        .attr-tag{font-size:9px;font-weight:700;padding:2px 6px;border-radius:100px}
        .tag-rc{background:#E6F9F0;color:#00A861}
        .tag-auto{background:#FEF3E2;color:#E8820C}
        .tag-numbered{background:#F2ECFB;color:#7B4FCA}
        .tag-chrome{background:#EBF2FF;color:#1B6FF0}
        .tag-other{background:#F7F7F7;color:#555}
        .card-fins{display:flex;justify-content:space-between;align-items:flex-end;margin-top:auto;padding-top:8px;border-top:1px solid #EFEFEF}
        .fin-lbl{font-size:9px;color:#9A9A9A;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
        .fin-val{font-size:13px;font-weight:800;color:#0D0D0D}
        .fin-pos{color:#00A861}
        .fin-neg{color:#D93025}
        .card-actions{display:flex;gap:4px;padding:0 13px 11px;opacity:0;transition:opacity .15s}
        .card-tile:hover .card-actions{opacity:1}
        .act-btn{flex:1;padding:5px 0;border-radius:6px;font-size:10px;font-weight:700;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .12s;text-align:center}
        .act-edit{background:#F7F7F7;color:#555}
        .act-edit:hover{background:#EFEFEF;color:#0D0D0D}
        .act-sold{background:#FEF3E2;color:#E8820C}
        .act-sold:hover{background:#E8820C;color:#fff}
        .act-rm{background:#FDECEA;color:#D93025}
        .act-rm:hover{background:#D93025;color:#fff}
        .list-tile{background:#fff;border:1px solid #EFEFEF;border-radius:14px;overflow:hidden;display:flex;align-items:center;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.06);animation:fadeUp .35s ease both}
        .list-tile:hover{box-shadow:0 4px 16px rgba(0,0,0,.07);border-color:#D8D8D8}
        .list-tile.sold-card{opacity:.6}
        .list-img{width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;margin:8px 0 8px 12px;border-radius:10px}
        .list-main{flex:1;padding:10px 12px;min-width:0}
        .list-player{font-size:14px;font-weight:700;color:#0D0D0D}
        .list-set{font-size:12px;color:#9A9A9A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .list-meta{display:flex;align-items:center;gap:20px;padding:0 16px;flex-shrink:0}
        .lm-lbl{font-size:10px;color:#9A9A9A;font-weight:600;text-transform:uppercase}
        .lm-val{font-size:14px;font-weight:800;color:#0D0D0D}
        .list-acts{display:flex;gap:6px;padding:0 14px;opacity:0;transition:opacity .15s;flex-shrink:0}
        .list-tile:hover .list-acts{opacity:1}
        .empty-state{background:#fff;border:1.5px dashed #D8D8D8;border-radius:20px;padding:64px 24px;text-align:center}
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
        .modal{background:#fff;border-radius:20px;width:100%;max-width:520px;max-height:92vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.18)}
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
        .form-input,.form-select{width:100%;padding:9px 12px;border:1.5px solid #EFEFEF;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:#0D0D0D;background:#fff;outline:none;transition:border-color .15s}
        .form-input:focus,.form-select:focus{border-color:#1B6FF0;box-shadow:0 0 0 3px rgba(27,111,240,.1)}
        .grader-row{display:flex;gap:6px}
        .grader-btn{flex:1;padding:7px 0;border-radius:10px;border:1.5px solid #EFEFEF;font-size:12px;font-weight:700;cursor:pointer;background:#fff;color:#555;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s;text-align:center}
        .g-Raw{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .g-PSA{background:#002FA7;color:#fff;border-color:#002FA7}
        .g-BGS{background:#C41E3A;color:#fff;border-color:#C41E3A}
        .g-SGC{background:#1A6B2A;color:#fff;border-color:#1A6B2A}
        .score-row{display:flex;flex-wrap:wrap;gap:4px}
        .score-btn{padding:4px 9px;border-radius:5px;border:1px solid #EFEFEF;font-size:11px;font-weight:700;cursor:pointer;background:#fff;color:#555;font-family:'Plus Jakarta Sans',sans-serif;transition:all .1s}
        .score-btn.sel{background:#1B6FF0;color:#fff;border-color:#1B6FF0}
        .status-sel{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
        .status-opt{padding:8px;border-radius:10px;border:1.5px solid #EFEFEF;font-size:12px;font-weight:600;cursor:pointer;text-align:center;transition:all .12s;background:#fff;font-family:'Plus Jakarta Sans',sans-serif}
        .s-have{background:#E6F9F0;color:#00A861;border-color:#A8DFC4}
        .s-trade{background:#FEF3E2;color:#E8820C;border-color:#F5C880}
        .s-sold{background:#FDECEA;color:#D93025;border-color:#FFBBB7}
        .color-row{display:flex;gap:6px;flex-wrap:wrap}
        .color-dot{width:26px;height:26px;border-radius:50%;cursor:pointer;border:2.5px solid transparent;transition:all .12s}
        .color-dot.sel{border-color:#0D0D0D;transform:scale(1.15)}
        .toast{position:fixed;bottom:24px;right:24px;z-index:999;background:#0D0D0D;color:#fff;border-radius:14px;padding:12px 18px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toastIn .3s cubic-bezier(.34,1.56,.64,1);max-width:320px}
        @keyframes toastIn{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}
        @media(max-width:960px){.app-layout{grid-template-columns:1fr}.sidebar{position:static}.dash-stats{grid-template-columns:1fr 1fr}}
      `}</style>

      <Nav />

      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <a href="/">Home</a><span>›</span>
            <strong style={{color:'#0D0D0D'}}>My Collection</strong>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button className="btn btn-outline btn-sm" onClick={() => setShowFolder(true)}>
  <FontAwesomeIcon icon={faFolder} style={{marginRight:'5px'}}/>Folders
</button>
<button className="btn btn-primary" onClick={openAdd}>
  <FontAwesomeIcon icon={faPlus} style={{marginRight:'5px'}}/>Add Card
</button>
          </div>
        </div>
      </div>

      <div className="app-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-card">
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px',paddingBottom:'14px',borderBottom:'1px solid #EFEFEF'}}>
              <div className="vault-avatar">{user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || '?'}</div>
              <div>
                <div style={{fontSize:'14px',fontWeight:700}}>{user?.firstName ? `${user.firstName}'s Vault` : 'My Vault'}</div>
                <div style={{fontSize:'11px',color:'#9A9A9A'}}>{user?.emailAddresses?.[0]?.emailAddress}</div>
              </div>
            </div>
            <div className="vs-grid">
              <div className="vs-item"><div className="vs-val">{totalCards}</div><div className="vs-lbl">Cards</div></div>
              <div className="vs-item"><div className="vs-val" style={{color:'#00A861'}}>${fmtNum(totalValue)}</div><div className="vs-lbl">Value</div></div>
              <div className="vs-item"><div className="vs-val">{totalSets}</div><div className="vs-lbl">Sets</div></div>
              <div className="vs-item"><div className="vs-val">{totalGraded}</div><div className="vs-lbl">Graded</div></div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-title">Folders</div>
            <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
              <div className={`folder-item${activeFolder==='all'?' active':''}`} onClick={() => setActiveFolder('all')}>
                <FontAwesomeIcon icon={faFolderOpen} style={{width:'22px',color:'#9A9A9A'}}/>
                <span className="folder-name">All Cards</span>
                <span className="folder-count">{cards.reduce((s,c)=>s+(c.qty||1),0)}</span>
              </div>
              {folders.map(f => (
                <div key={f.id} className={`folder-item${activeFolder===f.id?' active':''}`} onClick={() => setActiveFolder(f.id)}>
                  <span style={{fontSize:'15px',width:'22px',textAlign:'center'}}>{emojiMap[f.color]||'📁'}</span>
                  <span className="folder-name">{f.name}</span>
                  <span className="folder-count">{folderCount(f.id)}</span>
                </div>
              ))}
            </div>
            <button className="add-folder-btn" onClick={() => setShowFolder(true)}>
  <FontAwesomeIcon icon={faPlus} style={{marginRight:'5px'}}/>New Folder
</button>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-title">Filters</div>
            {[
              { label:'Sport', key:'sport', opts:[{v:'all',l:'All'},{v:'Football',l:'🏈 Football'},{v:'Baseball',l:'⚾ Baseball'},{v:'Basketball',l:'🏀 Basketball'},{v:'Hockey',l:'🏒 Hockey'},{v:'Gaming',l:'🎮 Gaming'}] },
              { label:'Grading', key:'grading', opts:[{v:'all',l:'All'},{v:'graded',l:'Graded'},{v:'raw',l:'Raw'}] },
              { label:'Status', key:'status', opts:[{v:'all',l:'All'},{v:'have',l:'✅ Have'},{v:'trade',l:'🔄 Trade'},{v:'sold',l:'💰 Sold'}] },
              { label:'Date Added', key:'date', opts:[{v:'all',l:'All Time'},{v:'7',l:'7 days'},{v:'30',l:'30 days'},{v:'90',l:'90 days'},{v:'365',l:'This year'}] },
            ].map(fg => (
              <div className="filter-group" key={fg.key}>
                <div className="filter-group-label">{fg.label}</div>
                <div className="fchips">
                  {fg.opts.map(o => (
                    <button key={o.v} className={`fchip${filters[fg.key as keyof typeof filters]===o.v?' on':''}`} onClick={() => setFilters(prev => ({...prev,[fg.key]:o.v}))}>{o.l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main className="content">

          {/* DASH STATS */}
          <div className="dash-stats">
            <div className="dash-card">
              <div className="dash-icon" style={{background:'#EBF2FF'}}>
  <FontAwesomeIcon icon={faLayerGroup} style={{color:'#1B6FF0'}}/>
</div>
              <div className="dash-val">{totalCards}</div>
              <div className="dash-lbl">Total Cards</div>
              <div className="dash-delta delta-up">↑ {cards.filter(c=>{const d=new Date(c.created_at).getTime();return Date.now()-d<30*86400000}).length} this month</div>
            </div>
            <div className="dash-card">
              <div className="dash-icon" style={{background:'#E6F9F0'}}>
  <FontAwesomeIcon icon={faChartLine} style={{color:'#00A861'}}/>
</div>
              <div className="dash-val" style={{color:'#00A861'}}>${fmtNum(totalValue)}</div>
              <div className="dash-lbl">Est. Collection Value</div>
              <div className={`dash-delta ${gain>=0?'delta-up':'delta-dn'}`}>{gain>=0?'+':'-'}${fmtNum(Math.abs(gain))} ({gain>=0?'+':''}{gainPct}%)</div>
            </div>
            <div className="dash-card">
              <div className="dash-icon" style={{background:'#F2ECFB'}}>
  <FontAwesomeIcon icon={faMedal} style={{color:'#7B4FCA'}}/>
</div>
              <div className="dash-val">{totalGraded}</div>
              <div className="dash-lbl">Graded Cards</div>
              <div className="dash-delta" style={{color:'#9A9A9A'}}>{totalCards>0?Math.round((totalGraded/totalCards)*100):0}% of total</div>
            </div>
            <div className="dash-card">
              <div className="dash-icon" style={{background:'#FEF3E2'}}>
  <FontAwesomeIcon icon={faBoxOpen} style={{color:'#E8820C'}}/>
</div>
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
              <button className={`vbtn${viewMode==='grid'?' on':''}`} onClick={()=>setViewMode('grid')}>
  <FontAwesomeIcon icon={faGrip}/>
</button>
<button className={`vbtn${viewMode==='list'?' on':''}`} onClick={()=>setViewMode('list')}>
  <FontAwesomeIcon icon={faBars}/>
</button>
            </div>
            <div className="results-lbl">{filtered.length} card{filtered.length!==1?'s':''}</div>
            {selected.size > 0 && (
              <div className="bulk-bar">
                {selected.size} selected
                <button className="btn btn-sm" style={{background:'#FEF3E2',color:'#E8820C',border:'none'}} onClick={async()=>{await Promise.all([...selected].map(id=>markSold(id)));setSelected(new Set())}}>
  <FontAwesomeIcon icon={faTag} style={{marginRight:'4px'}}/>Sell
</button>
<button className="btn btn-sm btn-danger" onClick={async()=>{await Promise.all([...selected].map(id=>supabase.from('cards').delete().eq('id',id)));setSelected(new Set());showToast(`🗑 ${selected.size} cards removed`);loadData()}}>
  <FontAwesomeIcon icon={faTrash} style={{marginRight:'4px'}}/>Remove
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
              {filtered.map((c,i) => {
                const gain = (c.value||0)-(c.cost||0)
                const isSold = c.status==='sold'
                const isSel = selected.has(c.id)
                return (
                  <div key={c.id} className={`card-tile${isSold?' sold-card':''}${isSel?' sel':''}`} style={{animationDelay:`${i*.03}s`}}>
                    <div className="card-cb" onClick={e=>{e.stopPropagation();toggleSelect(c.id)}}>{isSel?'✓':''}</div>
                    <div className={`card-status ${statusMap[c.status]||'status-have'}`}>{statusLbl[c.status]||'Have'}</div>
                    <div className="card-img" style={{background:cardBg(c.sport)}}>
                      {c.img||sportEmoji[c.sport]||'🃏'}
                      {c.grader && c.grader!=='Raw' && (
                        <div className={`grade-chip grade-${c.grader}`}>{c.grader} {c.grade}</div>
                      )}
                    </div>
                    <div className="card-body">
                      <div className="card-player">{c.player}</div>
                      <div className="card-set">
  {[c.year, c.brand !== 'Unknown' ? c.brand : '', c.set_name !== 'Unknown' ? c.set_name : ''].filter(Boolean).join(' ')}
  {c.cardnum ? ` · ${c.cardnum}` : ''}
</div>
                      <div className="card-attrs">
                        {(c.attrs||[]).map(a => (
                          <span key={a} className={`attr-tag tag-${['rc','auto','numbered','chrome'].includes(a)?a:'other'}`}>{attrLabel(a)}</span>
                        ))}
                      </div>
                      <div className="card-fins">
                        <div><div className="fin-lbl">Cost</div><div className="fin-val">{c.cost?`$${c.cost}`:'-'}</div></div>
                        <div style={{textAlign:'center'}}><div className="fin-lbl">Value</div><div className="fin-val" style={{color:'#1B6FF0'}}>{c.value?`$${c.value}`:'-'}</div></div>
                        <div style={{textAlign:'right'}}><div className="fin-lbl">Gain</div><div className={`fin-val ${gain>=0?'fin-pos':'fin-neg'}`}>{c.cost?(gain>=0?'+':'')+`$${Math.abs(gain)}`:'-'}</div></div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button className="act-btn act-edit" onClick={e=>{e.stopPropagation();openEdit(c.id)}}>
  <FontAwesomeIcon icon={faPen} style={{marginRight:'3px'}}/>Edit
</button>
<button className="act-btn act-sold" onClick={e=>{e.stopPropagation();markSold(c.id)}}>
  <FontAwesomeIcon icon={isSold?faRotateLeft:faTag} style={{marginRight:'3px'}}/>{isSold?'Unsell':'Sell'}
</button>
<button className="act-btn act-rm" onClick={e=>{e.stopPropagation();setRemovingId(c.id);setShowConfirm(true)}}>
  <FontAwesomeIcon icon={faTrash}/>
</button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="cards-list">
              {filtered.map((c,i) => {
                const gain = (c.value||0)-(c.cost||0)
                const isSold = c.status==='sold'
                const isSel = selected.has(c.id)
                return (
                  <div key={c.id} className={`list-tile${isSold?' sold-card':''}${isSel?' sel':''}`} style={{animationDelay:`${i*.025}s`}}>
                    <div style={{padding:'0 0 0 12px',cursor:'pointer'}} onClick={()=>toggleSelect(c.id)}>
                      <div className="card-cb" style={{position:'relative',top:0,left:0,opacity:1,width:18,height:18,fontSize:10}}>{isSel?'✓':''}</div>
                    </div>
                    <div className="list-img" style={{background:cardBg(c.sport)}}>{c.img||sportEmoji[c.sport]||'🃏'}</div>
                    <div className="list-main">
                      <div className="list-player">{c.player}</div>
                      <div className="list-set">
  {[c.year, c.brand !== 'Unknown' ? c.brand : '', c.set_name !== 'Unknown' ? c.set_name : ''].filter(Boolean).join(' ')}
  {c.cardnum ? ` · ${c.cardnum}` : ''}
</div>
                      <div className="card-attrs" style={{marginTop:'4px'}}>
                        {(c.attrs||[]).map(a=><span key={a} className={`attr-tag tag-${['rc','auto','numbered','chrome'].includes(a)?a:'other'}`}>{attrLabel(a)}</span>)}
                      </div>
                    </div>
                    <div className="list-meta">
                      <div><div className="lm-lbl">Grade</div><div className="lm-val" style={{fontSize:'12px'}}>{c.grader&&c.grader!=='Raw'?`${c.grader} ${c.grade}`:'Raw'}</div></div>
                      <div><div className="lm-lbl">Qty</div><div className="lm-val">{c.qty||1}</div></div>
                      <div><div className="lm-lbl">Cost</div><div className="lm-val">{c.cost?`$${c.cost}`:'-'}</div></div>
                      <div><div className="lm-lbl">Value</div><div className="lm-val" style={{color:'#1B6FF0'}}>{c.value?`$${c.value}`:'-'}</div></div>
                      <div><div className="lm-lbl">Gain</div><div className={`lm-val ${gain>=0?'fin-pos':'fin-neg'}`}>{c.cost?(gain>=0?'+':'')+`$${Math.abs(gain)}`:'-'}</div></div>
                    </div>
                    <div className="list-acts">
                      <button className="btn btn-sm btn-outline" onClick={()=>openEdit(c.id)}>
  <FontAwesomeIcon icon={faPen} style={{marginRight:'4px'}}/>Edit
</button>
<button className="btn btn-sm" style={{background:'#FEF3E2',color:'#E8820C',border:'none',display:'inline-flex',alignItems:'center',gap:'4px'}} onClick={()=>markSold(c.id)}>
  <FontAwesomeIcon icon={isSold?faRotateLeft:faTag}/>{isSold?'Unsell':'Sell'}
</button>
<button className="btn btn-sm btn-danger" onClick={()=>{setRemovingId(c.id);setShowConfirm(true)}}>
  <FontAwesomeIcon icon={faTrash}/>
</button>
                    </div>
                  </div>
                )
              })}
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
              <button className="modal-close" onClick={()=>setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group"><label className="form-label">Player / Subject *</label><input className="form-input" placeholder="e.g. Patrick Mahomes" value={form.player} onChange={e=>setForm(p=>({...p,player:e.target.value}))}/></div>
                <div className="form-group"><label className="form-label">Year</label><input className="form-input" type="number" placeholder="2024" value={form.year} onChange={e=>setForm(p=>({...p,year:e.target.value}))}/></div>
                <div className="form-group"><label className="form-label">Brand</label>
                  <select className="form-select" value={form.brand} onChange={e=>setForm(p=>({...p,brand:e.target.value}))}>
                    <option value="">Select...</option>
                    {['Panini','Topps','Bowman','Upper Deck','Leaf','SAGE','Donruss','Fleer','Score','Other'].map(b=><option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Set Name *</label><input className="form-input" placeholder="e.g. Prizm Football" value={form.set_name} onChange={e=>setForm(p=>({...p,set_name:e.target.value}))}/></div>
                <div className="form-group"><label className="form-label">Sport / Category *</label>
                  <select className="form-select" value={form.sport} onChange={e=>setForm(p=>({...p,sport:e.target.value}))}>
                    <option value="">Select...</option>
                    {['Football','Baseball','Basketball','Hockey','Soccer','Gaming / TCG','Non-Sport','Other'].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Card Number</label><input className="form-input" placeholder="e.g. #200 or /99" value={form.cardnum} onChange={e=>setForm(p=>({...p,cardnum:e.target.value}))}/></div>
                <div className="form-group"><label className="form-label">Folder</label>
                  <select className="form-select" value={form.folder_id} onChange={e=>setForm(p=>({...p,folder_id:e.target.value}))}>
                    <option value="">No folder</option>
                    {folders.map(f=><option key={f.id} value={f.id}>{emojiMap[f.color]} {f.name}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Quantity</label><input className="form-input" type="number" min="1" value={form.qty} onChange={e=>setForm(p=>({...p,qty:e.target.value}))}/></div>
                <div className="form-group full">
                  <label className="form-label">Status</label>
                  <div className="status-sel">
                    {[{v:'have',l:'✅ In My Vault'},{v:'trade',l:'🔄 For Trade'},{v:'sold',l:'💰 Sold'}].map(s=>(
                      <button key={s.v} className={`status-opt${selectedStatus===s.v?' s-'+s.v:''}`} onClick={()=>setSelectedStatus(s.v)}>{s.l}</button>
                    ))}
                  </div>
                </div>
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
                <div className="form-group"><label className="form-label">Condition</label>
                  <select className="form-select" value={form.condition} onChange={e=>setForm(p=>({...p,condition:e.target.value}))}>
                    <option value="">Select...</option>
                    {['Mint (M)','Near Mint-Mint (NM-MT)','Near Mint (NM)','Excellent-Mint (EX-MT)','Excellent (EX)','Very Good (VG)','Good (G)'].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Cost Paid ($)</label><input className="form-input" type="number" placeholder="0.00" value={form.cost} onChange={e=>setForm(p=>({...p,cost:e.target.value}))}/></div>
                <div className="form-group"><label className="form-label">Current Value ($)</label><input className="form-input" type="number" placeholder="0.00" value={form.value} onChange={e=>setForm(p=>({...p,value:e.target.value}))}/></div>
                <div className="form-group full">
                  <label className="form-label">Card Attributes</label>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                    {[{v:'rc',l:'Rookie (RC)'},{v:'auto',l:'Autograph'},{v:'patch',l:'Patch/Relic'},{v:'numbered',l:'Numbered'},{v:'chrome',l:'Chrome'},{v:'refractor',l:'Refractor'},{v:'shortprint',l:'Short Print'},{v:'1of1',l:'1 of 1'}].map(a=>(
                      <button key={a.v} className={`fchip${formAttrs.includes(a.v)?' on':''}`} onClick={()=>toggleAttr(a.v)}>{a.l}</button>
                    ))}
                  </div>
                </div>
                <div className="form-group full"><label className="form-label">Notes</label><textarea className="form-input" style={{minHeight:'64px',resize:'vertical'}} placeholder="Serial number, purchase story, condition notes..." value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))}/></div>
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
              <button className="modal-close" onClick={()=>setShowFolder(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group" style={{marginBottom:'14px'}}>
                <label className="form-label">New Folder Name</label>
                <div style={{display:'flex',gap:'8px'}}>
                  <input className="form-input" style={{flex:1}} placeholder="e.g. PC Cards" value={newFolderName} onChange={e=>setNewFolderName(e.target.value)}/>
                  <button className="btn btn-primary" onClick={createFolder}>Create</button>
                </div>
              </div>
              <div className="form-group" style={{marginBottom:'16px'}}>
                <label className="form-label">Folder Color</label>
                <div className="color-row">
                  {Object.entries(colorMap).map(([k,v]) => (
                    <div key={k} className={`color-dot${selectedColor===k?' sel':''}`} style={{background:v}} onClick={()=>setSelectedColor(k)}></div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" style={{marginBottom:'8px'}}>Your Folders</label>
                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  {folders.length === 0 ? (
                    <div style={{fontSize:'13px',color:'#9A9A9A',padding:'8px 0'}}>No folders yet — create one above.</div>
                  ) : folders.map(f => (
                    <div key={f.id} style={{display:'flex',alignItems:'center',gap:'10px',padding:'8px 10px',border:'1px solid #EFEFEF',borderRadius:'10px'}}>
                      <div style={{width:'10px',height:'10px',borderRadius:'50%',background:colorMap[f.color]||'#aaa',flexShrink:0}}></div>
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
              <button className="modal-close" onClick={()=>setShowConfirm(false)}>✕</button>
            </div>
            <div className="modal-body" style={{textAlign:'center'}}>
              <div style={{fontSize:'40px',marginBottom:'12px',color:'#D93025'}}>
  <FontAwesomeIcon icon={faTrash}/>
</div>
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

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </>
  )
}