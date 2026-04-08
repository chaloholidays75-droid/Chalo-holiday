import { motion } from "motion/react";
import { Briefcase, FileBadge, ShieldCheck } from "lucide-react";
import { PageShell } from "../components/PageShell";

const pressKitSections = [
  {
    icon: Briefcase,
    title: "Insight into Our Vision and Operations",
    description:
      "A comprehensive overview of our business, including our mission, operational structure, and strategic direction, is available upon request for authorized partners and stakeholders.",
  },
  {
    icon: FileBadge,
    title: "Consistent Identity, Clear Communication",
    description:
      "Our brand guidelines, assets, and communication standards are available upon request to ensure alignment with authorized business and media partners.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Compliance and Industry Trust",
    description:
      "Our certifications, registrations, and compliance documents can be shared upon request with authorized entities for verification and partnership assurance.",
  },
];

export function PressKitPage() {
  return (
    <PageShell
      eyebrow="Company"
      title="Press Kit"
      description="Brand information, company references, and official summary material for business and media use."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {pressKitSections.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#E63946]/30 hover:shadow-xl"
          >
            <div className="mb-6 relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F5F5F7] transition-colors duration-300 group-hover:bg-[#E63946]">
                <item.icon className="h-7 w-7 text-[#E63946] transition-colors duration-300 group-hover:text-white" />
              </div>
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#F5D77E] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <h2
              className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#E63946]"
            >
              {item.title}
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              {item.description}
            </p>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E63946]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
