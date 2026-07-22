import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";

const CONTACT_INFO = [
  { icon: MessageCircle, label: "WhatsApp", value: "+880 1577147480" },
  { icon: Mail, label: "Email", value: "ibrahimux6@gmail.com" },
  { icon: MapPin, label: "Address", value: "House 14, Road 11, Banani, Dhaka 1213" },
  { icon: Clock, label: "Hours", value: "12:00 pm - 12:00 am, every day" },
];

export function ContactInfoSidebar() {
  return (
    <div className="lg:col-span-5 flex flex-col gap-4">
      {CONTACT_INFO.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex items-center gap-5 p-5 rounded-2xl bg-secondary border border-border/40 shadow-sm transition-colors hover:border-primary/30">
            <div className="size-12 rounded-full border border-primary/30 flex items-center justify-center bg-card shrink-0">
              <Icon className="size-5 text-primary" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{item.label}</span>
              <span className="font-sans text-sm font-bold text-foreground">{item.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
