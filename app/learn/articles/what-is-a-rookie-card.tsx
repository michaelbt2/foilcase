import ArticleCTA from '../components/ArticleCTA'
import Link from 'next/link'
import ArticleProducts from '../components/ArticleProducts'

export default function WhatIsARookieCard() {
  return (
    <>
      <div style={{background:'#F7F7F7',border:'1px solid #EFEFEF',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:'.08em',color:'#9A9A9A',marginBottom:'12px'}}>Key Takeaways</div>
        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column' as const,gap:'8px'}}>
          {[
            'A rookie card is a player\'s first officially licensed card from their debut season',
            'Rookie cards are the most valuable cards for most players',
            'Not all first-year cards qualify as true rookie cards',
            'Condition and print run are the biggest value factors for rookie cards',
            'Rookie cards can appreciate dramatically if a player has a breakout career',
          ].map(item => (
            <li key={item} style={{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'14px',color:'#0D0D0D',fontWeight:500}}>
              <span style={{color:'#00A861',fontWeight:700,flexShrink:0}}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2>What is a Rookie Card?</h2>
      <p>A rookie card — commonly abbreviated as RC — is a player's first officially licensed trading card produced during or just before their debut season in professional sports. Rookie cards are widely considered the most valuable and collectible cards for any given player.</p>
      <p>The term comes from the word "rookie" — slang for a first-year professional athlete. The concept exists across all major sports card categories including football, basketball, baseball, hockey, and even some trading card games.</p>

      <h2>What Makes a Card an Official Rookie Card?</h2>
      <p>Not every card featuring a player in their first year qualifies as an official rookie card. The major card manufacturers (Panini, Topps, Upper Deck) have specific criteria that must be met:</p>
      <ul>
        <li>The card must be produced by a licensed manufacturer</li>
        <li>The player must be depicted in their professional team uniform</li>
        <li>The card must be produced in the player's rookie year or the year they first appear on a professional roster</li>
        <li>The card must be a base or parallel — not a prospect or pre-rookie card</li>
      </ul>
      <p>Cards that meet these criteria are typically designated with an official <strong>RC logo</strong> from the manufacturer, making them easy to identify.</p>

      <blockquote>
        <p><strong>Important:</strong> A card showing a player before they turned professional — such as a college or minor league card — is not considered a true rookie card even if it was their first card ever produced.</p>
      </blockquote>

      <hr/>

      <h2>Why Are Rookie Cards So Valuable?</h2>
      <p>Rookie cards represent a player at the beginning of their professional journey. Collectors and investors prize them for several reasons:</p>

      <h3>Scarcity relative to a player's career</h3>
      <p>A player only has one rookie year. Every card produced after that first year is not a rookie card. This finite supply, combined with growing demand as a player's career develops, creates natural price appreciation for strong performers.</p>

      <h3>Speculation and future value</h3>
      <p>Many collectors buy rookie cards of promising players before they become stars. A Patrick Mahomes rookie card purchased for $15 in 2017 was worth thousands by 2020 after his MVP season. This speculative element drives significant demand and prices.</p>

      <h3>Emotional connection</h3>
      <p>Collectors often feel a deeper connection to a player's early career cards. They represent the beginning of something — a career that might become legendary.</p>

      <hr/>

      <h2>Types of Rookie Cards</h2>
      <p>Not all rookie cards are equal. Here are the main types you'll encounter:</p>

      <h3>Base rookie cards</h3>
      <p>The standard version included in every pack. Produced in the largest quantities and generally the most affordable. Examples include the Panini Prizm base rookie or Topps Chrome base rookie.</p>

      <h3>Rookie autographs</h3>
      <p>Rookie cards signed by the player — either on-card or via a sticker. Auto RCs are significantly more valuable than base versions and are among the most sought-after cards in the hobby.</p>

      <h3>Rookie patch autographs (RPA)</h3>
      <p>The holy grail for most modern collector sets. These cards include a piece of game-worn jersey or equipment alongside the player's autograph. National Treasures RPAs are the most famous example and routinely sell for thousands to tens of thousands of dollars for top prospects.</p>

      <h3>Numbered rookie parallels</h3>
      <p>Limited print run versions of rookie cards numbered to a specific quantity (e.g. /99, /49, /25, /10, /5, 1/1). Lower print runs equal higher scarcity and typically higher value.</p>

      <hr/>

      <h2>How to Identify a Rookie Card</h2>
      <p>Look for these indicators when identifying rookie cards:</p>
      <ul>
        <li><strong>RC logo</strong> — an official rookie card designation printed on the card by the manufacturer</li>
        <li><strong>First year in set</strong> — check if the player appears in the same set in previous years</li>
        <li><strong>Professional uniform</strong> — the player should be depicted in their professional team's uniform</li>
        <li><strong>Licensed manufacturer</strong> — Panini, Topps, Upper Deck, or another officially licensed company</li>
      </ul>

      <hr/>

      <h2>Most Valuable Rookie Cards in History</h2>
      <p>Some rookie cards have sold for extraordinary amounts. Here are a few notable examples:</p>
      <ul>
        <li><strong>1952 Topps Mickey Mantle</strong> — sold for $12.6 million in 2022, the most expensive sports card ever sold</li>
        <li><strong>1986 Fleer Michael Jordan RC</strong> — PSA 10 copies regularly sell for $500,000+</li>
        <li><strong>2000 Topps Chrome Tom Brady RC</strong> — PSA 10 copies sell for $400,000+</li>
        <li><strong>2003 Topps Chrome LeBron James RC</strong> — PSA 10 copies sell for $200,000+</li>
        <li><strong>2017 Panini Prizm Patrick Mahomes RC</strong> — PSA 10 copies sell for $5,000-$15,000+</li>
      </ul>

      <hr/>

      <h2>Rookie Cards in Trading Card Games</h2>
      <p>The concept of rookie cards also applies to trading card games like Pokémon and Magic: The Gathering, though in a different context. In TCGs, "first edition" or "1st Edition" cards — the first print run of a set — function similarly to rookie cards in terms of collector value and scarcity.</p>
      <p>A 1st Edition Charizard from the original Pokémon Base Set is the TCG equivalent of a sports rookie card — the first and most valuable version of an iconic card.</p>

      <hr/>

      <h2>Tracking Rookie Cards in Your Collection</h2>
      <p>Foilcase lets you tag cards with the RC attribute so you can easily filter and track all the rookie cards in your vault. You can also track the cost paid versus current value to monitor appreciation over time.</p>
      <p>Use the <Link href="/search">Search page</Link> to find current market values for specific rookie cards using live eBay pricing data.</p>

      <hr/>

      <h2>Frequently Asked Questions</h2>
      <div style={{display:'flex',flexDirection:'column' as const,gap:'12px',marginTop:'16px'}}>
        {[
          {
            q: 'What makes a rookie card official?',
            a: 'An official rookie card must be produced by a licensed manufacturer, depict the player in their professional uniform, and be produced in the player\'s debut season. The card should carry the official RC designation logo from the manufacturer.',
          },
          {
            q: 'Are all first-year cards rookie cards?',
            a: 'No — not all first-year cards qualify as official rookie cards. Prospect cards, pre-rookie cards, and cards produced before a player turns professional do not carry the RC designation even if they were the first cards ever made of that player.',
          },
          {
            q: 'What is the most valuable type of rookie card?',
            a: 'Rookie Patch Autographs (RPAs) are generally the most valuable type of rookie card. These cards include a piece of game-worn memorabilia and the player\'s autograph, making them the ultimate collectible for most modern sets.',
          },
          {
            q: 'Should I buy rookie cards as investments?',
            a: 'Rookie cards can appreciate significantly if the player develops into a star, but they can also lose value if a player underperforms or gets injured. Like any investment, there is significant risk. Research the player thoroughly and never spend more than you can afford to lose.',
          },
          {
            q: 'How do I find the value of my rookie cards?',
            a: 'The most accurate way to value rookie cards is through eBay sold listings for identical or near-identical cards. Foilcase\'s Search page pulls live eBay data to help you find current market values quickly.',
          },
        ].map(faq => (
          <div key={faq.q} style={{border:'1px solid #EFEFEF',borderRadius:'8px',padding:'20px',background:'#fff'}}>
            <div style={{fontSize:'15px',fontWeight:700,color:'#0D0D0D',marginBottom:'8px'}}>{faq.q}</div>
            <div style={{fontSize:'14px',color:'#555',lineHeight:1.7}}>{faq.a}</div>
          </div>
        ))}
      </div>
<ArticleProducts products={[
  { name:'ONE-Touch Magnetic Card Holder', desc:'Premium protection for your most valuable rookie cards', img:'https://m.media-amazon.com/images/I/61Vzn+tVnVL._AC_SX466_.jpg', url:'https://www.amazon.com/Accessories-Ultra-Pro-One-Touch-Magnetic/dp/B07PJ1L5G5?tag=foilcase-20' },
  { name:'Ultra Pro Top Loaders 25ct', desc:'Rigid protection for rookie cards in your collection', img:'https://m.media-amazon.com/images/I/71onuytTxmL._AC_SX466_.jpg', url:'https://www.amazon.com/Ultra-Pro-Baseball-Football-Basketball/dp/B004KHV24W?tag=foilcase-20' },
  { name:'Ultra Pro Penny Sleeves 100ct', desc:'First line of defense for every card you own', img:'https://m.media-amazon.com/images/I/61MeeY1RyjL._AC_SX679_.jpg', url:'https://www.amazon.com/Ultra-Pro-Sleeves-Standard-Trading/dp/B08B9GVG36?tag=foilcase-20' },
]}/>
      <ArticleCTA />
    </>
  )
}