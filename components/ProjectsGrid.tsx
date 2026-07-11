'use client'
import React, { useMemo, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { ProjectData } from '@/app/types/project';

const ProjectsGrid: React.FC<{ projects: ProjectData[] }> = ({ projects }) => {
  const [filter, setFilter] = useState<string>('all');

  const allTags = useMemo(() => {
    const uniqueTags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => uniqueTags.add(tag.toLowerCase()));
    });
    return ['all', ...Array.from(uniqueTags).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter(project =>
      project.tags.some(tag => tag.toLowerCase() === filter.toLowerCase())
    );
  }, [projects, filter]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-1.5 text-sm capitalize transition-colors ${filter.toLowerCase() === tag.toLowerCase()
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
            className="group bg-white dark:bg-gray-800 border border-black dark:border-white overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-700"
          >
            <div className="aspect-video relative overflow-hidden m-2">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700'>
                  <p className='text-gray-500 dark:text-gray-300'>No Image Available</p>
                </div>
              )}
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

              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-5">
                {project.description.map((line, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-black dark:text-white mt-1">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
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
    </>
  );
};

export default ProjectsGrid;
