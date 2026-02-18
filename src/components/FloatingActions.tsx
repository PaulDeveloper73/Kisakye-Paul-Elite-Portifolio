
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, Download, ChevronUp } from 'lucide-react';

const FloatingActions: React.FC = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoTop(window.pageYOffset > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call',
      href: 'tel:+256756507952',
      color: 'bg-accent',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      href: 'mailto:kisakyepaul73@gmail.com',
      color: 'bg-accent3',
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'WhatsApp',
      href: 'https://wa.me/256774185964',
      color: 'bg-green-500',
    },
    {
      icon: <Download className="w-5 h-5" />,
      label: 'Download CV',
      href: '/files/KisakyePaul_CV.pdf',
      color: 'bg-accent2',
      download: true,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-center gap-3 no-print">
      {/* Go to Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 rounded-full glass border-accent/20 flex items-center justify-center text-accent shadow-accent transition-all duration-300 transform ${
          showGoTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-50 pointer-events-none'
        } hover:scale-110 active:scale-95 group relative mb-2`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
        <span className="absolute right-full mr-3 px-2 py-1 rounded bg-bg1 border border-accent/20 text-[10px] font-black uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Top
        </span>
      </button>

      {/* Contact Actions */}
      <div className="flex flex-col gap-3">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            target={action.href.startsWith('http') ? '_blank' : undefined}
            rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            download={action.download}
            className={`w-12 h-12 rounded-full ${action.color} text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group relative animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
            aria-label={action.label}
          >
            {action.icon}
            <span className="absolute right-full mr-3 px-2 py-1 rounded bg-bg1 border border-accent/20 text-[10px] font-black uppercase tracking-widest text-ink/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {action.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FloatingActions;
