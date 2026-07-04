export type ProjectItem = {
  id?: string;
  title: string;
  description: string[];
  image?: string;
  link?: string;
  github?: string;
  tags: string[];
};

export const dummyProjects: ProjectItem[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description: ["Built with Next.js", "TailwindCSS"],
    tags: ["Next.js", "TailwindCSS"],
  },
  {
    id: "2",
    title: "E-commerce App",
    description: ["Stripe integration", "Admin panel"],
    tags: ["React", "Firebase"],
  },
];

export type ProjectData = {
  _id: string;
  title: string;
  description: string[];
  image?: {
    data: string; // base64 string instead of Buffer
    contentType: string;
  };
  link?: string;
  github?: string;
  tags: string[];
};
