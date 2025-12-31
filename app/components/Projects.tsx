'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

// Project data structure
const projects = [
  {
    id: 1,
    title: 'Artist Portfolio Website',
    category: 'Full Stack',
    description: 'The artist needed a professional digital platform to move beyond social media, centralize their music, and define their unique "vibe" to attract new fans and industry professionals. This project reinforced the importance of balancing aesthetic design with functional requirements, particularly for a media-heavy platform like a music portfolio. It was a great lesson in translating abstract "vibes" into concrete design decisions.',
    thumbnail: '/projects/project1.png',
    images: [
      '/projects/project1-1.png',
      '/projects/project1-2.png',
      '/projects/project1-3.png',
    ],
    liveUrl: 'https://jiire-smith.vercel.app/',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Git'],
  },
  {
    id: 2,
    title: 'Events Management System haveimng them chanheg',
    category: 'Saas web app',
    description: 'A web application that was built to simplify the process of events managements, be it weddings, anniversaries, birthdays, or corporate events. The app offers features such as guest list management, RSVP tracking,Qr-code verification, and Gifts, all within an intuitive user interface.',
    thumbnail: '/projects/project2.png',
    images: [
      '/projects/project2-1.png',
      '/projects/project2-2.png',
      '/projects/project2-3.png',
    ],
    liveUrl: 'https://digivite-pro.vercel.app/',
    technologies: ['React', 'Next.js', 'TypeScript'],
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    category: 'Data Visualization',
    description: 'Enterprise analytics dashboard with real-time data visualization, customizable widgets, and comprehensive reporting tools for business intelligence.',
    thumbnail: '/projects/project3.jpg',
    images: [
      '/projects/project3-1.jpg',
      '/projects/project3-2.jpg',
      '/projects/project3-3.jpg',
      '/projects/project3-4.jpg',
      '/projects/project3-5.jpg',
    ],
    liveUrl: 'https://example.com',
    technologies: ['Next.js', 'D3.js', 'Python', 'PostgreSQL'],
  },
  {
    id: 4,
    title: 'Social Media Platform',
    category: 'Web Application',
    description: 'Modern social networking platform with real-time messaging, content sharing, and advanced privacy controls. Built for scalability and performance.',
    thumbnail: '/projects/project4.jpg',
    images: [
      '/projects/project4-1.jpg',
      '/projects/project4-2.jpg',
      '/projects/project4-3.jpg',
    ],
    liveUrl: 'https://example.com',
    technologies: ['React', 'WebSockets', 'Redis', 'AWS'],
  },
  {
    id: 5,
    title: 'AI Content Generator',
    category: 'Machine Learning',
    description: 'AI-powered content generation tool leveraging natural language processing to create high-quality written content for various use cases.',
    thumbnail: '/projects/project5.jpg',
    images: [
      '/projects/project5-1.jpg',
      '/projects/project5-2.jpg',
      '/projects/project5-3.jpg',
      '/projects/project5-4.jpg',
    ],
    liveUrl: null,
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
  },
  {
    id: 6,
    title: 'Real Estate Platform',
    category: 'Web Development',
    description: 'Comprehensive real estate platform with property listings, virtual tours, mortgage calculator, and agent dashboard.',
    thumbnail: '/projects/project6.jpg',
    images: [
      '/projects/project6-1.jpg',
      '/projects/project6-2.jpg',
      '/projects/project6-3.jpg',
    ],
    liveUrl: 'https://example.com',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        padding: '8rem 0',
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

      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '4rem', 
          flexWrap: 'wrap', 
          gap: '2rem' 
        }}>
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
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
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

      {/* Horizontal Spread Carousel */}
      <div style={{
        position: 'relative',
        height: '650px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      }}>
        <motion.div 
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Create multiple copies for infinite scroll */}
          {[...projects, ...projects, ...projects].map((project, globalIndex) => {
            const index = globalIndex % projects.length;
            const cardSpacing = 320;
            const totalCards = projects.length * 3;
            
            return (
              <motion.div
                key={`${project.id}-${globalIndex}`}
                animate={{
                  x: [
                    (globalIndex - projects.length) * cardSpacing,
                    (globalIndex - projects.length) * cardSpacing - cardSpacing * projects.length
                  ],
                }}
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                }}
                onMouseEnter={() => setHoveredIndex(globalIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
                style={{
                  position: 'absolute',
                  width: '300px',
                  height: '500px',
                  cursor: 'pointer',
                  transformOrigin: 'center bottom',
                }}
              >
                <motion.div
                  animate={{
                    scale: hoveredIndex === globalIndex ? 1.08 : 1,
                    rotate: hoveredIndex === globalIndex ? 0 : (globalIndex - projects.length) * 2,
                    y: Math.sin(globalIndex * 0.5) * 30,
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    rotate: { duration: 0.3 },
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#fff',
                    borderRadius: '0.25rem',
                    overflow: 'hidden',
                    boxShadow: hoveredIndex === globalIndex 
                      ? '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 3px #2d5016' 
                      : '0 15px 35px rgba(0, 0, 0, 0.3)',
                    transition: 'box-shadow 0.3s',
                    position: 'relative',
                  }}>
                    {/* Project Image */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                    }}>
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                      
                      {/* Info overlay on hover */}
                      {hoveredIndex === globalIndex && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.7) 40%, transparent 70%)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '2rem',
                          }}
                        >
                          <span style={{
                            color: '#2d5016',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            marginBottom: '0.5rem',
                          }}>
                            {project.category}
                          </span>
                          <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 900,
                            color: '#f5f5f5',
                            letterSpacing: '-0.01em',
                            textTransform: 'uppercase',
                            lineHeight: 1.2,
                          }}>
                            {project.title}
                          </h3>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Project Modal */}
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
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              overflowY: 'auto',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 245, 245, 0.1)',
                  border: '1px solid rgba(245, 245, 245, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 245, 245, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 245, 245, 0.1)';
                }}
              >
                <X style={{ width: '24px', height: '24px', color: '#f5f5f5' }} />
              </button>

              {/* Modal Content */}
              <div style={{ padding: '3rem' }}>
                <div style={{ marginBottom: '2.5rem' }}>
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
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
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
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    marginBottom: '2rem',
                    maxWidth: '800px',
                  }}>
                    {selectedProject.description}
                  </p>

                  {/* Technologies */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          backgroundColor: 'rgba(45, 80, 22, 0.1)',
                          border: '1px solid rgba(45, 80, 22, 0.3)',
                          color: '#2d5016',
                          padding: '0.625rem 1.25rem',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Live Demo Button */}
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
                        padding: '1.25rem 2.5rem',
                        fontSize: '1rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.3s',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#3d6026';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2d5016';
                      }}
                    >
                      View Live Demo
                      <ExternalLink style={{ width: '20px', height: '20px' }} />
                    </a>
                  )}
                </div>

                {/* Image Gallery */}
                <div style={{ marginTop: '3rem' }}>
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                    backgroundColor: '#1a1a1a',
                  }}>
                    <Image
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} screenshot`}
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
                            left: '1.5rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(10, 10, 10, 0.9)',
                            border: '1px solid rgba(245, 245, 245, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#2d5016';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
                          }}
                        >
                          <ChevronLeft style={{ width: '28px', height: '28px', color: '#f5f5f5' }} />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => 
                            prev === selectedProject.images.length - 1 ? 0 : prev + 1
                          )}
                          style={{
                            position: 'absolute',
                            right: '1.5rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(10, 10, 10, 0.9)',
                            border: '1px solid rgba(245, 245, 245, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#2d5016';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
                          }}
                        >
                          <ChevronRight style={{ width: '28px', height: '28px', color: '#f5f5f5' }} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {selectedProject.images.length > 1 && (
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      overflowX: 'auto',
                      paddingBottom: '0.5rem',
                    }}>
                      {selectedProject.images.map((image, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          style={{
                            position: 'relative',
                            minWidth: '140px',
                            height: '90px',
                            cursor: 'pointer',
                            border: currentImageIndex === index ? '3px solid #2d5016' : '3px solid transparent',
                            opacity: currentImageIndex === index ? 1 : 0.5,
                            transition: 'all 0.3s',
                            backgroundColor: '#1a1a1a',
                          }}
                        >
                          <Image src={image} alt={`Thumbnail ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}