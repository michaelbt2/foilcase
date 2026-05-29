import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Foilcase',
  description: 'How Foilcase collects, uses, and protects your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        .privacy-hero{background:#fff;border-bottom:1px solid #EFEFEF;padding:48px 24px}
        .privacy-hero-inner{max-width:760px;margin:0 auto}
        .privacy-eyebrow{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1B6FF0;margin-bottom:12px}
        .privacy-title{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-1px;color:#0D0D0D;margin-bottom:8px}
        .privacy-meta{font-size:13px;color:#9A9A9A}
        .privacy-layout{max-width:760px;margin:0 auto;padding:48px 24px}
        .privacy-section{margin-bottom:40px}
        .privacy-section h2{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #EFEFEF}
        .privacy-section h3{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:8px;margin-top:16px}
        .privacy-section p{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px}
        .privacy-section ul{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px;padding-left:20px;display:flex;flex-direction:column;gap:6px}
        .privacy-section li{color:#555}
        .privacy-section a{color:#1B6FF0;text-decoration:none}
        .privacy-section a:hover{text-decoration:underline}
        .privacy-contact{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:12px;padding:24px;margin-top:48px;text-align:center}
        .privacy-contact p{font-size:14px;color:#555;margin-bottom:8px}
        .privacy-contact a{color:#1B6FF0;font-weight:600;text-decoration:none}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="privacy-hero">
        <div className="privacy-hero-inner">
          <div className="privacy-eyebrow">Legal</div>
          {/* <h1 className="privacy-title">Privacy Policy</h1>
          <div className="privacy-meta">Last updated: May 2026 · Effective: May 2026</div> */}
        </div>
      </div>

{/* TERMLY POLICY CONTENT */}
<div style={{maxWidth:'760px',margin:'0 auto',padding:'48px 24px',fontFamily:'Plus Jakarta Sans,sans-serif',fontSize:'15px',lineHeight:1.7,color:'#555'}}
  dangerouslySetInnerHTML={{__html: `
    <div name="termly-embed" data-id="03c82f84-6a10-47c0-ad02-cebcc77fc9bb"></div>
    <script type="text/javascript">(function(d, s, id) {
      var js, tjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://app.termly.io/embed-policy.min.js";
      tjs.parentNode.insertBefore(js, tjs);
    }(document, 'script', 'termly-jssdk'));</script>
  `}}
/>

      <Footer />
    </>
  )
}