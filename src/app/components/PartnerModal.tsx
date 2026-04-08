import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { PartnerEnquiryForm } from "./PartnerEnquiryForm";

type PartnerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PartnerModal({ open, onOpenChange }: PartnerModalProps) {
  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[min(1200px,96vw)] max-w-[min(1200px,96vw)] sm:max-w-[min(1200px,96vw)] rounded-3xl border-0 bg-white p-0 shadow-2xl">
        <div className="grid max-h-[92vh] overflow-auto rounded-3xl lg:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-[#0F172A] px-7 py-8 text-white">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/70">
              Partner Network
            </div>
            <DialogHeader className="mt-6 text-left">
              <DialogTitle className="text-3xl font-semibold tracking-tight text-white">
                Start Your Partnership Conversation
              </DialogTitle>
              <DialogDescription className="mt-3 text-base leading-relaxed text-slate-300">
                Share a few details about your agency or travel business. We will
                connect you with the right team for onboarding and partnership support.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                Dedicated B2B support and onboarding
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                Access to premium travel inventory and booking assistance
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                Faster confirmations and streamlined partner communication
              </div>
            </div>
          </div>

          <div className="px-9 py-8">
            <PartnerEnquiryForm successMode="replace" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
