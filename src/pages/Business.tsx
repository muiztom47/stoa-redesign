import React, { useState, useEffect, useRef } from "react";

/* ---------------------------------------------------------------
   Small inline icons
----------------------------------------------------------------*/
const ShieldCheck = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
const Landmark = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M3 21h18" />
    <path d="M4 21V10M20 21V10" />
    <path d="M2 10l10-6 10 6" />
    <path d="M9 21v-7M15 21v-7" />
  </svg>
);
const ArrowRight = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ChevronDown = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const Briefcase = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const Check = ({ size = 14, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);





const testimonials = [
  {
    title: "A total game-changer for your savings",
    name: "GDS",
    initials: "G",
    date: "Jul 29, 2026",
    body:
      "Stoa has completely changed how I think about my capital. Instead of watching cash sit in a traditional savings account earning minimal interest, or feeling pushed into the volatility of the stock market, Stoa lets you unlock the value of your capital upfront to cover things you're already planning to spend on. The onboarding was smooth, the platform is entirely transparent, and getting meaningful value from day one makes the whole concept a complete no-brainer.",
    perk: "Multi-pot",
  },
  {
    title: "Simple & Straightforward!",
    name: "David B",
    initials: "DB",
    date: "Jul 26, 2026",
    body:
      "I took out an Amazon gift card which was delivered as soon as I deposited and I was able to redeem it immediately. I look forward to using this again!",
    perk: "Amazon",
  },
  {
    title: "Super easy to deposit and received my perk right away",
    name: "Laura",
    initials: "L",
    date: "Jul 29, 2026",
    body:
      "Super easy to deposit and received my perk right away! I chose a Waitrose gift card, which was easy to claim and use. Emails, online portal etc. very professional. Fantastic value for money, would definitely recommend.",
    perk: "Waitrose",
  },
  {
    title: "A clear win for higher-rate taxpayers",
    name: "Stoa Customer",
    initials: "SC",
    date: "Jul 26, 2026",
    body:
      "I realised that when paying for a service I needed anyway, it was more cost-effective as a higher-rate taxpayer to lock my capital away for a year in a Stoa Pot and forgo the credit interest, because after tax, that interest would be significantly less than the cost of an equivalent annual subscription.",
    perk: "Multi-pot",
  },
];



/* ---------------------------------------------------------------
   Design tokens — same system as Personal
----------------------------------------------------------------*/
const C = {
  ink: "#121216",
  ink2: "#1F1F26",
  paper: "#FFFFFF",
  paper2: "#F5F4F8",
  slate: "#5B6472",
  brand: "#3B28CC",
  brandDark: "#2F20A3",
  brandTint: "#EFEBFC",
  brass: "#3B28CC",
  brassLight: "#8C7EF0",
  hair: "#E4E2E8",

  // Light certificate tokens
  certBg: "#FFFFFF",
  certInk: "#121216",
  certMuted: "#6B7280",
  certFaint: "#9CA3AF",
  certRule: "#E4E2E8",
  certEdge: "rgba(59,40,204,0.35)",
  certInner: "rgba(59,40,204,0.12)",
  certSeal: "rgba(59,40,204,0.18)",

  // Dark plate — trust section
  plateBg: "#121A21",
  plateBg2: "#1B242C",
  plateRule: "rgba(255,255,255,0.08)",
  plateRuleStrong: "rgba(255,255,255,0.14)",
  plateInk: "#FFFFFF",
  plateMuted: "rgba(255,255,255,0.60)",
  plateFaint: "rgba(255,255,255,0.38)",
  plateAccent: "#FFFFFF",
  plateAccentDim: "rgba(255,255,255,0.06)",
};

/* ---------------------------------------------------------------
   Business data
----------------------------------------------------------------*/
const LOGO_DEV_KEY = "pk_KnI5jJk1QmKibGPEWPdFjw";

const businessPots = [
  { brand: "Notion Plus", plan: "Annual", perk: 114.99, deposit: 2500, category: "Productivity", domain: "notion.so", bg: "#000000", fg: "#FFFFFF", mono: "N" },
  { brand: "Claude Pro", plan: "1 year", perk: 180, deposit: 3500, category: "AI Tools", domain: "claude.ai", bg: "#D97757", fg: "#FFFFFF", mono: "C" },
  { brand: "Amazon", plan: "Business credit", perk: 50, deposit: 1000, category: "Shopping", domain: "amazon.com", bg: "#131921", fg: "#FF9900", mono: "a" },
  { brand: "Canva Pro", plan: "Annual", perk: 100, deposit: 2000, category: "Design", domain: "canva.com", bg: "#00C4CC", fg: "#FFFFFF", mono: "C" },
  { brand: "Norton 360", plan: "12 months, Deluxe", perk: 74.99, deposit: 1500, category: "Digital Security", domain: "norton.com", bg: "#FFE01B", fg: "#000000", mono: "N" },
  { brand: "ChatGPT Plus", plan: "Monthly", perk: 227.88, deposit: 4500, category: "AI Tools", domain: "openai.com", bg: "#10A37F", fg: "#FFFFFF", mono: "AI" },
  { brand: "NordVPN Basic", plan: "1-year plan", perk: 42.99, deposit: 1000, category: "Digital Security", domain: "nordvpn.com", bg: "#4687FF", fg: "#FFFFFF", mono: "NV" },
  { brand: "Apple", plan: "Gift card, up to £50,000", perk: 50, deposit: 1000, category: "Equipment", domain: "apple.com", bg: "#000000", fg: "#FFFFFF", mono: "A" },
];

const partners = ["Griffin", "Visa", "Plaid", "Experian", "AWS", "Microsoft Azure"];




const businessFaqs = [
  {
    tag: "Eligibility",
    q: "Who is the Business page for?",
    a: "UK-registered limited companies, LLPs, and sole traders with surplus operating cash. If you file accounts or pay corporation tax, you’re likely eligible. Sole traders can apply with their UTR and ID.",
  },
  {
    tag: "Structure",
    q: "Does the deposit sit with my business or with me?",
    a: "With your business. The account is created in your company’s name at Griffin Bank. Eligible deposits are covered by the FSCS up to £120,000 per depositor, the same statutory protection as a standard business savings account, subject to standard FSCS eligibility rules for businesses.",
  },
  {
    tag: "Accounting",
    q: "How is the perk treated for accounting and tax?",
    a: "Treatment depends on your business’s specific structure, so this isn’t something we can state generally, speak with your accountant before you deposit. We can share deposit and Pot documentation for your records, but we don’t provide tax advice.",
  },
  {
    tag: "Cash flow",
    q: "Can I access the deposit during the term?",
    a: "Not on demand. Pots are fixed-term for twelve months by design, that’s what allows the yield to be paid upfront instead of accrued. In genuinely exceptional circumstances, Stoa may grant an early withdrawal at its discretion, though the perk value is typically deducted first. Only deposit cash your business can commit for the full term.",
  },
  {
    tag: "Multi-pot",
    q: "Can we fund more than one Pot at once?",
    a: "Yes. You can fund as many Pots as your cash position allows, including more than one Pot for the same perk. Your total deposit equals the sum required for each chosen Pot, and each carries its own twelve-month term and reward.",
  },
  {
    tag: "Operations",
    q: "Can multiple people on the finance team manage this?",
    a: "Speak with the team to confirm current account access options for your business, this varies by setup and isn’t something we can state as standard here.",
  },
];




const INSTITUTIONAL_RATE = 0.0305;
const MERCHANT_RATE = 0.0201;

const gbp = (n) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });

