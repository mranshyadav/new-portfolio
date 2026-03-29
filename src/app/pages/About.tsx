import { motion } from "motion/react";
import profileImage from 'figma:asset/542ae5d2665080871b73401b02cd9ca4e734081f.png';
import { ProfileImageFrame } from '../components/ProfileImageFrame';
import { CategoryShowcase } from '../components/CategoryShowcase';

export function About() {
  return (
    <div
      className="min-h-screen pb-16"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Hero Section with Image */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p
                className="text-sm uppercase tracking-wider mb-6"
                style={{
                  color: "var(--accent-blue)",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                }}
              >
                About Me
              </p>
              <h1
                className="text-5xl lg:text-6xl mb-6"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Building <span style={{ 
                  background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>meaningful experiences</span> through design
              </h1>
            </div>

            <div
              className="space-y-4 text-lg"
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              <p>
                I'm a product designer with 4+ years of
                experience creating digital experiences for B2B
                and B2C products. My work focuses on solving
                complex problems through research-driven design
                and close collaboration with cross-functional
                teams.
              </p>
              <p>
                Based in San Francisco, I've worked with
                startups and established companies across
                fintech, SaaS, and e-commerce sectors. I believe
                great design emerges from understanding user
                needs deeply and balancing them with business
                goals and technical constraints.
              </p>
            </div>

            {/* Contact CTA */}
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl"
              style={{
                backgroundColor: "var(--accent-blue)",
                color: "white",
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Let's Work Together
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right: Profile Image */}
          <ProfileImageFrame
            imageSrc={profileImage}
            imageAlt="Ansh Yadav - Product Designer"
            imageMaxHeight="600px"
            imageClassName="rounded-2xl"
          />
        </div>
      </section>

      {/* Get to Know Me Section */}
      <section 
        className="py-20 px-6"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-default)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div 
          className="flex flex-col items-center gap-8 mx-auto"
          style={{ width: "80rem", maxWidth: "100%" }}
        >
          <h2
            className="text-5xl text-center"
            style={{
              color: "var(--text-primary)",
              fontWeight: 600,
            }}
          >
            Get to know me
          </h2>

          {/* Bento Grid Layout */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* The Journey - Large Card (spans 2 columns) */}
            <motion.div
              className="lg:col-span-2 p-8 rounded-2xl space-y-6"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-default)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  style={{ color: "#EC4899" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <p
                  className="text-sm"
                  style={{
                    color: "#EC4899",
                    fontWeight: 600,
                  }}
                >
                  My Story
                </p>
              </div>

              <h3
                className="text-2xl"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                The Journey
              </h3>

              <div
                className="space-y-4"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                <p>
                  My design journey began over 5 years ago when I discovered
                  the power of design to solve real-world problems. What
                  started as curiosity evolved into a passion for creating
                  intuitive, beautiful experiences.
                </p>
                <p>
                  I believe great design is invisible—it seamlessly guides
                  users to their goals while delighting them along the way. My
                  approach combines user research, data analysis, and creative
                   thinking.
                </p>
              </div>
            </motion.div>

            {/* Core Values */}
            <motion.div
              className="p-8 rounded-2xl space-y-6"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-default)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  style={{ color: "var(--accent-blue)" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--accent-blue)",
                    fontWeight: 600,
                  }}
                >
                  Values
                </p>
              </div>

              <h3
                className="text-2xl"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Core Values
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#8B5CF6" }}
                  />
                  <p style={{ color: "var(--text-secondary)" }}>
                    User-centered design
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#EC4899" }}
                  />
                  <p style={{ color: "var(--text-secondary)" }}>
                    Continuous learning
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#3B82F6" }}
                  />
                  <p style={{ color: "var(--text-secondary)" }}>
                    Attention to detail
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#10B981" }}
                  />
                  <p style={{ color: "var(--text-secondary)" }}>
                    Collaborative mindset
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              className="p-8 rounded-2xl space-y-6"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-default)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  style={{ color: "#EC4899" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                <p
                  className="text-sm"
                  style={{
                    color: "#EC4899",
                    fontWeight: 600,
                  }}
                >
                  Learning
                </p>
              </div>

              <h3
                className="text-2xl"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Education
              </h3>

              <div className="space-y-4">
                <div>
                  <p
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    BA in Design
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Art Institute
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    2015 - 2018
                  </p>
                </div>

                <div
                  className="pt-4"
                  style={{ borderTop: "1px solid var(--border-default)" }}
                >
                  <p
                    className="font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Certifications
                  </p>
                  <ul
                    className="space-y-1 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <li>• Google UX Design</li>
                    <li>• Nielsen Norman Group</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* My Approach */}
            <motion.div
              className="lg:col-span-2 p-8 rounded-2xl space-y-6"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-default)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  style={{ color: "#F59E0B" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p
                  className="text-sm"
                  style={{
                    color: "#F59E0B",
                    fontWeight: 600,
                  }}
                >
                  Process
                </p>
              </div>

              <h3
                className="text-2xl"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                My Approach
              </h3>

              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div
                    className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      style={{ color: "#8B5CF6" }}
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
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "var(--text-primary)", fontSize: "14px" }}
                  >
                    Research
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Understanding user needs and pain points
                  </p>
                </div>

                <div>
                  <div
                    className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(236, 72, 153, 0.1)",
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      style={{ color: "#EC4899" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "var(--text-primary)", fontSize: "14px" }}
                  >
                    Ideate
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Brainstorm creative solutions
                  </p>
                </div>

                <div>
                  <div
                    className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      style={{ color: "#3B82F6" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "var(--text-primary)", fontSize: "14px" }}
                  >
                    Execute
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Deliver polished experiences
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Summary */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            <div>
              <h2
                className="text-4xl mb-4"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Experience Summary
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "18px",
                }}
              >
                A track record of delivering impactful design
                solutions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="p-8 rounded-xl"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-default)",
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: "#EFF6FF" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#1E40AF" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl mb-3"
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                >
                  Years of Experience
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  4+ years in product design, with experience in
                  senior roles leading end-to-end design for
                  complex B2B and B2C products
                </p>
              </motion.div>

              <motion.div
                className="p-8 rounded-xl"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-default)",
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: "#EFF6FF" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#1E40AF" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl mb-3"
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                >
                  Projects Delivered
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  15+ major design projects across various
                  industries, from early-stage startups to
                  established enterprises
                </p>
              </motion.div>

              <motion.div
                className="p-8 rounded-xl"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-default)",
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: "#EFF6FF" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "#1E40AF" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl mb-3"
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                >
                  Impact
                </h3>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                  }}
                >
                  <p>→ Designed products serving 2M+ users</p>
                  <p>→ Led 3 successful product launches</p>
                  <p>
                    → $10M+ additional revenue through conversion
                    optimization
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* My Journey Timeline Section */}
      <section 
        className="py-20 px-6"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-default)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p
              className="text-sm uppercase tracking-wider mb-4"
              style={{
                color: "var(--accent-blue)",
                letterSpacing: "0.12em",
                fontWeight: 600,
              }}
            >
              Career Path
            </p>
            <h2
              className="text-5xl mb-4"
              style={{
                color: "var(--text-primary)",
                fontWeight: 600,
              }}
            >
              My Journey
            </h2>
            <p
              className="text-lg"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              From graphic design to senior UX designer - A story of growth and passion
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5"
              style={{
                backgroundColor: "var(--border-default)",
              }}
            />

            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Experience 5 - Current (First) */}
              <motion.div
                className="relative flex gap-8 group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Timeline Dot - Current Position */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center relative"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "3px solid #F59E0B",
                    }}
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(245, 158, 11, 0.4)",
                        "0 0 0 10px rgba(245, 158, 11, 0)",
                      ],
                    }}
                    transition={{
                      scale: { duration: 0.2 },
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <svg
                      className="w-7 h-7"
                      style={{ color: "#F59E0B" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  className="flex-1 p-8 rounded-2xl"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    border: "2px solid #F59E0B",
                  }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.2)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: "rgba(245, 158, 11, 0.1)",
                        color: "#F59E0B",
                        fontWeight: 600,
                      }}
                    >
                      Full Time • Current
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      May 2025 - Present
                    </span>
                  </div>

                  <h3
                    className="text-2xl mb-2"
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    UI/UX Designer
                  </h3>

                  <p
                    className="text-lg mb-4"
                    style={{
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    Nityom Technology Private Limited
                  </p>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    Currently working on innovative design solutions, collaborating with cross-functional teams to create exceptional user experiences.
                  </p>
                </motion.div>
              </motion.div>

              {/* Experience 4 */}
              <motion.div
                className="relative flex gap-8 group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "3px solid #10B981",
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="w-7 h-7"
                      style={{ color: "#10B981" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  className="flex-1 p-8 rounded-2xl"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    border: "1px solid var(--border-default)",
                  }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        color: "#10B981",
                        fontWeight: 600,
                      }}
                    >
                      Full Time
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      November 2024 - March 2025
                    </span>
                  </div>

                  <h3
                    className="text-2xl mb-2"
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    UI/UX Designer
                  </h3>

                  <p
                    className="text-lg mb-4"
                    style={{
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    Nityom Technology Private Limited
                  </p>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    Advanced to UI/UX Designer role, leading design initiatives and mentoring junior team members while delivering high-impact projects.
                  </p>
                </motion.div>
              </motion.div>

              {/* Experience 3 */}
              <motion.div
                className="relative flex gap-8 group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "3px solid #3B82F6",
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="w-7 h-7"
                      style={{ color: "#3B82F6" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  className="flex-1 p-8 rounded-2xl"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    border: "1px solid var(--border-default)",
                  }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        color: "#3B82F6",
                        fontWeight: 600,
                      }}
                    >
                      Full Time
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      September 2023 - November 2024
                    </span>
                  </div>

                  <h3
                    className="text-2xl mb-2"
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Junior UI/UX Designer
                  </h3>

                  <p
                    className="text-lg mb-4"
                    style={{
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    Nityom Technology Private Limited
                  </p>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    First full-time role as a designer, taking on more responsibilities and working on complex design projects from concept to delivery.
                  </p>
                </motion.div>
              </motion.div>

              {/* Experience 2 - UI/UX Design Internship */}
              <motion.div
                className="relative flex gap-8 group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "3px solid #EC4899",
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="w-7 h-7"
                      style={{ color: "#EC4899" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  className="flex-1 p-8 rounded-2xl"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    border: "1px solid var(--border-default)",
                  }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: "rgba(236, 72, 153, 0.1)",
                        color: "#EC4899",
                        fontWeight: 600,
                      }}
                    >
                      Internship
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      February 2023 - September 2023
                    </span>
                  </div>

                  <h3
                    className="text-2xl mb-2"
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    UI/UX Design
                  </h3>

                  <p
                    className="text-lg mb-4"
                    style={{
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    Nityom Technology Private Limited
                  </p>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    Transitioned into UI/UX design, working on user interfaces and learning the importance of user experience in digital products.
                  </p>
                </motion.div>
              </motion.div>

              {/* Experience 1 - Graphic Design (First Position) */}
              <motion.div
                className="relative flex gap-8 group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "3px solid #8B5CF6",
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="w-7 h-7"
                      style={{ color: "#8B5CF6" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  className="flex-1 p-8 rounded-2xl"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    border: "1px solid var(--border-default)",
                  }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                        color: "#8B5CF6",
                        fontWeight: 600,
                      }}
                    >
                      Internship
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      August 2022 - January 2023
                    </span>
                  </div>

                  <h3
                    className="text-2xl mb-2"
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Graphic Design
                  </h3>

                  <p
                    className="text-lg mb-4"
                    style={{
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    Nityom Technology Private Limited
                  </p>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    Started my design journey with graphic design, creating visual content and learning the fundamentals of design principles.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase - Before CTA */}
      <CategoryShowcase
        title="Design Expertise"
        subtitle="Skilled across multiple design disciplines"
      />

      {/* Bottom CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center p-12 rounded-2xl"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h2
                className="text-3xl md:text-4xl mb-4"
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                }}
              >
                Let's Work Together
              </h2>

              <p
                className="text-lg mb-8"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  maxWidth: "500px",
                  margin: "0 auto 2rem",
                }}
              >
                I'm always open to discussing new projects and opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl"
                  style={{
                    backgroundColor: "var(--accent-blue)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "16px",
                    textDecoration: "none",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Get in Touch
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>

                <motion.a
                  href="/work"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                    fontSize: "16px",
                    textDecoration: "none",
                    border: "1px solid var(--border-default)",
                  }}
                  whileHover={{ 
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--text-tertiary)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  View My Work
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Showcase - After CTA */}
      <CategoryShowcase />
    </div>
  );
}