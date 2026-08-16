export type Service = {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceFrom: number;
  category: "trancas" | "cuidados" | "estetica" | "extras";
  popular?: boolean;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  style: string;
  tone: "negra" | "loira" | "mista";
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
  tagline: "Tranças africanas & beleza com identidade",
  phone: "(11) 98888-4400",
  whatsapp: "5511988884400",
  email: "ola@mystyle.salon",
  address: "Rua das Palmeiras, 248 — Vila Madalena, São Paulo",
  hours: [
    { day: "Segunda a Sexta", time: "09:00 – 20:00" },
    { day: "Sábado", time: "09:00 – 18:00" },
    { day: "Domingo", time: "Fechado" },
  ],
  instagram: "@mystyle.salon",
  mapsUrl: "https://maps.google.com/?q=Vila+Madalena+Sao+Paulo",
};

export const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/galeria", label: "Galeria" },
  { href: "/sobre", label: "Sobre" },
  { href: "/equipe", label: "Equipe" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
];

export const services: Service[] = [
  {
    id: "box-braids",
    name: "Box Braids",
    description:
      "Tranças clássicas com caimento natural, perfeitas para proteção e estilo no dia a dia.",
    duration: "4–8h",
    priceFrom: 280,
    category: "trancas",
    popular: true,
  },
  {
    id: "knotless",
    name: "Knotless Braids",
    description:
      "Sem nó na raiz — mais leves, confortáveis e com acabamento impecável.",
    duration: "5–9h",
    priceFrom: 320,
    category: "trancas",
    popular: true,
  },
  {
    id: "fulani",
    name: "Fulani Braids",
    description:
      "Cornrows frontais com tranças soltas, beads e detalhes culturais exclusivos.",
    duration: "4–7h",
    priceFrom: 300,
    category: "trancas",
  },
  {
    id: "goddess",
    name: "Goddess Braids",
    description:
      "Tranças volumosas com pontas cacheadas para um visual glamouroso.",
    duration: "5–8h",
    priceFrom: 350,
    category: "trancas",
    popular: true,
  },
  {
    id: "cornrows",
    name: "Cornrows & Nagô",
    description:
      "Desenhos geométricos ou clássicos colados ao couro cabeludo.",
    duration: "2–5h",
    priceFrom: 150,
    category: "trancas",
  },
  {
    id: "passion-twists",
    name: "Passion Twists",
    description:
      "Torções suaves e românticas, ideais para quem busca volume e movimento.",
    duration: "4–7h",
    priceFrom: 290,
    category: "trancas",
  },
  {
    id: "locs",
    name: "Starter Locs / Retwist",
    description:
      "Início de locs ou manutenção com técnica cuidadosa e alinhamento preciso.",
    duration: "2–6h",
    priceFrom: 180,
    category: "trancas",
  },
  {
    id: "kids",
    name: "Tranças Infantis",
    description:
      "Estilos protetores e divertidos para crianças, com paciência e carinho.",
    duration: "2–4h",
    priceFrom: 120,
    category: "trancas",
  },
  {
    id: "hidratação",
    name: "Hidratação Profunda",
    description:
      "Protocolo nutritivo para fios ressecados após tranças ou química.",
    duration: "1h",
    priceFrom: 90,
    category: "cuidados",
  },
  {
    id: "reconstrucao",
    name: "Reconstrução Capilar",
    description:
      "Fortalece a fibra, reduz quebra e devolve elasticidade aos fios.",
    duration: "1h30",
    priceFrom: 140,
    category: "cuidados",
  },
  {
    id: "lavagem",
    name: "Lavagem & Finalização",
    description:
      "Limpeza suave do couro cabeludo com finalização alinhada ao seu estilo.",
    duration: "45min",
    priceFrom: 70,
    category: "cuidados",
  },
  {
    id: "corte",
    name: "Corte & Shape",
    description:
      "Corte personalizado para cabelos crespos, cacheados, lisos e com tranças.",
    duration: "45min",
    priceFrom: 80,
    category: "estetica",
  },
  {
    id: "coloracao",
    name: "Coloração & Mechas",
    description:
      "Tons loiros, mel, cobre e fantasias com proteção máxima da fibra.",
    duration: "2–4h",
    priceFrom: 200,
    category: "estetica",
  },
  {
    id: "sobrancelha",
    name: "Design de Sobrancelha",
    description: "Alinhamento e preenchimento para valorizar o olhar.",
    duration: "30min",
    priceFrom: 45,
    category: "estetica",
  },
  {
    id: "manutencao",
    name: "Manutenção de Tranças",
    description:
      "Ajuste de raiz, reposição de fios e revitalização do visual.",
    duration: "1–3h",
    priceFrom: 100,
    category: "extras",
  },
  {
    id: "remocao",
    name: "Remoção Cuidadosa",
    description:
      "Retirada sem agressão, com hidratação imediata pós-remoção.",
    duration: "1–3h",
    priceFrom: 80,
    category: "extras",
  },
];

