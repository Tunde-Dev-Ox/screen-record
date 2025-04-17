import React from 'react';
import { motion } from 'framer-motion';
import { FaAirbnb, FaAmazon, FaApple, FaFigma } from 'react-icons/fa';
import { RiVercelFill } from 'react-icons/ri';

const InfiniteScroll = () => {
  // Array of logos to be displayed
  const logos = [
    <FaAirbnb key="airbnb" />,
    <FaAmazon key="amazon" />,
    <FaApple key="apple" />,
    <FaFigma key="figma" />,
    <RiVercelFill key="vercel" />
  ];
  
  // Duplicate logos to create the illusion of infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];
  
  return (
    <section className="companies">
      <div className="companies-wrapper">
        <h2>
          Trusted by <span>companies</span>
        </h2>
        <div className="logos-container" style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
          <motion.div 
            className="companies-logos"
            style={{
              display: 'flex',
              width: 'max-content',
              gap: '3rem'
            }}
            animate={{
              x: [0, -1 * logos.length * 100], // Adjust the multiplier based on your logo spacing
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                style={{
                  fontSize: '2.5rem',
                  opacity: 0.7,
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100px', // Fixed width for each logo
                }}
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteScroll;