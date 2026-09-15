import React from "react";
import { useNavigate } from "react-router-dom";

const C = {
  ink: "#FFFFFF",
  paper: "#0D1116",
  paper2: "#11151A",
  slate: "rgba(255,255,255,0.62)",
  faint: "rgba(255,255,255,0.42)",
  hair: "rgba(255,255,255,0.08)",
  hairStrong: "rgba(255,255,255,0.14)",
  brand: "#FFFFFF",
};

const StoaLogo =
  "https://cdn.prod.website-files.com/666c0d22b96d40ee9bec9c0c/69e10e59acc70c12e83b7de7_Stoa%20Logo.svg";

export default function Footer() {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Product",
      links: [
        { label: "Pots", to: "/pots" },
        { label: "How it works", to: "/how-it-works" },
        { label: "The numbers", to: "/" },
      ],
    },
    {
      title: "Business",
      links: [
        { label: "Business Pots", to: "/business" },
        { label: "Treasury", to: "/business" },
        { label: "Speak to the team", to: "/business" },
      ],
    },
    {
      title: "Trust",
      links: [
        { label: "FSCS protection", to: "/" },
        { label: "Griffin Bank", to: "/" },
        { label: "Security", to: "/" },
      ],
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: C.paper,
        borderTop: `1px solid ${C.hair}`,
        color: C.ink,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-[1.2fr_2fr] gap-16 lg:gap-24">
          {/* brand block */}
          <div>
            <img
              src={StoaLogo}
              alt="Stoa"
              style={{
                height: 24,
                width: "auto",
                display: "block",
                filter: "brightness(0) invert(1)",
              }}
            />
            <p
              className="font-sans text-sm mt-6 max-w-xs leading-relaxed"
              style={{ color: C.slate }}
            >
              A concept redesign by{" "}
              <a
                href="https://www.seo-growup.com/?utm_source=stoa-github&utm_medium=referral&utm_campaign=stoa-case-study"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: C.ink,
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                GrowUp
              </a>
              .
              <br />
              Not affiliated with Stoa.
            </p>

            <button
              onClick={() => navigate("/case-studies/stoa")}
              className="font-sans text-xs inline-flex items-center gap-1.5 mt-4 transition-opacity hover:opacity-70"
              style={{ color: C.faint, letterSpacing: "0.04em", background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              See the thinking →
            </button>
          </div>

          {/* columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p
                  className="font-sans text-xs mb-4"
                  style={{
                    color: C.ink,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <button
                        onClick={() => navigate(l.to)}
                        className="font-sans text-sm text-left transition-opacity hover:opacity-60"
                        style={{ color: C.slate }}
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom rule */}
        <div
          className="mt-14 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ borderTop: `1px solid ${C.hair}` }}
        >
          <span className="font-sans text-xs" style={{ color: C.faint }}>
            © 2026 · Rates illustrated from stoa.money
          </span>
          <a
            href="https://www.seo-growup.com/?utm_source=stoa-github&utm_medium=referral&utm_campaign=stoa-case-study"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs transition-opacity hover:opacity-70"
            style={{ color: C.faint }}
          >
            Design concept by GrowUp
          </a>
        </div>
      </div>
    </footer>
  );
}