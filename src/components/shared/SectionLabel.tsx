export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-red-bright text-xs tracking-[4px] font-medium uppercase">
      <span className="w-8 h-px bg-red-bright" />
      {children}
      <span className="w-8 h-px bg-red-bright" />
    </div>
  );
}
