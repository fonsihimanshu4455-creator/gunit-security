import type { Metadata } from "next";
import { Mail, Phone, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { deleteApplication } from "@/server/actions/applications";
import { StatusSelect } from "./StatusSelect";
import type { ApplicationStatus } from "@prisma/client";

export const metadata: Metadata = { title: "Career Applications" };
export const dynamic = "force-dynamic";

const statusColor: Record<ApplicationStatus, string> = {
  NEW: "text-red-bright bg-red-deep/30",
  REVIEWED: "text-blue-light bg-blue-primary/20",
  INTERVIEWED: "text-gold-accent bg-gold-accent/10",
  REJECTED: "text-gray-mid bg-navy-light",
  HIRED: "text-green-400 bg-green-900/30",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function ApplicationsPage() {
  const items = await prisma.careerApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader title="Career Applications" subtitle={`${items.length} applicants`} />

      {items.length === 0 ? (
        <p className="text-gray-mid">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((a) => (
            <article key={a.id} className="bg-navy-rich border border-navy-light rounded-2xl p-6">
              <header className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-2xl tracking-wider">{a.name}</h2>
                    <span className={`text-[10px] tracking-widest px-2 py-0.5 rounded ${statusColor[a.status]}`}>
                      {a.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-mid mt-1">Applied for: {a.position}</p>
                  <p className="text-xs text-gray-dark mt-0.5">{formatDate(a.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusSelect id={a.id} current={a.status} />
                  <DeleteForm action={deleteApplication} id={a.id} />
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
                <a href={`mailto:${a.email}`} className="flex items-center gap-2 text-blue-light hover:text-blue-royal">
                  <Mail className="w-3.5 h-3.5" /> {a.email}
                </a>
                <a href={`tel:${a.phone}`} className="flex items-center gap-2 text-blue-light hover:text-blue-royal">
                  <Phone className="w-3.5 h-3.5" /> {a.phone}
                </a>
                {a.resumeUrl && (
                  <a
                    href={a.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-light hover:text-blue-royal"
                  >
                    <FileText className="w-3.5 h-3.5" /> View Resume
                  </a>
                )}
              </div>

              {a.coverLetter && (
                <div className="bg-navy-deep rounded-lg p-4 mt-3">
                  <p className="text-xs tracking-widest text-gray-mid mb-2">COVER LETTER</p>
                  <p className="text-off-white/90 text-sm whitespace-pre-wrap">{a.coverLetter}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
