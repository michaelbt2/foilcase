import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Acceptable Use Policy — Foilcase',
  description: 'The rules and guidelines governing acceptable use of the Foilcase platform.',
}

export default function AcceptableUse() {
  return (
    <>
      <style>{`
        .aup-hero{background:#fff;border-bottom:1px solid #EFEFEF;padding:48px 24px}
        .aup-hero-inner{max-width:760px;margin:0 auto}
        .aup-eyebrow{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1B6FF0;margin-bottom:12px}
        .aup-title{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-1px;color:#0D0D0D;margin-bottom:8px}
        .aup-meta{font-size:13px;color:#9A9A9A}
        .aup-layout{max-width:760px;margin:0 auto;padding:48px 24px}
        .aup-section{margin-bottom:40px}
        .aup-section h2{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #EFEFEF}
        .aup-section h3{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:8px;margin-top:16px}
        .aup-section p{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px}
        .aup-section ul{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px;padding-left:20px;display:flex;flex-direction:column;gap:6px}
        .aup-section li{color:#555}
        .aup-section a{color:#1B6FF0;text-decoration:none}
        .aup-section a:hover{text-decoration:underline}
        .aup-warning{background:#FDECEA;border:1px solid #FFBBB7;border-radius:12px;padding:20px 24px;margin-bottom:32px}
        .aup-warning p{font-size:14px;color:#D93025;line-height:1.6;margin:0;font-weight:500}
        .aup-contact{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:12px;padding:24px;margin-top:48px;text-align:center}
        .aup-contact p{font-size:14px;color:#555;margin-bottom:8px}
        .aup-contact a{color:#1B6FF0;font-weight:600;text-decoration:none}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="aup-hero">
        <div className="aup-hero-inner">
          <div className="aup-eyebrow">Legal</div>
          <h1 className="aup-title">Acceptable Use Policy</h1>
          <div className="aup-meta">Last updated: May 2026 · Effective: May 2026</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="aup-layout">

        <div className="aup-section">
          <p>This Acceptable Use Policy ("AUP") governs your use of the Foilcase platform at foilcase.com. By using Foilcase you agree to comply with this policy. This AUP should be read alongside our <a href="/terms">Terms of Service</a>, <a href="/privacy">Privacy Policy</a>, and <a href="/cookies">Cookie Policy</a>.</p>
          <p>Foilcase is a community built by and for trading card collectors. We want it to remain a trusted, safe, and enjoyable platform for everyone. This policy exists to protect our users, our platform, and the integrity of the collector community.</p>
        </div>

        <div className="aup-warning">
          <p>Violations of this policy may result in immediate suspension or permanent termination of your account without notice. We reserve the right to remove any content that violates this policy at our sole discretion.</p>
        </div>

        <div className="aup-section">
          <h2>1. Permitted Uses</h2>
          <p>You may use Foilcase to:</p>
          <ul>
            <li>Create and manage a personal trading card vault for your own collection</li>
            <li>Upload images of trading cards you personally own</li>
            <li>Track the value of your collection using live eBay pricing data</li>
            <li>Make your vault public to share your collection with the community</li>
            <li>Follow other collectors and engage with public vaults</li>
            <li>Search for cards and browse live market pricing</li>
            <li>Mark cards as for sale or for trade in your public vault</li>
            <li>Use the platform for personal, non-commercial collection tracking</li>
          </ul>
        </div>

        <div className="aup-section">
          <h2>2. Prohibited Content</h2>
          <p>You may not upload, post, or share content that:</p>

          <h3>Illegal content</h3>
          <ul>
            <li>Violates any applicable local, state, national, or international law or regulation</li>
            <li>Infringes on the copyright, trademark, or other intellectual property rights of others</li>
            <li>Constitutes or facilitates fraud, counterfeit cards, or deceptive listings</li>
            <li>Contains or promotes illegal activity of any kind</li>
          </ul>

          <h3>Harmful content</h3>
          <ul>
            <li>Is threatening, harassing, abusive, or intimidating toward other users</li>
            <li>Contains hate speech or discriminates based on race, ethnicity, religion, gender, sexual orientation, disability, or other protected characteristics</li>
            <li>Is sexually explicit, obscene, or pornographic</li>
            <li>Promotes violence or self-harm</li>
            <li>Targets or exploits minors in any way</li>
          </ul>

          <h3>Misleading content</h3>
          <ul>
            <li>Is false, misleading, or deceptive about the cards in your collection</li>
            <li>Misrepresents the condition, grade, authenticity, or value of cards</li>
            <li>Impersonates another person, collector, or entity</li>
            <li>Contains fabricated reviews, testimonials, or community interactions</li>
          </ul>

          <h3>Technical abuse</h3>
          <ul>
            <li>Contains viruses, malware, spyware, or other harmful code</li>
            <li>Interferes with or disrupts the integrity or performance of our platform</li>
            <li>Attempts to gain unauthorized access to our systems or other users' accounts</li>
            <li>Introduces any automated scripts or bots without our written permission</li>
          </ul>
        </div>

        <div className="aup-section">
          <h2>3. Prohibited Activities</h2>
          <p>You may not use Foilcase to engage in the following activities:</p>

          <h3>Data scraping and automation</h3>
          <ul>
            <li>Scrape, crawl, or automatically extract data from Foilcase without our express written permission</li>
            <li>Use automated tools, bots, or scripts to access or interact with the platform</li>
            <li>Bulk download card pricing data or other platform content for commercial use</li>
            <li>Reproduce or redistribute eBay pricing data obtained through Foilcase</li>
          </ul>

          <h3>Account abuse</h3>
          <ul>
            <li>Create multiple accounts to circumvent account restrictions or free tier limits</li>
            <li>Create fake or fraudulent accounts</li>
            <li>Artificially inflate your card count to reach achievement tiers</li>
            <li>Share or sell your account credentials to other users</li>
            <li>Access another user's account without their explicit permission</li>
          </ul>

          <h3>Community abuse</h3>
          <ul>
            <li>Harass, stalk, or intimidate other collectors on the platform</li>
            <li>Spam other users through any platform features</li>
            <li>Manipulate community features such as follows or vault views artificially</li>
            <li>Use the platform to solicit personal information from other users</li>
          </ul>

          <h3>Commercial abuse</h3>
          <ul>
            <li>Use Foilcase as a storefront or e-commerce platform without our written consent</li>
            <li>Advertise or promote third party products or services without our permission</li>
            <li>Resell access to Foilcase or its features</li>
            <li>Use Foilcase data for commercial data products or services</li>
          </ul>

          <h3>Platform integrity</h3>
          <ul>
            <li>Attempt to reverse engineer, decompile, or disassemble any part of Foilcase</li>
            <li>Modify, adapt, or create derivative works based on our platform</li>
            <li>Remove or alter any copyright, trademark, or other proprietary notices</li>
            <li>Use our platform in a way that could damage our reputation or the collector community</li>
          </ul>
        </div>

        <div className="aup-section">
          <h2>4. Card Image Guidelines</h2>
          <p>Since Foilcase allows users to upload card images, the following specific guidelines apply:</p>
          <ul>
            <li>Only upload images of trading cards you personally own or have the right to photograph</li>
            <li>Images must accurately represent the actual card in your possession</li>
            <li>Do not upload stock images, manufacturer images, or images of cards you do not own to misrepresent your collection</li>
            <li>Do not upload images containing personal information, faces of individuals, or location data</li>
            <li>Images must not contain watermarks from competing services</li>
            <li>Maximum file size and format restrictions apply as specified in the platform</li>
          </ul>
        </div>

        <div className="aup-section">
          <h2>5. Public Vault Guidelines</h2>
          <p>If you choose to make your vault public the following additional guidelines apply:</p>
          <ul>
            <li>Your public vault must accurately represent cards you actually own</li>
            <li>Cards marked "For Sale" or "For Trade" must be genuinely available</li>
            <li>Do not use your public vault to advertise cards you do not own or that are not available</li>
            <li>Pricing information you display should be honest and based on actual market values</li>
            <li>Do not use your public vault to drive traffic to external platforms in a misleading way</li>
          </ul>
        </div>

        <div className="aup-section">
          <h2>6. Reporting Violations</h2>
          <p>If you encounter content or behavior that violates this policy, please report it to us immediately at <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>. Please include:</p>
          <ul>
            <li>A description of the violation</li>
            <li>The URL or username of the content or account in question</li>
            <li>Any relevant screenshots or evidence</li>
          </ul>
          <p>We take all reports seriously and will investigate promptly. We appreciate the community's help in keeping Foilcase a trusted and safe platform for collectors.</p>
        </div>

        <div className="aup-section">
          <h2>7. Enforcement</h2>
          <p>We reserve the right to take any of the following actions in response to violations of this policy:</p>
          <ul>
            <li>Issue a warning to the user</li>
            <li>Remove offending content without notice</li>
            <li>Temporarily suspend the user's account</li>
            <li>Permanently terminate the user's account</li>
            <li>Report illegal activity to appropriate law enforcement authorities</li>
            <li>Pursue legal action where appropriate</li>
          </ul>
          <p>The severity of our response will depend on the nature and severity of the violation. Repeated violations will result in permanent account termination.</p>
        </div>

        <div className="aup-section">
          <h2>8. Appeals</h2>
          <p>If you believe your account has been suspended or content removed in error, you may appeal our decision by contacting us at <a href="mailto:hello@foilcase.com">hello@foilcase.com</a> within 30 days of the action. Please include your username, a description of the situation, and any relevant context. We will review all appeals in good faith and respond within 5 business days.</p>
        </div>

        <div className="aup-section">
          <h2>9. Changes to This Policy</h2>
          <p>We may update this Acceptable Use Policy from time to time as the platform evolves. We will notify users of significant changes by posting the updated policy on this page and updating the "Last updated" date. Your continued use of Foilcase after any changes constitutes your acceptance of the updated policy.</p>
        </div>

        <div className="aup-section">
          <h2>10. Contact Us</h2>
          <p>If you have any questions about this Acceptable Use Policy, please contact us at:</p>
          <ul>
            <li>Email: <a href="mailto:hello@foilcase.com">hello@foilcase.com</a></li>
            <li>Website: <a href="https://foilcase.com">foilcase.com</a></li>
          </ul>
        </div>

        {/* Contact card */}
        <div className="aup-contact">
          <p>Questions about this policy or want to report a violation?</p>
          <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>
        </div>

      </div>

      <Footer />
    </>
  )
}