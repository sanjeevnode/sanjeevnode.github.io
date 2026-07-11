export type ProjectData = {
  _id: string;
  title: string;
  description: string[];
  image?: string; // Cloudinary URL (or legacy data-URI until migrated)
  link?: string;
  github?: string;
  tags: string[];
  active: boolean;
};
