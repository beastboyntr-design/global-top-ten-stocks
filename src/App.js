// ============================================================
// Global Top Ten Stocks — Full Source Code
// Built with React + Tailwind CSS
// Ready for Vercel Deployment
// ============================================================
// SETUP INSTRUCTIONS:
// 1. npx create-react-app global-top-ten-stocks
// 2. cd global-top-ten-stocks
// 3. npm install -D tailwindcss postcss autoprefixer
// 4. npx tailwindcss init -p
// 5. Replace src/App.js with this file
// 6. Add to tailwind.config.js -> content: ["./src/**/*.{js,jsx}"]
// 7. Add to src/index.css -> @tailwind base; @tailwind components; @tailwind utilities;
// 8. Add your Anthropic API key to .env -> REACT_APP_ANTHROPIC_API_KEY=your_key_here
// 9. npm run build
// 10. Deploy to Vercel: vercel --prod
// ============================================================

import { useState, useRef } from "react";

const TABS = ["🌍 Discover Stocks", "📈 How to Invest", "📊 Stock Detail"];

const SECTOR_ICONS = {
  "Technology": "💻", "Finance": "🏦", "Healthcare": "🏥",
  "Energy": "⚡", "Mining": "⛏️", "E-Commerce": "🛒",
  "Automotive": "🚗", "Semiconductor": "🔬", "Real Estate": "🏢",
  "Consumer": "🛍️", "Telecom": "📡", "Defense": "🛡️"
};

