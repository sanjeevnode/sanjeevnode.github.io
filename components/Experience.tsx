import React from 'react';
import { Calendar, MapPin, Code } from 'lucide-react';

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
          'Developed modern, responsive UI using Flutter.',
          'Integrated Realm Database for local storage and offline functionality.',
          'Developed a full-featured chat module with essential messaging features.',
          'Integrated Matrix SDK for real-time messaging.'
        ]
      },
      {
        title: 'Gram Parivartan (Dalmia Bharat)',
        technologies: ['Flutter', 'Provider', 'Hive', 'REST APIs', 'Git', 'Spring Boot', 'MySQL'],
        description: [
          'Created multiple responsive UI screens using Flutter.',
          'Integrated REST APIs for data retrieval and synchronization.',
          'Set up Hive Database for offline data storage and implemented sync functionality.',
          'Used Provider for efficient state management.',
          'Designed and developed RESTful APIs using Spring Boot and MySQL to support mobile app features.'
        ]
      },
      {
        title: 'Kubocare',
        technologies: ['Flask', 'React Native', 'MQTT', 'Kafka', 'PostgreSQL', 'Docker', 'Socket.IO', 'Redis'],
        description: [
          'Developed modern UI using React Native.',
          'Developed Flask-based backend with PostgreSQL for data handling.',
          'Set up and managed Kafka and Mosquitto servers using Docker on AWS EC2 for handling MQTT device communication.',
          'Used Socket.IO for real-time concurrent connections.',
          'Configured Redis for temporary data storage and caching.'
        ]
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
          "Developed a Flutter desktop application for drone feed analysis using computer vision.",
          "Implemented real-time object detection and tracking using OpenCV and MTCNN.",
          "Integrated MySQL database for data storage and user management.",
          "Utilized Elastic Search for efficient data retrieval and search capabilities."
        ],
      },
      {
        title: 'Perimeter Security System',
        technologies: ['Flutter', 'Dart', 'Python', 'OpenCV', 'MySql', 'FaceNet', 'YOLOv8'],
        description: [
          "Developeed flutter desktop application for perimeter security system using face recognition and object detection.",
          "Implemented real-time face recognition and object detection using YOLOv8 and FaceNet.",
          "Integrated MySQL database for user management and data storage.",
        ],
      },
      {
        title: 'Affirmity Corp Website',
        technologies: ['React', 'Node.js', 'Express', 'MySql', 'Tailwind', 'Framer Motion', 'GSAP'],
        description: [
          "Developed a responsive and interactive website for Affirmity Corp using React and Tailwind CSS.",
          "Implemented smooth animations and transitions using Framer Motion and GSAP.",
          "Integrated backend services with Node.js and Express, connecting to MySQL for data management.",
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
            <div key={job.id} className="relative bg-white dark:bg-gray-900 p-6">
              {/* Company Header */}

              <div className="flex flex-col gap-1 mb-8">
                <h3 className="text-2xl font-bold text-black dark:text-white">{job.company}</h3>
                <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400">{job.title}</h4>
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
                    className="p-6 bg-gray-50 dark:bg-gray-800"
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
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-black dark:text-white hover:underline
                                 text-sm font-medium group"
                      >
                        View Project
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
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