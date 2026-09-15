import React, { useState, useEffect } from "react";
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

  const [activeSection, setActiveSection] = useState("");

  // Personal nav links
  const personalLinks = [
    { label: "The Numbers", id: "calculator" },
    { label: "Pots", id: "pots" },
        { label: "Trust & Security", id: "trust" },
    { label: "Customer Stories", id: "customer-stories" },
    { label: "FAQ", id: "faq" },
  ];

  // Business nav links
  const businessLinks = [
    { label: "The Numbers", id: "calculator" },
    { label: "Catalogue", id: "pots" },
        { label: "Trust & Security", id: "trust" },
    { label: "Customer Stories", id: "customer-stories" },
    { label: "FAQ", id: "faq" },
  ];

  const links = isBusiness ? businessLinks : personalLinks;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll spy — tracks which section is currently in view
  useEffect(() => {
    const ids = links.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      () => {
        // Ask the DOM directly: which tracked section is highest
        // but still below the sticky nav?
        const navOffset = 96;
        const candidates = sections
          .filter((s): s is HTMLElement => s !== null)
          .map((s) => ({
            id: s.id,
            top: s.getBoundingClientRect().top,
          }))
          .filter((s) => s.top <= navOffset + 40)   // has crossed the nav
          .sort((a, b) => b.top - a.top);           // closest to nav wins

        if (candidates.length) {
          setActiveSection(candidates[0].id);
        } else {
          setActiveSection("");
        }
      },
      {
        rootMargin: "-96px 0px -40% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));

    // Clear highlight when scrolled back to the very top
    const handleScroll = () => {
      if (window.scrollY < 120) setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      sections.forEach((s) => observer.unobserve(s));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

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
                  onClick={() => {
                    const target = s === "Business" ? "/business" : "/";
                    navigate(target);
                  }}
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
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <button
                key={l.label}
                onClick={() => scrollTo(l.id)}
                className="transition-colors"
                style={{
                  color: isActive ? C.brand : C.slate,
                  fontWeight: isActive ? 600 : 500,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = C.ink;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = C.slate;
                }}
              >
                {l.label}
              </button>
            );
          })}
        </div>

        {/* RIGHT — CTA */}
     <a
          href={
            isBusiness
              ? "https://app.stoa.money/business/available-pots"
              : "https://app.stoa.money/personal/available-pots?_gl=1*179a2cm*_gcl_au*MTA1MjY0ODk5MC4xNzg5NDE1MzU2"
          }
          
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium px-5 py-2.5 transition-colors inline-block"
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
        >
          {isBusiness ? "Open a Business Pot" : "Open a Pot"}
        </a>
      </div>
    </nav>
  );
}