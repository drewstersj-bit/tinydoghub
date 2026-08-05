import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions for using Tiny Dog Hub.',
};

export default function TermsPage() {
  return (
    <SectionLanding
      title="Terms of Use"
      description="Please read these terms before using Tiny Dog Hub."
    >
      <div className="prose prose-charcoal dark:prose-invert max-w-none">
        <h2>Educational Information Only</h2>
        <p>
          All content on Tiny Dog Hub is provided for educational and informational purposes
          only. It does not constitute veterinary advice, medical diagnosis or professional
          recommendation. Always consult a qualified veterinarian for health-related decisions
          about your dog.
        </p>

        <h2>Accuracy</h2>
        <p>
          We make every effort to ensure information is accurate and up to date, but we cannot
          guarantee that all content is free from errors. Breed data, size charts and health
          information may vary between individual dogs. Use our tools and guides as a starting
          point, not a definitive answer.
        </p>

        <h2>External Links</h2>
        <p>
          Tiny Dog Hub contains links to external websites including our sister shop, My Chi
          and Me. We are not responsible for the content, privacy practices or availability of
          external sites.
        </p>

        <h2>Use of Tools</h2>
        <p>
          Our interactive tools (harness finder, growth tracker, calculators) provide estimates
          and suggestions based on general breed data. Results should be verified with physical
          measurements and professional advice where appropriate.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after changes
          constitutes acceptance of the updated terms.
        </p>
      </div>
    </SectionLanding>
  );
}
