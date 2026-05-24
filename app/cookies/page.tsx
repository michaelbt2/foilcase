import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Cookie Policy — Foilcase',
  description: 'How Foilcase uses cookies and similar tracking technologies.',
}

export default function CookiePolicy() {
  return (
    <>
      <style>{`
        .cookies-hero{background:#fff;border-bottom:1px solid #EFEFEF;padding:48px 24px}
        .cookies-hero-inner{max-width:760px;margin:0 auto}
        .cookies-eyebrow{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1B6FF0;margin-bottom:12px}
        .cookies-title{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-1px;color:#0D0D0D;margin-bottom:8px}
        .cookies-meta{font-size:13px;color:#9A9A9A}
        .cookies-layout{max-width:760px;margin:0 auto;padding:48px 24px}
        .cookies-section{margin-bottom:40px}
        .cookies-section h2{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #EFEFEF}
        .cookies-section h3{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:8px;margin-top:16px}
        .cookies-section p{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px}
        .cookies-section ul{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px;padding-left:20px;display:flex;flex-direction:column;gap:6px}
        .cookies-section li{color:#555}
        .cookies-section a{color:#1B6FF0;text-decoration:none}
        .cookies-section a:hover{text-decoration:underline}
        .cookies-table{width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px}
        .cookies-table th{background:#F7F7F7;padding:10px 14px;text-align:left;font-weight:700;color:#0D0D0D;border:1px solid #EFEFEF;font-size:13px}
        .cookies-table td{padding:10px 14px;border:1px solid #EFEFEF;color:#555;vertical-align:top}
        .cookies-table tr:hover td{background:#FAFAFA}
        .cookie-type{display:inline-flex;align-items:center;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:700}
        .type-essential{background:#E6F9F0;color:#00A861}
        .type-analytics{background:#EBF2FF;color:#1B6FF0}
        .type-functional{background:#F2ECFB;color:#7B4FCA}
        .cookies-contact{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:12px;padding:24px;margin-top:48px;text-align:center}
        .cookies-contact p{font-size:14px;color:#555;margin-bottom:8px}
        .cookies-contact a{color:#1B6FF0;font-weight:600;text-decoration:none}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="cookies-hero">
        <div className="cookies-hero-inner">
          <div className="cookies-eyebrow">Legal</div>
          <h1 className="cookies-title">Cookie Policy</h1>
          <div className="cookies-meta">Last updated: May 2026 · Effective: May 2026</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="cookies-layout">

        <div className="cookies-section">
          <p>This Cookie Policy explains how Foilcase ("we," "us," or "our") uses cookies and similar tracking technologies when you visit foilcase.com. It explains what these technologies are, why we use them, and your rights to control their use.</p>
          <p>By using Foilcase, you consent to the use of cookies as described in this policy. This policy should be read alongside our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.</p>
        </div>

        <div className="cookies-section">
          <h2>1. What Are Cookies?</h2>
          <p>Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work efficiently, remember your preferences, and provide information to website owners.</p>
          <p>Cookies can be:</p>
          <ul>
            <li><strong>Session cookies</strong> — temporary cookies that are deleted when you close your browser</li>
            <li><strong>Persistent cookies</strong> — cookies that remain on your device for a set period of time or until you delete them</li>
            <li><strong>First-party cookies</strong> — cookies set by the website you are visiting</li>
            <li><strong>Third-party cookies</strong> — cookies set by a different website than the one you are visiting</li>
          </ul>
        </div>

        <div className="cookies-section">
          <h2>2. How We Use Cookies</h2>
          <p>Foilcase uses cookies for the following purposes:</p>

          <h3>Essential cookies</h3>
          <p>These cookies are strictly necessary for the operation of our service. Without them, core features like signing in and maintaining your session would not work. These cookies cannot be disabled.</p>

          <h3>Analytics cookies</h3>
          <p>These cookies help us understand how visitors interact with Foilcase by collecting and reporting information anonymously. We use this data to improve our product and user experience.</p>

          <h3>Functional cookies</h3>
          <p>These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings across sessions.</p>
        </div>

        <div className="cookies-section">
          <h2>3. Cookies We Use</h2>
          <p>The following table describes the specific cookies used on Foilcase:</p>

          <table className="cookies-table">
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Provider</th>
                <th>Type</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>__session</strong></td>
                <td>Clerk</td>
                <td><span className="cookie-type type-essential">Essential</span></td>
                <td>Maintains your authenticated session so you stay logged in while using Foilcase</td>
                <td>Session</td>
              </tr>
              <tr>
                <td><strong>__client_uat</strong></td>
                <td>Clerk</td>
                <td><span className="cookie-type type-essential">Essential</span></td>
                <td>Used by Clerk to track user authentication state and prevent unauthorized access</td>
                <td>1 year</td>
              </tr>
              <tr>
                <td><strong>__clerk_db_jwt</strong></td>
                <td>Clerk</td>
                <td><span className="cookie-type type-essential">Essential</span></td>
                <td>Stores a JWT token used to authenticate API requests securely</td>
                <td>Session</td>
              </tr>
              <tr>
                <td><strong>AMP_*</strong></td>
                <td>Amplitude</td>
                <td><span className="cookie-type type-analytics">Analytics</span></td>
                <td>Tracks anonymous usage events and page views to help us understand how collectors use Foilcase and improve the product</td>
                <td>1 year</td>
              </tr>
              <tr>
                <td><strong>AMP_MKTG_*</strong></td>
                <td>Amplitude</td>
                <td><span className="cookie-type type-analytics">Analytics</span></td>
                <td>Tracks marketing attribution to understand how users discover Foilcase</td>
                <td>1 year</td>
              </tr>
              <tr>
                <td><strong>amp_*</strong></td>
                <td>Amplitude</td>
                <td><span className="cookie-type type-functional">Functional</span></td>
                <td>Stores a unique device identifier to maintain consistent analytics across sessions</td>
                <td>10 years</td>
              </tr>
            </tbody>
          </table>

          <p>Please note that third party services we use (Clerk and Amplitude) may update their cookies over time. For the most current information about cookies set by these services, please refer to their respective privacy and cookie policies.</p>
        </div>

        <div className="cookies-section">
          <h2>4. Third Party Cookies</h2>

          <h3>Clerk</h3>
          <p>We use Clerk for authentication and user account management. Clerk sets cookies that are essential for keeping you signed in securely. These cookies are strictly necessary and cannot be disabled without losing access to your account. For more information about Clerk's data practices, visit <a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer">clerk.com/privacy</a>.</p>

          <h3>Amplitude</h3>
          <p>We use Amplitude for product analytics. Amplitude helps us understand how collectors use Foilcase so we can improve the platform. Amplitude collects anonymous usage data including page views, feature interactions, and session information. No personally identifiable information is sent to Amplitude. For more information, visit <a href="https://amplitude.com/privacy" target="_blank" rel="noopener noreferrer">amplitude.com/privacy</a>.</p>

          <h3>Amazon Associates</h3>
          <p>Our /supplies page contains Amazon affiliate links. When you click an Amazon affiliate link and visit Amazon, Amazon may set their own cookies to track your session for the purposes of their affiliate program. These cookies are set by Amazon and are subject to <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496" target="_blank" rel="noopener noreferrer">Amazon's Cookie Notice</a>.</p>

          <h3>eBay Partner Network</h3>
          <p>We may participate in the eBay Partner Network affiliate program. When you click eBay links on Foilcase, eBay may set cookies to track referrals. These cookies are set by eBay and are subject to <a href="https://www.ebay.com/help/policies/member-behaviour-policies/user-privacy-notice-privacy-policy" target="_blank" rel="noopener noreferrer">eBay's Privacy Policy</a>.</p>
        </div>

        <div className="cookies-section">
          <h2>5. Your Cookie Choices</h2>

          <h3>Browser settings</h3>
          <p>Most web browsers allow you to control cookies through their settings. You can:</p>
          <ul>
            <li>View cookies stored on your device</li>
            <li>Delete individual cookies or all cookies</li>
            <li>Block cookies from specific websites</li>
            <li>Block all third-party cookies</li>
            <li>Set your browser to notify you when cookies are being set</li>
          </ul>
          <p>To manage cookies in your browser, visit the help section of your browser:</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
          </ul>

          <h3>Important note</h3>
          <p>Please be aware that disabling cookies may affect the functionality of Foilcase. In particular, disabling essential cookies will prevent you from signing in to your account and accessing your vault.</p>

          <h3>Opting out of analytics</h3>
          <p>You can opt out of Amplitude analytics tracking by visiting <a href="https://amplitude.com/privacy" target="_blank" rel="noopener noreferrer">Amplitude's Privacy page</a>. You can also use browser extensions that block analytics tracking such as uBlock Origin or Privacy Badger.</p>
        </div>

        <div className="cookies-section">
          <h2>6. Do Not Track</h2>
          <p>Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Currently there is no industry-wide standard for responding to DNT signals. At this time Foilcase does not respond to DNT browser signals. If a standard is adopted in the future we will update this policy accordingly.</p>
        </div>

        <div className="cookies-section">
          <h2>7. Children's Privacy</h2>
          <p>Foilcase is not directed at children under the age of 13. We do not knowingly use cookies to collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13 please contact us immediately at <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>.</p>
        </div>

        <div className="cookies-section">
          <h2>8. Changes to This Policy</h2>
          <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any significant changes by posting the updated policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.</p>
        </div>

        <div className="cookies-section">
          <h2>9. Contact Us</h2>
          <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us at:</p>
          <ul>
            <li>Email: <a href="mailto:hello@foilcase.com">hello@foilcase.com</a></li>
            <li>Website: <a href="https://foilcase.com">foilcase.com</a></li>
          </ul>
        </div>

        {/* Contact card */}
        <div className="cookies-contact">
          <p>Have a question about cookies or your privacy?</p>
          <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>
        </div>

      </div>

      <Footer />
    </>
  )
}