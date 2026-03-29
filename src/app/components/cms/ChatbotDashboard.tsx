import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  MessageCircle,
  Users,
  TrendingUp,
  Clock,
  Mail,
  Phone,
  Briefcase,
  Filter,
  Search,
  Download,
  Eye,
  X,
} from "lucide-react";
import { useChatbot } from "../../contexts/ChatbotContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "vrinda";
  timestamp: Date;
}

interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  businessType?: string;
  businessSize?: string;
  isRegistered?: boolean;
  currentChallenge?: string;
  purpose?: string;
  hasBusiness?: boolean;
  requirement?: string;
  conversationStage:
    | "greeting"
    | "collecting_contact"
    | "identifying_purpose"
    | "business_check"
    | "business_details"
    | "qualifying"
    | "qualified"
    | "converted";
  leadTemperature?: "hot" | "warm" | "cold";
}

interface ChatInteraction {
  id: string;
  sessionId: string;
  messages: Message[];
  leadData: LeadData;
  startTime: Date;
  lastActivity: Date;
  status: "active" | "qualified" | "converted" | "abandoned";
}

export function ChatbotDashboard() {
  const { interactions: contextInteractions } = useChatbot();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "qualified" | "converted" | "active">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInteraction, setSelectedInteraction] = useState<ChatInteraction | null>(null);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = contextInteractions.length;
    const qualified = contextInteractions.filter((i) => i.status === "qualified").length;
    const converted = contextInteractions.filter((i) => i.status === "converted").length;
    const active = contextInteractions.filter((i) => i.status === "active").length;
    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : "0";

    return {
      total,
      qualified,
      converted,
      active,
      conversionRate,
    };
  }, [contextInteractions]);

  // Filter interactions
  const filteredInteractions = useMemo(() => {
    let filtered = contextInteractions;

    if (selectedFilter !== "all") {
      filtered = filtered.filter((i) => i.status === selectedFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (i) =>
          i.leadData.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.leadData.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.leadData.company?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [contextInteractions, selectedFilter, searchQuery]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "converted":
        return "var(--success)";
      case "qualified":
        return "var(--accent-blue)";
      case "active":
        return "var(--warning)";
      case "abandoned":
        return "var(--text-tertiary)";
      default:
        return "var(--text-secondary)";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Vrinda Chatbot Analytics
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Monitor visitor interactions, track leads, and analyze conversions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "var(--accent-subtle)" }}
              >
                <MessageCircle className="w-6 h-6" style={{ color: "var(--accent-blue)" }} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {stats.total}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Total Interactions
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "var(--accent-subtle)" }}
              >
                <Users className="w-6 h-6" style={{ color: "var(--accent-blue)" }} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {stats.qualified}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Qualified Leads
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(34, 197, 94, 0.1)" }}
              >
                <TrendingUp className="w-6 h-6" style={{ color: "var(--success)" }} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {stats.converted}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Conversions
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "var(--accent-subtle)" }}
              >
                <Clock className="w-6 h-6" style={{ color: "var(--accent-blue)" }} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {stats.conversionRate}%
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Conversion Rate
            </p>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div
            className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
            }}
          >
            <Search className="w-5 h-5" style={{ color: "var(--text-tertiary)" }} />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className="px-4 py-3 rounded-xl transition-all"
              style={{
                background: selectedFilter === "all" ? "var(--accent-blue)" : "var(--bg-secondary)",
                color: selectedFilter === "all" ? "white" : "var(--text-primary)",
                border: `1px solid ${selectedFilter === "all" ? "var(--accent-blue)" : "var(--border-default)"}`,
              }}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter("qualified")}
              className="px-4 py-3 rounded-xl transition-all"
              style={{
                background:
                  selectedFilter === "qualified" ? "var(--accent-blue)" : "var(--bg-secondary)",
                color: selectedFilter === "qualified" ? "white" : "var(--text-primary)",
                border: `1px solid ${selectedFilter === "qualified" ? "var(--accent-blue)" : "var(--border-default)"}`,
              }}
            >
              Qualified
            </button>
            <button
              onClick={() => setSelectedFilter("converted")}
              className="px-4 py-3 rounded-xl transition-all"
              style={{
                background:
                  selectedFilter === "converted" ? "var(--accent-blue)" : "var(--bg-secondary)",
                color: selectedFilter === "converted" ? "white" : "var(--text-primary)",
                border: `1px solid ${selectedFilter === "converted" ? "var(--accent-blue)" : "var(--border-default)"}`,
              }}
            >
              Converted
            </button>
            <button
              onClick={() => setSelectedFilter("active")}
              className="px-4 py-3 rounded-xl transition-all"
              style={{
                background:
                  selectedFilter === "active" ? "var(--accent-blue)" : "var(--bg-secondary)",
                color: selectedFilter === "active" ? "white" : "var(--text-primary)",
                border: `1px solid ${selectedFilter === "active" ? "var(--accent-blue)" : "var(--border-default)"}`,
              }}
            >
              Active
            </button>
          </div>
        </div>

        {/* Interactions List */}
        <div className="space-y-4">
          {filteredInteractions.map((interaction) => (
            <motion.div
              key={interaction.id}
              whileHover={{ x: 4 }}
              className="p-6 rounded-2xl cursor-pointer"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
              }}
              onClick={() => setSelectedInteraction(interaction)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                      {interaction.leadData.name || "Anonymous Visitor"}
                    </h3>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: `${getStatusColor(interaction.status)}20`,
                        color: getStatusColor(interaction.status),
                      }}
                    >
                      {getStatusLabel(interaction.status)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {interaction.leadData.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{interaction.leadData.email}</span>
                      </div>
                    )}
                    {interaction.leadData.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{interaction.leadData.phone}</span>
                      </div>
                    )}
                    {interaction.leadData.company && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{interaction.leadData.company}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm mb-1" style={{ color: "var(--text-tertiary)" }}>
                    {formatDate(interaction.lastActivity)}
                  </p>
                  <button
                    className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                    style={{
                      background: "var(--accent-subtle)",
                      color: "var(--accent-blue)",
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    View Chat
                  </button>
                </div>
              </div>

              {interaction.leadData.requirement && (
                <div
                  className="p-3 rounded-lg text-sm"
                  style={{
                    background: "var(--bg-primary)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <strong style={{ color: "var(--text-primary)" }}>Requirement: </strong>
                  {interaction.leadData.requirement}
                </div>
              )}
            </motion.div>
          ))}

          {filteredInteractions.length === 0 && (
            <div
              className="text-center py-12 rounded-2xl"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <MessageCircle
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "var(--text-tertiary)" }}
              />
              <p style={{ color: "var(--text-secondary)" }}>No interactions found</p>
            </div>
          )}
        </div>
      </div>

      {/* Interaction Detail Modal */}
      {selectedInteraction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setSelectedInteraction(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6"
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-default)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Conversation Details
              </h2>
              <button
                onClick={() => setSelectedInteraction(null)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lead Info */}
            <div
              className="p-6 rounded-xl mb-6"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Lead Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm mb-1" style={{ color: "var(--text-tertiary)" }}>
                    Name
                  </p>
                  <p style={{ color: "var(--text-primary)" }}>
                    {selectedInteraction.leadData.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: "var(--text-tertiary)" }}>
                    Email
                  </p>
                  <p style={{ color: "var(--text-primary)" }}>
                    {selectedInteraction.leadData.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: "var(--text-tertiary)" }}>
                    Phone
                  </p>
                  <p style={{ color: "var(--text-primary)" }}>
                    {selectedInteraction.leadData.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: "var(--text-tertiary)" }}>
                    Company
                  </p>
                  <p style={{ color: "var(--text-primary)" }}>
                    {selectedInteraction.leadData.company || "N/A"}
                  </p>
                </div>
              </div>
              {selectedInteraction.leadData.requirement && (
                <div className="mt-4">
                  <p className="text-sm mb-1" style={{ color: "var(--text-tertiary)" }}>
                    Requirement
                  </p>
                  <p style={{ color: "var(--text-primary)" }}>
                    {selectedInteraction.leadData.requirement}
                  </p>
                </div>
              )}
            </div>

            {/* Chat Messages */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Conversation
              </h3>
              <div className="space-y-3">
                {selectedInteraction.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        message.sender === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                      }`}
                      style={{
                        background:
                          message.sender === "user" ? "var(--accent-blue)" : "var(--bg-secondary)",
                        color: message.sender === "user" ? "white" : "var(--text-primary)",
                        border:
                          message.sender === "vrinda" ? "1px solid var(--border-default)" : "none",
                      }}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p
                        className="text-xs mt-1"
                        style={{
                          color: message.sender === "user" ? "rgba(255,255,255,0.7)" : "var(--text-tertiary)",
                        }}
                      >
                        {formatDate(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}