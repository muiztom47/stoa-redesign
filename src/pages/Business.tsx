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

/* ---------------------------------------------------------------
   Design tokens — same system as Home
----------------------------------------------------------------*/
const C = {
  ink: "#121216",
  paper: "#FFFFFF",
  paper2: "#F5F4F8",
  slate: "#5B6472",
  brand: "#3B28CC",
  brandDark: "#2F20A3",
  brandTint: "#EFEBFC",
  hair: "#E4E2E8",

  certInk: "#121216",
  certMuted: "#6B7280",
  certFaint: "#9CA3AF",
  certRule: "#E4E2E8",
  certEdge: "rgba(59,40,204,0.35)",
  certInner: "rgba(59,40,204,0.12)",

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
   Business data — mirrored from stoa.money/business
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
    a: "UK-registered limited companies, LLPs, and sole traders with surplus operating cash. If you file accounts or pay corporation tax, you're likely eligible. Sole traders can apply with their UTR and ID.",
  },
  {
    tag: "Structure",
    q: "Does the deposit sit with my business or with me?",
    a: "With your business. The account is created in your company's name at Griffin Bank, and eligible deposits are covered by the FSCS up to £120,000 per depositor — the same statutory protection as a standard business savings account.",
  },
  {
    tag: "Accounting",
    q: "How is the perk treated for accounting and tax?",
    a: "The perk is a merchant-funded benefit, not interest, so it's not subject to the same interest income treatment. Your accountant should treat it as a supplier credit or reduction in operating cost — we provide documentation at the point of deposit for your records.",
  },
  {
    tag: "Cash flow",
    q: "Can I access the deposit during the term?",
    a: "No — Pots are fixed-term for twelve months. That fixed structure is what allows the yield to be paid upfront instead of accrued. If your business needs access at short notice, keep that portion of cash in a standard account and only deposit genuinely idle balance.",
  },
  {
    tag: "Multi-pot",
    q: "Can we fund more than one Pot at once?",
    a: "Yes. You can fund as many Pots as your cash position allows. Your total deposit equals the sum required for each chosen perk, and each Pot carries its own twelve-month term and reward.",
  },
  {
    tag: "Operations",
    q: "Can multiple people on the finance team manage this?",
    a: "Yes. Business accounts support multi-user access with role-based permissions, so your finance lead can approve and your ops team can reconcile. Full transaction history is available for export at any time.",
  },
];

