"use client";

import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import DriveImageUploader from "../../../components/DriveImageUploader";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import { useFirebaseData } from "../../../hooks/useFirebaseData";
import { deleteRecord, writeRecord, updateRecord } from "../../../utils/firebaseDB";
import type { NewsItem } from "../../../types/firebase";

const template: Omit<NewsItem, "id"> = {
  title: "",
  summary: "",
  date: "",
  thumbnail: "",
};

export default function AdminNewsPage() {
  const { user, loading: authLoading } = useFirebaseAuth();
  const { data, loading, error } = useFirebaseData<NewsItem>("news");
  const [form, setForm] = useState<Omit<NewsItem, "id">>(template);
  const [saving, setSaving] = useState(false);

  const handleChange = (key: keyof typeof template, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (url: string) => {
    setForm((prev) => ({ ...prev, thumbnail: url }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await writeRecord("news", form);
      setForm(template);
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
          <h1 className="text-3xl font-semibold text-white">Kelola Berita</h1>
          <p className="mt-3 text-slate-400">Tambahkan berita baru, edit ringkasan, dan kelola thumbnail untuk halaman utama.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4 pb-6">
              <h2 className="text-xl font-semibold text-white">Berita</h2>
              <span className="text-sm text-slate-400">{loading ? "Memuat..." : `${data.length} item`}</span>
            </div>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <div className="space-y-4">
              {data.map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-900 p-5 text-white">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-400">{item.date}</p>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <button className="rounded-full border border-white/10 px-4 py-2 transition hover:bg-white/5">Edit</button>
                      <button
                        className="rounded-full border border-red-500 px-4 py-2 text-red-400 transition hover:bg-red-500/10"
                        onClick={async () => {
                          if (confirm("Hapus berita ini?")) {
                            await deleteRecord(`news/${item.id}`);
                          }
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/70 p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-white">Tambahkan Berita</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm text-slate-200">
                Judul
                <input
                  value={form.title}
                  onChange={(event) => handleChange("title", event.target.value)}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Ringkasan
                <textarea
                  value={form.summary}
                  onChange={(event) => handleChange("summary", event.target.value)}
                  rows={4}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Tanggal
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) => handleChange("date", event.target.value)}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <div className="space-y-3">
                <DriveImageUploader
                  onUpload={handleImageUpload}
                  label="Upload thumbnail berita"
                  helperText="Gambar akan tersimpan ke Google Drive dan langsung dipakai sebagai thumbnail."
                />
                <label className="block text-sm text-slate-200">
                  Thumbnail URL
                  <input
                    value={form.thumbnail}
                    onChange={(event) => handleChange("thumbnail", event.target.value)}
                    required
                    className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>
              <button type="submit" disabled={saving} className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#d7a600] disabled:opacity-60">
                {saving ? "Menyimpan..." : "Simpan Berita"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
