import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { getExperiences } from '@/app/actions/experience.action';
import { defaultExperience, ExperienceInput, ExperienceProject } from '@/app/types/experience';
import SectionHead from './SectionHead';
import Reveal from './fx/Reveal';
import DrawLine from './fx/DrawLine';

// Only flagged systems reach the homepage. Nothing flagged (older DB docs) ->
// show the first six so the section is never empty.
function featuredOf(systems: ExperienceProject[]): ExperienceProject[] {
  const flagged = systems.filter((s) => s.featured);
  return flagged.length > 0 ? flagged : systems.slice(0, 6);
}

const Experience = async () => {
  // Fall back to the built-in content until the DB collection is seeded
  let experienceData: ExperienceInput[] = defaultExperience;
  try {
    const fromDb = await getExperiences();
    if (fromDb.length > 0) experienceData = fromDb;
  } catch (error) {
    console.error('Failed to load experiences, using defaults:', error);
  }

  return (
    <section id="experience" className="py-24 bg-pf-bg">
      <div className="container mx-auto px-6">
        <SectionHead num="02" title="Where I've Worked" />

        <div className="space-y-24">
          {experienceData.map((job, jobIdx) => (
            <div key={jobIdx}>
              {/* company header */}
              <Reveal>
                <h3 className="font-display text-3xl md:text-4xl font-semibold text-pf-text">{job.company}</h3>
              </Reveal>
              <Reveal className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-base">
                <span className="text-pf-accent2 font-medium">{job.title}</span>
                <span className="font-mono text-sm text-pf-accent">{job.period}</span>
                <span className="flex items-center gap-1.5 text-pf-dim"><MapPin size={14} />{job.location}</span>
              </Reveal>

              <DrawLine className="mt-8 h-px w-full bg-gradient-to-r from-pf-accent/40 via-pf-line/15 to-transparent" />

              {/* systems built, one card each */}
              <Reveal className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" stagger={0.08}>
                {featuredOf(job.projects).map((project, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col overflow-hidden border border-pf-line/10 bg-pf-card/[0.03] p-6 transition-colors duration-500 ease-out hover:border-pf-accent/40 hover:bg-pf-card/[0.06]"
                  >
                    {/* accent rail wipes in from the left on hover */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-pf-accent/70 transition-transform duration-500 ease-out group-hover:scale-y-100 motion-reduce:transition-none"
                    />

                    <span className="font-mono text-xs text-pf-dim/50 transition-colors duration-500 group-hover:text-pf-accent">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <h4 className="mt-3 font-display text-xl font-semibold text-pf-text transition-colors duration-300 group-hover:text-pf-accent flex items-start gap-2">
                      {project.title}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pf-dim hover:text-pf-accent transition-colors"
                          aria-label={`Visit ${project.title}`}
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </h4>

                    <ul className="mt-5 space-y-2.5 text-pf-dim text-[0.95rem] leading-relaxed">
                      {project.description.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-start">
                          <span className="mr-2.5 text-pf-accent mt-1 shrink-0">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="font-mono text-xs px-2.5 py-1 border border-pf-line/15 text-pf-dim transition-colors duration-500 group-hover:border-pf-accent/30 group-hover:text-pf-accent/90"
                          style={{ transitionDelay: `${techIdx * 25}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
