import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const links = [
  { label: "How it works", to: "/how-it-works" },
  { label: "Pots", to: "/pots" },
  { label: "About", to: "/" },
];

export default function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/60 bg-ink-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="font-display text-2xl italic text-stone-50">
          Stoa
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-5 text-sm text-stone-300">
            <span className="cursor-default text-stone-50">Personal</span>
            <span className="cursor-default text-ink-500">Business</span>
          </div>
          <div className="h-4 w-px bg-ink-700" />
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`focus-ring text-sm transition-colors ${
                location.pathname === l.to ? "text-stone-50" : "text-stone-300 hover:text-stone-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <span className="cursor-default text-sm text-stone-300">Log in</span>
          <Link
            to="/pots"
            className="focus-ring rounded-sm border border-brass-500 px-4 py-2 text-sm text-brass-400 transition-colors hover:bg-brass-500 hover:text-ink-950"
          >
            Open a Stoa Pot
          </Link>
        </div>

        <button
          className="focus-ring text-stone-50 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="block h-px w-6 bg-current" />
          <span className="mt-1.5 block h-px w-6 bg-current" />
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-700 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.label} to={l.to} className="text-sm text-stone-300" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link
              to="/pots"
              className="mt-2 w-fit rounded-sm border border-brass-500 px-4 py-2 text-sm text-brass-400"
              onClick={() => setOpen(false)}
            >
              Open a Stoa Pot
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
