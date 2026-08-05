import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dog Friendly Holidays',
  description: 'Holiday cottages, caravan parks and destinations that welcome tiny dogs. Plan your perfect getaway.',
};

export default function DogFriendlyHolidaysPage() {
  return (
    <SectionLanding
      title="Dog Friendly Holidays"
      description="Cottages, caravan parks and holiday destinations across the UK that welcome tiny dogs. Plan a stress-free getaway."
    />
  );
}
