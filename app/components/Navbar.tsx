'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Experience', href: 'experience' },
  { name: 'Contact', href: 'contact' },
] as const;

export default function Navbar() {
  const scrollDirection = useScrollDirection();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ 
          y: scrollDirection === 'down' ? -120 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '1.5rem',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Floating Container */}
          <motion.div
            animate={{
              backgroundColor: isScrolled 
                ? 'rgba(10, 10, 10, 0.85)' 
                : 'rgba(10, 10, 10, 0.4)',
            }}
            transition={{ duration: 0.3 }}
            style={{
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(45, 80, 22, 0.2)',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{
              padding: '1rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              {/* Logo */}
              <motion.button
                onClick={() => scrollToSection('hero')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
              >
                <span style={{ color: '#f5f5f5' }}>FRAN</span>
                <span style={{ color: '#2d5016' }}>CISCO</span>
              </motion.button>

              {/* Desktop Nav */}
              <div 
                className="hidden lg:flex"
                style={{
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      color: 'rgba(245, 245, 245, 0.7)',
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      letterSpacing: '0.025em',
                      transition: 'all 0.3s',
                      position: 'relative',
                      borderRadius: '0.5rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#f5f5f5';
                      e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(245, 245, 245, 0.7)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:block"
                style={{
                  backgroundColor: '#2d5016',
                  color: '#f5f5f5',
                  padding: '0.625rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.025em',
                  transition: 'all 0.3s',
                  boxShadow: '0 10px 15px -3px rgba(45, 80, 22, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3d6026';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2d5016';
                }}
              >
                Let's Build
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden"
                style={{
                  color: '#f5f5f5',
                  position: 'relative',
                  zIndex: 50,
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.3s',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 40,
              }}
              className="lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: '6rem',
                left: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(45, 80, 22, 0.2)',
                borderRadius: '1rem',
                zIndex: 40,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
              className="lg:hidden"
            >
              <div style={{ padding: '1.5rem' }}>
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: '#f5f5f5',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      transition: 'all 0.3s',
                      marginBottom: '0.5rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#2d5016';
                      e.currentTarget.style.backgroundColor = 'rgba(45, 80, 22, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#f5f5f5';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  style={{
                    width: '100%',
                    backgroundColor: '#2d5016',
                    color: '#f5f5f5',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginTop: '1rem',
                    transition: 'all 0.3s',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3d6026';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2d5016';
                  }}
                >
                  Let's Build
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}