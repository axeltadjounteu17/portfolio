import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, BookOpen, GraduationCap, Circle, CheckCircle2, Shield, Globe, Database, Monitor, Cloud, BrainCircuit, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

const TimelineTrack = ({ children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="space-y-12 relative">
      {/* Background track */}
      <div className="absolute left-6 top-8 bottom-0 w-1 bg-brand-blue/10 rounded-full" />
      {/* Animated fill */}
      <motion.div
        style={{ scaleY }}
        className="absolute left-6 top-8 bottom-0 w-1 bg-gradient-to-b from-brand-blue to-brand-violet rounded-full origin-top"
      />
      {children}
    </div>
  );
};

const Timeline = () => {
  const { t } = useTranslation();

  const timelineData = [
    {
      type: 'formation',
      title: t('timeline.f1_title'),
      sub: t('timeline.f1_sub'),
      org: t('timeline.f1_org'),
      date: t('timeline.f1_date'),
      description: t('timeline.f1_desc'),
      icon: <GraduationCap size={20} />,
      color: 'border-brand-blue'
    },
    {
      type: 'formation',
      title: t('timeline.f2_title'),
      sub: t('timeline.f2_sub'),
      org: t('timeline.f2_org'),
      date: t('timeline.f2_date'),
      description: t('timeline.f2_desc'),
      icon: <BookOpen size={20} />,
      color: 'border-brand-violet'
    }
  ];

  const certifications = [
    { name: t('timeline.c1'), issuer: 'Fortinet', icon: <Shield size={18} />, status: t('timeline.obtained'), color: 'cc-blue' },
    { name: t('timeline.c2'), issuer: 'IBM', icon: <Globe size={18} />, status: t('timeline.obtained'), color: 'cc-violet' },
    { name: t('timeline.c3'), issuer: 'Google', icon: <Database size={18} />, status: t('timeline.obtained'), color: 'cc-green' },
    { name: t('timeline.c4'), issuer: 'Cisco', icon: <Monitor size={18} />, status: t('timeline.obtained'), color: 'cc-blue' },
    { name: t('timeline.c5'), issuer: 'IBM', icon: <Award size={18} />, status: t('timeline.obtained'), color: 'cc-violet' },
    { name: t('timeline.c6'), issuer: 'Microsoft', icon: <Cloud size={18} />, status: t('timeline.obtained'), color: 'cc-blue' },
    { name: t('timeline.c7'), issuer: 'Anthropic', icon: <BrainCircuit size={18} />, status: t('timeline.obtained'), color: 'cc-green' },
    { name: t('timeline.c8'), issuer: 'Microsoft', icon: <ShieldCheck size={18} />, status: t('timeline.obtained'), color: 'cc-blue' },
    { name: t('timeline.c9'), issuer: 'AWS', icon: <Cloud size={18} />, status: t('timeline.in_progress'), color: 'cc-violet' }
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
         <motion.span
           initial={{ opacity: 0, y: -10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-brand-blue font-bold tracking-widest text-xs uppercase mb-2 block"
         >{t('timeline.label')}</motion.span>
         <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="text-4xl md:text-5xl font-extrabold tracking-tight"
         >{t('timeline.title1')}<span className="text-brand-blue">{t('timeline.title2')}</span></motion.h2>
         <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="mt-4 text-text-muted max-w-2xl mx-auto italic"
         >{t('timeline.desc')}</motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Timeline side */}
          <TimelineTrack>
             {timelineData.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-16 group"
                >
                  <div className={`absolute left-0 top-0 w-12 h-12 rounded-full glass border-2 ${event.color} flex items-center justify-center text-brand-blue z-10 bg-bg-main shadow-lg shadow-brand-blue/10 group-hover:scale-110 transition-transform`}>
                    {event.icon}
                  </div>
                  
                  <div className="glass p-8 rounded-3xl hover:border-brand-blue/20 transition-all group hover:-translate-y-1">
                    <span className="text-[10px] font-bold text-brand-blue tracking-widest uppercase mb-2 block">{event.date}</span>
                    <h3 className="text-xl font-bold text-text-main mb-1 group-hover:text-brand-blue transition-colors">{event.title}</h3>
                    <p className="text-sm font-bold text-text-muted mb-4 uppercase tracking-tight">{event.sub}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <Circle size={8} className="fill-brand-blue text-brand-blue" />
                      <span className="text-xs font-bold text-brand-blue/80 italic">{event.org}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed italic">{event.description}</p>
                  </div>
                </motion.div>
             ))}
          </TimelineTrack>

          {/* Certs side */}
          <div className="space-y-4">
             <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Award className="text-brand-blue" />
                {t('timeline.certs_title')}
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {certifications.map((cert, i) => (
                  <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="glass p-5 rounded-2xl flex items-center gap-4 group hover:border-brand-blue/30 transition-all h-full tilt-card"
                  >
                      <div className="w-12 h-12 flex items-center justify-center text-2xl bg-black/5 dark:bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                        {cert.icon}
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <h4 className="text-xs font-bold text-text-main line-clamp-1 group-hover:text-brand-blue transition-colors">{cert.name}</h4>
                        <p className="text-[10px] text-text-muted font-medium mb-1">{cert.issuer}</p>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={10} className={cert.status === t('timeline.obtained') ? 'text-brand-green' : 'text-brand-violet'} />
                          <span className={`text-[9px] font-extrabold tracking-tighter ${cert.status === t('timeline.obtained') ? 'text-brand-green' : 'text-brand-violet'}`}>
                            {cert.status}
                          </span>
                        </div>
                      </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
