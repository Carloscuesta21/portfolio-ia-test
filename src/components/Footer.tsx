import React from 'react';
import { Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-background border-t border-slate-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-500 text-sm">
          © 2024 Carlos Cuesta. Todos los derechos reservados.
        </div>
        
        <div className="flex space-x-6">
          <a 
            href="https://www.linkedin.com/in/carloscuestarod/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group" 
            aria-label="LinkedIn"
          >
            <span className="text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">Conecta conmigo</span>
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
