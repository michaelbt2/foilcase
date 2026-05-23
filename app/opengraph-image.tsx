import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Foilcase — The Trading Card Vault Built for Collectors'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D0D0D',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Logo */}
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'40px'}}>
          <div style={{width:'48px',height:'48px',background:'#1B6FF0',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',fontWeight:800,color:'#fff'}}>
            F
          </div>
          <span style={{fontSize:'36px',fontWeight:800,color:'#fff',letterSpacing:'-1px'}}>
            foilcase
          </span>
        </div>

        {/* Headline */}
        <div style={{display:'flex',fontSize:'56px',fontWeight:800,color:'#fff',textAlign:'center',lineHeight:1.1,letterSpacing:'-2px',marginBottom:'24px',maxWidth:'900px',flexWrap:'wrap',justifyContent:'center'}}>
          The trading card vault built for collectors
        </div>

        {/* Subheadline */}
        <div style={{display:'flex',fontSize:'22px',color:'rgba(255,255,255,0.6)',textAlign:'center',maxWidth:'700px',lineHeight:1.5,marginBottom:'48px'}}>
          Track your collection, discover real-time pricing, and connect with collectors worldwide.
        </div>

        {/* Pills */}
        <div style={{display:'flex',gap:'16px'}}>
          {['Free to start','Live eBay pricing','5+ sports & TCG'].map(label => (
            <div key={label} style={{display:'flex',background:'rgba(27,111,240,0.2)',border:'1px solid rgba(27,111,240,0.4)',borderRadius:'100px',padding:'10px 24px',fontSize:'16px',fontWeight:600,color:'#7EB6FF'}}>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}