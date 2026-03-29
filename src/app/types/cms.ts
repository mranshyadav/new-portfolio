export type ContentStatus = "draft" | "published" | "archived";

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: ContentStatus;
  author: {
    id: string;
    name: string;
    email: string;
  };
  categories: string[];
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  versions: ContentVersion[];
}

export interface ContentVersion {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface CMSStats {
  totalItems: number;
  drafts: number;
  published: number;
  archived: number;
}
