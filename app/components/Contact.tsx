"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send, User, MessageSquare, CheckCircle } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        
        // Reset after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        
        // Reset after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus("error");
      
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(45, 80, 22) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '600px',
          height: '600px',
          backgroundColor: '#2d5016',
          borderRadius: '50%',
          filter: 'blur(150px)',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d5016]/10 border border-[#2d5016]/20 rounded-full mb-6">
              <Mail className="w-4 h-4 text-[#2d5016]" />
              <span className="text-sm font-semibold text-[#2d5016] uppercase tracking-wider">
                Get In Touch
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: '#f5f5f5',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              Let's Build <span style={{ color: '#2d5016' }}>Something Great</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'rgba(245, 245, 245, 0.7)',
                lineHeight: 1.7,
                maxWidth: '42rem',
                margin: '0 auto',
              }}
            >
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              style={{
                backgroundColor: 'rgba(45, 80, 22, 0.05)',
                border: '1px solid rgba(45, 80, 22, 0.2)',
                borderRadius: '1.5rem',
                padding: 'clamp(2rem, 5vw, 3rem)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#f5f5f5',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d5016]"
                      style={{ width: '20px', height: '20px' }}
                    />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3.5rem',
                        backgroundColor: 'rgba(10, 10, 10, 0.5)',
                        border: '2px solid rgba(45, 80, 22, 0.3)',
                        borderRadius: '0.75rem',
                        color: '#f5f5f5',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2d5016';
                        e.target.style.boxShadow = '0 0 0 3px rgba(45, 80, 22, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(45, 80, 22, 0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#f5f5f5',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d5016]"
                      style={{ width: '20px', height: '20px' }}
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3.5rem',
                        backgroundColor: 'rgba(10, 10, 10, 0.5)',
                        border: '2px solid rgba(45, 80, 22, 0.3)',
                        borderRadius: '0.75rem',
                        color: '#f5f5f5',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2d5016';
                        e.target.style.boxShadow = '0 0 0 3px rgba(45, 80, 22, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(45, 80, 22, 0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#f5f5f5',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="absolute left-4 top-4 text-[#2d5016]"
                      style={{ width: '20px', height: '20px' }}
                    />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project..."
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3.5rem',
                        backgroundColor: 'rgba(10, 10, 10, 0.5)',
                        border: '2px solid rgba(45, 80, 22, 0.3)',
                        borderRadius: '0.75rem',
                        color: '#f5f5f5',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                        resize: 'vertical',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2d5016';
                        e.target.style.boxShadow = '0 0 0 3px rgba(45, 80, 22, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(45, 80, 22, 0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                  whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
                  style={{
                    width: '100%',
                    padding: '1.25rem 2rem',
                    backgroundColor: status === "success" ? '#2d5016' : '#2d5016',
                    color: '#f5f5f5',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderRadius: '0.75rem',
                    border: 'none',
                    cursor: status === "idle" ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s',
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (status === "idle") {
                      e.currentTarget.style.backgroundColor = '#4a7c2a';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(45, 80, 22, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2d5016';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {status === "idle" && (
                    <>
                      Send Message
                      <Send style={{ width: '20px', height: '20px' }} />
                    </>
                  )}
                  {status === "sending" && "Sending..."}
                  {status === "success" && (
                    <>
                      Sent Successfully!
                      <CheckCircle style={{ width: '20px', height: '20px' }} />
                    </>
                  )}
                  {status === "error" && "Failed - Try Again"}
                </motion.button>
              </form>

              {/* Success Message */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(45, 80, 22, 0.2)',
                    border: '1px solid rgba(45, 80, 22, 0.4)',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    color: '#2d5016',
                    fontWeight: 600,
                  }}
                >
                  Thank you! Your message has been sent successfully. I'll get back to you soon!
                </motion.div>
              )}

              {/* Error Message */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 0, 0, 0.3)',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    color: '#ff4444',
                    fontWeight: 600,
                  }}
                >
                  Oops! Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}