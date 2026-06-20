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

      {/* FIXED: Centered container for header */}
      <div style={{ 
        maxWidth: '1600px', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Section Header - FIXED: Now centered */}
        <div style={{ 
          marginBottom: '4rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
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

      {/* Projects Animated List */}
      <div style={{
        width: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '2rem 1rem',
        position: 'relative',
        zIndex: 10,
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2.5rem',
            width: '100%',
            perspective: '1500px'
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              variants={{
                hidden: { opacity: 0, y: 80, scale: 0.85, rotateX: 30, rotateY: -15 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 70, 
                    damping: 15,
                    mass: 1 
                  } 
                }
              }}
              whileHover={{ 
                y: -15, 
                rotateX: 5,
                rotateY: -5,
                boxShadow: '0 30px 60px rgba(45, 80, 22, 0.4), 0 0 30px rgba(45, 80, 22, 0.2)',
                borderColor: 'rgba(74, 124, 42, 0.8)'
              }}
              onClick={() => {
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
              style={{
                backgroundColor: 'rgba(15, 15, 15, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(45, 80, 22, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  <Image
                    src={urlFor(project.thumbnail).width(600).height(400).url()}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15,15,15,0.9) 0%, transparent 60%)',
                    pointerEvents: 'none'
                  }} />
                </motion.div>
              </div>
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  color: '#4a7c2a',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  {project.category}
                </span>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#f5f5f5',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}>
                  {project.title}
                </h3>
                <p style={{
                  color: 'rgba(245, 245, 245, 0.6)',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  flexGrow: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {project.description}
                </p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} style={{
                        backgroundColor: 'rgba(45, 80, 22, 0.1)',
                        border: '1px solid rgba(45, 80, 22, 0.2)',
                        color: '#f5f5f5',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.75rem',
                        borderRadius: '0.25rem',
                      }}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span style={{
                        color: 'rgba(245, 245, 245, 0.4)',
                        fontSize: '0.75rem',
                        padding: '0.25rem 0',
                      }}>
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
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