import { SectionLanding } from '@/components/shared/SectionLanding';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report a Correction',
  description: 'Let us know if you spot an error on Tiny Dog Hub.',
};

export default function CorrectionsPage() {
  return (
    <SectionLanding
      title="Report a Correction"
      description="Spotted something wrong? We want to know."
    >
      <div className="prose prose-charcoal dark:prose-invert max-w-none">
        <h2>We Take Accuracy Seriously</h2>
        <p>
          If you&apos;ve found a factual error, outdated information, a broken link or any
          other mistake on Tiny Dog Hub, please let us know. We appreciate corrections from
          our readers — they help us keep this resource reliable for everyone.
        </p>

        <h2>What to Include</h2>
        <ul>
          <li>The page where you found the error (a URL or page title is helpful)</li>
          <li>A description of what appears to be incorrect</li>
          <li>If possible, a source or reference for the correct information</li>
        </ul>

        <h2>How to Report</h2>
        <p>
          Please use our{' '}
          <Link href="/contact">contact form</Link>{' '}
          to submit corrections. Include &quot;Correction&quot; in the subject line so we can
          prioritise your message.
        </p>

        <h2>What Happens Next</h2>
        <p>
          We aim to review all correction reports within 48 hours. If a correction is confirmed,
          we will update the relevant page and add a correction note where appropriate.
        </p>
      </div>
    </SectionLanding>
  );
}
