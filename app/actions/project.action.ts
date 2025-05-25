"use server";

import { Project } from "@/lib/model/projectModel";
import { connectToDatabase } from "@/lib/mongoose";
import { ProjectData } from "../types/project";

export async function createProject(formData: FormData) {
  await connectToDatabase();

  const title = formData.get("title") as string;
  const description = JSON.parse(formData.get("description") as string);
  const tags = JSON.parse(formData.get("tags") as string);
  const link = formData.get("link") as string;
  const github = formData.get("github") as string;
  const imageFile = formData.get("image") as File | null;

  let imageData = null;

  if (imageFile) {
    const arrayBuffer = await imageFile.arrayBuffer();
    imageData = {
      data: Buffer.from(arrayBuffer),
      contentType: imageFile.type,
    };
  }

  await Project.create({
    title,
    description,
    tags,
    link,
    github,
    image: imageData,
  });
}

export async function getProjects(): Promise<ProjectData[]> {
  await connectToDatabase();
  const projects = await Project.find({}).sort({ createdAt: -1 });

  return projects.map((project) => ({
    _id: project._id.toString(),
    title: project.title,
    description: project.description,
    image:
      project.image && project.image.data
        ? {
            data: project.image.data.toString("base64"),
            contentType: project.image.contentType,
          }
        : undefined, // ✅ changed from null to undefined
    link: project.link,
    github: project.github,
    tags: project.tags,
  }));
}

export async function getProjectById(id: string) {
  await connectToDatabase();
  const project = await Project.findById(id);
  if (!project) {
    throw new Error("Project not found");
  }
  return {
    _id: project._id.toString(),
    title: project.title,
    description: project.description,
    image:
      project.image && project.image.data
        ? {
            data: project.image.data.toString("base64"),
            contentType: project.image.contentType,
          }
        : undefined,
    link: project.link,
    github: project.github,
    tags: project.tags,
  };
}

export async function updateProject(id: string, formData: FormData) {
  await connectToDatabase();

  const title = formData.get("title") as string;
  const description = JSON.parse(formData.get("description") as string);
  const tags = JSON.parse(formData.get("tags") as string);
  const link = formData.get("link") as string;
  const github = formData.get("github") as string;
  const imageFile = formData.get("image") as File | null;

  let imageData = null;

  if (imageFile) {
    const arrayBuffer = await imageFile.arrayBuffer();
    imageData = {
      data: Buffer.from(arrayBuffer),
      contentType: imageFile.type,
    };
  }

  await Project.findByIdAndUpdate(id, {
    title,
    description,
    tags,
    link,
    github,
    image: imageData,
  });
}
