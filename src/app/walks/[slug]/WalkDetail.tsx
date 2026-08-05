'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getWalkBySlug, getPublishedWalks, type Walk } from '@/lib/walks-data';

const MY_CHI_URL = 'https://mychiandme.co.uk';

function getRatingBadgeStyle(total: number): string {
  if (total >= 85) return 'bg-fresh-green text-white';
  if (total >= 70) return 'bg-plum text-white';
  if (total >= 55) return 'bg-lemon text-charcoal';
  return 'bg-warm-beige text-charcoal';
}

function StatItem({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-dark-surface border border-grey-200/30 dark:border-dark-border">
      <span className="text-lg" aria-hidden="true">{emoji}</span>
      <div>
        <p className="text-xs text-grey-500 dark:text-dark-muted">{label}</p>
        <p className="text-sm font-medium text-ink dark:text-dark-text">{value}</p>
      </div>
    </div>
  );
}

export function WalkDetail({ slug }: { slug: string }) {
  const walk = getWalkBySlug(slug);

  if (!walk) {
    return (
      <div className="container-wide py-20 text-center">
        <p className="text-xl font-heading font-bold text-ink dark:text-dark-text">Walk not found</p>
        <Link href="/walks" className="mt-4 inline-block text-plum hover:underline">← Back to all walks</Link>
      </div>
    );
  }

  const relatedWalks = getPublishedWalks()
    .filter((w) => w.slug !== walk.slug && w.region === walk.region)
    .slice(0, 3);

  return (
    <>
      <Breadcrumbs />
      <article className="container-wide py-12">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${getRatingBadgeStyle(walk.rating.total)}`}>
              🐾 {walk.rating.total}/100
            </span>
            <span className="text-sm text-ink-muted dark:text-dark-muted">{walk.rating.band}</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-ink dark:text-dark-text">
            {walk.title}
          </h1>
          <p className="mt-2 text-lg text-ink-muted dark:text-dark-muted">
            {walk.nearestTown}, {walk.county} · {walk.region}
          </p>
          <p className="mt-4 text-body-lg text-ink-light dark:text-dark-text/90 max-w-2xl">
            {walk.summary}
          </p>
        </motion.div>

        {/* Google Maps embed + link */}
        <section className="mb-12">
          <div className="rounded-2xl overflow-hidden border border-grey-200/30 dark:border-dark-border shadow-card">
            <iframe
              title={`Map showing ${walk.title} starting point`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${walk.start.longitude - 0.02},${walk.start.latitude - 0.01},${walk.start.longitude + 0.02},${walk.start.latitude + 0.01}&layer=mapnik&marker=${walk.start.latitude},${walk.start.longitude}`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              className="w-full"
            />
          </div>
          <p className="mt-1 text-xs text-grey-500 dark:text-dark-muted">© OpenStreetMap contributors</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${walk.start.latitude},${walk.start.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-plum text-white text-sm font-medium hover:bg-plum/90 transition-colors shadow-md"
            >
              📍 Get Directions in Google Maps
            </a>
            <a
              href={`https://www.google.com/maps/@${walk.start.latitude},${walk.start.longitude},15z`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-grey-200 text-sm font-medium text-ink hover:border-plum hover:text-plum transition-colors dark:border-dark-border dark:text-dark-text dark:hover:border-muted-sage dark:hover:text-muted-sage"
            >
              🗺️ View on Google Maps
            </a>
          </div>
        </section>

        {/* At-a-glance stats */}
        <section className="mb-12">
          <h2 className="text-h3 font-heading font-bold text-ink dark:text-dark-text mb-4">At a Glance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <StatItem emoji="📏" label="Distance" value={`${walk.distanceMiles} miles`} />
            <StatItem emoji="⏱️" label="Duration" value={`${walk.durationMinutes} mins`} />
            <StatItem emoji="🏔️" label="Gradient" value={walk.gradient.replace('-', ' ')} />
            <StatItem emoji="🔄" label="Route" value={walk.routeType.replace('-', ' ')} />
            <StatItem emoji="⚡" label="Difficulty" value={walk.difficulty} />
          </div>
        </section>

        {/* Rating breakdown */}
        <section className="mb-12 p-6 rounded-2xl bg-white dark:bg-dark-surface border border-grey-200/30 dark:border-dark-border">
          <h2 className="text-h3 font-heading font-bold text-ink dark:text-dark-text mb-2">Tiny Dog Rating</h2>
          <p className="text-sm text-ink-muted dark:text-dark-muted mb-6">
            Score based on distance, gradient, surfaces, obstacles, traffic, livestock, escape risk, facilities, weather and seasonal suitability.
          </p>
          <div className="flex items-center gap-4 mb-4">
            <span className={`text-3xl font-heading font-bold px-4 py-2 rounded-xl ${getRatingBadgeStyle(walk.rating.total)}`}>
              {walk.rating.total}
            </span>
            <div>
              <p className="font-medium text-ink dark:text-dark-text">{walk.rating.band}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {walk.rating.positives.map((p) => (
                  <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-fresh-green/10 text-fresh-green font-medium">✓ {p}</span>
                ))}
              </div>
              {walk.rating.caution && (
                <p className="mt-2 text-xs text-deep-coral">⚠️ {walk.rating.caution}</p>
              )}
            </div>
          </div>
        </section>

        {/* Why tiny dogs love it */}
        <section className="mb-12">
          <h2 className="text-h3 font-heading font-bold text-ink dark:text-dark-text mb-4 flex items-center gap-2">
            <span aria-hidden="true">💚</span> Why tiny dogs love it
          </h2>
          <ul className="space-y-3">
            {walk.whyTinyDogsLoveIt.map((reason) => (
              <li key={reason} className="flex items-start gap-3 p-3 rounded-xl bg-fresh-green/5 dark:bg-fresh-green/10 border border-fresh-green/10 dark:border-fresh-green/20">
                <span className="text-fresh-green mt-0.5" aria-hidden="true">✓</span>
                <span className="text-sm text-ink-light dark:text-dark-text">{reason}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Practical details */}
        <section className="mb-12 grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-dark-surface border border-grey-200/30 dark:border-dark-border">
            <h3 className="font-heading font-semibold text-ink dark:text-dark-text mb-3">Terrain & Access</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Surfaces</dt><dd className="font-medium text-ink dark:text-dark-text capitalize">{walk.surfaces.join(', ')}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Stiles</dt><dd className="font-medium text-ink dark:text-dark-text">{walk.stiles.count === 0 ? 'None' : walk.stiles.count}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Off-lead</dt><dd className="font-medium text-ink dark:text-dark-text capitalize">{walk.offLead.replace(/-/g, ' ')}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Buggy friendly</dt><dd className="font-medium text-ink dark:text-dark-text capitalize">{walk.buggyFriendly.replace(/-/g, ' ')}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Livestock</dt><dd className="font-medium text-ink dark:text-dark-text capitalize">{walk.livestock.replace(/-/g, ' ')}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Road exposure</dt><dd className="font-medium text-ink dark:text-dark-text capitalize">{walk.roadExposure}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Escape risk</dt><dd className="font-medium text-ink dark:text-dark-text capitalize">{walk.escapeRisk}</dd></div>
            </dl>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-dark-surface border border-grey-200/30 dark:border-dark-border">
            <h3 className="font-heading font-semibold text-ink dark:text-dark-text mb-3">Facilities</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Parking</dt><dd className="font-medium text-ink dark:text-dark-text">{walk.parking.available ? `Yes — ${walk.parking.notes}` : 'Limited'}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Toilets</dt><dd className="font-medium text-ink dark:text-dark-text">{walk.toilets.available ? walk.toilets.notes || 'Available' : 'None nearby'}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Quietness</dt><dd className="font-medium text-ink dark:text-dark-text capitalize">{walk.quietness.replace(/-/g, ' ')}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Weather</dt><dd className="font-medium text-ink dark:text-dark-text capitalize">{walk.weatherExposure}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted dark:text-dark-muted">Winter suitable</dt><dd className="font-medium text-ink dark:text-dark-text">{walk.winterSuitable ? 'Yes' : 'Not ideal'}</dd></div>
            </dl>

            {walk.cafes.length > 0 && (
              <div className="mt-4 pt-3 border-t border-grey-200/30 dark:border-dark-border">
                <p className="text-xs text-grey-500 dark:text-dark-muted uppercase tracking-wide font-medium mb-2">Nearby dog-friendly café</p>
                {walk.cafes.filter((c) => c.dogFriendly).map((cafe) => (
                  <p key={cafe.name} className="text-sm text-ink dark:text-dark-text">
                    ☕ {cafe.name} {cafe.notes && <span className="text-grey-500 dark:text-dark-muted">— {cafe.notes}</span>}
                  </p>
                ))}
                <p className="mt-2 text-xs text-grey-500 dark:text-dark-muted italic">Opening times and dog policies may change. Check before visiting.</p>
              </div>
            )}
          </div>
        </section>

        {/* Pack for this walk — product recommendations */}
        <section className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-warm-beige/10 to-cream dark:from-dark-border/10 dark:to-dark-surface border border-warm-beige/30 dark:border-dark-border">
          <p className="text-xs text-grey-500 dark:text-dark-muted uppercase tracking-wide font-medium mb-1">Pack for this walk</p>
          <p className="text-sm text-ink-muted dark:text-dark-muted mb-4">Available from our sister shop, My Chi and Me</p>
          <div className="flex flex-wrap gap-3">
            {walk.weatherExposure === 'exposed' || !walk.winterSuitable ? (
              <a
                href={`${MY_CHI_URL}/collections/fleeces?utm_source=tinydoghub&utm_medium=referral&utm_campaign=walks`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-dark-surface border border-plum/20 text-sm font-medium text-plum hover:bg-plum/5 transition-colors dark:text-coral-soft dark:border-muted-sage/30"
              >
                🧥 Warm fleece for this route →
              </a>
            ) : (
              <a
                href={`${MY_CHI_URL}/collections/leads-and-harnesses?utm_source=tinydoghub&utm_medium=referral&utm_campaign=walks`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-dark-surface border border-plum/20 text-sm font-medium text-plum hover:bg-plum/5 transition-colors dark:text-coral-soft dark:border-muted-sage/30"
              >
                🐾 Lightweight harness for easy routes →
              </a>
            )}
            {walk.cafes.some((c) => c.dogFriendly) && (
              <a
                href={`${MY_CHI_URL}/collections/travel?utm_source=tinydoghub&utm_medium=referral&utm_campaign=walks`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-dark-surface border border-plum/20 text-sm font-medium text-plum hover:bg-plum/5 transition-colors dark:text-coral-soft dark:border-muted-sage/30"
              >
                ☕ Travel mat for café stops →
              </a>
            )}
          </div>
        </section>

        {/* Verification */}
        <div className="mb-12 text-sm text-grey-500 dark:text-dark-muted">
          <p>Last verified: {walk.lastVerified}</p>
          <p className="mt-1">
            <button className="text-deep-coral hover:underline">Report an update</button>
          </p>
        </div>

        {/* Safety disclaimer */}
        <div className="mb-12 p-4 rounded-xl bg-warm-beige/15 dark:bg-dark-border/15 border border-warm-beige/30 dark:border-dark-border text-sm text-ink-muted dark:text-dark-muted">
          <strong>Safety note:</strong> Route conditions, access rules, livestock and facilities can change.
          Owners remain responsible for checking current conditions, weather and local signage before walking.
        </div>

        {/* Related walks */}
        {relatedWalks.length > 0 && (
          <section>
            <h2 className="text-h3 font-heading font-bold text-ink dark:text-dark-text mb-6">More walks nearby</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedWalks.map((rw) => (
                <Link
                  key={rw.slug}
                  href={`/walks/${rw.slug}`}
                  className="group p-4 rounded-xl bg-white dark:bg-dark-surface border border-grey-200/30 dark:border-dark-border hover:shadow-card-hover transition-all"
                >
                  <h3 className="font-heading font-semibold text-ink dark:text-dark-text group-hover:text-plum transition-colors">
                    {rw.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted dark:text-dark-muted">{rw.nearestTown} · {rw.distanceMiles} mi · {rw.durationMinutes} min</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-grey-200/30 dark:border-dark-border">
          <Link href="/walks" className="text-sm font-medium text-plum dark:text-coral-soft hover:underline">
            ← Back to all walks
          </Link>
        </div>
      </article>
    </>
  );
}
