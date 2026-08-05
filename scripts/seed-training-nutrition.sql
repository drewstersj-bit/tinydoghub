-- =============================================
-- Training & Nutrition Articles
-- Run in Supabase SQL Editor
-- =============================================

-- TRAINING ARTICLES TABLE
CREATE TABLE IF NOT EXISTS training_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tiny_dog_specific TEXT,
  key_tips TEXT[] DEFAULT '{}',
  common_mistakes TEXT[] DEFAULT '{}',
  related_breeds TEXT[] DEFAULT '{}',
  sources TEXT[] DEFAULT '{}',
  last_reviewed TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NUTRITION ARTICLES TABLE
CREATE TABLE IF NOT EXISTS nutrition_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tiny_dog_specific TEXT,
  key_points TEXT[] DEFAULT '{}',
  foods_to_avoid TEXT[] DEFAULT '{}',
  related_breeds TEXT[] DEFAULT '{}',
  sources TEXT[] DEFAULT '{}',
  last_reviewed TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE training_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read training" ON training_articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read nutrition" ON nutrition_articles FOR SELECT USING (status = 'published');

-- =============================================
-- SEED: Training Articles
-- =============================================

INSERT INTO training_articles (slug, status, title, category, summary, content, tiny_dog_specific, key_tips, common_mistakes, related_breeds, sources, last_reviewed) VALUES
('lead-walking-tiny-dogs', 'published', 'Lead Walking for Tiny Dogs', 'basics', 'Why lead walking feels different with a small dog, and how to build confident, relaxed walks from the start.', 'Lead walking with a tiny dog requires a different approach to larger breeds. The physical dynamics are different — you are much further from the ground, the lead angle is steeper, and your dog covers less distance per stride.

## Why tiny dogs need a different approach

A standard 6-foot lead held at waist height creates a near-vertical angle for a Chihuahua. This puts upward pressure on the harness or collar with every step. Using a longer lead (8–10 feet) and holding it lower reduces this strain.

## Building confidence

Many tiny dogs become reactive or anxious on lead because they feel vulnerable at ground level surrounded by larger dogs, feet and wheels. Building confidence starts with quiet, low-traffic environments and short positive sessions.

## Equipment matters

Always use a harness rather than a collar for tiny dogs. A Y-shaped or step-in harness distributes pressure across the chest rather than the delicate throat. This is especially important for breeds prone to tracheal collapse.

## Session length

Puppies: 5–10 minutes initially, building gradually.
Adult toy breeds: 15–30 minutes is often enough for a single walk.
Adjust based on weather, your dog''s energy and surface conditions.', 'Tiny dogs walk at a fraction of a human''s natural pace. Slow down significantly — what feels like dawdling to you is a brisk walk for a 2kg dog. Match their rhythm rather than expecting them to match yours.', ARRAY['Use a longer lead to reduce steep angles','Hold the lead lower — waist height creates upward pressure','Keep sessions short and positive','Choose quiet routes initially','Let them sniff — it is mentally enriching, not misbehaviour','Always use a harness, never a collar'], ARRAY['Using a collar instead of a harness','Expecting a tiny dog to walk at human pace','Picking them up at every sign of hesitation — this prevents learning','Yanking or jerking the lead — tiny necks are fragile','Walking too far too soon with puppies'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','maltese','toy-poodle'], ARRAY['APDT: Lead walking guidelines','Kennel Club: Walking your dog'], '2026-07-01'),

('socialisation-small-dogs', 'published', 'Socialisation for Small Dogs', 'behaviour', 'How to socialise a tiny dog without overwhelming them. The balance between exposure and protection.', 'Socialisation is crucial for all dogs, but tiny dogs face unique challenges. The world is disproportionately large and potentially frightening when you weigh under 3kg. Done well, socialisation builds confidence. Done badly, it creates lifelong anxiety.

## The socialisation window

The critical period is 3–16 weeks. During this time, positive experiences with new people, dogs, environments and sounds shape your puppy''s lifelong temperament. After 16 weeks, new experiences become harder to process positively.

## Tiny dog challenges

- Other dogs may not recognise very small puppies as dogs
- Well-meaning people may grab or loom over them
- Normal urban sounds feel louder at ground level
- They cannot escape situations as easily as larger dogs

## How to socialise safely

1. Observe from a safe distance before approaching
2. Let your dog choose to approach — never force interaction
3. Carry them initially in busy environments so they can observe safely
4. Reward calm behaviour with treats and praise
5. Keep encounters short — quality over quantity
6. Choose calm, well-socialised dogs for early introductions
7. Avoid dog parks with uncontrolled large dogs

## Signs of overwhelm

Watch for: freezing, tucking tail, lip-licking, yawning, attempting to climb you, trembling or trying to hide. These mean you need to create more distance immediately.', 'Small dogs are at genuine physical risk from larger dogs during play. A friendly but clumsy Labrador can accidentally injure a Chihuahua. Socialisation does not mean forcing interactions with dogs 20 times your dog''s size — it means building confidence through appropriate encounters.', ARRAY['Start in quiet environments and build up gradually','Let your puppy observe from your arms before engaging','Choose size-appropriate playmates','Reward calm responses to new stimuli','Keep encounters short and positive','Watch for signs of overwhelm and create distance immediately'], ARRAY['Forcing interaction with large unfamiliar dogs','Flooding — exposing to too much too soon','Picking them up at every noise — this reinforces fear','Not socialising at all due to over-protectiveness','Only socialising with other small dogs — they need to be neutral around all sizes'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','maltese','russian-toy'], ARRAY['APDT: Puppy socialisation','Veterinary Behaviourist guidelines'], '2026-07-01'),

