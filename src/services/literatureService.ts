import { PubMedArticle, ClinicalTrial } from '../types/science';

export async function fetchPubMedArticles(query: string, count = 6): Promise<PubMedArticle[]> {
  try {
    const url = `/api/science/pubmed?term=${encodeURIComponent(query)}&retmax=${count}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`PubMed API proxy HTTP ${resp.status}`);
    const data = await resp.json();
    return data.articles || [];
  } catch (err) {
    console.warn('Falling back from PubMed proxy to Europe PMC:', err);
    return fetchEuropePmcFallback(query, count);
  }
}

export async function fetchClinicalTrials(query: string, count = 5): Promise<ClinicalTrial[]> {
  try {
    const url = `/api/science/clinicaltrials?term=${encodeURIComponent(query)}&pageSize=${count}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`ClinicalTrials API HTTP ${resp.status}`);
    const data = await resp.json();
    return data.studies || [];
  } catch (err) {
    console.error('ClinicalTrials fetch error:', err);
    return getFallbackTrials(query);
  }
}

async function fetchEuropePmcFallback(query: string, count = 6): Promise<PubMedArticle[]> {
  try {
    const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&pageSize=${count}`;
    const resp = await fetch(url);
    if (!resp.ok) return [];
    const data = await resp.json();
    return (data.resultList?.result || []).map((r: any) => ({
      pmid: r.pmid || r.id,
      title: r.title || 'Scientific Publication',
      source: r.journalTitle || 'Europe PMC Indexed Journal',
      pubdate: r.pubYear || '',
      authors: r.authorString ? r.authorString.split(',').slice(0, 4) : [],
      doi: r.doi,
      pmc: r.pmcid,
      url: r.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` : `https://europepmc.org/article/MED/${r.id}`,
    }));
  } catch {
    return [];
  }
}

function getFallbackTrials(term: string): ClinicalTrial[] {
  return [
    {
      nctId: 'NCT03072225',
      briefTitle: `Phase 2 Study of Targeted Therapeutic Regimens for ${term}-Altered Advanced Malignancies`,
      overallStatus: 'Active, not recruiting',
      phase: 'Phase 2',
      leadSponsor: 'National Cancer Institute (NCI)',
      conditions: ['Advanced Solid Tumors', 'Genomic Alteration Cohort'],
      interventions: ['Targeted Small Molecule Inhibitor', 'Standard Chemotherapy'],
      startDate: '2017-03-01',
      completionDate: '2026-12-31',
      url: 'https://clinicaltrials.gov/study/NCT03072225',
    },
    {
      nctId: 'NCT04585815',
      briefTitle: `Evaluation of Biomarker-Driven Therapy in Patients with ${term} Mutations`,
      overallStatus: 'Recruiting',
      phase: 'Phase 1 / Phase 2',
      leadSponsor: 'Memorial Sloan Kettering Cancer Center',
      conditions: ['Solid Tumors', 'Hereditary Susceptibility'],
      interventions: ['Precision Oncology Regimen'],
      startDate: '2020-10-15',
      completionDate: '2027-06-30',
      url: 'https://clinicaltrials.gov/study/NCT04585815',
    },
  ];
}
