/**
 * Database abstraction layer.
 * Fetches from Supabase at runtime (client-side).
 * Falls back to local data if Supabase is unavailable.
 */

import { supabase } from './supabase';
import { getPublishedWalks as getLocalWalks, getWalkBySlug as getLocalWalkBySlug, type Walk } from './walks-data';
import { getPublishedVenues as getLocalVenues, getVenueBySlug as getLocalVenueBySlug, type Venue } from './places-data';

// ============ VENUES ============

export async function fetchVenues(): Promise<Venue[]> {
  try {
    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .eq('status', 'published')
      .order('welcome_score', { ascending: false });

    if (error || !data || data.length === 0) {
      console.log('Supabase venues unavailable, using local data');
      return getLocalVenues();
    }

    return data.map(mapSupabaseVenue);
  } catch {
    return getLocalVenues();
  }
}

export async function fetchVenueBySlug(slug: string): Promise<Venue | undefined> {
  try {
    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      return getLocalVenueBySlug(slug);
    }

    return mapSupabaseVenue(data);
  } catch {
    return getLocalVenueBySlug(slug);
  }
}

// ============ WALKS ============

export async function fetchWalks(): Promise<Walk[]> {
  try {
    const { data, error } = await supabase
      .from('walks')
      .select('*')
      .eq('status', 'published')
      .order('rating_total', { ascending: false });

    if (error || !data || data.length === 0) {
      console.log('Supabase walks unavailable, using local data');
      return getLocalWalks();
    }

    return data.map(mapSupabaseWalk);
  } catch {
    return getLocalWalks();
  }
}

export async function fetchWalkBySlug(slug: string): Promise<Walk | undefined> {
  try {
    const { data, error } = await supabase
      .from('walks')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      return getLocalWalkBySlug(slug);
    }

    return mapSupabaseWalk(data);
  } catch {
    return getLocalWalkBySlug(slug);
  }
}

// ============ MAPPERS ============

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapSupabaseVenue(row: any): Venue {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    venueType: row.venue_type,
    status: row.status,
    region: row.region,
    county: row.county,
    town: row.town,
    postcode: row.postcode || '',
    latitude: row.latitude,
    longitude: row.longitude,
    summary: row.summary,
    editorialReview: row.editorial_review || '',
    tinyDogVerdict: row.tiny_dog_verdict || '',
    websiteUrl: row.website_url,
    googleMapsUrl: row.google_maps_url,
    dogsIndoors: row.dogs_indoors || 'unknown',
    dogsOutdoors: row.dogs_outdoors || 'unknown',
    dogsThroughout: row.dogs_throughout || 'unknown',
    coveredOutdoorSeating: row.covered_outdoor_seating || 'unknown',
    restrictedAreas: row.restricted_areas,
    quietSeating: row.quiet_seating || 'unknown',
    spaciousTables: row.spacious_tables || 'unknown',
    enclosedGarden: row.enclosed_garden || 'unknown',
    puppySuitable: row.puppy_suitable || 'unknown',
    nervousDogSuitable: row.nervous_dog_suitable || 'unknown',
    multipleDogsWelcome: row.multiple_dogs_welcome || 'unknown',
    escapeRisk: row.escape_risk || 'unknown',
    noiseLevel: row.noise_level || 'moderate',
    waterBowls: row.water_bowls || 'unknown',
    freeDogTreats: row.free_dog_treats || 'unknown',
    dogTreatsForSale: row.dog_treats_for_sale || 'unknown',
    dogMenu: row.dog_menu || 'unknown',
    parkingAvailable: row.parking_available || 'unknown',
    accessibleEntrance: row.accessible_entrance || 'unknown',
    nearbyGreenSpace: row.nearby_green_space || 'unknown',
    bestVisitTimes: row.best_visit_times,
    busyPeriodNotes: row.busy_period_notes,
    foodAndDrinkSummary: row.food_and_drink_summary || '',
    priceBand: row.price_band || '££',
    welcomeLabel: row.welcome_label || 'not_yet_rated',
    welcomeScore: row.welcome_score || 0,
    featureLabels: row.feature_labels || [],
    nearbyWalkSlugs: row.nearby_walk_slugs || [],
    verificationMethod: row.verification_method || 'unverified',
    lastVerifiedDate: row.last_verified_date || '',
  };
}

function mapSupabaseWalk(row: any): Walk {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    title: row.title,
    strapline: row.strapline || '',
    summary: row.summary,
    region: row.region,
    county: row.county,
    nearestTown: row.nearest_town,
    start: { latitude: row.latitude, longitude: row.longitude },
    distanceMiles: row.distance_miles,
    durationMinutes: row.duration_minutes,
    difficulty: row.difficulty,
    routeType: row.route_type || 'circular',
    environments: row.environments || [],
    surfaces: row.surfaces || [],
    gradient: row.gradient || 'mostly-flat',
    stiles: { count: row.stile_count || 0, notes: row.stile_notes },
    livestock: row.livestock || 'none-known',
    roadExposure: row.road_exposure || 'none',
    escapeRisk: row.escape_risk || 'low',
    offLead: row.off_lead || 'limited',
    puppyFriendly: row.puppy_friendly ?? true,
    buggyFriendly: row.buggy_friendly || 'no',
    quietness: row.quietness || 'variable',
    weatherExposure: row.weather_exposure || 'mixed',
    winterSuitable: row.winter_suitable ?? true,
    parking: { available: row.parking_available ?? true, notes: row.parking_notes },
    toilets: { available: row.toilets_available ?? false, notes: row.toilets_notes },
    cafes: row.cafe_name ? [{ name: row.cafe_name, type: 'cafe' as const, dogFriendly: row.cafe_dog_friendly ?? false, notes: row.cafe_notes }] : [],
    whyTinyDogsLoveIt: row.why_tiny_dogs_love_it || [],
    rating: {
      total: row.rating_total || 0,
      band: row.rating_band || '',
      components: { distanceDuration: 0, gradient: 0, surfaceComfort: 0, stiles: 0, trafficExposure: 0, livestock: 0, escapeRisk: 0, facilities: 0, weatherExposure: 0, seasonalReliability: 0 },
      positives: row.rating_positives || [],
      caution: row.rating_caution,
    },
    lastVerified: row.last_verified || '',
    featured: row.featured ?? false,
  };
}
