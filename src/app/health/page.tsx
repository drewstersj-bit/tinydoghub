import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tiny Dog Health Guides',
  description: 'Expert health guidance for Chihuahuas, toy breeds and puppies. From common conditions to preventive care.',
};

export default function HealthPage() {
  return (
    <SectionLanding
      title="Health Guides"
      description="Evidence-based health information for tiny dog owners. Common conditions, preventive care, and when to see your vet."
    />
  );
}
