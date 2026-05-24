import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Terms of Service — Foilcase',
  description: 'The terms and conditions governing your use of Foilcase.',
}

export default function TermsOfService() {
  return (
    <>
      <style>{`
        .terms-hero{background:#fff;border-bottom:1px solid #EFEFEF;padding:48px 24px}
        .terms-hero-inner{max-width:760px;margin:0 auto}
        .terms-eyebrow{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1B6FF0;margin-bottom:12px}
        .terms-title{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-1px;color:#0D0D0D;margin-bottom:8px}
        .terms-meta{font-size:13px;color:#9A9A9A}
        .terms-layout{max-width:760px;margin:0 auto;padding:48px 24px}
        .terms-section{margin-bottom:40px}
        .terms-section h2{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #EFEFEF}
        .terms-section h3{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:8px;margin-top:16px}
        .terms-section p{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px}
        .terms-section ul{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px;padding-left:20px;display:flex;flex-direction:column;gap:6px}
        .terms-section li{color:#555}
        .terms-section a{color:#1B6FF0;text-decoration:none}
        .terms-section a:hover{text-decoration:underline}
        .terms-contact{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:12px;padding:24px;margin-top:48px;text-align:center}
        .terms-contact p{font-size:14px;color:#555;margin-bottom:8px}
        .terms-contact a{color:#1B6FF0;font-weight:600;text-decoration:none}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="terms-hero">
        <div className="terms-hero-inner">
          <div className="terms-eyebrow">Legal</div>
          <h1 className="terms-title">Terms of Service</h1>
          <div className="terms-meta">Last updated: May 2026 · Effective: May 2026</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="terms-layout">

        <div className="terms-section">
          <p>Welcome to Foilcase. By accessing or using our service at foilcase.com, you agree to be bound by these Terms of Service. Please read them carefully before using our platform. If you do not agree to these terms, please do not use our service.</p>
        </div>

        <div className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By creating an account or using Foilcase, you confirm that you are at least 18 years of age and agree to these Terms of Service and our <a href="/privacy">Privacy Policy</a> and <a href="/cookies">Cookie Policy</a>. If you are using Foilcase on behalf of an organization, you agree to these terms on behalf of that organization.</p>
        </div>

        <div className="terms-section">
          <h2>2. Description of Service</h2>
          <p>Foilcase is a free web-based trading card collection tracking platform that allows users to:</p>
          <ul>
            <li>Create and manage a personal digital card vault</li>
            <li>Track collection value using live eBay market data</li>
            <li>Upload card images and organize cards into folders and categories</li>
            <li>Share public vaults with the collector community</li>
            <li>Search for cards and view live market pricing powered by the eBay API</li>
            <li>Follow other collectors and discover their collections</li>
            <li>Browse live trading card listings and auctions</li>
          </ul>
          <p>We reserve the right to modify, suspend, or discontinue any part of our service at any time with or without notice.</p>
        </div>

        <div className="terms-section">
          <h2>3. User Accounts</h2>
          <h3>Account creation</h3>
          <p>To use certain features of Foilcase you must create an account. You agree to provide accurate and complete information when creating your account and to keep your account information up to date. Accounts are created and managed through Clerk, our authentication provider.</p>
          <h3>Account security</h3>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately at <a href="mailto:hello@foilcase.com">hello@foilcase.com</a> of any unauthorized use of your account.</p>
          <h3>Username</h3>
          <p>Your username must be appropriate and not infringe on the rights of others. We reserve the right to reclaim or reassign usernames that violate these terms or that have been inactive for an extended period.</p>
          <h3>Account termination</h3>
          <p>You may request deletion of your account at any time by contacting us at <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>. We reserve the right to suspend or terminate accounts that violate these terms.</p>
        </div>

        <div className="terms-section">
          <h2>4. User Content</h2>
          <h3>Ownership</h3>
          <p>You retain ownership of any content you submit to Foilcase, including card data, images, and profile information. By submitting content, you grant Foilcase a non-exclusive, worldwide, royalty-free license to use, display, and store your content solely for the purpose of operating and improving the service.</p>
          <h3>Content standards</h3>
          <p>You agree not to submit content that:</p>
          <ul>
            <li>Is unlawful, harmful, threatening, abusive, or harassing</li>
            <li>Infringes on the intellectual property rights of others</li>
            <li>Contains viruses, malware, or other harmful code</li>
            <li>Is false, misleading, or deceptive</li>
            <li>Violates the privacy of others</li>
            <li>Is obscene, offensive, or otherwise objectionable</li>
          </ul>
          <h3>Card images</h3>
          <p>You may upload images of trading cards you personally own. You are responsible for ensuring you have the right to upload and display any images you submit. Foilcase stores card images in a secure cloud storage environment provided by Supabase.</p>
          <h3>Public vaults</h3>
          <p>If you choose to make your vault public, your collection data will be visible to all users and visitors of Foilcase. You are solely responsible for the content you choose to make public. You can make your vault private at any time in your account Settings.</p>
        </div>

        <div className="terms-section">
          <h2>5. Acceptable Use</h2>
          <p>You agree not to use Foilcase to:</p>
          <ul>
            <li>Scrape, crawl, or automatically extract data from our platform without written permission</li>
            <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
            <li>Interfere with or disrupt the integrity or performance of our service</li>
            <li>Use our platform for any commercial purpose without our written consent</li>
            <li>Impersonate another person or entity</li>
            <li>Circumvent any security or access controls</li>
            <li>Use our platform in any way that violates applicable laws or regulations</li>
            <li>Harass, bully, or intimidate other users of the platform</li>
            <li>Create multiple accounts to abuse free tier limits or evade restrictions</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>6. Third Party Services</h2>
          <p>Foilcase integrates with third party services to provide its features. Your use of Foilcase is also subject to the terms of these services:</p>
          <ul>
            <li><strong>eBay API</strong> — pricing and listing data is sourced from eBay. Card values are estimates based on eBay market data and should not be relied upon for financial decisions. eBay's terms of service apply to data displayed from their platform.</li>
            <li><strong>Clerk</strong> — authentication and user account management. Subject to Clerk's terms of service.</li>
            <li><strong>Supabase</strong> — database storage and file hosting. Subject to Supabase's terms of service.</li>
            <li><strong>Amplitude</strong> — product analytics. Subject to Amplitude's terms of service.</li>
            <li><strong>Vercel</strong> — website hosting and deployment. Subject to Vercel's terms of service.</li>
          </ul>
          <p>We are not responsible for the content, privacy policies, or practices of any third party services.</p>
        </div>

        <div className="terms-section">
          <h2>7. Affiliate Links</h2>
          <p>Foilcase participates in affiliate programs including the Amazon Associates Program and the eBay Partner Network. This means we may earn a commission when you click on certain links and make a purchase, at no additional cost to you. Affiliate links are clearly identified on our platform. We only recommend products we believe are genuinely useful to collectors.</p>
        </div>

        <div className="terms-section">
          <h2>8. Intellectual Property</h2>
          <p>The Foilcase name, logo, and all related content, features, and functionality are owned by Foilcase and are protected by copyright, trademark, and other intellectual property laws. You may not use our branding, logos, or trademarks without our prior written consent.</p>
          <p>Card images, player names, team names, and related marks are the property of their respective owners. Foilcase does not claim ownership of any third party intellectual property displayed on our platform.</p>
        </div>

        <div className="terms-section">
          <h2>9. Privacy and Cookies</h2>
          <p>Your use of Foilcase is subject to our <a href="/privacy">Privacy Policy</a> and <a href="/cookies">Cookie Policy</a>, which are incorporated into these Terms of Service by reference. By using Foilcase, you consent to the collection and use of your information as described in those policies.</p>
        </div>

        <div className="terms-section">
          <h2>10. Disclaimers</h2>
          <p>Foilcase is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that:</p>
          <ul>
            <li>The service will be uninterrupted, error-free, or secure</li>
            <li>Pricing data from eBay is accurate, complete, or current</li>
            <li>The service will meet your specific requirements</li>
            <li>Any defects in the service will be corrected</li>
            <li>The service is free of viruses or other harmful components</li>
          </ul>
          <p>Card values displayed on Foilcase are estimates based on eBay market data and should not be relied upon for insurance, financial, or investment decisions. Always consult a professional appraiser for formal valuations.</p>
        </div>

        <div className="terms-section">
          <h2>11. Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, Foilcase's total liability to you for any claims arising out of or relating to these terms or your use of the service shall be limited to the amount you have paid to Foilcase in the twelve months preceding the claim. For free tier users, this amount is zero.</p>
          <p>In no event shall Foilcase be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, loss of profits, loss of collection value, or loss of goodwill, even if advised of the possibility of such damages.</p>
        </div>

        <div className="terms-section">
          <h2>12. Dispute Resolution</h2>
          <h3>Informal negotiations</h3>
          <p>Before filing any formal dispute, you agree to first contact us at <a href="mailto:hello@foilcase.com">hello@foilcase.com</a> and attempt to resolve the dispute informally. We will make good faith efforts to resolve the issue within 30 days of receiving your notice.</p>
          <h3>Arbitration</h3>
          <p>If informal negotiations fail to resolve the dispute within 30 days, both parties agree to resolve the dispute through binding individual arbitration rather than in court. This means you waive your right to a jury trial and to participate in a class action lawsuit. Arbitration shall be conducted under the rules of the American Arbitration Association (AAA) in the English language.</p>
          <h3>Exceptions</h3>
          <p>Either party may seek emergency injunctive relief in a court of competent jurisdiction to prevent irreparable harm while arbitration is pending. Claims related to intellectual property infringement are also excluded from mandatory arbitration.</p>
        </div>

        <div className="terms-section">
          <h2>13. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions. Any disputes not subject to arbitration shall be resolved exclusively in the state or federal courts located in Texas.</p>
        </div>

        <div className="terms-section">
          <h2>14. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will notify users of significant changes by posting the updated terms on this page and updating the "Last updated" date. Your continued use of Foilcase after any changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically.</p>
        </div>

        <div className="terms-section">
          <h2>15. Severability</h2>
          <p>If any provision of these terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will continue in full force and effect.</p>
        </div>

        <div className="terms-section">
          <h2>16. Entire Agreement</h2>
          <p>These Terms of Service, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and Foilcase regarding your use of the service and supersede all prior agreements and understandings.</p>
        </div>

        <div className="terms-section">
          <h2>17. Contact Us</h2>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <ul>
            <li>Email: <a href="mailto:hello@foilcase.com">hello@foilcase.com</a></li>
            <li>Website: <a href="https://foilcase.com">foilcase.com</a></li>
          </ul>
        </div>

        {/* Contact card */}
        <div className="terms-contact">
          <p>Have a question about these terms?</p>
          <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>
        </div>

      </div>

      <Footer />
    </>
  )
}