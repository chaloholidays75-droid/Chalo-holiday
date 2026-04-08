import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const solutionLinks = [
    { label: "B2B Travel Solutions", id: "solutions" },
    { label: "Corporate Travel", id: "solutions" },
    { label: "Custom Itineraries", id: "solutions" },
    { label: "Booking Support", id: "contact" },
    { label: "Partner Portal", id: "contact" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Our Team", href: "/our-team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press Kit", href: "/press-kit" },
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 scroll-mt-24">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid items-start gap-12 md:grid-cols-2 lg:grid-cols-[1.15fr_0.9fr_0.9fr_1.35fr]">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Chalo Holiday</h3>
              <p className="text-gray-400 text-sm">Travel Solutions for Professionals</p>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering travel partners with seamless, reliable, and profitable solutions.
            </p>
            <div className="space-y-2 text-sm leading-relaxed text-gray-400">
              <p>Expertise in Hotel Bookings and Ground Handling Management</p>
              <p>
                IATA (TIDS) 96-016351 | Company Registration number 07303708 | VAT #
                132842918
              </p>
              <p>
                Web:{" "}
                <a
                  href="http://chaloholidaysonline.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  chaloholidaysonline.com
                </a>
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/" },
                { icon: Twitter, label: "Twitter", href: "https://x.com/" },
                { icon: Linkedin, label: "LinkedIn", href: "https://in.linkedin.com/" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#E63946] hover:text-white transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="flex flex-col">
            <h4 className="mb-4 min-h-[28px] text-lg font-semibold text-white">Solutions</h4>
            <ul className="space-y-3">
              {solutionLinks.map((item, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="inline-flex w-full rounded-xl px-3 py-2 text-left text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white hover:translate-x-1"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="mb-4 min-h-[28px] text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h4 className="mb-4 min-h-[28px] text-lg font-semibold text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
                  <a
                    href="https://wa.me/447584321818"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +44 7584 321818
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a href="mailto:partners@chaloholiday.com" className="text-gray-300 hover:text-white transition-colors">
                    partners@chaloholiday.com
                  </a>
                  <p className="mt-1 text-sm text-gray-400">
                    Alternative:{" "}
                    <a
                      href="mailto:chaloholiday@hotmail.co.uk"
                      className="hover:text-white transition-colors"
                    >
                      chaloholiday@hotmail.co.uk
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <a href="tel:+442030049978" className="text-gray-300 hover:text-white transition-colors">
                    +44 (0) 2030049978
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Office Address</p>
                  <p className="text-gray-300">
                    40 South Park Crescent, London - Ilford, IG11XU, England
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {currentYear} Chalo Holiday. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Integration Note */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <p className="text-center text-sm text-gray-600">
            Need immediate assistance? Connect with us on{" "}
            <a
              href="https://wa.me/447584321818"
              target="_blank"
              rel="noreferrer"
              className="text-[#25D366] hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
