import type { Metadata } from "next";
import { Plus, Edit } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { LinkButton } from "@/components/admin/Button";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { deleteCoreValue } from "@/server/actions/core-values";

export const metadata: Metadata = { title: "Core Values" };
export const dynamic = "force-dynamic";

export default async function CoreValuesPage() {
  const items = await prisma.coreValue.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="p-8 max-w-6xl">
      <PageHeader
        title="Core Values"
        subtitle="Content"
        actions={
          <LinkButton href="/admin/core-values/new">
            <Plus className="w-3.5 h-3.5" /> New Value
          </LinkButton>
        }
      />

      {items.length === 0 ? (
        <p className="text-gray-mid">No core values yet.</p>
      ) : (
        <div className="bg-navy-rich border border-navy-light rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy-mid">
              <tr>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">#</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Title</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Icon</th>
                <th className="text-right px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-light">
              {items.map((v) => (
                <tr key={v.id} className="hover:bg-navy-mid/50 transition">
                  <td className="px-4 py-3 text-gray-mid">{v.order}</td>
                  <td className="px-4 py-3 font-medium">{v.title}</td>
                  <td className="px-4 py-3 text-gray-mid font-mono text-xs">{v.icon}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <a href={`/admin/core-values/${v.id}`} className="inline-flex items-center gap-1 text-blue-light hover:text-blue-royal text-xs">
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </a>
                      <DeleteForm action={deleteCoreValue} id={v.id} />
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
