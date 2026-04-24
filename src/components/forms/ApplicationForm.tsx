"use client";

import { useActionState, useState } from "react";
import { Send, CheckCircle, Upload, Loader2, X } from "lucide-react";
import { submitApplication, type ApplicationFormState } from "@/server/actions/applications";

const initialState: ApplicationFormState = { ok: false };

const inputClass =
  "w-full bg-navy-deep border border-navy-light rounded-lg px-4 py-3 text-off-white placeholder:text-gray-dark focus:border-red-bright focus:outline-none focus:ring-1 focus:ring-red-bright transition";

const POSITIONS = [
  "Security Guard",
  "Crowd Control Officer",
  "VIP Protection Officer",
  "Mobile Patrol Officer",
  "CCTV Operator",
  "Canine Handler",
  "Concierge Officer",
  "Team Leader / Supervisor",
  "Other",
];

export function ApplicationForm() {
  const [state, formAction, isPending] = useActionState(submitApplication, initialState);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const err = state.fieldErrors ?? {};

  const handleResumeUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setResumeUrl(data.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (state.ok) {
    return (
      <div className="bg-navy-rich border border-green-500/30 rounded-2xl p-10 text-center space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="font-display text-3xl tracking-wider">Application Received</h3>
        <p className="text-gray-mid">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="resumeUrl" value={resumeUrl ?? ""} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest text-gray-mid mb-2">FULL NAME</label>
          <input name="name" className={inputClass} required />
          {err.name && <p className="text-red-bright text-xs mt-1">{err.name[0]}</p>}
        </div>
        <div>
          <label className="block text-xs tracking-widest text-gray-mid mb-2">POSITION</label>
          <select name="position" className={inputClass} defaultValue="" required>
            <option value="" disabled>
              Select a position
            </option>
            {POSITIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {err.position && <p className="text-red-bright text-xs mt-1">{err.position[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest text-gray-mid mb-2">EMAIL</label>
          <input type="email" name="email" className={inputClass} required />
          {err.email && <p className="text-red-bright text-xs mt-1">{err.email[0]}</p>}
        </div>
        <div>
          <label className="block text-xs tracking-widest text-gray-mid mb-2">PHONE</label>
          <input name="phone" className={inputClass} required />
          {err.phone && <p className="text-red-bright text-xs mt-1">{err.phone[0]}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest text-gray-mid mb-2">RESUME</label>
        {resumeUrl ? (
          <div className="flex items-center justify-between bg-navy-deep border border-navy-light rounded-lg px-4 py-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-light hover:text-blue-royal text-sm truncate"
            >
              {resumeUrl.split("/").pop()}
            </a>
            <button
              type="button"
              onClick={() => setResumeUrl(null)}
              className="text-gray-mid hover:text-red-bright"
              aria-label="Remove resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="block border-2 border-dashed border-navy-light hover:border-red-bright rounded-lg p-5 text-center cursor-pointer transition">
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleResumeUpload(file);
              }}
              disabled={uploading}
            />
            {uploading ? (
              <div className="flex items-center justify-center gap-2 text-gray-mid text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading…
              </div>
            ) : (
              <div className="text-gray-mid">
                <Upload className="w-5 h-5 mx-auto mb-1.5" />
                <p className="text-sm">Click to upload resume</p>
                <p className="text-xs opacity-60">PDF or image · max 5MB</p>
              </div>
            )}
          </label>
        )}
        {uploadError && <p className="text-red-bright text-xs mt-1">{uploadError}</p>}
      </div>

      <div>
        <label className="block text-xs tracking-widest text-gray-mid mb-2">
          COVER LETTER <span className="opacity-60 normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          name="coverLetter"
          rows={5}
          className={`${inputClass} resize-y`}
          placeholder="Tell us about your relevant experience and why you'd like to join G Unit Security."
        />
      </div>

      {!state.ok && state.message && (
        <p className="bg-red-deep/20 border border-red-primary/40 text-red-bright text-sm rounded-lg px-4 py-3">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || uploading}
        className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-primary to-red-deep hover:from-red-bright hover:to-red-primary text-white text-xs tracking-[3px] uppercase font-medium px-7 py-4 rounded-lg transition shadow-[0_15px_40px_-15px_rgba(200,16,46,0.5)] disabled:opacity-60"
      >
        {isPending ? "Submitting…" : "Submit Application"}
        <Send className="w-4 h-4 group-hover:translate-x-1 transition" />
      </button>
    </form>
  );
}
