'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function formatSegment(segment: string): string {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    return { label: formatSegment(segment), href };
  });

  const items = [{ label: 'Home', href: '/' }, ...breadcrumbs];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `https://tinydoghub.co.uk${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="container-wide py-3">
        <ol className="flex items-center gap-1.5 text-sm text-ink-muted dark:text-dark-muted">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-grey-300 dark:text-dark-muted/40">
                  /
                </span>
              )}
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink dark:text-dark-text font-medium truncate max-w-[200px]">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-plum dark:hover:text-coral-soft transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
