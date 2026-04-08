import { PageShell } from "../components/PageShell";

export function CareersPage() {
  return (
    <PageShell
      eyebrow="Company"
      title="Careers"
      description="We value accountability, service quality, and partner-centric execution in travel operations."
    >
      <div className="max-w-3xl space-y-6 text-gray-700">
        <p className="text-lg leading-relaxed">
          Chalo Holiday continues to grow with opportunities across travel operations,
          partner servicing, coordination, and commercial support.
        </p>
        <p className="leading-relaxed">
          If your experience aligns with hotel bookings, ground handling, travel
          support, or B2B coordination, we welcome relevant profiles for future
          openings.
        </p>
      </div>
    </PageShell>
  );
}
