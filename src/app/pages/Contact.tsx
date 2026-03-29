import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Send, MapPin, Clock } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a backend
    console.log('Form submitted:', formData);
    alert('Thanks for reaching out! This is a demo form.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div 
      className="min-h-screen pb-16"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
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
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(var(--accent-blue) 1px, transparent 1px),
                linear-gradient(90deg, var(--accent-blue) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-12 pb-16 relative z-10">
          <motion.div
            className="space-y-6 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: 'var(--badge-bg)',
                border: '1px solid var(--badge-border)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Send className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />
              <span style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.9rem' }}>
                Let's Connect
              </span>
            </motion.div>

            <h1 
              className="text-5xl lg:text-6xl" 
              style={{ 
                color: 'var(--text-primary)', 
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Let's Build Something{' '}
              <span style={{ 
                background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Amazing
              </span>
            </h1>
            
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              I'm currently open to new opportunities and collaborations. Whether you're looking for a product designer, want to discuss a project, or just want to say hi, I'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info - 2 columns */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h2 className="text-2xl mb-6" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                Get in Touch
              </h2>
              <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Feel free to reach out through any of these channels. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <motion.a
                href="mailto:mranshyadav74@gmail.com"
                className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-default)',
                }}
                whileHover={{ y: -2, borderColor: 'var(--accent-blue)' }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#3B82F610', border: '1px solid #3B82F630' }}
                >
                  <Mail className="w-5 h-5" style={{ color: 'var(--accent-blue)' }} />
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Email</p>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    mranshyadav74@gmail.com
                  </p>
                </div>
              </motion.a>

              {/* Phone */}
              <motion.a
                href="tel:+919696975512"
                className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-default)',
                }}
                whileHover={{ y: -2, borderColor: 'var(--accent-blue)' }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#10B98110', border: '1px solid #10B98130' }}
                >
                  <Phone className="w-5 h-5" style={{ color: '#10B981' }} />
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Phone / WhatsApp</p>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    +91 9696975512
                  </p>
                </div>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/ansh001/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-default)',
                }}
                whileHover={{ y: -2, borderColor: 'var(--accent-blue)' }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#8B5CF610', border: '1px solid #8B5CF630' }}
                >
                  <Linkedin className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>LinkedIn</p>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    linkedin.com/in/ansh001
                  </p>
                </div>
              </motion.a>
            </div>

            {/* Additional Info */}
            <div 
              className="p-6 rounded-xl"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-default)',
              }}
            >
              <h3 className="text-lg mb-4" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                Quick Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Based in India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Typical response: 24 hours</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl mb-6" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-200"
                  style={{
                    border: '1px solid var(--border-default)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-200"
                  style={{
                    border: '1px solid var(--border-default)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-200 resize-none"
                  style={{
                    border: '1px solid var(--border-default)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Tell me about your project or question..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg transition-all duration-200"
                style={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--gradient-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(30, 64, 175, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--gradient-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.25)';
                }}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}