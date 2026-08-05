-- =============================================
-- Size Database: Breed measurements by life stage
-- Run in Supabase SQL Editor
-- =============================================

CREATE TABLE IF NOT EXISTS breed_sizes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  breed_slug TEXT NOT NULL,
  breed_name TEXT NOT NULL,
  life_stage TEXT NOT NULL,
  age_months_min INTEGER NOT NULL,
  age_months_max INTEGER NOT NULL,
  weight_kg_min DOUBLE PRECISION NOT NULL,
  weight_kg_max DOUBLE PRECISION NOT NULL,
  height_cm_min DOUBLE PRECISION,
  height_cm_max DOUBLE PRECISION,
  chest_cm_min DOUBLE PRECISION,
  chest_cm_max DOUBLE PRECISION,
  neck_cm_min DOUBLE PRECISION,
  neck_cm_max DOUBLE PRECISION,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE breed_sizes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read breed sizes" ON breed_sizes FOR SELECT USING (true);

-- =============================================
-- CHIHUAHUA
-- =============================================
INSERT INTO breed_sizes (breed_slug, breed_name, life_stage, age_months_min, age_months_max, weight_kg_min, weight_kg_max, height_cm_min, height_cm_max, chest_cm_min, chest_cm_max, neck_cm_min, neck_cm_max, notes) VALUES
('chihuahua', 'Chihuahua', 'Puppy (8–12 weeks)', 2, 3, 0.3, 0.7, 8, 12, 14, 18, 10, 13, 'Very fragile at this stage. Feed 4x daily to prevent hypoglycaemia.'),
('chihuahua', 'Chihuahua', 'Puppy (3–6 months)', 3, 6, 0.5, 1.2, 10, 15, 18, 24, 12, 16, 'Rapid growth period. Weigh weekly.'),
('chihuahua', 'Chihuahua', 'Junior (6–12 months)', 6, 12, 1.0, 2.2, 13, 20, 22, 30, 15, 20, 'Growth slowing. Begin measuring for harnesses.'),
('chihuahua', 'Chihuahua', 'Adult (1–7 years)', 12, 84, 1.5, 3.0, 15, 23, 28, 38, 18, 25, 'Full adult size reached. Standard harness fitting measurements.'),
('chihuahua', 'Chihuahua', 'Senior (7+ years)', 84, 240, 1.5, 3.2, 15, 23, 28, 40, 18, 26, 'May gain weight if less active. Monitor body condition regularly.');

-- =============================================
-- YORKSHIRE TERRIER
-- =============================================
INSERT INTO breed_sizes (breed_slug, breed_name, life_stage, age_months_min, age_months_max, weight_kg_min, weight_kg_max, height_cm_min, height_cm_max, chest_cm_min, chest_cm_max, neck_cm_min, neck_cm_max, notes) VALUES
('yorkshire-terrier', 'Yorkshire Terrier', 'Puppy (8–12 weeks)', 2, 3, 0.4, 0.8, 8, 12, 16, 20, 11, 14, 'Delicate puppies. Keep warm and feed frequently.'),
('yorkshire-terrier', 'Yorkshire Terrier', 'Puppy (3–6 months)', 3, 6, 0.7, 1.5, 10, 16, 20, 26, 13, 18, 'Coat growing rapidly. Start gentle grooming routine.'),
('yorkshire-terrier', 'Yorkshire Terrier', 'Junior (6–12 months)', 6, 12, 1.2, 2.5, 14, 20, 24, 32, 16, 22, 'Approaching adult size. Coat may change texture.'),
('yorkshire-terrier', 'Yorkshire Terrier', 'Adult (1–7 years)', 12, 84, 2.0, 3.2, 17, 23, 30, 38, 20, 26, 'Full size. Breed standard is under 3.2kg.'),
('yorkshire-terrier', 'Yorkshire Terrier', 'Senior (7+ years)', 84, 240, 2.0, 3.5, 17, 23, 30, 40, 20, 27, 'Dental issues common. Regular weight monitoring.');

