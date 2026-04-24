"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export function DeleteForm({
  action,
  id,
  label = "Delete",
  confirmText = "Are you sure? This cannot be undone.",
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  label?: string;
  confirmText?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        if (!confirm(confirmText)) return;
        startTransition(() => action(formData));
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-1 text-red-bright hover:text-red-primary text-xs font-medium disabled:opacity-50"
      >
        <Trash2 className="w-3.5 h-3.5" />
        {isPending ? "Deleting…" : label}
      </button>
    </form>
  );
}