('recall-training-toy-breeds', 'published', 'Recall Training for Toy Breeds', 'basics', 'Teaching reliable recall to a tiny dog — why it matters more and how to build it gradually.', 'Recall is arguably more important for tiny dogs than large ones. A Chihuahua that runs towards a road or a large dog is at significantly greater risk than a Labrador in the same situation.

## Why recall is harder with tiny dogs

- They are often carried rather than walked off-lead, so get less practice
- Their world is more frightening, so they may flee rather than return
- Small-dog-specific prey drive (chasing leaves, birds) is underestimated
- Owners may not invest in recall because they can physically retrieve the dog

## Building recall step by step

**Phase 1: Indoors**
Start in the house. Call their name, reward generously when they come. Make yourself more exciting than anything else in the room.

**Phase 2: Enclosed garden**
Move to a secure enclosed space. Use a long line (5–10 metres) for safety. Call, reward, release. Never call them for something unpleasant.

**Phase 3: Quiet outdoor spaces**
A secure field or quiet park. Keep the long line attached. Only remove it when recall is reliable with distractions.

**Phase 4: Real-world practice**
Gradually increase distraction levels. Always reward heavily. Keep a high-value treat specifically for recall.

## The recall rule

Never punish a dog that comes back to you, no matter how long it took. Coming back must always be the best decision they can make.', 'Toy breeds can develop excellent recall but owners often skip the training because they feel they can always pick the dog up. Building genuine recall gives your tiny dog confidence, independence and keeps them safer in the long term.', ARRAY['Start indoors where there are no distractions','Use extremely high-value treats reserved only for recall','Never call for something unpleasant (bath, nail trim)','Practice daily in short bursts — not just when you need it','Use a long line before trusting off-lead','Make coming back the best decision in their world'], ARRAY['Only practising recall when you need to leave the park','Using a stern voice — recall should sound exciting','Chasing a dog that won''t return — this becomes a game','Punishing delayed returns — they learn coming back is bad','Skipping recall training because you can carry them'], ARRAY['chihuahua','pomeranian','papillon','italian-greyhound','russian-toy'], ARRAY['APDT: Recall training','Kennel Club: Teaching your dog to come back'], '2026-06-28'),

('crate-training-puppies', 'published', 'Crate Training for Toy Breed Puppies', 'puppies', 'How to introduce a crate as a safe space for your tiny puppy — not a punishment.', 'A crate can be an invaluable tool for tiny puppies — providing safety, aiding toilet training and giving them a secure retreat. But it must be introduced positively and never used as punishment.

## Why crates work well for tiny dogs

- Tiny puppies are vulnerable — a crate keeps them safe when unsupervised
- Small bladders mean toilet training needs structure
- They provide a den-like space that appeals to canine instincts
- Prevents chewing hazards (electrical cables are at tiny-dog height)
- Aids travel training — familiar space in unfamiliar places

## Choosing the right crate

For a Chihuahua or similar toy breed, a 24-inch crate is typically sufficient. The dog should be able to stand, turn around and lie down comfortably. Too large defeats the den purpose; too small is uncomfortable.

## Introduction process

**Day 1–3:** Door open, treats inside, no closing. Let them explore freely.
**Day 4–7:** Brief door closures (30 seconds) while you remain visible. Treat through the bars.
**Week 2:** Extend to 5–10 minutes with the door closed. Stay nearby.
**Week 3–4:** Build to 30 minutes. Begin leaving the room briefly.
**Month 2:** Build to 1–2 hours maximum for young puppies.

## Rules

- Never use the crate as punishment
- Never leave a puppy longer than they can hold their bladder
- Always provide water access during longer periods
- Make it comfortable — soft bedding, a covered top for darkness
- Practice in short positive bursts, not marathon sessions', 'Tiny puppies have very small bladders. A general rule: age in months + 1 = maximum hours in a crate. A 3-month-old can hold for approximately 4 hours maximum. Overnight, expect at least one toilet break until 4–5 months.', ARRAY['Let the puppy discover the crate voluntarily — never force them in','Feed meals inside the crate to build positive association','Cover three sides to create a den feeling','Keep the crate in a family area, not isolated','Build duration very gradually','Always take them straight outside when released'], ARRAY['Forcing the puppy inside','Closing the door too early','Using the crate as punishment after accidents','Leaving a young puppy too long','Placing the crate in an isolated room','Reacting to whining by immediately releasing — wait for quiet'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','maltese','toy-poodle','shih-tzu'], ARRAY['APDT: Crate training guide','RSPCA: Crate training advice'], '2026-07-02'),

