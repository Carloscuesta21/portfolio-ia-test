
import React from 'react';
import { Clock, UserX, BadgeDollarSign, AlertTriangle, XCircle, AlertOctagon, Siren, BrainCircuit, BarChart4, FileWarning } from 'lucide-react';
import FadeIn from './FadeIn';
import { PainPointItem } from '../types';

// Extended Pain Points Data
const painPoints = [
    {
        icon: <Clock size={28} />,
        bgIcon: <Clock size={150} />,
        title: "Falta de Tiempo",
        desc: "Eres el cuello de botella. Te pasas el día apagando fuegos y haciendo tareas repetitivas. Si tú paras, tu facturación se detiene.",
        alert: "-40h/mes perdidas"
    },
    {
        icon: <AlertOctagon size={28} />,
        bgIcon: <UserX size={150} />,
        title: "Errores Humanos",
        desc: "\"Se me pasó enviarlo\". \"Copié mal el dato\". Cada pequeño error te cuesta credibilidad y dinero. Tu negocio no puede depender de la memoria.",
        alert: "Fallo de Sistema"
    },
    {
        icon: <XCircle size={28} />,
        bgIcon: <BadgeDollarSign size={150} />,
        title: "Dinero en la Mesa",
        desc: "Leads que se enfrían porque tardas horas en contestar. Clientes olvidados en un Excel. Estás perdiendo oportunidades de venta a diario.",
        alert: "Pérdida de Ingresos"
    },
    {
        icon: <BrainCircuit size={28} />,
        bgIcon: <BrainCircuit size={150} />,
        title: "Fatiga Mental",
        desc: "Tu cerebro tiene demasiadas pestañas abiertas. Tomas decisiones triviales todo el día en lugar de pensar en la estrategia de crecimiento.",
        alert: "Riesgo de Burnout"
    },
    {
        icon: <BarChart4 size={28} />,
        bgIcon: <BarChart4 size={150} />,
        title: "Techo de Cristal",
        desc: "¿Quieres doblar clientes? No puedes. Tu estructura actual colapsaría. Estás atrapado en un modelo que no escala sin sacrificar tu vida.",
        alert: "Crecimiento Bloqueado"
    },
    {
        icon: <FileWarning size={28} />,
        bgIcon: <FileWarning size={150} />,
        title: "Caos de Datos",
        desc: "Información en WhatsApp, emails perdidos, tres Excels diferentes... Tomas decisiones a ciegas porque no tienes una visión clara de tu negocio.",
        alert: "Descontrol Total"
    }
];

const Problems: React.FC = () => {
  return (
    <section id="problems" className="py-32 bg-[#020202] relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
         <FadeIn>
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-950/20 text-red-500 font-mono text-xs animate-pulse mb-6">
                    <Siren size={14} />
                    <span>DIAGNÓSTICO DE SISTEMA: CRÍTICO</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-none">
                    ¿Por qué tu negocio<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NO ESCALA?</span>
                </h2>
            </div>
         </FadeIn>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            
            {painPoints.map((point, idx) => (
                <FadeIn key={idx} delay={idx * 100} className="h-full">
                    <div className="group relative h-full p-[1px] rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:animate-jiggle cursor-none">
                        {/* Animated Red Border on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent group-hover:from-red-600 group-hover:to-red-900 rounded-2xl transition-colors duration-300"></div>
                        
                        {/* Glow */}
                        <div className="absolute inset-0 bg-red-600 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        
                        <div className="relative h-full bg-black rounded-xl p-8 overflow-hidden border border-white/5 group-hover:border-transparent flex flex-col">
                            
                            <div className="absolute -right-6 -top-6 text-slate-800/50 group-hover:text-red-900/10 transition-colors duration-500 opacity-50 group-hover:opacity-100">
                                {point.bgIcon}
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-200 shadow-[0_0_0_0_rgba(220,38,38,0)] group-hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]">
                                    {point.icon}
                                </div>
                                
                                <h3 className="text-2xl font-black text-slate-300 group-hover:text-white mb-4 uppercase tracking-tight transition-colors">
                                    {point.title}
                                </h3>
                                <p className="text-slate-500 group-hover:text-red-100/80 transition-colors leading-relaxed mb-8 font-light flex-grow">
                                    {point.desc}
                                </p>

                                <div className="flex items-center gap-2 text-xs font-mono text-red-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest translate-y-2 group-hover:translate-y-0 duration-300 border-t border-red-500/20 pt-4">
                                    <AlertTriangle size={12} />
                                    <span>ALERTA: {point.alert}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            ))}

         </div>
      </div>
    </section>
  );
};

export default Problems;
