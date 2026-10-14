import React, { useEffect, useRef, useState } from 'react';
import { AlphaFoldPrediction, UniProtRecord } from '../types/science';
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Camera,
  Maximize2,
  ExternalLink,
  Download,
  Info,
  CheckCircle,
  Layers,
  Sparkles,
} from 'lucide-react';

interface StructureViewerProps {
  prediction: AlphaFoldPrediction | null;
  uniprot: UniProtRecord | null;
  pdbId?: string;
  loading: boolean;
}

declare global {
  interface Window {
    $3Dmol?: any;
  }
}

export const StructureViewer: React.FC<StructureViewerProps> = ({
  prediction,
  uniprot,
  pdbId,
  loading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  const [activeModelType, setActiveModelType] = useState<'alphafold' | 'pdb'>('alphafold');
  const [styleMode, setStyleMode] = useState<'cartoon' | 'stick' | 'sphere' | 'surface'>('cartoon');
  const [colorMode, setColorMode] = useState<'plddt' | 'spectrum' | 'chain' | 'secondary'>('plddt');
  const [isSpinning, setIsSpinning] = useState(false);
  const [bgColor, setBgColor] = useState<'#0f172a' | '#f8fafc'>('#0f172a');
  const [showPaeModal, setShowPaeModal] = useState(false);
  const [structureError, setStructureError] = useState<string | null>(null);
  const [renderStatus, setRenderStatus] = useState<string>('Initializing WebGL viewer...');

  // Initialize viewer
  useEffect(() => {
    if (!containerRef.current) return;

    const $3Dmol = window.$3Dmol;
    if (!$3Dmol) {
      setStructureError('3Dmol WebGL library is loading...');
      return;
    }

    try {
      containerRef.current.innerHTML = '';
      const viewer = $3Dmol.createViewer(containerRef.current, {
        backgroundColor: bgColor,
        defaultcolors: $3Dmol.rasmolElementColors,
      });
      viewerRef.current = viewer;
      setRenderStatus('Ready to load structure coordinates');
    } catch (e: any) {
      console.error('Failed to create 3Dmol viewer:', e);
      setStructureError('WebGL context creation failed. Check browser hardware acceleration.');
    }
  }, [bgColor]);

  // Load structure whenever prediction, activeModelType, or pdbId changes
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    let isCancelled = false;

    async function loadData() {
      setStructureError(null);
      viewer.clear();

      try {
        if (activeModelType === 'pdb' && pdbId) {
          setRenderStatus(`Fetching experimental crystal structure RCSB PDB (${pdbId})...`);
          let cifData = '';
          try {
            const resp = await fetch(`https://files.rcsb.org/download/${pdbId.toUpperCase()}.cif`);
            if (resp.ok) cifData = await resp.text();
          } catch {
            // Fallback to server proxy
            try {
              const proxyResp = await fetch(`/api/science/structure/download?url=${encodeURIComponent(`https://files.rcsb.org/download/${pdbId.toUpperCase()}.cif`)}`);
              if (proxyResp.ok) cifData = await proxyResp.text();
            } catch {
              // Ignore
            }
          }

          if (isCancelled) return;
          if (cifData) {
            viewer.addModel(cifData, 'cif');
            applyViewerStyles(viewer, styleMode, colorMode);
            viewer.zoomTo();
            viewer.render();
            setRenderStatus(`Rendered RCSB PDB experimental structure: ${pdbId.toUpperCase()}`);
          }
        } else if (prediction) {
          setRenderStatus(`Fetching AlphaFold DB model for ${prediction.uniprotAccession}...`);
          
          let coordData = '';
          let format = 'cif';

          // Try CIF direct
          try {
            const cifRes = await fetch(prediction.cifUrl);
            if (cifRes.ok) {
              coordData = await cifRes.text();
              format = 'cif';
            }
          } catch {
            // Try via proxy
            try {
              const proxyRes = await fetch(`/api/science/structure/download?url=${encodeURIComponent(prediction.cifUrl)}`);
              if (proxyRes.ok) {
                coordData = await proxyRes.text();
                format = 'cif';
              }
            } catch {
              // Fallback to PDB
            }
          }

          if (!coordData) {
            try {
              const pdbRes = await fetch(prediction.pdbUrl);
              if (pdbRes.ok) {
                coordData = await pdbRes.text();
                format = 'pdb';
              }
            } catch {
              try {
                const proxyPdb = await fetch(`/api/science/structure/download?url=${encodeURIComponent(prediction.pdbUrl)}`);
                if (proxyPdb.ok) {
                  coordData = await proxyPdb.text();
                  format = 'pdb';
                }
              } catch {
                // Ignore
              }
            }
          }

          if (isCancelled) return;

          if (coordData) {
            viewer.addModel(coordData, format);
            applyViewerStyles(viewer, styleMode, colorMode);
            viewer.zoomTo();
            viewer.render();
            setRenderStatus(`Rendered AlphaFold DB model: ${prediction.entryId}`);
          }
        }
      } catch (err: any) {
        setStructureError(err.message || 'Failed to load macromolecular coordinate file');
        setRenderStatus('Failed to load structure');
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [prediction, activeModelType, pdbId]);

  // Apply styles and color schemes
  const applyViewerStyles = (
    viewer: any,
    currentStyle: 'cartoon' | 'stick' | 'sphere' | 'surface',
    currentColor: 'plddt' | 'spectrum' | 'chain' | 'secondary'
  ) => {
    if (!viewer) return;
    viewer.removeAllSurfaces();

    // Color function based on AlphaFold pLDDT
    const plddtColorFunc = (atom: any) => {
      const b = atom.b;
      if (b > 90) return '#0053D6'; // Very high (>90): Dark Blue
      if (b > 70) return '#65CBF3'; // Confident (70-90): Light Blue
      if (b > 50) return '#FFDB13'; // Low (50-70): Yellow
      return '#FF7D45';             // Very low (<50): Orange
    };

    let styleObj: any = {};

    if (currentStyle === 'cartoon') {
      if (currentColor === 'plddt') {
        styleObj = { cartoon: { colorfunc: plddtColorFunc } };
      } else if (currentColor === 'spectrum') {
        styleObj = { cartoon: { color: 'spectrum' } };
      } else if (currentColor === 'chain') {
        styleObj = { cartoon: { colorscheme: 'chain' } };
      } else {
        styleObj = { cartoon: { colorscheme: 'ssJmol' } };
      }
    } else if (currentStyle === 'stick') {
      styleObj = { stick: { radius: 0.25 } };
    } else if (currentStyle === 'sphere') {
      styleObj = { sphere: { scale: 0.8 } };
    } else if (currentStyle === 'surface') {
      styleObj = { cartoon: { colorfunc: plddtColorFunc } };
      try {
        viewer.addSurface(window.$3Dmol?.SurfaceType?.VDW || 1, { opacity: 0.65, color: '#0053D6' });
      } catch {
        // Ignore surface fallback
      }
    }

    viewer.setStyle({}, styleObj);
    // Highlight heteroatoms / ligands if present
    viewer.setStyle({ hetflag: true }, { stick: { colorscheme: 'greenCarbon', radius: 0.3 } });
    viewer.render();
  };

  // Re-apply style when styleMode or colorMode changes
  const handleStyleChange = (mode: 'cartoon' | 'stick' | 'sphere' | 'surface') => {
    setStyleMode(mode);
    if (viewerRef.current) {
      applyViewerStyles(viewerRef.current, mode, colorMode);
    }
  };

  const handleColorChange = (col: 'plddt' | 'spectrum' | 'chain' | 'secondary') => {
    setColorMode(col);
    if (viewerRef.current) {
      applyViewerStyles(viewerRef.current, styleMode, col);
    }
  };

  // Camera & animation controls
  const toggleSpin = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (isSpinning) {
      viewer.spin(false);
      setIsSpinning(false);
    } else {
      viewer.spin('y', 1.0);
      setIsSpinning(true);
    }
  };

  const handleResetCamera = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    viewer.zoomTo();
    viewer.render();
  };

  const handleZoom = (factor: number) => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    viewer.zoom(factor);
    viewer.render();
  };

  const handleSnapshot = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    try {
      const dataUri = viewer.pngURI();
      const link = document.createElement('a');
      link.download = `${prediction?.entryId || 'macromolecule'}_structure.png`;
      link.href = dataUri;
      link.click();
    } catch (e) {
      console.error('Failed to capture snapshot:', e);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 3D WebGL Canvas Viewport (8 Cols) */}
      <div className="lg:col-span-8 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        {/* Canvas Toolbar */}
        <div className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 border border-blue-500/30">
              3D WebGL
            </span>
            <span className="text-sm font-medium text-slate-200">
              {activeModelType === 'alphafold'
                ? prediction?.entryId || 'AlphaFold Model'
                : `Experimental PDB: ${pdbId || 'Crystal'}`}
            </span>
          </div>

          {/* Model Switcher Pill */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setActiveModelType('alphafold')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeModelType === 'alphafold'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AlphaFold DB (v6)
            </button>
            {pdbId && (
              <button
                onClick={() => setActiveModelType('pdb')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeModelType === 'pdb'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                RCSB PDB ({pdbId})
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleSpin}
              title="Toggle Auto-Rotation"
              className={`p-1.5 rounded text-xs transition-colors ${
                isSpinning ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(1.2)}
              title="Zoom In"
              className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white text-xs"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(0.8)}
              title="Zoom Out"
              className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white text-xs"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetCamera}
              title="Reset Camera Orientation"
              className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white text-xs"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleSnapshot}
              title="Export High-Resolution PNG"
              className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white text-xs"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              onClick={() => setBgColor(bgColor === '#0f172a' ? '#f8fafc' : '#0f172a')}
              title="Toggle Canvas Background (Dark / Light)"
              className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-xs font-mono"
            >
              {bgColor === '#0f172a' ? 'Dark' : 'Light'}
            </button>
          </div>
        </div>

        {/* 3D Container */}
        <div className="relative w-full h-[500px] bg-slate-950">
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Rendering / Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center text-white z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-mono text-slate-300">{renderStatus}</span>
              </div>
            </div>
          )}

          {structureError && (
            <div className="absolute inset-0 bg-slate-950/90 flex items-center justify-center text-rose-400 p-6 z-10 text-center">
              <div>
                <p className="font-semibold text-rose-300 mb-1">Visualization Error</p>
                <p className="text-xs text-rose-400/80 font-mono max-w-md">{structureError}</p>
                <button
                  onClick={handleResetCamera}
                  className="mt-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs"
                >
                  Retry Loading Coordinates
                </button>
              </div>
            </div>
          )}

          {/* Interactive Legend (AlphaFold pLDDT 4-Band Scale) */}
          {activeModelType === 'alphafold' && colorMode === 'plddt' && (
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg p-2.5 text-xs text-white z-10 shadow-lg">
              <div className="font-semibold text-slate-200 mb-1.5 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                AlphaFold pLDDT Confidence
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#0053D6]" />
                  <span>Very High (&gt;90)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#65CBF3]" />
                  <span>Confident (70–90)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FFDB13]" />
                  <span>Low (50–70)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF7D45]" />
                  <span>Very Low / Disordered (&lt;50)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Viewport Secondary Bar: Representations & Colors */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-600">Representation:</span>
            {(['cartoon', 'stick', 'sphere', 'surface'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => handleStyleChange(mode)}
                className={`px-2.5 py-1 rounded font-medium capitalize transition-colors ${
                  styleMode === mode
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-600">Coloring:</span>
            {(['plddt', 'spectrum', 'secondary', 'chain'] as const).map((col) => (
              <button
                key={col}
                onClick={() => handleColorChange(col)}
                className={`px-2.5 py-1 rounded font-medium capitalize transition-colors ${
                  colorMode === col
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {col === 'plddt' ? 'pLDDT Gradient' : col}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Synchronized Data Inspector & Epistemic Provenance (4 Cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Model Descriptor Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Structural Provenance
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              [Model Predicted]
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 block">Target Protein / Gene:</span>
              <span className="font-semibold text-slate-900 text-sm">
                {prediction?.gene || uniprot?.geneName || 'Target Molecule'}
              </span>
              <p className="text-slate-600 text-xs mt-0.5">
                {prediction?.uniprotDescription || uniprot?.proteinDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-500 block">UniProt Accession:</span>
                <a
                  href={`https://www.uniprot.org/uniprotkb/${prediction?.uniprotAccession}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                >
                  {prediction?.uniprotAccession}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">Taxon:</span>
                <span className="font-mono text-slate-700">{prediction?.organismScientificName || '9606'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-500 block">Residue Span:</span>
                <span className="font-mono font-medium text-slate-800">
                  {prediction?.uniprotStart || 1} - {prediction?.uniprotEnd || uniprot?.sequenceLength || 393} aa
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">AlphaFold Model:</span>
                <span className="font-mono text-slate-700">{prediction?.entryId}</span>
              </div>
            </div>

            {/* PAE Matrix Trigger */}
            {prediction?.paeImageUrl && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setShowPaeModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  View Predicted Aligned Error (PAE) Matrix
                </button>
              </div>
            )}

            {/* Coordinate File Downloads */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="text-slate-500 block font-medium">Download Coordinates:</span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={prediction?.cifUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-mono text-[11px] font-medium"
                >
                  <Download className="w-3 h-3" />
                  mmCIF (.cif)
                </a>
                <a
                  href={prediction?.pdbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-mono text-[11px] font-medium"
                >
                  <Download className="w-3 h-3" />
                  PDB (.pdb)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Functional Domains Card */}
        {uniprot?.domains && uniprot.domains.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-2">
              Annotated Protein Domains (UniProt)
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {uniprot.domains.map((dom, i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-800">{dom.name}</span>
                  <span className="font-mono text-slate-500 text-[11px]">
                    {dom.start}–{dom.end}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experimental PDB Cross-References */}
        {uniprot?.pdbCrossReferences && uniprot.pdbCrossReferences.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-2">
              RCSB PDB Experimental Structures
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {uniprot.pdbCrossReferences.map((id) => (
                <a
                  key={id}
                  href={`https://www.rcsb.org/structure/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded font-mono text-xs font-semibold text-slate-700 border border-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  {id}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PAE Matrix Modal */}
      {showPaeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Predicted Aligned Error (PAE) Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inter-domain distance confidence in Ångströms (AlphaFold DB v6)
                </p>
              </div>
              <button
                onClick={() => setShowPaeModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={prediction?.paeImageUrl}
                alt="Predicted Aligned Error Matrix"
                className="w-full max-h-[360px] object-contain rounded-lg border border-slate-200 bg-slate-900"
              />
              <p className="text-xs text-slate-500 mt-3 text-center">
                Low error (&lt; 5 Å, dark green) indicates confident relative orientation of residues and domains. High error (&gt; 15 Å) indicates flexible or unresolved inter-domain linkers.
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowPaeModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
