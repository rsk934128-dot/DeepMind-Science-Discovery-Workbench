/**
 * Type definitions for DeepMind Science Discovery Workbench
 */

export interface AlphaFoldPrediction {
  entryId: string;
  gene: string;
  uniprotAccession: string;
  uniprotId: string;
  uniprotDescription: string;
  taxId: number;
  organismScientificName: string;
  uniprotStart: number;
  uniprotEnd: number;
  uniprotSequence: string;
  cifUrl: string;
  bcifUrl: string;
  pdbUrl: string;
  paeImageUrl: string;
  paeDocUrl: string;
}

export interface UniProtRecord {
  primaryAccession: string;
  uniProtkbId: string;
  proteinDescription?: string;
  geneName?: string;
  organismName?: string;
  sequenceLength?: number;
  sequence?: string;
  functionSummary?: string;
  subcellularLocation?: string[];
  domains?: Array<{ name: string; start: number; end: number }>;
  features?: Array<{ type: string; description: string; start: number; end: number }>;
  pdbCrossReferences?: string[];
}

export interface ChemicalCompound {
  cid: number;
  name: string;
  molecularFormula: string;
  molecularWeight: number;
  canonicalSmiles: string;
  isomericSmiles?: string;
  xLogP?: number;
  tpsa?: number;
  hBondDonorCount?: number;
  hBondAcceptorCount?: number;
  rotatableBondCount?: number;
  complexity?: number;
  inChIKey?: string;
  imageUrl?: string;
}

export interface DrugLikenessScore {
  lipinskiPass: boolean;
  lipinskiViolations: string[];
  veberPass: boolean;
  veberViolations: string[];
  leadLikeness: 'High' | 'Moderate' | 'Low';
  oralBioavailabilityProbability: number; // 0 - 100%
}

export interface ClinVarVariant {
  id: string;
  name: string;
  gene: string;
  hgvsCdna?: string;
  hgvsProtein?: string;
  clinicalSignificance: 'Pathogenic' | 'Likely Pathogenic' | 'VUS' | 'Likely Benign' | 'Benign' | 'Conflicting';
  reviewStatus: string;
  reviewStars: number;
  phenotypeList: string[];
  dbSnpId?: string;
}

export interface PathwayItem {
  stId: string;
  displayName: string;
  species: string;
  diagramUrl?: string;
  category?: string;
}

export interface StringInteraction {
  preferredName_A: string;
  preferredName_B: string;
  score: number; // 0.0 - 1.0
  nscore?: number; // neighborhood
  fscore?: number; // fusion
  pscore?: number; // cooccurrence
  ascore?: number; // coexpression
  escore?: number; // experimental
  dscore?: number; // database
  tscore?: number; // textmining
}

export interface PubMedArticle {
  pmid: string;
  title: string;
  source: string;
  pubdate: string;
  authors: string[];
  doi?: string;
  pmc?: string;
  url: string;
}

export interface ClinicalTrial {
  nctId: string;
  briefTitle: string;
  overallStatus: string;
  phase: string;
  leadSponsor: string;
  conditions: string[];
  interventions: string[];
  startDate?: string;
  completionDate?: string;
  url: string;
}

export type ActiveDomainTab =
  | 'structures'
  | 'chemistry'
  | 'genomics'
  | 'pathways'
  | 'literature';
