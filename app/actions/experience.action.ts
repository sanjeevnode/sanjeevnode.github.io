"use server";

import { Experience } from "@/lib/model/experienceModel";
import { connectToDatabase } from "@/lib/mongoose";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import {
  defaultExperience,
  ExperienceData,
  ExperienceInput,
} from "../types/experience";

function revalidateExperiencePages() {
  revalidatePath("/");
  revalidatePath("/admin/dashboard/experience");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toExperienceData(exp: any): ExperienceData {
  return {
    _id: exp._id.toString(),
    title: exp.title,
    company: exp.company,
    location: exp.location ?? "",
    period: exp.period ?? "",
    order: exp.order ?? 0,
    active: exp.active !== false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    projects: (exp.projects ?? []).map((p: any) => ({
      title: p.title,
      technologies: p.technologies ?? [],
      description: p.description ?? [],
      link: p.link || undefined,
    })),
  };
}

export async function getExperiences(includeInactive = false): Promise<ExperienceData[]> {
  await connectToDatabase();
  const filter = includeInactive ? {} : { active: { $ne: false } };
  const experiences = await Experience.find(filter).sort({ order: 1, createdAt: 1 });
  return experiences.map(toExperienceData);
}

export async function getExperienceById(id: string): Promise<ExperienceData> {
  await connectToDatabase();
  const experience = await Experience.findById(id);
  if (!experience) {
    throw new Error("Experience not found");
  }
  return toExperienceData(experience);
}

export async function createExperience(data: ExperienceInput) {
  await requireAdmin();
  await connectToDatabase();
  await Experience.create(data);
  revalidateExperiencePages();
}

export async function updateExperience(id: string, data: ExperienceInput) {
  await requireAdmin();
  await connectToDatabase();
  await Experience.findByIdAndUpdate(id, data);
  revalidateExperiencePages();
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Experience.findByIdAndDelete(id);
  revalidateExperiencePages();
}

// Copies the original hardcoded content into the DB so it can be edited.
export async function seedExperience() {
  await requireAdmin();
  await connectToDatabase();
  const count = await Experience.countDocuments();
  if (count > 0) return;
  await Experience.insertMany(defaultExperience);
  revalidateExperiencePages();
}
