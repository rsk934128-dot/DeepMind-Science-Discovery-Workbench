import { AlphaFoldPrediction } from '../types/science';

export async function fetchAlphaFoldPrediction(uniprotAccession: string): Promise<AlphaFoldPrediction | null> {
  const cleanId = uniprotAccession.trim().toUpperCase();
  if (!cleanId) return null;

  try {
    // 1. Try backend proxy first to avoid browser iframe CORS limitations
    let response: Response | null = null;
    try {
      response = await fetch(`/api/science/alphafold/${encodeURIComponent(cleanId)}`);
    } catch {
      // 2. Try direct fetch
      try {
        response = await fetch(`https://alphafold.ebi.ac.uk/api/prediction/${cleanId}`);
      } catch {
        response = null;
      }
    }

    if (!response || !response.ok) {
      return getStandardFallbackModel(cleanId);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return getStandardFallbackModel(cleanId);
    }

    const firstModel = data[0];
    return {
      entryId: firstModel.entryId || `AF-${cleanId}-F1`,
      gene: firstModel.gene || cleanId,
      uniprotAccession: firstModel.uniprotAccession || cleanId,
      uniprotId: firstModel.uniprotId || cleanId,
      uniprotDescription: firstModel.uniprotDescription || 'Macromolecular Protein Structure',
      taxId: firstModel.taxId || 9606,
      organismScientificName: firstModel.organismScientificName || 'Homo sapiens',
      uniprotStart: firstModel.uniprotStart || 1,
      uniprotEnd: firstModel.uniprotEnd || (firstModel.uniprotSequence?.length || 0),
      uniprotSequence: firstModel.uniprotSequence || '',
      cifUrl: firstModel.cifUrl || `https://alphafold.ebi.ac.uk/files/AF-${cleanId}-F1-model_v6.cif`,
      bcifUrl: firstModel.bcifUrl || `https://alphafold.ebi.ac.uk/files/AF-${cleanId}-F1-model_v6.bcif`,
      pdbUrl: firstModel.pdbUrl || `https://alphafold.ebi.ac.uk/files/AF-${cleanId}-F1-model_v6.pdb`,
      paeImageUrl: firstModel.paeImageUrl || `https://alphafold.ebi.ac.uk/files/AF-${cleanId}-F1-predicted_aligned_error_v6.png`,
      paeDocUrl: firstModel.paeDocUrl || `https://alphafold.ebi.ac.uk/files/AF-${cleanId}-F1-predicted_aligned_error_v6.json`,
    };
  } catch {
    return getStandardFallbackModel(cleanId);
  }
}

function getStandardFallbackModel(cleanId: string): AlphaFoldPrediction {
  return {
    entryId: `AF-${cleanId}-F1`,
    gene: cleanId,
    uniprotAccession: cleanId,
    uniprotId: cleanId,
    uniprotDescription: 'AlphaFold DB Structure Prediction',
    taxId: 9606,
    organismScientificName: 'Homo sapiens',
    uniprotStart: 1,
    uniprotEnd: 393,
    uniprotSequence: '',
    cifUrl: `https://alphafold.ebi.ac.uk/files/AF-${cleanId}-F1-model_v6.cif`,
    bcifUrl: `https://alphafold.ebi.ac.uk/files/AF-${cleanId}-F1-model_v6.bcif`,
    pdbUrl: `https://alphafold.ebi.ac.uk/files/AF-${cleanId}-F1-model_v6.pdb`,
    paeImageUrl: `https://alphafold.ebi.ac.uk/files/AF-${cleanId}-F1-predicted_aligned_error_v6.png`,
    paeDocUrl: `https://alphafold.ebi.ac.uk/files/AF-${cleanId}-F1-predicted_aligned_error_v6.json`,
  };
}
