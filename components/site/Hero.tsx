import Clock from './Clock';

const ROLES = [
  'Full stack engineer',
  'Python & FastAPI backends',
  'Flutter mobile apps',
  'Next.js & React',
  'AI/ML pipelines',
  'AWS serverless & automation',
];

export default function Hero() {
  return (
    <>
      <section className="hero fw hue-core" aria-labelledby="hero-name">
        <h1 id="hero-name" className="hero__name">
          <span className="hero__line">Sanjeev</span>{' '}
          <span className="hero__line">
            Singh<span className="hero__dot" data-wire="node" aria-hidden="true" />
          </span>
        </h1>

        <p className="hero__claim">
          You have an idea. I engineer it to <span className="grad-text">production.</span>
        </p>

        <ul className="hero__roles" aria-label="What I build">
          {ROLES.map((r) => <li key={r}>{r}</li>)}
        </ul>

        <p className="hero__where">
          <span>Software Development Engineer II at AlignTogether</span>
          <span>Bhopal, India, <Clock /> IST</span>
        </p>

        <span className="wire-pt wire-pt--r wire-pt--edge wire-pt--bottom" data-wire="bend" data-route="h" />
      </section>

      <section className="intro fw hue-core" aria-label="About">
        <span className="wire-pt wire-pt--r wire-pt--gap" data-wire="bend" />
        <span className="wire-pt wire-pt--r wire-pt--first" data-wire="node" />
        <p className="intro__text" data-split="lines">
          I&apos;m a software engineer who takes products from first commit to production:{' '}
          <span className="ink-pink">real-time chat apps on the stores</span>,{' '}
          <span className="ink-cyan">serverless cloud backends</span>, and{' '}
          <span className="ink-green">ML-powered pipelines</span>. Fast, reliable, and finished to the last detail.
        </p>
        <div className="intro__actions" data-reveal="up">
          <a className="btn btn--solid" href="/resume">
            <span className="btn__fill" aria-hidden="true" />
            <span className="btn__label">View CV</span>
            <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
          <a className="btn" href="mailto:me.sanjeevks@gmail.com">
            <span className="btn__fill" aria-hidden="true" />
            <span className="btn__label">Email me</span>
            <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
