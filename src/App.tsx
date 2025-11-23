
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stack from './components/Stack';
import Problems from './components/Problems';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Custom Cursor State
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    const moveCursor = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
        
        cursorOutlineRef.current.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive-hover') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-slate-300 font-sans selection:bg-primary selection:text-background relative">
      
      {/* Noise Overlay */}
      <div className="bg-noise"></div>

      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary z-[100] transition-all duration-100 ease-out shadow-[0_0_10px_rgba(0,243,255,0.5)]"
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>

      {/* Custom Cursor - Visible on Desktop */}
      <div ref={cursorDotRef} className="hidden md:block cursor-dot"></div>
      <div ref={cursorOutlineRef} className={`hidden md:block cursor-outline ${cursorHovered ? 'hovered' : ''}`}></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Stack />
          <Problems />
          <Services />
          <Process />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Chatbot Widget */}
      <Chatbot />
    </div>
  );
};

export default App;
