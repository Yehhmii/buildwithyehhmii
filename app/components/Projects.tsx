'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: any;
  images: any[];
  liveUrl?: string;
  technologies: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'gathering' | 'lineup' | 'reveal' | 'stack'>('initial');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch projects from Sanity
  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch(projectsQuery);
        console.log('Fetched projects:', data.length);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Manual scroll detection
  useEffect(() => {
    if (hasAnimated || projects.length === 0) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in view (top is above bottom of viewport and bottom is below top of viewport)
      const isInView = rect.top < windowHeight * 0.8 && rect.bottom > 0;

      if (isInView && !hasAnimated) {
        console.log('Section detected in view - starting animation');
        setHasAnimated(true);
        startAnimation();
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately

    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length, hasAnimated]);

  const startAnimation = async () => {
    console.log('Animation sequence starting');
    
    // Phase 1: Dragon balls flying in
    setTimeout(() => {
      console.log('Phase: gathering');
      setAnimationPhase('gathering');
    }, 100);
    
    // Phase 2: Form a line
    setTimeout(() => {
      console.log('Phase: lineup');
      setAnimationPhase('lineup');
    }, 2000);
    
    // Phase 3: Reveal one by one
    setTimeout(() => {
      console.log('Phase: reveal');
      setAnimationPhase('reveal');
    }, 4000);
    
    // Phase 4: Stack cards
    setTimeout(() => {
      console.log('Phase: stack');
      setAnimationPhase('stack');
    }, 6000 + projects.length * 300);
  };

  // Auto-play cards
  useEffect(() => {
    if (animationPhase !== 'stack' || !isAutoPlaying || projects.length === 0) return;

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [animationPhase, isAutoPlaying, projects.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentCardIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentCardIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (loading) {
    return (
      <section
        id="projects"
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          padding: '8rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ color: '#2d5016', fontSize: '1.5rem', fontWeight: 700 }}>
          Loading Projects...
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section
        id="projects"
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          padding: '8rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ color: '#f5f5f5', fontSize: '1.5rem', textAlign: 'center' }}>
          No projects yet. Add some in your Sanity Studio!
        </div>
      </section>
    );
  }

  console.log('Rendering - Phase:', animationPhase, 'HasAnimated:', hasAnimated, 'Projects:', projects.length);

  return (
    <section
      id="projects"
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

      {/* Crime Scene Tapes - Diagonal across entire section, crossed */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 1,
        pointerEvents: 'none',
      }}>
        {/* First diagonal tape - top-left to bottom-right */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.15 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{
            position: 'absolute',
            top: '40%',
            left: '-10%',
            width: '120%',
            height: '60px',
            rotate : '10deg',
            transform: 'rotate(20deg)',
            transformOrigin: 'center',
            background: 'repeating-linear-gradient(45deg, #2d5016 0px, #2d5016 40px, #f5f5f5 40px, #f5f5f5 80px)',
            boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Repeating text on tape */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            {[...Array(20)].map((_, i) => (
              <span key={i} style={{
                fontWeight: 800,
                fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#f5f5f5',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                whiteSpace: 'nowrap',
                padding: '0 2.5rem',
              }}>
                ⚠ YEHHMII • PROJECT ZONE ⚠
              </span>
            ))}
          </div>
        </motion.div>

        {/* Second diagonal tape - bottom-left to top-right (CROSSED) */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.15 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '-10%',
            width: '120%',
            height: '60px',
            rotate : '-10deg',
            transform: 'rotate(-20deg)',
            transformOrigin: 'center',
            background: 'repeating-linear-gradient(45deg, #2d5016 0px, #2d5016 40px, #f5f5f5 40px, #f5f5f5 80px)',
            boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Repeating text on tape */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            {[...Array(20)].map((_, i) => (
              <span key={i} style={{
                fontWeight: 800,
                fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#f5f5f5',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                whiteSpace: 'nowrap',
                padding: '0 2.5rem',
              }}>
                ⚠ DO NOT CROSS • YEHHMII ⚠
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div style={{ maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
                THE FLY
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              fontWeight: 900,
              color: '#f5f5f5',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              PROJECTS <span style={{ color: '#2d5016' }}>Worked On</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Projects Animation Container */}
      <div style={{
        position: 'relative',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}>
        {animationPhase === 'stack' ? (
          // Final Phase: Stacked Cards with Holographic Text
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
            height: '600px',
            margin: '0 auto',
          }}>
            {/* Navigation Arrows - Desktop */}
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(45, 80, 22, 0.2)',
                border: '2px solid rgba(45, 80, 22, 0.4)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 200,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.4)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.2)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
              className="md:flex"
            >
              <ArrowLeft style={{ width: '24px', height: '24px', color: '#2d5016' }} />
            </button>

            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(45, 80, 22, 0.2)',
                border: '2px solid rgba(45, 80, 22, 0.4)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 200,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.4)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.2)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
              className="md:flex"
            >
              <ArrowRight style={{ width: '24px', height: '24px', color: '#2d5016' }} />
            </button>

            {/* Mobile Navigation Buttons */}
            <div style={{
              position: 'absolute',
              bottom: '-80px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '1rem',
              zIndex: 200,
            }}
            >
              <button
                onClick={handlePrev}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(45, 80, 22, 0.2)',
                  border: '2px solid rgba(45, 80, 22, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                className="md:hidden"
              >
                <ArrowLeft style={{ width: '24px', height: '24px', color: '#2d5016' }} />
              </button>
              <button
                onClick={handleNext}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(45, 80, 22, 0.2)',
                  border: '2px solid rgba(45, 80, 22, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                className="md:hidden"
              >
                <ArrowRight style={{ width: '24px', height: '24px', color: '#2d5016' }} />
              </button>
            </div>

            {/* Stacked Cards */}
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => {
                const offset = (index - currentCardIndex + projects.length) % projects.length;
                const isActive = offset === 0;
                
                // Only show top 3 cards
                if (offset > 2) return null;

                return (
                  <motion.div
                    key={project._id}
                    initial={{ scale: 0.8, y: 100, opacity: 0 }}
                    animate={{
                      scale: isActive ? 1 : 1 - offset * 0.05,
                      y: offset * 20,
                      opacity: 1 - offset * 0.3,
                      zIndex: 100 + (50 - offset),
                    }}
                    exit={{ scale: 0.8, x: -300, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    onClick={() => {
                      if (isActive) {
                        setSelectedProject(project);
                        setCurrentImageIndex(0);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      width: '90%',
                      maxWidth: '400px',
                      left: '5%',
                      cursor: isActive ? 'pointer' : 'default',
                    }}
                    className="sm:left-1/2 sm:-ml-[200px] sm:w-full"
                  >
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      boxShadow: isActive 
                        ? '0 30px 60px rgba(45, 80, 22, 0.4), 0 0 0 3px #2d5016' 
                        : `0 ${10 + offset * 5}px ${20 + offset * 10}px rgba(0, 0, 0, ${0.3 + offset * 0.1})`,
                    }}>
                      {/* Project Image */}
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '3/4',
                      }}>
                        <Image
                          src={urlFor(project.thumbnail).width(800).height(1000).url()}
                          alt={project.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                        
                        {/* Holographic Text Overlay - Only on active card */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.5) 50%, transparent 70%)',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              padding: '2rem',
                            }}
                          >
                            {/* Category - Holographic effect */}
                            <motion.span
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              style={{
                                color: '#2d5016',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                marginBottom: '0.5rem',
                                textShadow: '0 0 10px rgba(45, 80, 22, 0.8)',
                              }}
                            >
                              {project.category}
                            </motion.span>

                            {/* Title - Holographic effect */}
                            <motion.h3
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              style={{
                                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                fontWeight: 900,
                                color: '#f5f5f5',
                                letterSpacing: '-0.02em',
                                textTransform: 'uppercase',
                                lineHeight: 1.2,
                                textShadow: '0 0 20px rgba(45, 80, 22, 0.6), 0 0 40px rgba(45, 80, 22, 0.4)',
                                marginBottom: '1rem',
                              }}
                            >
                              {project.title}
                            </motion.h3>

                            {/* Holographic scan lines effect */}
                            <motion.div
                              animate={{
                                y: ['0%', '100%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, transparent 0%, rgba(45, 80, 22, 0.1) 50%, transparent 100%)',
                                pointerEvents: 'none',
                              }}
                            />

                            {/* Glitch effect */}
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                  opacity: [0, 0.3, 0],
                                  x: [0, (Math.random() * 10 - 5), 0],
                                }}
                                transition={{
                                  duration: 0.1,
                                  delay: Math.random() * 2,
                                  repeat: Infinity,
                                  repeatDelay: Math.random() * 3 + 2,
                                }}
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background: i % 2 === 0 ? 'rgba(45, 80, 22, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                  pointerEvents: 'none',
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          // Animation Phases: Gathering, Lineup, Reveal
          <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            {projects.map((project, index) => {
              // Calculate positions for each phase
              const angle = (index / projects.length) * Math.PI * 2;
              const startDistance = 800;
              const startX = Math.cos(angle) * startDistance;
              const startY = Math.sin(angle) * startDistance;
              
              const lineupAngle = (index / projects.length) * Math.PI * 2;
              const lineupRadius = 300;
              const lineupX = Math.cos(lineupAngle) * lineupRadius;
              const lineupY = Math.sin(lineupAngle) * lineupRadius;
              
              const revealGridCols = Math.ceil(Math.sqrt(projects.length));
              const revealCol = index % revealGridCols;
              const revealRow = Math.floor(index / revealGridCols);
              const revealSpacing = 120;
              const revealX = (revealCol - revealGridCols / 2) * revealSpacing;
              const revealY = (revealRow - Math.ceil(projects.length / revealGridCols) / 2) * revealSpacing;

              let currentX = startX, currentY = startY, currentScale = 0.3, currentRotate = 0, currentOpacity = 0;

              if (animationPhase === 'gathering') {
                currentX = startX;
                currentY = startY;
                currentScale = 0.5;
                currentOpacity = 1;
              } else if (animationPhase === 'lineup') {
                currentX = lineupX;
                currentY = lineupY;
                currentScale = 0.6;
                currentRotate = 360;
                currentOpacity = 1;
              } else if (animationPhase === 'reveal') {
                currentX = revealX;
                currentY = revealY;
                currentScale = 1;
                currentRotate = 0;
                currentOpacity = 1;
              }

              return (
                <motion.div
                  key={project._id}
                  initial={{
                    x: startX,
                    y: startY,
                    scale: 0.3,
                    opacity: 0,
                  }}
                  animate={{
                    x: currentX,
                    y: currentY,
                    scale: currentScale,
                    opacity: currentOpacity,
                    rotate: currentRotate,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: animationPhase === 'gathering' ? index * 0.1 : 
                           animationPhase === 'reveal' ? index * 0.3 : 0,
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                  }}
                  style={{
                    position: 'absolute',
                    width: animationPhase === 'reveal' ? '100px' : '80px',
                    height: animationPhase === 'reveal' ? '100px' : '80px',
                    left: '50%',
                    top: '50%',
                    marginLeft: animationPhase === 'reveal' ? '-50px' : '-40px',
                    marginTop: animationPhase === 'reveal' ? '-50px' : '-40px',
                  }}
                >
                  {animationPhase === 'reveal' ? (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#fff',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(45, 80, 22, 0.3)',
                      position: 'relative',
                    }}>
                      <Image
                        src={urlFor(project.thumbnail).width(200).height(200).url()}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 30% 30%, #4a7c2a, #2d5016)',
                      border: '3px solid rgba(45, 80, 22, 0.5)',
                      boxShadow: '0 0 30px rgba(45, 80, 22, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'clamp(1rem, 3vw, 2rem)',
                      color: 'rgba(255, 255, 255, 0.3)',
                    }}>
                      ★
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal - keeping same as before */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              overflowY: 'auto',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#0f0f0f',
                border: '1px solid rgba(45, 80, 22, 0.3)',
                borderRadius: '1rem',
                maxWidth: '1100px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <X style={{ width: '20px', height: '20px', color: '#f5f5f5' }} />
              </button>

              <div style={{ padding: 'clamp(1.5rem, 5vw, 3rem)' }}>
                <span style={{
                  color: '#2d5016',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}>
                  {selectedProject.category}
                </span>
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 5vw, 4rem)',
                  fontWeight: 900,
                  color: '#f5f5f5',
                  marginTop: '0.75rem',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                }}>
                  {selectedProject.title}
                </h2>
                <p style={{
                  color: 'rgba(245, 245, 245, 0.7)',
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
                }}>
                  {selectedProject.description}
                </p>

                {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} style={{
                        backgroundColor: 'rgba(45, 80, 22, 0.1)',
                        border: '1px solid rgba(45, 80, 22, 0.3)',
                        color: '#2d5016',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      backgroundColor: '#2d5016',
                      color: '#f5f5f5',
                      padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(1.5rem, 4vw, 2.5rem)',
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      fontWeight: 700,
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                    }}
                  >
                    View Live Demo
                    <ExternalLink style={{ width: '20px', height: '20px' }} />
                  </a>
                )}

                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div style={{ marginTop: '3rem' }}>
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      marginBottom: '1.5rem',
                      backgroundColor: '#1a1a1a',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                    }}>
                      <Image
                        src={urlFor(selectedProject.images[currentImageIndex]).width(1200).height(675).url()}
                        alt={`Screenshot ${currentImageIndex + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />

                      {selectedProject.images.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === 0 ? selectedProject.images.length - 1 : prev - 1
                            )}
                            style={{
                              position: 'absolute',
                              left: '1rem',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: '50px',
                              height: '50px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(10, 10, 10, 0.9)',
                              border: '1px solid rgba(245, 245, 245, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <ChevronLeft style={{ width: '24px', height: '24px', color: '#f5f5f5' }} />
                          </button>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === selectedProject.images.length - 1 ? 0 : prev + 1
                            )}
                            style={{
                              position: 'absolute',
                              right: '1rem',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: '50px',
                              height: '50px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(10, 10, 10, 0.9)',
                              border: '1px solid rgba(245, 245, 245, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <ChevronRight style={{ width: '24px', height: '24px', color: '#f5f5f5' }} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}