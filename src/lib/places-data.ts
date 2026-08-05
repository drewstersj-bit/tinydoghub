/**
 * Tiny Dog Welcome — Venue directory data model and seed content.
 * Curated cafés, pubs and restaurants that genuinely welcome small dogs.
 */

export type TriState = 'yes' | 'no' | 'unknown';
export type VenueStatus = 'draft' | 'published' | 'temporarily_closed' | 'archived';
export type VerificationMethod = 'personal_visit' | 'venue_confirmation' | 'official_policy' | 'trusted_submission' | 'unverified';
export type VenueType = 'cafe' | 'pub' | 'restaurant' | 'tearoom' | 'farm_shop_cafe' | 'hotel' | 'other';
export type WelcomeLabel = 'tiny_dog_favourite' | 'warm_little_welcome' | 'dog_friendly' | 'limited_dog_access' | 'not_yet_rated';
export type NoiseLevel = 'very_quiet' | 'relaxed' | 'moderate' | 'lively' | 'loud';
export type EscapeRisk = 'low' | 'moderate' | 'high' | 'unknown';

export interface Venue {
  id: string;
  slug: string;
  name: string;
  venueType: VenueType;
  status: VenueStatus;
  region: string;
  county: string;
  town: string;
  postcode: string;
  latitude: number;
  longitude: number;
  summary: string;
  editorialReview: string;
  tinyDogVerdict: string;
  websiteUrl?: string;
  googleMapsUrl?: string;

  // Dog access
  dogsIndoors: TriState;
  dogsOutdoors: TriState;
  dogsThroughout: TriState;
  coveredOutdoorSeating: TriState;
  restrictedAreas?: string;

  // Small-dog comfort
  quietSeating: TriState;
  spaciousTables: TriState;
  enclosedGarden: TriState;
  puppySuitable: TriState;
  nervousDogSuitable: TriState;
  multipleDogsWelcome: TriState;
  escapeRisk: EscapeRisk;
  noiseLevel: NoiseLevel;

  // Facilities
  waterBowls: TriState;
  freeDogTreats: TriState;
  dogTreatsForSale: TriState;
  dogMenu: TriState;
  parkingAvailable: TriState;
  accessibleEntrance: TriState;
  nearbyGreenSpace: TriState;

  // Practical
  bestVisitTimes?: string;
  busyPeriodNotes?: string;
  foodAndDrinkSummary: string;
  priceBand: '£' | '££' | '£££';

  // Rating
  welcomeLabel: WelcomeLabel;
  welcomeScore: number; // 0–100
  featureLabels: string[];

  // Connections
  nearbyWalkSlugs: string[];

  // Verification
  verificationMethod: VerificationMethod;
  lastVerifiedDate: string;

  // Images
  primaryImage?: string;
}

function getWelcomeLabel(score: number, method: VerificationMethod): WelcomeLabel {
  if (method === 'unverified') return 'not_yet_rated';
  if (score >= 85) return 'tiny_dog_favourite';
  if (score >= 70) return 'warm_little_welcome';
  if (score >= 50) return 'dog_friendly';
  return 'limited_dog_access';
}

function labelStyle(label: WelcomeLabel): string {
  switch (label) {
    case 'tiny_dog_favourite': return 'bg-coral text-white';
    case 'warm_little_welcome': return 'bg-plum text-white';
    case 'dog_friendly': return 'bg-green text-white';
    case 'limited_dog_access': return 'bg-grey-300 text-ink';
    case 'not_yet_rated': return 'bg-grey-200 text-grey-700';
  }
}

export function getWelcomeLabelText(label: WelcomeLabel): string {
  switch (label) {
    case 'tiny_dog_favourite': return 'Tiny Dog Favourite';
    case 'warm_little_welcome': return 'Warm Little Welcome';
    case 'dog_friendly': return 'Dog Friendly';
    case 'limited_dog_access': return 'Limited Dog Access';
    case 'not_yet_rated': return 'Not Yet Rated';
  }
}

