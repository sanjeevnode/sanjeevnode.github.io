import type { Metadata } from 'next';
import './(site)/site.css';

export const metadata: Metadata = {
  title: 'Not found | Sanjeev Singh',
  description: 'This address does not route anywhere on sanjeevnode.in. Head back to the homepage.',
  robots: { index: false },
};

// Dead letter: the route ran three times and stopped at a hollow node.
export default function NotFound() {
  return (
    <div className="site">
      <a className="skip-link" href="#main">Skip to content</a>
      <main id="main" className="lost hue-pink" tabIndex={-1}>
        <a href="/" className="brand lost__brand">
          sanjeevnode<span className="brand__tld">.in</span>
        </a>
        <div className="lost__wire" aria-hidden="true">
          <i className="lost__live" />
          <i className="lost__retry" />
          <i className="lost__retry" />
          <i className="lost__retry" />
          <i className="lost__node" />
        </div>
        <p className="lost__code tabular">404</p>
        <h1 className="lost__title grad-text">Dead-lettered.</h1>
        <p className="lost__text">
          This address was retried three times and never reached a page. Nothing is broken on your side; the link
          probably moved.
        </p>
        <a className="btn btn--solid" href="/">
          <span className="btn__fill" aria-hidden="true" />
          <span className="btn__label">Replay from the homepage</span>
          <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
      </main>
    </div>
  );
}
