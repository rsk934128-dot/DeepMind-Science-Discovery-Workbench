import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  Lock,
  FileCheck,
  AlertTriangle,
  Fingerprint,
  Zap,
} from 'lucide-react';

export const ComplianceRiskEngine: React.FC = () => {
  const [companySearch, setCompanySearch] = useState('FinFlow Global SAS');
  const [jurisdiction, setJurisdiction] = useState('EU_FRANCE');
  const [screeningResult, setScreeningResult] = useState<{
    status: 'approved' | 'review' | 'flagged';
    riskScore: number;
    sanctionsCheck: string;
    pepCheck: string;
    uboDiscovery: string[];
    timestamp: string;
  }>({
    status: 'approved',
    riskScore: 14,
    sanctionsCheck: 'CLEAR_0_MATCHES',
    pepCheck: 'CLEAR_NO_PEP',
    uboDiscovery: ['Jean-Pierre Dubois (65% Equity)', 'Claire Martin (35% Equity)'],
    timestamp: '2026-10-14 11:20:00 UTC',
  });

  const [isVerifying, setIsVerifying] = useState(false);

  const handleSimulateScreening = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setScreeningResult({
        status: 'approved',
        riskScore: Math.floor(8 + Math.random() * 15),
        sanctionsCheck: 'CLEAR_0_MATCHES',
        pepCheck: 'CLEAR_NO_PEP',
        uboDiscovery: [
          'Founding Director (80% Voting Rights)',
          'Institutional Capital Partner (20%)',
        ],
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      });
    }, 600);
  };

  return (
    <section id="compliance" className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Regulated Digital Compliance & Anti-Fraud</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Future-proof KYC, AML and fraud monitoring
          </h2>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Full regulatory compliance for banking and card payment services. Leverage built-in identity verification, automated KYB registry discovery, and real-time transaction monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Compliance Architecture Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-cyan-400" />
                <span>Automated KYB & UBO Discovery Pipeline</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamlessly onboard corporate customers and merchants across Europe, UK, APAC and North America. Automatically pull corporate registrar records, articles of association, and Ultimate Beneficial Owner (UBO) structures in seconds.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Sanctions Screening</span>
                  <span className="font-bold text-xs text-emerald-400 mt-1 block">Global OFAC / EU / UN</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">PEP & Adverse Media</span>
                  <span className="font-bold text-xs text-cyan-400 mt-1 block">24/7 Continuous Monitor</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">3D Secure 2.2</span>
                  <span className="font-bold text-xs text-indigo-400 mt-1 block">Frictionless Biometric</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-indigo-400" />
                <span>AI-Powered Card Fraud Radar & Velocity Checks</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Protect cardholders and merchants against compromised cards, BIN attacks, and unauthorized transactions with millisecond scoring on every authorization request.
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  Geo-IP Mismatch Detection
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  Card Tokenization / Apple Pay
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  Custom Velocity Rules
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  Instant Automated Card Freeze
                </span>
              </div>
            </div>
          </div>

          {/* Interactive KYB Entity Screening Simulator (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Live KYB Screening Test
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Simulate an automated entity verification check via our compliance API.
              </p>
            </div>

            <form onSubmit={handleSimulateScreening} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Company Legal Name</label>
                <input
                  type="text"
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Incorporation Jurisdiction</label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                >
                  <option value="EU_FRANCE">France (EU) &bull; Registre du Commerce</option>
                  <option value="GB_UK">United Kingdom &bull; Companies House</option>
                  <option value="DE_GERMANY">Germany &bull; Handelsregister</option>
                  <option value="US_DELAWARE">United States &bull; Delaware Division of Corps</option>
                  <option value="SG_SINGAPORE">Singapore &bull; ACRA</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {isVerifying ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                <span>{isVerifying ? 'Running Sanctions & Registry Check...' : 'Verify Legal Entity Now'}</span>
              </button>
            </form>

            {/* Screening Result Output Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">KYB Verification Result:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  PASS (Low Risk)
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Composite Risk Score:</span>
                  <span className="font-bold text-emerald-400">{screeningResult.riskScore} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sanctions Registry:</span>
                  <span className="text-emerald-400">{screeningResult.sanctionsCheck}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">PEP Disclosures:</span>
                  <span className="text-emerald-400">{screeningResult.pepCheck}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Discovered Beneficial Owners (UBO):</span>
                {screeningResult.uboDiscovery.map((ubo, i) => (
                  <div key={i} className="text-[10px] text-cyan-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{ubo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
