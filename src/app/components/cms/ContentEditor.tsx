import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCMS } from "../../contexts/CMSContext";
import { useAuth } from "../../contexts/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { 
  Save, 
  Eye, 
  Monitor, 
  Smartphone, 
  ArrowLeft,
  Image as ImageIcon,
  Tag as TagIcon,
  FolderOpen,
  FileText,
} from "lucide-react";
import { ContentStatus } from "../../types/cms";
import { toast } from "sonner";

export function ContentEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getContent, createContent, updateContent, categories, tags, autosave } = useCMS();
  const { user, hasRole } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const isEditing = !!id;

  // Load content if editing
  useEffect(() => {
    if (id) {
      const existingContent = getContent(id);
      if (existingContent) {
        setTitle(existingContent.title);
        setContent(existingContent.content);
        setExcerpt(existingContent.excerpt || "");
        setSlug(existingContent.slug);
        setStatus(existingContent.status);
        setSelectedCategories(existingContent.categories);
        setSelectedTags(existingContent.tags);
        setFeaturedImage(existingContent.featuredImage || "");
        setSeoTitle(existingContent.seoTitle || "");
        setSeoDescription(existingContent.seoDescription || "");
      }
    }
  }, [id]);

  // Autosave
  useEffect(() => {
    if (isEditing && content) {
      autosave(id!, content);
    }
  }, [content, isEditing, id]);

  const handleSave = async (newStatus?: ContentStatus) => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!hasRole(["admin", "editor"])) {
      toast.error("You don't have permission to save content");
      return;
    }

    setIsSaving(true);

    try {
      const data = {
        title,
        content,
        excerpt,
        slug,
        status: newStatus || status,
        categories: selectedCategories,
        tags: selectedTags,
        featuredImage,
        seoTitle,
        seoDescription,
      };

      if (isEditing) {
        await updateContent(id!, data);
        setLastSaved(new Date());
      } else {
        const newContent = await createContent(data);
        navigate(`/admin/content/edit/${newContent.id}`);
      }
    } catch (error) {
      toast.error("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    await handleSave("published");
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/content">
              <button
                className="p-2 rounded-lg transition-all duration-200"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div>
              <h1 
                className="text-3xl mb-1"
                style={{ color: "var(--text-primary)", fontWeight: 600 }}
              >
                {isEditing ? "Edit Content" : "Create New Content"}
              </h1>
              {lastSaved && (
                <p style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>
                  Last saved: {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: showPreview ? "var(--accent-primary)" : "var(--bg-secondary)",
                color: showPreview ? "white" : "var(--text-primary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
            <button
              onClick={() => handleSave()}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-default)",
                opacity: isSaving ? 0.5 : 1,
              }}
            >
              <Save className="w-5 h-5" />
              {isSaving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={handlePublish}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: "var(--accent-primary)",
                color: "white",
                opacity: isSaving ? 0.5 : 1,
              }}
            >
              Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <input
                type="text"
                placeholder="Enter title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-3xl outline-none"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              />
            </div>

            {/* Content Editor */}
            <div
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div className="cms-editor">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  style={{ height: "500px" }}
                />
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <div
                className="rounded-lg p-6"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 
                    className="text-xl"
                    style={{ color: "var(--text-primary)", fontWeight: 600 }}
                  >
                    Preview
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewDevice("desktop")}
                      className="p-2 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: previewDevice === "desktop" 
                          ? "var(--accent-primary)" 
                          : "transparent",
                        color: previewDevice === "desktop" 
                          ? "white" 
                          : "var(--text-secondary)",
                      }}
                    >
                      <Monitor className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice("mobile")}
                      className="p-2 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: previewDevice === "mobile" 
                          ? "var(--accent-primary)" 
                          : "transparent",
                        color: previewDevice === "mobile" 
                          ? "white" 
                          : "var(--text-secondary)",
                      }}
                    >
                      <Smartphone className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div
                  className="mx-auto"
                  style={{
                    maxWidth: previewDevice === "mobile" ? "375px" : "100%",
                  }}
                >
                  <div
                    className="p-6 rounded-lg"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-default)",
                    }}
                  >
                    <h1 
                      className="text-3xl mb-4"
                      style={{ color: "var(--text-primary)", fontWeight: 600 }}
                    >
                      {title || "Untitled"}
                    </h1>
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: content }}
                      style={{ color: "var(--text-primary)" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
                <h3 
                  className="text-lg"
                  style={{ color: "var(--text-primary)", fontWeight: 600 }}
                >
                  Status
                </h3>
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContentStatus)}
                className="w-full px-4 py-2 rounded-lg outline-none"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Categories */}
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
                <h3 
                  className="text-lg"
                  style={{ color: "var(--text-primary)", fontWeight: 600 }}
                >
                  Categories
                </h3>
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="w-4 h-4"
                    />
                    <span style={{ color: "var(--text-primary)" }}>
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TagIcon className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
                <h3 
                  className="text-lg"
                  style={{ color: "var(--text-primary)", fontWeight: 600 }}
                >
                  Tags
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className="px-3 py-1 rounded-full text-sm transition-all duration-200"
                    style={{
                      backgroundColor: selectedTags.includes(tag.id)
                        ? "var(--accent-primary)"
                        : "var(--bg-primary)",
                      color: selectedTags.includes(tag.id)
                        ? "white"
                        : "var(--text-primary)",
                      border: "1px solid var(--border-default)",
                    }}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
                <h3 
                  className="text-lg"
                  style={{ color: "var(--text-primary)", fontWeight: 600 }}
                >
                  Featured Image
                </h3>
              </div>
              <input
                type="text"
                placeholder="Image URL..."
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg outline-none"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                }}
              />
              {featuredImage && (
                <div className="mt-4">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full rounded-lg"
                    style={{ border: "1px solid var(--border-default)" }}
                  />
                </div>
              )}
            </div>

            {/* SEO */}
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <h3 
                className="text-lg mb-4"
                style={{ color: "var(--text-primary)", fontWeight: 600 }}
              >
                SEO Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    SEO Title
                  </label>
                  <input
                    type="text"
                    placeholder="SEO title..."
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg outline-none"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-default)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Meta Description
                  </label>
                  <textarea
                    placeholder="Meta description..."
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg outline-none resize-none"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-default)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Quill Styles */}
      <style>{`
        .cms-editor .ql-toolbar {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-default);
          border-bottom: none;
          border-radius: 8px 8px 0 0;
        }
        
        .cms-editor .ql-container {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-default);
          border-radius: 0 0 8px 8px;
          color: var(--text-primary);
        }
        
        .cms-editor .ql-editor {
          min-height: 500px;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .cms-editor .ql-editor.ql-blank::before {
          color: var(--text-tertiary);
        }
        
        .cms-editor .ql-snow .ql-stroke {
          stroke: var(--text-secondary);
        }
        
        .cms-editor .ql-snow .ql-fill {
          fill: var(--text-secondary);
        }
        
        .cms-editor .ql-snow .ql-picker-label {
          color: var(--text-secondary);
        }
        
        .cms-editor .ql-snow .ql-picker-options {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-default);
        }
        
        .cms-editor .ql-snow .ql-picker-item:hover {
          color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
}
