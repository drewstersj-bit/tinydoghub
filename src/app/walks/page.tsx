'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getPublishedWalks, type Walk } from '@/lib/walks-data';

type FilterKey = 'puppyFriendly' | 'buggyFriendly' | 'flat' | 'quiet' | 'noStiles' | 'beach' | 'woodland' | 'cafeStop' | 'short' | 'winterOk';

const FILTER_OPTIONS: { key: FilterKey; label: string; emoji: string }[] = [
  { key: 'short', label: 'Under 30 mins', emoji: '⏱️' },
  { key: 'flat', label: 'Mostly flat', emoji: '➡️' },
  { key: 'puppyFriendly', label: 'Puppy friendly', emoji: '🐶' },
  { key: 'buggyFriendly', label: 'Buggy friendly', emoji: '🚗' },
  { key: 'noStiles', label: 'No stiles', emoji: '🚪' },
  { key: 'quiet', label: 'Quiet', emoji: '🤫' },
  { key: 'cafeStop', label: 'Café stop', emoji: '☕' },
  { key: 'beach', label: 'Beach', emoji: '🏖️' },
  { key: 'woodland', label: 'Woodland', emoji: '🌲' },
  { key: 'winterOk', label: 'Good in winter', emoji: '❄️' },
];

function matchesFilter(walk: Walk, filter: FilterKey): boolean {
  switch (filter) {
    case 'puppyFriendly': return walk.puppyFriendly;
    case 'buggyFriendly': return walk.buggyFriendly === 'yes' || walk.buggyFriendly === 'dry-weather-only';
    case 'flat': return walk.gradient === 'mostly-flat';
    case 'quiet': return walk.quietness === 'usually-quiet';
    case 'noStiles': return walk.stiles.count === 0;
    case 'beach': return walk.environments.includes('beach');
    case 'woodland': return walk.environments.includes('woodland');
    case 'cafeStop': return walk.cafes.some((c) => c.dogFriendly);
    case 'short': return walk.durationMinutes <= 30;
    case 'winterOk': return walk.winterSuitable;
  }
}

function getRatingColour(total: number): string {
  if (total >= 85) return 'bg-fresh-green text-white';
  if (total >= 70) return 'bg-plum text-white';
  if (total >= 55) return 'bg-lemon text-charcoal';
  return 'bg-warm-beige text-charcoal';
}

