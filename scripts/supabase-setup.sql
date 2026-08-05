-- =============================================
-- TinyDogHub Database Setup
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- =============================================

-- VENUES TABLE
CREATE TABLE IF NOT EXISTS venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  venue_type TEXT NOT NULL DEFAULT 'cafe',
  status TEXT NOT NULL DEFAULT 'published',
  region TEXT NOT NULL,
  county TEXT NOT NULL,
  town TEXT NOT NULL,
  postcode TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  summary TEXT NOT NULL,
  editorial_review TEXT,
  tiny_dog_verdict TEXT,
  website_url TEXT,
  google_maps_url TEXT,
  
  -- Dog access
  dogs_indoors TEXT DEFAULT 'unknown',
  dogs_outdoors TEXT DEFAULT 'unknown',
  dogs_throughout TEXT DEFAULT 'unknown',
  covered_outdoor_seating TEXT DEFAULT 'unknown',
  restricted_areas TEXT,
  
  -- Small-dog comfort
  quiet_seating TEXT DEFAULT 'unknown',
  spacious_tables TEXT DEFAULT 'unknown',
  enclosed_garden TEXT DEFAULT 'unknown',
  puppy_suitable TEXT DEFAULT 'unknown',
  nervous_dog_suitable TEXT DEFAULT 'unknown',
  multiple_dogs_welcome TEXT DEFAULT 'unknown',
  escape_risk TEXT DEFAULT 'unknown',
  noise_level TEXT DEFAULT 'moderate',
  
  -- Facilities
  water_bowls TEXT DEFAULT 'unknown',
  free_dog_treats TEXT DEFAULT 'unknown',
  dog_treats_for_sale TEXT DEFAULT 'unknown',
  dog_menu TEXT DEFAULT 'unknown',
  parking_available TEXT DEFAULT 'unknown',
  accessible_entrance TEXT DEFAULT 'unknown',
  nearby_green_space TEXT DEFAULT 'unknown',
  
  -- Practical
  best_visit_times TEXT,
  busy_period_notes TEXT,
  food_and_drink_summary TEXT,
  price_band TEXT DEFAULT '££',
  
  -- Rating
  welcome_label TEXT DEFAULT 'not_yet_rated',
  welcome_score INTEGER DEFAULT 0,
  feature_labels TEXT[] DEFAULT '{}',
  
  -- Connections
  nearby_walk_slugs TEXT[] DEFAULT '{}',
  
  -- Verification
  verification_method TEXT DEFAULT 'unverified',
  last_verified_date DATE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- WALKS TABLE
CREATE TABLE IF NOT EXISTS walks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  title TEXT NOT NULL,
  strapline TEXT,
  summary TEXT NOT NULL,
  region TEXT NOT NULL,
  county TEXT NOT NULL,
  nearest_town TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  distance_miles DOUBLE PRECISION NOT NULL,
  duration_minutes INTEGER NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'easy',
  route_type TEXT DEFAULT 'circular',
  environments TEXT[] DEFAULT '{}',
  surfaces TEXT[] DEFAULT '{}',
  gradient TEXT DEFAULT 'mostly-flat',
  stile_count INTEGER DEFAULT 0,
  stile_notes TEXT,
  livestock TEXT DEFAULT 'none-known',
  road_exposure TEXT DEFAULT 'none',
  escape_risk TEXT DEFAULT 'low',
  off_lead TEXT DEFAULT 'limited',
  puppy_friendly BOOLEAN DEFAULT true,
  buggy_friendly TEXT DEFAULT 'no',
  quietness TEXT DEFAULT 'variable',
  weather_exposure TEXT DEFAULT 'mixed',
  winter_suitable BOOLEAN DEFAULT true,
  parking_available BOOLEAN DEFAULT true,
  parking_notes TEXT,
  toilets_available BOOLEAN DEFAULT false,
  toilets_notes TEXT,
  cafe_name TEXT,
  cafe_dog_friendly BOOLEAN DEFAULT false,
  cafe_notes TEXT,
  why_tiny_dogs_love_it TEXT[] DEFAULT '{}',
  
  -- Rating
  rating_total INTEGER DEFAULT 0,
  rating_band TEXT,
  rating_positives TEXT[] DEFAULT '{}',
  rating_caution TEXT,
  
  -- Verification
  last_verified TEXT,
  featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (public read access)
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE walks ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published records
CREATE POLICY "Public can read published venues" ON venues
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read published walks" ON walks
  FOR SELECT USING (status = 'published');

