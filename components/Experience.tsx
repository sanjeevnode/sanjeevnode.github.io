import React from 'react';
import { Calendar, MapPin, Code, Building2Icon, Link } from 'lucide-react';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: ProjectsProps[];
}

interface ProjectsProps {
  title: string;
  technologies: string[];
  description: string[];
  link?: string;
}
const experienceData: ExperienceItem[] = [
  {
    id: 1,
    title: 'Software Development Engineer - I',
    company: 'AlignTogether Solutions Pvt. Ltd.',
    location: 'Bhopal, M.P, India',
    period: 'Oct 2024 – Present',
    description: [
      {
        title: 'Fittr Hart',
        technologies: ['Flutter', 'Dart', 'Matrix SDK', 'Bloc', 'Realm', 'Firebase', 'Git'],
        description: [
          'Built responsive mobile UIs using Flutter and Bloc architecture.',
          'Integrated Realm for local data storage and offline features.',
          'Created a full-featured chat module using Matrix SDK.',
          'Implemented messaging with read receipts and media support.',
          'Handled authentication, push notifications, and deep linking.'
        ],
        link: "https://play.google.com/store/apps/details?id=com.squats.fittr_hart&pcampaignid=web_share",
      },
      {
        title: 'Gram Parivartan (Dalmia Bharat)',
        technologies: ['Flutter', 'Provider', 'Hive', 'REST APIs', 'Git', 'Spring Boot', 'MySQL'],
        description: [
          'Created mobile app screens with Flutter and Provider state management.',
          'Integrated RESTful APIs for secure, real-time data interaction.',
          'Used Hive for local storage and managed syncing logic.',
          'Built backend APIs with Spring Boot and MySQL database.',
          'Implemented role-based access and user-centric workflows.'
        ],
        link: "https://play.google.com/store/apps/details?id=com.dalmiabharatfoundation.csr&pcampaignid=web_share",
      },
      {
        title: 'Kubocare',
        technologies: ['Flask', 'React Native', 'MQTT', 'Kafka', 'PostgreSQL', 'Docker', 'Socket.IO', 'Redis'],
        description: [
          'Built cross-platform mobile UI using React Native components.',
          'Designed Flask APIs and managed PostgreSQL data handling.',
          'Used Docker to deploy Kafka and Mosquitto on EC2 servers.',
          'Implemented real-time communication via MQTT and Socket.IO.',
          'Cached and queued live data efficiently using Redis service.'
        ],
        link: "https://kubocare.com/",
      }
    ]
  },
  {
    id: 2,
    title: 'Software Development Engineer Intern',
    company: 'Affirmity Corp',
    location: 'Bhopal MP, India',
    period: 'Dec 2023 - May 2024',
    description: [
      {
        title: 'Drone Feed Analysis',
        technologies: ['Flutter', 'Dart', 'Python', 'OpenCV', 'MySql', 'Elastic Search', 'MTCNN'],
        description: [
          'Created a Flutter desktop app for drone video analysis tasks.',
          'Used OpenCV and MTCNN for object detection and tracking.',
          'Stored real-time event data using MySQL relational schema.',
          'Enabled fast filtering and query using Elastic Search tool.',
          'Built custom UI/UX for navigating drone-based detection.'
        ],
      },
      {
        title: 'Perimeter Security System',
        technologies: ['Flutter', 'Dart', 'Python', 'OpenCV', 'MySql', 'FaceNet', 'YOLOv8'],
        description: [
          'Built a desktop app with face and object recognition in Flutter.',
          'Used YOLOv8 and FaceNet for high-accuracy surveillance.',
          'Managed user data and logs in a MySQL relational database.',
          'Enabled real-time alerts and access control via detection.',
          'Designed interfaces for administrators to view live feed.'
        ],
      },
      {
        title: 'Affirmity Corp Website',
        technologies: ['React', 'Node.js', 'Express', 'MySql', 'Tailwind', 'Framer Motion', 'GSAP'],
        description: [
          'Developed responsive website UI using React and Tailwind CSS.',
          'Added dynamic animations with GSAP and Framer Motion APIs.',
          'Implemented backend using Express and Node.js services.',
          'Managed contact forms and CMS data using MySQL backend.',
          'Optimized web performance and SEO using modern practices.'
        ],
        link: 'https://affirmity.in/',
      }
    ]
  },
];

const Experience: React.FC = () => {
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
          {experienceData.map((job) => (
            <div key={job.id} className="relative p-6">
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
                {job.description.map((project, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
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
                        >
                          <Link className='text-blue-950 hover:text-blue-900 transition-colors' size={24} />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Connector between jobs */}
              {/* {job.id < experienceData.length && (
                <div className="flex justify-center my-12">
                  <div className="w-px h-16 bg-gray-200 dark:bg-gray-700"></div>
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;