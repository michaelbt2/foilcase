import ArticleCTA from '../components/ArticleCTA'
import Link from 'next/link'

export default function CharizardCardValueGuide() {
  return (
    <>
      <div style={{background:'#F7F7F7',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:'#9A9A9A',marginBottom:'12px'}}>Key Takeaways</div>
        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {[
            'Charizard is the most valuable and iconic Pokémon card in the hobby',
            'First Edition Base Set Charizards are worth tens of thousands of dollars',
            'Condition and grading dramatically affect Charizard card values',
            'Multiple Charizard cards exist across dozens of sets — each with different values',
            'PSA 10 copies command the highest premiums of any grade',
          ].map(item => (
            <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'14px',color:'#0D0D0D',fontWeight:500}}>
              <span style={{color:'#00A861',fontWeight:700,flexShrink:0}}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2>Why Charizard is the King of Pokémon Cards</h2>
      <p>Charizard has been the most iconic and valuable Pokémon card since the original Base Set was released in 1999. As a Fire-type dragon and one of the original starter evolutions, Charizard captured the imagination of an entire generation of collectors — and that emotional connection has never faded.</p>
      <p>Today, Charizard cards from multiple eras command premium prices in the collector market. Whether you own a vintage Base Set copy, a modern special illustration rare, or anything in between — understanding Charizard card values is essential knowledge for any Pokémon collector.</p>

      <h2>The Most Valuable Charizard Cards</h2>

      <h3>1999 Pokémon Base Set 1st Edition Charizard (#4)</h3>
      <p>The holy grail of Pokémon cards. The 1st Edition Base Set Charizard is the most iconic trading card in the entire hobby — not just Pokémon. Identifiable by the "Edition 1" stamp on the left side of the card.</p>
      <ul>
        <li><strong>PSA 10 Gem Mint</strong> — $300,000 to $500,000+</li>
        <li><strong>PSA 9 Mint</strong> — $25,000 to $50,000</li>
        <li><strong>PSA 8 NM-MT</strong> — $8,000 to $15,000</li>
        <li><strong>Raw Near Mint</strong> — $2,000 to $5,000</li>
      </ul>

      <blockquote>
        <p><strong>How to identify 1st Edition:</strong> Look for the "Edition 1" stamp in a black oval on the left side of the card, below the artwork. Shadowless cards (no drop shadow around the artwork box) are also highly valuable but are not 1st Edition.</p>
      </blockquote>

      <h3>1999 Pokémon Base Set Unlimited Charizard (#4)</h3>
      <p>The most common version of the original Charizard — produced in much larger quantities than 1st Edition but still highly valuable.</p>
      <ul>
        <li><strong>PSA 10 Gem Mint</strong> — $5,000 to $15,000</li>
        <li><strong>PSA 9 Mint</strong> — $1,000 to $3,000</li>
        <li><strong>PSA 8 NM-MT</strong> — $400 to $800</li>
        <li><strong>Raw Near Mint</strong> — $100 to $300</li>
      </ul>

      <h3>1999 Pokémon Base Set Shadowless Charizard (#4)</h3>
      <p>Produced between the 1st Edition and Unlimited print runs, Shadowless cards lack the drop shadow around the artwork box. Rarer than Unlimited but more common than 1st Edition.</p>
      <ul>
        <li><strong>PSA 10 Gem Mint</strong> — $25,000 to $75,000</li>
        <li><strong>PSA 9 Mint</strong> — $5,000 to $12,000</li>
        <li><strong>Raw Near Mint</strong> — $500 to $1,500</li>
      </ul>

      <h3>Modern Charizard Cards (2020-Present)</h3>
      <p>The modern era has produced some spectacular Charizard cards that command serious prices:</p>
      <ul>
        <li><strong>2020 Champion's Path Rainbow Rare Charizard VMAX</strong> — $200 to $800 raw, $1,000+ PSA 10</li>
        <li><strong>2022 Pokémon GO Radiant Charizard</strong> — $50 to $200 raw</li>
        <li><strong>2023 Obsidian Flames Charizard ex Special Illustration Rare</strong> — $100 to $400 raw, $500-$1,500 PSA 10</li>
        <li><strong>2024 Surging Sparks Charizard ex</strong> — values vary by parallel</li>
      </ul>

      <hr/>

      <h2>How Condition Affects Charizard Card Value</h2>
      <p>Condition is especially critical for Charizard cards because of the card's dark border — any edge wear, scratches, or print defects are immediately visible on the black border. This is why Charizard cards are notoriously difficult to grade at PSA 10.</p>

      <h3>What graders look for on Charizard cards</h3>
      <ul>
        <li><strong>Centering</strong> — the artwork and border should be centered. Off-center cards are common in vintage Pokémon.</li>
        <li><strong>Corner wear</strong> — the four corners are the most vulnerable part of any card</li>
        <li><strong>Edge wear</strong> — especially visible on Charizard's dark border</li>
        <li><strong>Surface scratches</strong> — the holographic artwork on Charizard shows scratches easily</li>
        <li><strong>Print defects</strong> — dots, lines, or spots from the printing process</li>
      </ul>

      <hr/>

      <h2>How to Identify Your Charizard Card</h2>
      <p>With dozens of Charizard cards across hundreds of sets, identifying exactly which card you have is essential before valuing it.</p>

      <h3>Check these details</h3>
      <ul>
        <li><strong>Set symbol</strong> — the small icon in the bottom right of the card identifies the set</li>
        <li><strong>Card number</strong> — shown as X/Y in the bottom right (e.g. 4/102 for Base Set)</li>
        <li><strong>Edition stamp</strong> — "Edition 1" stamp indicates 1st Edition</li>
        <li><strong>Shadow or shadowless</strong> — look for the drop shadow around the artwork box</li>
        <li><strong>Card name and HP</strong> — different versions have different HP values</li>
        <li><strong>Copyright year</strong> — shown at the bottom of the card</li>
      </ul>

      <hr/>

      <h2>Is Your Charizard Worth Grading?</h2>
      <p>Given the significant premium that graded Charizard cards command — especially PSA 10s — grading is worth considering for any Charizard in excellent condition.</p>

      <h3>When to grade your Charizard</h3>
      <ul>
        <li>The card shows no visible corner wear, edge wear, or surface scratches</li>
        <li>The centering looks reasonably good</li>
        <li>The holographic surface has no scratches or cloudiness</li>
        <li>The card is vintage (1999-2002) where even a PSA 7 or 8 adds significant value</li>
      </ul>

      <h3>When not to grade</h3>
      <ul>
        <li>Visible corner wear that would result in a grade of PSA 6 or below</li>
        <li>Modern common Charizard cards where the grade premium doesn't justify the cost</li>
        <li>Cards with obvious print defects visible to the naked eye</li>
      </ul>

      <hr/>

      <h2>Where to Find Current Charizard Card Values</h2>
      <p>Card values change constantly based on market conditions, new set releases, and collector demand. Use these resources to find current values:</p>
      <ul>
        <li><strong>eBay sold listings</strong> — the most accurate real-time pricing source</li>
        <li><strong>Foilcase Search</strong> — pulls live eBay data for quick value lookups</li>
        <li><strong>PSA Card Facts</strong> — shows population data and historical sales for graded cards</li>
      </ul>
      <p>Use the <Link href="/search">Foilcase Search page</Link> to find current Charizard values from live eBay data.</p>

      <hr/>

      <h2>Tracking Your Charizard Collection</h2>
      <p>If you own multiple Charizard cards, tracking them properly in a digital vault helps you understand your total Charizard collection value and monitor appreciation over time. Foilcase is free and lets you add card images, track current values, and organize your Pokémon collection alongside your sports cards.</p>

      <hr/>

      <h2>Frequently Asked Questions</h2>
      <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginTop:'16px'}}>
        {[
          {
            q: 'What is the most valuable Charizard card?',
            a: 'The 1999 Pokémon Base Set 1st Edition Charizard (#4/102) is the most valuable Charizard card. PSA 10 copies have sold for $300,000 to over $500,000. A PSA 10 copy sold for $420,000 in 2022 making it one of the most expensive Pokémon cards ever sold.',
          },
          {
            q: 'How do I know if my Charizard is 1st Edition?',
            a: 'Look for the "Edition 1" stamp — a small black oval with the text "Edition 1" — on the left side of the card, below the artwork box. If this stamp is absent, your card is either Shadowless (no drop shadow around the artwork) or Unlimited (has a drop shadow). All three versions have significant value.',
          },
          {
            q: 'Is my Charizard worth anything?',
            a: 'Almost certainly yes — any Charizard card has collector value. Even a heavily played Unlimited Base Set Charizard is worth $20-$50. A Near Mint copy can fetch $100-$300. The key factors are which version you have (1st Edition, Shadowless, or Unlimited), the set it\'s from, and its condition.',
          },
          {
            q: 'Should I get my Charizard graded by PSA?',
            a: 'If your Charizard is in Near Mint or better condition and is a vintage card (1999-2002), PSA grading is likely worth the investment. Even a PSA 8 of a 1st Edition Charizard is worth thousands. For modern Charizard cards, grading is worth it if the card is in pristine condition and could achieve a PSA 10.',
          },
          {
            q: 'How do I find the value of my specific Charizard card?',
            a: 'Search eBay sold listings for your exact card — include the set name, card number, and condition in your search. For graded cards, include the grading company and grade. Foilcase\'s Search page pulls live eBay data to help you find current values quickly.',
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