export type FirebaseRecord<T> = Record<string, T> | null;

export type CompanyProfile = {
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  productsHeadline: string;
  aboutDescription: string;
  contact: {
    address: string;
    whatsapp: string;
    email: string;
    mapUrl: string;
  };
};

export type ProductItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  featuredImage?: string;
};

export type BusinessUnit = {
  id: string;
  name: string;
  description: string;
  image?: string;
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  date: string;
  thumbnail: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  imageUrl: string;
  caption: string;
};

export type MessageItem = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type StatisticItem = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
};

export type TestimonialItem = {
  id: string;
  author: string;
  role: string;
  quote: string;
};

export type PartnerItem = {
  id: string;
  name: string;
  logo: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};
