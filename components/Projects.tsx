import React from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { getProjects } from '@/app/actions/project.action';
import { ProjectData } from '@/app/types/project';
import SectionHead from './SectionHead';
import Reveal from './fx/Reveal';
import HorizontalScroll from './fx/HorizontalScroll';

const Projects = async () => {
  let projects: ProjectData[] = [];
  let failed = false;
  try {
    projects = await getProjects();
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
    <div id="projects" className="bg-pf-soft">
      <HorizontalScroll
        direction="ltr"
        header={
          <div className="container mx-auto px-6 pt-24 pb-4">
            <SectionHead num="03" title="Things I've Built" />
          </div>
        }
      >
        {projects.map((project) => (
          <div key={project._id} className="shrink-0 w-full lg:w-screen lg:h-full flex items-start lg:items-center pb-16 lg:pb-0 lg:border-l lg:border-pf-line/10">
            <div className="container mx-auto px-6 w-full">
              <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center" stagger={0.15}>
                {/* image */}
                <div className="lg:col-span-7">
                  <div className="group relative h-[42vh] lg:h-[62vh] overflow-hidden border border-pf-line/10 bg-gradient-to-br from-pf-bg/60 to-pf-accent2/10 p-4 md:p-8">
                    {project.image ? (
                      <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-[1.02]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-contain object-center drop-shadow-2xl"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-sm text-pf-dim">
                        no image yet
                      </div>
                    )}
                  </div>
                </div>

                {/* meta */}
                <div className="lg:col-span-5">
                  <h3 className="font-display text-4xl md:text-6xl font-semibold text-pf-text">{project.title}</h3>

                  <ul className="mt-7 space-y-3.5 text-pf-dim text-base md:text-lg leading-relaxed">
                    {project.description.map((line, li) => (
                      <li key={li} className="flex items-start">
                        <span className="mr-3 text-pf-accent mt-1">▹</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                        className="font-mono text-sm text-pf-accent bg-pf-accent/10 border border-pf-accent/20 px-3.5 py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-7">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-2 text-base text-pf-dim hover:text-pf-accent transition-colors"
                        aria-label="View GitHub repository"
                      >
                        <Github size={19} /> Code
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-2 text-base text-pf-dim hover:text-pf-accent transition-colors"
                        aria-label="View live site"
                      >
                        <ExternalLink size={19} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
};

export default Projects;
