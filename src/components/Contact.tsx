
import React, { useState } from 'react';
import FadeIn from './FadeIn';
import { Send, CheckCircle2, AlertCircle, Mail, Copy, ShieldCheck } from 'lucide-react';

const Contact: React.FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  
  // SECURITY: Input Sanitization to prevent XSS and Injection attacks
  const sanitizeInput = (input: string) => {
    return input.replace(/[<>]/g, "").trim().slice(0, 1000); // Remove tags and limit length
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("carloscuestarod21@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Security: Sanitize inputs
    const rawName = formData.get('name') as string;
    const rawEmail = formData.get('email') as string;
    const rawMessage = formData.get('message') as string;

    const name = sanitizeInput(rawName);
    const email = rawEmail.trim(); // Emails shouldn't have spaces, keep symbols for validity
    const message = sanitizeInput(rawMessage);

    // Security: Strict Validation
    if (!name || !email || !message) {
        alert("Por favor completa todos los campos.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Por favor introduce un email válido.");
        return;
    }

    setStatus('loading');

    // Default values for FormSubmit configuration
    const payload = {
        name,
        email,
        message,
        _subject: "NUEVO LEAD - WEB AUTOMATIZACIÓN (SEGURIDAD VERIFICADA)",
        _captcha: "false",
        _template: "table",
        _autoresponse: "Gracias por contactar. He recibido tu solicitud y la revisaré en breve. - Carlos Cuesta"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/carloscuestarod21@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        console.error("Form submission failed");
        setStatus('error');
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus('error');
    }
  };

  // Robust mailto link construction
  const emailSubject = encodeURIComponent("SOLICITUD DE CONSULTORÍA (Manual)");
  const emailBody = encodeURIComponent("Hola Carlos, intenté contactar por la web pero hubo un error técnico. Me interesa automatizar mi negocio. Aquí tienes mis datos:");
  const mailtoLink = `mailto:carloscuestarod21@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-black">
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="max-w-6xl mx-auto relative group">
                
                {/* Glowing Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl opacity-20 group-hover:opacity-50 blur transition duration-1000 animate-gradient-x"></div>

                <div className="relative bg-[#05070A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl grid md:grid-cols-2">
                    
                    {/* Left: Info & Hologram */}
                    <div className="p-12 relative overflow-hidden flex flex-col justify-between bg-white/[0.01]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                                <span className="text-green-400 font-mono text-sm tracking-widest flex items-center gap-2">
                                    <ShieldCheck size={14} />
                                    CONEXIÓN SEGURA SSL
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                INICIAR <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">PROTOCOLO</span>
                            </h2>
                            
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Esto no es un formulario más. Es el primer paso para recuperar tu libertad. Escribe abajo y el mensaje llegará encriptado directamente a mi dispositivo personal.
                            </p>

                            {/* VISIBLE EMAIL SECTION */}
                            <div className="mt-8 mb-8 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm group/email hover:border-primary/30 transition-all">
                                <p className="text-xs text-slate-500 font-mono uppercase mb-2">Correo Directo</p>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-white font-mono text-sm md:text-base truncate select-all">
                                        carloscuestarod21@gmail.com
                                    </span>
                                    <button 
                                        onClick={handleCopyEmail}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-primary hover:text-black text-white transition-all relative"
                                        title="Copiar email"
                                    >
                                        {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="p-12 bg-black border-l border-white/5">
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                    <CheckCircle2 size={40} className="text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Transmisión Exitosa</h3>
                                <p className="text-slate-400 text-sm mb-6">He recibido tus datos. Revisa tu correo (y spam), recibirás una confirmación automática.</p>
                                <button onClick={() => setStatus('idle')} className="text-primary hover:underline text-sm font-mono">Enviar otro mensaje</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="group relative">
                                    <label className={`absolute left-0 -top-6 text-xs font-mono transition-all ${focusedField === 'name' ? 'text-primary' : 'text-slate-500'}`}>
                                        IDENTIFICACIÓN (NOMBRE)
                                    </label>
                                    <input 
                                        required 
                                        type="text" 
                                        name="name"
                                        maxLength={100}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-primary transition-all font-mono placeholder-slate-800" 
                                        placeholder="Tu Nombre" 
                                    />
                                </div>

                                <div className="group relative">
                                     <label className={`absolute left-0 -top-6 text-xs font-mono transition-all ${focusedField === 'email' ? 'text-primary' : 'text-slate-500'}`}>
                                        PUNTO DE CONTACTO (EMAIL)
                                    </label>
                                    <input 
                                        required 
                                        type="email" 
                                        name="email"
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-primary transition-all font-mono placeholder-slate-800" 
                                        placeholder="tu@email.com" 
                                    />
                                </div>

                                <div className="group relative">
                                     <label className={`absolute left-0 -top-6 text-xs font-mono transition-all ${focusedField === 'message' ? 'text-primary' : 'text-slate-500'}`}>
                                        INFORME DE SITUACIÓN
                                    </label>
                                    <textarea 
                                        required 
                                        rows={3}
                                        name="message"
                                        maxLength={2000}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-primary transition-all font-mono placeholder-slate-800 resize-none" 
                                        placeholder="¿Qué proceso te está robando más tiempo actualmente?" 
                                    />
                                </div>
                                
                                <button 
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-5 bg-white text-black font-black uppercase tracking-wider hover:bg-primary transition-all duration-300 relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {status === 'loading' ? 'Transmitiendo...' : 'Ejecutar Envío'} 
                                        {!status && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                                    </span>
                                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>
                                
                                {/* ERROR STATE / MANUAL FALLBACK */}
                                {status === 'error' && (
                                    <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 animate-fade-in">
                                        <div className="flex items-center gap-2 text-red-400 text-sm font-bold font-mono mb-2">
                                            <AlertCircle size={16} /> 
                                            <span>ERROR DE RED DETECTADO</span>
                                        </div>
                                        <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                                            El firewall o un bloqueador ha detenido la transmisión automática. Usa el enlace manual:
                                        </p>
                                        <a 
                                            href={mailtoLink}
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-white text-xs font-bold bg-red-600 hover:bg-red-700 px-5 py-3 rounded transition-colors uppercase tracking-widest w-full justify-center shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                                        >
                                            <Mail size={14} className="shrink-0" />
                                            <span className="truncate">enviar correo manualmente a carloscuestarod21@gmail.com</span>
                                        </a>
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;
