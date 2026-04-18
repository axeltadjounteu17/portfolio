import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Shield, Smartphone, Globe, Activity, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedTitle from './AnimatedTitle';

const ProgressBar = ({ duration, onComplete, isActive }) => {
  return (
    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-4">
      <motion.div
        initial={{ width: 0 }}
        animate={isActive ? { width: "100%" } : { width: 0 }}
        transition={isActive ? { duration: duration / 1000, ease: "linear" } : { duration: 0 }}
        onAnimationComplete={() => isActive && onComplete()}
        className="h-full bg-brand-blue shadow-[0_0_10px_rgba(37,99,235,0.5)]"
      />
    </div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const duration = 5000; // Durée fixe pour la barre

  const projects = [
    {
      id: 0,
      title: t('projects.p1_title'),
      year: "2024",
      description: t('projects.p1_desc'),
      features: [t('projects.p1_f1'), t('projects.p1_f2'), t('projects.p1_f3'), t('projects.p1_f4')],
      stack: ["Python", "Scapy", "Snort"],
      icon: <Shield />,
      color: "from-brand-green/20 to-transparent",
      image: "/projet-1.jpg", 
      github: "https://github.com/axeltadjounteu17/IDS-Python-Scapy"
    },
    {
      id: 1,
      title: t('projects.p4_title'),
      year: "2024",
      description: t('projects.p4_desc'),
      features: [t('projects.p4_f1'), t('projects.p4_f2'), t('projects.p4_f3'), t('projects.p4_f4')],
      stack: ["Cisco", "OSPF", "VLAN"],
      icon: <Globe />,
      color: "from-brand-blue/20 to-transparent",
      image: "/projet-4.jpg",
      github: "https://github.com/axeltadjounteu17/Cisco-Network-Simulation"
    },
    {
      id: 2,
      title: t('projects.p2_title'),
      year: "2025",
      description: t('projects.p2_desc'),
      features: [t('projects.p2_f1'), t('projects.p2_f2'), t('projects.p2_f3'), t('projects.p2_f4')],
      stack: ["Python", "MySQL", "Tkinter"],
      icon: <Activity />,
      color: "from-brand-blue/20 to-transparent",
      image: "/11.png",
      github: "https://github.com/axeltadjounteu17/gestion-hospitaliere"
    },
    {
      id: 3,
      title: t('projects.p8_title'),
      year: "2024",
      description: t('projects.p8_desc'),
      features: [t('projects.p8_f1'), t('projects.p8_f2'), t('projects.p8_f3')],
      stack: ["Kotlin", "Android", "Room"],
      icon: <Smartphone />,
      color: "from-brand-violet/20 to-transparent",
      image: "/blocnote-1.jpeg",
      github: "https://github.com/axeltadjounteu17/Tpe_Bloc_Notes"
    }
  ];

  // Le changement est maintenant piloté exclusivement par le callback onComplete de la ProgressBar
  // pour garantir que le projet suivant ne s'affiche qu'après chargement complet.

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-blue font-bold tracking-widest text-xs uppercase mb-2 block"
          >{t('projects.label')}</motion.span>
          <AnimatedTitle className="text-4xl md:text-5xl">
            {t('projects.title1')} <span className="text-brand-blue">{t('projects.title2')}</span>
          </AnimatedTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-text-muted max-w-2xl mx-auto"
          >{t('projects.desc')}</motion.p>
        </div>

        {/* Chrome-style Accordion Container */}
        <div 
          className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px] w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {projects.map((project, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={project.id}
                initial={false}
                animate={{ 
                  flex: isActive ? 4 : 1,
                  transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
                }}
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden cursor-pointer rounded-3xl glass border border-white/5 group transition-all duration-500 ${isActive ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'}`}
              >
                {/* Background Image with Clip-path type reveal */}
                <div className="absolute inset-0 z-0">
                  <motion.div 
                    initial={false}
                    animate={{ 
                      clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
                      opacity: isActive ? 0.4 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    <img 
                      src={project.image} 
                      alt="" 
                      className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'grayscale-0 brightness-100 scale-105' : 'grayscale brightness-50'}`} 
                    />
                  </motion.div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} ${isActive ? 'opacity-40' : 'opacity-100'}`} />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col p-8 md:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-white/10 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                      <div className="text-brand-blue">
                        {project.icon}
                      </div>
                    </div>
                    {!isActive && (
                      <span className="text-xs font-bold text-text-muted mt-2 rotate-0 lg:rotate-90 origin-center opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {project.year}
                      </span>
                    )}
                  </div>

                  <div className="flex-grow flex flex-col justify-end overflow-hidden">
                    <h3 className={`font-black tracking-tight mb-2 transition-all duration-500 ${isActive ? 'text-3xl md:text-4xl text-white' : 'text-xl text-text-muted group-hover:text-white'}`}>
                      {project.title}
                    </h3>
                    
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-6"
                        >
                          <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-md">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {project.stack.map(s => (
                              <span key={s} className="px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-[10px] font-bold text-brand-blue uppercase tracking-widest">
                                {s}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-6 pt-4">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                              className="px-6 py-3 bg-white text-slate-950 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                            >
                              {t('common.details') || "Voir Plus"}
                              <ArrowRight size={16} />
                            </button>
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-white hover:text-brand-blue transition-colors flex items-center gap-2 font-bold text-sm"
                            >
                              <Github size={18} />
                              GitHub
                            </a>
                          </div>

                          <ProgressBar 
                            key={activeIndex} // Force le redémarrage de la barre au changement
                            duration={duration} 
                            isActive={!isHovered}
                            onComplete={() => setActiveIndex((prev) => (prev + 1) % projects.length)} 
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Re-using the Modal part from old Projects for detailed view */}
      <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative flex flex-col shadow-2xl"
              >
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2.5 rounded-full transition-colors bg-white/10 text-white hover:bg-white/20 shadow-sm"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-8 sm:p-12 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-brand-blue/20 rounded-2xl text-brand-blue outline outline-1 outline-brand-blue/30">
                      {selectedProject.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">{selectedProject.title}</h3>
                      <span className="text-xs font-bold text-brand-blue tracking-[0.2em] uppercase">{selectedProject.year}</span>
                    </div>
                  </div>
                  <p className="text-text-muted leading-relaxed mb-8">{selectedProject.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-4">Fonctionnalités</h4>
                      <ul className="space-y-3">
                        {selectedProject.features.map(f => (
                          <li key={f} className="text-xs text-text-muted flex items-start gap-3">
                            <span className="h-1.5 w-1.5 bg-brand-blue rounded-full flex-shrink-0 mt-1" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-4">Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map(s => (
                          <span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-text-muted">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-black/50 border-t border-white/5">
                   <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-brand-blue text-slate-950 font-black rounded-2xl hover:scale-105 transition-transform uppercase tracking-widest text-xs"
                  >
                    <Github size={20} />
                    Code Source GitHub
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
