import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DevBannerProps {
  onDismiss?: () => void;
}

export function DevBanner({ onDismiss }: DevBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-default)',
          zIndex: 100
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* Icon */}
            <div className="flex-shrink-0">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="var(--text-secondary)" 
                strokeWidth="2"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 9v4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="17" r="0.5" fill="var(--text-secondary)"/>
              </svg>
            </div>

            {/* Text */}
            <div className="flex items-center gap-4 flex-wrap">
              <p 
                className="text-sm"
                style={{ 
                  color: 'var(--text-primary)', 
                  fontWeight: 500
                }}
              >
                Under Development
              </p>
              <p 
                className="text-sm hidden sm:block"
                style={{ 
                  color: 'var(--text-secondary)',
                  fontWeight: 400
                }}
              >
                This portfolio is currently being built. Some features may be incomplete.
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 ml-4 p-1.5 rounded-lg transition-all duration-200"
            style={{ 
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}