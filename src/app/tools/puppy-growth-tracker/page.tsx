'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface GrowthEntry {
  id: string;
  date: string;
  weight: number;
}

export default function PuppyGrowthTrackerPage() {
  const [entries, setEntries] = useState<GrowthEntry[]>([]);
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tinydoghub-growth-entries');
      if (saved) setEntries(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const saveEntries = (updated: GrowthEntry[]) => {
    setEntries(updated);
    try {
      localStorage.setItem('tinydoghub-growth-entries', JSON.stringify(updated));
    } catch { /* ignore */ }
  };

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !weight) return;
    const entry: GrowthEntry = {
      id: Date.now().toString(),
      date,
      weight: parseFloat(weight),
    };
    const updated = [...entries, entry].sort((a, b) => a.date.localeCompare(b.date));
    saveEntries(updated);
    setDate('');
    setWeight('');
  };

  const removeEntry = (id: string) => {
    saveEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <>
      <Breadcrumbs />
      <div className="container-narrow py-section-sm">
        <h1 className="text-h1 font-heading font-bold text-charcoal dark:text-dark-text">
          Puppy Growth Tracker
        </h1>
        <p className="mt-4 text-body-lg text-charcoal/70 dark:text-dark-muted">
          Record your puppy&apos;s weight over time. All data is saved locally on your device.
        </p>

        <form onSubmit={addEntry} className="mt-10 flex flex-wrap gap-4 items-end">
          <div>
            <label htmlFor="entry-date" className="block text-sm font-medium text-charcoal dark:text-dark-text mb-1">
              Date
            </label>
            <input
              id="entry-date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-4 py-3 rounded-card border border-soft-grey bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
            />
          </div>
          <div>
            <label htmlFor="entry-weight" className="block text-sm font-medium text-charcoal dark:text-dark-text mb-1">
              Weight (kg)
            </label>
            <input
              id="entry-weight"
              type="number"
              step="0.01"
              min="0.1"
              max="20"
              required
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="px-4 py-3 rounded-card border border-soft-grey bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
              placeholder="e.g. 1.2"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-card bg-forest-green text-white font-medium hover:bg-forest-green/90 transition-colors"
          >
            Add Entry
          </button>
        </form>

        {entries.length > 0 && (
          <div className="mt-10">
            <h2 className="text-h3 font-heading font-semibold text-charcoal dark:text-dark-text mb-4">
              Growth Log
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-soft-grey dark:border-dark-border">
                    <th className="text-left py-2 pr-4 font-medium text-charcoal/70 dark:text-dark-muted">Date</th>
                    <th className="text-left py-2 pr-4 font-medium text-charcoal/70 dark:text-dark-muted">Weight (kg)</th>
                    <th className="text-right py-2 font-medium text-charcoal/70 dark:text-dark-muted">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-b border-soft-grey/30 dark:border-dark-border/30">
                      <td className="py-2 pr-4 text-charcoal dark:text-dark-text">{entry.date}</td>
                      <td className="py-2 pr-4 text-charcoal dark:text-dark-text">{entry.weight}</td>
                      <td className="py-2 text-right">
                        <button
                          onClick={() => removeEntry(entry.id)}
                          className="text-deep-coral/70 hover:text-deep-coral text-xs"
                          aria-label={`Remove entry from ${entry.date}`}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
