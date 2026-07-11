import defaults from "@/app/data/defaults.json";

export type EducationInput = {
  degree: string;
  institution: string;
  period: string;
  description: string;
  order: number; // lower = shown first
};

export type EducationData = EducationInput & { _id: string };

// Original hardcoded content (app/data/defaults.json): public-site fallback + admin seed.
export const defaultEducation: EducationInput[] = defaults.education;
