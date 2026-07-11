import {
  BookOpen,
  Clock,
  Flame,
  Grid3x3,
  HelpCircle,
  Info,
  Mail,
  MessageSquareText,
  Package,
  Sparkles,
  Truck,
  Utensils,
} from 'lucide-react';
import type { ComponentType } from 'react';

interface NavLink {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
}

export const childIcons: Record<string, ComponentType<{ className?: string }>> = {
  '/foods': Utensils,
  '/foods#best-sellers': Flame,
  '/foods#combos': Package,
  '/foods#categories': Grid3x3,
  '/foods#todays-special': Sparkles,
  '/foods#new-arrivals': Clock,
  '/about': Info,
  '/reviews': MessageSquareText,
  '/contact': Mail,
  '/traking-page': Truck,
  '/faq': HelpCircle,
  '/our-story': BookOpen,
};

export const mainNavLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  {
    label: 'Menu',
    children: [
      { href: '/foods', label: 'All Foods' },
      { href: '/foods#best-sellers', label: 'Best Sellers' },
      { href: '/foods#combos', label: 'Combos' },
      { href: '/foods#categories', label: 'Categories' },
      { href: '/foods#todays-special', label: "Today's Special" },
      { href: '/foods#new-arrivals', label: 'New Arrivals' },
    ],
  },
  { href: '/our-story', label: 'Our Story' },
  { href: '/about', label: 'About' },
  {
    label: 'More',
    children: [
      { href: '/reviews', label: 'Reviews' },
      { href: '/contact', label: 'Contact' },
      { href: '/traking-page', label: 'Track Order' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
];

export const mobileNavLinks: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/foods', label: 'Menu' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
  { href: '/traking-page', label: 'Track Order' },
  { href: '/faq', label: 'FAQ' },
  { href: '/wishlist', label: 'Wishlist' },
];
