import { Send } from "lucide-react";

interface Props {
  formData: { name: string; phone: string; email: string; message: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactFormFields({ formData, onChange, onSubmit }: Props) {
  return (
    <div className="lg:col-span-7 bg-card rounded-[32px] p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-border/40">
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-sans text-xs text-muted-foreground font-medium pl-1">Name *</label>
            <input type="text" id="name" name="name" required placeholder="Your name" value={formData.name} onChange={onChange}
              className="h-12 w-full bg-background border border-border/50 rounded-xl px-4 font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-sans text-xs text-muted-foreground font-medium pl-1">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="+880" value={formData.phone} onChange={onChange}
              className="h-12 w-full bg-background border border-border/50 rounded-xl px-4 font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 transition-colors" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-sans text-xs text-muted-foreground font-medium pl-1">Email Address *</label>
          <input type="email" id="email" name="email" required placeholder="you@example.com" value={formData.email} onChange={onChange}
            className="h-12 w-full bg-background border border-border/50 rounded-xl px-4 font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 transition-colors" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-sans text-xs text-muted-foreground font-medium pl-1">Message</label>
          <textarea id="message" name="message" placeholder="How can we help?" value={formData.message} onChange={onChange}
            className="min-h-[120px] w-full bg-background border border-border/50 rounded-xl p-4 font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 transition-colors resize-y" />
        </div>

        <div className="mt-2">
          <button type="submit" className="inline-flex items-center gap-4 h-14 pl-6 pr-2 rounded-full bg-[#16100C] text-white hover:bg-[#2C241E] transition-colors group">
            <span className="font-sans text-sm font-semibold tracking-wide">Send Message</span>
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-[#16100C] transition-transform group-hover:scale-105">
              <Send className="size-4 ml-0.5" />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
