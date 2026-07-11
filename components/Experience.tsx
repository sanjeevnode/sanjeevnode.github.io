import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { getExperiences } from '@/app/actions/experience.action';
import { defaultExperience, ExperienceInput } from '@/app/types/experience';
import SectionHead from './SectionHead';
import Reveal from './fx/Reveal';
import HorizontalScroll from './fx/HorizontalScroll';

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
    <div id="experience" className="bg-pf-bg">
      <HorizontalScroll
        direction="ltr"
        header={
          <div className="container mx-auto px-6 pt-24 pb-4">
            <SectionHead num="02" title="Where I've Worked" />
          </div>
        }
      >
        {experienceData.map((job, jobIdx) => (
          <div key={jobIdx} className="shrink-0 w-full lg:w-screen lg:h-full flex items-start pb-16 lg:pb-0 lg:border-l lg:border-pf-line/10">
            <div className="container mx-auto px-6 w-full lg:pt-6">
              {/* company header */}
              <Reveal>
                <h3 className="font-display text-4xl md:text-5xl font-semibold text-pf-text">{job.company}</h3>
              </Reveal>
              <Reveal className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-base">
                <span className="text-pf-accent2 font-medium">{job.title}</span>
                <span className="font-mono text-sm text-pf-accent">{job.period}</span>
                <span className="flex items-center gap-1.5 text-pf-dim"><MapPin size={14} />{job.location}</span>
              </Reveal>

              {/* work areas - top highlights only, kept light */}
              <Reveal className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10" stagger={0.12}>
                {job.projects.map((project, idx) => (
                  <div key={idx} className="group border-t-2 border-pf-line/15 pt-6 transition-colors hover:border-pf-accent/50">
                    <h4 className="font-display text-2xl font-semibold text-pf-text transition-colors duration-300 group-hover:text-pf-accent flex items-start gap-2">
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
                    <p className="mt-3 font-mono text-sm text-pf-accent leading-relaxed">
                      {project.technologies.join(' · ')}
                    </p>
                    <ul className="mt-5 space-y-3 text-pf-dim text-base leading-relaxed">
                      {project.description.slice(0, 4).map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-start">
                          <span className="mr-2.5 text-pf-accent mt-1">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
};

export default Experience;
