import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ChevronRight, Terminal, Download, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ProfilePhoto = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-sm mx-auto aspect-[4/5] group"
    >
      {/* Effets lumineux */}
      <div className="absolute top-[5%] right-[5%] w-[90%] h-[90%] glass rounded-[40px] rotate-6 border-brand-violet/20 transition-transform duration-500 group-hover:rotate-12 bg-gradient-to-tr from-brand-violet/10 to-transparent" />
      <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] glass rounded-[40px] -rotate-3 border-brand-green/20 transition-transform duration-500 group-hover:-rotate-6 bg-gradient-to-bl from-brand-green/10 to-transparent" />

      <div className="absolute inset-0 rounded-[40px] overflow-hidden border-2 border-glass-border shadow-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
        <img src="/profile.jpeg" alt="Axel TNgR" className="w-full h-full object-cover" />
        {/* Glow qui suit le curseur */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 150px at ${mousePos.x}% ${mousePos.y}%, rgba(37, 99, 235, 0.25), transparent 70%)`
          }}
        />
      </div>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  
  const { scrollY } = useScroll();
  // Animation Parallax : Texte descend, image monte au défilement
  const yText = useTransform(scrollY, [0, 500], [0, 80]);
  const yImage = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityScroll = useTransform(scrollY, [0, 400], [1, 0.85]);
  
  const words = useMemo(() => {
    // We get the array directly from translation file
    const translatedWords = t('hero.words', { returnObjects: true });
    return Array.isArray(translatedWords) ? translatedWords : [];
  }, [t]);

  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(100);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const handleType = () => {
      const current = wordIdx % words.length;
      const fullText = words[current];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypeSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypeSpeed(100);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIdx(prev => prev + 1);
        setTypeSpeed(100);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIdx, words, typeSpeed]);

  return (
    <motion.section style={{ opacity: opacityScroll }} className="min-h-[90vh] flex items-center px-6 relative overflow-hidden pt-12">
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          style={{ y: yText }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-wrap gap-4 mb-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-green/20 text-brand-green shadow-lg shadow-brand-green/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest">{t('hero.available')}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-blue/20 text-brand-blue shadow-lg shadow-brand-blue/5">
              <Trophy size={14} className="animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-widest">{t('hero.badge_certs')}</span>
            </motion.div>
          </div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            <span className="block text-text-main">Axel Renaud</span>
            <span className="block text-brand-blue cursor-default">
              Tadjounteu
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl md:text-2xl font-bold text-text-muted mb-4">
             {t('hero.role')} <span className="text-brand-blue">{t('hero.specialty')}</span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 text-lg font-mono mb-8 py-2 px-4 bg-black/5 dark:bg-white/5 rounded-xl w-fit border border-glass-border">
            <Terminal size={20} className="text-brand-blue" />
            <span className="text-text-muted">{t('hero.specialized_in')}</span>
            <span className="text-brand-violet font-bold underline decoration-brand-violet/30 underline-offset-4">{text}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-5 bg-brand-blue"
            />
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-text-muted leading-relaxed max-w-xl mb-12">
            {t('hero.desc')}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 sm:gap-6 items-center">
            <Link 
              to="/projects"
              className="btn-shine group relative flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-900 dark:bg-brand-blue text-white dark:text-slate-950 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-blue/20 uppercase tracking-wide text-xs sm:text-sm"
            >
              {t('hero.view_projects')}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a 
              href="/CV.pdf" 
              download="CV — Axel Renaud Tadjounteu Ngongue 2026.pdf"
              className="btn-shine group relative flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-brand-blue/50 bg-brand-blue/5 hover:bg-brand-blue/10 dark:bg-brand-blue/10 dark:hover:bg-brand-blue/20 text-brand-blue rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 uppercase tracking-wide text-xs sm:text-sm"
            >
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              {t('hero.download_cv')}
            </a>

            <Link 
              to="/contact"
              className="px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-glass-border hover:border-brand-blue/50 rounded-2xl font-bold transition-all hover:bg-brand-blue/5 flex items-center gap-3 group uppercase tracking-wide text-xs sm:text-sm text-text-muted hover:text-text-main"
            >
              {t('hero.contact_me')}
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex items-center gap-8">
             <div className="flex items-center gap-4">
               {[
                 { icon: <Github size={20} />, url: "https://github.com/axeltadjounteu17", label: "GitHub" },
                 { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/axel-renaud-tadjounteu-ngongue-060502296", label: "LinkedIn" },
                 { icon: <Mail size={20} />, url: "mailto:tadjounteuaxel@gmail.com", label: "Email" }
               ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 glass rounded-xl text-text-muted hover:text-brand-blue hover:border-brand-blue/30 transition-all flex items-center justify-center hover:-translate-y-1"
                  >
                    {social.icon}
                  </a>
               ))}
             </div>
             <div className="h-4 w-px bg-glass-border" />
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-[.2em]">{t('hero.current_level')}</span>
                <span className="text-sm font-bold text-text-main">{t('hero.level_value')}</span>
             </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
          className="relative flex items-center justify-center order-first lg:order-last"
        >
          {/* Cadre décoratif autour de la photo avec Glow */}
          <div className="max-w-[250px] lg:max-w-sm w-full mx-auto">
            <ProfilePhoto />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
