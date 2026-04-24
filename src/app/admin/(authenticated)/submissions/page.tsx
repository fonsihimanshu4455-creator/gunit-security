import type { Metadata } from "next";
import { Mail, Phone, Briefcase, CheckCircle, Circle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { deleteSubmission, markSubmissionRead } from "@/server/actions/submissions";

export const metadata: Metadata = { title: "Contact Inbox" };
export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function SubmissionsPage() {
  const items = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader title="Contact Inbox" subtitle={`${items.length} messages`} />

      {items.length === 0 ? (
        <p className="text-gray-mid">No contact messages yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((m) => (
            <article
              key={m.id}
              className={`bg-navy-rich border rounded-2xl p-6 ${
                m.read ? "border-navy-light" : "border-red-primary/50"
              }`}
            >
              <header className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-2xl tracking-wider">{m.name}</h2>
                    {!m.read && (
                      <span className="text-[10px] tracking-widest text-red-bright bg-red-deep/30 px-2 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-mid mt-1">{formatDate(m.createdAt)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <form action={markSubmissionRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="read" value={(!m.read).toString()} />
                    <button className="inline-flex items-center gap-1 text-xs text-gray-mid hover:text-off-white">
                      {m.read ? (
                        <>
                          <Circle className="w-3.5 h-3.5" /> Mark unread
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" /> Mark read
                        </>
                      )}
                    </button>
                  </form>
                  <DeleteForm action={deleteSubmission} id={m.id} />
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
                <a href={`mailto:${m.email}`} className="flex items-center gap-2 text-blue-light hover:text-blue-royal">
                  <Mail className="w-3.5 h-3.5" /> {m.email}
                </a>
                {m.phone && (
                  <a href={`tel:${m.phone}`} className="flex items-center gap-2 text-blue-light hover:text-blue-royal">
                    <Phone className="w-3.5 h-3.5" /> {m.phone}
                  </a>
                )}
                {m.service && (
                  <span className="flex items-center gap-2 text-gray-mid">
                    <Briefcase className="w-3.5 h-3.5" /> {m.service}
                  </span>
                )}
              </div>

              <p className="text-off-white/90 whitespace-pre-wrap">{m.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
