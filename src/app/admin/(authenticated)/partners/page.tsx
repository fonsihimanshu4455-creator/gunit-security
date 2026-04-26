import type { Metadata } from "next";
import Image from "next/image";
import { Plus, Edit } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { LinkButton } from "@/components/admin/Button";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { deletePartner } from "@/server/actions/partners";

export const metadata: Metadata = { title: "Partners" };
export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const items = await prisma.partner.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="p-8 max-w-6xl">
      <PageHeader
        title="Partners"
        subtitle="Content"
        actions={
          <LinkButton href="/admin/partners/new">
            <Plus className="w-3.5 h-3.5" /> New Partner
          </LinkButton>
        }
      />

      {items.length === 0 ? (
        <p className="text-gray-mid">No partners yet.</p>
      ) : (
        <div className="bg-navy-rich border border-navy-light rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy-mid">
              <tr>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">#</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Logo</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Name</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Website</th>
                <th className="text-right px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-light">
              {items.map((p) => (
                <tr key={p.id} className="hover:bg-navy-mid/50 transition">
                  <td className="px-4 py-3 text-gray-mid">{p.order}</td>
                  <td className="px-4 py-3">
                    {p.logoUrl ? (
                      <Image
                        src={p.logoUrl}
                        alt={p.name}
                        width={48}
                        height={48}
                        unoptimized
                        className="w-12 h-12 rounded object-contain bg-navy-deep"
                      />
                    ) : (
                      <span className="text-gray-dark text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-gray-mid text-xs truncate max-w-[280px]">{p.website ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <a href={`/admin/partners/${p.id}`} className="inline-flex items-center gap-1 text-blue-light hover:text-blue-royal text-xs">
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </a>
                      <DeleteForm action={deletePartner} id={p.id} />
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