-- =============================================
-- SEED DATA: Venues
-- =============================================

INSERT INTO venues (slug, name, venue_type, status, region, county, town, postcode, latitude, longitude, summary, editorial_review, tiny_dog_verdict, website_url, dogs_indoors, dogs_outdoors, dogs_throughout, covered_outdoor_seating, quiet_seating, spacious_tables, enclosed_garden, puppy_suitable, nervous_dog_suitable, multiple_dogs_welcome, escape_risk, noise_level, water_bowls, free_dog_treats, dog_treats_for_sale, dog_menu, parking_available, accessible_entrance, nearby_green_space, best_visit_times, food_and_drink_summary, price_band, welcome_label, welcome_score, feature_labels, nearby_walk_slugs, verification_method, last_verified_date) VALUES
('the-art-of-tea-didsbury', 'The Art of Tea', 'cafe', 'published', 'North West', 'Greater Manchester', 'Didsbury', 'M20 6RD', 53.4082, -2.2268, 'An independent Didsbury café with beautiful garden seating, homemade cakes and a genuinely warm welcome for small dogs.', 'The Art of Tea is one of those rare cafés where you feel your dog is as welcome as you are. The walled garden is fully enclosed and south-facing, making it perfect for cautious tiny dogs.', 'A genuine tiny-dog favourite. The enclosed garden is ideal for nervous small dogs.', 'https://www.theartoftea.co.uk', 'yes', 'yes', 'yes', 'no', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'low', 'relaxed', 'yes', 'yes', 'no', 'no', 'yes', 'yes', 'yes', 'Weekday mornings for the quietest experience', 'Homemade cakes, loose-leaf teas, light lunches and weekend brunch', '££', 'tiny_dog_favourite', 92, ARRAY['Tiny Dog Favourite', 'Little paws welcome inside', 'Enclosed little garden'], ARRAY['fletcher-moss-park-didsbury'], 'personal_visit', '2026-06-20'),

('the-stamford-arms-dunham', 'The Stamford Arms', 'pub', 'published', 'North West', 'Cheshire', 'Dunham Massey', 'WA14 4PE', 53.3850, -2.3910, 'A traditional country pub next to Dunham Massey deer park with a large beer garden and reliable dog-friendly welcome.', 'Perfectly positioned for post-walk refreshments after the Dunham Massey deer park circuit.', 'A warm, reliable welcome with excellent food. Garden is not fully enclosed.', NULL, 'yes', 'yes', 'no', 'unknown', 'yes', 'yes', 'no', 'yes', 'unknown', 'yes', 'moderate', 'moderate', 'yes', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'Weekday lunches', 'Traditional pub menu with excellent Sunday roasts', '££', 'warm_little_welcome', 76, ARRAY['Warm Little Welcome', 'Perfect after walkies'], ARRAY['dunham-massey-deer-park'], 'personal_visit', '2026-06-15'),

('delamere-forest-cafe', 'Delamere Forest Café', 'cafe', 'published', 'North West', 'Cheshire', 'Delamere', 'CW8 2JD', 53.2290, -2.6770, 'The Forestry England visitor centre café with spacious outdoor terrace and water bowls.', 'A convenient post-walk café right at the Delamere Forest car park. Dogs welcome on the large covered terrace.', 'Excellent outdoor option with water bowls and forest views.', NULL, 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'no', 'yes', 'yes', 'yes', 'low', 'relaxed', 'yes', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'Mid-morning after an early walk', 'Hot drinks, sandwiches, soup, cakes', '£', 'dog_friendly', 68, ARRAY['Rainy day rescue', 'Perfect after walkies'], ARRAY['delamere-forest-blakemere-trail'], 'personal_visit', '2026-07-01'),

