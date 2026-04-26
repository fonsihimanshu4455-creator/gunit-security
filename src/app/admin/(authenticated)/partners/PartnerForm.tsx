"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import type { Partner } from "@prisma/client";
import { Save, CheckCircle } from "lucide-react";
import {
  createPartner,
  updatePartner,
  type PartnerFormState,
} from "@/server/actions/partners";
import { FormField, inputClass } from "@/components/admin/FormField";
import { Button } from "@/components/admin/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";

const initialState: PartnerFormState = { ok: false };

const CATEGORY_OPTIONS = ["Client Portfolio", "Trusts We Won", "Partners", "Certifications"];

export function PartnerForm({ initial }: { initial?: Partner }) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const action = isEdit ? updatePartner.bind(null, initial!.id) : createPartner;

  const [state, formAction, isPending] = useActionState(action, initialState);
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl ?? null);
  const [width, setWidth] = useState(initial?.width ?? 150);
  const [height, setHeight] = useState(initial?.height ?? 80);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="logoUrl" value={logoUrl ?? ""} />

      <section className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Name" error={err.name?.[0]}>
            <input name="name" defaultValue={initial?.name ?? ""} className={inputClass} required />
          </FormField>
          <FormField label="Category" error={err.category?.[0]}>
            <select
              name="category"
              defaultValue={initial?.category ?? CATEGORY_OPTIONS[0]}
              className={inputClass}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Website" error={err.website?.[0]} hint="Optional">
            <input
              name="website"
              defaultValue={initial?.website ?? ""}
              className={inputClass}
              placeholder="https://example.com"
            />
          </FormField>
          <FormField label="Order" error={err.order?.[0]}>
            <input
              type="number"
              name="order"
              defaultValue={initial?.order ?? 0}
              className={inputClass}
            />
          </FormField>
        </div>

        <ImageUpload folder="partner" label="Logo" value={logoUrl} onChange={setLogoUrl} />
      </section>

      <section className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-5">
        <h2 className="font-display text-xl tracking-wider">Display Size</h2>
        <p className="text-xs text-gray-mid -mt-2">
          How big this logo renders inside the marquee. Adjust if a logo looks too small or too
          stretched.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label={`Width: ${width}px`} error={err.width?.[0]}>
            <input
              type="range"
              name="width"
              min={40}
              max={400}
              step={10}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full accent-red-bright"
            />
          </FormField>
          <FormField label={`Height: ${height}px`} error={err.height?.[0]}>
            <input
              type="range"
              name="height"
              min={20}
              max={200}
              step={5}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-red-bright"
            />
          </FormField>
        </div>
        {logoUrl && (
          <div className="bg-navy-deep border border-navy-light rounded-lg p-5 flex items-center justify-center">
            <div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 flex items-center justify-center"
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
        <FormField label="Status">
          <label className="flex items-center gap-2 h-[42px]">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={initial?.isActive ?? true}
              className="w-4 h-4 accent-red-bright"
            />
            <span className="text-sm">Active (shown on the public site)</span>
          </label>
        </FormField>
      </section>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          <Save className="w-3.5 h-3.5" />
          {isPending ? "Saving…" : isEdit ? "Save Changes" : "Create Partner"}
        </Button>
        <button
          type="button"
          onClick={() => router.push("/admin/partners")}
          className="text-gray-mid hover:text-off-white text-sm"
        >
          Cancel
        </button>
        {state.ok && isEdit && (
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
