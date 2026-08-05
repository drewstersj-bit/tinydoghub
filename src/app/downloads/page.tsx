import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Downloads',
  description: 'Free downloadable resources for tiny dog owners. Care sheets, growth charts, measurement guides and more.',
};

export default function DownloadsPage() {
  return (
    <SectionLanding
      title="Downloads"
      description="Free downloadable resources — care sheets, growth charts, measurement guides and reference cards. No sign-up required."
    />
  );
}
