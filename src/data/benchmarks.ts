/**
 * Authoritative benchmark targets for DeepMind Science Discovery Workbench
 * Provides verified biological identifiers across AlphaFold DB, UniProt, PDB, PubChem, ClinVar & Reactome.
 */

export interface BenchmarkTarget {
  id: string;
  name: string;
  symbol: string;
  type: 'protein' | 'compound';
  uniprotAccession?: string;
  pdbId?: string;
  pubchemCid?: number;
  description: string;
  indicationOrFunction: string;
  organism: string;
  associatedDrugs?: string[];
  associatedVariants?: string[];
  canonicalSmiles?: string;
}

export const BENCHMARK_TARGETS: BenchmarkTarget[] = [
  {
    id: 'TP53',
    name: 'Cellular Tumor Antigen p53',
    symbol: 'TP53',
    type: 'protein',
    uniprotAccession: 'P04637',
    pdbId: '1TUP',
    description: 'Master tumor suppressor ("Guardian of the Genome") regulating cell cycle arrest, senescence, and apoptosis.',
    indicationOrFunction: 'Li-Fraumeni syndrome, somatic mutations in >50% of all human cancers.',
    organism: 'Homo sapiens (Human)',
    associatedDrugs: ['Nutlin-3a', 'APR-246 (Eprenetapopt)', 'Idasanutlin'],
    associatedVariants: ['p.Arg175His (R175H)', 'p.Arg248Trp (R248W)', 'p.Arg273His (R273H)'],
  },
  {
    id: 'EGFR',
    name: 'Epidermal Growth Factor Receptor',
    symbol: 'EGFR',
    type: 'protein',
    uniprotAccession: 'P00533',
    pdbId: '1M17',
    description: 'Receptor tyrosine kinase controlling epithelial cell proliferation and survival via MAPK and PI3K/AKT pathways.',
    indicationOrFunction: 'Non-small cell lung cancer (NSCLC), glioblastoma, colorectal cancer.',
    organism: 'Homo sapiens (Human)',
    associatedDrugs: ['Gefitinib', 'Erlotinib', 'Osimertinib (Tagrisso)'],
    associatedVariants: ['p.Leu858Arg (L858R)', 'p.Thr790Met (T790M gatekeeper)'],
  },
  {
    id: 'BRCA1',
    name: 'Breast Cancer Type 1 Susceptibility Protein',
    symbol: 'BRCA1',
    type: 'protein',
    uniprotAccession: 'P38398',
    pdbId: '1JNX',
    description: 'E3 ubiquitin-protein ligase and nuclear phosphoprotein essential for homologous recombination DNA double-strand break repair.',
    indicationOrFunction: 'Hereditary breast and ovarian cancer syndrome (HBOC), Fanconi anemia.',
    organism: 'Homo sapiens (Human)',
    associatedDrugs: ['Olaparib (Lynparza)', 'Talazoparib', 'Niraparib (Zejula)'],
    associatedVariants: ['c.68_69delAG (185delAG)', 'c.5266dupC (5382insC)', 'p.Cys61Gly (C61G)'],
  },
  {
    id: 'PCSK9',
    name: 'Proprotein Convertase Subtilisin/Kexin Type 9',
    symbol: 'PCSK9',
    type: 'protein',
    uniprotAccession: 'Q8NBP7',
    pdbId: '2P4E',
    description: 'Crucial regulator of plasma cholesterol homeostasis by promoting low-density lipoprotein receptor (LDLR) degradation.',
    indicationOrFunction: 'Familial hypercholesterolemia, atherosclerotic cardiovascular disease.',
    organism: 'Homo sapiens (Human)',
    associatedDrugs: ['Evolocumab (Repatha)', 'Alirocumab (Praluent)', 'Inclisiran'],
    associatedVariants: ['p.Asp374Tyr (D374Y gain-of-function)', 'p.Arg46Leu (R46L loss-of-function)'],
  },
  {
    id: 'ABL1',
    name: 'Tyrosine-Protein Kinase ABL1',
    symbol: 'ABL1',
    type: 'protein',
    uniprotAccession: 'P00520',
    pdbId: '1IEP',
    description: 'Non-receptor tyrosine kinase involved in cell division, adhesion, and stress response; forms oncogenic BCR-ABL1 fusion in leukemia.',
    indicationOrFunction: 'Chronic Myeloid Leukemia (CML), Ph+ Acute Lymphoblastic Leukemia.',
    organism: 'Homo sapiens (Human)',
    associatedDrugs: ['Imatinib (Gleevec)', 'Dasatinib (Sprycel)', 'Ponatinib (Iclusig)'],
    associatedVariants: ['p.Thr315Ile (T315I gatekeeper)', 'p.Glu255Lys (E255K)'],
  },
  {
    id: 'Imatinib',
    name: 'Imatinib (Gleevec)',
    symbol: 'IMATINIB',
    type: 'compound',
    pubchemCid: 5291,
    uniprotAccession: 'P00520',
    pdbId: '1IEP',
    description: 'First-in-class selective 2-phenylaminopyrimidine BCR-ABL1 kinase inhibitor that revolutionized targeted oncology.',
    indicationOrFunction: 'First-line therapy for chronic myeloid leukemia (CML) and gastrointestinal stromal tumors (GIST).',
    organism: 'Small Molecule',
    canonicalSmiles: 'CC1=C(C=C(C=C1)NC(=O)C2=CC=C(C=C2)CN3CCN(CC3)C)NC4=NC=CC(=N4)C5=CN=CC=C5',
    associatedDrugs: ['Imatinib mesylate'],
  },
  {
    id: 'Aspirin',
    name: 'Aspirin (Acetylsalicylic Acid)',
    symbol: 'ASPIRIN',
    type: 'compound',
    pubchemCid: 2244,
    description: 'Prototypical non-steroidal anti-inflammatory drug (NSAID) acting via irreversible acetylation of COX-1 and COX-2 enzymes.',
    indicationOrFunction: 'Analgesia, antipyresis, secondary cardiovascular event prevention.',
    organism: 'Small Molecule',
    canonicalSmiles: 'CC(=O)OC1=CC=CC=C1C(=O)O',
    associatedDrugs: ['Acetylsalicylic acid', 'Bayer Aspirin'],
  },
  {
    id: 'Remdesivir',
    name: 'Remdesivir (Veklury)',
    symbol: 'REMDESIVIR',
    type: 'compound',
    pubchemCid: 121304016,
    description: 'Broad-spectrum monophosphoramidate prodrug of an adenosine analog targeting viral RNA-dependent RNA polymerase (RdRp).',
    indicationOrFunction: 'Treatment of COVID-19 hospitalization and filovirus infections.',
    organism: 'Small Molecule',
    canonicalSmiles: 'CCC(CC)COC(=O)C(C)NP(=O)(OCC1C(C(C(O1)C#N)O)O)OC2=CC=CC=C2',
    associatedDrugs: ['Veklury'],
  },
];