('stopping-excessive-barking', 'published', 'Reducing Excessive Barking in Small Dogs', 'behaviour', 'Why tiny dogs bark and practical approaches to reduce it without punishment.', 'Excessive barking is one of the most common behaviour concerns in toy breeds. Understanding why your small dog barks is the first step to addressing it.

## Why small dogs bark more

- Alert barking: tiny dogs are naturally vigilant — they compensate for size with noise
- Frustration: being carried, restrained or unable to reach something
- Attention seeking: barking has been inadvertently rewarded
- Anxiety: separation, noise sensitivity or generalised worry
- Excitement: inability to contain enthusiasm

## What NOT to do

- Never shout at a barking dog — you are just barking with them
- Avoid punishment-based devices (spray collars, shock collars)
- Do not reward barking by giving attention, picking them up or feeding treats to stop it

## What works

**Acknowledge then redirect:** "Thank you, I see it" in a calm voice, then redirect attention to a toy or command they know.

**Teach "quiet":** Wait for a natural pause in barking, immediately mark ("yes" or click) and reward. Repeat until they understand that silence earns treats.

**Remove triggers:** If they bark at the postman through the window, limit window access during delivery times.

**Increase enrichment:** A tired, mentally stimulated dog barks less. Puzzle feeders, snuffle mats and training sessions reduce boredom barking.

**Address the root cause:** If anxiety-driven, work with a qualified behaviourist. If attention-seeking, completely ignore barking and reward quiet.', 'Toy breeds have been selectively bred for alertness and companionship for centuries. Some barking is natural and breed-appropriate — the goal is to reduce excessive or problematic barking, not eliminate all vocalisation.', ARRAY['Identify the trigger before trying to fix it','Reward quiet moments proactively','Increase mental enrichment — puzzle feeders help','Teach a reliable quiet cue','Address underlying anxiety if present','Be consistent — everyone in the household must follow the same approach'], ARRAY['Shouting at the dog — this escalates arousal','Using punishment devices','Inconsistency — sometimes allowing it, sometimes not','Rewarding barking by giving attention','Ignoring anxiety-driven barking — this needs professional help'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','miniature-dachshund','shih-tzu'], ARRAY['APDT: Barking guidance','Association of Pet Behaviour Counsellors'], '2026-06-25');

-- =============================================
-- SEED: Nutrition Articles
-- =============================================

