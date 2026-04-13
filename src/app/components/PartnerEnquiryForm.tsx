import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const PARTNER_ENQUIRY_DRAFT_KEY = "partner_enquiry_draft_v1";

const initialFormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  message: "",
};

type PartnerEnquiryFormProps = {
  successMode?: "inline" | "replace";
  onSuccess?: () => void;
};

export function PartnerEnquiryForm({
  successMode = "replace",
  onSuccess,
}: PartnerEnquiryFormProps) {
  const [formData, setFormData] = useState(() => {
    if (typeof window === "undefined") {
      return initialFormData;
    }

    try {
      const saved = window.localStorage.getItem(PARTNER_ENQUIRY_DRAFT_KEY);
      if (!saved) {
        return initialFormData;
      }

      const parsed = JSON.parse(saved);
      return {
        ...initialFormData,
        ...(typeof parsed === "object" && parsed ? parsed : {}),
      };
    } catch {
      return initialFormData;
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        PARTNER_ENQUIRY_DRAFT_KEY,
        JSON.stringify(formData),
      );
    } catch {
      // Ignore storage failures and keep the form usable.
    }
  }, [formData]);

  const handleFieldChange =
    (field: keyof typeof initialFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let result: unknown = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          result = { error: responseText };
        }
      }

      if (!response.ok) {
        console.error("Partner enquiry request failed", {
          status: response.status,
          statusText: response.statusText,
          response: result,
          submittedFields: {
            fullNamePresent: Boolean(formData.fullName),
            companyNamePresent: Boolean(formData.companyName),
            emailPresent: Boolean(formData.email),
            phonePresent: Boolean(formData.phone),
            messagePresent: Boolean(formData.message),
          },
        });
        throw new Error(
          typeof result === "object" && result && "error" in result
            ? String(result.error)
            : "Failed to send enquiry.",
        );
      }

      setFeedback({
        type: "success",
        message:
          "Your partner enquiry has been submitted successfully. Our team will contact you shortly.",
      });
      setFormData(initialFormData);
      if (typeof window !== "undefined") {
        try {
          window.localStorage.removeItem(PARTNER_ENQUIRY_DRAFT_KEY);
        } catch {
          // Ignore storage cleanup failures.
        }
      }
      onSuccess?.();
    } catch (error) {
      console.error("Partner enquiry submit error", error);
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send your enquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (feedback?.type === "success" && successMode === "replace") {
    return (
      <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h3 className="mt-6 text-3xl font-semibold text-slate-900">
          Enquiry Submitted Successfully
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600">
          Thank you for your interest in partnering with Chalo Holiday. Our team will
          review your enquiry and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-800">
          Full Name
        </label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={handleFieldChange("fullName")}
          placeholder="Enter your full name"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/15"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-800">
          Company Name
        </label>
        <input
          type="text"
          required
          value={formData.companyName}
          onChange={handleFieldChange("companyName")}
          placeholder="Enter your company or agency name"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/15"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-800">
          Business Email
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={handleFieldChange("email")}
          placeholder="Enter your business email address"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/15"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-800">
          Contact Number
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={handleFieldChange("phone")}
          placeholder="Enter your direct contact number"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/15"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-800">
          Business Requirement
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={handleFieldChange("message")}
          placeholder="Tell us about your travel business, partnership goals, and support requirements"
          className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/15"
        />
      </div>

      {feedback?.type === "error" && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {feedback.message}
        </div>
      )}

      {feedback?.type === "success" && successMode === "inline" && (
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {feedback.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E63946] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#D62839] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting Enquiry...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Submit Partner Enquiry
          </>
        )}
      </button>
    </form>
  );
}
