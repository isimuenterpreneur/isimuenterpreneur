"use client";

import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import AdminLayout from "../../components/AdminLayout";

export default function AdminDashboardPage() {
  const { user, loading } = useFirebaseAuth();

  if (loading) {
    return <p className="p-10 text-white">Memuat...</p>;
  }

  if (!user) {
    return <p className="p-10 text-white">Silakan login untuk mengakses dashboard.</p>;
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="rounded-3xl border border-white/10 bg-black/70 p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-white">Dashboard Admin</h1>
          <p className="mt-3 text-slate-400">Kelola produk, berita, unit usaha, galeri, partner, testimoni, FAQ, dan pesan masuk.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Produk", value: "CRUD" },
            { label: "Berita", value: "CRUD" },
            { label: "Unit Usaha", value: "CRUD" },
            { label: "FAQ", value: "CRUD" },
            { label: "Testimoni", value: "CRUD" },
            { label: "Partner", value: "CRUD" },
            { label: "Pesan Masuk", value: "Lihat" },
            { label: "Pengaturan", value: "Update" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950 p-6 text-white shadow-soft">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">{item.label}</p>
              <p className="mt-6 text-3xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
