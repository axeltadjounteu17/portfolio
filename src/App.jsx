import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import { Target, ShieldCheck, Cloud, Code, GraduationCap, Trophy, Rocket, MapPin, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTranslation } from 'react-i18next';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="pt-24 min-h-[calc(100vh-80px)]"
  >
    {children}
  </motion.div>
);

const AboutPage = () => {
  const highlights = [
    { icon: <GraduationCap size={24} />, value: "L3", label: "Sécurité Sys. & Réseaux" },
    { icon: <Trophy size={24} />, value: "8+", label: "Certifications obtenues" },
    { icon: <Rocket size={24} />, value: "6+", label: "Projets réalisés" },
    { icon: <MapPin size={24} />, value: "CMR", label: "Douala, Cameroun" }
  ];

  const objectives = [
    { title: "Cloud Engineer (AWS/Azure)", icon: <Cloud size={20} /> },
    { title: "Cyber Security Analyst", icon: <ShieldCheck size={20} /> },
    { title: "Systems & Network Admin", icon: <ShieldCheck size={20} /> },
    { title: "Python Developer", icon: <Code size={20} /> }
  ];

  return (
    <div className="mx-auto max-w-6xl py-20 px-6">
      <div className="mb-16 text-center">
        <span className="text-brand-blue font-bold tracking-widest text-xs uppercase mb-2 block">À PROPOS</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Sécurité, Code & <span className="text-brand-blue">Innovation</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8 text-lg leading-relaxed text-text-muted">
          <p className="text-xl text-text-main font-semibold">
            Je suis Axel Renaud Tadjounteu Ngongue, étudiant en 3ᵉ année de Licence en Informatique.
          </p>
          <p>
            Ma passion ? Comprendre et sécuriser les infrastructures numériques. Je m'intéresse autant à l'architecture réseau qu'à la détection d'intrusions, au développement logiciel et aux technologies cloud — avec une curiosité constante pour l'intelligence artificielle et le machine learning.
          </p>
          <p>
            Autodidacte et rigoureux, je construis des projets concrets qui combinent mes compétences techniques et ma vision de la sécurité informatique.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-glass-border font-mono">
            {highlights.map((item, i) => (
              <div key={i} className="glass p-6 rounded-2xl flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                <div className="text-brand-blue mb-3">{item.icon}</div>
                <div className="text-2xl font-bold text-text-main">{item.value}</div>
                <div className="text-xs font-medium text-text-muted">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass p-10 rounded-3xl border-l-[6px] border-brand-blue">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-brand-blue text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-brand-blue/30">
                  AR
                </div>
                <div>
                   <h3 className="text-xl font-bold text-text-main">Axel Renaud Tadjounteu</h3>
                   <p className="text-sm text-text-muted">Étudiant · Sécurité des Systèmes & Réseaux</p>
                </div>
             </div>

             <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-text-muted">
                   <Mail size={18} className="text-brand-blue" />
                   <span>tadjounteuaxel@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                   <Phone size={18} className="text-brand-blue" />
                   <span>+237 6 98828789 / 654 057 668</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                   <MapPin size={18} className="text-brand-blue" />
                   <span>Douala, Cameroun</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                   <GraduationCap size={18} className="text-brand-blue" />
                   <span>Université de Douala · L3 SSR</span>
                </div>
             </div>

             <div className="flex flex-wrap gap-2 pt-6 border-t border-glass-border">
                {["Français — Courant", "Anglais — Tech"].map(lang => (
                   <span key={lang} className="px-4 py-1.5 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-full">
                     {lang}
                   </span>
                ))}
             </div>
          </div>

          <div className="glass p-8 rounded-3xl">
             <div className="flex items-center gap-3 mb-6">
                <Target size={24} className="text-brand-blue" />
                <h3 className="font-bold uppercase tracking-widest text-sm">Vision & Objectifs</h3>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {objectives.map((obj, i) => (
                   <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-brand-blue/30 transition-all cursor-default">
                      <div className="text-brand-blue/70">{obj.icon}</div>
                      <span className="text-[10px] font-bold uppercase tracking-tight">{obj.title}</span>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const location = useLocation();

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // App is inside BrowserRouter but outside suspense if not careful, but initReactI18next doesn't strictly need suspense
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg-main text-text-main relative transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue via-brand-violet to-brand-green origin-left z-[100]"
      />
      <ScrollToTop />
      
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: false,
              },
              onClick: {
                enable: false,
              },
            },
          },
          particles: {
            color: {
              value: "#2563EB",
            },
            links: {
              color: "#2563EB",
              distance: 150,
              enable: true,
              opacity: 0.15,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.6,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
        }}
      />

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
            <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
            <Route path="/timeline" element={<PageWrapper><Timeline /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="border-t border-glass-border py-12 px-6 bg-black/[0.02] dark:bg-black/20">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-brand-blue mb-1">Axel Renaud Tadjounteu</h3>
            <p className="text-xs text-text-muted">{t('footer.subtitle')}</p>
          </div>
          <div className="flex gap-4">
            <div className="h-1 w-8 bg-brand-blue/30 rounded-full" />
            <div className="h-1 w-8 bg-brand-blue/20 rounded-full" />
            <div className="h-1 w-8 bg-brand-blue/10 rounded-full" />
          </div>
          <p className="text-[10px] text-text-muted font-medium">&copy; Axel Renaud Tadjounteu N. {t('footer.location')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App
