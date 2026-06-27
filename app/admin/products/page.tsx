"use client";

import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import DriveImageUploader from "../../../components/DriveImageUploader";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import { useFirebaseData } from "../../../hooks/useFirebaseData";
import { deleteRecord, updateRecord, writeRecord } from "../../../utils/firebaseDB";
import type { ProductItem } from "../../../types/firebase";

const initial: Omit<ProductItem, "id"> = {
  name: "",
  description: "",
  icon: "",
  featuredImage: "",
};

export default function AdminProductsPage() {
  const { user, loading: authLoading } = useFirebaseAuth();
  const { data, loading, error } = useFirebaseData<ProductItem>("products");
  const [form, setForm] = useState(initial);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = (item: ProductItem) => {
    setForm({
      name: item.name,
      description: item.description,
      icon: item.icon,
      featuredImage: item.featuredImage ?? "",
    });
    setActiveId(item.id);
  };

  const handleCancel = () => {
    setActiveId(null);
    setForm(initial);
  };

  const handleImageUpload = (url: string) => {
    setForm((prev) => ({ ...prev, featuredImage: url }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (activeId) {
        await updateRecord<ProductItem>(`products/${activeId}`, form);
      } else {
        await writeRecord("products", form);
      }
      setForm(initial);
      setActiveId(null);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return <p className="p-10 text-white">Memuat...</p>;
  }

  if (!user) {
    return <p className="p-10 text-white">Silakan login untuk mengakses halaman ini.</p>;
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="rounded-3xl border border-white/10 bg-black/70 p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-white">Kelola Produk</h1>
          <p className="mt-3 text-slate-400">Tambah, edit, atau hapus produk yang ditampilkan di halaman utama.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4 pb-6">
              <h2 className="text-xl font-semibold text-white">Daftar Produk</h2>
              <span className="text-sm text-slate-400">{loading ? "Memuat..." : `${data.length} item`}</span>
            </div>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <div className="space-y-4">
              {data.map((product) => (
                <div key={product.id} className="rounded-3xl border border-white/10 bg-slate-900 p-5 text-white">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xl font-semibold">{product.name}</p>
                      <p className="mt-2 text-sm text-slate-400">{product.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-full border border-white/10 px-4 py-2 transition hover:bg-white/5"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Hapus produk ini?")) {
                            await deleteRecord(`products/${product.id}`);
                          }
                        }}
                        className="rounded-full border border-red-500 px-4 py-2 text-red-400 transition hover:bg-red-500/10"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {data.length === 0 && !loading ? <p className="text-slate-400">Belum ada produk tersimpan.</p> : null}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/70 p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-white">{activeId ? "Edit Produk" : "Tambah Produk"}</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm text-slate-200">
                Nama Produk
                <input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Deskripsi
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  rows={4}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Ikon
                <input
                  value={form.icon}
                  onChange={(event) => setForm((prev) => ({ ...prev, icon: event.target.value }))}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <div className="space-y-3">
                <DriveImageUploader
                  onUpload={handleImageUpload}
                  label="Upload gambar produk"
                  helperText="File akan dikirim ke folder Google Drive yang sudah ditentukan."
                />
                <label className="block text-sm text-slate-200">
                  URL Gambar
                  <input
                    value={form.featuredImage}
                    onChange={(event) => setForm((prev) => ({ ...prev, featuredImage: event.target.value }))}
                    className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#d7a600] disabled:opacity-60">
                  {saving ? "Menyimpan..." : activeId ? "Perbarui Produk" : "Simpan Produk"}
                </button>
                {activeId ? (
                  <button type="button" onClick={handleCancel} className="inline-flex flex-1 items-center justify-center rounded-full border border-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/5">
                    Batal
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
