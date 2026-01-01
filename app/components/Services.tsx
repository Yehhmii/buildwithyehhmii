'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  BarChart3, 
  Workflow, 
  Sparkles,
  Monitor,
  Zap
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Web Applications',
    description: 'Full-stack web applications built with modern frameworks and best practices. Scalable, secure, and optimized for performance.',
    icon: Globe,
    image: '/services/web-app.jpg',
  },
  {
    id: 2,
    title: 'Websites',
    description: 'Beautiful, responsive websites that convert visitors into customers. From landing pages to complex multi-page sites.',
    icon: Monitor,
    image: '/services/website.jpg',
  },
  {
    id: 3,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android. Intuitive interfaces with seamless user experiences.',
    icon: Smartphone,
    image: '/services/mobile-app.jpg',
  },
  {
    id: 4,
    title: 'AI Applications',
    description: 'Intelligent applications powered by machine learning and AI. From chatbots to predictive analytics and automation.',
    icon: Cpu,
    image: '/services/ai-app.jpg',
  },
  {
    id: 5,
    title: 'Data Analysis',
    description: 'Transform raw data into actionable insights. Data visualization, reporting, and business intelligence solutions.',
    icon: BarChart3,
    image: '/services/data-analysis.jpg',
  },
  {
    id: 6,
    title: 'Automation',
    description: 'Streamline your workflows with custom automation solutions. Save time and reduce errors with intelligent automation.',
    icon: Workflow,
    image: '/services/automation.jpg',
  },
  {
    id: 7,
    title: 'And More',
    description: 'Custom solutions tailored to your unique needs. API development, consulting, technical writing, and specialized services.',
    icon: Sparkles,
    image: '/services/more.jpg',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section
      id="services"
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
              WHAT I OFFER
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#f5f5f5',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            Services <span style={{ color: '#2d5016' }}>& Solutions</span>
          </h2>
        </motion.div>

        {/* Flowing Services */}
        <div style={{ position: 'relative' }}>
          {/* Flowing Path/Line */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            className="hidden md:block"
          >
            <motion.path
              d="M 50 0 Q 80 200 50 400 Q 20 600 50 800 Q 80 1000 50 1200 Q 20 1400 50 1600 Q 80 1800 50 2000"
              stroke="#2d5016"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10 10"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Animated Pointer following the flow */}
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
              x: useTransform(
                scrollYProgress, 
                [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
                ['0%', '30%', '0%', '-30%', '0%', '30%', '0%', '-30%']
              ),
              zIndex: 1,
            }}
            className="hidden md:block"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#2d5016',
                boxShadow: '0 0 20px rgba(45, 80, 22, 0.8), 0 0 40px rgba(45, 80, 22, 0.4)',
              }}
            />
          </motion.div>

          {/* Services List */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Individual Service Card Component
function ServiceCard({ 
  service, 
  index 
}: { 
  service: typeof services[0]; 
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: "-100px",
    amount: 0.4 
  });

  const isEven = index % 2 === 0;
  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 100 }
      }
      transition={{ 
        duration: 0.8, 
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1] 
      }}
      style={{
        marginBottom: 'clamp(6rem, 15vw, 12rem)',
      }}
    >
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
        className="md:grid-cols-2"
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={
            isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: isEven ? -50 : 50 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            order: isEven ? 1 : 2,
          }}
        >
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(45, 80, 22, 0.1)',
              border: '2px solid rgba(45, 80, 22, 0.3)',
              borderRadius: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem',
            }}
          >
            <Icon style={{ width: '40px', height: '40px', color: '#2d5016' }} />
          </motion.div>

          {/* Title */}
          <h3 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: '#f5f5f5',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            {service.title}
          </h3>

          {/* Description */}
          <p style={{
            color: 'rgba(245, 245, 245, 0.7)',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: 1.8,
            marginBottom: '2rem',
          }}>
            {service.description}
          </p>

          {/* Learn More Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'transparent',
              border: '2px solid #2d5016',
              color: '#2d5016',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2d5016';
              e.currentTarget.style.color = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#2d5016';
            }}
          >
            Learn More →
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={
            isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: isEven ? 50 : -50 }
          }
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            order: isEven ? 2 : 1,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              backgroundColor: 'rgba(45, 80, 22, 0.1)',
              border: '2px solid rgba(45, 80, 22, 0.2)',
            }}
          >
            {/* Placeholder gradient (replace with actual images) */}
            <div style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, rgba(45, 80, 22, 0.2), rgba(45, 80, 22, 0.05))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon style={{ width: '80px', height: '80px', color: 'rgba(45, 80, 22, 0.3)' }} />
            </div>

            {/* Animated border effect */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                inset: 0,
                border: '2px solid #2d5016',
                borderRadius: '1.5rem',
                pointerEvents: 'none',
              }}
            />

            {/* Flowing particles effect */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: ['0%', '100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  left: `${20 + i * 15}%`,
                  top: 0,
                  width: '4px',
                  height: '20px',
                  backgroundColor: '#2d5016',
                  borderRadius: '2px',
                  filter: 'blur(1px)',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}