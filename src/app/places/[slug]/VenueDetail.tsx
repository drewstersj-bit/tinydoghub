'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getVenueBySlug, getPublishedVenues, getWelcomeLabelText, getWelcomeLabelStyle, type Venue, type TriState } from '@/lib/places-data';

function triStateDisplay(val: TriState, yesText: string, noText: string): { text: string; icon: string } {
  switch (val) {
    case 'yes': return { text: yesText, icon: '✓' };
    case 'no': return { text: noText, icon: '✗' };
    case 'unknown': return { text: 'Not confirmed', icon: '?' };
  }
}

function DetailRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  const colour = icon === '✓' ? 'text-green' : icon === '✗' ? 'text-coral' : 'text-grey-500';
  return (
    <div className="flex items-start gap-3 py-2">
      <span className={`font-bold text-sm ${colour}`} aria-hidden="true">{icon}</span>
      <div className="flex-1">
        <dt className="text-sm text-grey-500 dark:text-dark-muted">{label}</dt>
        <dd className="text-sm font-medium text-ink dark:text-dark-text">{value}</dd>
      </div>
    </div>
  );
}

function venueTypeLabel(type: string): string {
  const labels: Record<string, string> = { cafe: 'Café', pub: 'Pub', restaurant: 'Restaurant', tearoom: 'Tearoom', farm_shop_cafe: 'Farm Shop Café', hotel: 'Hotel', other: 'Venue' };
  return labels[type] || 'Venue';
}

