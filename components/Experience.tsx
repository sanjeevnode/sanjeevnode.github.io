import React from 'react';
import { Calendar, MapPin, Code, Link as LinkIcon } from 'lucide-react';
import { getExperiences } from '@/app/actions/experience.action';
import { defaultExperience, ExperienceInput } from '@/app/types/experience';
import SectionHead from './SectionHead';
import Reveal from './fx/Reveal';

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

        {/* timeline */}
        <div className="relative pl-8 md:pl-10">
          <div aria-hidden className="absolute left-1.5 md:left-2 top-2 bottom-2 w-px bg-gradient-to-b from-pf-accent via-pf-accent2 to-transparent opacity-40" />

          <div className="space-y-20">
            {experienceData.map((job, jobIdx) => (
              <div key={jobIdx} className="relative">
                <span aria-hidden className="absolute -left-8 md:-left-10 top-1.5 w-3.5 h-3.5 rounded-full bg-pf-bg border-2 border-pf-accent shadow-[0_0_12px_rgb(var(--pf-accent)/0.4)]" />

                <Reveal>
                  <p className="font-mono text-sm text-pf-accent">{job.period}</p>
                  <h3 className="mt-1 font-display text-2xl md:text-3xl font-semibold text-pf-text">
                    {job.title} <span className="text-pf-accent2">· {job.company}</span>
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-pf-dim text-sm">
                    <MapPin size={15} />
                    <span>{job.location}</span>
                    <Calendar size={15} className="ml-4" />
                    <span>{job.period}</span>
                  </div>
                </Reveal>

                <Reveal className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.12}>
                  {job.projects.map((project, idx) => (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-pf-line/10 bg-pf-card/[0.03] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-pf-accent/40 hover:shadow-[0_18px_40px_rgb(0_0_0/0.35)]"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Code size={18} className="text-pf-accent" />
                        <h4 className="font-display text-lg font-semibold text-pf-text">{project.title}</h4>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="font-mono text-[11px] text-pf-accent bg-pf-accent/10 border border-pf-accent/20 px-2.5 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <ul className="space-y-2 text-pf-dim text-sm">
                        {project.description.map((point, pointIdx) => (
                          <li key={pointIdx} className="flex items-start">
                            <span className="mr-2 text-pf-accent mt-0.5">▹</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {project.link && (
                        <div className="mt-4 flex justify-end">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pf-dim hover:text-pf-accent transition-colors"
                            aria-label={`Visit ${project.title}`}
                          >
                            <LinkIcon size={18} />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
