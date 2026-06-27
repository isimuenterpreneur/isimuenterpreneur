"use client";

import { useState } from "react";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";

export default function AdminLoginPage() {
  const { login, error, loading, user } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return <p className="p-10 text-white">Anda sudah masuk. Silakan buka <a href="/admin" className="text-primary">Dashboard</a>.</p>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
      <div className="w-full max-w-md rounded-[40px] border border-white/10 bg-slate-900 p-10 shadow-soft">
        <h1 className="text-3xl font-semibold text-white">Admin Login</h1>
        <p className="mt-3 text-slate-400">Masuk dengan akun Firebase untuk mengelola konten website.</p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <label className="block text-sm text-slate-200">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block text-sm text-slate-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#d7a600] disabled:opacity-60">
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
