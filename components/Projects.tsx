'use client'
import React, { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { ProjectData } from '@/app/types/project';
import { getProjects } from '@/app/actions/project.action';

const Projects: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectData[]>([]);

  const [filter, setFilter] = useState<string>('all');

  const allTags = ['all', ...Array.from(new Set(projectData.flatMap(project => project.tags)))];

  const filteredProjects = filter === 'all'
    ? projectData
    : projectData.filter(project => project.tags.includes(filter));

  async function getProjectsData() {
    const projects = await getProjects()
    setProjectData(projects)
  }

  // Fetch project list from the server
  useEffect(() => {
    getProjectsData()
  }, [])


  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A selection of my recent work, showcasing my skills and experience in software development.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-1.5 text-sm capitalize transition-colors ${filter === tag
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project._id}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-700"
            >
              <div className="aspect-video relative overflow-hidden m-2">
                {
                  project.image?.data && project.image?.contentType ? (
                    <Image
                      src={`data:${project.image.contentType};base64,${project.image.data}`}
                      alt={project.title}
                      fill
                      className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700'>
                      <p className='text-gray-500 dark:text-gray-300'>No Image Available</p>
                    </div>
                  )
                }

              </div>

              <div className="p-6">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-black dark:text-white">{project.title}</h3>

                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        aria-label="View GitHub repository"
                      >
                        <Github size={18} />
                      </a>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        aria-label="View live site"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-5">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;