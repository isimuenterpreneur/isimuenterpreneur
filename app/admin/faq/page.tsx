"use client";

import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import { useFirebaseData } from "../../../hooks/useFirebaseData";
import { deleteRecord, writeRecord } from "../../../utils/firebaseDB";
import type { FAQItem } from "../../../types/firebase";

const initial: Omit<FAQItem, "id"> = { question: "", answer: "" };

export default function AdminFAQPage() {
  const { user, loading: authLoading } = useFirebaseAuth();
  const { data, loading, error } = useFirebaseData<FAQItem>("faq");
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await writeRecord("faq", form);
      setForm(initial);
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
          <h1 className="text-3xl font-semibold text-white">Kelola FAQ</h1>
          <p className="mt-3 text-slate-400">Tambahkan pertanyaan umum dan jawabannya untuk halaman company profile.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4 pb-6">
              <h2 className="text-xl font-semibold text-white">Daftar FAQ</h2>
              <span className="text-sm text-slate-400">{loading ? "Memuat..." : `${data.length} item`}</span>
            </div>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <div className="space-y-4">
              {data.map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-900 p-5 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold">{item.question}</p>
                      <p className="mt-2 text-sm text-slate-400">{item.answer}</p>
                    </div>
                    <button
                      className="rounded-full border border-red-500 px-4 py-2 text-red-400 transition hover:bg-red-500/10"
                      onClick={async () => {
                        if (confirm("Hapus FAQ ini?")) {
                          await deleteRecord(`faq/${item.id}`);
                        }
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/70 p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-white">Tambah FAQ</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm text-slate-200">
                Pertanyaan
                <input
                  value={form.question}
                  onChange={(event) => setForm((prev) => ({ ...prev, question: event.target.value }))}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Jawaban
                <textarea
                  value={form.answer}
                  onChange={(event) => setForm((prev) => ({ ...prev, answer: event.target.value }))}
                  rows={5}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <button type="submit" disabled={saving} className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#d7a600] disabled:opacity-60">
                {saving ? "Menyimpan..." : "Simpan FAQ"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
