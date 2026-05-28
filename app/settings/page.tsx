'use client'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '../lib/supabase'
import Nav from '../components/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser, faLock, faGlobe, faCheck, faXmark, faLayerGroup,
  faPen, faShield,
} from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer'
import { ebayUserUrl } from '../lib/ebay'

export default function Settings() {
  const { user, isLoaded } = useUser()
  const [username, setUsername]       = useState('')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio]                 = useState('')
  const [isPublic, setIsPublic]       = useState(false)
  const [loading, setLoading]         = useState(true)
  const [saving, setSaving]           = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean|null>(null)
  const [checkingUsername, setCheckingUsername]   = useState(false)
  const [originalUsername, setOriginalUsername]   = useState('')
  const [toast, setToast]             = useState<string|null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800) }

useEffect(() => {
  if (isLoaded && user) loadProfile()
}, [isLoaded, user?.id])

  const loadProfile = async () => {
    if (!user) return
    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    if (data) {
      setUsername(data.username || '')
      setOriginalUsername(data.username || '')
      setDisplayName(data.display_name || '')
      setBio(data.bio || '')
      setIsPublic(data.is_public || false)
      setEbayUsername(data.ebay_username || '')
    } else {
      // Pre-fill display name from Clerk
      setDisplayName(user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '')
    }
    setLoading(false)
  }

  const checkUsername = async (val: string) => {
    if (!val || val === originalUsername) { setUsernameAvailable(null); return }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(val)) { setUsernameAvailable(false); return }
    setCheckingUsername(true)
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', val)
      .single()
    setUsernameAvailable(!data)
    setCheckingUsername(false)
  }
const [ebayUsername, setEbayUsername] = useState('')
  const handleUsernameChange = (val: string) => {
    setUsername(val)
    setUsernameAvailable(null)
    const timer = setTimeout(() => checkUsername(val), 600)
    return () => clearTimeout(timer)
  }
