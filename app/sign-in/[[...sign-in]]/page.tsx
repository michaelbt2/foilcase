import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F7F7F7',
      fontFamily: 'Plus Jakarta Sans, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '8px', marginBottom: '24px'
        }}>
          <div style={{
            width: '32px', height: '32px', background: '#1B6FF0',
            borderRadius: '8px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontSize: '16px'
          }}>🃏</div>
          <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-.4px' }}>FoilCase</span>
        </div>
        <SignIn />
      </div>
    </main>
  )
}