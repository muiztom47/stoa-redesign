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

/* ---------------------------------------------------------------
   Design tokens — same palette as the homepage.
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
   Content
----------------------------------------------------------------*/
const steps = [
  {
    n: "01",
    t: "Start with what you already pay for.",
    d: "Streaming, travel, groceries, the tools you use for work. Most people spend on the same handful of things every year. Stoa lets your savings cover that spending instead of sitting in an account earning very little.",
  },
  {
    n: "02",
    t: "Choose your Pot.",
    d: "Every Pot pairs one perk with one deposit amount. Browse by category — streaming, travel, shopping, news, AI tools, digital security — and pick the one that matches what you already spend on.",
  },
  {
    n: "03",
    t: "Deposit the amount shown.",
    d: "Each Pot has a fixed deposit requirement, shown upfront. No surprises, no tiering games. You can fund more than one Pot at a time if you want more than one perk.",
  },
  {
    n: "04",
    t: "Your perk arrives on day one.",
    d: "Once your deposit is confirmed, your perk is sent to you — most arrive as a digital code, ready to redeem immediately. A small number require a brief manual step, which can add a little time.",
  },
  {
    n: "05",
    t: "Your deposit sits with a bank, not with us.",
    d: "Your money is held in an account created for you at Griffin Bank, a UK-regulated institution. Eligible deposits of up to £120,000 per depositor are covered by the FSCS, the UK's statutory deposit guarantee scheme.",
  },
  {
    n: "06",
    t: "At the end of twelve months, you choose.",
    d: "Every Pot runs for a fixed 12-month term. When the term ends, you can renew to keep receiving the perk, or take your full deposit back. The choice is yours, with no penalty either way.",
  },
];

const faqs = [
  {
    tag: "Product",
    q: "What is Stoa?",
    a: "Stoa turns fixed-term savings into lifestyle perks instead of cash interest. You choose a perk, deposit the amount shown, and receive the value upfront as a digital gift card once your deposit clears.",
  },
  {
    tag: "Mechanism",
    q: "How does Stoa actually work?",
    a: "You pick your perks and make the deposit shown for each. Once confirmed, the perks are sent to you upfront. Your money sits in an account held at Griffin Bank, and the value behind each perk comes from Stoa's banking and merchant partnerships — not from your deposit itself.",
  },
  {
    tag: "Fee",
    q: "What's the catch?",
    a: "There isn't one that we don't disclose. Pick a perk, deposit the amount shown, receive the value upfront. No monthly charge, no exit fee, no promotional rate that resets after year one. Both funding rates are fixed the moment you deposit.",
  },
  {
    tag: "Multi-pot",
    q: "How many Pots can I open?",
    a: "As many as you like. Each perk you select opens its own Pot, and you can fund several Pots in a single deposit. Your total deposit is simply the sum of what each chosen perk requires.",
  },
  {
    tag: "Redemption",
    q: "How do I redeem my perks?",
    a: "Perks are sent by email and through the app once ready, along with redemption instructions for that specific merchant. You redeem the code directly with the merchant or service — there's nothing to claim from us afterwards.",
  },
  {
    tag: "Term",
    q: "When do I get my deposit back?",
    a: "Deposits are held for a fixed 12 months. As your term ends, you can renew for another 12 months or take your full deposit back. Principal is returned in full at maturity, with no early withdrawal option during the term.",
  },
];

