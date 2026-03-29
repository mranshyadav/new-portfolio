import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ContentItem, MediaItem, Category, Tag, CMSStats, ContentStatus } from "../types/cms";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface CMSContextType {
  // Content
  contents: ContentItem[];
  getContent: (id: string) => ContentItem | undefined;
  createContent: (data: Partial<ContentItem>) => Promise<ContentItem>;
  updateContent: (id: string, data: Partial<ContentItem>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  bulkUpdateStatus: (ids: string[], status: ContentStatus) => Promise<void>;
  bulkDelete: (ids: string[]) => Promise<void>;
  
  // Media
  media: MediaItem[];
  uploadMedia: (file: File) => Promise<MediaItem>;
  deleteMedia: (id: string) => Promise<void>;
  
  // Categories & Tags
  categories: Category[];
  tags: Tag[];
  createCategory: (name: string, description?: string) => Promise<Category>;
  createTag: (name: string) => Promise<Tag>;
  deleteCategory: (id: string) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  
  // Stats
  stats: CMSStats;
  
  // Autosave
  autosave: (id: string, content: string) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  // Get auth context - this should always be available since AuthProvider wraps this
  const auth = useAuth();
  const user = auth.user;
  
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [stats, setStats] = useState<CMSStats>({
    totalItems: 0,
    drafts: 0,
    published: 0,
    archived: 0,
  });

  // Load data from localStorage
  useEffect(() => {
    const storedContents = localStorage.getItem("cms_contents");
    const storedMedia = localStorage.getItem("cms_media");
    const storedCategories = localStorage.getItem("cms_categories");
    const storedTags = localStorage.getItem("cms_tags");

    if (storedContents) {
      try {
        setContents(JSON.parse(storedContents));
      } catch (error) {
        console.error("Error loading contents:", error);
      }
    }

    if (storedMedia) {
      try {
        setMedia(JSON.parse(storedMedia));
      } catch (error) {
        console.error("Error loading media:", error);
      }
    }

    if (storedCategories) {
      try {
        setCategories(JSON.parse(storedCategories));
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    } else {
      // Create default categories
      const defaultCategories: Category[] = [
        { id: "1", name: "Blog", slug: "blog", description: "Blog posts" },
        { id: "2", name: "Portfolio", slug: "portfolio", description: "Portfolio items" },
        { id: "3", name: "News", slug: "news", description: "News articles" },
      ];
      setCategories(defaultCategories);
      localStorage.setItem("cms_categories", JSON.stringify(defaultCategories));
    }

    if (storedTags) {
      try {
        setTags(JSON.parse(storedTags));
      } catch (error) {
        console.error("Error loading tags:", error);
      }
    }
  }, []);

  // Update stats when contents change
  useEffect(() => {
    const newStats: CMSStats = {
      totalItems: contents.length,
      drafts: contents.filter(c => c.status === "draft").length,
      published: contents.filter(c => c.status === "published").length,
      archived: contents.filter(c => c.status === "archived").length,
    };
    setStats(newStats);
  }, [contents]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("cms_contents", JSON.stringify(contents));
  }, [contents]);

  useEffect(() => {
    localStorage.setItem("cms_media", JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem("cms_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("cms_tags", JSON.stringify(tags));
  }, [tags]);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const getContent = (id: string) => {
    return contents.find(c => c.id === id);
  };

  const createContent = async (data: Partial<ContentItem>): Promise<ContentItem> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    const newContent: ContentItem = {
      id: Date.now().toString(),
      title: data.title || "Untitled",
      slug: data.slug || generateSlug(data.title || "untitled"),
      content: data.content || "",
      excerpt: data.excerpt,
      featuredImage: data.featuredImage,
      status: data.status || "draft",
      author: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      categories: data.categories || [],
      tags: data.tags || [],
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: data.status === "published" ? new Date().toISOString() : undefined,
      versions: [{
        id: "1",
        content: data.content || "",
        createdAt: new Date().toISOString(),
        createdBy: user.name,
      }],
    };

    setContents(prev => [newContent, ...prev]);
    toast.success("Content created successfully");
    return newContent;
  };

  const updateContent = async (id: string, data: Partial<ContentItem>): Promise<void> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    setContents(prev => prev.map(content => {
      if (content.id === id) {
        const updated = {
          ...content,
          ...data,
          slug: data.slug || (data.title ? generateSlug(data.title) : content.slug),
          updatedAt: new Date().toISOString(),
          publishedAt: data.status === "published" && content.status !== "published" 
            ? new Date().toISOString() 
            : content.publishedAt,
        };

        // Add version if content changed
        if (data.content && data.content !== content.content) {
          updated.versions = [
            ...content.versions,
            {
              id: Date.now().toString(),
              content: data.content,
              createdAt: new Date().toISOString(),
              createdBy: user.name,
            },
          ];
        }

        return updated;
      }
      return content;
    }));

    toast.success("Content updated successfully");
  };

  const deleteContent = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    setContents(prev => prev.filter(c => c.id !== id));
    toast.success("Content deleted successfully");
  };

  const bulkUpdateStatus = async (ids: string[], status: ContentStatus): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    setContents(prev => prev.map(content => 
      ids.includes(content.id) 
        ? { 
            ...content, 
            status, 
            updatedAt: new Date().toISOString(),
            publishedAt: status === "published" ? new Date().toISOString() : content.publishedAt,
          }
        : content
    ));
    toast.success(`${ids.length} items updated to ${status}`);
  };

  const bulkDelete = async (ids: string[]): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    setContents(prev => prev.filter(c => !ids.includes(c.id)));
    toast.success(`${ids.length} items deleted`);
  };

  const uploadMedia = async (file: File): Promise<MediaItem> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload

    // In a real app, this would upload to a server and return a URL
    const url = URL.createObjectURL(file);

    const mediaItem: MediaItem = {
      id: Date.now().toString(),
      name: file.name,
      url,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      uploadedBy: user.name,
    };

    setMedia(prev => [mediaItem, ...prev]);
    toast.success("Media uploaded successfully");
    return mediaItem;
  };

  const deleteMedia = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    setMedia(prev => prev.filter(m => m.id !== id));
    toast.success("Media deleted successfully");
  };

  const createCategory = async (name: string, description?: string): Promise<Category> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    const category: Category = {
      id: Date.now().toString(),
      name,
      slug: generateSlug(name),
      description,
    };

    setCategories(prev => [...prev, category]);
    toast.success("Category created successfully");
    return category;
  };

  const createTag = async (name: string): Promise<Tag> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    const tag: Tag = {
      id: Date.now().toString(),
      name,
      slug: generateSlug(name),
    };

    setTags(prev => [...prev, tag]);
    toast.success("Tag created successfully");
    return tag;
  };

  const deleteCategory = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    setCategories(prev => prev.filter(c => c.id !== id));
    toast.success("Category deleted successfully");
  };

  const deleteTag = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    setTags(prev => prev.filter(t => t.id !== id));
    toast.success("Tag deleted successfully");
  };

  // Autosave functionality
  const autosaveTimers = React.useRef<Record<string, NodeJS.Timeout>>({});

  const autosave = useCallback((id: string, content: string) => {
    // Clear existing timer
    if (autosaveTimers.current[id]) {
      clearTimeout(autosaveTimers.current[id]);
    }

    // Set new timer
    autosaveTimers.current[id] = setTimeout(async () => {
      try {
        await updateContent(id, { content });
        toast.success("Draft saved", { duration: 1000 });
      } catch (error) {
        console.error("Autosave failed:", error);
      }
    }, 3000); // Autosave after 3 seconds of inactivity
  }, []);

  return (
    <CMSContext.Provider
      value={{
        contents,
        getContent,
        createContent,
        updateContent,
        deleteContent,
        bulkUpdateStatus,
        bulkDelete,
        media,
        uploadMedia,
        deleteMedia,
        categories,
        tags,
        createCategory,
        createTag,
        deleteCategory,
        deleteTag,
        stats,
        autosave,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}