type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export const CurrencyMap = {
  USD: {
    symbol: '$',
  },
  CAD: {
    symbol: 'CA$',
  },
  EUR: {
    symbol: '€',
  },
  INR: {
    symbol: '₹',
  },
  AUD: {
    symbol: 'AU$',
  },
  JPY: {
    symbol: '¥',
  },
  // AED: {
  // symbol: 'AED',
  // },
  // AFN: {
  // symbol: 'Af',
  // },
  // ALL: {
  // symbol: 'ALL',
  // },
  // AMD: {
  // symbol: 'AMD',
  // },
  // ARS: {
  // symbol: 'AR$',
  // },
  // AZN: {
  // symbol: 'man.',
  // },
  // BAM: {
  // symbol: 'KM',
  // },
  // BDT: {
  // symbol: 'Tk',
  // },
  // BGN: {
  // symbol: 'BGN',
  // },
  // BHD: {
  // symbol: 'BD',
  // },
  // BIF: {
  // symbol: 'FBu',
  // },
  // BND: {
  // symbol: 'BN$',
  // },
  // BOB: {
  // symbol: 'Bs',
  // },
  // BRL: {
  // symbol: 'R$',
  // },
  // BWP: {
  // symbol: 'BWP',
  // },
  // BYR: {
  // symbol: 'BYR',
  // },
  // BZD: {
  // symbol: 'BZ$',
  // },
  // CDF: {
  // symbol: 'CDF',
  // },
  // CHF: {
  // symbol: 'CHF',
  // },
  // CLP: {
  // symbol: 'CL$',
  // },
  // CNY: {
  // symbol: 'CN¥',
  // },
  // COP: {
  // symbol: 'CO$',
  // },
  // CRC: {
  // symbol: '₡',
  // },
  // CVE: {
  // symbol: 'CV$',
  // },
  // CZK: {
  // symbol: 'Kč',
  // },
  // DJF: {
  // symbol: 'Fdj',
  // },
  // DKK: {
  // symbol: 'Dkr',
  // },
  // DOP: {
  // symbol: 'RD$',
  // },
  // DZD: {
  // symbol: 'DA',
  // },
  // EEK: {
  // symbol: 'Ekr',
  // },
  // EGP: {
  // symbol: 'EGP',
  // },
  // ERN: {
  // symbol: 'Nfk',
  // },
  // ETB: {
  // symbol: 'Br',
  // },
  // GBP: {
  // symbol: '£',
  // },
  // GEL: {
  // symbol: 'GEL',
  // },
  // GHS: {
  // symbol: 'GH₵',
  // },
  // GNF: {
  // symbol: 'FG',
  // },
  // GTQ: {
  // symbol: 'GTQ',
  // },
  // HKD: {
  // symbol: 'HK$',
  // },
  // HNL: {
  // symbol: 'HNL',
  // },
  // HRK: {
  // symbol: 'kn',
  // },
  // HUF: {
  // symbol: 'Ft',
  // },
  // IDR: {
  // symbol: 'Rp',
  // },
  // ILS: {
  // symbol: '₪',
  // },
  // IQD: {
  // symbol: 'IQD',
  // },
  // IRR: {
  // symbol: 'IRR',
  // },
  // ISK: {
  // symbol: 'Ikr',
  // },
  // JMD: {
  // symbol: 'J$',
  // },
  // JOD: {
  // symbol: 'JD',
  // },
  // JPY: {
  // symbol: '¥',
  // },
  // KES: {
  // symbol: 'Ksh',
  // },
  // KHR: {
  // symbol: 'KHR',
  // },
  // KMF: {
  // symbol: 'CF',
  // },
  // KRW: {
  // symbol: '₩',
  // },
  // KWD: {
  // symbol: 'KD',
  // },
  // KZT: {
  // symbol: 'KZT',
  // },
  // LBP: {
  // symbol: 'LB£',
  // },
  // LKR: {
  // symbol: 'SLRs',
  // },
  // LTL: {
  // symbol: 'Lt',
  // },
  // LVL: {
  // symbol: 'Ls',
  // },
  // LYD: {
  // symbol: 'LD',
  // },
  // MAD: {
  // symbol: 'MAD',
  // },
  // MDL: {
  // symbol: 'MDL',
  // },
  // MGA: {
  // symbol: 'MGA',
  // },
  // MKD: {
  // symbol: 'MKD',
  // },
  // MMK: {
  // symbol: 'MMK',
  // },
  // MOP: {
  // symbol: 'MOP$',
  // },
  // MUR: {
  // symbol: 'MURs',
  // },
  // MXN: {
  // symbol: 'MX$',
  // },
  // MYR: {
  // symbol: 'RM',
  // },
  // MZN: {
  // symbol: 'MTn',
  // },
  // NAD: {
  // symbol: 'N$',
  // },
  // NGN: {
  // symbol: '₦',
  // },
  // NIO: {
  // symbol: 'C$',
  // },
  // NOK: {
  // symbol: 'Nkr',
  // },
  // NPR: {
  // symbol: 'NPRs',
  // },
  // NZD: {
  // symbol: 'NZ$',
  // },
  // OMR: {
  // symbol: 'OMR',
  // },
  // PAB: {
  // symbol: 'B/.',
  // },
  // PEN: {
  // symbol: 'S/.',
  // },
  // PHP: {
  // symbol: '₱',
  // },
  // PKR: {
  // symbol: 'PKRs',
  // },
  // PLN: {
  // symbol: 'zł',
  // },
  // PYG: {
  // symbol: '₲',
  // },
  // QAR: {
  // symbol: 'QR',
  // },
  // RON: {
  // symbol: 'RON',
  // },
  // RSD: {
  // symbol: 'din.',
  // },
  // RUB: {
  // symbol: 'RUB',
  // },
  // RWF: {
  // symbol: 'RWF',
  // },
  // SAR: {
  // symbol: 'SR',
  // },
  // SDG: {
  // symbol: 'SDG',
  // },
  // SEK: {
  // symbol: 'Skr',
  // },
  // SGD: {
  // symbol: 'S$',
  // },
  // SOS: {
  // symbol: 'Ssh',
  // },
  // SYP: {
  // symbol: 'SY£',
  // },
  // THB: {
  // symbol: '฿',
  // },
  // TND: {
  // symbol: 'DT',
  // },
  // TOP: {
  // symbol: 'T$',
  // },
  // TRY: {
  // symbol: 'TL',
  // },
  // TTD: {
  // symbol: 'TT$',
  // },
  // TWD: {
  // symbol: 'NT$',
  // },
  // TZS: {
  // symbol: 'TSh',
  // },
  // UAH: {
  // symbol: '₴',
  // },
  // UGX: {
  // symbol: 'USh',
  // },
  // UYU: {
  // symbol: '$U',
  // },
  // UZS: {
  // symbol: 'UZS',
  // },
  // VEF: {
  // symbol: 'Bs.F.',
  // },
  // VND: {
  // symbol: '₫',
  // },
  // XAF: {
  // symbol: 'FCFA',
  // },
  // XOF: {
  // symbol: 'CFA',
  // },
  // YER: {
  // symbol: 'YR',
  // },
  // ZAR: {
  // symbol: 'R',
  // },
  // ZMK: {
  // symbol: 'ZK',
  // },
};

