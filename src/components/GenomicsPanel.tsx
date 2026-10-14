import React, { useState } from 'react';
import { ClinVarVariant } from '../types/science';
import {
  buildAlphaGenomeVariantUrl,
  buildAlphaGenomeLocusUrl,
  CURATED_VARIANTS,
  MODALITY_DISPLAY_MAP,
} from '../services/genomicsService';
import {
  Dna,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  Star,
  Compass,
  Layers,
  Sparkles,
} from 'lucide-react';

interface GenomicsPanelProps {
  geneSymbol: string;
}

export const GenomicsPanel: React.FC<GenomicsPanelProps> = ({ geneSymbol }) => {
  const currentSymbol = geneSymbol.toUpperCase();
  const variants = CURATED_VARIANTS[currentSymbol] || CURATED_VARIANTS['TP53'];

  // AlphaGenome Atlas Interactive Deep-Link Builder State
  const [atlasMode, setAtlasMode] = useState<'variant' | 'locus'>('variant');
  const [customVariant, setCustomVariant] = useState('chr17:7674220:C>T');
  const [customInterval, setCustomInterval] = useState('chr17:7668000-7688000');
  const [biosample, setBiosample] = useState('K562');
  const [selectedModalities, setSelectedModalities] = useState<string[]>([
    'RNA_SEQ',
    'DNASE',
    'CHIP_TF',
  ]);

  const toggleModality = (mod: string) => {
    if (selectedModalities.includes(mod)) {
      if (selectedModalities.length > 1) {
        setSelectedModalities(selectedModalities.filter((m) => m !== mod));
      }
    } else {
      setSelectedModalities([...selectedModalities, mod]);
    }
  };

  // Generate current AlphaGenome Atlas link
  const generatedAtlasUrl =
    atlasMode === 'variant'
      ? buildAlphaGenomeVariantUrl({
          variant: customVariant,
          biosample: biosample || undefined,
          modalities: selectedModalities,
          filterModalities: selectedModalities,
          includeAvi: true,
        })
      : buildAlphaGenomeLocusUrl({
          interval: customInterval,
          biosample: biosample || undefined,
          modalities: selectedModalities,
          filterModalities: selectedModalities,
          includeAvi: true,
        });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Dna className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">
              Genomics, ClinVar & AlphaGenome Atlas Explorer
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ACMG pathogenicity classifications, expert panel reviews, and DeepMind AlphaGenome Atlas epigenomic predictions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
            Target Gene: {currentSymbol}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ClinVar Pathogenic & Benign Variants List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                ClinVar Curated Variants ({variants.length})
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                NCBI ClinVar Database
              </span>
            </div>

            <div className="space-y-3">
              {variants.map((v) => {
                const isPathogenic = v.clinicalSignificance === 'Pathogenic';
                const isBenign = v.clinicalSignificance === 'Benign';

                return (
                  <div
                    key={v.id}
                    className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 text-xs">
                            {v.hgvsProtein || v.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              isPathogenic
                                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                : isBenign
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-100 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {v.clinicalSignificance}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-slate-500 mt-0.5">
                          {v.name}
                        </p>
                      </div>

                      {/* Review Status Stars */}
                      <div className="flex items-center gap-0.5" title={`Review stars: ${v.reviewStars}`}>
                        {Array.from({ length: 4 }).map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-3.5 h-3.5 ${
                              starIdx < v.reviewStars
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Associated Phenotypes */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {v.phenotypeList.map((pheno, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[10px] font-medium"
                        >
                          {pheno}
                        </span>
                      ))}
                    </div>

                    {/* Outbound Link to ClinVar */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="font-mono text-slate-400">
                        dbSNP: {v.dbSnpId || 'N/A'}
                      </span>
                      <a
                        href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${v.id.replace('VCV0000', '')}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1"
                      >
                        ClinVar Record {v.id}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AlphaGenome Atlas Deep-Link Generator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  AlphaGenome Atlas Deep-Linker
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                DeepMind Science
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Construct compliant deep-links to launch DeepMind&apos;s AlphaGenome Atlas directly into specific variant or locus epigenetic predictions.
            </p>

            <div className="space-y-3.5 text-xs">
              {/* Mode Switcher */}
              <div>
                <label className="text-slate-600 font-medium block mb-1">Navigation Mode:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAtlasMode('variant')}
                    className={`py-1.5 px-3 rounded-lg font-medium transition-colors ${
                      atlasMode === 'variant'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Variant Mode (chr:pos:ref&gt;alt)
                  </button>
                  <button
                    onClick={() => setAtlasMode('locus')}
                    className={`py-1.5 px-3 rounded-lg font-medium transition-colors ${
                      atlasMode === 'locus'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Locus Mode (Interval)
                  </button>
                </div>
              </div>

              {/* Coordinate Input */}
              {atlasMode === 'variant' ? (
                <div>
                  <label className="text-slate-600 font-medium block mb-1">
                    Variant Coordinate (1-based):
                  </label>
                  <input
                    type="text"
                    value={customVariant}
                    onChange={(e) => setCustomVariant(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. chr17:7674220:C>T"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-slate-600 font-medium block mb-1">
                    Genomic Interval / Gene:
                  </label>
                  <input
                    type="text"
                    value={customInterval}
                    onChange={(e) => setCustomInterval(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. chr17:7668000-7688000"
                  />
                </div>
              )}

              {/* Biosample */}
              <div>
                <label className="text-slate-600 font-medium block mb-1">Biosample Filter:</label>
                <select
                  value={biosample}
                  onChange={(e) => setBiosample(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
                >
                  <option value="K562">K562 (Chronic Myelogenous Leukemia)</option>
                  <option value="HepG2">HepG2 (Hepatocellular Carcinoma)</option>
                  <option value="GM12878">GM12878 (Lymphoblastoid Cell Line)</option>
                  <option value="A549">A549 (Lung Carcinoma)</option>
                  <option value="MCF-7">MCF-7 (Breast Adenocarcinoma)</option>
                </select>
              </div>

              {/* Modality Layout Toggles */}
              <div>
                <label className="text-slate-600 font-medium block mb-1.5">
                  Atlas Tracks / Modalities:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(MODALITY_DISPLAY_MAP).slice(0, 6).map(([key, label]) => {
                    const active = selectedModalities.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleModality(key)}
                        className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                          active
                            ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Launch Button */}
              <div className="pt-2">
                <a
                  href={generatedAtlasUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  Launch in AlphaGenome Atlas
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
                <p className="text-[10px] text-slate-400 font-mono mt-1.5 text-center break-all">
                  Deep link: {generatedAtlasUrl}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
