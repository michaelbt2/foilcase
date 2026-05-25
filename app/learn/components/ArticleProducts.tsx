'use client'
interface Product {
  name: string
  desc: string
  img: string
  url: string
}

interface ArticleProductsProps {
  products: Product[]
}

export default function ArticleProducts({ products }: ArticleProductsProps) {
  return (
    <div style={{margin:'48px 0 32px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
        <div style={{flex:1,height:'1px',background:'#EFEFEF'}}/>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.1em',color:'#9A9A9A',whiteSpace:'nowrap' as const}}>Recommended Supplies</div>
        <div style={{flex:1,height:'1px',background:'#EFEFEF'}}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'12px',marginBottom:'10px'}}>
        {products.map(p => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{display:'flex',flexDirection:'column' as const,background:'#fff',border:'1px solid #EFEFEF',borderRadius:'10px',overflow:'hidden',textDecoration:'none',transition:'all .2s'}}
            onMouseOver={e=>{e.currentTarget.style.borderColor='#1B6FF0';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,.08)'}}
            onMouseOut={e=>{e.currentTarget.style.borderColor='#EFEFEF';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}
          >
            <div style={{height:'140px',background:'#F7F7F7',display:'flex',alignItems:'center',justifyContent:'center',padding:'12px'}}>
              <img src={p.img} alt={p.name} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}}/>
            </div>
            <div style={{padding:'12px',flex:1,display:'flex',flexDirection:'column' as const,gap:'4px'}}>
              <div style={{fontSize:'12px',fontWeight:700,color:'#0D0D0D',lineHeight:1.3}}>{p.name}</div>
              <div style={{fontSize:'11px',color:'#9A9A9A',lineHeight:1.4,flex:1}}>{p.desc}</div>
              <div style={{fontSize:'11px',fontWeight:600,color:'#1B6FF0',marginTop:'6px'}}>View on Amazon →</div>
            </div>
          </a>
        ))}
      </div>
      <div style={{fontSize:'11px',color:'#C0C0C0',textAlign:'center' as const}}>
        As an Amazon Associate, Foilcase earns from qualifying purchases.
      </div>
    </div>
  )
}