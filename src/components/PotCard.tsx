import type { Pot } from "../data/pots";

export default function PotCard({ pot, featured = false }: { pot: Pot; featured?: boolean }) {
  return (
    <div
      className={`group flex h-full flex-col justify-between border border-ink-700 p-6 transition-colors hover:border-brass-500/60 ${
        featured ? "bg-ink-800" : "bg-ink-900"
      }`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div>
            <div className="font-display text-lg text-stone-50">{pot.brand}</div>
            <div className="mt-0.5 text-xs text-ink-500">{pot.plan}</div>
          </div>
          <span className="border border-ink-700 px-2 py-1 text-[11px] text-stone-300">{pot.category}</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-700 pt-4 text-sm">
          <div>
            <div className="text-ink-500">Perk value</div>
            <div className="mt-1 font-display text-base text-brass-400">{pot.perkValue}</div>
          </div>
          <div>
            <div className="text-ink-500">Deposit</div>
            <div className="mt-1 font-display text-base text-stone-50">{pot.deposit}</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-ink-500">Fixed 12-month term</div>
      </div>

      <button className="focus-ring mt-6 w-full border border-ink-700 py-2 text-sm text-stone-300 transition-colors group-hover:border-brass-500 group-hover:text-brass-400">
        View Pot
      </button>
    </div>
  );
}
