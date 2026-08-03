import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { getFeaturedProjects } from '@/app/actions/project.action';
import { ProjectData } from '@/app/types/project';
import SectionHead from './SectionHead';
import Reveal from './fx/Reveal';

const Projects = async () => {
  let projects: ProjectData[] = [];
  let failed = false;
  try {
    projects = await getFeaturedProjects();
  } catch (error) {
    console.error('Failed to load projects:', error);
    failed = true;
  }

  if (failed || projects.length === 0) {
    return (
      <section id="projects" className="py-24 bg-pf-soft">
        <div className="container mx-auto px-6">
          <SectionHead num="03" title="Things I've Built" />
          <p className="text-pf-dim">
            {failed ? 'Projects are unavailable right now. Please check back later.' : 'No projects to show yet.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-pf-soft">
      <div className="container mx-auto px-6">
        <SectionHead num="03" title="Things I've Built" />

        <Reveal className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" stagger={0.1}>
          {projects.map((project) => (
            <article
              key={project._id}
              className="group relative flex flex-col overflow-hidden border border-pf-line/10 bg-pf-card/[0.03] transition-colors duration-500 ease-out hover:border-pf-accent/40 hover:bg-pf-card/[0.06]"
            >
              {/* accent rail wipes in from the left on hover */}
              <span
                aria-hidden
                className="absolute left-0 top-0 z-10 h-full w-px origin-top scale-y-0 bg-pf-accent/70 transition-transform duration-500 ease-out group-hover:scale-y-100 motion-reduce:transition-none"
              />

              <div className="relative h-44 overflow-hidden border-b border-pf-line/10 bg-gradient-to-br from-pf-bg/60 to-pf-accent2/10 p-4">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-contain object-center p-2 drop-shadow-xl"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-mono text-xs text-pf-dim">
                    no image yet
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-pf-text transition-colors duration-300 group-hover:text-pf-accent">
                  {project.title}
                </h3>

                {/* the card teases; /projects carries the full write-up */}
                <p className="mt-3 text-[0.95rem] leading-relaxed text-pf-dim line-clamp-3">
                  {project.description[0]}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="font-mono text-xs px-2.5 py-1 border border-pf-line/15 text-pf-dim transition-colors duration-500 group-hover:border-pf-accent/30 group-hover:text-pf-accent/90"
                      style={{ transitionDelay: `${index * 25}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6 flex gap-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-2 text-sm text-pf-dim hover:text-pf-accent transition-colors"
                      aria-label={`View source of ${project.title}`}
                    >
                      <Github size={17} /> Code
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-2 text-sm text-pf-dim hover:text-pf-accent transition-colors"
                      aria-label={`Visit ${project.title}`}
                    >
                      <ExternalLink size={17} /> Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </Reveal>

        <div className="mt-14 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 border border-pf-line/20 px-7 py-3.5 font-semibold text-pf-text transition-colors duration-300 hover:border-pf-accent hover:text-pf-accent"
          >
            View all projects
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