INSERT INTO nutrition_articles (slug, status, title, category, summary, content, tiny_dog_specific, key_points, foods_to_avoid, related_breeds, sources, last_reviewed) VALUES
('feeding-tiny-dog-puppies', 'published', 'Feeding a Tiny Dog Puppy', 'puppies', 'How much, how often and what to feed a toy breed puppy. Getting the basics right in those critical first months.', 'Feeding a toy breed puppy correctly is one of the most important things you can do for their health. Small puppies have fast metabolisms, tiny stomachs and very specific nutritional needs.

## Why feeding frequency matters

Tiny puppies cannot store much glucose. Going too long between meals can cause hypoglycaemia (dangerously low blood sugar). This is a genuine medical emergency in toy breeds.

**Recommended feeding schedule:**
- 8–12 weeks: 4 meals per day
- 12–16 weeks: 3–4 meals per day
- 4–6 months: 3 meals per day
- 6–12 months: 2–3 meals per day
- Adult: 2 meals per day (some tiny dogs do better on 3 small meals)

## Portion sizes

Do not rely on the packet guidelines — they are designed for average dogs. A Chihuahua puppy may need as little as 40–80 calories per day at 8 weeks. Weigh food accurately and adjust based on body condition.

## What to feed

Choose a food specifically formulated for toy breed puppies. These typically have:
- Smaller kibble size
- Higher calorie density per gram
- Appropriate calcium-to-phosphorus ratios for small-breed bone growth
- Higher protein content

## Wet vs dry

Both are acceptable. Many tiny puppies find wet food easier to eat initially. A mix of wet and dry can work well. Whatever you choose, transition gradually over 7–10 days.

## Signs of correct feeding

- Steady weight gain along the growth curve
- Visible waist when viewed from above
- Ribs can be felt but not prominently seen
- Good energy levels
- Firm, regular stools', 'Toy breed puppies are at significantly higher risk of hypoglycaemia than larger breeds. Never let a tiny puppy go more than 4–5 hours without food during the day. Keep honey or glucose gel accessible at all times during the first 6 months.', ARRAY['Feed 4 times daily until 12 weeks, then reduce gradually','Use food specifically formulated for toy breed puppies','Weigh food accurately — do not guess','Never skip meals — hypoglycaemia risk is real','Transition foods gradually over 7–10 days','Monitor weight weekly and adjust portions accordingly'], ARRAY['Grapes and raisins','Chocolate','Onions and garlic','Xylitol (artificial sweetener)','Cooked bones','Macadamia nuts','Avocado','Alcohol','Caffeine'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','maltese','toy-poodle','russian-toy'], ARRAY['PFMA: Pet food guidelines','BSAVA: Small animal nutrition','Royal Canin: Toy breed nutrition guide'], '2026-07-01'),

('portion-control-small-dogs', 'published', 'Portion Control for Small Dogs', 'weight', 'Why getting portions right is critical when a few extra grams of food per day leads to obesity in a tiny dog.', 'Portion control matters enormously for small dogs because the margin between healthy weight and obesity is tiny. A Chihuahua gaining 200g is equivalent to a Labrador gaining 2kg.

## The maths of tiny-dog weight gain

A 2.5kg Chihuahua needs approximately 150–200 calories per day. Just 20 extra calories daily — half a dog treat — can lead to meaningful weight gain over a few months.

## How to measure correctly

- Use digital kitchen scales for dry food (measuring cups are inaccurate)
- Weigh wet food too — eye-balling leads to over-feeding
- Account for ALL food: meals + treats + dental chews + stolen food
- Treats should be no more than 10% of daily calories

## Body condition scoring

Learn to body-condition score your dog at home:
- **Too thin:** Ribs, spine and hip bones clearly visible. No fat covering.
- **Ideal:** Ribs easily felt under a thin fat layer. Visible waist from above. Tummy tucks up.
- **Overweight:** Ribs hard to feel. No visible waist. Rounded appearance.
- **Obese:** Ribs cannot be felt. No waist. Fat deposits on neck, limbs and base of tail.

## Adjusting portions

Weigh your dog monthly. If weight is creeping up:
1. Reduce food by 10% for two weeks
2. Reassess
3. Check treat intake — this is often the hidden cause
4. Increase exercise slightly if appropriate

If weight drops unexpectedly, see your vet — this can indicate illness.', 'A tiny dog becoming overweight is more dangerous than it looks. Extra weight on a 2kg frame puts proportionally enormous stress on joints (especially knees prone to patellar luxation), the heart, and the trachea. Weight management is health management.', ARRAY['Weigh food with digital scales — never guess','Account for treats in daily calorie allowance','Treats should be maximum 10% of daily intake','Learn body condition scoring for your breed','Weigh your dog monthly','Adjust portions based on body condition, not just packet guidelines'], ARRAY['Grapes and raisins','Chocolate','Onions and garlic','Xylitol (artificial sweetener)','High-fat human food scraps','Cooked bones'], ARRAY['chihuahua','pug','cavalier-king-charles','shih-tzu','miniature-dachshund'], ARRAY['PFMA: Feeding guidelines','WSAVA: Body condition scoring','PDSA: Pet obesity report'], '2026-06-28'),

('foods-toxic-to-dogs', 'published', 'Foods Toxic to Dogs', 'safety', 'A clear reference list of foods that are dangerous to dogs, with symptoms and what to do.', 'Some common human foods are toxic to dogs. For tiny dogs, even small amounts can be dangerous because of their low body weight. Keep this list accessible.

## Immediately dangerous

**Chocolate** — Contains theobromine. Dark chocolate is most dangerous. Symptoms: vomiting, diarrhoea, rapid breathing, seizures. Contact your vet immediately.

**Grapes and raisins** — Can cause acute kidney failure. Even one grape can be dangerous for a tiny dog. Seek immediate veterinary help.

**Xylitol** (artificial sweetener) — Found in sugar-free gum, sweets and some peanut butters. Causes rapid insulin release and liver failure. Emergency.

**Onions and garlic** — Damage red blood cells. All forms (raw, cooked, powdered) are dangerous. Symptoms may be delayed 3–5 days.

## Dangerous in quantity

**Macadamia nuts** — Cause weakness, vomiting and tremors.
**Avocado** — Contains persin. Can cause vomiting and diarrhoea.
**Alcohol** — Even small amounts dangerous for tiny dogs.
**Caffeine** — Similar effects to chocolate toxicity.
**Cooked bones** — Can splinter and cause internal damage or blockages.
**Salt** — Large quantities cause sodium poisoning.

## What to do if your dog eats something toxic

1. Do not wait for symptoms — contact your vet immediately
2. Note what was eaten, how much, and when
3. Do not induce vomiting unless specifically instructed by your vet
4. Keep the packaging if available
5. For out-of-hours emergencies, contact your nearest emergency vet

## Important for tiny dogs

Toxic doses are calculated by body weight. A quantity that might give a Labrador mild symptoms could kill a Chihuahua. Always err on the side of caution and call your vet.', 'Because toxic doses are proportional to body weight, tiny dogs are at far greater risk from accidental ingestion. A single raisin or a small square of dark chocolate that a large dog might tolerate can constitute a veterinary emergency for a 2kg Chihuahua.', ARRAY['Keep all toxic foods securely out of reach','Check peanut butter labels for xylitol before using as a treat','Educate all household members including children','Contact your vet immediately if ingestion is suspected — do not wait for symptoms','Know your nearest emergency vet location and number','Never induce vomiting without veterinary instruction'], ARRAY['Chocolate (especially dark)','Grapes and raisins','Xylitol (in sugar-free products)','Onions and garlic (all forms)','Macadamia nuts','Avocado','Alcohol','Caffeine','Cooked bones','Excessive salt','Mouldy food','Raw yeast dough'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','maltese','toy-poodle','pug'], ARRAY['Veterinary Poisons Information Service','PDSA: Dangerous foods for dogs','Blue Cross: Foods toxic to dogs'], '2026-07-02'),

