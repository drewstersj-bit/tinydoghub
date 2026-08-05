-- =============================================
-- TinyDogHub: Health Guides + Vet Database
-- Run in Supabase SQL Editor
-- =============================================

-- HEALTH ARTICLES TABLE
CREATE TABLE IF NOT EXISTS health_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  severity TEXT DEFAULT 'informational',
  when_to_see_vet TEXT,
  tiny_dog_specific TEXT,
  symptoms TEXT[] DEFAULT '{}',
  prevention_tips TEXT[] DEFAULT '{}',
  related_breeds TEXT[] DEFAULT '{}',
  related_article_slugs TEXT[] DEFAULT '{}',
  sources TEXT[] DEFAULT '{}',
  last_reviewed TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- VETS TABLE
CREATE TABLE IF NOT EXISTS vets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  name TEXT NOT NULL,
  practice_type TEXT NOT NULL DEFAULT 'general',
  is_emergency BOOLEAN DEFAULT false,
  is_24_hour BOOLEAN DEFAULT false,
  accepts_small_dogs BOOLEAN DEFAULT true,
  small_dog_expertise TEXT,
  region TEXT NOT NULL,
  county TEXT NOT NULL,
  town TEXT NOT NULL,
  postcode TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  telephone TEXT,
  emergency_telephone TEXT,
  website_url TEXT,
  booking_url TEXT,
  opening_hours TEXT,
  emergency_hours TEXT,
  services TEXT[] DEFAULT '{}',
  summary TEXT,
  editorial_notes TEXT,
  parking_available BOOLEAN DEFAULT true,
  accessible BOOLEAN DEFAULT true,
  average_rating DOUBLE PRECISION,
  last_verified_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE health_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published health articles" ON health_articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read published vets" ON vets
  FOR SELECT USING (status = 'published');

-- =============================================
-- SEED: Health Articles
-- =============================================

INSERT INTO health_articles (slug, status, title, category, summary, content, severity, when_to_see_vet, tiny_dog_specific, symptoms, prevention_tips, related_breeds, sources, last_reviewed) VALUES
('hypoglycaemia-in-small-dogs', 'published', 'Hypoglycaemia in Small Dogs', 'emergency', 'Low blood sugar is a serious and common emergency in tiny dogs, especially puppies under 6 months. Learn the signs and what to do.', 'Hypoglycaemia occurs when blood sugar drops dangerously low. In tiny dogs, this can happen rapidly because they have very small glycogen reserves relative to their metabolic rate. Puppies under 6 months, dogs under 2kg, and dogs who miss meals are most at risk.

The condition can become life-threatening within minutes if not treated. Every tiny dog owner should know the warning signs and keep honey or glucose gel accessible at all times.

## What causes it?

- Missed meals or inadequate food portions
- Excessive exercise without food
- Stress or excitement burning energy faster than normal
- Cold temperatures increasing metabolic demand
- Illness reducing appetite
- Toy-breed puppies simply running out of stored glucose

## First aid steps

1. If your dog is conscious: rub honey, golden syrup or glucose gel onto their gums immediately
2. Keep them warm — wrap in a blanket
3. Offer small amounts of food once they respond
4. Contact your vet even if they seem to recover
5. If unconscious: apply honey to gums and get to an emergency vet immediately', 'emergency', 'Seek emergency veterinary care immediately if your dog loses consciousness, has a seizure, or does not respond to sugar within 5 minutes.', 'Tiny dogs are disproportionately affected because of their low body mass and fast metabolism. A Chihuahua puppy can become hypoglycaemic after just 4-6 hours without food.', ARRAY['Wobbling or staggering','Lethargy or unresponsiveness','Trembling or shivering','Glazed eyes','Seizures','Loss of consciousness'], ARRAY['Feed small frequent meals (3-4 times daily for puppies)','Never skip meals','Keep honey or glucose gel at home','Monitor energy levels after exercise','Ensure adequate food before car journeys or stressful events'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','maltese','toy-poodle'], ARRAY['PDSA: Hypoglycaemia in dogs','RSPCA: Small dog health guide'], '2026-07-01'),

