import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { getEducations } from '@/app/actions/education.action';
import { getSkillGroups } from '@/app/actions/skill.action';
import { defaultEducation, EducationInput } from '@/app/types/education';
import { defaultSkillGroups, SkillGroupInput } from '@/app/types/skill';

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
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Education</h2>
              <p className="text-gray-600 dark:text-gray-300">
                My academic journey and qualifications that have shaped my knowledge and skills.
              </p>
            </div>

            <div className="space-y-10">
              {educationData.map((item, index) => (
                <div key={index} className="relative pl-10 border-l border-black dark:border-white">
                  <div className="absolute top-0 left-0 w-6 h-6 -translate-x-1/2 rounded-full bg-black dark:bg-white flex items-center justify-center">
                    <GraduationCap size={14} className="text-white dark:text-black" />
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-1 text-black dark:text-white">{item.degree}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{item.institution}</p>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Skills</h2>
              <p className="text-gray-600 dark:text-gray-300">
                A comprehensive list of my technical skills and competencies.
              </p>
            </div>

            <div className="space-y-8">
              {skillsData.map((group, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold mb-3 text-black dark:text-white">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-black dark:border-white text-gray-800 dark:text-gray-200 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
