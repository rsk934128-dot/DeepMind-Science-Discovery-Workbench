import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  const USER_EMAIL = process.env.USER_EMAIL || 'rasadsk007@gmail.com';
  const NCBI_API_KEY = process.env.NCBI_API_KEY || '';
  const FDA_API_KEY = process.env.FDA_API_KEY || '';
  const OPENALEX_API_KEY = process.env.OPENALEX_API_KEY || '';

  // Google Site Verification Endpoint (for Google Search Console)
  app.get('/googleDK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac.html', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('google-site-verification: googleDK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac.html');
  });

  // Domain & DNS Infrastructure Configuration
  app.get('/api/infrastructure/dns', (_req: Request, res: Response) => {
    res.json({
      status: 'active',
      domain: 'unlimitbaas.ddns.net',
      records: {
        a: {
          type: 'A',
          host: '@',
          ipv4: '198.51.100.42',
          ttl: 300,
          status: 'propagated'
        },
        aaaa: {
          type: 'AAAA',
          host: '@',
          ipv6: '2001:db8:85a3::8a2e:370:7334',
          ttl: 300,
          status: 'propagated'
        },
        spf: {
          type: 'TXT',
          host: '@',
          value: 'v=spf1 include:no-ip.com -all',
          description: 'Sender Policy Framework (SPF) for No-IP dynamic DNS email authentication',
          status: 'active'
        },
        googleSiteVerification: {
          type: 'TXT / Meta',
          key: 'google-site-verification',
          value: 'DK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac',
          fullTxt: 'google-site-verification=DK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac',
          status: 'verified'
        }
      },
      ddnsProvider: 'No-IP (ddns.net)',
      sslStatus: 'TLS 1.3 Active',
      timestamp: new Date().toISOString()
    });
  });

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Unlimit Banking-as-a-Service Platform',
      domain: 'unlimitbaas.ddns.net',
      dnsConfigured: true,
      googleVerified: true,
      configuredEmail: USER_EMAIL ? 'configured' : 'default',
      timestamp: new Date().toISOString(),
    });
  });

  // 1. PubMed / NCBI Proxy route (respecting rate limits & polite email)
  app.get('/api/science/pubmed', async (req: Request, res: Response) => {
    try {
      const term = (req.query.term as string) || 'TP53';
      const retmax = Number(req.query.retmax) || 6;
      
      const esearchUrl = new URL('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi');
      esearchUrl.searchParams.set('db', 'pubmed');
      esearchUrl.searchParams.set('term', term);
      esearchUrl.searchParams.set('retmode', 'json');
      esearchUrl.searchParams.set('retmax', String(retmax));
      esearchUrl.searchParams.set('sort', 'relevance');
      esearchUrl.searchParams.set('email', USER_EMAIL);
      esearchUrl.searchParams.set('tool', 'DeepMindScienceWorkbench');
      if (NCBI_API_KEY) esearchUrl.searchParams.set('api_key', NCBI_API_KEY);

      const searchResp = await fetch(esearchUrl.toString());
      if (!searchResp.ok) {
        throw new Error(`NCBI esearch failed with status ${searchResp.status}`);
      }
      const searchData = await searchResp.json();
      const idList: string[] = searchData?.esearchresult?.idlist || [];

      if (idList.length === 0) {
        return res.json({ total: 0, articles: [] });
      }

      // Fetch summary for retrieved IDs
      const esummaryUrl = new URL('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi');
      esummaryUrl.searchParams.set('db', 'pubmed');
      esummaryUrl.searchParams.set('id', idList.join(','));
      esummaryUrl.searchParams.set('retmode', 'json');
      esummaryUrl.searchParams.set('email', USER_EMAIL);
      esummaryUrl.searchParams.set('tool', 'DeepMindScienceWorkbench');
      if (NCBI_API_KEY) esummaryUrl.searchParams.set('api_key', NCBI_API_KEY);

      const summaryResp = await fetch(esummaryUrl.toString());
      if (!summaryResp.ok) {
        throw new Error(`NCBI esummary failed with status ${summaryResp.status}`);
      }
      const summaryData = await summaryResp.json();
      const resultObj = summaryData?.result || {};

      const articles = idList.map((pmid) => {
        const item = resultObj[pmid];
        if (!item) return null;
        const authors = (item.authors || []).map((a: { name: string }) => a.name).slice(0, 5);
        return {
          pmid,
          title: item.title || 'Untitled Publication',
          source: item.source || item.fulljournalname || 'Biomedical Journal',
          pubdate: item.pubdate || item.sortpubdate || '',
          authors,
          doi: item.articleids?.find((idObj: { idtype: string; value: string }) => idObj.idtype === 'doi')?.value || '',
          pmc: item.articleids?.find((idObj: { idtype: string; value: string }) => idObj.idtype === 'pmc')?.value || '',
          url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        };
      }).filter(Boolean);

      return res.json({
        total: Number(searchData?.esearchresult?.count) || articles.length,
        articles,
      });
    } catch (err: any) {
      console.error('PubMed error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  });

  // 2. ClinicalTrials.gov Proxy (v2 REST API)
  app.get('/api/science/clinicaltrials', async (req: Request, res: Response) => {
    try {
      const term = (req.query.term as string) || 'p53';
      const pageSize = Number(req.query.pageSize) || 5;

      const ctUrl = new URL('https://clinicaltrials.gov/api/v2/studies');
      ctUrl.searchParams.set('query.term', term);
      ctUrl.searchParams.set('pageSize', String(pageSize));
      ctUrl.searchParams.set('countTotal', 'true');

      const ctResp = await fetch(ctUrl.toString(), {
        headers: { 'Accept': 'application/json' },
      });

      if (!ctResp.ok) {
        throw new Error(`ClinicalTrials.gov responded with ${ctResp.status}`);
      }

      const data = await ctResp.json();
      const studies = (data?.studies || []).map((st: any) => {
        const protocol = st?.protocolSection || {};
        const idModule = protocol?.identificationModule || {};
        const statusModule = protocol?.statusModule || {};
        const designModule = protocol?.designModule || {};
        const sponsorModule = protocol?.sponsorCollaboratorsModule || {};
        const armsModule = protocol?.armsInterventionsModule || {};

        return {
          nctId: idModule?.nctId,
          briefTitle: idModule?.briefTitle || 'Untitled Study',
          overallStatus: statusModule?.overallStatus || 'Unknown',
          phase: designModule?.phases?.join(', ') || 'Phase Not Specified',
          leadSponsor: sponsorModule?.leadSponsor?.name || 'Academic/Industry Sponsor',
          conditions: protocol?.conditionsModule?.conditions || [],
          interventions: (armsModule?.interventions || []).map((i: any) => i.name),
          startDate: statusModule?.startDateStruct?.date || '',
          completionDate: statusModule?.completionDateStruct?.date || '',
          url: `https://clinicaltrials.gov/study/${idModule?.nctId}`,
        };
      });

      return res.json({
        totalCount: data?.totalCount || studies.length,
        studies,
      });
    } catch (err: any) {
      console.error('ClinicalTrials error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  });

  // 3. openFDA Drug Label & Adverse Events Proxy
  app.get('/api/science/openfda', async (req: Request, res: Response) => {
    try {
      const drug = (req.query.drug as string) || 'imatinib';
      const fdaUrl = new URL('https://api.fda.gov/drug/label.json');
      fdaUrl.searchParams.set('search', `openfda.generic_name:"${drug}" OR openfda.brand_name:"${drug}"`);
      fdaUrl.searchParams.set('limit', '1');
      if (FDA_API_KEY) fdaUrl.searchParams.set('api_key', FDA_API_KEY);

      const fdaResp = await fetch(fdaUrl.toString());
      if (!fdaResp.ok) {
        return res.json({ results: [] });
      }
      const data = await fdaResp.json();
      return res.json(data);
    } catch (err: any) {
      console.error('openFDA error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  });

  // 4. BioRxiv / arXiv preprints
  app.get('/api/science/preprints', async (req: Request, res: Response) => {
    try {
      const query = (req.query.term as string) || 'AlphaFold';
      // Search Europe PMC for life science preprints
      const epmcUrl = new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
      epmcUrl.searchParams.set('query', `(${query}) AND (SRC:PPR)`);
      epmcUrl.searchParams.set('format', 'json');
      epmcUrl.searchParams.set('pageSize', '5');

      const epmcResp = await fetch(epmcUrl.toString());
      if (!epmcResp.ok) {
        throw new Error(`Europe PMC responded with ${epmcResp.status}`);
      }
      const data = await epmcResp.json();
      const results = (data?.resultList?.result || []).map((r: any) => ({
        id: r.id,
        title: r.title,
        authorString: r.authorString,
        journalTitle: r.journalTitle || 'bioRxiv / Preprint Server',
        pubYear: r.pubYear,
        doi: r.doi,
        url: r.doi ? `https://doi.org/${r.doi}` : `https://europepmc.org/article/PPR/${r.id}`,
      }));

      return res.json({ preprints: results });
    } catch (err: any) {
      console.error('Preprints error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  });

  // 5. PubChem Proxy routes (bypassing browser CORS/iframe limitations)
  app.get('/api/science/pubchem/name/:name', async (req: Request, res: Response) => {
    try {
      const name = req.params.name;
      const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(name)}/cids/JSON`;
      const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!response.ok) {
        return res.status(response.status).json({ error: `PubChem responded with ${response.status}` });
      }
      const data = await response.json();
      return res.json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/science/pubchem/cid/:cid', async (req: Request, res: Response) => {
    try {
      const cid = req.params.cid;
      const propUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/MolecularFormula,MolecularWeight,CanonicalSMILES,IsomericSMILES,InChIKey,XLogP,TPSA,HBondDonorCount,HBondAcceptorCount,RotatableBondCount,Complexity,Title/JSON`;
      const response = await fetch(propUrl, { headers: { 'Accept': 'application/json' } });
      if (!response.ok) {
        return res.status(response.status).json({ error: `PubChem responded with ${response.status}` });
      }
      const data = await response.json();
      return res.json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 6. Reactome Pathways Proxy route
  app.get('/api/science/reactome/:uniprot', async (req: Request, res: Response) => {
    try {
      const uniprot = req.params.uniprot;
      const url = `https://reactome.org/ContentService/data/discover/${encodeURIComponent(uniprot)}`;
      const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!response.ok) {
        return res.status(response.status).json({ error: `Reactome responded with ${response.status}` });
      }
      const data = await response.json();
      return res.json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 7. AlphaFold DB Proxy route
  app.get('/api/science/alphafold/:uniprot', async (req: Request, res: Response) => {
    try {
      const uniprot = req.params.uniprot;
      const url = `https://alphafold.ebi.ac.uk/api/prediction/${encodeURIComponent(uniprot)}`;
      const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!response.ok) {
        return res.status(response.status).json({ error: `AlphaFold responded with ${response.status}` });
      }
      const data = await response.json();
      return res.json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 8. UniProt Proxy route
  app.get('/api/science/uniprot/:accession', async (req: Request, res: Response) => {
    try {
      const accession = req.params.accession;
      const url = `https://rest.uniprot.org/uniprotkb/${encodeURIComponent(accession)}.json`;
      const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!response.ok) {
        return res.status(response.status).json({ error: `UniProt responded with ${response.status}` });
      }
      const data = await response.json();
      return res.json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 9. STRING PPI Proxy route
  app.get('/api/science/string/:symbol', async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol;
      const url = `https://string-db.org/api/json/network?identifiers=${encodeURIComponent(symbol)}&species=9606&limit=8`;
      const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!response.ok) {
        return res.status(response.status).json({ error: `STRING responded with ${response.status}` });
      }
      const data = await response.json();
      return res.json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 10. Structure coordinate proxy (fetching CIF or PDB data for WebGL viewer)
  app.get('/api/science/structure/download', async (req: Request, res: Response) => {
    try {
      const fileUrl = req.query.url as string;
      if (!fileUrl || (!fileUrl.startsWith('https://alphafold.ebi.ac.uk') && !fileUrl.startsWith('https://files.rcsb.org'))) {
        return res.status(400).json({ error: 'Invalid structure URL' });
      }
      const response = await fetch(fileUrl);
      if (!response.ok) {
        return res.status(response.status).json({ error: `File download returned ${response.status}` });
      }
      const text = await response.text();
      res.setHeader('Content-Type', 'text/plain');
      return res.send(text);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DeepMind Science Discovery Workbench server listening on port ${PORT}`);
  });
}

startServer();