const COUNTRIES_DB = {
  "United States": {
    currency: "USD", exchange: "NYSE / NASDAQ", flag: "🇺🇸",
    stocks: [
      { ticker: "NVDA", name: "NVIDIA Corporation", sector: "Semiconductor", price: 138.85, change: +4.2, cap: "3.4T", why: "AI GPU dominance with 62% YoY revenue growth. Powers every major AI model globally.", risk: "Medium", growth: "62% YoY Revenue" },
      { ticker: "AVGO", name: "Broadcom Inc.", sector: "Semiconductor", price: 328.80, change: +2.8, cap: "1.5T", why: "74% AI semiconductor revenue growth. OpenAI & Anthropic are newest customers.", risk: "Medium", growth: "28% Revenue Growth" },
      { ticker: "CRWD", name: "CrowdStrike Holdings", sector: "Technology", price: 394.20, change: +1.5, cap: "950B", why: "Leading cybersecurity platform with massive enterprise adoption and AI-native approach.", risk: "Medium-High", growth: "25%+ in 2025" },
      { ticker: "META", name: "Meta Platforms Inc.", sector: "Technology", price: 714.60, change: +3.1, cap: "2.3T", why: "AI-driven ad platform + Reality Labs expansion. Dominates social media monetization.", risk: "Low-Medium", growth: "Strong Free Cash Flow" },
      { ticker: "GOOGL", name: "Alphabet Inc.", sector: "Technology", price: 196.88, change: +0.9, cap: "2.4T", why: "Search monopoly + Gemini AI integration + Cloud growth accelerating strongly.", risk: "Low-Medium", growth: "15% Cloud YoY" },
      { ticker: "RKLB", name: "Rocket Lab USA", sector: "Defense", price: 28.40, change: +5.6, cap: "12B", why: "Space launch services boom. 550%+ 5-year return with 50% growth forecast for 2026.", risk: "High", growth: "35%+ Fiscal 2025" },
      { ticker: "SHOP", name: "Shopify Inc.", sector: "E-Commerce", price: 120.40, change: +2.2, cap: "155B", why: "Global e-commerce infrastructure powerhouse. 20%+ revenue growth projected.", risk: "Medium", growth: "20%+ Revenue" },
      { ticker: "CELC", name: "Celcuity Inc.", sector: "Healthcare", price: 46.30, change: +8.3, cap: "4.7B", why: "Cancer treatment breakthroughs with gedatolisib. 778% return in 2025.", risk: "Very High", growth: "778% 2025 Return" },
      { ticker: "TSMC", name: "Taiwan Semiconductor (ADR)", sector: "Semiconductor", price: 213.70, change: +1.8, cap: "1.1T", why: "World's most critical chipmaker. 69% US revenue exposure. Key AI supply chain.", risk: "Medium", growth: "AI Demand Surge" },
      { ticker: "AMZN", name: "Amazon.com Inc.", sector: "E-Commerce", price: 238.90, change: +2.6, cap: "2.5T", why: "AWS cloud dominance + AI services expansion. Logistics automation driving margin growth.", risk: "Low-Medium", growth: "AWS 17% YoY" }
    ]
  },
  "India": {
    currency: "INR", exchange: "BSE / NSE", flag: "🇮🇳",
    stocks: [
      { ticker: "RELIANCE", name: "Reliance Industries", sector: "Energy", price: 2945.00, change: +1.8, cap: "₹19.9T", why: "India's largest conglomerate. Jio telecom growth + retail expansion + green energy pivot.", risk: "Low", growth: "Diversified Sectors" },
      { ticker: "TCS", name: "Tata Consultancy Services", sector: "Technology", price: 4120.00, change: +0.9, cap: "₹15T", why: "India's IT giant powering global digital transformation. Consistent dividend payer.", risk: "Low", growth: "AI-Led IT Services" },
      { ticker: "INFY", name: "Infosys Ltd.", sector: "Technology", price: 1910.00, change: +1.4, cap: "₹7.9T", why: "Top global IT services firm riding AI consulting and digital transformation wave.", risk: "Low", growth: "AI Consulting Demand" },
      { ticker: "ADANIGRN", name: "Adani Green Energy", sector: "Energy", price: 1640.00, change: +3.2, cap: "₹2.6T", why: "India's green energy transition leader. Massive renewable capacity expansion planned.", risk: "Medium-High", growth: "Renewable Pipeline" },
      { ticker: "HDFCBANK", name: "HDFC Bank Ltd.", sector: "Finance", price: 1892.00, change: +0.6, cap: "₹14.4T", why: "India's largest private bank. Fintech integration + growing middle class drives expansion.", risk: "Low", growth: "Loan Book Growth" },
      { ticker: "TATAMOTORS", name: "Tata Motors Ltd.", sector: "Automotive", price: 978.00, change: +2.7, cap: "₹3.6T", why: "Jaguar Land Rover + electric vehicle push in India. EV sales doubling annually.", risk: "Medium", growth: "EV Transformation" },
      { ticker: "WIPRO", name: "Wipro Ltd.", sector: "Technology", price: 318.00, change: +1.1, cap: "₹1.67T", why: "IT services + AI product portfolio expansion targeting global enterprise clients.", risk: "Low-Medium", growth: "AI Product Revenue" },
      { ticker: "ZOMATO", name: "Zomato Ltd.", sector: "E-Commerce", price: 267.00, change: +4.5, cap: "₹2.37T", why: "India's food delivery + quick commerce leader. Blinkit hypergrowth reshaping retail.", risk: "Medium-High", growth: "Quick Commerce Boom" },
      { ticker: "SUNPHARMA", name: "Sun Pharmaceutical", sector: "Healthcare", price: 1814.00, change: +1.0, cap: "₹4.35T", why: "India's top pharma exporter. Strong US generic drug pipeline and specialty segment.", risk: "Low-Medium", growth: "Specialty Pharma" },
      { ticker: "BAJFINANCE", name: "Bajaj Finance Ltd.", sector: "Finance", price: 8812.00, change: +2.1, cap: "₹5.3T", why: "India's leading NBFC. Fintech-backed consumer lending exploding with middle-class growth.", risk: "Medium", growth: "Consumer Credit Boom" }
    ]
  },
  "United Kingdom": {
    currency: "GBP", exchange: "London Stock Exchange", flag: "🇬🇧",
    stocks: [
      { ticker: "AZN", name: "AstraZeneca PLC", sector: "Healthcare", price: 121.48, change: +0.8, cap: "£190B", why: "Global oncology and rare disease pipeline. Top cancer drug pipeline in the world.", risk: "Low-Medium", growth: "Oncology Pipeline" },
      { ticker: "SHEL", name: "Shell PLC", sector: "Energy", price: 26.20, change: +1.2, cap: "£172B", why: "Transitioning from fossil fuels to LNG and renewable energy with strong cash flow.", risk: "Low-Medium", growth: "LNG + Renewables" },
      { ticker: "HSBA", name: "HSBC Holdings PLC", sector: "Finance", price: 8.94, change: +0.4, cap: "£160B", why: "Largest UK bank with heavy Asia exposure. China reopening + wealth management growth.", risk: "Low-Medium", growth: "Asia Wealth Management" },
      { ticker: "LSEG", name: "London Stock Exchange Group", sector: "Finance", price: 108.20, change: +2.1, cap: "£42B", why: "Financial data powerhouse. Data analytics and AI integration driving recurring revenue.", risk: "Low", growth: "Data & Analytics" },
      { ticker: "BARC", name: "Barclays PLC", sector: "Finance", price: 2.81, change: +1.9, cap: "£47B", why: "Investment banking recovery + digital banking transformation underway.", risk: "Medium", growth: "IB Revenues Up" },
      { ticker: "DGE", name: "Diageo PLC", sector: "Consumer", price: 21.85, change: -0.4, cap: "£52B", why: "Premium spirits global giant with strong India and Southeast Asia emerging market play.", risk: "Low", growth: "Premiumization Trend" },
      { ticker: "RR", name: "Rolls-Royce Holdings", sector: "Defense", price: 6.52, change: +3.8, cap: "£62B", why: "Defense and aerospace renaissance. Nuclear power + aircraft engine turnaround delivering.", risk: "Medium", growth: "Defense Spending Up" },
      { ticker: "BP", name: "BP PLC", sector: "Energy", price: 4.28, change: +0.7, cap: "£65B", why: "Energy transition and offshore wind investments alongside core oil production.", risk: "Low-Medium", growth: "Energy Transition" },
      { ticker: "HLMA", name: "Halma PLC", sector: "Technology", price: 23.10, change: +1.5, cap: "£9.4B", why: "Safety, environment and healthcare technology micro-cap acquisitions model.", risk: "Low-Medium", growth: "Acquisitive Growth" },
      { ticker: "IMB", name: "Imperial Brands PLC", sector: "Consumer", price: 24.10, change: +0.3, cap: "£20B", why: "High dividend yield + next-gen products (vapes) offsetting traditional tobacco decline.", risk: "Low", growth: "Next-Gen Products" }
    ]
  },
  "China": {
    currency: "CNY", exchange: "Shanghai / Shenzhen / HK", flag: "🇨🇳",
    stocks: [
      { ticker: "BABA", name: "Alibaba Group", sector: "E-Commerce", price: 128.30, change: +2.4, cap: "HK$2.3T", why: "AI cloud + e-commerce recovery. Valuation still deeply discounted vs US peers.", risk: "Medium-High", growth: "Cloud AI Revenue" },
      { ticker: "TCEHY", name: "Tencent Holdings", sector: "Technology", price: 53.20, change: +1.7, cap: "HK$5.1T", why: "WeChat ecosystem + gaming + AI investments. 25% gain in 2025, still room to grow.", risk: "Medium", growth: "AI + Gaming" },
      { ticker: "XIACY", name: "Xiaomi Corporation", sector: "Technology", price: 4.10, change: +3.2, cap: "HK$1T", why: "EV launch + premium smartphone growth. EV deliveries ramping up rapidly.", risk: "Medium-High", growth: "EV Launch" },
      { ticker: "BYDDF", name: "BYD Company Ltd.", sector: "Automotive", price: 38.70, change: +2.9, cap: "HK$1.1T", why: "World's largest EV maker. Outselling Tesla globally in 2025. Battery tech lead.", risk: "Medium", growth: "EV Global Leader" },
      { ticker: "PDD", name: "PDD Holdings (Temu)", sector: "E-Commerce", price: 104.50, change: +1.5, cap: "$142B", why: "Temu global expansion creating massive cross-border e-commerce disruption.", risk: "High", growth: "Temu Global Rollout" },
      { ticker: "NIO", name: "NIO Inc.", sector: "Automotive", price: 4.98, change: +4.1, cap: "$10B", why: "Battery-as-a-Service model + premium EV segment in China. Turnaround underway.", risk: "Very High", growth: "BaaS Model" },
      { ticker: "BIDU", name: "Baidu Inc.", sector: "Technology", price: 82.70, change: +2.0, cap: "$29B", why: "China's AI search leader + autonomous driving (Apollo). ERNIE bot gaining traction.", risk: "Medium-High", growth: "AI Search + Robotaxi" },
      { ticker: "CNOOC", name: "CNOOC Ltd.", sector: "Energy", price: 14.30, change: +0.8, cap: "HK$651B", why: "China's oil offshore giant. High dividend + benefitting from energy security push.", risk: "Low-Medium", growth: "Energy Security" },
      { ticker: "MEITUAN", name: "Meituan Holdings", sector: "E-Commerce", price: 21.20, change: +2.3, cap: "HK$1.3T", why: "Food delivery + local services monopoly. Drone delivery and AI integration.", risk: "Medium", growth: "Drone Delivery" },
      { ticker: "SMIC", name: "SMIC (Semiconductor Mfg)", sector: "Semiconductor", price: 5.50, change: +3.5, cap: "HK$374B", why: "China's domestic chip independence push. Government backing + foundry capacity.", risk: "High", growth: "Chip Independence" }
    ]
  },
  "Brazil": {
    currency: "BRL", exchange: "B3 (Brasil Bolsa Balcão)", flag: "🇧🇷",
    stocks: [
      { ticker: "VALE3", name: "Vale S.A.", sector: "Mining", price: 68.90, change: +2.1, cap: "R$300B", why: "World's largest iron ore producer. EV battery metals nickel + copper demand surging.", risk: "Medium", growth: "EV Metals Demand" },
      { ticker: "PETR4", name: "Petrobras SA", sector: "Energy", price: 38.40, change: +1.6, cap: "R$505B", why: "Pre-salt deepwater oil bonanza + highest dividend yield in EM. Political risk easing.", risk: "Medium", growth: "Pre-Salt Production" },
      { ticker: "ITUB4", name: "Itaú Unibanco", sector: "Finance", price: 37.20, change: +0.9, cap: "R$350B", why: "Brazil's largest bank riding digital fintech wave + favorable rates environment.", risk: "Low-Medium", growth: "Digital Banking" },
      { ticker: "MGLU3", name: "Magazine Luiza", sector: "E-Commerce", price: 8.90, change: +4.2, cap: "R$31B", why: "Brazil's e-commerce giant with fintech arm 'Magalu'. Recovery after deep correction.", risk: "High", growth: "E-Commerce Recovery" },
      { ticker: "WEGE3", name: "WEG S.A.", sector: "Technology", price: 52.30, change: +1.4, cap: "R$297B", why: "Industrial motors + renewable energy equipment. Global expansion with high ROE.", risk: "Low-Medium", growth: "Renewables + Industry" },
      { ticker: "SUZB3", name: "Suzano S.A.", sector: "Energy", price: 54.60, change: +0.7, cap: "R$141B", why: "World's largest eucalyptus pulp producer. Green packaging demand exploding globally.", risk: "Low-Medium", growth: "Green Packaging" },
      { ticker: "RENT3", name: "Localiza Rent a Car", sector: "Consumer", price: 38.70, change: +2.8, cap: "R$37B", why: "Car rental monopoly in Brazil. EV fleet transition + subscription model growth.", risk: "Medium", growth: "Fleet Subscription" },
      { ticker: "RDOR3", name: "Rede D'Or São Luiz", sector: "Healthcare", price: 28.50, change: +1.9, cap: "R$53B", why: "Brazil's largest hospital network. Aging population + private health insurance expansion.", risk: "Low-Medium", growth: "Healthcare Expansion" },
      { ticker: "MELI", name: "MercadoLibre Inc.", sector: "E-Commerce", price: 2180.00, change: +3.4, cap: "$110B", why: "Latin America's Amazon + PayPal. Fintech and logistics driving 40%+ revenue growth.", risk: "Medium", growth: "LatAm Fintech" },
      { ticker: "B3SA3", name: "B3 S.A. Exchange", sector: "Finance", price: 12.80, change: +1.2, cap: "R$70B", why: "Brazil's only stock exchange. Benefits from market growth and derivatives volumes.", risk: "Low-Medium", growth: "Market Infrastructure" }
    ]
  },
  "Germany": {
    currency: "EUR", exchange: "Frankfurt Stock Exchange", flag: "🇩🇪",
    stocks: [
      { ticker: "SAP", name: "SAP SE", sector: "Technology", price: 261.30, change: +1.4, cap: "€315B", why: "Enterprise software AI transformation with RISE with SAP cloud migration boom.", risk: "Low", growth: "Cloud Migration" },
      { ticker: "ASML", name: "ASML Holding N.V.", sector: "Semiconductor", price: 713.50, change: +2.0, cap: "€280B", why: "Monopoly on EUV lithography machines. Every advanced chip on earth needs ASML.", risk: "Medium", growth: "EUV Monopoly" },
      { ticker: "DTE", name: "Deutsche Telekom", sector: "Telecom", price: 28.70, change: +0.6, cap: "€143B", why: "T-Mobile US growth engine making DT undervalued relative to US counterpart.", risk: "Low", growth: "T-Mobile US Profits" },
      { ticker: "SIE", name: "Siemens AG", sector: "Technology", price: 198.40, change: +1.1, cap: "€151B", why: "Industrial automation + digital twin technology for Industry 4.0 transformation.", risk: "Low-Medium", growth: "Industry 4.0" },
      { ticker: "ALV", name: "Allianz SE", sector: "Finance", price: 319.60, change: +0.4, cap: "€135B", why: "Europe's largest insurer with climate risk pricing advantages and asset management growth.", risk: "Low", growth: "Climate Insurance" },
      { ticker: "BAYN", name: "Bayer AG", sector: "Healthcare", price: 19.80, change: +1.8, cap: "€19B", why: "Deeply discounted post-Roundup litigation. Pipeline recovery and pharma pipeline strong.", risk: "High", growth: "Litigation Recovery" },
      { ticker: "VOW3", name: "Volkswagen AG", sector: "Automotive", price: 86.40, change: +0.9, cap: "€44B", why: "EV restructuring + cost-cutting. Porsche premium brand shielding from EV losses.", risk: "High", growth: "EV Restructuring" },
      { ticker: "MUV2", name: "Munich Re", sector: "Finance", price: 500.80, change: +0.7, cap: "€34B", why: "World's largest reinsurer. Climate-driven insurance pricing power creates structural tailwind.", risk: "Low", growth: "Climate Reinsurance" },
      { ticker: "DHER", name: "Delivery Hero SE", sector: "E-Commerce", price: 22.40, change: +3.1, cap: "€4.7B", why: "Emerging market food delivery growth particularly in MENA and Asia recovering.", risk: "Very High", growth: "EM Food Delivery" },
      { ticker: "AIXA", name: "AIXTRON SE", sector: "Semiconductor", price: 18.20, change: +2.5, cap: "€2.2B", why: "Compound semiconductor equipment maker benefiting from power electronics and AI chip demand.", risk: "Medium-High", growth: "Power Electronics" }
    ]
  },
  "Japan": {
    currency: "JPY", exchange: "Tokyo Stock Exchange", flag: "🇯🇵",
    stocks: [
      { ticker: "7203", name: "Toyota Motor Corp.", sector: "Automotive", price: 3210.00, change: +0.8, cap: "¥52T", why: "Hybrid technology dominance + solid-state battery lead. Profit hitting all-time highs.", risk: "Low", growth: "Solid-State Battery" },
      { ticker: "6758", name: "Sony Group Corp.", sector: "Technology", price: 2876.00, change: +1.5, cap: "¥18.5T", why: "Gaming (PlayStation), imaging sensors + entertainment IP monetization with AI tools.", risk: "Low-Medium", growth: "Gaming + IP" },
      { ticker: "6861", name: "Keyence Corporation", sector: "Technology", price: 57400.00, change: +2.1, cap: "¥13.6T", why: "Automation sensors and machine vision for global factories. 50%+ operating margins.", risk: "Low-Medium", growth: "Factory Automation" },
      { ticker: "9984", name: "SoftBank Group", sector: "Technology", price: 9874.00, change: +3.4, cap: "¥18.7T", why: "ARM Holdings gains + Vision Fund AI bets. Major bet on AI infrastructure globally.", risk: "High", growth: "ARM + AI Bets" },
      { ticker: "7974", name: "Nintendo Co. Ltd.", sector: "Consumer", price: 8940.00, change: +0.6, cap: "¥11.6T", why: "Switch 2 launch cycle + IP monetization (Mario, Zelda films). Cash-rich balance sheet.", risk: "Low", growth: "Switch 2 Cycle" },
      { ticker: "4063", name: "Shin-Etsu Chemical", sector: "Semiconductor", price: 3590.00, change: +1.9, cap: "¥11.4T", why: "World's largest silicon wafer maker. Every semiconductor depends on their wafers.", risk: "Low-Medium", growth: "Wafer Supply" },
      { ticker: "8306", name: "Mitsubishi UFJ Financial", sector: "Finance", price: 1478.00, change: +1.2, cap: "¥21.8T", why: "Japan's largest bank benefiting from BOJ rate normalization ending decade of zero rates.", risk: "Low-Medium", growth: "Rate Normalization" },
      { ticker: "2914", name: "Japan Tobacco Int.", sector: "Consumer", price: 3871.00, change: +0.3, cap: "¥8.9T", why: "High dividend + heated tobacco (Ploom X) growth globally in markets avoiding cigarettes.", risk: "Low", growth: "Heated Tobacco" },
      { ticker: "6902", name: "DENSO Corporation", sector: "Automotive", price: 3204.00, change: +1.6, cap: "¥10.1T", why: "Auto components leader in electrification parts. Huge EV transition beneficiary.", risk: "Low-Medium", growth: "EV Components" },
      { ticker: "3382", name: "Seven & i Holdings", sector: "Consumer", price: 2418.00, change: +0.4, cap: "¥5.5T", why: "7-Eleven global convenience empire + fintech push via 7Bank. M&A activity.", risk: "Low", growth: "Global Convenience" }
    ]
  },
  "South Korea": {
    currency: "KRW", exchange: "Korea Stock Exchange (KRX)", flag: "🇰🇷",
    stocks: [
      { ticker: "005930", name: "Samsung Electronics", sector: "Semiconductor", price: 62500.00, change: +2.4, cap: "₩373T", why: "HBM memory chip monopoly for AI. Memory prices surging + Galaxy AI smartphones.", risk: "Low-Medium", growth: "HBM AI Memory" },
      { ticker: "000660", name: "SK Hynix Inc.", sector: "Semiconductor", price: 197000.00, change: +3.8, cap: "₩143T", why: "43% KOSPI gain 2025 driven by HBM3E chip supply to NVIDIA. AI memory leader.", risk: "Medium", growth: "HBM3E Supply" },
      { ticker: "051910", name: "LG Chem Ltd.", sector: "Energy", price: 312000.00, change: +1.5, cap: "₩22T", why: "EV battery materials + pharma spin-off. Cathode material leader for global battery supply.", risk: "Medium", growth: "EV Battery Materials" },
      { ticker: "035720", name: "Kakao Corp.", sector: "Technology", price: 38500.00, change: +2.1, cap: "₩17T", why: "South Korea's super-app. KakaoTalk AI integration + fintech + entertainment.", risk: "Medium-High", growth: "Super-App AI" },
      { ticker: "068270", name: "Celltrion Inc.", sector: "Healthcare", price: 178000.00, change: +1.8, cap: "₩22T", why: "Biosimilars global leader. Huge pipeline of drugs going off-patent in US and Europe.", risk: "Medium", growth: "Biosimilars Pipeline" },
      { ticker: "028260", name: "Samsung C&T Corp.", sector: "Real Estate", price: 142000.00, change: +0.6, cap: "₩27T", why: "Samsung holding co + real estate + trading. Proxy to entire Samsung ecosystem at discount.", risk: "Low-Medium", growth: "Conglomerate Discount" },
      { ticker: "207940", name: "Samsung Biologics", sector: "Healthcare", price: 920000.00, change: +2.3, cap: "₩65T", why: "World-class contract drug manufacturing. Biotech outsourcing megatrend beneficiary.", risk: "Low-Medium", growth: "CDMO Outsourcing" },
      { ticker: "012330", name: "Hyundai Mobis", sector: "Automotive", price: 249000.00, change: +1.4, cap: "₩24T", why: "Hyundai + Kia EV components maker. Autonomous driving parts and future mobility.", risk: "Medium", growth: "EV Components" },
      { ticker: "086790", name: "Hana Financial Group", sector: "Finance", price: 68600.00, change: +0.9, cap: "₩20T", why: "Top Korean bank with digital expansion. BOK monetary easing cycle benefits financials.", risk: "Low-Medium", growth: "Digital Banking" },
      { ticker: "096770", name: "SK Innovation", sector: "Energy", price: 115000.00, change: +2.7, cap: "₩11T", why: "EV battery (SK On) + petroleum refining. Battery spinoff unlocking hidden value.", risk: "High", growth: "EV Battery Spinoff" }
    ]
  }
};