/* ---------------------------------------------------------------
   Page
----------------------------------------------------------------*/
export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.paper, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .step-fade { animation: stepFade 0.6s ease; }
        @keyframes stepFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .step-fade { animation: none; } }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-4xl">
          <p
            className="font-sans text-xs mb-6"
            style={{ color: C.brand, letterSpacing: "0.18em" }}
          >
            HOW IT WORKS
          </p>
          <h1
            className="font-serif leading-tight"
            style={{ color: C.ink, fontSize: 64, letterSpacing: "-0.02em", lineHeight: 1.02 }}
          >
            A different way
            <br />
            to make your{" "}
            <span style={{ fontStyle: "italic" }}>savings work.</span>
          </h1>
          <p
            className="font-sans text-lg mt-8 max-w-2xl leading-relaxed"
            style={{ color: C.slate }}
          >
            Stoa is a fixed-term savings account that pays your perk upfront. You deposit for
            twelve months, and the value of that year's interest is turned into something you
            already pay for — a subscription, a gift card, a stay. Your principal returns in
            full at maturity, protected by the FSCS up to £120,000 per depositor.
          </p>

          <div className="flex flex-wrap items-center gap-8 mt-10">
            <div>
              <p className="font-serif text-2xl tabular-nums" style={{ color: C.ink }}>
                £1,000+
              </p>
              <p className="font-sans text-xs mt-1" style={{ color: C.slate }}>
                Minimum deposit
              </p>
            </div>
            <div style={{ width: 1, height: 40, backgroundColor: C.hair }} />
            <div>
              <p className="font-serif text-2xl tabular-nums" style={{ color: C.ink }}>
                12 months
              </p>
              <p className="font-sans text-xs mt-1" style={{ color: C.slate }}>
                Fixed term
              </p>
            </div>
            <div style={{ width: 1, height: 40, backgroundColor: C.hair }} />
            <div>
              <p className="font-serif text-2xl tabular-nums" style={{ color: C.ink }}>
                FSCS
              </p>
              <p className="font-sans text-xs mt-1" style={{ color: C.slate }}>
                Up to £120,000 per depositor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-12 font-sans">
            <button
              className="px-7 py-3.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: C.brand,
                color: C.paper,
                borderRadius: 6,
                boxShadow: "0 10px 30px -12px rgba(59,40,204,0.6)",
              }}
            >
              Open a Pot
            </button>
            <a
              href="#steps"
              className="px-7 py-3.5 text-sm font-medium transition-colors flex items-center gap-2"
              style={{ border: `1px solid ${C.brand}`, color: C.brand, borderRadius: 6 }}
            >
              See the six steps <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- SIX STEPS ---------------- */}
      <section
        id="steps"
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper2 }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-28">
          <div className="max-w-2xl mb-16">
            <p
              className="font-sans text-xs mb-5"
              style={{ color: C.brand, letterSpacing: "0.18em" }}
            >
              THE PROCESS
            </p>
            <h2
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 44, letterSpacing: "-0.015em", lineHeight: 1.1 }}
            >
              Six steps, in order.
            </h2>
            <p className="font-sans text-base mt-5 leading-relaxed" style={{ color: C.slate }}>
              From choosing your perk to receiving your principal back — the whole process,
              start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
            {steps.map((s) => (
              <div
                key={s.n}
                className="grid grid-cols-[64px_1fr] gap-6"
                style={{ borderTop: `1px solid ${C.hair}`, paddingTop: 28 }}
              >
                <span
                  className="font-serif tabular-nums"
                  style={{
                    color: C.brand,
                    fontSize: 22,
                    lineHeight: 1,
                    paddingTop: 4,
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <h3
                    className="font-serif leading-snug"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TRUST PLATE ---------------- */}
      <section
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
                Held by a bank,
                <br />
                <span style={{ fontStyle: "italic", color: C.plateAccent }}>
                  not by us.
                </span>
              </h2>

              <p
                className="font-sans mt-7 leading-relaxed max-w-lg"
                style={{ color: C.plateMuted, fontSize: 15 }}
              >
                Deposits are placed with Griffin Bank, a UK-regulated institution. Stoa never
                holds client cash directly. Eligible deposits are protected by the FSCS up to
                £120,000 per depositor — the same statutory scheme that protects a standard
                UK savings account.
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
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: C.plateMuted }}
                  >
                    Eligible deposits are covered up to{" "}
                    <span style={{ color: C.plateInk, fontWeight: 600 }}>£120,000</span> per
                    depositor — the same protection as a standard UK high-street savings
                    account.
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
                    <p
                      className="font-sans text-sm"
                      style={{ color: C.plateInk, fontWeight: 600 }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-sans text-xs mt-1.5 leading-relaxed"
                      style={{ color: C.plateFaint }}
                    >
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
                {["Griffin", "Visa", "Plaid", "Experian", "AWS", "Microsoft Azure"].map((p) => (
                  <div
                    key={p}
                    className="group relative flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: C.plateBg,
                      minHeight: 110,
                      padding: "28px 16px",
                    }}
                  >
                    <span
                      className="font-serif text-center"
                      style={{
                        color: C.plateInk,
                        fontSize: 20,
                        letterSpacing: "0.005em",
                        opacity: 0.85,
                      }}
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

              <p
                className="font-sans text-base mt-7 leading-relaxed max-w-md"
                style={{ color: C.slate }}
              >
                The six that come up most often. If yours isn't here, we'd rather answer it
                directly than leave you guessing.
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
                      Talk to a specialist
                    </p>
                  </div>
                </div>
                <p className="font-sans text-sm leading-relaxed" style={{ color: C.slate }}>
                  Speak with the team about a Personal or Business arrangement. No obligation,
                  no script.
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
                  Book a 15-minute call
                </button>
              </div>
            </div>

            <div>
              {faqs.map((f, i) => {
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
                      onClick={() => setOpenFaq(isOpen ? null : i)}
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
              OPEN A POT
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
              Ready to see
              <br />
              <span style={{ fontStyle: "italic" }}>your number?</span>
            </h2>

            <p
              className="font-sans mt-8 leading-relaxed max-w-xl"
              style={{ color: "rgba(255,255,255,0.62)", fontSize: 17 }}
            >
              Open a Pot in under five minutes, or speak with the team about a Business
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
                Open a Pot
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