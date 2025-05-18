import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    period: 'Jan 2022 - Present',
    description: [
      'Led development of the company\'s flagship product, improving performance by 40%',
      'Mentored junior developers and conducted code reviews to ensure quality standards',
      'Implemented CI/CD pipeline, reducing deployment time by 60%',
      'Collaborated with design team to create an accessible and responsive user interface'
    ]
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Digital Innovations',
    location: 'New York, NY',
    period: 'Mar 2019 - Dec 2021',
    description: [
      'Developed and maintained client websites using React, TypeScript, and Tailwind CSS',
      'Created reusable component library that increased development efficiency by 30%',
      'Collaborated with cross-functional teams to deliver projects on time and within budget',
      'Optimized web applications for maximum speed and scalability'
    ]
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Boston, MA',
    period: 'Jun 2017 - Feb 2019',
    description: [
      'Designed user interfaces for web and mobile applications',
      'Conducted user research and usability testing to improve product design',
      'Created wireframes, mockups, and prototypes using Figma and Adobe XD',
      'Collaborated with developers to ensure design implementation accuracy'
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Work Experience</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A chronological journey through my professional career, highlighting key roles and achievements.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {experienceData.map((job, index) => (
            <div key={job.id} className="mb-12 relative">
              {/* Timeline connector */}
              {index < experienceData.length - 1 && (
                <div className="absolute top-12 bottom-0 left-4 md:left-[1.75rem] w-px bg-gray-300 dark:bg-gray-600 -z-10"></div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex md:flex-col items-center md:items-start gap-4 md:w-40 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white dark:bg-black rounded-full"></div>
                  </div>
                  <div className="md:mt-2">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar size={14} />
                      <span>{job.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin size={14} />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex-1">
                  <h3 className="text-xl font-bold mb-1 text-black dark:text-white">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{job.company}</p>
                  
                  <ul className="space-y-2">
                    {job.description.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-black dark:text-white mt-1.5">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;