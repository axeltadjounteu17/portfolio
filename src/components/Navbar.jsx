import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Terminal, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = ({ theme, toggleTheme }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.skills'), path: '/skills' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.timeline'), path: '/timeline' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const changeLanguage = () => {
    const currentLang = i18n.language;
    if (currentLang.startsWith('fr')) i18n.changeLanguage('en');
    else if (currentLang.startsWith('en')) i18n.changeLanguage('es');
    else i18n.changeLanguage('fr');
  };

  const currentLangLabel = i18n.language.substring(0, 2).toUpperCase();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'navbar-glass py-3' : 'bg-transparent py-5'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link 
          to="/" 
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="rounded-xl bg-slate-900 dark:bg-brand-blue p-2 transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-brand-blue/20">
            <Terminal size={18} className="text-white dark:text-slate-950" />
          </div>
          <span className="font-mono text-xl font-black tracking-tighter text-text-main">
            AXEL <span className="text-brand-blue">TNgR</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group h-full py-2 ${
                location.pathname === link.path ? 'text-brand-blue' : 'text-text-main hover:text-brand-blue'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
          
          <div className="flex items-center gap-3 border-l border-border-subtle pl-6">
            <button
              onClick={changeLanguage}
              className="px-3 py-1.5 rounded-xl hover:bg-brand-blue/10 transition-all text-text-main hover:text-brand-blue flex items-center gap-2 group"
              title="Changer de langue"
            >
              <Globe size={16} className="group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-bold leading-none">{currentLangLabel}</span>
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-brand-blue/10 transition-all text-text-main hover:text-brand-blue group"
              aria-label={t('nav.theme')}
            >
              {theme === 'light' ? (
                <Moon size={18} className="group-hover:rotate-12 transition-transform" />
              ) : (
                <Sun size={18} className="group-hover:rotate-90 transition-transform duration-500" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={changeLanguage}
            aria-label={`Changer la langue (${currentLangLabel})`}
            className="p-2 rounded-xl text-text-main hover:bg-brand-blue/10 transition-colors flex items-center justify-center font-bold text-xs"
          >
           {currentLangLabel}
          </button>
          <button 
            onClick={toggleTheme}
            aria-label={t('nav.theme')}
            className="p-2 rounded-xl text-text-main hover:bg-brand-blue/10 transition-colors"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
            className="rounded-xl p-2 text-text-main hover:bg-brand-blue/10 transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden navbar-glass relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-violet opacity-50" />
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className={`text-sm font-black uppercase tracking-[0.2em] transition-all flex items-center justify-between ${
                    location.pathname === link.path ? 'text-brand-blue' : 'text-text-main'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
