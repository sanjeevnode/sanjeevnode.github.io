import React from 'react';
import { Calendar, MapPin, Code, Building2Icon, Link } from 'lucide-react';
import { getExperiences } from '@/app/actions/experience.action';
import { defaultExperience, ExperienceInput } from '@/app/types/experience';

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
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-black dark:text-white">Work Experience</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A chronological journey through my professional career, highlighting key roles and achievements.
          </p>
        </div>

        <div className="space-y-16  mx-auto">
          {experienceData.map((job, jobIdx) => (
            <div key={jobIdx} className="relative p-6">
              {/* Company Header */}

              <div className="flex flex-col gap-1 mb-8">
                <div className='flex justify-start items-start gap-x-2'>
                  <Building2Icon className='md:w-8 md:h-8 w-6 h-6' />
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white">{job.company}</h3>
                </div>
                <h4 className="md:text-lg font-medium text-gray-600 dark:text-gray-400">{job.title}</h4>
                <div className="flex gap-6  text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{job.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {job.projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white dark:bg-gray-900 border border-black dark:border-white"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <Code size={20} className="text-black dark:text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-black dark:text-white">{project.title}</h4>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="text-xs font-medium text-black dark:text-white px-3 py-1.5
                                   bg-gray-100 dark:bg-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-4">
                      {project.description.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-start">
                          <span className="mr-2 text-black dark:text-white mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {project.link && (
                      <div className='flex justify-end items-end'>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-black dark:text-white hover:underline
                                 text-sm font-medium group"
                          aria-label={`Visit ${project.title}`}
                        >
                          <Link className='text-blue-950 hover:text-blue-900 transition-colors' size={24} />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
