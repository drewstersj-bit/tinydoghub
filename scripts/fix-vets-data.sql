-- =============================================
-- FIX: Veterinary Data Integrity
-- Run in Supabase SQL Editor
-- =============================================

-- 1. Fix corrupted telephone number: Vets Now Birmingham
-- The telephone was '01onal 240 8888' — corrupted
-- Cannot verify the correct number without official source
-- Setting to NULL until verified; emergency_telephone is already correct
UPDATE vets 
SET telephone = NULL
WHERE slug = 'vets-now-birmingham';

-- 2. Fix corrupted telephone: Willows Veterinary Centre
-- The telephone was '01onal 632 364' — corrupted
-- Cannot verify without official source
UPDATE vets 
SET telephone = NULL
WHERE slug = 'willows-veterinary-centre-cheshire';

-- 3. Remove unverified small-dog expertise claims
-- These claims were editorial inventions without evidence
UPDATE vets SET small_dog_expertise = NULL WHERE slug = 'willows-veterinary-centre-cheshire';
UPDATE vets SET small_dog_expertise = NULL WHERE slug = 'goddard-vet-group-london';

-- 4. Add verification and trust fields to all records
-- Mark all existing records as needing verification
ALTER TABLE vets ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'awaiting_verification';
ALTER TABLE vets ADD COLUMN IF NOT EXISTS emergency_access TEXT DEFAULT 'not_confirmed';
ALTER TABLE vets ADD COLUMN IF NOT EXISTS referral_required BOOLEAN DEFAULT false;
ALTER TABLE vets ADD COLUMN IF NOT EXISTS call_before_travelling BOOLEAN DEFAULT true;
ALTER TABLE vets ADD COLUMN IF NOT EXISTS telephone_verified BOOLEAN DEFAULT false;

-- 5. Set correct verification and emergency access for known records
-- Emergency hospitals: public access, no referral
UPDATE vets SET 
  verification_status = 'published',
  emergency_access = 'public_24_7',
  referral_required = false,
  call_before_travelling = true,
  telephone_verified = true
WHERE slug IN ('vets-now-manchester', 'vets-now-liverpool', 'vets-now-london-south', 'vets-now-edinburgh', 'vets-now-bristol');

-- Birmingham: emergency phone verified but main phone corrupted
UPDATE vets SET
  verification_status = 'published',
  emergency_access = 'public_24_7',
  referral_required = false,
  call_before_travelling = true,
  telephone_verified = false
WHERE slug = 'vets-now-birmingham';

-- Specialist referral hospital: referral required
UPDATE vets SET
  verification_status = 'published',
  emergency_access = 'referral_only',
  referral_required = true,
  call_before_travelling = true,
  telephone_verified = true
WHERE slug = 'small-animal-specialist-hospital-manchester';

-- General practices: mark as needing verification
UPDATE vets SET
  verification_status = 'awaiting_verification',
  emergency_access = 'not_applicable',
  referral_required = false,
  call_before_travelling = false,
  telephone_verified = false
WHERE practice_type = 'general';

-- Charity practice
UPDATE vets SET
  verification_status = 'awaiting_verification',
  emergency_access = 'not_applicable',
  referral_required = false,
  call_before_travelling = false,
  telephone_verified = false
WHERE slug = 'pdsa-pet-hospital-manchester';
