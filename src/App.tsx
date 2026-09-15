import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Pots from "./pages/Pots";
import HowItWorks from "./pages/HowItWorks";
import Business from "./pages/Business";
import CaseStudy from "./pages/CaseStudy";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "#FFFFFF", color: "#121216" }}>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business" element={<Business />} />
        <Route path="/pots" element={<Pots />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/business" element={<Business />} />
        <Route path="/case-studies/stoa" element={<CaseStudy />} />
      </Routes>
      <Footer />
    </div>
  );
}
