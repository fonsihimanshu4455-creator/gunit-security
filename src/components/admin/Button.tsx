import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-red-primary to-red-deep hover:from-red-bright hover:to-red-primary text-white",
  secondary: "bg-navy-mid hover:bg-navy-light text-off-white border border-navy-light",
  danger: "bg-red-deep/30 hover:bg-red-primary text-red-bright hover:text-white border border-red-primary/40",
  ghost: "text-gray-mid hover:text-off-white",
};

const base =
  "inline-flex items-center gap-1.5 font-medium tracking-widest uppercase text-xs px-4 py-2.5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button className={`${base} ${variantClass[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variantClass[variant]} ${className}`}>
      {children}
    </Link>
  );
}
