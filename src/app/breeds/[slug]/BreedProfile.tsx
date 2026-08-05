'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

const BREED_DATA = {
  name: 'Chihuahua',
  emoji: '🐕',
  tagline: 'The world\'s smallest breed with the biggest personality',
  origin: 'Mexico',
  lifespan: '12–20 years',
  weight: { metric: '1.5–3 kg', imperial: '3.3–6.6 lbs' },
  height: { metric: '15–23 cm', imperial: '6–9 inches' },
  chest: '28–38 cm',
  neck: '18–25 cm',
  exercise: '20–30 mins daily',
  group: 'Toy',
  temperament: ['Bold', 'Loyal', 'Alert', 'Lively', 'Confident'],
  goodFor: ['Apartments', 'Singles', 'Seniors', 'Experienced owners'],
  notIdealFor: ['Very young children', 'Cold climates without clothing', 'Very active outdoor lifestyles'],
  healthConcerns: [
    { name: 'Patellar Luxation', severity: 'Common', description: 'Kneecap slipping out of position. Watch for skipping gait.' },
    { name: 'Dental Issues', severity: 'Very Common', description: 'Small jaws lead to overcrowding. Regular dental care essential.' },
    { name: 'Hypoglycaemia', severity: 'Common in puppies', description: 'Low blood sugar, especially in very small puppies. Feed regularly.' },
    { name: 'Heart Conditions', severity: 'Moderate', description: 'Patent ductus arteriosus and mitral valve disease.' },
    { name: 'Tracheal Collapse', severity: 'Moderate', description: 'Use a harness instead of a collar to reduce throat pressure.' },
  ],
  ratings: {
    apartmentFriendly: 5,
    goodWithKids: 2,
    easyToGroom: 4,
    exerciseNeeds: 2,
    trainability: 3,
    coldTolerance: 1,
    heatTolerance: 3,
  },
  funFacts: [
    'Chihuahuas have the largest brain-to-body ratio of any dog breed.',
    'They can come in virtually any colour combination.',
    'Ancient Aztecs believed Chihuahuas could guide the dead to the afterlife.',
    'Despite their size, they make excellent watchdogs due to their alertness.',
  ],
};

function RatingBar({ value, max = 5, label }: { value: number; max?: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-charcoal/70 dark:text-dark-muted w-36 shrink-0">{label}</span>
      <div className="flex-1 flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 flex-1 rounded-full ${
              i < value ? 'bg-forest-green dark:bg-muted-sage' : 'bg-soft-grey/50 dark:bg-dark-border/50'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-charcoal dark:text-dark-text w-8 text-right">{value}/{max}</span>
    </div>
  );
}

