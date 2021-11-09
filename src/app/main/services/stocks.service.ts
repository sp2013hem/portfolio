import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  INTERVALS,
  TICKER,
  TickerData,
  FunctionTypes,
  TickerSearchResult,
  Quote,
} from 'src/app/core/models/stocks.model';
import { environment } from 'src/environments/environment';

interface params {
  function: typeof FunctionTypes[number];
  symbol?: TICKER;
  keywords?: string;
  amount?: number;
  interval?: INTERVALS;
}

const DEFAULT_URL = `https://www.alphavantage.co/query?apikey=${environment.key}&`;

@Injectable({ providedIn: 'root' })
export class StocksAPI {
  cache = {
    GLOBAL_QUOTE: {},
  };
  constructor(private http: HttpClient) {}
  getCompanyInfo(symbol = 'IBM') {
    return this.request({ function: 'OVERVIEW', symbol });
  }

  searchTicker(keywords: string): Observable<TickerSearchResult[]> {
    return this.request({ function: 'SYMBOL_SEARCH', keywords }).pipe(
      map((data) =>
        data.bestMatches
          .sort((d) => +d['9. matchScore'])
          .filter((d) => +d['9. matchScore'] > 0.5)
          .map((d) => ({
            ticker: d['1. symbol'],
            name: d['2. name'],
            type: d['3. type'],
            region: d['4. region'],
            currency: d['8. currency'],
          }))
      )
    );
  }

  getQuote(symbol): Observable<Quote> {
    if (!!this.cache.GLOBAL_QUOTE[symbol]) {
      return of(this.cache.GLOBAL_QUOTE[symbol]);
    }
    return this.request({
      function: 'GLOBAL_QUOTE',
      symbol,
    }).pipe(
      map((data) => {
        const t = {
          ticker: data['Global Quote']['01. symbol'],
          open: +data['Global Quote']['02. open'],
          high: +data['Global Quote']['03. high'],
          low: +data['Global Quote']['04. low'],
          currentPrice: +data['Global Quote']['05. price'],
          volume: +data['Global Quote']['06. volume'],
          prevClose: +data['Global Quote']['08. previous close'],
          change: +data['Global Quote']['09. change'],
          changePercent: parseFloat(data['Global Quote']['10. change percent']),
        };
        this.cache.GLOBAL_QUOTE[symbol] = t;
        return t as Quote;
      })
    );
  }

  getStockData(symbol): Observable<TickerData[]> {
    return this.request({
      function: 'TIME_SERIES_DAILY',
      amount: 10,
      symbol,
    }).pipe(
      map((res) => {
        const data = res['Time Series (Daily)'];
        return Object.keys(data).map((key) => ({
          ...data[key],
          date: new Date(key),
        })) as TickerData[];
      })
    );
  }

  request(params: params): Observable<any> {
    return this.http.get(
      DEFAULT_URL +
        Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&')
    );
  }

  // getStockData(
  //   symbol: TICKER,
  //   interval: INTERVALS,
  //   amount: number
  // ): Observable<TickerData> {
  //   return from(
  //     this.self.timeSeries({ symbol, interval, amount }) as Promise<TickerData>
  //   );
  // }

  // TSLA$: Observable<TickerData> = this.PortfoliosAPI.getStockData(
  //   'TSLA',
  //   'daily',
  //   10
  // );
  // MSFT$: Observable<TickerData> = this.PortfoliosAPI.getStockData(
  //   'MSFT',
  //   'daily',
  //   10
  // );
  // V$: Observable<TickerData> = this.PortfoliosAPI.getStockData('V', 'daily', 10);
}