('patellar-luxation-toy-breeds', 'published', 'Patellar Luxation in Toy Breeds', 'orthopaedic', 'A common knee condition in small dogs where the kneecap slips out of position. Understanding grades, symptoms and treatment options.', 'Patellar luxation is one of the most common orthopaedic conditions in toy breeds. The kneecap (patella) slides out of its normal groove, causing intermittent lameness. It affects up to 7% of all puppies, with toy breeds significantly over-represented.

## Grades of severity

- **Grade 1:** Kneecap can be manually moved out of place but returns on its own. Dog rarely shows lameness.
- **Grade 2:** Kneecap occasionally slips during movement and may not return immediately. You may notice your dog skipping or holding up a leg briefly.
- **Grade 3:** Kneecap is out of place most of the time but can be manually repositioned. Dog shows frequent lameness.
- **Grade 4:** Kneecap is permanently displaced and cannot be repositioned. Significant lameness and potential arthritis.

## Treatment

- Grade 1-2: Often managed with weight control, joint supplements and physiotherapy
- Grade 3-4: Surgery usually recommended
- All grades: Regular vet monitoring advised

## What to watch for

The classic sign is a sudden "skipping" gait — your dog will run normally, then suddenly lift a back leg for a few strides before returning to normal. This is the kneecap popping out and then returning.', 'chronic', 'See your vet if you notice repeated skipping, persistent lameness, or if your dog seems reluctant to jump or use stairs.', 'Toy breeds are 12 times more likely to develop patellar luxation than larger breeds. The shallow femoral groove common in tiny dogs makes the condition almost unavoidable in some bloodlines.', ARRAY['Intermittent skipping on a back leg','Suddenly holding up a leg then walking normally','Reluctance to jump','Stiffness after rest','Clicking sound from the knee'], ARRAY['Maintain healthy weight — excess weight worsens the condition','Avoid excessive jumping from heights','Regular gentle exercise to maintain muscle','Joint supplements may help (consult your vet)','Choose breeders who screen for the condition'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','toy-poodle','miniature-dachshund'], ARRAY['British Veterinary Association','Kennel Club breed health surveys'], '2026-06-28'),

('tracheal-collapse-small-dogs', 'published', 'Tracheal Collapse in Small Dogs', 'respiratory', 'Why tiny dogs should always wear a harness, not a collar. Understanding tracheal collapse and how to protect your dog.', 'Tracheal collapse occurs when the cartilage rings supporting the windpipe weaken and flatten, narrowing the airway. It is significantly more common in toy breeds and is one of the key reasons we always recommend harnesses over collars for tiny dogs.

## Why it matters for tiny dog owners

A collar puts direct pressure on the trachea every time your dog pulls or you apply leash tension. In breeds predisposed to tracheal collapse, this repeated pressure can accelerate the weakening of cartilage rings.

Using a properly fitted harness distributes force across the chest instead, completely removing pressure from the vulnerable throat area.

## Stages

- **Stage 1:** Occasional honking cough, especially when excited. Trachea retains most of its shape.
- **Stage 2:** More frequent coughing episodes. Trachea narrowed by up to 50%.
- **Stage 3:** Coughing with minimal exertion. Significant narrowing.
- **Stage 4:** Severe breathing difficulty. Medical or surgical intervention needed.

## Management

- Switch to a harness immediately (step-in or Y-shaped designs are best)
- Maintain healthy weight — excess weight compresses the airway
- Avoid hot, humid conditions that stress breathing
- Use a humidifier in dry environments
- Medications can help manage coughing
- Surgery for severe cases', 'chronic', 'See your vet if coughing becomes frequent, breathing sounds laboured, or your dog''s gums appear bluish during episodes.', 'The condition is 4-5 times more common in toy breeds. Chihuahuas, Yorkies and Pomeranians are particularly predisposed. Always use a harness rather than a collar.', ARRAY['Honking or goose-like cough','Coughing when picked up','Gagging after drinking water','Exercise intolerance','Blue-tinged gums during episodes','Noisy breathing'], ARRAY['Always use a harness, never a collar','Maintain ideal body weight','Avoid exposing to cigarette smoke','Keep cool in hot weather','Use a humidifier at home','Avoid excitement-triggered coughing'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','shih-tzu','toy-poodle'], ARRAY['British Small Animal Veterinary Association','Veterinary Record journal'], '2026-07-02'),

('dental-disease-small-breeds', 'published', 'Dental Disease in Small Breeds', 'dental', 'Why tiny dogs are prone to dental problems and what you can do about it. A guide to prevention and signs to watch for.', 'Dental disease is the most common health condition in toy breeds. By age 3, an estimated 80% of small dogs show signs of periodontal disease — significantly higher than in larger breeds. The reason is simple: tiny jaws with the same number of teeth leads to overcrowding.

## Why tiny dogs are more affected

- Same number of teeth (42) packed into a much smaller jaw
- Overcrowding traps food and bacteria between teeth
- Retained baby teeth are more common (especially in Chihuahuas)
- Less natural chewing of bones and tough items
- Some owners avoid brushing because the mouth is so small

## Signs of dental problems

Watch for bad breath (beyond normal dog breath), reluctance to eat hard food, pawing at the mouth, drooling, bleeding gums, loose or discoloured teeth, or swelling around the jaw.

## Prevention

- Daily tooth brushing with dog-specific toothpaste (use a finger brush for tiny mouths)
- Annual dental check-ups (some vets recommend 6-monthly for toy breeds)
- Dental chews appropriate for small dogs
- Water additives designed for dental health
- Professional dental cleaning under anaesthetic when recommended
- Check for retained baby teeth at 6-8 months', 'chronic', 'See your vet if you notice persistent bad breath, bleeding gums, loose teeth, facial swelling, or if your dog stops eating.', 'Toy breeds develop dental disease earlier and more severely due to overcrowded teeth in tiny jaws. Regular brushing from puppyhood is the single most effective prevention.', ARRAY['Persistent bad breath','Red or bleeding gums','Reluctance to eat hard food','Pawing at the mouth','Loose or missing teeth','Facial swelling','Excessive drooling'], ARRAY['Brush teeth daily with dog toothpaste','Annual professional dental check','Use appropriate dental chews','Check for retained baby teeth at 6-8 months','Water additives can help','Start oral hygiene habits early'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','maltese','shih-tzu','cavalier-king-charles'], ARRAY['British Veterinary Dental Association','PDSA PAW Report 2026'], '2026-06-25'),

