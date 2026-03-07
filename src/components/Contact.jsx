import { useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const formRef = useRef();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });

  const subjects = useMemo(() => [
    { value: "Sécurité", label: t('contact.sub_sec') },
    { value: "Cloud", label: t('contact.sub_cloud') },
    { value: "Développement", label: t('contact.sub_dev') },
    { value: "Stage", label: t('contact.sub_stage') }
  ], [t]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
        setLoading(false);
        setSent(true);
        setFormData({ user_name: '', user_email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 5000);
    }, (error) => {
        setLoading(false);
        console.error('EmailJS Error:', error);
        alert(`${t('contact.form_error')} ${error.text || JSON.stringify(error)}`);
    });
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
           <motion.span
             initial={{ opacity: 0, y: -10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-brand-blue font-bold tracking-widest text-xs uppercase mb-2 block"
           >{t('contact.label')}</motion.span>
           <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-extrabold tracking-tight"
           >{t('contact.title1')} <span className="text-brand-blue">{t('contact.title2')}</span></motion.h2>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="mt-4 text-text-muted max-w-2xl mx-auto"
           >{t('contact.desc')}</motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* EmailJS Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-10 md:p-12 relative overflow-hidden rounded-3xl w-full"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-blue" />
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="user_name" className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t('contact.form_name')}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue opacity-50" size={18} />
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      required
                      placeholder={t('contact.form_name_ph')}
                      value={formData.user_name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-glass-border bg-black/[0.03] dark:bg-white/[0.03] py-4 pl-12 pr-4 text-sm text-text-main outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="user_email" className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t('contact.form_email')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue opacity-50" size={18} />
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      required
                      placeholder={t('contact.form_email_ph')}
                      value={formData.user_email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-glass-border bg-black/[0.03] dark:bg-white/[0.03] py-4 pl-12 pr-4 text-sm text-text-main outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t('contact.form_subject')}</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-glass-border bg-black/[0.03] dark:bg-white/[0.03] py-4 px-4 text-sm text-text-main outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all cursor-pointer appearance-none"
                >
                  <option value="" className="bg-bg-main text-text-main">{t('contact.form_subject_select')}</option>
                  {subjects.map(s => (
                    <option key={s.value} value={s.value} className="bg-bg-main text-text-main">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t('contact.form_msg')}</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-brand-blue opacity-50" size={18} />
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    placeholder={t('contact.form_msg_ph')}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-glass-border bg-black/[0.03] dark:bg-white/[0.03] py-4 pl-12 pr-4 text-sm text-text-main outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || sent}
                className={`w-full flex items-center justify-center gap-3 rounded-xl py-5 font-bold transition-all shadow-xl ${
                  sent
                    ? "bg-brand-green text-white shadow-brand-green/20"
                    : "bg-slate-900 dark:bg-brand-blue text-white dark:text-slate-950 shadow-brand-blue/20 hover:scale-[1.01] active:scale-[0.99]"
                }`}
              >
                {loading ? (
                  t('contact.form_loading')
                ) : sent ? (
                  <>
                    <CheckCircle size={20} /> {t('contact.form_sent')}
                  </>
                ) : (
                  <>
                    <Send size={20} /> {t('contact.form_send')}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Quick Info & Availability */}
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Mail />,
                  label: "Email",
                  value: "tadjounteuaxel@gmail.com",
                  href: "mailto:tadjounteuaxel@gmail.com",
                  color: "text-brand-blue",
                  bg: "bg-brand-blue/5",
                },
                {
                  icon: <Phone />,
                  label: t('contact.phone'),
                  value: "+237 698 828 789 / 654 057 668",
                  href: "tel:+237698828789",
                  color: "text-brand-violet",
                  bg: "bg-brand-violet/5",
                },
                {
                  icon: <Linkedin />,
                  label: "LinkedIn",
                  value: "@axel-renaud",
                  href: "https://linkedin.com/in/axel-renaud-tadjounteu-ngongue",
                  color: "text-brand-blue",
                  bg: "bg-brand-blue/5",
                },
                {
                  icon: <Github />,
                  label: "GitHub",
                  value: "axeltadjounteu17",
                  href: "https://github.com/axeltadjounteu17",
                  color: "text-text-main",
                  bg: "bg-black/5 dark:bg-white/5",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glass p-6 rounded-2xl group border-transparent hover:border-brand-blue/20 transition-all flex flex-col items-start gap-4 h-full hover:-translate-y-1"
                >
                  <div
                    className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-text-main line-clamp-1">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="glass p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-brand-blue/5 to-transparent">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-brand-green font-bold text-xs uppercase tracking-widest mb-4">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  {t('contact.available_colab')}
                </div>
                <p className="text-text-muted leading-relaxed italic">
                  "{t('contact.intro_msg')}"
                </p>
              </div>
              <MapPin className="absolute -bottom-4 -right-4 w-32 h-32 text-brand-blue/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
