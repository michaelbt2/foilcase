import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Affiliate Disclosure — Foilcase',
  description: 'How Foilcase uses affiliate links and how we earn commissions.',
}

export default function AffiliateDisclosure() {
  return (
    <>
      <style>{`
        .afd-hero{background:#fff;border-bottom:1px solid #EFEFEF;padding:48px 24px}
        .afd-hero-inner{max-width:760px;margin:0 auto}
        .afd-eyebrow{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1B6FF0;margin-bottom:12px}
        .afd-title{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-1px;color:#0D0D0D;margin-bottom:8px}
        .afd-meta{font-size:13px;color:#9A9A9A}
        .afd-layout{max-width:760px;margin:0 auto;padding:48px 24px}
        .afd-section{margin-bottom:40px}
        .afd-section h2{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #EFEFEF}
        .afd-section h3{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:8px;margin-top:16px}
        .afd-section p{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px}
        .afd-section ul{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px;padding-left:20px;display:flex;flex-direction:column;gap:6px}
        .afd-section li{color:#555}
        .afd-section a{color:#1B6FF0;text-decoration:none}
        .afd-section a:hover{text-decoration:underline}
        .afd-notice{background:#E6F9F0;border:1px solid #A8DFC4;border-radius:12px;padding:20px 24px;margin-bottom:32px}
        .afd-notice p{font-size:14px;color:#00A861;line-height:1.6;margin:0;font-weight:500}
        .afd-program{background:#fff;border:1px solid #EFEFEF;border-radius:12px;padding:24px;margin-bottom:16px}
        .afd-program-name{font-size:16px;font-weight:700;color:#0D0D0D;margin-bottom:6px}
        .afd-program-desc{font-size:14px;color:#555;line-height:1.6}
        .afd-contact{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:12px;padding:24px;margin-top:48px;text-align:center}
        .afd-contact p{font-size:14px;color:#555;margin-bottom:8px}
        .afd-contact a{color:#1B6FF0;font-weight:600;text-decoration:none}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="afd-hero">
        <div className="afd-hero-inner">
          <div className="afd-eyebrow">Legal</div>
          <h1 className="afd-title">Affiliate Disclosure</h1>
          <div className="afd-meta">Last updated: May 2026 · Effective: May 2026</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="afd-layout">

        <div className="afd-section">
          <p>Transparency is important to us. This Affiliate Disclosure explains how Foilcase earns revenue through affiliate partnerships and how that may affect the content and recommendations you see on our platform.</p>
        </div>

        <div className="afd-notice">
          <p>Foilcase participates in affiliate programs. This means we may earn a commission when you click on certain links and make a purchase — at absolutely no additional cost to you. Our editorial decisions and product recommendations are made independently of these relationships.</p>
        </div>

        <div className="afd-section">
          <h2>1. What is an Affiliate Link?</h2>
          <p>An affiliate link is a specially tracked URL that identifies Foilcase as the source of a referral to a third party website. When you click an affiliate link and make a qualifying purchase, Foilcase receives a small commission from the retailer. The price you pay is exactly the same whether you use our affiliate link or visit the retailer directly — we never inflate prices or add hidden fees.</p>
          <p>Affiliate commissions help us maintain and improve Foilcase as a free platform for collectors. Without this revenue we would need to charge users for access to features that are currently free.</p>
        </div>

        <div className="afd-section">
          <h2>2. Our Affiliate Programs</h2>
          <p>Foilcase currently participates in the following affiliate programs:</p>

          <div className="afd-program">
            <div className="afd-program-name">Amazon Associates Program</div>
            <div className="afd-program-desc">
              <p>Foilcase is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. Our Amazon affiliate store ID is <strong>foilcase-20</strong>.</p>
              <p>Amazon affiliate links appear primarily on our <Link href="/supplies">Supplies page</Link> and in our collection vault sidebar. These links point to trading card supplies such as penny sleeves, top loaders, binders, and storage boxes.</p>
            </div>
          </div>

          <div className="afd-program">
            <div className="afd-program-name">eBay Partner Network</div>
            <div className="afd-program-desc">
              <p>Foilcase participates in the eBay Partner Network affiliate program. When you click on eBay listing links from Foilcase's Search, Market, or other pages and make a qualifying purchase on eBay, Foilcase may earn a commission.</p>
              <p>eBay affiliate links appear throughout the Foilcase platform wherever live card listings and pricing data are displayed. These links open directly to the relevant eBay listing.</p>
            </div>
          </div>
        </div>

        <div className="afd-section">
          <h2>3. How We Choose What to Recommend</h2>
          <p>Our product recommendations are based on genuine usefulness to trading card collectors. We only recommend products that we believe provide real value. Our affiliate relationships do not influence which products we feature or how we describe them.</p>
          <p>Specifically:</p>
          <ul>
            <li>We only recommend supplies that are genuinely useful for card collectors</li>
            <li>We do not accept payment from manufacturers or retailers to feature specific products</li>
            <li>Our editorial team evaluates products independently before recommending them</li>
            <li>We do not inflate or manipulate card pricing data from eBay in any way</li>
            <li>Affiliate commission rates do not influence which products appear first or most prominently</li>
          </ul>
        </div>

        <div className="afd-section">
          <h2>4. FTC Compliance</h2>
          <p>This disclosure is made in accordance with the Federal Trade Commission's guidelines concerning the use of endorsements and testimonials in advertising (16 C.F.R. Part 255) and the FTC's guidelines on affiliate marketing disclosures.</p>
          <p>The FTC requires that we clearly disclose any material connection between Foilcase and the products or services we recommend. Our participation in affiliate programs constitutes such a material connection and is disclosed on this page, in our <Link href="/terms">Terms of Service</Link>, and where applicable near affiliate links throughout the platform.</p>
        </div>

        <div className="afd-section">
          <h2>5. Where Affiliate Links Appear</h2>
          <p>Affiliate links on Foilcase may appear in the following locations:</p>
          <ul>
            <li><strong><Link href="/supplies">Supplies page</Link></strong> — our curated page of recommended collector supplies, powered by Amazon affiliate links</li>
            <li><strong>Collection vault sidebar</strong> — a small selection of recommended supplies shown in your card vault</li>
            <li><strong>Search and Market pages</strong> — links to live eBay listings which may be tracked through the eBay Partner Network</li>
            <li><strong><Link href="/learn">Learn articles</Link></strong> — relevant product recommendations may appear within educational content</li>
          </ul>
        </div>

        <div className="afd-section">
          <h2>6. Your Privacy</h2>
          <p>When you click an affiliate link, the third party retailer (Amazon, eBay, etc.) may set cookies on your device to track the referral and any resulting purchase. These cookies are set by the retailer and are subject to their own privacy policies. For more information see our <Link href="/cookies">Cookie Policy</Link>.</p>
          <p>Foilcase does not receive any personal information about you from affiliate programs beyond aggregate commission reports.</p>
        </div>

        <div className="afd-section">
          <h2>7. Questions</h2>
          <p>If you have any questions about our affiliate relationships or this disclosure, please contact us at <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>. We are committed to transparency and will always be happy to clarify which links on our platform are affiliate links.</p>
        </div>

        {/* Contact card */}
        <div className="afd-contact">
          <p>Questions about our affiliate relationships?</p>
          <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>
        </div>

      </div>

      <Footer />
    </>
  )
}