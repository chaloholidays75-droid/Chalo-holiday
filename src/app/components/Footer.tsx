import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Chalo Holiday</h3>
              <p className="text-gray-400 text-sm">Travel Solutions for Professionals</p>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering travel partners with seamless, reliable, and profitable solutions.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Instagram, label: "Instagram" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#E63946] hover:text-white transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Solutions</h4>
            <ul className="space-y-3">
              {[
                "B2B Travel Solutions",
                "Corporate Travel",
                "Custom Itineraries",
                "Booking Support",
                "Partner Portal",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Team",
                "Careers",
                "Blog",
                "Press Kit",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a href="mailto:partners@chaloholiday.com" className="text-gray-300 hover:text-white transition-colors">
                    partners@chaloholiday.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <a href="tel:+911234567890" className="text-gray-300 hover:text-white transition-colors">
                    +91 1234 567 890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-gray-300">Mumbai, India</p>
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
            <p>© {currentYear} ChaloHoliday. All rights reserved.</p>
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
            <a href="#" className="text-[#25D366] hover:underline">WhatsApp</a>
          </p>
        </div>
      </div>
    </footer>
  );
}