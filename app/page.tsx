import Image from "next/image";
import { ArrowRight, Briefcase, Mail, MapPin, Users, Zap } from "lucide-react";
import MotionWrapper from "../components/MotionWrapper";
import Header from "../components/Header";
import { database } from "../firebase/config";
import { get, ref } from "firebase/database";
import ContactForm from "../components/ContactForm";
import type { Metadata } from "next";
import type {
  CompanyProfile,
  ProductItem,
  BusinessUnit,
  NewsItem,
  StatisticItem,
  TestimonialItem,
  PartnerItem,
  FAQItem,
} from "../types/firebase";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const aboutCards = [
  { title: 'Innovation', icon: Zap, description: 'We create simple, effective, and relevant solutions.' },
  { title: 'Technology', icon: Users, description: 'Committed to providing the best and most trustworthy services.' },
  { title: 'Business', icon: Briefcase, description: 'We grow together with partners, customers, and the community.' },
  { title: 'Community', icon: Users, description: 'Building a strong and supportive local ecosystem.' },
];

const floatingCards = [
  { id: 'float1', name: 'Laporan Harianku', icon: 'LH', status: 'Online' },
  { id: 'float2', name: 'IsimuJek', icon: 'IJ', status: '120 Drivers' },
  { id: 'float3', name: 'Mendarat SULUT', icon: 'MS', status: '32 Active Trips' },
];


export const metadata: Metadata = {
  title: "ISIMU ENTREPRENEUR | Building Solutions for Everyday Life",
  description: "ISIMU Entrepreneur develops digital products, technology solutions, and innovative businesses that create real impact.",
};

