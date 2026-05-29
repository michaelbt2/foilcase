import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Changelog — Foilcase',
  description: 'The latest updates, improvements, and new features on Foilcase.',
}

const releases = [
{
    date: 'May 2026',
    entries: [
      {
        type: 'new',
        title: 'Want List',
        desc: 'Star any card from Search results to add it to your personal Want List. Access your Want List from the new tab toggle in your vault header alongside My Vault.',
      },
      {
        type: 'new',
        title: 'eBay username on public vault',
        desc: 'Add your eBay username in Settings and it will appear as a clickable Shop on eBay link on your public vault so other collectors can browse your listings.',
      },
      {
        type: 'new',
        title: '100 card limit warning for free users',
        desc: 'Free tier users now see a warning banner when approaching and reaching the 100 card limit with an upgrade prompt. Upgrade to Collector for unlimited cards.',
      },
      {
        type: 'new',
        title: '3 folder maximum for free users',
        desc: 'Free tier users are limited to 3 folders. Upgrade to Collector for unlimited folders.',
      },
      {
        type: 'new',
        title: 'Resources dropdown in navigation',
        desc: 'Added a Resources dropdown to the main nav containing Learn, Supplies, FAQ, and Changelog — making content pages easier to find.',
      },
      {
        type: 'improved',
        title: '/learn category filters',
        desc: 'The category filter pills on the Learn hub now filter articles in real time. Each category shows an article count and a clear filter option appears when active.',
      },
      {
        type: 'new',
        title: '/learn hub expanded to 11 articles',
        desc: 'Added three new collector guides — What is Card Grading, How to Store Trading Cards, and the Trading Card Investment Guide.',
      },
      {
        type: 'new',
        title: 'Recommended Supplies on /learn articles',
        desc: 'All 11 learn articles now include a Recommended Supplies section at the bottom with products matched to the article topic.',
      },
      {
        type: 'new',
        title: 'Monthly Giveaway page',
        desc: 'Launched a monthly giveaway page where collectors can enter to win a free trading card. Includes entry form, rules, eligibility requirements, and winner announcement section.',
      },
      {
        type: 'new',
        title: 'FAQ page',
        desc: 'Launched a fully searchable FAQ page covering getting started, pricing, community, privacy, and the upcoming Collector tier.',
      },
      {
        type: 'new',
        title: 'Pricing page',
        desc: 'Introduced the Pricing page showing Free and Collector tier features with a monthly and annual billing toggle. Join the waitlist to be notified when the Collector tier launches.',
      },
      {
        type: 'new',
        title: 'Legal pages',
        desc: 'Published Terms of Service, Privacy Policy, Cookie Policy, Acceptable Use Policy, DMCA & Copyright Policy, and Affiliate Disclosure.',
      },
      {
        type: 'new',
        title: 'Supplies page',
        desc: 'Launched a curated supplies page with hand-picked products for collectors across storage, organization, grading, display, and shipping categories.',
      },
      {
        type: 'new',
        title: 'Contact page',
        desc: 'Added a contact page for general inquiries, feedback, and privacy requests.',
      },
      {
        type: 'improved',
        title: 'Search — major improvements',
        desc: 'Added sport filter pills, personalized recent searches, a sold comps summary card above results, an improved empty state with trending suggestions, and a smarter search dropdown.',
      },
      {
        type: 'improved',
        title: 'Community collector cards',
        desc: 'Collector cards now show a 2-line bio snippet with a cleaner, more readable layout.',
      },
      {
        type: 'improved',
        title: 'Collection page sidebar',
        desc: 'Filters now collapse by default to reduce visual clutter and bring the Collector Essentials section into view sooner.',
      },
      {
        type: 'new',
        title: 'Collector Essentials sidebar',
        desc: 'Added recommended collector supplies to the collection page sidebar with curated product recommendations.',
      },
      {
        type: 'new',
        title: 'Mobile camera capture',
        desc: 'Card image uploads now open the rear camera directly on mobile devices making it faster to photograph and add cards to your vault.',
      },
    ],
  },
  {
    date: 'April 2026',
    entries: [
      {
        type: 'new',
        title: 'SEO foundation',
        desc: 'Added unique metadata to all pages, generated sitemap.xml and robots.txt, built an Open Graph image for social sharing previews, and added Twitter card meta tags.',
      },
      {
        type: 'new',
        title: 'Google Search Console connected',
        desc: 'Connected Foilcase to Google Search Console with sitemap submitted. All pages and articles are now being indexed by Google.',
      },
      {
        type: 'new',
        title: 'Google Workspace email',
        desc: 'Set up hello@foilcase.com on Google Workspace for all platform communications, support, and legal correspondence.',
      },
      {
        type: 'new',
        title: 'Public vault sharing',
        desc: 'Collectors can now share their vault with a single click using the Share Vault button. Public vaults are accessible at foilcase.com/vault/username.',
      },
      {
        type: 'new',
        title: 'Community page — player search',
        desc: 'Added the ability to search for specific players across all public vaults. Find which collectors own a specific card or player.',
      },
      {
        type: 'new',
        title: 'Trending searches',
        desc: 'The search discovery page now shows real trending searches pulled from the Foilcase community — updated in real time based on what collectors are searching.',
      },
      {
        type: 'new',
        title: 'Market page — live listings and auctions',
        desc: 'Launched the Market intelligence page with live eBay listings, ending soon graded auctions, and sport filter pills across football, basketball, baseball, hockey, Pokémon, Lorcana, and Magic.',
      },
      {
        type: 'improved',
        title: 'Card vault — sold comps per card',
        desc: 'Individual cards now show average sold price, price range, and number of recent sales alongside the active listing price for more accurate valuations.',
      },
      {
        type: 'new',
        title: 'Folder organization',
        desc: 'Added the ability to create folders in your vault to organize cards by sport, player, set, or any custom category.',
      },
      {
        type: 'new',
        title: 'Bulk actions',
        desc: 'Added bulk selection and bulk actions to the collection page — select multiple cards and update status, move to folder, or delete in one action.',
      },
    ],
  },
  {
    date: 'March 2026',
    entries: [
      {
        type: 'new',
        title: 'Foilcase launches in public beta',
        desc: 'Foilcase is now live at foilcase.com. Create your free vault, track your trading card collection, and explore live eBay pricing.',
      },
      {
        type: 'new',
        title: 'Card vault',
        desc: 'The core vault experience — add cards, upload images, track condition and grade, set cost and value, and organize your entire collection in one place.',
      },
      {
        type: 'new',
        title: 'Live eBay search and pricing',
        desc: 'Search any trading card and get live eBay listings and sold comparables powered by the eBay API. Add cards to your vault directly from search results.',
      },
      {
        type: 'new',
        title: 'Community page',
        desc: 'Discover other collectors, browse public vaults, and follow collectors whose collections you find interesting.',
      },
      {
        type: 'new',
        title: 'Achievement tiers',
        desc: 'Five achievement tiers based on collection size — Collector, Enthusiast, Veteran, Elite, and Legend. Your tier is displayed on your public vault and community card.',
      },
      {
        type: 'new',
        title: 'Start Here guide',
        desc: 'Added a comprehensive Start Here page explaining every feature of Foilcase with screenshots and step-by-step guidance.',
      },
      {
        type: 'new',
        title: 'Settings page',
        desc: 'Manage your username, display name, bio, and vault privacy settings from a dedicated settings page.',
      },
    ],
  },
]

