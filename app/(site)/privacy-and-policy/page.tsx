import type { Metadata } from 'next';
import Wire from '@/components/site/Wire';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sanjeev Singh',
  description: 'Privacy policy for the portfolio website of Sanjeev Singh (sanjeevnode.in). Learn about how your data is handled.',
  alternates: { canonical: '/privacy-and-policy' },
};

export default function PrivacyPolicy() {
  return (
    <article className="legal fw wire-host" data-wire-host>
      <Wire />
      <span className="wire-pt wire-pt--l wire-pt--head-tight" data-wire="node" />
      <header className="legal__head">
        <h1 className="page-head__title">Privacy policy</h1>
        <p className="legal__date" data-reveal="fade" data-intro>Last updated: July 4, 2026</p>
      </header>

      <div className="legal__body prose">
        <section>
          <span className="wire-pt" data-wire="tick" />
          <h2>Introduction</h2>
          <p>
            Welcome to my portfolio website (<strong>sanjeevnode.in</strong>). I respect your privacy and am committed to
            protecting any personal data you share. This Privacy Policy details how information is collected, protected,
            and used when you visit this website.
          </p>
        </section>

        <section>
          <span className="wire-pt" data-wire="tick" />
          <h2>Information we collect</h2>
          <p>This website is structured to minimize data collection. The only circumstances under which personal data is collected are:</p>
          <ul>
            <li>
              <strong>Contact form:</strong> when you send a message through the contact form, I collect the details you
              fill out, typically your <em>name</em>, <em>email address</em> and <em>message content</em>. This is used
              solely to respond to your inquiries.
            </li>
            <li>
              <strong>Server logs:</strong> standard server logs are maintained by our hosting provider. This includes IP
              addresses, browser types, referring pages, and access times, which are standard for server operations and
              diagnostics.
            </li>
          </ul>
        </section>

        <section>
          <span className="wire-pt" data-wire="tick" />
          <h2>How we use your information</h2>
          <p>The information collected is used in the following ways:</p>
          <ul>
            <li>To reply directly to your contact requests or professional inquiries.</li>
            <li>To secure the website against spam, unauthorized access, and malicious behavior.</li>
            <li>To analyze general, aggregated traffic data to help optimize website presentation and usability.</li>
          </ul>
        </section>

        <section>
          <span className="wire-pt" data-wire="tick" />
          <h2>Cookies and tracking</h2>
          <p>
            We may use basic cookies or local storage to preserve your preferences. These cookies do not track your
            activity on other sites or collect personally identifiable information.
          </p>
        </section>

        <section>
          <span className="wire-pt" data-wire="tick" />
          <h2>Third-party services and integrations</h2>
          <p>This website integrates certain third-party components to ensure safety and standard functionality:</p>
          <ul>
            <li>
              <strong>Google reCAPTCHA:</strong> we may use reCAPTCHA to shield the contact form from bots and automated
              spam. The usage of reCAPTCHA is subject to Google&apos;s{' '}
              <a className="link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and{' '}
              <a className="link" href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>.
            </li>
            <li>
              <strong>Hosting and deployment:</strong> the site is deployed and hosted on cloud infrastructure which
              collects standard technical telemetry.
            </li>
          </ul>
        </section>

        <section>
          <span className="wire-pt" data-wire="tick" />
          <h2>Security of data</h2>
          <p>
            Your data security is critical to me. We implement standard encryption (HTTPS) protocols for all data
            transmitted to and from this site. However, please remember that no transmission method over the Internet
            or electronic storage is 100% secure.
          </p>
        </section>

        <section>
          <span className="wire-pt" data-wire="tick" />
          <h2>Your rights and contact details</h2>
          <p>
            You can inquire about the personal details you submitted at any time. If you wish to review, update, or
            delete any messages or contact details you sent, please contact me directly at{' '}
            <a className="link" href="mailto:contact@sanjeevnode.in">contact@sanjeevnode.in</a>.
          </p>
        </section>
      </div>
      <span className="wire-pt wire-pt--l wire-pt--end" data-wire="node" />
    </article>
  );
}
