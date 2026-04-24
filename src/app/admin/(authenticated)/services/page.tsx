import type { Metadata } from "next";
import { Plus, Edit } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { LinkButton } from "@/components/admin/Button";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { deleteService } from "@/server/actions/services";

export const metadata: Metadata = { title: "Services" };
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="p-8 max-w-6xl">
      <PageHeader
        title="Services"
        subtitle="Content"
        actions={
          <LinkButton href="/admin/services/new">
            <Plus className="w-3.5 h-3.5" /> New Service
          </LinkButton>
        }
      />

      {services.length === 0 ? (
        <p className="text-gray-mid">No services yet.</p>
      ) : (
        <div className="bg-navy-rich border border-navy-light rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy-mid">
              <tr>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">
                  #
                </th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">
                  Slug
                </th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-light">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-navy-mid/50 transition">
                  <td className="px-4 py-3 text-gray-mid">{s.order}</td>
                  <td className="px-4 py-3 font-medium">{s.title}</td>
                  <td className="px-4 py-3 text-gray-mid font-mono text-xs">{s.slug}</td>
                  <td className="px-4 py-3">
                    {s.published ? (
                      <span className="text-[10px] tracking-widest text-green-400 bg-green-900/30 px-2 py-0.5 rounded">
                        PUBLISHED
                      </span>
                    ) : (
                      <span className="text-[10px] tracking-widest text-gray-mid bg-navy-light px-2 py-0.5 rounded">
                        DRAFT
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <a
                        href={`/admin/services/${s.id}`}
                        className="inline-flex items-center gap-1 text-blue-light hover:text-blue-royal text-xs"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </a>
                      <DeleteForm action={deleteService} id={s.id} />
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
