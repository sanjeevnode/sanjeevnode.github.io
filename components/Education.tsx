import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { getEducations } from '@/app/actions/education.action';
import { defaultEducation, EducationInput } from '@/app/types/education';
import SectionHead from './SectionHead';
import Reveal from './fx/Reveal';
import DrawLine from './fx/DrawLine';

const Education = async () => {
  // Fall back to the built-in content until the DB collection is seeded
  let educationData: EducationInput[] = defaultEducation;
  try {
    const fromDb = await getEducations();
    if (fromDb.length > 0) educationData = fromDb;
  } catch (error) {
    console.error('Failed to load education, using defaults:', error);
  }

  return (
    <section id="education" className="py-24 bg-pf-soft">
      <div className="container mx-auto px-6">
        <SectionHead num="05" title="Education" sub="My academic journey and qualifications that have shaped my knowledge and skills." />

        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15}>
          {educationData.map((item, index) => (
            <div
              key={index}
              className="group relative border border-pf-line/10 bg-pf-card/[0.03] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-pf-accent/40"
            >
              {/* accent line draws across the card top */}
              <DrawLine className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-pf-accent to-pf-accent2" delay={0.15 * index} />

              <div className="flex items-center justify-between mb-5">
                <span className="w-10 h-10 border border-pf-accent/40 flex items-center justify-center text-pf-accent">
                  <GraduationCap size={18} />
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-pf-accent">
                  <Calendar size={13} />
                  {item.period}
                </span>
              </div>

              <h3 className="font-display text-xl font-semibold mb-1 text-pf-text">{item.degree}</h3>
              <p className="text-pf-accent2 text-sm mb-4">{item.institution}</p>
              <p className="text-pf-dim text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Education;
