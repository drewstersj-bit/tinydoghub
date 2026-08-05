import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the TinyDogHub team. Feedback, corrections, partnership enquiries and content suggestions.',
};

export default function ContactPage() {
  return (
    <SectionLanding
      title="Contact Us"
      description="Questions, corrections, content suggestions or partnership enquiries — we'd love to hear from you."
    >
      <form className="max-w-md space-y-6" name="contact" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal dark:text-dark-text mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-card border border-soft-grey bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal dark:text-dark-text mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-card border border-soft-grey bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal dark:text-dark-text mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-3 rounded-card border border-soft-grey bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text resize-y"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-card bg-forest-green text-white font-medium hover:bg-forest-green/90 transition-colors"
        >
          Send Message
        </button>
      </form>
    </SectionLanding>
  );
}
