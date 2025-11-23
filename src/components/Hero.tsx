
import React, { useState, useEffect } from 'react';
import FadeIn from './FadeIn';
import { Bot, ChevronRight, Activity, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  // SEO & Copy Change: "Escala" is a positive business goal.
  const finalText = "AUTOMATIZA Y ESCALA.";
  const chars = "ABCDEF0123456789!@#$%^&*";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        finalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return finalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative pt-20 overflow-hidden bg-[#05070A]">
      
      {/* Liquid Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          <FadeIn delay={100}>
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-10 hover:bg-primary/10 transition-all cursor-default select-none shadow-[0_0_20px_rgba(0,243,255,0.1)]">
               <Activity size={12} className="animate-pulse" />
               <span>SISTEMAS DE ALTO RENDIMIENTO PARA EMPRESAS</span>
            </div>
          </FadeIn>
          
          <div className="min-h-[100px] md:min-h-[160px] flex items-center justify-center mb-6">
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter font-mono uppercase">
              {text}
            </h1>
          </div>

          <FadeIn delay={600}>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Tu competencia ya está usando IA. Tú sigues respondiendo emails manualmente a las 10 de la noche. <br/>
              <span className="text-white font-semibold">Recupera tu libertad ahora.</span>
            </p>
          </FadeIn>

          <FadeIn delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              
              {/* LIQUID BUTTON (SVG FILTER) */}
              <a
                href="#contact"
                onClick={handleScrollTo('#contact')}
                className="group relative px-8 py-4 md:px-12 md:py-6 bg-primary text-black font-black text-sm md:text-lg uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(0,243,255,0.6)]"
                style={{ filter: "url('#goo')" }} // Applies the SVG filter from index.html
              >
                 {/* Bubbles for Liquid Effect */}
                 <span className="absolute top-0 left-0 w-full h-full bg-primary rounded-full blur-md group-hover:blur-lg transition-all"></span>
                 <span className="relative z-10 flex items-center gap-3">
                    AGENDAR CONSULTORÍA
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
                 </span>
              </a>
              
              {/* Ghost Button */}
              <a
                href="#services"
                onClick={handleScrollTo('#services')}
                className="px-6 py-4 md:px-8 md:py-6 text-white font-mono text-xs md:text-sm uppercase tracking-wider rounded-full border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center gap-2 group interactive-hover"
              >
                <span>Ver el Sistema</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default Hero;
