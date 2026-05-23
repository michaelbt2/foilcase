import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Foilcase',
  description: 'How Foilcase collects, uses, and protects your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        .privacy-hero{background:#fff;border-bottom:1px solid #EFEFEF;padding:48px 24px}
        .privacy-hero-inner{max-width:760px;margin:0 auto}
        .privacy-eyebrow{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1B6FF0;margin-bottom:12px}
        .privacy-title{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-1px;color:#0D0D0D;margin-bottom:8px}
        .privacy-meta{font-size:13px;color:#9A9A9A}
        .privacy-layout{max-width:760px;margin:0 auto;padding:48px 24px}
        .privacy-section{margin-bottom:40px}
        .privacy-section h2{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #EFEFEF}
        .privacy-section h3{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:8px;margin-top:16px}
        .privacy-section p{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px}
        .privacy-section ul{font-size:15px;color:#555;line-height:1.75;margin-bottom:12px;padding-left:20px;display:flex;flex-direction:column;gap:6px}
        .privacy-section li{color:#555}
        .privacy-section a{color:#1B6FF0;text-decoration:none}
        .privacy-section a:hover{text-decoration:underline}
        .privacy-contact{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:12px;padding:24px;margin-top:48px;text-align:center}
        .privacy-contact p{font-size:14px;color:#555;margin-bottom:8px}
        .privacy-contact a{color:#1B6FF0;font-weight:600;text-decoration:none}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="privacy-hero">
        <div className="privacy-hero-inner">
          <div className="privacy-eyebrow">Legal</div>
          <h1 className="privacy-title">Privacy Policy</h1>
          <div className="privacy-meta">Last updated: May 2026 · Effective: May 2026</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="privacy-layout">

        <div className="privacy-section">
          <p>
            Welcome to Foilcase. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our services at foilcase.com.
          </p>
          <p>
            Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.
          </p>
        </div>

        <div className="privacy-section">
          <h2>1. Information We Collect</h2>
          <h3>Information you provide directly</h3>
          <ul>
            <li>Account information — your name and email address when you sign up via Clerk authentication</li>
            <li>Profile information — your username, display name, and bio</li>
            <li>Collection data — card details, images, values, and notes you add to your vault</li>
            <li>Search queries — player names and card searches you perform</li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li>Usage data — pages visited, features used, and actions taken (via Amplitude analytics)</li>
            <li>Device information — browser type, operating system, and IP address</li>
            <li>Cookies — session cookies used by Clerk for authentication</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain the Foilcase service</li>
            <li>Create and manage your account and vault</li>
            <li>Enable public vault sharing when you choose to make your vault public</li>
            <li>Improve and optimize our platform based on usage patterns</li>
            <li>Send account-related emails such as password resets</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze usage trends to improve user experience</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>3. How We Share Your Information</h2>
          <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
          <h3>Third party service providers</h3>
          <ul>
            <li><strong>Clerk</strong> — authentication and user account management</li>
            <li><strong>Supabase</strong> — database storage and file hosting</li>
            <li><strong>Amplitude</strong> — product analytics and usage tracking</li>
            <li><strong>eBay API</strong> — live card pricing and listing data</li>
            <li><strong>Vercel</strong> — website hosting and deployment</li>
          </ul>
          <h3>Public vault content</h3>
          <p>If you choose to make your vault public, your username, display name, bio, and card collection will be visible to all visitors of Foilcase. You can make your vault private at any time in Settings.</p>
          <h3>Legal requirements</h3>
          <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>
        </div>

        <div className="privacy-section">
          <h2>4. Data Retention</h2>
          <p>We retain your personal information for as long as your account is active or as needed to provide you services. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal purposes.</p>
          <p>Search query logs are retained for up to 90 days for analytics purposes and then deleted.</p>
        </div>

        <div className="privacy-section">
          <h2>5. Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
            <li><strong>Correction</strong> — request that we correct inaccurate or incomplete data</li>
            <li><strong>Deletion</strong> — request that we delete your personal data</li>
            <li><strong>Export</strong> — request an export of your collection data</li>
            <li><strong>Opt-out</strong> — opt out of analytics tracking</li>
          </ul>
          <p>To exercise any of these rights, please contact us at the email address below.</p>
        </div>

        <div className="privacy-section">
          <h2>6. Cookies</h2>
          <p>We use cookies and similar tracking technologies to operate our service. Specifically:</p>
          <ul>
            <li><strong>Authentication cookies</strong> — set by Clerk to keep you logged in securely</li>
            <li><strong>Analytics cookies</strong> — set by Amplitude to understand how our service is used</li>
          </ul>
          <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.</p>
        </div>

        <div className="privacy-section">
          <h2>7. Children's Privacy</h2>
          <p>Foilcase is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take appropriate action.</p>
        </div>

        <div className="privacy-section">
          <h2>8. Security</h2>
          <p>We take the security of your personal information seriously and use commercially reasonable measures to protect it. However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
        </div>

        <div className="privacy-section">
          <h2>9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
        </div>

        <div className="privacy-section">
          <h2>10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at:</p>
          <ul>
            <li>Email: <a href="mailto:hello@foilcase.com">hello@foilcase.com</a></li>
            <li>Website: <a href="https://foilcase.com">foilcase.com</a></li>
          </ul>
        </div>

        {/* Contact card */}
        <div className="privacy-contact">
          <p>Have a question about your data or privacy?</p>
          <a href="mailto:hello@foilcase.com">hello@foilcase.com</a>
        </div>

      </div>

      <Footer />
    </>
  )
}