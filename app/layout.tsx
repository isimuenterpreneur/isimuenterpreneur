import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ISIMU ENTREPRENEUR | Building Solutions for Everyday Life",
  description: "ISIMU Entrepreneur develops digital products, technology solutions, and innovative businesses that create real impact.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
