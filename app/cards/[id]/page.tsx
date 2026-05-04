'use client'
import { useState } from 'react'

const uid = () => Math.random().toString(36).slice(2,10)

interface VaultForm {
  grader: string; score: string; status: string;
  condition: string; qty: string; cost: string; value: string;
  folder: string; notes: string;
}

export default function CardDetail() {
  const [flipped, setFlipped]           = useState(false)
  const [activeParallel, setActiveParallel] = useState(0)
  const [activeRange, setActiveRange]   = useState('30d')
  const [wishlisted, setWishlisted]     = useState(false)
  const [vaultOpen, setVaultOpen]       = useState(false)
  const [saved, setSaved]               = useState(false)
  const [toast, setToast]               = useState<string|null>(null)
  const [form, setForm]                 = useState<VaultForm>({
    grader:'Raw', score:'', status:'have',
    condition:'Near Mint-Mint (NM-MT)', qty:'1',
    cost:'', value:'340', folder:'', notes:''
  })

  const parallels = [
    { name:'Silver Prizm', run:'∞',    price:'$340',   priceNum:340  },
    { name:'Blue',         run:'/199', price:'$620',   priceNum:620  },
    { name:'Orange',       run:'/149', price:'$520',   priceNum:520  },
    { name:'Green',        run:'/99',  price:'$750',   priceNum:750  },
    { name:'Red',          run:'/75',  price:'$890',   priceNum:890  },
    { name:'Purple',       run:'/49',  price:'$1,200', priceNum:1200 },
    { name:'Gold',         run:'/10',  price:'$4,200', priceNum:4200 },
    { name:'Black',        run:'1/1',  price:'POA',    priceNum:0    },
  ]

  const chartData: Record<string,{path:string,area:string,low:string,high:string,change:string,avg:string,sales:number}> = {
    '7d':  { path:'M50,40 C150,38 300,42 450,35 C500,32 540,28 570,25', area:'M50,40 C150,38 300,42 450,35 C500,32 540,28 570,25 L570,110 L50,110 Z', low:'$298',high:'$340',change:'+$42',avg:'$318',sales:8 },
    '30d': { path:'M50,85 C100,78 160,62 220,65 C300,60 370,45 430,38 C490,31 535,28 570,25', area:'M50,85 C100,78 160,62 220,65 C300,60 370,45 430,38 C490,31 535,28 570,25 L570,110 L50,110 Z', low:'$185',high:'$340',change:'+$155',avg:'$248',sales:47 },
    '90d': { path:'M50,100 C120,95 200,88 280,78 C350,68 430,50 490,40 C525,34 550,28 570,25', area:'M50,100 C120,95 200,88 280,78 C350,68 430,50 490,40 C525,34 550,28 570,25 L570,110 L50,110 Z', low:'$120',high:'$340',change:'+$220',avg:'$198',sales:134 },
    '1y':  { path:'M50,105 C120,102 200,98 280,90 C350,80 420,62 480,42 C520,35 548,27 570,25', area:'M50,105 C120,102 200,98 280,90 C350,80 420,62 480,42 C520,35 548,27 570,25 L570,110 L50,110 Z', low:'$85', high:'$340',change:'+$255',avg:'$162',sales:312 },
    'all': { path:'M50,108 C120,106 200,104 280,100 C350,92 420,72 480,48 C515,36 548,27 570,25', area:'M50,108 C120,106 200,104 280,100 C350,92 420,72 480,48 C515,36 548,27 570,25 L570,110 L50,110 Z', low:'$62', high:'$340',change:'+$278',avg:'$140',sales:580 },
  }

  const cd = chartData[activeRange]

  const soldListings = [
    { platform:'🛒', title:'2024 Panini Prizm Mahomes Silver #200 PSA 10', meta:'May 1, 2026 · BIN · Free shipping', price:'$340', badge:'eBay', badgeBg:'#FFF0E0', badgeColor:'#E55C00' },
    { platform:'🛒', title:'2024 Prizm Football Mahomes #200 Silver Raw NM-MT', meta:'Apr 29, 2026 · Auction · 14 bids', price:'$218', badge:'eBay', badgeBg:'#FFF0E0', badgeColor:'#E55C00' },
    { platform:'🏈', title:'2024 Panini Prizm Mahomes #200 Silver BGS 9.5', meta:'Apr 28, 2026 · Fixed Price', price:'$295', badge:'Fanatics', badgeBg:'#E8F0FF', badgeColor:'#1B6FF0' },
    { platform:'🛒', title:'2024 Prizm Football Mahomes Silver — Raw EX-MT', meta:'Apr 27, 2026 · Auction · 9 bids', price:'$185', badge:'eBay', badgeBg:'#FFF0E0', badgeColor:'#E55C00' },
    { platform:'🛒', title:'2024 Panini Prizm #200 Mahomes Silver SGC 10', meta:'Apr 25, 2026 · BIN · +$4.99 shipping', price:'$380', badge:'eBay', badgeBg:'#FFF0E0', badgeColor:'#E55C00' },
  ]

  const relatedCards = [
    { emoji:'🏈', bg:'linear-gradient(135deg,#FEF3E2,#FDDBA0)', player:'Mahomes', set:'2024 Prizm Gold /10', price:'$4,200' },
    { emoji:'🏈', bg:'linear-gradient(135deg,#EFF6FF,#BFDBFE)', player:'Mahomes', set:'2024 Prizm Blue /199', price:'$620' },
    { emoji:'🏈', bg:'linear-gradient(135deg,#F5F3FF,#DDD6FE)', player:'Mahomes', set:'2024 Select Silver', price:'$285' },
    { emoji:'🏈', bg:'linear-gradient(135deg,#ECFDF5,#A7F3D0)', player:'Mahomes', set:'2024 Prizm Green /99', price:'$890' },
  ]

  const gradeScores = (g: string) => g === 'BGS'
    ? ['10','9.5','9','8.5','8','7.5','7','6.5','6','5','4']
    : ['10','9','8','7','6','5','4','3','2','1','A']

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800) }

  const saveToVault = () => {
    const card = {
      id: uid(), player:'Patrick Mahomes II', year:'2024', brand:'Panini',
      set:'Prizm Football', sport:'Football', cardnum:'#200',
      folder:form.folder, status:form.status, grader:form.grader,
      grade:form.score, qty:parseInt(form.qty)||1, condition:form.condition,
      cost:parseFloat(form.cost)||0, value:parseFloat(form.value)||340,
      attrs:['chrome'], notes:form.notes, added:Date.now(), img:'🏈'
    }
    try {
      const existing = JSON.parse(localStorage.getItem('cardvault_collection')||'[]')
      existing.unshift(card)
      localStorage.setItem('cardvault_collection', JSON.stringify(existing))
    } catch {}
    setSaved(true)
    setVaultOpen(false)
    showToast('✅ Mahomes Prizm added to your vault!')
  }

  const currentParallel = parallels[activeParallel]

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
        .nav-actions{display:flex;align-items:center;gap:8px;margin-left:auto}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 14px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .15s;border:none;white-space:nowrap}
        .btn-ghost{background:transparent;color:#555}
        .btn-ghost:hover{background:#F7F7F7;color:#0D0D0D}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF;transform:translateY(-1px);box-shadow:0 4px 14px rgba(27,111,240,.35)}
        .btn-outline{background:transparent;color:#0D0D0D;border:1.5px solid #D8D8D8}
        .btn-outline:hover{border-color:#0D0D0D}
        .btn-green{background:#00A861;color:#fff}
        .btn-green:hover{background:#008A4F}
        .btn-lg{padding:13px 26px;font-size:15px;border-radius:20px}
        .btn-xl{padding:15px 32px;font-size:16px;border-radius:20px}
        .breadcrumb-bar{background:#fff;border-bottom:1px solid #EFEFEF;padding:11px 28px}
        .breadcrumb-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:6px;font-size:12.5px;color:#9A9A9A}
        .breadcrumb-inner a{color:#9A9A9A;text-decoration:none;transition:color .15s}
        .breadcrumb-inner a:hover{color:#1B6FF0}
        .page-body{max-width:1200px;margin:0 auto;padding:28px}
        .page-grid{display:grid;grid-template-columns:1fr 420px;gap:28px;align-items:start}
        .left-col{display:flex;flex-direction:column;gap:20px}
        .right-col{display:flex;flex-direction:column;gap:16px;position:sticky;top:80px}
        .panel{background:#fff;border:1px solid #EFEFEF;border-radius:20px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .panel-pad{padding:22px}
        .panel-title{font-size:15px;font-weight:700;letter-spacing:-.2px}
        .panel-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
        .card-stage{position:relative;padding:40px;display:flex;align-items:center;justify-content:center;min-height:360px;background:linear-gradient(135deg,#0A0F1E 0%,#111827 50%,#0A0F1E 100%);overflow:hidden;cursor:pointer}
        .card-stage::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 500px 300px at 60% 40%,rgba(129,140,248,.12),transparent),radial-gradient(ellipse 300px 400px at 20% 80%,rgba(56,189,248,.08),transparent)}
        .card-3d{perspective:1000px;width:210px;height:294px}
        .card-inner{position:relative;width:100%;height:100%;transition:transform .7s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d}
        .card-inner.flipped{transform:rotateY(180deg)}
        .card-face,.card-back-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5),0 4px 16px rgba(0,0,0,.3)}
        .card-back-face{transform:rotateY(180deg)}
        .card-front-bg{width:100%;height:100%;background:linear-gradient(160deg,#0A1628,#1A2744,#0A1628);position:relative;display:flex;flex-direction:column}
        .foil-sweep{position:absolute;inset:0;background:linear-gradient(135deg,transparent 20%,rgba(56,189,248,.25) 35%,rgba(129,140,248,.3) 50%,rgba(232,121,249,.2) 65%,transparent 80%);pointer-events:none}
        .foil-sweep-2{position:absolute;inset:0;background:linear-gradient(220deg,transparent 30%,rgba(251,146,60,.15) 50%,transparent 70%);pointer-events:none}
        .card-year-brand{position:absolute;top:12px;left:12px;font-size:8px;font-weight:600;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.1em}
        .card-serial{position:absolute;top:12px;right:12px;font-size:9px;color:rgba(255,255,255,.4);letter-spacing:.05em}
        .card-player-emoji{flex:1;display:flex;align-items:center;justify-content:center;font-size:72px}
        .card-name-area{padding:10px 14px;background:linear-gradient(to top,rgba(0,0,0,.85),transparent)}
        .card-name{font-size:14px;font-weight:800;color:#fff;letter-spacing:-.2px;line-height:1.1}
        .card-team{font-size:9px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.14em;margin-top:2px}
        .prismatic-bar{position:absolute;bottom:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#38BDF8,#818CF8,#E879F9,#FB923C)}
        .card-back-bg{width:100%;height:100%;background:#F8F8F6;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:10px}
        .back-logo{font-size:18px;font-weight:800;color:#0F172A;font-style:italic}
        .back-stats{width:100%;background:#F0F0EE;border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:6px}
        .back-row{display:flex;justify-content:space-between;font-size:10px}
        .back-row .k{color:#888}
        .back-row .v{font-weight:700;color:#222}
        .back-barcode{width:100%;height:24px;background:repeating-linear-gradient(90deg,#222 0px,#222 2px,#fff 2px,#fff 4px,#333 4px,#333 5px,#fff 5px,#fff 8px);border-radius:2px;opacity:.6}
        .back-cert{font-size:9px;color:#888;text-align:center}
        .flip-hint{position:absolute;bottom:16px;right:16px;font-size:11px;color:rgba(255,255,255,.35);display:flex;align-items:center;gap:4px;pointer-events:none}
        .thumbs{display:flex;gap:8px;padding:14px 20px;border-top:1px solid rgba(255,255,255,.08)}
        .thumb{width:48px;height:66px;border-radius:7px;border:2px solid transparent;cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(255,255,255,.06);color:rgba(255,255,255,.5);font-size:10px;text-align:center;padding:4px;line-height:1.2}
        .thumb.on{border-color:#38BDF8}
        .thumb:hover:not(.on){border-color:rgba(255,255,255,.25)}
        .range-tabs{display:flex;gap:3px;background:#F7F7F7;border-radius:10px;padding:3px}
        .range-tab{padding:4px 10px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;color:#555;border:none;background:transparent;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s}
        .range-tab.on{background:#fff;color:#0D0D0D;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .chart-area{position:relative;height:130px;margin-top:4px}
        .chart-svg{width:100%;height:100%;overflow:visible}
        .chart-grid{stroke:#EFEFEF;stroke-width:.5;stroke-dasharray:3,3}
        .chart-area-fill{fill:url(#cg);opacity:.4}
        .chart-line{fill:none;stroke:#1B6FF0;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
        .chart-dot{fill:#fff;stroke:#1B6FF0;stroke-width:2;cursor:pointer;transition:r .12s}
        .chart-dot:hover{r:5}
        .chart-xlab{font-size:10px;fill:#9A9A9A;font-family:'Plus Jakarta Sans',sans-serif}
        .chart-stat-row{display:flex;gap:0;margin-top:14px;padding-top:14px;border-top:1px solid #EFEFEF}
        .chart-stat{flex:1;text-align:center}
        .chart-stat-val{font-size:15px;font-weight:800;letter-spacing:-.4px}
        .chart-stat-lbl{font-size:10px;color:#9A9A9A;margin-top:2px;text-transform:uppercase;letter-spacing:.06em}
        .sold-list{display:flex;flex-direction:column}
        .sold-item{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid #EFEFEF}
        .sold-item:last-child{border-bottom:none}
        .sold-platform{width:28px;height:28px;border-radius:6px;background:#F7F7F7;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
        .sold-desc{flex:1;min-width:0}
        .sold-title{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .sold-meta{font-size:11px;color:#9A9A9A;margin-top:1px}
        .sold-price{font-size:14px;font-weight:800;flex-shrink:0}
        .sold-badge{font-size:9px;font-weight:700;padding:2px 6px;border-radius:100px;margin-left:6px}
        .related-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px}
        .related-card{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:14px;overflow:hidden;cursor:pointer;transition:all .18s}
        .related-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.1)}
        .rc-img{height:72px;display:flex;align-items:center;justify-content:center;font-size:28px}
        .rc-body{padding:8px 10px}
        .rc-player{font-size:11px;font-weight:700;color:#0D0D0D}
        .rc-set{font-size:10px;color:#9A9A9A;margin-top:1px}
        .rc-price{font-size:12px;font-weight:800;color:#1B6FF0;margin-top:4px}
        .info-panel-top{padding:22px 22px 0}
        .cbadge{font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;letter-spacing:.03em}
        .card-title{font-size:26px;font-weight:800;letter-spacing:-.5px;line-height:1.1;margin-bottom:6px;margin-top:10px}
        .card-subtitle{font-size:14px;color:#555;margin-bottom:16px}
        .price-block{display:flex;align-items:flex-end;gap:16px;padding:16px 0;border-top:1px solid #EFEFEF;border-bottom:1px solid #EFEFEF;margin-bottom:16px}
        .price-val{font-size:36px;font-weight:800;letter-spacing:-1.5px;color:#0D0D0D;line-height:1}
        .price-change{font-size:12px;font-weight:700;margin-top:4px}
        .pos{color:#00A861}
        .neg{color:#D93025}
        .section-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9A9A9A;margin-bottom:8px}
        .parallel-grid{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}
        .parallel-opt{padding:6px 12px;border-radius:10px;border:1.5px solid #EFEFEF;font-size:12.5px;font-weight:600;cursor:pointer;background:#fff;color:#555;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
        .parallel-opt:hover{border-color:#D8D8D8;color:#0D0D0D}
        .parallel-opt.sel{border-color:#0D0D0D;background:#0D0D0D;color:#fff}
        .parallel-run{font-size:10px;opacity:.7;margin-left:2px}
        .attrs-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
        .attr-item{background:#F7F7F7;border-radius:10px;padding:10px 13px}
        .attr-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9A9A9A;margin-bottom:3px}
        .attr-val{font-size:14px;font-weight:700;color:#0D0D0D}
        .collectors-bar{display:flex;align-items:center;gap:10px;padding:10px 12px;background:#ECFDF5;border-radius:12px;margin-bottom:14px;border:1px solid #A7F3D0}
        .col-avatars{display:flex}
        .col-av{width:22px;height:22px;border-radius:50%;border:2px solid #fff;margin-right:-5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff}
        .collectors-text{font-size:12px;font-weight:600;color:#059669;flex:1}
        .cta-block{padding:18px 22px;border-top:1px solid #EFEFEF;display:flex;flex-direction:column;gap:10px}
        .cta-row{display:flex;gap:8px}
        .icon-btn{width:42px;height:42px;border-radius:12px;border:1.5px solid #EFEFEF;background:#fff;display:flex;align-items:center;justify-content:center;font-size:17px;cursor:pointer;transition:all .15s;flex-shrink:0}
        .icon-btn:hover{border-color:#0D0D0D;transform:scale(1.05)}
        .icon-btn.active{background:#FDECEA;border-color:#FCA5A5}
        .vault-form{background:#F7F7F7;border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:12px;animation:slideDown .25s ease}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .form-group{display:flex;flex-direction:column;gap:4px}
        .form-group.full{grid-column:1/-1}
        .form-label{font-size:11px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.07em}
        .form-input,.form-select{width:100%;padding:8px 11px;border:1.5px solid #EFEFEF;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:#0D0D0D;background:#fff;outline:none;transition:border-color .15s}
        .form-input:focus,.form-select:focus{border-color:#1B6FF0;box-shadow:0 0 0 3px rgba(27,111,240,.1)}
        .grader-row{display:flex;gap:5px}
        .grader-btn{flex:1;padding:7px 0;border-radius:8px;border:1.5px solid #EFEFEF;font-size:11px;font-weight:700;cursor:pointer;background:#fff;color:#555;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s;text-align:center}
        .g-Raw{background:#0D0D0D;color:#fff;border-color:#0D0D0D}
        .g-PSA{background:#002FA7;color:#fff;border-color:#002FA7}
        .g-BGS{background:#C41E3A;color:#fff;border-color:#C41E3A}
        .g-SGC{background:#1A6B2A;color:#fff;border-color:#1A6B2A}
        .score-row{display:flex;flex-wrap:wrap;gap:4px}
        .score-btn{padding:4px 8px;border-radius:5px;border:1px solid #EFEFEF;font-size:11px;font-weight:700;cursor:pointer;background:#fff;color:#555;font-family:'Plus Jakarta Sans',sans-serif;transition:all .1s}
        .score-btn.sel{background:#1B6FF0;color:#fff;border-color:#1B6FF0}
        .form-actions{display:flex;gap:8px}
        .form-actions .btn{flex:1;justify-content:center;border-radius:12px;padding:11px}
        .pop-bars{display:flex;flex-direction:column;gap:7px;margin-top:12px}
        .pop-row{display:flex;align-items:center;gap:10px}
        .pop-lbl{font-size:11px;font-weight:700;color:#555;width:32px;flex-shrink:0}
        .pop-track{flex:1;height:7px;background:#EFEFEF;border-radius:10px;overflow:hidden}
        .pop-fill{height:100%;border-radius:10px}
        .pop-count{font-size:11px;font-weight:700;color:#555;width:36px;text-align:right;flex-shrink:0}
        .details-table{width:100%;border-collapse:collapse}
        .details-table tr{border-bottom:1px solid #EFEFEF}
        .details-table tr:last-child{border-bottom:none}
        .details-table td{padding:10px 18px;font-size:13.5px}
        .details-table td:first-child{color:#555;font-weight:500;width:42%}
        .details-table td:last-child{font-weight:600;color:#0D0D0D}
        .details-table tr:nth-child(odd) td{background:#F7F7F7}
        .star-bars{margin-top:10px;display:flex;flex-direction:column;gap:5px}
        .star-row{display:flex;align-items:center;gap:8px;font-size:11px;color:#555}
        .star-track{flex:1;height:4px;background:#EFEFEF;border-radius:10px;overflow:hidden}
        .star-fill{height:100%;background:#FBBF24;border-radius:10px}
        .toast{position:fixed;bottom:24px;right:24px;z-index:999;background:#0D0D0D;color:#fff;border-radius:14px;padding:12px 18px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toastIn .3s cubic-bezier(.34,1.56,.64,1);max-width:320px}
        @keyframes toastIn{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}
        @media(max-width:960px){.page-grid{grid-template-columns:1fr}.right-col{position:static}.related-grid{grid-template-columns:1fr 1fr}}
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a className="nav-logo" href="/"><div className="nav-logo-icon">🃏</div>FoilCase</a>
          <ul className="nav-links">
            <li><a href="/browse">Browse</a></li>
            <li><a href="/collection">My Collection</a></li>
            <li><a href="/search">Search</a></li>
          </ul>
          <div className="nav-actions">
            <a className="btn btn-ghost" href="#">Log in</a>
            <a className="btn btn-primary" href="#">Get started free</a>
          </div>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-inner">
          <a href="/">Home</a><span>›</span>
          <a href="/browse">Browse</a><span>›</span>
          <a href="/browse">Football</a><span>›</span>
          <a href="/browse">Panini</a><span>›</span>
          <a href="/browse">2024 Prizm Football</a><span>›</span>
          <span style={{color:'#0D0D0D',fontWeight:500}}>Patrick Mahomes Silver Prizm</span>
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="page-body">
        <div className="page-grid">

          {/* LEFT COLUMN */}
          <div className="left-col">

            {/* Card Visual */}
            <div className="panel">
              <div className="card-stage" onClick={() => setFlipped(f => !f)}>
                <div className="card-3d">
                  <div className={`card-inner${flipped?' flipped':''}`}>
                    <div className="card-face">
                      <div className="card-front-bg">
                        <div className="foil-sweep"></div>
                        <div className="foil-sweep-2"></div>
                        <div className="card-year-brand">2024 · Panini Prizm</div>
                        <div className="card-serial">#200 · {currentParallel.name}</div>
                        <div className="card-player-emoji">🏈</div>
                        <div className="card-name-area">
                          <div className="card-name">Patrick Mahomes II</div>
                          <div className="card-team">Kansas City Chiefs · QB</div>
                        </div>
                        <div className="prismatic-bar"></div>
                      </div>
                    </div>
                    <div className="card-back-face">
                      <div className="card-back-bg">
                        <div className="back-logo">FoilCase</div>
                        <div className="back-stats">
                          {[
                            ['Set','2024 Panini Prizm Football'],
                            ['Card #','#200'],
                            ['Parallel',currentParallel.name],
                            ['Print Run',currentParallel.run],
                            ['Team','Kansas City Chiefs'],
                            ['Position','Quarterback'],
                          ].map(([k,v]) => (
                            <div className="back-row" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
                          ))}
                        </div>
                        <div className="back-barcode"></div>
                        <div className="back-cert">FOILCASE DATABASE · CERT #FC-2024-PM200-SP</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flip-hint">↻ Click to flip</div>
              </div>
              <div className="thumbs">
                {parallels.slice(0,5).map((p,i) => (
                  <div
                    key={p.name}
                    className={`thumb${activeParallel===i?' on':''}`}
                    onClick={() => setActiveParallel(i)}
                  >{p.name.split(' ')[0]}<br/>{p.run}</div>
                ))}
              </div>
            </div>

            {/* Price Chart */}
            <div className="panel panel-pad">
              <div className="panel-header">
                <div className="panel-title">Price History</div>
                <div className="range-tabs">
                  {['7d','30d','90d','1y','all'].map(r => (
                    <button key={r} className={`range-tab${activeRange===r?' on':''}`} onClick={() => setActiveRange(r)}>
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="chart-area">
                <svg className="chart-svg" viewBox="0 0 600 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1B6FF0" stopOpacity=".5"/>
                      <stop offset="100%" stopColor="#1B6FF0" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <line className="chart-grid" x1="0" y1="20" x2="600" y2="20"/>
                  <line className="chart-grid" x1="0" y1="55" x2="600" y2="55"/>
                  <line className="chart-grid" x1="0" y1="90" x2="600" y2="90"/>
                  <path className="chart-area-fill" d={cd.area}/>
                  <path className="chart-line" d={cd.path}/>
                  <circle className="chart-dot" cx="570" cy="25" r="4.5" style={{fill:'#1B6FF0',stroke:'#fff'}}/>
                  <text className="chart-xlab" x="50" y="116" textAnchor="middle">Start</text>
                  <text className="chart-xlab" x="300" y="116" textAnchor="middle">Mid</text>
                  <text className="chart-xlab" x="570" y="116" textAnchor="middle">Today</text>
                </svg>
              </div>
              <div className="chart-stat-row">
                {[
                  {val:'$340',lbl:'Current',color:'#00A861'},
                  {val:cd.low,lbl:'Low',color:'#0D0D0D'},
                  {val:cd.high,lbl:'High',color:'#0D0D0D'},
                  {val:cd.change,lbl:'Change',color:'#00A861'},
                  {val:cd.avg,lbl:'Avg Sale',color:'#0D0D0D'},
                  {val:String(cd.sales),lbl:'Sales',color:'#0D0D0D'},
                ].map(s => (
                  <div className="chart-stat" key={s.lbl}>
                    <div className="chart-stat-val" style={{color:s.color}}>{s.val}</div>
                    <div className="chart-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sold Listings */}
            <div className="panel panel-pad">
              <div className="panel-header">
                <div className="panel-title">Recent Sold Listings</div>
                <a href="#" style={{fontSize:'13px',fontWeight:600,color:'#1B6FF0',textDecoration:'none'}}>View all on eBay →</a>
              </div>
              <div className="sold-list">
                {soldListings.map((s,i) => (
                  <div className="sold-item" key={i}>
                    <div className="sold-platform">{s.platform}</div>
                    <div className="sold-desc">
                      <div className="sold-title">{s.title}</div>
                      <div className="sold-meta">{s.meta}</div>
                    </div>
                    <div>
                      <span className="sold-price">{s.price}</span>
                      <span className="sold-badge" style={{background:s.badgeBg,color:s.badgeColor}}>{s.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Cards */}
            <div className="panel panel-pad">
              <div className="panel-header">
                <div className="panel-title">More Mahomes Cards</div>
                <a href="/browse" style={{fontSize:'13px',fontWeight:600,color:'#1B6FF0',textDecoration:'none'}}>Browse all →</a>
              </div>
              <div className="related-grid">
                {relatedCards.map((c,i) => (
                  <div className="related-card" key={i}>
                    <div className="rc-img" style={{background:c.bg}}>{c.emoji}</div>
                    <div className="rc-body">
                      <div className="rc-player">{c.player}</div>
                      <div className="rc-set">{c.set}</div>
                      <div className="rc-price">{c.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col">

            {/* Main Info Panel */}
            <div className="panel">
              <div className="info-panel-top">
                <div style={{display:'flex',alignItems:'center',gap:'6px',flexWrap:'wrap'}}>
                  <span className="cbadge" style={{background:'#EFF6FF',color:'#1D4ED8'}}>🏈 Football</span>
                  <span className="cbadge" style={{background:'#F7F7F7',color:'#555'}}>Panini</span>
                  <span className="cbadge" style={{background:'#F7F7F7',color:'#555'}}>2024</span>
                  <span className="cbadge" style={{background:'linear-gradient(135deg,#38BDF8,#E879F9)',color:'#fff',fontSize:'10px'}}>✦ Prizm</span>
                  <span className="cbadge" style={{background:'#F5F3FF',color:'#7C3AED'}}>#200</span>
                </div>
                <div className="card-title">Patrick Mahomes II</div>
                <div className="card-subtitle">2024 Panini Prizm Football · {currentParallel.name} · Chiefs QB</div>

                {/* Price Block */}
                <div className="price-block">
                  <div style={{flex:1}}>
                    <div style={{fontSize:'10px',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#9A9A9A',marginBottom:'3px'}}>Market Value</div>
                    <div className="price-val">{currentParallel.price}</div>
                    <div className="price-change pos">↑ +$155 (84%) in 30 days</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'6px',textAlign:'right'}}>
                    <div><div style={{fontSize:'10px',color:'#9A9A9A',fontWeight:600,textTransform:'uppercase'}}>Low (raw)</div><div style={{fontSize:'13px',fontWeight:700}}>$185</div></div>
                    <div><div style={{fontSize:'10px',color:'#9A9A9A',fontWeight:600,textTransform:'uppercase'}}>High (PSA 10)</div><div style={{fontSize:'13px',fontWeight:700}}>$380</div></div>
                  </div>
                </div>

                {/* Parallel Selector */}
                <div style={{marginBottom:'16px'}}>
                  <div className="section-label">Parallel / Variant</div>
                  <div className="parallel-grid">
                    {parallels.map((p,i) => (
                      <button
                        key={p.name}
                        className={`parallel-opt${activeParallel===i?' sel':''}`}
                        onClick={() => setActiveParallel(i)}
                      >{p.name}<span className="parallel-run">{p.run}</span></button>
                    ))}
                  </div>
                </div>

                {/* Quick Attrs */}
                <div className="attrs-grid">
                  {[
                    {lbl:'Card Type',val:'Base Card'},
                    {lbl:'Print Run',val:currentParallel.run},
                    {lbl:'Surface',val:'Chrome Prizm'},
                    {lbl:'PSA Pop 10',val:'1,842'},
                    {lbl:'Collectors',val:'3,241'},
                    {lbl:'Release',val:'Oct 2024'},
                  ].map(a => (
                    <div className="attr-item" key={a.lbl}>
                      <div className="attr-lbl">{a.lbl}</div>
                      <div className="attr-val">{a.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cta-block">
                {/* Collectors bar */}
                <div className="collectors-bar">
                  <div className="col-avatars">
                    {['#1B6FF0','#059669','#7C3AED','#D97706'].map((c,i) => (
                      <div key={i} className="col-av" style={{background:c}}>{['TK','MR','JS','AL'][i]}</div>
                    ))}
                  </div>
                  <div className="collectors-text">3,241 collectors have this</div>
                  <a style={{fontSize:'12px',fontWeight:700,color:'#059669',cursor:'pointer'}}>See who →</a>
                </div>

                {/* Main CTA */}
                <div className="cta-row">
                  {saved ? (
                    <button className="btn btn-green btn-lg" style={{flex:1,justifyContent:'center'}} disabled>✓ In Your Vault</button>
                  ) : (
                    <button
                      className="btn btn-primary btn-lg"
                      style={{flex:1,justifyContent:'center'}}
                      onClick={() => setVaultOpen(v => !v)}
                    >{vaultOpen ? '↑ Collapse' : '+ Add to My Vault'}</button>
                  )}
                  <div
                    className={`icon-btn${wishlisted?' active':''}`}
                    onClick={() => { setWishlisted(w=>!w); showToast(wishlisted?'Removed from wishlist':'⭐ Added to wishlist!') }}
                    title="Wishlist"
                  >{wishlisted?'★':'⭐'}</div>
                  <div className="icon-btn" title="Share">🔗</div>
                </div>

                {/* Vault Form */}
                {vaultOpen && (
                  <div className="vault-form">
                    <div style={{fontSize:'13px',fontWeight:700,color:'#0D0D0D'}}>Card Details for Your Vault</div>

                    <div>
                      <div className="form-label" style={{marginBottom:'6px'}}>Grading</div>
                      <div className="grader-row">
                        {['Raw','PSA','BGS','SGC'].map(g => (
                          <button
                            key={g}
                            className={`grader-btn${form.grader===g?' g-'+g:''}`}
                            onClick={() => setForm(f => ({...f, grader:g, score:''}))}
                          >{g==='Raw'?'Ungraded':g}</button>
                        ))}
                      </div>
                    </div>

                    {form.grader !== 'Raw' && (
                      <div>
                        <div className="form-label" style={{marginBottom:'6px'}}>Grade Score</div>
                        <div className="score-row">
                          {gradeScores(form.grader).map(s => (
                            <button
                              key={s}
                              className={`score-btn${form.score===s?' sel':''}`}
                              onClick={() => setForm(f => ({...f, score:s}))}
                            >{s}</button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Condition</label>
                        <select className="form-select" value={form.condition} onChange={e=>setForm(f=>({...f,condition:e.target.value}))}>
                          {['Near Mint-Mint (NM-MT)','Near Mint (NM)','Mint (M)','Excellent-Mint (EX-MT)','Excellent (EX)'].map(c=><option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Quantity</label>
                        <input className="form-input" type="number" min="1" value={form.qty} onChange={e=>setForm(f=>({...f,qty:e.target.value}))}/>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Cost Paid ($)</label>
                        <input className="form-input" type="number" placeholder="e.g. 220" value={form.cost} onChange={e=>setForm(f=>({...f,cost:e.target.value}))}/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Value ($)</label>
                        <input className="form-input" type="number" value={form.value} onChange={e=>setForm(f=>({...f,value:e.target.value}))}/>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Status</label>
                        <select className="form-select" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
                          <option value="have">In My Vault</option>
                          <option value="trade">For Trade</option>
                          <option value="wishlist">Wishlist</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Folder</label>
                        <select className="form-select" value={form.folder} onChange={e=>setForm(f=>({...f,folder:e.target.value}))}>
                          <option value="">No folder</option>
                          <option value="f1">🌟 Rookie Cards</option>
                          <option value="f2">👑 Grail Collection</option>
                          <option value="f3">📁 For Trade</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Notes</label>
                      <input className="form-input" placeholder="e.g. Pulled from hobby box..." value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/>
                    </div>

                    <div className="form-actions">
                      <button className="btn btn-outline" onClick={() => setVaultOpen(false)}>Cancel</button>
                      <button className="btn btn-primary" style={{flex:2}} onClick={saveToVault}>✓ Save to Vault</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PSA Pop Report */}
            <div className="panel panel-pad">
              <div className="panel-header">
                <div className="panel-title">PSA Pop Report</div>
                <span style={{fontSize:'12px',color:'#9A9A9A'}}>Total: 24,810</span>
              </div>
              <div className="pop-bars">
                {[
                  {grade:'10',pct:8,count:'1,842',color:'#059669'},
                  {grade:'9', pct:52,count:'12,901',color:'#1B6FF0'},
                  {grade:'8', pct:28,count:'6,842',color:'#7C3AED'},
                  {grade:'7', pct:9, count:'2,210',color:'#D97706'},
                  {grade:'≤6',pct:4, count:'1,015',color:'#D93025'},
                ].map(p => (
                  <div className="pop-row" key={p.grade}>
                    <span className="pop-lbl">{p.grade}</span>
                    <div className="pop-track"><div className="pop-fill" style={{width:`${p.pct}%`,background:p.color}}></div></div>
                    <span className="pop-count">{p.count}</span>
                  </div>
                ))}
              </div>
              <div style={{fontSize:'11.5px',color:'#9A9A9A',marginTop:'12px',lineHeight:1.6}}>
                PSA 10 = top <strong style={{color:'#0D0D0D'}}>7.4%</strong> of graded copies.
                A PSA 10 commands a <strong style={{color:'#00A861'}}>+67% premium</strong> over raw.
              </div>
            </div>

            {/* Card Details Table */}
            <div className="panel">
              <div style={{padding:'16px 18px 12px',borderBottom:'1px solid #EFEFEF'}}>
                <div className="panel-title">Card Details</div>
              </div>
              <table className="details-table">
                <tbody>
                  {[
                    ['Player','Patrick Mahomes II'],
                    ['Year','2024'],
                    ['Brand','Panini America'],
                    ['Set','Prizm Football'],
                    ['Card Number','#200'],
                    ['Parallel',currentParallel.name],
                    ['Print Run',currentParallel.run],
                    ['Surface','Chrome / Prizm Foil'],
                    ['Team','Kansas City Chiefs'],
                    ['Position','Quarterback (QB)'],
                    ['Sport','NFL Football'],
                    ['Rookie Card','No (2017 RC)'],
                    ['Autograph','No'],
                    ['Memorabilia','No'],
                    ['License','NFL NFLPA Licensed'],
                    ['Release Date','October 2024'],
                    ['Box Odds','1:1 (base set)'],
                  ].map(([k,v]) => (
                    <tr key={k}><td>{k}</td><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Community Rating */}
            <div className="panel panel-pad">
              <div className="panel-title" style={{marginBottom:'12px'}}>Community Rating</div>
              <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
                <div>
                  <div style={{fontSize:'36px',fontWeight:800,letterSpacing:'-1px'}}>9.1</div>
                  <div style={{color:'#FBBF24',fontSize:'16px',letterSpacing:'1px'}}>★★★★★</div>
                  <div style={{fontSize:'12px',color:'#9A9A9A',marginTop:'2px'}}>847 ratings</div>
                </div>
                <div className="star-bars" style={{flex:1}}>
                  {[{s:'5★',pct:72},{s:'4★',pct:18},{s:'3★',pct:7},{s:'2★',pct:2},{s:'1★',pct:1}].map(r=>(
                    <div className="star-row" key={r.s}>
                      <span style={{width:'20px'}}>{r.s}</span>
                      <div className="star-track"><div className="star-fill" style={{width:`${r.pct}%`}}></div></div>
                      <span>{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </>
  )
}