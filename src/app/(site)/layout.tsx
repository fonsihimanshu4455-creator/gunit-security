import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <div className="flex-1 pt-[72px]">{children}</div>
      <Footer />
    </div>
  );
}