export function getWelcomeLabelStyle(label: WelcomeLabel): string {
  return labelStyle(label);
}

export const VENUES: Venue[] = [
  {
    id: 'v1', slug: 'the-art-of-tea-didsbury', name: 'The Art of Tea', venueType: 'cafe', status: 'published',
    region: 'North West', county: 'Greater Manchester', town: 'Didsbury', postcode: 'M20 6RD',
    latitude: 53.4082, longitude: -2.2268,
    summary: 'An independent Didsbury café with beautiful garden seating, homemade cakes and a genuinely warm welcome for small dogs.',
    editorialReview: 'The Art of Tea is one of those rare cafés where you feel your dog is as welcome as you are. The walled garden is fully enclosed and south-facing, making it perfect for cautious tiny dogs who might bolt in an open space. Inside, they happily seat dogs beside the table and bring a water bowl without being asked. Cakes are exceptional.',
    tinyDogVerdict: 'A genuine tiny-dog favourite. The enclosed garden is ideal for nervous small dogs, and staff actively welcome four-legged visitors with water and treats.',
    websiteUrl: 'https://www.theartoftea.co.uk',
    dogsIndoors: 'yes', dogsOutdoors: 'yes', dogsThroughout: 'yes', coveredOutdoorSeating: 'no',
    quietSeating: 'yes', spaciousTables: 'yes', enclosedGarden: 'yes',
    puppySuitable: 'yes', nervousDogSuitable: 'yes', multipleDogsWelcome: 'yes',
    escapeRisk: 'low', noiseLevel: 'relaxed',
    waterBowls: 'yes', freeDogTreats: 'yes', dogTreatsForSale: 'no', dogMenu: 'no',
    parkingAvailable: 'yes', accessibleEntrance: 'yes', nearbyGreenSpace: 'yes',
    bestVisitTimes: 'Weekday mornings for the quietest experience',
    foodAndDrinkSummary: 'Homemade cakes, loose-leaf teas, light lunches and weekend brunch',
    priceBand: '££',
    welcomeLabel: 'tiny_dog_favourite', welcomeScore: 92,
    featureLabels: ['Tiny Dog Favourite', 'Little paws welcome inside', 'Enclosed little garden', 'Perfect after walkies'],
    nearbyWalkSlugs: ['fletcher-moss-park-didsbury'],
    verificationMethod: 'personal_visit', lastVerifiedDate: '2026-06-20',
  },
  {
    id: 'v2', slug: 'the-stamford-arms-dunham', name: 'The Stamford Arms', venueType: 'pub', status: 'published',
    region: 'North West', county: 'Cheshire', town: 'Dunham Massey', postcode: 'WA14 4PE',
    latitude: 53.3850, longitude: -2.3910,
    summary: 'A traditional country pub next to Dunham Massey deer park with a large beer garden and reliable dog-friendly welcome.',
    editorialReview: 'Perfectly positioned for post-walk refreshments after the Dunham Massey deer park circuit. The pub welcomes dogs in the bar area and has a huge beer garden. While the garden isn\'t fully enclosed, it has defined boundaries and most tiny dogs cope well on a lead. Sunday roasts are popular so book ahead at weekends.',
    tinyDogVerdict: 'A warm, reliable welcome with excellent food. The garden is spacious but not fully enclosed — keep nervous escape artists on a short lead.',
    dogsIndoors: 'yes', dogsOutdoors: 'yes', dogsThroughout: 'no', coveredOutdoorSeating: 'unknown',
    restrictedAreas: 'Dogs not allowed in the dining room at peak times',
    quietSeating: 'yes', spaciousTables: 'yes', enclosedGarden: 'no',
    puppySuitable: 'yes', nervousDogSuitable: 'unknown', multipleDogsWelcome: 'yes',
    escapeRisk: 'moderate', noiseLevel: 'moderate',
    waterBowls: 'yes', freeDogTreats: 'no', dogTreatsForSale: 'no', dogMenu: 'no',
    parkingAvailable: 'yes', accessibleEntrance: 'yes', nearbyGreenSpace: 'yes',
    bestVisitTimes: 'Weekday lunches or early Sunday before the roast crowd',
    busyPeriodNotes: 'Very busy Sunday lunchtimes — booking essential',
    foodAndDrinkSummary: 'Traditional pub menu with excellent Sunday roasts, cask ales and wine list',
    priceBand: '££',
    welcomeLabel: 'warm_little_welcome', welcomeScore: 76,
    featureLabels: ['Warm Little Welcome', 'Perfect after walkies', 'Little paws welcome inside'],
    nearbyWalkSlugs: ['dunham-massey-deer-park'],
    verificationMethod: 'personal_visit', lastVerifiedDate: '2026-06-15',
  },
  {
    id: 'v3', slug: 'delamere-forest-cafe', name: 'Delamere Forest Café', venueType: 'cafe', status: 'published',
    region: 'North West', county: 'Cheshire', town: 'Delamere', postcode: 'CW8 2JD',
    latitude: 53.2290, longitude: -2.6770,
    summary: 'The Forestry England visitor centre café with spacious outdoor terrace, water bowls and post-walk refreshments.',
    editorialReview: 'A convenient post-walk café right at the Delamere Forest car park. Dogs are welcome on the large covered terrace which has water bowls permanently available. The terrace overlooks the forest and is spacious enough for multiple dogs without feeling crowded. Inside seating is not dog-friendly. Good range of hot drinks, sandwiches and cake.',
    tinyDogVerdict: 'Excellent outdoor option with water bowls and forest views. Dogs can\'t go inside but the covered terrace works well in light rain.',
    dogsIndoors: 'no', dogsOutdoors: 'yes', dogsThroughout: 'no', coveredOutdoorSeating: 'yes',
    quietSeating: 'yes', spaciousTables: 'yes', enclosedGarden: 'no',
    puppySuitable: 'yes', nervousDogSuitable: 'yes', multipleDogsWelcome: 'yes',
    escapeRisk: 'low', noiseLevel: 'relaxed',
    waterBowls: 'yes', freeDogTreats: 'no', dogTreatsForSale: 'yes', dogMenu: 'no',
    parkingAvailable: 'yes', accessibleEntrance: 'yes', nearbyGreenSpace: 'yes',
    bestVisitTimes: 'Mid-morning after an early walk',
    foodAndDrinkSummary: 'Hot drinks, sandwiches, soup, cakes and cold drinks',
    priceBand: '£',
    welcomeLabel: 'dog_friendly', welcomeScore: 68,
    featureLabels: ['Rainy day rescue', 'Perfect after walkies', 'Quiet corner available'],
    nearbyWalkSlugs: ['delamere-forest-blakemere-trail'],
    verificationMethod: 'personal_visit', lastVerifiedDate: '2026-07-01',
  },
  {
    id: 'v4', slug: 'the-venetian-knutsford', name: 'The Venetian', venueType: 'restaurant', status: 'published',
    region: 'North West', county: 'Cheshire', town: 'Knutsford', postcode: 'WA16 6BU',
    latitude: 53.3030, longitude: -2.3750,
    summary: 'An Italian restaurant on Knutsford\'s King Street that welcomes well-behaved small dogs in the front bar area.',
    editorialReview: 'A pleasant surprise on Knutsford\'s stylish King Street. Dogs are welcome in the bar area near the front, which has comfortable booth seating with plenty of room for a small dog beside or beneath the table. The staff are friendly about dogs and will bring water. The main restaurant area is dog-free, so specify bar seating when booking.',
    tinyDogVerdict: 'A good option for dog-friendly dining in Knutsford. Request the bar area when booking and your small dog will be comfortable.',
    dogsIndoors: 'yes', dogsOutdoors: 'unknown', dogsThroughout: 'no', coveredOutdoorSeating: 'unknown',
    restrictedAreas: 'Dogs only in the bar area, not the main restaurant',
    quietSeating: 'yes', spaciousTables: 'yes', enclosedGarden: 'unknown',
    puppySuitable: 'unknown', nervousDogSuitable: 'yes', multipleDogsWelcome: 'unknown',
    escapeRisk: 'low', noiseLevel: 'relaxed',
    waterBowls: 'yes', freeDogTreats: 'no', dogTreatsForSale: 'no', dogMenu: 'no',
    parkingAvailable: 'yes', accessibleEntrance: 'yes', nearbyGreenSpace: 'yes',
    bestVisitTimes: 'Early evening for a quieter experience',
    foodAndDrinkSummary: 'Italian cuisine, pasta, pizza, wine and cocktails',
    priceBand: '££',
    welcomeLabel: 'warm_little_welcome', welcomeScore: 72,
    featureLabels: ['Warm Little Welcome', 'Quiet corner available', 'Warm welcome, small tables'],
    nearbyWalkSlugs: ['tatton-park-mere-circuit'],
    verificationMethod: 'venue_confirmation', lastVerifiedDate: '2026-05-28',
  },
  {
    id: 'v5', slug: 'coconut-kitchen-abersoch', name: 'The Coconut Kitchen', venueType: 'restaurant', status: 'published',
    region: 'North Wales', county: 'Gwynedd', town: 'Abersoch', postcode: 'LL53 7DS',
    latitude: 52.8265, longitude: -4.5020,
    summary: 'A popular Thai restaurant in Abersoch with a sheltered courtyard where small dogs are welcome during the day.',
    editorialReview: 'The Coconut Kitchen is one of Abersoch\'s best-known restaurants and their courtyard is dog-friendly during daytime hours. The sheltered courtyard has heating and cover, making it a viable rainy-day option. Dogs can\'t go inside the main restaurant. Food is excellent Thai cuisine and it gets very busy in summer — book well ahead for July and August.',
    tinyDogVerdict: 'Dogs welcome in the covered courtyard. Great food but plan ahead — booking is essential in summer.',
    dogsIndoors: 'no', dogsOutdoors: 'yes', dogsThroughout: 'no', coveredOutdoorSeating: 'yes',
    quietSeating: 'unknown', spaciousTables: 'yes', enclosedGarden: 'yes',
    puppySuitable: 'yes', nervousDogSuitable: 'unknown', multipleDogsWelcome: 'yes',
    escapeRisk: 'low', noiseLevel: 'lively',
    waterBowls: 'yes', freeDogTreats: 'no', dogTreatsForSale: 'no', dogMenu: 'no',
    parkingAvailable: 'yes', accessibleEntrance: 'unknown', nearbyGreenSpace: 'yes',
    bestVisitTimes: 'Lunchtime for a quieter courtyard experience',
    busyPeriodNotes: 'Extremely busy July–August, booking essential',
    foodAndDrinkSummary: 'Authentic Thai cuisine, cocktails and wines',
    priceBand: '££',
    welcomeLabel: 'dog_friendly', welcomeScore: 64,
    featureLabels: ['Rainy day rescue', 'Enclosed little garden'],
    nearbyWalkSlugs: ['abersoch-beach-walk'],
    verificationMethod: 'trusted_submission', lastVerifiedDate: '2026-05-15',
  },
];

export function getPublishedVenues(): Venue[] {
  return VENUES.filter((v) => v.status === 'published');
}

export function getVenueBySlug(slug: string): Venue | undefined {
  return VENUES.find((v) => v.slug === slug && v.status === 'published');
}

export function getVenuesByRegion(region: string): Venue[] {
  return VENUES.filter((v) => v.region === region && v.status === 'published');
}
