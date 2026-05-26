'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGift, faCalendar, faTrophy, faChevronRight,
  faCircleCheck, faHourglassHalf, faClock, faArrowUpRightFromSquare,
  faStar, faShield,
} from '@fortawesome/free-solid-svg-icons'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  open:     { label: 'Open — Enter Now',      color: '#00A861', bg: '#E6F9F0', icon: faCircleCheck },
  closed:   { label: 'Closed — Drawing Soon', color: '#E8820C', bg: '#FEF3E2', icon: faHourglassHalf },
  announced:{ label: 'Winner Announced',       color: '#7B4FCA', bg: '#F2ECFB', icon: faTrophy },
  coming:   { label: 'Coming Soon',            color: '#9A9A9A', bg: '#F7F7F7', icon: faClock },
}

const giveaways = [
  {
    id: 'june-2026',
    month: 'June 2026',
    status: 'open',
    card: {
      player: 'TBD — Card Reveal Coming Soon',
      year: '2026',
      brand: 'TBD',
      set: 'TBD',
      grade: null,
      value: 'TBD',
      image: null,
      sport: 'Football',
    },
    drawingDate: 'June 30, 2026',
    entriesCloseDate: 'June 28, 2026',
    entryFormUrl: 'https://formspree.io/f/xvzyqdye',
    winner: null,
    embedUrl: null,
  },
]

const navItems = [
  { id: 'how-to-enter', label: 'How to Enter' },
  { id: 'current',      label: 'Current Giveaway' },
  { id: 'past',         label: 'Past Giveaways' },
  { id: 'rules',        label: 'Rules & Eligibility' },
]

type FormData = { name: string; email: string; foilcase: string; instagram: string; hasCards: boolean }

type GiveawayCardProps = {
  g: typeof giveaways[0]
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  submitting: boolean
  submitted: boolean
  submitError: boolean
  handleSubmit: (e: React.FormEvent) => void
  setActiveSection: (s: string) => void
}