export function BreedProfile({ slug }: { slug: string }) {
  const breed = BREED_DATA;

  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-start gap-8 mb-16"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl" aria-hidden="true">{breed.emoji}</span>
              <span className="px-3 py-1 rounded-full bg-forest-green/10 text-forest-green dark:bg-muted-sage/20 dark:text-muted-sage text-sm font-medium">
                {breed.group} Group
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal dark:text-dark-text">
              {breed.name}
            </h1>
            <p className="mt-3 text-xl text-charcoal/70 dark:text-dark-muted">{breed.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {breed.temperament.map((trait) => (
                <span key={trait} className="px-3 py-1.5 rounded-full bg-warm-beige/30 dark:bg-dark-border/30 text-sm font-medium text-charcoal/80 dark:text-dark-muted">
                  {trait}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-80 bg-white dark:bg-dark-surface rounded-2xl border border-soft-grey/30 dark:border-dark-border p-6 shadow-card">
            <h2 className="font-heading font-semibold text-sm text-charcoal/50 dark:text-dark-muted uppercase tracking-wide mb-4">Quick Facts</h2>
            <dl className="space-y-3">
              {[
                { label: 'Origin', value: breed.origin },
                { label: 'Lifespan', value: breed.lifespan },
                { label: 'Weight', value: breed.weight.metric },
                { label: 'Height', value: breed.height.metric },
                { label: 'Chest', value: breed.chest },
                { label: 'Neck', value: breed.neck },
                { label: 'Exercise', value: breed.exercise },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <dt className="text-sm text-charcoal/60 dark:text-dark-muted">{item.label}</dt>
                  <dd className="text-sm font-medium text-charcoal dark:text-dark-text">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 pt-4 border-t border-soft-grey/30 dark:border-dark-border">
              <Link href="/tools/harness-finder" className="block w-full text-center px-4 py-2.5 rounded-full bg-forest-green text-white text-sm font-medium hover:bg-forest-green/90 transition-colors">
                🎯 Find their harness size
              </Link>
            </div>
          </div>
        </motion.div>

        <section className="mb-16">
          <h2 className="text-h3 font-heading font-bold text-charcoal dark:text-dark-text mb-6">Breed Ratings</h2>
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-soft-grey/30 dark:border-dark-border p-6 space-y-4">
            <RatingBar value={breed.ratings.apartmentFriendly} label="Apartment Friendly" />
            <RatingBar value={breed.ratings.goodWithKids} label="Good with Kids" />
            <RatingBar value={breed.ratings.easyToGroom} label="Easy to Groom" />
            <RatingBar value={breed.ratings.exerciseNeeds} label="Exercise Needs" />
            <RatingBar value={breed.ratings.trainability} label="Trainability" />
            <RatingBar value={breed.ratings.coldTolerance} label="Cold Tolerance" />
            <RatingBar value={breed.ratings.heatTolerance} label="Heat Tolerance" />
          </div>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50/50 dark:bg-emerald-950/10 rounded-2xl p-6 border border-emerald-100/50 dark:border-emerald-900/20">
            <h3 className="font-heading font-semibold text-charcoal dark:text-dark-text mb-4 flex items-center gap-2">
              <span aria-hidden="true">✅</span> Great for
            </h3>
            <ul className="space-y-2">
              {breed.goodFor.map((item) => (
                <li key={item} className="text-sm text-charcoal/70 dark:text-dark-muted flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl p-6 border border-amber-100/50 dark:border-amber-900/20">
            <h3 className="font-heading font-semibold text-charcoal dark:text-dark-text mb-4 flex items-center gap-2">
              <span aria-hidden="true">⚠️</span> Consider carefully
            </h3>
            <ul className="space-y-2">
              {breed.notIdealFor.map((item) => (
                <li key={item} className="text-sm text-charcoal/70 dark:text-dark-muted flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h3 font-heading font-bold text-charcoal dark:text-dark-text mb-6">Health Considerations</h2>
          <div className="space-y-3">
            {breed.healthConcerns.map((concern) => (
              <details key={concern.name} className="group bg-white dark:bg-dark-surface rounded-xl border border-soft-grey/30 dark:border-dark-border overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-soft-grey/10 dark:hover:bg-dark-border/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-charcoal dark:text-dark-text">{concern.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">{concern.severity}</span>
                  </div>
                  <span className="text-charcoal/30 group-open:rotate-180 transition-transform" aria-hidden="true">▼</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-charcoal/70 dark:text-dark-muted">{concern.description}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h3 font-heading font-bold text-charcoal dark:text-dark-text mb-6 flex items-center gap-2">
            <span aria-hidden="true">💡</span> Fun Facts
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {breed.funFacts.map((fact, i) => (
              <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-warm-beige/20 to-cream dark:from-dark-border/20 dark:to-dark-surface border border-soft-grey/20 dark:border-dark-border/30">
                <p className="text-sm text-charcoal/80 dark:text-dark-muted leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 p-6 rounded-2xl bg-white dark:bg-dark-surface border border-soft-grey/30 dark:border-dark-border">
          <p className="text-xs text-charcoal/40 dark:text-dark-muted uppercase tracking-wide font-medium mb-3">Editor&apos;s Recommendation</p>
          <h3 className="font-heading font-semibold text-charcoal dark:text-dark-text mb-2">Harnesses for {breed.name}s</h3>
          <p className="text-sm text-charcoal/60 dark:text-dark-muted mb-4">
            Due to their delicate trachea, we always recommend a step-in harness rather than a collar. A properly fitted harness distributes pressure away from the throat.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://mychiandme.co.uk/collections/leads-and-harnesses" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forest-green/20 text-sm font-medium text-forest-green hover:bg-forest-green/5 transition-colors dark:border-muted-sage/30 dark:text-muted-sage">
              Browse at My Chi and Me →
            </a>
            <a href="https://mypupandme.co.uk/collection" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forest-green/20 text-sm font-medium text-forest-green hover:bg-forest-green/5 transition-colors dark:border-muted-sage/30 dark:text-muted-sage">
              Browse at My Pup and Me →
            </a>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-soft-grey/30 dark:border-dark-border">
          <Link href="/breed-database" className="text-sm font-medium text-forest-green dark:text-muted-sage hover:underline">← Back to all breeds</Link>
          <Link href="/tools/harness-finder" className="text-sm font-medium text-forest-green dark:text-muted-sage hover:underline">Harness Finder →</Link>
        </div>
      </div>
    </>
  );
}
