import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CoreSolutions } from "./components/CoreSolutions";
import { Differentiation } from "./components/Differentiation";
import { FeaturedDestinations } from "./components/FeaturedDestinations";
import { PremiumCTA } from "./components/PremiumCTA";
import { Footer } from "./components/Footer";
import { PartnerModal } from "./components/PartnerModal";
import { AboutUsPage } from "./pages/AboutUsPage";
import { BlogPage } from "./pages/BlogPage";
import { CareersPage } from "./pages/CareersPage";
import { ContactUsPage } from "./pages/ContactUsPage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { PressKitPage } from "./pages/PressKitPage";
import { TeamPage } from "./pages/TeamPage";

function renderPage(pathname: string, onOpenPartnerModal: () => void) {
  switch (pathname) {
    case "/about-us":
      return <AboutUsPage />;
    case "/our-team":
      return <TeamPage />;
    case "/careers":
      return <CareersPage />;
    case "/contact-us":
      return <ContactUsPage />;
    case "/destinations":
      return <DestinationsPage />;
    case "/blog":
      return <BlogPage />;
    case "/press-kit":
      return <PressKitPage />;
    default:
      return (
        <main className="pt-20">
          <Hero onOpenPartnerModal={onOpenPartnerModal} />
          <CoreSolutions />
          <Differentiation onOpenPartnerModal={onOpenPartnerModal} />
          <FeaturedDestinations />
          <PremiumCTA onOpenPartnerModal={onOpenPartnerModal} />
        </main>
      );
  }
}

export default function App() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const pathname = window.location.pathname;

  useEffect(() => {
    if (pathname !== "/") {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (!window.location.hash) {
      return;
    }

    const id = window.location.hash.replace("#", "");
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    const timeout = window.setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenPartnerModal={() => setIsPartnerModalOpen(true)} />
      {renderPage(pathname, () => setIsPartnerModalOpen(true))}
      <Footer />
      <PartnerModal
        open={isPartnerModalOpen}
        onOpenChange={setIsPartnerModalOpen}
      />
    </div>
  );
}
