import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Tiny Dog Hub handles your data, cookies and privacy.',
};

export default function PrivacyPage() {
  return (
    <SectionLanding
      title="Privacy Policy"
      description="How we handle your data on Tiny Dog Hub."
    >
      <div className="prose prose-charcoal dark:prose-invert max-w-none">
        <h2>Our Approach to Privacy</h2>
        <p>
          Tiny Dog Hub is designed to respect your privacy. We do not use unnecessary cookies,
          tracking pixels or third-party analytics that follow you across the web.
        </p>

        <h2>Cookies</h2>
        <p>
          We use only essential cookies required for the site to function (such as remembering
          your theme preference). We do not set advertising or tracking cookies.
        </p>

        <h2>Analytics</h2>
        <p>
          We may use privacy-respecting analytics to understand which pages are useful and
          where we can improve. No personal data is shared with third parties for advertising
          purposes.
        </p>

        <h2>Contact Form Data</h2>
        <p>
          If you use our contact form, we collect your name and email address solely to respond
          to your enquiry. This data is not added to marketing lists or shared with third parties
          without your explicit consent.
        </p>

        <h2>Newsletter</h2>
        <p>
          If you subscribe to our newsletter, your email address is stored securely and used
          only to send you the content you signed up for. You can unsubscribe at any time using
          the link in every email.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to request access to, correction of, or deletion of any personal
          data we hold about you. Please <a href="/contact">contact us</a> to make a request.
        </p>
      </div>
    </SectionLanding>
  );
}
