import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Building2, MessageSquareQuote, Inbox, Briefcase, HeartHandshake, Image as ImageIcon, Handshake } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/admin/StatCard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [
    services,
    industries,
    testimonials,
    coreValues,
    heroSlides,
    partners,
    submissions,
    unreadSubmissions,
    applications,
    newApplications,
    recentSubmissions,
    recentApplications,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.industry.count(),
    prisma.testimonial.count(),
    prisma.coreValue.count(),
    prisma.heroSlide.count(),
    prisma.partner.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.careerApplication.count(),
    prisma.careerApplication.count({ where: { status: "NEW" } }),
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
      <header>
        <p className="text-red-bright tracking-[3px] text-[10px] font-medium">OVERVIEW</p>
        <h1 className="font-display text-5xl tracking-wider mt-1">Dashboard</h1>
      </header>

      <section>
        <h2 className="text-xs tracking-widest text-gray-mid uppercase mb-3">Inbox</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            label={`Contact Messages · ${unreadSubmissions} unread`}
            value={submissions}
            href="/admin/submissions"
            icon={Inbox}
            accent="red"
          />
          <StatCard
            label={`Career Applications · ${newApplications} new`}
            value={applications}
            href="/admin/applications"
            icon={Briefcase}
            accent="blue"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xs tracking-widest text-gray-mid uppercase mb-3">Content</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatCard label="Services" value={services} href="/admin/services" icon={Shield} accent="red" />
          <StatCard label="Industries" value={industries} href="/admin/industries" icon={Building2} accent="blue" />
          <StatCard label="Testimonials" value={testimonials} href="/admin/testimonials" icon={MessageSquareQuote} accent="gold" />
          <StatCard label="Core Values" value={coreValues} href="/admin/core-values" icon={HeartHandshake} accent="red" />
          <StatCard label="Hero Slides" value={heroSlides} href="/admin/hero-slides" icon={ImageIcon} accent="blue" />
          <StatCard label="Partners" value={partners} href="/admin/partners" icon={Handshake} accent="gold" />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-navy-rich border border-navy-light rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl tracking-wider">Recent Contacts</h2>
            <Link href="/admin/submissions" className="text-xs text-red-bright hover:text-red-primary">
              View all →
            </Link>
          </div>
          {recentSubmissions.length === 0 ? (
            <p className="text-gray-mid text-sm">No contact messages yet.</p>
          ) : (
            <ul className="divide-y divide-navy-light">
              {recentSubmissions.map((s) => (
                <li key={s.id} className="py-3 flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-off-white truncate">{s.name}</p>
                    <p className="text-xs text-gray-mid truncate">
                      {s.email}
                      {s.service ? ` · ${s.service}` : ""}
                    </p>
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
            <Link href="/admin/applications" className="text-xs text-red-bright hover:text-red-primary">
              View all →
            </Link>
          </div>
          {recentApplications.length === 0 ? (
            <p className="text-gray-mid text-sm">No career applications yet.</p>
          ) : (
            <ul className="divide-y divide-navy-light">
              {recentApplications.map((a) => (
                <li key={a.id} className="py-3 flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-off-white truncate">{a.name}</p>
                    <p className="text-xs text-gray-mid truncate">{a.position}</p>
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
