'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, UserButton } from '@clerk/nextjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faLayerGroup,
  faRightToBracket,
  faUserPlus,
  faTableCells,
} from '@fortawesome/free-solid-svg-icons'

function NavActions() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) return null

  if (isSignedIn) {
    return (
      <div className="nav-actions">
        <Link className="btn btn-ghost" href="/collection">My Vault</Link>
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
        .nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:#0D0D0D;font-weight:800;font-size:16px;letter-spacing:-.4px}
        .nav-logo-icon{width:26px;height:26px;background:#1B6FF0;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px}
        .nav-links{display:flex;gap:2px;list-style:none}
        .nav-links a{text-decoration:none;color:#555;font-size:14px;font-weight:500;padding:5px 10px;border-radius:6px;transition:all .15s}
        .nav-links a:hover{color:#0D0D0D;background:#F7F7F7}
        .nav-links a.active{color:#1B6FF0;background:#EBF2FF}
        .nav-actions{display:flex;align-items:center;gap:8px;margin-left:auto}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 14px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .15s;border:none;white-space:nowrap}
        .btn-ghost{background:transparent;color:#555}
        .btn-ghost:hover{background:#F7F7F7;color:#0D0D0D}
        .btn-primary{background:#1B6FF0;color:#fff}
        .btn-primary:hover{background:#0A4DBF;transform:translateY(-1px)}
      `}</style>
      <nav className="nav">
        <div className="nav-inner">
          <Link className="nav-logo" href="/">
            <div className="nav-logo-icon">
  <FontAwesomeIcon icon={faLayerGroup} style={{fontSize:'12px',color:'#fff'}}/>
</div>FoilCase
          </Link>
          <ul className="nav-links">
            <li><Link href="/browse" className={path==='/browse'?'active':''}>Browse</Link></li>
<li><Link href="/collection" className={path==='/collection'?'active':''}>
  <FontAwesomeIcon icon={faTableCells} style={{marginRight:'5px'}}/>My Collection
</Link></li>
<li><Link href="/search" className={path==='/search'?'active':''}>
  <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight:'5px'}}/>Search
</Link></li>
          </ul>
          <NavActions />
        </div>
      </nav>
    </>
  )
}