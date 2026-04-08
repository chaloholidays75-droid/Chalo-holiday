import { PageShell } from "../components/PageShell";

export function AboutUsPage() {
  return (
    <PageShell
      eyebrow="Company"
      title="About Chalo Holiday"
      description="Chalo Holiday supports travel professionals with dependable execution, partner-first service, and practical commercial value."
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            We work with travel partners who need more than access. They need an
            experienced team that can support bookings, coordinate ground services,
            and help them deliver a reliable client experience.
          </p>
          <p className="leading-relaxed">
            Our business is built around responsiveness, service quality, and
            practical travel operations support for agencies and professional buyers.
          </p>
          <p className="leading-relaxed">
            Chalo Holiday combines commercial understanding with operational
            discipline, helping partners serve clients with greater confidence.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-[#F7F7F8] p-8">
          <h2
            className="text-2xl font-semibold text-gray-900"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            Company Snapshot
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600">
            <p>Expertise in Hotel Bookings and Ground Handling Management</p>
            <p>IATA (TIDS) 96-016351</p>
            <p>Company Registration Number 07303708</p>
            <p>VAT Number 132842918</p>
            <p>Serving international travel partners from London.</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
