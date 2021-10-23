export type TICKER = string;

export type INTERVALS =
  | '1min'
  | '5min'
  | '15min'
  | '30min'
  | '60min'
  | 'daily'
  | 'weekly'
  | 'monthly';

export type PERFORMANCES =
  | 'real-time'
  | '1day'
  | '5day'
  | '1month'
  | '3month'
  | 'year-to-date'
  | '1year'
  | '3year'
  | '5year'
  | '10year';

export interface TickerData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date: Date;
}
