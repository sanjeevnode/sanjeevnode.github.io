'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { ProjectData } from '@/app/types/project';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  // reveal (IntersectionObserver) + image parallax (ScrollTrigger scrub) per panel
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

    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        const img = panel.querySelector('.proj-img');
        if (img) {
          gsap.fromTo(img, { yPercent: -8 }, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        }
      });
      ScrollTrigger.refresh();
    }, el);

    return () => { io.disconnect(); ctx.revert(); };
  }, [filteredProjects]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-16">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-1.5 text-xs font-mono capitalize rounded-full border transition-colors ${filter.toLowerCase() === tag.toLowerCase()
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
              <div className="group relative aspect-video overflow-hidden rounded-2xl border border-pf-line/10 bg-pf-soft">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="proj-img object-cover object-center scale-110 transition-transform duration-700 group-hover:scale-[1.15]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-sm text-pf-dim">
                    no image yet
                  </div>
                )}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-pf-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                    className="font-mono text-[11px] text-pf-accent bg-pf-accent/10 border border-pf-accent/20 px-2.5 py-0.5 rounded-full"
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
