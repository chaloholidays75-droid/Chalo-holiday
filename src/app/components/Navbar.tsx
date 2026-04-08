import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  onOpenPartnerModal: () => void;
};

export function Navbar({ onOpenPartnerModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = window.location.pathname === "/";

  const navLinks = [
    { name: "Solutions", id: "solutions" },
    { name: "Destinations", id: "destinations" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact-us" },
  ];

  const scrollToSection = (id: string) => {
    if (id === "contact-us") {
      window.location.href = "/contact-us";
      return;
    }

    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => {
              if (isHomePage) {
                scrollToSection("home");
                return;
              }
              window.location.href = "/";
            }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-[#E63946] rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">CH</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Chalo Holiday</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 hover:text-[#E63946] transition-colors duration-300 font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* <button className="px-6 py-2.5 text-gray-700 hover:text-[#E63946] transition-colors duration-300 font-medium">
              Login
            </button> */}
            <button
              type="button"
              onClick={onOpenPartnerModal}
              className="px-6 py-2.5 bg-[#E63946] text-white rounded-lg hover:bg-[#D62839] transition-all duration-300 shadow-sm hover:shadow-md font-medium"
            >
              Become a Partner
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#E63946] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="block py-2 text-gray-700 hover:text-[#E63946] transition-colors duration-300 font-medium"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 space-y-3 border-t border-gray-200">
              {/* <button className="w-full py-2.5 text-gray-700 hover:text-[#E63946] transition-colors duration-300 font-medium">
                Login
              </button> */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenPartnerModal();
                }}
                className="w-full py-2.5 bg-[#E63946] text-white rounded-lg hover:bg-[#D62839] transition-all duration-300 font-medium"
              >
                Become a Partner
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
