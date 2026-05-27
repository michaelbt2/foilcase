'use client'
import Link from 'next/link'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'My Vault', href: '/collection' },
      { label: 'Community', href: '/community' },
      { label: 'Market', href: '/market' },
      { label: 'Search', href: '/search' },
      { label: 'Supplies', href: '/supplies' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Start Here', href: '/start-here' },
      { label: 'Learn', href: '/learn' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Acceptable Use', href: '/acceptable-use' },
      { label: 'DMCA Policy', href: '/dmca' },
      { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
    ],
  },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/foilcase',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/foilcase',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    label: 'Reddit',
    href: 'https://reddit.com/r/foilcase',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/foilcase',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
  {
    label: 'Threads',
    href: 'https://threads.net/@foilcase',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 1.868-.011 3.405-.44 4.57-1.275 1.02-.724 1.682-1.744 1.966-3.031H15.3c-.22 1.151-.77 2.076-1.64 2.75-1.02.796-2.375 1.2-4.025 1.2l-.014-.001c-1.665-.01-3.057-.453-4.137-1.318C4.4 18.9 3.744 17.7 3.476 16.13l1.995-.35c.207 1.178.666 2.067 1.363 2.639.76.624 1.804.948 3.104.96 1.24-.01 2.236-.287 2.961-.826.658-.49 1.058-1.177 1.19-2.047H12.48c-1.16 0-2.238-.176-3.204-.524-1.022-.37-1.884-.926-2.56-1.655-.693-.748-1.158-1.67-1.382-2.742-.229-1.097-.167-2.307.183-3.595.347-1.276.976-2.39 1.87-3.31.945-.972 2.12-1.625 3.49-1.94 1.35-.309 2.81-.274 4.342.104.07.017.138.035.206.054.065.018.13.037.192.057 1.25.393 2.27 1.03 3.032 1.893.825.934 1.325 2.108 1.487 3.492.07.596.07 1.19.003 1.766-.067.574-.202 1.124-.402 1.635-.199.508-.46.976-.778 1.394-.317.418-.694.784-1.123 1.09l1.237 1.657c.567-.41 1.072-.886 1.503-1.42.434-.537.793-1.132 1.068-1.775.276-.644.465-1.329.562-2.04.097-.714.097-1.443.002-2.166-.207-1.739-.866-3.234-1.958-4.446-.952-1.055-2.213-1.86-3.748-2.388C15.7 2.5 15.588 2.468 15.477 2.44c-1.875-.484-3.648-.518-5.274-.1-1.647.422-3.054 1.255-4.183 2.474C5.05 5.902 4.287 7.24 3.881 8.768c-.41 1.541-.48 3.04-.208 4.453.275 1.44.887 2.667 1.82 3.65.91.96 2.053 1.675 3.395 2.126 1.278.43 2.68.651 4.173.66h.014c2.084 0 3.808-.54 5.122-1.607 1.26-.923 2.034-2.238 2.297-3.902h-2.032c-.248 1.236-.837 2.208-1.75 2.887-1.022.756-2.381 1.14-4.037 1.14l-.012-.001z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={{borderTop:'1px solid #EFEFEF',padding:'56px 24px 32px',background:'#fff',marginTop:'48px'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>

        {/* Main grid */}
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'48px',marginBottom:'48px'}}>

          {/* Brand */}
          <div>
            <a href="/" style={{display:'inline-flex',alignItems:'center',gap:'6px',textDecoration:'none',fontWeight:800,fontSize:'18px',color:'#0D0D0D',marginBottom:'12px'}}>
              <svg width="14" height="20" viewBox="0 0 902 1260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 756H618.841V465.934H248.906V285.499H902V0H0V756Z" fill="#1B6FF0"/>
                <path d="M333 933H0L333 1260V933Z" fill="#1B6FF0"/>
              </svg>
              foilcase
            </a>
            <p style={{fontSize:'14px',color:'#9A9A9A',lineHeight:1.65,marginTop:'12px',maxWidth:'220px'}}>
              The modern trading card vault built for collectors everywhere.
            </p>

            {/* Social icons */}
            <div style={{display:'flex',gap:'8px',marginTop:'20px'}}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{width:'34px',height:'34px',borderRadius:'50%',background:'#F7F7F7',border:'1px solid #EFEFEF',display:'flex',alignItems:'center',justifyContent:'center',color:'#555',textDecoration:'none',transition:'all .15s',flexShrink:0}}
                  onMouseOver={e=>{e.currentTarget.style.background='#1B6FF0';e.currentTarget.style.borderColor='#1B6FF0';e.currentTarget.style.color='#fff'}}
                  onMouseOut={e=>{e.currentTarget.style.background='#F7F7F7';e.currentTarget.style.borderColor='#EFEFEF';e.currentTarget.style.color='#555'}}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.title}>
              <div style={{fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:'#9A9A9A',marginBottom:'16px'}}>
                {col.title}
              </div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{fontSize:'14px',color:'#555',textDecoration:'none',transition:'color .15s'}}
                      onMouseOver={e=>(e.currentTarget.style.color='#0D0D0D')}
                      onMouseOut={e=>(e.currentTarget.style.color='#555')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'24px',borderTop:'1px solid #EFEFEF',fontSize:'13px',color:'#9A9A9A',flexWrap:'wrap',gap:'12px'}}>
          <div>© 2026 Foilcase. All rights reserved.</div>
          <div style={{display:'flex',gap:'16px'}}>
            {[
              {label:'Privacy', href:'/privacy'},
              {label:'Terms', href:'/terms'},
              {label:'Contact', href:'/contact'},
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{color:'#9A9A9A',textDecoration:'none',transition:'color .15s'}}
                onMouseOver={e=>(e.currentTarget.style.color='#0D0D0D')}
                onMouseOut={e=>(e.currentTarget.style.color='#9A9A9A')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}