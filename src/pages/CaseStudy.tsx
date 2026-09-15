import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------------------------------------------------------
   Design tokens
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
   Icons
----------------------------------------------------------------*/
const ArrowRight = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ArrowLeft = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);
const Check = ({ size = 14, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);

/* ---------------------------------------------------------------
   Content
----------------------------------------------------------------*/
const outcomeStats = [
  {
    value: "4",
    label: "Sections restructured",
    sub: "Calculator · Catalogue · Trust · CTA",
  },
  {
    value: "6",
    label: "Design decisions documented",
    sub: "Each with a stated commercial rationale",
  },
  {
    value: "14",
    label: "Days end-to-end",
    sub: "Same sprint length we use on client projects",
  },
  {
    value: "1",
    label: "Design system delivered",
    sub: "Seven tokens, two typefaces, no component library",
  },
];

const deliveryPhases = [
  {
    n: "01",
    t: "Audit",
    d: "We read the original site the way a finance lead would: what does it pay, where does the money come from, is it protected, what's the alternative? Every unanswered question becomes a redesign brief.",
    deliverable: "Discovery doc · 2 days",
  },
  {
    n: "02",
    t: "Restructure",
    d: "We map each section to a single reader question, then redesign the section to answer it. Sections that only repeat marketing copy get cut. Sections that carry a number get the space the number deserves.",
    deliverable: "Wireframes · 3 days",
  },
  {
    n: "03",
    t: "Systemise",
    d: "We build a small set of design tokens — ink, paper, brand, hairline, plate — and apply them across every route. No component library. Every interface element hand-written against the same variables, so the system stays consistent as the product grows.",
    deliverable: "Design tokens · 5 days",
  },
  {
    n: "04",
    t: "Ship",
    d: "We deliver a live, working site — not a Figma file. Every number on the page is calculated from real published rates, and every section is production-ready. Handover includes the code, the token system, and a walkthrough.",
    deliverable: "Live build · 4 days",
  },
];

const sectionsRationale = [
  {
    n: "01",
    tag: "The calculator",
    title: "Turning a search box into a term sheet.",
    before:
      "Stoa's original calculator was an input field, a currency prefix, and a 'View all Pots' button. It asked the reader for a number but never gave one back.",
    after:
      "Rebuilt as a live term sheet: deposit slider, funding-mix visual, line-item ledger, direct comparison to a 4.5% easy-access account, and reference cards for yield, term, and principal returned.",
    decisions: [
      "Funding-mix bar (Bank 60% / Merchant 40%) reframes the product from 'savings account with a perk' to 'structured yield vehicle' — the frame that converts a CFO.",
      "Direct comparison to a standard savings account names the alternative. Most fintechs avoid this comparison; naming it is the credibility move that wins the finance reader.",
      "A footnote pre-empts the 'this resets after year one' objection before the reader asks it. Reduces back-and-forth in sales.",
    ],
    impact:
      "For a client in this position, we'd expect the calculator to become the strongest conversion surface on the page — not a lead-capture form.",
  },
  {
    n: "02",
    tag: "The catalogue",
    title: "Making the product grid a comparison surface, not a listing.",
    before:
      "Perk value and deposit shared the same visual weight. No effective yield shown. 'Unlock' read as a locked feature rather than a financial commitment.",
    after:
      "Perk value became the hero number. Effective yield sits directly underneath in brand blue. A TOP-YIELDING chip creates a shortlist inside the grid. Button copy changes to 'Unlock this Pot'.",
    decisions: [
      "The reader's question is 'which pays best?' — the answer should be visible without opening a single card.",
      "TOP-YIELDING creates hierarchy: eight options become a four-option shortlist the eye finds instantly.",
      "The 4px brand strip at the top of each card uses the brand's own colour pair, so each card feels native to the brand it represents. Small detail, high perceived polish.",
    ],
    impact:
      "For a client with a product catalogue, effective yield per option becomes a decision input, not a calculation the reader has to do.",
  },
  {
    n: "03",
    tag: "Trust & custody",
    title: "Moving the trust section into a different register.",
    before:
      "Two paragraphs stacked on the same white background — 'Your money is safe' and 'Your deposit is FSCS protected'. Correct copy, wrong visual weight.",
    after:
      "The section became a dark plate. Headline: 'Held by a bank, not by us.' FSCS card with the £120,000 figure inline. Three assurance rows (Segregated · Regulated · Audited) and a partner wall on a hairline grid.",
    decisions: [
      "Trust sections need to feel institutional. The dark plate is the standard move — every private bank uses it for exactly this reason.",
      "'Held by a bank, not by us' displaces the reader's anxiety onto the company itself. It removes the concern rather than addressing it, which is more effective.",
      "Segregated · Regulated · Audited follows the natural question order of a finance professional. One-word categories, one-line sub-text.",
    ],
    impact:
      "For a regulated client, the trust section shifts from a copy block to a decision aid — the section readers return to before they deposit.",
  },
  {
    n: "04",
    tag: "How it works",
    title: "Answering 'where does the money come from' in one screen.",
    before:
      "A paragraph about 'the algorithm' and a three-step list — select perk, set up account, deposit. Honest, but abstract. The reader left knowing *that* it works, not *how*.",
    after:
      "A flow strip: £10,000 deposit → +£305 bank interest → +£201 merchant share → £506 paid on day one. Three explanatory columns beneath: held, funded, settled.",
    decisions: [
      "The mechanism is the single most important thing to explain, and the thing most likely to be misunderstood. It deserves the strongest visual treatment on the page.",
      "The flow strip answers the 'is this too good to be true?' instinct in five numbers, with no hand-waving.",
      "The three columns follow the CFO's natural due-diligence order: custody → funding → settlement. Not the marketing order.",
    ],
    impact:
      "For a client with a novel financial mechanism, this section replaces the sales call that would otherwise be needed to explain it.",
  },
  {
    n: "05",
    tag: "FAQ",
    title: "Signalling that these are the questions, in order.",
    before:
      "Six plain accordion rows with a chevron. No categorisation, no hierarchy, no exit path.",
    after:
      "Numbered 01–06. Category tags above each question (TERM · PROTECTION · ACCESS · YIELD). Sticky 'talk to a specialist' card. Smooth height collapse. An 'END' rule closes the section.",
    decisions: [
      "Numbering signals this is an ordered set — the four questions every depositor asks, in a specific sequence.",
      "Category tags let the reader scan by topic. The finance lead who only cares about protection reads one tag and moves on.",
      "The sticky contact card says 'we'd rather answer this directly.' Most fintechs bury the human channel; a good one surfaces it next to the questions people actually have.",
    ],
    impact:
      "For a client with a complex product, the FAQ shifts from a support artifact to a decision aid — and reduces inbound support volume.",
  },
  {
    n: "06",
    tag: "Closing CTA",
    title: "Ending the page with a document, not a banner.",
    before:
      "'We're here when you need us' and a 'Get in Touch' link. That was the last thing a visitor saw.",
    after:
      "Dark plate matching the trust section. Chapter rule at the top (OPEN A POT · FIXED 12 MONTHS · FSCS PROTECTED). Headline: 'Ready to see your number?' — with an AT A GLANCE summary card.",
    decisions: [
      "A CFO shouldn't have to recall six key facts from earlier on the page. The AT A GLANCE card puts them next to the CTA.",
      "The chapter rule frames the section as a document cover — the same move a private bank uses on a brochure.",
      "Two CTAs accommodate two reader mindsets: the confident reader goes directly to 'Open a Pot'; the cautious one to 'Speak to the team'.",
    ],
    impact:
      "For a client with a considered purchase, the final section performs the function of a close — summarise the decision inputs, then convert.",
  },
];

const engagement = [
  {
    label: "Discovery",
    duration: "Week 1",
    detail:
      "We read your product and your market the way your buyer does. Audit of current site, competitive teardown, and a prioritised list of the sections that need rebuilding.",
  },
  {
    label: "Design sprint",
    duration: "Weeks 2–3",
    detail:
      "Wireframes, then final designs, then the design system that will carry them across every page. Reviewed with you at each stage — no black-box deliverables.",
  },
  {
    label: "Build & ship",
    duration: "Weeks 4–5",
    detail:
      "We build the site in production code, not Figma prototypes. Every number calculated from real data, every section responsive, every page shipped live on your domain.",
  },
  {
    label: "Handover",
    duration: "Week 5",
    detail:
      "Code repository, design token documentation, and a walkthrough call with your team. You own everything — no lock-in, no licence fees.",
  },
];

const systemTokens = [
  { label: "Ink", value: "#121216" },
  { label: "Paper", value: "#FFFFFF" },
  { label: "Slate", value: "#5B6472" },
  { label: "Brand", value: "#3B28CC" },
  { label: "Brand tint", value: "#EFEBFC" },
  { label: "Hairline", value: "#E4E2E8" },
  { label: "Plate", value: "#121A21" },
];

/* ---------------------------------------------------------------
   Helpers
----------------------------------------------------------------*/
function ScreenshotFrame({ label, height = 360, caption }) {
  return (
    <figure>
      <div
        style={{
          height,
          backgroundColor: C.paper2,
          border: `1px dashed ${C.hair}`,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className="font-sans text-xs"
          style={{ color: C.certFaint, letterSpacing: "0.18em" }}
        >
          {label.toUpperCase()}
        </span>
      </div>
      {caption && (
        <figcaption
          className="font-sans text-xs mt-3"
          style={{ color: C.certMuted }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------------------------------------------------------------
   Page
----------------------------------------------------------------*/
export default function CaseStudy() {
  const navigate = useNavigate();
  const [activeBefore, setActiveBefore] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.paper, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-16 lg:pt-20 lg:pb-20">
        <button
          onClick={() => navigate("/")}
          className="font-sans text-xs inline-flex items-center gap-2 mb-12 transition-opacity hover:opacity-70"
          style={{ color: C.certMuted, letterSpacing: "0.14em" }}
        >
          <ArrowLeft size={12} /> BACK TO SERVICES
        </button>

        <div className="max-w-4xl">
          <p
            className="font-sans text-xs mb-6"
            style={{ color: C.brand, letterSpacing: "0.22em" }}
          >
            CASE STUDY · FINTECH · 2026
          </p>

          <h1
            className="font-serif leading-tight"
            style={{ color: C.ink, fontSize: 72, letterSpacing: "-0.025em", lineHeight: 1.02 }}
          >
            What we'd do if we
            <br />
            <span style={{ fontStyle: "italic" }}>rebuilt Stoa's site.</span>
          </h1>

          <p
            className="font-sans text-lg mt-8 leading-relaxed max-w-2xl"
            style={{ color: C.slate }}
          >
            A self-directed design exercise — one of a series — showing how we approach
            website redesign for fintech products. Same four-phase methodology we use on
            client engagements, applied to a public product with no client relationship.
          </p>

          <p
            className="font-sans text-sm mt-6 max-w-2xl"
            style={{ color: C.certMuted }}
          >
            Stoa is used here as a public case for study. We are not affiliated with, and did
            not work for, Stoa. The methodology and design system below are ours.
          </p>
        </div>

        {/* outcome stats */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-16 pt-12"
          style={{ borderTop: `1px solid ${C.hair}` }}
        >
          {outcomeStats.map((s) => (
            <div key={s.label}>
              <p
                className="font-serif tabular-nums"
                style={{
                  color: C.brand,
                  fontSize: 48,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </p>
              <p
                className="font-sans text-sm mt-3 leading-snug"
                style={{ color: C.ink, fontWeight: 500 }}
              >
                {s.label}
              </p>
              <p
                className="font-sans text-xs mt-2 leading-relaxed"
                style={{ color: C.certMuted }}
              >
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- HERO SCREENSHOT ---------------- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 pb-24">
        <ScreenshotFrame
          label="Rebuilt concept · Personal route"
          height={520}
          caption="The rebuilt homepage: one editorial statement, one interactive certificate, three conversion paths. Every financial fact above the fold."
        />
      </section>

      {/* ---------------- WHY THIS EXISTS ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper2 }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-28">
              <p
                className="font-sans text-xs mb-5"
                style={{ color: C.brand, letterSpacing: "0.18em" }}
              >
                WHY THIS EXISTS
              </p>
              <h2
                className="font-serif leading-tight"
                style={{ color: C.ink, fontSize: 44, letterSpacing: "-0.015em", lineHeight: 1.1 }}
              >
                Methodology demos
                <br />
                <span style={{ fontStyle: "italic" }}>beat portfolio pieces.</span>
              </h2>
            </div>

            <div>
              <p
                className="font-sans text-lg leading-relaxed"
                style={{ color: C.ink }}
              >
                Most agencies show screenshots of client work with a logo, a vague metric, and
                a testimonial. The reader is asked to trust that the work was good without ever
                seeing how it was made.
              </p>

              <p
                className="font-sans text-base leading-relaxed mt-6"
                style={{ color: C.slate }}
              >
                We do the opposite. Periodically, we pick a public product we admire, rebuild
                one or two of its pages from scratch, and publish the full process — the audit
                we ran, the decisions we made, the system we built, and the reasoning behind
                every choice.
              </p>

              <p
                className="font-sans text-base leading-relaxed mt-6"
                style={{ color: C.slate }}
              >
                This is the first in that series. It shows you exactly how we'd approach a
                fintech redesign if we were engaged to do one — including the parts most
                agencies keep off the record.
              </p>

              <div
                className="mt-12 p-6"
                style={{
                  backgroundColor: C.paper,
                  border: `1px solid ${C.hair}`,
                  borderRadius: 10,
                }}
              >
                <p
                  className="font-sans text-[10px] mb-3"
                  style={{ color: C.certFaint, letterSpacing: "0.18em" }}
                >
                  WHAT WE'RE TESTING
                </p>
                <p
                  className="font-serif italic"
                  style={{ color: C.ink, fontSize: 22, lineHeight: 1.4 }}
                >
                  "Can we rebuild a fintech product page around the four questions a finance
                  lead asks first — what does it pay, where does it come from, is it protected,
                  and what's the alternative?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- THE METHODOLOGY ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28">
          <div className="max-w-2xl mb-16">
            <p
              className="font-sans text-xs mb-5"
              style={{ color: C.brand, letterSpacing: "0.18em" }}
            >
              THE METHODOLOGY
            </p>
            <h2
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 44, letterSpacing: "-0.015em" }}
            >
              Four phases. Five weeks.
            </h2>
            <p
              className="font-sans text-base mt-5 leading-relaxed"
              style={{ color: C.slate }}
            >
              The same process we run on client redesigns, compressed into a self-directed
              sprint. Deliverables shown are what a client receives at each phase.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
            {deliveryPhases.map((s) => (
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
                  className="font-serif mt-4"
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
                <p
                  className="font-sans text-[10px] mt-4"
                  style={{ color: C.brand, letterSpacing: "0.14em" }}
                >
                  {s.deliverable.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- BEFORE / AFTER ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper2 }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <p
                className="font-sans text-xs mb-5"
                style={{ color: C.brand, letterSpacing: "0.18em" }}
              >
                BEFORE / AFTER
              </p>
              <h2
                className="font-serif leading-tight"
                style={{ color: C.ink, fontSize: 44, letterSpacing: "-0.015em" }}
              >
                The change, at a glance.
              </h2>
            </div>

            <div
              className="inline-flex p-1 self-start md:self-auto"
              style={{ backgroundColor: C.paper, borderRadius: 999, border: `1px solid ${C.hair}` }}
            >
              {["Before", "After"].map((label) => {
                const isActive =
                  (label === "Before" && activeBefore) || (label === "After" && !activeBefore);
                return (
                  <button
                    key={label}
                    onClick={() => setActiveBefore(label === "Before")}
                    className="font-sans text-sm px-5 py-2 transition-all"
                    style={{
                      backgroundColor: isActive ? C.ink : "transparent",
                      color: isActive ? C.paper : C.slate,
                      borderRadius: 999,
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {activeBefore ? (
            <ScreenshotFrame
              label="Original · calculator"
              height={520}
              caption="The original calculator: input field, currency prefix, 'View all Pots' button. No output. No breakdown. No comparison."
            />
          ) : (
            <ScreenshotFrame
              label="Rebuilt · calculator"
              height={520}
              caption="The rebuilt calculator: deposit slider, funding-mix bar, line-item ledger, direct comparison to a standard savings account, and reference cards for yield, term, and principal."
            />
          )}

          <p
            className="font-sans text-xs mt-6 text-center"
            style={{ color: C.certFaint }}
          >
            {activeBefore
              ? "Reference: the public product this exercise responds to."
              : "Rebuilt concept — live as a working prototype."}
          </p>
        </div>
      </section>

      {/* ---------------- SIX DECISIONS ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28">
          <div className="max-w-2xl mb-16">
            <p
              className="font-sans text-xs mb-5"
              style={{ color: C.brand, letterSpacing: "0.18em" }}
            >
              THE DECISIONS
            </p>
            <h2
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 44, letterSpacing: "-0.015em" }}
            >
              Six sections, six questions.
            </h2>
            <p
              className="font-sans text-base mt-5 leading-relaxed"
              style={{ color: C.slate }}
            >
              Each section starts with the question the reader is actually asking. Each
              redesign answers it. The impact notes are what we'd expect to move for a client
              in the same position — not reported metrics.
            </p>
          </div>

          <div className="space-y-16">
            {sectionsRationale.map((s) => (
              <article
                key={s.n}
                className="grid lg:grid-cols-[100px_1fr] gap-10 lg:gap-14 pt-10"
                style={{ borderTop: `1px solid ${C.hair}` }}
              >
                <div>
                  <span
                    className="font-serif tabular-nums"
                    style={{ color: C.brand, fontSize: 26, lineHeight: 1 }}
                  >
                    {s.n}
                  </span>
                  <p
                    className="font-sans text-[10px] mt-3"
                    style={{ color: C.certFaint, letterSpacing: "0.16em" }}
                  >
                    {s.tag.toUpperCase()}
                  </p>
                </div>

                <div>
                  <h3
                    className="font-serif leading-tight"
                    style={{ color: C.ink, fontSize: 32, letterSpacing: "-0.01em" }}
                  >
                    {s.title}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div
                      className="p-6"
                      style={{
                        backgroundColor: C.paper2,
                        border: `1px solid ${C.hair}`,
                        borderRadius: 10,
                      }}
                    >
                      <p
                        className="font-sans text-[10px] mb-3"
                        style={{ color: C.certFaint, letterSpacing: "0.18em" }}
                      >
                        BEFORE
                      </p>
                      <p
                        className="font-sans text-sm leading-relaxed"
                        style={{ color: C.slate }}
                      >
                        {s.before}
                      </p>
                    </div>

                    <div
                      className="p-6"
                      style={{
                        backgroundColor: C.brandTint,
                        border: `1px solid ${C.certInner}`,
                        borderRadius: 10,
                      }}
                    >
                      <p
                        className="font-sans text-[10px] mb-3"
                        style={{ color: C.brand, letterSpacing: "0.18em" }}
                      >
                        AFTER
                      </p>
                      <p
                        className="font-sans text-sm leading-relaxed"
                        style={{ color: C.ink }}
                      >
                        {s.after}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p
                      className="font-sans text-[10px] mb-4"
                      style={{ color: C.certFaint, letterSpacing: "0.18em" }}
                    >
                      DESIGN DECISIONS
                    </p>
                    <ul className="space-y-3">
                      {s.decisions.map((d, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="flex items-center justify-center shrink-0 mt-1"
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: 999,
                              backgroundColor: C.paper,
                              border: `1px solid ${C.brand}`,
                            }}
                          >
                            <Check size={9} style={{ color: C.brand }} />
                          </span>
                          <span
                            className="font-sans text-sm leading-relaxed"
                            style={{ color: C.ink }}
                          >
                            {d}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="mt-8 pt-6"
                    style={{ borderTop: `1px solid ${C.hair}` }}
                  >
                    <p
                      className="font-sans text-[10px] mb-2"
                      style={{ color: C.brand, letterSpacing: "0.18em" }}
                    >
                      IMPACT FOR A CLIENT IN THIS POSITION
                    </p>
                    <p
                      className="font-serif italic"
                      style={{ color: C.ink, fontSize: 18, lineHeight: 1.5 }}
                    >
                      {s.impact}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- THE SYSTEM ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper2 }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-28">
              <p
                className="font-sans text-xs mb-5"
                style={{ color: C.brand, letterSpacing: "0.18em" }}
              >
                THE SYSTEM
              </p>
              <h2
                className="font-serif leading-tight"
                style={{ color: C.ink, fontSize: 44, letterSpacing: "-0.015em", lineHeight: 1.1 }}
              >
                Seven tokens. Two typefaces.
                <br />
                <span style={{ fontStyle: "italic" }}>No component library.</span>
              </h2>
              <p
                className="font-sans text-base mt-7 leading-relaxed"
                style={{ color: C.slate }}
              >
                Every interface element across personal and business routes is hand-written
                against the same variables. The system stays small on purpose — it makes the
                site easier to extend, and it means the client owns a system their team can
                actually read.
              </p>
            </div>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {systemTokens.map((t) => (
                  <div
                    key={t.label}
                    className="p-4"
                    style={{
                      border: `1px solid ${C.hair}`,
                      borderRadius: 8,
                      backgroundColor: C.paper,
                    }}
                  >
                    <div
                      style={{
                        height: 48,
                        borderRadius: 6,
                        backgroundColor: t.value,
                        border: t.value === "#FFFFFF" ? `1px solid ${C.hair}` : "none",
                      }}
                    />
                    <p
                      className="font-sans text-[10px] mt-3"
                      style={{ color: C.certFaint, letterSpacing: "0.14em" }}
                    >
                      {t.label.toUpperCase()}
                    </p>
                    <p
                      className="font-mono text-xs mt-1"
                      style={{
                        color: C.ink,
                        fontFamily: "ui-monospace, SFMono-Regular, monospace",
                      }}
                    >
                      {t.value}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="mt-10 pt-8 grid sm:grid-cols-2 gap-10"
                style={{ borderTop: `1px solid ${C.hair}` }}
              >
                <div>
                  <p
                    className="font-sans text-[10px] mb-5"
                    style={{ color: C.certFaint, letterSpacing: "0.16em" }}
                  >
                    TYPE
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="font-sans text-sm" style={{ color: C.slate }}>
                        Display
                      </span>
                      <span
                        className="font-serif text-right"
                        style={{ color: C.ink, fontSize: 20 }}
                      >
                        Fraunces
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-sans text-sm" style={{ color: C.slate }}>
                        Body
                      </span>
                      <span
                        className="font-sans text-right"
                        style={{ color: C.ink, fontSize: 15 }}
                      >
                        Inter
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p
                    className="font-sans text-[10px] mb-5"
                    style={{ color: C.certFaint, letterSpacing: "0.16em" }}
                  >
                    STACK                  </p>
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="font-sans text-sm" style={{ color: C.slate }}>
                        Framework
                      </span>
                      <span className="font-sans text-sm text-right" style={{ color: C.ink }}>
                        React · Vite
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-sans text-sm" style={{ color: C.slate }}>
                        Styling
                      </span>
                      <span className="font-sans text-sm text-right" style={{ color: C.ink }}>
                        Tailwind · inline tokens
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WHAT THIS WOULD LOOK LIKE FOR YOU ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: C.hair, backgroundColor: C.paper }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28">
          <div className="max-w-2xl mb-14">
            <p
              className="font-sans text-xs mb-5"
              style={{ color: C.brand, letterSpacing: "0.18em" }}
            >
              IF THIS WERE YOUR SITE
            </p>
            <h2
              className="font-serif leading-tight"
              style={{ color: C.ink, fontSize: 44, letterSpacing: "-0.015em" }}
            >
              How a real engagement runs.
            </h2>
            <p
              className="font-sans text-base mt-5 leading-relaxed"
              style={{ color: C.slate }}
            >
              Five weeks end-to-end. Fixed scope, fixed price, one designer and one engineer.
              You own everything we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
            {engagement.map((e, i) => (
              <div
                key={e.label}
                style={{ borderTop: `1px solid ${C.hair}`, paddingTop: 28 }}
              >
                <p
                  className="font-sans text-[10px] mb-3"
                  style={{ color: C.brand, letterSpacing: "0.14em" }}
                >
                  {e.duration.toUpperCase()}
                </p>
                <h3
                  className="font-serif"
                  style={{ color: C.ink, fontSize: 22, letterSpacing: "-0.005em" }}
                >
                  {e.label}
                </h3>
                <p
                  className="font-sans text-sm mt-3 leading-relaxed"
                  style={{ color: C.slate }}
                >
                  {e.detail}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-16 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            style={{ borderTop: `1px solid ${C.hair}` }}
          >
            <p
              className="font-sans text-base max-w-xl"
              style={{ color: C.ink }}
            >
              Not every site needs five weeks. If you're not sure whether yours does, a
              15-minute call usually settles it.
            </p>
            <button
              className="font-sans text-sm font-medium px-7 py-3.5 transition-colors flex items-center gap-2 self-start md:self-auto"
              style={{
                backgroundColor: C.brand,
                color: C.paper,
                borderRadius: 6,
                letterSpacing: "0.02em",
              }}
            >
              Book a fit call <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- CLOSING ---------------- */}
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
              DESIGN SERVICE
            </span>
            <span
              className="font-sans text-[11px] hidden sm:inline"
              style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.22em" }}
            >
              OPEN TO NEW ENGAGEMENTS
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
              Think your site has
              <br />
              <span style={{ fontStyle: "italic" }}>the same problem?</span>
            </h2>

            <p
              className="font-sans mt-8 leading-relaxed max-w-xl"
              style={{ color: "rgba(255,255,255,0.62)", fontSize: 17 }}
            >
              We run the same five-week process on client engagements. If your product page
              isn't answering the questions your buyers actually ask, that's usually fixable in
              one sprint.
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
                Book a fit call
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  <ArrowRight size={15} />
                </span>
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-4 text-sm font-medium transition-colors"
                style={{
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#FFFFFF",
                  borderRadius: 6,
                  backgroundColor: "transparent",
                }}
              >
                See the live concept
              </button>
            </div>

            <div
              className="flex items-center gap-3 mt-14 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span
                className="font-sans text-xs"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Five-week redesign sprint · Fixed scope · Fixed price · Rate card on request
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}