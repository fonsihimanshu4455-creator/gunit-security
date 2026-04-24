import type { Metadata } from "next";
import { Plus, Edit } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { LinkButton } from "@/components/admin/Button";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { deleteHeroSlide } from "@/server/actions/hero-slides";

export const metadata: Metadata = { title: "Hero Slides" };
export const dynamic = "force-dynamic";

export default async function HeroSlidesPage() {
  const items = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="p-8 max-w-6xl">
      <PageHeader
        title="Hero Slides"
        subtitle="Content"
        actions={
          <LinkButton href="/admin/hero-slides/new">
            <Plus className="w-3.5 h-3.5" /> New Slide
          </LinkButton>
        }
      />

      {items.length === 0 ? (
        <p className="text-gray-mid">No hero slides yet.</p>
      ) : (
        <div className="bg-navy-rich border border-navy-light rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy-mid">
              <tr>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">#</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Headline</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">CTA</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Status</th>
                <th className="text-right px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-light">
              {items.map((s) => (
                <tr key={s.id} className="hover:bg-navy-mid/50 transition">
                  <td className="px-4 py-3 text-gray-mid">{s.order}</td>
                  <td className="px-4 py-3 font-medium">{s.headline}</td>
                  <td className="px-4 py-3 text-gray-mid">{s.ctaText ?? "—"}</td>
                  <td className="px-4 py-3">
                    {s.published ? (
                      <span className="text-[10px] tracking-widest text-green-400 bg-green-900/30 px-2 py-0.5 rounded">PUBLISHED</span>
                    ) : (
                      <span className="text-[10px] tracking-widest text-gray-mid bg-navy-light px-2 py-0.5 rounded">DRAFT</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <a href={`/admin/hero-slides/${s.id}`} className="inline-flex items-center gap-1 text-blue-light hover:text-blue-royal text-xs">
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </a>
                      <DeleteForm action={deleteHeroSlide} id={s.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
