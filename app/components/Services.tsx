"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  BarChart3, 
  Workflow, 
  Sparkles,
  Monitor
} from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: any;
  position: "left" | "right";
}

const services: Service[] = [
  {
    id: 1,
    title: "Web Applications",
    description: "Full-stack web applications built with modern frameworks and best practices. Scalable, secure, and optimized for performance that drives real business results.",
    image: "/services/web-app.jpg",
    icon: Globe,
    position: "right",
  },
  {
    id: 2,
    title: "Websites",
    description: "Beautiful, responsive websites that convert visitors into customers. From landing pages to complex multi-page sites, crafted with attention to every detail.",
    image: "/services/website.jpg",
    icon: Monitor,
    position: "left",
  },
  {
    id: 3,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android. Intuitive interfaces with seamless user experiences that keep users engaged.",
    image: "/services/mobile-app.jpg",
    icon: Smartphone,
    position: "right",
  },
  {
    id: 4,
    title: "AI Applications",
    description: "Intelligent applications powered by machine learning and AI. From chatbots to predictive analytics, bringing the future of technology to your business.",
    image: "/services/ai-app.jpg",
    icon: Cpu,
    position: "left",
  },
  {
    id: 5,
    title: "Data Analysis",
    description: "Transform raw data into actionable insights. Data visualization, reporting, and business intelligence solutions that drive informed decision-making.",
    image: "/services/data-analysis.jpg",
    icon: BarChart3,
    position: "right",
  },
  {
    id: 6,
    title: "Automation",
    description: "Streamline your workflows with custom automation solutions. Save time, reduce errors, and boost productivity with intelligent automation systems.",
    image: "/services/automation.jpg",
    icon: Workflow,
    position: "left",
  },
  {
    id: 7,
    title: "And More",
    description: "Custom solutions tailored to your unique needs. API development, cloud integration, consulting, technical writing, and specialized services to meet your goals.",
    image: "/services/more.jpg",
    icon: Sparkles,
    position: "right",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, { once: false, margin: "-200px" });

  const [flowProgress, setFlowProgress] = useState(0);

  useEffect(() => {
    if (!timelineInView) return;

    const interval = setInterval(() => {
      setFlowProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [timelineInView]);

  return (
    <>
      <section 
        id="services"
        style={{
          position: 'relative',
          paddingTop: '4rem',
          paddingBottom: '4rem',
          background: 'linear-gradient(to bottom, #0a0a0a, #0f0f0f, #0a0a0a)',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(45, 80, 22) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Main Wrapper */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}>
          {/* Section Header */}
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              textAlign: 'center',
              marginBottom: '5rem',
              maxWidth: '56rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(45, 80, 22, 0.1)',
                border: '1px solid rgba(45, 80, 22, 0.2)',
                borderRadius: '9999px',
                padding: '0.5rem 1.5rem',
                marginBottom: '1rem',
              }}
            >
              <span style={{
                color: '#2d5016',
                fontSize: '0.875rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}>
                WHAT I OFFER
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: '#f5f5f5',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              Services <span style={{ color: '#2d5016' }}>& Solutions</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                color: 'rgba(245, 245, 245, 0.7)',
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                lineHeight: 1.8,
              }}
            >
              Crafting digital experiences that transform ideas into reality, one line of code at a time.
            </motion.p>
          </motion.div>

          {/* Timeline Container - Centered */}
          <div 
            ref={timelineRef} 
            style={{
              position: 'relative',
              maxWidth: '72rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            {/* Center Line - Desktop Only */}
            <div className="timeline-line" style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, transparent, rgba(45, 80, 22, 0.3), transparent)',
            }}>
              <motion.div
                style={{
                  position: 'absolute',
                  top: `${flowProgress}%`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#2d5016',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px rgba(45, 80, 22, 0.5)',
                }}
              />
            </div>

            {/* Services List */}
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                style={{
                  position: 'relative',
                  marginBottom: index < services.length - 1 ? '8rem' : 0,
                }}
              >
                {/* Timeline Dot - Desktop Only */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                  className="timeline-dot"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      background: 'linear-gradient(to bottom right, #2d5016, #4a7c2a)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 20px 25px -5px rgba(45, 80, 22, 0.3)',
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#0a0a0a',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <service.icon style={{ width: '24px', height: '24px', color: '#2d5016' }} />
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#2d5016',
                        borderRadius: '50%',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Service Card Grid */}
                <div 
                  className="service-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '3rem',
                    alignItems: 'center',
                  }}
                >
                  {service.position === "right" ? (
                    <>
                      {/* Content */}
                      <div 
                        className="service-content service-content-left"
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        <div className="mobile-icon" style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(to bottom right, #2d5016, #4a7c2a)',
                          borderRadius: '0.75rem',
                          marginBottom: '1rem',
                        }}>
                          <service.icon style={{ width: '24px', height: '24px', color: 'white' }} />
                        </div>

                        <motion.h3
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                          style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 900,
                            color: '#f5f5f5',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                          }}
                        >
                          {service.title}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
                          style={{
                            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                            color: 'rgba(245, 245, 245, 0.7)',
                            lineHeight: 1.8,
                          }}
                        >
                          {service.description}
                        </motion.p>
                      </div>

                      {/* Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        className="service-image"
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <div 
                          className="image-wrapper group"
                          style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '28rem',
                          }} 
                        >
                          <div
                            style={{
                              position: 'relative',
                              height: '20rem',
                              overflow: 'hidden',
                              borderRadius: index % 2 === 0 
                                ? '3.75rem 3.75rem 1rem 1rem' 
                                : '1rem 1rem 1rem 3.75rem',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                              transition: 'box-shadow 0.5s',
                            }}
                          >
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              style={{
                                objectFit: 'cover',
                                transition: 'transform 0.7s',
                              }}
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            
                            <div style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to bottom right, rgba(45, 80, 22, 0.2), rgba(45, 80, 22, 0.05))',
                            }} />
                            
                            <div 
                              className="hover-overlay"
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(10, 10, 10, 0.6), transparent)',
                                opacity: 0,
                                transition: 'opacity 0.5s',
                              }} 
                            />
                            
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              className="icon-overlay"
                              style={{
                                display: 'none',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '3.5rem',
                                height: '3.5rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '50%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10,
                              }}
                            >
                              <service.icon style={{ width: '1.75rem', height: '1.75rem', color: '#2d5016' }} />
                            </motion.div>
                          </div>

                          <div style={{
                            position: 'absolute',
                            width: '3rem',
                            height: '3rem',
                            backgroundColor: 'rgba(45, 80, 22, 0.2)',
                            filter: 'blur(40px)',
                            top: index % 2 === 0 ? '-0.75rem' : 'auto',
                            left: index % 2 === 0 ? '-0.75rem' : 'auto',
                            bottom: index % 2 === 0 ? 'auto' : '-0.75rem',
                            right: index % 2 === 0 ? 'auto' : '-0.75rem',
                          }} />
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        className="service-image service-image-left"
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <div 
                          className="image-wrapper group"
                          style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '28rem',
                          }} 
                        >
                          <div
                            style={{
                              position: 'relative',
                              height: '20rem',
                              overflow: 'hidden',
                              borderRadius: index % 2 === 0 
                                ? '3.75rem 3.75rem 1rem 1rem' 
                                : '1rem 1rem 1rem 3.75rem',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                              transition: 'box-shadow 0.5s',
                            }}
                          >
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              style={{
                                objectFit: 'cover',
                                transition: 'transform 0.7s',
                              }}
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            
                            <div style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to bottom right, rgba(45, 80, 22, 0.2), rgba(45, 80, 22, 0.05))',
                            }} />
                            
                            <div 
                              className="hover-overlay"
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(10, 10, 10, 0.6), transparent)',
                                opacity: 0,
                                transition: 'opacity 0.5s',
                              }} 
                            />
                            
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              className="icon-overlay"
                              style={{
                                display: 'none',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '3.5rem',
                                height: '3.5rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '50%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10,
                              }}
                            >
                              <service.icon style={{ width: '1.75rem', height: '1.75rem', color: '#2d5016' }} />
                            </motion.div>
                          </div>

                          <div style={{
                            position: 'absolute',
                            width: '3rem',
                            height: '3rem',
                            backgroundColor: 'rgba(45, 80, 22, 0.2)',
                            filter: 'blur(40px)',
                            top: index % 2 === 0 ? '-0.75rem' : 'auto',
                            left: index % 2 === 0 ? '-0.75rem' : 'auto',
                            bottom: index % 2 === 0 ? 'auto' : '-0.75rem',
                            right: index % 2 === 0 ? 'auto' : '-0.75rem',
                          }} />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div 
                        className="service-content service-content-right"
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        <div className="mobile-icon" style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(to bottom right, #2d5016, #4a7c2a)',
                          borderRadius: '0.75rem',
                          marginBottom: '1rem',
                        }}>
                          <service.icon style={{ width: '24px', height: '24px', color: 'white' }} />
                        </div>

                        <motion.h3
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                          style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 900,
                            color: '#f5f5f5',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                          }}
                        >
                          {service.title}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
                          style={{
                            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                            color: 'rgba(245, 245, 245, 0.7)',
                            lineHeight: 1.8,
                          }}
                        >
                          {service.description}
                        </motion.p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Critical CSS with Media Queries */}
      <style jsx>{`
        /* Hide timeline on mobile */
        .timeline-line {
          display: none;
        }
        
        .timeline-dot {
          display: none;
        }
        
        @media (min-width: 768px) {
          section {
            padding-top: 6rem !important;
            padding-bottom: 6rem !important;
          }
        }
        
        @media (min-width: 1024px) {
          section {
            padding-top: 8rem !important;
            padding-bottom: 8rem !important;
          }
          
          /* Show timeline elements */
          .timeline-line {
            display: block !important;
          }
          
          .timeline-dot {
            display: block !important;
          }
          
          /* Ensure dot is visible and centered */
          .timeline-dot {
            pointer-events: none !important;
            z-index: 100 !important;
          }
          
          /* Hide mobile icon */
          .mobile-icon {
            display: none !important;
          }
          
          /* Two column grid */
          .service-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem !important;
          }
          
          /* Text alignment */
          .service-content-left {
            text-align: left !important;
            padding-right: 4rem !important;
          }
          
          .service-content-right {
            text-align: right !important;
            padding-left: 4rem !important;
            order: 2 !important;
          }
          
          /* Image positioning */
          .service-image-left {
            order: 1 !important;
          }
          
          /* Image full width on desktop */
          .image-wrapper {
            max-width: 100% !important;
          }
          
          /* Show hover icon */
          .icon-overlay {
            display: flex !important;
          }
          
          /* Image height */
          .image-wrapper > div {
            height: 24rem !important;
          }
        }
        
        @media (min-width: 768px) {
          .image-wrapper > div {
            height: 22rem !important;
          }
        }
        
        /* Hover effects */
        .image-wrapper:hover .hover-overlay {
          opacity: 1 !important;
        }
        
        .image-wrapper:hover img {
          transform: scale(1.1) !important;
        }
        
        .image-wrapper:hover > div {
          box-shadow: 0 25px 50px -12px rgba(45, 80, 22, 0.2) !important;
        }
      `}</style>
    </>
  );
}