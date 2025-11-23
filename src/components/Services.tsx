
import React, { useRef, useState } from 'react';
import { Clock, TrendingUp, FolderCheck, ArrowUpRight, Magnet, Brain, Zap } from 'lucide-react';
import FadeIn from './FadeIn';
import { ServiceItem } from '../types';

// Extended interface for internal use
interface ServiceItemWithColor extends Omit<ServiceItem, 'icon'> {
  icon: React.ElementType; // Passing component reference instead of node
  color: string; // Tailwind text color class
}

const services: ServiceItemWithColor[] = [
  {
    title: 'Recupera Tu Vida',
    description: 'Conecto tus aplicaciones (Email, Excel, CRM) para que los datos fluyan solos. Deja de ser un robot "copia-pega" y dedícate a dirigir.',
    icon: Clock,
    color: 'text-cyan-400'
  },
  {
    title: 'Ventas 24/7',
    description: 'Instalo empleados digitales (IA) que atienden clientes, califican leads y agendan citas mientras tú duermes. Tu negocio nunca cierra.',
    icon: TrendingUp,
    color: 'text-purple-400'
  },
  {
    title: 'Seguimiento IA',
    description: 'Nadie se queda en "visto". El sistema persigue a tus clientes potenciales por WhatsApp o Email hasta que compran o dicen no.',
    icon: Magnet,
    color: 'text-green-400'
  },
  {
    title: 'Orden Total',
    description: 'Centralizo toda tu información en un Dashboard único. Adiós a los 15 excels desactualizados. Toma decisiones con datos reales.',
    icon: FolderCheck,
    color: 'text-white'
  },
  {
    title: 'Clon Operativo',
    description: 'Entreno una IA con tus procesos y conocimientos. Responde dudas de clientes o empleados como si fueras tú, pero instantáneamente.',
    icon: Brain,
    color: 'text-pink-400'
  },
  {
    title: 'Onboarding Flash',
    description: 'El cliente paga y recibe todo al segundo: contrato, accesos y bienvenida. Cero espera, cero fricción, máxima profesionalidad.',
    icon: Zap,
    color: 'text-yellow-400'
  },
];

const TiltCard = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 3D Tilt Effect Calculation
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
    setGlow({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlow({ ...glow, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      className="relative rounded-xl bg-black/40 cursor-none transition-transform duration-100 ease-out group h-full hover:z-10"
    >
      {/* Outer Border Gradient */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-xl opacity-50 group-hover:opacity-100 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-500"></div>
      
      {/* Spotlight Glow Effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0 rounded-xl mix-blend-screen"
        style={{
          background: `radial-gradient(400px circle at ${glow.x}px ${glow.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
          opacity: glow.opacity
        }}
      />
      
      <div className="relative z-10 h-full bg-[#0A0A0A] rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-32 relative bg-[#05070A] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-black to-black opacity-50 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="mb-24 text-center md:text-left">
             <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="text-primary font-mono text-sm tracking-[0.3em] uppercase">Soluciones</span>
             </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-none uppercase">
              Sistemas que <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse">Trabajan por Ti</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 100}>
              <TiltCard onClick={scrollToContact}>
                <div className="p-8 md:p-10 h-full flex flex-col relative">
                   
                   {/* Icon Container */}
                   {/* Logic: Default uses service.color. Hover forces bg-primary (Cyan) and text-black for max contrast */}
                   <div className={`mb-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 shadow-lg relative z-20
                      ${service.color} 
                      group-hover:scale-110 
                      group-hover:bg-primary 
                      group-hover:text-black 
                      group-hover:border-primary
                   `}>
                      <service.icon size={32} />
                   </div>
                   
                   <h3 className="text-2xl font-bold text-white mb-4 font-mono uppercase group-hover:text-primary transition-colors tracking-tighter relative z-10">
                      {service.title}
                   </h3>
                   
                   <p className="text-slate-400 leading-relaxed mb-12 flex-grow font-light group-hover:text-white transition-colors relative z-10">
                      {service.description}
                   </p>
                   
                   <div className="mt-auto flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-primary transition-colors uppercase tracking-wider border-t border-white/5 pt-6 relative z-10">
                      <span className="group-hover:font-bold">Ver Detalles</span>
                      <div className="bg-white/10 p-2 rounded-full group-hover:bg-primary group-hover:text-black transition-all">
                         <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                      </div>
                   </div>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
