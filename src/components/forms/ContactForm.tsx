"use client";

import { useActionState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { submitContact, type ContactFormState } from "@/server/actions/submissions";

const initialState: ContactFormState = { ok: false };

const inputClass =
  "w-full bg-navy-deep border border-navy-light rounded-lg px-4 py-3 text-off-white placeholder:text-gray-dark focus:border-red-bright focus:outline-none focus:ring-1 focus:ring-red-bright transition";

const SERVICES = [
  "VIP Protection",
  "Crowd Control",
  "CCTV Monitoring",
  "Mobile Patrols",
  "Financial Escorts",
  "Canine Security",
  "Concierge Services",
  "Security Guards",
  "Other",
];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const err = state.fieldErrors ?? {};

  if (state.ok) {
    return (
      <div className="bg-navy-rich border border-green-500/30 rounded-2xl p-10 text-center space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="font-display text-3xl tracking-wider">Message Sent</h3>
        <p className="text-gray-mid">{state.message}</p>
        <p className="text-xs text-gray-dark">
          For urgent matters, call us directly any time of day.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest text-gray-mid mb-2">NAME</label>
          <input name="name" className={inputClass} required />
          {err.name && <p className="text-red-bright text-xs mt-1">{err.name[0]}</p>}
        </div>
        <div>
          <label className="block text-xs tracking-widest text-gray-mid mb-2">EMAIL</label>
          <input type="email" name="email" className={inputClass} required />
          {err.email && <p className="text-red-bright text-xs mt-1">{err.email[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest text-gray-mid mb-2">PHONE</label>
          <input name="phone" className={inputClass} placeholder="Optional" />
          {err.phone && <p className="text-red-bright text-xs mt-1">{err.phone[0]}</p>}
        </div>
        <div>
          <label className="block text-xs tracking-widest text-gray-mid mb-2">SERVICE</label>
          <select name="service" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest text-gray-mid mb-2">MESSAGE</label>
        <textarea
          name="message"
          rows={6}
          className={`${inputClass} resize-y`}
          placeholder="Tell us about your security needs…"
          required
        />
        {err.message && <p className="text-red-bright text-xs mt-1">{err.message[0]}</p>}
      </div>

      {!state.ok && state.message && (
        <p className="bg-red-deep/20 border border-red-primary/40 text-red-bright text-sm rounded-lg px-4 py-3">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-primary to-red-deep hover:from-red-bright hover:to-red-primary text-white text-xs tracking-[3px] uppercase font-medium px-7 py-4 rounded-lg transition shadow-[0_15px_40px_-15px_rgba(200,16,46,0.5)] disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send Message"}
        <Send className="w-4 h-4 group-hover:translate-x-1 transition" />
      </button>
    </form>
  );
}
