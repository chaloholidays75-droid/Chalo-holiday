import { PageShell } from "../components/PageShell";

const focusAreas = [
  "Partner relationship management",
  "Hotel booking coordination",
  "Ground handling execution",
  "Operational support and escalation",
];

export function TeamPage() {
  return (
    <PageShell
      eyebrow="Company"
      title="Our Team"
      description="Our team is structured around responsive partner support, efficient coordination, and practical problem-solving for travel businesses."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {focusAreas.map((area) => (
          <div
            key={area}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            <h2
              className="text-2xl font-semibold text-gray-900"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              {area}
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Built to support travel partners with clear communication, faster
              turnaround, and dependable execution where service quality matters.
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
