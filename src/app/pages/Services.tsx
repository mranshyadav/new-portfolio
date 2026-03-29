import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Star, Award, TrendingUp, Shield, X, Send, Sparkles, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "../components/AuthModal";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  deliverables: string[];
  timeline: string;
  price: string;
}

const services: Service[] = [
  {
    id: "digital-presence-package",
    title: "Complete Digital Presence Package",
    description: "Everything your business needs to establish a strong online presence. A comprehensive combo package that includes website design, SEO optimization, social media setup, and local business listings - all in one.",
    image: "https://images.unsplash.com/photo-1562577308-9e66f0c65ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MXx8fHwxNzY2ODQyNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    deliverables: [
      "Professional website with on-page SEO optimization",
      "Social media profiles (Facebook, Instagram, LinkedIn, Twitter)",
      "Google Business Profile setup & optimization",
      "Local citations & directory listings (20+ platforms)",
      "Brand consistency across all digital channels"
    ],
    timeline: "6-8 weeks",
    price: "Starting at $9,500"
  },
  {
    id: "website-design",
    title: "Website Design",
    description: "Custom website designs that elevate your brand and engage visitors. From landing pages to full corporate websites, I create responsive designs that convert.",
    image: "https://images.unsplash.com/photo-1707836868495-3307d371aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc2Njc4NDMyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    deliverables: [
      "Custom website designs (all pages)",
      "Responsive layouts (mobile, tablet, desktop)",
      "Brand-aligned visual design",
      "Interactive prototypes & style guide"
    ],
    timeline: "4-6 weeks",
    price: "Starting at $7,500"
  },
  {
    id: "mobile-app-design",
    title: "Mobile App Design",
    description: "Native iOS and Android app designs that follow platform guidelines while maintaining your brand identity. Optimized for touch interactions.",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzY2ODMyNTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    deliverables: [
      "iOS & Android designs",
      "Responsive layouts",
      "Interactive prototypes",
      "App icon & splash screens"
    ],
    timeline: "5-9 weeks",
    price: "Starting at $10,000"
  },
  {
    id: "web-app-design",
    title: "Web Application Design",
    description: "Responsive web application designs that work seamlessly across devices. From dashboards to complex SaaS products.",
    image: "https://images.unsplash.com/photo-1637937459053-c788742455be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHNjcmVlbnxlbnwxfHx8fDE3NjY3Mjc2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    deliverables: [
      "Responsive web designs",
      "Dashboard & data visualization",
      "Component specifications",
      "Developer handoff files"
    ],
    timeline: "6-10 weeks",
    price: "Starting at $11,000"
  },
  {
    id: "ux-ui-design",
    title: "UX/UI Design",
    description: "End-to-end product design that balances user needs with business goals. From wireframes to high-fidelity prototypes, I create intuitive interfaces that users love.",
    image: "https://images.unsplash.com/photo-1716703432522-d6d2aab1c993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjY3ODE3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    deliverables: [
      "User flows & information architecture",
      "Wireframes & interactive prototypes",
      "High-fidelity UI designs",
      "Design handoff documentation"
    ],
    timeline: "4-8 weeks",
    price: "Starting at $8,000"
  },
  {
    id: "user-research",
    title: "User Research & Testing",
    description: "Data-driven insights to inform design decisions. I conduct comprehensive research to understand your users' behaviors, needs, and pain points.",
    image: "https://images.unsplash.com/photo-1582601231162-132ca60713d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcmVzZWFyY2glMjBpbnRlcnZpZXd8ZW58MXx8fHwxNzY2NzYxNDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    deliverables: [
      "User interviews & surveys",
      "Usability testing sessions",
      "User personas & journey maps",
      "Research findings report"
    ],
    timeline: "2-4 weeks",
    price: "Starting at $4,500"
  },
  {
    id: "design-systems",
    title: "Design Systems",
    description: "Scalable design systems that ensure consistency across your product. I create comprehensive component libraries and design guidelines.",
    image: "https://images.unsplash.com/photo-1698440050363-1697e5f0277c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBjb21wb25lbnRzfGVufDF8fHx8MTc2Njg0MTE4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    deliverables: [
      "Component library",
      "Design tokens & style guide",
      "Documentation & usage guidelines",
      "Figma/Sketch files"
    ],
    timeline: "6-10 weeks",
    price: "Starting at $12,000"
  },
  {
    id: "product-strategy",
    title: "Product Strategy",
    description: "Strategic planning to align your product vision with user needs and market opportunities. I help define product roadmaps and feature prioritization.",
    image: "https://images.unsplash.com/photo-1732437334226-e96e72272bc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwc3RyYXRlZ3klMjBtZWV0aW5nfGVufDF8fHx8MTc2Njg0MTE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    deliverables: [
      "Product vision & roadmap",
      "Competitive analysis",
      "Feature prioritization",
      "Strategic recommendations"
    ],
    timeline: "3-5 weeks",
    price: "Starting at $6,000"
  }
];

