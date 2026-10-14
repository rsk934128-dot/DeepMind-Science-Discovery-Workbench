import React from 'react';
import { PathwayItem, StringInteraction } from '../types/science';
import {
  Network,
  Share2,
  ExternalLink,
  Layers,
  Activity,
  CheckCircle,
  GitBranch,
} from 'lucide-react';

interface PathwaysNetworkProps {
  geneSymbol: string;
  pathways: PathwayItem[];
  interactions: StringInteraction[];
  loading: boolean;
}

export const PathwaysNetwork: React.FC<PathwaysNetworkProps> = ({
  geneSymbol,
  pathways,
  interactions,
  loading,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-bold text-slate-900">
              Systems Biology: Pathways & Protein Interaction Networks
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Curated biological pathway cascades (Reactome) and physical/functional interactomes (STRING DB)
          </p>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
          Node: {geneSymbol.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reactome Curated Biological Pathways (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-purple-600" />
                Reactome Biological Pathways ({pathways.length})
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Reactome Content Service
              </span>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-500 font-mono">
                Loading pathway cascades...
              </div>
            ) : (
              <div className="space-y-2.5">
                {pathways.map((pw) => (
                  <div
                    key={pw.stId}
                    className="p-3 rounded-lg border border-slate-200 hover:border-purple-200 hover:bg-purple-50/30 transition-all flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-800 block">
                        {pw.displayName}
                      </span>
                      <span className="font-mono text-slate-400 text-[10px]">
                        ID: {pw.stId} | {pw.species}
                      </span>
                    </div>

                    <a
                      href={pw.diagramUrl || `https://reactome.org/PathwayBrowser/#/${pw.stId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-700 border border-slate-200 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors shrink-0 ml-2"
                    >
                      Diagram
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* STRING PPI Interactors Network (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4 text-purple-600" />
                STRING Protein-Protein Interactors
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                STRING Database (9606)
              </span>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-500 font-mono">
                Computing interaction network...
              </div>
            ) : (
              <div className="space-y-2.5">
                {interactions.map((edge, idx) => {
                  const pct = Math.round(edge.score * 100);
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-slate-200 hover:border-purple-200 hover:bg-purple-50/20 transition-all text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 text-sm">
                            {edge.preferredName_A}
                          </span>
                          <span className="text-slate-400">↔</span>
                          <span className="font-mono font-bold text-purple-700 text-sm">
                            {edge.preferredName_B}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-slate-600 text-[11px]">
                            Confidence:
                          </span>
                          <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-purple-100 text-purple-800">
                            {edge.score.toFixed(3)} ({pct}%)
                          </span>
                        </div>
                      </div>

                      {/* Evidence Channels Bar */}
                      <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="font-medium text-slate-400">Channels:</span>
                        {edge.escore ? (
                          <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                            Exp ({Math.round(edge.escore * 100)}%)
                          </span>
                        ) : null}
                        {edge.dscore ? (
                          <span className="px-1.5 py-0.2 bg-blue-50 text-blue-700 rounded border border-blue-200">
                            Database ({Math.round(edge.dscore * 100)}%)
                          </span>
                        ) : null}
                        {edge.ascore ? (
                          <span className="px-1.5 py-0.2 bg-amber-50 text-amber-700 rounded border border-amber-200">
                            Co-expr ({Math.round(edge.ascore * 100)}%)
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
