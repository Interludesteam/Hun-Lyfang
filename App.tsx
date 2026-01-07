
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Award, 
  Zap, 
  Globe, 
  Briefcase, 
  Layers, 
  Star, 
  Target, 
  ChevronRight, 
  TrendingUp,
  Send,
  Instagram
} from 'lucide-react';
import { 
  ACHIEVEMENTS, 
  VOLUNTEER_EXP, 
  INTERNSHIP_EXP, 
  SCHOOL_CLUBS, 
  CORE_SKILLS, 
  COMPUTER_SKILLS, 
  REFERENCES 
} from './constants';

const Navbar = ({ activeSection }: { activeSection: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
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
    <nav className="fixed w-full z-50 flex justify-center transition-all duration-700 ease-expo pt-6 px-6 pointer-events-none">
      <div 
        className={`
          flex items-center justify-center px-10 py-3 pointer-events-auto
          transition-all duration-700 ease-expo relative overflow-hidden
          ${scrolled 
            ? 'w-auto bg-white/[0.05] backdrop-blur-[40px] rounded-full border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.3)]' 
            : 'w-auto bg-white/[0.02] backdrop-blur-[10px] rounded-full border border-white/5'
          }
        `}
      >
        {/* Glossy Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none"></div>
        
        {/* Top Edge specular highlight like the reference image */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <div className="hidden md:flex space-x-12 relative z-10">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[10px] font-bold tracking-[0.3em] transition-all duration-500 relative group uppercase ${activeSection === link.href.slice(1) ? 'text-yellow-400' : 'text-white/40 hover:text-white'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-yellow-400 transition-all duration-500 ${activeSection === link.href.slice(1) ? 'w-full shadow-[0_0_15px_rgba(250,204,21,1)]' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
        </div>

        <div className="md:hidden relative z-10 flex items-center justify-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-yellow-400 transition-colors p-1">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/98 backdrop-blur-3xl flex flex-col justify-center items-center space-y-8 z-40 animate-in fade-in zoom-in duration-500 pointer-events-auto">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-5xl font-black italic text-white hover:text-yellow-400 transform hover:scale-110 transition-all uppercase tracking-tighter"
            >
              {link.name}
            </a>
          ))}
          <button onClick={() => setIsOpen(false)} className="mt-16 text-zinc-600 hover:text-white transition-colors">
            <X size={48} />
          </button>
        </div>
      )}
    </nav>
  );
};

const SlideNavigator = ({ sections, activeSection }: { sections: string[], activeSection: string }) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-6">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center justify-end"
        >
          <span className={`mr-4 text-[10px] font-black uppercase tracking-widest italic transition-all duration-300 opacity-0 group-hover:opacity-100 ${activeSection === section ? 'text-yellow-400 translate-x-0' : 'text-white/20 translate-x-2'}`}>
            {section}
          </span>
          <div className={`w-2 h-2 rounded-full transition-all duration-500 border border-white/20 ${activeSection === section ? 'bg-yellow-400 scale-150 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-transparent hover:bg-white/40'}`} />
        </button>
      ))}
    </div>
  );
};

