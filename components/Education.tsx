import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

const educationData: EducationItem[] = [
  {
    id: 1,
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    institution: 'Sagar Institute of Science and Technology, Bhopal',
    period: '2020 - 2024',
    description: `Graduated with a CGPA of 8.5. Specialized in software development and data structures.Led a team project on building a full-stack web application.`
  },
  {
    id: 2,
    degree: 'Higher Secondary Certificate',
    institution: 'O.P Jindal School, Jharkhand',
    period: '2019',
    description: `Completed with a focus on Physics, Chemistry, and Mathematics. Participated in various science fairs and competitions.`
  },
  {
    id: 3,
    degree: 'Secondary School Certificate',
    institution: 'D.A.V Public School, Jharkhand',
    period: '2017',
    description: `Graduated with a focus on Science and Mathematics. Actively participated in extracurricular activities and sports.`
  }
];

interface SkillGroup {
  category: string;
  skills: string[];
}

const skillsData: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['Flutter', 'React', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS']
  },
  {
    category: 'Backend',
    skills: ['Spring Boot', 'Node.js', 'flask', 'Express.js', 'RESTful APIs']
  },
  {
    category: 'Database',
    skills: ['MySQL', 'Postgress', 'MongoDB', 'SQLite', 'Realm', 'Hive']
  },
  {
    category: 'Tools',
    skills: ['Git', 'Docker', 'AWS', 'Figma', 'Postman']
  },
  {
    category: 'Methodologies',
    skills: ['Agile/Scrum', 'Test-Driven Development', 'CI/CD', 'Responsive Design', 'SEO']
  }
];

const Education: React.FC = () => {
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
              {educationData.map(item => (
                <div key={item.id} className="relative pl-10 border-l border-gray-200 dark:border-gray-600">
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
                        className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm"
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