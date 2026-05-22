'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, UserButton } from '@clerk/nextjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLayerGroup,
  faRightToBracket,
  faUserPlus,
  faGear,
} from '@fortawesome/free-solid-svg-icons'

function NavActions() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) return null

  if (isSignedIn) {
    return (
      <div className="nav-actions">
        <Link className="btn btn-ghost" href="/collection">My Vault</Link>
        <Link className="btn btn-ghost" href="/settings">
          <FontAwesomeIcon icon={faGear} style={{marginRight:'5px'}}/>Settings
        </Link>
        <UserButton />
      </div>
    )
  }

  return (
    <div className="nav-actions">
      <Link className="btn btn-ghost" href="/sign-in">
        <FontAwesomeIcon icon={faRightToBracket} style={{marginRight:'5px'}}/>Log in
      </Link>
      <Link className="btn btn-primary" href="/sign-up">
        <FontAwesomeIcon icon={faUserPlus} style={{marginRight:'5px'}}/>Get started free
      </Link>
    </div>
  )
}

export default function Nav() {
  const path = usePathname()

  return (
    <>
      <style>{`
        .nav{position:sticky;top:0;z-index:200;background:rgba(255,255,255,.92);backdrop-filter:blur(16px);border-bottom:1px solid #EFEFEF;height:58px;display:flex;align-items:center}
        .nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;width:100%;display:flex;align-items:center;gap:20px}
        .nav-logo{display:flex;align-items:center;gap:2px;text-decoration:none;color:#0D0D0D;font-weight:800;font-size:19px;letter-spacing:-.4px}
        .nav-logo-icon{width:26px;height:26px;display:flex;align-items:center;justify-content:center}
        .nav-links{display:flex;gap:2px;list-style:none}
        .nav-links a{text-decoration:none;color:#555;font-size:14px;font-weight:500;padding:5px 10px;border-radius:6px;transition:all .15s}
        .nav-links a:hover{color:#0D0D0D;background:#F7F7F7}
        .nav-links a.active{color:#1B6FF0;background:#EBF2FF}
        .nav-actions{display:flex;align-items:center;gap:8px;margin-left:auto}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 14px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .15s;border:none;white-space:nowrap}
        .btn-ghost{background:transparent;color:#555;font-size:14px;font-weight:500;padding:5px 10px;border-radius:6px}
        .btn-ghost:hover{background:#F7F7F7;color:#0D0D0D}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF;transform:translateY(-1px)}
      `}</style>
      <nav className="nav">
        <div className="nav-inner">
          <Link className="nav-logo" href="/">
            <div className="nav-logo-icon">
  <svg width="14" height="20" viewBox="0 0 902 1260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 756H618.841V465.934H248.906V285.499H902V0H0V756Z" fill="#1B6FF0"/>
    <path d="M333 933H0L333 1260V933Z" fill="#1B6FF0"/>
  </svg>
</div>foilcase
          </Link>
          <ul className="nav-links">
  <li><Link href="/start-here" className={path==='/start-here'?'active':''}>Start Here</Link></li>
  <li><Link href="/community" className={path==='/community'?'active':''}>Community</Link></li>
  <li><Link href="/market" className={path==='/market'?'active':''}>Market</Link></li>
  <li><Link href="/search" className={path==='/search'?'active':''}>Search</Link></li>
</ul>
          <NavActions />
        </div>
      </nav>
    </>
  )
}