async function getData<T>(path: string): Promise<T | null> {
  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Firebase timeout")), 4000);
    });

    const snapshot = await Promise.race([get(ref(database, path)), timeoutPromise]);
    return snapshot.exists() ? (snapshot.val() as T) : null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [company, products, businessUnits, news, statistics, testimonials, partners, faq] = await Promise.all([
    getData<CompanyProfile>("company"),
    getData<Record<string, ProductItem>>("products"),
    getData<Record<string, BusinessUnit>>("business_units"),
    getData<Record<string, NewsItem>>("news"),
    getData<Record<string, StatisticItem>>("statistics"),
    getData<Record<string, TestimonialItem>>("testimonials"),
    getData<Record<string, PartnerItem>>("partners"),
    getData<Record<string, FAQItem>>("faq"),
  ]);

  const productList = products ? Object.values(products) : [];
  const businessList = businessUnits ? Object.values(businessUnits) : [];
  const newsList = news ? Object.values(news) : [];
  const statisticList = statistics ? Object.values(statistics) : [];
  const testimonialList = testimonials ? Object.values(testimonials) : [];
  const partnerList = partners ? Object.values(partners) : [];
  const faqList = faq ? Object.values(faq) : [];
  const heroImage = company?.heroImage ?? "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

  return (
    <div className={`min-h-screen bg-[#FFFFFF] text-[#1F2937]`}>
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(242,194,0,0.18),_transparent_40%)]" />
        <div className="absolute inset-0 -z-20 opacity-30 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
          <svg className="absolute inset-0 h-full w-full stroke-gray-200" aria-hidden="true">
            <defs>
              <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M.5 80V.5H80" fill="none"/></pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-[140px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <MotionWrapper variants={fadeRight}>
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-block rounded-full bg-[#F7F7F7] px-4 py-2 text-sm font-semibold text-[#374151]">
                  Technology Company
                </div>
                <h1 className="text-6xl font-extrabold leading-tight text-[#1F2937] sm:text-[80px]" style={{ letterSpacing: '-3px' }}>
                  Building<br />Solutions<br />for Everyday Life
                </h1>
                <p className="max-w-xl text-lg text-[#374151]/80 lg:text-xl" style={{ lineHeight: '180%' }}>
                  ISIMU Entrepreneur develops technology, digital products, and business ecosystems that solve real problems.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start pt-2">
                  <Link href="#products" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-4 text-base font-semibold text-white transition hover:bg-black/80">
                    Explore Products
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="#contact" className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-[#1F2937] transition hover:border-gray-400 hover:bg-gray-50">
                    Contact Us
                  </Link>
                </div>
                <div className="flex justify-center gap-8 pt-8 lg:justify-start">
                  {statisticList.slice(0, 3).map(stat => (
                    <div key={stat.id}>
                      <p className="text-3xl font-bold text-[#1F2937]">{stat.value}{stat.suffix ?? '+'}</p>
                      <p className="text-sm text-[#374151]/60">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper variants={fadeLeft} className="relative h-[500px] lg:h-full">
              <Image 
                src={heroImage} 
                alt="Modern office building with black architecture and yellow accents" 
                fill 
                className="object-cover rounded-[28px] shadow-2xl"
                priority
              />
              {/* Floating Cards */}
              {floatingCards.map((card, i) => (
                <MotionWrapper 
                  key={card.id}
                  variants={fadeUp}
                  className={`absolute rounded-xl border border-gray-200/80 bg-white/50 p-4 shadow-xl backdrop-blur-lg
                    ${i === 0 ? 'bottom-10 -left-10' : ''}
                    ${i === 1 ? 'top-10 -right-10' : ''}
                    ${i === 2 ? '-top-10 left-1/4' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2C200] text-black font-bold">{card.icon}</div>
                    <div>
                      <p className="font-semibold text-sm text-[#1F2937]">{card.name}</p>
                      <p className="text-xs text-gray-500">{card.status}</p>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </MotionWrapper>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#F7F7F7] text-[#374151] mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-[140px]">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <MotionWrapper variants={fadeRight}>
            <div className="space-y-6">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#F2C200]">About Us</span>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#1F2937]">Local Innovation, Global Impact</h2>
              <p className="max-w-xl text-lg leading-relaxed text-[#374151]/80">ISIMU Entrepreneur is a company focused on developing digital applications, technology, and business units that address everyday community needs with easy, elegant, and integrated solutions.</p>
            </div>
          </MotionWrapper>
          <MotionWrapper variants={staggerContainer} className="grid grid-cols-2 gap-4">
            {aboutCards.map((item) => {
              const Icon = item.icon;
              return (
                <MotionWrapper variants={fadeLeft} key={item.title}>
                  <div className="rounded-[28px] border border-gray-200/50 bg-white/40 p-8 shadow-lg backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-2 h-full">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/60 text-[#374151]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-[#1F2937]">{item.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-[#374151]/70">{item.description}</p>
                  </div>
                </MotionWrapper>
              );
            })}
          </MotionWrapper>
        </div>
      </section>

      <section id="products" className="bg-white text-[#374151] py-20 lg:py-[140px]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <MotionWrapper variants={fadeUp} className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#F2C200]">Our Products</span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-[#1F2937]">Digital Solutions for an Easier Life</h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-[#374151]/80">The platforms and applications we build are ready to help users and local businesses grow together.</p>
          </MotionWrapper>
          <MotionWrapper variants={staggerContainer} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {productList.map((product) => (
                <MotionWrapper variants={fadeUp} key={product.id}>
                  <article className="group h-full overflow-hidden rounded-[28px] border border-gray-200/80 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-[#F2C200]/50">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-200 text-[#1F2937] text-3xl font-bold transition-transform group-hover:rotate-6">{product.icon}</div>
                    <h3 className="mt-6 text-2xl font-bold text-[#1F2937]">{product.name}</h3>
                    <p className="mt-4 text-base leading-relaxed text-[#374151]/80">{product.description}</p>
                    <div className="mt-8 flex items-center gap-2 text-base font-semibold text-[#1F2937] opacity-0 transition group-hover:opacity-100">
                      Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>
                </MotionWrapper>
              ))}
          </MotionWrapper>
        </div>
      </section>
      <section id="business-units" className="bg-[#F7F7F7] text-[#374151] py-20 lg:py-[140px]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <MotionWrapper variants={fadeUp} className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#F2C200]">Business Units</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-[#1F2937]">Real Businesses, Real Benefits</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#374151]/80">Building local business units that align with our digital vision and everyday services.</p>
        </MotionWrapper>
        <MotionWrapper variants={staggerContainer} className="grid gap-6 sm:grid-cols-2">
          {businessList.map((unit) => (
            <MotionWrapper variants={fadeUp} key={unit.id}>
              <article className="group relative h-80 overflow-hidden rounded-[28px] shadow-lg">
                <Image src={unit.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'} alt={unit.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-bold">{unit.name}</h3>
                  <p className="mt-2 text-base text-gray-300 max-w-sm">{unit.description}</p>
                  <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/30">
                    Learn More <ArrowRight className="h-4 w-4" />
                </button>
                </div>              </article>
            </MotionWrapper>
          ))}
        </MotionWrapper>
        </div>
      </section>
      <section className="bg-[#111111] text-white py-20 lg:py-[140px]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <MotionWrapper variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statisticList.map((stat) => (
              <MotionWrapper variants={fadeUp} key={stat.id}>
                <div className="rounded-3xl p-10 text-center">
                  <p className="text-7xl font-extrabold text-white">{stat.value}{stat.suffix ?? "+"}</p>
                  <p className="mt-4 text-sm uppercase tracking-widest text-gray-400">{stat.label}</p>
                </div>
              </MotionWrapper>
            ))}
          </MotionWrapper>
        </div>
      </section>

      <section id="news" className="bg-white text-[#374151] py-20 lg:py-[140px]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <MotionWrapper variants={fadeUp} className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#F2C200]">Latest News</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-[#1F2937]">Latest News</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#374151]/80">Updates from the ever-evolving ISIMU ecosystem for the benefit of our users.</p>
        </MotionWrapper>
        <MotionWrapper variants={staggerContainer} className="grid gap-6 lg:grid-cols-3">
          {newsList.map((item) => (
            <MotionWrapper variants={fadeUp} key={item.id}>
              <article className="group overflow-hidden rounded-[28px] border border-gray-200/80 bg-white shadow-lg h-full transition-all duration-300 hover:shadow-2xl">
                <div className="h-52 overflow-hidden bg-gray-200">
                  <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#F2C200]">{item.date}</p>
                  <h3 className="mt-4 text-2xl font-bold text-[#1F2937]">{item.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">{item.summary}</p>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </MotionWrapper>
        </div>
      </section>
      <section className="bg-[#F7F7F7] text-[#374151] py-20 lg:py-[140px]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <MotionWrapper variants={fadeUp} className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#F2C200]">Testimonials</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#1F2937]">What Our Partners & Users Say</h2>
          </MotionWrapper>
          <MotionWrapper variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {testimonialList.map((testimonial) => (
              <MotionWrapper variants={fadeUp} key={testimonial.id}>
                <article className="rounded-[28px] border border-gray-200/50 bg-white/40 p-8 shadow-lg backdrop-blur-2xl h-full">
                  <p className="text-lg leading-relaxed text-[#374151]">"{testimonial.quote}"</p>
                  <div className="mt-8">
                    <p className="font-semibold text-[#1F2937]">{testimonial.author}</p>
                    <p className="text-sm text-[#374151]/70">{testimonial.role}</p>
                  </div>
                </article>
              </MotionWrapper>
            ))}
          </MotionWrapper>
        </div>
      </section>

      <section id="partner" className="bg-white text-[#374151] py-20 lg:py-[140px]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <MotionWrapper variants={fadeUp} className="mb-12 grid gap-4 sm:flex sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#F2C200]">Partners</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-[#1F2937]">Our Partner Network</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#374151]/80">Strategic partners who support our services and product development.</p>
        </MotionWrapper>
        <MotionWrapper variants={staggerContainer} className="grid gap-6 grid-cols-2 sm:grid-cols-4">
          {partnerList.map((partner) => (
            <MotionWrapper variants={fadeUp} key={partner.id}>
              <div className="flex items-center justify-center rounded-[28px] border border-gray-200/80 bg-white p-6 shadow-md h-full grayscale opacity-60 transition hover:grayscale-0 hover:opacity-100">
                <img src={partner.logo} alt={partner.name} className="h-12 object-contain" />
              </div>
            </MotionWrapper>
          ))}
        </MotionWrapper>
        </div>
      </section>
      <section id="faq" className="bg-[#F7F7F7] text-[#374151] py-20 lg:py-[140px]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <MotionWrapper variants={fadeUp} className="mb-12">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#F2C200]">FAQ</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-[#1F2937]">Frequently Asked Questions</h2>
          </MotionWrapper>
          <MotionWrapper variants={staggerContainer} className="space-y-4">
            {faqList.map((item) => (
              <MotionWrapper variants={fadeUp} key={item.id}>
                <details className="group rounded-[28px] border border-gray-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
                  <summary className="cursor-pointer text-xl font-semibold text-[#1F2937]">{item.question}</summary>
                  <p className="mt-4 text-base leading-relaxed text-[#374151]/80">{item.answer}</p>
                </details>
              </MotionWrapper>
            ))}
          </MotionWrapper>
        </div>
      </section>

      <section id="contact" className="bg-white text-[#374151] py-20 lg:py-[140px]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <MotionWrapper variants={fadeUp}>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl bg-white px-10 py-12 shadow-lg">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#F2C200]">Contact</span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#1F2937]">Contact us for partnerships and collaborations.</h2>
              <div className="mt-10 space-y-6 text-base text-gray-600">
                <p className="flex items-start gap-4"><MapPin className="mt-1 h-5 w-5 text-[#F2C200]" />{company?.contact.address ?? "Gedung ISIMU Entrepreneur, Sulawesi"}</p>
                <p className="flex items-start gap-4"><Mail className="mt-1 h-5 w-5 text-[#F2C200]" />{company?.contact.email ?? "info@isimu.co.id"}</p>
                <p className="flex items-start gap-4"><Users className="mt-1 h-5 w-5 text-[#F2C200]" />{company?.contact.whatsapp ?? "+62 812 3456 7890"}</p>
              </div>
            </div>
            <div className="grid gap-6 rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-lg">
              <iframe
                src={company?.contact.mapUrl ?? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127286.0980125045!2d124.92258656814102!3d1.4378191898338959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMSDEkMOBc8O1dCBQYlQgMSDCk8O2a8O3!5e0!3m2!1sid!2sid!4v0000000000000" }
                className="h-72 w-full rounded-2xl border border-[#E5E7EB]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <ContactForm />
            </div>
          </div>
        </MotionWrapper>
        </div>
      </section>

      <section className="bg-[#111111] text-white">
        <div className="mx-auto max-w-[1320px] px-6 py-24 text-center lg:px-10">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Ready to Build the Future Together?</h2>
          <Link href="#contact" className="mt-8 inline-flex items-center justify-center rounded-full bg-[#F2C200] px-8 py-4 text-base font-semibold text-black transition hover:bg-[#FFD84D]">
            Get Started
          </Link>
        </div>
      </section>

      <footer className="bg-[#111111] text-white py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2C200] text-black font-bold">IE</div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-white">ISIMU</p>
                  <p className="text-xs uppercase tracking-widest text-gray-400">ENTREPRENEUR</p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-gray-400">Developing digital products, technology solutions, and innovative businesses that create real impact.</p>
            </div>
            <div>
              <p className="font-semibold text-white">Navigation</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                {['Home', 'About', 'Products', 'Business', 'News', 'Contact'].map((link) => (
                  <li key={link}><Link href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="transition hover:text-white">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Products</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                {productList.slice(0, 4).map((product) => (
                  <li key={product.id}><Link href="#products" className="transition hover:text-white">{product.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Business Units</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                {businessList.slice(0, 4).map((business) => (
                  <li key={business.id}><Link href="#business-units" className="transition hover:text-white">{business.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-gray-500">© 2026 ISIMU Entrepreneur. All rights reserved.</p>
              <div className="flex gap-6">
                {/* Social media icons would go here */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
