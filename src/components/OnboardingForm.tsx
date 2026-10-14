import React, { useState } from 'react';
import { LeadApplication } from '../types/fintech';
import {
  Send,
  CheckCircle2,
  Sparkles,
  Building2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Key,
} from 'lucide-react';

export const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadApplication>({
    fullName: '',
    corporateEmail: '',
    region: 'Europe (EEA)',
    companyWebsite: '',
    volume: '€1M – €10M monthly',
    message: '',
    marketingConsent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{
    referenceId: string;
    accountManager: string;
    sandboxApiKey: string;
  } | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'This field is required';
    if (!formData.corporateEmail.trim()) {
      newErrors.corporateEmail = 'This field is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.corporateEmail)) {
      newErrors.corporateEmail = 'Please provide a valid corporate email';
    }
    if (!formData.companyWebsite.trim()) newErrors.companyWebsite = 'This field is required';
    if (!formData.message.trim()) newErrors.message = 'This field is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedLead({
        referenceId: `UNLI-${Math.floor(100000 + Math.random() * 900000)}`,
        accountManager: 'Elena Rostova (Global Head of BaaS Onboarding)',
        sandboxApiKey: `unli_live_sandbox_${Math.random().toString(36).substring(2, 14)}`,
      });
    }, 700);
  };

  return (
    <section id="onboarding" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Begin Your Journey Into The Tomorrow of Banking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Get in touch with our team
          </h2>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Our solution is designed for innovative companies looking to bring their ideas and visions to life. Launch your co-branded cards and virtual accounts at speed.
          </p>
        </div>

        {/* Application Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Full name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marcus Thorne"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs font-medium text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 ${
                    errors.fullName ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.fullName && (
                  <span className="text-[11px] text-rose-400 block mt-1">{errors.fullName}</span>
                )}
              </div>

              {/* Corporate Email */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Corporate email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.corporateEmail}
                  onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                  className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs font-medium text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 ${
                    errors.corporateEmail ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.corporateEmail && (
                  <span className="text-[11px] text-rose-400 block mt-1">{errors.corporateEmail}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Region of Incorporation */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Region of incorporation <span className="text-rose-400">*</span>
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Europe (EEA)">Europe (EEA & Switzerland)</option>
                  <option value="United Kingdom">United Kingdom (UK)</option>
                  <option value="Asia Pacific (APAC)">Asia Pacific (APAC)</option>
                  <option value="Latin America (LATAM)">Latin America (LATAM)</option>
                  <option value="North America (USA/Canada)">North America (USA/Canada)</option>
                  <option value="Global / Cross-Border">Global / Multi-Jurisdiction</option>
                </select>
              </div>

              {/* Company Website */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Company website <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="https://yourcompany.com"
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                  className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs font-medium text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 ${
                    errors.companyWebsite ? 'border-rose-500' : 'border-slate-800'
                  }`}
                />
                {errors.companyWebsite && (
                  <span className="text-[11px] text-rose-400 block mt-1">{errors.companyWebsite}</span>
                )}
              </div>
            </div>

            {/* Expected Monthly Volume */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Anticipated Monthly Processing Volume
              </label>
              <select
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Up to €250,000 monthly">Up to €250,000 monthly (Emerging / Startup)</option>
                <option value="€250,000 – €1M monthly">€250,000 – €1,000,000 monthly (Growth FinTech)</option>
                <option value="€1M – €10M monthly">€1,000,000 – €10,000,000 monthly (Scale-up NeoBank)</option>
                <option value="€10M+ monthly">€10,000,000+ monthly (Enterprise / Marketplace)</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Message <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Describe your project, desired card schemes (Mastercard, Visa, UnionPay), virtual account needs, or target launch timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs font-medium text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 ${
                  errors.message ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.message && (
                <span className="text-[11px] text-rose-400 block mt-1">{errors.message}</span>
              )}
            </div>

            {/* Marketing Communications Opt-in */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="marketingConsent"
                checked={formData.marketingConsent}
                onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                className="mt-1 w-4 h-4 rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="marketingConsent" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                Yes, I would like to receive marketing communications and advertisements regarding Unlimit products, services and events in accordance with Unlimit&apos;s Privacy Notices available at our Privacy Centre. I can unsubscribe at any later time.
              </label>
            </div>

            {/* Submit Application Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Transmitting Enterprise Application...' : 'Submit application'}</span>
              </button>

              <p className="text-[11px] text-slate-500 text-center mt-3">
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submittedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-8 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-3 py-1 rounded-full">
                Application Ref: {submittedLead.referenceId}
              </span>
              <h3 className="text-2xl font-bold text-white mt-3">
                Application Successfully Received!
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your enterprise BaaS inquiry has been assigned to our senior solutions engineering team.
              </p>
            </div>

            {/* Provisioned Sandbox Key Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                  <Key className="w-3.5 h-3.5" />
                  <span>Sandbox Staging API Key</span>
                </span>
                <span className="text-[10px] text-emerald-400">ACTIVATED</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-400 break-all select-all text-[11px]">
                {submittedLead.sandboxApiKey}
              </div>
              <div className="text-[10px] text-slate-500 pt-1">
                Assigned Specialist: {submittedLead.accountManager}
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => setSubmittedLead(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs"
              >
                Return to Platform
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
