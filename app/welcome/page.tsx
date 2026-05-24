"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faChartLine,
  faUsers,
  faRocket,
  faArrowRight,
  faShieldHalved,
  faStar,
  faMagnifyingGlass,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { analytics } from "../lib/analytics";

export default function Welcome() {
  useEffect(() => {
    analytics.pageViewed({ page: "welcome_flyer" });
  }, []);

  return (
  <>
    <head>
      <meta name="robots" content="noindex,nofollow"/>
    </head>
    <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#fff;color:#0D0D0D;-webkit-font-smoothing:antialiased}
        .w-page{min-height:100vh;display:flex;flex-direction:column}
        .w-nav{padding:20px 24px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #EFEFEF}
        .w-logo{display:flex;align-items:center;gap:6px;text-decoration:none;font-weight:800;font-size:20px;color:#0D0D0D;letter-spacing:-.4px}
@media(max-width:760px){.w-hero-grid{grid-template-columns:1fr!important}.w-hero-img{display:none}}        .w-eyebrow{display:inline-flex;align-items:center;gap:6px;background:#EBF2FF;color:#1B6FF0;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 14px;border-radius:100px;margin-bottom:24px}
        .w-title{font-size:clamp(32px,6vw,56px);font-weight:800;letter-spacing:-2px;line-height:1.05;color:#0D0D0D;margin-bottom:20px}
        .w-title em{font-style:italic;color:#1B6FF0}
        .w-sub{font-size:18px;color:#555;line-height:1.7;margin-bottom:36px;max-width:520px;margin-left:auto;margin-right:auto}
        .w-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 32px;border-radius:100px;background:#1B6FF0;color:#fff;text-decoration:none;font-size:16px;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s;box-shadow:0 8px 24px rgba(27,111,240,.3)}
.w-cta:hover{background:#0A4DBF;color:#fff;transform:translateY(-2px);box-shadow:0 12px 32px rgba(27,111,240,.4)}        .w-free{font-size:13px;color:#9A9A9A;margin-top:12px}
        .w-features{background:#F7F7F7;padding:64px 24px}
        .w-features-inner{max-width:960px;margin:0 auto}
        .w-features-title{font-size:clamp(22px,3vw,30px);font-weight:800;letter-spacing:-.5px;text-align:center;margin-bottom:40px;color:#0D0D0D}
        .w-features-title em{font-style:italic;color:#1B6FF0}
        .w-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
        .w-feature{background:#fff;border:1px solid #EFEFEF;border-radius:12px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .w-feature-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
        .w-feature-title{font-size:16px;font-weight:700;color:#0D0D0D;margin-bottom:6px}
        .w-feature-desc{font-size:14px;color:#555;line-height:1.65}
        .w-proof{padding:64px 24px;text-align:center}
        .w-proof-inner{max-width:680px;margin:0 auto}
        .w-proof-title{font-size:clamp(22px,3vw,30px);font-weight:800;letter-spacing:-.5px;color:#0D0D0D;margin-bottom:12px}
        .w-proof-sub{font-size:15px;color:#555;line-height:1.7;margin-bottom:40px}
        .w-steps{display:flex;flex-direction:column;gap:12px;margin-bottom:40px;text-align:left}
        .w-step{display:flex;align-items:flex-start;gap:16px;padding:18px 20px;background:#fff;border:1px solid #EFEFEF;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
        .w-step-num{width:32px;height:32px;border-radius:50%;background:#0D0D0D;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0}
        .w-step-title{font-size:14px;font-weight:700;color:#0D0D0D;margin-bottom:3px}
        .w-step-desc{font-size:13px;color:#555;line-height:1.5}
        .w-bottom-cta{background:#0D0D0D;padding:72px 24px;text-align:center;position:relative;overflow:hidden}
        .w-bottom-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 400px at 50% 100%,rgba(27,111,240,.25),transparent)}
        .w-bottom-cta-inner{max-width:560px;margin:0 auto;position:relative;z-index:1}
        .w-bottom-title{font-size:clamp(28px,4vw,40px);font-weight:800;color:#fff;letter-spacing:-1px;margin-bottom:12px;line-height:1.15}
        .w-bottom-title em{font-style:italic;color:#7EB6FF}
        .w-bottom-sub{font-size:16px;color:rgba(255,255,255,.6);margin-bottom:32px;line-height:1.6}
        .w-cta-white{display:inline-flex;align-items:center;gap:8px;padding:16px 32px;border-radius:100px;background:#fff;color:#0D0D0D;text-decoration:none;font-size:16px;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s}
        .w-cta-white:hover{background:#F7F7F7;transform:translateY(-2px)}
        .w-footer{padding:24px;text-align:center;border-top:1px solid #EFEFEF}
        .w-footer-text{font-size:13px;color:#9A9A9A}
        .w-footer-text a{color:#1B6FF0;text-decoration:none}
        .w-footer-text a:hover{text-decoration:underline}
      `}</style>

      <div className="w-page">
        {/* NAV — logo only */}
        <nav className="w-nav">
          <Link href="/" className="w-logo">
            <svg
              width="14"
              height="20"
              viewBox="0 0 902 1260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 756H618.841V465.934H248.906V285.499H902V0H0V756Z"
                fill="#1B6FF0"
              />
              <path d="M333 933H0L333 1260V933Z" fill="#1B6FF0" />
            </svg>
            foilcase
          </Link>
        </nav>

        {/* HERO */}
        <section
          style={{
            background: "#fff",
            padding: "64px 24px",
            borderBottom: "1px solid #EFEFEF",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              alignItems: "center",
            }}
          >
            {/* LEFT — content */}
            <div>
              <div className="w-eyebrow">
                <FontAwesomeIcon icon={faStar} />
                Welcome, collector
              </div>
              <h1
                className="w-title"
                style={{ textAlign: "left", fontSize: "clamp(32px,4vw,48px)" }}
              >
                Your collection
                <br />
                deserves a <em>proper home</em>
              </h1>
              <p
                className="w-sub"
                style={{
                  textAlign: "left",
                  marginLeft: 0,
                  marginBottom: "32px",
                }}
              >
                You just added a great card to your collection. Now track it,
                value it, and show it off — completely free with Foilcase.
              </p>
              <Link href="/collection" className="w-cta">
                <FontAwesomeIcon icon={faRocket} />
                Create your free vault
              </Link>
              <div className="w-free">
                No credit card required.
              </div>
            </div>

            {/* RIGHT — vault screenshot */}
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #EFEFEF",
                boxShadow: "0 8px 40px rgba(0,0,0,.10)",
                transform: "perspective(1000px) rotateY(-4deg)",
                transformOrigin: "right center",
              }}
            >
              <div
                style={{
                  background: "#E8E8E8",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  borderBottom: "1px solid #D8D8D8",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#FF5F57",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#FFBD2E",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#28C840",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    background: "#fff",
                    borderRadius: "4px",
                    padding: "3px 10px",
                    fontSize: "11px",
                    color: "#9A9A9A",
                    marginLeft: "8px",
                  }}
                >
                  foilcase.com/collection
                </div>
              </div>
              <img
                src="/images/vault-preview.png"
                alt="Foilcase vault"
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </div>
        </section>
        {/* FEATURES */}
        <section className="w-features">
          <div className="w-features-inner">
            <h2 className="w-features-title">
              Everything a collector <em>actually needs</em>
            </h2>
            <div className="w-grid">
              {[
                {
                  icon: faLayerGroup,
                  color: "#1B6FF0",
                  bg: "#EBF2FF",
                  title: "Track every card you own",
                  desc: "Add cards from any sport or TCG. Upload photos, track condition, grade, and organize into folders.",
                },
                {
                  icon: faChartLine,
                  color: "#00A861",
                  bg: "#E6F9F0",
                  title: "Know what your collection is worth",
                  desc: "Live eBay pricing shows you real sold comps and active listings for every card in your vault.",
                },
                {
                  icon: faShieldHalved,
                  color: "#7B4FCA",
                  bg: "#F2ECFB",
                  title: "Public or private — you choose",
                  desc: "Keep your vault private or share it with the collector community at your own personal vault URL.",
                },
                {
                  icon: faUsers,
                  color: "#E8820C",
                  bg: "#FEF3E2",
                  title: "Connect with collectors",
                  desc: "Follow other collectors, discover cards for trade, and search for specific players across all public vaults.",
                },
                {
                  icon: faMagnifyingGlass,
                  color: "#D93025",
                  bg: "#FDECEA",
                  title: "Search live eBay pricing",
                  desc: "Find any card with real sold comps and active listing prices — know what to pay before you buy.",
                },
                {
                  icon: faTag,
                  color: "#0097A7",
                  bg: "#E0F7FA",
                  title: "Mark cards for sale or trade",
                  desc: "List cards as For Sale or For Trade in your public vault so other collectors can find them.",
                },
              ].map((f) => (
                <div key={f.title} className="w-feature">
                  <div className="w-feature-icon" style={{ background: f.bg }}>
                    <FontAwesomeIcon
                      icon={f.icon}
                      style={{ color: f.color, fontSize: "18px" }}
                    />
                  </div>
                  <div className="w-feature-title">{f.title}</div>
                  <div className="w-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="w-proof">
          <div className="w-proof-inner">
            <h2 className="w-proof-title">Up and running in minutes</h2>
            <p className="w-proof-sub">
              No complicated setup. No credit card. Just your collection,
              finally organized.
            </p>
            <div className="w-steps">
              {[
                {
                  title: "Create your free account",
                  desc: "Sign up with your email or Google account in seconds.",
                },
                {
                  title: "Add the card you just bought",
                  desc: "Search for it by player, set, or year and add it to your vault in one click.",
                },
                {
                  title: "See what it's worth",
                  desc: "Live eBay pricing shows you real sold comps immediately.",
                },
                {
                  title: "Build your collection",
                  desc: "Add every card you own. Your vault grows with your collection.",
                },
              ].map((step, i) => (
                <div key={step.title} className="w-step">
                  <div className="w-step-num">{i + 1}</div>
                  <div>
                    <div className="w-step-title">{step.title}</div>
                    <div className="w-step-desc">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/collection" className="w-cta">
              <FontAwesomeIcon icon={faArrowRight} />
              Create your free vault
            </Link>
            <div className="w-free" style={{ marginTop: "12px" }}>
              Takes less than 2 minutes to get started
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="w-bottom-cta">
          <div className="w-bottom-cta-inner">
            <h2 className="w-bottom-title">
              Your collection
              <br />
              is waiting for a <em>home</em>
            </h2>
            <p className="w-bottom-sub">
              Join collectors already tracking their collections on foilcase.
              Free forever.
            </p>
            <Link href="/collection" className="w-cta-white">
              <FontAwesomeIcon icon={faRocket} />
              Create your free vault
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-footer">
          <p className="w-footer-text">
            © 2026 foilcase · <Link href="/privacy">Privacy Policy</Link> ·{" "}
            <Link href="/terms">Terms of Service</Link> ·{" "}
            <Link href="/">Visit foilcase.com</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
