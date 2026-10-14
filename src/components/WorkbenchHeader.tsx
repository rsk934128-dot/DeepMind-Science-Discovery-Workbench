import React, { useState } from 'react';
import { ActiveDomainTab } from '../types/science';
import { BenchmarkTarget, BENCHMARK_TARGETS } from '../data/benchmarks';
import {
  Search,
  Layers,
  FlaskConical,
  Dna,
  Network,
  BookOpen,
  Sparkles,
  Database,
  ExternalLink,
} from 'lucide-react';

interface WorkbenchHeaderProps {
  activeTab: ActiveDomainTab;
  onTabChange: (tab: ActiveDomainTab) => void;
  currentTarget: BenchmarkTarget;
  onSelectTarget: (target: BenchmarkTarget) => void;
  onUniversalSearch: (query: string) => void;
}

export const WorkbenchHeader: React.FC<WorkbenchHeaderProps> = ({
  activeTab,
  onTabChange,
  currentTarget,
  onSelectTarget,
  onUniversalSearch,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onUniversalSearch(searchInput.trim());
    }
  };

  const tabs: Array<{ id: ActiveDomainTab; label: string; icon: React.ReactNode; badge: string }> = [
    {
      id: 'structures',
      label: 'Proteins & 3D Structures',
      icon: <Layers className="w-4 h-4" />,
      badge: 'AlphaFold DB v6',
    },
    {
      id: 'chemistry',
      label: 'Small Molecules & Drug Scout',
      icon: <FlaskConical className="w-4 h-4" />,
      badge: 'PubChem / openFDA',
    },
    {
      id: 'genomics',
      label: 'Genomics & Variants',
      icon: <Dna className="w-4 h-4" />,
      badge: 'ClinVar / AlphaGenome',
    },
    {
      id: 'pathways',
      label: 'Pathways & Interactomes',
      icon: <Network className="w-4 h-4" />,
      badge: 'Reactome / STRING',
    },
    {
      id: 'literature',
      label: 'Literature & Clinical Trials',
      icon: <BookOpen className="w-4 h-4" />,
      badge: 'PubMed / CT.gov',
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                DeepMind Science Discovery Workbench
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Science Skills Suite
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Integrative Biomedical Platform: AlphaFold DB, RCSB PDB, PubChem, ClinVar & Reactome
            </p>
          </div>
        </div>

        {/* Universal Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 min-w-[280px]">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search gene, UniProt ID, PDB, compound..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors shadow-xs"
          >
            Explore
          </button>
        </form>
      </div>

      {/* Benchmark Example Pill Bar (Mandatory Requirement from SKILL.md) */}
      <div className="border-t border-slate-100 bg-slate-50/70 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            Benchmark Targets:
          </span>
          {BENCHMARK_TARGETS.map((tgt) => {
            const isSelected = currentTarget.id === tgt.id;
            return (
              <button
                key={tgt.id}
                onClick={() => onSelectTarget(tgt)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {tgt.symbol}
                <span className={`ml-1 text-[10px] font-mono ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                  {tgt.uniprotAccession || `CID:${tgt.pubchemCid}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Multi-Pane Scientific Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto border-t border-slate-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'border-blue-600 text-blue-600 font-bold bg-blue-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                  isActive
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
