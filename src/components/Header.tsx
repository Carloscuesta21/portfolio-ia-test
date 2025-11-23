import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { Menu, X, Terminal } from 'lucide-react';

const navItems: NavItem[] = [
  { label: 'INICIO', href: '#hero' },
  { label: 'PROBLEMAS', href: '#problems' },
  { label: 'SOLUCIONES', href: '#services' },
  { label: 'PROCESO', href: '#process' },
  { label: 'CONTACTO', href: '#contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#05070A]/80 backdrop-blur-md border-white/5 py-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO CARLOS CUESTA */}
        <div className="flex items-center gap-3 group cursor-pointer interactive-hover">
           <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg overflow-hidden group-hover:border-primary/50 transition-colors">
             <Terminal size={20} className="text-white group-hover:text-primary transition-colors relative z-10" />
             <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
           </div>
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white font-mono leading-none group-hover:text-primary transition-colors">
              CARLOS CUESTA
            </span>
            <span className="text-[10px] tracking-[0.3em] text-slate-500 font-mono uppercase group-hover:tracking-[0.5em] transition-all duration-300">
              Consulting
            </span>
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-1 items-center bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-5 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 relative group flex items-center gap-2 text-slate-400 hover:text-white hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-primary transition-colors bg-white/5 p-2 rounded-lg border border-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#05070A] border-b border-white/10 p-8 flex flex-col space-y-6 shadow-2xl h-screen z-50 backdrop-blur-xl">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 hover:to-primary transition-all uppercase tracking-tighter"
              onClick={(e) => handleNavClick(e, item.href)}
            >
               {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
