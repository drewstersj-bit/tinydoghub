'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface FormData {
  chest: string;
  neck: string;
  weight: string;
  pulling: 'none' | 'light' | 'moderate' | 'heavy';
}

interface Recommendation {
  size: string;
  type: string;
  reasoning: string;
}

const SIZE_CHART = [
  { label: 'XXXS', chestMin: 20, chestMax: 25 },
  { label: 'XXS', chestMin: 25, chestMax: 30 },
  { label: 'XS', chestMin: 30, chestMax: 35 },
  { label: 'S', chestMin: 35, chestMax: 40 },
  { label: 'M', chestMin: 40, chestMax: 48 },
];

function calculateHarness(data: FormData): Recommendation | null {
  const chest = parseFloat(data.chest);
  if (isNaN(chest) || chest <= 0) return null;

  const match = SIZE_CHART.find((s) => chest >= s.chestMin && chest < s.chestMax);
  if (!match) return null;

  const type = data.pulling === 'heavy' ? 'No-pull harness' : 'Step-in air mesh harness';
  const reasoning =
    data.pulling === 'heavy'
      ? `Based on a ${chest}cm chest measurement, we recommend a ${match.label} no-pull harness to help manage pulling behaviour safely.`
      : `Based on a ${chest}cm chest measurement, a ${match.label} step-in harness provides comfortable, even pressure distribution for daily walks.`;

  return { size: match.label, type, reasoning };
}

export default function HarnessFinderPage() {
  const [formData, setFormData] = useState<FormData>({
    chest: '',
    neck: '',
    weight: '',
    pulling: 'none',
  });
  const [result, setResult] = useState<Recommendation | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rec = calculateHarness(formData);
    setResult(rec);
    setShowResult(true);
    // Persist to localStorage
    try {
      localStorage.setItem('tinydoghub-harness-data', JSON.stringify(formData));
    } catch { /* quota exceeded */ }
  };

  const reset = () => {
    setShowResult(false);
    setResult(null);
  };

  return (
    <>
      <Breadcrumbs />
      <div className="container-narrow py-section-sm">
        <h1 className="text-h1 font-heading font-bold text-charcoal dark:text-dark-text">
          Harness Finder
        </h1>
        <p className="mt-4 text-body-lg text-charcoal/70 dark:text-dark-muted">
          Enter your dog&apos;s measurements for a personalised harness size recommendation.
        </p>

        {!showResult ? (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6 max-w-md">
            <div>
              <label htmlFor="chest" className="block text-sm font-medium text-charcoal dark:text-dark-text mb-1">
                Chest girth (cm) *
              </label>
              <input
                id="chest"
                type="number"
                step="0.5"
                min="15"
                max="80"
                required
                value={formData.chest}
                onChange={(e) => setFormData({ ...formData, chest: e.target.value })}
                className="w-full px-4 py-3 rounded-card border border-soft-grey bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
                placeholder="e.g. 32"
              />
              <p className="mt-1 text-xs text-charcoal/50 dark:text-dark-muted">Measure around the widest part of the ribcage</p>
            </div>

            <div>
              <label htmlFor="neck" className="block text-sm font-medium text-charcoal dark:text-dark-text mb-1">
                Neck circumference (cm)
              </label>
              <input
                id="neck"
                type="number"
                step="0.5"
                min="10"
                max="50"
                value={formData.neck}
                onChange={(e) => setFormData({ ...formData, neck: e.target.value })}
                className="w-full px-4 py-3 rounded-card border border-soft-grey bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
                placeholder="e.g. 22"
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-charcoal dark:text-dark-text mb-1">
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                step="0.1"
                min="0.3"
                max="15"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-4 py-3 rounded-card border border-soft-grey bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
                placeholder="e.g. 2.5"
              />
            </div>

            <div>
              <label htmlFor="pulling" className="block text-sm font-medium text-charcoal dark:text-dark-text mb-1">
                Pulling behaviour
              </label>
              <select
                id="pulling"
                value={formData.pulling}
                onChange={(e) => setFormData({ ...formData, pulling: e.target.value as FormData['pulling'] })}
                className="w-full px-4 py-3 rounded-card border border-soft-grey bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
              >
                <option value="none">No pulling</option>
                <option value="light">Light pulling</option>
                <option value="moderate">Moderate pulling</option>
                <option value="heavy">Heavy pulling</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-card bg-forest-green text-white font-medium hover:bg-forest-green/90 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-green/50"
            >
              Find My Harness Size
            </button>
          </form>
        ) : (
          <div className="mt-10 max-w-md">
            {result ? (
              <div className="p-6 rounded-card border border-muted-sage/30 bg-muted-sage/5 dark:bg-muted-sage/10 dark:border-muted-sage/20">
                <h2 className="text-h3 font-heading font-semibold text-forest-green dark:text-muted-sage">
                  Recommended: {result.size}
                </h2>
                <p className="mt-1 text-sm font-medium text-charcoal/70 dark:text-dark-muted">
                  {result.type}
                </p>
                <p className="mt-4 text-body text-charcoal/70 dark:text-dark-muted">
                  {result.reasoning}
                </p>
                <div className="mt-6 p-4 rounded-card border border-soft-grey/50 bg-white dark:bg-dark-surface dark:border-dark-border">
                  <p className="text-xs text-charcoal/50 dark:text-dark-muted uppercase tracking-wide font-medium mb-2">
                    Editor&apos;s Choice
                  </p>
                  <p className="text-sm text-charcoal dark:text-dark-text">
                    Browse {result.size} harnesses at{' '}
                    <a
                      href="https://mychiandme.co.uk/collections/leads-and-harnesses"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest-green dark:text-muted-sage underline"
                    >
                      My Chi and Me
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-card border border-deep-coral/30 bg-deep-coral/5">
                <p className="text-body text-charcoal/70 dark:text-dark-muted">
                  We couldn&apos;t find a matching size. Please check your chest measurement is correct (typically 20–48cm for tiny dogs).
                </p>
              </div>
            )}
            <button
              onClick={reset}
              className="mt-6 px-6 py-3 rounded-card border border-soft-grey text-sm font-medium text-charcoal hover:bg-soft-grey/30 transition-colors dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-border/30"
            >
              Start Again
            </button>
          </div>
        )}
      </div>
    </>
  );
}
