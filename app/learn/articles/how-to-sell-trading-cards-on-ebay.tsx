import ArticleCTA from '../components/ArticleCTA'
import Link from 'next/link'
import ArticleProducts from '../components/ArticleProducts'

export default function HowToSellCardsOnEbay() {
  return (
    <>
      <div style={{background:'#F7F7F7',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:'#9A9A9A',marginBottom:'12px'}}>Key Takeaways</div>
        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {[
            'eBay is the largest marketplace for trading cards with the most buyers',
            'Research sold comps before pricing to maximize your sale price',
            'Card photos are the single biggest factor in buyer confidence',
            'eBay takes approximately 13% in fees — factor this into your pricing',
            'Proper packaging prevents damage and negative feedback',
          ].map(item => (
            <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'14px',color:'#0D0D0D',fontWeight:500}}>
              <span style={{color:'#00A861',fontWeight:700,flexShrink:0}}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2>Why Sell Cards on eBay?</h2>
      <p>eBay is the world's largest trading card marketplace with millions of active buyers. While other platforms like COMC, Whatnot, and Facebook Groups exist, eBay consistently delivers the largest audience and highest prices for most card categories.</p>
      <p>The tradeoff is fees — eBay takes approximately 13% of your final sale price. But the volume of buyers typically more than compensates for the fee difference compared to smaller platforms.</p>

      <h2>Step 1 — Research Before You List</h2>
      <p>The biggest mistake new sellers make is listing cards without researching comparable sales first. Underpricing leaves money on the table. Overpricing means your card sits unsold.</p>

      <h3>How to find sold comps</h3>
      <ol>
        <li>Search eBay for your exact card including year, brand, set, and any parallel or grade</li>
        <li>Filter results to show only Sold listings</li>
        <li>Look at the last 30-60 days of sales</li>
        <li>Note the price range, average, and how quickly cards sold</li>
      </ol>

      <h3>Using Foilcase for research</h3>
      <p>Foilcase's <Link href="/search">Search page</Link> pulls live eBay sold data and active listings side by side — making it easy to research current market values before you list.</p>

      <blockquote>
        <p><strong>Pro tip:</strong> If you see a wide price range in sold comps, look at the photos of the higher-selling cards. Better photos and clearer listings typically command higher prices.</p>
      </blockquote>

      <hr/>

      <h2>Step 2 — Take Great Photos</h2>
      <p>Photos are the single most important factor in a card sale. Buyers can't hold your card — they're making a purchase decision based entirely on your images. Poor photos mean lower prices and fewer sales.</p>

      <h3>Photography tips for card sellers</h3>
      <ul>
        <li><strong>Natural light is best</strong> — photograph near a window in daylight, avoiding direct sunlight which creates glare</li>
        <li><strong>Use a plain white or dark background</strong> — nothing distracting behind the card</li>
        <li><strong>Remove the card from its top loader for the photo</strong> — plastic causes reflections that obscure card details</li>
        <li><strong>Take multiple angles</strong> — front, back, corners, and any notable features or flaws</li>
        <li><strong>Show all four corners clearly</strong> — buyers inspect corners carefully for wear</li>
        <li><strong>Be honest about flaws</strong> — photograph and disclose any defects. Hiding flaws leads to returns and negative feedback.</li>
        <li><strong>Use your phone camera</strong> — modern smartphone cameras are excellent for card photography</li>
      </ul>

      <hr/>

      <h2>Step 3 — Write an Effective Listing Title</h2>
      <p>Your listing title determines whether buyers find your card in search. eBay search is keyword-based so include all the terms a buyer would search for.</p>

      <h3>What to include in your title</h3>
      <ul>
        <li>Year (e.g. 2020)</li>
        <li>Brand (e.g. Panini)</li>
        <li>Set name (e.g. Prizm)</li>
        <li>Player name (e.g. Patrick Mahomes)</li>
        <li>Card number if notable (e.g. #331)</li>
        <li>Parallel name if applicable (e.g. Silver Prizm)</li>
        <li>Print run if numbered (e.g. /99)</li>
        <li>Grade if graded (e.g. PSA 10)</li>
        <li>RC if rookie card</li>
      </ul>

      <h3>Example title</h3>
      <p style={{background:'#F7F7F7',padding:'12px 16px',borderRadius:'8px',fontFamily:'monospace',fontSize:'14px'}}>
        2020 Panini Prizm Patrick Mahomes Silver Prizm #331 PSA 10 Gem Mint RC Chiefs
      </p>

      <hr/>

      <h2>Step 4 — Choose the Right Listing Format</h2>
      <p>eBay offers two main listing formats — auction and fixed price (Buy It Now). Each has advantages depending on your situation.</p>

      <h3>Auction listings</h3>
      <ul>
        <li>Best for rare or highly desirable cards with multiple potential buyers</li>
        <li>Can drive prices above market value when bidding competition is high</li>
        <li>Risk of selling below market if few bidders show up</li>
        <li>7-day auctions starting Thursday evening typically get the most bidders</li>
      </ul>

      <h3>Fixed price (Buy It Now)</h3>
      <ul>
        <li>Best for common cards where you know the market value</li>
        <li>No risk of selling below your minimum acceptable price</li>
        <li>Can sit longer if priced above what buyers want to pay</li>
        <li>Best Practice — price at or slightly below the lowest comparable active listing</li>
      </ul>

      <blockquote>
        <p><strong>Recommendation:</strong> Use fixed price for most cards under $100. Use auction for graded cards, numbered cards under /25, and highly desirable rookies where you expect competitive bidding.</p>
      </blockquote>

      <hr/>

      <h2>Step 5 — Price Correctly</h2>
      <p>Pricing is both an art and a science. Here's how to price effectively:</p>

      <h3>For fixed price listings</h3>
      <ul>
        <li>Find the average of recent sold comps</li>
        <li>Price at or slightly below the lowest current active listing</li>
        <li>Factor in your 13% eBay fee — if you need $50 after fees, list at $57.50</li>
        <li>Consider accepting Best Offers to capture buyers who want to negotiate</li>
      </ul>

      <h3>For auctions</h3>
      <ul>
        <li>Start at $0.99 to attract bidders — this works well for in-demand cards</li>
        <li>Set a reserve price if you have a minimum you'll accept</li>
        <li>Or start at a reasonable floor price (e.g. 70% of market value) to protect yourself</li>
      </ul>

      <hr/>

      <h2>Step 6 — Understand eBay Fees</h2>
      <p>eBay's fee structure is important to understand before pricing your cards:</p>
      <ul>
        <li><strong>Final value fee</strong> — approximately 13.25% of the total sale amount including shipping</li>
        <li><strong>PayPal/payment processing</strong> — included in eBay's managed payments</li>
        <li><strong>Listing fees</strong> — eBay gives you a number of free listings per month; additional listings may incur a small fee</li>
        <li><strong>Promoted listings</strong> — optional advertising fee to boost visibility</li>
      </ul>

      <p>A simple way to calculate your net: multiply your sale price by 0.87 to get your approximate take-home after fees.</p>

      <hr/>

      <h2>Step 7 — Package Cards Safely</h2>
      <p>Packaging damage is the #1 cause of returns and negative feedback. Cards damaged in transit are your responsibility as the seller — proper packaging is non-negotiable.</p>

      <h3>Standard packaging for raw cards</h3>
      <ol>
        <li>Place card in a penny sleeve</li>
        <li>Insert into a top loader or card saver</li>
        <li>Tape the top loader closed (don't tape over the card)</li>
        <li>Place between two pieces of cardboard slightly larger than the top loader</li>
        <li>Tape the cardboard sandwich together</li>
        <li>Insert into a bubble mailer or small box</li>
      </ol>

      <h3>For valuable cards ($50+)</h3>
      <p>Use a small box rather than a bubble mailer. Add bubble wrap around the card sandwich. Mark the package as "Do Not Bend" for extra protection.</p>

      <h3>For graded cards</h3>
      <p>PSA and BGS slabs should be wrapped in bubble wrap and shipped in a box — never a bubble mailer. The rigid slab can puncture soft packaging and the slab itself can crack without proper cushioning.</p>

      <hr/>

      <h2>Step 8 — Ship Promptly and Track Everything</h2>
      <p>Ship within your stated handling time — this directly affects your seller rating. Always use tracked shipping for any card worth over $20. For cards worth over $100, add signature confirmation.</p>

      <hr/>

      <h2>Frequently Asked Questions</h2>
      <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginTop:'16px'}}>
        {[
          {
            q: 'How much does eBay charge to sell trading cards?',
            a: 'eBay charges approximately 13.25% of the total sale amount including shipping as a final value fee. There are no separate payment processing fees as eBay handles payments through managed payments. You receive a certain number of free listings per month before insertion fees apply.',
          },
          {
            q: 'Is it better to auction or use Buy It Now for trading cards?',
            a: 'For most cards, fixed price (Buy It Now) is safer and more predictable. Auctions work well for highly desirable cards where you expect multiple bidders to compete — this can drive prices above market value. For common cards or anything where you know the market value, fixed price is usually the better choice.',
          },
          {
            q: 'How do I avoid eBay scams when selling cards?',
            a: 'Common scams include buyers claiming a card never arrived or was damaged. Protect yourself by: always using tracked shipping, photographing your packaging before sending, keeping all receipts, and never shipping without payment cleared through eBay\'s managed payments system.',
          },
          {
            q: 'What shipping service should I use for trading cards?',
            a: 'USPS First Class Mail in a bubble mailer is the standard for cards under $20 — it\'s cheap and reliable. For more valuable cards use USPS Priority Mail with tracking. For cards over $100 add signature confirmation. Always insure shipments for their full value.',
          },
          {
            q: 'How do I price cards I\'ve never sold before?',
            a: 'Research eBay sold listings for the exact card — same year, brand, set, condition, and any parallel or grade designation. Look at 5-10 recent sales to understand the price range. If no sold comps exist for your exact card, find the closest comparable (similar player, same set, different condition) and adjust accordingly.',
          },
        ].map(faq => (
          <div key={faq.q} style={{border:'1px solid #EFEFEF',borderRadius:'8px',padding:'20px',background:'#fff'}}>
            <div style={{fontSize:'15px',fontWeight:700,color:'#0D0D0D',marginBottom:'8px'}}>{faq.q}</div>
            <div style={{fontSize:'14px',color:'#555',lineHeight:1.7}}>{faq.a}</div>
          </div>
        ))}
      </div>
<ArticleProducts products={[
  { name:'Bubble Mailers — Padded Envelopes', desc:'Waterproof padded mailers for safely shipping cards', img:'https://m.media-amazon.com/images/I/71mMrT6JcdL._AC_SX466_.jpg', url:'https://www.amazon.com/packbabol-Envelopes-Adhesive-Waterproof-Packaging/dp/B0BXDB22ZS?tag=foilcase-20' },
  { name:'6x4x1" Corrugated Shipping Boxes', desc:'Perfect size for shipping graded slabs and top loaders', img:'https://m.media-amazon.com/images/I/610WxTD+eJL._AC_SX679_.jpg', url:'https://www.amazon.com/HORLIMER-Shipping-Corrugated-Cardboard-Literature/dp/B0CYCF7FGH?tag=foilcase-20' },
  { name:'Do Not Bend Self-Inking Stamp', desc:'Protect your card shipments from postal damage', img:'https://m.media-amazon.com/images/I/716dsQ8G5xL._AC_SX679_.jpg', url:'https://www.amazon.com/Bend-Self-Inking-Rubber-Stamp/dp/B003KUWOE2?tag=foilcase-20' },
]}/>
      <ArticleCTA />
    </>
  )
}