('keeping-tiny-dogs-warm', 'published', 'Keeping Tiny Dogs Warm', 'seasonal', 'Small dogs lose body heat rapidly. A practical guide to cold weather care for toy breeds and puppies.', 'Tiny dogs feel the cold much more than larger breeds. Their small body mass means they lose heat faster and have less insulation. Understanding when and how to keep your small dog warm is essential for their comfort and safety.

## Why tiny dogs get cold faster

- High surface-area-to-body-mass ratio means rapid heat loss
- Less body fat for insulation
- Closer to cold ground
- Short or thin coats provide minimal protection
- Smaller blood volume cools more quickly

## When to use a coat or jumper

- Below 10°C for most toy breeds
- Below 12-15°C for very small, elderly, or thin-coated dogs
- Any temperature in wind, rain or snow
- When standing still outside (e.g. café terraces, spectating)

## Signs your dog is too cold

- Shivering
- Reluctance to walk
- Hunched posture
- Holding up paws
- Seeking warm spots or trying to burrow
- Whimpering

## Practical tips

- Layer up: fleece base layer plus waterproof outer in wet weather
- Protect paws: booties or paw wax in ice and salt
- Keep walks shorter in extreme cold
- Warm the car before travel
- Provide heated beds or blankets indoors
- Check clothing fits properly — too tight restricts movement', 'informational', 'See your vet if your dog shows signs of hypothermia: extreme lethargy, very cold ears or paws, slow breathing, or unresponsiveness.', 'Chihuahuas and other toy breeds can develop hypothermia in conditions that barely affect medium-sized dogs. A fleece or coat is essential kit, not a fashion accessory.', ARRAY['Shivering','Reluctance to go outside','Hunched posture','Lifting paws','Seeking warm spots','Lethargy in cold weather'], ARRAY['Invest in good-quality coats and fleeces','Use paw protection in ice and salt','Keep winter walks shorter','Warm the car before journeys','Provide heated or insulated bedding','Check ears and paw pads after cold walks'], ARRAY['chihuahua','italian-greyhound','miniature-dachshund','russian-toy'], ARRAY['RSPCA winter pet care guide','Kennel Club cold weather advice'], '2026-07-01');

-- =============================================
-- SEED: Vet Database
-- =============================================

INSERT INTO vets (slug, status, name, practice_type, is_emergency, is_24_hour, accepts_small_dogs, small_dog_expertise, region, county, town, postcode, latitude, longitude, telephone, emergency_telephone, website_url, opening_hours, emergency_hours, services, summary, parking_available, accessible, last_verified_date) VALUES
('vets-now-manchester', 'published', 'Vets Now Manchester', 'emergency', true, true, true, 'Full emergency facilities for all sizes', 'North West', 'Greater Manchester', 'Manchester', 'M12 6JH', 53.4650, -2.2130, '0161 974 0808', '0161 974 0808', 'https://www.vetsnow.com/manchester', NULL, '24 hours, 365 days', ARRAY['emergency','critical-care','surgery','diagnostics','hospitalisation'], 'A dedicated out-of-hours emergency vet clinic for Manchester and surrounding areas. Open when your regular vet is closed.', true, true, '2026-07-01'),

('vets-now-liverpool', 'published', 'Vets Now Liverpool', 'emergency', true, true, true, 'Full emergency facilities for all sizes', 'North West', 'Merseyside', 'Liverpool', 'L7 9PG', 53.4020, -2.9520, '0151 709 0709', '0151 709 0709', 'https://www.vetsnow.com/liverpool', NULL, '24 hours, 365 days', ARRAY['emergency','critical-care','surgery','diagnostics'], 'Emergency and critical care for Liverpool and Merseyside. Dedicated overnight team.', true, true, '2026-07-01'),

('vets-now-london-south', 'published', 'Vets Now London South', 'emergency', true, true, true, 'Full emergency facilities including exotic pets', 'London', 'Greater London', 'London', 'SW8 4EU', 51.4770, -0.1290, '020 7627 3030', '020 7627 3030', 'https://www.vetsnow.com/london-south', NULL, '24 hours, 365 days', ARRAY['emergency','critical-care','surgery','diagnostics','hospitalisation'], 'South London emergency vet open 24/7 for all out-of-hours emergencies.', false, true, '2026-07-01'),

('vets-now-edinburgh', 'published', 'Vets Now Edinburgh', 'emergency', true, true, true, 'Full emergency facilities for all sizes', 'Scotland', 'City of Edinburgh', 'Edinburgh', 'EH14 1PH', 55.9230, -3.2640, '0131 443 4468', '0131 443 4468', 'https://www.vetsnow.com/edinburgh', NULL, '24 hours, 365 days', ARRAY['emergency','critical-care','surgery','diagnostics'], 'Edinburgh emergency vet providing out-of-hours and critical care services.', true, true, '2026-07-01'),

('vets-now-birmingham', 'published', 'Vets Now Birmingham', 'emergency', true, true, true, 'Full emergency facilities for all sizes', 'West Midlands', 'West Midlands', 'Birmingham', 'B47 6JX', 52.3920, -1.8430, '01onal 240 8888', '01564 740 8888', 'https://www.vetsnow.com/birmingham', NULL, '24 hours, 365 days', ARRAY['emergency','critical-care','surgery','diagnostics'], 'Emergency vet serving Birmingham and Solihull, open when your regular vet is closed.', true, true, '2026-06-28'),

('vets-now-bristol', 'published', 'Vets Now Bristol', 'emergency', true, true, true, 'Full emergency facilities for all sizes', 'South West', 'Bristol', 'Bristol', 'BS2 0QQ', 51.4590, -2.5810, '0117 971 1882', '0117 971 1882', 'https://www.vetsnow.com/bristol', NULL, '24 hours, 365 days', ARRAY['emergency','critical-care','surgery','diagnostics'], 'Bristol emergency vet providing overnight and weekend emergency cover.', true, true, '2026-07-01'),

('goddard-vet-group-london', 'published', 'Goddard Veterinary Group — Wandsworth', 'general', false, false, true, 'Experienced with toy breeds and brachycephalic dogs', 'London', 'Greater London', 'London', 'SW18 1EG', 51.4560, -0.1870, '020 8874 7297', NULL, 'https://www.goddardvetgroup.co.uk', 'Mon-Fri 8:30-19:00, Sat 9:00-12:00', NULL, ARRAY['general-practice','vaccinations','dental','microchipping','surgery','diagnostics'], 'A well-established south London practice with good experience of toy breeds.', true, true, '2026-06-20'),

('willows-veterinary-centre-cheshire', 'published', 'Willows Veterinary Centre', 'general', false, false, true, 'Popular with local Chihuahua and toy breed owners', 'North West', 'Cheshire', 'Knutsford', 'WA16 8RG', 53.3020, -2.3800, '01onal 632 364', NULL, 'https://www.willowsvetgroup.co.uk', 'Mon-Fri 8:30-18:30, Sat 9:00-12:00', NULL, ARRAY['general-practice','vaccinations','dental','microchipping','surgery','diagnostics','puppy-health-checks'], 'A friendly Cheshire practice near Tatton Park popular with small dog owners.', true, true, '2026-06-15'),

('small-animal-specialist-hospital-manchester', 'published', 'Small Animal Teaching Hospital — University of Liverpool', 'specialist', true, true, true, 'University referral hospital with specialist small animal team', 'North West', 'Merseyside', 'Neston', 'CH64 7TE', 53.2930, -3.0620, '0151 795 6100', '0151 795 6100', 'https://www.liverpool.ac.uk/small-animal-hospital', NULL, '24 hours for referral emergencies', ARRAY['specialist-referral','emergency','critical-care','orthopaedics','cardiology','oncology','neurology','dental-specialist','diagnostics'], 'University referral hospital with specialist expertise across all disciplines. Available for complex cases referred by your vet.', true, true, '2026-07-01'),

('pdsa-pet-hospital-manchester', 'published', 'PDSA PetAid Hospital Manchester', 'charity', false, false, true, 'Charitable veterinary care for eligible owners', 'North West', 'Greater Manchester', 'Manchester', 'M15 5FS', 53.4620, -2.2530, '0161 226 0061', NULL, 'https://www.pdsa.org.uk/manchester', 'Mon-Fri 8:30-17:00', NULL, ARRAY['general-practice','vaccinations','neutering','dental','microchipping'], 'PDSA provides free and low-cost veterinary care for eligible pet owners. Check eligibility on their website.', true, true, '2026-06-25');
