import React from 'react';
import { getSkillGroups } from '@/app/actions/skill.action';
import { defaultSkillGroups, SkillGroupInput } from '@/app/types/skill';
import SectionHead from './SectionHead';
import Reveal from './fx/Reveal';
import DrawLine from './fx/DrawLine';

const Skills = async () => {
  let skillsData: SkillGroupInput[] = defaultSkillGroups;
  try {
    const fromDb = await getSkillGroups();
    if (fromDb.length > 0) skillsData = fromDb;
  } catch (error) {
    console.error('Failed to load skills, using defaults:', error);
  }

  return (
    <section id="skills" className="py-24 bg-pf-bg">
      <div className="container mx-auto px-6">
        <SectionHead num="04" title="Skills" sub="A comprehensive list of my technical skills and competencies." />

        <Reveal stagger={0.1}>
          {skillsData.map((group, index) => (
            <div
              key={index}
              className="group relative grid md:grid-cols-12 gap-3 md:gap-6 py-7 items-baseline transition-colors hover:bg-pf-card/[0.02]"
            >
              <DrawLine className="absolute bottom-0 left-0 h-px w-full bg-pf-line/10" delay={0.08 * index} />
              <div className="md:col-span-4 flex items-baseline gap-4">
                <span className="font-mono text-sm text-pf-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-pf-text transition-colors group-hover:text-pf-accent">
                  {group.category}
                </h3>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {group.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs px-3 py-1.5 border border-pf-line/15 text-pf-dim bg-pf-card/[0.03] transition-colors hover:border-pf-accent/50 hover:text-pf-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
