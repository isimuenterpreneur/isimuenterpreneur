"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";

type DriveImageUploaderProps = {
  onUpload: (url: string) => void;
  label?: string;
  helperText?: string;
};

export default function DriveImageUploader({ onUpload, label = "Upload gambar", helperText = "Unggah gambar ke folder Google Drive Anda." }: DriveImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/drive/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengupload gambar.");
      }

      onUpload(data.url);
      setStatus("Gambar berhasil diupload ke Google Drive.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Gagal mengupload gambar.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="rounded-3xl border border-dashed border-slate-600 bg-slate-950/60 p-4">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-5 text-center text-sm text-slate-300 transition hover:border-primary hover:text-white">
        <UploadCloud className="h-5 w-5 text-primary" />
        <span className="font-semibold text-white">{label}</span>
        <span className="text-xs text-slate-400">{helperText}</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </label>
      {uploading ? <p className="mt-3 text-sm text-primary">Mengupload...</p> : null}
      {status ? <p className="mt-3 text-sm text-slate-300">{status}</p> : null}
    </div>
  );
}
