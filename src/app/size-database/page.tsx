'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { supabase } from '@/lib/supabase';

interface BreedSize {
  breed_slug: string;
  breed_name: string;
  life_stage: string;
  age_months_min: number;
  age_months_max: number;
  weight_kg_min: number;
  weight_kg_max: number;
  height_cm_min: number | null;
  height_cm_max: number | null;
  chest_cm_min: number | null;
  chest_cm_max: number | null;
  neck_cm_min: number | null;
  neck_cm_max: number | null;
  notes: string | null;
}

export default function SizeDatabasePage() {
  const [data, setData] = useState<BreedSize[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('breed_sizes').select('*').order('breed_name').order('age_months_min')
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) {
          setData(rows);
          const uniqueBreeds = [...new Set(rows.map((r) => r.breed_name))];
          setBreeds(uniqueBreeds);
          setSelectedBreed(uniqueBreeds[0] || '');
        }
        setLoading(false);
      });
  }, []);

  const breedData = data.filter((d) => d.breed_name === selectedBreed);

  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-12">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold">Tiny Dog Size Database</h1>
          <p className="mt-3 text-lg text-ink-muted max-w-2xl">
            Average measurements for every tiny dog breed at every life stage. Weight, height, chest and neck — use this to track growth and find the right harness size.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-ink-muted">Loading size data...</div>
        ) : breeds.length === 0 ? (
          <div className="py-12 text-center text-ink-muted">Size data not yet available. Check back soon.</div>
        ) : (
          <>
            {/* Breed selector */}
            <div className="mb-8">
              <label htmlFor="breed-select" className="block text-sm font-medium text-ink-light mb-2">Select a breed:</label>
              <div className="flex flex-wrap gap-2">
                {breeds.map((breed) => (
                  <button
                    key={breed}
                    onClick={() => setSelectedBreed(breed)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedBreed === breed ? 'bg-plum text-white' : 'bg-white text-ink-light border border-grey-200 hover:border-plum/30'}`}
                  >
                    {breed}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual growth chart */}
            {breedData.length > 0 && (
              <div className="mb-10 p-6 rounded-2xl bg-white border border-grey-200 shadow-card">
                <h2 className="font-heading font-bold text-xl mb-4">{selectedBreed} — Growth Overview</h2>
                <div className="flex items-end gap-1 h-40">
                  {breedData.map((stage, i) => {
                    const maxWeight = Math.max(...breedData.map(d => d.weight_kg_max));
                    const heightPct = (stage.weight_kg_max / maxWeight) * 100;
                    return (
                      <div key={stage.life_stage} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-ink-muted font-medium">{stage.weight_kg_min}–{stage.weight_kg_max}kg</span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-plum to-coral transition-all"
                          style={{ height: `${heightPct}%`, minHeight: '8px' }}
                        />
                        <span className="text-xs text-grey-500 text-center leading-tight mt-1">{stage.life_stage.split('(')[0].trim()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-grey-200">
                    <th className="text-left py-3 pr-4 font-heading font-bold text-ink">Life Stage</th>
                    <th className="text-left py-3 pr-4 font-heading font-bold text-ink">Weight (kg)</th>
                    <th className="text-left py-3 pr-4 font-heading font-bold text-ink">Height (cm)</th>
                    <th className="text-left py-3 pr-4 font-heading font-bold text-ink">Chest (cm)</th>
                    <th className="text-left py-3 pr-4 font-heading font-bold text-ink">Neck (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {breedData.map((row) => (
                    <tr key={row.life_stage} className="border-b border-grey-200 hover:bg-grey-100/50">
                      <td className="py-3 pr-4 font-medium text-ink">{row.life_stage}</td>
                      <td className="py-3 pr-4 text-ink-muted">{row.weight_kg_min}–{row.weight_kg_max}</td>
                      <td className="py-3 pr-4 text-ink-muted">{row.height_cm_min && row.height_cm_max ? `${row.height_cm_min}–${row.height_cm_max}` : '—'}</td>
                      <td className="py-3 pr-4 text-ink-muted">{row.chest_cm_min && row.chest_cm_max ? `${row.chest_cm_min}–${row.chest_cm_max}` : '—'}</td>
                      <td className="py-3 pr-4 text-ink-muted">{row.neck_cm_min && row.neck_cm_max ? `${row.neck_cm_min}–${row.neck_cm_max}` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes */}
            {breedData.some(d => d.notes) && (
              <div className="mb-10">
                <h3 className="font-heading font-bold text-lg mb-3">Notes by stage</h3>
                <div className="space-y-2">
                  {breedData.filter(d => d.notes).map((row) => (
                    <div key={row.life_stage} className="p-3 rounded-xl bg-plum/5 border border-plum/10">
                      <p className="text-sm"><span className="font-medium text-plum">{row.life_stage}:</span> <span className="text-ink-muted">{row.notes}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Harness sizing help */}
            <div className="p-6 rounded-2xl bg-green-soft border border-green/10 mb-10">
              <h3 className="font-heading font-bold text-green mb-2">📏 Using these measurements for harness fit</h3>
              <p className="text-sm text-ink-muted mb-3">
                The chest measurement is the most important for harness sizing. Measure your dog directly rather than relying on averages — individual dogs within the same breed can vary significantly.
              </p>
              <a href="/tools/harness-finder" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-plum text-white text-sm font-medium hover:bg-plum/90 transition-colors">
                🎯 Use the Harness Finder
              </a>
            </div>

            {/* Disclaimer */}
            <div className="p-5 rounded-xl bg-grey-100 border border-grey-200">
              <p className="text-sm text-ink-muted">
                <strong>Important:</strong> These are average ranges based on breed standards and general data. Individual dogs vary significantly. Always measure your own dog for harness and clothing purchases. Consult your vet if you are concerned about your dog&apos;s growth or weight.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
