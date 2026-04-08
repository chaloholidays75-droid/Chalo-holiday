import { motion } from "motion/react";
import { Briefcase, Users, Map, Zap } from "lucide-react";

const solutions = [
  {
    icon: Briefcase,
    title: "B2B Travel Solutions",
    description: "Comprehensive travel solutions designed specifically for business partners and travel agents.",
  },
  {
    icon: Users,
    title: "Corporate Travel Management",
    description: "Streamline corporate bookings with dedicated account management and priority support.",
  },
  {
    icon: Map,
    title: "Custom Itinerary Engine",
    description: "Create personalized travel experiences with our intelligent itinerary planning tools.",
  },
  {
    icon: Zap,
    title: "Instant Booking Support",
    description: "Real-time confirmations with 24/7 technical and booking support for your clients.",
  },
];

export function CoreSolutions() {
  return (
    <section id="solutions" className="py-24 sm:py-32 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-gray-900 mb-4"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            Built for <span className="text-[#E63946]">Travel Professionals</span>
          </h2>
          <p className="text-xl text-gray-600">
            Powerful tools and solutions to help you grow and scale your travel business effortlessly.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#E63946]/30 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-6 relative">
                <div className="w-14 h-14 bg-[#F5F5F7] rounded-xl flex items-center justify-center group-hover:bg-[#E63946] transition-colors duration-300">
                  <solution.icon className="w-7 h-7 text-[#E63946] group-hover:text-white transition-colors duration-300" />
                </div>
                {/* Accent dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F5D77E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#E63946] transition-colors duration-300">
                  {solution.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {solution.description}
                </p>
              </div>

              {/* Hover Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E63946]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
