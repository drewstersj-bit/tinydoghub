'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { supabase } from '@/lib/supabase';

interface Vet {
  id: string; slug: string; name: string; practice_type: string;
  is_emergency: boolean; is_24_hour: boolean; small_dog_expertise: string | null;
  region: string; county: string; town: string; postcode: string;
  latitude: number; longitude: number;
  telephone: string | null; emergency_telephone: string | null;
  website_url: string | null; opening_hours: string | null;
  emergency_hours: string | null; services: string[]; summary: string | null;
  last_verified_date: string | null;
  verification_status: string; emergency_access: string;
  referral_required: boolean; call_before_travelling: boolean;
  telephone_verified: boolean;
}

type FilterKey = 'emergency' | 'general' | 'specialist' | 'charity' | 'referral';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'emergency', label: '🚨 Emergency' },
  { key: 'general', label: '🏥 General Practice' },
  { key: 'specialist', label: '⭐ Specialist / Referral' },
  { key: 'charity', label: '💚 Low Cost / Charity' },
];

function isValidPhone(phone: string | null): boolean {
  if (!phone) return false;
  return /^[\d\s+()-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function formatEmergencyAccess(access: string): { label: string; style: string } {
  switch (access) {
    case 'public_24_7': return { label: 'Open to the public 24/7', style: 'bg-coral text-white' };
    case 'out_of_hours': return { label: 'Out-of-hours service', style: 'bg-coral/80 text-white' };
    case 'referral_only': return { label: 'Referral required', style: 'bg-lemon text-ink' };
    case 'telephone_triage': return { label: 'Telephone triage only', style: 'bg-sky text-white' };
    default: return { label: '', style: '' };
  }
}

export default function VetsPage() {
  const [vets, setVets] = useState<Vet[]>([]);
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('vets').select('*').eq('status', 'published')
      .order('is_emergency', { ascending: false }).order('name')
      .then(({ data }) => { if (data) setVets(data); setLoading(false); });
  }, []);

  const toggleFilter = (key: FilterKey) => {
    setActiveFilters((prev) => prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]);
  };

  const filtered = useMemo(() => {
    let results = vets;
    if (search.trim()) {
      const q = search.toLowerCase().replace(/\s/g, '');
      results = results.filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.town.toLowerCase().includes(search.toLowerCase()) ||
        v.county.toLowerCase().includes(search.toLowerCase()) ||
        v.region.toLowerCase().includes(search.toLowerCase()) ||
        (v.postcode && v.postcode.toLowerCase().replace(/\s/g, '').includes(q))
      );
    }
    if (activeFilters.length > 0) {
      results = results.filter((v) => activeFilters.some((f) => {
        switch (f) {
          case 'emergency': return v.is_emergency && !v.referral_required;
          case 'general': return v.practice_type === 'general';
          case 'specialist': return v.practice_type === 'specialist' || v.referral_required;
          case 'charity': return v.practice_type === 'charity';
          default: return false;
        }
      }));
    }
    return results;
  }, [vets, search, activeFilters]);

  const emergencyVets = filtered.filter((v) => v.is_emergency);
  const regularVets = filtered.filter((v) => !v.is_emergency);

  const activateEmergencyFilter = () => {
    setActiveFilters(['emergency']);
    document.getElementById('vet-results')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-8">
        {/* Emergency strip */}
        <div className="mb-6 p-4 rounded-2xl bg-coral/5 border-2 border-coral/20">
          <h2 className="font-heading font-bold text-coral text-lg mb-1">🚨 Need urgent veterinary help?</h2>
          <p className="text-sm text-ink-light mb-3">
            If your dog may be seriously ill or injured, call a veterinary practice immediately.
            Telephone before travelling so the team can confirm where to take your dog.
          </p>
          <p className="text-xs text-ink-muted mb-3">
            If you believe your dog has been poisoned, contact a veterinary practice immediately. Do not wait for symptoms to develop.
          </p>
          <button
            onClick={activateEmergencyFilter}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-coral text-white text-sm font-bold hover:bg-coral/90 transition-colors"
          >
            Find emergency veterinary help
          </button>
        </div>

        {/* Compact hero with search */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-heading font-bold mb-2">
            Find a Vet for Your Tiny Dog
          </h1>
          <p className="text-sm text-ink-muted mb-4 max-w-xl">
            Search our growing collection of checked veterinary practices and emergency services.
            Coverage is expanding. Always contact your usual veterinary practice first when possible.
          </p>
          <div className="relative max-w-md">
            <input
              type="search"
              placeholder="Search by town, postcode or practice name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-grey-200 bg-white text-ink text-sm placeholder:text-grey-500 focus:outline-none focus:ring-2 focus:ring-plum/30 shadow-card"
              aria-label="Search veterinary practices"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-grey-500" aria-hidden="true">🔍</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilters.includes(f.key)
                  ? 'bg-plum text-white shadow-md'
                  : 'bg-white text-ink-light border border-grey-200 hover:border-plum/30'
              }`}
              aria-pressed={activeFilters.includes(f.key)}
            >
              {f.label}
            </button>
          ))}
          {activeFilters.length > 0 && (
            <button onClick={() => setActiveFilters([])} className="text-sm text-coral hover:underline ml-2">Clear</button>
          )}
        </div>

        {/* Result count */}
        <p id="vet-results" className="text-sm text-ink-muted mb-4" aria-live="polite">
          {loading ? 'Loading...' : `${filtered.length} practice${filtered.length !== 1 ? 's' : ''} found`}
        </p>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-48 rounded-2xl bg-grey-100 animate-pulse" />)}
          </div>
        ) : (
          <>
            {/* Emergency vets */}
            {emergencyVets.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-heading font-bold mb-3 flex items-center gap-2">
                  <span className="text-coral">🚨</span> Emergency Veterinary Services
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {emergencyVets.map((vet) => {
                    const access = formatEmergencyAccess(vet.emergency_access);
                    const phoneValid = isValidPhone(vet.emergency_telephone || vet.telephone);
                    const displayPhone = vet.emergency_telephone || vet.telephone;
                    return (
                      <div key={vet.id} className="p-5 rounded-2xl bg-coral/5 border-2 border-coral/20">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {access.label && <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${access.style}`}>{access.label}</span>}
                          {vet.referral_required && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-lemon text-ink">Referral required</span>}
                        </div>
                        {vet.call_before_travelling && (
                          <p className="text-xs text-coral font-medium mb-2">⚠️ Call before travelling</p>
                        )}
                        <h3 className="font-heading font-bold text-ink">{vet.name}</h3>
                        <p className="text-sm text-ink-muted mt-1">{vet.town}, {vet.county}</p>

                        {/* Phone */}
                        {phoneValid && displayPhone ? (
                          <a href={`tel:${displayPhone.replace(/\s/g, '')}`} className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral text-white text-sm font-bold hover:bg-coral/90 transition-colors">
                            📞 {displayPhone}
                          </a>
                        ) : (
                          <p className="mt-3 text-xs text-ink-muted italic">Telephone number awaiting verification</p>
                        )}

                        {vet.emergency_hours && <p className="mt-2 text-xs text-ink-muted">{vet.emergency_hours}</p>}

                        {/* Actions */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a href={`https://www.google.com/maps/dir/?api=1&destination=${vet.latitude},${vet.longitude}`} target="_blank" rel="noopener noreferrer" className="text-xs text-plum font-medium hover:underline">📍 Directions</a>
                          {vet.website_url && <a href={vet.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-plum font-medium hover:underline">🌐 Website</a>}
                        </div>

                        {/* Verification */}
                        <p className="mt-3 text-xs text-grey-500">
                          {vet.last_verified_date ? `Checked: ${vet.last_verified_date}` : 'Awaiting verification'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Regular vets */}
            {regularVets.length > 0 && (
              <section>
                <h2 className="text-lg font-heading font-bold mb-3">🏥 Veterinary Practices</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {regularVets.map((vet) => {
                      const phoneValid = isValidPhone(vet.telephone);
                      return (
                        <motion.div key={vet.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="p-5 rounded-2xl bg-white border border-grey-200 shadow-card">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-grey-100 text-grey-700 capitalize">{vet.practice_type}</span>
                            {vet.referral_required && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-lemon text-ink">Referral required</span>}
                          </div>
                          <h3 className="font-heading font-bold text-ink">{vet.name}</h3>
                          <p className="text-sm text-ink-muted mt-1">{vet.town}, {vet.county}</p>
                          {vet.summary && <p className="text-sm text-ink-muted mt-2 line-clamp-2">{vet.summary}</p>}

                          {/* Phone — only show if valid */}
                          {phoneValid && vet.telephone ? (
                            <a href={`tel:${vet.telephone.replace(/\s/g, '')}`} className="mt-3 inline-flex items-center gap-2 text-sm text-plum font-medium hover:underline">
                              📞 {vet.telephone}
                            </a>
                          ) : (
                            <p className="mt-3 text-xs text-ink-muted italic">Telephone number awaiting verification</p>
                          )}

                          <div className="mt-3 flex flex-wrap gap-2">
                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${vet.latitude},${vet.longitude}`} target="_blank" rel="noopener noreferrer" className="text-xs text-plum font-medium hover:underline">📍 Directions</a>
                            {vet.website_url && <a href={vet.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-plum font-medium hover:underline">🌐 Website</a>}
                          </div>

                          <p className="mt-3 text-xs text-grey-500">
                            {vet.last_verified_date ? `Checked: ${vet.last_verified_date}` : 'Awaiting verification'}
                          </p>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </section>
            )}

            {filtered.length === 0 && !loading && (
              <div className="text-center py-12">
                <span className="text-4xl block mb-3" aria-hidden="true">🏥</span>
                <p className="font-heading font-semibold text-ink mb-1">No practices found</p>
                <p className="text-sm text-ink-muted">Try a different town or postcode, or remove filters.</p>
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-5 rounded-xl bg-grey-100 border border-grey-200">
          <p className="text-sm text-ink-muted leading-relaxed">
            <strong>Important:</strong> Veterinary services, telephone numbers, opening hours and emergency arrangements can change.
            Always telephone the practice before travelling. Tiny Dog Hub does not provide veterinary advice.
            In a life-threatening emergency, contact the nearest veterinary practice immediately.
          </p>
        </div>
      </div>
    </>
  );
}
