import { Link } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { ModernTechVisualization } from "../components/ModernTechVisualization";
import { useTheme } from "../context/ThemeContext";
import { CategoryShowcase } from "../components/CategoryShowcase";

export function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Work");
  const { theme } = useTheme();

  // Get unique categories from projects
  const categories = [
    "All Work",
    ...Array.from(new Set(projects.map((p) => p.category))).filter(cat => cat !== 'Real Estate' && cat !== 'Marketplace'),
  ];

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "All Work"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div
      className="min-h-screen pb-16"
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Hero Section - Premium & Interactive */}
      <section
        className="max-w-7xl mx-auto px-6 pt-8 flex items-center relative overflow-hidden"
        style={{
          minHeight: "max(70vh, 580px)",
          backgroundColor: "var(--bg-primary)",
        }}
      >
        {/* Advanced Background Effects */}
        <div
          key={theme}
          className="absolute inset-0 overflow-hidden"
          style={{ pointerEvents: "none" }}
        >
          {/* Animated mesh gradient */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: theme === 'dark' 
                ? "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)"
                : "radial-gradient(circle at 30% 20%, rgba(0, 0, 0, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0, 0, 0, 0.06) 0%, transparent 50%)",
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Gradient orbs with enhanced motion */}
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: "-10%",
              right: "10%",
              width: "500px",
              height: "500px",
              background: theme === 'dark'
                ? "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, transparent 70%)",
              opacity: theme === 'dark' ? 0.08 : 0.12,
              borderRadius: "50%",
              filter: "blur(60px)",
            }}
          />

          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              bottom: "10%",
              left: "5%",
              width: "400px",
              height: "400px",
              background: theme === 'dark'
                ? "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(0, 0, 0, 0.25) 0%, transparent 70%)",
              opacity: theme === 'dark' ? 0.06 : 0.10,
              borderRadius: "50%",
              filter: "blur(50px)",
            }}
          />
        </div>

        <div className="w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Value & Credibility First */}
            <div className="space-y-8">
              {/* Credibility Signal - Immediate trust building */}
              <motion.div
                className="flex items-center gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="px-4 py-2 rounded-md"
                  style={{
                    backgroundColor: "var(--badge-bg)",
                    border: "1px solid var(--badge-border)",
                  }}
                >
                  <p
                    style={{
                      color: "var(--badge-text)",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    4+ Years Experience
                  </p>
                </div>
                <div
                  className="px-4 py-2 rounded-md"
                  style={{
                    backgroundColor: "var(--badge-bg)",
                    border: "1px solid var(--badge-border)",
                  }}
                >
                  <p
                    style={{
                      color: "var(--badge-text)",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Product Designer
                  </p>
                </div>
              </motion.div>

              {/* Value Proposition - Clear and outcome-focused */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h1
                  className="text-5xl lg:text-6xl mb-6"
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 600,
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                  }}
                >
                    Experienced <span style={{ 
                    background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Product Designer</span> who drives measurable
                  business outcomes
                </h1>

                <p
                  className="text-xl mb-8"
                  style={{
                    color: "var(--text-secondary)",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: "540px",
                  }}
                >
                  I turn complex user problems into simple,
                  scalable solutions—backed by research,
                  validated with data, and built to ship.
                </p>
              </motion.div>

              {/* Key Impact Metrics - Proof above the fold */}
              <motion.div
                className="grid grid-cols-3 gap-6 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{
                  borderTop: "1px solid var(--border-default)",
                  borderBottom:
                    "1px solid var(--border-default)",
                }}
              >
                <div>
                  <p
                    className="text-xl mb-1"
                    style={{
                      color: "var(--accent-blue)",
                      fontWeight: 700,
                    }}
                  >
                    Research-driven
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Design approach
                  </p>
                </div>
                <div>
                  <p
                    className="text-xl mb-1"
                    style={{
                      color: "var(--accent-blue)",
                      fontWeight: 700,
                    }}
                  >
                    User-centered
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Solutions
                  </p>
                </div>
                <div>
                  <p
                    className="text-xl mb-1"
                    style={{
                      color: "var(--accent-blue)",
                      fontWeight: 700,
                    }}
                  >
                    End-to-end
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Design process
                  </p>
                </div>
              </motion.div>

              {/* Stronger CTAs with clear intent */}
              <motion.div
                className="flex flex-wrap items-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Link
                  to="/work"
                  className="cursor-cta px-8 py-4 rounded transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: "var(--gradient-primary)",
                    color: "white",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "17px",
                    boxShadow:
                      "0 4px 12px rgba(30, 64, 175, 0.25), 0 2px 4px rgba(30, 64, 175, 0.12)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "var(--gradient-hover)";
                    e.currentTarget.style.transform =
                      "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(30, 64, 175, 0.35), 0 4px 8px rgba(30, 64, 175, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "var(--gradient-primary)";
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(30, 64, 175, 0.25), 0 2px 4px rgba(30, 64, 175, 0.12)";
                  }}
                >
                  See Case Studies
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded transition-all duration-200"
                  style={{
                    color: "#18181B",
                    fontWeight: 600,
                    fontSize: "17px",
                    border: "2px solid #E4E4E7",
                    borderRadius: "6px",
                    backgroundColor: "#FFFFFF",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--accent-blue)";
                    e.currentTarget.style.color = "var(--accent-blue)";
                    e.currentTarget.style.backgroundColor =
                      "#EFF6FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "#E4E4E7";
                    e.currentTarget.style.color = "#18181B";
                    e.currentTarget.style.backgroundColor =
                      "#FFFFFF";
                  }}
                >
                  Let's Talk
                </Link>
              </motion.div>

              {/* Quick value indicators - What I bring */}
              <motion.div
                className="pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <p
                  className="text-sm mb-3"
                  style={{
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  Specialized in:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      background: "var(--gradient-secondary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--badge-border)",
                      boxShadow:
                        "0 2px 4px rgba(30, 64, 175, 0.08)",
                    }}
                  >
                    B2B SaaS
                  </span>
                  <span
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      background: "var(--gradient-secondary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--badge-border)",
                      boxShadow:
                        "0 2px 4px rgba(30, 64, 175, 0.08)",
                    }}
                  >
                    FinTech
                  </span>
                  <span
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      background: "var(--gradient-secondary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--badge-border)",
                      boxShadow:
                        "0 2px 4px rgba(30, 64, 175, 0.08)",
                    }}
                  >
                    Design Systems
                  </span>
                  <span
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      background: "var(--gradient-secondary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--badge-border)",
                      boxShadow:
                        "0 2px 4px rgba(30, 64, 175, 0.08)",
                    }}
                  >
                    0→1 Products
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Real Product Preview */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ModernTechVisualization />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Process Preview - Strategic Thinking Above the Fold */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="flex items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#1E40AF" }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div>
              <h3
                className="text-lg mb-2"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Research-Driven
              </h3>
              <p
                className="text-sm"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Every design decision backed by user interviews,
                usability testing, and data analysis
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#1E40AF" }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <div>
              <h3
                className="text-lg mb-2"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Systems Approach
              </h3>
              <p
                className="text-sm"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Building scalable design systems and patterns
                that work across product lines
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#1E40AF" }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h3
                className="text-lg mb-2"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Outcome-Focused
              </h3>
              <p
                className="text-sm"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Measuring impact through metrics that
                matter—engagement, conversion, retention
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transitional Section - More refined bridge */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-8">
        <div className="max-w-2xl">
          <h2
            className="text-4xl mb-4"
            style={{
              color: "var(--text-primary)",
              fontWeight: 600,
            }}
          >
            Selected Work
          </h2>
          <p
            className="text-lg"
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Case studies showing problem-solving, design
            rationale, and measurable business impact across
            diverse project types.
          </p>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 items-center">
          <span
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
              fontWeight: 500,
            }}
          >
            Filter by:
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={{
                  backgroundColor:
                    selectedCategory === category
                      ? "var(--accent-blue)"
                      : "transparent",
                  color:
                    selectedCategory === category
                      ? "white"
                      : "var(--text-primary)",
                  border: `2px solid ${selectedCategory === category ? "var(--accent-blue)" : "var(--border-default)"}`,
                  fontWeight:
                    selectedCategory === category ? 600 : 500,
                  boxShadow:
                    selectedCategory === category
                      ? "0 4px 12px rgba(30, 64, 175, 0.25)"
                      : "none",
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "var(--accent-blue)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
          {selectedCategory !== "All Work" && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm px-4 py-2 rounded-lg"
              style={{
                backgroundColor: "var(--gradient-secondary)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}
            </motion.span>
          )}
        </div>
      </section>

      {/* Selected Work Grid with Animation */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid md:grid-cols-2 gap-8 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* How I Think */}
      <section
        className="max-w-7xl mx-auto px-6 pt-32 pb-16"
        style={{
          borderTop: "1px solid var(--border-default)",
        }}
      >
        <div className="space-y-16">
          <div className="max-w-2xl">
            <h2
              className="text-4xl mb-4"
              style={{
                color: "var(--text-primary)",
                fontWeight: 600,
              }}
            >
              How I Think
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              My approach to solving complex product challenges
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              className="space-y-5"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: "#1E40AF",
                  boxShadow:
                    "0 2px 8px rgba(47, 93, 159, 0.12)",
                }}
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Understand problem
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Start with user research and business context to
                define the real problem, not symptoms.
              </p>
              {/* Added user research image */}
              <div
                className="rounded-lg overflow-hidden mt-4"
                style={{
                  border: "1px solid var(--border-default)",
                  height: "256px",
                  position: "relative",
                  display: "flex",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1582601231162-132ca60713d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcmVzZWFyY2glMjBpbnRlcnZpZXd8ZW58MXx8fHwxNzY2NzYxNDkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="User research and testing"
                  className="w-full h-full object-cover"
                  style={{
                    minHeight: "100%",
                    minWidth: "100%",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-5"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: "#1E40AF",
                  boxShadow:
                    "0 2px 8px rgba(47, 93, 159, 0.12)",
                }}
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Design system & flows
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Build scalable solutions with clear information
                architecture and consistent patterns.
              </p>
              {/* Added design process image */}
              <div
                className="rounded-lg overflow-hidden mt-4"
                style={{
                  border: "1px solid var(--border-default)",
                  height: "256px",
                  position: "relative",
                  display: "flex",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1618229620434-ffcad889ffb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVWCUyMGRlc2lnbiUyMHByb2Nlc3MlMjB3aGl0ZWJvYXJkfGVufDF8fHx8MTc2Njg2MTE3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Design process and sketching"
                  className="w-full h-full object-cover"
                  style={{
                    minHeight: "100%",
                    minWidth: "100%",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-5"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: "#1E40AF",
                  boxShadow:
                    "0 2px 8px rgba(47, 93, 159, 0.12)",
                }}
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Validate & iterate
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Test with users, measure impact, and
                continuously refine based on data and feedback.
              </p>
              {/* Added analytics/data image */}
              <div
                className="rounded-lg overflow-hidden mt-4"
                style={{
                  border: "1px solid var(--border-default)",
                  height: "256px",
                  position: "relative",
                  display: "flex",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2Njg2MTE4MXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Data analytics and validation"
                  className="w-full h-full object-cover"
                  style={{
                    minHeight: "100%",
                    minWidth: "100%",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools & Strengths - More refined layout */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Strengths Card */}
          <div 
            className="p-8 rounded-2xl"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-default)',
            }}
          >
            <div className="mb-6">
              <h2
                className="text-3xl mb-2"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Strengths
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                What I bring to teams
              </p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent-blue)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{ color: "var(--text-primary)" }}
                >
                  End-to-end UX: research, strategy, design,
                  and delivery
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent-blue)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{ color: "var(--text-primary)" }}
                >
                  Systems thinking: scalable design systems
                  and patterns
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent-blue)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{ color: "var(--text-primary)" }}
                >
                  Stakeholder alignment: facilitating
                  decisions across teams
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent-blue)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{ color: "var(--text-primary)" }}
                >
                  Data-informed validation: quantitative +
                  qualitative
                </span>
              </li>
            </ul>
          </div>

          {/* Tools Card */}
          <div 
            className="p-8 rounded-2xl"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-default)',
            }}
          >
            <div className="mb-6">
              <h2
                className="text-3xl mb-2"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Tools
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                How I execute
              </p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent-blue)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{ color: "var(--text-primary)" }}
                >
                  Figma (design, prototyping, design systems)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent-blue)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{ color: "var(--text-primary)" }}
                >
                  User testing (Maze, UserTesting, in-person
                  sessions)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent-blue)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{ color: "var(--text-primary)" }}
                >
                  Analytics (Mixpanel, Amplitude, Hotjar)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent-blue)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{ color: "var(--text-primary)" }}
                >
                  Developer collaboration (handoff, React
                  knowledge)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Category Showcase - Before CTA */}
      <CategoryShowcase
        title="Explore Design Categories"
        subtitle="Browse through different design disciplines and styles"
      />

      {/* Footer CTA - Stronger call to action */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="text-center space-y-10">
          <div className="space-y-4">
            <h2
              className="text-4xl lg:text-5xl"
              style={{
                color: "var(--text-primary)",
                fontWeight: 600,
              }}
            >
              Let's build something meaningful
            </h2>
            <p
              className="text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Open to new opportunities and collaborations
            </p>
          </div>
          <div>
            <Link
              to="/contact"
              className="cursor-cta inline-block px-10 py-5 rounded transition-all duration-200"
              style={{
                background: "var(--gradient-primary)",
                color: "white",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "17px",
                boxShadow:
                  "0 4px 12px rgba(30, 64, 175, 0.25), 0 2px 4px rgba(30, 64, 175, 0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "var(--gradient-hover)";
                e.currentTarget.style.transform =
                  "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(30, 64, 175, 0.35), 0 4px 8px rgba(30, 64, 175, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "var(--gradient-primary)";
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(30, 64, 175, 0.25), 0 2px 4px rgba(30, 64, 175, 0.12)";
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Category Showcase - After CTA */}
      <CategoryShowcase />
    </div>
  );
}