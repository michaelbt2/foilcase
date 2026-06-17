import ArticleCTA from '../components/ArticleCTA'
import Link from 'next/link'
import ArticleProducts from '../components/ArticleProducts'

export default function PSAGradingCostTurnaroundTime() {
  return (
    <>
      <div style={{background:'#F7F7F7',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:'#9A9A9A',marginBottom:'12px'}}>Key Takeaways</div>
        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {[
            'PSA grading costs range from $18 to $10,000+ depending on the service level',
            'Turnaround times vary from 2 days (Express) to 100+ business days (Economy)',
            'The value of your card should guide which service level you choose',
            'PSA 10 grades can increase card value by 5 to 10 times over raw copies',
            'Economy service is the best value for most collectors submitting bulk cards',
          ].map(item => (
            <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'14px',color:'#0D0D0D',fontWeight:500}}>
              <span style={{color:'#00A861',fontWeight:700,flexShrink:0}}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2>PSA Grading Cost and Turnaround Time — Complete 2025 Guide</h2>
      <p>PSA (Professional Sports Authenticator) is the world's largest and most trusted trading card grading company. Getting your cards graded by PSA can significantly increase their value — but understanding the costs and turnaround times before submitting is essential to making the right decision.</p>
      <p>This guide covers everything you need to know about PSA grading costs, current turnaround times, and how to choose the right service level for your cards.</p>

      <h2>PSA Grading Service Levels and Costs</h2>
      <p>PSA offers multiple service tiers based on the declared value of your card and how quickly you need results. All prices are per card.</p>

      <h3>Economy Service — $18 per card</h3>
      <p>The most affordable PSA service level and the best option for bulk submissions of cards valued under $499. Economy service has the longest turnaround time but the lowest cost per card making it ideal for collectors who want to grade a large number of cards without breaking the budget.</p>
      <ul>
        <li><strong>Cost:</strong> $18 per card</li>
        <li><strong>Maximum declared value:</strong> $499 per card</li>
        <li><strong>Turnaround time:</strong> 100+ business days</li>
        <li><strong>Best for:</strong> bulk submissions, modern cards, lower-value vintage cards</li>
      </ul>

      <h3>Regular Service — $50 per card</h3>
      <p>A mid-tier option for cards valued up to $999. Faster than Economy with a reasonable cost for cards where the grading premium justifies a higher submission fee.</p>
      <ul>
        <li><strong>Cost:</strong> $50 per card</li>
        <li><strong>Maximum declared value:</strong> $999 per card</li>
        <li><strong>Turnaround time:</strong> 45 business days</li>
        <li><strong>Best for:</strong> mid-value cards where faster turnaround matters</li>
      </ul>

      <h3>Express Service — $150 per card</h3>
      <p>For cards valued up to $2,499. Express service offers significantly faster turnaround and is appropriate for valuable cards where the grading premium makes the higher cost worthwhile.</p>
      <ul>
        <li><strong>Cost:</strong> $150 per card</li>
        <li><strong>Maximum declared value:</strong> $2,499 per card</li>
        <li><strong>Turnaround time:</strong> 10 business days</li>
        <li><strong>Best for:</strong> higher-value cards, time-sensitive submissions</li>
      </ul>

      <h3>Super Express Service — $300 per card</h3>
      <p>For cards valued up to $4,999. Very fast turnaround for high-value cards.</p>
      <ul>
        <li><strong>Cost:</strong> $300 per card</li>
        <li><strong>Maximum declared value:</strong> $4,999 per card</li>
        <li><strong>Turnaround time:</strong> 5 business days</li>
        <li><strong>Best for:</strong> high-value cards, urgent submissions</li>
      </ul>

      <h3>Walkthrough Service — $600 per card</h3>
      <p>Same-day or next-day grading for very high-value cards. Typically used by dealers and serious collectors submitting premium cards.</p>
      <ul>
        <li><strong>Cost:</strong> $600 per card</li>
        <li><strong>Maximum declared value:</strong> $9,999 per card</li>
        <li><strong>Turnaround time:</strong> 2 business days</li>
        <li><strong>Best for:</strong> very high-value cards, dealer submissions</li>
      </ul>

      <blockquote>
        <p><strong>Note:</strong> PSA periodically updates their service levels, pricing, and turnaround times. Always check <a href="https://www.psacard.com" target="_blank" rel="noopener noreferrer">psacard.com</a> for the most current information before submitting.</p>
      </blockquote>

      <hr/>

      <h2>Additional PSA Fees to Know</h2>
      <p>Beyond the base grading fee there are additional costs to factor into your submission budget.</p>

      <h3>PSA membership</h3>
      <p>A PSA membership is required to submit cards for grading. Membership tiers start at around $20/year for basic access and go up to several hundred dollars for premium tiers with additional benefits like faster access to certain service levels.</p>

      <h3>Shipping costs</h3>
      <p>You pay to ship cards to PSA and PSA charges a return shipping fee typically ranging from $10 to $30 depending on the size of your submission and your location.</p>

      <h3>Minimum order</h3>
      <p>PSA typically requires a minimum number of cards per submission — check their current requirements on the PSA website as these can change.</p>

      <hr/>

      <h2>Is PSA Grading Worth It?</h2>
      <p>The answer depends entirely on the card and its condition. Here is a framework for thinking about whether grading makes financial sense.</p>

      <h3>When PSA grading is worth it</h3>
      <ul>
        <li>The card is in Near Mint or better condition with a realistic chance of a PSA 8 or higher</li>
        <li>A PSA 10 copy of the card sells for significantly more than the submission cost plus the raw value</li>
        <li>The card is vintage (pre-2000) where even a PSA 6 or 7 adds meaningful value</li>
        <li>You plan to sell the card and want maximum market value</li>
        <li>The card has sentimental value and you want it preserved and authenticated</li>
      </ul>

      <h3>When PSA grading is not worth it</h3>
      <ul>
        <li>The raw card value is less than $50 — the grading fee will likely exceed any premium gained</li>
        <li>The card has visible damage that would result in a PSA 5 or below</li>
        <li>You want to sell quickly — grading takes months on Economy service</li>
        <li>The card is a common modern card where PSA 10 copies sell for under $30</li>
      </ul>

      <hr/>

      <h2>How to Submit Cards to PSA</h2>
      <p>The PSA submission process has moved primarily online. Here are the basic steps:</p>
      <ul>
        <li><strong>Step 1</strong> — Create a PSA account and purchase a membership at psacard.com</li>
        <li><strong>Step 2</strong> — Start an online submission order, selecting your service level</li>
        <li><strong>Step 3</strong> — List each card in your submission with the declared value</li>
        <li><strong>Step 4</strong> — Package your cards properly using Card Savers (not top loaders) per PSA requirements</li>
        <li><strong>Step 5</strong> — Ship your submission to PSA using a trackable service with insurance</li>
        <li><strong>Step 6</strong> — Monitor your submission status through your PSA account</li>
        <li><strong>Step 7</strong> — Receive your graded cards back by mail</li>
      </ul>

      <blockquote>
        <p><strong>Important:</strong> PSA requires cards to be submitted in Card Savers (semi-rigid holders), not top loaders or penny sleeves alone. Using the wrong holders can delay your submission.</p>
      </blockquote>

      <hr/>

      <h2>PSA vs BGS vs SGC — Which Should You Choose?</h2>
      <p>PSA is the most recognized grading company but it is not the only option. BGS (Beckett Grading Services) and SGC are strong alternatives depending on your needs.</p>
      <ul>
        <li><strong>PSA</strong> — highest brand recognition, best resale value for most cards, largest population of graded cards</li>
        <li><strong>BGS</strong> — preferred for modern cards, uses sub-grades (centering, corners, edges, surface), BGS 9.5 is highly regarded</li>
        <li><strong>SGC</strong> — fastest turnaround times, popular for vintage cards, growing recognition in the hobby</li>
      </ul>
      <p>For most collectors PSA grading produces the highest resale value. Read our full <Link href="/learn/psa-vs-bgs-vs-sgc-grading-comparison">PSA vs BGS vs SGC comparison guide</Link> for a detailed breakdown.</p>

      <hr/>

      <h2>Tracking Your Graded Cards</h2>
      <p>Once your PSA graded cards come back it is important to track them properly. Foilcase lets you log graded cards with their PSA grade, track current market values, and organize your graded collection alongside your raw cards.</p>

      <hr/>

      <h2>Frequently Asked Questions</h2>
      <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginTop:'16px'}}>
        {[
          {
            q: 'How much does PSA grading cost in 2025?',
            a: 'PSA grading costs range from $18 per card for Economy service (100+ business day turnaround) to $600+ per card for Walkthrough service (2 business day turnaround). The right service level depends on the value of your card and how quickly you need it back.',
          },
          {
            q: 'How long does PSA grading take in 2025?',
            a: 'PSA turnaround times vary by service level. Economy service takes 100+ business days. Regular service takes around 45 business days. Express service takes about 10 business days. Super Express takes 5 business days. Walkthrough takes 2 business days. Note that these are estimates and actual times can vary.',
          },
          {
            q: 'What is the cheapest way to get cards graded by PSA?',
            a: 'Economy service at $18 per card is the most affordable PSA option. It has the longest turnaround time at 100+ business days but is the best value for bulk submissions of cards valued under $499 each.',
          },
          {
            q: 'Do I need a PSA membership to submit cards?',
            a: 'Yes — a PSA membership is required to submit cards for grading. Membership tiers start at around $20 per year. Higher membership tiers provide access to additional service levels and other benefits.',
          },
          {
            q: 'How do I know if my card is worth grading?',
            a: 'A simple rule of thumb — if a PSA 10 copy of your card sells for at least 3 times the combined cost of grading and the raw card value, grading likely makes financial sense. Check eBay sold listings for PSA 10 copies of your card to see the potential upside.',
          },
        ].map(faq => (
          <div key={faq.q} style={{border:'1px solid #EFEFEF',borderRadius:'8px',padding:'20px',background:'#fff'}}>
            <div style={{fontSize:'15px',fontWeight:700,color:'#0D0D0D',marginBottom:'8px'}}>{faq.q}</div>
            <div style={{fontSize:'14px',color:'#555',lineHeight:1.7}}>{faq.a}</div>
          </div>
        ))}
      </div>

      <ArticleProducts products={[
        { name:'Cardboard Gold Card Saver I 200ct', desc:'Required by PSA for grading submissions — do not use top loaders', img:'https://m.media-amazon.com/images/I/61+9PJNvZ6L._AC_SX466_.jpg', url:'https://www.amazon.com/Cardboard-Gold-Saver-1-200-Count/dp/B00THQ4O1Y?tag=foilcase-20' },
        { name:'Ultra Pro Penny Sleeves 100ct', desc:'Sleeve your cards before placing in Card Savers for submission', img:'https://m.media-amazon.com/images/I/61MeeY1RyjL._AC_SX679_.jpg', url:'https://www.amazon.com/Ultra-Pro-Sleeves-Standard-Trading/dp/B08B9GVG36?tag=foilcase-20' },
        { name:'BCW Corrugated Card Box', desc:'Ship your PSA submission safely with proper card storage boxes', img:'https://m.media-amazon.com/images/I/71uFwFTMuBL._AC_SX466_.jpg', url:'https://www.amazon.com/BCW-Corrugated-Cardboard-Storage-Cardboard/dp/B0037BTZLA?tag=foilcase-20' },
      ]}/>
      <ArticleCTA />
    </>
  )
}