const typeConfig: Record<string, { label: string; bg: string; color: string }> = {
  new: { label: 'New', bg: '#E6F9F0', color: '#00A861' },
  improved: { label: 'Improved', bg: '#EBF2FF', color: '#1B6FF0' },
  fixed: { label: 'Fixed', bg: '#FEF3E2', color: '#E8820C' },
  coming: { label: 'Coming Soon', bg: '#F2ECFB', color: '#7B4FCA' },
}

export default function Changelog() {
  return (
    <>
      <style>{`
        .cl-hero{background:#0D0D0D;padding:64px 24px;text-align:center;position:relative;overflow:hidden}
        .cl-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.2),transparent)}
        .cl-hero-inner{max-width:640px;margin:0 auto;position:relative;z-index:1}
        .cl-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(27,111,240,.2);color:#7EB6FF;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:20px}
        .cl-title{font-size:clamp(28px,5vw,46px);font-weight:800;color:#fff;letter-spacing:-1.5px;line-height:1.08;margin-bottom:16px}
        .cl-title em{font-style:italic;color:#7EB6FF}
        .cl-sub{font-size:16px;color:rgba(255,255,255,.6);line-height:1.7}
        .cl-layout{max-width:760px;margin:0 auto;padding:48px 24px}
        .cl-release{margin-bottom:56px;position:relative}
        .cl-release-header{display:flex;align-items:center;gap:16px;margin-bottom:24px}
        .cl-release-date{font-size:20px;font-weight:800;letter-spacing:-.5px;color:#0D0D0D}
        .cl-release-line{flex:1;height:1px;background:#EFEFEF}
        .cl-entry{display:flex;gap:16px;margin-bottom:16px;padding:20px;background:#fff;border:1px solid #EFEFEF;border-radius:10px;transition:all .15s}
        .cl-entry:hover{border-color:#D8D8D8;box-shadow:0 4px 16px rgba(0,0,0,.06)}
        .cl-entry-badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;white-space:nowrap;flex-shrink:0;height:fit-content;margin-top:2px}
        .cl-entry-content{flex:1;min-width:0}
        .cl-entry-title{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:4px}
        .cl-entry-desc{font-size:14px;color:#555;line-height:1.65}
        .cl-bottom{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:12px;padding:32px;text-align:center;margin-top:48px}
        .cl-bottom-title{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:8px}
        .cl-bottom-sub{font-size:14px;color:#555;line-height:1.6;margin-bottom:16px}
        .cl-bottom a{color:#1B6FF0;font-weight:600;text-decoration:none}
        .cl-bottom a:hover{text-decoration:underline}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="cl-hero">
        <div className="cl-hero-inner">
          <div className="cl-eyebrow">What's new</div>
          <h1 className="cl-title">Foilcase <em>changelog</em></h1>
          <p className="cl-sub">Every update, improvement, and new feature — documented as we build.</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="cl-layout">
        {releases.map(release => (
          <div key={release.date} className="cl-release">
            <div className="cl-release-header">
              <div className="cl-release-date">{release.date}</div>
              <div className="cl-release-line"/>
            </div>
            {release.entries.map((entry, i) => {
              const config = typeConfig[entry.type]
              return (
                <div key={i} className="cl-entry">
                  <div
                    className="cl-entry-badge"
                    style={{background:config.bg,color:config.color}}
                  >
                    {config.label}
                  </div>
                  <div className="cl-entry-content">
                    <div className="cl-entry-title">{entry.title}</div>
                    <div className="cl-entry-desc">{entry.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        {/* Bottom CTA */}
        <div className="cl-bottom">
          <div className="cl-bottom-title">Have a feature request?</div>
          <p className="cl-bottom-sub">We build Foilcase with collectors in mind. If there is something you would like to see, we would love to hear from you.</p>
          <a href="/contact">Share your feedback →</a>
        </div>
      </div>

      <Footer />
    </>
  )
}