/* ---------------------------------------------------------------
   Brand badge
----------------------------------------------------------------*/
function BrandBadge({ pot, size = 42 }) {
  const [failed, setFailed] = useState(false);
  const hasKey = LOGO_DEV_KEY && LOGO_DEV_KEY !== "YOUR_LOGO_DEV_KEY";
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        boxShadow: "inset 0 0 0 1px rgba(18,18,22,0.08)",
      }}
    >
      {hasKey && !failed ? (
        <img
          src={`https://img.logo.dev/${pot.domain}?token=${LOGO_DEV_KEY}&format=png&size=200`}
          alt={pot.brand}
          onError={() => setFailed(true)}
          style={{ width: size * 0.62, height: size * 0.62, objectFit: "contain" }}
        />
      ) : (
        <span
          className="font-sans"
          style={{ color: pot.fg, fontSize: size * 0.36, fontWeight: 700, letterSpacing: "0.04em" }}
        >
          {pot.mono.toUpperCase()}
        </span>
      )}
    </div>
  );
}







function TestimonialRotator({ items }) {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = items.length;

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((k) => (k + 1) % n), 6000);
    return () => clearInterval(id);
  }, [paused, n]);

  const go = (dir) => setI((k) => (k + dir + n) % n);
  const idxOf = (offset) => (i + offset + n) % n;

  const Card = ({ item, role }) => {
    const isCenter = role === "center";
    return (
      <div
        onClick={() => !isCenter && go(role === "left" ? -1 : 1)}
        className="shrink-0 transition-all duration-500 ease-out"
        style={{
          width: isCenter ? "min(640px, 62vw)" : "min(420px, 40vw)",
          opacity: isCenter ? 1 : 0.38,
          transform: isCenter ? "scale(1)" : "scale(0.92)",
          cursor: isCenter ? "default" : "pointer",
          pointerEvents: "auto",
        }}
      >
        <div
          className="relative h-full"
          style={{
            backgroundColor: C.certBg,
            border: `1px solid ${isCenter ? C.certEdge : C.hair}`,
            borderRadius: 10,
            boxShadow: isCenter
              ? "0 40px 80px -50px rgba(18,18,22,0.3)"
              : "none",
            padding: isCenter ? "44px 40px" : "32px 28px",
          }}
        >
          <p
            className="font-serif italic"
            style={{ color: C.brandTint, fontSize: isCenter ? 56 : 40, lineHeight: 0.6 }}
          >
            “
          </p>
          <p
            className="font-sans mt-2 leading-relaxed"
            style={{ color: C.ink, fontSize: isCenter ? 16 : 14 }}
          >
            {item.body}
          </p>
          <p className="font-serif italic mt-6" style={{ color: C.brandTint, fontSize: isCenter ? 40 : 30, lineHeight: 0.6 }}>
            ”
          </p>

          <div
            className="mt-6 pt-6"
            style={{ borderTop: `1px solid ${C.certRule}` }}
          >
            <p className="font-sans text-sm font-medium" style={{ color: C.ink }}>
              {item.name}
            </p>
            <p className="font-sans text-xs mt-0.5" style={{ color: C.certMuted }}>
              {item.perk}
            </p>
          </div>

          {isCenter && (
            <ArrowRight
              size={16}
              style={{
                position: "absolute",
                bottom: 32,
                right: 32,
                color: C.brand,
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex items-center justify-center gap-6"
      style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
    >
      <button
        onClick={() => go(-1)}
        aria-label="Previous testimonial"
        className="hidden md:flex items-center justify-center absolute"
        style={{
          left: "8%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 44,
          height: 44,
          borderRadius: 999,
          border: `1px solid ${C.certEdge}`,
          backgroundColor: C.paper,
          color: C.brand,
          zIndex: 20,
          boxShadow: "0 10px 30px -12px rgba(18,18,22,0.25)",
        }}
      >
        <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} />
      </button>

      <Card item={items[idxOf(-1)]} role="left" />
      <Card item={items[idxOf(0)]} role="center" />
      <Card item={items[idxOf(1)]} role="right" />

      <button
        onClick={() => go(1)}
        aria-label="Next testimonial"
        className="hidden md:flex items-center justify-center absolute"
        style={{
          right: "8%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 44,
          height: 44,
          borderRadius: 999,
          border: `1px solid ${C.certEdge}`,
          backgroundColor: C.paper,
          color: C.brand,
          zIndex: 20,
          boxShadow: "0 10px 30px -12px rgba(18,18,22,0.25)",
        }}
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------
   Page
----------------------------------------------------------------*/
export default function Business() {
  const [deposit, setDeposit] = useState(10000);
  const [openFaq, setOpenFaq] = useState(0);
  const [category, setCategory] = useState("All");
  const [cycleIndex, setCycleIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const heroCycle = [businessPots[1], businessPots[5], businessPots[0], businessPots[4]];

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setCycleIndex((i) => (i + 1) % heroCycle.length), 3400);
    return () => clearInterval(id);
  }, []);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 8, y: (px - 0.5) * 8 });
  };
  const handleLeave = () => setTilt({ x: 0, y: 0 });

  const institutional = deposit * INSTITUTIONAL_RATE;
  const merchant = deposit * MERCHANT_RATE;
  const totalPerk = institutional + merchant;
  const effectiveRate = totalPerk / deposit;
  const bankShare = institutional / totalPerk;
  const merchantShare = merchant / totalPerk;
  const annualisedPct = (effectiveRate * 100).toFixed(2);
  const sliderProgress = ((deposit - 2500) / (120000 - 2500)) * 100;
  const monthlyEquivalent = totalPerk / 12;
  const vsSavings = totalPerk - deposit * 0.045;
  const eligibleCount = businessPots.filter((p) => p.deposit <= deposit).length;

  const categories = ["All", ...Array.from(new Set(businessPots.map((p) => p.category)))];
  const filtered = category === "All" ? businessPots : businessPots.filter((p) => p.category === category);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const active = heroCycle[cycleIndex];

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.paper, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        @keyframes certFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .cert-fade { animation: certFade 0.7s ease; }
        @media (prefers-reduced-motion: reduce) { .cert-fade { animation: none; } }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-24 lg:pt-12 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — editorial copy */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={14} style={{ color: C.brand }} />
              <span
                className="font-sans text-xs font-semibold"
                style={{ color: C.brand, letterSpacing: "0.18em" }}
              >
                FOR BUSINESS
              </span>
            </div>

            <h1
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 60, letterSpacing: "-0.02em", lineHeight: 1.05 }}
            >
     Turn surplus cash into prepaid business expenses.
            </h1>

            <p
              className="font-sans mt-7 max-w-lg leading-relaxed"
              style={{ color: C.slate, fontSize: "16px" }}
            >
            Allocate surplus corporate cash to a 12-month fixed-term Business Pot. Stoa uses the yield to cover software, enterprise AI and services your company already pays for, settled in full on day one. Your principal returns at maturity, untouched.
            </p>

            <div className="flex items-center gap-8 mt-10 mb-10">
              <div>
                <p className="font-serif text-2xl tabular-nums">£120,000</p>
                <p className="font-sans text-xs mt-1" style={{ color: C.slate }}>
                  FSCS protection per depositor
                </p>
              </div>
              <div style={{ width: 1, height: 40, backgroundColor: C.hair }} />
              <div>
                <p className="font-serif text-2xl tabular-nums">12 months</p>
                <p className="font-sans text-xs mt-1" style={{ color: C.slate }}>
                  Fixed term, full principal returned
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 font-sans">
              <a
                href="https://app.stoa.money/business/available-pots"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 text-sm font-medium transition-colors inline-block text-center"
                style={{
                  backgroundColor: C.brand,
                  color: C.paper,
                  borderRadius: 4,
                  boxShadow: "0 10px 30px -12px rgba(59,40,204,0.6)",
                }}
              >
                Open a Business Pot
              </a>
              <a
                href="https://www.stoa.money/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                style={{
                  border: `1px solid ${C.brand}`,
                  color: C.brand,
                  borderRadius: 4,
                  backgroundColor: "transparent",
                }}
              >
                Speak to the team <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* RIGHT — the business certificate */}
          <div
            className="flex justify-center lg:justify-end"
            style={{ perspective: 1400, marginTop: -40 }}
          >
            <div
              ref={cardRef}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              className="w-full max-w-[420px] relative"
              style={{
                backgroundColor: C.certBg,
                borderRadius: 8,
                padding: 14,
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 300ms ease-out",
                boxShadow:
                  "0 40px 80px -30px rgba(18,18,22,0.18), 0 0 0 1px rgba(18,18,22,0.06)",
              }}
            >
              {/* outer hairline */}
              <div
                className="relative"
                style={{
                  border: `1px solid ${C.certEdge}`,
                  borderRadius: 4,
                  padding: 22,
                }}
              >
                {/* corner ticks */}
                {[
                  { top: -1, left: -1, borderTop: `2px solid ${C.brand}`, borderLeft: `2px solid ${C.brand}` },
                  { top: -1, right: -1, borderTop: `2px solid ${C.brand}`, borderRight: `2px solid ${C.brand}` },
                  { bottom: -1, left: -1, borderBottom: `2px solid ${C.brand}`, borderLeft: `2px solid ${C.brand}` },
                  { bottom: -1, right: -1, borderBottom: `2px solid ${C.brand}`, borderRight: `2px solid ${C.brand}` },
                ].map((s, i) => (
                  <span key={i} style={{ position: "absolute", width: 14, height: 14, ...s }} />
                ))}

                {/* inner ruled border */}
                <div
                  style={{
                    border: `1px solid ${C.certInner}`,
                    borderRadius: 2,
                    padding: "26px 24px 22px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* watermark seal */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      right: -40,
                      bottom: -40,
                      width: 180,
                      height: 180,
                      borderRadius: "50%",
                      border: `1px solid ${C.certSeal}`,
                      opacity: 0.7,
                    }}
                  />
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      right: -14,
                      bottom: -14,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      border: `1px dashed ${C.certSeal}`,
                      opacity: 0.8,
                    }}
                  />

                  {/* masthead */}
                  <div className="flex items-start justify-between font-sans relative z-10">
                    <div>
                      <p
                        className="font-serif italic text-xl"
                        style={{ color: C.certInk, letterSpacing: "0.01em" }}
                      >
                        Stoa
                      </p>
                      <p
                        className="text-[10px] mt-1"
                        style={{ color: C.certFaint, letterSpacing: "0.22em" }}
                      >
                        BUSINESS POT CONFIRMATION
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-[10px]"
                        style={{ color: C.certFaint, letterSpacing: "0.18em" }}
                      >
                        POT REF
                      </p>
                      <p
                        className="text-xs tabular-nums mt-1"
                        style={{
                          color: C.brand,
                          fontFamily: "ui-monospace, SFMono-Regular, monospace",
                        }}
                      >
                        ST-B-{String(1000 + cycleIndex).padStart(4, "0")}-GB
                      </p>
                    </div>
                  </div>

                  {/* rule */}
                  <div
                    className="mt-5 mb-6 relative z-10"
                    style={{
                      height: 1,
                      background: `linear-gradient(90deg, ${C.certEdge}, transparent 80%)`,
                    }}
                  />

                  {/* the figure */}
                  <div key={cycleIndex} className="cert-fade relative z-10">
                    <p
                      className="font-sans text-[11px]"
                      style={{ color: C.certMuted, letterSpacing: "0.06em" }}
                    >
                      OPERATING VALUE
                    </p>
                    <p
                      className="font-serif tabular-nums mt-2"
                      style={{
                        color: C.certInk,
                        fontSize: 54,
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {gbp(active.perk)}
                    </p>

                    <div className="flex items-center gap-3 mt-5">
                      <BrandBadge pot={active} size={36} />
                      <div>
                        <p className="font-serif text-base" style={{ color: C.certInk }}>
                          {active.brand}
                        </p>
                        <p className="font-sans text-xs" style={{ color: C.certMuted }}>
                          {active.plan}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* rule */}
                  <div
                    className="mt-7 mb-5 relative z-10"
                    style={{ height: 1, backgroundColor: C.certRule }}
                  />

                  {/* ledger line */}
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div>
                      <p
                        className="font-sans text-[10px]"
                        style={{ color: C.certFaint, letterSpacing: "0.14em" }}
                      >
                        DEPOSIT
                      </p>
                      <p
                        className="font-sans text-sm mt-1 tabular-nums"
                        style={{ color: C.certInk }}
                      >
                        {gbp(active.deposit)}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-sans text-[10px]"
                        style={{ color: C.certFaint, letterSpacing: "0.14em" }}
                      >
                        TERM
                      </p>
                      <p className="font-sans text-sm mt-1" style={{ color: C.certInk }}>
                        Fixed · 12 months
                      </p>
                    </div>
                  </div>

                  {/* signature line */}
                  <div className="mt-7 flex items-end justify-between relative z-10">
                    <div style={{ flex: 1, marginRight: 16 }}>
                      <div
                        style={{
                          borderBottom: `1px solid ${C.certEdge}`,
                          height: 18,
                          marginBottom: 6,
                        }}
                      >
                        <span
                          className="font-serif italic text-sm"
                          style={{ color: C.brand, position: "relative", top: 2 }}
                        >
                          Griffin Bank
                        </span>
                      </div>
                      <p
                        className="font-sans text-[9px]"
                        style={{ color: C.certFaint, letterSpacing: "0.12em" }}
                      >
                        CUSTODIAN
                      </p>
                    </div>
                    <ShieldCheck size={18} style={{ color: C.brand, flexShrink: 0 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  

      {/* ---------------- CALCULATOR ---------------- */}
      <section
        id="calculator"
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <div className="max-w-3xl mb-16">
            <p
              className="font-sans text-xs mb-5"
              style={{ color: C.brand, letterSpacing: "0.18em" }}
            >
      HOW IT WORKS
            </p>
            <h2
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 48, letterSpacing: "-0.015em" }}
            >
A dual-funded engine designed for smarter yield.
            </h2>
            <p className="font-sans text-lg mt-6 leading-relaxed" style={{ color: C.slate }}>
       Every Business Pot combines two fixed sources of return: interest from Griffin Bank and a contribution from a merchant partner. Together, they create value you can use upfront, while your principal remains intact until maturity.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-14 items-start">
            {/* LEFT */}
            <div>
              <div
                className="relative p-8"
                style={{
                  backgroundColor: C.paper,
                  border: `1px solid ${C.certEdge}`,
                  borderRadius: 8,
                  boxShadow: "0 20px 40px -30px rgba(18,18,22,0.15)",
                }}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <label
                    className="font-sans text-xs"
                    style={{ color: C.certFaint, letterSpacing: "0.16em" }}
                  >
                    DEPOSIT AMOUNT
                  </label>
                  <span
                    className="font-sans text-[11px] tabular-nums"
                    style={{ color: C.certFaint }}
                  >
                    {eligibleCount} of {businessPots.length} Pots open
                  </span>
                </div>

                <p
                  className="font-serif tabular-nums mb-8"
                  style={{ color: C.ink, fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {gbp(deposit)}
                </p>

                <div
                  className="font-sans text-[11px] mb-3 flex items-center gap-1.5"
                  style={{ color: C.certFaint, letterSpacing: "0.06em" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
                  </svg>
                  DRAG TO ADJUST
                </div>

                <div className="relative" style={{ height: 24 }}>
                  <div
                    style={{
                      position: "absolute",
                      top: 11,
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: C.hair,
                      borderRadius: 999,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 11,
                      left: 0,
                      width: `${sliderProgress}%`,
                      height: 2,
                      backgroundColor: C.brand,
                      borderRadius: 999,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 3,
                      left: `calc(${sliderProgress}% - 9px)`,
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      backgroundColor: C.paper,
                      border: `2px solid ${C.brand}`,
                      boxShadow: "0 1px 3px rgba(18,18,22,0.18)",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="range"
                    min={2500}
                    max={120000}
                    step={500}
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    aria-label="Deposit amount"
                    className="absolute inset-0 w-full"
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      background: "transparent",
                      cursor: "pointer",
                      opacity: 0,
                      height: 24,
                    }}
                  />
                </div>

                <div
                  className="flex justify-between font-sans text-xs mt-2 tabular-nums"
                  style={{ color: C.certFaint }}
                >
                  <span>£2,500</span>
                  <span>£120,000</span>
                </div>
              </div>

              <div
                className="mt-6 p-6"
                style={{
                  backgroundColor: C.brandTint,
                  borderRadius: 8,
                  border: `1px solid ${C.certInner}`,
                }}
              >
                <p className="font-sans text-sm leading-relaxed" style={{ color: C.ink }}>
                  A standard business savings account paying 4.5% would earn less on this
                  balance.{" "}
                  <span className="font-serif tabular-nums" style={{ color: C.brand, fontSize: 18 }}>
                    Stoa unlocks {gbp(vsSavings)} more in operating value.
                  </span>
                </p>
              </div>

              <div
                className="mt-4 p-6"
                style={{
                  backgroundColor: C.paper,
                  border: `1px solid ${C.hair}`,
                  borderRadius: 8,
                }}
              >
                   <p className="font-sans text-sm leading-relaxed" style={{ color: C.ink }}>
                  Your full operating value lands as one payment, on day one. If you prefer
                  thinking in monthly terms, that’s about{" "}
                  <span className="font-serif tabular-nums" style={{ color: C.ink, fontSize: 18 }}>
                    {gbp(monthlyEquivalent)} a month
                  </span>
                  .
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  ["Effective yield", `${annualisedPct}%`],
                  ["Term", "12 mo"],
                  ["Principal returned", "100%"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="p-4"
                    style={{ border: `1px solid ${C.hair}`, borderRadius: 6, backgroundColor: C.paper }}
                  >
                    <p
                      className="font-sans text-[10px] mb-2"
                      style={{ color: C.certFaint, letterSpacing: "0.12em" }}
                    >
                      {label.toUpperCase()}
                    </p>
                    <p
                      className="font-serif tabular-nums"
                      style={{ color: C.ink, fontSize: 22, lineHeight: 1 }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — ledger */}
            <div
              className="relative overflow-hidden"
              style={{
                backgroundColor: C.paper,
                border: `1px solid ${C.certEdge}`,
                borderRadius: 8,
                boxShadow: "0 30px 60px -40px rgba(18,18,22,0.25)",
              }}
            >
              <div
                className="px-8 py-5 flex items-center justify-between"
                style={{ borderBottom: `1px solid ${C.certRule}` }}
              >
                <span
                  className="font-sans text-xs"
                  style={{ color: C.certFaint, letterSpacing: "0.18em" }}
                >
                  ESTIMATED OPERATING VALUE
                </span>
                <span
                  className="font-sans text-[10px] tabular-nums px-2 py-1"
                  style={{
                    color: C.brand,
                    border: `1px solid ${C.certEdge}`,
                    borderRadius: 4,
                    letterSpacing: "0.1em",
                  }}
                >
                  GBP · 12M
                </span>
              </div>

              <div className="px-8 pt-8">
                <div className="flex items-center justify-between mb-3">
                  <p
                    className="font-sans text-[11px]"
                    style={{ color: C.certMuted, letterSpacing: "0.06em" }}
                  >
                    FUNDING MIX
                  </p>
                  <div className="flex items-center gap-4 font-sans text-[11px]">
                    <span className="flex items-center gap-2" style={{ color: C.certMuted }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 2,
                          backgroundColor: C.brand,
                          display: "inline-block",
                        }}
                      />
                      Bank {Math.round(bankShare * 100)}%
                    </span>
                    <span className="flex items-center gap-2" style={{ color: C.certMuted }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 2,
                          backgroundColor: C.brandTint,
                          border: `1px solid ${C.brand}`,
                          display: "inline-block",
                        }}
                      />
                      Merchant {Math.round(merchantShare * 100)}%
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: 10,
                    borderRadius: 999,
                    overflow: "hidden",
                    backgroundColor: C.paper2,
                  }}
                >
                  <div
                    style={{
                      width: `${bankShare * 100}%`,
                      backgroundColor: C.brand,
                      transition: "width 200ms ease",
                    }}
                  />
                  <div
                    style={{
                      width: `${merchantShare * 100}%`,
                      backgroundColor: C.brandTint,
                      borderLeft: `1px solid ${C.brand}`,
                      transition: "width 200ms ease",
                    }}
                  />
                </div>
              </div>

              <div className="px-8 pt-6 pb-8">
                {[
                  ["Your deposit", "Principal, returned at term", deposit, true],
                  ["Griffin Bank interest", `at ${(INSTITUTIONAL_RATE * 100).toFixed(2)}% p.a.`, institutional, false],
                  ["Merchant contribution", `at ${(MERCHANT_RATE * 100).toFixed(2)}% p.a.`, merchant, false],
                ].map(([label, sub, val, isPrincipal], i) => (
                  <div
                    key={label}
                    className="flex items-start justify-between py-5"
                    style={{ borderBottom: i < 2 ? `1px solid ${C.certRule}` : "none" }}
                  >
                    <div>
                      <p className="font-sans text-sm font-medium" style={{ color: C.certInk }}>
                        {label}
                      </p>
                      <p className="font-sans text-xs mt-1" style={{ color: C.certFaint }}>
                        {sub}
                      </p>
                    </div>
                    <p
                      className="font-sans tabular-nums text-base pt-0.5"
                      style={{ color: isPrincipal ? C.certMuted : C.certInk }}
                    >
                      {isPrincipal ? "" : "+"}
                      {gbp(val)}
                    </p>
                  </div>
                ))}

                <div
                  className="mt-6 pt-6 flex items-end justify-between"
                  style={{ borderTop: `2px solid ${C.ink}` }}
                >
                  <div>
                    <p
                      className="font-sans text-[11px] mb-1"
                      style={{ color: C.certFaint, letterSpacing: "0.14em" }}
                    >
                      OPERATING VALUE UNLOCKED
                    </p>
                    <p className="font-sans text-xs" style={{ color: C.certMuted }}>
                      Available on day one, not accrued
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="font-serif tabular-nums"
                      style={{ color: C.brand, fontSize: 44, lineHeight: 1, letterSpacing: "-0.02em" }}
                    >
                      {gbp(totalPerk)}
                    </p>
                    <p
                      className="font-sans text-[11px] mt-2 tabular-nums"
                      style={{ color: C.certFaint }}
                    >
                      = {annualisedPct}% effective yield
                    </p>
                  </div>
                </div>

                <p
                  className="font-sans text-[10px] mt-6 leading-relaxed"
                  style={{ color: "#011522", opacity: 0.7 }}
                >
               Figures are illustrative. Rates are fixed when you deposit, while your principal is held with Griffin Bank and protected by FSCS up to £120,000 per depositor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CATALOGUE ---------------- */}
      <section
        id="pots"
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <div className="max-w-2xl mb-10">
            <p
              className="font-sans text-xs mb-5"
              style={{ color: C.brand, letterSpacing: "0.18em" }}
            >
              THE CATALOGUE
            </p>
            <h2
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 44, letterSpacing: "-0.015em" }}
            >
