import { motion, AnimatePresence } from "motion/react";
import { X, Send, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface InterestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export function InterestFormModal({
  isOpen,
  onClose,
  serviceName,
}: InterestFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [countryCode, setCountryCode] = useState("+91"); // Default to India
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  
  // Available services list
  const availableServices = [
    "Product Strategy",
    "UX Research",
    "User Interface Design",
    "Design Systems",
    "Usability Testing",
    "Information Architecture",
    "Interaction Design",
    "Prototyping",
  ];
  
  // Multi-select services state
  const [selectedServices, setSelectedServices] = useState<string[]>([serviceName]);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected services when serviceName prop changes
  useEffect(() => {
    if (serviceName && !selectedServices.includes(serviceName)) {
      setSelectedServices([serviceName]);
    }
  }, [serviceName]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };

    if (isServicesDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesDropdownOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Common country codes
  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+62", country: "Indonesia", flag: "🇮🇩" },
    { code: "+63", country: "Philippines", flag: "🇵🇭" },
    { code: "+66", country: "Thailand", flag: "🇹🇭" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+31", country: "Netherlands", flag: "🇳🇱" },
    { code: "+46", country: "Sweden", flag: "🇸🇪" },
    { code: "+47", country: "Norway", flag: "🇳🇴" },
    { code: "+41", country: "Switzerland", flag: "🇨🇭" },
    { code: "+48", country: "Poland", flag: "🇵🇱" },
    { code: "+90", country: "Turkey", flag: "🇹🇷" },
    { code: "+20", country: "Egypt", flag: "🇪🇬" },
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+92", country: "Pakistan", flag: "🇵🇰" },
    { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
    { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
    { code: "+977", country: "Nepal", flag: "🇳🇵" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation before submission
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanPhone = formData.phone.replace(/\D/g, "");
    
    let hasErrors = false;
    const newErrors = { email: "", phone: "" };

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      newErrors.phone = "Phone number must be between 10-15 digits";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Create email body with all information
    const servicesText = selectedServices.length > 0 ? selectedServices.join(", ") : serviceName;
    const emailBody = `
New Service Interest Form Submission

Services: ${servicesText}

Client Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${countryCode} ${formData.phone}
${formData.address ? `- Address: ${formData.address}` : ''}

Message:
${formData.message || "No additional message"}

---
Sent from Portfolio Services Page
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:mranshyadav74@gmail.com?subject=Service Interest: ${encodeURIComponent(servicesText)}&body=${encodeURIComponent(emailBody)}`;

    try {
      // Open mailto link
      window.location.href = mailtoLink;
      
      // Show success message
      setSubmitStatus("success");
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        setSelectedServices([serviceName]);
        setSubmitStatus("idle");
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation for email
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setErrors({ ...errors, email: "Please enter a valid email address" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    // Real-time validation for phone
    if (name === "phone") {
      // Remove all non-digit characters for validation
      const cleanPhone = value.replace(/\D/g, "");
      
      // Validate: should be 10 digits (Indian) or have + prefix for international
      if (value && cleanPhone.length < 10) {
        setErrors({ ...errors, phone: "Phone number must be at least 10 digits" });
      } else if (value && cleanPhone.length > 15) {
        setErrors({ ...errors, phone: "Phone number is too long" });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    }
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
              className="w-full max-w-2xl rounded-2xl overflow-hidden pointer-events-auto"
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
                    I'm Interested in {serviceName}
                  </h2>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.95rem",
                    }}
                  >
                    Let's discuss your project requirements
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
              <form onSubmit={handleSubmit} className="flex flex-col max-h-[600px]">
                <div className="p-8 overflow-y-auto flex-1">
                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--badge-bg)",
                        border: "2px solid var(--accent-blue)",
                      }}
                    >
                      <Send className="w-8 h-8" style={{ color: "var(--accent-blue)" }} />
                    </div>
                    <h3
                      className="mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Opening Email Client...
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>
                      Please send the email to complete your interest submission.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {/* Services Multi-Select */}
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Services Interested In *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                          className="w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between"
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border-default)",
                            color: "var(--text-primary)",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            if (!isServicesDropdownOpen) {
                              e.currentTarget.style.borderColor = "var(--accent-blue)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isServicesDropdownOpen) {
                              e.currentTarget.style.borderColor = "var(--border-default)";
                            }
                          }}
                        >
                          <span>
                            {selectedServices.length === 0
                              ? "Select services..."
                              : selectedServices.length === 1
                              ? selectedServices[0]
                              : `${selectedServices.length} services selected`}
                          </span>
                          <ChevronDown
                            className="w-5 h-5 transition-transform duration-200"
                            style={{
                              transform: isServicesDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                              color: "var(--text-secondary)",
                            }}
                          />
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {isServicesDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-10 w-full mt-2 rounded-lg overflow-hidden"
                              style={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "1px solid var(--border-default)",
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                              }}
                              ref={dropdownRef}
                            >
                              <div className="max-h-64 overflow-y-auto">
                                {availableServices.map((service) => {
                                  const isSelected = selectedServices.includes(service);
                                  return (
                                    <label
                                      key={service}
                                      className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150"
                                      style={{
                                        backgroundColor: isSelected
                                          ? "var(--badge-bg)"
                                          : "transparent",
                                      }}
                                      onMouseEnter={(e) => {
                                        if (!isSelected) {
                                          e.currentTarget.style.backgroundColor = "var(--bg-primary)";
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        if (!isSelected) {
                                          e.currentTarget.style.backgroundColor = "transparent";
                                        }
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => {
                                          if (isSelected) {
                                            setSelectedServices(
                                              selectedServices.filter((s) => s !== service)
                                            );
                                          } else {
                                            setSelectedServices([...selectedServices, service]);
                                          }
                                        }}
                                        className="w-4 h-4 rounded cursor-pointer"
                                        style={{
                                          accentColor: "var(--accent-blue)",
                                        }}
                                      />
                                      <span
                                        style={{
                                          color: "var(--text-primary)",
                                        }}
                                      >
                                        {service}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Selected Services Tags */}
                        {selectedServices.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {selectedServices.map((service) => (
                              <div
                                key={service}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                                style={{
                                  backgroundColor: "var(--badge-bg)",
                                  border: "1px solid var(--accent-blue)",
                                }}
                              >
                                <span
                                  style={{
                                    color: "var(--accent-blue)",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {service}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedServices(
                                      selectedServices.filter((s) => s !== service)
                                    );
                                  }}
                                  className="hover:opacity-70 transition-opacity duration-150"
                                  style={{
                                    color: "var(--accent-blue)",
                                  }}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name */}
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
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full px-4 py-3 rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          border: "1px solid var(--border-default)",
                          color: "var(--text-primary)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent-blue)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--border-default)";
                        }}
                      />
                    </div>

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
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="w-full px-4 py-3 rounded-lg transition-all duration-200"
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
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
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
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="px-3 py-3 rounded-lg transition-all duration-200"
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            border: errors.phone
                              ? "1px solid #ef4444"
                              : "1px solid var(--border-default)",
                            color: "var(--text-primary)",
                            minWidth: "140px",
                            appearance: "none",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                            backgroundSize: "18px",
                            paddingRight: "46px",
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
                        >
                          {countryCodes.map((item, index) => (
                            <option key={`${item.code}-${index}`} value={item.code}>
                              {item.flag} {item.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          required
                          className="flex-1 px-4 py-3 rounded-lg transition-all duration-200"
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
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Address */}
                    <div>
                      <label
                        htmlFor="address"
                        className="block mb-2"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Address (Optional)
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Your address"
                        className="w-full px-4 py-3 rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          border: "1px solid var(--border-default)",
                          color: "var(--text-primary)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent-blue)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--border-default)";
                        }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Additional Information (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell me more about your project needs..."
                        className="w-full px-4 py-3 rounded-lg transition-all duration-200 resize-none"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          border: "1px solid var(--border-default)",
                          color: "var(--text-primary)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent-blue)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--border-default)";
                        }}
                      />
                    </div>
                  </div>
                )}
                </div>

                {/* Sticky Footer with CTAs */}
                {submitStatus !== "success" && (
                  <div
                    className="px-8 py-6 flex gap-4"
                    style={{
                      borderTop: "1px solid var(--border-default)",
                      backgroundColor: "var(--bg-primary)",
                    }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition-all duration-200"
                      style={{
                        background: isSubmitting ? "var(--bg-secondary)" : "var(--gradient-primary)",
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
                      {isSubmitting ? "Processing..." : "Submit Interest"}
                      <Send className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-4 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-primary)",
                        fontWeight: 600,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent-blue)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-default)";
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}