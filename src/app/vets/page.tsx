'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { supabase } from '@/lib/supabase';

interface Vet {
  id: string;
  slug: string;
  name: string;
  practice_type: string;
  is_emergency: boolean;
  is_24_hour: boolean;
  small_dog_expertise: string;
  region: string;
  county: string;
  town: string;
  postcode: string;
  latitude: number;
  longitude: number;
  telephone: string;
  emergency_telephone: string;
  website_url: string;
  opening_hours: string;
  emergency_hours: string;
  services: string[];
  summary: string;
  last_verified_date: string;
}

type FilterKey = 'emergency' | '24hour' | 'general' | 'specialist' | 'charity';

const FILTERS: { key: FilterKey; label: string; emoji: string }[] = [
  { key: 'emergency', label: 'Emergency', emoji: '🚨' },
  { key: '24hour', label: '24 Hour', emoji: '🕐' },
  { key: 'general', label: 'General Practice', emoji: '🏥' },
  { key: 'specialist', label: 'Specialist', emoji: '⭐' },
  { key: 'charity', label: 'Charity / Low Cost', emoji: '💚' },
];

function matchesFilter(vet: Vet, filter: FilterKey): boolean {
  switch (filter) {
    case 'emergency': return vet.is_emergency;
    case '24hour': return vet.is_24_hour;
    case 'general': return vet.practice_type === 'general';
    case 'specialist': return vet.practice_type === 'specialist';
    case 'charity': return vet.practice_type === 'charity';
  }
}

export default function VetsPage() {
  const [vets, setVets] = useState<Vet[]>([]);
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('vets')
        .select('*')
        .eq('status', 'published')
        .order('is_emergency', { ascending: false })
        .order('name');

      if (!error && data) setVets(data);
      setLoading(false);
    }
    load();
  }, []);

  const toggleFilter = (key: FilterKey) => {
    setActiveFilters((prev) => prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]);
  };

  const filtered = useMemo(() => {
    let results = vets;
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter((v) =>
        v.name.toLowerCase().includes(q) ||
        v.town.toLowerCase().includes(q) ||
        v.county.toLowerCase().includes(q) ||
        (v.postcode && v.postcode.toLowerCase().includes(q))
      );
    }
    if (activeFilters.length > 0) {
      results = results.filter((v) => activeFilters.some((f) => matchesFilter(v, f)));
    }
    return results;
  }, [vets, search, activeFilters]);

  const emergencyVets = filtered.filter((v) => v.is_emergency);
  const regularVets = filtered.filter((v) => !v.is_emergency);

  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-12">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-plum via-plum-light to-coral/80 p-8 lg:p-12 mb-10">
          <div className="relative">
            <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-2">Vet Finder</p>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-3">
              Find a vet for your tiny dog
            </h1>
            <p className="text-white/80 max-w-lg mb-8">
              Emergency and regular veterinary practices across the UK. We highlight 24-hour emergency vets so you know where to go when it matters most.
            </p>
            <div className="relative max-w-md">
              <input
                type="search"
                placeholder="Search by town, postcode or practice name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-full bg-white/95 text-ink text-sm placeholder:text-grey-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                aria-label="Search vets"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-grey-500" aria-hidden="true">🔍</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFilter(f.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilters.includes(f.key)
                  ? f.key === 'emergency' ? 'bg-coral text-white shadow-md' : 'bg-plum text-white shadow-md'
                  : 'bg-white text-ink-light border border-grey-200 hover:border-plum/30'
              }`}
              aria-pressed={activeFilters.includes(f.key)}
            >
              <span aria-hidden="true">{f.emoji}</span>
              {f.label}
            </button>
          ))}
          {activeFilters.length > 0 && (
            <button onClick={() => setActiveFilters([])} className="text-sm text-coral hover:underline ml-2">Clear</button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12 text-ink-muted">Loading vets...</div>
        ) : (
          <>
            {/* Emergency vets section */}
            {emergencyVets.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <span className="text-coral">🚨</span> Emergency & 24-Hour Vets
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {emergencyVets.map((vet) => (
                    <div key={vet.id} className="p-5 rounded-2xl bg-coral/5 border-2 border-coral/20 dark:bg-coral/10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-coral text-white">
                          {vet.is_24_hour ? '24 HOUR' : 'EMERGENCY'}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-ink dark:text-dark-text">{vet.name}</h3>
                      <p className="text-sm text-ink-muted dark:text-dark-muted mt-1">{vet.town}, {vet.county}</p>
                      {vet.emergency_telephone && (
                        <a href={`tel:${vet.emergency_telephone.replace(/\s/g, '')}`} className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral text-white text-sm font-bold hover:bg-coral/90 transition-colors">
                          📞 {vet.emergency_telephone}
                        </a>
                      )}
                      {vet.emergency_hours && (
                        <p className="mt-2 text-xs text-ink-muted dark:text-dark-muted">{vet.emergency_hours}</p>
                      )}
                      <div className="mt-3 flex gap-2">
                        {vet.website_url && (
                          <a href={vet.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-plum dark:text-coral-soft hover:underline">Website →</a>
                        )}
                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${vet.latitude},${vet.longitude}`} target="_blank" rel="noopener noreferrer" className="text-xs text-plum dark:text-coral-soft hover:underline">Directions →</a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Regular vets */}
            {regularVets.length > 0 && (
              <section>
                <h2 className="text-xl font-heading font-bold mb-4">🏥 Veterinary Practices</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {regularVets.map((vet) => (
                      <motion.div
                        key={vet.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-5 rounded-2xl bg-white dark:bg-dark-surface border border-grey-200 dark:border-dark-border shadow-card"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-grey-100 text-grey-700 dark:bg-dark-border dark:text-dark-muted capitalize">
                            {vet.practice_type}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-ink dark:text-dark-text">{vet.name}</h3>
                        <p className="text-sm text-ink-muted dark:text-dark-muted mt-1">{vet.town}, {vet.county}</p>
                        {vet.summary && <p className="text-sm text-ink-muted dark:text-dark-muted mt-2 line-clamp-2">{vet.summary}</p>}
                        {vet.small_dog_expertise && (
                          <p className="mt-2 text-xs text-green font-medium">🐾 {vet.small_dog_expertise}</p>
                        )}
                        {vet.telephone && (
                          <a href={`tel:${vet.telephone.replace(/\s/g, '')}`} className="mt-3 inline-flex items-center gap-2 text-sm text-plum dark:text-coral-soft font-medium hover:underline">
                            📞 {vet.telephone}
                          </a>
                        )}
                        <div className="mt-3 flex gap-3">
                          {vet.website_url && (
                            <a href={vet.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-plum dark:text-coral-soft hover:underline">Website →</a>
                          )}
                          <a href={`https://www.google.com/maps/dir/?api=1&destination=${vet.latitude},${vet.longitude}`} target="_blank" rel="noopener noreferrer" className="text-xs text-plum dark:text-coral-soft hover:underline">Directions →</a>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <span className="text-4xl block mb-3" aria-hidden="true">🏥</span>
                <p className="text-ink-muted">No vets found for that search. Try a different town or postcode.</p>
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="mt-16 p-5 rounded-xl bg-grey-100 dark:bg-dark-border/20 border border-grey-200 dark:border-dark-border">
          <p className="text-sm text-ink-muted dark:text-dark-muted">
            <strong>Important:</strong> Opening hours and services may change. Always call ahead in an emergency.
            This directory is for informational purposes. In a life-threatening emergency, contact the nearest vet immediately or call your regular vet&apos;s out-of-hours service.
          </p>
        </div>
      </div>
    </>
  );
}