const SectionHeading = ({ children, subtitle, isVisible }: { children?: React.ReactNode, subtitle?: string, isVisible: boolean }) => (
  <div className={`mb-8 lg:mb-12 transition-all duration-700 ease-expo transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
    {subtitle && <p className="text-yellow-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4">{subtitle}</p>}
    <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter italic uppercase text-white leading-[0.85]">
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
    }, { threshold: 0.3 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollAchievements = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 320; 
      const scrollTo = direction === 'left' ? scrollLeft - (cardWidth * 2) : scrollLeft + (cardWidth * 2);
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - left;
      const centerX = width / 2;
      const offset = (relativeX - centerX) / 40;
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
    const walk = (x - startX) * 1.8;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <div className="bg-black text-white selection:bg-yellow-400 selection:text-black snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth no-scrollbar">
      <Navbar activeSection={activeSection} />
      <SlideNavigator sections={sections} activeSection={activeSection} />

      {/* HERO SECTION / SLIDE 1 */}
      <section id="home" className="snap-start snap-always min-h-screen relative flex flex-col justify-center items-center overflow-hidden py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center pointer-events-none opacity-[0.05] select-none">
          <span className="text-[20vw] font-black italic outline-text leading-none uppercase">INTERNATIONAL</span>
          <span className="text-[20vw] font-black italic outline-text leading-none uppercase">RELATIONS</span>
        </div>

        <div className={`container mx-auto px-6 relative z-10 text-center transition-all duration-700 ease-expo ${visibleSlides.home ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-lg'}`}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[14vw] lg:text-[10vw] font-black italic leading-[0.85] tracking-tighter uppercase mb-8">
              HUN <br />
              <span className="text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">LYFANG</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg md:text-xl text-white/60 leading-relaxed font-medium mb-12">
              <span className="text-white">First year student</span> majoring in <span className="text-white">International Relations</span> at IISPP. 
              Dedicated to bridging global perspectives through leadership, critical thinking, and diplomatic insight.
            </p>
            <div className="flex flex-col items-center gap-8">
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-white text-black px-12 py-6 font-black italic uppercase tracking-tighter flex items-center gap-3 hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:shadow-yellow-400/20"
              >
                DISCOVER MORE <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </a>
              <div className="flex items-center gap-8 text-zinc-700">
                 <a href="mailto:Lyfang011@gmail.com" className="hover:text-yellow-400 transition-all duration-300 hover:scale-125"><Mail size={24}/></a>
                 <a href="https://www.linkedin.com/in/hun-lyfang-4531073a5" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-all duration-300 hover:scale-125"><Linkedin size={24}/></a>
                 <a href="https://t.me/LyfangHun" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-all duration-300 hover:scale-125"><Send size={24}/></a>
                 <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-zinc-500">
                  <MapPin size={14} className="text-yellow-400"/> PHNOM PENH
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION / SLIDE 2 */}
      <section id="about" className="snap-start snap-always min-h-screen py-32 bg-zinc-900/20 border-y border-white/5 relative flex flex-col justify-center">
        <div className={`container mx-auto px-6 transition-all duration-700 ease-expo ${visibleSlides.about ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={`transition-all duration-600 ease-expo ${visibleSlides.about ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
              <SectionHeading isVisible={visibleSlides.about}>ABOUT ME</SectionHeading>
              <div className="space-y-6 text-3xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter leading-[1.1] text-white">
                <p>
                  i'm a first year student <br />
                  majoring in <span className="text-yellow-400">international relations</span>
                </p>
              </div>
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 transition-all duration-600 ease-expo delay-100 ${visibleSlides.about ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {[
                { icon: Target, title: 'IISPP', sub: 'Global Affairs' },
                { icon: Globe, title: 'DIPLOMACY', sub: 'Intl. Relations' },
                { icon: Zap, title: 'GOLD', sub: 'Medalist (WSC)' },
                { icon: Briefcase, title: 'STRATEGY', sub: 'Management' }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/40 p-8 lg:p-10 border border-white/5 flex flex-col justify-between aspect-square group hover:border-yellow-400/50 hover:bg-zinc-900 transition-all duration-500 transform hover:-translate-y-1">
                  <item.icon className="text-yellow-400 mb-6 lg:mb-8 transition-transform group-hover:scale-110" size={40} />
                  <div>
                    <h4 className="text-2xl lg:text-3xl font-black italic leading-none mb-3 group-hover:text-yellow-400 transition-colors">{item.title}</h4>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION / SLIDE 3 */}
      <section id="skills" className="snap-start snap-always min-h-screen py-32 flex flex-col justify-center overflow-hidden">
        <div className={`container mx-auto px-6 w-full transition-all duration-700 ease-expo ${visibleSlides.skills ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <SectionHeading isVisible={visibleSlides.skills}>skills</SectionHeading>
          
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 transition-all duration-600 delay-100 ${visibleSlides.skills ? 'opacity-100' : 'opacity-0'}`}>
            <div className="lg:col-span-8 space-y-12 lg:space-y-16">
              <h3 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase mb-8 flex items-center gap-6 text-yellow-400">
                <span className="h-px flex-1 bg-white/5"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 lg:gap-y-12">
                {CORE_SKILLS.map((skill, i) => (
                  <div key={skill.name} className={`group cursor-default transition-all duration-500`} style={{ transitionDelay: `${i * 50}ms` }}>
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-xs lg:text-sm font-bold tracking-widest text-white/40 group-hover:text-white transition-colors uppercase">{skill.name}</span>
                      <span className="text-xs font-black italic text-yellow-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-zinc-900 overflow-hidden rounded-full">
                      <div 
                        className={`h-full bg-gradient-to-r from-white to-yellow-400 transition-all duration-1000 ease-expo`} 
                        style={{ width: visibleSlides.skills ? `${skill.level}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-10 lg:space-y-12">
              <h3 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase mb-8 flex items-center gap-6 text-yellow-400">
                STACK <span className="h-px flex-1 bg-white/5"></span>
              </h3>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {COMPUTER_SKILLS.map((tool, i) => (
                  <span key={tool} className={`bg-zinc-900/50 border border-white/5 px-4 py-3 lg:px-6 lg:py-4 text-[10px] lg:text-xs font-bold text-white/40 hover:text-black hover:bg-yellow-400 hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest`} style={{ transitionDelay: `${i * 30}ms` }}>
                    {tool}
                  </span>
                ))}
              </div>
              <div className="p-8 lg:p-12 border-l-4 border-yellow-400 bg-white/5 relative overflow-hidden group">
                <p className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mb-6 italic">Languages</p>
                <div className="flex flex-col gap-6 lg:gap-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl lg:text-2xl font-black italic">ENGLISH</p>
                      <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Advanced</p>
                    </div>
                    <TrendingUp className="text-yellow-400 opacity-20" size={24} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl lg:text-2xl font-black italic">KHMER</p>
                      <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Native | Speaker</p>
                    </div>
                    <Star className="text-yellow-400 opacity-20" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION / SLIDE 4 */}
      <section 
        id="achievements" 
        className="snap-start snap-always min-h-screen py-32 bg-black relative overflow-hidden flex flex-col justify-center"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none py-12">
          <div className="animate-marquee inline-block">
            <span className="text-9xl font-black italic uppercase mx-4 text-yellow-400">WINNER CHAMPION MEDALIST FINALIST TOP TIER WINNER CHAMPION MEDALIST FINALIST TOP TIER</span>
          </div>
          <div className="animate-marquee2 inline-block">
            <span className="text-9xl font-black italic uppercase mx-4 text-yellow-400">WINNER CHAMPION MEDALIST FINALIST TOP TIER WINNER CHAMPION MEDALIST FINALIST TOP TIER</span>
          </div>
        </div>

        <div className={`container mx-auto px-6 mb-12 lg:mb-20 flex flex-col md:flex-row justify-between items-end relative z-10 gap-8 transition-all duration-700 ease-expo ${visibleSlides.achievements ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <SectionHeading isVisible={visibleSlides.achievements}>achievement</SectionHeading>
          
          <div className="flex gap-4 pb-4">
            <button 
              onClick={() => scrollAchievements('left')} 
              className="p-4 md:p-6 border border-white/10 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all active:scale-95 group"
            >
              <ChevronRight size={32} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollAchievements('right')} 
              className="p-4 md:p-6 border border-white/10 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all active:scale-95 group"
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <div 
          ref={containerRef}
          className={`relative z-10 transition-all duration-700 ease-expo delay-150 will-change-transform ${visibleSlides.achievements ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'}`}
          style={{ transform: `translateX(${-parallaxOffset}px)` }}
        >
          <div 
            ref={scrollRef}
            onMouseDown={startDragging}
            onMouseLeave={() => {
              stopDragging();
              setParallaxOffset(0);
            }}
            onMouseUp={stopDragging}
            onMouseMove={moveDragging}
            onTouchStart={startDragging}
            onTouchEnd={stopDragging}
            onTouchMove={moveDragging}
            className={`flex overflow-x-auto gap-8 md:gap-12 px-6 md:px-[10vw] no-scrollbar pb-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing ${isDragging ? 'select-none' : ''}`}
            style={{ scrollSnapStop: 'always' }}
          >
            {ACHIEVEMENTS.map((ach, idx) => (
              <div 
                key={idx} 
                className="min-w-[280px] md:min-w-[480px] snap-center bg-zinc-900/40 p-10 md:p-14 border border-white/5 hover:border-yellow-400/50 transition-all duration-500 group relative flex flex-col justify-between overflow-hidden shadow-2xl"
              >
                <div className="absolute -bottom-10 -right-10 text-[10rem] md:text-[14rem] font-black italic text-white/[0.02] group-hover:text-yellow-400/[0.03] transition-colors leading-none pointer-events-none">
                  {idx + 1}
                </div>
                
                <div className="flex justify-between items-start mb-12 lg:mb-24 relative z-10">
                  <span className="text-6xl md:text-8xl font-black italic outline-text group-hover:text-yellow-400 transition-all duration-500 scale-100 group-hover:scale-105">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="bg-yellow-400 text-black px-4 py-1 text-[10px] font-black italic tracking-widest transform -rotate-2 group-hover:rotate-0 transition-transform">
                      {ach.year}
                    </span>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-black italic leading-[1.1] uppercase tracking-tighter group-hover:text-white transition-colors mb-6">
                    {ach.title}
                  </h4>
                  <div className="w-0 group-hover:w-20 h-2 bg-yellow-400 transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION / SLIDE 5 */}
      <section id="experience" className="snap-start snap-always min-h-screen py-32 relative flex flex-col justify-center">
        <div className={`container mx-auto px-6 w-full transition-all duration-700 ease-expo ${visibleSlides.experience ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <SectionHeading subtitle="PROFESSIONAL EVOLUTION" isVisible={visibleSlides.experience}>EXPERIENCE</SectionHeading>
          
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 transition-all duration-600 delay-100 ${visibleSlides.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="lg:col-span-8 space-y-24 lg:space-y-32 self-start">
              {/* Internship Section */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 w-1 h-full bg-white/5"></div>
                <h3 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase mb-12 lg:mb-16 flex items-center gap-6 text-yellow-400">
                  <span className="bg-yellow-400 p-3 text-black -ml-[1.15rem] relative z-10"><Briefcase size={20}/></span>
                  INTERNSHIP
                  <span className="h-px flex-1 bg-white/5"></span>
                </h3>
                {INTERNSHIP_EXP.map((exp, i) => (
                  <div key={i} className="mb-16 lg:mb-20 group relative pl-8 border-l-2 border-transparent hover:border-yellow-400 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 lg:mb-8">
                      <div className="transform group-hover:translate-x-4 transition-transform duration-500">
                        <h4 className="text-3xl lg:text-4xl xl:text-5xl font-black italic uppercase tracking-tighter text-white group-hover:text-yellow-400 transition-colors">
                          {exp.organization}
                        </h4>
                        <p className="text-white/20 font-bold tracking-[0.3em] text-[10px] uppercase mt-2">{exp.role} • {exp.location}</p>
                      </div>
                      <span className="text-sm lg:text-base font-black italic border-b-2 border-yellow-400/20 group-hover:border-yellow-400 pb-1 mt-4 md:mt-0 transition-all shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-4 lg:space-y-6">
                      {exp.description.map((desc, di) => (
                        <li key={di} className="text-white/40 text-base lg:text-lg xl:text-xl flex gap-4 lg:gap-6 group/item hover:text-white transition-colors">
                          <span className="text-yellow-400 font-black group-hover/item:scale-125 transition-transform">»</span> 
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Volunteer Section */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 w-1 h-full bg-white/5"></div>
                <h3 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase mb-12 lg:mb-16 flex items-center gap-6 text-yellow-400">
                  <span className="bg-white p-3 text-black -ml-[1.15rem] relative z-10"><Globe size={20}/></span>
                  VOLUNTEER
                  <span className="h-px flex-1 bg-white/5"></span>
                </h3>
                <div className="space-y-20 lg:space-y-24">
                  {VOLUNTEER_EXP.map((exp, i) => (
                    <div key={i} className="group relative pl-8 border-l-2 border-transparent hover:border-white transition-all duration-500">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 lg:mb-8">
                        <div className="transform group-hover:translate-x-4 transition-transform duration-500">
                          <h4 className="text-3xl lg:text-4xl font-black italic uppercase tracking-tighter group-hover:text-yellow-400 transition-colors">{exp.organization}</h4>
                          <p className="text-white/20 font-bold tracking-[0.3em] text-[10px] uppercase mt-2">{exp.role}</p>
                        </div>
                        <span className="text-sm lg:text-base font-black italic opacity-20 group-hover:opacity-100 transition-opacity mt-4 md:mt-0 shrink-0">{exp.period}</span>
                      </div>
                      <ul className="space-y-4 lg:space-y-6">
                        {exp.description.map((desc, di) => (
                          <li key={di} className="text-white/40 text-base lg:text-lg flex gap-4 lg:gap-6 hover:text-white transition-colors">
                            <ArrowRight size={18} className="text-yellow-400 mt-1 shrink-0" /> {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12 pt-8 lg:pt-0">
              <h3 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase mb-12 flex items-center gap-6 text-yellow-400">
                REFERENCES <span className="h-px flex-1 bg-white/5"></span>
              </h3>
              <div className="space-y-6 lg:space-y-8">
                {REFERENCES.map((ref, i) => (
                  <div key={i} className="p-8 lg:p-10 border border-white/5 bg-zinc-900/40 group hover:border-yellow-400 transition-all duration-500 hover:-translate-x-1 shadow-xl">
                    <h5 className="text-xl lg:text-2xl font-black italic uppercase mb-2 group-hover:text-yellow-400 transition-colors">{ref.name}</h5>
                    <p className="text-[10px] font-bold tracking-widest text-yellow-400 uppercase mb-4 lg:mb-6 italic">{ref.title}</p>
                    <p className="text-[10px] text-white/20 mb-6 lg:mb-8 uppercase font-bold tracking-widest leading-relaxed">{ref.org}</p>
                    <div className="space-y-3 lg:space-y-4">
                      <a href={`tel:${ref.phone}`} className="flex items-center gap-3 text-[10px] font-bold text-white hover:text-yellow-400 transition-all group/link">
                        <div className="p-2 bg-zinc-900 group-hover/link:bg-yellow-400 transition-colors">
                          <Phone size={12} className="group-hover/link:text-black" />
                        </div>
                        {ref.phone}
                      </a>
                      <a href={`mailto:${ref.email}`} className="flex items-center gap-3 text-[10px] font-bold text-white hover:text-yellow-400 transition-all group/link truncate">
                        <div className="p-2 bg-zinc-900 group-hover/link:bg-yellow-400 transition-colors">
                          <Mail size={12} className="group-hover/link:text-black" />
                        </div>
                        {ref.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION / SLIDE 6 */}
      <footer id="contact" className="snap-start snap-always min-h-screen bg-white text-black py-32 flex flex-col justify-center items-center">
        <div className={`container mx-auto px-6 w-full transition-all duration-700 ease-expo ${visibleSlides.contact ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-md'}`}>
          <div className={`flex flex-col lg:flex-row justify-between items-end gap-16 lg:gap-20 transition-all duration-600`}>
            <div className="max-w-4xl">
              <p className="font-black italic text-[10px] lg:text-sm tracking-[0.4em] uppercase mb-8 lg:mb-10 text-zinc-400">GET IN TOUCH</p>
              <h2 className="text-5xl md:text-[8vw] lg:text-[10vw] font-black italic leading-[0.85] tracking-tighter uppercase hover:text-yellow-500 transition-all cursor-default">
                LET'S BUILD THE <br />
                <span className="text-zinc-300">FUTURE</span> TOGETHER
              </h2>
            </div>
            <div className="flex flex-col gap-8 lg:gap-10 lg:items-end w-full lg:w-auto">
              <div className="group">
                <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-2">Primary Inbox</p>
                <a href="mailto:Lyfang011@gmail.com" className="text-3xl md:text-5xl lg:text-6xl font-black italic underline decoration-2 lg:decoration-4 underline-offset-8 hover:text-yellow-500 transition-all block truncate">
                  Lyfang011@gmail.com
                </a>
              </div>
              <div className="flex flex-col lg:items-end gap-2">
                <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-1">Location</p>
                <p className="text-lg lg:text-xl font-black italic flex items-center gap-3">
                  <MapPin size={24} className="text-yellow-600"/> PHNOM PENH, CAMBODIA
                </p>
              </div>
            </div>
          </div>
          <div className="mt-24 lg:mt-40 pt-12 lg:pt-16 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start gap-4">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400">
                © 2026 HUN LYFANG. ALL RIGHTS RESERVED.
              </p>
            </div>
            <div className="flex gap-10 lg:gap-16 text-[10px] font-black tracking-[0.3em] uppercase">
              <a href="https://www.linkedin.com/in/hun-lyfang-4531073a5" target="_blank" rel="noopener noreferrer" className="hover:line-through hover:text-yellow-600 transition-all flex items-center gap-2">
                <Linkedin size={14}/> LINKEDIN
              </a>
              <a href="https://www.instagram.com/litler_jews/" target="_blank" rel="noopener noreferrer" className="hover:line-through hover:text-yellow-600 transition-all flex items-center gap-2">
                INSTAGRAM
              </a>
              <a href="https://t.me/LyfangHun" target="_blank" rel="noopener noreferrer" className="hover:line-through hover:text-yellow-600 transition-all flex items-center gap-2">
                TELEGRAM
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .ease-expo {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite;
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
      `}</style>
    </div>
  );
};

export default App;
