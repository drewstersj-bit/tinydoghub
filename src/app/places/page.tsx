'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getPublishedVenues, getWelcomeLabelText, getWelcomeLabelStyle, type Venue, type TriState } from '@/lib/places-data';

type FilterKey = 'dogsInside' | 'rainyDay' | 'quiet' | 'puppyFriendly' | 'enclosed' | 'walkNearby' | 'cafe' | 'pub' | 'restaurant';

const FILTERS: { key: FilterKey; label: string; emoji: string }[] = [
  { key: 'dogsInside', label: 'Dogs welcome inside', emoji: '🏠' },
  { key: 'rainyDay', label: 'Rainy day friendly', emoji: '🌧️' },
  { key: 'quiet', label: 'Quiet seating', emoji: '🤫' },
  { key: 'puppyFriendly', label: 'Puppy friendly', emoji: '🐶' },
  { key: 'enclosed', label: 'Enclosed garden', emoji: '🌿' },
  { key: 'walkNearby', label: 'Walk nearby', emoji: '🥾' },
  { key: 'cafe', label: 'Café', emoji: '☕' },
  { key: 'pub', label: 'Pub', emoji: '🍺' },
  { key: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
];

function isYes(val: TriState): boolean { return val === 'yes'; }

function matchesFilter(venue: Venue, filter: FilterKey): boolean {
  switch (filter) {
    case 'dogsInside': return isYes(venue.dogsIndoors) || isYes(venue.dogsThroughout);
    case 'rainyDay': return isYes(venue.dogsIndoors) || isYes(venue.coveredOutdoorSeating);
    case 'quiet': return isYes(venue.quietSeating);
    case 'puppyFriendly': return isYes(venue.puppySuitable);
    case 'enclosed': return isYes(venue.enclosedGarden);
    case 'walkNearby': return venue.nearbyWalkSlugs.length > 0;
    case 'cafe': return venue.venueType === 'cafe' || venue.venueType === 'tearoom' || venue.venueType === 'farm_shop_cafe';
    case 'pub': return venue.venueType === 'pub';
    case 'restaurant': return venue.venueType === 'restaurant';
  }
}

function venueTypeLabel(type: string): string {
  const labels: Record<string, string> = { cafe: 'Café', pub: 'Pub', restaurant: 'Restaurant', tearoom: 'Tearoom', farm_shop_cafe: 'Farm Shop Café', hotel: 'Hotel', other: 'Venue' };
  return labels[type] || 'Venue';
}

export default function PlacesPage() {
  const allVenues = useMemo(() => getPublishedVenues(), []);
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>([]);
  const [sort, setSort] = useState<'recommended' | 'rating' | 'verified'>('recommended');

  const toggleFilter = (key: FilterKey) => {
    setActiveFilters((prev) => prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]);
  };

  const filtered = useMemo(() => {
    let results = allVenues;
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter((v) =>
        v.name.toLowerCase().includes(q) ||
        v.town.toLowerCase().includes(q) ||
        v.county.toLowerCase().includes(q) ||
        v.postcode.toLowerCase().replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
        v.editorialReview.toLowerCase().includes(q)
      );
    }
    if (activeFilters.length > 0) {
      results = results.filter((v) => activeFilters.every((f) => matchesFilter(v, f)));
    }
    switch (sort) {
      case 'rating': return [...results].sort((a, b) => b.welcomeScore - a.welcomeScore);
      case 'verified': return [...results].sort((a, b) => b.lastVerifiedDate.localeCompare(a.lastVerifiedDate));
      default: return [...results].sort((a, b) => b.welcomeScore - a.welcomeScore);
    }
  }, [allVenues, search, activeFilters, sort]);

  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-12">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-plum via-plum-light to-plum p-8 lg:p-12 mb-10">
          <div className="absolute top-6 right-8 text-7xl opacity-10 select-none" aria-hidden="true">🐾</div>
          <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-2">Tiny Dog Welcome</p>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-3">
            Little dogs. Big welcomes.
          </h1>
          <p className="text-white/80 max-w-lg mb-8">
            Find cafés, pubs and restaurants where your tiny companion isn&apos;t merely allowed — they&apos;re genuinely welcome.
          </p>
          <div className="relative max-w-md">
            <input
              type="search"
              placeholder="Search by town, postcode or venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-full bg-white/95 text-ink text-sm placeholder:text-grey-500 focus:outline-none focus:ring-2 focus:ring-coral/50 shadow-lg"
              aria-label="Search venues"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-grey-500" aria-hidden="true">🔍</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => toggleFilter(f.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilters.includes(f.key)
                    ? 'bg-plum text-white shadow-md'
                    : 'bg-white text-ink-light border border-grey-200 hover:border-plum/30 hover:text-plum dark:bg-dark-surface dark:text-dark-muted dark:border-dark-border'
                }`}
                aria-pressed={activeFilters.includes(f.key)}
              >
                <span aria-hidden="true">{f.emoji}</span>
                {f.label}
              </button>
            ))}
          </div>
          {activeFilters.length > 0 && (
            <button onClick={() => setActiveFilters([])} className="mt-3 text-sm text-coral hover:underline">
              Clear all filters
            </button>
          )}
        </div>

        {/* Sort + count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-ink-muted dark:text-dark-muted" aria-live="polite">
            {filtered.length} place{filtered.length !== 1 ? 's' : ''} found
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="text-sm px-3 py-2 rounded-lg border border-grey-200 bg-white dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
            aria-label="Sort venues"
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Highest rated</option>
            <option value="verified">Recently verified</option>
          </select>
        </div>

        {/* Venue cards */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((venue) => (
              <motion.div
                key={venue.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href={`/places/${venue.slug}`}
                  className="group block bg-white dark:bg-dark-surface rounded-2xl border border-grey-200/60 dark:border-dark-border overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
                >
                  {/* Colour accent */}
                  <div className="h-2 bg-gradient-to-r from-plum to-coral" />

                  <div className="p-5">
                    {/* Welcome label + type */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getWelcomeLabelStyle(venue.welcomeLabel)}`}>
                        {getWelcomeLabelText(venue.welcomeLabel)}
                      </span>
                      <span className="text-xs text-grey-500 dark:text-dark-muted">
                        {venueTypeLabel(venue.venueType)}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-heading font-bold text-lg text-ink dark:text-dark-text group-hover:text-plum dark:group-hover:text-coral-soft transition-colors leading-tight">
                      {venue.name}
                    </h3>

                    {/* Location */}
                    <p className="mt-1 text-sm text-ink-muted dark:text-dark-muted">
                      {venue.town}, {venue.county}
                    </p>

                    {/* Summary */}
                    <p className="mt-2 text-sm text-ink-muted dark:text-dark-muted line-clamp-2">
                      {venue.summary}
                    </p>

                    {/* Feature labels */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {venue.featureLabels.slice(0, 3).map((label) => (
                        <span key={label} className="px-2 py-0.5 rounded-full text-xs bg-grey-100 text-ink-light dark:bg-dark-border dark:text-dark-muted font-medium">
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-3 border-t border-grey-200/60 dark:border-dark-border flex items-center justify-between text-xs text-grey-500 dark:text-dark-muted">
                      <span>Verified {venue.lastVerifiedDate}</span>
                      {venue.nearbyWalkSlugs.length > 0 && (
                        <span className="text-green font-medium">🥾 Walk nearby</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4" aria-hidden="true">🐾</span>
            <p className="text-lg font-heading font-semibold text-ink dark:text-dark-text mb-2">No venues match your search</p>
            <p className="text-sm text-ink-muted dark:text-dark-muted">Try a different search or remove some filters.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-16 p-5 rounded-xl bg-grey-100 dark:bg-dark-border/20 border border-grey-200 dark:border-dark-border">
          <p className="text-sm text-ink-muted dark:text-dark-muted leading-relaxed">
            <strong>Please note:</strong> Dog policies and opening arrangements can change.
            Please check directly with the venue before making a special journey.
            The Tiny Dog Welcome rating is an editorial suitability assessment, not a customer review.
          </p>
        </div>
      </div>
    </>
  );
}
