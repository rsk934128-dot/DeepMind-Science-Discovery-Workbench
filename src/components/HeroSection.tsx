import React from 'react';
import {
  CreditCard,
  Building2,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe2,
  ChevronRight,
  TrendingUp,
  Cpu,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreCards: () => void;
  onExploreAccounts: () => void;
  onOpenSandbox: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCards,
  onExploreAccounts,
  onOpenSandbox,
  onOpenContact,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-24 border-b border-slate-800">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-cyan-500/20 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vision & Copy (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-medium text-slate-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span className="text-cyan-300 font-mono font-semibold">BaaS 3.0</span>
              <span className="text-slate-400">&bull;</span>
              <span>Next-Generation Embedded Finance Infrastructure</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Bringing <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">innovation</span> into banking.
              </h1>
              <p className="text-2xl sm:text-3xl font-light text-slate-300 tracking-tight">
                Enter the tomorrow of banking now.
              </p>
            </div>

            <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
              Move forward from legacy and banking technology limitations and into the fintech world of tomorrow with limitless possibilities. One contract, one unified global provider.
            </p>

            {/* Quick Benefits Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Principal member of Mastercard, Visa & UnionPay</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dedicated individual IBANs with SEPA Instant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Sub-second tokenized virtual & physical issuing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Built-in automated KYC, AML & anti-fraud radar</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center gap-2 transition-all"
              >
                <span>Get in touch with our team</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSandbox}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 font-mono text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Explore BaaS Sandbox</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                Direct Principal Rails:
              </span>
              <div className="flex items-center gap-4 text-slate-300 font-semibold text-xs">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Mastercard</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Visa</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">UnionPay</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">SEPA Instant</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech FinTech Card & Banking Platform Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-lg">
              {/* Floating Status Pill */}
              <div className="absolute -top-3.5 -right-2 z-20 bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 rounded-xl px-3.5 py-1.5 shadow-xl shadow-cyan-950/50 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-mono text-cyan-300 text-[11px] font-bold">SEPA INSTANT ACTIVE (&lt;10s)</span>
              </div>

              {/* Floating Left Security Pill */}
              <div className="absolute -bottom-3.5 -left-2 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-mono text-slate-300 font-semibold">Tier-1 Principal Direct Rails</span>
              </div>

              {/* Image Showcase Frame with Ambient Glow */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-indigo-950/50 group">
                <img
                  src="/src/assets/images/fintech_hero_banner_1792003830278.jpg"
                  alt="Unlimit Next-Gen FinTech Banking Platform and Card Infrastructure"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Inset Metadata Bar */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-white font-bold block text-xs">Direct Core Card Issuing</span>
                      <span className="text-[10px] text-slate-400 font-mono">Mastercard &bull; Visa &bull; UnionPay</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold">
                    LIVE RAILS
                  </span>
                </div>
              </div>

              {/* Floating Transaction Notification Pill */}
              <div className="mt-5 p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">SEPA Instant Settlement</span>
                    <span className="text-[10px] text-slate-400 font-mono">Stripe Europe &rarr; EUR Treasury IBAN</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  +€145,000.00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Key Metrics Bar */}
        <div className="mt-16 pt-10 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
              €12B+
            </span>
            <span className="text-xs text-slate-400 block mt-1">Annual Processed Volume</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              &lt; 10s
            </span>
            <span className="text-xs text-slate-400 block mt-1">SEPA Instant Settlement</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">
              100+
            </span>
            <span className="text-xs text-slate-400 block mt-1">Supported Currencies</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              99.99%
            </span>
            <span className="text-xs text-slate-400 block mt-1">Core Banking Rails Uptime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
