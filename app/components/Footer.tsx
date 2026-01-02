"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Github, 
  Linkedin, 
  Twitter,
  Mail, 
  Heart,
  ArrowUp
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Yehhmii", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/abhulimen-francisco-4928a0294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/yehhmii", label: "Twitter" },
    { icon: FaTiktok, href: "https://www.tiktok.com/@yehhmiicapguy?_t=ZM-8spD2HQzx25&_r=1", label: "TikTok" },
    { icon: Mail, href: "mailto:franciscoabhulimen@gmail.com", label: "Email" },
  ];

  const footerLinks = {
    navigation: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Projects", href: "#projects" },
      { name: "Services", href: "#services" },
      { name: "Contact", href: "#contact" },
    ],
    services: [
      { name: "Web Development", href: "#services" },
      { name: "Mobile Apps", href: "#services" },
      { name: "AI Solutions", href: "#services" },
      { name: "Consulting", href: "#services" },
    ],
  };

  return (
    <footer className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Wavy Clip Path at Top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: '#0f0f0f',
          clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)',
        }}
      />

      <svg
        className="absolute top-0 left-0 w-full"
        style={{ height: '150px' }}
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C360,20 720,20 1080,80 C1200,100 1320,100 1440,80 L1440,0 L0,0 Z"
          fill="#0f0f0f"
        />
      </svg>

      {/* Water Fill Effect with Animated Waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Wave 1 */}
        <motion.div
          animate={{
            x: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'radial-gradient(circle at 50% 100%, rgba(45, 80, 22, 0.15), transparent 60%)',
          }}
        />

        {/* Wave 2 */}
        <motion.div
          animate={{
            x: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80%',
            background: 'radial-gradient(circle at 50% 100%, rgba(45, 80, 22, 0.1), transparent 50%)',
          }}
        />

        {/* Bubbles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -200, -400, -600],
              opacity: [0, 0.5, 0.5, 0],
              scale: [0.5, 1, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: `${(i * 7) % 100}%`,
              width: `${10 + (i * 1.5)}px`,
              height: `${10 + (i * 1.5)}px`,
              borderRadius: '50%',
              backgroundColor: 'rgba(45, 80, 22, 0.3)',
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 pt-32 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <h3
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    fontWeight: 900,
                    color: '#f5f5f5',
                    letterSpacing: '-0.02em',
                  }}
                >
                  FRAN<span style={{ color: '#2d5016' }}>CISCO</span>
                </h3>
              </Link>
              <p
                style={{
                  color: 'rgba(245, 245, 245, 0.7)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                  maxWidth: '400px',
                }}
              >
                Crafting exceptional digital experiences with cutting-edge technology and creative innovation.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(45, 80, 22, 0.1)',
                      border: '1px solid rgba(45, 80, 22, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#2d5016';
                      e.currentTarget.style.borderColor = '#2d5016';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(45, 80, 22, 0.3)';
                    }}
                  >
                    <social.icon style={{ width: '20px', height: '20px', color: '#2d5016' }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h4
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#f5f5f5',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Navigation
              </h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      style={{
                        color: 'rgba(245, 245, 245, 0.7)',
                        transition: 'color 0.3s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#2d5016';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(245, 245, 245, 0.7)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#f5f5f5',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      style={{
                        color: 'rgba(245, 245, 245, 0.7)',
                        transition: 'all 0.3s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#2d5016';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(245, 245, 245, 0.7)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(45, 80, 22, 0.3), transparent)',
              marginBottom: '2rem',
            }}
          />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p
              style={{
                color: 'rgba(245, 245, 245, 0.5)',
                fontSize: '0.875rem',
                textAlign: 'center',
              }}
            >
              © {currentYear} HITHUB. Made with{" "}
              <Heart
                style={{
                  display: 'inline',
                  width: '16px',
                  height: '16px',
                  color: '#2d5016',
                  fill: '#2d5016',
                  verticalAlign: 'middle',
                }}
              />{" "}
              by HITHUB
            </p>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#2d5016',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(45, 80, 22, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4a7c2a';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 80, 22, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2d5016';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 22, 0.3)';
              }}
            >
              <ArrowUp style={{ width: '20px', height: '20px', color: '#f5f5f5' }} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(45, 80, 22) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </footer>
  );
}