('treats-for-tiny-dogs', 'published', 'Choosing Treats for Tiny Dogs', 'general', 'How to choose appropriate treats when your dog only needs 150 calories a day.', 'Treats are an essential training tool and a way to bond with your dog, but choosing the right ones for a tiny dog requires thought. Standard dog treats are often far too large and calorie-dense for a 2kg dog.

## The calorie problem

A typical large dog treat (50–80 calories) might represent a third of a Chihuahua''s entire daily calorie needs. Giving two of these is equivalent to a human eating an extra full meal.

## What to look for

- Treats specifically designed for toy breeds (smaller size, lower calorie)
- Single-ingredient treats (dried meat, fish skins)
- Soft treats that can be broken into tiny pieces
- Low-calorie options for training (under 3 calories per treat)

## Training treats

For training, you need quantity over size. Break treats into pieces the size of a pea. Your dog doesn''t care about size — the frequency of reward matters more.

Good training treats:
- Tiny pieces of cooked chicken
- Cheese cut into 5mm cubes
- Commercial training treats (check calorie content)
- Dehydrated liver broken into crumbs

## How many treats per day

Treats should not exceed 10% of daily calories. For a 2.5kg dog eating 175 calories daily, that means a maximum of about 17 calories in treats — roughly:
- 5–6 tiny training treats, or
- 1 small dental chew, or
- A tablespoon of plain cooked chicken

## Healthy alternatives

- Small pieces of carrot or apple (remove seeds)
- Blueberries (2–3 as a treat)
- Frozen plain yoghurt dots
- A lick of peanut butter (xylitol-free only)', 'Standard dog treats are designed for 25–40kg dogs. Using them for a tiny dog is like giving a child an entire chocolate cake as an afternoon snack. Always scale down dramatically or choose toy-breed-specific options.', ARRAY['Choose treats specifically sized for toy breeds','Break larger treats into pea-sized pieces for training','Keep treat calories under 10% of daily intake','Use fresh foods as low-calorie alternatives','Track all treats as part of the daily food allowance','Soft treats work best for training — easier to eat quickly'], ARRAY['Grapes and raisins','Chocolate','Xylitol-containing products','Cooked bones','High-fat human food','Large hard treats that could be a choking hazard'], ARRAY['chihuahua','yorkshire-terrier','pomeranian','maltese','toy-poodle','pug'], ARRAY['PFMA: Treat guidelines','BSAVA: Nutrition guidance','PDSA: Healthy treating'], '2026-06-30');
