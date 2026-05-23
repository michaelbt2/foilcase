'use client'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Community', href: '/community' },
      { label: 'Market', href: '/market' },
      { label: 'Search', href: '/search' },
      { label: 'My Vault', href: '/collection' },
    ],
  },
  {
    title: 'Sports',
    links: [
      { label: 'Football', href: '/search?q=football' },
      { label: 'Basketball', href: '/search?q=basketball' },
      { label: 'Baseball', href: '/search?q=baseball' },
      { label: 'Hockey', href: '/search?q=hockey' },
      { label: 'Pokémon', href: '/search?q=pokemon' },
      { label: 'Magic / Lorcana', href: '/search?q=magic+the+gathering' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Community', href: '/community' },
      { label: 'Contact', href: 'hello@foilcase.com' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{borderTop:'1px solid #EFEFEF',padding:'48px 24px 32px',background:'#fff',marginTop:'48px'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'48px',marginBottom:'40px'}}>

          {/* Brand */}
          <div>
            <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:'4px',textDecoration:'none',fontWeight:800,fontSize:'16px',color:'#0D0D0D',marginBottom:'12px'}}>
              <svg width="14" height="20" viewBox="0 0 902 1260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 756H618.841V465.934H248.906V285.499H902V0H0V756Z" fill="#1B6FF0"/>
                <path d="M333 933H0L333 1260V933Z" fill="#1B6FF0"/>
              </svg>
              foilcase
            </Link>
            <p style={{fontSize:'14px',color:'#9A9A9A',lineHeight:1.65,marginTop:'12px',maxWidth:'240px'}}>
              The modern trading card vault built for collectors everywhere.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map(col => (
            <div key={col.title}>
              <div style={{fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#9A9A9A',marginBottom:'16px'}}>
                {col.title}
              </div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{fontSize:'14px',color:'#555',textDecoration:'none',transition:'color .15s'}}
                      onMouseOver={e => (e.currentTarget.style.color = '#0D0D0D')}
                      onMouseOut={e => (e.currentTarget.style.color = '#555')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'24px',borderTop:'1px solid #EFEFEF',fontSize:'13px',color:'#9A9A9A',flexWrap:'wrap',gap:'12px'}}>
          <div>© 2026 foilcase. All rights reserved.</div>
          <div style={{display:'flex',gap:'16px'}}>
            {[{label:'Privacy',href:'/privacy'},{label:'Terms',href:'/terms'},{label:'Contact',href:'#'}].map(link => (
              <Link
                key={link.label}
                href={link.href}
                style={{color:'#9A9A9A',textDecoration:'none',transition:'color .15s'}}
                onMouseOver={e => (e.currentTarget.style.color = '#0D0D0D')}
                onMouseOut={e => (e.currentTarget.style.color = '#9A9A9A')}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}