const GiveawayCard = ({ g, formData, setFormData, submitting, submitted, submitError, handleSubmit, setActiveSection }: GiveawayCardProps) => {
  const status = STATUS_CONFIG[g.status]
  return (
    <div style={{background:'#fff',border:'1px solid #EFEFEF',borderRadius:'16px',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,.06)'}}>

      {/* Card header */}
      <div style={{padding:'16px 20px',borderBottom:'1px solid #EFEFEF',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontSize:'16px',fontWeight:800,letterSpacing:'-.3px',color:'#0D0D0D'}}>{g.month} Giveaway</div>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'4px 12px',borderRadius:'100px',background:status.bg,color:status.color,fontSize:'12px',fontWeight:700}}>
          <FontAwesomeIcon icon={status.icon} style={{fontSize:'10px'}}/>
          {status.label}
        </div>
      </div>

      {/* Card body */}
      <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:'0'}}>

        {/* Card image */}
        <div style={{background:'linear-gradient(135deg,#EBF2FF,#C5D8FF)',display:'flex',alignItems:'center',justifyContent:'center',minHeight:'240px',padding:'20px',borderRight:'1px solid #EFEFEF'}}>
          {g.card.image ? (
            <img src={g.card.image} alt={g.card.player} style={{width:'100%',borderRadius:'8px',boxShadow:'0 8px 24px rgba(0,0,0,.2)'}}/>
          ) : (
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'48px',marginBottom:'12px'}}>🃏</div>
              <div style={{fontSize:'12px',fontWeight:700,color:'#1B6FF0',textAlign:'center'}}>Card reveal<br/>coming soon</div>
            </div>
          )}
        </div>

        {/* Card details */}
        <div style={{padding:'20px',display:'flex',flexDirection:'column',gap:'16px'}}>

          {/* Card info */}
          <div>
            <div style={{fontSize:'20px',fontWeight:800,letterSpacing:'-.5px',color:'#0D0D0D',marginBottom:'4px'}}>{g.card.player}</div>
            <div style={{fontSize:'13px',color:'#9A9A9A'}}>
              {[g.card.year, g.card.brand, g.card.set].filter(v => v && v !== 'TBD').join(' ')}
            </div>
            <div style={{display:'flex',gap:'8px',marginTop:'8px',flexWrap:'wrap'}}>
              {g.card.grade && (
                <span style={{padding:'3px 10px',borderRadius:'100px',background:'#002FA7',color:'#fff',fontSize:'12px',fontWeight:700}}>{g.card.grade}</span>
              )}
              {g.card.value && g.card.value !== 'TBD' && (
                <span style={{padding:'3px 10px',borderRadius:'100px',background:'#E6F9F0',color:'#00A861',fontSize:'12px',fontWeight:700}}>Est. Value: {g.card.value}</span>
              )}
              <span style={{padding:'3px 10px',borderRadius:'100px',background:'#EBF2FF',color:'#1B6FF0',fontSize:'12px',fontWeight:700}}>{g.card.sport}</span>
            </div>
          </div>

          {/* Drawing info */}
          <div style={{display:'flex',flexDirection:'column',gap:'8px',padding:'14px',background:'#F7F7F7',borderRadius:'10px',border:'1px solid #EFEFEF'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'#555'}}>
              <FontAwesomeIcon icon={faCalendar} style={{color:'#1B6FF0',width:'14px'}}/>
              <span><strong style={{color:'#0D0D0D'}}>Drawing:</strong> {g.drawingDate}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'#555'}}>
              <FontAwesomeIcon icon={faClock} style={{color:'#E8820C',width:'14px'}}/>
              <span><strong style={{color:'#0D0D0D'}}>Entries close:</strong> {g.entriesCloseDate}</span>
            </div>
          </div>

          {/* Winner section */}
          <div style={{padding:'14px',background:g.winner?'#F2ECFB':'#F7F7F7',borderRadius:'10px',border:`1px solid ${g.winner?'#D4BAF0':'#EFEFEF'}`}}>
            <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:g.winner?'#7B4FCA':'#9A9A9A',marginBottom:'8px',display:'flex',alignItems:'center',gap:'6px'}}>
              <FontAwesomeIcon icon={faTrophy}/>Winner
            </div>
            {g.winner ? (
              <div style={{fontSize:'14px',fontWeight:600,color:'#0D0D0D'}}>{g.winner}</div>
            ) : g.status === 'open' || g.status === 'coming' ? (
              <div style={{fontSize:'13px',color:'#9A9A9A'}}>Drawing hasn't happened yet — enter for your chance to win!</div>
            ) : (
              <div style={{fontSize:'13px',color:'#9A9A9A'}}>Drawing pending — winner will be announced soon.</div>
            )}
            {g.embedUrl && (
              <div style={{marginTop:'12px',borderRadius:'8px',overflow:'hidden',aspectRatio:'16/9'}}>
                <iframe src={g.embedUrl} style={{width:'100%',height:'100%',border:'none'}} allowFullScreen/>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Entry form */}
      {g.status === 'open' && (
        <div style={{borderTop:'1px solid #EFEFEF',padding:'20px',background:'#F7F7F7'}}>
          <div style={{fontSize:'14px',fontWeight:700,color:'#0D0D0D',marginBottom:'16px',display:'flex',alignItems:'center',gap:'8px'}}>
            <FontAwesomeIcon icon={faGift} style={{color:'#1B6FF0'}}/>
            Enter this giveaway
          </div>
          {submitted ? (
            <div style={{textAlign:'center',padding:'24px',background:'#E6F9F0',borderRadius:'10px',border:'1px solid #A8DFC4'}}>
              <div style={{fontSize:'28px',marginBottom:'8px'}}>🎉</div>
              <div style={{fontSize:'15px',fontWeight:700,color:'#00A861',marginBottom:'4px'}}>You're entered!</div>
              <div style={{fontSize:'13px',color:'#555'}}>Good luck! We'll announce the winner on {g.drawingDate}.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'5px'}}>
                <label style={{fontSize:'11px',fontWeight:700,color:'#555',textTransform:'uppercase' as const,letterSpacing:'.06em'}}>Full Name *</label>
                <input
                  style={{padding:'9px 12px',border:'1.5px solid #EFEFEF',borderRadius:'6px',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',color:'#0D0D0D',outline:'none',background:'#fff'}}
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                  required
                />
              </div>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'5px'}}>
                <label style={{fontSize:'11px',fontWeight:700,color:'#555',textTransform:'uppercase' as const,letterSpacing:'.06em'}}>Email Address *</label>
                <input
                  type="email"
                  style={{padding:'9px 12px',border:'1.5px solid #EFEFEF',borderRadius:'6px',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',color:'#0D0D0D',outline:'none',background:'#fff'}}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                  required
                />
              </div>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'5px'}}>
                <label style={{fontSize:'11px',fontWeight:700,color:'#555',textTransform:'uppercase' as const,letterSpacing:'.06em'}}>Foilcase Username *</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',fontSize:'14px',color:'#9A9A9A',fontWeight:600}}>@</span>
                  <input
                    style={{width:'100%',padding:'9px 12px 9px 28px',border:'1.5px solid #EFEFEF',borderRadius:'6px',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',color:'#0D0D0D',outline:'none',background:'#fff',boxSizing:'border-box' as const}}
                    placeholder="yourcollectorname"
                    value={formData.foilcase}
                    onChange={e => setFormData(p => ({...p, foilcase: e.target.value}))}
                    required
                  />
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'5px'}}>
                <label style={{fontSize:'11px',fontWeight:700,color:'#555',textTransform:'uppercase' as const,letterSpacing:'.06em'}}>Instagram Handle <span style={{color:'#9A9A9A',fontWeight:400,textTransform:'none' as const}}>(optional)</span></label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',fontSize:'14px',color:'#9A9A9A',fontWeight:600}}>@</span>
                  <input
                    style={{width:'100%',padding:'9px 12px 9px 28px',border:'1.5px solid #EFEFEF',borderRadius:'6px',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',color:'#0D0D0D',outline:'none',background:'#fff',boxSizing:'border-box' as const}}
                    placeholder="yourinstagram"
                    value={formData.instagram}
                    onChange={e => setFormData(p => ({...p, instagram: e.target.value}))}
                  />
                </div>
              </div>
              <div style={{gridColumn:'1/-1',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:'10px'}}>
                <div style={{fontSize:'12px',color:'#9A9A9A',lineHeight:1.5}}>
                  By entering you confirm you have read and agree to the <a href="#rules" onClick={()=>setActiveSection('rules')} style={{color:'#1B6FF0',textDecoration:'none'}}>giveaway rules</a>. One entry per person.
                </div>
                <div style={{width:'100%',display:'flex',alignItems:'flex-start',gap:'10px',padding:'14px',background:'#EBF2FF',borderRadius:'8px',border:'1px solid #C5D8FF'}}>
                  <input
                    type="checkbox"
                    id="hasCards"
                    checked={formData.hasCards}
                    onChange={e => setFormData(p => ({...p, hasCards: e.target.checked}))}
                    style={{width:'16px',height:'16px',marginTop:'2px',flexShrink:0,cursor:'pointer',accentColor:'#1B6FF0'}}
                    required
                  />
                  <label htmlFor="hasCards" style={{fontSize:'13px',color:'#1B6FF0',fontWeight:600,lineHeight:1.5,cursor:'pointer'}}>
                    I confirm my public vault has at least 5 cards.{' '}
                    {formData.foilcase && (
                      <a
                        href={`https://foilcase.com/vault/${formData.foilcase}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{color:'#1B6FF0',textDecoration:'underline'}}
                      >
                        View my vault →
                      </a>
                    )}
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={submitting || !formData.hasCards}
                  style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'10px 24px',borderRadius:'100px',background:'#1B6FF0',color:'#fff',border:'none',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'14px',fontWeight:700,cursor:submitting?'not-allowed':'pointer',opacity:submitting?0.7:1,transition:'all .15s'}}
                >
                  <FontAwesomeIcon icon={faGift}/>
                  {submitting ? 'Submitting...' : 'Enter giveaway'}
                </button>
              </div>
              {submitError && (
                <div style={{gridColumn:'1/-1',fontSize:'13px',color:'#D93025',padding:'8px 12px',background:'#FDECEA',borderRadius:'6px'}}>
                  Something went wrong. Please try again or email hello@foilcase.com.
                </div>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default function Giveaway() {
  const [activeSection, setActiveSection] = useState('current')
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', foilcase: '', instagram: '', hasCards: false })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const currentGiveaway = giveaways[0]
  const pastGiveaways = giveaways.slice(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.foilcase) return
    setSubmitting(true)
    setSubmitError(false)
    try {
      await fetch(currentGiveaway.entryFormUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          subject: `Giveaway Entry — ${currentGiveaway.month}`,
          name: formData.name,
          email: formData.email,
          foilcase_username: formData.foilcase,
          instagram_handle: formData.instagram,
          giveaway: currentGiveaway.month,
          confirmed_5_cards: formData.hasCards,
        }),
      })
      setSubmitted(true)
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        .giveaway-hero{background:#0D0D0D;padding:64px 24px;text-align:center;position:relative;overflow:hidden}
        .giveaway-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .giveaway-hero-inner{max-width:640px;margin:0 auto;position:relative;z-index:1}
        .giveaway-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(27,111,240,.2);color:#7EB6FF;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:20px}
        .giveaway-title{font-size:clamp(28px,5vw,46px);font-weight:800;color:#fff;letter-spacing:-1.5px;line-height:1.08;margin-bottom:16px}
        .giveaway-title em{font-style:italic;color:#7EB6FF}
        .giveaway-sub{font-size:16px;color:rgba(255,255,255,.6);line-height:1.7}
        .giveaway-layout{max-width:1100px;margin:0 auto;padding:40px 24px;display:grid;grid-template-columns:220px 1fr;gap:28px;align-items:start}
        .giveaway-nav{background:#fff;border:1px solid #EFEFEF;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06);position:sticky;top:78px}
        .giveaway-nav-item{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 16px;font-size:13px;font-weight:600;color:#555;cursor:pointer;border-left:2px solid transparent;transition:all .15s}
        .giveaway-nav-item:hover{background:#F7F7F7;color:#0D0D0D}
        .giveaway-nav-item.active{color:#1B6FF0;background:#EBF2FF;border-left-color:#1B6FF0}
        .giveaway-content{display:flex;flex-direction:column;gap:28px}
        .section-title{font-size:22px;font-weight:800;letter-spacing:-.5px;color:#0D0D0D;margin-bottom:20px;display:flex;align-items:center;gap:10px}
        .how-to-step{display:flex;gap:16px;padding:20px;background:#fff;border:1px solid #EFEFEF;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);margin-bottom:12px}
        .how-to-num{width:36px;height:36px;border-radius:50%;background:#1B6FF0;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;flex-shrink:0}
        .how-to-body{flex:1}
        .how-to-title{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:4px}
        .how-to-desc{font-size:13px;color:#555;line-height:1.6}
        .rules-section{background:#fff;border:1px solid #EFEFEF;border-radius:12px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .rules-section h3{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:8px;margin-top:20px}
        .rules-section h3:first-child{margin-top:0}
        .rules-section p,.rules-section li{font-size:14px;color:#555;line-height:1.7}
        .rules-section ul{padding-left:20px;display:flex;flex-direction:column;gap:4px}
        .rules-section a{color:#1B6FF0;text-decoration:none}
        @media(max-width:768px){.giveaway-layout{grid-template-columns:1fr}.giveaway-nav{position:static}}
        @media(max-width:600px){.giveaway-card-grid{grid-template-columns:1fr!important}}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="giveaway-hero">
        <div className="giveaway-hero-inner">
          <div className="giveaway-eyebrow">
            <FontAwesomeIcon icon={faGift}/>Monthly Giveaways
          </div>
          <h1 className="giveaway-title">Win <em>free cards</em> every month</h1>
          <p className="giveaway-sub">Every month we give away a trading card to one lucky collector in the Foilcase community. Free to enter — no purchase necessary.</p>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="giveaway-layout">

        {/* LEFT NAV */}
        <aside className="giveaway-nav">
          {navItems.map(item => (
            <div
              key={item.id}
              className={`giveaway-nav-item${activeSection===item.id?' active':''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
              <FontAwesomeIcon icon={faChevronRight} style={{fontSize:'10px',opacity:.4}}/>
            </div>
          ))}
          <div style={{padding:'16px',borderTop:'1px solid #EFEFEF'}}>
            <div style={{fontSize:'11px',color:'#9A9A9A',lineHeight:1.5,textAlign:'center'}}>
              New giveaway every month. Follow us on Instagram to stay updated.
            </div>
            <a
              href="https://instagram.com/foilcase"
              target="_blank"
              rel="noopener noreferrer"
              style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',marginTop:'10px',padding:'8px',borderRadius:'8px',background:'#F7F7F7',border:'1px solid #EFEFEF',fontSize:'12px',fontWeight:600,color:'#0D0D0D',textDecoration:'none',transition:'all .15s'}}
            >
              @foilcase
            </a>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="giveaway-content">

          {/* HOW TO ENTER */}
          {activeSection === 'how-to-enter' && (
            <div>
              <div className="section-title">
                <FontAwesomeIcon icon={faGift} style={{color:'#1B6FF0'}}/>
                How to Enter
              </div>
              {[
                {
                  title: 'Create a free Foilcase vault',
                  desc: 'Sign up at foilcase.com and create your free collector vault. No credit card required — it takes less than 2 minutes.',
                  action: { label: 'Create your vault →', href: '/sign-up' },
                },
                {
                  title: 'Make your vault public',
                  desc: 'Go to Settings and toggle your vault to public. This lets us verify your entry and gives other collectors a chance to discover your collection.',
                  action: { label: 'Go to Settings →', href: '/settings' },
                },
                {
                  title: 'Follow @foilcase on Instagram',
                  desc: 'Follow our Instagram account to stay up to date on giveaway announcements, winner reveals, and new features.',
                  action: { label: 'Follow on Instagram →', href: 'https://instagram.com/foilcase' },
                },
                {
                  title: 'Submit your entry',
                  desc: 'Fill out the entry form on the Current Giveaway tab with your name, email, Foilcase username, and Instagram handle. One entry per person per giveaway.',
                  action: null,
                },
                {
                  title: 'Watch for the winner announcement',
                  desc: "Winners are selected by random drawing and announced on this page and on Instagram. If you win we'll contact you via email within 48 hours.",
                  action: null,
                },
              ].map((step, i) => (
                <div key={i} className="how-to-step">
                  <div className="how-to-num">{i + 1}</div>
                  <div className="how-to-body">
                    <div className="how-to-title">{step.title}</div>
                    <div className="how-to-desc">{step.desc}</div>
                    {step.action && (
                      <a
                        href={step.action.href}
                        style={{display:'inline-flex',alignItems:'center',gap:'4px',marginTop:'8px',fontSize:'12px',fontWeight:600,color:'#1B6FF0',textDecoration:'none'}}
                      >
                        {step.action.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CURRENT GIVEAWAY */}
          {activeSection === 'current' && (
            <div>
              <div className="section-title">
                <FontAwesomeIcon icon={faStar} style={{color:'#F5A623'}}/>
                Current Giveaway
              </div>
              <GiveawayCard
                g={currentGiveaway}
                formData={formData}
                setFormData={setFormData}
                submitting={submitting}
                submitted={submitted}
                submitError={submitError}
                handleSubmit={handleSubmit}
                setActiveSection={setActiveSection}
              />
            </div>
          )}

          {/* PAST GIVEAWAYS */}
          {activeSection === 'past' && (
            <div>
              <div className="section-title">
                <FontAwesomeIcon icon={faTrophy} style={{color:'#7B4FCA'}}/>
                Past Giveaways
              </div>
              {pastGiveaways.length === 0 ? (
                <div style={{background:'#fff',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'48px',textAlign:'center',boxShadow:'0 1px 3px rgba(0,0,0,.06)'}}>
                  <div style={{fontSize:'40px',marginBottom:'12px'}}>🏆</div>
                  <div style={{fontSize:'16px',fontWeight:700,color:'#0D0D0D',marginBottom:'6px'}}>No past giveaways yet</div>
                  <div style={{fontSize:'14px',color:'#9A9A9A'}}>Check back after our first drawing. Winners and card details will be archived here.</div>
                </div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                  {pastGiveaways.map(g => (
                    <GiveawayCard
                      key={g.id}
                      g={g}
                      formData={formData}
                      setFormData={setFormData}
                      submitting={submitting}
                      submitted={submitted}
                      submitError={submitError}
                      handleSubmit={handleSubmit}
                      setActiveSection={setActiveSection}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* RULES */}
          {activeSection === 'rules' && (
            <div id="rules">
              <div className="section-title">
                <FontAwesomeIcon icon={faShield} style={{color:'#1B6FF0'}}/>
                Rules & Eligibility
              </div>
              <div className="rules-section">
                <h3>No Purchase Necessary</h3>
                <p>No purchase or payment of any kind is necessary to enter or win the Foilcase Monthly Giveaway. A purchase will not increase your chances of winning.</p>

                <h3>Eligibility</h3>
                <ul>
                  <li>Open to legal residents of the United States, 18 years of age or older at the time of entry</li>
                  <li>Employees of Foilcase and their immediate family members are not eligible</li>
                  <li>Void where prohibited by law</li>
                  <li>A valid Foilcase account with a public vault is required to enter</li>
                </ul>

                <h3>How to Enter</h3>
                <p>To enter the monthly giveaway:</p>
                <ul>
                  <li>Create a free Foilcase account at foilcase.com</li>
                  <li>Make your vault public in Settings</li>
                  <li>Follow @foilcase on Instagram</li>
                  <li>Complete the entry form on this page with your name, email address, Foilcase username, and Instagram handle</li>
                  <li>Have at least 5 cards in your public Foilcase vault at the time of entry</li>
                </ul>
                <p>Limit one entry per person per monthly giveaway. Duplicate entries will be disqualified.</p>

                <h3>Winner Selection</h3>
                <p>One winner per month will be selected by random drawing from all valid entries received before the entry deadline. The drawing will be conducted by Foilcase and the results are final. The drawing will be recorded and posted on this page and on Instagram.</p>
                <p>Foilcase reserves the right to verify that winners meet all eligibility requirements including the minimum 5 card vault requirement before announcing winners. If a selected winner does not meet the requirements an alternate winner will be selected.</p>

                <h3>Prize</h3>
                <p>One trading card as specified on the Current Giveaway page. Approximate retail value varies by month. No cash alternative or substitution of prizes is permitted except at Foilcase's sole discretion. Prize is non-transferable.</p>

                <h3>Winner Notification</h3>
                <p>The winner will be notified by email within 48 hours of the drawing. The winner must respond within 5 business days to claim their prize. Failure to respond within this timeframe may result in forfeiture of the prize and selection of an alternate winner.</p>

                <h3>Prize Delivery</h3>
                <p>Prizes will be shipped within the United States only. Foilcase is not responsible for lost, late, or damaged shipments. A tracking number will be provided to the winner upon shipment.</p>

                <h3>Privacy</h3>
                <p>Entry information will be used solely for the purpose of administering the giveaway and will not be sold or shared with third parties. See our <a href="/privacy">Privacy Policy</a> for more information.</p>

                <h3>General Conditions</h3>
                <p>Foilcase reserves the right to cancel, suspend, or modify the giveaway at any time for any reason. By entering, participants agree to be bound by these official rules and the decisions of Foilcase, which are final and binding in all matters related to the giveaway.</p>

                <h3>Contact</h3>
                <p>For questions about the giveaway please contact us at <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}