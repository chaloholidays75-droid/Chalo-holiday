import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const destinationPanels = [
  {
    title: "London",
    subtitle: "Historic Elegance",
    image:
      "https://images.unsplash.com/photo-1757969687801-b4cc05ed65dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb25kb24lMjBCaWclMjBCZW4lMjBlbGVnYW50JTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3NTU2NDIyN3ww&ixlib=rb-4.1.0&q=80&w=1200&utm_source=figma&utm_medium=referral",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Venice",
    subtitle: "Canal Evenings",
    image:
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW5pY2UlMjBjYW5hbHN8ZW58MXx8fHwxNzc1NTY0MjI3fDA&ixlib=rb-4.1.0&q=80&w=1200&utm_source=figma&utm_medium=referral",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Tokyo",
    subtitle: "City After Dark",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRvd2VyJTIwbmlnaHR8ZW58MXx8fHwxNzc1NTY0MjI3fDA&ixlib=rb-4.1.0&q=80&w=1200&utm_source=figma&utm_medium=referral",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Paris",
    subtitle: "Refined Escape",
    image:
      "https://images.unsplash.com/photo-1650540255382-e9fdf65415f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMEVpZmZlbCUyMFRvd2VyJTIwc3Vuc2V0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzU1NjQyMjh8MA&ixlib=rb-4.1.0&q=80&w=1200&utm_source=figma&utm_medium=referral",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Utah",
    subtitle: "Landscape Drama",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dGFoJTIwYXJjaHxlbnwxfHx8fDE3NzU1NjQyMjd8MA&ixlib=rb-4.1.0&q=80&w=1200&utm_source=figma&utm_medium=referral",
    className: "lg:col-span-1 lg:row-span-1",
  },
];

export function DestinationsPage() {
  return (
    <main className="overflow-hidden bg-[#05070B] pt-20 text-white">
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBuaWdodHxlbnwxfHx8fDE3NzU1NjQyMjd8MA&ixlib=rb-4.1.0&q=80&w=1800&utm_source=figma&utm_medium=referral"
            alt="Destination atmosphere"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,57,70,0.22),transparent_28%),linear-gradient(135deg,rgba(4,7,12,0.94),rgba(8,11,18,0.82)_42%,rgba(4,7,12,0.96))]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1500px] items-center gap-12 px-6 py-10 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
              Destination Portfolio
            </div>
            <h1
              className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Premium Destinations Framed for High-Value Travel Planning
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-slate-300 sm:text-xl">
              Explore a cinematic portfolio of destinations curated for travel partners
              who need stronger presentation, dependable planning, and memorable client
              experiences.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E63946] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#D62839]"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/18 px-8 py-4 text-base font-semibold text-white transition hover:bg-white hover:text-[#05070B]"
              >
                Back to Home
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
            className="grid auto-rows-[210px] gap-5 lg:grid-cols-4"
          >
            {destinationPanels.map((panel, index) => (
              <motion.div
                key={panel.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18 + index * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] ${panel.className}`}
              >
                <motion.img
                  src={panel.image}
                  alt={panel.title}
                  className="h-full w-full object-cover"
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 10 + index * 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/24 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/68">
                    {panel.subtitle}
                  </div>
                  <h2
                    className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white"
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                  >
                    {panel.title}
                  </h2>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
