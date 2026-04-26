import type { Metadata } from "next";
import Link from "next/link";
import { Inbox, Briefcase, Mail, Phone, Calendar, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";

export const metadata: Metadata = { title: "Client Overview" };
export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function ClientDashboardPage() {
  const session = await requireAuth();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalSubmissions,
    unreadSubmissions,
    weekSubmissions,
    totalApps,
    newApps,
    weekApps,
    recentSubs,
    recentApps,
  ] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.contactSubmission.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.careerApplication.count(),
    prisma.careerApplication.count({ where: { status: "NEW" } }),
    prisma.careerApplication.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.contactSubmission.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.careerApplication.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="p-8 space-y-8 max-w-7xl">
      <PageHeader
        title={`Welcome${session.user.name ? `, ${session.user.name}` : ""}`}
        subtitle="Client Portal"
      />

      <div className="bg-gold-accent/5 border border-gold-accent/20 rounded-2xl px-5 py-4 flex items-start gap-3">
        <Eye className="w-4 h-4 text-gold-bright mt-0.5 flex-shrink-0" />
        <div className="text-sm text-off-white/75">
          You have <span className="text-off-white">view-only</span> access to the inquiries and
          applications captured by the website. Need a content change? Contact your developer.
        </div>
      </div>

      <section>
        <h2 className="text-xs tracking-widest text-gray-mid uppercase mb-3">
          Inquiries (Contact Form)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Inquiries"
            value={totalSubmissions}
            href="/admin/client-dashboard/inquiries"
            icon={Inbox}
            accent="red"
          />
          <StatCard
            label="Unread"
            value={unreadSubmissions}
            href="/admin/client-dashboard/inquiries?filter=unread"
            icon={Mail}
            accent="gold"
          />
          <StatCard label="This Week" value={weekSubmissions} icon={Calendar} accent="blue" />
        </div>
      </section>

      <section>
        <h2 className="text-xs tracking-widest text-gray-mid uppercase mb-3">
          Career Applications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Applications"
            value={totalApps}
            href="/admin/client-dashboard/applications"
            icon={Briefcase}
            accent="blue"
          />
          <StatCard
            label="New (Unreviewed)"
            value={newApps}
            href="/admin/client-dashboard/applications?filter=new"
            icon={Phone}
            accent="red"
          />
          <StatCard label="This Week" value={weekApps} icon={Calendar} accent="gold" />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-navy-rich border border-navy-light rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl tracking-wider">Recent Inquiries</h2>
            <Link
              href="/admin/client-dashboard/inquiries"
              className="text-xs text-red-bright hover:text-red-primary"
            >
              View all →
            </Link>
          </div>
          {recentSubs.length === 0 ? (
            <p className="text-gray-mid text-sm">No inquiries yet.</p>
          ) : (
            <ul className="divide-y divide-navy-light">
              {recentSubs.map((s) => (
                <li key={s.id} className="py-3 flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-off-white truncate">{s.name}</p>
                    <p className="text-xs text-gray-mid truncate">
                      {s.email}
                      {s.service ? ` · ${s.service}` : ""}
                    </p>
                    <p className="text-[10px] text-gray-dark mt-1">{formatDate(s.createdAt)}</p>
                  </div>
                  {!s.read && (
                    <span className="text-[10px] tracking-widest text-red-bright bg-red-deep/30 px-2 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-navy-rich border border-navy-light rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl tracking-wider">Recent Applications</h2>
            <Link
              href="/admin/client-dashboard/applications"
              className="text-xs text-red-bright hover:text-red-primary"
            >
              View all →
            </Link>
          </div>
          {recentApps.length === 0 ? (
            <p className="text-gray-mid text-sm">No applications yet.</p>
          ) : (
            <ul className="divide-y divide-navy-light">
              {recentApps.map((a) => (
                <li key={a.id} className="py-3 flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-off-white truncate">{a.name}</p>
                    <p className="text-xs text-gray-mid truncate">{a.position}</p>
                    <p className="text-[10px] text-gray-dark mt-1">{formatDate(a.createdAt)}</p>
                  </div>
                  <span className="text-[10px] tracking-widest text-blue-light bg-blue-primary/20 px-2 py-0.5 rounded">
                    {a.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
