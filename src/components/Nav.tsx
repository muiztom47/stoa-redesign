import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* Design tokens — same as Home */
const C = {
  ink: "#121216",
  paper: "#FFFFFF",
  slate: "#5B6472",
  brand: "#3B28CC",
  brandDark: "#2F20A3",
  brass: "#3B28CC",
  hair: "#E4E2E8",
};

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isBusiness = location.pathname.startsWith("/business");

  // Personal nav links
  const personalLinks = [
    { label: "The numbers", id: "calculator" },
    { label: "Pots", id: "pots" },
    { label: "Trust & security", id: "trust" },
    { label: "FAQ", id: "faq" },
  ];

  // Business nav links
  const businessLinks = [
    { label: "Why Stoa", id: "why" },
    { label: "The numbers", id: "calculator" },
    { label: "Catalogue", id: "pots" },
    { label: "Trust & security", id: "trust" },
    { label: "FAQ", id: "faq" },
  ];

  const links = isBusiness ? businessLinks : personalLinks;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="sticky top-0 z-50 font-sans"
      style={{
        backgroundColor: `${C.paper}F2`,
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${C.hair}`,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-5 flex items-center justify-between">
        {/* LEFT — wordmark + tabs */}
        <div className="flex items-center gap-10">
         
       <img
  src="https://cdn.prod.website-files.com/666c0d22b96d40ee9bec9c0c/69e10e59acc70c12e83b7de7_Stoa%20Logo.svg"
  alt="Stoa"
  onClick={() => navigate("/")}
  style={{
    height: 28,
    width: "auto",
    cursor: "pointer",
    display: "block",
  }}
/>

          <div
            className="hidden md:flex items-center text-sm"
            style={{ color: C.slate }}
          >
            {["Personal", "Business"].map((s) => {
              const isActive = s === "Business" ? isBusiness : !isBusiness;
              return (
                <button
                  key={s}
                  onClick={() => navigate(s === "Business" ? "/business" : "/")}
                  className="px-3 py-1.5 transition-colors"
                  style={{
                    color: isActive ? C.ink : C.slate,
                    borderBottom: isActive
                      ? `1px solid ${C.brass}`
                      : "1px solid transparent",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* MIDDLE — page anchors */}
        <div
          className="hidden lg:flex items-center gap-8 text-sm"
          style={{ color: C.slate }}
        >
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.id)}
              className="hover:opacity-70 transition-opacity"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* RIGHT — CTA */}
        <button
          className="text-sm font-medium px-5 py-2.5 transition-colors"
          style={{
            backgroundColor: C.brand,
            color: C.paper,
            borderRadius: 4,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = C.brandDark)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = C.brand)
          }
          onClick={() => scrollTo("pots")}
        >
          {isBusiness ? "Open a Business Pot" : "Open a Pot"}
        </button>
      </div>
    </nav>
  );
}