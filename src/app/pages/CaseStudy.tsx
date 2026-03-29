import { motion, useScroll, useTransform } from "motion/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, ChevronDown, Target, Lightbulb, Users, TrendingUp, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects, caseStudy } from "../data/projects";

export function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0a0e1a" }}
      >
        <div className="text-center">
          <h1 className="text-3xl mb-4" style={{ color: "#fff" }}>
            Case Study Not Found
          </h1>
          <Link
            to="/work"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #0a0e1a 0%, #0f1729 50%, #0a0e1a 100%)",
        color: "#fff",
      }}
    >
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(59, 130, 246, 0.15))",
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Back Button */}
        <motion.div
          className="absolute top-8 left-8 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => navigate("/work")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 group"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span style={{ fontSize: "14px", fontWeight: 500 }}>Back to Work</span>
          </button>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Category Badge */}
            <motion.div
              className="inline-block mb-6 px-4 py-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              whileHover={{ scale: 1.05 }}
            >
              {project.category}
            </motion.div>

            {/* Project Title */}
            <h1
              className="text-6xl lg:text-7xl mb-6"
              style={{
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {project.title}
            </h1>

            {/* Impact Statement */}
            <p
              className="text-2xl lg:text-3xl mb-8"
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {project.outcome}
            </p>

            {/* Project Description */}
            <p
              className="text-lg mb-12 max-w-3xl mx-auto"
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                lineHeight: 1.7,
              }}
            >
              {project.context}
            </p>

            {/* Metadata Pills */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { label: "Role", value: project.role },
                { label: "Year", value: project.year },
                { label: "Platform", value: project.domain },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="px-6 py-3 rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{
                    background: "rgba(255, 255, 255, 0.08)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    y: -2,
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.5)",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  fontSize: "16px",
                  fontWeight: 600,
                  boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 48px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                View Live
                <ExternalLink className="w-4 h-4" />
              </motion.a>

              <motion.button
                onClick={scrollToNextSection}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
                whileHover={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Scroll Down
                <ChevronDown className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            className="w-6 h-6"
            style={{ color: "rgba(255, 255, 255, 0.3)" }}
          />
        </motion.div>
      </motion.section>

      {/* Project Snapshot */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl lg:text-5xl mb-4"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Project Snapshot
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "18px",
              }}
            >
              Quick overview of the project scope and impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                title: "Problem",
                content: caseStudy.businessProblem,
                gradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))",
                borderColor: "rgba(239, 68, 68, 0.3)",
              },
              {
                icon: <Lightbulb className="w-6 h-6" />,
                title: "Solution",
                content: project.responsibility,
                gradient: "linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.1))",
                borderColor: "rgba(251, 191, 36, 0.3)",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Impact",
                content: project.outcome,
                gradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.1))",
                borderColor: "rgba(34, 197, 94, 0.3)",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Role",
                content: project.role,
                gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.1))",
                borderColor: "rgba(139, 92, 246, 0.3)",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ),
                title: "Tools",
                content: project.tags.join(", "),
                gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(219, 39, 119, 0.1))",
                borderColor: "rgba(236, 72, 153, 0.3)",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Duration",
                content: caseStudy.timeline,
                gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))",
                borderColor: "rgba(59, 130, 246, 0.3)",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl relative overflow-hidden group"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  borderColor: item.borderColor,
                  boxShadow: `0 20px 60px ${item.borderColor}`,
                }}
              >
                {/* Gradient Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: item.gradient,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                    style={{
                      background: item.gradient,
                      border: `1px solid ${item.borderColor}`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="text-xl mb-3"
                    style={{
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      lineHeight: 1.7,
                      fontSize: "15px",
                    }}
                  >
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section
        className="py-24 px-6"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                className="inline-block px-4 py-2 rounded-full mb-6"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#EF4444",
                }}
              >
                The Problem
              </div>

              <h2
                className="text-4xl lg:text-5xl mb-6"
                style={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Understanding the Challenge
              </h2>

              <p
                className="text-lg mb-8"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.8,
                }}
              >
                {caseStudy.businessProblem}
              </p>

              <div className="space-y-4">
                <h3
                  className="text-xl mb-4"
                  style={{
                    fontWeight: 600,
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  Key Pain Points:
                </h3>
                {caseStudy.research.painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: "rgba(239, 68, 68, 0.2)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                      }}
                    >
                      <span style={{ fontSize: "12px" }}>✗</span>
                    </div>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.7)",
                        lineHeight: 1.6,
                      }}
                    >
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "2rem",
                }}
              >
                <img
                  src={project.image}
                  alt="Problem visualization"
                  className="w-full h-auto rounded-xl"
                  style={{
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                  }}
                />
              </div>

              {/* Floating Stats */}
              <motion.div
                className="absolute -bottom-8 -left-8 p-6 rounded-xl"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  boxShadow: "0 20px 60px rgba(239, 68, 68, 0.2)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: "#EF4444" }}
                >
                  31%
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  Annual Churn Rate
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research & Insights */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#3B82F6",
              }}
            >
              Research
            </div>
            <h2
              className="text-4xl lg:text-5xl mb-4"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Key Insights
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "18px",
              }}
            >
              Findings from user interviews and data analysis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {caseStudy.research.keyFindings.map((finding, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl group relative overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  boxShadow: "0 20px 60px rgba(59, 130, 246, 0.2)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                  }}
                />

                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#3B82F6",
                    }}
                  >
                    {index + 1}
                  </div>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.7,
                      fontSize: "16px",
                    }}
                  >
                    {finding}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunity Definition */}
      <section
        className="py-24 px-6"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(251, 191, 36, 0.1)",
                border: "1px solid rgba(251, 191, 36, 0.3)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#FBBF24",
              }}
            >
              Opportunity
            </div>
            <h2
              className="text-4xl lg:text-5xl mb-4"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              How Might We...
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              "Simplify complex workflows without sacrificing power user capabilities?",
              "Reduce cognitive load while maintaining comprehensive feature access?",
              "Provide meaningful feedback during data processing to build user trust?",
            ].map((question, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl group"
                style={{
                  background: "linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.05))",
                  border: "1px solid rgba(251, 191, 36, 0.2)",
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  borderColor: "rgba(251, 191, 36, 0.4)",
                  boxShadow: "0 20px 60px rgba(251, 191, 36, 0.15)",
                }}
              >
                <p
                  className="text-xl"
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  {question}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design System Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#8B5CF6",
              }}
            >
              Design System
            </div>
            <h2
              className="text-4xl lg:text-5xl mb-4"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Visual Language
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "18px",
              }}
            >
              Scalable components and design tokens
            </p>
          </motion.div>

          {/* Color Palette */}
          <motion.div
            className="mb-12 p-8 rounded-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl mb-6"
              style={{
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Color Palette
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { color: "#3B82F6", name: "Primary Blue" },
                { color: "#8B5CF6", name: "Purple" },
                { color: "#EC4899", name: "Pink" },
                { color: "#10B981", name: "Success" },
                { color: "#F59E0B", name: "Warning" },
                { color: "#EF4444", name: "Error" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex-1 min-w-[120px]"
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className="h-24 rounded-xl mb-3"
                    style={{
                      background: item.color,
                      boxShadow: `0 8px 32px ${item.color}40`,
                    }}
                  />
                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(255, 255, 255, 0.7)",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.4)",
                      textAlign: "center",
                      fontFamily: "monospace",
                    }}
                  >
                    {item.color}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            className="p-8 rounded-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl mb-6"
              style={{
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Typography Scale
            </h3>
            <div className="space-y-4">
              {[
                { size: "48px", label: "Heading 1", text: "The quick brown fox" },
                { size: "36px", label: "Heading 2", text: "The quick brown fox" },
                { size: "24px", label: "Heading 3", text: "The quick brown fox jumps over" },
                { size: "16px", label: "Body", text: "The quick brown fox jumps over the lazy dog" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div
                    style={{
                      width: "100px",
                      fontSize: "13px",
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: item.size,
                      fontWeight: 600,
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Solution */}
      <section
        className="py-24 px-6"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#22C55E",
              }}
            >
              Final Solution
            </div>
            <h2
              className="text-4xl lg:text-5xl mb-4"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              The Redesigned Experience
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "18px",
              }}
            >
              High-fidelity designs and key feature highlights
            </p>
          </motion.div>

          {/* Product Screenshots */}
          <div className="space-y-12">
            {caseStudy.productImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "1.5rem",
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-auto rounded-xl"
                    style={{
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                </div>
                <motion.p
                  className="mt-4 text-center"
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {image.caption}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Results */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#22C55E",
              }}
            >
              Impact
            </div>
            <h2
              className="text-4xl lg:text-5xl mb-4"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Measurable Results
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "18px",
              }}
            >
              The outcome of thoughtful design decisions
            </p>
          </motion.div>

          {/* Metrics Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {caseStudy.impact.metrics.map((metric, index) => {
              const match = metric.match(/(\d+%)/);
              const percentage = match ? match[1] : "";
              const description = metric.replace(percentage, "").trim();

              return (
                <motion.div
                  key={index}
                  className="p-8 rounded-2xl text-center group"
                  style={{
                    background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05))",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                    borderColor: "rgba(34, 197, 94, 0.4)",
                    boxShadow: "0 20px 60px rgba(34, 197, 94, 0.2)",
                  }}
                >
                  <motion.div
                    className="text-5xl font-bold mb-3"
                    style={{
                      background: "linear-gradient(135deg, #22C55E, #10B981)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {percentage || metric.split(" ")[0]}
                  </motion.div>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "14px",
                      lineHeight: 1.5,
                    }}
                  >
                    {description || metric.substring(metric.indexOf(" ") + 1)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Outcomes */}
          <div className="space-y-4">
            <h3
              className="text-2xl mb-6"
              style={{
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Key Outcomes
            </h3>
            {caseStudy.impact.outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(34, 197, 94, 0.3)",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(34, 197, 94, 0.2)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                  }}
                >
                  <Check className="w-4 h-4" style={{ color: "#22C55E" }} />
                </div>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: 1.7,
                  }}
                >
                  {outcome}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learnings & Reflection */}
      <section
        className="py-24 px-6"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(236, 72, 153, 0.1)",
                border: "1px solid rgba(236, 72, 153, 0.3)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#EC4899",
              }}
            >
              Reflection
            </div>
            <h2
              className="text-4xl lg:text-5xl mb-4"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Key Takeaways
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "18px",
              }}
            >
              What I learned from this project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Learnings */}
            <motion.div
              className="p-8 rounded-2xl"
              style={{
                background: "rgba(34, 197, 94, 0.05)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-2xl mb-6 flex items-center gap-3"
                style={{
                  fontWeight: 600,
                  color: "#22C55E",
                }}
              >
                <Lightbulb className="w-6 h-6" />
                Learnings
              </h3>
              <div className="space-y-4">
                {caseStudy.reflection.learnings.map((learning, index) => (
                  <div
                    key={index}
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.7,
                      paddingLeft: "1rem",
                      borderLeft: "2px solid rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    {learning}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Improvements */}
            <motion.div
              className="p-8 rounded-2xl"
              style={{
                background: "rgba(251, 191, 36, 0.05)",
                border: "1px solid rgba(251, 191, 36, 0.2)",
              }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-2xl mb-6 flex items-center gap-3"
                style={{
                  fontWeight: 600,
                  color: "#FBBF24",
                }}
              >
                <Target className="w-6 h-6" />
                Future Improvements
              </h3>
              <div className="space-y-4">
                {caseStudy.reflection.improvements.map((improvement, index) => (
                  <div
                    key={index}
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.7,
                      paddingLeft: "1rem",
                      borderLeft: "2px solid rgba(251, 191, 36, 0.3)",
                    }}
                  >
                    {improvement}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative rounded-3xl overflow-hidden p-16 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
              border: "1px solid rgba(59, 130, 246, 0.2)",
            }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="relative z-10">
              <p
                className="text-sm uppercase tracking-wider mb-4"
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                }}
              >
                Next Case Study
              </p>
              <h3
                className="text-4xl lg:text-5xl mb-6"
                style={{
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                }}
              >
                {nextProject.title}
              </h3>
              <p
                className="text-lg mb-10 max-w-2xl mx-auto"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.7,
                }}
              >
                {nextProject.outcome}
              </p>

              <Link to={`/case-study/${nextProject.id}`}>
                <motion.button
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#fff",
                    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 12px 48px rgba(59, 130, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Next Project
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
