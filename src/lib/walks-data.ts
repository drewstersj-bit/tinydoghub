/**
 * Walk data model and seed content for the Walks section.
 * "Little Walks for Little Legs"
 */

export interface FacilityInfo {
  available: boolean;
  notes?: string;
}

export interface NearbyPlace {
  name: string;
  type: 'cafe' | 'pub' | 'restaurant';
  dogFriendly: boolean;
  notes?: string;
}

export interface TinyDogRating {
  total: number;
  band: string;
  components: {
    distanceDuration: number; // max 15
    gradient: number; // max 15
    surfaceComfort: number; // max 10
    stiles: number; // max 10
    trafficExposure: number; // max 10
    livestock: number; // max 10
    escapeRisk: number; // max 10
    facilities: number; // max 10
    weatherExposure: number; // max 5
    seasonalReliability: number; // max 5
  };
  positives: string[];
  caution?: string;
}

export interface Walk {
  id: string;
  slug: string;
  status: 'draft' | 'published';
  title: string;
  strapline: string;
  summary: string;
  region: string;
  county: string;
  nearestTown: string;
  start: { latitude: number; longitude: number };
  distanceMiles: number;
  durationMinutes: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  routeType: 'circular' | 'out-and-back' | 'linear';
  environments: string[];
  surfaces: string[];
  gradient: 'mostly-flat' | 'gentle' | 'hilly' | 'steep';
  stiles: { count: number; notes?: string };
  livestock: 'none-known' | 'possible' | 'likely';
  roadExposure: 'none' | 'low' | 'moderate' | 'high';
  escapeRisk: 'low' | 'moderate' | 'high';
  offLead: 'not-recommended' | 'limited' | 'some-sections' | 'generally-suitable';
  puppyFriendly: boolean;
  buggyFriendly: 'yes' | 'dry-weather-only' | 'partial' | 'no';
  quietness: 'usually-quiet' | 'variable' | 'often-busy';
  weatherExposure: 'sheltered' | 'mixed' | 'exposed';
  winterSuitable: boolean;
  parking: FacilityInfo;
  toilets: FacilityInfo;
  cafes: NearbyPlace[];
  whyTinyDogsLoveIt: string[];
  rating: TinyDogRating;
  lastVerified: string;
  featured: boolean;
}

function calculateBand(total: number): string {
  if (total >= 85) return 'Perfect for tiny paws';
  if (total >= 70) return 'Easy little adventure';
  if (total >= 55) return 'Moderate for small explorers';
  return 'Best for energetic or experienced little dogs';
}

