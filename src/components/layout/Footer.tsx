import Link from 'next/link';

const FOOTER_SECTIONS = [
  {
    title: 'Explore',
    links: [
      { label: 'Breed Database', href: '/breed-database' },
      { label: 'Size Database', href: '/size-database' },
      { label: 'Health Guides', href: '/health' },
      { label: 'Training', href: '/training' },
      { label: 'Nutrition', href: '/nutrition' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Harness Finder', href: '/tools/harness-finder' },
      { label: 'Growth Tracker', href: '/tools/puppy-growth-tracker' },
      { label: 'Calculators', href: '/calculators' },
      { label: 'Checklists', href: '/checklists' },
      { label: 'Downloads', href: '/downloads' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Dog Walks', href: '/walks' },
      { label: 'Dog Friendly Cafes', href: '/dog-friendly/cafes' },
      { label: 'Dog Friendly Hotels', href: '/dog-friendly/hotels' },
      { label: 'Dog Names', href: '/dog-names' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About TinyDogHub', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-grey-200 bg-white dark:bg-dark-surface dark:border-dark-border mt-20">
      <div className="container-wide py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-heading font-semibold text-sm text-plum dark:text-dark-text mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted hover:text-plum transition-colors dark:text-dark-muted dark:hover:text-coral-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-grey-200 dark:border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-muted dark:text-dark-muted">
            © {new Date().getFullYear()} TinyDogHub. Built for tiny dog lovers across the UK.
          </p>
          <p className="text-xs text-grey-500 dark:text-dark-subtle">
            Trusted retailers:{' '}
            <a href="https://mychiandme.co.uk" target="_blank" rel="noopener noreferrer" className="underline hover:text-plum dark:hover:text-coral-soft">
              My Chi and Me
            </a>
            {' · '}
            <a href="https://mypupandme.co.uk" target="_blank" rel="noopener noreferrer" className="underline hover:text-plum dark:hover:text-coral-soft">
              My Pup and Me
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
