import { FOOTER_LINKS, PAYMENT_METHODS, SOCIAL_ICONS } from "@/data/footer-data";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-overlay py-10 pb-[calc(env(safe-area-inset-bottom)+5rem)] text-white lg:pb-10">
      <div className="wrapper">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6">
          {/* Top row */}
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-10">
            {/* Left: Logo + Description + Newsletter */}
            <div className="flex w-full max-w-[441px] flex-col gap-6">
              <Logo noLink />

              <p className="text-base leading-[130%] text-white/65">
                A heritage kitchen in the heart of Dhaka, plating slow-cooked Mughlai cuisine with
                the precision of a modern restaurant.
              </p>

              <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-2">
                <input
                  type="email"
                  placeholder="Your email for offers"
                  className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <Button
                  type="button"
                  variant="default"
                  size="icon"
                  className="size-10 shrink-0 rounded-full"
                >
                  <ArrowRight className="size-4 text-primary-foreground" />
                </Button>
              </div>
            </div>

            {/* Right: Link columns */}
            <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1.5fr] lg:gap-8">
              {/* Visit */}
              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-bold text-white">{FOOTER_LINKS.visit.title}</h4>
                <ul className="flex flex-col gap-3">
                  {FOOTER_LINKS.visit.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-base text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hours */}
              <div className="flex flex-col gap-6">
                <h4 className="text-lg font-bold text-white">{FOOTER_LINKS.hours.title}</h4>
                <ul className="flex flex-col gap-3">
                  {FOOTER_LINKS.hours.items.map((item) => (
                    <li key={item} className="text-base text-white/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Find us */}
              <div className="col-span-2 flex flex-col gap-6 sm:col-span-1">
                <h4 className="text-lg font-bold text-white">{FOOTER_LINKS.contact.title}</h4>
                <ul className="flex flex-col gap-4">
                  {FOOTER_LINKS.contact.items.map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <item.icon className="size-5 shrink-0 pt-0.5 text-white/80" />
                      <span className="text-base text-white/80">{item.text}</span>
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
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      {icon.svg}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-white/60">Secure Payment Methods</p>
              <div className="flex flex-wrap gap-1.5">
                {PAYMENT_METHODS.map((method) => (
                  <span
                    key={method}
                    className="rounded border border-white/20 bg-white/10 px-2.5 py-1.5 text-[11px] font-medium text-white whitespace-nowrap"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 sm:items-end">
              <p className="text-sm text-white/80">
                &copy; 2026 Finora Commerce. All rights reserved.
              </p>
              <p className="text-xs text-white/60">Made with ❤️ in Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
