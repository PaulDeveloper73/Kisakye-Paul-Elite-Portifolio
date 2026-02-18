
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { 
  Search, Rocket, Book, ShieldCheck, Github, Zap, Cpu,
  MessageCircle, Phone, Globe, Smartphone, Database, Mail, 
  CheckCircle, ArrowRight, Monitor, Server, Lock,
  ChevronLeft, ChevronRight, AlertCircle, Sun, Moon, GraduationCap,
  Play, Quote, Send, Calendar, Star, Award, Layout, Box, Layers, Code, Briefcase,
  Users, TrendingUp, Activity, BarChart3
} from 'lucide-react';
import { MODULES, PROJECTS, EDUCATION, TECH_STACK, TESTIMONIALS, CLIENT_STATS } from './data';
import LessonItem from './components/LessonItem';
import StatCounter from './components/StatCounter';
import FloatingActions from './components/FloatingActions';
import TestimonialCarousel from './components/TestimonialCarousel';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Icon Mapping for Tech Stack
  const iconMap: any = { Globe, Smartphone, Database, Cpu, ShieldCheck, Server, Zap, Box, Layers };

  // Icon Mapping for Stats
  const statIcons: any = {
    st1: <Box className="w-5 h-5" />,
    st2: <TrendingUp className="w-5 h-5" />,
    st3: <Activity className="w-5 h-5" />,
    st4: <BarChart3 className="w-5 h-5" />,
  };

  // Theme management
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Scroll Progress & reveal animation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);

      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px',
      threshold: 0
    };

    const sections = ['hero', 'about', 'portfolio', 'experience', 'technologies', 'background', 'academy', 'testimonials', 'contact'];
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormState('success');
      setTimeout(() => setFormState('idle'), 6000);
    } catch (err) {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  const moveCarousel = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCarouselIndex((prev) => (prev + 1) % PROJECTS.length);
    } else {
      setCarouselIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => moveCarousel('next'), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 bg-bg0 text-ink selection:bg-accent selection:text-white transition-colors duration-400">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="gridlines fixed inset-0 pointer-events-none" aria-hidden="true" />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-accent z-[210] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      {/* Floating Action Buttons */}
      <FloatingActions />

      {/* Header */}
      <header className="sticky top-0 z-[110] glass border-b border-accent/10 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-accent via-accent2 to-accent3 p-[2px] shadow-sm group-hover:scale-105 transition-all duration-300 overflow-hidden">
               <img 
                 src="../img/kisakye-paul-software-expert.jpg" 
                 alt="KP" 
                 className="w-full h-full object-cover rounded-full" 
               />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl leading-none tracking-tight">Kisakye Paul</h1>
              <p className="text-[10px] text-accent font-black uppercase tracking-[0.25em] mt-1.5">Software Expert</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            {[
              { label: 'Work', id: 'portfolio' },
              { label: 'Journey', id: 'experience' },
              { label: 'Tools', id: 'technologies' },
              { label: 'Education', id: 'background' },
              { label: 'Academy', id: 'academy' },
              { label: 'Contact', id: 'contact' }
            ].map(link => (
              <a 
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                  activeSection === link.id ? 'text-accent bg-accent/10' : 'text-ink/50 hover:text-accent hover:bg-accent/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-2xl glass hover:bg-accent/10 transition-all text-accent border border-accent/20"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hidden md:flex px-7 py-3 rounded-2xl bg-accent text-white font-black text-[12px] uppercase tracking-[0.15em] shadow-accent hover:shadow-accent-lg hover:scale-105 transition-all active:scale-95"
            >
              Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden pt-2 pb-20 md:pt- md:pb-40 px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left reveal active">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-accent/5 border border-accent/20 backdrop-blur-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <span className="text-[11px] font-black text-accent/80 uppercase tracking-[0.2em]">Ready for work</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tighter">
              I Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent2 to-accent3">Apps</span> <br />
              That Grow Your Business.
            </h1>
            
            <p className="text-lg md:text-2xl text-ink/40 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              I make fast and safe apps for web and mobile. They work well and help your business scale.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <button 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="px-12 py-6 rounded-3xl bg-accent text-white font-black hover:scale-105 active:scale-95 transition-all shadow-accent-lg flex items-center gap-4 text-sm uppercase tracking-[0.2em]"
              >
                Hire Me Now <Rocket className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => scrollToSection(e, 'portfolio')}
                className="px-12 py-6 rounded-3xl glass hover:bg-accent/10 hover:border-accent/40 transition-all font-black text-sm uppercase tracking-[0.2em] shadow-sm"
              >
                My Work
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative reveal active">
            <div className="relative animate-float">
               <div className="relative glass rounded-[3rem] aspect-square p-6 border-accent/30 shadow-2xl overflow-hidden group">
                  <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-bg1">
                     <img 
                       src="../img/kisakye-paul-software-expert.jpg" 
                       alt="Kisakye Paul" 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 contrast-[1.05]"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent mix-blend-overlay" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-6 bg-accent/[0.02] border-y border-accent/10">
        <div className="max-w-[1440px] mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 reveal active">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight">About Me.</h2>
              <p className="text-xl text-ink/60 leading-relaxed font-medium">
                I build top-quality apps for big companies. I use the latest tools to solve real business problems. I work fast and make sure your app is safe.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="glass p-8 rounded-card border-accent/20 hover:border-accent/40 transition-all">
                   <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                      <Layout className="w-6 h-6" />
                   </div>
                   <h4 className="text-ink font-black text-lg mb-2">Websites</h4>
                   <p className="text-ink/60 text-sm font-medium">I build beautiful and fast websites that users love.</p>
                </div>
                <div className="glass p-8 rounded-card border-accent/20 hover:border-accent/40 transition-all">
                   <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                      <Layers className="w-6 h-6" />
                   </div>
                   <h4 className="text-ink font-black text-lg mb-2">Systems</h4>
                   <p className="text-ink/60 text-sm font-medium">I build strong systems that manage your data safely.</p>
                </div>
              </div>
            </div>
            <div className="reveal active">
              <div className="relative group cursor-pointer shadow-accent-lg rounded-section overflow-hidden aspect-video">
                <img 
                   src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
                   alt="Work Process"
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-20 h-20 rounded-full bg-accent text-white flex items-center justify-center shadow-accent transition-transform group-hover:scale-110">
                      <Play className="w-8 h-8 fill-current" />
                   </div>
                </div>
                <div className="absolute bottom-8 left-8 text-white z-10">
                   <h3 className="text-3xl font-black">Watch My Story</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-accent/[0.04]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
           {CLIENT_STATS.map(stat => (
             <div key={stat.id} className="reveal active">
               <StatCounter 
                 value={stat.value} 
                 suffix={stat.suffix} 
                 label={stat.label} 
                 duration={2000}
                 icon={statIcons[stat.id as keyof typeof statIcons]}
               />
             </div>
           ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-28 px-6 border-b border-accent/10">
        <div className="max-w-[1440px] mx-auto space-y-16">
          <div className="text-center space-y-5 reveal active">
             <h2 className="text-6xl md:text-9xl font-black tracking-tighter">My Projects.</h2>
             <p className="text-xl md:text-2xl text-ink/30 font-medium max-w-3xl mx-auto">Here are some apps I built. They work well and help people.</p>
          </div>

          <div className="relative reveal active">
            <div className="relative glass rounded-section overflow-hidden shadow-2xl border-accent/30 group/carousel bg-bg1">
               <div 
                 className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                 style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
               >
                 {PROJECTS.map((project) => (
                   <div key={project.id} className="w-full shrink-0 relative h-[550px] md:h-[750px] overflow-hidden group">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 max-w-[240px] md:max-w-[320px]">
                        <div className="glass p-5 md:p-6 rounded-[1.5rem] backdrop-blur-xl bg-white/10 dark:bg-black/40 border border-white/20 shadow-2xl transform transition-all duration-500 group-hover:bg-white/15 dark:group-hover:bg-black/50 group-hover:-translate-y-1">
                           <div className="text-right space-y-2">
                              <span className="inline-block px-2.5 py-1 rounded-full bg-accent text-[9px] font-black uppercase tracking-widest text-white shadow-lg mb-1">{project.category}</span>
                              <h3 className="text-lg md:text-2xl font-black text-white drop-shadow-md leading-tight">{project.title}</h3>
                              <p className="text-[10px] md:text-xs text-white/90 font-medium leading-relaxed">{project.description}</p>
                              <div className="flex flex-wrap justify-end gap-1.5 pt-2">
                                {project.tech.slice(0, 3).map(t => (
                                  <span key={t} className="text-[8px] font-mono font-bold bg-white/20 px-2 py-1 rounded-lg text-white border border-white/10 backdrop-blur-md">{t}</span>
                                ))}
                              </div>
                              <div className="pt-3 flex justify-end">
                                 <button className="flex items-center gap-2 text-white font-black text-[9px] uppercase tracking-widest hover:text-accent2 transition-colors">
                                    Details <ArrowRight className="w-3 h-3" />
                                 </button>
                              </div>
                           </div>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
               <div className="absolute bottom-8 right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 flex gap-3 z-30">
                  <button onClick={() => moveCarousel('prev')} className="w-12 h-12 md:w-16 md:h-16 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all shadow-2xl active:scale-90">
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                  <button onClick={() => moveCarousel('next')} className="w-12 h-12 md:w-16 md:h-16 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all shadow-2xl active:scale-90">
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-28 px-6 bg-accent/[0.03]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="space-y-12 reveal active">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter">My Journey.</h2>
              <p className="text-xl text-ink/30 font-medium">I have built big apps for over 7 years. I make sure they work for everyone.</p>
              <div className="grid grid-cols-1 gap-8">
                 {[
                   { title: 'AI Helper', desc: 'I use AI to make apps work smarter and faster.', icon: Zap },
                   { title: 'Safe Design', desc: 'I keep your data safe with strong security.', icon: Lock },
                   { title: 'Modern Tools', desc: 'I use the best tools to build apps that can grow.', icon: Box }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-8 items-start group">
                      <div className="w-16 h-16 rounded-[1.5rem] glass border-accent/30 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                         <item.icon className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                         <h4 className="text-3xl font-black mb-1 group-hover:text-accent transition-colors tracking-tight">{item.title}</h4>
                         <p className="text-lg text-ink/40 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="glass p-12 rounded-section border-accent/30 shadow-2xl bg-gradient-to-br from-accent/[0.05] to-transparent reveal active relative overflow-hidden">
              <h3 className="text-4xl font-black mb-8 tracking-tight">Performance.</h3>
              <p className="text-ink/40 text-xl mb-12">I build apps that load fast and stay online always.</p>
              <div className="space-y-10">
                 {[
                   { label: 'Speed Score', val: 99, color: 'bg-accent' },
                   { label: 'Security Score', val: 98, color: 'bg-accent3' },
                   { label: 'Happy Users', val: 95, color: 'bg-accent2' }
                 ].map(s => (
                   <div key={s.label} className="space-y-4">
                      <div className="flex justify-between text-[12px] font-black uppercase tracking-[0.25em] text-ink/40">
                         <span>{s.label}</span>
                         <span className="text-accent">{s.val}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-accent/10 rounded-full overflow-hidden shadow-inner">
                         <div className={`h-full ${s.color} transition-all duration-[2000ms] shadow-sm`} style={{ width: `${s.val}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
              <button 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="w-full mt-14 py-6 rounded-3xl bg-accent text-white font-black text-xs uppercase tracking-[0.25em] shadow-accent hover:shadow-accent-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                Start Your Project
              </button>
           </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-28 px-6 border-b border-accent/10">
        <div className="max-w-[1440px] mx-auto space-y-20">
          <div className="text-center space-y-5 reveal active">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-accent/20 mb-4">
                <Code className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest text-accent/80">Skills & Expertise</span>
             </div>
             <h2 className="text-5xl md:text-8xl font-black tracking-tighter">Tools I Use.</h2>
             <p className="text-xl text-ink/40 font-medium max-w-2xl mx-auto">Full-stack mastery including PHP, SQL, Laravel, and modern React workflows.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {TECH_STACK.map((category) => {
              const IconComp = iconMap[category.icon];
              return (
                <div key={category.title} className="glass p-8 rounded-[2rem] hover:border-accent hover:shadow-accent transition-all group border-accent/20 reveal active relative overflow-hidden flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black leading-tight">{category.title}</h3>
                  </div>
                  <div className="flex flex-col gap-4 mt-auto">
                    {category.skills.map(skill => (
                      <div key={skill} className="w-full">
                         <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[12px] font-bold text-ink/70 dark:text-ink/80 group-hover:text-ink transition-colors">{skill}</span>
                            <CheckCircle className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                         <div className="h-1.5 w-full bg-accent/5 rounded-full overflow-hidden">
                            <div className="h-full bg-accent/30 w-full group-hover:bg-accent transition-all duration-700 opacity-40 group-hover:opacity-100" style={{width: '92%'}} />
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education & Qualifications */}
      <section id="background" className="py-28 px-6 bg-accent/[0.02] border-b border-accent/10">
        <div className="max-w-[1440px] mx-auto space-y-20">
          <div className="text-center space-y-5 reveal active">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter">Education.</h2>
          </div>
          <div className="max-w-5xl mx-auto space-y-12 reveal active">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="relative pl-12 md:pl-24 group">
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent group-last:h-8">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-bg0 bg-accent shadow-accent animate-pulse-slow" />
                </div>
                <div className="glass p-10 rounded-[2.5rem] border-accent/20 hover:border-accent/50 transition-all shadow-xl group/card relative overflow-hidden">
                   <h3 className="text-3xl font-black text-ink mb-2 group-hover/card:text-accent transition-colors">{edu.institution}</h3>
                   <p className="text-xl text-accent/60 font-black mb-4">{edu.qualification}</p>
                   <p className="text-ink/40 font-medium leading-relaxed max-w-2xl">{edu.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Section */}
      <section id="academy" className="py-28 px-6">
        <div className="max-w-[1440px] mx-auto space-y-16">
          <div className="text-center space-y-5 reveal active">
            <div className="px-5 py-2 rounded-full border border-accent/30 bg-accent/5 inline-block mx-auto mb-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-accent">Educational Resources</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter">React Mastery.</h2>
            <p className="text-xl text-ink/30 font-medium max-w-3xl mx-auto">A production-grade roadmap: daily plans, exercises, project specs, and deployment walkthroughs.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 reveal active">
            <aside className="hidden lg:block">
              <nav className="sticky top-28 space-y-3">
                <div className="glass rounded-[2.5rem] p-6 border-accent/20 shadow-xl overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                      <Book className="w-32 h-32 text-accent rotate-12" />
                   </div>
                   <h4 className="text-xs font-black uppercase tracking-[0.2em] text-accent/60 mb-6 pl-2">Curriculum Map</h4>
                   <div className="space-y-2">
                    {MODULES.map(m => (
                      <button 
                        key={m.id} 
                        onClick={(e) => scrollToSection(e, m.id)}
                        className={`w-full text-left px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-between group ${
                          activeSection === m.id ? 'bg-accent text-white shadow-accent' : 'text-ink/40 hover:bg-accent/10 hover:text-accent'
                        }`}
                      >
                        <span className="truncate">{m.title.includes('—') ? m.title.split('—')[1].trim() : m.title}</span>
                        <ArrowRight className={`w-3 h-3 transition-opacity ${activeSection === m.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                      </button>
                    ))}
                   </div>
                </div>
              </nav>
            </aside>
            
            <div className="space-y-24">
              {MODULES.map(module => (
                <div key={module.id} id={module.id} className="scroll-mt-32 space-y-12 reveal">
                  <div className="border-b border-accent/10 pb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6 relative">
                    <div className="space-y-3">
                       <div className="flex items-center gap-3">
                          <span className="w-8 h-px bg-accent/40" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/60">Professional Module</span>
                       </div>
                       <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-none">{module.title}</h3>
                       <p className="text-lg text-ink/40 font-medium max-w-2xl">{module.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="text-xs font-mono font-bold text-accent px-6 py-2 bg-accent/10 border border-accent/20 rounded-2xl shadow-sm self-start md:self-auto">{module.countLabel}</span>
                       <span className="text-[9px] font-black uppercase tracking-widest text-ink/20 hidden md:block">Reference ID: {module.id}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {module.lessons.map(l => (
                      <LessonItem key={l.id} lesson={l} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-28 px-6 border-y border-accent/10 bg-accent/[0.01]">
        <div className="max-w-[1440px] mx-auto space-y-16">
          <div className="text-center space-y-5 reveal">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter">Reviews.</h2>
          </div>
          
          <div className="reveal">
            <TestimonialCarousel testimonials={TESTIMONIALS} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-24">
          <div className="space-y-16 reveal active">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">Let's <br /><span className="text-accent">Build</span>.</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-8 glass p-8 rounded-[2rem] border-accent/10 group cursor-pointer hover:border-accent/50 transition-all shadow-xl" onClick={() => window.open('https://wa.me/256774185964')}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-accent text-white group-hover:bg-accent2 transition-all">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[11px] uppercase font-black text-accent tracking-[0.25em] mb-1.5">WhatsApp</div>
                  <div className="text-2xl font-black tracking-tight">+256 774 185 964</div>
                </div>
              </div>
              <div className="flex items-center gap-8 glass p-8 rounded-[2rem] border-accent/10 group cursor-pointer hover:border-accent/50 transition-all shadow-xl" onClick={() => window.open('mailto:kisakyepaul73@gmail.com')}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-accent text-white group-hover:bg-accent2 transition-all">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[11px] uppercase font-black text-accent tracking-[0.25em] mb-1.5">Email</div>
                  <div className="text-2xl font-black tracking-tight">kisakyepaul73@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="glass p-12 rounded-[3rem] shadow-accent-lg border-accent/30 relative reveal active overflow-hidden">
             <h3 className="text-4xl font-black mb-10 tracking-tight">Talk To Me.</h3>
             <form className="space-y-8" onSubmit={handleFormSubmit}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <input required type="text" className="w-full glass bg-transparent border-accent/20 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-all text-ink placeholder:text-ink/20 font-medium" placeholder="Your name" />
                 <input required type="email" className="w-full glass bg-transparent border-accent/20 rounded-2xl px-6 py-4 outline-none focus:border-accent transition-all text-ink placeholder:text-ink/20 font-medium" placeholder="Your email" />
               </div>
               <textarea required rows={5} className="w-full glass bg-transparent border-accent/20 rounded-[2rem] px-6 py-6 outline-none focus:border-accent transition-all resize-none text-ink placeholder:text-ink/20 font-medium" placeholder="How can I help you?"></textarea>
               <button type="submit" className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm transition-all shadow-xl active:scale-[0.98] ${formState === 'success' ? 'bg-green-500 text-white' : 'bg-accent text-white hover:shadow-accent-lg'}`}>
                 {formState === 'idle' && 'Send Message'}
                 {formState === 'submitting' && 'Sending...'}
                 {formState === 'success' && 'Message Received'}
               </button>
             </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-accent/20 py-24 px-6 mt-16 text-center">
        <div className="max-w-[1440px] mx-auto space-y-8">
          <div className="flex items-center justify-center gap-5">
             <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                <img src="../img/kisakye-paul-software-expert.jpg" alt="KP" className="w-full h-full object-cover" />
             </div>
             <div className="text-left">
               <h4 className="font-black text-3xl tracking-tighter">Kisakye Paul</h4>
               <p className="text-[11px] text-accent/60 font-black uppercase tracking-[0.25em]">Software Expert</p>
             </div>
          </div>
          <p className="text-[12px] text-ink/30 font-bold uppercase tracking-[0.2em]">© 2025 Kisakye Paul. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
