import React from 'react';
import { getProjects } from '@/app/actions/project.action';
import { ProjectData } from '@/app/types/project';
import ProjectsGrid from './ProjectsGrid';

const Projects = async () => {
  let projects: ProjectData[] = [];
  let failed = false;
  try {
    projects = await getProjects();
  } catch (error) {
    console.error('Failed to load projects:', error);
    failed = true;
  }

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A selection of my recent work, showcasing my skills and experience in software development.
          </p>
        </div>

        {failed ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Projects are unavailable right now. Please check back later.
          </p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No projects to show yet.
          </p>
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </div>
    </section>
  );
};

export default Projects;
