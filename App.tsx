
import React, { useState, useEffect, useRef } from 'react';
import { 
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
} from './constants.tsx';

const Navbar = ({ activeSection }: { activeSection: string }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Determine if we are on the light (white) section
  const isLightSection = activeSection === 'contact';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobileOrTablet = window.innerWidth < 1024;

      setScrolled(currentScrollY > 20);

      if (isMobileOrTablet) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
      } else {
        setIsNavVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

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
    const element = document.querySelector(href);
    if (element) {
      const offset = 0;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] flex justify-center pt-4 md:pt-8 px-4 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isNavVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-12 opacity-0 scale-95'}`}>
      <div 
        className={`
          flex items-center gap-1 sm:gap-2 md:gap-3 px-3 sm:px-8 py-2 md:py-3 pointer-events-auto
          rounded-full relative overflow-hidden transition-all duration-700 border
          ${isLightSection 
            ? 'bg-black/90 border-black/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6)]' 
            : 'bg-white/[0.08] border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)]'}
          backdrop-blur-3xl
          ${scrolled ? 'scale-95' : 'scale-100'}
        `}
      >
        <div className={`absolute inset-0 bg-gradient-to-b ${isLightSection ? 'from-white/[0.15]' : 'from-white/[0.1]'} to-transparent pointer-events-none`}></div>
        
        {links.map(link => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`
                text-[6px] sm:text-[8px] md:text-[10px] font-black tracking-widest
                transition-all duration-500 relative group uppercase px-2 sm:px-4 py-2.5
                ${isActive 
                  ? 'text-yellow-400' 
                  : (isLightSection ? 'text-white/60 hover:text-white' : 'text-white/30 hover:text-white')}
              `}
            >
              <span className="relative z-10">{link.name}</span>
              <span className={`
                absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 md:h-1 rounded-full bg-yellow-400 
                transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                ${isActive
                  ? 'w-4 opacity-100 shadow-[0_0_15px_rgba(250,204,21,1)]' 
                  : 'w-0 opacity-0 group-hover:w-2 group-hover:opacity-40'}
              `}></span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

const SectionHeading = ({ children, isVisible }: { children?: React.ReactNode, isVisible: boolean }) => (
  <div className={`mb-8 md:mb-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
    <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter italic uppercase text-white leading-[0.85]">
      {children}
    </h2>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
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
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: [0.1, 0.3, 0.5],
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setActiveSection(entry.target.id);
          setVisibleSlides(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

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
      const offset = (relativeX - centerX) / 80;
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
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const moveDragging = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).pageX;
    const x = clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <div className={`bg-black text-white selection:bg-yellow-400 selection:text-black min-h-screen overflow-x-hidden scroll-smooth transition-colors duration-1000 font-inter`}>
      {/* Loading Overlay */}
      <div className={`fixed inset-0 z-[200] bg-black flex items-center justify-center transition-all duration-1000 ease-expo ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] font-black tracking-[0.5em] text-white/50 uppercase italic">HUN LYFANG</span>
        </div>
      </div>

      <Navbar activeSection={activeSection} />

      {/* HERO SECTION */}
      <section id="home" className="min-h-[100svh] relative flex flex-col justify-center items-center overflow-hidden py-12 px-4">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.04] select-none transform-gpu">
          <span className="text-[18vw] font-black italic outline-text leading-none uppercase">INTERNATIONAL</span>
          <span className="text-[18vw] font-black italic outline-text leading-none uppercase">RELATIONS</span>
        </div>

        <div className={`container mx-auto relative z-10 text-center transition-all duration-1000 ease-expo will-change-transform ${visibleSlides.home && !isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-[18vw] lg:text-[11vw] font-black italic leading-[0.8] tracking-tighter uppercase mb-8">
              HUN <br />
              <span className="text-yellow-400 drop-shadow-[0_0_40px_rgba(250,204,21,0.5)]">LYFANG</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base md:text-2xl text-white/60 leading-relaxed font-medium mb-12 px-4">
              <span className="text-white">First year student</span> majoring in <span className="text-white">International Relations</span> at IISPP, crafting global perspectives.
            </p>
            <div className="flex flex-col items-center gap-10">
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-white text-black px-12 md:px-16 py-5 md:py-8 font-black italic uppercase tracking-tighter flex items-center gap-4 hover:bg-yellow-400 transition-all duration-500 transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-yellow-400/40"
              >
                DISCOVER MORE <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform duration-500" />
              </a>
              <div className="flex items-center gap-8 md:gap-14 text-white/30">
                 <a href="mailto:Lyfang011@gmail.com" className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-125"><Mail size={24}/></a>
                 <a href="https://www.linkedin.com/in/hun-lyfang-4531073a5" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-125"><Linkedin size={24}/></a>
                 <a href="https://t.me/LyfangHun" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-125"><Send size={24}/></a>
                 <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/40">
                  <MapPin size={16} className="text-yellow-400/80"/> PHNOM PENH
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="min-h-screen py-32 bg-zinc-900/[0.05] border-y border-white/[0.03] relative flex flex-col justify-center">
        <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none"></div>
        <div className={`container mx-auto px-6 transition-all duration-[1200ms] ease-expo ${visibleSlides.about ? 'scale-100 opacity-100 translate-y-0' : 'scale-[0.98] opacity-0 translate-y-24'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="transition-all duration-700 ease-expo">
              <SectionHeading isVisible={visibleSlides.about}>ABOUT ME</SectionHeading>
              <div className="space-y-6 md:space-y-8 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-[0.95] text-white">
                <p className="leading-tight">
                  i'm a first year student <br />
                  pursuing <span className="text-yellow-400">international relations</span>
                </p>
                <p className="text-lg md:text-2xl font-medium normal-case italic text-white/40 tracking-normal leading-relaxed">
                  Dedicated to understanding the complexities of global diplomacy, policy-making, and cultural exchange.
                </p>
              </div>
            </div>
            
            <div className={`grid grid-cols-2 gap-4 md:gap-8 transition-all duration-1000 ease-expo delay-300 ${visibleSlides.about ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
              {[
                { icon: Target, title: 'IISPP', sub: 'Global Affairs' },
                { icon: Globe, title: 'DIPLOMACY', sub: 'Intl. Relations' },
                { icon: Zap, title: 'GOLD', sub: 'Medalist (WSC)' },
                { icon: Briefcase, title: 'STRATEGY', sub: 'Management' }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/40 p-6 md:p-12 border border-white/5 flex flex-col justify-between aspect-square group hover:border-yellow-400/50 hover:bg-zinc-900/70 transition-all duration-700 transform hover:-translate-y-3 rounded-sm">
                  <item.icon className="text-yellow-400 mb-6 md:mb-12 transition-transform group-hover:scale-110 group-hover:rotate-6" size={40} />
                  <div>
                    <h4 className="text-xl md:text-3xl font-black italic leading-none mb-3 group-hover:text-yellow-400 transition-colors uppercase">{item.title}</h4>
                    <p className="text-[9px] md:text-[11px] font-bold text-white/30 uppercase tracking-[0.3em]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="min-h-screen py-32 flex flex-col justify-center overflow-hidden">
        <div className={`container mx-auto px-6 w-full transition-all duration-[1200ms] ease-expo ${visibleSlides.skills ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'}`}>
          <SectionHeading isVisible={visibleSlides.skills}>skills</SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-8 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                {CORE_SKILLS.map((skill, i) => (
                  <div key={skill.name} className="group transition-all duration-500">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-[11px] md:text-xs font-black tracking-[0.3em] text-white/30 group-hover:text-white transition-colors uppercase">{skill.name}</span>
                      <span className="text-[11px] md:text-xs font-black italic text-yellow-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 overflow-hidden rounded-full">
                      <div 
                        className={`h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-[width]`} 
                        style={{ width: visibleSlides.skills ? `${skill.level}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12 transition-all duration-1000 delay-500">
              <div className="flex flex-wrap gap-3">
                {COMPUTER_SKILLS.map((tool) => (
                  <span key={tool} className="bg-white/5 border border-white/10 px-6 py-3 text-[10px] md:text-[11px] font-black text-white/50 hover:text-black hover:bg-yellow-400 transition-all duration-500 uppercase tracking-[0.2em] rounded-sm">
                    {tool}
                  </span>
                ))}
              </div>
              <div className="p-10 border-l-4 border-yellow-400 bg-white/[0.04] group transition-all duration-700 hover:bg-white/[0.08] shadow-2xl">
                <p className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase mb-8 italic">Language Proficiency</p>
                <div className="space-y-8">
                  <div className="flex justify-between items-center group/item">
                    <div>
                      <p className="text-2xl md:text-3xl font-black italic transition-colors group-hover/item:text-yellow-400">ENGLISH</p>
                      <p className="text-[10px] text-yellow-400/60 font-black uppercase tracking-widest mt-1">Advanced Level</p>
                    </div>
                    <TrendingUp className="text-yellow-400 opacity-20 group-hover/item:opacity-100 transition-opacity" size={28} />
                  </div>
                  <div className="flex justify-between items-center group/item">
                    <div>
                      <p className="text-2xl md:text-3xl font-black italic transition-colors group-hover/item:text-yellow-400">KHMER</p>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">Native Proficiency</p>
                    </div>
                    <Star className="text-yellow-400 opacity-20 group-hover/item:opacity-100 transition-opacity" size={28} />
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
        className="min-h-screen py-32 bg-black relative overflow-hidden flex flex-col justify-center"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.05] pointer-events-none py-12 transform-gpu">
          <div className="animate-marquee inline-block">
            <span className="text-8xl md:text-[12rem] font-black italic uppercase mx-8 text-yellow-400">WINNER CHAMPION MEDALIST FINALIST TOP TIER WINNER CHAMPION MEDALIST FINALIST TOP TIER</span>
          </div>
          <div className="animate-marquee2 inline-block">
            <span className="text-8xl md:text-[12rem] font-black italic uppercase mx-8 text-yellow-400">WINNER CHAMPION MEDALIST FINALIST TOP TIER WINNER CHAMPION MEDALIST FINALIST TOP TIER</span>
          </div>
        </div>

        <div className={`container mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end relative z-10 gap-8 transition-all duration-1000 ease-expo ${visibleSlides.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <SectionHeading isVisible={visibleSlides.achievements}>achievement</SectionHeading>
          <div className="flex flex-col items-end gap-2">
            <p className="text-[11px] font-black tracking-[0.5em] text-white/20 uppercase hidden md:block animate-pulse">Drag to Navigate</p>
            <div className="h-0.5 w-16 bg-yellow-400/20 rounded-full hidden md:block"></div>
          </div>
        </div>
        
        <div 
          ref={containerRef}
          className={`relative z-10 transition-transform duration-[1200ms] ease-expo will-change-transform ${visibleSlides.achievements ? 'opacity-100' : 'opacity-0'}`}
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
            className="flex overflow-x-auto gap-8 md:gap-14 px-6 md:px-[10vw] no-scrollbar pb-16 cursor-grab active:cursor-grabbing transform-gpu"
          >
            {ACHIEVEMENTS.map((ach, idx) => (
              <div 
                key={idx} 
                className="min-w-[300px] md:min-w-[480px] bg-zinc-900/40 p-12 md:p-20 border border-white/5 hover:border-yellow-400/50 transition-all duration-700 group relative flex flex-col justify-between overflow-hidden will-change-transform rounded-sm shadow-2xl"
              >
                <div className="absolute -bottom-8 -right-8 text-[12rem] md:text-[18rem] font-black italic text-white/[0.02] group-hover:text-yellow-400/[0.06] transition-all leading-none pointer-events-none">
                  {idx + 1}
                </div>
                
                <div className="flex justify-between items-start mb-16 lg:mb-24">
                  <span className="text-6xl md:text-8xl font-black italic outline-text group-hover:text-yellow-400 transition-all duration-700">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="bg-yellow-400 text-black px-6 py-2 text-[10px] md:text-xs font-black italic tracking-[0.2em] transform -rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-xl">
                    {ach.year}
                  </span>
                </div>
                
                <h4 className="text-2xl md:text-4xl lg:text-5xl font-black italic leading-[1.05] uppercase tracking-tighter group-hover:text-white transition-colors mb-6 relative z-10">
                  {ach.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="min-h-screen py-32 relative flex flex-col justify-center">
        <div className={`container mx-auto px-6 w-full transition-all duration-[1200ms] ease-expo ${visibleSlides.experience ? 'scale-100 opacity-100 translate-y-0' : 'scale-[0.98] opacity-0 translate-y-24'}`}>
          <SectionHeading isVisible={visibleSlides.experience}>EXPERIENCE</SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-12 md:mt-24">
            <div className="lg:col-span-8 space-y-24">
              <div className="relative pl-8 md:pl-12 border-l-2 border-white/10">
                <div className="absolute -left-[5px] top-0 w-[8px] h-16 bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]"></div>
                <h3 className="text-xl md:text-3xl font-black italic tracking-[0.4em] uppercase mb-16 text-yellow-400 flex items-center gap-6">
                  <Briefcase size={28} /> INTERNSHIP
                </h3>
                {INTERNSHIP_EXP.map((exp, i) => (
                  <div key={i} className="mb-16 group transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:justify-between mb-6 md:mb-10 items-start">
                      <div className="max-w-xl">
                        <h4 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter group-hover:text-yellow-400 transition-all duration-500 mb-2">
                          {exp.organization}
                        </h4>
                        <p className="text-white/40 font-black tracking-[0.3em] text-[10px] md:text-xs uppercase">{exp.role} • {exp.location}</p>
                      </div>
                      <span className="text-xs font-black italic text-white/40 mt-4 md:mt-0 uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">{exp.period}</span>
                    </div>
                    <ul className="space-y-5">
                      {exp.description.map((desc, di) => (
                        <li key={di} className="text-white/50 text-base md:text-xl flex gap-5 hover:text-white transition-all duration-500 leading-relaxed group/li">
                          <span className="text-yellow-400 font-bold shrink-0 transition-transform group-hover/li:translate-x-1">»</span> <span className="font-medium">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="relative pl-8 md:pl-12 border-l-2 border-white/10 transition-all duration-1000 delay-300">
                <div className="absolute -left-[5px] top-0 w-[8px] h-16 bg-white/30"></div>
                <h3 className="text-xl md:text-3xl font-black italic tracking-[0.4em] uppercase mb-16 text-white/30 flex items-center gap-6">
                  <Globe size={28} /> VOLUNTEER
                </h3>
                {VOLUNTEER_EXP.map((exp, i) => (
                  <div key={i} className="mb-12 group transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:justify-between mb-6 items-start">
                      <div>
                        <h4 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter group-hover:text-yellow-400 transition-all duration-500 mb-1">{exp.organization}</h4>
                        <p className="text-white/30 font-black tracking-[0.2em] text-[10px] md:text-xs uppercase">{exp.role}</p>
                      </div>
                      <span className="text-xs font-black italic text-white/30 mt-4 md:mt-0 uppercase">{exp.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12 transition-all duration-1000 delay-600">
              <h3 className="text-xl md:text-2xl font-black italic tracking-[0.3em] uppercase mb-12 text-yellow-400 flex items-center gap-4">
                <Target size={24} /> REFERENCES
              </h3>
              {REFERENCES.map((ref, i) => (
                <div key={i} className="p-8 bg-zinc-900/50 border border-white/5 group hover:border-yellow-400/50 transition-all duration-700 rounded-sm shadow-xl backdrop-blur-sm">
                  <h5 className="text-xl md:text-2xl font-black italic uppercase mb-2 group-hover:text-yellow-400 transition-colors">{ref.name}</h5>
                  <p className="text-[10px] font-black text-yellow-400/80 uppercase mb-5 tracking-[0.3em]">{ref.title}</p>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em] mb-8 border-t border-white/5 pt-4">{ref.org}</p>
                  <div className="space-y-4">
                    <a href={`tel:${ref.phone}`} className="flex items-center gap-4 text-[11px] md:text-xs font-black text-white/40 hover:text-white transition-all duration-500">
                      <Phone size={16} className="text-yellow-400/60" /> {ref.phone}
                    </a>
                    <a href={`mailto:${ref.email}`} className="flex items-center gap-4 text-[11px] md:text-xs font-black text-white/40 hover:text-white transition-all duration-500 truncate">
                      <Mail size={16} className="text-yellow-400/60" /> {ref.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT SECTION - WHITE BACKGROUND */}
      <footer id="contact" className="min-h-screen bg-white text-black py-32 flex flex-col justify-center items-center relative overflow-hidden">
        <div className={`container mx-auto px-6 w-full transition-all duration-[1200ms] ease-expo ${visibleSlides.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 lg:gap-32 mb-24 md:mb-48">
            <div className="max-w-4xl">
              <p className="font-black italic text-[11px] tracking-[0.6em] uppercase mb-10 text-black/30">LET'S CONNECT</p>
              <h2 className="text-6xl md:text-[9vw] lg:text-[11vw] font-black italic leading-[0.75] tracking-tighter uppercase mb-6">
                BUILD THE <br />
                <span className="text-zinc-200">FUTURE</span> TOGETHER
              </h2>
            </div>
            <div className="space-y-16 lg:text-right w-full lg:w-auto">
              <div className="group">
                <p className="text-[11px] font-black tracking-[0.4em] text-black/30 uppercase mb-6">Primary Inbox</p>
                <a href="mailto:Lyfang011@gmail.com" className="text-2xl md:text-5xl lg:text-7xl font-black italic underline decoration-[1px] md:decoration-[2px] underline-offset-[16px] md:underline-offset-[24px] hover:text-yellow-600 transition-all duration-700 block break-all decoration-zinc-200 hover:decoration-yellow-600">
                  Lyfang011@gmail.com
                </a>
              </div>
              <div className="space-y-3">
                <p className="text-[11px] font-black tracking-[0.4em] text-black/30 uppercase">Location Base</p>
                <p className="text-xl md:text-3xl font-black italic flex items-center lg:justify-end gap-3">
                  <MapPin size={28} className="text-yellow-600"/> PHNOM PENH, CAMBODIA
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-10 w-full">
            <p className="text-[11px] font-black tracking-[0.5em] uppercase text-black/30 text-center md:text-left">
              © 2026 HUN LYFANG. ENGINEERED FOR EXCELLENCE.
            </p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-16 text-[11px] font-black tracking-[0.3em] uppercase">
              <a href="https://www.linkedin.com/in/hun-lyfang-4531073a5" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 transition-all flex items-center gap-2">LINKEDIN</a>
              <a href="https://www.instagram.com/litler_jews/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 transition-all flex items-center gap-2">INSTAGRAM</a>
              <a href="https://t.me/LyfangHun" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 transition-all flex items-center gap-2">TELEGRAM</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }

        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

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
          animation: marquee 50s linear infinite;
        }
        
        .animate-marquee2 {
          animation: marquee2 50s linear infinite;
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

        .outline-text {
          -webkit-text-stroke: 1.5px rgba(250, 204, 21, 0.3);
          color: transparent;
        }

        ::selection {
          background: #facc15;
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default App;
