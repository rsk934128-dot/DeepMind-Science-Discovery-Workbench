import React from 'react';
import { PubMedArticle, ClinicalTrial } from '../types/science';
import {
  BookOpen,
  FileText,
  ExternalLink,
  Calendar,
  User,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface LiteratureExplorerProps {
  searchTerm: string;
  articles: PubMedArticle[];
  trials: ClinicalTrial[];
  loadingArticles: boolean;
  loadingTrials: boolean;
}

export const LiteratureExplorer: React.FC<LiteratureExplorerProps> = ({
  searchTerm,
  articles,
  trials,
  loadingArticles,
  loadingTrials,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">
              Biomedical Literature & Clinical Protocol Synthesis
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time peer-reviewed citations from NCBI PubMed & Europe PMC and clinical study protocols from ClinicalTrials.gov v2
          </p>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
          Topic: {searchTerm}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PubMed Peer-Reviewed Citations (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" />
                PubMed Curated Articles ({articles.length})
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                NCBI E-utilities & PMC
              </span>
            </div>

            {loadingArticles ? (
              <div className="py-12 text-center text-xs font-mono text-slate-500">
                <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Querying NCBI PubMed repository...
              </div>
            ) : articles.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No indexed articles found for this specific query.
              </div>
            ) : (
              <div className="space-y-3.5">
                {articles.map((art) => (
                  <div
                    key={art.pmid}
                    className="p-3.5 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/20 transition-all text-xs"
                  >
                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-900 hover:text-sky-600 transition-colors block text-sm leading-snug"
                    >
                      {art.title}
                    </a>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-slate-500 text-[11px]">
                      <span className="font-medium text-slate-700">{art.source}</span>
                      {art.pubdate && <span>• {art.pubdate}</span>}
                      <span className="font-mono text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                        PMID: {art.pmid}
                      </span>
                    </div>

                    {art.authors && art.authors.length > 0 && (
                      <div className="mt-1.5 text-[11px] text-slate-500 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>{art.authors.join(', ')}</span>
                      </div>
                    )}

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      {art.doi ? (
                        <span className="text-slate-400 font-mono text-[10px]">
                          DOI: {art.doi}
                        </span>
                      ) : <span />}

                      <a
                        href={art.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1"
                      >
                        Read on PubMed
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ClinicalTrials.gov Protocol Module (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                Clinical Trials (v2 REST API)
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                ClinicalTrials.gov
              </span>
            </div>

            {loadingTrials ? (
              <div className="py-12 text-center text-xs font-mono text-slate-500">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Retrieving active trial protocols...
              </div>
            ) : trials.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No active trials cataloged for this target.
              </div>
            ) : (
              <div className="space-y-3">
                {trials.map((tr) => (
                  <div
                    key={tr.nctId}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:border-emerald-200 transition-colors text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {tr.nctId}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                        {tr.phase}
                      </span>
                    </div>

                    <a
                      href={tr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-900 hover:text-emerald-700 transition-colors block mt-1.5 leading-snug"
                    >
                      {tr.briefTitle}
                    </a>

                    <div className="mt-2 text-[11px] text-slate-600 space-y-0.5">
                      <div>
                        <span className="font-medium text-slate-500">Status: </span>
                        <span className="font-semibold text-slate-800">{tr.overallStatus}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-500">Sponsor: </span>
                        <span>{tr.leadSponsor}</span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200 flex justify-end">
                      <a
                        href={tr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1 text-[11px]"
                      >
                        View Protocol
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
