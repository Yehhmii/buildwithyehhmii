'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  source?: 'dialogflow' | 'llm';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm YEHHMII's AI assistant. Ask me anything about my services, skills, or projects!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(`session-${Date.now()}`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          sessionId: sessionId.current,
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
        source: data.source,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again!",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#2d5016',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(45, 80, 22, 0.4)',
              zIndex: 1000,
            }}
          >
            <MessageCircle style={{ width: '28px', height: '28px', color: '#f5f5f5' }} />
            
            {/* Pulse effect */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                backgroundColor: '#2d5016',
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '400px',
              maxWidth: 'calc(100vw - 2rem)',
              height: '600px',
              maxHeight: 'calc(100vh - 4rem)',
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(45, 80, 22, 0.3)',
              borderRadius: '1rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #2d5016, #4a7c2a)',
              padding: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 245, 245, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Bot style={{ width: '24px', height: '24px', color: '#f5f5f5' }} />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#f5f5f5',
                    marginBottom: '0.125rem',
                  }}>
                    YEHHMII Assistant
                  </h3>
                  <p style={{
                    fontSize: '0.75rem',
                    color: 'rgba(245, 245, 245, 0.7)',
                  }}>
                    Always here to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 245, 245, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X style={{ width: '20px', height: '20px', color: '#f5f5f5' }} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              backgroundColor: '#0f0f0f',
            }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  {message.sender === 'bot' && (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(45, 80, 22, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Bot style={{ width: '18px', height: '18px', color: '#2d5016' }} />
                    </div>
                  )}
                  
                  <div style={{
                    maxWidth: '70%',
                    padding: '0.875rem 1rem',
                    borderRadius: message.sender === 'user' 
                      ? '1rem 1rem 0.25rem 1rem' 
                      : '1rem 1rem 1rem 0.25rem',
                    backgroundColor: message.sender === 'user' 
                      ? '#2d5016' 
                      : 'rgba(45, 80, 22, 0.1)',
                    border: message.sender === 'bot' 
                      ? '1px solid rgba(45, 80, 22, 0.2)' 
                      : 'none',
                  }}>
                    <p style={{
                      color: message.sender === 'user' ? '#f5f5f5' : 'rgba(245, 245, 245, 0.9)',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                    }}>
                      {message.text}
                    </p>
                    {message.source && (
                      <span style={{
                        fontSize: '0.625rem',
                        color: 'rgba(245, 245, 245, 0.4)',
                        marginTop: '0.25rem',
                        display: 'block',
                      }}>
                        {message.source === 'llm' ? '🤖 AI Enhanced' : '💬 Quick Reply'}
                      </span>
                    )}
                  </div>

                  {message.sender === 'user' && (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(245, 245, 245, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <User style={{ width: '18px', height: '18px', color: '#f5f5f5' }} />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(45, 80, 22, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Bot style={{ width: '18px', height: '18px', color: '#2d5016' }} />
                  </div>
                  <div style={{
                    padding: '0.875rem 1rem',
                    borderRadius: '1rem 1rem 1rem 0.25rem',
                    backgroundColor: 'rgba(45, 80, 22, 0.1)',
                    border: '1px solid rgba(45, 80, 22, 0.2)',
                  }}>
                    <Loader2 
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        color: '#2d5016',
                        animation: 'spin 1s linear infinite',
                      }} 
                    />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '1rem',
              borderTop: '1px solid rgba(45, 80, 22, 0.2)',
              backgroundColor: '#0a0a0a',
            }}>
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-end',
              }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: 'rgba(45, 80, 22, 0.05)',
                    border: '1px solid rgba(45, 80, 22, 0.2)',
                    borderRadius: '0.75rem',
                    color: '#f5f5f5',
                    fontSize: '0.875rem',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                    maxHeight: '120px',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2d5016';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(45, 80, 22, 0.2)';
                  }}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '0.75rem',
                    backgroundColor: input.trim() && !isLoading ? '#2d5016' : 'rgba(45, 80, 22, 0.3)',
                    border: 'none',
                    cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}
                >
                  <Send style={{ 
                    width: '18px', 
                    height: '18px', 
                    color: '#f5f5f5',
                  }} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}