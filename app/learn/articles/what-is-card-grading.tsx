'use client'
import ArticleCTA from '../components/ArticleCTA'
import ArticleProducts from '../components/ArticleProducts'
import Link from 'next/link'

export default function WhatIsCardGrading() {
  return (
    <>
      <div style={{background:'#F7F7F7',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:'#9A9A9A',marginBottom:'12px'}}>Key Takeaways</div>
        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {[
            'Card grading is the process of professionally authenticating and assigning a condition score to a trading card',
            'PSA, BGS, and SGC are the three major grading companies',
            'Grades run from 1 to 10 with 10 being perfect',
            'Graded cards typically sell for significantly more than ungraded raw cards',
            'Grading is worth it when the potential grade premium exceeds the cost of submission',
          ].map(item => (
            <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'14px',color:'#0D0D0D',fontWeight:500}}>
              <span style={{color:'#00A861',fontWeight:700,flexShrink:0}}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2>What is Card Grading?</h2>
      <p>Card grading is the process of sending a trading card to a professional grading company where it is authenticated, evaluated for condition, assigned a numerical grade, and sealed in a tamper-evident protective case called a slab. The grade reflects the card's condition on a standardized scale and provides buyers and sellers with an objective assessment of quality.</p>
      <p>Grading was introduced to solve a fundamental problem in the trading card hobby — condition is subjective. Two collectors might describe the same card differently. A professional grade removes that subjectivity and creates a universally understood standard that the entire market trusts.</p>

      <h2>Why Does Grading Matter?</h2>
      <p>Grading matters for three main reasons:</p>

      <h3>Value</h3>
      <p>A graded card in a high grade commands a significant premium over the same card ungraded. A PSA 10 Gem Mint card can be worth 3-10x the value of the same raw card depending on the player, set, and demand. For high-value cards this premium can represent thousands of dollars.</p>

      <h3>Trust</h3>
      <p>When buying cards online you cannot physically inspect what you are purchasing. A graded card in a PSA, BGS, or SGC slab gives the buyer confidence that the card is authentic and the condition has been independently verified. This trust drives demand and liquidity for graded cards.</p>

      <h3>Protection</h3>
      <p>The grading slab itself provides superior long-term protection compared to penny sleeves or top loaders. The sealed case protects against moisture, UV light, handling damage, and environmental factors that degrade cards over time.</p>

      <hr/>

      <h2>The Grading Scale Explained</h2>
      <p>All three major grading companies use a 1-10 numerical scale. Here is what each grade means:</p>

      <ul>
        <li><strong>10 Gem Mint</strong> — virtually perfect. Four sharp corners, perfect centering, no visible defects. The most desirable grade.</li>
        <li><strong>9 Mint</strong> — one minor imperfection allowed. Could be a tiny corner touch, very slight print dot, or minor centering issue. Still an excellent card.</li>
        <li><strong>8 Near Mint-Mint</strong> — slight wear on corners or edges. May have minor centering issues. Still a high quality card.</li>
        <li><strong>7 Near Mint</strong> — minor visible wear on corners or edges. Small scratches may be visible under close inspection.</li>
        <li><strong>6 Excellent-Mint</strong> — light wear visible on multiple corners. Surface may show slight scratches or print defects.</li>
        <li><strong>5 Excellent</strong> — moderate wear. Corners may show rounding. Surface scratches visible without magnification.</li>
        <li><strong>4 Very Good-Excellent</strong> — heavy wear beginning to show. Creases possible.</li>
        <li><strong>3 Very Good</strong> — obvious wear throughout. Light creases, rounded corners.</li>
        <li><strong>2 Good</strong> — heavily played. Major creases, heavy wear on all surfaces.</li>
        <li><strong>1 Poor</strong> — severely damaged. Tears, heavy creases, missing pieces possible.</li>
      </ul>

      <hr/>

      <h2>The Three Major Grading Companies</h2>

      <h3>PSA — Professional Sports Authenticator</h3>
      <p>PSA is the most recognized grading company in the hobby and commands the highest resale values for most modern cards. Founded in 1991, PSA has graded over 45 million cards. A PSA 10 is widely considered the gold standard grade in the hobby.</p>

      <h3>BGS — Beckett Grading Services</h3>
      <p>BGS is known for its rigorous subgrade system that grades four aspects of each card independently — centering, corners, edges, and surface. BGS 9.5 Gem Mint is highly sought after and a BGS Black Label 10 (all four subgrades perfect) is the most prestigious grade in the hobby.</p>

      <h3>SGC — Sportscard Guaranty</h3>
      <p>SGC is the preferred grading company for vintage cards and offers faster turnaround times and more affordable pricing than PSA or BGS. SGC has built a strong reputation in the vintage card market for accurate and consistent grading.</p>

      <p>For a detailed comparison of all three companies see our <Link href="/learn/psa-vs-bgs-vs-sgc-grading-comparison">PSA vs BGS vs SGC grading guide</Link>.</p>

      <hr/>

      <h2>The Grading Process — Step by Step</h2>

      <h3>Step 1 — Evaluate your card</h3>
      <p>Before submitting examine your card carefully under good lighting. Check all four corners for wear, look at the edges for chipping or fraying, inspect the surface for scratches or print defects, and assess the centering. Be honest with yourself — if the card shows significant wear it may not be worth the grading cost.</p>

      <h3>Step 2 — Choose your grading company</h3>
      <p>PSA for modern sports cards and Pokémon where resale value is the priority. BGS for basketball cards or when you want detailed subgrade information. SGC for vintage cards or when speed and cost are important factors.</p>

      <h3>Step 3 — Create an account and submit</h3>
      <p>All three companies have online submission portals. Create an account, fill in the card details, select your service level (economy, standard, express, etc.), and generate your submission form.</p>

      <h3>Step 4 — Package your cards properly</h3>
      <p>Place each card in a penny sleeve, then in a card saver (semi-rigid holder). Do not use top loaders for grading submissions — the rigid plastic can damage card edges. Place card savers between cardboard and ship in a box with bubble wrap. Never ship cards in a bubble mailer alone.</p>

      <h3>Step 5 — Ship to the grading company</h3>
      <p>Use USPS Priority Mail or UPS with tracking and insurance for the full declared value of your submission. Keep your tracking number and confirmation email.</p>

      <h3>Step 6 — Wait for results</h3>
      <p>Turnaround times vary significantly by service level. Economy submissions can take months. Express and walk-through services are faster but significantly more expensive. Check the grading company's website for current estimated turnaround times.</p>

      <h3>Step 7 — Receive your graded cards</h3>
      <p>Your graded cards will be returned in their sealed slabs with the grade displayed on the label. You can verify grades on the grading company's online registry using the certification number on the label.</p>

      <hr/>

      <h2>How Much Does Grading Cost?</h2>
      <p>Grading costs vary by company and service level. As a general guide:</p>
      <ul>
        <li><strong>PSA Economy</strong> — $25 per card (slowest turnaround)</li>
        <li><strong>PSA Standard</strong> — $50 per card</li>
        <li><strong>PSA Express</strong> — $150 per card</li>
        <li><strong>BGS Standard</strong> — $30-50 per card</li>
        <li><strong>SGC Standard</strong> — $25-35 per card</li>
      </ul>
      <p>These prices change frequently — always check the grading company's current fee schedule before submitting.</p>

      <hr/>

      <h2>Is Grading Worth It?</h2>
      <p>Grading is worth it when the potential value increase from a high grade exceeds the cost of grading. A simple formula to evaluate:</p>
      <ul>
        <li>Find the current PSA 10 sale price for your card on eBay sold listings</li>
        <li>Subtract the grading cost ($25-50)</li>
        <li>Subtract eBay fees if you plan to sell (approximately 13%)</li>
        <li>Compare the result to the current raw card sale price</li>
      </ul>
      <p>If the math works in your favor and you believe the card will grade a 9 or 10, grading makes sense. For cards worth less than $50 raw, grading rarely makes financial sense.</p>

      <hr/>

      <h2>Tracking Your Graded Cards</h2>
      <p>Once your cards are graded, tracking them in a digital vault is essential. <Link href="/collection">Foilcase</Link> lets you record the grading company, grade, and current market value for every graded card — giving you a complete picture of your graded collection's worth at a glance. Use the <Link href="/search">Search page</Link> to find current market values for specific graded cards using live eBay data.</p>

      <hr/>

      <h2>Frequently Asked Questions</h2>
      <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginTop:'16px'}}>
        {[
          { q:'What is the difference between graded and raw cards?', a:'A raw card is an ungraded card that has not been professionally evaluated or encased. A graded card has been authenticated and assigned a condition score by a professional grading company and is sealed in a protective slab. Graded cards typically sell for more than raw cards due to the authentication and standardized condition assessment.' },
          { q:'Can grading companies make mistakes?', a:'Yes — grading is not infallible. Human graders can occasionally assign grades that other experts might dispute. This is why experienced collectors sometimes seek regrading of cards they believe were undergraded. However the major companies maintain high consistency standards across millions of submissions.' },
          { q:'What is a crossover?', a:'A crossover is when a card graded by one company is submitted to another company for regrading in hopes of receiving a higher or equivalent grade in the new slab. Collectors often cross BGS 9.5s to PSA hoping for a PSA 10 which commands a higher market value.' },
          { q:'How do I know if a graded card is authentic?', a:'Every graded card has a unique certification number on the label. You can verify any graded card on the grading company\'s online registry by entering this number. This confirms the card is genuine and the grade is accurate.' },
          { q:'Should I get my cards graded before or after buying?', a:'Generally it is more economical to buy already graded cards if you are paying a premium for the grade. Submit your own cards for grading when you have raw cards in excellent condition that you believe will achieve high grades and where the grading premium justifies the cost.' },
        ].map(faq => (
          <div key={faq.q} style={{border:'1px solid #EFEFEF',borderRadius:'8px',padding:'20px',background:'#fff'}}>
            <div style={{fontSize:'15px',fontWeight:700,color:'#0D0D0D',marginBottom:'8px'}}>{faq.q}</div>
            <div style={{fontSize:'14px',color:'#555',lineHeight:1.7}}>{faq.a}</div>
          </div>
        ))}
      </div>

      <ArticleProducts products={[
        { name:'Cardboard Gold Card Saver I 200ct', desc:'Required for PSA and BGS grading submissions', img:'https://m.media-amazon.com/images/I/61+9PJNvZ6L._AC_SX466_.jpg', url:'https://www.amazon.com/Cardboard-Gold-Saver-1-200-Count/dp/B00THQ4O1Y?tag=foilcase-20' },
        { name:'Ultra Pro Semi-Rigid Sleeves 200ct', desc:'Preferred semi-rigid holders for grading submissions', img:'https://m.media-amazon.com/images/I/81+U8xCvsjL._AC_SX679_.jpg', url:'https://www.amazon.com/Ultra-Pro-Rigid-Sleeves-200ct/dp/B000ETP9RG?tag=foilcase-20' },
        { name:'6x4x1" Corrugated Shipping Boxes', desc:'Perfect size for shipping cards to grading companies', img:'https://m.media-amazon.com/images/I/610WxTD+eJL._AC_SX679_.jpg', url:'https://www.amazon.com/HORLIMER-Shipping-Corrugated-Cardboard-Literature/dp/B0CYCF7FGH?tag=foilcase-20' },
      ]}/>

      <ArticleCTA />
    </>
  )
}