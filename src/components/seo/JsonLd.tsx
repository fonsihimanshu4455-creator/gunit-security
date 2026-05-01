/**
 * Renders a `<script type="application/ld+json">` block. Search engines
 * (Google, Bing) parse this to power rich results — knowledge panel,
 * site links, breadcrumbs, FAQ snippets, Article cards, etc.
 *
 * We pass the data unstringified to React; the component stringifies it
 * once. Keeping all schema in TS gives us type safety and lets us pull
 * dynamic values straight from the SiteSettings row.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