('the-venetian-knutsford', 'The Venetian', 'restaurant', 'published', 'North West', 'Cheshire', 'Knutsford', 'WA16 6BU', 53.3030, -2.3750, 'An Italian restaurant on Knutsford King Street that welcomes small dogs in the bar area.', 'Dogs welcome in the bar area near the front with comfortable booth seating.', 'A good option for dog-friendly dining in Knutsford.', NULL, 'yes', 'unknown', 'no', 'unknown', 'yes', 'yes', 'unknown', 'unknown', 'yes', 'unknown', 'low', 'relaxed', 'yes', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'Early evening for a quieter experience', 'Italian cuisine, pasta, pizza, wine and cocktails', '££', 'warm_little_welcome', 72, ARRAY['Warm Little Welcome', 'Quiet corner available'], ARRAY['tatton-park-mere-circuit'], 'venue_confirmation', '2026-05-28'),

('coconut-kitchen-abersoch', 'The Coconut Kitchen', 'restaurant', 'published', 'North Wales', 'Gwynedd', 'Abersoch', 'LL53 7DS', 52.8265, -4.5020, 'A popular Thai restaurant in Abersoch with a sheltered courtyard where small dogs are welcome.', 'The courtyard is dog-friendly during daytime hours with heating and cover.', 'Dogs welcome in the covered courtyard. Book ahead in summer.', NULL, 'no', 'yes', 'no', 'yes', 'unknown', 'yes', 'yes', 'yes', 'unknown', 'yes', 'low', 'lively', 'yes', 'no', 'no', 'no', 'yes', 'unknown', 'yes', 'Lunchtime for quieter courtyard', 'Authentic Thai cuisine, cocktails and wines', '££', 'dog_friendly', 64, ARRAY['Rainy day rescue', 'Enclosed little garden'], ARRAY['abersoch-beach-walk'], 'trusted_submission', '2026-05-15'),

-- Liverpool venues
('bold-street-coffee-liverpool', 'Bold Street Coffee', 'cafe', 'published', 'North West', 'Merseyside', 'Liverpool', 'L1 4DS', 53.4040, -2.9760, 'A specialty coffee shop on Bold Street that welcomes dogs throughout. Exposed brick, great flat whites and a calm atmosphere.', 'Bold Street Coffee is a Liverpool favourite for specialty coffee and they genuinely welcome dogs. The space is compact but relaxed, with enough room for a small dog beside your feet. Staff often greet dogs before their owners.', 'Genuinely welcoming small café with excellent coffee. Compact but calm enough for tiny dogs.', 'https://www.boldstreetcoffee.co.uk', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'yes', 'yes', 'low', 'relaxed', 'yes', 'no', 'no', 'no', 'no', 'yes', 'yes', 'Weekday mornings', 'Specialty coffee, pastries, sandwiches', '££', 'warm_little_welcome', 74, ARRAY['Warm Little Welcome', 'Little paws welcome inside'], ARRAY[]::text[], 'personal_visit', '2026-06-10'),

