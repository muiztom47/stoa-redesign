import { useState } from "react";

const sections = [
  {
    t: "Start with the things you already pay for.",
    d: "Streaming, travel, everyday shopping, the tools you use for work — most people already spend on a fixed set of things every year. Stoa lets your savings cover that spending instead of sitting in an account earning very little.",
  },
  {
    t: "Choose your Pot.",
    d: "Every Pot pairs one perk with one deposit amount. Browse by category — streaming, travel, shopping, news, AI tools, digital security — and pick the one that matches what you already spend on.",
  },
  {
    t: "Deposit the amount shown.",
    d: "Each Pot has a specific deposit requirement, shown upfront with no surprises. You can fund more than one Pot at a time if you want more than one perk.",
  },
  {
    t: "Get your perk upfront.",
    d: "Once your deposit is confirmed, your perk is sent to you — most arrive as a digital code, ready to redeem straight away. A small number of perks need a brief manual step, which can add a little extra time.",
  },
  {
    t: "Your deposit stays protected.",
    d: "Your money is held in an account created for you at Griffin Bank, a UK-regulated bank. Eligible deposits of up to £120,000 per depositor are covered by the FSCS, the UK's deposit guarantee scheme.",
  },
  {
    t: "At the end of the term, choose what happens next.",
    d: "Every Pot runs for a fixed 12 months. When the term ends, you can renew to keep receiving the perk, or take your full deposit back — the choice is yours.",
  },
];

const faqs = [
  {
    q: "What is Stoa?",
    a: "Stoa turns your savings into lifestyle perks instead of cash interest. You choose a perk, deposit the amount shown, and receive the value upfront as a digital gift card once your deposit is confirmed.",
  },
  {
    q: "How does Stoa work?",
    a: "You pick your perks and make the deposit shown for each one. Once confirmed, the perks are sent to you upfront. Your money sits in an account held at Griffin Bank, and the value behind each perk comes from Stoa's banking and merchant partnerships rather than from your deposit itself.",
  },
  {
    q: "What's the catch?",
    a: "None that Stoa discloses beyond the mechanics above — pick a perk, deposit the amount shown, and the value is sent upfront once the deposit clears.",
  },
  {
    q: "How many Pots can I choose?",
    a: "As many as you like. Each perk you select opens its own Pot, and you can fund several Pots in a single deposit — your total deposit is simply the sum of what each chosen perk requires.",
  },
  {
    q: "How do I redeem my perks?",
    a: "Perks are sent by email and through the app once ready, along with redemption instructions for that specific merchant. You redeem the code directly with the merchant or service.",
  },
  {
    q: "When do I get my deposit back?",
    a: "Deposits are held for a fixed 12 months. As your term ends, you can renew for another 12 months or take your full deposit back if you don't.",
  },
];

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section className="border-b border-ink-700 bg-ink-900">
        <div className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-20">
          <h1 className="max-w-xl font-display text-4xl leading-tight text-stone-50 md:text-5xl">
            A different way to make your savings work for you.
          </h1>
        </div>
      </section>

      <section className="bg-stone-100 text-ink-900">
        <div className="mx-auto max-w-content px-6 py-16 md:px-10">
          <div className="space-y-14">
            {sections.map((s, i) => (
              <div key={s.t} className="grid gap-4 border-t border-stone-300 pt-8 md:grid-cols-[80px_1fr]">
                <div className="font-display text-sm text-stone-500">{String(i + 1).padStart(2, "0")}</div>
                <div className="max-w-xl">
                  <h2 className="font-display text-2xl">{s.t}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-700 bg-ink-900">
        <div className="mx-auto max-w-content px-6 py-16 md:px-10">
          <h2 className="font-display text-3xl text-stone-50">Frequently asked questions</h2>
          <div className="mt-10 divide-y divide-ink-700 border-t border-ink-700">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  className="focus-ring flex w-full items-center justify-between py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-display text-lg text-stone-50">{f.q}</span>
                  <span className="text-ink-500">{openFaq === i ? "–" : "+"}</span>
                </button>
                {openFaq === i && <p className="max-w-2xl pb-6 text-sm leading-relaxed text-stone-300">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
