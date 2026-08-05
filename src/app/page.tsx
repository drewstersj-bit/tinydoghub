import Link from 'next/link';

const POPULAR_SECTIONS = [
  { title: 'Breed Database', description: 'Explore detailed profiles for every tiny dog breed', href: '/breed-database', icon: '🐕' },
  { title: 'Harness Finder', description: 'Find the perfect harness based on your dog\'s measurements', href: '/tools/harness-finder', icon: '🎯' },
  { title: 'Size Database', description: 'Average measurements for every breed at every age', href: '/size-database', icon: '📏' },
  { title: 'Puppy Growth Tracker', description: 'Track your puppy\'s development against breed curves', href: '/tools/puppy-growth-tracker', icon: '📈' },
  { title: 'Dog Walks', description: 'Discover small-dog-friendly walks across the UK', href: '/walks', icon: '🌳' },
  { title: 'Dog Friendly Places', description: 'Cafes, hotels and holidays that welcome tiny dogs', href: '/dog-friendly/cafes', icon: '☕' },
];

const QUICK_TOOLS = [
  { label: 'Harness Size Calculator', href: '/tools/harness-finder' },
  { label: 'Puppy Growth Calculator', href: '/tools/puppy-growth-tracker' },
  { label: 'Dog Age Calculator', href: '/calculators' },
  { label: 'Food Calculator', href: '/calculators' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-warm-white to-cream dark:from-dark-bg dark:to-dark-surface">
        <div className="container-wide py-section flex flex-col items-center text-center">
          <h1 className="text-display font-heading font-bold text-charcoal dark:text-dark-text max-w-3xl">
            The UK&apos;s Home for{' '}
            <span className="text-forest-green dark:text-muted-sage">Tiny Dogs</span>
          </h1>
          <p className="mt-6 text-body-lg text-charcoal/70 dark:text-dark-muted max-w-2xl">
            The definitive resource for Chihuahua, toy breed and puppy owners.
            Expert guides, interactive tools, and a community built on trust.
          </p>

          {/* Search placeholder */}
          <div className="mt-10 w-full max-w-xl">
            <div className="relative">
              <input
                type="search"
                placeholder="What would you like to know?"
                className="w-full px-5 py-4 rounded-full border border-soft-grey bg-white shadow-card text-body placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text dark:placeholder:text-dark-muted"
                aria-label="Search TinyDogHub"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30 dark:text-dark-muted" aria-hidden="true">
                ⌘K
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular sections */}
      <section className="container-wide py-section">
        <h2 className="text-h2 font-heading font-bold text-charcoal dark:text-dark-text text-center mb-12">
          Explore TinyDogHub
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group p-6 rounded-card border border-soft-grey/50 bg-white shadow-card hover:shadow-card-hover transition-all dark:bg-dark-surface dark:border-dark-border"
            >
              <span className="text-2xl" aria-hidden="true">{section.icon}</span>
              <h3 className="mt-3 font-heading font-semibold text-h3 text-charcoal dark:text-dark-text group-hover:text-forest-green dark:group-hover:text-muted-sage transition-colors">
                {section.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal/60 dark:text-dark-muted">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick tools */}
      <section className="bg-warm-white dark:bg-dark-surface border-y border-soft-grey/50 dark:border-dark-border">
        <div className="container-wide py-section-sm">
          <h2 className="text-h3 font-heading font-semibold text-charcoal dark:text-dark-text text-center mb-8">
            Popular Tools
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {QUICK_TOOLS.map((tool) => (
              <Link
                key={tool.label}
                href={tool.href}
                className="px-5 py-2.5 rounded-full border border-soft-grey/80 bg-white text-sm font-medium text-charcoal hover:border-forest-green hover:text-forest-green transition-colors dark:bg-dark-surface dark:border-dark-border dark:text-dark-text dark:hover:border-muted-sage dark:hover:text-muted-sage"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust message */}
      <section className="container-narrow py-section text-center">
        <p className="text-body-lg text-charcoal/70 dark:text-dark-muted max-w-2xl mx-auto">
          Every guide on TinyDogHub is written by experienced dog owners and researchers.
          We recommend products only when genuinely helpful — never for the sake of selling.
        </p>
      </section>
    </div>
  );
}