export function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  // Initialize all cards to collapsed state explicitly
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    services.forEach(service => {
      initialState[service.id] = false;
    });
    return initialState;
  });
  const { isAuthenticated } = useAuth();

  // Prevent body scroll when success popup is open
  useEffect(() => {
    if (showSuccessPopup) {
      document.body.style.overflow = "hidden";
      
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showSuccessPopup]);

  const handleShowInterest = (serviceName: string) => {
    if (!isAuthenticated) {
      setSelectedService(serviceName);
      setIsAuthModalOpen(true);
    } else {
      setSelectedService(serviceName);
      setShowSuccessPopup(true);
      // Auto-hide success popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    }
  };

  const toggleDeliverables = (serviceId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      {/* Hero Section - Premium Professional & Interactive */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--bg-primary)",
        }}
      >
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated mesh gradient */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 50%)",
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

          {/* Floating orbs */}
          <motion.div
            className="absolute"
            style={{
              top: "15%",
              right: "10%",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)",
              opacity: 0.08,
              borderRadius: "50%",
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute"
            style={{
              bottom: "20%",
              left: "5%",
              width: "350px",
              height: "350px",
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
              opacity: 0.06,
              borderRadius: "50%",
              filter: "blur(50px)",
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(var(--accent-blue) 1px, transparent 1px),
                linear-gradient(90deg, var(--accent-blue) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 pb-20 relative z-10">
          {/* Premium Badge with Animation */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full relative overflow-hidden group cursor-pointer"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ scale: 1.02, borderColor: "var(--accent-blue)" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2,
                }}
              />
              
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: "var(--accent-blue)" }} />
              </motion.div>
              <span
                style={{
                  color: "var(--accent-blue)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Premium UX/UI Design & Digital Solutions
              </span>
              <Shield className="w-4 h-4" style={{ color: "var(--accent-blue)", opacity: 0.8 }} />
            </motion.div>
          </motion.div>

          {/* Main Headline with Gradient Text */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1
              className="text-5xl lg:text-6xl"
              style={{
                color: "var(--text-primary)",
                lineHeight: 1.1,
                maxWidth: "1000px",
                margin: "0 auto 1.75rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Transform Your Vision Into{" "}
              <span 
                style={{ 
                  background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Exceptional Digital Experiences
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="text-xl"
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "720px",
                margin: "0 auto",
                fontSize: "1.15rem",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Award-winning design solutions that drive measurable business results. From strategy to execution, I create user-centered digital products that your customers love and your business needs.
            </motion.p>
          </motion.div>

          {/* Premium CTAs with Enhanced Interactions */}
          <motion.div 
            className="flex flex-wrap gap-4 justify-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contact"
                className="relative inline-flex items-center gap-2.5 px-9 py-4 rounded-xl overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1) inset",
                  border: "none",
                }}
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  }}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 3,
                  }}
                />
                
                <span className="relative z-10">Schedule Free Consultation</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/work"
                className="relative inline-flex items-center gap-2.5 px-9 py-4 rounded-xl transition-all duration-300 group"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "2px solid var(--border-default)",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-blue)";
                  e.currentTarget.style.backgroundColor = "var(--bg-primary)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(59, 130, 246, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span>View Case Studies</span>
                <motion.div
                  className="flex items-center"
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Stats Cards - Premium Design */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {[
              {
                icon: Award,
                value: "5+ Years",
                label: "Experience",
                color: "#3B82F6",
              },
              {
                icon: Star,
                value: "50+",
                label: "Projects Delivered",
                color: "#8B5CF6",
              },
              {
                icon: TrendingUp,
                value: "100%",
                label: "Client Satisfaction",
                color: "#10B981",
              },
              {
                icon: Shield,
                value: "NDA",
                label: "Protected",
                color: "#F59E0B",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ 
                  y: -6,
                  transition: { duration: 0.2 } 
                }}
              >
                {/* Card background with gradient border */}
                <div
                  className="relative p-6 md:p-7 rounded-2xl text-center overflow-hidden"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = stat.color;
                    e.currentTarget.style.boxShadow = `0 8px 30px ${stat.color}20`;
                    e.currentTarget.style.backgroundColor = "var(--bg-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-default)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.03)";
                    e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                  }}
                >
                  {/* Gradient glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${stat.color}15 0%, transparent 70%)`,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon with animated background */}
                  <motion.div
                    className="relative mx-auto mb-4 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${stat.color}10`,
                      border: `1px solid ${stat.color}30`,
                    }}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <stat.icon
                      className="w-7 h-7 md:w-8 md:h-8"
                      style={{ color: stat.color }}
                    />
                  </motion.div>

                  {/* Value with counter animation */}
                  <motion.p
                    style={{
                      color: stat.color,
                      fontSize: "clamp(1.6rem, 4vw, 1.9rem)",
                      fontWeight: 700,
                      lineHeight: 1,
                      marginBottom: "0.5rem",
                      letterSpacing: "-0.02em",
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {stat.value}
                  </motion.p>

                  {/* Label */}
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </p>

                  {/* Decorative corner accent */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at 100% 0%, ${stat.color}15 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badge Footer */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p
              className="text-sm flex items-center justify-center gap-2 flex-wrap"
              style={{
                color: "var(--text-secondary)",
                opacity: 0.8,
              }}
            >
              <CheckCircle2 className="w-4 h-4" style={{ color: "var(--accent-blue)" }} />
              <span>Trusted by startups and Fortune 500 companies</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span>Response within 24 hours</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        className="py-20"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-default)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <h2
              className="mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Services Offered
            </h2>
            <p
              className="text-xl max-w-2xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Specialized design services to help you build better products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-default)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-blue)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Service Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: "240px", display: "flex" }}
                >
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      minHeight: "100%",
                      minWidth: "100%",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
                    }}
                  />
                </div>

                {/* Service Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3
                    className="mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="mb-3"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mb-3">
                    <button
                      onClick={() => toggleDeliverables(service.id)}
                      className="w-full flex items-center justify-between mb-2 cursor-pointer transition-colors duration-200"
                      style={{
                        color: "var(--accent-blue)",
                        fontWeight: 600,
                        backgroundColor: "transparent",
                        border: "none",
                        padding: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--accent-blue)";
                      }}
                    >
                      <span>Key Deliverables:</span>
                      <motion.div
                        animate={{ rotate: expandedCards[service.id] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedCards[service.id] ? "auto" : 0,
                        opacity: expandedCards[service.id] ? 1 : 0
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <ul className="space-y-1.5">
                        {service.deliverables.map((deliverable, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle2
                              className="w-5 h-5 flex-shrink-0 mt-0.5"
                              style={{ color: "var(--accent-blue)" }}
                            />
                            <span
                              style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.95rem",
                              }}
                            >
                              {deliverable}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Price and CTA */}
                  <div
                    className="flex items-center justify-between pt-3 mt-auto"
                    style={{
                      borderTop: "1px solid var(--border-default)",
                    }}
                  >
                    <div>
                      <p
                        className="text-sm mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Investment
                      </p>
                      <p
                        style={{
                          color: "var(--accent-blue)",
                          fontWeight: 700,
                          fontSize: "1.25rem",
                        }}
                      >
                        {service.price.replace("Starting at ", "")}
                      </p>
                    </div>

                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200"
                      style={{
                        background: "var(--gradient-primary)",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "1rem",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 32px rgba(30, 64, 175, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 16px rgba(30, 64, 175, 0.2)";
                      }}
                      onClick={() => handleShowInterest(service.title)}
                    >
                      Show Interest
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2
            className="mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            How We Work Together
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            A proven process that delivers results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Discovery",
              description: "We start by understanding your business goals, user needs, and technical constraints.",
            },
            {
              step: "02",
              title: "Research & Strategy",
              description: "Deep dive into user research and competitive analysis to inform our design decisions.",
            },
            {
              step: "03",
              title: "Design & Iterate",
              description: "Create wireframes and high-fidelity designs, iterating based on feedback and testing.",
            },
            {
              step: "04",
              title: "Deliver & Support",
              description: "Hand off designs with documentation and provide ongoing support during implementation.",
            },
          ].map((phase, index) => (
            <motion.div
              key={phase.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <div
                className="text-6xl mb-4 opacity-20"
                style={{
                  color: "var(--accent-blue)",
                  fontWeight: 700,
                }}
              >
                {phase.step}
              </div>
              <h3
                className="mb-3"
                style={{ color: "var(--accent-blue)" }}
              >
                {phase.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-default)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h2
            className="mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Ready to Start Your Project?
          </h2>
          <p
            className="text-xl mb-8"
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Let's discuss how we can work together to create exceptional digital experiences for your users. Schedule a free consultation call to explore your project needs.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg transition-all duration-200"
              style={{
                background: "var(--gradient-primary)",
                color: "white",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(30, 64, 175, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={`https://wa.me/919696975512`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-blue)";
                e.currentTarget.style.color = "var(--accent-blue)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-default)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              WhatsApp Me
            </a>
          </div>
        </motion.div>
      </section>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => {
          setIsAuthModalOpen(false);
          setShowSuccessPopup(true);
          // Auto-hide success popup after 3 seconds
          setTimeout(() => {
            setShowSuccessPopup(false);
          }, 3000);
        }}
      />

      {/* Success Popup */}
      {showSuccessPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 1000 }}
        >
          <div
            className="fixed inset-0"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => setShowSuccessPopup(false)}
          />
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative p-8 rounded-2xl shadow-2xl pointer-events-auto"
            style={{
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-default)",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--gradient-primary)",
                  }}
                >
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                    }}
                  >
                    Interest Recorded!
                  </h3>
                </div>
              </div>
              <button
                className="p-2 rounded-lg transition-all duration-200"
                style={{
                  color: "var(--text-secondary)",
                }}
                onClick={() => setShowSuccessPopup(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Thank you for your interest in <strong style={{ color: "var(--accent-blue)" }}>{selectedService}</strong>. We've recorded your interest and will reach out to you shortly to discuss how we can help bring your vision to life!
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}