/* ---------------------------------------------------------------
   Small helpers
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

const gbp = (n) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });

/* ---------------------------------------------------------------
   Page
----------------------------------------------------------------*/
export default function Business() {
  const [deposit, setDeposit] = useState(10000);
  const [openFaq, setOpenFaq] = useState(0);
  const [category, setCategory] = useState("All");

  const INSTITUTIONAL_RATE = 0.0305;
  const MERCHANT_RATE = 0.0201;
  const institutional = deposit * INSTITUTIONAL_RATE;
  const merchant = deposit * MERCHANT_RATE;
  const totalPerk = institutional + merchant;
  const effectiveRate = totalPerk / deposit;
  const annualisedPct = (effectiveRate * 100).toFixed(2);
  const sliderProgress = ((deposit - 2500) / (120000 - 2500)) * 100;

  const categories = ["All", ...Array.from(new Set(businessPots.map((p) => p.category)))];
  const filtered = category === "All" ? businessPots : businessPots.filter((p) => p.category === category);

  const eligibleCount = businessPots.filter((p) => p.deposit <= deposit).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.paper, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={14} style={{ color: C.brand }} />
              <span
                className="font-sans text-xs"
                style={{ color: C.brand, letterSpacing: "0.18em" }}
              >
                FOR BUSINESS
              </span>
            </div>

            <h1
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 64, letterSpacing: "-0.02em", lineHeight: 1.02 }}
            >
              Make your business
              <br />
              <span style={{ fontStyle: "italic" }}>cash work harder.</span>
            </h1>

            <p
              className="font-sans text-lg mt-8 max-w-xl leading-relaxed"
              style={{ color: C.slate }}
            >
              Turn idle operating cash into subscriptions, software, and services you already
              pay for — settled upfront on day one, not dripped out over twelve months. Your
              deposit is held with a UK-regulated bank and returns in full at term.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "Operating value from day one — not interest accrued slowly",
                "Premium tools and services you already pay for",
                "Built for finance teams that expect more from treasury",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span
                    className="flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      border: `1px solid ${C.brand}`,
                    }}
                  >
                    <Check size={10} style={{ color: C.brand }} />
                  </span>
                  <span className="font-sans text-sm leading-relaxed" style={{ color: C.ink }}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-12 font-sans">
              <button
                className="group px-7 py-3.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: C.brand,
                  color: C.paper,
                  borderRadius: 6,
                  boxShadow: "0 10px 30px -12px rgba(59,40,204,0.6)",
                }}
              >
                Open a Business Pot
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  <ArrowRight size={15} />
                </span>
              </button>
              <button
                className="px-7 py-3.5 text-sm font-medium transition-colors"
                style={{ border: `1px solid ${C.brand}`, color: C.brand, borderRadius: 6 }}
              >
                Speak to the team
              </button>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-8" style={{ borderTop: `1px solid ${C.hair}` }}>
              <div>
                <p className="font-serif text-xl tabular-nums" style={{ color: C.ink }}>£120,000</p>
                <p className="font-sans text-xs mt-1" style={{ color: C.slate }}>
                  FSCS protection per depositor
                </p>
              </div>
              <div style={{ width: 1, height: 36, backgroundColor: C.hair }} />
              <div>
                <p className="font-serif text-xl tabular-nums" style={{ color: C.ink }}>12 months</p>
                <p className="font-sans text-xs mt-1" style={{ color: C.slate }}>
                  Fixed term · principal returned
                </p>
              </div>
            </div>
          </div>

          {/* Right: summary card — certificate language */}
          <div className="relative">
            <div
              style={{
                backgroundColor: C.paper,
                border: `1px solid ${C.certEdge}`,
                borderRadius: 12,
                boxShadow: "0 40px 80px -50px rgba(18,18,22,0.3)",
                padding: 28,
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <span
                  className="font-sans text-[10px]"
                  style={{ color: C.certFaint, letterSpacing: "0.22em" }}
                >
                  BUSINESS AT A GLANCE
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

              {[
                ["Minimum deposit", "£2,500"],
                ["Maximum deposit", "£120,000"],
                ["Effective yield", "up to 5.06%"],
                ["Term", "Fixed · 12 months"],
                ["Protection", "FSCS · £120,000"],
                ["Available Pots", "8 categories"],
              ].map(([k, v], i, arr) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between py-4"
                  style={{
                    borderBottom: i < arr.length - 1 ? `1px solid ${C.certRule}` : "none",
                  }}
                >
                  <span
                    className="font-sans text-xs"
                    style={{ color: C.certMuted, letterSpacing: "0.04em" }}
                  >
                    {k}
                  </span>
                  <span
                    className="font-serif tabular-nums text-right"
                    style={{ color: C.ink, fontSize: 17 }}
                  >
                    {v}
                  </span>
                </div>
              ))}

              <div
                className="mt-6 pt-5 flex items-center gap-2 font-sans text-[11px]"
                style={{ borderTop: `1px solid ${C.certRule}`, color: C.certMuted }}
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

      {/* ---------------- WHY BUSINESSES USE STOA ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper2 }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <div className="max-w-2xl mb-14">
            <p
              className="font-sans text-xs mb-5"
              style={{ color: C.brand, letterSpacing: "0.18em" }}
            >
              WHY BUSINESSES USE STOA
            </p>
            <h2
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 44, letterSpacing: "-0.015em", lineHeight: 1.1 }}
            >
              Turn surplus cash into operating advantage.
            </h2>
            <p className="font-sans text-base mt-5 leading-relaxed" style={{ color: C.slate }}>
              Without adding complexity, or moving money out of FSCS-protected custody.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
            {[
              {
                n: "01",
                t: "Turn cash into operating value.",
                d: "Convert idle deposits into tools, services, and cover your business already pays for. Reduce opex without reducing capability.",
              },
              {
                n: "02",
                t: "Spend smarter, not more.",
                d: "Unlock premium perks you already pay for — subscriptions, security, equipment. Perks activate the same day, with no fees or hidden charges.",
              },
              {
                n: "03",
                t: "Full control, zero friction.",
                d: "Simple setup, clear terms, complete visibility. Keep full control over your funds at the end of the term — renew, switch, or withdraw.",
              },
            ].map((s) => (
              <div
                key={s.n}
                style={{ borderTop: `1px solid ${C.hair}`, paddingTop: 28 }}
              >
                <span
                  className="font-serif tabular-nums"
                  style={{ color: C.brand, fontSize: 22, lineHeight: 1 }}
                >
                  {s.n}
                </span>
                <h3
                  className="font-serif mt-4 leading-snug"
                  style={{ color: C.ink, fontSize: 22, letterSpacing: "-0.005em" }}
                >
                  {s.t}
                </h3>
                <p
                  className="font-sans text-sm mt-3 leading-relaxed"
                  style={{ color: C.slate }}
                >
                  {s.d}
                </p>
              </div>
            ))}
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
              THE NUMBERS
            </p>
            <h2
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 52, letterSpacing: "-0.015em" }}
            >
              See what your cash could unlock.
            </h2>
            <p className="font-sans text-lg mt-6 leading-relaxed" style={{ color: C.slate }}>
              Every Business Pot is funded the same way: standard interest from Griffin Bank,
              plus a merchant partner contribution for prepaid, guaranteed custom. Both rates
              are fixed the moment you deposit.
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
                    Stoa unlocks {gbp(totalPerk - deposit * 0.045)} more in operating value.
                  </span>
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
                {[
                  ["Your deposit", "Held with Griffin Bank, returned at term", deposit, true],
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
                  className="font-sans text-[10px] mt-6 pb-8 leading-relaxed"
                  style={{ color: C.certFaint }}
                >
                  Figures are illustrative. Rates are fixed at the point of deposit. Principal
                  held with Griffin Bank, FSCS-protected up to £120,000 per depositor. Merchant
                  contribution is prepaid against a guaranteed volume of new business customers.
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
              Choose what your cash unlocks.
            </h2>
            <p className="font-sans mt-5 leading-relaxed" style={{ color: C.slate }}>
              Eight Pots, one funding model. Pick the tools your business already pays for and
              receive the value on day one — not accrued over twelve months.
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

          <p className="font-sans text-xs mt-12 max-w-2xl" style={{ color: C.certFaint }}>
            Perk values are illustrative and fixed at the point of deposit. Deposit amounts
            shown are the minimum to unlock each Pot; larger deposits unlock proportionally
            larger perks or higher-tier Pots.
          </p>
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
              "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%)",
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
                  fontSize: 48,
                  lineHeight: 1.05,
                  letterSpacing: "-0.015em",
                }}
              >
                Talk is cheap.
                <br />
                <span style={{ fontStyle: "italic", color: C.plateAccent }}>
                  Trust is earned.
                </span>
              </h2>

              <p
                className="font-sans mt-7 leading-relaxed max-w-lg"
                style={{ color: C.plateMuted, fontSize: 15 }}
              >
                Your deposit sits with Griffin Bank, a UK-regulated institution. Stoa never
                holds client cash directly. Eligible deposits are protected by the FSCS up to
                £120,000 per depositor — the same statutory scheme that protects any standard
                UK business savings account.
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
                    depositor — the same protection as a standard UK business account.
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  ["Segregated", "Client funds held separately from Stoa's balance sheet"],
                  ["Regulated", "Placed with FCA-authorised banking partners"],
                  ["Audited", "Reviewed by external auditors annually"],
                ].map(([label, sub]) => (
                  <div
                    key={label}
                    className="pt-5"
                    style={{ borderTop: `1px solid ${C.plateRule}` }}
                  >
                    <p className="font-sans text-sm" style={{ color: C.plateInk, fontWeight: 600 }}>
                      {label}
                    </p>
                    <p className="font-sans text-xs mt-1.5 leading-relaxed" style={{ color: C.plateFaint }}>
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
                  BUILT ON INFRASTRUCTURE YOU ALREADY TRUST
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
                    className="flex items-center justify-center"
                    style={{
                      backgroundColor: C.plateBg,
                      minHeight: 110,
                      padding: "28px 16px",
                    }}
                  >
                    <span
                      className="font-serif text-center"
                      style={{ color: C.plateInk, fontSize: 20, opacity: 0.85 }}
                    >
                      {p}
                    </span>
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

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28">
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
              Your savings, working harder.
            </h2>
            <p className="font-sans text-lg mt-6 leading-relaxed" style={{ color: C.slate }}>
              Three steps from idle cash to operating value. Renew, switch, or withdraw at the
              end of your term — the choice is yours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
            {[
              {
                n: "01",
                t: "Select your perk.",
                d: "Choose the tools, services and cover your business already pays for. Browse by category, or search for the vendors on your existing invoice list.",
              },
              {
                n: "02",
                t: "Set up your business account.",
                d: "Onboard quickly with a simple, secure setup. Company verification, director ID, and bank details — usually inside a single working day.",
              },
              {
                n: "03",
                t: "Deposit and unlock value.",
                d: "Allocate surplus cash and start reducing operating cost from day one. Track every Pot in a single dashboard, exportable for reconciliation.",
              },
            ].map((s) => (
              <div
                key={s.n}
                style={{ borderTop: `1px solid ${C.hair}`, paddingTop: 28 }}
              >
                <span
                  className="font-serif tabular-nums"
                  style={{ color: C.brand, fontSize: 22, lineHeight: 1 }}
                >
                  {s.n}
                </span>
                <h3
                  className="font-serif mt-4 leading-snug"
                  style={{ color: C.ink, fontSize: 22, letterSpacing: "-0.005em" }}
                >
                  {s.t}
                </h3>
                <p
                  className="font-sans text-sm mt-3 leading-relaxed"
                  style={{ color: C.slate }}
                >
                  {s.d}
                </p>
              </div>
            ))}
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
                FREQUENTLY ASKED
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
                Questions
                <br />
                <span style={{ fontStyle: "italic" }}>worth asking.</span>
              </h2>
              <p className="font-sans text-base mt-7 leading-relaxed max-w-md" style={{ color: C.slate }}>
                The six that come up most often from finance teams. If yours isn't here,
                we'd rather answer it directly.
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
                      TALK TO THE TEAM
                    </p>
                    <p className="font-serif text-base mt-0.5" style={{ color: C.ink }}>
                      Speak to a business specialist
                    </p>
                  </div>
                </div>
                <p className="font-sans text-sm leading-relaxed" style={{ color: C.slate }}>
                  Questions before you deposit, or need help getting started? We've got you
                  covered.
                </p>
                <button
                  className="mt-5 w-full py-3 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: C.brand,
                    color: C.paper,
                    borderRadius: 6,
                    letterSpacing: "0.04em",
                  }}
                >
                  Book a 20-minute call
                </button>
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
              FIXED 12 MONTHS · FSCS PROTECTED
            </span>
          </div>

          <div className="max-w-3xl">
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
              className="font-sans mt-8 leading-relaxed max-w-xl"
              style={{ color: "rgba(255,255,255,0.62)", fontSize: 17 }}
            >
              Open a Business Pot in under ten minutes, or speak with the team about a treasury
              arrangement. No obligation, no script — the numbers speak first.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-12 font-sans">
              <button
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
              </button>
              <button
                className="px-8 py-4 text-sm font-medium transition-colors"
                style={{
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#FFFFFF",
                  borderRadius: 6,
                  backgroundColor: "transparent",
                }}
              >
                Speak to the team
              </button>
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
        </div>
      </section>
    </div>
  );
}