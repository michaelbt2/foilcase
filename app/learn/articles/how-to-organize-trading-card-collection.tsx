import ArticleCTA from '../components/ArticleCTA'
import Link from 'next/link'

export default function HowToOrganizeCards() {
  return (
    <>
      <div style={{background:'#F7F7F7',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:'#9A9A9A',marginBottom:'12px'}}>Key Takeaways</div>
        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {[
            'Choose an organization system that matches how you think about your collection',
            'Digital tracking is essential for collections of any meaningful size',
            'Proper storage protects your cards and preserves their value',
            'Separating cards by status (owned, for sale, for trade) makes management easier',
            'Foilcase is free and designed specifically for organizing card collections',
          ].map(item => (
            <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'14px',color:'#0D0D0D',fontWeight:500}}>
              <span style={{color:'#00A861',fontWeight:700,flexShrink:0}}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2>Why Organization Matters</h2>
      <p>A disorganized collection is a frustrating collection. When you can't find a specific card, don't know what you own, or have no idea what your collection is worth — the hobby stops being fun and starts feeling like a burden.</p>
      <p>Good organization solves all of these problems. It also protects your investment by ensuring cards are stored properly, makes buying and selling easier, and helps you identify gaps in your collection.</p>

      <h2>Step 1 — Choose Your Organization System</h2>
      <p>Before organizing anything, decide on your primary organizational system. The best system is the one that matches how you naturally think about your collection.</p>

      <h3>By player (most common)</h3>
      <p>Group all cards of the same player together regardless of year or set. This is the most natural system for player collectors (PC collectors) who focus on building deep collections of specific athletes.</p>
      <p><strong>Best for:</strong> Collectors who focus on specific players or teams.</p>

      <h3>By sport and year</h3>
      <p>Organize by sport first, then chronologically within each sport. Good for set collectors who want to track complete sets from specific years.</p>
      <p><strong>Best for:</strong> Set collectors, vintage collectors.</p>

      <h3>By set</h3>
      <p>Group all cards from the same set together regardless of player. Ideal if you're actively trying to complete specific sets.</p>
      <p><strong>Best for:</strong> Set completion collectors.</p>

      <h3>By value</h3>
      <p>Separate your collection into tiers by value — high value cards get premium storage and tracking, lower value cards get standard storage.</p>
      <p><strong>Best for:</strong> Investment-focused collectors.</p>

      <blockquote>
        <p><strong>Pro tip:</strong> Most serious collectors use a hybrid system — organizing physically by player or set, while tracking digitally by multiple attributes simultaneously.</p>
      </blockquote>

      <hr/>

      <h2>Step 2 — Set Up Digital Tracking</h2>
      <p>Physical organization alone isn't enough for a serious collection. Digital tracking gives you the ability to search, filter, sort, and value your collection in ways that physical binders and boxes simply can't.</p>

      <h3>What to track for each card</h3>
      <ul>
        <li><strong>Player name</strong> — searchable identifier</li>
        <li><strong>Year</strong> — essential for identifying the card</li>
        <li><strong>Brand and set</strong> — Panini Prizm, Topps Chrome, etc.</li>
        <li><strong>Card number</strong> — for set completion tracking</li>
        <li><strong>Condition</strong> — raw condition or grading info</li>
        <li><strong>Sport</strong> — for filtering and reporting</li>
        <li><strong>Cost paid</strong> — your purchase price</li>
        <li><strong>Current value</strong> — current market value</li>
        <li><strong>Status</strong> — owned, for sale, for trade, sold</li>
        <li><strong>Card image</strong> — front and back photos</li>
        <li><strong>Notes</strong> — serial numbers, purchase story, condition notes</li>
      </ul>

      <h3>Using Foilcase for digital tracking</h3>
      <p>Foilcase is a free digital vault designed specifically for trading card collectors. It lets you track all of the above for every card in your collection, with live eBay pricing to help you keep values current. You can organize cards into custom folders, filter by sport or status, and view your entire collection as a visual gallery.</p>
      <p><Link href="/collection">Start your free vault on Foilcase →</Link></p>

      <hr/>

      <h2>Step 3 — Physical Storage Solutions</h2>
      <p>How you store your cards physically has a major impact on their long-term condition and value. Here are the main storage options from basic to premium:</p>

      <h3>Penny sleeves</h3>
      <p>Thin plastic sleeves that provide basic protection from scratches and fingerprints. Essential for any card worth keeping. Cost: less than $0.01 per sleeve.</p>

      <h3>Top loaders</h3>
      <p>Rigid plastic holders that provide structure and protection for individual cards. Standard for any card worth over $5. Available in standard size and various thicknesses for thick cards. Cost: $0.10-$0.50 per loader.</p>

      <h3>Card savers</h3>
      <p>Semi-rigid holders preferred by grading companies for card submission. Less rigid than top loaders which can cause edge damage during shipping. Cost: $0.15-$0.30 each.</p>

      <h3>Magnetic cases (One-Touch holders)</h3>
      <p>Premium magnetic closure cases that display cards beautifully. Best for your most valuable raw cards. Cost: $1-$5 each.</p>

      <h3>Binders and pages</h3>
      <p>Nine-pocket pages in a binder are great for organizing large quantities of lower-value cards. Use side-loading pages to reduce card movement. Cost: $0.10-$0.20 per page.</p>

      <h3>Storage boxes</h3>
      <p>Cardboard or plastic boxes hold large quantities of sleeved or top-loaded cards efficiently. Available in various sizes from 100-count to 5,000-count boxes.</p>

      <hr/>

      <h2>Step 4 — Organize by Status</h2>
      <p>One of the most practical organizational decisions is separating cards by their status — what you're doing with them. This makes trading, selling, and managing your active collection significantly easier.</p>

      <h3>Recommended status categories</h3>
      <ul>
        <li><strong>In my vault</strong> — cards you own and plan to keep</li>
        <li><strong>For sale</strong> — cards actively listed or available for purchase</li>
        <li><strong>For trade</strong> — cards you'd exchange for something you need</li>
        <li><strong>Sold</strong> — completed sales for record keeping</li>
      </ul>
      <p>Foilcase lets you assign each card a status and filter your collection by status — making it easy to see exactly what's available for sale or trade at any given time.</p>

      <hr/>

      <h2>Step 5 — Create Folders for Sub-Collections</h2>
      <p>Within your main collection, you likely have sub-collections that deserve their own organizational structure. Common folders include:</p>
      <ul>
        <li><strong>PC (Personal Collection)</strong> — your favorite cards that are never for sale</li>
        <li><strong>Investment pieces</strong> — cards held for appreciation</li>
        <li><strong>Graded cards</strong> — all your slabs in one place</li>
        <li><strong>For trade</strong> — cards available for trade</li>
        <li><strong>Player-specific folders</strong> — e.g. "Patrick Mahomes PC" or "Charizard collection"</li>
      </ul>

      <hr/>

      <h2>Step 6 — Regular Maintenance</h2>
      <p>Organization isn't a one-time task — it's an ongoing practice. Set aside time regularly to:</p>
      <ul>
        <li>Add new cards to your digital tracker promptly after purchase</li>
        <li>Update values for key cards monthly or after major news events</li>
        <li>Review your for-sale and for-trade lists to keep them current</li>
        <li>Check physical storage for any damaged sleeves or holders</li>
        <li>Archive sold cards with their sale price for tax records</li>
      </ul>

      <hr/>

      <h2>Frequently Asked Questions</h2>
      <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginTop:'16px'}}>
        {[
          {
            q: 'What is the best way to organize a large card collection?',
            a: 'For large collections, a hybrid approach works best — organize physically by player or set for easy retrieval, and track digitally with a tool like Foilcase for searching, filtering, and valuation. Digital tracking becomes essential once you have more than 100 cards.',
          },
          {
            q: 'Should I put all my cards in sleeves?',
            a: 'Yes — at minimum, every card worth keeping should be in a penny sleeve to protect it from scratches and fingerprints. Any card worth over $5 should also be in a top loader or card saver for structural protection.',
          },
          {
            q: 'How do I track what my collection is worth?',
            a: 'The most efficient way is to use a digital tracking tool like Foilcase where you can enter the current value for each card. Your total collection value is calculated automatically. Use eBay sold listings to find current market values for individual cards.',
          },
          {
            q: 'What is a PC in card collecting?',
            a: 'PC stands for Personal Collection — the cards that are your absolute favorites and are not for sale at any price. Most serious collectors maintain a PC of their favorite player, team, or set alongside their tradeable inventory.',
          },
          {
            q: 'How do I organize my collection for a trade?',
            a: 'Keep a clearly labeled section of your collection designated as "for trade" — either physically separated or digitally tagged in your tracking system. Foilcase lets you mark cards as For Trade so other collectors can see them in your public vault.',
          },
        ].map(faq => (
          <div key={faq.q} style={{border:'1px solid #EFEFEF',borderRadius:'8px',padding:'20px',background:'#fff'}}>
            <div style={{fontSize:'15px',fontWeight:700,color:'#0D0D0D',marginBottom:'8px'}}>{faq.q}</div>
            <div style={{fontSize:'14px',color:'#555',lineHeight:1.7}}>{faq.a}</div>
          </div>
        ))}
      </div>

      <ArticleCTA />
    </>
  )
}