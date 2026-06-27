"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  const menuItems = ['Home', 'About', 'Products', 'Business', 'News', 'Contact'];

  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      animate={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        backdropFilter: scrolled ? "blur(8px)" : "none",
        boxShadow: scrolled ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none",
      }}
    >
      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        <motion.div 
          className="flex items-center justify-between gap-4"
          animate={{ paddingTop: scrolled ? "1rem" : "1.5rem", paddingBottom: scrolled ? "1rem" : "1.5rem" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Link href="/" className="flex items-center gap-3">
            <motion.div 
              className="flex items-center justify-center rounded-full bg-[#F2C200] text-black font-bold text-base"
              animate={{ height: scrolled ? '2.5rem' : '3rem', width: scrolled ? '2.5rem' : '3rem' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              IE
            </motion.div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#1F2937]">ISIMU</p>
              <p className="text-xs uppercase tracking-widest text-gray-500/80">ENTREPRENEUR</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-base font-medium text-[#374151] xl:flex">
            {menuItems.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="transition hover:text-[#1F2937]">{link}</a>
            ))}
          </nav>
          <a href="#contact" className="hidden rounded-full bg-[#111111] px-6 py-3 text-base font-semibold text-white transition hover:bg-black/80 xl:inline-flex">Get Started</a>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;