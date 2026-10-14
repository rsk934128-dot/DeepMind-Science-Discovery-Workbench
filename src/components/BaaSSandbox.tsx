import React, { useState } from 'react';
import { API_ENDPOINTS } from '../data/mockFintechData';
import { ApiEndpointSpec } from '../types/fintech';
import {
  Terminal,
  Play,
  Check,
  Copy,
  Radio,
  Clock,
  Layers,
  Code2,
  Sparkles,
  Zap,
  Gauge,
  Activity,
  BarChart3,
  RefreshCw,
  TrendingDown,
  ShieldCheck,
  ArrowUpRight,
  AlertTriangle,
  Sliders,
  Settings,
  Bell,
  BellOff,
  CheckCircle2,
  Volume2,
  VolumeX,
  AlertOctagon,
  Flame,
  Eye,
  Globe2,
  Server,
} from 'lucide-react';

interface ResponseTimeEntry {
  id: string;
  endpoint: string;
  method: string;
  statusCode: number;
  latencyMs: number;
  timestamp: string;
}

interface BaaSSandboxProps {
  onCardMintedFromApi?: (cardData: any) => void;
  onTransferExecutedFromApi?: (transferData: any) => void;
}

export const BaaSSandbox: React.FC<BaaSSandboxProps> = () => {
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);
  const [requestPayload, setRequestPayload] = useState<string>(
    JSON.stringify(API_ENDPOINTS[0].requestBody, null, 2)
  );
  const [responsePayload, setResponsePayload] = useState<string>(
    JSON.stringify(API_ENDPOINTS[0].responseSample, null, 2)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number>(201);
  const [latencyMs, setLatencyMs] = useState<number>(142);
  const [copied, setCopied] = useState(false);
  const [copiedNode, setCopiedNode] = useState(false);

  // Dedicated Gateway Node Infrastructure State
  const [gatewayHost, setGatewayHost] = useState<'dedicated' | 'default'>('dedicated');
  const [showDnsPanel, setShowDnsPanel] = useState<boolean>(false);
  const [copiedRecordKey, setCopiedRecordKey] = useState<string | null>(null);
  const [dnsCheckStatus, setDnsCheckStatus] = useState<'idle' | 'checking' | 'verified'>('verified');

  const DEDICATED_NODE = {
    hostname: 'unlimitbaas.ddns.net',
    ipv4: '198.51.100.42',
    ipv6: '2001:db8:85a3::8a2e:370:7334',
    operator: 'sheikh Skfarid',
    spf: 'v=spf1 include:no-ip.com -all',
    googleSiteVerification: 'google-site-verification=DK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac',
    googleVerificationToken: 'DK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac',
    ddnsProvider: 'No-IP (ddns.net)',
    status: 'ONLINE_ACTIVE',
    pingMs: 14,
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRecordKey(key);
    setTimeout(() => setCopiedRecordKey(null), 2000);
  };

  // Rate Limit Quota state
  const TOTAL_QUOTA = 10000;
  const [usedQuota, setUsedQuota] = useState<number>(8000); // 2,000 remaining = exactly 20.0% critical threshold
  const remainingQuota = Math.max(0, TOTAL_QUOTA - usedQuota);
  const remainingPercent = Math.round((remainingQuota / TOTAL_QUOTA) * 100);

  // Rate Limit Threshold Configuration State
  const [criticalThreshold, setCriticalThreshold] = useState<number>(20); // 20% critical threshold default
  const [alertEnabled, setAlertEnabled] = useState<boolean>(true); // Master alert toggle
  const [turnProgressBarRed, setTurnProgressBarRed] = useState<boolean>(true); // Config: Change bar color to red
  const [showVisualAlertBanner, setShowVisualAlertBanner] = useState<boolean>(true); // Config: Visual alert banner
  const [pulseAnimation, setPulseAnimation] = useState<boolean>(true); // Config: Pulse / glow animation
  const [audioChimeEnabled, setAudioChimeEnabled] = useState<boolean>(false); // Config: Audio chime simulation
  const [showThresholdConfig, setShowThresholdConfig] = useState<boolean>(false);
  const [dismissedAlert, setDismissedAlert] = useState<boolean>(false);

  const isCritical = remainingPercent <= criticalThreshold;

  // Web Audio chime simulator for subtle threshold alert
  const playAlertTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // Dashboard of recent endpoint response times
  const [responseTimesHistory, setResponseTimesHistory] = useState<ResponseTimeEntry[]>([
    {
      id: 'rt_1',
      endpoint: '/v1/issuing/cards',
      method: 'POST',
      statusCode: 201,
      latencyMs: 142,
      timestamp: '10:45:12',
    },
    {
      id: 'rt_2',
      endpoint: '/v1/accounts/iban',
      method: 'POST',
      statusCode: 200,
      latencyMs: 98,
      timestamp: '10:43:40',
    },
    {
      id: 'rt_3',
      endpoint: '/v1/payments/transfers',
      method: 'POST',
      statusCode: 200,
      latencyMs: 186,
      timestamp: '10:41:15',
    },
    {
      id: 'rt_4',
      endpoint: '/v1/compliance/verify',
      method: 'POST',
      statusCode: 200,
      latencyMs: 210,
      timestamp: '10:39:02',
    },
    {
      id: 'rt_5',
      endpoint: '/v1/issuing/cards',
      method: 'POST',
      statusCode: 201,
      latencyMs: 115,
      timestamp: '10:35:48',
    },
  ]);

  // Webhook event stream log
  const [webhookLogs, setWebhookLogs] = useState<Array<{ id: string; event: string; timestamp: string; status: string }>>([
    { id: 'wh_01', event: 'card.authorization.approved', timestamp: '10:45:12 UTC', status: '200_DELIVERED' },
    { id: 'wh_02', event: 'sepa.transfer.settled_instant', timestamp: '10:42:01 UTC', status: '200_DELIVERED' },
    { id: 'wh_03', event: 'compliance.kyb.auto_approved', timestamp: '09:15:33 UTC', status: '200_DELIVERED' },
  ]);

  const currentEndpoint = API_ENDPOINTS[selectedEndpointIndex];

  // Calculated metrics for response time dashboard
  const avgLatency = Math.round(
    responseTimesHistory.reduce((acc, curr) => acc + curr.latencyMs, 0) /
      (responseTimesHistory.length || 1)
  );
  const minLatency = Math.min(...responseTimesHistory.map((r) => r.latencyMs));
  const maxLatency = Math.max(...responseTimesHistory.map((r) => r.latencyMs));

  const handleSelectEndpoint = (index: number) => {
    setSelectedEndpointIndex(index);
    setRequestPayload(JSON.stringify(API_ENDPOINTS[index].requestBody, null, 2));
    setResponsePayload(JSON.stringify(API_ENDPOINTS[index].responseSample, null, 2));
    setResponseStatus(201);
  };

  const handleExecuteRequest = () => {
    setIsLoading(true);
    const mockLatency = Math.floor(95 + Math.random() * 160);

    setTimeout(() => {
      setIsLoading(false);
      setLatencyMs(mockLatency);
      setResponseStatus(200);

      // Consume 1 quota unit
      setUsedQuota((prev) => {
        const next = Math.min(TOTAL_QUOTA, prev + 1);
        const nextRemaining = TOTAL_QUOTA - next;
        const nextPct = Math.round((nextRemaining / TOTAL_QUOTA) * 100);
        if (nextPct <= criticalThreshold && audioChimeEnabled && ((TOTAL_QUOTA - prev) / TOTAL_QUOTA) * 100 > criticalThreshold) {
          playAlertTone();
        }
        return next;
      });
      setDismissedAlert(false);

      // Add to response times dashboard
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newEntry: ResponseTimeEntry = {
        id: `rt_${Date.now()}`,
        endpoint: currentEndpoint.endpoint,
        method: currentEndpoint.method,
        statusCode: 200,
        latencyMs: mockLatency,
        timestamp: timeStr,
      };

      setResponseTimesHistory((prev) => [newEntry, ...prev.slice(0, 5)]);

      // Add a realistic webhook emission
      const eventName =
        selectedEndpointIndex === 0
          ? 'card.issued.active'
          : selectedEndpointIndex === 1
          ? 'account.iban.provisioned'
          : selectedEndpointIndex === 2
          ? 'sepa.instant.cleared'
          : 'compliance.check.completed';

      setWebhookLogs((prev) => [
        {
          id: `wh_${Date.now()}`,
          event: eventName,
          timestamp: timeStr + ' UTC',
          status: '200_DELIVERED',
        },
        ...prev.slice(0, 5),
      ]);
    }, mockLatency);
  };

  const handleResetQuota = () => {
    setUsedQuota(150);
    setDismissedAlert(false);
  };

  const handleSimulateExact20 = () => {
    setUsedQuota(8000); // 2,000 remaining = exactly 20.0% critical threshold!
    setDismissedAlert(false);
    if (audioChimeEnabled) playAlertTone();
  };

  const handleSimulateCritical = () => {
    setUsedQuota(8500); // 1,500 remaining = 15.0% <= 20%
    setDismissedAlert(false);
    if (audioChimeEnabled) playAlertTone();
  };

  const handleSimulateHealthy = () => {
    setUsedQuota(3500); // 6,500 remaining = 65.0% > 20%
    setDismissedAlert(false);
  };

  const handleCopyCode = () => {
    setCopied(true);
    navigator.clipboard.writeText(getCurlSnippet());
    setTimeout(() => setCopied(false), 2000);
  };

  const activeBaseUrl =
    gatewayHost === 'dedicated'
      ? `https://${DEDICATED_NODE.hostname}`
      : 'https://api.sandbox.unlimit.com';

  const getCurlSnippet = () => {
    return `curl -X ${currentEndpoint.method} "${activeBaseUrl}${currentEndpoint.endpoint}" \\
  -H "Authorization: Bearer unlimit_test_sec_8940281" \\
  -H "Content-Type: application/json" \\
  -H "X-Node-Operator: sheikh-Skfarid" \\
  -d '${requestPayload.replace(/\n/g, '').replace(/\s+/g, ' ')}'`;
  };

  return (
    <section id="developer-sandbox" className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Sandbox & Interactive Testing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Built for developers. Engineered for scale.
          </h2>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Test direct card issuing, individual IBAN generation, and SEPA Instant payout endpoints with live simulated responses, rate-limit monitoring, and webhook event streams.
          </p>
        </div>

        {/* Dedicated Gateway Infrastructure & Operator Bar (sheikh Skfarid: unlimitbaas.ddns.net) */}
        <div className="mb-8 p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-950/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-400 text-[11px]">Dedicated Gateway:</span>
                <span className="font-bold text-cyan-300 text-sm">{DEDICATED_NODE.hostname}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  ONLINE &bull; {DEDICATED_NODE.pingMs}ms PING
                </span>
                <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px]">
                  Dual-Stack IPv4/IPv6
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 flex-wrap">
                <span>IPv4: <strong className="text-slate-200">{DEDICATED_NODE.ipv4}</strong></span>
                <span>&bull;</span>
                <span className="truncate max-w-[280px]">IPv6: <strong className="text-slate-200">{DEDICATED_NODE.ipv6}</strong></span>
                <span>&bull;</span>
                <span>Node Operator: <strong className="text-indigo-300 font-semibold">{DEDICATED_NODE.operator}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowDnsPanel(!showDnsPanel)}
              className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                showDnsPanel
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-xs'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
              }`}
              title="View DNS Records, SPF, and Google Site Verification"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>DNS &amp; Verification</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                4 OK
              </span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(DEDICATED_NODE.hostname);
                setCopiedNode(true);
                setTimeout(() => setCopiedNode(false), 2000);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy dedicated host to clipboard"
            >
              {copiedNode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedNode ? 'Copied' : 'Copy Host'}</span>
            </button>

            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button
                onClick={() => setGatewayHost('dedicated')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  gatewayHost === 'dedicated'
                    ? 'bg-cyan-600 text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Target dedicated node: unlimitbaas.ddns.net"
              >
                Dedicated DDNS
              </button>
              <button
                onClick={() => setGatewayHost('default')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  gatewayHost === 'default'
                    ? 'bg-cyan-600 text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Target global cloud fallback"
              >
                Global Cloud
              </button>
            </div>
          </div>
        </div>

        {/* Expandable DNS Records & Domain Verification Panel */}
        {showDnsPanel && (
          <div className="mb-8 p-6 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl animate-fadeIn font-mono text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    DNS &amp; Domain Verification Records
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                      Synchronized &bull; No-IP Active
                    </span>
                  </h3>
                  <p className="text-slate-400 text-[11px] font-sans">
                    Configured for <strong>unlimitbaas.ddns.net</strong> by Operator <strong>sheikh Skfarid</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setDnsCheckStatus('checking');
                    setTimeout(() => setDnsCheckStatus('verified'), 600);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${dnsCheckStatus === 'checking' ? 'animate-spin' : ''}`} />
                  <span>{dnsCheckStatus === 'checking' ? 'Querying DNS...' : 'Re-verify DNS'}</span>
                </button>
                <a
                  href="/googleDK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac.html"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <span>G-Verification File</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              </div>
            </div>

            {/* DNS Records Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Host / Key</th>
                    <th className="py-2.5 px-3">Target Value / Data</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-[11px]">
                  {/* A Record */}
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                        A
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">@ (unlimitbaas.ddns.net)</td>
                    <td className="py-3 px-3">
                      <code className="text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        {DEDICATED_NODE.ipv4}
                      </code>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Propagated
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard(DEDICATED_NODE.ipv4, 'ipv4')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[10px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedRecordKey === 'ipv4' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedRecordKey === 'ipv4' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>

                  {/* AAAA Record */}
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                        AAAA
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">@ (unlimitbaas.ddns.net)</td>
                    <td className="py-3 px-3">
                      <code className="text-indigo-300 bg-slate-950 px-2 py-1 rounded border border-slate-800 truncate block max-w-xs sm:max-w-md">
                        {DEDICATED_NODE.ipv6}
                      </code>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Propagated
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard(DEDICATED_NODE.ipv6, 'ipv6')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[10px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedRecordKey === 'ipv6' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedRecordKey === 'ipv6' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>

                  {/* SPF TXT Record */}
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        TXT / SPF
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">@ (Email Security)</td>
                    <td className="py-3 px-3">
                      <code className="text-amber-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        {DEDICATED_NODE.spf}
                      </code>
                      <span className="text-[10px] text-slate-400 block mt-1 font-sans">
                        Authorizes No-IP dynamic relay servers &amp; blocks spoofing (-all)
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Active SPF
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard(DEDICATED_NODE.spf, 'spf')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[10px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedRecordKey === 'spf' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedRecordKey === 'spf' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>

                  {/* Google Site Verification */}
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        G-VERIFY
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      <div>google-site-verification</div>
                      <span className="text-[10px] text-slate-400 font-sans">Search Console Token</span>
                    </td>
                    <td className="py-3 px-3">
                      <code className="text-emerald-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        {DEDICATED_NODE.googleSiteVerification}
                      </code>
                      <div className="text-[10px] text-slate-400 font-sans mt-1 space-y-0.5">
                        <div>HTML Meta: <code>&lt;meta name=&quot;google-site-verification&quot; content=&quot;{DEDICATED_NODE.googleVerificationToken}&quot; /&gt;</code></div>
                        <div>Static File: <code>/googleDK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac.html</code></div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Connected &amp; Verified
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard(DEDICATED_NODE.googleSiteVerification, 'google')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[10px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedRecordKey === 'google' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedRecordKey === 'google' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick summary notes */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Both Google Search Console verification methods (HTML Tag &amp; HTML File) are active on this applet.</span>
              </div>
              <div className="text-slate-400">
                DDNS Provider: <span className="text-cyan-400 font-semibold">{DEDICATED_NODE.ddnsProvider}</span> &bull; Operator: <span className="text-indigo-300 font-semibold">{DEDICATED_NODE.operator}</span>
              </div>
            </div>
          </div>
        )}

        {/* Developer Sandbox & Telemetry NOC Visual Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: NOC Screen visual */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl group">
              <img
                src="/src/assets/images/developer_api_sandbox_1792003832639.jpg"
                alt="Developer API Terminal & Real-Time Telemetry Monitor"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-900/90 text-cyan-300 border border-slate-700 backdrop-blur-md">
                  NOC Console v4.2
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md font-bold">
                  SLA: 99.98%
                </span>
              </div>
            </div>

            {/* Right: Technical Capabilities */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>Zero-Latency Integration Engine</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Simulated Sandbox with Sub-Second Gateway Telemetry
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Test and debug every API lifecycle event in an isolated hermetic sandbox mirroring live production rails. Verify response headers, simulate rate limits, and inspect webhook payloads before going live.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-1 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">SLA Target</span>
                  <span className="font-bold text-emerald-400 text-xs mt-0.5 block">&lt; 150ms Response</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Burst Capacity</span>
                  <span className="font-bold text-cyan-300 text-xs mt-0.5 block">100 req/sec</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Webhooks</span>
                  <span className="font-bold text-indigo-300 text-xs mt-0.5 block">HMAC-SHA256</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RATE LIMIT MONITOR & RESPONSE TIMES DASHBOARD                             */}
        {/* ========================================================================= */}
        <div
          className={`mb-10 bg-slate-900/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 border ${
            isCritical && alertEnabled && turnProgressBarRed
              ? 'border-red-500/60 shadow-xl shadow-red-950/40'
              : isCritical && alertEnabled
              ? 'border-rose-500/40 shadow-rose-950/20'
              : 'border-slate-800'
          }`}
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
                  isCritical && alertEnabled
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                    : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                }`}
              >
                {isCritical && alertEnabled ? (
                  <AlertOctagon className={`w-5 h-5 text-red-400 ${pulseAnimation ? 'animate-pulse' : ''}`} />
                ) : (
                  <Gauge className="w-5 h-5 text-cyan-400" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-sans">
                    API Rate Limit & Latency Monitor
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider transition-colors ${
                      isCritical && alertEnabled
                        ? 'bg-red-950 text-red-300 border border-red-700/80 shadow-xs'
                        : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800'
                    }`}
                  >
                    {isCritical && alertEnabled ? `Alert: Critical Quota Hit (≤${criticalThreshold}%)` : 'Tier: Sandbox Pro (100 req/s)'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Live quota consumption tracking and real-time endpoint latency telemetry
                </p>
              </div>
            </div>

            {/* Monitor Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowThresholdConfig(!showThresholdConfig)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showThresholdConfig
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
                }`}
                title="Configure Rate Limit Alert Threshold & Visual Triggers"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Config: {criticalThreshold}% Threshold</span>
              </button>

              <button
                onClick={handleResetQuota}
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset Sandbox Quota to 100%"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reset Quota</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONFIGURATION FEATURE DRAWER / PANEL                                     */}
          {/* ========================================================================= */}
          {showThresholdConfig && (
            <div className="mt-4 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs font-mono">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Settings className="w-4 h-4 text-cyan-400" />
                  <span>Rate Limit Monitor & Critical Alert Configuration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isCritical
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    Trigger Status: {isCritical ? 'CRITICAL TRIGGERED' : 'HEALTHY'}
                  </span>
                  <button
                    onClick={() => setAlertEnabled(!alertEnabled)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      alertEnabled
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {alertEnabled ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
                    <span>Master Alerts: {alertEnabled ? 'ENABLED' : 'DISABLED'}</span>
                  </button>
                </div>
              </div>

              {/* Threshold Slider and Preset Buttons */}
              <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-200 font-bold">Critical Alert Threshold:</span>
                    <span className="text-slate-400 text-[11px] ml-2">
                      (Triggers when remaining quota &le; this level)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-red-400 font-mono px-2 py-0.5 bg-red-950/60 rounded border border-red-800/60">
                      {criticalThreshold}%
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({((TOTAL_QUOTA * criticalThreshold) / 100).toLocaleString()} calls)
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={criticalThreshold}
                  onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-500"
                />

                {/* Preset quick buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-slate-400 text-[11px]">Threshold Presets:</span>
                  {[
                    { val: 10, label: '10% (Strict)' },
                    { val: 15, label: '15%' },
                    { val: 20, label: '20% (Default Standard)' },
                    { val: 25, label: '25%' },
                    { val: 30, label: '30% (Early Warning)' },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      onClick={() => setCriticalThreshold(preset.val)}
                      className={`px-2 py-1 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
                        criticalThreshold === preset.val
                          ? 'bg-red-600 text-white border-red-500 shadow-xs'
                          : 'bg-slate-950 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Alert & Red Color Triggers Configuration Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* 1. Progress Bar Red Color Trigger Toggle */}
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Flame className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-white font-bold">Turn Progress Bar Red</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Changes the progress bar color to vivid warning red when remaining quota hits &le; {criticalThreshold}%.
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                      <span className="text-[10px] text-red-400 font-bold">
                        Red Color Trigger: {turnProgressBarRed ? 'ACTIVE' : 'OFF'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setTurnProgressBarRed(!turnProgressBarRed)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold shrink-0 transition-colors cursor-pointer ${
                      turnProgressBarRed
                        ? 'bg-red-600 text-white border border-red-500'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {turnProgressBarRed ? 'RED ON' : 'DISABLED'}
                  </button>
                </div>

                {/* 2. Visual Alert Banner Trigger Toggle */}
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-white font-bold">Visual Alert Banner</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Displays a prominent notification banner with quick-replenish buttons when threshold is breached.
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <Eye className="w-3 h-3 text-cyan-400" />
                      <span className="text-[10px] text-cyan-300 font-bold">
                        Banner: {showVisualAlertBanner ? 'VISIBLE' : 'HIDDEN'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowVisualAlertBanner(!showVisualAlertBanner)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold shrink-0 transition-colors cursor-pointer ${
                      showVisualAlertBanner
                        ? 'bg-amber-600 text-white border border-amber-500'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {showVisualAlertBanner ? 'BANNER ON' : 'OFF'}
                  </button>
                </div>

                {/* 3. Pulsing Glow Animation Toggle */}
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-white font-bold">Pulsing Urgency Effect</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Animates the red progress bar and critical alert badge to draw immediate visual attention.
                    </p>
                  </div>
                  <button
                    onClick={() => setPulseAnimation(!pulseAnimation)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold shrink-0 transition-colors cursor-pointer ${
                      pulseAnimation
                        ? 'bg-cyan-600 text-white border border-cyan-500'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {pulseAnimation ? 'PULSE ON' : 'OFF'}
                  </button>
                </div>

                {/* 4. Audible Alert Tone Simulation Toggle */}
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {audioChimeEnabled ? (
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                      )}
                      <span className="text-white font-bold">Audible Chime Alert</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Plays a subtle synthesizer chime when API calls breach into critical quota territory.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const next = !audioChimeEnabled;
                      setAudioChimeEnabled(next);
                      if (next) playAlertTone();
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold shrink-0 transition-colors cursor-pointer ${
                      audioChimeEnabled
                        ? 'bg-emerald-600 text-white border border-emerald-500'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {audioChimeEnabled ? 'AUDIO ON' : 'MUTED'}
                  </button>
                </div>
              </div>

              {/* 1-Click Simulation Buttons */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <span className="text-slate-400 text-[11px] font-bold">
                  Test Triggers (Instant Simulation):
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleSimulateExact20}
                    className="px-2.5 py-1 rounded bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-700 text-[11px] font-bold transition-colors cursor-pointer"
                    title="Sets quota to exactly 20% to verify red progress bar and alert banner"
                  >
                    Trigger 20% Threshold (Exact Hit)
                  </button>
                  <button
                    onClick={handleSimulateCritical}
                    className="px-2.5 py-1 rounded bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[11px] font-bold transition-colors cursor-pointer"
                    title="Sets quota to 15% (Critical Zone)"
                  >
                    Trigger 15% (Severe Zone)
                  </button>
                  <button
                    onClick={handleSimulateHealthy}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-[11px] font-bold transition-colors cursor-pointer"
                    title="Restores quota to 65% (Healthy Zone)"
                  >
                    Restore 65% (Healthy)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VISUAL ALERT BANNER (Triggers when quota <= criticalThreshold)             */}
          {/* ========================================================================= */}
          {isCritical && alertEnabled && showVisualAlertBanner && !dismissedAlert && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-red-950/90 via-rose-950/70 to-slate-950 border border-red-500/70 flex flex-wrap items-center justify-between gap-3 text-xs text-red-200 shadow-xl shadow-red-950/30">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center shrink-0 ${pulseAnimation ? 'animate-pulse' : ''}`}>
                  <AlertOctagon className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-white text-xs tracking-wide">
                      CRITICAL API RATE LIMIT ALERT:
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-red-500/30 text-red-200 border border-red-500/50 font-extrabold uppercase">
                      {remainingPercent}% Remaining (&le; {criticalThreshold}% Threshold)
                    </span>
                    {turnProgressBarRed && (
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-red-900/80 text-red-300 border border-red-700 font-bold">
                        RED BAR ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    Sandbox API quota has breached the configured critical {criticalThreshold}% limit. {remainingQuota.toLocaleString()} of {TOTAL_QUOTA.toLocaleString()} calls remaining. Progress bar color is set to red to flag potential throttling risk.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleResetQuota}
                  className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-[11px] font-bold shadow-md shadow-red-600/30 transition-colors cursor-pointer"
                >
                  Replenish Quota (100%)
                </button>
                <button
                  onClick={handleSimulateHealthy}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-mono transition-colors cursor-pointer"
                >
                  Test 65% Safe
                </button>
                <button
                  onClick={() => setDismissedAlert(true)}
                  className="px-2 py-1 text-slate-400 hover:text-white text-xs cursor-pointer"
                  title="Dismiss banner"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
            {/* Left Column: Remaining API Quota Progress Bar (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-semibold">Remaining Daily Quota:</span>
                  {isCritical && alertEnabled && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                        turnProgressBarRed
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      } ${pulseAnimation ? 'animate-pulse' : ''}`}
                    >
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                      CRITICAL (≤{criticalThreshold}%)
                    </span>
                  )}
                </div>
                <span
                  className={`font-bold transition-colors ${
                    isCritical && alertEnabled && turnProgressBarRed
                      ? 'text-red-400 font-extrabold text-sm'
                      : isCritical && alertEnabled
                      ? 'text-rose-400'
                      : 'text-cyan-300'
                  }`}
                >
                  {remainingQuota.toLocaleString()} / {TOTAL_QUOTA.toLocaleString()} calls
                </span>
              </div>

              {/* Progress Bar Container with Dynamic Color Change & Critical Red Glow */}
              <div className="relative">
                <div
                  className={`w-full bg-slate-950 rounded-full h-5 p-0.5 border overflow-hidden relative shadow-inner transition-all duration-300 ${
                    isCritical && alertEnabled && turnProgressBarRed
                      ? 'border-red-500 ring-2 ring-red-500/50 shadow-lg shadow-red-950/70'
                      : isCritical && alertEnabled
                      ? 'border-rose-500/60 shadow-lg shadow-rose-950/30 ring-1 ring-rose-500/30'
                      : 'border-slate-800'
                  }`}
                >
                  {/* Threshold Marker Indicator Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-red-400/80 z-20 pointer-events-none"
                    style={{ left: `${criticalThreshold}%` }}
                    title={`Critical Threshold Line: ${criticalThreshold}%`}
                  />

                  {/* Progress Bar Fill with Red Color when Critical */}
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2 text-[10px] font-mono font-extrabold text-white ${
                      isCritical && alertEnabled && turnProgressBarRed
                        ? `bg-gradient-to-r from-red-600 via-rose-600 to-red-500 shadow-md shadow-red-500/50 ${pulseAnimation ? 'animate-pulse' : ''}`
                        : isCritical && alertEnabled
                        ? `bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 ${pulseAnimation ? 'animate-pulse' : ''}`
                        : remainingPercent > 40
                        ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400'
                        : remainingPercent > 20
                        ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                        : 'bg-gradient-to-r from-red-600 to-rose-400'
                    }`}
                    style={{ width: `${Math.max(6, remainingPercent)}%` }}
                  >
                    {remainingPercent}%
                  </div>
                </div>

                {/* Threshold Marker Legend Scale */}
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-1 px-1">
                  <span>0%</span>
                  <span
                    className={`font-semibold flex items-center gap-1 transition-colors ${
                      isCritical && alertEnabled ? 'text-red-400 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block animate-ping" />
                    <span>Threshold Marker ({criticalThreshold}%)</span>
                  </span>
                  <span>100%</span>
                </div>
              </div>

              {/* Quota Details Sub-grid */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Consumed</span>
                  <span className="font-bold text-white text-xs mt-0.5 block">
                    {usedQuota.toLocaleString()}
                  </span>
                </div>
                <div
                  className={`p-2.5 rounded-xl bg-slate-950 border transition-colors ${
                    isCritical && alertEnabled && turnProgressBarRed
                      ? 'border-red-500/50 text-red-300 shadow-xs'
                      : isCritical && alertEnabled
                      ? 'border-rose-500/40 text-rose-300'
                      : 'border-slate-800/80'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 block">Remaining</span>
                  <span
                    className={`font-bold text-xs mt-0.5 block ${
                      isCritical && alertEnabled && turnProgressBarRed
                        ? 'text-red-400 font-extrabold text-sm'
                        : isCritical && alertEnabled
                        ? 'text-rose-400 font-extrabold'
                        : 'text-cyan-400'
                    }`}
                  >
                    {remainingQuota.toLocaleString()}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Window Reset</span>
                  <span className="font-bold text-emerald-400 text-xs mt-0.5 block">
                    52m 14s
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Dashboard of Recent Response Times (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              {/* Telemetry Summary Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Average Latency</span>
                    <span className="font-mono text-base font-bold text-cyan-300">{avgLatency} ms</span>
                  </div>
                  <Activity className="w-4 h-4 text-cyan-400/60" />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Min / Max Range</span>
                    <span className="font-mono text-base font-bold text-emerald-400">{minLatency} / {maxLatency} ms</span>
                  </div>
                  <BarChart3 className="w-4 h-4 text-emerald-400/60" />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Global SLA Status</span>
                    <span className="font-mono text-xs font-bold text-indigo-300">99.98% Compliant</span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-indigo-400/60" />
                </div>
              </div>

              {/* Recent Response Times Log Bar Chart / List */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-1.5 border-b border-slate-800/60">
                  <span>Recent Request Latency Log (Last {responseTimesHistory.length})</span>
                  <span>SLA Target: &lt; 250ms</span>
                </div>

                <div className="space-y-1.5">
                  {responseTimesHistory.slice(0, 4).map((entry) => {
                    const isFast = entry.latencyMs < 150;
                    const isModerate = entry.latencyMs >= 150 && entry.latencyMs <= 220;

                    return (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between gap-3 text-xs font-mono py-1 px-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 transition-colors"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            {entry.method}
                          </span>
                          <span className="text-slate-300 truncate text-[11px]">
                            {entry.endpoint}
                          </span>
                        </div>

                        {/* Visual Latency Bar */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden hidden sm:block">
                            <div
                              className={`h-full rounded-full ${
                                isFast ? 'bg-emerald-400' : isModerate ? 'bg-cyan-400' : 'bg-amber-400'
                              }`}
                              style={{ width: `${Math.min(100, (entry.latencyMs / 250) * 100)}%` }}
                            />
                          </div>

                          <span
                            className={`font-bold text-[11px] ${
                              isFast
                                ? 'text-emerald-400'
                                : isModerate
                                ? 'text-cyan-300'
                                : 'text-amber-400'
                            }`}
                          >
                            {entry.latencyMs}ms
                          </span>

                          <span className="text-[10px] text-slate-500">
                            {entry.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Navigator Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {API_ENDPOINTS.map((ep, idx) => {
            const isSelected = selectedEndpointIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectEndpoint(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs text-slate-300 font-semibold truncate">
                    {ep.endpoint}
                  </span>
                </div>
                <span className="text-xs font-bold text-white block truncate">
                  {ep.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Request Payload Editor (6 Cols) */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Editor Header */}
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="font-mono text-xs text-slate-400 ml-2">Request Body (JSON)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExecuteRequest}
                  disabled={isLoading}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-3 h-3 fill-current" />
                  )}
                  <span>{isLoading ? 'Transmitting...' : 'Send Request'}</span>
                </button>
              </div>
            </div>

            {/* Editor Area */}
            <div className="p-4 bg-slate-950 font-mono text-xs">
              <textarea
                value={requestPayload}
                onChange={(e) => setRequestPayload(e.target.value)}
                rows={14}
                className="w-full bg-transparent text-cyan-300 focus:outline-hidden resize-none leading-relaxed font-mono"
                spellCheck={false}
              />
            </div>

            {/* Code Snippet Switcher */}
            <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">cURL / SDK:</span>
                <span className="text-slate-300 font-semibold">Ready to test</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>
          </div>

          {/* Response Payload & Live Webhooks (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Live Response Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-300 font-semibold">Response Headers & Body</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                    HTTP {responseStatus} OK
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {latencyMs}ms
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 font-mono text-xs">
                <pre className="text-emerald-300 overflow-x-auto leading-relaxed max-h-[280px]">
                  {responsePayload}
                </pre>
              </div>
            </div>

            {/* Live Webhook Event Stream */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <h4 className="font-bold text-white text-xs">Real-Time Webhook Dispatcher</h4>
                </div>
                <span className="text-[10px] font-mono text-slate-500">HMAC-SHA256 Signed</span>
              </div>

              <div className="space-y-2">
                {webhookLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-cyan-300">{log.event}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <span>{log.timestamp}</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 font-bold">
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