-- =============================================
-- POMERANIAN
-- =============================================
INSERT INTO breed_sizes (breed_slug, breed_name, life_stage, age_months_min, age_months_max, weight_kg_min, weight_kg_max, height_cm_min, height_cm_max, chest_cm_min, chest_cm_max, neck_cm_min, neck_cm_max, notes) VALUES
('pomeranian', 'Pomeranian', 'Puppy (8–12 weeks)', 2, 3, 0.4, 0.9, 8, 12, 16, 20, 11, 14, 'Fluffy coat makes them look larger than they are.'),
('pomeranian', 'Pomeranian', 'Puppy (3–6 months)', 3, 6, 0.7, 1.6, 10, 15, 20, 26, 13, 18, 'Puppy uglies phase — coat may thin temporarily.'),
('pomeranian', 'Pomeranian', 'Junior (6–12 months)', 6, 12, 1.2, 2.8, 14, 20, 26, 34, 16, 22, 'Adult coat growing in. May appear larger due to volume.'),
('pomeranian', 'Pomeranian', 'Adult (1–7 years)', 12, 84, 1.8, 3.5, 18, 24, 32, 40, 20, 26, 'Measure under the coat for accurate harness sizing.'),
('pomeranian', 'Pomeranian', 'Senior (7+ years)', 84, 240, 1.8, 4.0, 18, 24, 32, 42, 20, 28, 'Weight gain common. Coat may thin with age.');

-- =============================================
-- MALTESE
-- =============================================
INSERT INTO breed_sizes (breed_slug, breed_name, life_stage, age_months_min, age_months_max, weight_kg_min, weight_kg_max, height_cm_min, height_cm_max, chest_cm_min, chest_cm_max, neck_cm_min, neck_cm_max, notes) VALUES
('maltese', 'Maltese', 'Puppy (8–12 weeks)', 2, 3, 0.4, 0.8, 8, 12, 15, 19, 10, 13, 'Very small and delicate. Protect from cold.'),
('maltese', 'Maltese', 'Puppy (3–6 months)', 3, 6, 0.7, 1.5, 10, 16, 19, 25, 12, 17, 'Coat growing — establish daily grooming.'),
('maltese', 'Maltese', 'Junior (6–12 months)', 6, 12, 1.2, 2.5, 15, 21, 24, 32, 16, 22, 'Near adult size. Coat requires regular maintenance.'),
('maltese', 'Maltese', 'Adult (1–7 years)', 12, 84, 1.8, 3.6, 20, 25, 30, 38, 20, 26, 'Full size. Long coat needs daily care.'),
('maltese', 'Maltese', 'Senior (7+ years)', 84, 240, 1.8, 4.0, 20, 25, 30, 40, 20, 27, 'May be less active. Dental care important.');

-- =============================================
-- TOY POODLE
-- =============================================
INSERT INTO breed_sizes (breed_slug, breed_name, life_stage, age_months_min, age_months_max, weight_kg_min, weight_kg_max, height_cm_min, height_cm_max, chest_cm_min, chest_cm_max, neck_cm_min, neck_cm_max, notes) VALUES
('toy-poodle', 'Toy Poodle', 'Puppy (8–12 weeks)', 2, 3, 0.5, 1.0, 10, 14, 16, 22, 12, 15, 'Curly coat beginning to develop.'),
('toy-poodle', 'Toy Poodle', 'Puppy (3–6 months)', 3, 6, 1.0, 2.0, 14, 20, 22, 28, 14, 19, 'Regular grooming essential as coat thickens.'),
('toy-poodle', 'Toy Poodle', 'Junior (6–12 months)', 6, 12, 1.5, 3.0, 18, 24, 28, 36, 18, 24, 'Adult coat established. Professional grooming recommended.'),
('toy-poodle', 'Toy Poodle', 'Adult (1–7 years)', 12, 84, 2.0, 4.0, 24, 28, 34, 42, 22, 28, 'Full size. Must be under 28cm to be classed Toy.'),
('toy-poodle', 'Toy Poodle', 'Senior (7+ years)', 84, 240, 2.0, 4.5, 24, 28, 34, 44, 22, 30, 'May gain weight. Joint supplements often beneficial.');

