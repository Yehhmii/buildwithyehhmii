'use client';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { skillsQuery, techStackQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import * as LucideIcons from 'lucide-react';

interface Skill {
  _id: string;
  title: string;
  icon: string;
  description: string;
  order: number;
}

interface TechStack {
  _id: string;
  name: string;
  logo: any;
  order: number;
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch skills and tech stack from Sanity
  useEffect(() => {
    async function fetchData() {
      try {
        const [skillsData, techStackData] = await Promise.all([
          client.fetch(skillsQuery),
          client.fetch(techStackQuery)
        ]);
        setSkills(skillsData);
        setTechStack(techStackData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Duplicate for seamless loop
  const duplicatedTechStack = [...techStack, ...techStack, ...techStack];

  if (loading) {
    return (
      <section
        id="skills"
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
          Loading Skills...
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
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

      {/* Floating gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.07, 0.03],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '15%',
          width: '500px',
          height: '500px',
          backgroundColor: '#2d5016',
          borderRadius: '50%',
          filter: 'blur(120px)',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '6rem', textAlign: 'center' }}
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
              SKILLS & EXPERTISE
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#f5f5f5',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            What I <span style={{ color: '#2d5016' }}>Bring to the Table</span>
          </h2>
        </motion.div>

        {/* Skills Grid - 2 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          marginBottom: '8rem',
          maxWidth: '1200px',
          margin: '0 auto 8rem',
        }}
        className="md:grid-cols-2"
        >
          {skills.map((skill, index) => {
            const isLeftColumn = index % 2 === 0;
            return (
              <SkillCard 
                key={skill._id} 
                skill={skill} 
                index={index}
                isLeftColumn={isLeftColumn}
              />
            );
          })}
        </div>

        {/* Tech Stack Section */}
        {techStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: '8rem' }}
          >
            <h3 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              color: '#f5f5f5',
              textAlign: 'center',
              marginBottom: '4rem',
              letterSpacing: '-0.02em',
            }}>
              Tech <span style={{ color: '#2d5016' }}>Stack</span>
            </h3>

            {/* Mobile Grid (shown on mobile only) */}
            <div 
              className="grid md:hidden"
              style={{
                // display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                padding: '0 1rem',
              }}
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: 'rgba(45, 80, 22, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(45, 80, 22, 0.2)',
                    borderRadius: '1rem',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.05)';
                  }}
                  >
                    <Image
                      src={urlFor(tech.logo).width(100).height(100).url()}
                      alt={tech.name}
                      width={45}
                      height={45}
                      style={{
                        objectFit: 'contain',
                        filter: 'brightness(1.5)',
                      }}
                    />
                  </div>
                  <span style={{
                    color: 'rgba(245, 245, 245, 0.6)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Infinite Scrolling (hidden on mobile) */}
            <div
              className="hidden md:block"
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '2rem 0',
              }}
            >
              {/* Gradient overlays */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '150px',
                background: 'linear-gradient(to right, #0a0a0a, transparent)',
                zIndex: 2,
              }} />
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '150px',
                background: 'linear-gradient(to left, #0a0a0a, transparent)',
                zIndex: 2,
              }} />

              <motion.div
                animate={{
                  x: [0, -33.333 * techStack.length],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
                style={{
                  display: 'flex',
                  gap: '4rem',
                  width: 'fit-content',
                }}
              >
                {duplicatedTechStack.map((tech, index) => (
                  <div
                    key={`${tech._id}-${index}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      minWidth: '120px',
                    }}
                  >
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'rgba(45, 80, 22, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(45, 80, 22, 0.2)',
                      borderRadius: '1rem',
                      padding: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.05)';
                    }}
                    >
                      <Image
                        src={urlFor(tech.logo).width(100).height(100).url()}
                        alt={tech.name}
                        width={50}
                        height={50}
                        style={{
                          objectFit: 'contain',
                          filter: 'brightness(1.5)',
                        }}
                      />
                    </div>
                    <span style={{
                      color: 'rgba(245, 245, 245, 0.6)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      textAlign: 'center',
                    }}>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Individual Skill Card Component
function SkillCard({ 
  skill, 
  index, 
  isLeftColumn 
}: { 
  skill: Skill; 
  index: number;
  isLeftColumn: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-100px",
    amount: 0.3 
  });

  // Get the icon component dynamically from Lucide
  const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Code2;

  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        x: isLeftColumn ? -100 : 100 
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { 
              opacity: 0, 
              x: isLeftColumn ? -100 : 100 
            }
      }
      transition={{ 
        duration: 0.8, 
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <div style={{
        backgroundColor: 'rgba(45, 80, 22, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(45, 80, 22, 0.2)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        transition: 'all 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.08)';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(45, 80, 22, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      >
        {/* Decorative corner gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle at top right, rgba(45, 80, 22, 0.1), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Icon */}
          <div style={{
            width: '70px',
            height: '70px',
            backgroundColor: 'rgba(45, 80, 22, 0.1)',
            border: '2px solid rgba(45, 80, 22, 0.3)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}>
            <IconComponent style={{ width: '35px', height: '35px', color: '#2d5016' }} />
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 800,
            color: '#f5f5f5',
            marginBottom: '1rem',
            letterSpacing: '-0.01em',
          }}>
            {skill.title}
          </h3>

          {/* Description */}
          <p style={{
            color: 'rgba(245, 245, 245, 0.7)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
          }}>
            {skill.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}