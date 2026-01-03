'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
] as const;

const splashImages = [
  { src: '/images/splash1.png', top: '10%', left: '5%', rotation: -15, delay: 1.2 },
  { src: '/images/splash2.png', top: '55%', right: '8%', rotation: 12, delay: 1.5 },
  { src: '/images/splash3.jpg', bottom: '15%', left: '8%', rotation: -8, delay: 1.8 },
];

const rotatingTexts = [
  {
    highlights: [
      { word: "Building the future with ", color: "#f5f5f5" },
      { word: "clean code", color: "#2d5016" },
      { word: ", ", color: "#f5f5f5" },
      { word: "bold ideas", color: "#2d5016" },
      { word: ", and a passion for ", color: "#f5f5f5" },
      { word: "meaningful impact", color: "#2d5016" },
      { word: ".", color: "#f5f5f5" },
    ]
  },
  {
    highlights: [
      { word: "Crafting digital experiences that blend ", color: "#f5f5f5" },
      { word: "technology", color: "#2d5016" },
      { word: " with ", color: "#f5f5f5" },
      { word: "human-centered design", color: "#2d5016" },
      { word: " and ", color: "#f5f5f5" },
      { word: "strategic thinking", color: "#2d5016" },
      { word: ".", color: "#f5f5f5" },
    ]
  },
  {
    highlights: [
      { word: "A full-stack developer who builds systems that ", color: "#f5f5f5" },
      { word: "scale", color: "#2d5016" },
      { word: ", products that ", color: "#f5f5f5" },
      { word: "feel right", color: "#2d5016" },
      { word: ", and experiences rooted in ", color: "#f5f5f5" },
      { word: "cultural context", color: "#2d5016" },
      { word: ".", color: "#f5f5f5" },
    ]
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      style={{ 
        opacity,
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1.5rem',
        paddingTop: '8rem',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Animated Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, #2d5016 1px, transparent 1px),
            linear-gradient(to bottom, #2d5016 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '24rem',
          height: '24rem',
          backgroundColor: '#2d5016',
          borderRadius: '50%',
          filter: 'blur(120px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '25%',
          width: '31.25rem',
          height: '31.25rem',
          backgroundColor: '#f5e6d3',
          borderRadius: '50%',
          filter: 'blur(140px)',
        }}
      />

      {/* Splash Images */}
      {splashImages.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
          animate={{ opacity: 0.08, scale: 1, rotate: img.rotation }}
          transition={{ 
            delay: img.delay, 
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            position: 'absolute',
            width: '20rem',
            height: '20rem',
            display: 'none',
            pointerEvents: 'none',
            top: img.top,
            left: img.left,
            right: img.right as string,
            bottom: img.bottom,
          }}
          className="md:block"
        >
          <Image
            src={img.src}
            alt=""
            fill
            className="object-cover rounded-2xl grayscale"
            priority
          />
        </motion.div>
      ))}

      <motion.div 
        style={{ 
          y,
          maxWidth: '87.5rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          width: '100%',
        }}
      >
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        }}>
          {/* Animated Intro Tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              display: 'inline-block',
              margin: '0 auto',
            }}
          >
            <div style={{
              backgroundColor: 'rgba(45, 80, 22, 0.1)',
              border: '1px solid rgba(45, 80, 22, 0.2)',
              borderRadius: '9999px',
              padding: '0.5rem 1.5rem',
              backdropFilter: 'blur(4px)',
            }}>
              <span style={{
                color: '#2d5016',
                fontSize: '0.875rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}>
                BUILDER • STRATEGIST • DEVELOPER
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(3rem, 10vw, 6rem)',
                fontWeight: 900,
                lineHeight: 1,
                color: 'rgba(245, 245, 245, 0.2)',
                letterSpacing: '-0.05em',
              }}
            >
              HEY, I'M
            </motion.h1>

            {/* name with Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative' }}
            >
              <h1 style={{
                fontSize: 'clamp(3.75rem, 12vw, 10rem)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 'clamp(0.5rem, 2vw, 2rem)',
              }}>
                <span style={{ color: '#f5f5f5' }}>FRAN</span>

                <span style={{ color: '#2d5016' }}>CISC</span>

                {/* Circular Profile Image */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: 'clamp(4rem, 10vw, 11rem)',
                    height: 'clamp(4rem, 10vw, 11rem)',
                  }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '2px dashed rgba(45, 80, 22, 0.3)',
                      }}
                    />
                    <Image
                      src="/images/profile_smaller.jpeg"
                      alt="Francisco"
                      fill
                      style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '6px solid #2d5016',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                      }}
                      priority
                    />
                  </div>
                </motion.div>
              </h1>
            </motion.div>
          </div>

          {/* Rotating Subtext */}
          <div style={{
            height: 'clamp(8rem, 15vh, 11rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 1rem',
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.875rem)',
                  color: 'rgba(245, 245, 245, 0.7)',
                  maxWidth: '80rem',
                  margin: '0 auto',
                  fontWeight: 300,
                  lineHeight: 1.6,
                }}
              >
                {rotatingTexts[currentTextIndex].highlights.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      color: item.color,
                      fontWeight: item.color === "#2d5016" ? 600 : 300,
                    }}
                  >
                    {item.word}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              paddingTop: '1rem',
            }}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: '#2d5016',
                color: '#f5f5f5',
                padding: '1.25rem 2.5rem',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(45, 80, 22, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3d6026';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(45, 80, 22, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2d5016';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(45, 80, 22, 0.3)';
              }}
            >
              View My Work
              <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                border: '2px solid rgba(45, 80, 22, 0.5)',
                backgroundColor: 'transparent',
                color: '#f5f5f5',
                padding: '1.25rem 2.5rem',
                borderRadius: '0.75rem',
                transition: 'all 0.3s',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.1)';
                e.currentTarget.style.borderColor = '#2d5016';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(45, 80, 22, 0.5)';
              }}
            >
              Let's Build Together
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '2.5rem',
              justifyContent: 'center',
              paddingTop: '2rem',
            }}
          >
            {socialLinks.map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.2, y: -5 }}
                transition={{ delay: 1.9 + i * 0.1 }}
                style={{
                  color: 'rgba(245, 245, 245, 0.4)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2d5016';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(245, 245, 245, 0.4)';
                }}
                aria-label={label}
              >
                <Icon style={{ width: '1.75rem', height: '1.75rem' }} />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            style={{ paddingTop: '3rem' }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '1.5rem',
                height: '2.5rem',
                border: '2px solid rgba(45, 80, 22, 0.3)',
                borderRadius: '9999px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '0.5rem',
              }}
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '0.375rem',
                  height: '0.75rem',
                  backgroundColor: '#2d5016',
                  borderRadius: '9999px',
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}