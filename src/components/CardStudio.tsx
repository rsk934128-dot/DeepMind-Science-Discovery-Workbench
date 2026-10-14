import React, { useState } from 'react';
import { CardNetwork, CardType, CurrencyCode, IssuedCard } from '../types/fintech';
import {
  CreditCard,
  Lock,
  Unlock,
  Sliders,
  Sparkles,
  Zap,
  Globe2,
  CheckCircle2,
  RotateCw,
  Plus,
  Shield,
  Layers,
  Copy,
  Check,
} from 'lucide-react';

interface CardStudioProps {
  cards: IssuedCard[];
  onAddCard: (card: IssuedCard) => void;
  onToggleFreeze: (cardId: string) => void;
  onUpdateLimit: (cardId: string, limit: number) => void;
}

export const CardStudio: React.FC<CardStudioProps> = ({
  cards,
  onAddCard,
  onToggleFreeze,
  onUpdateLimit,
}) => {
  // Designer state
  const [selectedNetwork, setSelectedNetwork] = useState<CardNetwork>('Mastercard');
  const [selectedType, setSelectedType] = useState<CardType>('physical-metal');
  const [brandName, setBrandName] = useState('NEXUS FINTECH');
  const [cardholderName, setCardholderName] = useState('VICTORIA MERCER');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('EUR');
  const [dailyLimit, setDailyLimit] = useState(25000);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mint instant card
  const handleMintCard = () => {
    const random4 = Math.floor(1000 + Math.random() * 9000).toString();
    const cvv = Math.floor(100 + Math.random() * 900).toString();

    let prefix = '5412';
    if (selectedNetwork === 'Visa') prefix = '4242';
    if (selectedNetwork === 'UnionPay') prefix = '6221';

    const newCard: IssuedCard = {
      id: `crd_${Date.now()}`,
      network: selectedNetwork,
      cardType: selectedType,
      last4: random4,
      fullPanMasked: `${prefix} •••• •••• ${random4}`,
      expMonth: '10',
      expYear: '30',
      cvv,
      cardholderName: cardholderName.toUpperCase() || 'VALUED CLIENT',
      brandName: brandName.toUpperCase() || 'UNLIMIT CARD',
      status: 'active',
      currency: selectedCurrency,
      dailyLimit,
      monthlyLimit: dailyLimit * 4,
      onlineTransactionsEnabled: true,
      contactlessEnabled: selectedType !== 'virtual',
      internationalEnabled: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddCard(newCard);
  };

  const getCardStyle = (type: CardType) => {
    switch (type) {
      case 'physical-metal':
        return 'bg-gradient-to-br from-slate-900 via-neutral-800 to-slate-950 border-slate-700 shadow-2xl';
      case 'physical-matte':
        return 'bg-gradient-to-br from-zinc-900 via-stone-900 to-neutral-950 border-neutral-800 shadow-2xl';
      case 'physical-neon':
        return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900 border-cyan-500/40 shadow-2xl shadow-cyan-500/10';
      case 'physical-eco':
        return 'bg-gradient-to-br from-teal-950 via-emerald-950 to-slate-950 border-emerald-500/30 shadow-2xl';
      case 'virtual':
        return 'bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 border-blue-500/40 shadow-2xl';
      default:
        return 'bg-slate-900 border-slate-800';
    }
  };

  return (
    <section id="card-studio" className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>White-Label Card Issuing Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Design branded cards that represent your business
          </h2>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Leverage our principal memberships of Mastercard, Visa and UnionPay. Launch physical metal, matte or instant tokenized virtual cards for your customers and employees in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Card Visualizer (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-md">
              {/* Card Container */}
              <div
                className={`relative w-full aspect-[1.586] rounded-2xl p-6 transition-all duration-500 border ${getCardStyle(
                  selectedType
                )}`}
              >
                {!isFlipped ? (
                  /* FRONT OF CARD */
                  <div className="h-full flex flex-col justify-between relative z-10">
                    <div className="flex items-center justify-between">
                      {/* Chip & Brand */}
                      <div className="flex items-center gap-3">
                        {selectedType !== 'virtual' ? (
                          <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300/40 p-1 flex flex-col justify-between">
                            <div className="w-full h-0.5 bg-amber-700/40 rounded"></div>
                            <div className="w-full h-0.5 bg-amber-700/40 rounded"></div>
                            <div className="w-full h-0.5 bg-amber-700/40 rounded"></div>
                          </div>
                        ) : (
                          <div className="px-2.5 py-1 rounded bg-blue-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-blue-400/30 flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>INSTANT VIRTUAL</span>
                          </div>
                        )}
                        <Zap className="w-4 h-4 text-cyan-400 rotate-90" />
                      </div>

                      <span className="font-bold text-xs tracking-widest text-slate-200 font-mono uppercase">
                        {brandName || 'YOUR BRAND'}
                      </span>
                    </div>

                    {/* Middle: Masked PAN */}
                    <div className="my-auto">
                      <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono block">
                        Direct Issuing PAN
                      </span>
                      <div className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-white drop-shadow-md">
                        {selectedNetwork === 'Visa'
                          ? '4242 •••• •••• 8842'
                          : selectedNetwork === 'UnionPay'
                          ? '6221 •••• •••• 8842'
                          : '5412 •••• •••• 8842'}
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-slate-400 block font-mono">
                          Cardholder
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wide">
                          {cardholderName || 'CARDHOLDER NAME'}
                        </span>
                      </div>

                      <div className="text-center">
                        <span className="text-[8px] uppercase tracking-widest text-slate-400 block font-mono">
                          Expires
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-200">
                          10/30
                        </span>
                      </div>

                      {/* Network Emblem */}
                      <div className="text-right">
                        {selectedNetwork === 'Mastercard' && (
                          <div className="flex items-center -space-x-2">
                            <div className="w-7 h-7 rounded-full bg-rose-500 opacity-90 shadow-sm" />
                            <div className="w-7 h-7 rounded-full bg-amber-400 opacity-90 shadow-sm" />
                          </div>
                        )}
                        {selectedNetwork === 'Visa' && (
                          <span className="font-sans font-black text-xl italic text-white tracking-tighter">
                            VISA
                          </span>
                        )}
                        {selectedNetwork === 'UnionPay' && (
                          <div className="px-2 py-0.5 rounded bg-gradient-to-r from-red-600 via-blue-600 to-emerald-600 text-[10px] font-extrabold text-white">
                            UnionPay
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* BACK OF CARD */
                  <div className="h-full flex flex-col justify-between relative z-10">
                    {/* Magnetic Stripe */}
                    <div className="-mx-6 -mt-2 h-10 bg-black/90 border-y border-slate-700/50" />

                    {/* CVV & Signature Strip */}
                    <div className="my-auto space-y-2">
                      <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                        <span>AUTHORIZED SIGNATURE</span>
                        <span>SECURITY CVV</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-8 bg-slate-200 rounded flex items-center px-3 font-mono text-slate-900 text-xs italic tracking-wider">
                          {cardholderName}
                        </div>
                        <div className="w-14 h-8 bg-white rounded border border-slate-300 flex items-center justify-center font-mono font-bold text-slate-900 text-xs">
                          914
                        </div>
                      </div>
                    </div>

                    <div className="text-[8px] text-slate-400 font-mono leading-tight">
                      This card is issued by Unlimit under license from {selectedNetwork} International. Regulated electronic money institution.
                    </div>
                  </div>
                )}
              </div>

              {/* Flip Button */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isFlipped ? 'Show Front' : 'View Security Strip (Back)'}</span>
                </button>

                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-full">
                  Currency: {selectedCurrency} &bull; Rail: Direct Issuing
                </span>
              </div>
            </div>

            {/* Issued Cards Showcase List */}
            <div className="w-full max-w-md mt-8 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
                <span>Active Cards in Organization ({cards.length})</span>
                <span className="font-mono text-cyan-400">Live Card Controls</span>
              </div>

              {cards.map((c) => (
                <div
                  key={c.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    c.status === 'frozen'
                      ? 'bg-slate-900/40 border-rose-500/30 opacity-75'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-[10px] text-slate-300 font-bold">
                        {c.network === 'Mastercard' ? 'MC' : c.network === 'Visa' ? 'VISA' : 'UP'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white">
                            •••• {c.last4}
                          </span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                              c.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {c.brandName} &bull; {c.cardholderName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleFreeze(c.id)}
                        className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                          c.status === 'active'
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                        title={c.status === 'active' ? 'Freeze Card' : 'Unfreeze Card'}
                      >
                        {c.status === 'active' ? (
                          <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-rose-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Spending Limit Progress */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Daily Limit: €{c.dailyLimit.toLocaleString()}</span>
                    <span>Monthly Limit: €{c.monthlyLimit.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Designer Controls (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-2xl">
            <div>
              <h3 className="text-lg font-bold text-white">Co-Branded Card Configurator</h3>
              <p className="text-xs text-slate-400 mt-1">
                Customize every dimension of your physical or digital payment instrument.
              </p>
            </div>

            {/* 1. Payment Network Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Card Scheme (Direct Principal Membership)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['Mastercard', 'Visa', 'UnionPay'] as CardNetwork[]).map((net) => (
                  <button
                    key={net}
                    onClick={() => setSelectedNetwork(net)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      selectedNetwork === net
                        ? 'bg-indigo-600/30 border-indigo-500 text-cyan-300 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span>{net}</span>
                    <span className="text-[9px] text-slate-400 font-normal">Principal</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Card Material / Tier */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Card Finish & Material Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'physical-metal', label: 'Titanium Metal' },
                  { id: 'physical-matte', label: 'Matte Obsidian' },
                  { id: 'physical-neon', label: 'Cyber Neon' },
                  { id: 'physical-eco', label: 'Ocean Recycled' },
                  { id: 'virtual', label: 'Virtual Instant' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedType(tier.id as CardType)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedType === tier.id
                        ? 'bg-slate-800 border-cyan-400 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Text inputs: Brand & Cardholder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Brand / Corporate Label
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g. ACME FINTECH"
                  maxLength={22}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Cardholder Full Name
                </label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g. EMMA WATSON"
                  maxLength={24}
                />
              </div>
            </div>

            {/* 4. Currency & Daily Spend Limit Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Daily Spend Limit Control
                </label>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  €{dailyLimit.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>€1,000</span>
                <span>€50,000</span>
                <span>€100,000</span>
              </div>
            </div>

            {/* Mint Action Button */}
            <div className="pt-2">
              <button
                onClick={handleMintCard}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Instantly Mint & Issue Co-Branded Card</span>
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">
                Directly connected to Unlimit Core Card Management System (CMS).
              </p>
            </div>
          </div>
        </div>

        {/* Physical Craftsmanship & Production Gallery */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 6 cols: High-Res Image Showcase */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group">
              <img
                src="/src/assets/images/cobranded_cards_studio_1792003830598.jpg"
                alt="Luxury Titanium & Matte Obsidian Co-Branded Cards by Unlimit"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-cyan-300 border border-slate-700 backdrop-blur-md">
                  Solid 18g Titanium &bull; Laser Engraved
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md font-bold">
                  Certified Mastercard & Visa
                </span>
              </div>
            </div>

            {/* Right 6 cols: Specifications & Enterprise Fulfillment */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Manufacturing & Turnkey Fulfillment</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Premium Metal, Recycled Ocean Plastic & Virtual Tokens
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whether creating exclusive ultra-wealth titanium cards with laser-engraved personal signatures, or issuing sustainable recycled ocean plastic cards for everyday commerce, our turnkey manufacturing handles packaging, dropshipping, and global postal fulfillment with PIN-by-SMS activation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">Dual-Interface EMV</span>
                  <span className="text-[11px] text-slate-400">High-speed contactless NFC compliant with ISO/IEC 14443 standards.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">Apple Pay & Google Pay</span>
                  <span className="text-[11px] text-slate-400">Instant in-app push provisioning with tokenized network cryptograms.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">Dynamic CVV Security</span>
                  <span className="text-[11px] text-slate-400">Rotating digital security code for maximum CNP fraud mitigation.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">Global Carrier Shipping</span>
                  <span className="text-[11px] text-slate-400">Delivered directly to end-users in 170+ countries with custom packaging.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
