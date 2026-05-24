'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function Contact() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus]   = useState<'idle'|'sending'|'success'|'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xvzyqdye', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setSubject(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        .contact-hero{background:#fff;border-bottom:1px solid #EFEFEF;padding:48px 24px}
        .contact-hero-inner{max-width:760px;margin:0 auto}
        .contact-eyebrow{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1B6FF0;margin-bottom:12px}
        .contact-title{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-1px;color:#0D0D0D;margin-bottom:8px}
        .contact-sub{font-size:15px;color:#555;line-height:1.7}
        .contact-layout{max-width:760px;margin:0 auto;padding:48px 24px;display:grid;grid-template-columns:1fr 2fr;gap:48px;align-items:start}
        .contact-info{display:flex;flex-direction:column;gap:24px}
        .contact-info-item{display:flex;flex-direction:column;gap:4px}
        .contact-info-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9A9A9A}
        .contact-info-value{font-size:14px;font-weight:600;color:#0D0D0D}
        .contact-info-desc{font-size:13px;color:#555;line-height:1.5}
        .contact-form{display:flex;flex-direction:column;gap:16px}
        .form-group{display:flex;flex-direction:column;gap:6px}
        .form-label{font-size:13px;font-weight:600;color:#0D0D0D}
        .form-input,.form-textarea{width:100%;padding:10px 14px;border:1.5px solid #EFEFEF;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:#0D0D0D;background:#fff;outline:none;transition:border-color .15s}
        .form-input:focus,.form-textarea:focus{border-color:#1B6FF0;box-shadow:0 0 0 3px rgba(27,111,240,.1)}
        .form-input::placeholder,.form-textarea::placeholder{color:#9A9A9A}
        .form-textarea{min-height:140px;resize:vertical}
        .submit-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border-radius:100px;background:#1B6FF0;color:#fff;border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .15s}
        .submit-btn:hover{background:#0A4DBF}
        .submit-btn:disabled{background:#9A9A9A;cursor:not-allowed}
        .success-card{background:#E6F9F0;border:1px solid #A8DFC4;border-radius:12px;padding:24px;display:flex;align-items:flex-start;gap:14px}
        .error-card{background:#FDECEA;border:1px solid #FFBBB7;border-radius:12px;padding:24px;display:flex;align-items:flex-start;gap:14px}
        @media(max-width:680px){.contact-layout{grid-template-columns:1fr}}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-eyebrow">Get in touch</div>
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-sub">Have a question, feedback, or just want to say hello? We'd love to hear from you.</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="contact-layout">

        {/* LEFT — contact info */}
        <div className="contact-info">
          <div className="contact-info-item">
            <div className="contact-info-label">Email</div>
            <div className="contact-info-value">hello@foilcase.com</div>
            <div className="contact-info-desc">We typically respond within 1-2 business days.</div>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-label">General</div>
            <div className="contact-info-desc">Questions about the platform, features, or your account.</div>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-label">Privacy</div>
            <div className="contact-info-desc">Data requests, privacy concerns, or account deletion.</div>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-label">Feedback</div>
            <div className="contact-info-desc">Feature requests, bug reports, or suggestions to improve foilcase.</div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div>
          {status === 'success' ? (
            <div className="success-card">
              <FontAwesomeIcon icon={faCheck} style={{color:'#00A861',fontSize:'20px',flexShrink:0,marginTop:'2px'}}/>
              <div>
                <div style={{fontSize:'16px',fontWeight:700,color:'#00A861',marginBottom:'4px'}}>Message sent!</div>
                <div style={{fontSize:'14px',color:'#555',lineHeight:1.6}}>Thanks for reaching out. We'll get back to you within 1-2 business days.</div>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="error-card">
                  <FontAwesomeIcon icon={faCircleExclamation} style={{color:'#D93025',fontSize:'20px',flexShrink:0,marginTop:'2px'}}/>
                  <div>
                    <div style={{fontSize:'15px',fontWeight:700,color:'#D93025',marginBottom:'4px'}}>Something went wrong</div>
                    <div style={{fontSize:'13px',color:'#555'}}>Please try again or email us directly at hello@foilcase.com</div>
                  </div>
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Name <span style={{color:'#D93025'}}>*</span></label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email <span style={{color:'#D93025'}}>*</span></label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="What's this about?"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message <span style={{color:'#D93025'}}>*</span></label>
                <textarea
                  className="form-textarea"
                  placeholder="Tell us what's on your mind..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={status === 'sending'}
              >
                <FontAwesomeIcon icon={faEnvelope}/>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}