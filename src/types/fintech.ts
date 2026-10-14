/**
 * Type definitions for Unlimit BaaS & Embedded Finance Platform
 */

export type CardNetwork = 'Mastercard' | 'Visa' | 'UnionPay';
export type CardType = 'virtual' | 'physical-matte' | 'physical-metal' | 'physical-neon' | 'physical-eco';
export type CurrencyCode = 'EUR' | 'GBP' | 'USD' | 'JPY';

export interface IssuedCard {
  id: string;
  network: CardNetwork;
  cardType: CardType;
  last4: string;
  fullPanMasked: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  cardholderName: string;
  brandName: string;
  status: 'active' | 'frozen' | 'terminated';
  currency: CurrencyCode;
  dailyLimit: number;
  monthlyLimit: number;
  onlineTransactionsEnabled: boolean;
  contactlessEnabled: boolean;
  internationalEnabled: boolean;
  createdAt: string;
}

export interface BankAccount {
  id: string;
  currency: CurrencyCode;
  accountName: string;
  iban: string;
  bic: string;
  accountNumber?: string;
  sortCode?: string;
  routingNumber?: string;
  balance: number;
  availableBalance: number;
  paymentRail: 'SEPA' | 'Faster Payments' | 'FedNow / ACH' | 'SWIFT';
  status: 'active' | 'pending_verification';
}

export interface Transaction {
  id: string;
  type: 'card_payment' | 'sepa_inbound' | 'sepa_outbound' | 'atm_withdrawal' | 'api_fee' | 'payout';
  amount: number;
  currency: CurrencyCode;
  merchantOrParty: string;
  category: 'Cloud Services' | 'E-Commerce' | 'B2B Settlement' | 'Payroll' | 'Travel' | 'Subscription';
  timestamp: string;
  status: 'completed' | 'pending' | 'flagged';
  reference: string;
  cardLast4?: string;
}

export interface ComplianceCheck {
  id: string;
  applicantName: string;
  companyName: string;
  country: string;
  kybStatus: 'approved' | 'in_review' | 'flagged';
  amlRiskScore: number; // 0 - 100
  sanctionsMatch: boolean;
  pepMatch: boolean;
  riskRating: 'Low' | 'Medium' | 'High';
  verifiedAt: string;
}

export interface LeadApplication {
  fullName: string;
  corporateEmail: string;
  region: string;
  companyWebsite: string;
  message: string;
  volume: string;
  marketingConsent: boolean;
}

export interface ApiEndpointSpec {
  method: 'POST' | 'GET' | 'DELETE';
  endpoint: string;
  title: string;
  description: string;
  requestBody: Record<string, any>;
  responseSample: Record<string, any>;
}
