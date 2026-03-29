import { motion } from "motion/react";
import { ReactNode } from "react";

interface ProfileImageFrameProps {
  imageSrc: string;
  imageAlt?: string;
  // Background configuration
  backgroundColor?: string;
  backgroundGradient?: {
    from: string;
    to: string;
  };
  backgroundShape?: "organic" | "rounded" | "circle" | "none";
  
  // Decorative elements
  showTopLeftIcon?: boolean;
  topLeftIconColor?: string;
  topLeftIcon?: ReactNode;
  
  showRightIcon?: boolean;
  rightIconColor?: string;
  rightIcon?: ReactNode;
  
  showTopRightIcon?: boolean;
  topRightIconColor?: string;
  topRightIcon?: ReactNode;
  
  showDecorativeSquare?: boolean;
  decorativeSquareColor?: string;
  
  showBadge?: boolean;
  badgeText?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  
  // New decorative options
  showFloatingCircles?: boolean;
  showGridPattern?: boolean;
  showGlowEffect?: boolean;
  
  // Image styling
  imageMaxHeight?: string;
  imageClassName?: string;
  
  // Container styling
  containerHeight?: string;
}

export function ProfileImageFrame({
  imageSrc,
  imageAlt = "Profile",
  backgroundColor,
  backgroundGradient,
  backgroundShape = "none",
  
  showTopLeftIcon = false,
  topLeftIconColor = "#14B8A6",
  topLeftIcon,
  
  showRightIcon = false,
  rightIconColor = "#FCD34D",
  rightIcon,
  
  showTopRightIcon = false,
  topRightIconColor = "#3B82F6",
  topRightIcon,
  
  showDecorativeSquare = false,
  decorativeSquareColor = "#60A5FA",
  
  showBadge = false,
  badgeText = "Available for Freelance",
  badgeColor = "var(--text-primary)",
  badgeTextColor = "var(--bg-primary)",
  
  showFloatingCircles = false,
  showGridPattern = false,
  showGlowEffect = false,
  
  imageMaxHeight = "600px",
  imageClassName = "",
  containerHeight = "520px",
}: ProfileImageFrameProps) {
  
  // Default icons if none provided
  const defaultTopLeftIcon = (
    <svg
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
  
  const defaultRightIcon = (
    <svg
      width="46"
      height="46"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1F2937"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
  
  const defaultTopRightIcon = (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill={topRightIconColor}
      stroke="#1F2937"
      strokeWidth="1.5"
    >
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative flex justify-center items-center"
      style={{ height: containerHeight }}
    >
      {/* Background Shape */}
      {backgroundShape === "organic" && (
        <svg
          className="absolute"
          width="400"
          height="450"
          viewBox="0 0 400 450"
          fill="none"
          style={{ transform: "translateY(10px)" }}
        >
          <path
            d="M50 80C50 35.8172 85.8172 0 130 0H270C314.183 0 350 35.8172 350 80V280C350 324.183 350 370 270 400C190 430 130 430 80 400C30 370 50 324.183 50 280V80Z"
            fill={
              backgroundGradient
                ? `url(#customGradient)`
                : backgroundColor || "var(--bg-secondary)"
            }
            stroke="#1F2937"
            strokeWidth="4"
          />
          {backgroundGradient && (
            <defs>
              <linearGradient
                id="customGradient"
                x1="50"
                y1="0"
                x2="350"
                y2="450"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={backgroundGradient.from} />
                <stop offset="1" stopColor={backgroundGradient.to} />
              </linearGradient>
            </defs>
          )}
        </svg>
      )}
      
      {backgroundShape === "rounded" && (
        <div
          className="absolute rounded-3xl"
          style={{
            width: "380px",
            height: "480px",
            background: backgroundGradient
              ? `linear-gradient(135deg, ${backgroundGradient.from}, ${backgroundGradient.to})`
              : backgroundColor || "var(--bg-secondary)",
            border: "3px solid #1F2937",
          }}
        />
      )}
      
      {backgroundShape === "circle" && (
        <div
          className="absolute rounded-full"
          style={{
            width: "420px",
            height: "420px",
            background: backgroundGradient
              ? `linear-gradient(135deg, ${backgroundGradient.from}, ${backgroundGradient.to})`
              : backgroundColor || "var(--bg-secondary)",
            border: "3px solid #1F2937",
          }}
        />
      )}

      {/* Main Image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`relative z-10 ${imageClassName}`}
        style={{
          maxHeight: imageMaxHeight,
          width: "auto",
          objectFit: "contain",
        }}
      />

      {/* Top Left Icon (Chart/Analytics) */}
      {showTopLeftIcon && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute top-8 left-4 z-20"
          style={{
            width: "85px",
            height: "75px",
            background: topLeftIconColor,
            borderRadius: "20px",
            border: "3px solid #1F2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Speech bubble tail */}
          <div
            style={{
              position: "absolute",
              bottom: "-12px",
              left: "30px",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: `15px solid ${topLeftIconColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-15px",
              left: "28px",
              width: "0",
              height: "0",
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "17px solid #1F2937",
              zIndex: -1,
            }}
          />
          {topLeftIcon || defaultTopLeftIcon}
        </motion.div>
      )}

      {/* Right Icon (Eye/Vision) */}
      {showRightIcon && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute top-32 -right-8 z-20"
          style={{
            width: "85px",
            height: "85px",
            background: rightIconColor,
            borderRadius: "50%",
            border: "3px solid #1F2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {rightIcon || defaultRightIcon}
        </motion.div>
      )}

      {/* Top Right Icon (Cursor/Pointer) */}
      {showTopRightIcon && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="absolute -top-8 right-16 z-20"
          style={{
            transform: "rotate(-25deg)",
          }}
        >
          {topRightIcon || defaultTopRightIcon}
        </motion.div>
      )}

      {/* Decorative Square */}
      {showDecorativeSquare && (
        <motion.div
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute -top-4 left-12 z-5"
          style={{
            width: "50px",
            height: "50px",
            background: decorativeSquareColor,
            borderRadius: "12px",
            border: "2px solid #1F2937",
            transform: "rotate(15deg)",
          }}
        />
      )}

      {/* Badge */}
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute -bottom-4 right-8 z-20 flex items-center gap-2 px-5 py-3 rounded-full"
          style={{
            background: badgeColor,
            border: "2px solid var(--border-default)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "var(--accent-blue)",
              boxShadow: "0 0 8px var(--accent-blue)",
            }}
          />
          <span
            style={{
              color: badgeTextColor,
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.02em",
            }}
          >
            {badgeText}
          </span>
        </motion.div>
      )}

      {/* Floating Circles */}
      {showFloatingCircles && (
        <>
          <motion.div
            className="absolute z-0"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
              top: "15%",
              left: "-5%",
              opacity: 0.15,
              filter: "blur(40px)",
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute z-0"
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)",
              bottom: "10%",
              right: "-10%",
              opacity: 0.12,
              filter: "blur(50px)",
            }}
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute z-0"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)",
              top: "60%",
              left: "-8%",
              opacity: 0.1,
              filter: "blur(35px)",
            }}
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Grid Pattern Overlay */}
      {showGridPattern && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
            opacity: 0.5,
          }}
        />
      )}

      {/* Glow Effect around image */}
      {showGlowEffect && (
        <motion.div
          className="absolute z-0"
          style={{
            width: "105%",
            height: "105%",
            borderRadius: backgroundShape === "circle" ? "50%" : "24px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Additional decorative elements - dots pattern */}
      {showFloatingCircles && (
        <>
          <motion.div
            className="absolute z-5"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#F59E0B",
              top: "25%",
              right: "15%",
              boxShadow: "0 0 10px rgba(245, 158, 11, 0.5)",
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute z-5"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#EC4899",
              bottom: "30%",
              left: "18%",
              boxShadow: "0 0 8px rgba(236, 72, 153, 0.5)",
            }}
            animate={{
              x: [0, 8, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute z-5"
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#8B5CF6",
              top: "45%",
              right: "8%",
              boxShadow: "0 0 12px rgba(139, 92, 246, 0.6)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </motion.div>
  );
}