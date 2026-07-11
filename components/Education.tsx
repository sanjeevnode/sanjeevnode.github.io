import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { getEducations } from '@/app/actions/education.action';
import { getSkillGroups } from '@/app/actions/skill.action';
import { defaultEducation, EducationInput } from '@/app/types/education';
import { defaultSkillGroups, SkillGroupInput } from '@/app/types/skill';
import SectionHead from './SectionHead';
import Reveal from './fx/Reveal';

const Education = async () => {
  // Fall back to the built-in content until the DB collections are seeded
  let educationData: EducationInput[] = defaultEducation;
  let skillsData: SkillGroupInput[] = defaultSkillGroups;
  try {
    const [eduFromDb, skillsFromDb] = await Promise.all([
      getEducations(),
      getSkillGroups(),
    ]);
    if (eduFromDb.length > 0) educationData = eduFromDb;
    if (skillsFromDb.length > 0) skillsData = skillsFromDb;
  } catch (error) {
    console.error('Failed to load education/skills, using defaults:', error);
  }

  return (
    <section id="education" className="py-24 bg-pf-bg">
      <div className="container mx-auto px-6">
        <SectionHead num="04" title="Education & Skills" />

        <div className="grid md:grid-cols-2 gap-14">
          {/* Education timeline */}
          <Reveal className="space-y-10" stagger={0.15}>
            {educationData.map((item, index) => (
              <div key={index} className="relative pl-10 border-l border-pf-line/15">
                <div className="absolute top-0 left-0 w-7 h-7 -translate-x-1/2 rounded-full bg-pf-bg border border-pf-accent/50 flex items-center justify-center shadow-[0_0_12px_rgb(var(--pf-accent)/0.3)]">
                  <GraduationCap size={13} className="text-pf-accent" />
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-pf-accent mb-2">
                  <Calendar size={13} />
                  <span>{item.period}</span>
                </div>

                <h3 className="font-display text-xl font-semibold mb-1 text-pf-text">{item.degree}</h3>
                <p className="text-pf-accent2 text-sm mb-3">{item.institution}</p>
                <p className="text-pf-dim text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </Reveal>

          {/* Skills */}
          <Reveal className="space-y-8" stagger={0.1}>
            {skillsData.map((group, index) => (
              <div key={index}>
                <h3 className="font-display text-lg font-semibold mb-3 text-pf-text">
                  <span className="font-mono text-pf-accent text-sm mr-2">{String(index + 1).padStart(2, '0')}</span>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs px-3 py-1.5 rounded-full border border-pf-line/15 text-pf-dim bg-pf-card/[0.03] transition-colors hover:border-pf-accent/50 hover:text-pf-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Education;
