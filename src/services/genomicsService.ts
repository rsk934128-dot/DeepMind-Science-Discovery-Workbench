import { ClinVarVariant } from '../types/science';

export const BASE_ATLAS_URL = 'https://deepmind.google.com/science/alphagenome/atlas';

export const MODALITY_DISPLAY_MAP: Record<string, string> = {
  RNA_SEQ: 'RNA-seq',
  DNASE: 'DNase',
  ATAC: 'ATAC-seq',
  CHIP_TF: 'ChIP-TF',
  CHIP_HISTONE: 'ChIP-Histone',
  CAGE: 'CAGE',
  PROCAP: 'PRO-cap',
  POLYADENYLATION: 'Polyadenylation',
  SPLICE_JUNCTIONS: 'Splice junctions',
  SPLICE_SITE_USAGE: 'Splice site usage',
};

export interface VariantLinkConfig {
  variant: string;
  biosample?: string;
  modalities?: string[];
  filterModalities?: string[];
  tfs?: string[];
  includeAvi?: boolean;
  interval?: string;
  extraPinned?: string[];
}

export interface LocusLinkConfig {
  interval: string;
  biosample?: string;
  modalities?: string[];
  filterModalities?: string[];
  tfs?: string[];
  includeAvi?: boolean;
}

export function normalizeVariantStr(variantStr: string): string {
  let v = variantStr.trim();
  if (!v.startsWith('chr')) {
    v = `chr${v}`;
  }
  return v;
}

export function buildAtlasFilterString(options: {
  biosample?: string;
  filterModalities?: string[];
  tfs?: string[];
}): string | undefined {
  const parts: string[] = [];
  if (options.biosample) {
    parts.push(`BIOSAMPLE_NAME:${options.biosample}`);
  }

  const activeMods = [...(options.filterModalities ?? [])];
  if (options.tfs && options.tfs.length > 0) {
    for (const required of ['RNA_SEQ', 'DNASE']) {
      if (!activeMods.includes(required)) {
        activeMods.push(required);
      }
    }
  }

  for (const mod of activeMods) {
    const upper = mod.toUpperCase();
    const displayName = MODALITY_DISPLAY_MAP[upper] ?? mod;
    parts.push(`SCORER_MODALITY:${displayName}`);
  }

  for (const tf of options.tfs ?? []) {
    parts.push(`ASSAY_TRANSCRIPTOR_FACTOR:${tf}`);
  }

  return parts.length > 0 ? parts.join(',') : undefined;
}

export function buildAtlasLayoutItems(options: {
  includeAvi?: boolean;
  modalities?: string[];
  pinnedTracks?: string[];
}): string {
  const items: string[] = [];
  if (options.includeAvi ?? true) {
    items.push('avi');
  }
  for (const mod of options.modalities ?? ['RNA_SEQ', 'DNASE', 'CHIP_TF']) {
    items.push(`section:${mod.toUpperCase()}`);
  }
  for (const pinned of options.pinnedTracks ?? []) {
    items.push(pinned);
  }
  return items.length > 0 ? items.join(',') : 'avi';
}

export function buildAlphaGenomeVariantUrl(config: VariantLinkConfig): string {
  const normVar = normalizeVariantStr(config.variant);
  const lItems = buildAtlasLayoutItems({
    includeAvi: config.includeAvi ?? true,
    modalities: config.modalities ?? ['RNA_SEQ', 'DNASE', 'CHIP_TF'],
    pinnedTracks: config.extraPinned ?? [],
  });

  const params = new URLSearchParams();
  params.set('q', normVar);
  params.set('m', 'variant');
  params.set('lItems', lItems);

  if (config.interval) {
    params.set('i', config.interval);
  }

  const filterStr = buildAtlasFilterString({
    biosample: config.biosample,
    filterModalities: config.filterModalities,
    tfs: config.tfs,
  });
  if (filterStr) {
    params.set('f', filterStr);
  }

  return `${BASE_ATLAS_URL}?${params.toString()}`;
}

export function buildAlphaGenomeLocusUrl(config: LocusLinkConfig): string {
  let interval = config.interval.trim();
  if (/^[0-9XYM]+:/i.test(interval) && !interval.toLowerCase().startsWith('chr')) {
    interval = `chr${interval}`;
  }

  const lItems = buildAtlasLayoutItems({
    includeAvi: config.includeAvi ?? true,
    modalities: config.modalities ?? ['RNA_SEQ', 'DNASE', 'CHIP_TF'],
  });

  const params = new URLSearchParams();
  params.set('q', interval);
  params.set('m', 'locus');
  params.set('lItems', lItems);

  const filterStr = buildAtlasFilterString({
    biosample: config.biosample,
    filterModalities: config.filterModalities,
    tfs: config.tfs,
  });
  if (filterStr) {
    params.set('f', filterStr);
  }

  return `${BASE_ATLAS_URL}?${params.toString()}`;
}

/**
 * Standard ClinVar curated benchmarks for prominent cancer & metabolic targets
 */
