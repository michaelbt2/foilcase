'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown, faChevronUp, faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is Foilcase?',
        a: 'Foilcase is a free web-based trading card collection tracker for sports and TCG collectors. You can create a personal digital vault to catalog your collection, track real-time market values using live eBay pricing data, upload card images, and connect with a community of collectors.',
      },
      {
        q: 'Is Foilcase really free?',
        a: 'Yes — Foilcase is free to use. The free tier allows up to 100 cards in your vault with no credit card required. We plan to introduce a paid Collector tier in the future with additional features like unlimited cards, CSV import/export, and collection analytics, but the free tier will always remain available.',
      },
      {
        q: 'How do I create an account?',
        a: 'Visit foilcase.com and click "Create your free vault." You can sign up with your email address or using your existing Google account. Account creation takes less than 2 minutes.',
      },
      {
        q: 'What trading cards does Foilcase support?',
        a: 'Foilcase supports all major sports cards including football (NFL), basketball (NBA), baseball (MLB), and hockey (NHL), as well as trading card games including Pokémon, Magic: The Gathering, Lorcana, and other TCG formats. If you collect it, you can track it.',
      },
      {
        q: 'Do I need to download an app?',
        a: 'No — Foilcase is a web-based platform that works in any modern browser on desktop, tablet, or mobile. No app download is required. Simply visit foilcase.com from any device.',
      },
    ],
  },
  {
    category: 'Your Vault',
    questions: [
      {
        q: 'How do I add cards to my vault?',
        a: 'Navigate to My Vault and click the "Add Card" button. You can fill in the card details manually including player name, year, brand, set, condition, and grade. You can also upload front and back images of your card directly from your device or phone camera.',
      },
      {
        q: 'Can I upload photos of my cards?',
        a: 'Yes — you can upload front and back images for every card in your vault. On mobile devices the camera opens automatically so you can photograph cards directly. Images are stored securely in the cloud.',
      },
      {
        q: 'What is the 100 card limit on the free tier?',
        a: 'Free tier users can add up to 100 cards to their vault. You will receive a warning as you approach the limit. Once reached you will not be able to add new cards until you remove existing ones or upgrade to the Collector tier. Your existing data is never deleted.',
      },
      {
        q: 'How do I organize my cards into folders?',
        a: 'Free tier users can create up to 3 folders to organize their collection — for example by sport, player, or set. You can assign any card to a folder when adding or editing it. The Collector tier will offer unlimited folders.',
      },
      {
        q: 'Can I mark cards as for sale or for trade?',
        a: 'Yes — you can set the status of any card to For Sale, For Trade, or Sold. Cards marked For Sale or For Trade will appear on your public vault (if your vault is public) so other collectors can see what is available.',
      },
      {
        q: 'How do I make my vault public or private?',
        a: 'Go to Settings and toggle your vault between public and private. When public, your collection is visible to all visitors at your personal vault URL (foilcase.com/vault/yourusername). When private, only you can see your collection.',
      },
      {
        q: 'Can I track graded cards?',
        a: 'Yes — when adding a card you can specify the grading company (PSA, BGS, SGC) and grade. Graded cards are clearly labeled in your vault and the grading information is included in value comparisons.',
      },
    ],
  },
  {
    category: 'Pricing & Values',
    questions: [
      {
        q: 'Where does Foilcase get its pricing data?',
        a: 'Foilcase uses the eBay API to pull live listing prices and recent sold comparables (sold comps) for trading cards. This gives you real market data based on actual transactions rather than estimated or dealer prices.',
      },
      {
        q: 'How accurate are the card values?',
        a: 'Card values on Foilcase are based on live eBay data and are as accurate as the current eBay market. Values fluctuate based on player performance, market trends, and supply and demand. We recommend using sold comps (recent completed sales) rather than active listing prices for the most accurate valuation.',
      },
      {
        q: 'How do I find the value of a specific card?',
        a: 'Use the Search page to find any card. Search by player name, set, year, or brand and Foilcase will pull live eBay data showing active listings and recent sold comps. The sold comps summary card at the top of results shows the average sold price, price range, and number of recent sales.',
      },
      {
        q: 'Can I track what I paid for cards vs what they are worth?',
        a: 'Yes — when adding a card you can enter the cost you paid and the current market value. Your vault dashboard displays your total collection value, total cost basis, and overall gain or loss across your entire collection.',
      },
      {
        q: 'How often is pricing data updated?',
        a: 'Pricing data is pulled live from eBay every time you perform a search. There is no cached or stale data — every search shows the most current listings and sold comps available on eBay at that moment.',
      },
    ],
  },
  {
    category: 'Community',
    questions: [
      {
        q: 'How do I find other collectors on Foilcase?',
        a: 'Visit the Community page to browse public collector vaults. You can search for collectors by name or search for specific players across all public vaults. You can also follow collectors whose collections interest you.',
      },
      {
        q: 'Can I buy or sell cards directly on Foilcase?',
        a: 'Foilcase is a collection tracker, not a marketplace. You can mark cards as For Sale or For Trade in your public vault and other collectors can see them, but transactions happen off-platform. We recommend connecting with interested collectors and completing transactions through eBay, COMC, or other trusted platforms.',
      },
      {
        q: 'What are achievement tiers?',
        a: 'Foilcase has five achievement tiers based on the number of cards in your vault — Collector (1-24 cards), Enthusiast (25-99), Veteran (100-249), Elite (250-499), and Legend (500+). Your tier is displayed on your public vault and collector card in the community.',
      },
      {
        q: 'How do I follow another collector?',
        a: 'Visit the Community page and click "Follow" on any collector card. You can also follow collectors directly from their public vault page. Following a collector adds them to your Following tab in the Community page.',
      },
    ],
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        q: 'Is my collection data private?',
        a: 'By default your vault is private and only visible to you. You can choose to make it public in Settings, which allows other collectors to view your collection at your personal vault URL. You can switch between public and private at any time.',
      },
      {
        q: 'How does Foilcase handle my personal data?',
        a: 'We take your privacy seriously. We collect only the information necessary to provide our service — your name, email address, username, and collection data. We do not sell your personal data. For full details see our Privacy Policy.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Foilcase does not currently process payments. When the Collector tier launches, payments will be processed through Stripe, a PCI-compliant payment processor. Foilcase will never store your credit card information directly.',
      },
      {
        q: 'Can I delete my account and data?',
        a: 'Yes — you can request deletion of your account and all associated data at any time by contacting us at hello@foilcase.com. We will delete your data within 30 days of your request.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'What browsers does Foilcase support?',
        a: 'Foilcase works in all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience. Internet Explorer is not supported.',
      },
      {
        q: 'Does Foilcase work on mobile?',
        a: 'Yes — Foilcase is fully responsive and works on mobile devices. The card vault is optimized for mobile use including direct camera access for photographing cards. Visit foilcase.com from your phone browser.',
      },
      {
        q: 'Can I import my existing collection from a spreadsheet?',
        a: 'CSV import is planned as a feature for the Collector tier. If you currently track your collection in a spreadsheet you will be able to import it directly into Foilcase once the Collector tier launches. Join the waitlist on our Pricing page to be notified when this feature is available.',
      },
      {
        q: 'Can I export my collection data?',
        a: 'CSV export is planned for the Collector tier. This will allow you to download your entire collection as a spreadsheet at any time. Your data always belongs to you.',
      },
    ],
  },
  {
    category: 'Collector Tier',
    questions: [
      {
        q: 'What is the Collector tier?',
        a: 'The Collector tier is our upcoming paid plan designed for serious collectors who need more than the free tier offers. It includes unlimited cards, unlimited folders, CSV import/export, collection analytics, card value history, a Collector badge on your public vault, priority support, and early access to new features.',
      },
      {
        q: 'How much will the Collector tier cost?',
        a: 'The Collector tier will be $4.99/month or $39.99/year (saving 33% vs monthly). Early waitlist members will receive a special launch discount.',
      },
      {
        q: 'When will the Collector tier launch?',
        a: 'We are actively developing the Collector tier. Join the waitlist on our Pricing page and we will notify you the moment it launches.',
      },
      {
        q: 'Can I try the Collector tier before paying?',
        a: 'We plan to offer a free trial period for the Collector tier at launch. Join the waitlist to be notified of trial details when they are announced.',
      },
    ],
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState('')

  const toggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const filtered = search.trim()
    ? faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          q => q.q.toLowerCase().includes(search.toLowerCase()) ||
               q.a.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(cat => cat.questions.length > 0)
    : faqs

  return (
    <>
      <style>{`
        .faq-hero{background:#0D0D0D;padding:64px 24px;text-align:center;position:relative;overflow:hidden}
        .faq-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .faq-hero-inner{max-width:640px;margin:0 auto;position:relative;z-index:1}
        .faq-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(27,111,240,.2);color:#7EB6FF;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:20px}
        .faq-title{font-size:clamp(28px,5vw,46px);font-weight:800;color:#fff;letter-spacing:-1.5px;line-height:1.08;margin-bottom:16px}
        .faq-title em{font-style:italic;color:#7EB6FF}
        .faq-sub{font-size:16px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:32px}
        .faq-search-wrap{position:relative;max-width:480px;margin:0 auto}
        .faq-search-icon{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:#9A9A9A;font-size:14px}
        .faq-search{width:100%;padding:12px 16px 12px 42px;border-radius:100px;border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;color:#0D0D0D;outline:none;box-shadow:0 4px 16px rgba(0,0,0,.2)}
        .faq-search::placeholder{color:#9A9A9A}
        .faq-layout{max-width:760px;margin:0 auto;padding:48px 24px}
        .faq-category{margin-bottom:40px}
        .faq-category-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#1B6FF0;margin-bottom:16px}
        .faq-item{border:1px solid #EFEFEF;border-radius:10px;overflow:hidden;margin-bottom:8px;background:#fff;transition:all .15s}
        .faq-item:hover{border-color:#D8D8D8}
        .faq-question{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 20px;cursor:pointer;font-size:15px;font-weight:600;color:#0D0D0D;line-height:1.4}
        .faq-answer{padding:0 20px 16px;font-size:14px;color:#555;line-height:1.75}
        .faq-answer a{color:#1B6FF0;text-decoration:none}
        .faq-answer a:hover{text-decoration:underline}
        .faq-chevron{color:#9A9A9A;flex-shrink:0;font-size:12px;transition:transform .2s}
        .faq-bottom{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:12px;padding:32px;text-align:center;margin-top:48px}
        .faq-bottom-title{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:8px}
        .faq-bottom-sub{font-size:14px;color:#555;line-height:1.6;margin-bottom:16px}
        .faq-bottom a{color:#1B6FF0;font-weight:600;text-decoration:none}
        .faq-bottom a:hover{text-decoration:underline}
        .faq-empty{text-align:center;padding:48px 24px;color:#9A9A9A;font-size:15px}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="faq-hero">
        <div className="faq-hero-inner">
          <div className="faq-eyebrow">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>FAQ
          </div>
          <h1 className="faq-title">Frequently asked <em>questions</em></h1>
          <p className="faq-sub">Everything you need to know about Foilcase. Can't find what you're looking for? Contact us at hello@foilcase.com</p>
          <div className="faq-search-wrap">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="faq-search-icon"/>
            <input
              className="faq-search"
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="faq-layout">

        {filtered.length === 0 ? (
          <div className="faq-empty">
            No questions found for "{search}" — try a different search or <a href="mailto:hello@foilcase.com" style={{color:'#1B6FF0'}}>contact us</a>.
          </div>
        ) : (
          filtered.map(cat => (
            <div key={cat.category} className="faq-category">
              <div className="faq-category-title">{cat.category}</div>
              {cat.questions.map((item, i) => {
                const key = `${cat.category}-${i}`
                const isOpen = openItems[key]
                return (
                  <div key={key} className="faq-item">
                    <div className="faq-question" onClick={() => toggle(key)}>
                      <span>{item.q}</span>
                      <FontAwesomeIcon
                        icon={isOpen ? faChevronUp : faChevronDown}
                        className="faq-chevron"
                        style={{transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)'}}
                      />
                    </div>
                    {isOpen && (
                      <div className="faq-answer">{item.a}</div>
                    )}
                  </div>
                )
              })}
            </div>
          ))
        )}

        {/* Bottom CTA */}
        <div className="faq-bottom">
          <div className="faq-bottom-title">Still have questions?</div>
          <p className="faq-bottom-sub">Can't find the answer you're looking for? Our team is happy to help.</p>
          <Link href="/contact" style={{color:'#1B6FF0',fontWeight:600,textDecoration:'none'}}>
            Contact us →
          </Link>
        </div>

      </div>

      <Footer />
    </>
  )
}