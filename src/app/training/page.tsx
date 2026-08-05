import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tiny Dog Training',
  description: 'Positive training methods for Chihuahuas, toy breeds and puppies. Socialisation, recall, lead walking and behaviour.',
};

export default function TrainingPage() {
  return (
    <SectionLanding
      title="Training Guides"
      description="Gentle, positive training methods designed for tiny dogs. Socialisation, lead walking, recall and common behaviour challenges."
    />
  );
}
