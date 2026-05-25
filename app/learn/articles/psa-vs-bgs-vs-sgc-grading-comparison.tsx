import ArticleCTA from '../components/ArticleCTA'
import Link from 'next/link'
import ArticleProducts from '../components/ArticleProducts'

export default function PSAVsBGSVsSGC() {
  return (
    <>
      {/* Key takeaways */}
      <div style={{background:'#F7F7F7',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:'#9A9A9A',marginBottom:'12px'}}>Key Takeaways</div>
        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {[
            'PSA is the most recognized grading company with the highest resale value',
            'BGS uses a subgrade system that rewards truly perfect cards',
            'SGC is faster and more affordable — ideal for vintage cards',
            'PSA 10 is the gold standard for modern cards',
            'Choose your grader based on card type, budget, and intended use',
          ].map(item => (
            <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'14px',color:'#0D0D0D',fontWeight:500}}>
              <span style={{color:'#00A861',fontWeight:700,flexShrink:0}}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2>Why Grading Company Choice Matters</h2>
      <p>Professional card grading authenticates your card, assigns it a standardized condition grade, and seals it in a tamper-evident case. But not all grading companies are equal — the company you choose affects your card's resale value, the time it takes to get graded, and the cost of the service.</p>
      <p>The three major grading companies are PSA (Professional Sports Authenticator), BGS (Beckett Grading Services), and SGC (Sportscard Guaranty). Each has distinct strengths depending on what you're grading and why.</p>

      <h2>PSA — Professional Sports Authenticator</h2>
      <p>PSA is the most recognized and widely trusted grading company in the hobby. Founded in 1991, PSA has graded over 45 million cards and dominates the modern card market.</p>

      <h3>PSA grading scale</h3>
      <p>PSA uses a 1-10 numerical scale:</p>
      <ul>
        <li><strong>PSA 10 Gem Mint</strong> — virtually perfect card, four sharp corners, no visible defects</li>
        <li><strong>PSA 9 Mint</strong> — one minor imperfection allowed</li>
        <li><strong>PSA 8 NM-MT</strong> — slight wear on corners or edges</li>
        <li><strong>PSA 7 NM</strong> — minor visible wear</li>
        <li><strong>PSA 6 and below</strong> — progressively more wear</li>
      </ul>

      <h3>PSA pros</h3>
      <ul>
        <li>Highest resale value — PSA slabs command a premium on eBay</li>
        <li>Most recognized brand — buyers trust PSA universally</li>
        <li>Largest population database — easy to research comp data</li>
        <li>Best for modern sports cards and Pokémon</li>
      </ul>

      <h3>PSA cons</h3>
      <ul>
        <li>Slowest turnaround — economy service can take months</li>
        <li>Most expensive for bulk submissions</li>
        <li>No subgrades — a PSA 9 tells you nothing about which aspect was imperfect</li>
      </ul>

      <blockquote>
        <p><strong>Best for:</strong> Modern rookie cards, Pokémon, any card you plan to sell at maximum value.</p>
      </blockquote>

      <hr/>

      <h2>BGS — Beckett Grading Services</h2>
      <p>Beckett is the second most recognized grading company and is known for its rigorous subgrade system. BGS grades four aspects of each card independently — centering, corners, edges, and surface.</p>

      <h3>BGS grading scale</h3>
      <p>BGS uses a 1-10 scale with half-point increments and four subgrades:</p>
      <ul>
        <li><strong>BGS 10 Pristine</strong> — all four subgrades are 10. Extremely rare.</li>
        <li><strong>BGS 9.5 Gem Mint</strong> — the most common top grade, equivalent to PSA 10 in many markets</li>
        <li><strong>BGS 9 Mint</strong> — one subgrade of 8.5 or a combination pulling the average down</li>
        <li><strong>BGS Black Label 10</strong> — all four subgrades are a perfect 10. The holy grail.</li>
      </ul>

      <h3>BGS pros</h3>
      <ul>
        <li>Subgrades give detailed condition breakdown</li>
        <li>BGS 9.5 is highly respected and commands strong premiums</li>
        <li>Black Label 10 is the most prestigious grade in the hobby</li>
        <li>Popular for basketball cards and high-end vintage</li>
      </ul>

      <h3>BGS cons</h3>
      <ul>
        <li>Stricter grading standards — harder to get a 9.5 than a PSA 10</li>
        <li>Lower resale value than PSA for equivalent grades in most categories</li>
        <li>Less recognized internationally than PSA</li>
      </ul>

      <blockquote>
        <p><strong>Best for:</strong> Collectors who want detailed condition information, basketball cards, high-end vintage cards.</p>
      </blockquote>

      <hr/>

      <h2>SGC — Sportscard Guaranty</h2>
      <p>SGC is the third major grading company and has carved out a niche as the go-to grader for vintage cards and collectors who want faster, more affordable grading.</p>

      <h3>SGC grading scale</h3>
      <p>SGC uses a 1-10 scale with half-point increments:</p>
      <ul>
        <li><strong>SGC 10 Gem Mint</strong> — perfect card</li>
        <li><strong>SGC 9.5</strong> — near perfect with one minor flaw</li>
        <li><strong>SGC 9 Mint</strong> — one or two minor imperfections</li>
        <li><strong>SGC 8.5 and below</strong> — progressively more wear</li>
      </ul>

      <h3>SGC pros</h3>
      <ul>
        <li>Fastest turnaround times of the three major companies</li>
        <li>Most affordable pricing</li>
        <li>Dominant in the vintage card market (pre-1980s)</li>
        <li>Clean, modern slab design</li>
      </ul>

      <h3>SGC cons</h3>
      <ul>
        <li>Lower resale value than PSA for modern cards</li>
        <li>Smaller population database</li>
        <li>Less recognized by casual buyers</li>
      </ul>

      <blockquote>
        <p><strong>Best for:</strong> Vintage cards, budget-conscious collectors, fast turnaround needs.</p>
      </blockquote>

      <hr/>

      <h2>PSA vs BGS vs SGC — Side by Side</h2>

      <div style={{overflowX:'auto' as const,marginBottom:'24px'}}>
        <table style={{width:'100%',borderCollapse:'collapse' as const,fontSize:'14px'}}>
          <thead>
            <tr style={{background:'#F7F7F7'}}>
              <th style={{padding:'12px 16px',textAlign:'left' as const,fontWeight:700,color:'#0D0D0D',borderBottom:'2px solid #EFEFEF'}}>Factor</th>
              <th style={{padding:'12px 16px',textAlign:'left' as const,fontWeight:700,color:'#002FA7',borderBottom:'2px solid #EFEFEF'}}>PSA</th>
              <th style={{padding:'12px 16px',textAlign:'left' as const,fontWeight:700,color:'#C41E3A',borderBottom:'2px solid #EFEFEF'}}>BGS</th>
              <th style={{padding:'12px 16px',textAlign:'left' as const,fontWeight:700,color:'#1A6B2A',borderBottom:'2px solid #EFEFEF'}}>SGC</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Resale Value', '★★★★★', '★★★★', '★★★'],
              ['Recognition', '★★★★★', '★★★★', '★★★'],
              ['Turnaround', 'Slow', 'Medium', 'Fast'],
              ['Cost', 'High', 'Medium', 'Low'],
              ['Subgrades', 'No', 'Yes', 'No'],
              ['Best for', 'Modern cards', 'Basketball/vintage', 'Vintage cards'],
              ['Top Grade', 'PSA 10', 'BGS 9.5 / Black Label', 'SGC 10'],
            ].map(([factor, psa, bgs, sgc]) => (
              <tr key={factor} style={{borderBottom:'1px solid #EFEFEF'}}>
                <td style={{padding:'12px 16px',fontWeight:600,color:'#0D0D0D'}}>{factor}</td>
                <td style={{padding:'12px 16px',color:'#555'}}>{psa}</td>
                <td style={{padding:'12px 16px',color:'#555'}}>{bgs}</td>
                <td style={{padding:'12px 16px',color:'#555'}}>{sgc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr/>

      <h2>Which Grading Company Should You Choose?</h2>

      <h3>Choose PSA if:</h3>
      <ul>
        <li>You want maximum resale value</li>
        <li>You're grading modern sports cards or Pokémon</li>
        <li>You plan to sell on eBay where PSA commands the highest prices</li>
        <li>You don't need subgrade information</li>
      </ul>

      <h3>Choose BGS if:</h3>
      <ul>
        <li>You want detailed subgrade information</li>
        <li>You're grading basketball cards</li>
        <li>You believe your card could achieve a Black Label 10</li>
        <li>You're a serious collector who values condition transparency</li>
      </ul>

      <h3>Choose SGC if:</h3>
      <ul>
        <li>You're grading vintage cards (pre-1980s)</li>
        <li>You need fast turnaround</li>
        <li>You're on a budget</li>
        <li>You're grading for personal collection rather than resale</li>
      </ul>

      <hr/>

      <h2>Tracking Graded Cards in Your Collection</h2>
      <p>Once your cards are graded, tracking them properly is essential. Foilcase lets you record the grading company, grade, and current value for every graded card in your vault — giving you a complete picture of your graded collection's worth at a glance.</p>
      <p>Visit the <Link href="/search">Search page</Link> to find current market values for graded cards using live eBay data.</p>

      <hr/>

      <h2>Frequently Asked Questions</h2>
      <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginTop:'16px'}}>
        {[
          {
            q: 'Is PSA better than BGS?',
            a: 'PSA generally commands higher resale values for modern cards and is more universally recognized. However BGS offers more detailed condition information through subgrades and is preferred for certain card categories like basketball. Neither is objectively better — it depends on your goals.',
          },
          {
            q: 'What is a PSA 10 worth compared to a BGS 9.5?',
            a: 'In most markets a PSA 10 commands a higher price than a BGS 9.5 for the same card, despite BGS 9.5 being considered equivalent in condition. PSA\'s brand recognition drives a premium. However a BGS Black Label 10 typically commands the highest price of any graded version.',
          },
          {
            q: 'How long does grading take?',
            a: 'Turnaround times vary by service level. Economy PSA submissions can take 3-6 months. BGS regular service is typically 4-8 weeks. SGC is generally the fastest at 2-4 weeks for standard service. Expedited options are available at higher cost from all three companies.',
          },
          {
            q: 'Is it worth grading cards?',
            a: 'Grading is worth it when the potential grade premium exceeds the cost of grading. A card worth $50 raw that would grade PSA 10 and sell for $300 is absolutely worth grading. A $20 card that might grade PSA 8 and sell for $25 is not worth the $25+ grading cost.',
          },
          {
            q: 'Can I track my graded cards on Foilcase?',
            a: 'Yes — Foilcase lets you record the grading company, grade score, and current value for every graded card in your vault. Your collection dashboard shows your total graded card count alongside your overall collection value.',
          },
        ].map(faq => (
          <div key={faq.q} style={{border:'1px solid #EFEFEF',borderRadius:'8px',padding:'20px',background:'#fff'}}>
            <div style={{fontSize:'15px',fontWeight:700,color:'#0D0D0D',marginBottom:'8px'}}>{faq.q}</div>
            <div style={{fontSize:'14px',color:'#555',lineHeight:1.7}}>{faq.a}</div>
          </div>
        ))}
      </div>
<ArticleProducts products={[
  { name:'Cardboard Gold Card Saver I 200ct', desc:'Semi-rigid holders required for PSA and BGS submissions', img:'https://m.media-amazon.com/images/I/61+9PJNvZ6L._AC_SX466_.jpg', url:'https://www.amazon.com/Cardboard-Gold-Saver-1-200-Count/dp/B00THQ4O1Y?tag=foilcase-20' },
  { name:'Ultra Pro Semi-Rigid Sleeves 200ct', desc:'Preferred by grading companies for card submissions', img:'https://m.media-amazon.com/images/I/81+U8xCvsjL._AC_SX679_.jpg', url:'https://www.amazon.com/Ultra-Pro-Rigid-Sleeves-200ct/dp/B000ETP9RG?tag=foilcase-20' },
  { name:'6x4x1" Corrugated Shipping Boxes', desc:'Perfect size for shipping cards to grading companies', img:'https://m.media-amazon.com/images/I/610WxTD+eJL._AC_SX679_.jpg', url:'https://www.amazon.com/HORLIMER-Shipping-Corrugated-Cardboard-Literature/dp/B0CYCF7FGH?tag=foilcase-20' },
]}/>
      <ArticleCTA />
    </>
  )
}