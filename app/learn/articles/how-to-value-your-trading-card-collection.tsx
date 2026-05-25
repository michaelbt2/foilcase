import ArticleCTA from '../components/ArticleCTA'
import Link from 'next/link'
import ArticleProducts from '../components/ArticleProducts'

export default function HowToValueCards() {
  return (
    <>
      {/* Key takeaways */}
      <div style={{background:'#F7F7F7',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:'#9A9A9A',marginBottom:'12px'}}>Key Takeaways</div>
        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {[
            'eBay sold listings are the most accurate way to value trading cards',
            'Condition and grading have the biggest impact on card value',
            'Population reports help understand a card\'s scarcity',
            'Track your collection value over time to understand your portfolio',
            'Free tools like Foilcase make it easy to monitor your collection\'s worth',
          ].map(item => (
            <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'14px',color:'#0D0D0D',fontWeight:500}}>
              <span style={{color:'#00A861',fontWeight:700,flexShrink:0}}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2>Why Card Valuation Matters</h2>
      <p>Whether you're a casual collector or a serious investor, knowing what your cards are worth is fundamental to the hobby. Accurate valuation helps you make smart buying decisions, price cards fairly when selling or trading, and understand the true worth of your collection.</p>
      <p>The challenge is that card values fluctuate constantly based on player performance, set releases, grading population changes, and broader market trends. A card worth $50 today might be worth $200 next month — or $20.</p>
      <p>This guide walks through the most reliable methods to value any trading card in your collection.</p>

      <h2>Method 1 — eBay Sold Listings (Most Accurate)</h2>
      <p>The single most reliable way to value a trading card is to look at what identical or near-identical cards have actually sold for on eBay. This is called using <strong>sold comps</strong> (comparable sales).</p>
      <p>Here's why sold listings matter more than active listings:</p>
      <ul>
        <li><strong>Active listings</strong> show what sellers want — they can be wildly overpriced</li>
        <li><strong>Sold listings</strong> show what buyers actually paid — real market value</li>
      </ul>

      <h3>How to find sold comps on eBay</h3>
      <ol>
        <li>Go to eBay and search for your card (e.g. "2020 Prizm Patrick Mahomes PSA 10")</li>
        <li>In the left sidebar under Show only, check Sold items</li>
        <li>Look at recent sales from the last 30-60 days</li>
        <li>Note the price range and average</li>
      </ol>

      <blockquote>
        <p><strong>Pro tip:</strong> Filter by condition, grading company, and grade to get the most accurate comparison. A PSA 10 and a PSA 9 of the same card can differ in value by 50% or more.</p>
      </blockquote>

      <h3>Using Foilcase for sold comps</h3>
      <p>Foilcase's <Link href="/search">Search page</Link> pulls live eBay data showing both active listings and recent sold prices side by side — saving you the manual eBay search process.</p>

      <hr/>

      <h2>Method 2 — Consider the Card's Condition</h2>
      <p>Condition is the single biggest factor affecting a card's value outside of the player and set. The difference between a Near Mint card and a Lightly Played card can mean a 50-80% difference in value.</p>

      <h3>Raw card condition grades</h3>
      <p>For ungraded cards, collectors use a standard condition scale:</p>
      <ul>
        <li><strong>Gem Mint (GM)</strong> — perfect in every way, no flaws visible</li>
        <li><strong>Mint (M)</strong> — nearly perfect, extremely minor flaws</li>
        <li><strong>Near Mint-Mint (NM-MT)</strong> — slight wear on edges or corners</li>
        <li><strong>Near Mint (NM)</strong> — minor wear on corners, edges, or surface</li>
        <li><strong>Excellent-Mint (EX-MT)</strong> — light wear, slight surface scratches</li>
        <li><strong>Excellent (EX)</strong> — moderate wear, visible creases possible</li>
        <li><strong>Very Good (VG)</strong> — heavy wear, multiple creases</li>
      </ul>
      <p>When searching sold comps, always filter by condition to compare apples to apples.</p>

      <hr/>

      <h2>Method 3 — Graded vs Ungraded Value</h2>
      <p>Professional grading by companies like PSA, BGS, or SGC authenticates a card and assigns it a numerical grade on a 1-10 scale. Graded cards typically command a significant premium over raw (ungraded) cards.</p>

      <h3>How much does grading affect value?</h3>
      <p>As a general rule:</p>
      <ul>
        <li>A <strong>PSA 10</strong> (Gem Mint) can be worth 3-10x the value of the same raw card</li>
        <li>A <strong>PSA 9</strong> typically adds 50-200% premium over raw</li>
        <li>A <strong>PSA 8</strong> may be worth similar to or slightly above raw value</li>
      </ul>
      <p>The multiplier varies significantly by card — high-demand rookie cards see much larger grading premiums than common cards.</p>

      <h3>Should you get your cards graded?</h3>
      <p>Grading makes financial sense when:</p>
      <ul>
        <li>The card is worth $50+ raw</li>
        <li>You believe it will grade PSA 9 or 10</li>
        <li>The card is a key rookie, short print, or highly sought after</li>
      </ul>
      <p>Grading costs $25-$50+ per card depending on the service level, so it only makes sense for cards where the grade will meaningfully increase the value.</p>

      <hr/>

      <h2>Method 4 — Check Population Reports</h2>
      <p>A <strong>population report</strong> (or "pop report") shows how many copies of a specific card have been graded at each grade level by PSA, BGS, or SGC.</p>
      <p>Low population = higher value. If only 12 copies of a card exist as PSA 10s, those cards are significantly scarcer than a card with 5,000 PSA 10s.</p>
      <p>You can find population reports directly on the PSA, BGS, and SGC websites by searching for your specific card.</p>

      <hr/>

      <h2>Method 5 — Track Value Over Time</h2>
      <p>A single valuation is a snapshot. The real insight comes from tracking how your collection's value changes over time — which cards are appreciating, which are declining, and what's driving those changes.</p>

      <h3>What affects card values over time?</h3>
      <ul>
        <li><strong>Player performance</strong> — a breakout season can 10x a card's value overnight</li>
        <li><strong>Injuries</strong> — can dramatically drop a card's value</li>
        <li><strong>New set releases</strong> — fresh rookie cards can depress older versions</li>
        <li><strong>Grading population growth</strong> — more PSA 10s in circulation reduces scarcity</li>
        <li><strong>Hobby trends</strong> — certain players, sports, and eras cycle in and out of popularity</li>
      </ul>

      <h3>Tracking with Foilcase</h3>
      <p>Foilcase lets you enter both your cost paid and current value for every card in your vault. Your dashboard automatically calculates total collection value, total cost basis, and overall gain or loss — giving you a real portfolio view of your collection.</p>

      <hr/>

      <h2>Common Valuation Mistakes to Avoid</h2>
      <ul>
        <li><strong>Using active listings instead of sold listings</strong> — active listings are wishful thinking. Always use sold comps.</li>
        <li><strong>Not accounting for condition</strong> — always compare same condition to same condition.</li>
        <li><strong>Using outdated sales data</strong> — stick to the last 30-60 days.</li>
        <li><strong>Ignoring fees when selling</strong> — eBay takes approximately 13% in fees. Factor this in when valuing cards you plan to sell.</li>
        <li><strong>Overvaluing based on one high sale</strong> — look at multiple recent sales to understand true market value.</li>
      </ul>

      <hr/>

      <h2>Frequently Asked Questions</h2>

      <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginTop:'16px'}}>
        {[
          {
            q: 'What is the most accurate way to value a trading card?',
            a: 'eBay sold listings are the most accurate valuation method because they show actual transaction prices rather than asking prices. Filter by the same condition and grade as your card and look at sales from the last 30-60 days.',
          },
          {
            q: 'How do I know if my card is worth grading?',
            a: 'A card is generally worth grading if it\'s worth $50+ raw, is in near mint or better condition, and is a high-demand card where a PSA 9 or 10 would significantly increase its value. Factor in grading costs of $25-$50+ per card.',
          },
          {
            q: 'How often should I update my collection\'s value?',
            a: 'For active collectors, updating values monthly is a good practice. For key cards tied to active players, checking values after major games, injuries, or news events makes sense as values can change rapidly.',
          },
          {
            q: 'Does condition really matter that much for card value?',
            a: 'Yes — condition is one of the most significant factors in card value. A Gem Mint copy of a card can be worth 3-10x more than the same card in Good condition. Even the difference between Near Mint and Mint can represent a 20-50% value difference.',
          },
          {
            q: 'Can I track my collection value for free?',
            a: 'Yes — Foilcase is free to use and lets you track the cost and current value of every card in your collection. Your vault dashboard automatically calculates your total collection value and overall gain or loss.',
          },
        ].map(faq => (
          <div key={faq.q} style={{border:'1px solid #EFEFEF',borderRadius:'8px',padding:'20px',background:'#fff'}}>
            <div style={{fontSize:'15px',fontWeight:700,color:'#0D0D0D',marginBottom:'8px'}}>{faq.q}</div>
            <div style={{fontSize:'14px',color:'#555',lineHeight:1.7}}>{faq.a}</div>
          </div>
        ))}
      </div>
<ArticleProducts products={[
  { name:'Ultra Pro Penny Sleeves 100ct', desc:'Essential protection for every card in your collection', img:'https://m.media-amazon.com/images/I/61MeeY1RyjL._AC_SX679_.jpg', url:'https://www.amazon.com/Ultra-Pro-Sleeves-Standard-Trading/dp/B08B9GVG36?tag=foilcase-20' },
  { name:'Ultra Pro Top Loaders 25ct', desc:'Rigid protection for your most valuable cards', img:'https://m.media-amazon.com/images/I/71onuytTxmL._AC_SX466_.jpg', url:'https://www.amazon.com/Ultra-Pro-Baseball-Football-Basketball/dp/B004KHV24W?tag=foilcase-20' },
  { name:'ONE-Touch Magnetic Card Holder', desc:'Premium display and protection for key cards', img:'https://m.media-amazon.com/images/I/61Vzn+tVnVL._AC_SX466_.jpg', url:'https://www.amazon.com/Accessories-Ultra-Pro-One-Touch-Magnetic/dp/B07PJ1L5G5?tag=foilcase-20' },
]}/>
      <ArticleCTA />
    </>
  )
}