import type { ReactNode } from "react";

export function FormField({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs tracking-widest text-gray-mid mb-2">
        {label.toUpperCase()}
      </label>
      {children}
      {hint && <p className="text-gray-dark text-xs mt-1">{hint}</p>}
      {error && <p className="text-red-bright text-xs mt-1">{error}</p>}
    </div>
  );
}

export const inputClass =
  "w-full bg-navy-deep border border-navy-light rounded-lg px-4 py-2.5 text-off-white focus:border-red-bright focus:outline-none focus:ring-1 focus:ring-red-bright transition";

export const textareaClass = `${inputClass} resize-y min-h-[100px]`;
