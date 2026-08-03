import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjects } from '@/app/actions/project.action';
import { ProjectData } from '@/app/types/project';
import ProjectShowcase from '@/components/ProjectShowcase';
import SectionHead from '@/components/SectionHead';
import Cursor from '@/components/fx/Cursor';
import SmoothScroll from '@/components/fx/SmoothScroll';
import Footer from '@/components/Footer';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Projects | Sanjeev Singh',
  description:
    'Every project I have built — full-stack web apps, zero-knowledge cryptography, identity platforms, and developer tooling built with Next.js, FastAPI, and Flutter.',
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

  const header = (
    <div className="container mx-auto px-6 pt-10 pb-2">
      <Link
        href="/#projects"
        className="group mb-5 inline-flex items-center gap-2 font-mono text-sm text-pf-dim transition-colors hover:text-pf-accent"
      >
        <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
        back home
      </Link>
      {/* SectionHead carries mb-14; pull it back so the panels sit closer */}
      <div className="-mb-10">
        <SectionHead num="03" title="Everything I've Built" />
      </div>
    </div>
  );

  if (failed || projects.length === 0) {
    return (
      <div className="min-h-screen bg-pf-soft font-sans">
        <SmoothScroll />
        <Cursor />
        <main className="container mx-auto px-6 py-32">
          {header}
          <p className="text-pf-dim">
            {failed ? 'Projects are unavailable right now. Please check back later.' : 'No projects to show yet.'}
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pf-soft font-sans">
      <SmoothScroll />
      <Cursor />
      <main>
        <ProjectShowcase projects={projects} header={header} />
      </main>
      <Footer />
    </div>
  );
}
