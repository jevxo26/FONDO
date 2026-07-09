import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const FOOTER_LINKS = {
  visit: {
    title: "Visit",
    links: [
      { label: "Menu", href: "/foods" },
      { label: "Our Story", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Track Order", href: "/track" },
      { label: "Blog", href: "/blog" },
    ],
  },
  hours: {
    title: "Hours",
    items: [
      "Mon\u2013Thu \u00b7 12\u201311 pm",
      "Fri \u00b7 2 pm\u201312 am",
      "Sat\u2013Sun \u00b7 12 pm\u201312 am",
    ],
  },
  contact: {
    title: "Find us",
    items: [
      { icon: Phone, text: "+880 1234-567890" },
      { icon: Mail, text: "support@finora.com" },
      {
        icon: MapPin,
        text: "123 Shopping Street, Gulshan-2, Dhaka 1212, Bangladesh",
      },
    ],
  },
};

const SOCIAL_ICONS = [
  {
    label: "Facebook",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
          stroke="currentColor"
          strokeWidth="1.667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.667"
        />
        <circle
          cx="12"
          cy="12"
          r="5"
          stroke="currentColor"
          strokeWidth="1.667"
        />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-6.5-8L20 4h-2l-5.5 6.5L8 4H4z"
          stroke="currentColor"
          strokeWidth="1.667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "YouTube",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"
          stroke="currentColor"
          strokeWidth="1.667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          points="9.75,15.02 15.5,11.75 9.75,8.48"
          stroke="currentColor"
          strokeWidth="1.667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const PAYMENT_METHODS = ["Visa", "MasterCard", "bKash", "Nagad", "COD"];

export function Footer() {
  return (
    <footer className="bg-foreground py-10 text-white">
      <div className="wrapper">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6">
          {/* Top row */}
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-[100px]">
            {/* Left: Logo + Description + Newsletter */}
            <div className="flex w-full max-w-[441px] flex-col gap-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="FONDO logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold text-background">
                  FONDO
                </span>
              </div>

              <p className="text-base leading-[130%] text-background/65">
                A heritage kitchen in the heart of Dhaka, plating slow-cooked
                Mughlai cuisine with the precision of a modern restaurant.
              </p>

              <div className="flex items-center rounded-full border border-background/15 bg-background/5 p-2">
                <input
                  type="email"
                  placeholder="Your email for offers"
                  className="flex-1 bg-transparent px-4 text-sm text-background placeholder:text-background/40 focus:outline-none"
                />
                <button
                  type="button"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary"
                >
                  <ArrowRight className="size-4 text-primary-foreground" />
                </button>
              </div>
            </div>

            {/* Right: Link columns */}
            <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:flex lg:gap-8">
              {/* Visit */}
              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-bold text-background">
                  {FOOTER_LINKS.visit.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {FOOTER_LINKS.visit.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-base text-background/80 transition-colors hover:text-background"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hours */}
              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-bold text-background">
                  {FOOTER_LINKS.hours.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {FOOTER_LINKS.hours.items.map((item) => (
                    <li key={item} className="text-base text-background/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Find us */}
              <div className="col-span-2 flex flex-col gap-6 sm:col-span-1">
                <h4 className="text-lg font-bold text-background">
                  {FOOTER_LINKS.contact.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {FOOTER_LINKS.contact.items.map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <item.icon className="size-5 shrink-0 pt-0.5 text-primary" />
                      <span className="text-base text-background/80">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Social icons */}
                <div className="flex items-start gap-3">
                  {SOCIAL_ICONS.map((icon) => (
                    <a
                      key={icon.label}
                      href="#"
                      aria-label={icon.label}
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background/10 text-background transition-colors hover:bg-background/20"
                    >
                      {icon.svg}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-6 border-t border-background/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-background/60">
                Secure Payment Methods
              </p>
              <div className="flex flex-wrap gap-2">
                {PAYMENT_METHODS.map((method) => (
                  <span
                    key={method}
                    className="rounded border border-background/20 bg-background/10 px-3 py-1.5 text-xs font-medium text-background"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 sm:items-end">
              <p className="text-sm text-background/80">
                &copy; 2026 Finora Commerce. All rights reserved.
              </p>
              <p className="text-xs text-background/60">
                Made with ❤️ in Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
