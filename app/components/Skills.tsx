'use client';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { 
  Code2, 
  Layers, 
  MessageSquare, 
  Database, 
  Terminal, 
  GraduationCap 
} from 'lucide-react';

const skills = [
  {
    icon: Code2,
    title: 'Software Engineering',
    description: 'As a software engineer, I specialize in designing, developing, and maintaining software solutions that solve complex problems and improve user experiences. I am adept at optimizing performance and ensuring the scalability and reliability of applications across various platforms.',
  },
  {
    icon: Layers,
    title: 'Full Stack Developer',
    description: 'With expertise in both front-end and back-end technologies, MERN Stack and PHP I develop complete web applications from scratch. I ensure smooth integration between the user interface and server-side components, delivering a seamless and responsive experience for end-users.',
  },
  {
    icon: MessageSquare,
    title: 'Creative Speaking',
    description: 'Skilled in effective communication, I excel at analyzing complex problems and translating them into clear, actionable insights. My ability to articulate ideas with precision ensures that diverse audiences can easily grasp intricate concepts. I adapt my approach to ensure maximum impact and resonance with the audience.',
  },
  {
    icon: Database,
    title: 'MERN Stack',
    description: 'As a MERN stack developer, I work with MongoDB, Express.js, React, and Node.js to build high-performance web applications. I create responsive, real-time solutions that meet modern web development standards, ensuring smooth functionality across all devices.',
  },
  {
    icon: Terminal,
    title: 'Python Developer',
    description: 'I utilize Python for building clean and efficient code, particularly for web development. I envision automation, data analysis, and machine learning. With Python\'s versatility, I develop solutions that automate repetitive tasks, analyze large datasets, and build scalable applications.',
  },
  {
    icon: GraduationCap,
    title: 'Tutor',
    description: 'As a tutor, I take pride in helping students grasp complex technical concepts and guiding them to become proficient developers. I provide personalized learning experiences, making sure that learners develop the skills necessary to excel in their software development journeys.',
  },
];

// Tech stack logos - replace with your actual image paths
const techStack = [
  { name: 'Next.js', image: '/tech/nextjs.png' },
  { name: 'React', image: '/tech/react.png' },
  { name: 'JavaScript', image: '/tech/js.png' },
  { name: 'TypeScript', image: '/tech/typescript.png' },
  { name: 'Node.js', image: '/tech/nodejs.png' },
  { name: 'MongoDB', image: '/tech/mongodb.png' },
  { name: 'Express', image: '/tech/express.jpeg' },
  { name: 'Python', image: '/tech/python.png' },
  { name: 'PHP', image: '/tech/php.png' },
  { name: 'Tailwind CSS', image: '/tech/tailwind.png' },
  { name: 'Communication', image: '/tech/conversations.gif' },
  { name: 'Git', image: '/tech/git.png' },
  { name: 'Data Analysis', image: '/tech/dataanalysis.png' },
  { name: 'Docker', image: '/tech/docker.png' },
  { name: 'Flutter', image: '/tech/flutter.webp' },
  { name: 'Documentation', image: '/tech/form.gif' },
  { name: 'html', image: '/tech/html.png' },
  { name: 'Nest.js', image: '/tech/nestjs.png' },
  { name: 'Speaking', image: '/tech/press-conference.gif' },
  { name: 'TypeScript', image: '/tech/typescript.png' },
  { name: 'Vercel', image: '/tech/vercel.png' },
  { name: 'vite', image: '/tech/vite.jpeg' },
  { name: 'xampp', image: '/tech/xampp.png' },
  { name: 'Postgresql', image: '/tech/postgresql.png' },
];

// Duplicate for seamless loop
const duplicatedTechStack = [...techStack, ...techStack, ...techStack];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
            // Determine if this card is in the left column (even index) or right column (odd index)
            const isLeftColumn = index % 2 === 0;
            
            return (
              <SkillCard 
                key={skill.title} 
                skill={skill} 
                index={index}
                isLeftColumn={isLeftColumn}
              />
            );
          })}
        </div>

        {/* Tech Stack Section */}
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

          {/* Infinite Scrolling Tech Stack */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem 0',
          }}>
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
                  key={`${tech.name}-${index}`}
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
                      src={tech.image}
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
      </div>
    </section>
  );
}

// Individual Skill Card Component with scroll animations
function SkillCard({ 
  skill, 
  index, 
  isLeftColumn 
}: { 
  skill: typeof skills[0]; 
  index: number;
  isLeftColumn: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-100px",
    amount: 0.3 
  });

  const Icon = skill.icon;

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
            <Icon style={{ width: '35px', height: '35px', color: '#2d5016' }} />
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