export const CURATED_VARIANTS: Record<string, ClinVarVariant[]> = {
  TP53: [
    {
      id: 'VCV000012374',
      name: 'NM_000546.6(TP53):c.524G>A (p.Arg175His)',
      gene: 'TP53',
      hgvsCdna: 'c.524G>A',
      hgvsProtein: 'p.Arg175His',
      clinicalSignificance: 'Pathogenic',
      reviewStatus: 'criteria provided, single submitter',
      reviewStars: 3,
      phenotypeList: ['Li-Fraumeni syndrome 1', 'Hereditary cancer-predisposing syndrome'],
      dbSnpId: 'rs28934578',
    },
    {
      id: 'VCV000012377',
      name: 'NM_000546.6(TP53):c.742C>T (p.Arg248Trp)',
      gene: 'TP53',
      hgvsCdna: 'c.742C>T',
      hgvsProtein: 'p.Arg248Trp',
      clinicalSignificance: 'Pathogenic',
      reviewStatus: 'reviewed by expert panel',
      reviewStars: 3,
      phenotypeList: ['Li-Fraumeni syndrome 1', 'Adrenocortical carcinoma'],
      dbSnpId: 'rs11540652',
    },
    {
      id: 'VCV000012378',
      name: 'NM_000546.6(TP53):c.818G>A (p.Arg273His)',
      gene: 'TP53',
      hgvsCdna: 'c.818G>A',
      hgvsProtein: 'p.Arg273His',
      clinicalSignificance: 'Pathogenic',
      reviewStatus: 'reviewed by expert panel',
      reviewStars: 3,
      phenotypeList: ['Li-Fraumeni syndrome', 'Breast cancer susceptibility'],
      dbSnpId: 'rs28934576',
    },
    {
      id: 'VCV000014234',
      name: 'NM_000546.6(TP53):c.215C>G (p.Pro72Arg)',
      gene: 'TP53',
      hgvsCdna: 'c.215C>G',
      hgvsProtein: 'p.Pro72Arg',
      clinicalSignificance: 'Benign',
      reviewStatus: 'criteria provided, multiple submitters',
      reviewStars: 2,
      phenotypeList: ['Common human polymorphism'],
      dbSnpId: 'rs1042522',
    },
  ],
  EGFR: [
    {
      id: 'VCV000016616',
      name: 'NM_005228.5(EGFR):c.2573T>G (p.Leu858Arg)',
      gene: 'EGFR',
      hgvsCdna: 'c.2573T>G',
      hgvsProtein: 'p.Leu858Arg',
      clinicalSignificance: 'Pathogenic',
      reviewStatus: 'reviewed by expert panel',
      reviewStars: 3,
      phenotypeList: ['Non-small cell lung cancer susceptibility (TKI sensitizing)'],
      dbSnpId: 'rs121434568',
    },
    {
      id: 'VCV000016617',
      name: 'NM_005228.5(EGFR):c.2369C>T (p.Thr790Met)',
      gene: 'EGFR',
      hgvsCdna: 'c.2369C>T',
      hgvsProtein: 'p.Thr790Met',
      clinicalSignificance: 'Pathogenic',
      reviewStatus: 'reviewed by expert panel',
      reviewStars: 3,
      phenotypeList: ['Acquired resistance to 1st/2nd generation EGFR inhibitors'],
      dbSnpId: 'rs121434569',
    },
  ],
  BRCA1: [
    {
      id: 'VCV000017661',
      name: 'NM_007294.4(BRCA1):c.68_69delAG (p.Glu23Valfs)',
      gene: 'BRCA1',
      hgvsCdna: 'c.68_69del',
      hgvsProtein: 'p.Glu23Valfs',
      clinicalSignificance: 'Pathogenic',
      reviewStatus: 'reviewed by expert panel',
      reviewStars: 4,
      phenotypeList: ['Hereditary breast and ovarian cancer syndrome'],
      dbSnpId: 'rs386833395',
    },
    {
      id: 'VCV000054231',
      name: 'NM_007294.4(BRCA1):c.181T>G (p.Cys61Gly)',
      gene: 'BRCA1',
      hgvsCdna: 'c.181T>G',
      hgvsProtein: 'p.Cys61Gly',
      clinicalSignificance: 'Pathogenic',
      reviewStatus: 'reviewed by expert panel',
      reviewStars: 3,
      phenotypeList: ['RING domain disruption, HBOC predisposition'],
      dbSnpId: 'rs28897672',
    },
  ],
  PCSK9: [
    {
      id: 'VCV000017992',
      name: 'NM_174936.4(PCSK9):c.1120G>T (p.Asp374Tyr)',
      gene: 'PCSK9',
      hgvsCdna: 'c.1120G>T',
      hgvsProtein: 'p.Asp374Tyr',
      clinicalSignificance: 'Pathogenic',
      reviewStatus: 'reviewed by expert panel',
      reviewStars: 3,
      phenotypeList: ['Autosomal dominant hypercholesterolemia 3 (Gain-of-Function)'],
      dbSnpId: 'rs121908064',
    },
    {
      id: 'VCV000017993',
      name: 'NM_174936.4(PCSK9):c.137G>T (p.Arg46Leu)',
      gene: 'PCSK9',
      hgvsCdna: 'c.137G>T',
      hgvsProtein: 'p.Arg46Leu',
      clinicalSignificance: 'Benign',
      reviewStatus: 'criteria provided, multiple submitters',
      reviewStars: 2,
      phenotypeList: ['Cardioprotective low LDL cholesterol (Loss-of-Function)'],
      dbSnpId: 'rs11591147',
    },
  ],
  ABL1: [
    {
      id: 'VCV000014299',
      name: 'NM_005157.6(ABL1):c.944C>T (p.Thr315Ile)',
      gene: 'ABL1',
      hgvsCdna: 'c.944C>T',
      hgvsProtein: 'p.Thr315Ile',
      clinicalSignificance: 'Pathogenic',
      reviewStatus: 'reviewed by expert panel',
      reviewStars: 3,
      phenotypeList: ['Imatinib & Dasatinib resistance in BCR-ABL1 leukemia'],
      dbSnpId: 'rs121913459',
    },
  ],
};
