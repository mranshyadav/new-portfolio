import React, { useState, useRef } from "react";
import { useCMS } from "../../contexts/CMSContext";
import { useAuth } from "../../contexts/AuthContext";
import { Upload, Grid, List, Trash2, Search, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export function MediaLibrary() {
  const { media, uploadMedia, deleteMedia } = useCMS();
  const { hasRole } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const filteredMedia = media.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (!hasRole(["admin", "editor"])) {
      toast.error("You don't have permission to upload media");
      return;
    }

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 10MB)`);
          continue;
        }

        // Check file type
        if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
          toast.error(`${file.name} is not a valid media file`);
          continue;
        }

        await uploadMedia(file);
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!hasRole(["admin"])) {
      toast.error("You don't have permission to delete media");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await deleteMedia(id);
      if (selectedMedia === id) {
        setSelectedMedia(null);
      }
    } catch (error) {
      toast.error("Failed to delete media");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const selectedItem = selectedMedia ? media.find(m => m.id === selectedMedia) : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 
              className="text-3xl mb-2"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Media Library
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Upload and manage your media files
            </p>
          </div>
          {hasRole(["admin", "editor"]) && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "white",
                  opacity: isUploading ? 0.5 : 1,
                }}
              >
                <Upload className="w-5 h-5" />
                {isUploading ? "Uploading..." : "Upload Media"}
              </button>
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div
          className="rounded-lg p-4 mb-6 flex items-center justify-between"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-default)",
          }}
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "var(--text-tertiary)" }}
            />
            <input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg outline-none"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: viewMode === "grid" 
                  ? "var(--accent-primary)" 
                  : "transparent",
                color: viewMode === "grid" 
                  ? "white" 
                  : "var(--text-secondary)",
              }}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: viewMode === "list" 
                  ? "var(--accent-primary)" 
                  : "transparent",
                color: viewMode === "list" 
                  ? "white" 
                  : "var(--text-secondary)",
              }}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {filteredMedia.length === 0 ? (
          <div
            className="rounded-lg p-12 text-center"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "2px dashed var(--border-default)",
            }}
          >
            <Upload 
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "var(--text-tertiary)" }}
            />
            <p 
              className="text-lg mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {searchQuery ? "No media found" : "No media uploaded yet"}
            </p>
            <p style={{ color: "var(--text-tertiary)" }}>
              {searchQuery ? "Try a different search term" : "Upload your first media file to get started"}
            </p>
            {!searchQuery && hasRole(["admin", "editor"]) && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 px-6 py-3 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "white",
                }}
              >
                Upload Media
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Media Grid/List */}
            <div className="lg:col-span-3">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMedia(item.id)}
                      className="rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        border: selectedMedia === item.id 
                          ? "2px solid var(--accent-primary)"
                          : "1px solid var(--border-default)",
                      }}
                    >
                      <div 
                        className="aspect-square bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${item.url})`,
                          backgroundColor: "var(--bg-primary)",
                        }}
                      />
                      <div className="p-3">
                        <p 
                          className="truncate text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.name}
                        </p>
                        <p 
                          className="text-xs"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {formatFileSize(item.size)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  {filteredMedia.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMedia(item.id)}
                      className="flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 hover:bg-opacity-50"
                      style={{
                        borderBottom: index < filteredMedia.length - 1 
                          ? "1px solid var(--border-default)" 
                          : "none",
                        backgroundColor: selectedMedia === item.id 
                          ? "rgba(99, 102, 241, 0.1)" 
                          : "transparent",
                      }}
                    >
                      <div
                        className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{
                          backgroundImage: `url(${item.url})`,
                          backgroundColor: "var(--bg-primary)",
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p 
                          className="truncate"
                          style={{ color: "var(--text-primary)", fontWeight: 500 }}
                        >
                          {item.name}
                        </p>
                        <p 
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {formatFileSize(item.size)} • Uploaded {format(new Date(item.uploadedAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details Sidebar */}
            {selectedItem && (
              <div
                className="rounded-lg p-6 h-fit sticky top-8"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 
                    className="text-lg"
                    style={{ color: "var(--text-primary)", fontWeight: 600 }}
                  >
                    Media Details
                  </h3>
                  <button
                    onClick={() => setSelectedMedia(null)}
                    className="p-1 rounded-lg transition-all duration-200"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--bg-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div
                  className="w-full aspect-square rounded-lg bg-cover bg-center mb-4"
                  style={{
                    backgroundImage: `url(${selectedItem.url})`,
                    backgroundColor: "var(--bg-primary)",
                    border: "1px solid var(--border-default)",
                  }}
                />

                <div className="space-y-3">
                  <div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      File Name
                    </p>
                    <p 
                      className="break-all"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedItem.name}
                    </p>
                  </div>

                  <div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      File Size
                    </p>
                    <p style={{ color: "var(--text-primary)" }}>
                      {formatFileSize(selectedItem.size)}
                    </p>
                  </div>

                  <div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Type
                    </p>
                    <p style={{ color: "var(--text-primary)" }}>
                      {selectedItem.type}
                    </p>
                  </div>

                  <div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Uploaded
                    </p>
                    <p style={{ color: "var(--text-primary)" }}>
                      {format(new Date(selectedItem.uploadedAt), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>

                  <div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      URL
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={selectedItem.url}
                        readOnly
                        className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          border: "1px solid var(--border-default)",
                          color: "var(--text-secondary)",
                        }}
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedItem.url);
                          toast.success("URL copied to clipboard");
                        }}
                        className="px-3 py-2 rounded-lg text-sm transition-all duration-200"
                        style={{
                          backgroundColor: "var(--accent-primary)",
                          color: "white",
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {hasRole(["admin"]) && (
                    <button
                      onClick={() => handleDelete(selectedItem.id, selectedItem.name)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 mt-4"
                      style={{
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        color: "#ef4444",
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
