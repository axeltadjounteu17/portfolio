import { motion } from 'framer-motion';
import { Shield, Cloud, Code, Terminal, Database, Server, Globe, BrainCircuit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedTitle from './AnimatedTitle';



const Skills = () => {
  const { t } = useTranslation();

  const skillsLayout = [
    {
      category: t('skills.categories.cyber'),
      subtitle: t('skills.categories.cyber_sub'),
      icon: <Shield className="text-brand-blue" />,
      color: "border-brand-blue/30",
      skills: ["Sécurité réseau", "Analyse des menaces", "IDS/IPS", "Snort", "Scapy", "ARP spoofing", "DoS/DDoS", "Fortinet NSE", "Parrot OS"]
    },
    {
      category: t('skills.categories.network'),
      subtitle: t('skills.categories.network_sub'),
      icon: <Globe className="text-brand-green" />,
      color: "border-brand-green/30",
      skills: ["Cisco Packet Tracer", "GNS3", "EVE-NG", "VLAN", "OSPF", "DHCP / DNS", "ACL / SSH", "Linux Admin", "Windows Server", "VMware", "VirtualBox"]
    },
    {
      category: t('skills.categories.dev'),
      subtitle: t('skills.categories.dev_sub'),
      icon: <Code className="text-brand-violet" />,
      color: "border-brand-violet/30",
      skills: ["Python", "Kotlin", "Java / JavaFX", "PHP", "SQL", "Tkinter", "Android Studio", "MVC Pattern"]
    },
    {
      category: t('skills.categories.db'),
      subtitle: t('skills.categories.db_sub'),
      icon: <Database className="text-brand-blue" />,
      color: "border-brand-blue/30",
      skills: ["MySQL", "MariaDB", "MongoDB", "PgAdmin", "Triggers", "Procedures", "Views", "Transactions"]
    },
    {
      category: t('skills.categories.cloud'),
      subtitle: t('skills.categories.cloud_sub'),
      icon: <Cloud className="text-brand-green" />,
      color: "border-brand-green/30",
      skills: ["Azure (VM/Web)", "AWS re/Start", "Docker", "Ubuntu", "VS Code", "Git"]
    },
    {
      category: t('skills.categories.ai'),
      subtitle: t('skills.categories.ai_sub'),
      icon: <BrainCircuit className="text-brand-violet" />,
      color: "border-brand-violet/30",
      skills: ["Machine Learning", "LLM / IA générative", "Analyse de données Python", "AI Fluency (Anthropic)"]
    }
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
           >{t('skills.label')}</motion.span>
           <AnimatedTitle className="text-4xl md:text-5xl">
             {t('skills.title1')}
             <span className="text-brand-blue">{t('skills.title2')}</span>
             {t('skills.title3')}
           </AnimatedTitle>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="mt-4 text-text-muted max-w-2xl mx-auto italic"
           >{t('skills.desc')}</motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsLayout.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass p-8 group border-transparent hover:${group.color} transition-all duration-500 rounded-3xl h-full flex flex-col tilt-card`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-white/10 dark:bg-white/5 rounded-2xl group-hover:scale-105 transition-transform duration-500">
                  {group.icon}
                </div>
                <div className="text-[10px] font-bold text-text-muted opacity-40 uppercase tracking-widest group-hover:opacity-100 transition-opacity">
                  {`0${index + 1}`}
                </div>
              </div>
              
              <h3 className="text-text-main font-bold text-lg mb-1">{group.category}</h3>
              <p className="text-xs text-text-muted mb-6 font-medium">{group.subtitle}</p>


              
              <div className="flex flex-wrap gap-2 mt-auto">
                {group.skills.map((item) => (
                  <span 
                    key={item} 
                    className="px-3 py-1 bg-black/[0.05] dark:bg-white/[0.05] border border-glass-border rounded-lg text-[10px] font-bold text-text-muted hover:bg-brand-blue/10 hover:text-brand-blue hover:border-brand-blue/30 transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
