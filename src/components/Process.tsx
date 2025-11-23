
import React from 'react';
import FadeIn from './FadeIn';
import { ScanSearch, Compass, Cpu, Rocket } from 'lucide-react';

const steps = [
    { 
        num: '01', 
        title: 'Auditoría', 
        desc: 'Analizo tu negocio desde dentro. Detectamos cuellos de botella y fugas de tiempo.', 
        icon: <ScanSearch size={24} />,
        color: 'text-blue-400',
        hoverColor: 'group-hover:text-blue-400',
        shadow: 'group-hover:shadow-[0_0_30px_rgba(96,165,250,0.4)]',
        borderColor: 'group-hover:border-blue-400'
    },
    { 
        num: '02', 
        title: 'Estrategia', 
        desc: 'Diseño un plan de automatización a medida. Tu hoja de ruta clara y sin tecnicismos.', 
        icon: <Compass size={24} />,
        color: 'text-purple-400',
        hoverColor: 'group-hover:text-purple-400',
        shadow: 'group-hover:shadow-[0_0_30px_rgba(192,132,252,0.4)]',
        borderColor: 'group-hover:border-purple-400'
    },
    { 
        num: '03', 
        title: 'Implementación', 
        desc: 'Construyo los sistemas. Conecto IA y herramientas para que trabajen solas.', 
        icon: <Cpu size={24} />,
        color: 'text-cyan-400',
        hoverColor: 'group-hover:text-cyan-400',
        shadow: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
        borderColor: 'group-hover:border-cyan-400'
    },
    { 
        num: '04', 
        title: 'Optimización', 
        desc: 'Seguimiento continuo. Ajustamos el sistema para maximizar resultados y libertad.', 
        icon: <Rocket size={24} />,
        color: 'text-green-400',
        hoverColor: 'group-hover:text-green-400',
        shadow: 'group-hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]',
        borderColor: 'group-hover:border-green-400'
    }
];

const Process: React.FC = () => {
    return (
        <section id="process" className="py-32 bg-[#030303] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <FadeIn>
                    <div className="text-center mb-24">
                        <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">Workflow</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            El Camino a la <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Automatización</span>
                        </h2>
                    </div>
                </FadeIn>

                <div className="max-w-5xl mx-auto relative">
                    {/* Central Pipeline Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2 z-0">
                         {/* Animated flow through pipeline */}
                        <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-primary to-transparent animate-scan opacity-50"></div>
                    </div>

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            
                            return (
                                <div key={idx} className="relative flex flex-col md:flex-row items-center gap-6 group">
                                    
                                    {/* LEFT COLUMN */}
                                    <div className={`flex-1 w-full flex md:justify-end order-2 md:order-1 ${isEven ? 'md:pr-12 text-right' : 'md:pr-12 justify-start'}`}>
                                        {isEven ? (
                                            // Content Bubble (Left)
                                            <FadeIn delay={idx * 100} className="w-full">
                                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 relative overflow-hidden group-hover:shadow-2xl w-full md:ml-auto md:max-w-md">
                                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white/5 to-${step.color} transition-opacity duration-500`}></div>
                                                    <h3 className={`text-2xl font-bold text-white mb-2 transition-colors duration-300 ${step.hoverColor}`}>{step.title}</h3>
                                                    <p className="text-slate-400 font-light leading-relaxed text-sm">{step.desc}</p>
                                                </div>
                                            </FadeIn>
                                        ) : (
                                            // Number (Left side for Odd items)
                                            <div className="hidden md:flex w-full h-full items-center justify-end">
                                                <FadeIn delay={idx * 100 + 200} className="transform transition-transform duration-1000 translate-x-[-50px] group-hover:translate-x-0">
                                                     <span className="font-mono text-[8rem] font-bold text-white/5 select-none leading-none block">
                                                        {step.num}
                                                    </span>
                                                </FadeIn>
                                            </div>
                                        )}
                                    </div>

                                    {/* CENTER COLUMN (Node) */}
                                    <div className="relative z-10 order-1 md:order-2">
                                        <FadeIn delay={idx * 100 + 100}>
                                            <div className={`w-14 h-14 rounded-full bg-[#05070A] border-4 border-[#05070A] shadow-xl flex items-center justify-center shrink-0 transition-all duration-300 ring-1 ring-white/20 ${step.borderColor} ${step.shadow} group-hover:scale-110`}>
                                                <div className={`${step.color} transition-transform duration-500 group-hover:rotate-12`}>
                                                    {step.icon}
                                                </div>
                                            </div>
                                        </FadeIn>
                                    </div>

                                    {/* RIGHT COLUMN */}
                                    <div className={`flex-1 w-full flex md:justify-start order-3 ${!isEven ? 'md:pl-12 text-left' : 'md:pl-12 justify-end'}`}>
                                        {!isEven ? (
                                            // Content Bubble (Right)
                                            <FadeIn delay={idx * 100} className="w-full">
                                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 relative overflow-hidden group-hover:shadow-2xl w-full md:mr-auto md:max-w-md">
                                                     <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white/5 to-${step.color} transition-opacity duration-500`}></div>
                                                    <h3 className={`text-2xl font-bold text-white mb-2 transition-colors duration-300 ${step.hoverColor}`}>{step.title}</h3>
                                                    <p className="text-slate-400 font-light leading-relaxed text-sm">{step.desc}</p>
                                                </div>
                                            </FadeIn>
                                        ) : (
                                            // Number (Right side for Even items)
                                            <div className="hidden md:flex w-full h-full items-center justify-start">
                                                <FadeIn delay={idx * 100 + 200} className="transform transition-transform duration-1000 translate-x-[50px] group-hover:translate-x-0">
                                                    <span className="font-mono text-[8rem] font-bold text-white/5 select-none leading-none block">
                                                        {step.num}
                                                    </span>
                                                </FadeIn>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Mobile Number (Fallback for small screens) */}
                                    <div className="md:hidden absolute top-0 right-0 opacity-20">
                                        <span className="font-mono text-6xl font-bold text-white/10">{step.num}</span>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
