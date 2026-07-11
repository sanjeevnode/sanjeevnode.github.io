import defaults from "@/app/data/defaults.json";

export type ExperienceProject = {
  title: string;
  technologies: string[];
  description: string[];
  link?: string;
};

export type ExperienceInput = {
  title: string; // role
  company: string;
  location: string;
  period: string;
  order: number; // lower = shown first
  projects: ExperienceProject[];
};

export type ExperienceData = ExperienceInput & { _id: string };

// The original hardcoded content (app/data/defaults.json). Used as public-site
// fallback while the DB collection is empty, and as the seed for the admin CMS.
export const defaultExperience: ExperienceInput[] = defaults.experience;
