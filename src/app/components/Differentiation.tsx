import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  {
    title: "Faster Confirmations",
    description: "Get instant booking confirmations with our automated system and dedicated support team.",
  },
  {
    title: "Better Margins for Agents",
    description: "Competitive pricing structure designed to maximize your profitability on every booking.",
  },
  {
    title: "Dedicated Support",
    description: "24/7 priority support with dedicated account managers for all your business needs.",
  },
  {
    title: "Global Inventory",
    description: "Access to extensive inventory of flights, hotels, and experiences across the globe.",
  },
];

type DifferentiationProps = {
  onOpenPartnerModal: () => void;
};

export function Differentiation({ onOpenPartnerModal }: DifferentiationProps) {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#F5F5F7] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2
                className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-gray-900"
                style={{ fontFamily: '"Poppins", sans-serif' }}
              >
                Why <span className="text-[#E63946]">Chalo Holiday</span>
              </h2>
              <p
                className="text-xl text-gray-600 leading-relaxed"
                style={{ fontFamily: '"Manrope", sans-serif' }}
              >
                We understand the challenges travel professionals face. That's why we've built a platform that puts your success first.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-[#E63946] rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3
                      className="text-xl font-semibold text-gray-900 group-hover:text-[#E63946] transition-colors duration-300"
                      style={{ fontFamily: '"Manrope", sans-serif' }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-gray-600 leading-relaxed"
                      style={{ fontFamily: '"Manrope", sans-serif' }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                type="button"
                onClick={onOpenPartnerModal}
                className="px-8 py-4 bg-[#E63946] text-white rounded-xl hover:bg-[#D62839] transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ fontFamily: '"Manrope", sans-serif' }}
              >
                <span className="text-lg">Register as a Partner to Explore All Benefits</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1758518726869-01aff69a56e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBtZWV0aW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NTU2MDM1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional team collaboration"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E63946]/20 to-transparent"></div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 max-w-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#E63946] rounded-xl flex items-center justify-center text-2xl">
                  🎯
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Partner Retention Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-[#F5D77E] rounded-3xl opacity-60 blur-2xl"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
