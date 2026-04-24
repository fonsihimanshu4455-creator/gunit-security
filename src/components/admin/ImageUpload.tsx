"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

export function ImageUpload({
  value,
  onChange,
  label = "Image",
}: {
  value?: string | null;
  onChange: (url: string | null) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs tracking-widest text-gray-mid mb-2">{label.toUpperCase()}</label>
      {value ? (
        <div className="relative inline-block group">
          <Image
            src={value}
            alt="Uploaded"
            width={200}
            height={150}
            className="rounded-lg border border-navy-light object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 bg-red-primary hover:bg-red-bright text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"
            aria-label="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label className="block border-2 border-dashed border-navy-light hover:border-red-bright rounded-lg p-6 text-center cursor-pointer transition">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
            disabled={uploading}
          />
          {uploading ? (
            <div className="flex items-center justify-center gap-2 text-gray-mid">
              <Loader2 className="w-4 h-4 animate-spin" /> Uploading…
            </div>
          ) : (
            <div className="text-gray-mid">
              <Upload className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">Click to upload</p>
              <p className="text-xs opacity-60">PNG, JPG, WEBP, GIF, SVG · max 5MB</p>
            </div>
          )}
        </label>
      )}
      {error && <p className="text-red-bright text-xs mt-2">{error}</p>}
    </div>
  );
}
