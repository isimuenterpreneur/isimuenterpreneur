"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import { readObject, updateRecord } from "../../../utils/firebaseDB";
import type { CompanyProfile } from "../../../types/firebase";

const initialState: CompanyProfile = {
  heroTitle: "",
  heroDescription: "",
  heroImage: "",
  productsHeadline: "",
  aboutDescription: "",
  contact: {
    address: "",
    whatsapp: "",
    email: "",
    mapUrl: "",
  },
};

export default function AdminSettingsPage() {
  const { user, loading: authLoading } = useFirebaseAuth();
  const [form, setForm] = useState<CompanyProfile>(initialState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await readObject<CompanyProfile>("company");
      if (data) {
        setForm(data);
      }
      setLoading(false);
    };

    load();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await updateRecord<CompanyProfile>("company", form);
      setStatus("Pengaturan berhasil diperbarui.");
    } catch (error) {
      setStatus("Gagal menyimpan pengaturan.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) return <p className="p-10 text-white">Memuat...</p>;
  if (!user) return <p className="p-10 text-white">Silakan login untuk mengakses halaman ini.</p>;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="rounded-3xl border border-white/10 bg-black/70 p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-white">Pengaturan Company Profile</h1>
          <p className="mt-3 text-slate-400">Perbarui konten hero, deskripsi, dan informasi kontak di halaman depan.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block text-sm text-slate-200">
                Judul Hero
                <input
                  value={form.heroTitle}
                  onChange={(event) => setForm((prev) => ({ ...prev, heroTitle: event.target.value }))}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Deskripsi Hero
                <input
                  value={form.heroDescription}
                  onChange={(event) => setForm((prev) => ({ ...prev, heroDescription: event.target.value }))}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>
            <label className="block text-sm text-slate-200">
              URL Gambar Hero
              <input
                value={form.heroImage}
                onChange={(event) => setForm((prev) => ({ ...prev, heroImage: event.target.value }))}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block text-sm text-slate-200">
              Headline Produk
              <input
                value={form.productsHeadline}
                onChange={(event) => setForm((prev) => ({ ...prev, productsHeadline: event.target.value }))}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block text-sm text-slate-200">
              Deskripsi Tentang Kami
              <textarea
                value={form.aboutDescription}
                onChange={(event) => setForm((prev) => ({ ...prev, aboutDescription: event.target.value }))}
                rows={4}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block text-sm text-slate-200">
                Alamat
                <input
                  value={form.contact.address}
                  onChange={(event) => setForm((prev) => ({ ...prev, contact: { ...prev.contact, address: event.target.value } }))}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block text-sm text-slate-200">
                WhatsApp
                <input
                  value={form.contact.whatsapp}
                  onChange={(event) => setForm((prev) => ({ ...prev, contact: { ...prev.contact, whatsapp: event.target.value } }))}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block text-sm text-slate-200">
                Email Kontak
                <input
                  value={form.contact.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, contact: { ...prev.contact, email: event.target.value } }))}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Google Maps URL
                <input
                  value={form.contact.mapUrl}
                  onChange={(event) => setForm((prev) => ({ ...prev, contact: { ...prev.contact, mapUrl: event.target.value } }))}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>
            {status ? <p className="text-sm text-slate-300">{status}</p> : null}
            <button type="submit" disabled={saving} className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#d7a600] disabled:opacity-60">
              {saving ? "Menyimpan..." : "Simpan Pengaturan"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