export const WALKS: Walk[] = [
  {
    id: '1', slug: 'dunham-massey-deer-park', status: 'published',
    title: 'Dunham Massey Deer Park',
    strapline: 'Flat parkland paths with grazing deer and ancient trees',
    summary: 'A gentle stroll through the National Trust deer park on well-maintained paths. Flat terrain, good surfaces and plenty of rest spots make this ideal for tiny dogs.',
    region: 'North West', county: 'Cheshire', nearestTown: 'Altrincham',
    start: { latitude: 53.3837, longitude: -2.3934 },
    distanceMiles: 1.8, durationMinutes: 40,
    difficulty: 'easy', routeType: 'circular',
    environments: ['park', 'woodland'], surfaces: ['gravel', 'grass'],
    gradient: 'mostly-flat',
    stiles: { count: 0 }, livestock: 'none-known',
    roadExposure: 'none', escapeRisk: 'low',
    offLead: 'limited', puppyFriendly: true,
    buggyFriendly: 'yes', quietness: 'variable',
    weatherExposure: 'mixed', winterSuitable: true,
    parking: { available: true, notes: 'NT car park, pay and display' },
    toilets: { available: true, notes: 'At the stables courtyard' },
    cafes: [{ name: 'Stamford Arms', type: 'pub', dogFriendly: true, notes: 'Dog-friendly garden' }],
    whyTinyDogsLoveIt: ['Completely flat paths perfect for short legs', 'Sheltered by ancient trees', 'Lots of sniffing opportunities in the undergrowth'],
    rating: {
      total: 88, band: calculateBand(88),
      components: { distanceDuration: 14, gradient: 15, surfaceComfort: 9, stiles: 10, trafficExposure: 10, livestock: 10, escapeRisk: 10, facilities: 8, weatherExposure: 3, seasonalReliability: 4 },
      positives: ['Completely flat', 'Excellent path surfaces'],
      caution: 'Dogs must be on lead due to deer',
    },
    lastVerified: '2026-06-15', featured: true,
  },
  {
    id: '2', slug: 'lyme-park-cage-loop', status: 'published',
    title: 'Lyme Park — Cage Loop',
    strapline: 'A short hilltop circuit with panoramic Peak District views',
    summary: 'A compact loop around the iconic Cage tower at Lyme Park. Gentle gradients with stunning moorland views. Keep tiny dogs on lead near the deer sanctuary.',
    region: 'North West', county: 'Cheshire', nearestTown: 'Disley',
    start: { latitude: 53.3475, longitude: -2.0491 },
    distanceMiles: 1.5, durationMinutes: 35,
    difficulty: 'easy', routeType: 'circular',
    environments: ['park', 'moorland'], surfaces: ['gravel', 'grass'],
    gradient: 'gentle',
    stiles: { count: 0 }, livestock: 'possible',
    roadExposure: 'none', escapeRisk: 'low',
    offLead: 'limited', puppyFriendly: true,
    buggyFriendly: 'dry-weather-only', quietness: 'variable',
    weatherExposure: 'exposed', winterSuitable: false,
    parking: { available: true, notes: 'NT car park at main entrance' },
    toilets: { available: true, notes: 'Near the house' },
    cafes: [{ name: 'Lyme Park Coffee Shop', type: 'cafe', dogFriendly: true }],
    whyTinyDogsLoveIt: ['Short enough for little legs', 'Gentle slopes with rest points', 'Fascinating scents from the moorland'],
    rating: {
      total: 76, band: calculateBand(76),
      components: { distanceDuration: 14, gradient: 12, surfaceComfort: 8, stiles: 10, trafficExposure: 10, livestock: 7, escapeRisk: 10, facilities: 8, weatherExposure: 2, seasonalReliability: 3 },
      positives: ['Short and manageable', 'Great facilities'],
      caution: 'Exposed to wind — wrap up in cooler months',
    },
    lastVerified: '2026-05-20', featured: false,
  },
  {
    id: '3', slug: 'delamere-forest-blakemere-trail', status: 'published',
    title: 'Delamere Forest — Blakemere Trail',
    strapline: 'Woodland wandering around a hidden mere',
    summary: 'A sheltered forest walk around Blakemere Moss on well-surfaced paths. Excellent for nervous tiny dogs who prefer quiet, enclosed spaces.',
    region: 'North West', county: 'Cheshire', nearestTown: 'Northwich',
    start: { latitude: 53.2287, longitude: -2.6775 },
    distanceMiles: 1.2, durationMinutes: 30,
    difficulty: 'easy', routeType: 'circular',
    environments: ['woodland', 'lakeside'], surfaces: ['gravel', 'boardwalk'],
    gradient: 'mostly-flat',
    stiles: { count: 0 }, livestock: 'none-known',
    roadExposure: 'none', escapeRisk: 'low',
    offLead: 'some-sections', puppyFriendly: true,
    buggyFriendly: 'yes', quietness: 'usually-quiet',
    weatherExposure: 'sheltered', winterSuitable: true,
    parking: { available: true, notes: 'Forestry England car park, pay and display' },
    toilets: { available: true, notes: 'At the visitor centre' },
    cafes: [{ name: 'Delamere Forest Café', type: 'cafe', dogFriendly: true, notes: 'Outdoor seating with water bowls' }],
    whyTinyDogsLoveIt: ['Dense woodland feels safe and enclosed', 'Quiet and sheltered from wind', 'Excellent surfaces — no muddy paws'],
    rating: {
      total: 92, band: calculateBand(92),
      components: { distanceDuration: 15, gradient: 15, surfaceComfort: 10, stiles: 10, trafficExposure: 10, livestock: 10, escapeRisk: 10, facilities: 9, weatherExposure: 5, seasonalReliability: 5 },
      positives: ['Perfectly sheltered', 'Ideal short distance'],
      caution: 'Boardwalk sections can be slippery when wet',
    },
    lastVerified: '2026-07-01', featured: true,
  },
  {
    id: '4', slug: 'fletcher-moss-park-didsbury', status: 'published',
    title: 'Fletcher Moss Park',
    strapline: 'A secret urban garden walk beside the River Mersey',
    summary: 'A compact and charming walk through botanical gardens and riverside paths in south Manchester. Perfect for a quick tiny-dog adventure without leaving the city.',
    region: 'North West', county: 'Greater Manchester', nearestTown: 'Didsbury',
    start: { latitude: 53.4079, longitude: -2.2257 },
    distanceMiles: 1.0, durationMinutes: 25,
    difficulty: 'easy', routeType: 'circular',
    environments: ['park', 'urban'], surfaces: ['paved', 'gravel'],
    gradient: 'mostly-flat',
    stiles: { count: 0 }, livestock: 'none-known',
    roadExposure: 'low', escapeRisk: 'moderate',
    offLead: 'limited', puppyFriendly: true,
    buggyFriendly: 'yes', quietness: 'variable',
    weatherExposure: 'mixed', winterSuitable: true,
    parking: { available: true, notes: 'Small free car park on Millgate Lane' },
    toilets: { available: false },
    cafes: [{ name: 'The Art of Tea', type: 'cafe', dogFriendly: true, notes: 'Garden seating welcomes dogs' }],
    whyTinyDogsLoveIt: ['Super short — ideal for puppies building stamina', 'Beautiful garden scents', 'Close to dog-friendly cafés in Didsbury'],
    rating: {
      total: 82, band: calculateBand(82),
      components: { distanceDuration: 15, gradient: 15, surfaceComfort: 9, stiles: 10, trafficExposure: 8, livestock: 10, escapeRisk: 7, facilities: 6, weatherExposure: 3, seasonalReliability: 4 },
      positives: ['Ultra-short distance', 'Great cafés nearby'],
      caution: 'Some paths near unfenced river — keep on lead',
    },
    lastVerified: '2026-06-28', featured: false,
  },
  {
    id: '5', slug: 'abersoch-beach-walk', status: 'published',
    title: 'Abersoch Beach',
    strapline: 'Sandy paws and sea breezes on the Llŷn Peninsula',
    summary: 'A glorious sandy beach walk on the Llŷn Peninsula. Wide open space, firm sand at low tide, and generally quiet outside peak summer. Check tide times.',
    region: 'North Wales', county: 'Gwynedd', nearestTown: 'Abersoch',
    start: { latitude: 52.8242, longitude: -4.5045 },
    distanceMiles: 1.5, durationMinutes: 40,
    difficulty: 'easy', routeType: 'out-and-back',
    environments: ['beach', 'coast'], surfaces: ['sand'],
    gradient: 'mostly-flat',
    stiles: { count: 0 }, livestock: 'none-known',
    roadExposure: 'none', escapeRisk: 'low',
    offLead: 'generally-suitable', puppyFriendly: true,
    buggyFriendly: 'no', quietness: 'usually-quiet',
    weatherExposure: 'exposed', winterSuitable: false,
    parking: { available: true, notes: 'Pay and display near the beach' },
    toilets: { available: true, notes: 'Seasonal, near the car park' },
    cafes: [{ name: 'The Coconut Kitchen', type: 'restaurant', dogFriendly: false, notes: 'Nearby but not dog-friendly inside' }],
    whyTinyDogsLoveIt: ['Freedom to run off-lead on firm sand', 'Gentle waves and rock pools to explore', 'Quiet beach outside peak season'],
    rating: {
      total: 78, band: calculateBand(78),
      components: { distanceDuration: 14, gradient: 15, surfaceComfort: 7, stiles: 10, trafficExposure: 10, livestock: 10, escapeRisk: 10, facilities: 5, weatherExposure: 2, seasonalReliability: 3 },
      positives: ['Off-lead freedom', 'Beautiful natural setting'],
      caution: 'Exposed to wind and spray — cold for tiny dogs in winter',
    },
    lastVerified: '2026-05-10', featured: true,
  },
  {
    id: '6', slug: 'tatton-park-mere-circuit', status: 'published',
    title: 'Tatton Park — Mere Circuit',
    strapline: 'Gentle lakeside stroll through historic parkland',
    summary: 'A peaceful circuit around Tatton Mere through manicured parkland. Wide paths, no stiles, and plenty of benches for rest stops.',
    region: 'North West', county: 'Cheshire', nearestTown: 'Knutsford',
    start: { latitude: 53.3296, longitude: -2.3783 },
    distanceMiles: 2.0, durationMinutes: 50,
    difficulty: 'easy', routeType: 'circular',
    environments: ['park', 'lakeside'], surfaces: ['gravel', 'grass'],
    gradient: 'mostly-flat',
    stiles: { count: 0 }, livestock: 'possible',
    roadExposure: 'none', escapeRisk: 'low',
    offLead: 'limited', puppyFriendly: true,
    buggyFriendly: 'yes', quietness: 'variable',
    weatherExposure: 'mixed', winterSuitable: true,
    parking: { available: true, notes: 'Tatton Park car park, entry fee applies' },
    toilets: { available: true, notes: 'Near the stables and mansion' },
    cafes: [{ name: 'The Stables Restaurant', type: 'cafe', dogFriendly: true, notes: 'Outdoor terrace welcomes dogs' }],
    whyTinyDogsLoveIt: ['Wide flat paths with room to trot', 'Regular benches for rest breaks', 'Wildlife watching around the mere'],
    rating: {
      total: 86, band: calculateBand(86),
      components: { distanceDuration: 13, gradient: 15, surfaceComfort: 9, stiles: 10, trafficExposure: 10, livestock: 8, escapeRisk: 10, facilities: 9, weatherExposure: 3, seasonalReliability: 4 },
      positives: ['Excellent facilities', 'Flat and accessible'],
      caution: 'Deer roam freely — dogs must stay on lead',
    },
    lastVerified: '2026-06-20', featured: false,
  },
];

export function getPublishedWalks(): Walk[] {
  return WALKS.filter((w) => w.status === 'published');
}

export function getWalkBySlug(slug: string): Walk | undefined {
  return WALKS.find((w) => w.slug === slug && w.status === 'published');
}

export function getFeaturedWalks(): Walk[] {
  return WALKS.filter((w) => w.featured && w.status === 'published');
}
