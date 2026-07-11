"use server";

import { Education } from "@/lib/model/educationModel";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import {
  defaultEducation,
  EducationData,
  EducationInput,
} from "../types/education";

function revalidateEducationPages() {
  revalidatePath("/");
  revalidatePath("/admin/dashboard/education");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toEducationData(item: any): EducationData {
  return {
    _id: item._id.toString(),
    degree: item.degree,
    institution: item.institution,
    period: item.period ?? "",
    description: item.description ?? "",
    order: item.order ?? 0,
  };
}

export async function getEducations(): Promise<EducationData[]> {
  await connectToDatabase();
  const items = await Education.find({}).sort({ order: 1, createdAt: 1 });
  return items.map(toEducationData);
}

export async function getEducationById(id: string): Promise<EducationData> {
  await connectToDatabase();
  const item = await Education.findById(id);
  if (!item) {
    throw new Error("Education not found");
  }
  return toEducationData(item);
}

export async function createEducation(data: EducationInput) {
  await connectToDatabase();
  await Education.create(data);
  revalidateEducationPages();
}

export async function updateEducation(id: string, data: EducationInput) {
  await connectToDatabase();
  await Education.findByIdAndUpdate(id, data);
  revalidateEducationPages();
}

export async function deleteEducation(id: string) {
  await connectToDatabase();
  await Education.findByIdAndDelete(id);
  revalidateEducationPages();
}

// Copies the original hardcoded content into the DB so it can be edited.
export async function seedEducation() {
  await connectToDatabase();
  const count = await Education.countDocuments();
  if (count > 0) return;
  await Education.insertMany(defaultEducation);
  revalidateEducationPages();
}