export default function WalksPage() {
  const allWalks = useMemo(() => getPublishedWalks(), []);
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>([]);
  const [sort, setSort] = useState<'recommended' | 'shortest' | 'easiest'>('recommended');

  const toggleFilter = (key: FilterKey) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const filteredWalks = useMemo(() => {
    let results = allWalks;

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.nearestTown.toLowerCase().includes(q) ||
          w.county.toLowerCase().includes(q) ||
          w.region.toLowerCase().includes(q)
      );
    }

    if (activeFilters.length > 0) {
      results = results.filter((w) => activeFilters.every((f) => matchesFilter(w, f)));
    }

    switch (sort) {
      case 'shortest':
        return [...results].sort((a, b) => a.durationMinutes - b.durationMinutes);
      case 'easiest':
        return [...results].sort((a, b) => b.rating.total - a.rating.total);
      default:
        return [...results].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating.total - a.rating.total);
    }
  }, [allWalks, search, activeFilters, sort]);

  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-12">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-plum via-plum-light to-plum mb-10">
          <Image
            src="/images/tinydoghub_1842789260.webp"
            alt=""
            fill
            className="object-cover opacity-15 mix-blend-luminosity"
            aria-hidden="true"
          />
          <div className="relative p-8 lg:p-12">
          <p className="text-sm font-medium text-white/70 uppercase tracking-wider mb-2">Little Walks for Little Legs</p>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-3">
            Find a little adventure
          </h1>
          <p className="text-white/80 max-w-lg mb-8">
            Tiny-dog-friendly walks, checked for little legs, cautious paws and big personalities.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <input
              type="search"
              placeholder="Search by walk name, town or county..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-full bg-white/95 text-ink text-sm placeholder:text-grey-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              aria-label="Search walks"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-grey-500" aria-hidden="true">🔍</span>
          </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f.key}
                onClick={() => toggleFilter(f.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilters.includes(f.key)
                    ? 'bg-plum text-white shadow-md'
                    : 'bg-white text-ink-muted border border-grey-200 hover:border-plum/30 hover:text-plum dark:bg-dark-surface dark:text-dark-muted dark:border-dark-border'
                }`}
                aria-pressed={activeFilters.includes(f.key)}
              >
                <span aria-hidden="true">{f.emoji}</span>
                {f.label}
              </button>
            ))}
          </div>
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="mt-3 text-sm text-deep-coral hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Sort + count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-ink-muted dark:text-dark-muted" aria-live="polite">
            {filteredWalks.length} walk{filteredWalks.length !== 1 ? 's' : ''} found
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="text-sm px-3 py-2 rounded-lg border border-grey-200 bg-white dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
            aria-label="Sort walks"
          >
            <option value="recommended">Recommended</option>
            <option value="shortest">Shortest first</option>
            <option value="easiest">Easiest first</option>
          </select>
        </div>

        {/* Walk cards */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredWalks.map((walk) => (
              <motion.div
                key={walk.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href={`/walks/${walk.slug}`}
                  className="group block bg-white dark:bg-dark-surface rounded-2xl border border-grey-200/30 dark:border-dark-border overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
                >
                  {/* Top colour bar */}
                  <div className="h-2 bg-gradient-to-r from-forest-green to-muted-sage" />

                  <div className="p-5">
                    {/* Rating badge + difficulty */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getRatingColour(walk.rating.total)}`}>
                        {walk.rating.total}/100
                      </span>
                      <span className="text-xs text-grey-500 dark:text-dark-muted capitalize">
                        {walk.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-lg text-ink dark:text-dark-text group-hover:text-plum dark:group-hover:text-muted-sage transition-colors leading-tight">
                      {walk.title}
                    </h3>

                    {/* Location */}
                    <p className="mt-1 text-sm text-ink-muted dark:text-dark-muted">
                      {walk.nearestTown}, {walk.county}
                    </p>

                    {/* Strapline */}
                    <p className="mt-2 text-sm text-ink-muted dark:text-dark-muted italic">
                      &ldquo;{walk.strapline}&rdquo;
                    </p>

                    {/* Stats row */}
                    <div className="mt-4 flex items-center gap-4 text-xs text-ink-muted dark:text-dark-muted">
                      <span>📏 {walk.distanceMiles} mi</span>
                      <span>⏱️ {walk.durationMinutes} min</span>
                      <span className="capitalize">🏔️ {walk.gradient.replace('-', ' ')}</span>
                    </div>

                    {/* Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {walk.puppyFriendly && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-fresh-green/10 text-fresh-green font-medium">Puppy friendly</span>
                      )}
                      {walk.cafes.some((c) => c.dogFriendly) && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-lemon/30 text-ink font-medium">Café stop</span>
                      )}
                      {walk.offLead === 'generally-suitable' && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-sky/20 text-ink font-medium">Off-lead</span>
                      )}
                      {walk.environments.includes('beach') && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-sky/20 text-ink font-medium">Beach</span>
                      )}
                      {walk.environments.includes('woodland') && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-fresh-green/10 text-fresh-green font-medium">Woodland</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredWalks.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4" aria-hidden="true">🗺️</span>
            <p className="text-lg font-heading font-semibold text-ink dark:text-dark-text mb-2">No walks match your filters</p>
            <p className="text-sm text-ink-muted dark:text-dark-muted">Try removing a filter or searching a different area.</p>
          </div>
        )}

        {/* Safety note */}
        <div className="mt-16 p-5 rounded-xl bg-warm-beige/20 dark:bg-dark-border/20 border border-warm-beige/40 dark:border-dark-border">
          <p className="text-sm text-ink-muted dark:text-dark-muted leading-relaxed">
            <strong>Safety note:</strong> Route conditions, access rules, livestock and facilities can change.
            Owners remain responsible for checking current conditions, weather and local signage before walking.
            The Tiny Dog Rating is an editorial suitability score — it does not guarantee safety.
          </p>
        </div>
      </div>
    </>
  );
}
