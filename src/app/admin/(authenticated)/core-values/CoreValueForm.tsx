"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import type { CoreValue } from "@prisma/client";
import { Save, CheckCircle } from "lucide-react";
import {
  createCoreValue,
  updateCoreValue,
  type CoreValueFormState,
} from "@/server/actions/core-values";
import { FormField, inputClass, textareaClass } from "@/components/admin/FormField";
import { Button } from "@/components/admin/Button";

const initialState: CoreValueFormState = { ok: false };

export function CoreValueForm({ initial }: { initial?: CoreValue }) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const action = isEdit ? updateCoreValue.bind(null, initial!.id) : createCoreValue;

  const [state, formAction, isPending] = useActionState(action, initialState);
  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      <section className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-5">
        <FormField label="Title" error={err.title?.[0]}>
          <input name="title" defaultValue={initial?.title ?? ""} className={inputClass} required />
        </FormField>
        <FormField label="Description" error={err.description?.[0]}>
          <textarea
            name="description"
            defaultValue={initial?.description ?? ""}
            className={textareaClass}
            rows={3}
            required
          />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Icon" error={err.icon?.[0]} hint="Lucide icon name">
            <input name="icon" defaultValue={initial?.icon ?? ""} placeholder="Heart" className={inputClass} required />
          </FormField>
          <FormField label="Order" error={err.order?.[0]}>
            <input type="number" name="order" defaultValue={initial?.order ?? 0} className={inputClass} />
          </FormField>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          <Save className="w-3.5 h-3.5" />
          {isPending ? "Saving…" : isEdit ? "Save Changes" : "Create Value"}
        </Button>
        <button type="button" onClick={() => router.push("/admin/core-values")} className="text-gray-mid hover:text-off-white text-sm">
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
