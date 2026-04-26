import type { Metadata } from "next";
import Image from "next/image";
import { Plus, Edit } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { LinkButton } from "@/components/admin/Button";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { deleteTeamMember } from "@/server/actions/team-members";

export const metadata: Metadata = { title: "Team Members" };
export const dynamic = "force-dynamic";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function TeamMembersPage() {
  const items = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="p-8 max-w-6xl">
      <PageHeader
        title="Team Members"
        subtitle="Content"
        actions={
          <LinkButton href="/admin/team-members/new">
            <Plus className="w-3.5 h-3.5" /> New Team Member
          </LinkButton>
        }
      />

      {items.length === 0 ? (
        <p className="text-gray-mid">No team members yet.</p>
      ) : (
        <div className="bg-navy-rich border border-navy-light rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy-mid">
              <tr>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">#</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Photo</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Name</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Role</th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Status</th>
                <th className="text-right px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-light">
              {items.map((m) => (
                <tr key={m.id} className="hover:bg-navy-mid/50 transition">
                  <td className="px-4 py-3 text-gray-mid">{m.order}</td>
                  <td className="px-4 py-3">
                    {m.photoUrl ? (
                      <Image
                        src={m.photoUrl}
                        alt={m.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-primary to-blue-primary flex items-center justify-center font-display text-xs tracking-widest">
                        {initials(m.name)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-gray-mid text-xs">{m.role}</td>
                  <td className="px-4 py-3">
                    {m.isActive ? (
                      <span className="text-[10px] tracking-widest text-green-400 bg-green-900/30 px-2 py-0.5 rounded">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] tracking-widest text-gray-mid bg-navy-light px-2 py-0.5 rounded">
                        HIDDEN
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <a
                        href={`/admin/team-members/${m.id}`}
                        className="inline-flex items-center gap-1 text-blue-light hover:text-blue-royal text-xs"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </a>
                      <DeleteForm action={deleteTeamMember} id={m.id} />
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
