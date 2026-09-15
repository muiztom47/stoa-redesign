import React, { useState } from "react";
import { pots, categories } from "../data/pots";
import PotCard from "../components/PotCard";

/* ---------------------------------------------------------------
   Design tokens — same palette as the homepage.
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
   Small inline icons
----------------------------------------------------------------*/
const ArrowRight = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
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

/* ---------------------------------------------------------------
   Page
----------------------------------------------------------------*/
export default function Pots() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered =
    active === "All" ? pots : pots.filter((p) => p.category === active);
  const featured = pots[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.paper, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-16 lg:pt-24 lg:pb-20">
        <div className="max-w-3xl">
          <p
            className="font-sans text-xs mb-6"
            style={{ color: C.brand, letterSpacing: "0.18em" }}
          >
            THE CATALOGUE
          </p>

          <h1
            className="font-serif leading-tight"
            style={{
              color: C.ink,
              fontSize: 64,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
            }}
          >
            Choose what your
            <br />
            <span style={{ fontStyle: "italic" }}>interest becomes.</span>
          </h1>

          <p
            className="font-sans text-lg mt-8 max-w-2xl leading-relaxed"
            style={{ color: C.slate }}
          >
            Every Pot pairs a fixed deposit with a perk you receive on day one. Choose one,
            deposit the amount shown, and your perk arrives immediately — a subscription, a
            gift card, a stay. Your full deposit is returned at the end of the fixed 12-month
            term, protected by the FSCS up to £120,000 per depositor.
          </p>

          <div className="flex flex-wrap items-center gap-8 mt-10">
            <div>
              <p className="font-serif text-2xl tabular-nums" style={{ color: C.ink }}>
                {pots.length}
              </p>
              <p className="font-sans text-xs mt-1" style={{ color: C.slate }}>
                Pots available
              </p>
            </div>
            <div style={{ width: 1, height: 40, backgroundColor: C.hair }} />
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
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper2 }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
          <div className="flex items-baseline justify-between mb-6">
            <p
              className="font-sans text-xs"
              style={{ color: C.certFaint, letterSpacing: "0.18em" }}
            >
              FEATURED POT
            </p>
            <span
              className="font-sans text-[10px]"
              style={{
                color: C.brand,
                backgroundColor: C.brandTint,
                border: `1px solid ${C.certInner}`,
                borderRadius: 4,
                padding: "4px 8px",
                letterSpacing: "0.14em",
              }}
            >
              HIGHEST YIELD
            </span>
          </div>

          <div
            className="grid gap-10 p-8 md:p-10 md:grid-cols-[1fr_auto] md:items-center"
            style={{
              backgroundColor: C.paper,
              border: `1px solid ${C.certEdge}`,
              borderRadius: 12,
              boxShadow: "0 30px 60px -40px rgba(18,18,22,0.2)",
            }}
          >
            <div>
              <h2
                className="font-serif"
                style={{
                  color: C.ink,
                  fontSize: 32,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                }}
              >
                {featured.brand}
              </h2>
              <p
                className="font-sans text-sm mt-2"
                style={{ color: C.certMuted }}
              >
                {featured.plan}
              </p>

              <div className="flex flex-wrap gap-10 mt-8">
                <div>
                  <p
                    className="font-sans text-[10px] mb-2"
                    style={{ color: C.certFaint, letterSpacing: "0.14em" }}
                  >
                    YOUR PERK
                  </p>
                  <p
                    className="font-serif tabular-nums"
                    style={{ color: C.brand, fontSize: 28, lineHeight: 1 }}
                  >
                    {featured.perkValue}
                  </p>
                </div>
                <div>
                  <p
                    className="font-sans text-[10px] mb-2"
                    style={{ color: C.certFaint, letterSpacing: "0.14em" }}
                  >
                    DEPOSIT
                  </p>
                  <p
                    className="font-serif tabular-nums"
                    style={{ color: C.ink, fontSize: 28, lineHeight: 1 }}
                  >
                    {featured.deposit}
                  </p>
                </div>
                <div>
                  <p
                    className="font-sans text-[10px] mb-2"
                    style={{ color: C.certFaint, letterSpacing: "0.14em" }}
                  >
                    FIXED TERM
                  </p>
                  <p
                    className="font-serif tabular-nums"
                    style={{ color: C.ink, fontSize: 28, lineHeight: 1 }}
                  >
                    12 months
                  </p>
                </div>
              </div>
            </div>

            <button
              className="px-7 py-3.5 text-sm font-medium transition-colors self-start md:self-auto"
              style={{
                backgroundColor: C.brand,
                color: C.paper,
                borderRadius: 6,
                boxShadow: "0 10px 30px -12px rgba(59,40,204,0.5)",
              }}
            >
              Unlock this Pot
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- FILTER + GRID ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20">
          {/* header */}
          <div className="max-w-2xl mb-10">
            <p
              className="font-sans text-xs mb-5"
              style={{ color: C.brand, letterSpacing: "0.18em" }}
            >
              ALL POTS
            </p>
            <h2
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 40, letterSpacing: "-0.015em" }}
            >
              Browse by category.
            </h2>
            <p className="font-sans text-base mt-4 leading-relaxed" style={{ color: C.slate }}>
              Filter to see what fits your life. Every Pot is funded the same way and settled
              on the same day.
            </p>
          </div>

          {/* filter row — own line, never wraps */}
          <div
            className="font-sans text-sm mb-12 pb-5 flex items-center gap-x-7 overflow-x-auto whitespace-nowrap"
            style={{ borderBottom: `1px solid ${C.hair}` }}
          >
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="pb-1 transition-colors shrink-0"
                style={{
                  color: active === c ? C.ink : C.slate,
                  borderBottom:
                    active === c ? `1px solid ${C.brand}` : "1px solid transparent",
                  fontWeight: active === c ? 600 : 500,
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((pot) => (
              <PotCard key={pot.brand} pot={pot} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="font-sans text-sm mt-12" style={{ color: C.certFaint }}>
              No Pots in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>

      {/* ---------------- HOW POTS WORK ---------------- */}
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
              HOW POTS WORK
            </p>
            <h2
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 44, letterSpacing: "-0.015em" }}
            >
              Four steps, end to end.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
            {[
              {
                n: "01",
                t: "Choose a perk.",
                d: "Browse the catalogue and pick the subscription, gift card, or experience you already pay for.",
              },
              {
                n: "02",
                t: "Deposit the amount shown.",
                d: "Each Pot has a fixed deposit — shown upfront, no surprises. Fund more than one Pot if you like.",
              },
              {
                n: "03",
                t: "Receive the perk upfront.",
                d: "The full value of your perk is sent to you on day one, not accrued over the twelve months.",
              },
              {
                n: "04",
                t: "Get your deposit back.",
                d: "At the end of the fixed term, your full deposit returns. Renew or walk away — your choice.",
              },
            ].map((s) => (
              <div
                key={s.n}
                style={{ borderTop: `1px solid ${C.hair}`, paddingTop: 24 }}
              >
                <span
                  className="font-serif tabular-nums"
                  style={{ color: C.brand, fontSize: 22, lineHeight: 1 }}
                >
                  {s.n}
                </span>
                <h3
                  className="font-serif mt-4 leading-snug"
                  style={{ color: C.ink, fontSize: 20, letterSpacing: "-0.005em" }}
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
                    className="flex items-center justify-center"
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