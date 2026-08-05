import { VenueDetail } from './VenueDetail';

// All venue slugs that need static pages generated
const ALL_VENUE_SLUGS = [
  // Original venues
  'the-art-of-tea-didsbury',
  'the-stamford-arms-dunham',
  'delamere-forest-cafe',
  'the-venetian-knutsford',
  'coconut-kitchen-abersoch',
  // Liverpool
  'bold-street-coffee-liverpool',
  'the-philharmonic-liverpool',
  // Leeds
  'opposite-cafe-leeds',
  // Plymouth
  'the-terrace-plymouth',
  'the-duke-plymouth',
  // London
  'the-magazin-serpentine-london',
  'the-spaniards-inn-hampstead',
  // Birmingham
  'the-canal-house-birmingham',
  'faculty-coffee-birmingham',
  // Edinburgh
  'the-dog-house-edinburgh',
  'lowdown-coffee-edinburgh',
  // Bristol
  'the-grain-barge-bristol',
  'pinkmans-bakery-bristol',
  // Glasgow
  'the-glad-cafe-glasgow',
  // Cardiff
  'pettigrew-tea-rooms-cardiff',
  // Nottingham
  'the-canal-house-nottingham',
  // Newcastle
  'the-broad-chare-newcastle',
  // Bath
  'the-green-bird-cafe-bath',
  // York
  'the-house-of-trembling-madness-york',
  // Sheffield
  'tamper-coffee-sellers-wheel-sheffield',
];

export function generateStaticParams() {
  return ALL_VENUE_SLUGS.map((slug) => ({ slug }));
}

export default async function VenuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <VenueDetail slug={slug} />;
}