export const serviceCategories = [
  { id: "trancas" as const, label: "Tranças Africanas" },
  { id: "cuidados" as const, label: "Cuidados Capilares" },
  { id: "estetica" as const, label: "Estética" },
  { id: "extras" as const, label: "Extras" },
];

export const gallery: GalleryItem[] = [
  {
    id: "1",
    src: "/images/hero-braids-black.jpg",
    alt: "Mulher negra com box braids em tom castanho dourado",
    style: "Box Braids",
    tone: "negra",
  },
  {
    id: "2",
    src: "/images/hero-braids-blonde.jpg",
    alt: "Mulher loira com knotless braids africanas",
    style: "Knotless Braids",
    tone: "loira",
  },
  {
    id: "3",
    src: "/images/gallery-cornrows.jpg",
    alt: "Cornrows detalhadas em mulher negra",
    style: "Cornrows",
    tone: "negra",
  },
  {
    id: "4",
    src: "/images/gallery-goddess.jpg",
    alt: "Goddess braids loiras com pontas cacheadas",
    style: "Goddess Braids",
    tone: "mista",
  },
  {
    id: "5",
    src: "/images/gallery-fulani.jpg",
    alt: "Fulani braids com contas douradas",
    style: "Fulani Braids",
    tone: "negra",
  },
  {
    id: "6",
    src: "/images/gallery-passion-blonde.jpg",
    alt: "Passion twists loiras platinadas",
    style: "Passion Twists",
    tone: "loira",
  },
];

export const stylists: Stylist[] = [
  {
    id: "amara",
    name: "Amara Santos",
    role: "Fundadora & Master Braider",
    bio: "Especialista em tranças protetoras há mais de 12 anos. Criou a MyStyle para celebrar a beleza afro em todas as texturas e tons.",
    specialties: ["Knotless", "Goddess", "Fulani"],
    image: "/images/stylist-amara.jpg",
    experience: "12 anos",
  },
  {
    id: "sofia",
    name: "Sofia Ribeiro",
    role: "Colorista & Braider",
    bio: "Referência em tranças loiras e mechas em cabelos com proteção. Une técnica de coloração e trançado sem danificar a fibra.",
    specialties: ["Coloração", "Box Braids loiras", "Passion Twists"],
    image: "/images/stylist-sofia.jpg",
    experience: "8 anos",
  },
  {
    id: "lena",
    name: "Lena Oliveira",
    role: "Especialista em Cornrows",
    bio: "Desenhos geométricos e nagô com precisão milimétrica. Atende adultos e crianças com paciência e arte.",
    specialties: ["Cornrows", "Infantil", "Starter Locs"],
    image: "/images/stylist-lena.jpg",
    experience: "6 anos",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Camila N.",
    text: "Saí da MyStyle me sentindo rainha. As knotless ficaram leves e o atendimento foi impecável do início ao fim.",
    service: "Knotless Braids",
  },
  {
    id: "2",
    name: "Jessica L.",
    text: "Finalmente um salão que faz tranças loiras com cuidado de verdade. Minha goddess ficou exatamente como eu sonhei.",
    service: "Goddess Braids",
  },
  {
    id: "3",
    name: "Aline M.",
    text: "Ambiente acolhedor, profissionais atentas e resultado de revista. Já indiquei para todas as amigas.",
    service: "Fulani Braids",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Quanto tempo duram as tranças?",
    answer:
      "Em média de 4 a 8 semanas, dependendo do estilo, do crescimento do cabelo e dos cuidados diários. Orientamos a manutenção ideal para cada técnica.",
  },
  {
    question: "Preciso lavar o cabelo antes do horário?",
    answer:
      "Sim. Venha com o cabelo limpo, sem condicionador pesado na raiz e bem desembaraçado. Isso agiliza o processo e melhora o acabamento.",
  },
  {
    question: "Vocês atendem cabelos loiros e tingidos?",
    answer:
      "Sim. Temos especialidade em tranças loiras e coloridas, sempre com avaliação prévia da fibra para proteger a saúde dos fios.",
  },
  {
    question: "Como funciona o agendamento?",
    answer:
      "Você pode agendar pelo site, WhatsApp ou telefone. Pedimos um sinal para confirmar o horário. Remarcações com até 24h de antecedência.",
  },
  {
    question: "Atendem crianças?",
    answer:
      "Sim. Oferecemos tranças infantis com pausas, ambiente calmo e estilos protetores pensados para o dia a dia escolar.",
  },
  {
    question: "Quais formas de pagamento?",
    answer:
      "Aceitamos Pix, cartão de crédito/débito e dinheiro. Parcelamos serviços a partir de R$ 300 em até 3x sem juros.",
  },
];

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}