('the-philharmonic-liverpool', 'The Philharmonic Dining Rooms', 'pub', 'published', 'North West', 'Merseyside', 'Liverpool', 'L1 7BQ', 53.4022, -2.9668, 'A stunning Grade I listed Victorian pub near the Philharmonic Hall. Dogs welcome in the main bar area with ornate tiled interiors.', 'One of the most beautiful pubs in England, and dogs are welcome in the bar. The opulent Victorian interior is a destination in itself. Space between tables is generous and the atmosphere is relaxed during the day.', 'A beautiful setting for a dog-friendly drink. Spacious tables and relaxed daytime atmosphere suit small dogs well.', NULL, 'yes', 'yes', 'no', 'no', 'yes', 'yes', 'no', 'unknown', 'yes', 'yes', 'low', 'moderate', 'yes', 'no', 'no', 'no', 'no', 'yes', 'yes', 'Weekday afternoons for a quiet pint', 'Cask ales, pub classics, bar snacks', '££', 'warm_little_welcome', 70, ARRAY['Warm Little Welcome', 'Quiet corner available', 'Warm welcome, small tables'], ARRAY[]::text[], 'venue_confirmation', '2026-05-20'),

-- Leeds venues
('opposite-cafe-leeds', 'Opposite Café', 'cafe', 'published', 'Yorkshire', 'West Yorkshire', 'Leeds', 'LS6 2QG', 53.8190, -1.5630, 'A cosy neighbourhood café in Hyde Park, Leeds with outdoor courtyard seating and a warm dog welcome.', 'Opposite is a much-loved neighbourhood spot where dogs are treated as regulars. The small courtyard is partially enclosed and works well for tiny dogs. Inside seating also welcomes dogs.', 'A genuine neighbourhood gem. Dogs are treated as part of the furniture in the best possible way.', NULL, 'yes', 'yes', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'yes', 'yes', 'low', 'relaxed', 'yes', 'yes', 'no', 'no', 'no', 'yes', 'yes', 'Weekend brunch (arrive early)', 'Brunch, specialty coffee, homemade cakes', '£', 'tiny_dog_favourite', 88, ARRAY['Tiny Dog Favourite', 'Little paws welcome inside', 'Treats behind the bar'], ARRAY[]::text[], 'personal_visit', '2026-07-05'),

-- Plymouth venues
('the-terrace-plymouth', 'The Terrace', 'cafe', 'published', 'South West', 'Devon', 'Plymouth', 'PL1 2NP', 50.3718, -4.1390, 'A waterfront café on the Hoe with panoramic sea views and a dog-friendly terrace overlooking Plymouth Sound.', 'The Terrace sits right on Plymouth Hoe with stunning views across the Sound. Dogs are welcome on the outdoor terrace which is spacious and has wind shelter. A great spot after a coastal walk along the Hoe.', 'Lovely coastal views with a sheltered terrace. Dogs welcome outdoors with water bowls available.', NULL, 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'no', 'yes', 'yes', 'yes', 'low', 'relaxed', 'yes', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'Mid-morning for quieter terrace', 'Coffee, cream teas, light lunches', '£', 'dog_friendly', 66, ARRAY['Rainy day rescue', 'Perfect after walkies'], ARRAY[]::text[], 'trusted_submission', '2026-06-01'),

('the-duke-plymouth', 'The Duke', 'pub', 'published', 'South West', 'Devon', 'Plymouth', 'PL1 2JD', 50.3695, -4.1355, 'A characterful pub in the Barbican area with dogs welcome throughout the ground floor.', 'A proper Plymouth pub in the historic Barbican that welcomes dogs everywhere on the ground floor. Cosy in winter with a fire, and there''s a small courtyard for warmer days. The locals are dog-friendly and it''s never too loud.', 'A proper dog-friendly pub where small dogs are genuinely at ease. Cosy, calm and characterful.', NULL, 'yes', 'yes', 'yes', 'no', 'yes', 'yes', 'no', 'yes', 'yes', 'yes', 'low', 'relaxed', 'yes', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'Weekday evenings', 'Cask ales, pub grub, bar snacks', '£', 'warm_little_welcome', 78, ARRAY['Warm Little Welcome', 'Little paws welcome inside', 'Quiet corner available'], ARRAY[]::text[], 'personal_visit', '2026-06-18');

-- =============================================
-- SEED DATA: Walks
-- =============================================

