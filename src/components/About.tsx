import React from 'react';
import FadeIn from './FadeIn';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <div className="w-full md:w-1/2 order-2 md:order-1">
             <FadeIn>
               <span className="text-secondary font-mono text-sm tracking-widest uppercase mb-2 block">Sobre Mí</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                No escribo código,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Diseño Soluciones.</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="space-y-6 text-lg text-slate-400">
                <p>
                  Olvídate de desarrollos de software costosos y que tardan meses. Mi enfoque es diferente: <strong>Lean Automation</strong>.
                </p>
                <p>
                  Utilizo las herramientas "No-Code" y modelos de IA más avanzados del mercado para conectar las piezas que tu negocio ya usa. Creo puentes inteligentes entre tu email, tu CRM y tus datos.
                </p>
                
                <ul className="space-y-2 mt-4">
                    {[
                        "Implementación en semanas, no meses.",
                        "Sin deuda técnica compleja.",
                        "Control total de tus procesos."
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 group interactive-hover">
                            <CheckCircle2 className="text-primary group-hover:scale-125 transition-transform duration-300" size={20} />
                            <span className="group-hover:text-white transition-colors">{item}</span>
                        </li>
                    ))}
                </ul>
                
                <div className="pt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group interactive-hover">
                        <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 group-hover:translate-x-2 transition-transform origin-left">+50</div>
                        <div className="text-xs text-slate-500 font-mono uppercase group-hover:text-primary">Automatizaciones</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300 group interactive-hover">
                        <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 group-hover:translate-x-2 transition-transform origin-left">20h+</div>
                        <div className="text-xs text-slate-500 font-mono uppercase group-hover:text-secondary">Ahorro Semanal/Cliente</div>
                    </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="w-full md:w-1/2 relative order-1 md:order-2 perspective-1000">
            <FadeIn delay={300}>
                <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group hover:shadow-[0_0_50px_rgba(0,243,255,0.2)] transition-shadow duration-500 interactive-hover">
                    {/* Holographic overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 bg-[length:100%_4px]"></div>
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)] opacity-0 group-hover:opacity-20 z-20 pointer-events-none"></div>
                    
                    <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop" 
                        alt="Consultoría Estratégica" 
                        className="w-full h-auto object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                        <div className="font-mono text-primary text-sm flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            System Status: Optimized
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 blur-2xl rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 blur-2xl rounded-full animate-pulse-slow delay-1000"></div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
