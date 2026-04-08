import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <main className="bg-white pt-20">
      <section className="border-b border-gray-200 bg-gradient-to-br from-white via-[#F7F7F8] to-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-[#E8E8EA] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#E63946]">
              {eyebrow}
            </div>
            <h1
              className="mt-6 text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-gray-900 sm:text-6xl"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">{children}</div>
      </section>
    </main>
  );
}
