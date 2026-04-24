"use client";

import { useTransition } from "react";
import { updateApplicationStatus } from "@/server/actions/applications";

const STATUSES = ["NEW", "REVIEWED", "INTERVIEWED", "REJECTED", "HIRED"] as const;

export function StatusSelect({ id, current }: { id: string; current: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      disabled={isPending}
      defaultValue={current}
      onChange={(e) => {
        const formData = new FormData();
        formData.set("id", id);
        formData.set("status", e.target.value);
        startTransition(() => updateApplicationStatus(formData));
      }}
      className="bg-navy-deep border border-navy-light rounded-lg px-3 py-1.5 text-xs focus:border-red-bright focus:outline-none disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
