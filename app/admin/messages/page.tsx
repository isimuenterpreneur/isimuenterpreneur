"use client";

import AdminLayout from "../../../components/AdminLayout";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import { useFirebaseData } from "../../../hooks/useFirebaseData";
import { deleteRecord } from "../../../utils/firebaseDB";
import type { MessageItem } from "../../../types/firebase";

export default function AdminMessagesPage() {
  const { user, loading: authLoading } = useFirebaseAuth();
  const { data, loading, error } = useFirebaseData<MessageItem>("messages");

  if (authLoading) return <p className="p-10 text-white">Memuat...</p>;
  if (!user) return <p className="p-10 text-white">Silakan login untuk mengakses halaman ini.</p>;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="rounded-3xl border border-white/10 bg-black/70 p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-white">Pesan Masuk</h1>
          <p className="mt-3 text-slate-400">Lihat pesan pelanggan dan hapus jika sudah ditanggapi.</p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4 pb-6">
            <h2 className="text-xl font-semibold text-white">Pesan</h2>
            <span className="text-sm text-slate-400">{loading ? "Memuat..." : `${data.length} pesan`}</span>
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <div className="space-y-4">
            {loading ? (
              <p className="text-slate-400">Memuat pesan...</p>
            ) : data.length === 0 ? (
              <p className="text-slate-400">Belum ada pesan masuk.</p>
            ) : (
              data.map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-900 p-5 text-white shadow-soft">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-sm text-slate-400">{item.email} • {new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                    <button
                      className="rounded-full border border-red-500 px-4 py-2 text-red-400 transition hover:bg-red-500/10"
                      onClick={async () => {
                        if (confirm("Hapus pesan ini?")) {
                          await deleteRecord(`messages/${item.id}`);
                        }
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">{item.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
