"use client";

import { useActionState } from "react";
import type { SiteSettings } from "@prisma/client";
import { Save, CheckCircle } from "lucide-react";
import { updateSettings, type SettingsFormState } from "@/server/actions/settings";
import { FormField, inputClass, textareaClass } from "@/components/admin/FormField";
import { Button } from "@/components/admin/Button";

const initialState: SettingsFormState = { ok: false };

export function SettingsForm({ initial }: { initial: SiteSettings | null }) {
  const [state, formAction, isPending] = useActionState(updateSettings, initialState);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      <section className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-5">
        <h2 className="font-display text-xl tracking-wider">Company</h2>
        <FormField label="Company Name" error={err.companyName?.[0]}>
          <input
            name="companyName"
            defaultValue={initial?.companyName ?? "G Unit Security"}
            className={inputClass}
            required
          />
        </FormField>
        <FormField label="Tagline" error={err.tagline?.[0]}>
          <input name="tagline" defaultValue={initial?.tagline ?? ""} className={inputClass} />
        </FormField>
      </section>

      <section className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-5">
        <h2 className="font-display text-xl tracking-wider">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Phone" error={err.phone?.[0]}>
            <input name="phone" defaultValue={initial?.phone ?? ""} className={inputClass} required />
          </FormField>
          <FormField label="Email" error={err.email?.[0]}>
            <input
              type="email"
              name="email"
              defaultValue={initial?.email ?? ""}
              className={inputClass}
              required
            />
          </FormField>
        </div>
        <FormField label="Address" error={err.address?.[0]}>
          <textarea
            name="address"
            defaultValue={initial?.address ?? ""}
            className={textareaClass}
            required
          />
        </FormField>
        <FormField label="Hours" error={err.hours?.[0]}>
          <input name="hours" defaultValue={initial?.hours ?? ""} className={inputClass} />
        </FormField>
      </section>

      <section className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-5">
        <h2 className="font-display text-xl tracking-wider">Social</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Facebook URL" error={err.facebookUrl?.[0]}>
            <input
              name="facebookUrl"
              defaultValue={initial?.facebookUrl ?? ""}
              className={inputClass}
              placeholder="https://facebook.com/…"
            />
          </FormField>
          <FormField label="Instagram URL" error={err.instagramUrl?.[0]}>
            <input
              name="instagramUrl"
              defaultValue={initial?.instagramUrl ?? ""}
              className={inputClass}
            />
          </FormField>
          <FormField label="LinkedIn URL" error={err.linkedinUrl?.[0]}>
            <input
              name="linkedinUrl"
              defaultValue={initial?.linkedinUrl ?? ""}
              className={inputClass}
            />
          </FormField>
          <FormField label="Twitter URL" error={err.twitterUrl?.[0]}>
            <input
              name="twitterUrl"
              defaultValue={initial?.twitterUrl ?? ""}
              className={inputClass}
            />
          </FormField>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          <Save className="w-3.5 h-3.5" />
          {isPending ? "Saving…" : "Save Settings"}
        </Button>
        {state.ok && (
          <span className="flex items-center gap-1.5 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" /> {state.message}
          </span>
        )}
        {!state.ok && state.message && (
          <span className="text-red-bright text-sm">{state.message}</span>
        )}
      </div>
    </form>
  );
}
