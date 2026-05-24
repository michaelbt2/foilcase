import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'DMCA & Copyright Policy — Foilcase',
  description: 'Foilcase DMCA takedown policy and copyright infringement reporting process.',
}

export default function DMCA() {
  return (
    <>
      <style>{`
        .dmca-hero{background:#fff;border-bottom:1px solid #EFEFEF;padding:48px 24px}
        .dmca-hero-inner{max-width:760px;margin:0 auto}
        .dmca-eyebrow{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1B6FF0;margin-bottom:12px}
        .dmca-title{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-1px;color:#0D0D0D;margin-bottom:8px}
        .dmca-meta{font-size:13px;color:#9A9A9A}
        .dmca-layout{max-width:760px;margin:0 auto;padding:48px 24px}
        .dmca-section{margin-bottom:40px}
        .dmca-section h2{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #EFEFEF}
        .dmca-section h3{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:8px;margin-top:16px}
        .dmca-section p{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px}
        .dmca-section ul{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px;padding-left:20px;display:flex;flex-direction:column;gap:6px}
        .dmca-section li{color:#555}
        .dmca-section a{color:#1B6FF0;text-decoration:none}
        .dmca-section a:hover{text-decoration:underline}
        .dmca-notice{background:#EBF2FF;border:1px solid #C5D8FF;border-radius:12px;padding:20px 24px;margin-bottom:32px}
        .dmca-notice p{font-size:14px;color:#1B6FF0;line-height:1.6;margin:0;font-weight:500}
        .dmca-contact{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:12px;padding:24px;margin-top:48px;text-align:center}
        .dmca-contact p{font-size:14px;color:#555;margin-bottom:8px}
        .dmca-contact a{color:#1B6FF0;font-weight:600;text-decoration:none}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="dmca-hero">
        <div className="dmca-hero-inner">
          <div className="dmca-eyebrow">Legal</div>
          <h1 className="dmca-title">DMCA & Copyright Policy</h1>
          <div className="dmca-meta">Last updated: May 2026 · Effective: May 2026</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="dmca-layout">

        <div className="dmca-section">
          <p>Foilcase respects the intellectual property rights of others and expects users of our platform to do the same. This policy outlines our procedures for responding to notices of alleged copyright infringement in accordance with the Digital Millennium Copyright Act ("DMCA"), 17 U.S.C. § 512.</p>
          <p>If you believe that content on Foilcase infringes your copyright, please follow the process outlined below to submit a takedown notice.</p>
        </div>

        <div className="dmca-notice">
          <p>To submit a DMCA takedown notice, email us at <a href="mailto:hello@foilcase.com" style={{color:'#1B6FF0'}}>hello@foilcase.com</a> with the subject line "DMCA Takedown Request" and include all required information listed in Section 2 below.</p>
        </div>

        <div className="dmca-section">
          <h2>1. Our Copyright Policy</h2>
          <p>Foilcase is a trading card collection tracking platform. Users may upload images of trading cards they personally own. We respect the intellectual property rights of card manufacturers, photographers, artists, and other rights holders.</p>
          <p>We do not claim ownership of any trading card imagery, player likenesses, team logos, or other third party intellectual property that may appear in user-uploaded content on our platform.</p>
          <p>In accordance with the DMCA, we will respond expeditiously to claims of copyright infringement and will remove or disable access to allegedly infringing content upon receipt of a valid takedown notice.</p>
        </div>

        <div className="dmca-section">
          <h2>2. Submitting a DMCA Takedown Notice</h2>
          <p>If you are a copyright owner or authorized to act on behalf of a copyright owner and believe that content on Foilcase infringes your copyright, please send a written notice to <a href="mailto:hello@foilcase.com">hello@foilcase.com</a> with the subject line "DMCA Takedown Request" containing the following information:</p>

          <h3>Required information</h3>
          <ul>
            <li><strong>Your identity</strong> — your full legal name, address, telephone number, and email address</li>
            <li><strong>Identification of the copyrighted work</strong> — a description of the copyrighted work you claim has been infringed, or if multiple works are covered by a single notice, a representative list of such works</li>
            <li><strong>Identification of the infringing material</strong> — the URL or specific location on Foilcase where the allegedly infringing content is located, with enough detail for us to find it</li>
            <li><strong>Good faith statement</strong> — a statement that you have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law</li>
            <li><strong>Accuracy statement</strong> — a statement that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on behalf of the copyright owner</li>
            <li><strong>Signature</strong> — your physical or electronic signature</li>
          </ul>

          <p>Please note that under 17 U.S.C. § 512(f), any person who knowingly materially misrepresents that material is infringing may be subject to liability.</p>
        </div>

        <div className="dmca-section">
          <h2>3. Our Response to Takedown Notices</h2>
          <p>Upon receipt of a valid DMCA takedown notice we will:</p>
          <ul>
            <li>Review the notice for completeness and validity</li>
            <li>Remove or disable access to the allegedly infringing content promptly</li>
            <li>Notify the user who uploaded the content that it has been removed</li>
            <li>Provide the user with a copy of the takedown notice (with your personal contact information redacted where appropriate)</li>
            <li>Inform the user of their right to submit a counter-notice</li>
          </ul>
          <p>We aim to process all valid takedown notices within 3-5 business days of receipt.</p>
        </div>

        <div className="dmca-section">
          <h2>4. Counter-Notices</h2>
          <p>If you believe that content you uploaded was removed as a result of a mistake or misidentification, you may submit a counter-notice to <a href="mailto:hello@foilcase.com">hello@foilcase.com</a> with the subject line "DMCA Counter-Notice" containing the following information:</p>
          <ul>
            <li><strong>Your identity</strong> — your full legal name, address, telephone number, and email address</li>
            <li><strong>Identification of the removed content</strong> — a description of the content that was removed and its location before removal</li>
            <li><strong>Good faith statement</strong> — a statement under penalty of perjury that you have a good faith belief that the content was removed as a result of mistake or misidentification</li>
            <li><strong>Consent to jurisdiction</strong> — a statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located, or if your address is outside the United States, any judicial district in which Foilcase may be found</li>
            <li><strong>Signature</strong> — your physical or electronic signature</li>
          </ul>
          <p>Upon receipt of a valid counter-notice we will forward it to the original complainant and may restore the removed content within 10-14 business days unless the complainant files a court action seeking to restrain the alleged infringement.</p>
        </div>

        <div className="dmca-section">
          <h2>5. Repeat Infringers</h2>
          <p>In accordance with the DMCA and our <a href="/terms">Terms of Service</a>, Foilcase maintains a policy of terminating accounts of users who are determined to be repeat infringers. A user who receives three or more valid DMCA takedown notices may have their account permanently terminated at our sole discretion.</p>
        </div>

        <div className="dmca-section">
          <h2>6. Trading Card Imagery</h2>
          <p>We acknowledge that trading cards contain imagery owned by various rights holders including:</p>
          <ul>
            <li>Card manufacturers (Panini America, Topps, Upper Deck, etc.)</li>
            <li>Sports leagues and organizations (NFL, NBA, MLB, NHL, etc.)</li>
            <li>Individual athletes and their licensing agents</li>
            <li>The Pokémon Company and other TCG publishers</li>
            <li>Photographers and artists whose work appears on cards</li>
          </ul>
          <p>Users who upload card images to Foilcase do so for the purpose of personally cataloging cards they own. Foilcase does not license, sell, or commercially exploit any card imagery uploaded by users. If you are a rights holder with concerns about how your intellectual property appears on our platform, please contact us at <a href="mailto:hello@foilcase.com">hello@foilcase.com</a> and we will work with you to address your concerns.</p>
        </div>

        <div className="dmca-section">
          <h2>7. Safe Harbor</h2>
          <p>Foilcase operates as a service provider under the DMCA safe harbor provisions of 17 U.S.C. § 512(c). We store content at the direction of our users and do not have actual knowledge of infringing activity, nor do we receive a financial benefit directly attributable to infringing activity. We respond expeditiously to remove content upon notification of claimed infringement.</p>
        </div>

        <div className="dmca-section">
          <h2>8. Contact Information</h2>
          <p>All DMCA notices and counter-notices should be sent to:</p>
          <ul>
            <li>Email: <a href="mailto:hello@foilcase.com">hello@foilcase.com</a></li>
            <li>Subject line: "DMCA Takedown Request" or "DMCA Counter-Notice"</li>
          </ul>
          <p>For general copyright questions or concerns that do not require a formal DMCA notice, please contact us at <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>.</p>
        </div>

        {/* Contact card */}
        <div className="dmca-contact">
          <p>Need to submit a DMCA takedown notice?</p>
          <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>
        </div>

      </div>

      <Footer />
    </>
  )
}