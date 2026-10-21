import Link from 'next/link';
import { ProjectData } from '@/app/types/project';
import SectionHead from './SectionHead';
import ProjectPair from './ProjectPair';

export default function Work({ projects, total }: { projects: ProjectData[]; total: number }) {
  return (
    <section id="work" className="sec" data-spy aria-labelledby="work-title">
      <SectionHead id="work" rail="r" stop={`${total} projects`} title="Things I've built" note="Projects of my own, from idea to a working product." />
      {projects.length === 0 ? (
        <p className="fw sec__empty">Projects are unavailable right now. Please check back later.</p>
      ) : (
        <>
          {projects.map((p, i) => <ProjectPair key={p._id} project={p} index={i} />)}
          <div className="fw work__all">
            <Link className="btn" href="/projects">
              <span className="btn__fill" aria-hidden="true" />
              <span className="btn__label">All {total} projects</span>
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
