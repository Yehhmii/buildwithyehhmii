'use client';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

// Counter animation hook
const useCounter = (end: number, duration: number = 2, shouldStart: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth counting
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

const stats = [
  { label: 'Projects Completed', end: 37, suffix: '+' },
  { label: 'Satisfied Clients', end: 12, suffix: '+' },
  { label: 'Technologies Mastered', end: 25, suffix: '+' },
];

// Scattered clippy positions and shapes for image reveals
const clippyShapes = [
  { id: 1, top: '8%', left: '5%', size: 120, rotate: -12, delay: 0.1, shape: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
  { id: 2, top: '15%', right: '8%', size: 90, rotate: 25, delay: 0.3, shape: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' },
  { id: 3, bottom: '25%', left: '3%', size: 110, rotate: -8, delay: 0.5, shape: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  { id: 4, top: '45%', right: '5%', size: 85, rotate: 18, delay: 0.7, shape: 'circle(50% at 50% 50%)' },
  { id: 5, bottom: '12%', right: '12%', size: 100, rotate: -15, delay: 0.9, shape: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
  { id: 6, top: '60%', left: '8%', size: 95, rotate: 22, delay: 1.1, shape: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)' },
  { id: 7, top: '30%', left: '15%', size: 70, rotate: -20, delay: 1.3, shape: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' },
  { id: 8, bottom: '35%', right: '15%', size: 80, rotate: 10, delay: 1.5, shape: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const isContentInView = useInView(contentRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const clipPathProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        padding: '8rem 1.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.02,
        backgroundImage: `
          linear-gradient(to right, #2d5016 1px, transparent 1px),
          linear-gradient(to bottom, #2d5016 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Floating gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          backgroundColor: '#2d5016',
          borderRadius: '50%',
          filter: 'blur(100px)',
        }}
      />

      {/* Scattered Clippy Images - Reveal on Scroll */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {clippyShapes.map((clippy) => (
          <motion.div
            key={clippy.id}
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            style={{
              position: 'absolute',
              top: clippy.top,
              left: clippy.left,
              right: clippy.right as string,
              bottom: clippy.bottom,
              width: clippy.size,
              height: clippy.size,
              rotate: clippy.rotate,
            }}
            animate={
              isContentInView
                ? {
                    opacity: 0.15,
                    scale: 1,
                    rotate: clippy.rotate,
                  }
                : {}
            }
            transition={{
              delay: clippy.delay,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/images/splash4.jpg"
              alt=""
              fill
              style={{
                objectFit: 'cover',
                clipPath: clippy.shape,
                filter: 'grayscale(0.8)',
              }}
            />
          </motion.div>
        ))}
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(45, 80, 22, 0.1)',
            border: '1px solid rgba(45, 80, 22, 0.2)',
            borderRadius: '9999px',
            padding: '0.5rem 1.5rem',
            marginBottom: '1rem',
          }}>
            <span style={{
              color: '#2d5016',
              fontSize: '0.875rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}>
              ABOUT ME
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#f5f5f5',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            Building Digital <span style={{ color: '#2d5016' }}>Excellence</span>
          </h2>
        </motion.div>

        {/* Main Content - Single Column with Text & Stats Side by Side */}
        <div ref={contentRef}>
          {/* Main Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: 'relative',
              marginBottom: '4rem',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '4/5',
                margin: '0 auto',
              }}
            >
              {/* Decorative border */}
              <div style={{
                position: 'absolute',
                inset: '-12px',
                border: '2px solid rgba(45, 80, 22, 0.3)',
                borderRadius: '1rem',
                transform: 'rotate(-2deg)',
              }} />
              
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '1rem',
                overflow: 'hidden',
                border: '4px solid #2d5016',
                boxShadow: '0 25px 50px -12px rgba(45, 80, 22, 0.3)',
              }}>
                <Image
                  src="/images/dev1.jpeg"
                  alt="Francisco"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Text and Stats Container - RESPONSIVE GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? '1.2fr 1fr' : '1fr',
            gap: '3rem',
            alignItems: 'start',
          }}>
            {/* Left: About Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                color: 'rgba(245, 245, 245, 0.7)',
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                lineHeight: 1.8,
              }}
            >
              <p style={{ marginBottom: '1.5rem' }}>
                I'm a <span style={{ color: '#2d5016', fontWeight: 600 }}>full-stack developer</span> passionate 
                about creating digital experiences that merge technical excellence with thoughtful design. With a 
                background in both development and strategy, I bring a unique perspective to every project.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                My approach combines <span style={{ color: '#2d5016', fontWeight: 600 }}>scalable architecture</span>, 
                intuitive user experiences, and a deep understanding of cultural context. Whether building enterprise 
                applications or crafting bespoke web experiences, I focus on solutions that are both elegant and effective.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                When I'm not coding, you'll find me exploring emerging technologies, contributing to open-source projects, 
                or mentoring the next generation of developers.
              </p>

              {/* CTA Button with Smooth Scroll */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: '#2d5016',
                  color: '#f5f5f5',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s',
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
                View My Projects
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>

            {/* Right: Animated Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, x: 50 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}>
                {stats.map((stat, index) => {
                  const count = useCounter(stat.end, 2.5, isStatsInView);
                  
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                    >
                      <div style={{
                        backgroundColor: 'rgba(45, 80, 22, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(45, 80, 22, 0.2)',
                        borderRadius: '1rem',
                        padding: '2rem',
                        position: 'relative',
                        overflow: 'hidden',
                      }}>
                        {/* Animated gradient background */}
                        <motion.div
                          initial={{ x: '-100%' }}
                          animate={isStatsInView ? { x: '100%' } : {}}
                          transition={{
                            delay: index * 0.15 + 0.5,
                            duration: 1.5,
                            ease: 'easeInOut',
                          }}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(90deg, transparent, rgba(45, 80, 22, 0.1), transparent)',
                          }}
                        />
                        
                        <div style={{ position: 'relative', zIndex: 1 }}>
                          <div style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            fontWeight: 900,
                            color: '#2d5016',
                            lineHeight: 1,
                            marginBottom: '0.5rem',
                            letterSpacing: '-0.02em',
                          }}>
                            {count}{stat.suffix}
                          </div>
                          <div style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#f5f5f5',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                          }}>
                            {stat.label}
                          </div>
                        </div>

                        {/* Corner accent */}
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: '80px',
                          height: '80px',
                          background: 'radial-gradient(circle at bottom right, rgba(45, 80, 22, 0.15), transparent)',
                        }} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}