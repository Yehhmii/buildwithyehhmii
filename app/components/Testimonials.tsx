'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { testimonialsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company?: string;
  image: any;
  testimonial: string;
  rating: number;
  order: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  // Fetch testimonials from Sanity
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await client.fetch(testimonialsQuery);
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  // Auto-swipe cards every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section
        id="testimonials"
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
          Loading Testimonials...
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        padding: '4rem 1rem',
        overflow: 'hidden',
      }}
      className="md:py-32 md:px-6"
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

      {/* Floating gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.04, 0.08, 0.04],
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
          width: '600px',
          height: '600px',
          backgroundColor: '#2d5016',
          borderRadius: '50%',
          filter: 'blur(130px)',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          className="md:mb-16"
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
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#f5f5f5',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            What <span style={{ color: '#2d5016' }}>Clients Say</span>
          </h2>
        </motion.div>

        {/* Card Deck Container */}
        <div style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem 0 4rem',
        }}
        className="md:h-[600px] md:py-0"
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {testimonials.map((testimonial, index) => {
              // Calculate card position in the deck
              const offset = (index - currentIndex + testimonials.length) % testimonials.length;
              
              // Only show current card and next 2 cards in the deck
              if (offset > 2) return null;

              const isActive = offset === 0;
              const scale = 1 - offset * 0.05;
              const yOffset = offset * 20;
              const opacity = 1 - offset * 0.3;
              const zIndex = testimonials.length - offset;

              return (
                <motion.div
                  key={testimonial._id}
                  custom={direction}
                  initial={{
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0,
                    scale: 0.8,
                    rotate: direction > 0 ? 20 : -20,
                  }}
                  animate={{
                    x: 0,
                    y: yOffset,
                    opacity: opacity,
                    scale: scale,
                    rotate: 0,
                    zIndex: zIndex,
                  }}
                  exit={{
                    x: direction > 0 ? -1000 : 1000,
                    opacity: 0,
                    scale: 0.8,
                    rotate: direction > 0 ? -20 : 20,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    maxWidth: '800px',
                    padding: '0 1rem',
                  }}
                  className="md:px-0"
                >
                  <div style={{
                    backgroundColor: 'rgba(45, 80, 22, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(45, 80, 22, 0.2)',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isActive 
                      ? '0 30px 60px rgba(45, 80, 22, 0.2)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.2)',
                  }}
                  className="md:rounded-[2rem] md:p-12"
                  >
                    {/* Decorative Quote Icon */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      opacity: 0.1,
                    }}
                    className="md:top-8 md:right-8"
                    >
                      <Quote 
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          color: '#2d5016' 
                        }} 
                        className="md:w-[100px] md:h-[100px]"
                      />
                    </div>

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      {/* Rating Stars */}
                      <div style={{ 
                        display: 'flex', 
                        gap: '0.25rem', 
                        marginBottom: '1rem' 
                      }}
                      className="md:mb-6"
                      >
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            style={{
                              width: '16px',
                              height: '16px',
                              fill: '#2d5016',
                              color: '#2d5016',
                            }}
                            className="md:w-5 md:h-5"
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p style={{
                        color: 'rgba(245, 245, 245, 0.9)',
                        fontSize: 'clamp(0.95rem, 2vw, 1.375rem)',
                        lineHeight: 1.7,
                        marginBottom: '1.5rem',
                        fontStyle: 'italic',
                      }}
                      className="md:mb-8 md:leading-relaxed"
                      >
                        "{testimonial.testimonial}"
                      </p>

                      {/* Client Info */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(45, 80, 22, 0.2)',
                      }}
                      className="md:gap-6 md:pt-8"
                      >
                        {/* Profile Image */}
                        <div style={{
                          position: 'relative',
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: '2px solid rgba(45, 80, 22, 0.3)',
                          flexShrink: 0,
                        }}
                        className="md:w-20 md:h-20 md:border-[3px]"
                        >
                          <Image
                            src={urlFor(testimonial.image).width(160).height(160).url()}
                            alt={testimonial.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>

                        {/* Name and Role */}
                        <div style={{ minWidth: 0 }}>
                          <h4 style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            fontWeight: 800,
                            color: '#f5f5f5',
                            marginBottom: '0.25rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          className="md:whitespace-normal"
                          >
                            {testimonial.name}
                          </h4>
                          <p style={{
                            color: 'rgba(245, 245, 245, 0.6)',
                            fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                            lineHeight: 1.4,
                          }}>
                            {testimonial.role}
                            {testimonial.company && (
                              <>
                                <br className="md:hidden" />
                                <span className="hidden md:inline"> at </span>
                                <span className="md:hidden"> @ </span>
                                {testimonial.company}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Buttons - Desktop Only */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '-80px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(45, 80, 22, 0.1)',
                  border: '2px solid rgba(45, 80, 22, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  zIndex: 1000,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
                className="hidden md:flex"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#2d5016' }}>
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '-80px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(45, 80, 22, 0.1)',
                  border: '2px solid rgba(45, 80, 22, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  zIndex: 1000,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
                className="hidden md:flex"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#2d5016' }}>
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}

          {/* Progress Indicators */}
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
          }}
          className="md:bottom-[-60px] md:gap-3"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                style={{
                  width: index === currentIndex ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: index === currentIndex 
                    ? '#2d5016' 
                    : 'rgba(45, 80, 22, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                className={index === currentIndex ? 'md:w-10' : 'md:w-3 md:h-3'}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.2)';
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}