import React from 'react';
import { getProjects } from '@/app/actions/project.action';
import { ProjectData } from '@/app/types/project';
import ProjectsGrid from './ProjectsGrid';
import SectionHead from './SectionHead';

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
    <section id="projects" className="py-24 bg-pf-soft">
      <div className="container mx-auto px-6">
        <SectionHead
          num="03"
          title="Things I've Built"
          sub="A selection of my recent work, showcasing my skills and experience in software development."
        />

        {failed ? (
          <p className="text-pf-dim">Projects are unavailable right now. Please check back later.</p>
        ) : projects.length === 0 ? (
          <p className="text-pf-dim">No projects to show yet.</p>
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </div>
    </section>
  );
};

export default Projects;
