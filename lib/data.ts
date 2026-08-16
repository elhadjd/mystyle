export type Service = {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceFrom: number;
  category: "braids" | "care" | "beauty" | "extras";
  popular?: boolean;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  style: string;
  tone: "black" | "blonde" | "mixed";
};

export type Stylist = {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  image: string;
  experience: string;
};

export type Testimonial = {
  id: string;
  name: string;
  text: string;
  service: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const brand = {
  name: "MyStyle",
  tagline: "African braids & beauty with identity",
  phone: "(404) 555-0188",
  phoneTel: "14045550188",
  email: "hello@mystyle.salon",
  address: "1842 Peachtree Road NW, Suite 120 — Atlanta, GA 30309",
  city: "Atlanta, GA",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "9:00 AM – 6:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  instagram: "@mystyle.salon",
  mapsUrl: "https://maps.google.com/?q=1842+Peachtree+Road+NW+Atlanta+GA",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const services: Service[] = [
  {
    id: "box-braids",
    name: "Box Braids",
    description:
      "Classic protective braids with a natural fall — perfect for everyday style and long-lasting wear.",
    duration: "4–8 hrs",
    priceFrom: 180,
    category: "braids",
    popular: true,
  },
  {
    id: "knotless",
    name: "Knotless Braids",
    description:
      "No knot at the root — lighter, more comfortable, with a seamless finish.",
    duration: "5–9 hrs",
    priceFrom: 220,
    category: "braids",
    popular: true,
  },
  {
    id: "fulani",
    name: "Fulani Braids",
    description:
      "Front cornrows feeding into free braids, with beads and cultural details.",
    duration: "4–7 hrs",
    priceFrom: 200,
    category: "braids",
  },
  {
    id: "goddess",
    name: "Goddess Braids",
    description:
      "Voluminous braids with curly ends for a glamorous, soft look.",
    duration: "5–8 hrs",
    priceFrom: 250,
    category: "braids",
    popular: true,
  },
  {
    id: "cornrows",
    name: "Cornrows",
    description:
      "Geometric or classic rows laid close to the scalp with clean parting.",
    duration: "2–5 hrs",
    priceFrom: 85,
    category: "braids",
  },
  {
    id: "passion-twists",
    name: "Passion Twists",
    description:
      "Soft romantic twists with beautiful volume and movement.",
    duration: "4–7 hrs",
    priceFrom: 190,
    category: "braids",
  },
  {
    id: "locs",
    name: "Starter Locs / Retwist",
    description:
      "Loc starts or maintenance with careful technique and precise alignment.",
    duration: "2–6 hrs",
    priceFrom: 120,
    category: "braids",
  },
  {
    id: "kids",
    name: "Kids Braids",
    description:
      "Protective, playful styles for children — done with patience and care.",
    duration: "2–4 hrs",
    priceFrom: 90,
    category: "braids",
  },
  {
    id: "deep-conditioning",
    name: "Deep Conditioning",
    description:
      "Nourishing treatment for dry hair after braids or color services.",
    duration: "1 hr",
    priceFrom: 65,
    category: "care",
  },
  {
    id: "reconstruction",
    name: "Hair Reconstruction",
    description:
      "Strengthens the hair fiber, reduces breakage, and restores elasticity.",
    duration: "1.5 hrs",
    priceFrom: 95,
    category: "care",
  },
  {
    id: "wash",
    name: "Wash & Finish",
    description:
      "Gentle scalp cleanse with a finish tailored to your style.",
    duration: "45 min",
    priceFrom: 55,
    category: "care",
  },
  {
    id: "cut",
    name: "Cut & Shape",
    description:
      "Personalized cuts for coily, curly, straight, and braided hair.",
    duration: "45 min",
    priceFrom: 45,
    category: "beauty",
  },
  {
    id: "color",
    name: "Color & Highlights",
    description:
      "Blonde, honey, copper, and fashion tones with maximum fiber protection.",
    duration: "2–4 hrs",
    priceFrom: 150,
    category: "beauty",
  },
  {
    id: "brows",
    name: "Brow Design",
    description: "Shaping and filling to frame and elevate your eyes.",
    duration: "30 min",
    priceFrom: 35,
    category: "beauty",
  },
  {
    id: "maintenance",
    name: "Braid Maintenance",
    description:
      "Root touch-ups, strand refresh, and style revitalization.",
    duration: "1–3 hrs",
    priceFrom: 75,
    category: "extras",
  },
  {
    id: "removal",
    name: "Gentle Removal",
    description:
      "Careful take-down with immediate hydration after removal.",
    duration: "1–3 hrs",
    priceFrom: 60,
    category: "extras",
  },
];

export const serviceCategories = [
  { id: "braids" as const, label: "African Braids" },
  { id: "care" as const, label: "Hair Care" },
  { id: "beauty" as const, label: "Beauty" },
  { id: "extras" as const, label: "Extras" },
];

export const gallery: GalleryItem[] = [
  {
    id: "1",
    src: "/images/hero-braids-black.jpg",
    alt: "Black woman with golden-brown box braids",
    style: "Box Braids",
    tone: "black",
  },
  {
    id: "2",
    src: "/images/hero-braids-blonde.jpg",
    alt: "Blonde woman with African knotless braids",
    style: "Knotless Braids",
    tone: "blonde",
  },
  {
    id: "3",
    src: "/images/gallery-cornrows.jpg",
    alt: "Detailed cornrows on a Black woman",
    style: "Cornrows",
    tone: "black",
  },
  {
    id: "4",
    src: "/images/gallery-goddess.jpg",
    alt: "Blonde goddess braids with curly ends",
    style: "Goddess Braids",
    tone: "mixed",
  },
  {
    id: "5",
    src: "/images/gallery-fulani.jpg",
    alt: "Fulani braids with gold beads",
    style: "Fulani Braids",
    tone: "black",
  },
  {
    id: "6",
    src: "/images/gallery-passion-blonde.jpg",
    alt: "Platinum blonde passion twists",
    style: "Passion Twists",
    tone: "blonde",
  },
];

export const stylists: Stylist[] = [
  {
    id: "amara",
    name: "Amara Santos",
    role: "Founder & Master Braider",
    bio: "Protective styling specialist with 12+ years of experience. She founded MyStyle to celebrate Afro beauty across every texture and tone.",
    specialties: ["Knotless", "Goddess", "Fulani"],
    image: "/images/stylist-amara.jpg",
    experience: "12 years",
  },
  {
    id: "sofia",
    name: "Sofia Rivera",
    role: "Colorist & Braider",
    bio: "Known for blonde braids and color on protected hair. She blends color artistry with braiding without compromising hair health.",
    specialties: ["Color", "Blonde Box Braids", "Passion Twists"],
    image: "/images/stylist-sofia.jpg",
    experience: "8 years",
  },
  {
    id: "lena",
    name: "Lena Brooks",
    role: "Cornrow Specialist",
    bio: "Precision geometric and classic cornrows. Works with adults and kids in a calm, patient chair.",
    specialties: ["Cornrows", "Kids", "Starter Locs"],
    image: "/images/stylist-lena.jpg",
    experience: "6 years",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Camila N.",
    text: "I left MyStyle feeling like a queen. My knotless braids were light and the service was flawless from start to finish.",
    service: "Knotless Braids",
  },
  {
    id: "2",
    name: "Jessica L.",
    text: "Finally a salon that does blonde braids with real care. My goddess look came out exactly how I imagined.",
    service: "Goddess Braids",
  },
  {
    id: "3",
    name: "Aaliyah M.",
    text: "Warm vibe, skilled artists, magazine-ready results. I’ve already recommended MyStyle to all my friends.",
    service: "Fulani Braids",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "How long do braids last?",
    answer:
      "Typically 4 to 8 weeks, depending on the style, hair growth, and daily care. We’ll recommend the best maintenance plan for your technique.",
  },
  {
    question: "Should I wash my hair before my appointment?",
    answer:
      "Yes. Come with clean hair, no heavy conditioner on the roots, and thoroughly detangled. That speeds things up and improves the finish.",
  },
  {
    question: "Do you work with blonde and colored hair?",
    answer:
      "Absolutely. We specialize in blonde and colored braids, always with a fiber check first to protect hair health.",
  },
  {
    question: "How does booking work?",
    answer:
      "Book online, by phone, or text. A deposit secures your slot. Reschedules need at least 24 hours’ notice.",
  },
  {
    question: "Do you braid kids?",
    answer:
      "Yes. Kids braids are done with breaks, a calm environment, and protective styles built for school and play.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, debit/credit cards, Apple Pay, and Cash App. Services from $200+ can be split into up to 3 payments.",
  },
];

export function formatPrice(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
