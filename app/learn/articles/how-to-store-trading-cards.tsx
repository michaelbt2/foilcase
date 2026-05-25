'use client'
import ArticleCTA from '../components/ArticleCTA'
import ArticleProducts from '../components/ArticleProducts'
import Link from 'next/link'

export default function HowToStoreCards() {
  return (
    <>
      <div style={{background:'#F7F7F7',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:'#9A9A9A',marginBottom:'12px'}}>Key Takeaways</div>
        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {[
            'Every card worth keeping should be in a penny sleeve at minimum',
            'Top loaders provide rigid protection for valuable cards',
            'Store cards away from heat, humidity, and direct sunlight',
            'Graded slabs provide the best long-term protection',
            'Never use rubber bands, tape, or paper clips on trading cards',
          ].map(item => (
            <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'14px',color:'#0D0D0D',fontWeight:500}}>
              <span style={{color:'#00A861',fontWeight:700,flexShrink:0}}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2>Why Proper Storage Matters</h2>
      <p>Trading cards are made of cardboard and are surprisingly fragile. Without proper storage cards deteriorate over time — corners get damaged, surfaces scratch, and the card stock warps or fades. For cards worth any meaningful amount of money, improper storage is the difference between a PSA 10 and a PSA 6.</p>
      <p>The good news is proper card storage is inexpensive and straightforward once you understand the options. This guide covers everything from basic penny sleeves to long-term archival storage for your most valuable cards.</p>

      <h2>The Enemies of Trading Cards</h2>
      <p>Understanding what damages cards helps you store them correctly:</p>
      <ul>
        <li><strong>Heat</strong> — causes card stock to warp and foil surfaces to bubble or separate</li>
        <li><strong>Humidity</strong> — causes cards to absorb moisture, warp, and develop mold over time</li>
        <li><strong>Direct sunlight and UV light</strong> — fades colors, yellows card stock, and damages holographic surfaces</li>
        <li><strong>Physical contact</strong> — fingerprints, scratches, corner dings from handling</li>
        <li><strong>Dust and dirt</strong> — scratches card surfaces when cards are slid in and out of holders</li>
        <li><strong>Pressure</strong> — stacking too many cards causes bottom cards to warp and edge wear</li>
      </ul>

      <hr/>

      <h2>Storage Options — From Basic to Premium</h2>

      <h3>1. Penny Sleeves (Essential)</h3>
      <p>Penny sleeves are thin, soft plastic sleeves that provide basic protection from scratches and fingerprints. Every card worth keeping should be in a penny sleeve at minimum. They cost less than $0.01 each and are available in standard size for most modern cards.</p>
      <p><strong>Best for:</strong> Every card in your collection as a first layer of protection.</p>
      <p><strong>Limitations:</strong> Provide no structural protection — cards can still bend or get corner damage.</p>

      <h3>2. Top Loaders</h3>
      <p>Top loaders are rigid plastic holders that slide over a penny-sleeved card to provide structural protection. They are the standard storage solution for any card worth over $5. Available in standard thickness (35pt) and various thicknesses for thick cards like patches or relics.</p>
      <p><strong>Best for:</strong> Individual valuable cards you want to protect and display.</p>
      <p><strong>Limitations:</strong> Bulky for large collections. The rigid edges can cause damage if cards are loose inside — always use a penny sleeve first.</p>

      <h3>3. Card Savers (Semi-Rigid Holders)</h3>
      <p>Card savers are semi-rigid holders preferred by grading companies for submission. They are softer than top loaders which reduces the risk of edge damage from the holder itself. Card savers are the preferred storage for cards you plan to submit for grading.</p>
      <p><strong>Best for:</strong> Cards being prepared for grading submissions.</p>

      <h3>4. One-Touch Magnetic Holders</h3>
      <p>One-Touch holders are premium magnetic closure cases that snap shut around a card. They provide excellent protection and display beautifully on shelves or desks. Available in various thicknesses for different card types.</p>
      <p><strong>Best for:</strong> Your most prized raw cards that you want to display.</p>
      <p><strong>Limitations:</strong> More expensive than top loaders — best reserved for your most valuable cards.</p>

      <h3>5. Binders and Pages</h3>
      <p>Nine-pocket binder pages hold nine cards each and fit into standard three-ring binders. This is the most efficient storage solution for large quantities of lower-value cards. Use side-loading pages to prevent cards from falling out when the binder is opened.</p>
      <p><strong>Best for:</strong> Base cards, commons, set builds, and organized collections of lower-value cards.</p>
      <p><strong>Limitations:</strong> Cards can shift and rub against each other over time. Not ideal for valuable cards.</p>

      <h3>6. Storage Boxes</h3>
      <p>Cardboard or plastic storage boxes hold large quantities of sleeved or top-loaded cards efficiently. Available in sizes from 100-count to 5,000-count boxes. A well-organized storage box with dividers is the backbone of most serious collections.</p>
      <p><strong>Best for:</strong> Bulk storage of large collections.</p>

      <h3>7. Graded Slabs</h3>
      <p>Cards graded by PSA, BGS, or SGC are sealed in tamper-evident hard plastic cases that provide the best possible long-term protection. The sealed environment protects against all environmental factors that degrade cards over time.</p>
      <p><strong>Best for:</strong> Your most valuable cards where long-term preservation is the priority.</p>

      <hr/>

      <h2>Environmental Storage Conditions</h2>
      <p>Where you store your cards matters as much as how you store them:</p>

      <h3>Temperature</h3>
      <p>Store cards at room temperature — ideally between 65-70°F (18-21°C). Avoid storing cards in attics which get extremely hot in summer, or in garages where temperatures fluctuate dramatically. Heat causes warping and foil damage that is impossible to reverse.</p>

      <h3>Humidity</h3>
      <p>Maintain humidity between 45-55% relative humidity. High humidity causes cards to absorb moisture and warp. Low humidity causes brittleness. If you live in a particularly humid climate consider using silica gel packets in your storage boxes to absorb excess moisture.</p>

      <h3>Light</h3>
      <p>Store cards away from direct sunlight and fluorescent lighting which emits UV radiation. UV light fades colors and yellows card stock over time. Store boxes and binders in a dark closet, drawer, or cabinet when not in use.</p>

      <h3>What to avoid</h3>
      <ul>
        <li>Basements — prone to flooding and humidity fluctuations</li>
        <li>Attics — extreme heat in summer and cold in winter</li>
        <li>Garages — temperature and humidity extremes</li>
        <li>Near windows — UV light exposure</li>
        <li>Near heating or cooling vents — temperature and humidity fluctuations</li>
      </ul>

      <hr/>

      <h2>Common Storage Mistakes to Avoid</h2>
      <ul>
        <li><strong>Rubber bands</strong> — cause permanent indentations and edge damage</li>
        <li><strong>Tape</strong> — leaves residue and can tear card surfaces when removed</li>
        <li><strong>Paper clips</strong> — cause permanent corner and edge damage</li>
        <li><strong>Stacking without sleeves</strong> — cards scratch each other</li>
        <li><strong>Overfilling binder pages</strong> — causes cards to warp under pressure</li>
        <li><strong>Storing cards loose in boxes</strong> — cards shift and damage each other</li>
        <li><strong>PVC sleeves or pages</strong> — old PVC plastic releases gases that damage cards. Always use acid-free, PVC-free storage products</li>
        <li><strong>Touching card surfaces</strong> — fingerprints leave oils that attract dust and can damage surfaces over time. Handle cards by the edges</li>
      </ul>

      <hr/>

      <h2>Building a Storage System</h2>
      <p>Here is a practical storage system for a growing collection:</p>

      <h3>Tier 1 — High value cards ($50+)</h3>
      <p>Penny sleeve → One-Touch magnetic holder → stored upright in a dedicated display box or on a shelf. Consider grading cards in this tier if they are in excellent condition.</p>

      <h3>Tier 2 — Mid value cards ($5-50)</h3>
      <p>Penny sleeve → top loader → stored upright in a storage box with labeled dividers by player, sport, or set.</p>

      <h3>Tier 3 — Lower value cards (under $5)</h3>
      <p>Penny sleeve → nine-pocket binder pages → organized binder by set or player. Storage boxes for bulk overflow.</p>

      <hr/>

      <h2>Tracking Your Collection</h2>
      <p>Good physical storage pairs perfectly with good digital tracking. <Link href="/collection">Foilcase</Link> lets you record the storage method, condition, and current value for every card — so you always know what you have and what it is worth. Use the <Link href="/search">Search page</Link> to check current values and decide which cards deserve premium storage.</p>

      <hr/>

      <h2>Frequently Asked Questions</h2>
      <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginTop:'16px'}}>
        {[
          { q:'Should I put cards in penny sleeves before top loaders?', a:'Yes — always sleeve a card in a penny sleeve before placing it in a top loader. The penny sleeve prevents the card from rattling inside the rigid top loader and protects the surface from scratches caused by the plastic edges of the holder.' },
          { q:'What is the best way to store vintage cards?', a:'Vintage cards are often more brittle and sensitive than modern cards. Store vintage cards in penny sleeves and card savers rather than top loaders which can cause edge damage. Control humidity carefully as older card stock is more susceptible to moisture damage. Consider SGC grading for valuable vintage cards as SGC has a strong reputation in the vintage market.' },
          { q:'Can cards warp in storage?', a:'Yes — cards can warp if stored in improper conditions. Heat and humidity are the main causes of warping. Store cards at stable room temperature and moderate humidity. If a card is slightly warped it can sometimes be gently flattened by placing it between heavy books for several days — though this should be done carefully and may not fully restore a severely warped card.' },
          { q:'How many cards can I store in a top loader?', a:'One card per top loader — always. Stacking multiple cards in a single top loader causes friction damage and can result in scratches and edge wear on all cards in the holder.' },
          { q:'Are plastic binder pages safe for cards?', a:'Yes — as long as the pages are PVC-free and acid-free. Modern binder pages from reputable manufacturers like Ultra Pro are safe for long-term card storage. Avoid old or cheap pages which may be made from PVC plastic that releases harmful gases over time.' },
        ].map(faq => (
          <div key={faq.q} style={{border:'1px solid #EFEFEF',borderRadius:'8px',padding:'20px',background:'#fff'}}>
            <div style={{fontSize:'15px',fontWeight:700,color:'#0D0D0D',marginBottom:'8px'}}>{faq.q}</div>
            <div style={{fontSize:'14px',color:'#555',lineHeight:1.7}}>{faq.a}</div>
          </div>
        ))}
      </div>

      <ArticleProducts products={[
        { name:'Ultra Pro Penny Sleeves 100ct', desc:'Essential first layer of protection for every card', img:'https://m.media-amazon.com/images/I/61MeeY1RyjL._AC_SX679_.jpg', url:'https://www.amazon.com/Ultra-Pro-Sleeves-Standard-Trading/dp/B08B9GVG36?tag=foilcase-20' },
        { name:'Ultra Pro Top Loaders 25ct', desc:'Rigid protection for your most valuable cards', img:'https://m.media-amazon.com/images/I/71onuytTxmL._AC_SX466_.jpg', url:'https://www.amazon.com/Ultra-Pro-Baseball-Football-Basketball/dp/B004KHV24W?tag=foilcase-20' },
        { name:'ONE-Touch Magnetic Card Holder', desc:'Premium display and protection for key cards', img:'https://m.media-amazon.com/images/I/61Vzn+tVnVL._AC_SX466_.jpg', url:'https://www.amazon.com/Accessories-Ultra-Pro-One-Touch-Magnetic/dp/B07PJ1L5G5?tag=foilcase-20' },
      ]}/>

      <ArticleCTA />
    </>
  )
}