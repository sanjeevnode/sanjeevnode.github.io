import Image from 'next/image';
import { ProjectData } from '@/app/types/project';

// One project as an asymmetric pair: image on 6 to 7 columns, text on 3 to 4, sides alternating.
// `full` shows every bullet (the /projects page); the homepage teases with the first.
export default function ProjectPair({ project, index, full = false, level: Title = 'h3', lead = false }: { project: ProjectData; index: number; full?: boolean; level?: 'h2' | 'h3'; lead?: boolean }) {
  const href = project.link || project.github;
  const flip = index % 2 === 1;
  const bullets = full ? project.description : project.description.slice(0, 1);

  const media = (
    <div className="pair__frame">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screens`}
          fill
          sizes="(max-width: 767px) 100vw, 55vw"
          priority={lead}
          className="pair__img"
        />
      ) : (
        <span className="pair__empty" aria-hidden="true">{project.title}</span>
      )}
      {href && <span className="pair__open" aria-hidden="true">{'Open ↗︎'}</span>}
    </div>
  );

  return (
    <article className={`pair fw${flip ? ' pair--flip' : ''}`}>
      <span className="wire-pt wire-pt--r wire-pt--first" data-wire="node" />
      <figure className="pair__media" data-reveal={lead ? undefined : 'clip'}>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} tabIndex={-1}>
            {media}
          </a>
        ) : media}
      </figure>
      <div className="pair__text">
        <Title className="pair__title" data-split="lines">{project.title}</Title>
        <ul className="pair__points" data-reveal="up">
          {bullets.map((d) => <li key={d}>{d}</li>)}
        </ul>
        <p className="pair__tags" data-reveal="fade">{project.tags.join(', ')}</p>
        <p className="pair__links" data-reveal="fade">
          {project.link && (
            <a className="link" href={project.link} target="_blank" rel="noopener noreferrer">Live site</a>
          )}
          {project.github && (
            <a className="link" href={project.github} target="_blank" rel="noopener noreferrer">Source</a>
          )}
        </p>
      </div>
    </article>
  );
}
