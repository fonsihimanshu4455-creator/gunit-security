import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getSiteSettings = cache(async () => {
  return prisma.siteSettings.findFirst();
});

export const getPublishedServices = cache(async () => {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
});

export const getServiceBySlug = cache(async (slug: string) => {
  return prisma.service.findFirst({
    where: { slug, published: true },
  });
});

export const getPublishedIndustries = cache(async () => {
  return prisma.industry.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
});

export const getPublishedTestimonials = cache(async () => {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
});

export const getCoreValues = cache(async () => {
  return prisma.coreValue.findMany({
    orderBy: { order: "asc" },
  });
});

export const getPublishedHeroSlides = cache(async () => {
  return prisma.heroSlide.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
});

export const getPartners = cache(async () => {
  return prisma.partner.findMany({
    orderBy: { order: "asc" },
  });
});
