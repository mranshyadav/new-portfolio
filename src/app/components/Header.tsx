import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Download, LogIn, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { AuthModal } from './AuthModal';

interface HeaderProps {
  bannerVisible?: boolean;
}

export function Header({ bannerVisible = false }: HeaderProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showUserMenu]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Function to download dummy resume
  const handleDownloadResume = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Create dummy resume content
    const resumeContent = `
ANSH YADAV
Product Designer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT
Email: mranshyadav74@gmail.com
Phone: +91 9696975512
LinkedIn: linkedin.com/in/ansh001
WhatsApp: +91 9696975512

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFESSIONAL SUMMARY
Senior Product Designer with expertise in creating user-centered digital 
experiences. Focused on delivering research-driven, end-to-end design 
solutions that balance business objectives with user needs.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CORE COMPETENCIES
• User Research & Testing
• Information Architecture
• Interaction Design
• Visual Design
• Prototyping & Wireframing
• Design Systems
• Usability Testing
• Cross-functional Collaboration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN APPROACH
Research-driven • User-centered • End-to-end

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Note: This is a placeholder resume. 
Please replace with your actual resume PDF file.

To update: Place your resume.pdf file in the public directory.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Create blob and download
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ansh_Yadav_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <header 
      className="fixed left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-default)',
        top: bannerVisible ? '48px' : '0'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          to="/"
          style={{ 
            color: 'var(--text-primary)',
            fontWeight: 600,
            transition: 'color 0.2s ease-out'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
        >
          Ansh Yadav
        </Link>
        
        {/* Centered Navigation */}
        <nav className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="transition-colors duration-200"
                style={{
                  color: isActive('/') ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: isActive('/') ? 500 : 400
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive('/') ? 'var(--accent-blue)' : 'var(--text-secondary)';
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/work"
                className="transition-colors duration-200"
                style={{
                  color: isActive('/work') ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: isActive('/work') ? 500 : 400
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive('/work') ? 'var(--accent-blue)' : 'var(--text-secondary)';
                }}
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="transition-colors duration-200"
                style={{
                  color: isActive('/services') ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: isActive('/services') ? 500 : 400
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive('/services') ? 'var(--accent-blue)' : 'var(--text-secondary)';
                }}
              >
                Services
              </Link>
            </li>
            {/* Process page temporarily hidden */}
            {/* <li>
              <Link
                to="/process"
                className="transition-colors duration-200"
                style={{
                  color: isActive('/process') ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: isActive('/process') ? 500 : 400
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive('/process') ? 'var(--accent-blue)' : 'var(--text-secondary)';
                }}
              >
                Process
              </Link>
            </li> */}
            <li>
              <Link
                to="/about"
                className="transition-colors duration-200"
                style={{
                  color: isActive('/about') ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: isActive('/about') ? 500 : 400
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive('/about') ? 'var(--accent-blue)' : 'var(--text-secondary)';
                }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="transition-colors duration-200"
                style={{
                  color: isActive('/contact') ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: isActive('/contact') ? 500 : 400
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive('/contact') ? 'var(--accent-blue)' : 'var(--text-secondary)';
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-default)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--badge-bg)';
              e.currentTarget.style.borderColor = 'var(--badge-border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
            }}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" style={{ color: 'var(--text-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" style={{ color: 'var(--text-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Download Resume CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              fontWeight: 500
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--badge-bg)';
              e.currentTarget.style.borderColor = 'var(--badge-border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
            }}
            aria-label="Download Resume"
            onClick={handleDownloadResume}
          >
            <Download className="w-4 h-4" />
            <span>Resume</span>
          </a>
          
          {/* Authentication and User Menu */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-default)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--badge-bg)';
                  e.currentTarget.style.borderColor = 'var(--badge-border)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                }}
                aria-label="User Menu"
              >
                <UserIcon className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              </button>
              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-50"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-default)'
                  }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {user?.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-2">
                    {hasRole(['admin', 'editor', 'viewer']) && (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center gap-2"
                        style={{ color: 'var(--text-primary)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm transition-colors duration-150"
                      style={{ color: 'var(--text-primary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
                fontWeight: 500
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--badge-bg)';
                e.currentTarget.style.borderColor = 'var(--badge-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
                e.currentTarget.style.borderColor = 'var(--border-default)';
              }}
              aria-label="Login"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}