import { PageShell } from "../components/PageShell";

export function BlogPage() {
  return (
    <PageShell
      eyebrow="Insights"
      title="Chalo Holiday Journal"
      description="Travel partner insights, destination direction, and practical operational thinking will be published here."
    >
      <div className="rounded-3xl border border-dashed border-gray-300 bg-[#FAFAFB] p-10 text-center">
        <h2
          className="text-2xl font-semibold text-gray-900"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          Articles Coming Soon
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-600">
          This section is reserved for destination trends, partner guidance, and
          travel operations updates relevant to agencies and professional buyers.
        </p>
      </div>
    </PageShell>
  );
}
