# 💳 Unlimit — Next-Gen Banking-as-a-Service (BaaS) & Card Issuing Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)

<p align="center">
  <img src="/src/assets/images/fintech_hero_banner_1792003830278.jpg" alt="Unlimit Next-Gen Banking-as-a-Service Platform" width="100%" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
</p>

> **Bringing innovation into the main sphere of banking for your business.**  
> একটি পূর্ণাঙ্গ এন্টারপ্রাইজ গ্রেড **Banking-as-a-Service (BaaS)** এবং ফিনটেক সলিউশন প্ল্যাটফর্ম — যেখানে রয়েছে হোয়াইট-লেবেল কার্ড ইস্যুয়িং, মাল্টি-কারেন্সি IBAN অ্যাকাউন্ট, SEPA Instant রিয়েল-টাইম পেমেন্ট, স্বয়ংক্রিয় AML/KYC কমপ্লায়েন্স ইঞ্জিন এবং রেট-লিমিট টেলিমেট্রি সহ ইন্টারঅ্যাক্টিভ ডেভেলপার স্যান্ডবক্স।

---

## 📑 সূচিপত্র (Table of Contents)

1. [প্ল্যাটফর্ম পরিচিতি (Overview)](#-প্ল্যাটফর্ম-পরিচিতি-overview)
2. [মূল ফিচারসমূহ ও ভিজ্যুয়াল গ্যালারি (Features & Gallery)](#-মূল-ফিচারসমূহ-key-features)
   - [১. হোয়াইট-লেবেল কার্ড স্টুডিও (Card Studio)](#১-হোয়াইট-লেবেল-কার্ড-স্টুডিও-card-studio)
   - [২. গ্লোবাল অ্যাকাউন্টস ও মাল্টি-কারেন্সি IBAN](#২-গ্লোবাল-অ্যাকাউন্টস-ও-মাল্টি-কারেন্সি-iban)
   - [৩. ডেভেলপার স্যান্ডবক্স ও রেট লিমিট মনিটর](#৩-ডেভেলপার-স্যান্ডবক্স-ও-রেট-লিমিট-মনিটর-baas-sandbox)
   - [৪. কমপ্লায়েন্স, KYB/KYC ও রিস্ক ইঞ্জিন](#৪-কমপ্লায়েন্স-kybkyc-ও-রিস্ক-ইঞ্জিন)
   - [৫. এন্টারপ্রাইজ অনবোর্ডিং পোর্টাল](#৫-এন্টারপ্রাইজ-অনবোর্ডিং-portal)
3. [টেকনিক্যাল আর্কিটেকচার (Technical Architecture)](#-টেকনিক্যাল-আর্কিটেকচার-technical-architecture)
4. [প্রজেক্ট স্ট্রাকচার (Project Structure)](#-প্রজেক্ট-স্ট্রাকচার-project-structure)
5. [ইনস্টলেশন ও রান করার নিয়ম (Setup & Run)](#-ইনস্টলেশন-ও-রান-করার-নিয়ম-setup--run)
6. [API স্পেসিফিকেশন ও এন্ডপয়েন্ট (API Endpoints)](#-api-স্পেসিফিকেশন-ও-এন্ডপয়েন্ট)

---

## 🌟 প্ল্যাটফর্ম পরিচিতি (Overview)

Unlimit BaaS প্ল্যাটফর্মটি আধুনিক ফিনটেক কোম্পানি, নিওব্যাংক এবং গ্লোবাল এন্টারপ্রাইজগুলোর জন্য তৈরি। ঐতিহ্যবাহী ব্যাংকিংয়ের ধীরগতি ও লিগ্যাসি জটিলতা দূর করে একক API ইন্টিগ্রেশনের মাধ্যমে পেমেন্ট, কার্ড ইস্যু এবং ডিজিটাল ব্যাংকিং চালু করতে সহায়তা করে।

### 🏆 প্রধান সুবিধাসমূহ
- **প্রিন্সিপাল মেম্বারশিপ:** Mastercard, Visa এবং UnionPay নেটওয়ার্কে ডিরেক্ট ইস্যুয়িং ও প্রসেসিং।
- **সিঙ্গেল কন্ট্রাক্ট, ফুল সলিউশন:** এক চুক্তিতে কার্ড ইস্যু, ব্যাংক অ্যাকাউন্ট, পেমেন্ট এবং কমপ্লায়েন্স।
- **রিয়েল-টাইম সেটেলমেন্ট:** SEPA Instant (Single Euro Payments Area) এবং Faster Payments সক্ষমতা।
- **রেগুলেটরি কমপ্লায়েন্স:** লাইসেন্সপ্রাপ্ত ব্যাংকিং ও পেমেন্ট সেবার সার্বিক আইনি ও প্রযুক্তিগত সুরক্ষা।

---

## 🚀 মূল ফিচারসমূহ (Key Features)

### ১. হোয়াইট-লেবেল কার্ড স্টুডিও (Card Studio)

<p align="center">
  <img src="/src/assets/images/cobranded_cards_studio_1792003830598.jpg" alt="White-Label Co-Branded Card Issuing Studio" width="100%" style="border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);" />
</p>

- **কাস্টম কো-ব্র্যান্ডেড কার্ড ডিজাইন:** Mastercard, Visa ও UnionPay নেটওয়ার্কে ফিজিক্যাল ও ভার্চুয়াল কার্ড তৈরি।
- **লাইভ ইন্টারঅ্যাক্টিভ প্রিভিউ:** কার্ডের রঙ, টায়ার (Platinum, Infinite, Corporate), কারেন্সি এবং ব্র্যান্ডের নাম লাইভ পরিবর্তন।
- **সিকিউরিটি ও কন্ট্রোল:** 
  - এক ক্লিকে কার্ড **Freeze / Unfreeze** করার সুবিধা।
  - ডেইলি স্পেন্ড লিমিট স্লাইডার দিয়ে খরচের সীমা নির্ধারণ।
  - কার্ডহোল্ডারের নাম, এক্সপায়ারি ডেট এবং মাস্কড কার্ড নম্বর প্রদর্শন।

---

### ২. গ্লোবাল অ্যাকাউন্টস ও মাল্টি-কারেন্সি IBAN

<p align="center">
  <img src="/src/assets/images/global_banking_sepa_1792003831800.jpg" alt="Global Banking Network & SEPA Instant Settlement" width="100%" style="border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);" />
</p>

- **ডেডিকেটেড IBAN প্রভিশনিং:** ব্যক্তি ও প্রাতিষ্ঠানিক ক্লায়েন্টদের জন্য নিজস্ব ইউরোপীয় IBAN (EUR) ও গ্লোবাল অ্যাকাউন্টস।
- **রিয়েল-টাইম ব্যালেন্স ট্র্যাকিং:** লাইভ এবং অ্যাভেইলেবল ব্যালেন্স ম্যানেজমেন্ট।
- **SEPA Instant ট্রান্সফার সিমুলেটর:**
  - সরাসরি যেকোনো বেনিফিশিয়ারির IBAN-এ সেকেন্ডের মধ্যে অর্থ পাঠানোর লাইভ সিমুলেশন।
  - ব্যাংক ব্যালেন্স থেকে অটোমেটিক কর্তন ও রসিদ তৈরি।
- **ইনবাউন্ড ডিপোজিট টেস্ট:** ব্যাংক অ্যাকাউন্টে তাৎক্ষণিক ফান্ড ডিপোজিট সিমুলেশন।
- **রিয়েল-টাইম ট্রানজ্যাকশন লেজার:** তারিখ, ক্যাটাগরি, রেফারেন্স আইডি এবং স্ট্যাটাস সহ ফুল স্টেটমেন্ট।

---

### ৩. ডেভেলপার স্যান্ডবক্স ও রেট লিমিট মনিটর (BaaS Sandbox)

<p align="center">
  <img src="/src/assets/images/developer_api_sandbox_1792003832639.jpg" alt="Interactive Developer API Sandbox & Telemetry Monitor" width="100%" style="border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);" />
</p>

বিকাশকারী ও টেকনিক্যাল টিমদের জন্য তৈরি ফুল-ফিচার্ড ইন্টারঅ্যাক্টিভ টেস্টিং এনভায়রনমেন্ট:

- **লাইভ API এক্সিকিউটর:**
  - কার্ড ইস্যু (`POST /v1/issuing/cards`)
  - ভার্চুয়াল IBAN তৈরি (`POST /v1/accounts/iban`)
  - পেমেন্ট পেআউট (`POST /v1/payments/transfers`)
  - কমপ্লায়েন্স ভেরিফিকেশন (`POST /v1/compliance/verify`)
- **JSON রিকোয়েস্ট ও রেসপন্স কনসোল:** এডিটেবল রিকোয়েস্ট পেলোড, HTTP স্ট্যাটাস কোড ও লেটেন্সি ট্র্যাকিং।
- **১-ক্লিক cURL কোড জেনারেটর:** টার্মিনালে চালানোর উপযোগী পূর্ণাঙ্গ cURL কমান্ড কপি করার সুবিধা।
- **ওয়েবহুক ইভেন্ট স্ট্রিম:** HMAC-SHA256 সাইনড রিয়েল-টাইম ইভেন্ট লগ (`card.issued.active`, `sepa.instant.cleared` ইত্যাদি)।

#### 🛡️ রেট লিমিট মনিটর ও ২০% ক্রিটিক্যাল অ্যালার্ট সিস্টেম (Rate Limit Monitor)
API কোটা ট্র্যাকিং এবং ওভার-ইউসেজ প্রতিরোধে রয়েছে আধুনিক টেলিমেট্রি মনিটর:
- **কোটা ট্র্যাকিং প্রগ্রেস বার:** ১০,০০০ রিকোয়েস্টের মোট কোটা থেকে অবশিষ্ট ব্যবহারের পরিমাণ প্রদর্শন।
- **কনফিগারেশন ড্রয়ার (Threshold Config):**
  - **স্লাইডার ও প্রিসেট:** ৫% থেকে ৪০% পর্যন্ত সতর্কতার সীমা নির্ধারণ (ডিফল্ট: **২০% ক্রিটিক্যাল থ্রেশহোল্ড**)।
  - **রেড প্রগ্রেস বার টগল:** অবশিষ্ট কোটা ২০% এ নামলে প্রগ্রেস বার স্বয়ংক্রিয়ভাবে সতর্কতামূলক উজ্জ্বল লাল রঙে (`from-red-600 via-rose-600 to-red-500`) পরিবর্তিত হয়।
  - **ভিজ্যুয়াল অ্যালার্ট ব্যানার:** থ্রেশহোল্ড অতিক্রম করলে স্ক্রিনে হাই-প্রায়োরিটি রেড অ্যালার্ট ও সরাসরি কোটা রিনিউ বোতাম সক্রিয় হয়।
  - **পালসিং গ্লো ইফেক্ট:** দৃষ্টি আকর্ষণ করার জন্য রেড বার ও ব্যাজে পালস অ্যানিমেশন।
  - **অডিবল চাইম অ্যালার্ট:** ব্রাউজারের Web Audio সিন্থেসাইজারের মাধ্যমে সূক্ষ্ম টেকনিক্যাল বীপ টোন।
  - **থ্রেশহোল্ড মার্কার লাইন:** প্রগ্রেস বার ট্র্যাকে ২০% অবস্থানে স্পষ্ট উল্লম্ব মার্কার নির্দেশক।
  - **১-ক্লিক টেস্ট সিমুলেশন:**
    - `Trigger 20% Threshold (Exact Hit)` — ঠিক ২০% কোটাতে নিয়ে এসে টেস্ট করার সুযোগ।
    - `Trigger 15% (Severe Zone)` — চরম মাত্রার কোটা সংকটের সিমুলেশন।
    - `Restore 65% (Healthy)` — স্বাভাবিক অবস্থায় প্রত্যাবর্তন।
    - `Reset Quota (100%)` — ফুল কোটা রিসেট।
- **টেলিমেট্রি ড্যাশবোর্ড:** সাম্প্রতিক রিকোয়েস্টগুলোর গড় লেটেন্সি (Average Latency), Min/Max রেঞ্জ এবং ৯৯.৯৮% SLA কমপ্লায়েন্স মেট্রিক্স।

---

### ৪. কমপ্লায়েন্স, KYB/KYC ও রিস্ক ইঞ্জিন
- **অটোমেটেড ভেরিফিকেশন:** এন্টারপ্রাইজ অনবোর্ডিংয়ে লাইভ KYB/KYC স্ক্রিনিং।
- **AML ও স্যাংশন স্ক্রিনিং:** পেপ (PEP) ও ব্ল্যাকলিস্ট ডেটাবেস চেক।
- **রিস্ক স্কোরিং ক্যালকুলেটর:** লেনদেনের প্যাটার্ন অনুযায়ী লো, মিডিয়াম বা হাই রিস্ক ক্যাটাগরাইজেশন।

---

### ৫. এন্টারপ্রাইজ অনবোর্ডিং পোর্টাল
- ব্যবসায়িক ক্লায়েন্টদের জন্য লিড জেনারেশন ফর্ম।
- কর্পোরেট ইমেইল, ইনকর্পোরেশন অঞ্চল, কোম্পানির ওয়েবসাইট ও কার্ড ইস্যুয়িং ভলিউম নির্বাচন।
- ফর্ম ভ্যালিডেশন এবং সাবমিশনের পর কনফার্মেশন স্টেট।

---

## 🛠️ টেকনিক্যাল আর্কিটেকচার (Technical Architecture)

```text
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
│                   React 19 + Tailwind CSS                   │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
               ▼                               ▼
┌───────────────────────────────┐  ┌───────────────────────────┐
│     BaaS Sandbox Component    │  │  Financial Engine (State) │
│ - Live Request / Response     │  │ - Multi-Currency Accounts │
│ - Rate Limit Telemetry (20%)  │  │ - Card Studio (Cards)     │
│ - Webhook Event Streamer      │  │ - SEPA Instant Settlement │
│ - Web Audio Alert Synthesizer │  │ - Transaction Ledger      │
└──────────────┬────────────────┘  └───────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│              Full-Stack Express Server (Node.js)            │
│                     server.ts / Vite Middleware             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 প্রজেক্ট স্ট্রাকচার (Project Structure)

```text
├── README.md                     # পূর্ণাঙ্গ প্রজেক্ট ডকুমেন্টেশন ও ভিজ্যুয়াল গাইড
├── index.html                    # HTML এন্ট্রি পয়েন্ট ও এসইও মেটাডাটা
├── metadata.json                 # অ্যাপ মেটাডাটা ও পারমিশন
├── package.json                  # ডিপেন্ডেন্সি ও বিল্ড স্ক্রিপ্টস
├── server.ts                     # Express ব্যাকএন্ড সার্ভার ও প্রক্সি
├── tsconfig.json                 # টাইপস্ক্রিপ্ট কনফিগারেশন
├── vite.config.ts                # Vite কনফিগারেশন
└── src
    ├── assets
    │   └── images                # প্ল্যাটফর্মের হাই-রেজ্যুলেশন ভিজ্যুয়াল ব্যানার
    ├── App.tsx                   # প্রধান রুট কম্পোনেন্ট ও গ্লোবাল স্টেট
    ├── main.tsx                  # রিঅ্যাক্ট ডম মাউন্ট
    ├── index.css                 # গ্লোবাল টেইলউইন্ড সিএসএস (@import "tailwindcss")
    ├── types
    │   └── fintech.ts            # অ্যাকাউন্ট, কার্ড, ট্রানজ্যাকশন ও API টাইপস
    ├── data
    │   └── mockFintechData.ts    # প্রাথমিক অ্যাকাউন্টস, কার্ডস ও এন্ডপয়েন্ট ডেটা
    └── components
        ├── Navbar.tsx            # গ্লোবাল নেভিগেশন বার
        ├── HeroSection.tsx       # ব্র্যান্ড হিরো ও ইন্ট্রোডাকশন সেকশন
        ├── CardStudio.tsx        # হোয়াইট-লেবেল কো-ব্র্যান্ডেড কার্ড স্টুডিও
        ├── GlobalAccounts.tsx    # মাল্টি-কারেন্সি IBAN ও SEPA পেমেন্ট ট্রান্সফার
        ├── BaaSSandbox.tsx       # রেট লিমিট মনিটর (২০% রেড অ্যালার্ট) ও API কনসোল
        ├── ComplianceRiskEngine.tsx # KYC/AML রিস্ক ইঞ্জিন
        ├── PressAndSocialProof.tsx  # আন্তর্জাতিক মিডিয়া স্বীকৃতি ও মেম্বারশিপ ব্যাজ
        ├── OnboardingForm.tsx    # এন্টারপ্রাইজ অ্যাপ্লিকেশন ফর্ম
        └── Footer.tsx            # গ্লোবাল ফুটার ও পলিসি লিংকস
```

---

## 💻 ইনস্টলেশন ও রান করার নিয়ম (Setup & Run)

### পূর্বশর্ত:
- [Node.js](https://nodejs.org/) (সংস্করণ ১৮ বা তার পরবর্তী)
- npm বা yarn অথবা bun

### কমান্ডসমূহ:

১. **ডিপেন্ডেন্সি ইনস্টল করুন:**
```bash
npm install
```

২. **ডেভেলপমেন্ট সার্ভার চালু করুন:**
```bash
npm run dev
```
সার্ভারটি চালু হলে ব্রাউজারে `http://localhost:3000` এ অ্যাপটি ওপেন হবে।

৩. **টাইপস্ক্রিপ্ট লিন্ট চেক:**
```bash
npm run lint
```

৪. **প্রোডাকশন বিল্ড তৈরি করুন:**
```bash
npm run build
```

---

## 🔌 API স্পেসিফিকেশন ও এন্ডপয়েন্ট

| মেথড | এন্ডপয়েন্ট | বিবরণ |
| :--- | :--- | :--- |
| `POST` | `/v1/issuing/cards` | নতুন ফিজিক্যাল বা ভার্চুয়াল কার্ড তাৎক্ষণিক ইস্যু করে |
| `POST` | `/v1/accounts/iban` | মাল্টি-কারেন্সি ডেডিকেটেড IBAN অ্যাকাউন্ট তৈরি করে |
| `POST` | `/v1/payments/transfers` | SEPA Instant বা সুইফট ওয়্যার ট্রান্সফার এক্সিকিউট করে |
| `POST` | `/v1/compliance/verify` | স্বয়ংক্রিয় KYB/KYC ও স্যাংশন স্ক্রিনিং রান করে |

---

## 🌐 ডেডিকেটেড গেটওয়ে ও DNS কনফিগারেশন (Dedicated Gateway & DNS Infrastructure)

| রেকর্ড টাইপ | হোস্ট / নাম (Host) | টার্গেট মান (Value) | বিবরণ ও স্ট্যাটাস |
| :--- | :--- | :--- | :--- |
| **A (IPv4)** | `@` (`unlimitbaas.ddns.net`) | `198.51.100.42` | সরাসরি স্ট্যাটিক IPv4 গেটওয়ে অ্যাড্রেস (Active) |
| **AAAA (IPv6)** | `@` (`unlimitbaas.ddns.net`) | `2001:db8:85a3::8a2e:370:7334` | ডুয়াল-স্ট্যাক নেক্সট-জেন IPv6 নোড অ্যাড্রেস (Active) |
| **TXT (SPF)** | `@` (`unlimitbaas.ddns.net`) | `v=spf1 include:no-ip.com -all` | নো-আইপি (No-IP) ডাইনামিক ইমেইল অথেন্টিকেশন ও স্পুফিং সুরক্ষা |
| **Google Verification** | `google-site-verification` | `google-site-verification=DK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac` | গুগল সার্চ কনসোল সাইট ভেরিফিকেশন টোকেন (Verified ✅) |
| **Node Operator** | - | `sheikh Skfarid` | রেজিস্টার্ড নোড অ্যাডমিনিস্ট্রেটর ও অপারেটর |
| **DDNS Provider** | - | `No-IP (ddns.net)` | ডাইনামিক ডিএনএস সার্ভিস প্রোভাইডার |

### 🔍 গুগল সার্চ কনসোল ভেরিফিকেশন পদ্ধতি (Google Verification Methods):
১. **HTML Meta Tag মেথড (index.html):**
```html
<meta name="google-site-verification" content="DK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac" />
```

২. **HTML ফাইল ভেরিফিকেশন মেথড:**
- ফাইল পাথ: `/googleDK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac.html`
- লাইভ রেসপন্স: `google-site-verification: googleDK2y7vkh-jVUY84NzbLEGPSuj2qOtzwDx8NuHLjRUac.html`

### 📧 এসপিএফ ইমেইল সিকিউরিটি রেকর্ড (SPF Record):
```text
v=spf1 include:no-ip.com -all
```
- **include:no-ip.com:** নো-আইপির অথোরাইজড মেইল সার্ভারসমূহকে ইমেইল প্রেরণের বৈধতা প্রদান করে।
- **-all (Hard Fail):** অননুমোদিত যেকোনো সার্ভার থেকে ডোমেইন ব্যবহার করে ভুয়া বা ফিশিং ইমেইল পাঠানো সম্পূর্ণরূপে বাতিল করে।

### cURL এক্সাম্পল (Using Dedicated Gateway):
```bash
curl -X POST "https://unlimitbaas.ddns.net/v1/issuing/cards" \
  -H "Authorization: Bearer unlimit_test_sec_8940281" \
  -H "Content-Type: application/json" \
  -H "X-Node-Operator: sheikh-Skfarid" \
  -d '{"cardType": "physical-metal", "network": "Mastercard", "brandName": "NEXUS FINTECH"}'
```

---

## 🔒 সিকিউরিটি ও কমপ্লায়েন্স
- **PCI DSS Level 1:** পেমেন্ট কার্ড ইন্ডাস্ট্রি ডাটা সিকিউরিটি স্ট্যান্ডার্ড পরিপালন।
- **HMAC-SHA256:** প্রতিটি ওয়েবহুক ইভেন্ট ক্রিপ্টোগ্রাফিক সিগনেচার দ্বারা সুরক্ষিত।
- **SLA Reliability:** ৯৯.৯৮% সার্বক্ষণিক আপটাইম স্ট্যান্ডার্ড।
- **Dedicated DDNS Node:** `unlimitbaas.ddns.net` ডুয়াল-স্ট্যাক গেটওয়ে সমর্থিত।
- **Email Anti-Spoofing:** SPF হার্ড-ফেল (`-all`) সুরক্ষা সক্রিয়।
- **SEO & Google Search Console:** ভেরিফাইড মেটা ট্যাগ ও সাইটম্যাপ ইনডেক্সিং কনফিগার করা।

---

© ২০২৬ **Unlimit**. All rights reserved. Built for fintech developers and scalable enterprises. Operator: **sheikh Skfarid**.
