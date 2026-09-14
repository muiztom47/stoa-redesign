export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="mx-auto max-w-content px-6 py-14 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="font-display text-2xl italic text-stone-50">Stoa</div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-500">
              A speculative redesign concept created for a design portfolio. Not an official Stoa product.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <div className="text-stone-300">Product</div>
              <ul className="mt-3 space-y-2 text-ink-500">
                <li>Stoa Pots</li>
                <li>How it works</li>
                <li>Saving Score</li>
              </ul>
            </div>
            <div>
              <div className="text-stone-300">Company</div>
              <ul className="mt-3 space-y-2 text-ink-500">
                <li>About us</li>
                <li>Customer stories</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <div className="text-stone-300">Support</div>
              <ul className="mt-3 space-y-2 text-ink-500">
                <li>Help centre</li>
                <li>FSCS protection</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink-800 pt-6 text-xs text-ink-500 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Stoa (portfolio concept). Deposits illustrated at real published rates from stoa.money.</span>
          <span>Design concept by Muiz</span>
        </div>
      </div>
    </footer>
  );
}
