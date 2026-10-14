import React, { useState } from 'react';
import {
  CreditCard,
  Building2,
  Terminal,
  ShieldCheck,
  Globe2,
  ArrowRight,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSandbox: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenSandbox,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Solutions', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'card-studio', label: 'Card Studio', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'global-accounts', label: 'Multi-Currency IBAN', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'developer-sandbox', label: 'Dev Sandbox', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'compliance', label: 'Compliance & AML', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 text-white text-[11px] font-medium py-1 px-4 text-center tracking-wide flex flex-wrap items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Gateway Node: <strong className="font-mono bg-blue-900/60 px-1.5 py-0.5 rounded border border-blue-400/30">unlimitbaas.ddns.net</strong> (<code>198.51.100.42</code>) &bull; Operator: <strong>sheikh Skfarid</strong> &bull; Mastercard, Visa & UnionPay BaaS Rails</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 flex items-center justify-center text-white font-extrabold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <span className="text-lg tracking-tighter">U</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                unlimit
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest font-semibold">
                BaaS
              </span>
            </div>
            <span className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase">
              Embedded Banking
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenSandbox}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-semibold font-mono transition-colors shadow-xs"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sandbox API</span>
          </button>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 text-left"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenSandbox();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-lg bg-slate-900 text-cyan-400 border border-slate-700 text-xs font-mono font-semibold text-center"
            >
              Interactive Sandbox API
            </button>
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-lg bg-indigo-600 text-white text-xs font-bold text-center"
            >
              Get in touch with our team
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
