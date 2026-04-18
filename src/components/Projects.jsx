import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Shield, Database, Layout, Smartphone, Globe, Activity, Building, ShoppingCart, Headset, X, Linkedin, Image as ImageIcon, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects = [
    {
      title: t('projects.p1_title'),
      year: "2024",
      description: t('projects.p1_desc'),
      features: [t('projects.p1_f1'), t('projects.p1_f2'), t('projects.p1_f3'), t('projects.p1_f4')],
      stack: ["Python", "Scapy", "Snort", "Linux"],
      icon: <Shield className="text-brand-green" />,
      color: "bg-brand-green/10",
      image: "/projet-1.jpg", 
      github: "https://github.com/axeltadjounteu17/IDS-Python-Scapy"
    },
    {
      title: t('projects.p4_title'),
      year: "2024",
      description: t('projects.p4_desc'),
      features: [t('projects.p4_f1'), t('projects.p4_f2'), t('projects.p4_f3'), t('projects.p4_f4')],
      stack: ["Cisco Packet Tracer", "OSPF", "VLAN", "ACL"],
      icon: <Globe className="text-brand-blue" />,
      color: "bg-brand-blue/10",
      image: "/projet-4.jpg",
      github: "https://github.com/axeltadjounteu17/Cisco-Network-Simulation"
    },
    {
      title: t('projects.p2_title'),
      year: "2025",
      description: t('projects.p2_desc'),
      features: [t('projects.p2_f1'), t('projects.p2_f2'), t('projects.p2_f3'), t('projects.p2_f4')],
      stack: ["Python", "MySQL", "Tkinter"],
      icon: <Activity className="text-brand-blue" />,
      color: "bg-brand-blue/10",
      image: ["/11.png", "/12.png", "/13.png", "/14.png", "/15.png", "/16.png"],
      github: "https://github.com/axeltadjounteu17/gestion-hospitaliere"
    },
    {
      title: t('projects.p8_title'),
      year: "2024",
      description: t('projects.p8_desc'),
      features: [t('projects.p8_f1'), t('projects.p8_f2'), t('projects.p8_f3')],
      stack: ["Kotlin", "Android Studio", "Room DB"],
      icon: <Smartphone className="text-brand-violet" />,
      color: "bg-brand-violet/10",
      image: ["/blocnote-1.jpeg", "/blocnote-2.jpeg", "/blocnote-3.jpeg"],
      github: "https://github.com/axeltadjounteu17/Tpe_Bloc_Notes"
    }
  ];

  return (
    <section className="py-24 px-6 relative">
      {/* Liste des projets */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
           <motion.span
             initial={{ opacity: 0, y: -10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-brand-blue font-bold tracking-widest text-xs uppercase mb-2 block"
           >{t('projects.label')}</motion.span>
           <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-extrabold tracking-tight"
           >{t('projects.title1')} <span className="text-brand-blue">{t('projects.title2')}</span></motion.h2>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="mt-4 text-text-muted max-w-2xl mx-auto italic"
           >{t('projects.desc')}</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              onClick={() => {
                setCurrentImageIndex(0);
                setSelectedProject(project);
              }}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 120 }}
              viewport={{ once: true, margin: "-50px" }}
              className="glass overflow-hidden group flex flex-col h-full border hover:border-brand-blue/30 transition-all duration-300 rounded-3xl cursor-pointer"
            >
              <div className="p-8 flex-grow">
                <div className="mb-8 flex items-center justify-between">
                  <div className={`p-4 ${project.color} rounded-2xl group-hover:scale-105 transition-transform duration-500`}>
                    {project.icon}
                  </div>
                  <span className="text-[10px] font-bold text-text-muted px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full border border-glass-border">
                    {project.year}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-brand-blue transition-colors">{project.title}</h3>
                <p className="text-sm text-text-muted mb-8 leading-relaxed font-medium line-clamp-2">
                  {project.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {project.features.slice(0, 3).map(f => (
                    <li key={f} className="text-[11px] text-text-main dark:text-text-muted flex items-center gap-3 font-semibold line-clamp-1">
                      <span className="h-1.5 w-1.5 bg-brand-blue rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                  {project.features.length > 3 && (
                    <li className="text-[11px] text-brand-blue italic ml-4">+ Voir plus</li>
                  )}
                </ul>
              </div>

              <div className="px-8 py-5 bg-black/[0.04] dark:bg-white/[0.04] border-t border-glass-border">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(t => (
                      <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-brand-blue">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-brand-blue/50 group-hover:text-brand-blue opacity-0 group-hover:opacity-100 transition-all hidden sm:block">
                    <ExternalLink size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modale des détails du projet */}
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
                className="glass w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative flex flex-col shadow-2xl shadow-black/50"
              >
                {/* Boutons d'action en haut de la modale */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2.5 rounded-full transition-colors bg-slate-900 text-white hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20 shadow-sm"
                    title="Voir sur GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2.5 rounded-full transition-colors bg-black/10 text-slate-800 hover:bg-black/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 shadow-sm"
                    title="Fermer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Contenu textuel de la modale en haut */}
                <div className="p-8 sm:p-12 pb-6 border-b border-glass-border">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 ${selectedProject.color} rounded-2xl`}>
                      {selectedProject.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-text-main mb-1 pr-24">{selectedProject.title}</h3>
                      <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">{selectedProject.year}</span>
                    </div>
                  </div>

                  <p className="text-text-muted leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-text-main mb-4 flex items-center gap-2">
                        <Shield size={16} className="text-brand-blue" />
                        Détails
                      </h4>
                      <ul className="space-y-3">
                        {selectedProject.features.map(f => (
                          <li key={f} className="text-sm text-text-muted flex items-start gap-3">
                            <span className="h-1.5 w-1.5 bg-brand-blue rounded-full flex-shrink-0 mt-1.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-text-main mb-4 flex items-center gap-2">
                        <Database size={16} className="text-brand-blue" />
                        Stack Technique
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map(t => (
                          <span key={t} className="px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-glass-border rounded-lg text-xs font-bold text-text-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zone d'image dynamique avec gestion du carrousel au milieu */}
                <div className="relative w-full min-h-[300px] h-[50vh] bg-black/5 dark:bg-black/40 flex items-center justify-center overflow-hidden group border-y border-glass-border">
                  {selectedProject.image && !selectedProject.image.toString().includes('projet-') ? (
                    <>
                      {/* Calque pour assombrir fortement l'image selon le thème */}
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/60 z-10 pointer-events-none" />
                      
                      {Array.isArray(selectedProject.image) ? (
                        <>
                          <img 
                            src={selectedProject.image[currentImageIndex]} 
                            alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`} 
                            className="w-full h-full object-contain p-4 z-0"
                          />
                          {selectedProject.image.length > 1 && (
                            <>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? selectedProject.image.length - 1 : prev - 1); }}
                                className="absolute left-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-20 shadow-lg"
                              >
                                <ChevronLeft size={24} />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === selectedProject.image.length - 1 ? 0 : prev + 1); }}
                                className="absolute right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-20 shadow-lg"
                              >
                                <ChevronRight size={24} />
                              </button>
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm">
                                {selectedProject.image.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                    className={`h-2 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'w-5 bg-brand-blue' : 'w-2 bg-white/60 hover:bg-white'}`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <img 
                          src={selectedProject.image} 
                          alt={selectedProject.title} 
                          className="w-full h-full object-contain p-4 z-0"
                        />
                      )}
                    </>
                  ) : (
                    /* Fallback si l'image est manquante */
                    <div className={`w-full h-full flex flex-col items-center justify-center gap-6 ${selectedProject.color} transition-colors duration-500`}>
                      <div className="p-8 bg-white/10 dark:bg-black/20 rounded-3xl shadow-2xl backdrop-blur-md border border-white/20 scale-125 animate-float">
                        {selectedProject.icon}
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] font-bold uppercase tracking-[.3em] text-text-muted opacity-50 block mb-2">Visualisation indisponible</span>
                        <span className="text-sm font-bold text-brand-blue">{selectedProject.title}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bouton d'action GitHub en bas */}
                <div className="p-8 sm:p-12 pt-6 border-t border-glass-border flex flex-wrap gap-4">
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-[#24292e]/10 text-[#24292e] dark:bg-white/10 dark:text-white font-bold rounded-xl hover:bg-[#24292e]/20 dark:hover:bg-white/20 transition-colors"
                  >
                    <Github size={18} />
                    Voir le code source (GitHub)
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
