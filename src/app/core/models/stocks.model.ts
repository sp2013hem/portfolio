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
] as const;

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
  tickers: TickerData[];
}
