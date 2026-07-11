import defaults from "@/app/data/defaults.json";

export type SkillGroupInput = {
  category: string;
  skills: string[];
  order: number; // lower = shown first
};

export type SkillGroupData = SkillGroupInput & { _id: string };

// Original hardcoded content (app/data/defaults.json): public-site fallback + admin seed.
export const defaultSkillGroups: SkillGroupInput[] = defaults.skillGroups;
