import React, { useState } from 'react';
import { BankAccount, CurrencyCode, Transaction } from '../types/fintech';
import {
  Building2,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  Check,
  Send,
  PlusCircle,
  Clock,
  ShieldCheck,
  Zap,
  Filter,
  Globe2,
} from 'lucide-react';

interface GlobalAccountsProps {
  accounts: BankAccount[];
  transactions: Transaction[];
  onExecuteTransfer: (
    sourceAccountId: string,
    amount: number,
    beneficiary: string,
    iban: string,
    reference: string
  ) => void;
  onSimulateDeposit: (accountId: string, amount: number, sender: string) => void;
}

export const GlobalAccounts: React.FC<GlobalAccountsProps> = ({
  accounts,
  transactions,
  onExecuteTransfer,
  onSimulateDeposit,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('EUR');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Transfer modal state
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState('12500');
  const [beneficiaryName, setBeneficiaryName] = useState('Stripe European Settlement B.V.');
  const [beneficiaryIban, setBeneficiaryIban] = useState('DE89 3704 0044 0532 0130 00');
  const [transferRef, setTransferRef] = useState('INV-OCT-2026-88');

  // Transaction filter
  const [txFilter, setTxFilter] = useState<'all' | 'inbound' | 'outbound'>('all');

  const currentAccount =
    accounts.find((a) => a.currency === selectedCurrency) || accounts[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmitTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0) return;

    onExecuteTransfer(
      currentAccount.id,
      amount,
      beneficiaryName,
      beneficiaryIban,
      transferRef
    );

    setShowTransferModal(false);
  };

  const handleInstantDeposit = () => {
    onSimulateDeposit(
      currentAccount.id,
      25000,
      'Amazon Marketplace Payout EU'
    );
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (txFilter === 'inbound') return tx.amount > 0;
    if (txFilter === 'outbound') return tx.amount < 0;
    return true;
  });

  return (
    <section id="global-accounts" className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Virtual Accounts & Individual IBANs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Multicurrency accounts with dedicated IBANs
          </h2>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Create secure customer accounts with individual IBANs. Connect directly to SEPA, Faster Payments and global clearing networks with real-time liquidity.
          </p>
        </div>

        {/* Currency Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {accounts.map((acc) => {
            const isActive = acc.currency === selectedCurrency;
            return (
              <button
                key={acc.id}
                onClick={() => setSelectedCurrency(acc.currency)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="font-mono text-sm">
                  {acc.currency === 'EUR' ? '€' : acc.currency === 'GBP' ? '£' : acc.currency === 'USD' ? '$' : '¥'}
                </span>
                <span>{acc.currency} Wallet</span>
                <span className="font-mono text-[11px] opacity-80">
                  {acc.currency === 'EUR'
                    ? `€${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                    : acc.currency === 'GBP'
                    ? `£${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                    : acc.currency === 'USD'
                    ? `$${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                    : `¥${acc.balance.toLocaleString('en-US')}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Account Details Card & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Account Details (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400 font-mono block">Active Multi-Currency Entity</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{currentAccount.accountName}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold flex items-center gap-1.5">
                  <Zap className="w-3 h-3" />
                  <span>{currentAccount.paymentRail} Ready</span>
                </span>
              </div>
            </div>

            {/* Balances */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Available Balance</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1 block">
                  {currentAccount.currency === 'EUR'
                    ? `€${currentAccount.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                    : currentAccount.currency === 'GBP'
                    ? `£${currentAccount.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                    : currentAccount.currency === 'USD'
                    ? `$${currentAccount.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                    : `¥${currentAccount.availableBalance.toLocaleString('en-US')}`}
                </span>
                <span className="text-[10px] text-emerald-400 block mt-1">100% Unencumbered & Liquid</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Account ID & Status</span>
                <span className="text-lg font-bold text-slate-200 font-mono mt-1 block">
                  {currentAccount.id}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Direct Settlement via Central Clearing</span>
              </div>
            </div>

            {/* IBAN & Routing Information Grid */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                    Individual Virtual IBAN
                  </span>
                  <span className="font-mono text-sm font-bold text-cyan-300">
                    {currentAccount.iban}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(currentAccount.iban, 'iban')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs flex items-center gap-1 transition-colors"
                >
                  {copiedId === 'iban' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'iban' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                      SWIFT / BIC
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-200">
                      {currentAccount.bic}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(currentAccount.bic, 'bic')}
                    className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                      Clearing Network
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-200">
                      {currentAccount.paymentRail}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Simulation Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-white text-sm">Interactive Banking Actions</h4>
              <p className="text-xs text-slate-400">
                Execute live simulated SEPA/Faster Payments transactions on your dedicated account ledger.
              </p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                <button
                  onClick={() => setShowTransferModal(true)}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Execute SEPA / Payout Transfer</span>
                </button>

                <button
                  onClick={handleInstantDeposit}
                  className="py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Simulate Inbound €25,000 Deposit</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 text-slate-400 font-mono">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Real-Time Settlement SLA</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  SEPA Instant transactions settle in &lt;10 seconds. Automated reconciliation webhooks dispatched to your core backend.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Clearing Network & SEPA Infrastructure Showcase */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 6 cols: Network visual image */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group">
              <img
                src="/src/assets/images/global_banking_sepa_1792003831800.jpg"
                alt="European Banking Network & SEPA Instant Clearing Infrastructure"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-cyan-300 border border-slate-700 backdrop-blur-md">
                  34 SEPA Countries &bull; EBA RT1 & Target2
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md font-bold">
                  SLA: &lt; 10s Settlement
                </span>
              </div>
            </div>

            {/* Right 6 cols: Clearing Rails & Liquidity */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Pan-European Central Bank Rails</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Direct Clearing via European Central Bank Target2 & EBA RT1
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect your business directly to Europe's central payment highways without intermediaries. Every virtual and physical IBAN functions as a tier-1 banking address with instant settlement, automated XML ISO 20022 message reconciliation, and multi-currency liquidity pooling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Real-Time Rails</span>
                  <span className="font-bold text-white text-xs mt-1 block">SEPA Instant + Faster Payments</span>
                  <span className="text-[10px] text-emerald-400 mt-0.5 block">24/7/365 Settlement</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Interoperability</span>
                  <span className="font-bold text-white text-xs mt-1 block">ISO 20022 Native</span>
                  <span className="text-[10px] text-cyan-400 mt-0.5 block">Full Message Transparency</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Transaction Ledger */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base">Corporate Transaction Ledger</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time clearing entries for card purchases, SEPA payouts, and inbound settlements.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setTxFilter('all')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  txFilter === 'all' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Entries
              </button>
              <button
                onClick={() => setTxFilter('inbound')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  txFilter === 'inbound' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Inbound (+)
              </button>
              <button
                onClick={() => setTxFilter('outbound')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  txFilter === 'outbound' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Outbound (-)
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredTransactions.map((tx) => {
              const isPositive = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-wrap items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                        isPositive
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                      }`}
                    >
                      {isPositive ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>

                    <div>
                      <span className="font-semibold text-white block text-sm">
                        {tx.merchantOrParty}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                        <span>{tx.timestamp}</span>
                        <span>&bull;</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {tx.category}
                        </span>
                        {tx.cardLast4 && <span>&bull; Card: •••• {tx.cardLast4}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-mono text-sm font-bold block ${
                        isPositive ? 'text-emerald-400' : 'text-slate-200'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {tx.currency === 'EUR' ? '€' : tx.currency === 'USD' ? '$' : '£'}
                      {Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                      Ref: {tx.reference}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transfer Execution Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="font-bold text-white text-lg">Execute SEPA Instant Transfer</h3>
                <p className="text-xs text-slate-400 mt-0.5">Source: {currentAccount.iban}</p>
              </div>
              <button
                onClick={() => setShowTransferModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitTransfer} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Beneficiary Legal Name</label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Destination IBAN</label>
                <input
                  type="text"
                  value={beneficiaryIban}
                  onChange={(e) => setBeneficiaryIban(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Amount ({currentAccount.currency})</label>
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Payment Rail</label>
                  <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono font-bold">
                    SEPA Instant (&lt; 10s)
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Payment Reference</label>
                <input
                  type="text"
                  value={transferRef}
                  onChange={(e) => setTransferRef(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-lg font-bold shadow-md shadow-cyan-500/20"
                >
                  Confirm & Transmit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
