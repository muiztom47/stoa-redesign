import { useState } from "react";
import { pots, categories } from "../data/pots";
import PotCard from "../components/PotCard";

export default function Pots() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = active === "All" ? pots : pots.filter((p) => p.category === active);
  const featured = pots[0];

  return (
    <>
      <section className="border-b border-ink-700 bg-ink-900">
        <div className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-20">
          <h1 className="max-w-xl font-display text-4xl leading-tight text-stone-50 md:text-5xl">
            Find a Stoa Pot that fits your life.
          </h1>
          <p className="mt-5 max-w-lg text-stone-300">
            Each Pot pairs a specific deposit with a perk you receive upfront. Choose one, deposit the amount
            shown, and get the value straight away — your deposit comes back at the end of the fixed 12-month term.
          </p>
        </div>
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-content px-6 md:px-10">
          <div className="flex flex-wrap gap-2 border-b border-ink-700 pb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`focus-ring border px-4 py-1.5 text-sm transition-colors ${
                  active === c
                    ? "border-brass-500 text-brass-400"
                    : "border-ink-700 text-stone-300 hover:border-stone-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-b border-ink-700 bg-ink-900">
        <div className="mx-auto max-w-content px-6 py-14 md:px-10">
          <div className="text-sm text-ink-500">Featured Pot</div>
          <div className="mt-5 grid gap-8 border border-ink-700 bg-ink-800 p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="font-display text-2xl text-stone-50">{featured.brand} — {featured.plan}</div>
              <div className="mt-4 flex gap-10 text-sm">
                <div>
                  <div className="text-ink-500">Perk value</div>
                  <div className="mt-1 font-display text-lg text-brass-400">{featured.perkValue}</div>
                </div>
                <div>
                  <div className="text-ink-500">Deposit</div>
                  <div className="mt-1 font-display text-lg text-stone-50">{featured.deposit}</div>
                </div>
                <div>
                  <div className="text-ink-500">Term</div>
                  <div className="mt-1 font-display text-lg text-stone-50">12 months</div>
                </div>
              </div>
            </div>
            <button className="focus-ring border border-brass-500 px-6 py-3 text-sm text-brass-400 transition-colors hover:bg-brass-500 hover:text-ink-950">
              Unlock this Pot
            </button>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-ink-900">
        <div className="mx-auto max-w-content px-6 py-16 md:px-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pot) => (
              <PotCard key={pot.brand} pot={pot} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-sm text-ink-500">No Pots in this category yet — check back soon.</p>
          )}
        </div>
      </section>

      {/* HOW PODS WORK */}
      <section className="border-t border-ink-700 bg-stone-100 text-ink-900">
        <div className="mx-auto max-w-content px-6 py-16 md:px-10">
          <h2 className="font-display text-2xl">How Pots work</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Choose a perk.", "Deposit the required amount.", "Receive the perk upfront.", "Get your deposit back after the term."].map(
              (s, i) => (
                <div key={s} className="border-t border-stone-300 pt-4 text-sm text-stone-700">
                  <span className="text-stone-400">{i + 1}.</span> {s}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
