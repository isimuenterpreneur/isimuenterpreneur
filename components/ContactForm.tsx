"use client";

import { useState } from "react";
import { writeRecord } from "../utils/firebaseDB";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await writeRecord("messages", {
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      });
      setName("");
      setEmail("");
      setMessage("");
      setStatus("Pesan berhasil dikirim. Terima kasih.");
    } catch (error) {
      setStatus("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-[#374151]">Nama</span>
        <input value={name} onChange={(event) => setName(event.target.value)} required className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-[#1F2937] placeholder-gray-400 outline-none focus:border-[#F2C200] focus:ring-2 focus:ring-[#F2C200]/50" placeholder="Nama Anda" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-[#374151]">Email</span>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-[#1F2937] placeholder-gray-400 outline-none focus:border-[#F2C200] focus:ring-2 focus:ring-[#F2C200]/50" placeholder="email@domain.com" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-[#374151]">Pesan</span>
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={4} required className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-[#1F2937] placeholder-gray-400 outline-none focus:border-[#F2C200] focus:ring-2 focus:ring-[#F2C200]/50" placeholder="Tulis pesan Anda..." />
      </label>
      {status ? <p className="text-sm text-gray-600">{status}</p> : null}
      <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/80 disabled:opacity-60">
        {submitting ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  );
}
