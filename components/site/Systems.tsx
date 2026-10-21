import { ExperienceInput, ExperienceProject } from '@/app/types/experience';
import SectionHead from './SectionHead';

// Only flagged systems reach the homepage. Nothing flagged (older DB docs) -> the first six.
function featuredOf(systems: ExperienceProject[]): ExperienceProject[] {
  const flagged = systems.filter((s) => s.featured);
  return flagged.length > 0 ? flagged : systems.slice(0, 6);
}

export default function Systems({ jobs }: { jobs: ExperienceInput[] }) {
  return (
    <section id="systems" className="sec" data-spy aria-labelledby="systems-title">
      <SectionHead
        id="systems"
        rail="l"
        title="Systems in production"
        note="Each row is a system I built and shipped at work. Open one for what it does and how it was made."
      />

      {jobs.map((job) => (
        <div className="job" key={job.company}>
          <div className="job__head fw">
            <span className="wire-pt wire-pt--l wire-pt--mid" data-wire="node" />
            <h3 className="job__company" data-split="lines">{job.company}</h3>
            <p className="job__meta" data-reveal="fade">
              <span>{job.title}</span>
              <span className="tabular">{job.period.replace(/\s*[–-]\s*/, ' to ')}</span>
              <span>{job.location}</span>
            </p>
          </div>

          <ul className="rows">
            {featuredOf(job.projects).map((p) => (
              <li className="row" key={p.title}>
                <span className="wire-pt wire-pt--l wire-pt--row" data-wire="tick" />
                <details>
                  <summary>
                    <span className="row__title">{p.title}</span>
                    <span className="row__lede">{p.description[0]}</span>
                    <span className="row__tech">{p.technologies.slice(0, 3).join(', ')}</span>
                    <span className="row__toggle" aria-hidden="true" />
                  </summary>
                  <div className="row__body">
                    <ul>
                      {p.description.slice(1).map((d) => <li key={d}>{d}</li>)}
                    </ul>
                    <p className="row__stack">{p.technologies.join(', ')}</p>
                    {p.link && (
                      <a className="link" href={p.link} target="_blank" rel="noopener noreferrer">
                        Visit {p.title}
                      </a>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
