import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function ModernTechVisualization() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  // Connection lines between particles
  const connections = particles
    .slice(0, 15)
    .map((p1, i) => {
      const p2 = particles[(i + 3) % particles.length];
      return { id: i, x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
    });

  // Code snippets for animation
  const codeLines = [
    "const design = () => {",
    "  return creative();",
    "}",
    "function build() {",
    "  return innovative;",
    "}",
    "export default UX;",
    "interface Design {",
    "  quality: premium;",
    "}",
  ];

  // Binary/Hex codes
  const binaryCodes = [
    "01101000",
    "11010101",
    "0xA4F2",
    "0xB8C1",
    "10110011",
    "0xFF3D",
  ];

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-start justify-center overflow-hidden">
      {/* Floating code snippets */}
      <div className="absolute inset-0">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs"
            style={{
              color: i % 2 === 0 ? "var(--accent-blue)" : "var(--text-secondary)",
              left: `${10 + (i % 3) * 30}%`,
              top: `${15 + (i % 4) * 20}%`,
              textShadow: "0 0 10px var(--accent-blue)",
              opacity: 0.4,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: [0, 0.6, 0],
              x: [-20, 100, 220],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "linear",
            }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Binary/Hex code streams */}
      {binaryCodes.map((code, i) => (
        <motion.div
          key={`binary-${i}`}
          className="absolute font-mono text-xs font-bold"
          style={{
            color: "var(--accent-blue)",
            left: `${20 + i * 12}%`,
            top: "-10%",
            textShadow: `0 0 10px var(--accent-blue)`,
            opacity: 0.5,
          }}
          animate={{
            y: ["0vh", "110vh"],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "linear",
          }}
        >
          {code}
        </motion.div>
      ))}

      {/* Code symbols floating */}
      {["{ }", "< />", "=>", "( )", "[ ]", "//"].map((symbol, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute font-mono font-bold"
          style={{
            color: "var(--accent-blue)",
            fontSize: "24px",
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            textShadow: "0 0 15px var(--accent-blue)",
            opacity: 0.3,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Main SVG Canvas */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--accent-blue)", stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-blue)", stopOpacity: 0.2 }} />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "var(--accent-blue)", stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: "var(--text-secondary)", stopOpacity: 0.2 }} />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Animated connection lines */}
        {connections.map((conn, i) => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke={i % 2 === 0 ? "url(#lineGradient1)" : "url(#lineGradient2)"}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated circles forming network nodes */}
        {particles.slice(0, 20).map((particle) => (
          <motion.circle
            key={particle.id}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r="2"
            style={{ fill: "var(--accent-blue)" }}
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {/* Large hexagon */}
        <motion.div
          className="absolute"
          style={{
            top: "20%",
            right: "15%",
            width: "150px",
            height: "150px",
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 90,25 90,75 50,95 10,75 10,25"
              fill="none"
              stroke="url(#lineGradient1)"
              strokeWidth="1.5"
              opacity="0.4"
            />
          </svg>
        </motion.div>

        {/* Medium triangle */}
        <motion.div
          className="absolute"
          style={{
            bottom: "30%",
            left: "10%",
            width: "120px",
            height: "120px",
          }}
          animate={{
            rotate: [0, -360],
            x: [0, 15, 0],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,10 90,90 10,90"
              fill="none"
              style={{ stroke: "var(--accent-blue)" }}
              strokeWidth="1.5"
              opacity="0.3"
            />
          </svg>
        </motion.div>

        {/* Small circle ring */}
        <motion.div
          className="absolute"
          style={{
            top: "60%",
            right: "25%",
            width: "80px",
            height: "80px",
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              style={{ stroke: "var(--text-secondary)" }}
              strokeWidth="2"
              opacity="0.4"
              strokeDasharray="10 5"
            />
          </svg>
        </motion.div>
      </div>

      {/* Flowing particle streams */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "var(--accent-blue)",
            boxShadow: `0 0 10px var(--accent-blue)`,
            left: `${10 + i * 10}%`,
            top: "0%",
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear",
          }}
        />
      ))}

      {/* Central rotating ring structure */}
      <div className="relative z-10">
        <motion.div
          className="relative"
          style={{
            width: "300px",
            height: "300px",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid var(--accent-blue)",
              opacity: 0.3,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute inset-8 rounded-full"
            style={{
              border: "1px solid var(--accent-blue)",
              opacity: 0.4,
            }}
            animate={{
              scale: [1, 0.95, 1],
              opacity: [0.4, 0.7, 0.4],
              rotate: [0, -360],
            }}
            transition={{
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* Inner ring */}
          <motion.div
            className="absolute inset-16 rounded-full"
            style={{
              border: "1px solid var(--text-secondary)",
              opacity: 0.5,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Core glow */}
          <motion.div
            className="absolute inset-0 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-20 h-20 rounded-full"
              style={{
                background: "var(--accent-light)",
                filter: "blur(15px)",
              }}
            />
          </motion.div>

          {/* Orbiting dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: "var(--accent-blue)",
                boxShadow: "0 0 10px var(--accent-blue)",
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [
                  Math.cos((i * Math.PI * 2) / 6) * 120,
                  Math.cos((i * Math.PI * 2) / 6 + Math.PI) * 120,
                  Math.cos((i * Math.PI * 2) / 6) * 120,
                ],
                y: [
                  Math.sin((i * Math.PI * 2) / 6) * 120,
                  Math.sin((i * Math.PI * 2) / 6 + Math.PI) * 120,
                  Math.sin((i * Math.PI * 2) / 6) * 120,
                ],
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Terminal-style code block */}
      <motion.div
        className="absolute top-[10%] left-[8%] font-mono text-xs p-3 rounded-lg"
        style={{
          background: "var(--bg-secondary)",
          backdropFilter: "blur(10px)",
          border: "1px solid var(--border-default)",
          boxShadow: "0 0 20px var(--accent-subtle)",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: [0, 0.8, 0],
          y: [-20, 0, 20],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div style={{ color: "var(--accent-blue)" }}>$ npm run build</div>
        <div style={{ color: "var(--text-primary)", marginTop: "4px" }}>✓ Compiled successfully</div>
      </motion.div>

      {/* CSS-style code snippet */}
      <motion.div
        className="absolute bottom-[15%] right-[10%] font-mono text-xs p-3 rounded-lg"
        style={{
          background: "var(--bg-secondary)",
          backdropFilter: "blur(10px)",
          border: "1px solid var(--border-default)",
          boxShadow: "0 0 20px var(--accent-subtle)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          delay: 3,
          ease: "easeInOut",
        }}
      >
        <div style={{ color: "var(--text-secondary)" }}>.design {"{"}</div>
        <div style={{ color: "var(--accent-blue)", marginLeft: "12px" }}>transform: scale(1.5);</div>
        <div style={{ color: "var(--text-secondary)" }}>{"}"}</div>
      </motion.div>

      {/* Digital rain effect */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute h-20 w-px"
          style={{
            background: `linear-gradient(180deg, transparent 0%, var(--accent-blue) 50%, transparent 100%)`,
            left: `${15 + i * 15}%`,
            top: "-20%",
            opacity: 0.3,
          }}
          animate={{
            y: ["0vh", "120vh"],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
        />
      ))}

      {/* Abstract wave lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
        <motion.path
          d="M0,150 Q250,100 500,150 T1000,150"
          fill="none"
          style={{ stroke: "var(--accent-blue)" }}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            d: [
              "M0,150 Q250,100 500,150 T1000,150",
              "M0,150 Q250,200 500,150 T1000,150",
              "M0,150 Q250,100 500,150 T1000,150",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,250 Q250,300 500,250 T1000,250"
          fill="none"
          style={{ stroke: "var(--text-secondary)" }}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            d: [
              "M0,250 Q250,300 500,250 T1000,250",
              "M0,250 Q250,200 500,250 T1000,250",
              "M0,250 Q250,300 500,250 T1000,250",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>
    </div>
  );
}