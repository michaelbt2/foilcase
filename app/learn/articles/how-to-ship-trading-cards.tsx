import ArticleCTA from '../components/ArticleCTA'
import Link from 'next/link'
import ArticleProducts from '../components/ArticleProducts'

export default function HowToShipTradingCards() {
  return (
    <>
      <div style={{background:'#F7F7F7',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:'#9A9A9A',marginBottom:'12px'}}>Key Takeaways</div>
        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {[
            'Always sleeve cards before placing them in a top loader or card saver',
            'Use team bags to seal top loaders and prevent cards from sliding out',
            'Bubble mailers are suitable for raw cards — rigid mailers add extra protection',
            'For cards over $100 always use tracking and consider insurance',
            'Graded slabs require extra padding and should ship in bubble wrap inside a box',
          ].map(item => (
            <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'14px',color:'#0D0D0D',fontWeight:500}}>
              <span style={{color:'#00A861',fontWeight:700,flexShrink:0}}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2>How to Ship Trading Cards Safely — Complete Guide</h2>
      <p>Shipping trading cards safely is one of the most important skills any collector or seller needs to master. A card that arrives damaged is a transaction that ends badly for everyone — refunds, disputes, negative feedback, and a damaged card that loses value. Getting your shipping method right protects your cards, your reputation, and your buyer's investment.</p>
      <p>This guide covers everything from basic raw card shipping to safely sending high-value graded slabs across the country.</p>

      <h2>Essential Shipping Supplies</h2>
      <p>Before you ship a single card make sure you have these supplies on hand.</p>

      <h3>Penny sleeves</h3>
      <p>The first layer of protection for any card. Always sleeve a card in a penny sleeve before placing it in a top loader or card saver. This prevents scratching from the card moving inside the holder.</p>

      <h3>Top loaders</h3>
      <p>Rigid plastic holders that protect cards from bending. Standard top loaders fit most trading cards. Use thick top loaders for graded cards or cards you want extra rigidity protection for.</p>

      <h3>Team bags</h3>
      <p>Resealable plastic bags designed to hold a card inside a top loader. Essential for sealing the top loader and preventing the card from sliding out during shipping.</p>

      <h3>Bubble mailers</h3>
      <p>Padded envelopes with bubble wrap lining. The standard shipping method for most raw card transactions. Use 6x9 inch bubble mailers for single cards or small lots.</p>

      <h3>Rigid mailers</h3>
      <p>Cardboard mailers that prevent bending. Provide more protection than bubble mailers for higher-value cards. Many sellers use both — placing the top loaded card inside a rigid mailer and then inside a bubble mailer.</p>

      <h3>Cardboard backing</h3>
      <p>Cut pieces of cardboard slightly larger than the top loader to add rigidity to your mailer. A simple and cheap way to add protection for any shipment.</p>

      <hr/>

      <h2>How to Ship a Raw Trading Card</h2>
      <p>Follow these steps for shipping most raw (ungraded) trading cards safely.</p>

      <h3>Step 1 — Sleeve the card</h3>
      <p>Place the card in a penny sleeve first. This is non-negotiable — a card sliding around inside a bare top loader will get corner wear and surface scratches.</p>

      <h3>Step 2 — Place in a top loader</h3>
      <p>Slide the sleeved card into a standard top loader. The card should fit snugly without being forced. For thicker cards (jersey cards, patches) use a thick top loader.</p>

      <h3>Step 3 — Seal with a team bag</h3>
      <p>Place the top loader into a team bag and seal it. This prevents the card from sliding out of the top loader and adds a layer of moisture protection.</p>

      <h3>Step 4 — Add cardboard backing</h3>
      <p>Tape a piece of cardboard slightly larger than the top loader on each side of the bagged card. This creates a rigid sandwich that prevents bending even if the mailer gets flexed.</p>

      <h3>Step 5 — Write "Do Not Bend" on the outside</h3>
      <p>Label the outside of your mailer clearly with "Do Not Bend" or "Trading Cards — Do Not Bend" to alert postal workers.</p>

      <h3>Step 6 — Use a bubble mailer or rigid mailer</h3>
      <p>For cards under $50 a padded bubble mailer is typically sufficient. For cards over $50 consider using a rigid mailer or combining both for extra protection.</p>

      <hr/>

      <h2>How to Ship High-Value Cards</h2>
      <p>Cards worth $100 or more deserve extra protection and shipping precautions.</p>

      <h3>Use tracking on everything over $20</h3>
      <p>USPS First Class Mail with tracking starts at around $4-5 and provides peace of mind for both sender and buyer. Never ship a valuable card without tracking.</p>

      <h3>Add insurance for cards over $100</h3>
      <p>USPS offers insurance for declared value up to $5,000. For cards worth $100 or more the small cost of insurance is worth it. eBay sellers especially should insure shipments to protect against disputes.</p>

      <h3>Use a box instead of a mailer</h3>
      <p>For cards worth $500 or more ship inside a small cardboard box with the card padded on all sides with bubble wrap. A box provides significantly more protection than any mailer.</p>

      <h3>Consider signature confirmation</h3>
      <p>For very high-value cards requiring a signature upon delivery provides proof that the package was received by the buyer. Essential for cards worth $1,000 or more.</p>

      <hr/>

      <h2>How to Ship Graded Cards (PSA, BGS, SGC Slabs)</h2>
      <p>Graded slabs require different handling than raw cards due to their size, weight, and the value typically associated with them.</p>

      <h3>What you need</h3>
      <ul>
        <li>Bubble wrap — wrap the slab completely</li>
        <li>Small cardboard box — never ship a slab in a mailer</li>
        <li>Packing peanuts or foam — fill empty space in the box</li>
        <li>Tape — seal the box securely on all edges</li>
      </ul>

      <h3>How to pack a graded slab</h3>
      <ul>
        <li>Wrap the slab in at least two layers of bubble wrap</li>
        <li>Place in a box with at least one inch of padding on all sides</li>
        <li>Fill any empty space with packing peanuts or crumpled paper</li>
        <li>The slab should not be able to move at all inside the box when shaken</li>
        <li>Seal all edges with packing tape</li>
      </ul>

      <blockquote>
        <p><strong>Never ship a graded slab in a bubble mailer.</strong> Slabs can crack if the mailer flexes or gets caught in postal sorting equipment. Always use a box.</p>
      </blockquote>

      <hr/>

      <h2>Best Shipping Services for Trading Cards</h2>

      <h3>USPS First Class Mail</h3>
      <p>The most popular option for trading card shipping. Affordable, reliable, and includes tracking. Best for cards valued under $400. Delivers in 1-5 business days.</p>

      <h3>USPS Priority Mail</h3>
      <p>Faster than First Class with flat rate options. Good for heavier shipments or when you need 1-3 day delivery. Includes up to $100 in insurance automatically.</p>

      <h3>UPS and FedEx</h3>
      <p>Better options for very high-value cards or graded slabs. More reliable tracking and easier insurance claims than USPS for high-value items. More expensive than USPS for small packages.</p>

      <hr/>

      <h2>Common Shipping Mistakes to Avoid</h2>
      <ul>
        <li><strong>Shipping without a sleeve</strong> — always sleeve before top loading</li>
        <li><strong>Using a mailer for graded slabs</strong> — always use a box</li>
        <li><strong>Skipping tracking</strong> — always use tracking for any card over $20</li>
        <li><strong>Not sealing the top loader</strong> — always use a team bag to prevent the card sliding out</li>
        <li><strong>Insufficient padding</strong> — the card should not be able to move inside the package</li>
        <li><strong>Not labeling "Do Not Bend"</strong> — always label your mailer clearly</li>
        <li><strong>Using a plain envelope</strong> — never ship cards in a plain envelope without rigid backing</li>
      </ul>

      <hr/>

      <h2>Frequently Asked Questions</h2>
      <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginTop:'16px'}}>
        {[
          {
            q: 'What is the cheapest way to ship a trading card?',
            a: 'USPS First Class Mail in a bubble mailer is the most affordable option, typically costing $4-6 for a single card with tracking. Place the card in a penny sleeve, then a top loader, then a team bag, add cardboard backing, and seal in a bubble mailer labeled "Do Not Bend."',
          },
          {
            q: 'Do I need a top loader to ship cards?',
            a: 'Yes — shipping a card in just a penny sleeve inside a mailer is not sufficient protection. Top loaders prevent bending and provide rigid protection. For higher-value cards use a rigid mailer in addition to the top loader.',
          },
          {
            q: 'How do I ship a PSA graded card safely?',
            a: 'Always ship graded slabs in a box, never a mailer. Wrap the slab in two layers of bubble wrap and place it in a box with at least one inch of padding on all sides. Fill any empty space so the slab cannot move. Use a trackable service with insurance for any slab worth over $100.',
          },
          {
            q: 'Should I insure my card shipment?',
            a: 'For cards worth $100 or more insurance is worth the small additional cost. USPS offers declared value insurance up to $5,000. For eBay sellers especially, insuring shipments protects you against loss and damage claims.',
          },
          {
            q: 'What size bubble mailer should I use for trading cards?',
            a: 'A 6x9 inch bubble mailer fits a standard top loaded card comfortably with room for cardboard backing. For multiple cards or thicker packages use a larger 7.5x11 inch bubble mailer.',
          },
        ].map(faq => (
          <div key={faq.q} style={{border:'1px solid #EFEFEF',borderRadius:'8px',padding:'20px',background:'#fff'}}>
            <div style={{fontSize:'15px',fontWeight:700,color:'#0D0D0D',marginBottom:'8px'}}>{faq.q}</div>
            <div style={{fontSize:'14px',color:'#555',lineHeight:1.7}}>{faq.a}</div>
          </div>
        ))}
      </div>

      <ArticleProducts products={[
        { name:'Ultra Pro Top Loaders 25ct', desc:'Essential rigid protection for shipping any trading card', img:'https://m.media-amazon.com/images/I/71onuytTxmL._AC_SX466_.jpg', url:'https://www.amazon.com/Ultra-Pro-Baseball-Football-Basketball/dp/B004KHV24W?tag=foilcase-20' },
        { name:'Ultra Pro Penny Sleeves 100ct', desc:'Always sleeve before top loading — prevents surface scratches', img:'https://m.media-amazon.com/images/I/61MeeY1RyjL._AC_SX679_.jpg', url:'https://www.amazon.com/Ultra-Pro-Sleeves-Standard-Trading/dp/B08B9GVG36?tag=foilcase-20' },
        { name:'Team Bags 100ct', desc:'Seal your top loaders to prevent cards sliding out during shipping', img:'https://m.media-amazon.com/images/I/71U3Z3VqJAL._AC_SX466_.jpg', url:'https://www.amazon.com/Ultra-Pro-Team-Bags-100/dp/B0006NXWKO?tag=foilcase-20' },
      ]}/>
      <ArticleCTA />
    </>
  )
}