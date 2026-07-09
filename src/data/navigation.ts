interface NavLink {
  href: string;
  label: string;
}

export const mainNavLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/foods", label: "Menu" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export const mobileNavLinks: NavLink[] = [
  ...mainNavLinks,
  { href: "/wishlist", label: "Wishlist" },
  { href: "/track-order", label: "Track Order" },
];
