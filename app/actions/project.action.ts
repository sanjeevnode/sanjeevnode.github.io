"use server";

import { Project } from "@/lib/model/projectModel";
import { connectToDatabase } from "@/lib/mongoose";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { ProjectData } from "../types/project";

function revalidateProjectPages() {
  revalidatePath("/");
  revalidatePath("/admin/dashboard/project");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProjectData(project: any): ProjectData {
  return {
    _id: project._id.toString(),
    title: project.title,
    description: project.description,
    image:
      project.imageUrl ||
      (project.image?.data
        ? `data:${project.image.contentType};base64,${project.image.data.toString("base64")}`
        : undefined),
    link: project.link,
    github: project.github,
    tags: project.tags,
  };
}

function getImageFile(formData: FormData): File | null {
  const file = formData.get("image");
  // an empty file input still submits a zero-byte File
  return file instanceof File && file.size > 0 ? file : null;
}

export async function createProject(formData: FormData) {
  await connectToDatabase();

  const imageFile = getImageFile(formData);
  const image = imageFile ? await uploadImage(imageFile) : null;

  await Project.create({
    title: formData.get("title") as string,
    description: JSON.parse(formData.get("description") as string),
    tags: JSON.parse(formData.get("tags") as string),
    link: formData.get("link") as string,
    github: formData.get("github") as string,
    imageUrl: image?.url,
    imagePublicId: image?.publicId,
  });

  revalidateProjectPages();
}

export async function getProjects(): Promise<ProjectData[]> {
  await connectToDatabase();
  const projects = await Project.find({}).sort({ createdAt: -1 });
  return projects.map(toProjectData);
}

export async function getProjectById(id: string): Promise<ProjectData> {
  await connectToDatabase();
  const project = await Project.findById(id);
  if (!project) {
    throw new Error("Project not found");
  }
  return toProjectData(project);
}

export async function updateProject(id: string, formData: FormData) {
  await connectToDatabase();

  const existing = await Project.findById(id);
  if (!existing) {
    throw new Error("Project not found");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update: any = {
    title: formData.get("title") as string,
    description: JSON.parse(formData.get("description") as string),
    tags: JSON.parse(formData.get("tags") as string),
    link: formData.get("link") as string,
    github: formData.get("github") as string,
  };

  const imageFile = getImageFile(formData);
  const removeImage = formData.get("removeImage") === "true";

  if (imageFile) {
    const image = await uploadImage(imageFile);
    await deleteImage(existing.imagePublicId);
    update.imageUrl = image.url;
    update.imagePublicId = image.publicId;
    update.image = null; // drop legacy buffer once replaced
  } else if (removeImage) {
    await deleteImage(existing.imagePublicId);
    update.imageUrl = null;
    update.imagePublicId = null;
    update.image = null;
  }
  // no new file and no removal -> leave the existing image untouched

  await Project.findByIdAndUpdate(id, update);
  revalidateProjectPages();
}

export async function deleteProject(id: string) {
  await connectToDatabase();
  const project = await Project.findByIdAndDelete(id);
  await deleteImage(project?.imagePublicId);
  revalidateProjectPages();
}
