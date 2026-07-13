import { Mail, MapPin, Phone } from "lucide-react";

export const FOOTER_LINKS = {
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

export const SOCIAL_ICONS = [
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
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.667" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.667" />
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

export const PAYMENT_METHODS = ["Visa", "MasterCard", "bKash", "Nagad", "COD"];