INSERT INTO walks (slug, status, title, strapline, summary, region, county, nearest_town, latitude, longitude, distance_miles, duration_minutes, difficulty, route_type, environments, surfaces, gradient, stile_count, livestock, road_exposure, escape_risk, off_lead, puppy_friendly, buggy_friendly, quietness, weather_exposure, winter_suitable, parking_available, parking_notes, toilets_available, toilets_notes, cafe_name, cafe_dog_friendly, why_tiny_dogs_love_it, rating_total, rating_band, rating_positives, rating_caution, last_verified, featured) VALUES
('dunham-massey-deer-park', 'published', 'Dunham Massey Deer Park', 'Flat parkland paths with grazing deer and ancient trees', 'A gentle stroll through the National Trust deer park on well-maintained paths.', 'North West', 'Cheshire', 'Altrincham', 53.3837, -2.3934, 1.8, 40, 'easy', 'circular', ARRAY['park','woodland'], ARRAY['gravel','grass'], 'mostly-flat', 0, 'none-known', 'none', 'low', 'limited', true, 'yes', 'variable', 'mixed', true, true, 'NT car park, pay and display', true, 'At the stables courtyard', 'Stamford Arms', true, ARRAY['Completely flat paths perfect for short legs','Sheltered by ancient trees','Lots of sniffing opportunities'], 88, 'Perfect for tiny paws', ARRAY['Completely flat','Excellent path surfaces'], 'Dogs must be on lead due to deer', '2026-06-15', true),

('lyme-park-cage-loop', 'published', 'Lyme Park — Cage Loop', 'A short hilltop circuit with panoramic Peak District views', 'A compact loop around the iconic Cage tower at Lyme Park.', 'North West', 'Cheshire', 'Disley', 53.3475, -2.0491, 1.5, 35, 'easy', 'circular', ARRAY['park','moorland'], ARRAY['gravel','grass'], 'gentle', 0, 'possible', 'none', 'low', 'limited', true, 'dry-weather-only', 'variable', 'exposed', false, true, 'NT car park at main entrance', true, 'Near the house', 'Lyme Park Coffee Shop', true, ARRAY['Short enough for little legs','Gentle slopes with rest points'], 76, 'Easy little adventure', ARRAY['Short and manageable','Great facilities'], 'Exposed to wind — wrap up in cooler months', '2026-05-20', false),

('delamere-forest-blakemere-trail', 'published', 'Delamere Forest — Blakemere Trail', 'Woodland wandering around a hidden mere', 'A sheltered forest walk around Blakemere Moss on well-surfaced paths.', 'North West', 'Cheshire', 'Northwich', 53.2287, -2.6775, 1.2, 30, 'easy', 'circular', ARRAY['woodland','lakeside'], ARRAY['gravel','boardwalk'], 'mostly-flat', 0, 'none-known', 'none', 'low', 'some-sections', true, 'yes', 'usually-quiet', 'sheltered', true, true, 'Forestry England car park', true, 'At the visitor centre', 'Delamere Forest Café', true, ARRAY['Dense woodland feels safe','Quiet and sheltered from wind','Excellent surfaces'], 92, 'Perfect for tiny paws', ARRAY['Perfectly sheltered','Ideal short distance'], 'Boardwalk can be slippery when wet', '2026-07-01', true),

('fletcher-moss-park-didsbury', 'published', 'Fletcher Moss Park', 'A secret urban garden walk beside the River Mersey', 'A compact walk through botanical gardens and riverside paths in south Manchester.', 'North West', 'Greater Manchester', 'Didsbury', 53.4079, -2.2257, 1.0, 25, 'easy', 'circular', ARRAY['park','urban'], ARRAY['paved','gravel'], 'mostly-flat', 0, 'none-known', 'low', 'moderate', 'limited', true, 'yes', 'variable', 'mixed', true, true, 'Small free car park on Millgate Lane', false, NULL, 'The Art of Tea', true, ARRAY['Super short — ideal for puppies','Beautiful garden scents','Close to dog-friendly cafés'], 82, 'Easy little adventure', ARRAY['Ultra-short distance','Great cafés nearby'], 'Some paths near unfenced river', '2026-06-28', false),

