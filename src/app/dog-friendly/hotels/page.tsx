import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dog Friendly Hotels',
  description: 'Dog friendly hotels and accommodation across the UK. Find places that truly welcome small dogs and toy breeds.',
};

export default function DogFriendlyHotelsPage() {
  return (
    <SectionLanding
      title="Dog Friendly Hotels"
      description="Hotels and accommodation across the UK that genuinely welcome small dogs. No hidden fees or hostile fine print."
    />
  );
}
