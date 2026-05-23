import Link from 'next/link'

export default function ArticleCTA() {
  return (
    <div style={{background:'#0D0D0D',borderRadius:'12px',padding:'32px',textAlign:'center',margin:'48px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 600px 300px at 50% 100%,rgba(27,111,240,.25),transparent)'}}/>
      <div style={{position:'relative',zIndex:1}}>
        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#7EB6FF',marginBottom:'12px'}}>Free to start</div>
        <div style={{fontSize:'24px',fontWeight:800,color:'#fff',letterSpacing:'-.5px',marginBottom:'8px',lineHeight:1.2}}>
          Ready to track your collection?
        </div>
        <div style={{fontSize:'15px',color:'rgba(255,255,255,.6)',marginBottom:'24px',lineHeight:1.6}}>
          Foilcase is the free trading card vault built for collectors. Track values, organize your collection, and connect with other collectors.
        </div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link
            href="/collection"
            style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'10px 24px',borderRadius:'100px',background:'#1B6FF0',color:'#fff',textDecoration:'none',fontSize:'14px',fontWeight:600,fontFamily:'Plus Jakarta Sans,sans-serif'}}
          >
            Start your free vault
          </Link>
          <Link
            href="/search"
            style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'10px 24px',borderRadius:'100px',background:'rgba(255,255,255,.1)',color:'#fff',textDecoration:'none',fontSize:'14px',fontWeight:600,fontFamily:'Plus Jakarta Sans,sans-serif',border:'1.5px solid rgba(255,255,255,.2)'}}
          >
            Search card values
          </Link>
        </div>
      </div>
    </div>
  )
}