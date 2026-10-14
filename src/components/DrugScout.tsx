import React, { useState } from 'react';
import { ChemicalCompound, DrugLikenessScore } from '../types/science';
import { evaluateDrugLikeness } from '../services/pubchemService';
import {
  FlaskConical,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Layers,
} from 'lucide-react';

interface DrugScoutProps {
  compound: ChemicalCompound | null;
  loading: boolean;
  onSearchCompound: (query: string) => void;
}

export const DrugScout: React.FC<DrugScoutProps> = ({
  compound,
  loading,
  onSearchCompound,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [copied, setCopied] = useState(false);

  const drugLikeness: DrugLikenessScore | null = compound ? evaluateDrugLikeness(compound) : null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchCompound(searchInput.trim());
    }
  };

  const handleCopySmiles = () => {
    if (!compound?.canonicalSmiles) return;
    navigator.clipboard.writeText(compound.canonicalSmiles);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Quick Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">
              Pharmacology & Small Molecule Scout (PubChem & openFDA)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Calculated physicochemical descriptors, Lipinski Rule of 5, Veber bioavailability, and chemical structure
          </p>
        </div>

        {/* Compound Search Box */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Compound name or CID (e.g. Imatinib, 5291)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-64 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            Scout Compound
          </button>
        </form>
      </div>

      {loading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-slate-500">Querying PubChem PUG REST database...</p>
        </div>
      ) : compound ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 2D Structure & Identification (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="font-semibold text-slate-900 text-sm">{compound.name}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
                  CID: {compound.cid}
                </span>
              </div>

              {/* 2D Depiction Image */}
              <div className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center justify-center min-h-[220px]">
                {compound.imageUrl ? (
                  <img
                    src={compound.imageUrl}
                    alt={compound.name}
                    className="max-h-[200px] object-contain drop-shadow-xs"
                  />
                ) : (
                  <div className="text-slate-400 text-xs">2D Structure Diagram Unavailable</div>
                )}
              </div>

              {/* SMILES Representation */}
              <div className="w-full mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-medium">Canonical SMILES:</span>
                  <button
                    onClick={handleCopySmiles}
                    className="flex items-center gap-1 text-[11px] text-teal-600 hover:text-teal-700 font-medium"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] text-slate-700 break-all select-all">
                  {compound.canonicalSmiles}
                </div>
              </div>

              {/* Outbound Link */}
              <a
                href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.cid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                Open Record in PubChem
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Physicochemical & Drug-Likeness Inspector (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Drug-Likeness / Lipinski Ro5 Compliance Banner */}
            {drugLikeness && (
              <div
                className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
                  drugLikeness.lipinskiPass
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50/70 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {drugLikeness.lipinskiPass ? (
                    <ShieldCheck className="w-7 h-7 text-emerald-600 shrink-0" />
                  ) : (
                    <ShieldAlert className="w-7 h-7 text-amber-600 shrink-0" />
                  )}
                  <div>
                    <h3 className="font-bold text-sm">
                      {drugLikeness.lipinskiPass
                        ? 'Lipinski Rule of 5 Compliant (Drug-Like)'
                        : 'Lipinski Rule of 5 Non-Compliant'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Oral bioavailability probability: ~{drugLikeness.oralBioavailabilityProbability}% | Lead-likeness: {drugLikeness.leadLikeness}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      drugLikeness.veberPass
                        ? 'bg-emerald-200 text-emerald-800'
                        : 'bg-amber-200 text-amber-800'
                    }`}
                  >
                    Veber Rule: {drugLikeness.veberPass ? 'Pass' : 'Flagged'}
                  </span>
                </div>
              </div>
            )}

            {/* Physicochemical Properties Matrix */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-600" />
                Computed Physicochemical Descriptors
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {/* Molecular Weight */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Molecular Weight</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {compound.molecularWeight.toFixed(2)}
                  </span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">g/mol (Limit: ≤ 500)</span>
                </div>

                {/* XLogP */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Calculated LogP (XLogP)</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {compound.xLogP !== undefined ? compound.xLogP.toFixed(2) : 'N/A'}
                  </span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">Lipophilicity (Limit: ≤ 5.0)</span>
                </div>

                {/* TPSA */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Polar Surface Area (TPSA)</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {compound.tpsa !== undefined ? compound.tpsa.toFixed(1) : 'N/A'}
                  </span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">Å² (Veber Limit: ≤ 140)</span>
                </div>

                {/* Formula */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Molecular Formula</span>
                  <span className="font-mono text-base font-bold text-teal-700">
                    {compound.molecularFormula}
                  </span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">Chemical Composition</span>
                </div>

                {/* H-Bond Donors */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">H-Bond Donors</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {compound.hBondDonorCount ?? 'N/A'}
                  </span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">Limit: ≤ 5</span>
                </div>

                {/* H-Bond Acceptors */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">H-Bond Acceptors</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {compound.hBondAcceptorCount ?? 'N/A'}
                  </span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">Limit: ≤ 10</span>
                </div>

                {/* Rotatable Bonds */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Rotatable Bonds</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {compound.rotatableBondCount ?? 'N/A'}
                  </span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">Flexibility (Limit: ≤ 10)</span>
                </div>

                {/* Complexity */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Complexity Rating</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {compound.complexity ?? 'N/A'}
                  </span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">Topological Index</span>
                </div>
              </div>
            </div>

            {/* Violations & Warnings Detail */}
            {drugLikeness && (drugLikeness.lipinskiViolations.length > 0 || drugLikeness.veberViolations.length > 0) && (
              <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 text-xs">
                <h4 className="font-semibold text-amber-900 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Drug-Likeness Parameter Flags
                </h4>
                <ul className="list-disc list-inside space-y-1 text-amber-800">
                  {drugLikeness.lipinskiViolations.map((v, i) => (
                    <li key={`lip-${i}`}>{v}</li>
                  ))}
                  {drugLikeness.veberViolations.map((v, i) => (
                    <li key={`veb-${i}`}>{v}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-xs">
          Search for a compound or select a benchmark target to inspect pharmacological descriptors.
        </div>
      )}
    </div>
  );
};
