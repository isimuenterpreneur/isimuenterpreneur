"use client";

import Link from "next/link";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useFirebaseAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-white/10 bg-black/80 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="text-lg font-semibold">ISIMU Admin</div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span>{user ? user.email : loading ? "Memuat..." : "Belum masuk"}</span>
            {user ? (
              <button onClick={logout} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8 lg:px-10">
        <aside className="hidden w-72 flex-col gap-3 rounded-3xl border border-white/10 bg-slate-900 p-6 text-sm text-slate-200 lg:flex">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">Menu</div>
          {[
            { label: "Dashboard", href: "/admin" },
            { label: "Produk", href: "/admin/products" },
            { label: "Berita", href: "/admin/news" },
            { label: "Unit Usaha", href: "/admin/business-units" },
            { label: "Galeri", href: "/admin/gallery" },
            { label: "Partner", href: "/admin/partners" },
            { label: "Testimoni", href: "/admin/testimonials" },
            { label: "FAQ", href: "/admin/faq" },
            { label: "Pesan Masuk", href: "/admin/messages" },
            { label: "Pengaturan", href: "/admin/settings" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="rounded-3xl px-4 py-3 transition hover:bg-white/5">
              {item.label}
            </Link>
          ))}
        </aside>
        <div className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-soft">
          {children}
        </div>
      </div>
    </div>
  );
}
