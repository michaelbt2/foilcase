import { SignIn } from '@clerk/nextjs'

const clerkAppearance = {
  variables: {
    colorPrimary: '#1B6FF0',
    colorBackground: '#ffffff',
    colorInputBackground: '#ffffff',
    colorInputText: '#0D0D0D',
    colorText: '#0D0D0D',
    colorTextSecondary: '#555555',
    colorDanger: '#D93025',
    borderRadius: '8px',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    fontWeight: { normal: 500, medium: 600, bold: 700 },
  },
  elements: {
    card: {
      boxShadow: '0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.08)',
      border: '1px solid #EFEFEF',
      borderRadius: '12px',
      padding: '32px',
    },
    headerTitle: {
      fontSize: '22px',
      fontWeight: 800,
      letterSpacing: '-.4px',
      color: '#0D0D0D',
    },
    headerSubtitle: {
      color: '#555',
      fontSize: '14px',
    },
    formButtonPrimary: {
      background: '#1B6FF0',
      borderRadius: '100px',
      fontWeight: 600,
      fontSize: '14px',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      '&:hover': { background: '#0A4DBF' },
    },
    formFieldInput: {
      borderRadius: '8px',
      border: '1.5px solid #EFEFEF',
      fontSize: '14px',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      '&:focus': { borderColor: '#1B6FF0' },
    },
    formFieldLabel: {
      fontSize: '13px',
      fontWeight: 600,
      color: '#0D0D0D',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    },
    footerActionLink: {
      color: '#1B6FF0',
      fontWeight: 600,
    },
    identityPreviewText: {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    },
    dividerLine: {
      background: '#EFEFEF',
    },
    dividerText: {
      color: '#9A9A9A',
      fontSize: '12px',
    },
    socialButtonsBlockButton: {
      border: '1.5px solid #EFEFEF',
      borderRadius: '8px',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontWeight: 600,
      fontSize: '14px',
      '&:hover': { background: '#F7F7F7' },
    },
  },
}

export default function SignInPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F7F7F7',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    }}>
      <div style={{textAlign:'center'}}>
        {/* Logo */}
        <a href="/" style={{
          display:'inline-flex', alignItems:'center', gap:'4px',
          textDecoration:'none', marginBottom:'24px',
          fontWeight:800, fontSize:'20px', color:'#0D0D0D', letterSpacing:'-.4px',
        }}>
          <svg width="16" height="22" viewBox="0 0 902 1260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 756H618.841V465.934H248.906V285.499H902V0H0V756Z" fill="#1B6FF0"/>
            <path d="M333 933H0L333 1260V933Z" fill="#1B6FF0"/>
          </svg>
          foilcase
        </a>
        <SignIn appearance={clerkAppearance}/>
      </div>
    </main>
  )
}