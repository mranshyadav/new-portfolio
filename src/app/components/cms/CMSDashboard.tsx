import React from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../../contexts/CMSContext";
import { FileText, Plus, Eye, Archive, Clock, Globe, Settings } from "lucide-react";
import { format } from "date-fns";

export function CMSDashboard() {
  const { stats, contents } = useCMS();

  const recentContents = contents
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const statCards = [
    {
      title: "Total Items",
      value: stats.totalItems,
      icon: FileText,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Drafts",
      value: stats.drafts,
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Published",
      value: stats.published,
      icon: Eye,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Archived",
      value: stats.archived,
      icon: Archive,
      color: "from-gray-500 to-gray-600",
    },
  ];

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
              Content Dashboard
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Manage your content, media, and settings
            </p>
          </div>
          <Link to="/admin/content/new">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: "var(--accent-primary)",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Plus className="w-5 h-5" />
              Create New Content
            </button>
          </Link>
        </div>

        {/* Website Content Management - Prominent Card */}
        <Link to="/admin/website-content/edit/main">
          <div
            className="rounded-xl p-8 mb-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-dark) 100%)",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Website Content Manager
                  </h2>
                  <p className="text-white/80 text-lg">
                    Edit all text, images, and content across your entire portfolio website
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="px-3 py-1 rounded-full text-sm bg-white/20 text-white">
                      Home Page
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-white/20 text-white">
                      About Page
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-white/20 text-white">
                      Contact
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-white/20 text-white">
                      + More
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/20 text-white font-medium">
                <Settings className="w-5 h-5" />
                Manage Content
              </div>
            </div>
          </div>
        </Link>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="rounded-lg p-6 transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <p 
                    className="text-3xl mb-1"
                    style={{ 
                      color: "var(--text-primary)",
                      fontWeight: 700,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p style={{ color: "var(--text-secondary)" }}>
                    {stat.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div
          className="rounded-lg p-6"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-default)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 
              className="text-xl"
              style={{ 
                color: "var(--text-primary)",
                fontWeight: 600,
              }}
            >
              Recent Activity
            </h2>
            <Link 
              to="/admin/content"
              style={{ color: "var(--accent-primary)" }}
              className="hover:underline"
            >
              View All
            </Link>
          </div>

          {recentContents.length === 0 ? (
            <div className="text-center py-12">
              <FileText 
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: "var(--text-tertiary)" }}
              />
              <p 
                className="text-lg mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                No content yet
              </p>
              <p style={{ color: "var(--text-tertiary)" }}>
                Create your first content to get started
              </p>
              <Link to="/admin/content/new">
                <button
                  className="mt-6 px-6 py-3 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: "var(--accent-primary)",
                    color: "white",
                  }}
                >
                  Create Content
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentContents.map((content) => (
                <Link
                  key={content.id}
                  to={`/admin/content/edit/${content.id}`}
                  className="block"
                >
                  <div
                    className="flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-default)",
                    }}
                  >
                    <div className="flex-1">
                      <h3 
                        className="mb-1"
                        style={{ 
                          color: "var(--text-primary)",
                          fontWeight: 500,
                        }}
                      >
                        {content.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span style={{ color: "var(--text-secondary)" }}>
                          By {content.author.name}
                        </span>
                        <span style={{ color: "var(--text-tertiary)" }}>
                          {format(new Date(content.updatedAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: 
                            content.status === "published"
                              ? "rgba(34, 197, 94, 0.1)"
                              : content.status === "draft"
                              ? "rgba(234, 179, 8, 0.1)"
                              : "rgba(107, 114, 128, 0.1)",
                          color:
                            content.status === "published"
                              ? "#22c55e"
                              : content.status === "draft"
                              ? "#eab308"
                              : "#6b7280",
                        }}
                      >
                        {content.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}