const [activeSection, setActiveSection] = useState('profile')
  const saveProfile = async () => {
    if (!user) return
    if (!username) { showToast('⚠️ Username is required'); return }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) { showToast('⚠️ Username must be 3-20 characters, letters, numbers and underscores only'); return }
    if (usernameAvailable === false && username !== originalUsername) { showToast('⚠️ That username is already taken'); return }

    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username,
        display_name: displayName,
        bio,
        is_public: isPublic,
        ebay_username: ebayUsername,
        updated_at: new Date().toISOString(),
      })

    if (error) {
      showToast('❌ Error saving: ' + error.message)
    } else {
      setOriginalUsername(username)
      showToast('✅ Settings saved!')
    }
    setSaving(false)
  }

  if (!isLoaded || loading) {
    return (
      <>
        <Nav />
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
          <div style={{fontSize:'16px',fontWeight:600,color:'#555'}}>Loading settings...</div>
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
            <div style={{fontSize:'18px',fontWeight:700,marginBottom:'8px'}}>Sign in required</div>
            <a href="/sign-in" style={{color:'#1B6FF0',textDecoration:'none',fontWeight:600}}>Log in to access settings</a>
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
        .page-header-inner{max-width:860px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between}
        .breadcrumb{display:flex;align-items:center;gap:6px;font-size:12px;color:#9A9A9A}
        .breadcrumb a{color:#9A9A9A;text-decoration:none}
        .breadcrumb a:hover{color:#1B6FF0}
        .settings-layout{max-width:860px;margin:0 auto;padding:32px 24px;display:grid;grid-template-columns:220px 1fr;gap:24px;align-items:start}
        .settings-nav{background:#fff;border:1px solid #EFEFEF;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06);position:sticky;top:78px}
        .settings-nav-item{display:flex;align-items:center;gap:10px;padding:12px 16px;font-size:13px;font-weight:600;color:#555;cursor:pointer;border-left:2px solid transparent;transition:all .15s}
        .settings-nav-item:hover{background:#F7F7F7;color:#0D0D0D}
        .settings-nav-item.active{color:#1B6FF0;background:#EBF2FF;border-left-color:#1B6FF0}
        .settings-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:28px;box-shadow:0 1px 3px rgba(0,0,0,.06);margin-bottom:16px}
        .settings-card-title{font-size:16px;font-weight:800;letter-spacing:-.3px;margin-bottom:4px}
        .settings-card-desc{font-size:13px;color:#9A9A9A;margin-bottom:24px;line-height:1.5}
        .settings-divider{height:1px;background:#EFEFEF;margin:24px 0}
        .form-group{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
        .form-label{font-size:12px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.07em}
        .form-input{width:100%;padding:10px 12px;border:1.5px solid #EFEFEF;border-radius:6px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:#0D0D0D;background:#fff;outline:none;transition:border-color .15s}
        .form-input:focus{border-color:#1B6FF0;box-shadow:0 0 0 3px rgba(27,111,240,.1)}
        .form-hint{font-size:12px;color:#9A9A9A;margin-top:2px}
        .username-wrap{position:relative}
        .username-prefix{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:14px;color:#9A9A9A;font-weight:600;pointer-events:none}
        .username-input{padding-left:28px}
        .username-status{position:absolute;right:12px;top:50%;transform:translateY(-50%)}
        .toggle-row{display:flex;align-items:center;justify-content:space-between;padding:16px;background:#F7F7F7;border-radius:8px;border:1px solid #EFEFEF}
        .toggle-info{flex:1}
        .toggle-label{font-size:14px;font-weight:700;color:#0D0D0D;margin-bottom:2px}
        .toggle-desc{font-size:12px;color:#9A9A9A;line-height:1.5}
        .toggle-switch{width:44px;height:24px;border-radius:100px;border:none;cursor:pointer;transition:all .2s;position:relative;flex-shrink:0}
        .toggle-switch.on{background:#1B6FF0}
        .toggle-switch.off{background:#D8D8D8}
        .toggle-knob{position:absolute;top:3px;width:18px;height:18px;background:#fff;border-radius:50%;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
        .toggle-knob.on{left:23px}
        .toggle-knob.off{left:3px}
        .vault-url{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#EBF2FF;border-radius:6px;border:1px solid #C5D8FF;font-size:13px;color:#1B6FF0;font-weight:600;margin-top:12px}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 20px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:all .15s}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF}
        .btn-primary:disabled{background:#9A9A9A;cursor:not-allowed}
        .toast{position:fixed;bottom:24px;right:24px;z-index:999;background:#0D0D0D;color:#fff;border-radius:8px;padding:12px 18px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toastIn .3s cubic-bezier(.34,1.56,.64,1)}
        @keyframes toastIn{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}
        @media(max-width:700px){.settings-layout{grid-template-columns:1fr}.settings-nav{position:static}}
      `}</style>

      <Nav />

      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <a href="/">Home</a><span>›</span>
            <strong style={{color:'#0D0D0D'}}>Settings</strong>
          </div>
        </div>
      </div>

      <div className="settings-layout">

        {/* Settings nav */}
        <aside className="settings-nav">
  {[
    { id:'profile', icon:faUser, label:'Profile' },
    { id:'privacy', icon:faLock, label:'Privacy' },
  ].map(item => (
    <div
      key={item.id}
      className={`settings-nav-item${activeSection===item.id?' active':''}`}
      onClick={() => setActiveSection(item.id)}
    >
      <FontAwesomeIcon icon={item.icon} style={{width:'14px'}}/>
      {item.label}
    </div>
  ))}
</aside>

        {/* Settings content */}
        <div>

          {/* Profile section */}
<div className="settings-card" id="profile">
  <div className="settings-card-title">Public Profile</div>
            <div className="settings-card-desc">This is how other collectors will see you on Foilcase. Choose a unique username to get your own vault URL.</div>

            <div className="form-group">
              <label className="form-label">Username <span style={{color:'#D93025'}}>*</span></label>
              <div className="username-wrap">
                <span className="username-prefix">@</span>
                <input
                  className="form-input username-input"
                  placeholder="yourcollectorname"
                  value={username}
                  onChange={e => handleUsernameChange(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,''))}
                  maxLength={20}
                />
                <div className="username-status">
                  {checkingUsername && <span style={{fontSize:'12px',color:'#9A9A9A'}}>checking...</span>}
                  {!checkingUsername && usernameAvailable === true && <FontAwesomeIcon icon={faCheck} style={{color:'#00A861'}}/>}
                  {!checkingUsername && usernameAvailable === false && username !== originalUsername && <FontAwesomeIcon icon={faXmark} style={{color:'#D93025'}}/>}
                </div>
              </div>
              <div className="form-hint">
                {username && !/^[a-zA-Z0-9_]{3,20}$/.test(username)
                  ? <span style={{color:'#D93025'}}>3–20 characters, letters, numbers and underscores only</span>
                  : 'Letters, numbers and underscores only · 3–20 characters'
                }
              </div>
              {username && usernameAvailable !== false && username.length >= 3 && (
                <div className="vault-url">
                  <FontAwesomeIcon icon={faGlobe}/>
                  foilcase.com/vault/{username || 'username'}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input
                className="form-input"
                placeholder="Your name or collector alias"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                maxLength={50}
              />
              <div className="form-hint">Shown on your public vault page</div>
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                className="form-input"
                placeholder="Tell other collectors about yourself and what you collect..."
                value={bio}
                onChange={e => setBio(e.target.value)}
                maxLength={200}
                style={{minHeight:'80px',resize:'vertical'}}
              />
              <div className="form-hint">{bio.length}/200 characters</div>
            </div>

            <div className="form-group">
  <label className="form-label">eBay Username</label>
  <div className="username-wrap">
    <span className="username-prefix" style={{fontSize:'12px',color:'#9A9A9A',left:'10px'}}>ebay.com/usr/</span>
    <input
      className="form-input"
      style={{paddingLeft:'108px'}}
      placeholder="your-ebay-username"
      value={ebayUsername}
      onChange={e => setEbayUsername(e.target.value.trim())}
      maxLength={64}
    />
  </div>
  <div className="form-hint">Let other collectors find your eBay listings. Optional but recommended.</div>
  {ebayUsername && (
    <a
      href={ebayUserUrl(ebayUsername)}
      target="_blank"
      rel="noopener noreferrer"
      style={{display:'inline-flex',alignItems:'center',gap:'6px',marginTop:'6px',padding:'6px 12px',background:'#EBF2FF',borderRadius:'6px',border:'1px solid #C5D8FF',fontSize:'13px',color:'#1B6FF0',fontWeight:600,textDecoration:'none'}}
    >
      View your eBay store →
    </a>
  )}
</div>
          </div>

          {/* Privacy section */}
<div className="settings-card" id="privacy">
  <div className="settings-card-title">Vault Privacy</div>
            <div className="settings-card-desc">Control who can see your card collection. You can change this at any time.</div>

            <div className="toggle-row">
              <div className="toggle-info">
                <div className="toggle-label">
                  <FontAwesomeIcon icon={isPublic ? faGlobe : faLock} style={{marginRight:'6px',color:isPublic?'#1B6FF0':'#9A9A9A'}}/>
                  {isPublic ? 'Public vault' : 'Private vault'}
                </div>
                <div className="toggle-desc">
                  {isPublic
                    ? 'Anyone can browse your collection at your vault URL. Cards marked For Trade are visible to other collectors.'
                    : 'Only you can see your collection. Enable to share your vault with other collectors.'
                  }
                </div>
              </div>
              <button
                className={`toggle-switch ${isPublic?'on':'off'}`}
                onClick={() => setIsPublic(p => !p)}
              >
                <div className={`toggle-knob ${isPublic?'on':'off'}`}></div>
              </button>
            </div>

            {isPublic && username && (
              <div className="vault-url" style={{marginTop:'12px'}}>
                <FontAwesomeIcon icon={faGlobe}/>
                Your public vault: <strong>foilcase.com/vault/{username}</strong>
                <button
                  onClick={() => { navigator.clipboard.writeText(`https://foilcase.com/vault/${username}`); showToast('📋 Link copied!') }}
                  style={{marginLeft:'auto',fontSize:'12px',color:'#1B6FF0',background:'none',border:'none',cursor:'pointer',fontWeight:600,fontFamily:'Plus Jakarta Sans,sans-serif'}}
                >Copy link</button>
              </div>
            )}

            {isPublic && !username && (
              <div style={{marginTop:'12px',padding:'10px 14px',background:'#FEF3E2',borderRadius:'6px',border:'1px solid #F5C880',fontSize:'13px',color:'#E8820C',fontWeight:500}}>
                ⚠️ Set a username above to get your public vault URL
              </div>
            )}
          </div>

          {/* Save button */}
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button
              className="btn btn-primary"
              onClick={saveProfile}
              disabled={saving}
            >
              {saving ? 'Saving...' : <><FontAwesomeIcon icon={faCheck}/>Save Settings</>}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast">{toast}</div>
      )}
      <Footer />
    </>
  )
}