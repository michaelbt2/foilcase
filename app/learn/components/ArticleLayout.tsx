import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ArticleCTA from './ArticleCTA'
import Link from 'next/link'


interface ArticleLayoutProps {
  children: React.ReactNode
  meta: {
    title: string
    description: string
    category: string
    readTime: string
    date: string
    slug: string
  }
}

export default function ArticleLayout({ children, meta }: ArticleLayoutProps) {
  return (
    <>
      <style>{`
        .article-hero{background:#fff;border-bottom:1px solid #EFEFEF;padding:48px 24px}
        .article-hero-inner{max-width:760px;margin:0 auto}
        .article-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#1B6FF0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px;text-decoration:none}
        .article-eyebrow:hover{text-decoration:underline}
        .article-title{font-size:clamp(28px,4vw,42px);font-weight:800;letter-spacing:-1.5px;color:#0D0D0D;line-height:1.1;margin-bottom:16px}
        .article-desc{font-size:17px;color:#555;line-height:1.7;margin-bottom:20px}
        .article-meta{display:flex;align-items:center;gap:16px;font-size:13px;color:#9A9A9A;flex-wrap:wrap}
        .article-meta-dot{width:3px;height:3px;border-radius:50%;background:#D8D8D8}
        .article-layout{max-width:760px;margin:0 auto;padding:48px 24px}
        .article-body h2{font-size:24px;font-weight:800;letter-spacing:-.5px;color:#0D0D0D;margin:40px 0 16px;line-height:1.2}
        .article-body h3{font-size:18px;font-weight:700;color:#0D0D0D;margin:28px 0 12px}
        .article-body p{font-size:16px;color:#555;line-height:1.8;margin-bottom:16px}
        .article-body ul,.article-body ol{font-size:16px;color:#555;line-height:1.8;margin-bottom:16px;padding-left:24px;display:flex;flex-direction:column;gap:8px}
        .article-body li{color:#555}
        .article-body strong{font-weight:700;color:#0D0D0D}
        .article-body a{color:#1B6FF0;text-decoration:none}
        .article-body a:hover{text-decoration:underline}
        .article-body blockquote{border-left:3px solid #1B6FF0;padding:12px 20px;background:#EBF2FF;border-radius:0 8px 8px 0;margin:24px 0}
        .article-body blockquote p{color:#1B6FF0;font-weight:600;margin:0}
        .article-body hr{border:none;border-top:1px solid #EFEFEF;margin:40px 0}
        .article-key-takeaways{background:#F7F7F7;border:1px solid #EFEFEF;border-radius:12px;padding:24px;margin-bottom:32px}
        .article-key-takeaways h4{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9A9A9A;margin-bottom:12px}
        .article-key-takeaways ul{display:flex;flex-direction:column;gap:8px;padding-left:0;list-style:none}
        .article-key-takeaways li{display:flex;align-items:flex-start;gap:8px;font-size:14px;color:#0D0D0D;font-weight:500}
        .article-key-takeaways li::before{content:'✓';color:#00A861;font-weight:700;flex-shrink:0}
        .article-faq{margin-top:48px}
        .article-faq h2{font-size:24px;font-weight:800;letter-spacing:-.5px;color:#0D0D0D;margin-bottom:24px}
        .faq-item{border:1px solid #EFEFEF;border-radius:8px;padding:20px;margin-bottom:12px;background:#fff}
        .faq-question{font-size:15px;font-weight:700;color:#0D0D0D;margin-bottom:8px}
        .faq-answer{font-size:14px;color:#555;line-height:1.7}
        .article-related{margin-top:48px;padding-top:32px;border-top:1px solid #EFEFEF}
        .article-related h3{font-size:18px;font-weight:800;letter-spacing:-.3px;color:#0D0D0D;margin-bottom:16px}
        .related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
        .related-card{background:#fff;border:1px solid #EFEFEF;border-radius:8px;padding:16px;text-decoration:none;transition:all .2s;display:block}
        .related-card:hover{border-color:#D8D8D8;box-shadow:0 4px 16px rgba(0,0,0,.08);transform:translateY(-2px)}
        .related-card-category{font-size:11px;font-weight:700;color:#1B6FF0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
        .related-card-title{font-size:14px;font-weight:700;color:#0D0D0D;line-height:1.3}
      `}</style>

      <Nav />

      {/* HERO */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <Link href="/learn" className="article-eyebrow">
            ← Learn
          </Link>
          <h1 className="article-title">{meta.title}</h1>
          <p className="article-desc">{meta.description}</p>
          <div className="article-meta">
            <span>{meta.category}</span>
            <div className="article-meta-dot"/>
            <span>{meta.readTime} read</span>
            <div className="article-meta-dot"/>
            <span>Updated {meta.date}</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="article-layout">
        <div className="article-body">
          {children}
        </div>
      </div>

      <Footer />
    </>
  )
}