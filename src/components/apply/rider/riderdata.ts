import {
  Wallet,
  Clock,
  ShieldCheck,
  Flame,
  Award,
  MapPin,
  Bike,
  Navigation,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";

export const RIDER_HIGHLIGHTS = [
  "Weekly / Daily Payouts",
  "Flexible Working Hours",
  "Free Insurance Cover",
  "Gear & Uniform Provided",
];

export const RIDER_STATS = [
  { label: "Avg. Daily Earnings", value: "৳1,800+" },
  { label: "Active Fleet", value: "3,500+ Riders" },
  { label: "Cities Covered", value: "12 Zones" },
  { label: "On-Time Bonus", value: "Up to 25%" },
];

export const WHY_RIDE_ITEMS = [
  {
    title: "High Daily Earnings",
    desc: "Earn per order plus distance compensation, peak-hour incentives, and customer tips.",
    icon: Wallet,
  },
  {
    title: "Work Your Own Schedule",
    desc: "Log in whenever you want. Full-time, part-time, or weekend shifts — you control your time.",
    icon: Clock,
  },
  {
    title: "Rider Safety & Insurance",
    desc: "Every Fondo partner is covered by comprehensive personal accident insurance while on shift.",
    icon: ShieldCheck,
  },
  {
    title: "Order Boosts & Bonuses",
    desc: "Earn extra during lunch rushes, rainy days, and target delivery milestones.",
    icon: Flame,
  },
  {
    title: "Starter Gear & Uniform",
    desc: "Get high-quality insulated thermal delivery bags, rain jackets, and branded gear.",
    icon: Award,
  },
  {
    title: "Dedicated Support Line",
    desc: "24/7 on-road dispatch assistance and safety center whenever you need help.",
    icon: HeartHandshake,
  },
];

export const RIDER_STEPS = [
  {
    step: "01",
    title: "Submit Application",
    desc: "Fill out the online form with your NID and vehicle details.",
    icon: MapPin,
  },
  {
    step: "02",
    title: "Document Verification",
    desc: "We review your license, NID, and background within 24 hours.",
    icon: CheckCircle2,
  },
  {
    step: "03",
    title: "Collect Kit & Briefing",
    desc: "Pick up your delivery bag, jacket, and complete a quick orientation.",
    icon: Bike,
  },
  {
    step: "04",
    title: "Start Delivering",
    desc: "Turn on the Fondo Rider App and start earning immediately.",
    icon: Navigation,
  },
];

export const VEHICLE_OPTIONS = [
  {
    type: "Motorbike",
    icon: "🏍️",
    desc: "Highest order volume & maximum distance range",
    req: "License + Reg Papers",
  },
  {
    type: "Bicycle",
    icon: "🚲",
    desc: "Zero fuel cost, ideal for dense neighborhood zones",
    req: "Valid NID Only",
  },
  {
    type: "Electric Scooter",
    icon: "🛵",
    desc: "Eco-friendly, fast, and low operating expenses",
    req: "NID + Reg Papers",
  },
  {
    type: "Walker / Runner",
    icon: "🏃",
    desc: "Short distance hyper-local food deliveries",
    req: "Valid NID Only",
  },
];

export const WORK_ZONES = [
  "Dhaka - Gulshan / Banani",
  "Dhaka - Dhanmondi / Mohammadpur",
  "Dhaka - Uttara",
  "Dhaka - Mirpur",
  "Chattogram - Agrabad / GEC",
  "Sylhet - Zindabazar",
];

export const RIDER_TESTIMONIALS = [
  {
    name: "Tanvir Hossain",
    zone: "Gulshan Zone",
    vehicle: "Motorbike",
    earnings: "৳52,000 / mo",
    review:
      "Fondo's payout is always on time every Tuesday. Peak hour bonuses make a huge difference.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Rahim Uddin",
    zone: "Uttara Zone",
    vehicle: "Bicycle",
    earnings: "৳34,000 / mo",
    review:
      "I ride my bicycle part-time after university classes. The app is super easy to navigate.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Kazi Sajjad",
    zone: "Dhanmondi Zone",
    vehicle: "Electric Scooter",
    earnings: "৳45,000 / mo",
    review:
      "Safety gear quality is top notch. Dispatch support is super quick if there's any order issue.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
  },
];

export const RIDER_FAQS = [
  {
    q: "What are the basic requirements to become a Fondo Rider?",
    a: "You must be at least 18 years old, possess a valid Bangladeshi NID card, have a smartphone (Android/iOS), and a registered vehicle or bicycle.",
  },
  {
    q: "How and when do I get paid?",
    a: "Earnings are deposited directly to your bKash, Nagad, or bank account weekly every Tuesday. Daily withdrawal options are also available.",
  },
  {
    q: "Do I need my own delivery bag?",
    a: "No. Fondo provides an insulated thermal delivery bag and reflective safety kit during your orientation.",
  },
  {
    q: "Can I deliver part-time?",
    a: "Yes! There are no mandatory minimum hours. You can log in and accept orders whenever you choose.",
  },
];