export function VenueDetail({ slug }: { slug: string }) {
  const venue = getVenueBySlug(slug);

  if (!venue) {
    return (
      <div className="container-wide py-20 text-center">
        <p className="text-xl font-heading font-bold text-ink dark:text-dark-text">Venue not found</p>
        <Link href="/places" className="mt-4 inline-block text-plum hover:underline dark:text-coral-soft">← Back to all places</Link>
      </div>
    );
  }

  const nearbyVenues = getPublishedVenues().filter((v) => v.slug !== venue.slug && v.region === venue.region).slice(0, 3);

  const dogAccess = triStateDisplay(venue.dogsIndoors, 'Yes, welcome inside', 'Outdoor only');
  const outdoors = triStateDisplay(venue.dogsOutdoors, 'Yes', 'No outdoor seating');
  const covered = triStateDisplay(venue.coveredOutdoorSeating, 'Covered outdoor seating available', 'No covered outdoor area');
  const water = triStateDisplay(venue.waterBowls, 'Water bowls provided', 'Not available');
  const treats = triStateDisplay(venue.freeDogTreats, 'Free treats available', 'Not available');
  const quiet = triStateDisplay(venue.quietSeating, 'Quiet seating available', 'Can be noisy');
  const enclosed = triStateDisplay(venue.enclosedGarden, 'Enclosed garden', 'Not enclosed');
  const puppy = triStateDisplay(venue.puppySuitable, 'Suitable for puppies', 'May not suit puppies');
  const nervous = triStateDisplay(venue.nervousDogSuitable, 'Suitable for nervous dogs', 'May not suit nervous dogs');
  const multi = triStateDisplay(venue.multipleDogsWelcome, 'Multiple dogs welcome', 'One dog preferred');

  return (
    <>
      <Breadcrumbs />
      <article className="container-wide py-12">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${getWelcomeLabelStyle(venue.welcomeLabel)}`}>
              🐾 {getWelcomeLabelText(venue.welcomeLabel)}
            </span>
            <span className="text-sm text-grey-500 dark:text-dark-muted">
              {venueTypeLabel(venue.venueType)} · {venue.priceBand}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-ink dark:text-dark-text">
            {venue.name}
          </h1>
          <p className="mt-2 text-lg text-ink-muted dark:text-dark-muted">
            {venue.town}, {venue.county} · {venue.postcode}
          </p>
        </motion.div>

        {/* Tiny Dog Verdict */}
        <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-plum/5 to-coral/5 border border-plum/10 dark:from-plum/10 dark:to-coral/10 dark:border-plum/20">
          <h2 className="font-heading font-bold text-ink dark:text-dark-text mb-2">🐾 Tiny Dog Verdict</h2>
          <p className="text-ink-light dark:text-dark-text leading-relaxed">{venue.tinyDogVerdict}</p>
        </section>

        {/* Map + directions */}
        <section className="mb-10">
          <div className="rounded-2xl overflow-hidden border border-grey-200 dark:border-dark-border shadow-card">
            <iframe
              title={`Map showing ${venue.name}`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${venue.longitude - 0.01},${venue.latitude - 0.005},${venue.longitude + 0.01},${venue.latitude + 0.005}&layer=mapnik&marker=${venue.latitude},${venue.longitude}`}
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              className="w-full"
            />
          </div>
          <p className="mt-1 text-xs text-grey-500 dark:text-dark-muted">© OpenStreetMap contributors</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-plum text-white text-sm font-medium hover:bg-plum/90 transition-colors shadow-md"
            >
              📍 Get Directions
            </a>
            {venue.websiteUrl && (
              <a
                href={venue.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-grey-200 text-sm font-medium text-ink hover:border-plum hover:text-plum transition-colors dark:border-dark-border dark:text-dark-text"
              >
                🌐 Visit website
              </a>
            )}
          </div>
        </section>

        {/* Practical "Tiny Dog Check" panel */}
        <section className="mb-10 grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-dark-surface border border-grey-200 dark:border-dark-border">
            <h3 className="font-heading font-semibold text-ink dark:text-dark-text mb-4">Dog Access</h3>
            <dl className="divide-y divide-grey-200/60 dark:divide-dark-border">
              <DetailRow label="Dogs indoors" value={dogAccess.text} icon={dogAccess.icon} />
              <DetailRow label="Outdoor seating" value={outdoors.text} icon={outdoors.icon} />
              <DetailRow label="Covered outdoor" value={covered.text} icon={covered.icon} />
              <DetailRow label="Enclosed garden" value={enclosed.text} icon={enclosed.icon} />
              {venue.restrictedAreas && (
                <div className="py-2">
                  <p className="text-xs text-grey-500 italic">⚠️ {venue.restrictedAreas}</p>
                </div>
              )}
            </dl>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-dark-surface border border-grey-200 dark:border-dark-border">
            <h3 className="font-heading font-semibold text-ink dark:text-dark-text mb-4">Small Dog Comfort</h3>
            <dl className="divide-y divide-grey-200/60 dark:divide-dark-border">
              <DetailRow label="Quiet seating" value={quiet.text} icon={quiet.icon} />
              <DetailRow label="Puppy suitable" value={puppy.text} icon={puppy.icon} />
              <DetailRow label="Nervous dogs" value={nervous.text} icon={nervous.icon} />
              <DetailRow label="Multiple dogs" value={multi.text} icon={multi.icon} />
              <DetailRow label="Escape risk" value={venue.escapeRisk} icon={venue.escapeRisk === 'low' ? '✓' : '?'} />
            </dl>
          </div>
        </section>

        {/* Facilities */}
        <section className="mb-10 p-5 rounded-2xl bg-white dark:bg-dark-surface border border-grey-200 dark:border-dark-border">
          <h3 className="font-heading font-semibold text-ink dark:text-dark-text mb-4">Dog Facilities</h3>
          <dl className="grid sm:grid-cols-2 gap-x-6 divide-y sm:divide-y-0 divide-grey-200/60 dark:divide-dark-border">
            <DetailRow label="Water bowls" value={water.text} icon={water.icon} />
            <DetailRow label="Dog treats" value={treats.text} icon={treats.icon} />
          </dl>
        </section>

        {/* Editorial review */}
        <section className="mb-10">
          <h2 className="text-h3 font-heading font-bold text-ink dark:text-dark-text mb-4">Our Review</h2>
          <div className="prose prose-sm max-w-none text-ink-light dark:text-dark-text leading-relaxed">
            <p>{venue.editorialReview}</p>
          </div>
          {venue.bestVisitTimes && (
            <p className="mt-4 text-sm text-ink-muted dark:text-dark-muted">
              <strong>Best time to visit:</strong> {venue.bestVisitTimes}
            </p>
          )}
          {venue.busyPeriodNotes && (
            <p className="mt-2 text-sm text-coral font-medium">⚠️ {venue.busyPeriodNotes}</p>
          )}
        </section>

        {/* Food & drink */}
        <section className="mb-10">
          <h3 className="font-heading font-semibold text-ink dark:text-dark-text mb-2">Food & Drink</h3>
          <p className="text-sm text-ink-muted dark:text-dark-muted">{venue.foodAndDrinkSummary}</p>
        </section>

        {/* Nearby walks */}
        {venue.nearbyWalkSlugs.length > 0 && (
          <section className="mb-10 p-5 rounded-2xl bg-green/5 border border-green/10 dark:bg-green/10 dark:border-green/20">
            <h3 className="font-heading font-semibold text-ink dark:text-dark-text mb-3 flex items-center gap-2">
              <span aria-hidden="true">🥾</span> Nearby Walks
            </h3>
            <div className="flex flex-wrap gap-3">
              {venue.nearbyWalkSlugs.map((walkSlug) => (
                <Link
                  key={walkSlug}
                  href={`/walks/${walkSlug}`}
                  className="px-4 py-2 rounded-full bg-white dark:bg-dark-surface border border-grey-200 dark:border-dark-border text-sm font-medium text-plum hover:bg-plum/5 transition-colors dark:text-coral-soft"
                >
                  View walk →
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Verification + disclaimer */}
        <div className="mb-10 text-sm text-grey-500 dark:text-dark-muted space-y-1">
          <p>Verified: {venue.lastVerifiedDate} ({venue.verificationMethod.replace(/_/g, ' ')})</p>
          <p><button className="text-coral hover:underline">Report a change</button></p>
        </div>

        <div className="mb-10 p-4 rounded-xl bg-grey-100 dark:bg-dark-border/15 border border-grey-200 dark:border-dark-border text-sm text-ink-muted dark:text-dark-muted">
          <strong>Please note:</strong> Dog policies and opening arrangements can change.
          Please check directly with the venue before making a special journey.
        </div>

        {/* Nearby venues */}
        {nearbyVenues.length > 0 && (
          <section>
            <h2 className="text-h3 font-heading font-bold text-ink dark:text-dark-text mb-6">Other places nearby</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyVenues.map((v) => (
                <Link
                  key={v.slug}
                  href={`/places/${v.slug}`}
                  className="group p-4 rounded-xl bg-white dark:bg-dark-surface border border-grey-200 dark:border-dark-border hover:shadow-card-hover transition-all"
                >
                  <h3 className="font-heading font-semibold text-ink dark:text-dark-text group-hover:text-plum transition-colors">
                    {v.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted dark:text-dark-muted">{v.town} · {venueTypeLabel(v.venueType)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-grey-200 dark:border-dark-border">
          <Link href="/places" className="text-sm font-medium text-plum dark:text-coral-soft hover:underline">
            ← Back to all places
          </Link>
        </div>
      </article>
    </>
  );
}
