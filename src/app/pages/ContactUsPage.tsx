import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PartnerEnquiryForm } from "../components/PartnerEnquiryForm";

export function ContactUsPage() {
  return (
    <main className="bg-white pt-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1774800879603-dced24dee8f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,7,11,0.76),rgba(5,7,11,0.58),rgba(230,57,70,0.32))]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/78">
              Contact
            </div>
            <h1
              className="mt-6 text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Contact Us
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              Connect with Chalo Holiday for hotel bookings, ground handling
              management, and travel partner support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div className="rounded-3xl border border-gray-200 bg-[#F7F7F8] p-8">
          <h2
            className="text-2xl font-semibold text-gray-900"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            Reach Our Team
          </h2>
          <div className="mt-6 space-y-6 text-gray-700">
            <div className="flex items-start gap-4">
              <MessageCircle className="mt-1 h-5 w-5 text-[#25D366]" />
              <div>
                <div className="text-sm font-medium text-gray-500">WhatsApp</div>
                <a
                  href="https://wa.me/447584321818"
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg text-gray-900 hover:text-[#25D366]"
                >
                  +44 7584 321818
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 text-[#E63946]" />
              <div>
                <div className="text-sm font-medium text-gray-500">Telephone</div>
                <a
                  href="tel:+442030049978"
                  className="text-lg text-gray-900 hover:text-[#E63946]"
                >
                  +44 (0) 2030049978
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 text-[#E63946]" />
              <div>
                <div className="text-sm font-medium text-gray-500">Email</div>
                <a
                  href="mailto:partners@chaloholiday.com"
                  className="block text-lg text-gray-900 hover:text-[#E63946]"
                >
                  partners@chaloholiday.com
                </a>
                <a
                  href="mailto:chaloholiday@hotmail.co.uk"
                  className="mt-1 block text-base text-gray-600 hover:text-[#E63946]"
                >
                  chaloholiday@hotmail.co.uk
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 text-[#E63946]" />
              <div>
                <div className="text-sm font-medium text-gray-500">Office Address</div>
                <p className="text-lg text-gray-900">
                  40 South Park Crescent, London - Ilford, IG11XU, England
                </p>
              </div>
            </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-200">
            <div className="inline-flex rounded-full border border-[#E63946]/15 bg-[#E63946]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#E63946]">
              Partner Enquiry
            </div>
            <h2
              className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-slate-900"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Start Your Partnership Conversation
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Share a few details about your agency or travel business. Our team will
              connect with you regarding onboarding, support, and travel operations
              requirements.
            </p>

            <div className="mt-8">
              <PartnerEnquiryForm successMode="inline" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
