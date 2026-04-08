import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

type HeroProps = {
  onOpenPartnerModal: () => void;
};

export function Hero({ onOpenPartnerModal }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#F5F5F7] to-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1772354982639-5fdffe032394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBidXNpbmVzcyUyMHRyYXZlbCUyMGZpcnN0JTIwY2xhc3N8ZW58MXx8fHwxNzc1NTYwMzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury travel"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#E8E8EA] shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#E63946]" />
              <span className="text-sm text-gray-700">Trusted by 500+ Travel Partners</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-6">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-[-0.04em] text-gray-900"
                style={{ fontFamily: '"Poppins", sans-serif' }}
              >
                A Smarter Way to{" "}
                <span className="text-[#E63946]">Scale Your Travel Business</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Chalo Holiday empowers travel partners with seamless, reliable, and profitable solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                type="button"
                onClick={onOpenPartnerModal}
                className="group px-8 py-4 bg-[#E63946] text-white rounded-xl hover:bg-[#D62839] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#E63946]/20 flex items-center justify-center gap-2"
              >
                <span className="text-lg">Become a Partner</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                type="button"
                onClick={() => scrollToSection("solutions")}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl border-2 border-gray-200 hover:border-[#E63946] hover:text-[#E63946] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span className="text-lg">View Solutions</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
                { value: "500+", label: "Partners" },
                { value: "50K+", label: "Bookings" },
                { value: "98%", label: "Satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-3xl font-bold text-[#E63946]">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200/50">
                    <h3 className="text-xl font-semibold text-gray-900">Partner Dashboard</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  {/* Dashboard Preview */}
                  <div className="space-y-4">
                    <div className="h-24 bg-gradient-to-r from-[#E63946] to-[#D62839] rounded-xl p-4 flex items-center justify-between text-white">
                      <div>
                        <div className="text-sm opacity-90">Total Revenue</div>
                        <div className="text-2xl font-bold">₹12,45,000</div>
                      </div>
                      <div className="text-4xl">📈</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {["Active Bookings", "New Leads", "Confirmations", "Support"].map((item, i) => (
                        <div key={i} className="h-20 bg-white/60 backdrop-blur rounded-lg p-3 flex flex-col justify-between">
                          <div className="text-xs text-gray-600">{item}</div>
                          <div className="text-xl font-bold text-gray-900">{Math.floor(Math.random() * 100) + 10}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-[#F5D77E] rounded-2xl opacity-80 blur-xl"
              ></motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#E63946] rounded-2xl opacity-20 blur-2xl"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
