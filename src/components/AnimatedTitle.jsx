import { motion } from 'framer-motion';

const AnimatedTitle = ({ children, className = "" }) => {
  return (
    <motion.h2
      initial={{ letterSpacing: "0.3em", opacity: 0, y: 10 }}
      whileInView={{ 
        letterSpacing: "0em", 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5, 
          ease: [0.33, 1, 0.68, 1] // Easing plus nerveux
        } 
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={`text-3xl md:text-4xl font-black text-text-main mb-6 uppercase tracking-tight ${className}`}
    >
      {children}
    </motion.h2>
  );
};

export default AnimatedTitle;