Choose where your yield goes.
            </h2>
            <p className="font-sans mt-5 leading-relaxed" style={{ color: C.slate }}>
Turn part of your annual return into costs your business would otherwise pay from operating cash. Pick a Pot below, and have the value settled upfront.
</p>
          </div>

          <div
            className="font-sans text-sm mb-12 pb-5 flex items-center gap-x-7 overflow-x-auto whitespace-nowrap"
            style={{ borderBottom: `1px solid ${C.hair}` }}
          >
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="pb-1 transition-colors shrink-0"
                style={{
                  color: category === c ? C.ink : C.slate,
                  borderBottom: category === c ? `1px solid ${C.brand}` : "1px solid transparent",
                  fontWeight: category === c ? 600 : 500,
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((pot) => {
              const multiple = pot.perk / pot.deposit;
              const isHot = multiple >= 0.045;
              return (
                <article
                  key={pot.brand}
                  className="group relative flex flex-col transition-all duration-300"
                  style={{
                    backgroundColor: C.paper,
                    border: `1px solid ${C.hair}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    boxShadow: "0 1px 0 rgba(18,18,22,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 30px 50px -30px rgba(18,18,22,0.28), 0 0 0 1px rgba(59,40,204,0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 0 rgba(18,18,22,0.02)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      background: `linear-gradient(90deg, ${pot.bg} 0%, ${pot.bg} 60%, ${pot.fg} 60%, ${pot.fg} 100%)`,
                      opacity: 0.9,
                    }}
                  />

                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-6">
                      <BrandBadge pot={pot} size={42} />
                      <span
                        className="font-sans text-[10px] px-2 py-1"
                        style={{
                          color: C.certMuted,
                          border: `1px solid ${C.hair}`,
                          borderRadius: 4,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {pot.category}
                      </span>
                    </div>

                    <h3
                      className="font-serif"
                      style={{ color: C.ink, fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.005em" }}
                    >
                      {pot.brand}
                    </h3>
                    <p className="font-sans text-xs mt-1.5" style={{ color: C.certMuted }}>
                      {pot.plan}
                    </p>

                    <div className="mt-7">
                      <p
                        className="font-sans text-[10px] mb-1.5"
                        style={{ color: C.certFaint, letterSpacing: "0.16em" }}
                      >
                        PERK VALUE
                      </p>
                      <p
                        className="font-serif tabular-nums"
                        style={{ color: C.ink, fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em" }}
                      >
                        {gbp(pot.perk)}
                      </p>
                      <p
                        className="font-sans text-[11px] mt-2 tabular-nums"
                        style={{ color: C.brand }}
                      >
                        {(multiple * 100).toFixed(2)}% effective yield
                      </p>
                    </div>

                    <div className="my-6" style={{ height: 1, backgroundColor: C.hair }} />

                    <div className="flex items-baseline justify-between">
                      <span className="font-sans text-xs" style={{ color: C.certMuted }}>
                        Deposit
                      </span>
                      <span className="font-sans tabular-nums text-sm" style={{ color: C.ink }}>
                        {gbp(pot.deposit)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="font-sans text-xs" style={{ color: C.certMuted }}>
                        Term
                      </span>
                      <span className="font-sans text-sm" style={{ color: C.ink }}>
                        Fixed · 12 months
                      </span>
                    </div>

                    {isHot && (
                      <div
                        className="mt-4 inline-flex items-center gap-2 self-start px-2.5 py-1"
                        style={{
                          backgroundColor: C.brandTint,
                          borderRadius: 4,
                          border: `1px solid ${C.certInner}`,
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: 999,
                            backgroundColor: C.brand,
                            display: "inline-block",
                          }}
                        />
                        <span
                          className="font-sans text-[10px]"
                          style={{ color: C.brand, letterSpacing: "0.1em" }}
                        >
                          TOP-YIELDING
                        </span>
                      </div>
                    )}

                    <div className="flex-1" />

                    <button
                      className="w-full mt-7 py-3 text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: "transparent",
                        border: `1px solid ${C.ink}`,
                        borderRadius: 6,
                        color: C.ink,
                        letterSpacing: "0.04em",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = C.brand;
                        e.currentTarget.style.borderColor = C.brand;
                        e.currentTarget.style.color = C.paper;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = C.ink;
                        e.currentTarget.style.color = C.ink;
                      }}
                    >
                      Unlock this Pot
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex justify-center mt-14">
            <a
              href="https://app.stoa.money/business/available-pots"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-medium px-10 py-3.5 transition-colors inline-block text-center"
              style={{
                backgroundColor: C.brand,
                color: C.paper,
                borderRadius: 6,
                letterSpacing: "0.02em",
                boxShadow: "0 10px 30px -12px rgba(59,40,204,0.5)",
              }}
            >
              Explore all
            </a>
          </div>

    
        </div>
      </section>

      {/* ---------------- TRUST PLATE ---------------- */}
      <section
        id="trust"
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, #131820 0%, #0F1319 45%, #0D1116 100%)`,
          color: C.plateInk,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -240,
            right: -240,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(185,174,255,0.14) 0%, rgba(185,174,255,0) 60%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-28">
          <div
            className="flex items-center justify-between mb-20 pb-5"
            style={{ borderBottom: `1px solid ${C.plateRule}` }}
          >
            <span
              className="font-sans text-[11px]"
              style={{ color: C.plateFaint, letterSpacing: "0.22em" }}
            >
              TRUST &amp; CUSTODY
            </span>
            <span
              className="font-sans text-[11px] hidden sm:inline"
              style={{ color: C.plateFaint, letterSpacing: "0.22em" }}
            >
              STOA · LONDON
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">
            <div>
              <Landmark size={26} style={{ color: C.plateAccent }} />
              <h2
                className="font-serif mt-6"
                style={{
                  color: C.plateInk,
                  fontSize: 42,
                  lineHeight: 1.05,
                  letterSpacing: "-0.015em",
                }}
              >
Your business cash,
                <br />
                <span style={{ fontStyle: "italic", color: C.plateAccent }}>
 held with a regulated bank.
                </span>
              </h2>

              <p
                className="font-sans mt-7 leading-relaxed max-w-lg"
                style={{ color: C.plateMuted, fontSize: 15 }}
              >
             Corporate deposits through Stoa are held with Griffin Bank, a UK-authorised bank regulated by the PRA and FCA. Eligible deposits benefit from FSCS protection up to £120,000 per depositor.
              </p>

              <div
                className="mt-10 p-6 flex items-start gap-4"
                style={{
                  backgroundColor: C.plateAccentDim,
                  border: `1px solid ${C.plateRuleStrong}`,
                  borderRadius: 10,
                }}
              >
                <ShieldCheck
                  size={22}
                  style={{ color: C.plateAccent, marginTop: 2, flexShrink: 0 }}
                />
                <div>
                  <p
                    className="font-sans text-xs mb-1.5"
                    style={{ color: C.plateAccent, letterSpacing: "0.14em" }}
                  >
                    FSCS PROTECTED
                  </p>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: C.plateMuted }}>
                    Eligible deposits are covered up to{" "}
                    <span style={{ color: C.plateInk, fontWeight: 600 }}>£120,000</span> per
                    depositor, the same protection as a standard UK business savings account.
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  ["Segregated", "Client funds held separately"],
                  ["Regulated", "FCA-authorised partners"],
                  ["Audited", "Annual external review"],
                ].map(([label, sub]) => (
                  <div
                    key={label}
                    className="pt-5"
                    style={{ borderTop: `1px solid ${C.plateRule}` }}
                  >
                    <p className="font-sans text-sm" style={{ color: C.plateInk, fontWeight: 600 }}>
                      {label}
                    </p>
                    <p className="font-sans text-xs mt-1.5" style={{ color: C.plateFaint }}>
                      {sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pt-2">
              <div className="flex items-baseline justify-between mb-8">
                <p
                  className="font-sans text-[11px]"
                  style={{ color: C.plateFaint, letterSpacing: "0.22em" }}
                >
                  INFRASTRUCTURE &amp; BANKING PARTNERS
                </p>
                <span
                  className="font-sans text-[11px] tabular-nums"
                  style={{ color: C.plateFaint }}
                >
                  06
                </span>
              </div>

              <div
                className="grid grid-cols-2 sm:grid-cols-3 gap-px"
                style={{ backgroundColor: C.plateRule }}
              >
                {partners.map((p) => (
                  <div
                    key={p}
                    className="group relative flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: C.plateBg,
                      minHeight: 110,
                      padding: "28px 16px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = C.plateBg2;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = C.plateBg;
                    }}
                  >
                    <span
                      className="font-serif text-center"
                      style={{ color: C.plateInk, fontSize: 20, opacity: 0.85 }}
                    >
                      {p}
                    </span>
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 2,
                        backgroundColor: C.plateAccent,
                        transition: "width 240ms ease",
                      }}
                      className="group-hover:!w-8"
                    />
                  </div>
                ))}
              </div>

              <p
                className="font-sans text-[11px] mt-8 leading-relaxed max-w-md"
                style={{ color: C.plateFaint }}
              >
                Griffin Bank holds an unrestricted UK banking licence and is authorised by the
                Prudential Regulation Authority. Full disclosures are available on request.
              </p>
            </div>
          </div>
        </div>
      </section>

     




    {/* ---------------- CASE STUDY — CUSTOMER STORY ---------------- */}
<section
  id="customer-stories"
  className="border-t"
  style={{ borderColor: C.hair, backgroundColor: C.paper }}
>
  <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28">

    {/* Chapter rule — matches customer story pages */}
    <div
      className="flex items-center justify-between mb-20 pb-5"
      style={{ borderBottom: `1px solid ${C.hair}` }}
    >
      <span
        className="font-sans text-[11px]"
        style={{ color: C.certFaint, letterSpacing: "0.22em" }}
      >
        INDIVIDUAL STORY
      </span>
      <span
        className="font-sans text-[11px] hidden sm:inline"
        style={{ color: C.certFaint, letterSpacing: "0.22em" }}
      >
        STOA · LONDON
      </span>
    </div>

    {/* Story headline — Guglielmo format, exact */}
    <div className="max-w-4xl mb-20">
      <h2
        className="font-serif leading-tight"
        style={{ color: C.ink, fontSize: 52, letterSpacing: "-0.02em", lineHeight: 1.08 }}
      >
        How Guglielmo turned idle cash into{" "}
        <span style={{ fontStyle: "italic", color: C.brand }}>Amazon value upfront</span>{" "}
        using Stoa Pot.
      </h2>

      {/* Meta row — the quick facts a case study carries */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-10">
        {[
          ["CUSTOMER", "Guglielmo"],
          ["POT", "Amazon"],
          ["RETURN", "~5% tax-free"],
          ["TERM", "12 months"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline gap-2">
            <span
              className="font-sans text-[10px]"
              style={{ color: C.certFaint, letterSpacing: "0.18em" }}
            >
              {k}
            </span>
            <span className="font-sans text-sm" style={{ color: C.ink }}>
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Two-column editorial — sidebar facts + narrative Q&A */}
    <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">

      {/* LEFT — sticky fact card, mirrors the certificate language */}
      <div className="lg:sticky lg:top-28 self-start">
        <div
          className="p-7"
          style={{
            backgroundColor: C.paper2,
            border: `1px solid ${C.hair}`,
            borderRadius: 12,
          }}
        >
          <p
            className="font-sans text-[10px] mb-6"
            style={{ color: C.certFaint, letterSpacing: "0.22em" }}
          >
            AT A GLANCE
          </p>

          <div className="space-y-5">
            <div>
              <p
                className="font-sans text-[10px] mb-1.5"
                style={{ color: C.certFaint, letterSpacing: "0.14em" }}
              >
                SPARE CASH DEPLOYED
              </p>
              <p className="font-serif tabular-nums" style={{ color: C.ink, fontSize: 28, lineHeight: 1 }}>
                A portion
              </p>
            </div>

            <div style={{ height: 1, backgroundColor: C.hair }} />

            <div>
              <p
                className="font-sans text-[10px] mb-1.5"
                style={{ color: C.certFaint, letterSpacing: "0.14em" }}
              >
                VALUE RECEIVED
              </p>
              <p className="font-serif" style={{ color: C.ink, fontSize: 22, lineHeight: 1.2 }}>
                Amazon, upfront
              </p>
            </div>

            <div>
              <p
                className="font-sans text-[10px] mb-1.5"
                style={{ color: C.certFaint, letterSpacing: "0.14em" }}
              >
                RETURN
              </p>
              <p className="font-serif tabular-nums" style={{ color: C.ink, fontSize: 22, lineHeight: 1 }}>
                ~5%
              </p>
            </div>

            <div>
              <p
                className="font-sans text-[10px] mb-1.5"
                style={{ color: C.certFaint, letterSpacing: "0.14em" }}
              >
                LOCK-IN
              </p>
              <p className="font-serif" style={{ color: C.ink, fontSize: 22, lineHeight: 1 }}>
                One year
              </p>
            </div>
          </div>

          <div
            className="mt-7 pt-5 flex items-center gap-2 font-sans text-[10px]"
            style={{
              borderTop: `1px solid ${C.hair}`,
              color: C.certFaint,
              letterSpacing: "0.14em",
            }}
          >
            <ShieldCheck size={12} style={{ color: C.brand }} />
            FSCS PROTECTED · £120,000
          </div>
        </div>
      </div>

      {/* RIGHT — the Q&A narrative, exactly as the Guglielmo page */}
      <div>

        {/* Q1 */}
        <div className="mb-14">
          <h3
            className="font-serif leading-snug"
            style={{
              color: C.ink,
              fontSize: 24,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            What made you decide to deposit your money into Stoa Pots?
          </h3>
          <p
            className="font-sans text-base mt-5 leading-relaxed max-w-2xl"
            style={{ color: C.slate }}
          >
            I had a fairly big personal expense coming up and was planning to spend on
            Amazon anyway, so it felt like a good fit. I used a portion of spare cash to
            try it out, and being able to access the value upfront, along with around a 5%
            tax free return and a one year lock-in, made it an easy decision.
          </p>
        </div>

        {/* Q2 */}
        <div className="mb-14">
          <h3
            className="font-serif leading-snug"
            style={{
              color: C.ink,
              fontSize: 24,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            How did it feel getting the perks upfront instead of waiting for interest?
          </h3>
          <p
            className="font-sans text-base mt-5 leading-relaxed max-w-2xl"
            style={{ color: C.slate }}
          >
            It felt more immediate and practical. Instead of waiting to see small amounts of
            interest build up, you get something you can actually use straight away, which
            makes it feel more worthwhile.
          </p>
        </div>

        {/* Q3 */}
        <div className="mb-14">
          <h3
            className="font-serif leading-snug"
            style={{
              color: C.ink,
              fontSize: 24,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            What would you say to someone whose cash is sitting in a low or zero interest
            current or savings account and is thinking about opening their first Stoa Pot?
          </h3>
          <p
            className="font-sans text-base mt-5 leading-relaxed max-w-2xl"
            style={{ color: C.slate }}
          >
            If your money is not really doing much where it is, it is worth looking at
            alternatives like this. It is a different approach. You are not focused on
            earning interest, but on getting value from things you would likely spend on
            anyway. As long as you are comfortable with how it works, like the lock-in
            period, it can be a useful option alongside a well diversified portfolio.
          </p>
        </div>

        {/* Signature pull quote */}
        <div
          className="mt-20 pl-8 py-2"
          style={{ borderLeft: `3px solid ${C.brand}` }}
        >
          <p
            className="font-serif italic leading-snug"
            style={{
              color: C.ink,
              fontSize: 26,
              letterSpacing: "-0.01em",
              lineHeight: 1.35,
            }}
          >
            "You get something you can actually use straight away, which makes it feel
            more worthwhile."
          </p>
          <p
            className="font-sans text-xs mt-5"
            style={{ color: C.certFaint, letterSpacing: "0.14em" }}
          >
            GUGLIELMO · AMAZON POT
          </p>
        </div>
      </div>
    </div>

    {/* Bottom CTA — mirrors customer story footer */}
    <div
      className="mt-24 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      style={{ borderTop: `1px solid ${C.hair}` }}
    >
      <div>
        <p
          className="font-sans text-[10px] mb-2"
          style={{ color: C.certFaint, letterSpacing: "0.22em" }}
        >
          NEXT
        </p>
        <p className="font-serif text-2xl" style={{ color: C.ink }}>
          See what your deposit is worth.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => scrollTo("calculator")}
          className="font-sans text-sm font-medium flex items-center gap-2 px-6 py-3"
          style={{
            color: C.paper,
            backgroundColor: C.brand,
            borderRadius: 6,
            letterSpacing: "0.02em",
            boxShadow: "0 10px 30px -12px rgba(59,40,204,0.5)",
          }}
        >
          Try the calculator <ArrowRight size={14} />
        </button>

        <a
          href="https://www.stoa.money/customer-stories"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm font-medium flex items-center gap-2 px-6 py-3"
          style={{
            color: C.brand,
            backgroundColor: "transparent",
            border: `1px solid ${C.brand}`,
            borderRadius: 6,
            letterSpacing: "0.02em",
          }}
        >
          All customer stories <ArrowRight size={14} />
        </a>
      </div>
    </div>

  </div>
</section>



{/* ---------------- TESTIMONIAL ---------------- */}
<section
  className="border-t overflow-hidden"
  style={{ borderColor: C.hair, backgroundColor: C.paper }}
>
  <div className="py-28">
    <p
      className="font-serif text-4xl sm:text-5xl mb-16 text-center"
      style={{ color: C.ink }}
    >
      Trusted by depositors like you.
    </p>

    <TestimonialRotator items={testimonials} />

    <div className="flex justify-center mt-16">
      
       <a href="https://www.stoa.money/customer-stories"
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans text-sm font-medium px-7 py-3.5 transition-colors inline-block"
        style={{ backgroundColor: C.brand, color: C.paper, borderRadius: 4 }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.brandDark)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.brand)}
      >
        View all Customer Stories
      </a>
    </div>
  </div>
</section>









      {/* ---------------- FAQ ---------------- */}
      <section
        id="faq"
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-28">
              <p
                className="font-sans text-xs mb-6"
                style={{ color: C.brand, letterSpacing: "0.18em" }}
              >
                BEFORE YOU DEPOSIT
              </p>
              <h2
                className="font-serif leading-tight"
                style={{
                  color: C.ink,
                  fontSize: 52,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.05,
                }}
              >
                Everything worth
                <br />
                <span style={{ fontStyle: "italic" }}>knowing first.</span>
              </h2>
              <p className="font-sans mt-7 leading-relaxed max-w-md" style={{ color: C.slate, fontSize: "14.5px" }}>
                From eligibility and accounting to cash flow and operations, here’s what
                finance teams want to understand before opening a Business Pot.
              </p>

              <div
                className="mt-12 p-6"
                style={{
                  backgroundColor: C.paper2,
                  border: `1px solid ${C.hair}`,
                  borderRadius: 12,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      backgroundColor: C.brandTint,
                      border: `1px solid ${C.certInner}`,
                    }}
                  >
                    <ShieldCheck size={16} style={{ color: C.brand }} />
                  </span>
                  <div>
                    <p
                      className="font-sans text-[10px]"
                      style={{ color: C.certFaint, letterSpacing: "0.14em" }}
                    >
                      STILL UNSURE?
                    </p>
                    <p className="font-serif text-base mt-0.5" style={{ color: C.ink }}>
                      Speak to a business specialist
                    </p>
                  </div>
                </div>
                <p className="font-sans text-sm leading-relaxed" style={{ color: C.slate }}>
                  Speak with the team about a treasury arrangement. No obligation, no script.
                </p>
                <a
                  href="https://www.stoa.money/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full py-3 text-xs font-medium transition-colors inline-block text-center"
                  style={{
                    backgroundColor: C.brand,
                    color: C.paper,
                    borderRadius: 6,
                    letterSpacing: "0.04em",
                  }}
                >
                  Book a 20-minute call
                </a>
              </div>
            </div>

            <div>
              {businessFaqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={f.q}
                    style={{
                      borderTop: i === 0 ? `1px solid ${C.hair}` : "none",
                      borderBottom: `1px solid ${C.hair}`,
                    }}
                  >
                    <button
                      className="w-full flex items-start justify-between gap-8 text-left py-7"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-6">
                        <span
                          className="font-serif tabular-nums shrink-0 pt-1"
                          style={{
                            color: isOpen ? C.brand : C.certFaint,
                            fontSize: 16,
                            transition: "color 200ms ease",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span
                            className="font-sans text-[10px] inline-block mb-2"
                            style={{
                              color: isOpen ? C.brand : C.certFaint,
                              letterSpacing: "0.16em",
                              transition: "color 200ms ease",
                            }}
                          >
                            {f.tag.toUpperCase()}
                          </span>
                          <p
                            className="font-serif"
                            style={{
                              color: C.ink,
                              fontSize: 22,
                              lineHeight: 1.3,
                              letterSpacing: "-0.005em",
                            }}
                          >
                            {f.q}
                          </p>
                        </div>
                      </div>
                      <span
                        className="shrink-0 mt-2 flex items-center justify-center"
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 999,
                          border: `1px solid ${isOpen ? C.brand : C.hair}`,
                          backgroundColor: isOpen ? C.brand : "transparent",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition:
                            "transform 200ms ease, background-color 200ms ease, border-color 200ms ease",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={isOpen ? C.paper : C.slate}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        transition: "grid-template-rows 260ms ease",
                      }}
                    >
                      <div style={{ overflow: "hidden" }}>
                        <div
                          className="pl-[3.5rem] pr-14 pb-8"
                          style={{ opacity: isOpen ? 1 : 0, transition: "opacity 240ms ease" }}
                        >
                          <p
                            className="font-sans text-base leading-relaxed max-w-2xl"
                            style={{ color: C.slate }}
                          >
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="mt-12 flex items-center gap-4">
                <div style={{ flex: 1, height: 1, backgroundColor: C.hair }} />
                <span
                  className="font-sans text-[10px]"
                  style={{ color: C.certFaint, letterSpacing: "0.2em" }}
                >
                  END
                </span>
                <div style={{ flex: 1, height: 1, backgroundColor: C.hair }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CLOSING CTA ---------------- */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#0D1116",
          color: C.plateInk,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -280,
            left: -280,
            width: 720,
            height: 720,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-32">
          <div
            className="flex items-center justify-between mb-20 pb-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span
              className="font-sans text-[11px]"
              style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.22em" }}
            >
              OPEN A BUSINESS POT
            </span>
            <span
              className="font-sans text-[11px] hidden sm:inline tabular-nums"
              style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.22em" }}
            >
              EST. 12 MONTHS · FSCS PROTECTED
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 items-end">
            <div>
              <h2
                className="font-serif"
                style={{
                  color: "#FFFFFF",
                  fontSize: 68,
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                }}
              >
                Ready to put
                <br />
                <span style={{ fontStyle: "italic" }}>idle cash to work?</span>
              </h2>

              <p
                className="font-sans mt-8 leading-relaxed max-w-lg"
                style={{ color: "rgba(255,255,255,0.62)", fontSize: 17 }}
              >
                Open a Business Pot in under ten minutes, or speak with the team about a
                treasury arrangement. No obligation, no script, the figures speak first.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-12 font-sans">
                <a
                  href="https://app.stoa.money/business/available-pots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 text-sm font-medium transition-all flex items-center justify-center gap-3"
                  style={{
                    backgroundColor: C.brand,
                    color: C.paper,
                    borderRadius: 6,
                    letterSpacing: "0.02em",
                    boxShadow: "0 20px 40px -20px rgba(59,40,204,0.7)",
                  }}
                >
                  Open a Business Pot
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    <ArrowRight size={15} />
                  </span>
                </a>
                <a
                  href="https://www.stoa.money/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 text-sm font-medium transition-colors text-center"
                  style={{
                    border: "1px solid rgba(255,255,255,0.22)",
                    color: "#FFFFFF",
                    borderRadius: 6,
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Speak to the team
                </a>
              </div>

              <div
                className="flex items-center gap-3 mt-14 pt-8"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <ShieldCheck size={16} style={{ color: "rgba(255,255,255,0.62)" }} />
                <span className="font-sans text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Held with Griffin Bank · FSCS protected up to £120,000 per depositor
                </span>
              </div>
            </div>

            {/* RIGHT — at a glance card */}
            <div
              className="relative"
              style={{
                backgroundColor: "#11151A",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: 28,
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <span
                  className="font-sans text-[10px]"
                  style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.22em" }}
                >
                  AT A GLANCE
                </span>
                <span
                  className="font-sans text-[10px] tabular-nums"
                  style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.14em" }}
                >
                  GBP · 12M
                </span>
              </div>

              {[
                ["Minimum deposit", "£2,500"],
                ["Effective yield", "up to 5.06%"],
                ["Term", "Fixed · 12 months"],
                ["Principal returned", "100% at term"],
                ["Protection", "FSCS · £120,000"],
              ].map(([k, v], i, arr) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between py-4"
                  style={{
                    borderBottom:
                      i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <span
                    className="font-sans text-xs"
                    style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}
                  >
                    {k}
                  </span>
                  <span
                    className="font-serif tabular-nums text-right"
                    style={{ color: "#FFFFFF", fontSize: 17 }}
                  >
                    {v}
                  </span>
                </div>
              ))}

              <div
                className="mt-6 pt-5 flex items-center gap-2 font-sans text-[11px]"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.42)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: "#00B67A",
                    display: "inline-block",
                  }}
                />
                Business applications currently open
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}