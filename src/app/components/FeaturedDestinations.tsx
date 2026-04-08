import { motion } from "motion/react";
import { MapPin } from "lucide-react";

const destinations = [
  {
    name: "London",
    subtitle: "Historic Elegance",
    image: "https://images.unsplash.com/photo-1757969687801-b4cc05ed65dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb25kb24lMjBCaWclMjBCZW4lMjBlbGVnYW50JTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3NTU2NDIyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Paris",
    subtitle: "City of Light",
    image: "https://images.unsplash.com/photo-1650540255382-e9fdf65415f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMEVpZmZlbCUyMFRvd2VyJTIwc3Vuc2V0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzU1NjQyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Edinburgh",
    subtitle: "Scottish Heritage",
    image: "https://images.unsplash.com/photo-1557096002-7f215e6b5dcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZGluYnVyZ2glMjBTY290bGFuZCUyMGNhc3RsZSUyMGhpc3RvcmljfGVufDF8fHx8MTc3NTU2NDIyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Amsterdam",
    subtitle: "Dutch Charm",
    image: "https://images.unsplash.com/photo-1674132496449-2c86aef190f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbXN0ZXJkYW0lMjBjYW5hbHMlMjBhcmNoaXRlY3R1cmUlMjBOZXRoZXJsYW5kc3xlbnwxfHx8fDE3NzU1NjQyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function FeaturedDestinations() {
  return (
    <section id="destinations" className="py-24 sm:py-32 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-[#E63946]">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600">
            Curated experiences across the world's most sought-after destinations.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
            >
              {/* Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="transform group-hover:translate-y-0 transition-transform duration-300"
                >
                  <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MapPin className="w-4 h-4 text-[#F5D77E]" />
                    <span
                      className="text-sm text-[#F5D77E]"
                      style={{ fontFamily: '"Manrope", sans-serif' }}
                    >
                      {destination.subtitle}
                    </span>
                  </div>
                  <h3
                    className="text-3xl font-bold text-white mb-2"
                    style={{ fontFamily: '"Manrope", sans-serif' }}
                  >
                    {destination.name}
                  </h3>
                  <div className="h-1 w-12 bg-[#E63946] rounded-full group-hover:w-20 transition-all duration-300"></div>
                </motion.div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-[#E63946] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Section Closing Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-12 max-w-3xl text-center"
        >
          <p className="text-lg leading-relaxed text-gray-600">
            Our destination portfolio empowers travel partners to offer premium travel
            solutions with reliable planning, thoughtfully curated experiences, and
            standardized service quality.
          </p>
          <div className="mt-8">
            <a
              href="/destinations"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#E63946] px-8 py-3.5 text-base font-semibold text-[#E63946] transition hover:bg-[#E63946] hover:text-white"
            >
              View All Destinations
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
