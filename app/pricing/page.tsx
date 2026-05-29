'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck, faXmark, faRocket, faLayerGroup, faChartLine,
  faFileExport, faFolder, faStar, faHeadset, faBolt, faTag,
} from '@fortawesome/free-solid-svg-icons'

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('https://formspree.io/f/xvzyqdye', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, subject: 'Collector tier waitlist signup' }),
      })
      setSubmitted(true)
      setEmail('')
    } catch {
      setSubmitted(true)
    }
  }

  const freeFeatures = [
    { label: 'Up to 100 cards in your vault', included: true },
    { label: 'Up to 3 folders', included: true },
    { label: 'Live eBay pricing and sold comps', included: true },
    { label: 'Public or private vault', included: true },
    { label: 'Card image uploads', included: true },
    { label: 'Community access — follow collectors', included: true },
    { label: 'Search across public vaults', included: true },
    { label: 'Market intelligence page', included: true },
    { label: 'CSV import/export', included: false },
    { label: 'Unlimited cards', included: false },
    { label: 'Unlimited folders', included: false },
    { label: 'Collection analytics', included: false },
    { label: 'Card value history tracking', included: false },
    { label: 'Collector badge on vault', included: false },
    { label: 'Priority support', included: false },
    { label: 'Early access to new features', included: false },
  ]

  const collectorFeatures = [
    { label: 'Unlimited cards in your vault', included: true },
    { label: 'Unlimited folders', included: true },
    { label: 'Live eBay pricing and sold comps', included: true },
    { label: 'Public or private vault', included: true },
    { label: 'Card image uploads', included: true },
    { label: 'Community access — follow collectors', included: true },
    { label: 'Search across public vaults', included: true },
    { label: 'Market intelligence page', included: true },
    { label: 'CSV import/export', included: true },
    { label: 'Collection analytics and insights', included: true },
    { label: 'Card value history tracking', included: true },
    { label: 'Collector badge on public vault', included: true },
    { label: 'Priority support', included: true },
    { label: 'Early access to new features', included: true },
  ]

  return (
    <>
      <style>{`
        .pricing-hero{background:#0D0D0D;padding:64px 24px;text-align:center;position:relative;overflow:hidden}
        .pricing-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .pricing-hero-inner{max-width:640px;margin:0 auto;position:relative;z-index:1}
        .pricing-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(27,111,240,.2);color:#7EB6FF;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:20px}
        .pricing-title{font-size:clamp(28px,5vw,46px);font-weight:800;color:#fff;letter-spacing:-1.5px;line-height:1.08;margin-bottom:16px}
        .pricing-title em{font-style:italic;color:#7EB6FF}
        .pricing-sub{font-size:16px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:32px}
        .billing-toggle{display:inline-flex;align-items:center;gap:12px;background:rgba(255,255,255,.1);border-radius:100px;padding:4px}
        .billing-btn{padding:8px 20px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s}
        .billing-btn.on{background:#fff;color:#0D0D0D}
        .billing-btn.off{background:transparent;color:rgba(255,255,255,.6)}
        .billing-save{display:inline-flex;align-items:center;padding:2px 8px;background:#00A861;color:#fff;font-size:11px;font-weight:700;border-radius:100px;margin-left:4px}
        .pricing-layout{max-width:960px;margin:0 auto;padding:48px 24px}
        .pricing-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:48px}
        .pricing-card{background:#fff;border:1px solid #EFEFEF;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .pricing-card.featured{border:2px solid #1B6FF0;box-shadow:0 8px 32px rgba(27,111,240,.15)}
        .pricing-card-header{padding:28px 28px 24px}
        .pricing-card-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;margin-bottom:12px}
        .badge-free{background:#F7F7F7;color:#555}
        .badge-collector{background:#EBF2FF;color:#1B6FF0}
        .badge-soon{background:#FEF3E2;color:#E8820C}
        .pricing-card-name{font-size:22px;font-weight:800;letter-spacing:-.5px;color:#0D0D0D;margin-bottom:6px}
        .pricing-card-desc{font-size:14px;color:#9A9A9A;line-height:1.5;margin-bottom:20px}
        .pricing-amount{display:flex;align-items:flex-end;gap:4px;margin-bottom:4px}
        .pricing-amount-num{font-size:42px;font-weight:800;color:#0D0D0D;letter-spacing:-2px;line-height:1}
        .pricing-amount-per{font-size:14px;color:#9A9A9A;margin-bottom:6px}
        .pricing-amount-save{font-size:12px;color:#00A861;font-weight:600;margin-bottom:16px}
        .pricing-cta{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px;border-radius:100px;font-size:14px;font-weight:700;cursor:pointer;border:none;font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s;text-decoration:none}
        .cta-free{background:#F7F7F7;color:#0D0D0D}
        .cta-free:hover{background:#EFEFEF}
        .cta-collector{background:#1B6FF0;color:#fff}
        .cta-collector:hover{background:#0A4DBF}
        .cta-waitlist{background:#0D0D0D;color:#fff}
        .cta-waitlist:hover{background:#333}
        .pricing-card-body{padding:0 28px 28px}
        .pricing-divider{border:none;border-top:1px solid #EFEFEF;margin:0 0 20px}
        .pricing-features{display:flex;flex-direction:column;gap:10px}
        .pricing-feature{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#555}
        .pricing-feature.included{color:#0D0D0D}
        .pricing-feature.excluded{color:#D8D8D8}
        .feature-icon{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-size:9px}
        .icon-check{background:#E6F9F0;color:#00A861}
        .icon-x{background:#F7F7F7;color:#D8D8D8}
        .waitlist-section{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:16px;padding:40px;text-align:center;margin-bottom:48px}
        .waitlist-title{font-size:22px;font-weight:800;letter-spacing:-.5px;color:#0D0D0D;margin-bottom:8px}
        .waitlist-sub{font-size:15px;color:#555;line-height:1.6;margin-bottom:24px}
        .waitlist-form{display:flex;gap:10px;max-width:440px;margin:0 auto}
        .waitlist-input{flex:1;padding:10px 16px;border:1.5px solid #EFEFEF;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:#0D0D0D;outline:none;transition:border-color .15s}
        .waitlist-input:focus{border-color:#1B6FF0}
        .waitlist-input::placeholder{color:#9A9A9A}
        .waitlist-btn{padding:10px 24px;border-radius:100px;background:#1B6FF0;color:#fff;border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .15s;white-space:nowrap}
        .waitlist-btn:hover{background:#0A4DBF}
        .faq-section{margin-bottom:48px}
        .faq-title{font-size:22px;font-weight:800;letter-spacing:-.5px;color:#0D0D0D;margin-bottom:24px;text-align:center}
        .faq-grid{display:flex;flex-direction:column;gap:12px}
        .faq-item{background:#fff;border:1px solid #EFEFEF;border-radius:10px;padding:20px 24px}
        .faq-q{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:8px}
        .faq-a{font-size:14px;color:#555;line-height:1.7}
        .faq-a a{color:#1B6FF0;text-decoration:none}
        .faq-a a:hover{text-decoration:underline}
        @media(max-width:680px){.pricing-grid{grid-template-columns:1fr}.waitlist-form{flex-direction:column}}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="pricing-hero">
        <div className="pricing-hero-inner">
          <div className="pricing-eyebrow">
            <FontAwesomeIcon icon={faTag}/>Pricing
          </div>
          <h1 className="pricing-title">Simple pricing for <em>serious collectors</em></h1>
          <p className="pricing-sub">Start free and upgrade when you're ready. No hidden fees, no surprises.</p>

          {/* Billing toggle */}
          <div className="billing-toggle">
            <button className={`billing-btn${!annual?' on':' off'}`} onClick={() => setAnnual(false)}>Monthly</button>
            <button className={`billing-btn${annual?' on':' off'}`} onClick={() => setAnnual(true)}>
              Annual <span className="billing-save">Save 33%</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="pricing-layout">
        <div className="pricing-grid">

          {/* FREE */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <div className="pricing-card-badge badge-free">
                <FontAwesomeIcon icon={faBolt} style={{fontSize:'9px'}}/>Free
              </div>
              <div className="pricing-card-name">Free</div>
              <div className="pricing-card-desc">Everything you need to start tracking your collection.</div>
              <div className="pricing-amount">
                <div className="pricing-amount-num">$0</div>
                <div className="pricing-amount-per">/month</div>
              </div>
              <div style={{fontSize:'12px',color:'#9A9A9A',marginBottom:'16px'}}>Free forever — no credit card required</div>
              <Link href="/collection" className="pricing-cta cta-free">
                <FontAwesomeIcon icon={faRocket}/>Start your free vault
              </Link>
            </div>
            <div className="pricing-card-body">
              <hr className="pricing-divider"/>
              <div className="pricing-features">
                {freeFeatures.map(f => (
                  <div key={f.label} className={`pricing-feature${f.included?' included':' excluded'}`}>
                    <div className={`feature-icon${f.included?' icon-check':' icon-x'}`}>
                      <FontAwesomeIcon icon={f.included ? faCheck : faXmark}/>
                    </div>
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLLECTOR */}
          <div className="pricing-card featured">
            <div className="pricing-card-header">
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}>
                <div className="pricing-card-badge badge-collector" style={{margin:0}}>
                  <FontAwesomeIcon icon={faStar} style={{fontSize:'9px'}}/>Collector
                </div>
                <div className="pricing-card-badge badge-soon" style={{margin:0}}>
                  Coming Soon
                </div>
              </div>
              <div className="pricing-card-name">Collector</div>
              <div className="pricing-card-desc">For serious collectors who want unlimited tracking and deep insights.</div>
              <div className="pricing-amount">
                <div className="pricing-amount-num" style={{color:'#1B6FF0'}}>
                  {annual ? '$3.33' : '$4.99'}
                </div>
                <div className="pricing-amount-per">/month</div>
              </div>
              {annual ? (
                <div className="pricing-amount-save">$39.99/year — you save $19.89</div>
              ) : (
                <div style={{fontSize:'12px',color:'#9A9A9A',marginBottom:'16px'}}>or $39.99/year and save 33%</div>
              )}
              <button
  className="pricing-cta cta-waitlist"
  style={{border:'none',width:'100%'}}
  onClick={() => document.getElementById('waitlist')?.scrollIntoView({behavior:'smooth'})}
>
  <FontAwesomeIcon icon={faStar}/>Join the waitlist
</button>
            </div>
            <div className="pricing-card-body">
              <hr className="pricing-divider"/>
              <div className="pricing-features">
                {collectorFeatures.map(f => (
                  <div key={f.label} className="pricing-feature included">
                    <div className="feature-icon icon-check">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* WAITLIST */}
        <div className="waitlist-section" id="waitlist" style={{scrollMarginTop:'80px'}}>
          {submitted ? (
            <>
              <div style={{fontSize:'32px',marginBottom:'12px'}}>🎉</div>
              <div className="waitlist-title">You're on the list!</div>
              <p className="waitlist-sub">We'll email you as soon as the Collector tier launches. Thanks for your interest in supporting foilcase.</p>
            </>
          ) : (
            <>
              <div className="pricing-card-badge badge-collector" style={{marginBottom:'16px',display:'inline-flex'}}>
                <FontAwesomeIcon icon={faStar} style={{fontSize:'9px'}}/>Collector tier — coming soon
              </div>
              <div className="waitlist-title">Be first to know when Collector launches</div>
              <p className="waitlist-sub">Join the waitlist and we'll notify you the moment the Collector tier is available. Early waitlist members will receive a special launch discount.</p>
              <form className="waitlist-form" onSubmit={handleWaitlist}>
                <input
                  className="waitlist-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="waitlist-btn">Join waitlist</button>
              </form>
            </>
          )}
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <div className="faq-title">Frequently asked questions</div>
          <div className="faq-grid">
            {[
              {
                q: 'Is the free tier really free forever?',
                a: 'Yes — the free tier is free forever. No credit card is required to sign up and we will never charge you for the free tier features.',
              },
              {
                q: 'What happens if I reach the 100 card limit on the free tier?',
                a: 'You will receive a warning when you are approaching the 100 card limit. Once you reach the limit you will not be able to add new cards until you either remove existing cards or upgrade to the Collector tier. Your existing cards and data will never be deleted.',
              },
              {
                q: 'When will the Collector tier launch?',
                a: 'We are actively developing the Collector tier features including CSV import/export, collection analytics, and unlimited cards. Join the waitlist above and we will notify you the moment it launches.',
              },
              {
                q: 'Can I cancel my Collector subscription at any time?',
                a: 'Yes — you can cancel your Collector subscription at any time. Monthly subscribers can cancel before their next billing date. Annual subscribers can cancel and will retain access until the end of their paid year.',
              },
              {
                q: 'What payment methods will you accept?',
                a: 'We plan to accept all major credit and debit cards through Stripe, a secure payment processor. We may add additional payment methods based on user demand.',
              },
              {
                q: 'Will my data be safe if I downgrade from Collector to Free?',
                a: 'Yes — your data is always safe. If you downgrade from Collector to Free your cards and collection data will be preserved. However you will not be able to add new cards beyond the 100 card free tier limit until you upgrade again.',
              },
            ].map(faq => (
              <div key={faq.q} className="faq-item">
                <div className="faq-q">{faq.q}</div>
                <div className="faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}