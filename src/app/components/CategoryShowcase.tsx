import { motion } from "motion/react";
import { useState } from "react";

interface Category {
  id: string;
  title: string;
  imageUrl: string;
}

const defaultCategories: Category[] = [
  {
    id: "mobile",
    title: "Mobile",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
  },
  {
    id: "print",
    title: "Print",
    imageUrl: "https://images.unsplash.com/photo-1499159058454-75067059248a?w=400&h=300&fit=crop",
  },
  {
    id: "web-design",
    title: "Web Design",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
  },
  {
    id: "illustration",
    title: "Illustration",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop",
  },
  {
    id: "typography",
    title: "Typography",
    imageUrl: "https://images.unsplash.com/photo-1461958508236-9a742665a0d5?w=400&h=300&fit=crop",
  },
  {
    id: "branding",
    title: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
  },
];

interface CategoryShowcaseProps {
  categories?: Category[];
  title?: string;
  subtitle?: string;
}

export function CategoryShowcase({
  categories = defaultCategories,
  title,
  subtitle
}: CategoryShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Duplicate categories for seamless infinite scroll
  const duplicatedCategories = [...categories, ...categories, ...categories];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {title && (
        <div className="text-center mb-12">
          {title && (
            <h2
              className="text-3xl lg:text-4xl mb-3"
              style={{
                color: "var(--text-primary)",
                fontWeight: 600,
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className="text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Horizontal scrolling container */}
      <div className="relative overflow-hidden">
        {/* Gradient overlays */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, var(--bg-primary), transparent)`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, var(--bg-primary), transparent)`,
          }}
        />

        {/* Animated scrolling container */}
        <div className="category-scroll-container">
          <div className="category-scroll-content">
            {duplicatedCategories.map((category, index) => (
              <div
                key={`${category.id}-${index}`}
                className="flex-shrink-0 cursor-pointer group category-card"
                style={{
                  width: "200px",
                  marginRight: "24px",
                }}
                onMouseEnter={() => setHoveredId(`${category.id}-${index}`)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Layered border effect wrapper */}
                <div className="relative">
                  {/* Shadow/offset layer */}
                  <div
                    className="absolute inset-0 rounded-2xl transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))",
                      transform: hoveredId === `${category.id}-${index}`
                        ? "translate(4px, 4px)"
                        : "translate(6px, 6px)",
                      zIndex: -1,
                    }}
                  />

                  {/* Image container */}
                  <div
                    className="relative rounded-2xl overflow-hidden mb-3 transition-all duration-300"
                    style={{
                      aspectRatio: "4/3",
                      backgroundColor: "var(--bg-secondary)",
                      border: "2px solid var(--border-default)",
                      transform: hoveredId === `${category.id}-${index}`
                        ? "translateY(-4px)"
                        : "translateY(0)",
                      boxShadow: hoveredId === `${category.id}-${index}`
                        ? "0 8px 24px rgba(0, 0, 0, 0.12)"
                        : "0 2px 8px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <img
                      src={category.imageUrl}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={{
                        transform: hoveredId === `${category.id}-${index}`
                          ? "scale(1.05)"
                          : "scale(1)",
                      }}
                    />

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
                        opacity: hoveredId === `${category.id}-${index}` ? 1 : 0,
                      }}
                    />
                  </div>
                </div>

                {/* Category title */}
                <h3
                  className="text-center transition-colors duration-200"
                  style={{
                    color: hoveredId === `${category.id}-${index}`
                      ? "var(--accent-blue)"
                      : "var(--text-primary)",
                    fontWeight: 500,
                    fontSize: "15px",
                  }}
                >
                  {category.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for infinite scroll animation */}
      <style>{`
        .category-scroll-container {
          overflow: hidden;
          width: 100%;
        }

        .category-scroll-content {
          display: flex;
          animation: scroll-infinite 60s linear infinite;
          width: fit-content;
        }

        .category-scroll-content:hover {
          animation-play-state: paused;
        }

        .category-card:hover ~ .category-card {
          animation-play-state: running;
        }

        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-224px * ${categories.length}));
          }
        }
      `}</style>
    </section>
  );
}
