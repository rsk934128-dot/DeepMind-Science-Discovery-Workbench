import React from 'react';
import { ExternalLink, Newspaper, Award, TrendingUp } from 'lucide-react';

export const PressAndSocialProof: React.FC = () => {
  const articles = [
    {
      source: 'Fintech Finance News',
      headline: 'Unlimit and UnionPay International Announce Global Issuing Partnership',
      category: 'Global Issuing',
      readTime: '4 min read',
    },
    {
      source: 'Finextra',
      headline: 'Digiseq and Unlimit bring wearable payments to Rugby World Cup',
      category: 'Wearables & IoT',
      readTime: '3 min read',
    },
    {
      source: 'The Paypers',
      headline: 'How Embedded Finance is redefining the landscape of the gig economy',
      category: 'Embedded Finance',
      readTime: '6 min read',
    },
    {
      source: 'Euromoney',
      headline: 'BaaS models buffeted by industry headwinds: The shift to principal licensed providers',
      category: 'Market Intelligence',
      readTime: '5 min read',
    },
    {
      source: 'The Payment Association',
      headline: 'BaaS will grow to play a huge role in embedded finance, says Unlimit',
      category: 'Executive Insights',
      readTime: '4 min read',
    },
    {
      source: 'Finance Digest',
      headline: 'Embracing the Fintech frontier: Navigating international business waters',
      category: 'Cross-Border Rails',
      readTime: '5 min read',
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 mb-3">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Market Recognition & Media</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            As seen in global financial media
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Recognized by leading industry publications for groundbreaking BaaS innovation and direct card issuing.
          </p>
        </div>

        {/* Media Logos Strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pb-12 border-b border-slate-800/80 opacity-70">
          <span className="font-serif text-lg font-bold tracking-wider text-slate-300">The Paypers</span>
          <span className="font-sans text-lg font-extrabold tracking-tight text-slate-300">Fintech Finance</span>
          <span className="font-serif text-lg italic font-bold text-slate-300">Euromoney</span>
          <span className="font-mono text-base font-bold tracking-tight text-slate-300">Finextra</span>
          <span className="font-sans text-lg font-bold tracking-widest uppercase text-slate-300">Digital Frontier</span>
          <span className="font-serif text-lg font-semibold text-slate-300">Finance Digest</span>
        </div>

        {/* Featured News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {articles.map((art, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span className="font-bold text-cyan-400">{art.source}</span>
                  <span>{art.category}</span>
                </div>

                <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors leading-snug">
                  {art.headline}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{art.readTime}</span>
                <span className="flex items-center gap-1 text-cyan-400 font-semibold group-hover:underline">
                  Read article <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
