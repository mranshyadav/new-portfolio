import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../../contexts/CMSContext";
import { useAuth } from "../../contexts/AuthContext";
import { Search, Filter, Plus, Edit, Trash2, Eye, Archive, CheckSquare, Square } from "lucide-react";
import { format } from "date-fns";
import { ContentStatus } from "../../types/cms";
import { toast } from "sonner";

export function ContentList() {
  const { contents, deleteContent, bulkUpdateStatus, bulkDelete } = useCMS();
  const { user, hasRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "all">("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Filter and search contents
  const filteredContents = useMemo(() => {
    return contents.filter((content) => {
      const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || content.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contents, searchQuery, statusFilter]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredContents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContents.map(c => c.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatusUpdate = async (status: ContentStatus) => {
    if (selectedIds.length === 0) {
      toast.error("No items selected");
      return;
    }

    try {
      await bulkUpdateStatus(selectedIds, status);
      setSelectedIds([]);
      setShowBulkActions(false);
    } catch (error) {
      toast.error("Failed to update items");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("No items selected");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} items?`)) {
      return;
    }

    try {
      await bulkDelete(selectedIds);
      setSelectedIds([]);
      setShowBulkActions(false);
    } catch (error) {
      toast.error("Failed to delete items");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await deleteContent(id);
    } catch (error) {
      toast.error("Failed to delete content");
    }
  };

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case "published":
        return { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e" };
      case "draft":
        return { bg: "rgba(234, 179, 8, 0.1)", text: "#eab308" };
      case "archived":
        return { bg: "rgba(107, 114, 128, 0.1)", text: "#6b7280" };
    }
  };

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
              All Content
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Manage and organize your content
            </p>
          </div>
          {hasRole(["admin", "editor"]) && (
            <Link to="/admin/content/new">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <Plus className="w-5 h-5" />
                Create New
              </button>
            </Link>
          )}
        </div>

        {/* Filters and Search */}
        <div 
          className="rounded-lg p-6 mb-6"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-default)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: "var(--text-tertiary)" }}
                />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" style={{ color: "var(--text-tertiary)" }} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ContentStatus | "all")}
                className="px-4 py-2 rounded-lg outline-none transition-all duration-200"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border-default)" }}>
              <div className="flex items-center gap-4">
                <span style={{ color: "var(--text-secondary)" }}>
                  {selectedIds.length} items selected
                </span>
                {hasRole(["admin", "editor"]) && (
                  <>
                    <button
                      onClick={() => handleBulkStatusUpdate("published")}
                      className="px-4 py-2 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        color: "#22c55e",
                      }}
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => handleBulkStatusUpdate("draft")}
                      className="px-4 py-2 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: "rgba(234, 179, 8, 0.1)",
                        color: "#eab308",
                      }}
                    >
                      Set as Draft
                    </button>
                    <button
                      onClick={() => handleBulkStatusUpdate("archived")}
                      className="px-4 py-2 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: "rgba(107, 114, 128, 0.1)",
                        color: "#6b7280",
                      }}
                    >
                      Archive
                    </button>
                  </>
                )}
                {hasRole(["admin"]) && (
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content Table */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-default)",
          }}
        >
          {filteredContents.length === 0 ? (
            <div className="text-center py-12">
              <p 
                className="text-lg mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                No content found
              </p>
              <p style={{ color: "var(--text-tertiary)" }}>
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your filters" 
                  : "Create your first content to get started"}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                  <th className="p-4 text-left" style={{ width: "40px" }}>
                    <button onClick={handleSelectAll}>
                      {selectedIds.length === filteredContents.length ? (
                        <CheckSquare className="w-5 h-5" style={{ color: "var(--accent-primary)" }} />
                      ) : (
                        <Square className="w-5 h-5" style={{ color: "var(--text-tertiary)" }} />
                      )}
                    </button>
                  </th>
                  <th 
                    className="p-4 text-left"
                    style={{ color: "var(--text-secondary)", fontWeight: 500 }}
                  >
                    Title
                  </th>
                  <th 
                    className="p-4 text-left"
                    style={{ color: "var(--text-secondary)", fontWeight: 500 }}
                  >
                    Author
                  </th>
                  <th 
                    className="p-4 text-left"
                    style={{ color: "var(--text-secondary)", fontWeight: 500 }}
                  >
                    Status
                  </th>
                  <th 
                    className="p-4 text-left"
                    style={{ color: "var(--text-secondary)", fontWeight: 500 }}
                  >
                    Last Edited
                  </th>
                  <th className="p-4 text-right" style={{ width: "100px" }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredContents.map((content) => {
                  const statusColor = getStatusColor(content.status);
                  const isSelected = selectedIds.includes(content.id);

                  return (
                    <tr
                      key={content.id}
                      style={{ 
                        borderBottom: "1px solid var(--border-default)",
                        backgroundColor: isSelected ? "rgba(99, 102, 241, 0.05)" : "transparent",
                      }}
                    >
                      <td className="p-4">
                        <button onClick={() => handleSelect(content.id)}>
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5" style={{ color: "var(--accent-primary)" }} />
                          ) : (
                            <Square className="w-5 h-5" style={{ color: "var(--text-tertiary)" }} />
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <Link 
                          to={`/admin/content/edit/${content.id}`}
                          style={{ color: "var(--text-primary)", fontWeight: 500 }}
                          className="hover:underline"
                        >
                          {content.title}
                        </Link>
                      </td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>
                        {content.author.name}
                      </td>
                      <td className="p-4">
                        <span
                          className="px-3 py-1 rounded-full text-sm inline-block"
                          style={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                          }}
                        >
                          {content.status}
                        </span>
                      </td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>
                        {format(new Date(content.updatedAt), "MMM d, yyyy")}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          {hasRole(["admin", "editor"]) && (
                            <Link to={`/admin/content/edit/${content.id}`}>
                              <button
                                className="p-2 rounded-lg transition-all duration-200 hover:bg-opacity-10"
                                style={{ color: "var(--text-secondary)" }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "var(--bg-primary)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </Link>
                          )}
                          {hasRole(["admin"]) && (
                            <button
                              onClick={() => handleDelete(content.id, content.title)}
                              className="p-2 rounded-lg transition-all duration-200"
                              style={{ color: "#ef4444" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
