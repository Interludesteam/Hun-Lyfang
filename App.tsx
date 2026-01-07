
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  Briefcase, 
  Zap, 
  Star, 
  Target, 
  ChevronRight, 
  TrendingUp,
  Send
} from 'lucide-react';
import { 
  ACHIEVEMENTS, 
  VOLUNTEER_EXP, 
  INTERNSHIP_EXP, 
  CORE_SKILLS, 
  COMPUTER_SKILLS, 
  REFERENCES 
} from './constants';

const Navbar = ({ activeSection }: { activeSection: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'ACHIEVEMENTS', href: '#achievements' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full z-50 flex justify-center transition-all duration-500 ease-expo pt-4 md:pt-6 px-4 md:px-6 pointer-events-none">
      <div 
        className={`
          flex items-center justify-center px-6 md:px-10 py-2.5 md:py-3 pointer-events-auto
          transition-all duration-500 ease-expo relative overflow-hidden will-change-transform
          ${scrolled 
            ? 'w-auto bg-white/[0.08] backdrop-blur-[30px] rounded-full border border-white/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]' 
            : 'w-auto bg-transparent rounded-full border border-transparent'
          }
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

        <div className="hidden md:flex space-x-10 lg:space-x-12 relative z-10">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[9px] lg:text-[10px] font-bold tracking-[0.25em] transition-all duration-300 relative group uppercase ${activeSection === link.href.slice(1) ? 'text-yellow-400' : 'text-white/40 hover:text-white'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-yellow-400 transition-all duration-500 ${activeSection === link.href.slice(1) ? 'w-full shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
        </div>

        <div className="md:hidden relative z-10 flex items-center justify-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-yellow-400 transition-colors p-2" aria-label="Toggle Menu">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 w-full h-full bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center space-y-6 z-40 animate-in fade-in zoom-in duration-300 pointer-events-auto">
          {links.map((link, i) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-4xl sm:text-5xl font-black italic text-white hover:text-yellow-400 transform hover:scale-105 transition-all uppercase tracking-tighter"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
          <button onClick={() => setIsOpen(false)} className="mt-12 text-white/20 hover:text-white transition-colors">
            <X size={32} />
          </button>
        </div>
      )}
    </nav>
  );
};

const SectionHeading = ({ children, isVisible }: { children?: React.ReactNode, isVisible: boolean }) => (
  <div className={`mb-6 md:mb-12 transition-all duration-700 ease-expo transform will-change-transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
    <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter italic uppercase text-white leading-[0.9]">
      {children}
    </h2>
  </div>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const sections = ['home', 'about', 'skills', 'achievements', 'experience', 'contact'];
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          setVisibleSlides(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.25 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) return;
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - left;
      const centerX = width / 2;
      const offset = (relativeX - centerX) / 50;
      setParallaxOffset(offset);
    }
  };

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).pageX;
    setStartX(clientX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftState(scrollRef.current?.scrollLeft || 0);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.style.scrollSnapType = 'none';
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const moveDragging = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).pageX;
    const x = clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <div className="bg-black text-white selection:bg-yellow-400 selection:text-black snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth no-scrollbar">
      <Navbar activeSection={activeSection} />

      {/* HERO SECTION */}
      <section id="home" className="snap-start snap-always min-h-screen relative flex flex-col justify-center items-center overflow-hidden py-12">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.03] select-none transform-gpu">
          <span className="text-[18vw] font-black italic outline-text leading-none uppercase">INTERNATIONAL</span>
          <span className="text-[18vw] font-black italic outline-text leading-none uppercase">RELATIONS</span>
        </div>

        <div className={`container mx-auto px-6 relative z-10 text-center transition-all duration-1000 ease-expo will-change-transform ${visibleSlides.home ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[16vw] lg:text-[10vw] font-black italic leading-[0.85] tracking-tighter uppercase mb-6 md:mb-8">
              HUN <br />
              <span className="text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]">LYFANG</span>
            </h1>
            <p className="mx-auto max-w-xl text-base md:text-xl text-white/50 leading-relaxed font-medium mb-10 md:mb-12">
              <span className="text-white">First year student</span> majoring in <span className="text-white">International Relations</span> at IISPP. 
            </p>
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-white text-black px-10 md:px-14 py-4 md:py-6 font-black italic uppercase tracking-tighter flex items-center gap-3 hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_15px_30px_rgba(255,255,255,0.1)] hover:shadow-yellow-400/30"
              >
                DISCOVER MORE <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </a>
              <div className="flex items-center gap-6 md:gap-10 text-white/20">
                 <a href="mailto:Lyfang011@gmail.com" className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-125"><Mail size={22}/></a>
                 <a href="https://www.linkedin.com/in/hun-lyfang-4531073a5" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-125"><Linkedin size={22}/></a>
                 <a href="https://t.me/LyfangHun" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-125"><Send size={22}/></a>
                 <div className="flex items-center gap-2 text-[9px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/30">
                  <MapPin size={14} className="text-yellow-400/70"/> PHNOM PENH
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="snap-start snap-always min-h-screen py-24 bg-zinc-900/10 border-y border-white/5 relative flex flex-col justify-center">
        <div className={`container mx-auto px-6 transition-all duration-1000 ease-expo ${visibleSlides.about ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="transition-all duration-700 ease-expo">
              <SectionHeading isVisible={visibleSlides.about}>ABOUT ME</SectionHeading>
              <div className="space-y-4 md:space-y-6 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter leading-[1] text-white">
                <p className="leading-tight">
                  i'm a first year student <br />
                  majoring in <span className="text-yellow-400">international relations</span>
                </p>
              </div>
            </div>
            
            <div className={`grid grid-cols-2 gap-3 md:gap-6 transition-all duration-700 ease-expo delay-100 ${visibleSlides.about ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {[
                { icon: Target, title: 'IISPP', sub: 'Global Affairs' },
                { icon: Globe, title: 'DIPLOMACY', sub: 'Intl. Relations' },
                { icon: Zap, title: 'GOLD', sub: 'Medalist (WSC)' },
                { icon: Briefcase, title: 'STRATEGY', sub: 'Management' }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/30 p-5 md:p-8 lg:p-10 border border-white/5 flex flex-col justify-between aspect-square group hover:border-yellow-400/40 hover:bg-zinc-900/50 transition-all duration-500 transform hover:-translate-y-1">
                  <item.icon className="text-yellow-400 mb-4 md:mb-8 transition-transform group-hover:scale-110" size={32} />
                  <div>
                    <h4 className="text-lg md:text-2xl lg:text-3xl font-black italic leading-none mb-2 group-hover:text-yellow-400 transition-colors uppercase">{item.title}</h4>
                    <p className="text-[8px] md:text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="snap-start snap-always min-h-screen py-24 flex flex-col justify-center overflow-hidden">
        <div className={`container mx-auto px-6 w-full transition-all duration-1000 ease-expo ${visibleSlides.skills ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <SectionHeading isVisible={visibleSlides.skills}>skills</SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
            <div className="lg:col-span-8 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {CORE_SKILLS.map((skill, i) => (
                  <div key={skill.name} className="group transition-all duration-500">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-[10px] md:text-xs font-bold tracking-widest text-white/30 group-hover:text-white transition-colors uppercase">{skill.name}</span>
                      <span className="text-[10px] md:text-xs font-black italic text-yellow-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 overflow-hidden rounded-full">
                      <div 
                        className={`h-full bg-gradient-to-r from-white to-yellow-400 transition-all duration-1000 ease-expo will-change-[width]`} 
                        style={{ width: visibleSlides.skills ? `${skill.level}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-10">
              <div className="flex flex-wrap gap-2">
                {COMPUTER_SKILLS.map((tool) => (
                  <span key={tool} className="bg-white/5 border border-white/5 px-4 py-2 text-[9px] md:text-[10px] font-bold text-white/40 hover:text-black hover:bg-yellow-400 transition-all duration-300 uppercase tracking-widest">
                    {tool}
                  </span>
                ))}
              </div>
              <div className="p-8 border-l-2 border-yellow-400 bg-white/[0.03] group transition-all duration-500 hover:bg-white/[0.05]">
                <p className="text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase mb-6 italic">Language Proficiency</p>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl md:text-2xl font-black italic">ENGLISH</p>
                      <p className="text-[9px] text-yellow-400 font-bold uppercase tracking-widest">Advanced</p>
                    </div>
                    <TrendingUp className="text-yellow-400 opacity-30" size={20} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl md:text-2xl font-black italic">KHMER</p>
                      <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Native Speaker</p>
                    </div>
                    <Star className="text-yellow-400 opacity-30" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section 
        id="achievements" 
        className="snap-start snap-always min-h-screen py-24 bg-black relative overflow-hidden flex flex-col justify-center"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none py-8 transform-gpu">
          <div className="animate-marquee inline-block">
            <span className="text-7xl md:text-9xl font-black italic uppercase mx-4 text-yellow-400">WINNER CHAMPION MEDALIST FINALIST TOP TIER WINNER CHAMPION MEDALIST FINALIST TOP TIER</span>
          </div>
          <div className="animate-marquee2 inline-block">
            <span className="text-7xl md:text-9xl font-black italic uppercase mx-4 text-yellow-400">WINNER CHAMPION MEDALIST FINALIST TOP TIER WINNER CHAMPION MEDALIST FINALIST TOP TIER</span>
          </div>
        </div>

        <div className={`container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end relative z-10 gap-8 transition-all duration-1000 ease-expo ${visibleSlides.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeading isVisible={visibleSlides.achievements}>achievement</SectionHeading>
          <p className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase hidden md:block">Scroll to Explore</p>
        </div>
        
        <div 
          ref={containerRef}
          className={`relative z-10 transition-transform duration-700 ease-expo will-change-transform ${visibleSlides.achievements ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `translate3d(${-parallaxOffset}px, 0, 0)` }}
        >
          <div 
            ref={scrollRef}
            onMouseDown={startDragging}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
            onMouseMove={moveDragging}
            onTouchStart={startDragging}
            onTouchEnd={stopDragging}
            onTouchMove={moveDragging}
            className="flex overflow-x-auto gap-6 md:gap-10 px-6 md:px-[10vw] no-scrollbar pb-10 snap-x snap-mandatory cursor-grab active:cursor-grabbing transform-gpu"
          >
            {ACHIEVEMENTS.map((ach, idx) => (
              <div 
                key={idx} 
                className="min-w-[280px] md:min-w-[420px] snap-center bg-zinc-900/30 p-10 md:p-14 border border-white/5 hover:border-yellow-400/40 transition-all duration-500 group relative flex flex-col justify-between overflow-hidden will-change-transform"
              >
                <div className="absolute -bottom-6 -right-6 text-[8rem] md:text-[12rem] font-black italic text-white/[0.015] group-hover:text-yellow-400/[0.04] transition-colors leading-none pointer-events-none">
                  {idx + 1}
                </div>
                
                <div className="flex justify-between items-start mb-12 lg:mb-20">
                  <span className="text-5xl md:text-7xl font-black italic outline-text group-hover:text-yellow-400 transition-all duration-500">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="bg-yellow-400 text-black px-4 py-1 text-[9px] font-black italic tracking-widest transform -rotate-2 group-hover:rotate-0 transition-transform">
                    {ach.year}
                  </span>
                </div>
                
                <h4 className="text-xl md:text-3xl font-black italic leading-[1.1] uppercase tracking-tighter group-hover:text-white transition-colors mb-4 relative z-10">
                  {ach.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="snap-start snap-always min-h-screen py-24 relative flex flex-col justify-center">
        <div className={`container mx-auto px-6 w-full transition-all duration-1000 ease-expo ${visibleSlides.experience ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <SectionHeading isVisible={visibleSlides.experience}>EXPERIENCE</SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 md:mt-16">
            <div className="lg:col-span-8 space-y-16">
              <div className="relative pl-6 md:pl-8 border-l border-white/5">
                <div className="absolute -left-[3px] top-0 w-[5px] h-12 bg-yellow-400"></div>
                <h3 className="text-lg md:text-2xl font-black italic tracking-widest uppercase mb-10 text-yellow-400 flex items-center gap-4">
                  <Briefcase size={18} /> INTERNSHIP
                </h3>
                {INTERNSHIP_EXP.map((exp, i) => (
                  <div key={i} className="mb-12 group transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:justify-between mb-4 md:mb-6">
                      <div>
                        <h4 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter group-hover:text-yellow-400 transition-colors">
                          {exp.organization}
                        </h4>
                        <p className="text-white/20 font-bold tracking-widest text-[9px] uppercase mt-1">{exp.role} • {exp.location}</p>
                      </div>
                      <span className="text-[10px] font-black italic text-white/40 mt-2 md:mt-0 uppercase">{exp.period}</span>
                    </div>
                    <ul className="space-y-3">
                      {exp.description.map((desc, di) => (
                        <li key={di} className="text-white/40 text-sm md:text-lg flex gap-3 hover:text-white transition-colors leading-relaxed">
                          <span className="text-yellow-400 font-bold">»</span> {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="relative pl-6 md:pl-8 border-l border-white/5">
                <div className="absolute -left-[3px] top-0 w-[5px] h-12 bg-white/20"></div>
                <h3 className="text-lg md:text-2xl font-black italic tracking-widest uppercase mb-10 text-white/30 flex items-center gap-4">
                  <Globe size={18} /> VOLUNTEER
                </h3>
                {VOLUNTEER_EXP.map((exp, i) => (
                  <div key={i} className="mb-10 group transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter group-hover:text-yellow-400 transition-colors">{exp.organization}</h4>
                        <p className="text-white/20 font-bold tracking-widest text-[9px] uppercase mt-1">{exp.role}</p>
                      </div>
                      <span className="text-[10px] font-black italic text-white/30 mt-2 md:mt-0 uppercase">{exp.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <h3 className="text-lg md:text-xl font-black italic tracking-widest uppercase mb-8 text-yellow-400 flex items-center gap-3">
                <Target size={18} /> REFERENCES
              </h3>
              {REFERENCES.map((ref, i) => (
                <div key={i} className="p-6 bg-zinc-900/40 border border-white/5 group hover:border-yellow-400/40 transition-all duration-500">
                  <h5 className="text-lg md:text-xl font-black italic uppercase mb-1 group-hover:text-yellow-400 transition-colors">{ref.name}</h5>
                  <p className="text-[9px] font-bold text-yellow-400 uppercase mb-4 tracking-widest">{ref.title}</p>
                  <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest mb-6">{ref.org}</p>
                  <div className="space-y-2">
                    <a href={`tel:${ref.phone}`} className="flex items-center gap-3 text-[10px] font-bold text-white/40 hover:text-white transition-colors">
                      <Phone size={12} className="text-yellow-400/50" /> {ref.phone}
                    </a>
                    <a href={`mailto:${ref.email}`} className="flex items-center gap-3 text-[10px] font-bold text-white/40 hover:text-white transition-colors truncate">
                      <Mail size={12} className="text-yellow-400/50" /> {ref.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT SECTION */}
      <footer id="contact" className="snap-start snap-always min-h-screen bg-white text-black py-24 flex flex-col justify-center items-center">
        <div className={`container mx-auto px-6 w-full transition-all duration-1000 ease-expo ${visibleSlides.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 lg:gap-20 mb-20 md:mb-32">
            <div className="max-w-3xl">
              <p className="font-black italic text-[10px] tracking-[0.4em] uppercase mb-8 text-black/20">GET IN TOUCH</p>
              <h2 className="text-5xl md:text-[8vw] lg:text-[10vw] font-black italic leading-[0.85] tracking-tighter uppercase mb-4">
                LET'S BUILD <br />
                <span className="text-zinc-300">FUTURE</span> TOGETHER
              </h2>
            </div>
            <div className="space-y-8 lg:text-right w-full lg:w-auto">
              <div className="group">
                <p className="text-[10px] font-bold tracking-widest text-black/30 uppercase mb-2">Primary Inbox</p>
                <a href="mailto:Lyfang011@gmail.com" className="text-2xl md:text-5xl lg:text-6xl font-black italic underline decoration-2 underline-offset-8 hover:text-yellow-500 transition-all block break-all">
                  Lyfang011@gmail.com
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold tracking-widest text-black/30 uppercase">Location</p>
                <p className="text-lg md:text-xl font-black italic flex items-center lg:justify-end gap-2">
                  <MapPin size={20} className="text-yellow-600"/> PHNOM PENH, CAMBODIA
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8 w-full">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-black/20 text-center md:text-left">
              © 2026 HUN LYFANG. ALL RIGHTS RESERVED.
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] font-black tracking-[0.2em] uppercase">
              <a href="https://www.linkedin.com/in/hun-lyfang-4531073a5" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 transition-all flex items-center gap-2">LINKEDIN</a>
              <a href="https://www.instagram.com/litler_jews/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 transition-all flex items-center gap-2">INSTAGRAM</a>
              <a href="https://t.me/LyfangHun" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 transition-all flex items-center gap-2">TELEGRAM</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .ease-expo {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        @keyframes marquee2 {
          0% { transform: translate3d(100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 30s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        section {
          outline: none;
        }
        .transform-gpu {
          transform: translate3d(0,0,0);
        }
      `}</style>
    </div>
  );
};

export default App;