-- =============================================
-- PUG
-- =============================================
INSERT INTO breed_sizes (breed_slug, breed_name, life_stage, age_months_min, age_months_max, weight_kg_min, weight_kg_max, height_cm_min, height_cm_max, chest_cm_min, chest_cm_max, neck_cm_min, neck_cm_max, notes) VALUES
('pug', 'Pug', 'Puppy (8–12 weeks)', 2, 3, 0.9, 1.8, 10, 14, 20, 26, 14, 18, 'Stocky build from early age. Monitor breathing.'),
('pug', 'Pug', 'Puppy (3–6 months)', 3, 6, 1.8, 3.5, 14, 20, 28, 36, 18, 24, 'Rapid weight gain normal. Avoid overfeeding.'),
('pug', 'Pug', 'Junior (6–12 months)', 6, 12, 3.0, 6.0, 20, 28, 36, 44, 22, 30, 'Filling out. Watch for excess weight.'),
('pug', 'Pug', 'Adult (1–7 years)', 12, 84, 6.0, 8.0, 25, 33, 42, 52, 28, 36, 'Prone to obesity. Strict portion control essential.'),
('pug', 'Pug', 'Senior (7+ years)', 84, 240, 6.0, 9.0, 25, 33, 42, 56, 28, 38, 'Weight management critical for breathing and joints.');

-- =============================================
-- CAVALIER KING CHARLES SPANIEL
-- =============================================
INSERT INTO breed_sizes (breed_slug, breed_name, life_stage, age_months_min, age_months_max, weight_kg_min, weight_kg_max, height_cm_min, height_cm_max, chest_cm_min, chest_cm_max, neck_cm_min, neck_cm_max, notes) VALUES
('cavalier-king-charles', 'Cavalier King Charles', 'Puppy (8–12 weeks)', 2, 3, 1.0, 2.0, 12, 16, 22, 28, 14, 18, 'Sweet-natured from birth. Grows steadily.'),
('cavalier-king-charles', 'Cavalier King Charles', 'Puppy (3–6 months)', 3, 6, 2.0, 4.0, 16, 24, 28, 36, 18, 24, 'Active growth. Ears growing proportionally large.'),
('cavalier-king-charles', 'Cavalier King Charles', 'Junior (6–12 months)', 6, 12, 3.5, 6.0, 24, 30, 36, 46, 22, 30, 'Approaching full size. Heart monitoring begins.'),
('cavalier-king-charles', 'Cavalier King Charles', 'Adult (1–7 years)', 12, 84, 5.4, 8.0, 30, 33, 44, 54, 28, 36, 'Full size. Annual heart checks recommended.'),
('cavalier-king-charles', 'Cavalier King Charles', 'Senior (7+ years)', 84, 240, 5.4, 9.0, 30, 33, 44, 56, 28, 38, 'Heart disease common. Regular vet monitoring essential.');

-- =============================================
-- MINIATURE DACHSHUND
-- =============================================
INSERT INTO breed_sizes (breed_slug, breed_name, life_stage, age_months_min, age_months_max, weight_kg_min, weight_kg_max, height_cm_min, height_cm_max, chest_cm_min, chest_cm_max, neck_cm_min, neck_cm_max, notes) VALUES
('miniature-dachshund', 'Miniature Dachshund', 'Puppy (8–12 weeks)', 2, 3, 0.7, 1.5, 6, 10, 18, 24, 12, 16, 'Long body proportions evident early. Protect the back.'),
('miniature-dachshund', 'Miniature Dachshund', 'Puppy (3–6 months)', 3, 6, 1.5, 3.0, 8, 14, 24, 32, 16, 22, 'Back protection important — no jumping from heights.'),
('miniature-dachshund', 'Miniature Dachshund', 'Junior (6–12 months)', 6, 12, 2.5, 4.5, 12, 16, 30, 38, 20, 26, 'Chest deepening. Unique harness fit needed for long body.'),
('miniature-dachshund', 'Miniature Dachshund', 'Adult (1–7 years)', 12, 84, 4.0, 5.0, 13, 18, 36, 44, 24, 30, 'Full size. Must be under 5kg for miniature classification.'),
('miniature-dachshund', 'Miniature Dachshund', 'Senior (7+ years)', 84, 240, 4.0, 6.0, 13, 18, 36, 48, 24, 32, 'Back problems more likely. Weight control critical.');
