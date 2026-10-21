import { getExperiences } from '@/app/actions/experience.action';
import { getProjects } from '@/app/actions/project.action';
import { getSkillGroups } from '@/app/actions/skill.action';
import { getEducations } from '@/app/actions/education.action';
import { defaultExperience } from '@/app/types/experience';
import { defaultSkillGroups } from '@/app/types/skill';
import { defaultEducation } from '@/app/types/education';
import { ProjectData } from '@/app/types/project';
import Wire from '@/components/site/Wire';
import Hero from '@/components/site/Hero';
import Systems from '@/components/site/Systems';
import Work from '@/components/site/Work';
import Stack from '@/components/site/Stack';
import Education from '@/components/site/Education';
import Contact from '@/components/site/Contact';

// Fully static + CDN-served; admin mutations revalidate on demand via revalidatePath('/')
export const revalidate = 86400;

// DB first; an empty collection or an outage falls back to the built-in content.
async function load<T>(fetcher: () => Promise<T[]>, fallback: T[]): Promise<T[]> {
  try {
    const rows = await fetcher();
    return rows.length > 0 ? rows : fallback;
  } catch (error) {
    console.error('Failed to load content, using defaults:', error);
    return fallback;
  }
}

export default async function Home() {
  const [jobs, groups, education, projects] = await Promise.all([
    load(() => getExperiences(), defaultExperience),
    load(() => getSkillGroups(), defaultSkillGroups),
    load(() => getEducations(), defaultEducation),
    load<ProjectData>(() => getProjects(), []),
  ]);

  const flagged = projects.filter((p) => p.featured);
  const featured = (flagged.length > 0 ? flagged : projects).slice(0, 3);
  const systems = [
    ...jobs.flatMap((j) => j.projects.map((p) => ({ name: p.title, where: j.company.split(' ')[0], tech: p.technologies }))),
    ...projects.map((p) => ({ name: p.title, where: 'Project', tech: p.tags })),
  ];

  return (
    <>
      <div className="wire-host" data-wire-host>
        <Wire />
        <Hero />
        <Systems jobs={jobs} />
        <Work projects={featured} total={projects.length} />
        <Stack groups={groups} systems={systems} />
        <Education items={education} />
      </div>
      <Contact />
    </>
  );
}
