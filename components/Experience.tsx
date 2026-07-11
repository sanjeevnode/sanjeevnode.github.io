import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { getExperiences } from '@/app/actions/experience.action';
import { defaultExperience, ExperienceInput } from '@/app/types/experience';
import SectionHead from './SectionHead';
import Reveal from './fx/Reveal';
import DrawLine from './fx/DrawLine';

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
              {/* job header */}
              <Reveal className="grid md:grid-cols-12 gap-2 md:gap-6 items-baseline">
                <p className="md:col-span-3 font-mono text-sm text-pf-accent">{job.period}</p>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl md:text-4xl font-semibold text-pf-text">
                    {job.company}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-pf-dim text-sm">
                    <span className="text-pf-accent2 font-medium">{job.title}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>
                  </div>
                </div>
              </Reveal>

              {/* work areas as editorial rows */}
              <div className="mt-10">
                {job.projects.map((project, idx) => (
                  <Reveal
                    key={idx}
                    className="group relative grid md:grid-cols-12 gap-4 md:gap-6 py-8 transition-colors duration-300 hover:bg-pf-card/[0.02]"
                    stagger={0.1}
                  >
                    <DrawLine className="absolute top-0 left-0 h-px w-full bg-pf-line/10" delay={0.06 * idx} />

                    <div className="md:col-span-3 md:col-start-1">
                      <span className="font-mono text-sm text-pf-dim">{String(idx + 1).padStart(2, '0')}</span>
                    </div>

                    <div className="md:col-span-4 md:col-start-4 md:-mt-1">
                      <h4 className="font-display text-2xl md:text-3xl font-semibold text-pf-text transition-colors duration-300 group-hover:text-pf-accent flex items-start gap-2">
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
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="font-mono text-sm text-pf-dim border border-pf-line/15 px-3.5 py-1.5 transition-colors group-hover:border-pf-accent/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ul className="md:col-span-5 md:col-start-8 space-y-2.5 text-pf-dim text-base leading-relaxed">
                      {project.description.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-start">
                          <span className="mr-2 text-pf-accent mt-0.5">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
                <DrawLine className="h-px w-full bg-pf-line/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
