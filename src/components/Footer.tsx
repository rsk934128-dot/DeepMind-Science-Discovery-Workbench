import React from 'react';
import { ShieldCheck, Globe2, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-white">
                U
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                unlimit
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Global Banking-as-a-Service (BaaS) and embedded finance infrastructure. Principal member of Mastercard, Visa, and UnionPay. Direct issuing, multi-currency accounts, and real-time payment rails.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 font-mono space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Gateway Node: <strong className="text-cyan-300">unlimitbaas.ddns.net</strong></span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">G-Verified</span>
              </div>
              <div className="text-[10px] text-slate-500 pl-4 space-y-0.5">
                <div>IPv4: <span className="text-slate-300">198.51.100.42</span> &bull; IPv6: <span className="text-slate-300">2001:db8:85a3::8a2e:370:7334</span></div>
                <div>SPF: <code className="text-emerald-400">v=spf1 include:no-ip.com -all</code></div>
                <div>Google Search Console: <span className="text-cyan-400">google-site-verification=DK2y...RUac</span></div>
                <div>Node Operator: <span className="text-indigo-300 font-semibold">sheikh Skfarid</span> &bull; Dynamic DNS (No-IP) &bull; PCI-DSS Level 1</div>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Solutions</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#card-studio" className="hover:text-cyan-400 transition-colors">White Label Card Issuing</a></li>
              <li><a href="#global-accounts" className="hover:text-cyan-400 transition-colors">Virtual & IBAN Accounts</a></li>
              <li><a href="#global-accounts" className="hover:text-cyan-400 transition-colors">SEPA Instant & Faster Payments</a></li>
              <li><a href="#developer-sandbox" className="hover:text-cyan-400 transition-colors">Global Acquiring</a></li>
              <li><a href="#compliance" className="hover:text-cyan-400 transition-colors">Digital KYC & Anti-Fraud</a></li>
            </ul>
          </div>

          {/* Developer Column */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Developers</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#developer-sandbox" className="hover:text-cyan-400 transition-colors">Developer Portal</a></li>
              <li><a href="#developer-sandbox" className="hover:text-cyan-400 transition-colors">Sandbox Staging Environment</a></li>
              <li><a href="#developer-sandbox" className="hover:text-cyan-400 transition-colors">API Reference v3</a></li>
              <li><a href="#developer-sandbox" className="hover:text-cyan-400 transition-colors">Webhooks Event Stream</a></li>
              <li><a href="#developer-sandbox" className="hover:text-cyan-400 transition-colors">Postman Collection ↗</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">About Unlimit</a></li>
              <li><a href="#onboarding" className="hover:text-cyan-400 transition-colors">Get in Touch</a></li>
              <li><span className="text-slate-500">Careers ↗ (Hiring)</span></li>
              <li><span className="text-slate-500">Fintech Blog</span></li>
              <li><span className="text-slate-500">Press Centre</span></li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; 2026 Unlimit. All rights reserved. Principal member of Mastercard, Visa, and UnionPay International.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Use</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Notice</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Notice</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
