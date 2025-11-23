
import React, { useState, useRef, useEffect } from 'react';
import { Bot, RefreshCw, MessageCircle, X, Send, Zap, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

interface KnowledgeEntry {
  keywords: string[];
  response: string;
  options?: string[];
}

const initialMessage: Message = {
  id: 1,
  text: "¡Hola! Soy Carlos AI 🤖. Estoy aquí para explicarte cómo puedes tener un negocio que funcione solo, sin que tengas que escribir una sola línea de código.\n\n¿En qué puedo orientarte hoy?",
  sender: 'bot',
  options: [
    "¿Qué haces exactamente?",
    "No sé de tecnología",
    "Precios de referencia",
    "Quiero hablar con Carlos"
  ]
};

// BASE DE CONOCIMIENTO: ENFOQUE ASISTENTE AMABLE Y EDUCATIVO
const knowledgeBase: KnowledgeEntry[] = [
  // QUÉ HACES / SERVICIOS
  {
    keywords: ['que haces', 'servicios', 'ofreces', 'producto', 'ayuda', 'trabajo', 'haces exactamenente', 'explicame'],
    response: "Básicamente, le regalo tiempo a los dueños de negocio. ⏳\n\nCreo 'empleados digitales' que se encargan de las tareas aburridas: enviar facturas, responder preguntas repetitivas de clientes o mover datos de un sitio a otro. Tú te dedicas a dirigir, y mis sistemas se encargan del resto.",
    options: ["Ver ejemplos", "No sé de tecnología"]
  },
  // MIEDO TECNICO / NO SE PROGRAMAR
  {
    keywords: ['tecnologia', 'programar', 'codigo', 'dificil', 'miedo', 'tecnico', 'complejo', 'se de tecnologia', 'no se'],
    response: "¡Esa es la mejor parte! No necesitas saber nada de programación. 🚫💻\n\nYo uso herramientas 'No-Code' (como piezas de LEGO digitales). Son sistemas seguros, rápidos de implementar y muy fáciles de usar. Yo construyo el motor, te doy las llaves y te enseño a conducirlo en una sola sesión.",
    options: ["¿Qué herramientas usas?", "Hablemos de precios"]
  },
  // HERRAMIENTAS (Explicado sencillo)
  {
    keywords: ['herramienta', 'stack', 'usa', 'utilizas', 'make', 'zapier', 'ejemplos'],
    response: "Utilizo conectores inteligentes como Make o Zapier para unir tus aplicaciones actuales (tu email, tu Excel, tu WhatsApp). Y para la 'inteligencia', uso cerebros como GPT-4 o Claude.\n\nImagina que tienes un asistente que lee tus correos y los pasa a tu agenda automáticamente. Eso es lo que construyo.",
    options: ["Suena bien, quiero precio"]
  },
  // PRECIOS (Enfoque Valor/Inversión)
  {
    keywords: ['precio', 'costo', 'cuanto', 'vale', 'tarifa', 'dinero', 'presupuesto', 'inversion', 'caro', 'barato'],
    response: "Piénsalo como una inversión, no un gasto. ¿Cuánto vale para ti ahorrarte 20 horas al mes?\n\n💰 Mis servicios suelen ir desde los 500€ para automatizaciones puntuales, hasta los 2.000€-3.000€ para sistemas que gestionan negocios enteros. Lo adaptamos a tu presupuesto.",
    options: ["Agendar Consultoría"]
  },
  // CARLOS / CONTACTO
  {
    keywords: ['contacto', 'carlos', 'humano', 'persona', 'reunion', 'cita', 'agendar', 'hablar'],
    response: "¡Perfecto! Yo soy listo, pero Carlos es el estratega. 🧠\n\nSi quieres que él analice tu negocio personalmente, te recomiendo reservar una consultoría. Es el paso más rápido para dejar de perder tiempo.",
    options: ["Ir al formulario"]
  },
  // CARLOS AI (Identidad)
  {
    keywords: ['eres', 'quien', 'bot', 'inteligencia', 'nombre'],
    response: "Soy Carlos AI, un asistente virtual entrenado con la metodología de trabajo de Carlos. Estoy aquí para resolver tus dudas iniciales 24/7, mientras Carlos descansa (o está automatizando algo genial). 😉",
  }
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
        setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const getBotResponse = (input: string): { text: string, options?: string[] } => {
      const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
      
      // Búsqueda inteligente en base de conocimiento
      for (const entry of knowledgeBase) {
          if (entry.keywords.some(keyword => normalizedInput.includes(keyword))) {
              return { text: entry.response, options: entry.options };
          }
      }

      // Navegación explícita
      if (normalizedInput.includes("formulario") || normalizedInput.includes("ir a") || normalizedInput.includes("agendar")) {
          setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 500);
          return { text: "¡Genial! Te llevo directo a la zona de contacto para que hables con el Carlos humano. 👇", options: [] };
      }

      // Saludos amables
      if (['hola', 'buenos', 'buenas', 'hey'].some(k => normalizedInput.includes(k))) {
          return { 
              text: "¡Hola! 👋 ¿En qué puedo ayudarte hoy? ¿Quieres saber cómo ahorrar tiempo en tu negocio?", 
              options: ["Sí, cuéntame", "Ver precios"] 
          };
      }

      // Fallback empático
      return {
          text: "Mmm, esa es una pregunta interesante 🤔. Aún estoy aprendiendo sobre algunos matices específicos.\n\n¿Te gustaría saber sobre cómo trabajamos o prefieres hablar directamente con Carlos?",
          options: ["Cómo trabajáis", "Hablar con Carlos", "Ver servicios"]
      };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const safeText = text.trim().slice(0, 200); 

    const userMsg: Message = { id: Date.now(), text: safeText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      // Manejo de acciones de botones
      if (safeText === "Ir al formulario" || safeText === "Agendar Consultoría" || safeText === "Quiero hablar con Carlos" || safeText === "Hablar con Carlos") {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
          setIsTyping(false);
          return;
      }
       if (safeText === "Ver servicios" || safeText === "Ver ejemplos") {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
          setIsTyping(false);
          return;
      }

      const botResponse = getBotResponse(safeText);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: botResponse.text,
        sender: 'bot',
        options: botResponse.options
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800); // Pequeño delay para simular "pensamiento" humano
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') handleSend(inputValue);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-[0_0_30px_rgba(0,243,255,0.3)] transition-all duration-300 hover:scale-110 cursor-pointer group border border-white/10 ${
          isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-primary text-black animate-pulse-slow'
        }`}
        aria-label="Chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} className="group-hover:-rotate-12 transition-transform" />}
      </button>

      <div 
        className={`fixed bottom-24 right-6 md:right-8 w-[90vw] md:w-[360px] h-[550px] bg-[#05070A] border border-primary/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right backdrop-blur-xl ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header Amable */}
        <div className="p-4 bg-gradient-to-r from-primary/10 to-transparent border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary p-0.5 flex items-center justify-center overflow-hidden relative">
                     {/* Avatar Simulado */}
                     <div className="w-full h-full bg-black rounded-full flex items-center justify-center relative overflow-hidden">
                        <Bot size={20} className="text-primary relative z-10" />
                        <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
                     </div>
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full z-20"></div>
                </div>
                <div className="flex flex-col">
                    <h3 className="font-bold text-white text-base font-sans">Carlos AI</h3>
                    <span className="text-[10px] text-primary/80 flex items-center gap-1 font-mono">
                        <Sparkles size={8} /> Asistente Virtual
                    </span>
                </div>
            </div>
            <button onClick={() => setMessages([initialMessage])} className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" title="Reiniciar conversación">
                <RefreshCw size={16} />
            </button>
        </div>

        {/* Área de Chat */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                        msg.sender === 'user' 
                            ? 'bg-primary text-black font-medium rounded-tr-none' 
                            : 'bg-[#1A1D24] text-slate-200 border border-white/5 rounded-tl-none'
                    }`}>
                        {msg.text}
                    </div>
                    {/* Timestamp simulado o etiqueta */}
                    <span className="text-[10px] text-slate-600 mt-1 px-1">
                        {msg.sender === 'bot' ? 'Carlos AI' : 'Tú'}
                    </span>
                </div>
            ))}
            
            {isTyping && (
                <div className="flex justify-start items-center gap-2 pl-2">
                    <div className="flex space-x-1 bg-[#1A1D24] p-3 rounded-2xl rounded-tl-none border border-white/5">
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                    <span className="text-xs text-slate-600 font-mono animate-pulse">Escribiendo...</span>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Chips de Opciones (Quick Replies) */}
        {!isTyping && messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].options && (
             <div className="px-4 py-3 bg-transparent flex flex-wrap gap-2 justify-start border-t border-white/5 bg-black/20 backdrop-blur-sm">
                {messages[messages.length - 1].options?.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSend(option)}
                        className="text-xs px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-black transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                    >
                        {option}
                    </button>
                ))}
            </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#0A0C10] flex gap-3 items-center">
            <input 
                ref={inputRef}
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu duda..." 
                className="flex-1 bg-[#1A1D24] border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-slate-500"
            />
            <button 
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 rounded-full bg-primary text-black hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-primary/20"
            >
                <Send size={18} className="ml-0.5" />
            </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