export type TICKER = string;

export const INTERVALS = [
  '1min',
  '5min',
  '15min',
  '30min',
  '60min',
  'daily',
  'weekly',
  'monthly',
] as const;

export const PERFORMANCES = [
  'real-time',
  '1day',
  '5day',
  '1month',
  '3month',
  'year-to-date',
  '1year',
  '3year',
  '5year',
  '10year',
];

// export const INDICATORS = [
//   'SMA',
//   'EMA',
//   'WMA',
//   'DEMA',
//   'TEMA',
//   'TRIMA',
//   'KAMA',
//   'MAMA',
//   'VWAP',
//   'T3',
//   'MACD',
//   'MACDEXT',
//   'STOCH',
//   'STOCHF',
//   'RSI',
//   'STOCHRSI',
//   'WILLR',
//   'ADX',
//   'ADXR',
//   'APO',
//   'PPO',
//   'MOM',
//   'BOP',
//   'CCI',
//   'CMO',
//   'ROC',
//   'ROCR',
//   'AROON',
//   'AROONOSC',
//   'MFI',
//   'TRIX',
//   'ULTOSC',
//   'DX',
//   'MINUS_DI',
//   'PLUS_DI',
//   'MINUS_DM',
//   'PLUS_DM',
//   'BBANDS',
//   'MIDPOINT',
//   'MIDPRICE',
//   'SAR',
//   'TRANGE',
//   'ATR',
//   'NATR',
//   'AD',
//   'ADOSC',
//   'OBV',
//   'HT_TRENDLINE',
//   'HT_SINE',
//   'HT_TRENDMODE',
//   'HT_DCPERIOD',
//   'HT_DCPHASE',
//   'HT_PHASOR',
// ] as const;

// export const INDICATORS_ST = [
//   'SMA',
//   'EMA',
//   'WMA',
//   'DEMA',
//   'TEMA',
//   'TRIMA',
//   'KAMA',
//   'MAMA',
//   'T3',
//   'MACD',
//   'MACDEXT',
//   'RSI',
//   'STOCHRSI',
//   'APO',
//   'PPO',
//   'MOM',
//   'CMO',
//   'ROC',
//   'ROCR',
//   'TRIX',
//   'BBANDS',
//   'MIDPOINT',
//   'HT_TRENDLINE',
//   'HT_SINE',
//   'HT_TRENDMODE',
//   'HT_DCPERIOD',
//   'HT_DCPHASE',
//   'HT_PHASOR',
// ] as const;

export type INTERVALS = typeof INTERVALS[number];

export type PERFORMANCES = typeof PERFORMANCES[number];

export const FunctionTypes = [
  'OVERVIEW',
  'SYMBOL_SEARCH',
  'TIME_SERIES_INTRADAY',
  'TIME_SERIES_DAILY',
  'GLOBAL_QUOTE',
] as const;

export interface TickerSearchResult {
  ticker: string;
  name: string;
  type: string;
  region: string;
  currency: string;
}

export interface TickerData {
  ticker: string;
  value: number;
  position: number;
  pl: number;
  totalPL: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
  date?: Date;
}

export interface Portfolio {
  name: string;
  caption: string;
  uid: string;
  isMain: boolean;
}

export interface Quote {
  ticker: string;
  open: number;
  high: number;
  low: number;
  currentPrice: number;
  volume: number;
  prevClose: number;
  change: number;
  changePercent: number;
}

export type BuyorSell = 'BUY' | 'SELL';
export interface Entry extends Partial<Quote> {
  ticker: string;
  date: Date;
  uid: string;
  type: BuyorSell;
  price: number;
  profit?: number;
  currentWorth?: number;
  quantity: number;
  fees: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  currency: keyof typeof CurrencyMap;
}

export interface EntryPayload extends Omit<Entry, 'uid'> {}