('abersoch-beach-walk', 'published', 'Abersoch Beach', 'Sandy paws and sea breezes on the Llŷn Peninsula', 'A glorious sandy beach walk on the Llŷn Peninsula.', 'North Wales', 'Gwynedd', 'Abersoch', 52.8242, -4.5045, 1.5, 40, 'easy', 'out-and-back', ARRAY['beach','coast'], ARRAY['sand'], 'mostly-flat', 0, 'none-known', 'none', 'low', 'generally-suitable', true, 'no', 'usually-quiet', 'exposed', false, true, 'Pay and display near the beach', true, 'Seasonal, near car park', NULL, false, ARRAY['Freedom to run off-lead on firm sand','Gentle waves and rock pools','Quiet beach outside peak season'], 78, 'Easy little adventure', ARRAY['Off-lead freedom','Beautiful natural setting'], 'Exposed to wind — cold for tiny dogs in winter', '2026-05-10', true),

('tatton-park-mere-circuit', 'published', 'Tatton Park — Mere Circuit', 'Gentle lakeside stroll through historic parkland', 'A peaceful circuit around Tatton Mere through manicured parkland.', 'North West', 'Cheshire', 'Knutsford', 53.3296, -2.3783, 2.0, 50, 'easy', 'circular', ARRAY['park','lakeside'], ARRAY['gravel','grass'], 'mostly-flat', 0, 'possible', 'none', 'low', 'limited', true, 'yes', 'variable', 'mixed', true, true, 'Tatton Park car park, entry fee', true, 'Near the stables', 'The Stables Restaurant', true, ARRAY['Wide flat paths','Regular benches for rest breaks','Wildlife watching around the mere'], 86, 'Perfect for tiny paws', ARRAY['Excellent facilities','Flat and accessible'], 'Deer roam freely — dogs must stay on lead', '2026-06-20', false),

-- Liverpool walk
('sefton-park-loop', 'published', 'Sefton Park — Palm House Loop', 'A gentle circuit around Liverpool''s finest park', 'A flat, easy circuit around the boating lake and past the stunning Palm House in south Liverpool.', 'North West', 'Merseyside', 'Liverpool', 53.3830, -2.9430, 1.6, 35, 'easy', 'circular', ARRAY['park','urban'], ARRAY['paved','gravel'], 'mostly-flat', 0, 'none-known', 'none', 'low', 'some-sections', true, 'yes', 'variable', 'mixed', true, true, 'Free parking around the park', true, 'At the Palm House', 'Sefton Park Café', true, ARRAY['Completely flat paths','Enclosed park with no traffic','Lovely café stops at Palm House'], 90, 'Perfect for tiny paws', ARRAY['Flat and traffic-free','Great facilities'], 'Can be busy with runners at weekends', '2026-06-25', true),

-- Plymouth walk
('plymouth-hoe-promenade', 'published', 'Plymouth Hoe Promenade', 'Seafront stroll with views across Plymouth Sound', 'An easy promenade walk along Plymouth Hoe with stunning coastal views and sheltered spots.', 'South West', 'Devon', 'Plymouth', 50.3660, -4.1430, 1.3, 30, 'easy', 'out-and-back', ARRAY['coast','urban'], ARRAY['paved'], 'mostly-flat', 0, 'none-known', 'low', 'low', 'limited', true, 'yes', 'variable', 'exposed', true, true, 'Pay and display on the Hoe', true, 'At the Lido', 'The Terrace', true, ARRAY['Flat promenade perfect for tiny legs','Stunning sea views','Multiple shelter spots if it gets breezy'], 84, 'Easy little adventure', ARRAY['Completely flat','Scenic coastal views'], 'Exposed to sea wind — bring a coat for your dog', '2026-06-01', true);
