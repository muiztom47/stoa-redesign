import { Link } from "react-router-dom";
import { pots } from "../data/pots";
import PotCard from "../components/PotCard";

const heroPots = pots.slice(0, 3);

const testimonials = [
  {
    quote:
      "Completely changed how I think about my savings — instead of sitting in an account earning next to nothing, the capital unlocks value from day one. Onboarding was smooth and the whole thing felt transparent.",
    name: "GDS",
  },
  {
    quote: "Redeemed an Amazon gift card the moment my deposit cleared — straightforward from start to finish.",
    name: "David B.",
  },
  {
    quote: "Deposit went in, my Waitrose perk landed right away. Every step of it felt properly professional.",
    name: "Laura",
  },
  {
    quote: "About as simple as it gets — deposited on a Monday, had my perk within days.",
    name: "Sara",
  },
];

const trustPartners = ["Griffin Bank", "Microsoft Azure", "HSBC", "Ashfords", "Shaw Gibbs"];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink-700 bg-ink-900">
        <div className="mx-auto grid max-w-content gap-14 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-28">
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-4xl leading-[1.08] text-stone-50 sm:text-5xl md:text-[3.4rem]">
              Your savings can do more than earn interest.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-300">
              Put your savings into a Stoa Pot and unlock the things you already pay for — streaming, travel,
              everyday essentials. Get the value upfront, while your deposit stays protected and comes back to you
              at the end of the term.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/pots"
                className="focus-ring bg-brass-500 px-6 py-3 text-sm font-medium text-ink-950 transition-colors hover:bg-brass-400"
              >
                Explore Stoa Pots
              </Link>
              <Link to="/how-it-works" className="focus-ring text-sm text-stone-300 underline decoration-ink-700 underline-offset-4 hover:text-stone-50">
                See how it works
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-2 text-xs text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
              Deposits held via Griffin Bank · eligible deposits FSCS protected
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-sm space-y-4">
              {heroPots.map((pot, i) => (
                <div
                  key={pot.brand}
                  className="border border-ink-700 bg-ink-800 p-5"
                  style={{ marginLeft: i % 2 === 1 ? "1.5rem" : 0 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base text-stone-50">{pot.brand}</span>
                    <span className="text-[11px] text-ink-500">{pot.category}</span>
                  </div>
                  <div className="mt-4 flex gap-6 text-sm">
                    <div>
                      <div className="text-[11px] text-ink-500">Perk value</div>
                      <div className="font-display text-brass-400">{pot.perkValue}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-ink-500">Deposit</div>
                      <div className="font-display text-stone-50">{pot.deposit}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-ink-500">Term</div>
                      <div className="font-display text-stone-50">12 mo</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE DIFFERENCE */}
      <section className="bg-stone-100 text-ink-900">
        <div className="mx-auto max-w-content px-6 py-20 md:px-10">
          <h2 className="max-w-xl font-display text-3xl leading-tight md:text-4xl">
            What if your savings paid for things you already use?
          </h2>
          <p className="mt-4 max-w-lg text-stone-700">
            A traditional savings account rewards you slowly, through interest. Stoa gives you the value upfront,
            in the form of perks you'd be paying for anyway.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div className="border border-stone-300 p-8">
              <div className="text-sm text-stone-500">Traditional savings</div>
              <ol className="mt-6 space-y-6">
                {["Deposit", "Wait", "Earn interest, slowly"].map((step) => (
                  <li key={step} className="flex items-center gap-4 text-stone-700">
                    <span className="h-px w-6 bg-stone-300" />
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="border border-ink-900 bg-ink-900 p-8 text-stone-100">
              <div className="text-sm text-brass-400">Stoa</div>
              <ol className="mt-6 space-y-6">
                {["Deposit", "Choose a perk", "Get the value upfront", "Deposit returned at term end"].map((step) => (
                  <li key={step} className="flex items-center gap-4">
                    <span className="h-px w-6 bg-brass-500" />
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="border-t border-ink-700 bg-ink-900">
        <div className="mx-auto max-w-content px-6 py-20 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-lg font-display text-3xl leading-tight text-stone-50 md:text-4xl">
              Choose what your savings can unlock.
            </h2>
            <span className="text-sm text-ink-500">32 Pots available</span>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pots.map((pot) => (
              <PotCard key={pot.brand} pot={pot} />
            ))}
          </div>

          <Link
            to="/pots"
            className="focus-ring mt-10 inline-block border border-ink-700 px-6 py-3 text-sm text-stone-300 transition-colors hover:border-brass-500 hover:text-brass-400"
          >
            Explore all Pots
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-stone-100 text-ink-900">
        <div className="mx-auto max-w-content px-6 py-20 md:px-10">
          <h2 className="max-w-xl font-display text-3xl leading-tight md:text-4xl">
            Your money. Your perk. One simple cycle.
          </h2>

          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-4">
            {[
              { n: "01", t: "Choose your perk", d: "Pick from subscriptions, travel, shopping and other everyday benefits." },
              { n: "02", t: "Set up your Pot", d: "Open the Pot and deposit the amount shown for that perk." },
              { n: "03", t: "Get your perk", d: "Receive the value upfront once your deposit is confirmed." },
              { n: "04", t: "Get your deposit back", d: "At the end of the 12-month term, renew or take your deposit back." },
            ].map((step) => (
              <div key={step.n} className="border-t border-stone-300 pt-5">
                <div className="font-display text-sm text-stone-500">{step.n}</div>
                <div className="mt-3 font-display text-lg">{step.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS TO YOUR MONEY */}
      <section className="border-t border-ink-700 bg-ink-950">
        <div className="mx-auto max-w-content px-6 py-20 md:px-10">
          <h2 className="max-w-xl font-display text-3xl leading-tight text-stone-50 md:text-4xl">
            Built around your money, not just your perks.
          </h2>
          <p className="mt-4 max-w-lg text-stone-300">
            This is a financial product first. Here's exactly where your deposit sits, and when it comes back.
          </p>

          <div className="mt-14 flex flex-col gap-0 overflow-x-auto md:flex-row md:items-stretch">
            {["Your deposit", "Held via Griffin Bank", "Funds your Stoa Pot", "Perk unlocked", "12-month term", "Deposit returned"].map(
              (step, i, arr) => (
                <div key={step} className="flex items-stretch">
                  <div className="flex min-w-[150px] flex-col justify-center border border-ink-700 px-5 py-6 text-sm text-stone-200">
                    {step}
                  </div>
                  {i < arr.length - 1 && <div className="flex w-8 items-center justify-center text-ink-500">→</div>}
                </div>
              )
            )}
          </div>

          <p className="mt-10 max-w-lg text-sm leading-relaxed text-ink-500">
            Deposits are held through Griffin Bank, a UK-regulated bank. Eligible deposits of up to £120,000 per
            depositor are covered by the FSCS, the UK's deposit guarantee scheme. Your deposit is held for the
            fixed term and returned in full at the end of it, unless you choose to renew.
          </p>
        </div>
      </section>

      {/* WHY STOA */}
      <section className="bg-stone-100 text-ink-900">
        <div className="mx-auto max-w-content px-6 py-20 md:px-10">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { t: "Get value upfront", d: "Receive a meaningful benefit from day one, rather than watching interest accumulate slowly." },
              { t: "Use your savings differently", d: "Choose perks connected to things you already spend money on, month after month." },
              { t: "Stay in control", d: "Your deposit remains yours, and is returned to you at the end of the fixed term." },
            ].map((item) => (
              <div key={item.t} className="border-t border-stone-300 pt-5">
                <div className="font-display text-lg">{item.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-t border-ink-700 bg-ink-900">
        <div className="mx-auto max-w-content px-6 py-16 md:px-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="text-sm text-ink-500">Built on infrastructure you already trust</div>
              <div className="mt-2 text-sm text-stone-300">Eligible deposits are FSCS protected, up to £120,000 per depositor.</div>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {trustPartners.map((p) => (
                <span key={p} className="font-display text-base text-stone-400">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-stone-100 text-ink-900">
        <div className="mx-auto max-w-content px-6 py-20 md:px-10">
          <h2 className="font-display text-3xl md:text-4xl">What people say after they deposit.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.name} className="border-t border-stone-300 pt-6">
                <p className="font-display text-lg leading-snug">"{t.quote}"</p>
                <div className="mt-4 text-sm text-stone-500">{t.name}, Stoa customer</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-ink-700 bg-ink-950">
        <div className="mx-auto max-w-content px-6 py-24 text-center md:px-10">
          <h2 className="mx-auto max-w-xl font-display text-3xl leading-tight text-stone-50 md:text-4xl">
            Make more of the money you already have.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-stone-300">
            Choose a Stoa Pot, unlock your perk, and put your savings to work in a different way.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
            <Link
              to="/pots"
              className="focus-ring bg-brass-500 px-6 py-3 text-sm font-medium text-ink-950 transition-colors hover:bg-brass-400"
            >
              Explore Stoa Pots
            </Link>
            <Link to="/how-it-works" className="focus-ring text-sm text-stone-300 underline decoration-ink-700 underline-offset-4 hover:text-stone-50">
              How Stoa works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
