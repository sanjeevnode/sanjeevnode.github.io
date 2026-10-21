import type { Metadata } from 'next';
import { getProjects } from '@/app/actions/project.action';
import { ProjectData } from '@/app/types/project';
import Wire from '@/components/site/Wire';
import ProjectPair from '@/components/site/ProjectPair';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Projects | Sanjeev Singh',
  description:
    'Every project Sanjeev Singh has built: full-stack web apps, zero-knowledge cryptography, identity platforms and developer tools in Next.js, FastAPI and Flutter.',
  alternates: { canonical: '/projects' },
};

export default async function ProjectsPage() {
  let projects: ProjectData[] = [];
  let failed = false;
  try {
    projects = await getProjects();
  } catch (error) {
    console.error('Failed to load projects:', error);
    failed = true;
  }

  return (
    <div className="wire-host" data-wire-host>
      <Wire />
      <header className="page-head fw">
        <span className="wire-pt wire-pt--r wire-pt--edge wire-pt--head" data-wire="node" />
        <p className="page-head__kicker" data-reveal="fade" data-intro>
          <a className="link" href="/#work">Back to the homepage</a>
        </p>
        <h1 className="page-head__title">Everything I&apos;ve built</h1>
        <p className="page-head__count tabular" data-reveal="fade" data-intro data-delay="0.3">
          {failed ? 'Projects are unavailable right now. Please check back later.' : `${projects.length} projects, newest first`}
        </p>
      </header>
      {projects.map((p, i) => <ProjectPair key={p._id} project={p} index={i} full level="h2" lead={i === 0} />)}
      <span className="wire-pt wire-pt--r wire-pt--end" data-wire="node" />
    </div>
  );
}
