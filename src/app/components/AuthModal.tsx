import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, LogIn, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
  onAuthSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, defaultMode = "login", onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signup } = useAuth();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    const newErrors = { email: "", password: "", name: "", phone: "" };
    let hasErrors = false;

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
      hasErrors = true;
    }

    // Validate name for signup
    if (mode === "signup" && !formData.name.trim()) {
      newErrors.name = "Please enter your name";
      hasErrors = true;
    }

    // Validate phone for signup
    if (mode === "signup" && !formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name, formData.phone);
      }

      // Success - clear form and trigger success callback
      setFormData({ email: "", password: "", name: "", phone: "" });
      
      // Call onAuthSuccess first before closing
      if (onAuthSuccess) {
        onAuthSuccess();
      }
      
      // Then close the modal
      onClose();
    } catch (error) {
      setErrors({
        ...newErrors,
        email: mode === "login" ? "Invalid email or password" : "Email already exists",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error on change
    setErrors({ ...errors, [name]: "" });
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErrors({ email: "", password: "", name: "", phone: "" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl overflow-hidden pointer-events-auto"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-default)",
                boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="px-8 py-6 flex items-center justify-between"
                style={{
                  borderBottom: "1px solid var(--border-default)",
                  background: "var(--gradient-primary)",
                }}
              >
                <div>
                  <h2
                    className="mb-1"
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                    }}
                  >
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {mode === "login"
                      ? "Sign in to access your account"
                      : "Join to get personalized experience"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-5">
                  {/* Name (Signup only) */}
                  {mode === "signup" && (
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Full Name *
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                          style={{ color: "var(--text-secondary)" }}
                        />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-200"
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            border: errors.name
                              ? "1px solid #ef4444"
                              : "1px solid var(--border-default)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = errors.name
                              ? "#ef4444"
                              : "var(--accent-blue)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = errors.name
                              ? "#ef4444"
                              : "var(--border-default)";
                          }}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                  )}

                  {/* Phone (Signup only) */}
                  {mode === "signup" && (
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                          style={{ color: "var(--text-secondary)" }}
                        />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-200"
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            border: errors.phone
                              ? "1px solid #ef4444"
                              : "1px solid var(--border-default)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = errors.phone
                              ? "#ef4444"
                              : "var(--accent-blue)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = errors.phone
                              ? "#ef4444"
                              : "var(--border-default)";
                          }}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2"
                      style={{
                        color: "var(--text-primary)",
                        fontWeight: 600,
                      }}
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        style={{ color: "var(--text-secondary)" }}
                      />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          border: errors.email
                            ? "1px solid #ef4444"
                            : "1px solid var(--border-default)",
                          color: "var(--text-primary)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = errors.email
                            ? "#ef4444"
                            : "var(--accent-blue)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.email
                            ? "#ef4444"
                            : "var(--border-default)";
                        }}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2"
                      style={{
                        color: "var(--text-primary)",
                        fontWeight: 600,
                      }}
                    >
                      Password *
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        style={{ color: "var(--text-secondary)" }}
                      />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          border: errors.password
                            ? "1px solid #ef4444"
                            : "1px solid var(--border-default)",
                          color: "var(--text-primary)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = errors.password
                            ? "#ef4444"
                            : "var(--accent-blue)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.password
                            ? "#ef4444"
                            : "var(--border-default)";
                        }}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                    {mode === "signup" && !errors.password && (
                      <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                        Minimum 6 characters
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition-all duration-200 mt-6"
                    style={{
                      background: isSubmitting
                        ? "var(--bg-secondary)"
                        : "var(--gradient-primary)",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      opacity: isSubmitting ? 0.6 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(30, 64, 175, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : mode === "login" ? (
                      <>
                        <LogIn className="w-5 h-5" />
                        Sign In
                      </>
                    ) : (
                      <>
                        <User className="w-5 h-5" />
                        Create Account
                      </>
                    )}
                  </button>

                  {/* Switch Mode */}
                  <div className="text-center pt-4">
                    <p style={{ color: "var(--text-secondary)" }}>
                      {mode === "login"
                        ? "Don't have an account? "
                        : "Already have an account? "}
                      <button
                        type="button"
                        onClick={switchMode}
                        className="transition-colors duration-200"
                        style={{
                          color: "var(--accent-blue)",
                          fontWeight: 600,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = "underline";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = "none";
                        }}
                      >
                        {mode === "login" ? "Sign Up" : "Sign In"}
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}