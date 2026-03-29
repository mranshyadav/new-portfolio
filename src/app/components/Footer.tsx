import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Mail, Linkedin, Figma, Dribbble, Phone, MessageCircle, ArrowUp } from 'lucide-react';

export function Footer() {
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer 
      style={{ 
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-default)'
      }}
      className="mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 pb-0">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 
              className="text-xl"
              style={{ 
                color: 'var(--text-primary)',
                fontWeight: 600 
              }}
            >
              Ansh Yadav
            </h3>

            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Senior UX Designer crafting meaningful digital experiences with a focus on user-centered design and strategic thinking.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2">
              <a
                href="https://www.linkedin.com/in/ansh001/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.behance.net/anshyadav68"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 text-sm"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                Bē
              </a>
              <a
                href="https://dribbble.com/Ansh_Yadav"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <Dribbble size={18} />
              </a>
              <a
                href="https://www.figma.com/@anshyadav"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <Figma size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 
              className="text-sm"
              style={{ 
                color: 'var(--text-primary)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm transition-colors duration-200 w-fit"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Home
              </Link>
              <Link
                to="/work"
                className="text-sm transition-colors duration-200 w-fit"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Work
              </Link>
              <Link
                to="/process"
                className="text-sm transition-colors duration-200 w-fit"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Process
              </Link>
              <Link
                to="/about"
                className="text-sm transition-colors duration-200 w-fit"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm transition-colors duration-200 w-fit"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 
              className="text-sm"
              style={{ 
                color: 'var(--text-primary)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <a
                href="mailto:mranshyadav74@gmail.com"
                className="group flex items-center gap-3 transition-all duration-200"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <div 
                  className="icon-box w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)'
                  }}
                  ref={(el) => {
                    if (el) {
                      const parent = el.parentElement;
                      if (parent) {
                        parent.addEventListener('mouseenter', () => {
                          el.style.backgroundColor = 'var(--accent-blue)';
                          el.style.borderColor = 'var(--accent-blue)';
                          el.style.color = '#ffffff';
                        });
                        parent.addEventListener('mouseleave', () => {
                          el.style.backgroundColor = 'var(--bg-secondary)';
                          el.style.borderColor = 'var(--border-default)';
                          el.style.color = 'var(--text-secondary)';
                        });
                      }
                    }
                  }}
                >
                  <Mail size={16} />
                </div>
                <span className="text-sm">mranshyadav74@gmail.com</span>
              </a>

              {/* Phone */}
              <button
                onClick={() => setShowPhonePopup(true)}
                className="group flex items-center gap-3 transition-all duration-200 text-left"
                style={{ 
                  color: 'var(--text-secondary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <div 
                  className="icon-box w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)'
                  }}
                  ref={(el) => {
                    if (el) {
                      const parent = el.parentElement;
                      if (parent) {
                        parent.addEventListener('mouseenter', () => {
                          el.style.backgroundColor = 'var(--accent-blue)';
                          el.style.borderColor = 'var(--accent-blue)';
                          el.style.color = '#ffffff';
                        });
                        parent.addEventListener('mouseleave', () => {
                          el.style.backgroundColor = 'var(--bg-secondary)';
                          el.style.borderColor = 'var(--border-default)';
                          el.style.color = 'var(--text-secondary)';
                        });
                      }
                    }
                  }}
                >
                  <Phone size={16} />
                </div>
                <span className="text-sm">+91 9696975512</span>
              </button>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917408053771"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-all duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <div 
                  className="icon-box w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)'
                  }}
                  ref={(el) => {
                    if (el) {
                      const parent = el.parentElement;
                      if (parent) {
                        parent.addEventListener('mouseenter', () => {
                          el.style.backgroundColor = 'var(--accent-blue)';
                          el.style.borderColor = 'var(--accent-blue)';
                          el.style.color = '#ffffff';
                        });
                        parent.addEventListener('mouseleave', () => {
                          el.style.backgroundColor = 'var(--bg-secondary)';
                          el.style.borderColor = 'var(--border-default)';
                          el.style.color = 'var(--text-secondary)';
                        });
                      }
                    }
                  }}
                >
                  <MessageCircle size={16} />
                </div>
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="py-4 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © 2024 Ansh Yadav. All rights reserved.
          </p>
          <div className="text-sm text-center sm:text-right">
            <p style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
              || जय जय राधावल्लभ श्री हरिवंश ||  जय जय श्री वृन्दावन श्री वनचंद ||
            </p>
          </div>
        </div>
      </div>

      {/* Phone Number Popup */}
      {showPhonePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowPhonePopup(false)}
        >
          <div
            className="relative max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-default)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPhonePopup(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
              style={{
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-default)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ✕
            </button>

            <h3
              className="text-2xl mb-6"
              style={{
                color: 'var(--text-primary)',
                fontWeight: 600,
              }}
            >
              Contact Number
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Phone
                </p>
                <a
                  href="tel:+919696975512"
                  className="text-xl block transition-colors duration-200"
                  style={{
                    color: 'var(--accent-blue)',
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  +91 9696975512
                </a>
              </div>

              <div className="pt-4" style={{ borderTop: '1px solid var(--border-default)' }}>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Or reach me via
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/917408053771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-default)',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
                      e.currentTarget.style.borderColor = 'var(--accent-blue)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-default)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 transition-all duration-300"
          style={{
            zIndex: 40,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-blue)',
            border: 'none',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: showScrollTop ? 1 : 0,
            transform: showScrollTop ? 'scale(1)' : 'scale(0.8)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.3)';
          }}
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
      )}
    </footer>
  );
}