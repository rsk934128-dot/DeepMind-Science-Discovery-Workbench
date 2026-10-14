import React, { useState } from 'react';
import {
  INITIAL_ACCOUNTS,
  INITIAL_CARDS,
  INITIAL_TRANSACTIONS,
} from './data/mockFintechData';
import { BankAccount, IssuedCard, Transaction } from './types/fintech';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CardStudio } from './components/CardStudio';
import { GlobalAccounts } from './components/GlobalAccounts';
import { BaaSSandbox } from './components/BaaSSandbox';
import { ComplianceRiskEngine } from './components/ComplianceRiskEngine';
import { OnboardingForm } from './components/OnboardingForm';
import { PressAndSocialProof } from './components/PressAndSocialProof';
import { Footer } from './components/Footer';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [cards, setCards] = useState<IssuedCard[]>(INITIAL_CARDS);
  const [accounts, setAccounts] = useState<BankAccount[]>(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Scroll to section helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Card handlers
  const handleAddCard = (newCard: IssuedCard) => {
    setCards([newCard, ...cards]);
    showToast(`Successfully issued ${newCard.brandName} (${newCard.network} •••• ${newCard.last4})!`);
  };

  const handleToggleFreeze = (cardId: string) => {
    setCards(
      cards.map((c) => {
        if (c.id === cardId) {
          const nextStatus = c.status === 'active' ? 'frozen' : 'active';
          showToast(`Card •••• ${c.last4} is now ${nextStatus.toUpperCase()}`);
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleUpdateLimit = (cardId: string, limit: number) => {
    setCards(
      cards.map((c) => (c.id === cardId ? { ...c, dailyLimit: limit } : c))
    );
    showToast('Daily spend limit updated.');
  };

  // Account & transfer handlers
  const handleExecuteTransfer = (
    sourceAccountId: string,
    amount: number,
    beneficiary: string,
    iban: string,
    reference: string
  ) => {
    // 1. Deduct from account balance
    setAccounts(
      accounts.map((acc) => {
        if (acc.id === sourceAccountId) {
          const updatedBal = Math.max(0, acc.balance - amount);
          return {
            ...acc,
            balance: updatedBal,
            availableBalance: updatedBal,
          };
        }
        return acc;
      })
    );

    // 2. Add entry to transaction ledger
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'sepa_outbound',
      amount: -amount,
      currency: 'EUR',
      merchantOrParty: beneficiary,
      category: 'B2B Settlement',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'completed',
      reference,
    };

    setTransactions([newTx, ...transactions]);
    showToast(`SEPA Instant payment of €${amount.toLocaleString()} settled to ${beneficiary}!`);
  };

  const handleSimulateDeposit = (
    accountId: string,
    amount: number,
    sender: string
  ) => {
    setAccounts(
      accounts.map((acc) => {
        if (acc.id === accountId) {
          const updatedBal = acc.balance + amount;
          return {
            ...acc,
            balance: updatedBal,
            availableBalance: updatedBal,
          };
        }
        return acc;
      })
    );

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'sepa_inbound',
      amount: amount,
      currency: 'EUR',
      merchantOrParty: sender,
      category: 'B2B Settlement',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'completed',
      reference: `SEPA-INST-IN-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setTransactions([newTx, ...transactions]);
    showToast(`Received inbound deposit of €${amount.toLocaleString()} from ${sender}!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Global Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSandbox={() => handleNavigate('developer-sandbox')}
        onOpenContact={() => handleNavigate('onboarding')}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onExploreCards={() => handleNavigate('card-studio')}
          onExploreAccounts={() => handleNavigate('global-accounts')}
          onOpenSandbox={() => handleNavigate('developer-sandbox')}
          onOpenContact={() => handleNavigate('onboarding')}
        />

        {/* 2. White Label Card Studio */}
        <CardStudio
          cards={cards}
          onAddCard={handleAddCard}
          onToggleFreeze={handleToggleFreeze}
          onUpdateLimit={handleUpdateLimit}
        />

        {/* 3. Multi-Currency IBAN & Global Accounts */}
        <GlobalAccounts
          accounts={accounts}
          transactions={transactions}
          onExecuteTransfer={handleExecuteTransfer}
          onSimulateDeposit={handleSimulateDeposit}
        />

        {/* 4. Developer Sandbox & Live API Tester */}
        <BaaSSandbox />

        {/* 5. Compliance, KYC & Risk Engine */}
        <ComplianceRiskEngine />

        {/* 6. Media Recognition & Press Mentions */}
        <PressAndSocialProof />

        {/* 7. Enterprise Lead & Onboarding Application */}
        <OnboardingForm />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-mono text-xs animate-bounce">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
