"use server";

import { SkillGroup } from "@/lib/model/skillModel";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import {
  defaultSkillGroups,
  SkillGroupData,
  SkillGroupInput,
} from "../types/skill";

function revalidateSkillPages() {
  revalidatePath("/");
  revalidatePath("/admin/dashboard/skill");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSkillGroupData(item: any): SkillGroupData {
  return {
    _id: item._id.toString(),
    category: item.category,
    skills: item.skills ?? [],
    order: item.order ?? 0,
  };
}

export async function getSkillGroups(): Promise<SkillGroupData[]> {
  await connectToDatabase();
  const items = await SkillGroup.find({}).sort({ order: 1, createdAt: 1 });
  return items.map(toSkillGroupData);
}

export async function getSkillGroupById(id: string): Promise<SkillGroupData> {
  await connectToDatabase();
  const item = await SkillGroup.findById(id);
  if (!item) {
    throw new Error("Skill group not found");
  }
  return toSkillGroupData(item);
}

export async function createSkillGroup(data: SkillGroupInput) {
  await connectToDatabase();
  await SkillGroup.create(data);
  revalidateSkillPages();
}

export async function updateSkillGroup(id: string, data: SkillGroupInput) {
  await connectToDatabase();
  await SkillGroup.findByIdAndUpdate(id, data);
  revalidateSkillPages();
}

export async function deleteSkillGroup(id: string) {
  await connectToDatabase();
  await SkillGroup.findByIdAndDelete(id);
  revalidateSkillPages();
}

// Copies the original hardcoded content into the DB so it can be edited.
export async function seedSkillGroups() {
  await connectToDatabase();
  const count = await SkillGroup.countDocuments();
  if (count > 0) return;
  await SkillGroup.insertMany(defaultSkillGroups);
  revalidateSkillPages();
}
