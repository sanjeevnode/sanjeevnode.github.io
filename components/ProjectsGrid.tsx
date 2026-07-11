'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { ProjectData } from '@/app/types/project';
import gsap from 'gsap';

const ProjectsGrid: React.FC<{ projects: ProjectData[] }> = ({ projects }) => {
  const [filter, setFilter] = useState<string>('all');
  const listRef = useRef<HTMLDivElement>(null);

  const allTags = useMemo(() => {
    const uniqueTags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => uniqueTags.add(tag.toLowerCase()));
    });
    return ['all', ...Array.from(uniqueTags).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter(project =>
      project.tags.some(tag => tag.toLowerCase() === filter.toLowerCase())
    );
  }, [projects, filter]);

  // reveal per panel (IntersectionObserver)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const panels = el.querySelectorAll('.proj-panel');
    gsap.set(panels, { y: 60, opacity: 0 });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    panels.forEach((p) => io.observe(p));

    return () => io.disconnect();
  }, [filteredProjects]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-16">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-1.5 text-xs font-mono capitalize border transition-colors ${filter.toLowerCase() === tag.toLowerCase()
              ? 'bg-pf-accent text-pf-bg border-pf-accent'
              : 'border-pf-line/15 text-pf-dim hover:border-pf-accent/50 hover:text-pf-accent'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div ref={listRef} className="space-y-24">
        {filteredProjects.map((project, i) => (
          <article
            key={project._id}
            className={`proj-panel grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${i % 2 ? 'lg:[direction:rtl]' : ''}`}
          >
            {/* image */}
            <div className="lg:col-span-7 [direction:ltr]">
              <div className="group relative aspect-video overflow-hidden border border-pf-line/10 bg-gradient-to-br from-pf-soft to-pf-accent2/10 p-4 md:p-6">
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
            <div className="lg:col-span-5 [direction:ltr]">
              <p className="font-mono text-xs text-pf-accent mb-2">{String(i + 1).padStart(2, '0')} / project</p>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-pf-text">{project.title}</h3>

              <ul className="mt-5 space-y-2 text-pf-dim text-sm leading-relaxed">
                {project.description.map((line, li) => (
                  <li key={li} className="flex items-start">
                    <span className="mr-2 text-pf-accent mt-0.5">▹</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="font-mono text-[11px] text-pf-accent bg-pf-accent/10 border border-pf-accent/20 px-2.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-pf-dim hover:text-pf-accent transition-colors"
                    aria-label="View GitHub repository"
                  >
                    <Github size={17} /> Code
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-pf-dim hover:text-pf-accent transition-colors"
                    aria-label="View live site"
                  >
                    <ExternalLink size={17} /> Live
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default ProjectsGrid;
