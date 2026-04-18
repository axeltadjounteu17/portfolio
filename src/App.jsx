import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Timeline = lazy(() => import('./components/Timeline'));
const Contact = lazy(() => import('./components/Contact'));
import { Target, ShieldCheck, Cloud, Code, GraduationCap, Trophy, Rocket, MapPin, Mail, Phone, Server } from 'lucide-react';
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
  const { t } = useTranslation();
  const highlights = [
    { icon: <GraduationCap size={24} />, value: "L3", label: t('about.highlights.l3') },
    { icon: <Trophy size={24} />, value: "8+", label: t('about.highlights.certs') },
    { icon: <Rocket size={24} />, value: "8+", label: t('about.highlights.projects') },
    { icon: <MapPin size={24} />, value: "CMR", label: "Douala, Cameroun" }
  ];

  const objectives = [
    { title: "Cloud Engineer (AWS/Azure)", icon: <Cloud size={20} /> },
    { title: "Cyber Security Analyst", icon: <ShieldCheck size={20} /> },
    { title: "Systems & Network Admin", icon: <Server size={20} /> },
    { title: "Python Developer", icon: <Code size={20} /> }
  ];

  return (
    <div className="mx-auto max-w-6xl py-20 px-6">
      <div className="mb-16 text-center">
        <span className="text-brand-blue font-bold tracking-widest text-xs uppercase mb-2 block">{t('about.label')}</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {t('about.title1')}<span className="text-brand-blue">{t('about.title2')}</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8 text-lg leading-relaxed text-text-muted">
          <p className="text-xl text-text-main font-semibold">
            {t('about.intro_title')}
          </p>
          <p>
            {t('about.intro_p1')}
          </p>
          <p>
            {t('about.intro_p2')}
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
                    <p className="text-sm text-text-muted">{t('hero.role')}{t('hero.specialty')}</p>
                 </div>
             </div>

             <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-text-muted">
                   <Mail size={18} className="text-brand-blue" />
                   <span>tadjounteuaxel@gmail.com</span>
                </div>
                 <div className="flex items-center gap-3 text-sm text-text-muted">
                    <Phone size={18} className="text-brand-blue" />
                    <a href="https://wa.me/237698828789" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                      WhatsApp — +237 6 98828789
                    </a>
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
                 {[t('about.lang_fr'), t('about.lang_en'), t('about.lang_es')].map(lang => (
                    <span key={lang} className="px-4 py-1.5 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-full">
                      {lang}
                    </span>
                 ))}
              </div>
          </div>

          <div className="glass p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                 <Target size={24} className="text-brand-blue" />
                 <h3 className="font-bold uppercase tracking-widest text-sm">{t('about.vision_title')}</h3>
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
          <Suspense fallback={
            <div className="flex h-[calc(100vh-80px)] items-center justify-center pt-24 text-brand-blue">
               <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
              <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
              <Route path="/timeline" element={<PageWrapper><Timeline /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <footer className="border-t border-glass-border py-12 px-6 bg-black/[0.02] dark:bg-black/20">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-brand-blue mb-1">Axel Renaud Tadjounteu</h3>
            <p className="text-xs text-text-muted">{t('footer.subtitle')}</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/axeltadjounteu17" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-lg text-text-muted hover:text-brand-blue hover:bg-brand-blue/5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/axel-renaud-tadjounteu-ngongue-060502296" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg text-text-muted hover:text-brand-blue hover:bg-brand-blue/5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:tadjounteuaxel@gmail.com" aria-label="Email" className="p-2 rounded-lg text-text-muted hover:text-brand-blue hover:bg-brand-blue/5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
          <p className="text-[10px] text-text-muted font-medium">&copy; {new Date().getFullYear()} Axel Renaud Tadjounteu N. {t('footer.location')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App