const RISK_COLORS = {
  "Low": "bg-green-100 text-green-800",
  "Low-Medium": "bg-teal-100 text-teal-800",
  "Medium": "bg-yellow-100 text-yellow-800",
  "Medium-High": "bg-orange-100 text-orange-800",
  "High": "bg-red-100 text-red-800",
  "Very High": "bg-purple-100 text-purple-800"
};

const HOW_TO_INVEST_STEPS = [
  {
    step: 1, icon: "🎯", title: "Define Your Investment Goals",
    color: "from-blue-500 to-indigo-600",
    description: "Before buying a single stock, clarify WHY you're investing. Are you building retirement wealth (long-term, 10-30 years), saving for a specific goal (medium-term, 3-10 years), or generating income (dividends)?",
    details: [
      { label: "Time Horizon", desc: "Longer horizons allow for higher-risk/higher-reward growth stocks. Short timelines demand safer, stable picks." },
      { label: "Risk Tolerance", desc: "Rate yourself: Conservative (bonds + blue chips), Moderate (mix of growth & value), Aggressive (growth stocks + emerging markets)." },
      { label: "Capital to Invest", desc: "Never invest money you'll need within 12 months. Start with a sum you're comfortable potentially losing in the short term." },
      { label: "Target Return", desc: "S&P 500 averages ~10% annually. If you want more, you must accept more risk. Set realistic expectations." }
    ]
  },
  {
    step: 2, icon: "🏦", title: "Open a Brokerage Account",
    color: "from-purple-500 to-pink-600",
    description: "You need a brokerage account to buy stocks. Think of it like a bank account specifically for investments. Different countries have different platforms.",
    details: [
      { label: "USA Options", desc: "Fidelity, Charles Schwab (full-service), Robinhood, Webull (mobile-first), TD Ameritrade. All offer $0 commission trades." },
      { label: "India Options", desc: "Zerodha (largest discount broker), Groww (beginner-friendly), Angel One, Upstox, ICICI Direct (full-service)." },
      { label: "UK / Europe", desc: "Freetrade, eToro, Trading 212 (commission-free), Hargreaves Lansdown (full-service), Interactive Brokers (global)." },
      { label: "KYC Verification", desc: "You'll need: Government ID, proof of address, PAN/SSN/NIN (tax ID), bank account details. Takes 1-3 business days." }
    ]
  },
  {
    step: 3, icon: "🔍", title: "Research Your Chosen Stock",
    color: "from-green-500 to-emerald-600",
    description: "Never buy a stock you don't understand. This is Warren Buffett's #1 rule. Deep research transforms speculation into informed investing.",
    details: [
      { label: "Read the Annual Report", desc: "The company's annual report (10-K in USA, Annual Reports elsewhere) reveals revenue trends, debt levels, and management strategy." },
      { label: "Check Key Metrics", desc: "P/E Ratio (valuation), Revenue Growth %, EPS Growth, Free Cash Flow, Debt-to-Equity Ratio. Compare to sector peers." },
      { label: "Understand the Business", desc: "Can you explain in one paragraph what the company does and how it makes money? If not — don't invest yet." },
      { label: "Read Analyst Reports", desc: "Check Seeking Alpha, Morningstar, Bloomberg, or your broker's research tools for buy/sell/hold ratings and price targets." }
    ]
  },
  {
    step: 4, icon: "💰", title: "Fund Your Account",
    color: "from-yellow-500 to-orange-600",
    description: "Transfer money from your bank account to your brokerage. This process varies by country and platform but typically takes 1-5 business days.",
    details: [
      { label: "Bank Transfer (ACH/NEFT/SEPA)", desc: "Most common method. Free but slow (1-3 days). Perfect for large deposits. Use recurring transfers to automate investing." },
      { label: "UPI / Instant Transfer", desc: "In India, use UPI (Zerodha, Groww support this). Instant transfer directly to your trading account." },
      { label: "Start Small", desc: "Many platforms offer fractional shares. You can invest in Amazon or Google for as little as $1-$5 even if full shares cost hundreds." },
      { label: "Paper Trading First", desc: "Most brokers offer virtual/paper trading with fake money. Practice for 1-3 months before risking real capital." }
    ]
  },
  {
    step: 5, icon: "📋", title: "Place Your Stock Order",
    color: "from-cyan-500 to-blue-600",
    description: "Now the exciting part — placing an actual order. You have several order types available, each serving different strategies.",
    details: [
      { label: "Market Order", desc: "Buys immediately at the current best available price. Fast, but you might pay slightly more than expected in volatile markets." },
      { label: "Limit Order", desc: "YOU set the maximum price you'll pay. Order only executes if market reaches your price. Great for volatile stocks." },
      { label: "Stop-Loss Order", desc: "Auto-sells if stock drops to your set price, protecting you from catastrophic losses. E.g., buy at $100, set stop-loss at $85." },
      { label: "Dollar-Cost Averaging", desc: "Instead of buying all at once, invest a fixed amount weekly/monthly. Reduces timing risk dramatically." }
    ]
  },
  {
    step: 6, icon: "⚖️", title: "Diversify Your Portfolio",
    color: "from-rose-500 to-red-600",
    description: "Never put all your eggs in one basket. Diversification is the only 'free lunch' in investing — it reduces risk without necessarily reducing returns.",
    details: [
      { label: "Across Sectors", desc: "Own technology, healthcare, energy, finance, consumer stocks. When one sector falls, others may hold or rise." },
      { label: "Across Geographies", desc: "US, Europe, Asia, Emerging Markets. Different economies grow at different rates and are affected by different risks." },
      { label: "Company Size", desc: "Mix large-cap stability (Apple, TCS) with mid-cap growth potential and occasional small-cap high-risk bets." },
      { label: "Asset Classes", desc: "Stocks + bonds + gold + real estate (REITs). In a crash, bonds and gold often rise when stocks fall." }
    ]
  },
  {
    step: 7, icon: "📈", title: "Monitor & Rebalance",
    color: "from-violet-500 to-purple-700",
    description: "Investing is not 'set and forget' — but it also doesn't mean checking prices every hour. Smart monitoring is the key.",
    details: [
      { label: "Quarterly Review", desc: "Check if company fundamentals have changed. Did they miss earnings? Is growth accelerating? Adjust if thesis has broken." },
      { label: "Annual Rebalancing", desc: "If one stock grows to 30% of your portfolio, sell some to rebalance. Prevents over-concentration risk." },
      { label: "Don't Panic Sell", desc: "Stock markets drop 10-20% regularly. Long-term investors who hold through corrections historically always recover and profit." },
      { label: "Tax Awareness", desc: "Short-term gains (<1 year) are taxed at higher rates. Long-term holding rewards you with lower capital gains tax rates." }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [country, setCountry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState({});
  const inputRef = useRef(null);

  const availableCountries = Object.keys(COUNTRIES_DB);
  const matchedCountry = availableCountries.find(c => c.toLowerCase() === country.toLowerCase());
  const data = matchedCountry ? COUNTRIES_DB[matchedCountry] : null;

  const handleSubmit = () => {
    if (!country.trim()) return;
    setLoading(true);
    setTimeout(() => { setSubmitted(true); setLoading(false); }, 1200);
  };

  const handleStockClick = async (stock) => {
    setSelectedStock(stock);
    setActiveTab(2);
    setAiAnalysis("");
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ⚠️ IMPORTANT: For production Vercel deployment, move this to
          // an API route at /api/analyze.js to keep your key secure.
          // Never expose API keys in frontend code in production!
          "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a professional stock market analyst. Provide a detailed but concise investment analysis for ${stock.name} (${stock.ticker}) listed on the ${data?.exchange || 'stock exchange'} in ${matchedCountry}. 

The stock is in the ${stock.sector} sector, currently priced at ${stock.price} ${data?.currency || 'USD'}, with a market cap of ${stock.cap}, and a ${stock.change > 0 ? '+' : ''}${stock.change}% daily change. The growth story: ${stock.why}. Risk level: ${stock.risk}.

Please write:
1. **Investment Thesis** (2-3 sentences on WHY this stock is booming)
2. **Key Catalysts** (3 bullet points on what's driving growth)
3. **Risks to Watch** (2-3 specific risks for this company/sector)
4. **Who Should Invest** (describe the ideal investor profile for this stock)
5. **Verdict** (1 strong concluding sentence)

Keep it professional, data-driven, and actionable. Use bold headers. Be specific to this company.`
          }]
        })
      });
      const json = await res.json();
      setAiAnalysis(json.content?.[0]?.text || "Analysis unavailable.");
    } catch (e) {
      setAiAnalysis("⚠️ AI analysis temporarily unavailable. Please review the key metrics above.");
    }
    setAiLoading(false);
  };

  const toggleStep = (i) => setExpandedSteps(p => ({ ...p, [i]: !p[i] }));

  const formatAnalysis = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} className="font-bold text-indigo-700 mt-3 mb-1 text-base">{line.replace(/\*\*/g, '')}</div>;
      }
      const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (line.startsWith('•') || line.startsWith('-')) {
        return <div key={i} className="flex gap-2 items-start my-1 ml-2"><span className="text-indigo-400 mt-0.5">▸</span><span dangerouslySetInnerHTML={{ __html: boldText.replace(/^[•\-]\s*/, '') }} /></div>;
      }
      return line.trim() ? <p key={i} className="my-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldText }} /> : <div key={i} className="h-1" />;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white font-sans">
      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-8 px-4 text-center shadow-2xl">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize:'60px 60px'}} />
        <div className="relative">
          <div className="text-5xl mb-2">📊</div>
          <h1 className="text-3xl font-extrabold tracking-tight">Global Top Ten Stocks</h1>
          <p className="text-indigo-100 mt-1 text-sm">Educational Reference Only · 8 Countries · Full How-To Guide · Not Financial Advice</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex bg-slate-800 border-b border-slate-700">
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            className={`flex-1 py-3 px-2 text-sm font-semibold transition-all ${activeTab === i ? 'bg-indigo-600 text-white border-b-2 border-indigo-300' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* TAB 1: DISCOVER STOCKS */}
      {activeTab === 0 && (
        <div className="p-4 max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-2xl p-6 mb-6 shadow-xl border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-1">🌍 Enter Your Country</h2>
            <p className="text-slate-400 text-sm mb-4">Get the top 10 booming stocks curated for your market</p>
            <div className="flex gap-3 flex-wrap">
              <input ref={inputRef} type="text" value={country} onChange={e => { setCountry(e.target.value); setSubmitted(false); }}
                placeholder="e.g. United States, India, Japan..."
                className="flex-1 min-w-48 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm" />
              <button onClick={handleSubmit} disabled={loading || !country.trim()}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 px-6 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-50 text-sm shadow-lg">
                {loading ? '⏳ Loading...' : '🔍 Show Stocks'}
              </button>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-xs mb-2">Quick select:</p>
              <div className="flex flex-wrap gap-2">
                {availableCountries.map(c => (
                  <button key={c} onClick={() => { setCountry(c); setSubmitted(false); }}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${country === c ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-slate-600 text-slate-300 hover:border-indigo-500 hover:text-white'}`}>
                    {COUNTRIES_DB[c].flag} {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {submitted && (
            <div>
              {data ? (
                <div>
                  <div className="flex items-center gap-3 mb-4 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-4 border border-indigo-700">
                    <span className="text-4xl">{data.flag}</span>
                    <div>
                      <h3 className="text-xl font-extrabold">{matchedCountry} — Top 10 Booming Stocks</h3>
                      <p className="text-indigo-300 text-sm">Exchange: {data.exchange} · Currency: {data.currency} · Click any stock for AI deep-dive</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {data.stocks.map((s, i) => (
                      <div key={i} onClick={() => handleStockClick(s)}
                        className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500 rounded-xl p-4 cursor-pointer transition-all group shadow-md">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="bg-indigo-700 text-white text-lg font-black rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-bold text-white text-base">{s.name}</span>
                                <span className="text-indigo-300 text-xs font-mono bg-indigo-900 px-2 py-0.5 rounded">{s.ticker}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${RISK_COLORS[s.risk] || 'bg-gray-200 text-gray-800'}`}>{s.risk} Risk</span>
                              </div>
                              <div className="flex flex-wrap gap-2 text-xs text-slate-400 mb-2">
                                <span>{SECTOR_ICONS[s.sector] || '📌'} {s.sector}</span>
                                <span>·</span>
                                <span>Cap: {s.cap}</span>
                                <span>·</span>
                                <span className="text-green-400 font-semibold">{s.growth}</span>
                              </div>
                              <p className="text-slate-300 text-xs leading-relaxed">{s.why}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-white font-bold text-base">{s.price.toLocaleString()}</div>
                            <div className={`text-sm font-semibold ${s.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {s.change >= 0 ? '▲' : '▼'} {Math.abs(s.change)}%
                            </div>
                            <div className="text-indigo-400 text-xs mt-1 group-hover:text-white transition-colors">AI Analysis →</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-amber-900/40 border border-amber-700 rounded-xl text-amber-200 text-xs">
                    ⚠️ <strong>Disclaimer:</strong> This is educational information only. Prices shown are indicative reference data. Always consult a licensed financial advisor before making investment decisions. Past performance does not guarantee future results.
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-800 rounded-2xl border border-slate-700">
                  <div className="text-5xl mb-3">🌐</div>
                  <h3 className="text-xl font-bold text-white mb-2">Country Not Found</h3>
                  <p className="text-slate-400 text-sm mb-4">We currently support these countries:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {availableCountries.map(c => (
                      <button key={c} onClick={() => { setCountry(c); setSubmitted(false); }}
                        className="text-sm px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white transition-all">
                        {COUNTRIES_DB[c].flag} {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!submitted && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[["8", "Countries Covered"], ["80", "Curated Stocks"], ["AI", "Deep Analysis"], ["Free", "No Sign-Up"]].map(([num, label]) => (
                <div key={label} className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
                  <div className="text-2xl font-extrabold text-indigo-400">{num}</div>
                  <div className="text-slate-400 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HOW TO INVEST */}
      {activeTab === 1 && (
        <div className="p-4 max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-white">📈 Complete Stock Investing Guide</h2>
            <p className="text-slate-400 text-sm mt-1">From zero to your first stock purchase — step by step</p>
          </div>
          <div className="space-y-4">
            {HOW_TO_INVEST_STEPS.map((s, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
                <button onClick={() => toggleStep(i)} className="w-full text-left p-4 flex items-center gap-4 hover:bg-slate-700 transition-all">
                  <div className={`bg-gradient-to-br ${s.color} rounded-xl w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Step {s.step}</div>
                    <div className="text-white font-bold text-base">{s.title}</div>
                  </div>
                  <div className={`text-slate-400 text-xl transition-transform ${expandedSteps[i] ? 'rotate-90' : ''}`}>›</div>
                </button>
                {expandedSteps[i] && (
                  <div className="px-4 pb-5 border-t border-slate-700">
                    <p className="text-slate-300 text-sm mt-4 mb-4 leading-relaxed">{s.description}</p>
                    <div className="space-y-3">
                      {s.details.map((d, j) => (
                        <div key={j} className="bg-slate-900 rounded-xl p-3 border border-slate-700">
                          <div className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">{d.label}</div>
                          <div className="text-slate-300 text-sm leading-relaxed">{d.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-5 border border-indigo-700 text-center">
            <div className="text-3xl mb-2">💡</div>
            <h3 className="font-bold text-white text-lg mb-2">Golden Rule of Investing</h3>
            <p className="text-indigo-200 text-sm leading-relaxed">"The stock market is a device for transferring money from the impatient to the patient." — Warren Buffett. Time in the market almost always beats timing the market.</p>
          </div>
        </div>
      )}

      {/* TAB 3: STOCK DETAIL */}
      {activeTab === 2 && (
        <div className="p-4 max-w-3xl mx-auto">
          {selectedStock ? (
            <div>
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-5 mb-4 border border-indigo-700 shadow-xl">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <div className="text-xs text-indigo-300 uppercase tracking-wider font-semibold mb-1">{SECTOR_ICONS[selectedStock.sector]} {selectedStock.sector}</div>
                    <h2 className="text-2xl font-extrabold text-white">{selectedStock.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono bg-indigo-700 px-2 py-0.5 rounded text-indigo-100 text-sm">{selectedStock.ticker}</span>
                      <span className="text-slate-300 text-sm">{matchedCountry} {data?.flag}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${RISK_COLORS[selectedStock.risk]}`}>{selectedStock.risk} Risk</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-white">{selectedStock.price?.toLocaleString()}</div>
                    <div className="text-sm text-slate-300">{data?.currency}</div>
                    <div className={`text-lg font-bold ${selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedStock.change >= 0 ? '▲' : '▼'} {Math.abs(selectedStock.change)}% today
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[["Market Cap", selectedStock.cap], ["Growth", selectedStock.growth], ["Exchange", data?.exchange], ["Currency", data?.currency]].map(([k, v]) => (
                    <div key={k} className="bg-white/10 rounded-xl p-3">
                      <div className="text-indigo-300 text-xs uppercase tracking-wider font-semibold">{k}</div>
                      <div className="text-white font-bold text-sm mt-0.5 truncate">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-white/10 rounded-xl p-3">
                  <div className="text-indigo-300 text-xs uppercase tracking-wider font-semibold mb-1">Investment Thesis</div>
                  <p className="text-white text-sm leading-relaxed">{selectedStock.why}</p>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <h3 className="text-white font-bold text-lg">AI Deep Analysis</h3>
                    <p className="text-slate-400 text-xs">Powered by Claude AI · Professional-grade research</p>
                  </div>
                </div>
                {aiLoading ? (
                  <div className="space-y-3">
                    {[1,2,3,4,5].map(n => (
                      <div key={n} className="h-4 bg-slate-700 rounded animate-pulse" style={{width: `${60+n*8}%`}} />
                    ))}
                    <p className="text-indigo-400 text-sm text-center mt-4 animate-pulse">🔮 Claude is analyzing {selectedStock.ticker}...</p>
                  </div>
                ) : (
                  <div className="text-slate-200 text-sm leading-relaxed">{formatAnalysis(aiAnalysis)}</div>
                )}
              </div>

              {/* How to buy */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 mt-4 shadow-lg">
                <h3 className="text-white font-bold text-lg mb-3">🛒 How to Buy {selectedStock.ticker}</h3>
                <div className="space-y-3">
                  {[
                    [`Open a ${matchedCountry} brokerage`, `In ${matchedCountry}, use platforms like ${matchedCountry === 'India' ? 'Zerodha, Groww, or Angel One' : matchedCountry === 'United States' ? 'Fidelity, Schwab, or Robinhood' : matchedCountry === 'United Kingdom' ? 'Freetrade, Hargreaves Lansdown, or eToro' : matchedCountry === 'Japan' ? 'SBI Securities, Rakuten Securities, or Monex' : matchedCountry === 'South Korea' ? 'Kiwoom Securities, Samsung Securities, or Miraeasset' : 'Interactive Brokers or a local regulated broker'}. Complete KYC verification.`],
                    ['Search for the stock', `In your brokerage app, search for the ticker symbol "${selectedStock.ticker}" or the full company name "${selectedStock.name}".`],
                    ['Analyze before buying', `Review the P/E ratio, recent earnings reports, and analyst ratings. Compare ${selectedStock.ticker} to its sector peers.`],
                    ['Place your order', `Choose your order type: Market Order (instant) or Limit Order (your price). Start with a small position — you can always add more.`],
                    ['Set a stop-loss', `Protect yourself by setting a stop-loss order at 10-15% below your purchase price to limit maximum downside.`],
                    ['Track & rebalance', `Monitor quarterly earnings. If the investment thesis still holds, hold or add more. If fundamentals deteriorate, reassess.`]
                  ].map(([title, desc], i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="bg-indigo-700 text-white text-xs font-black rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</div>
                      <div>
                        <div className="text-white font-semibold text-sm">{title}</div>
                        <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setActiveTab(0)} className="w-full mt-4 py-3 bg-indigo-700 hover:bg-indigo-600 rounded-xl text-white font-bold transition-all">
                ← Back to Stock List
              </button>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">No Stock Selected</h3>
              <p className="text-slate-400 text-sm mb-6">Go to "Discover Stocks", enter your country, and tap any stock for a full AI-powered analysis.</p>
              <button onClick={() => setActiveTab(0)} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold transition-all">
                🌍 Discover Stocks
              </button>
            </div>
          )}
        </div>
      )}

      <div className="text-center py-4 text-slate-600 text-xs px-4">
        For educational purposes only · Not financial advice · Always consult a licensed financial advisor
      </div>
    </div>
  );
}
