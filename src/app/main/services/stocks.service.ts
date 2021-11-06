import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, delay, map, mapTo, switchMap, tap } from 'rxjs/operators';
import {
  INTERVALS,
  TICKER,
  TickerData,
  FunctionTypes,
  TickerSearchResult,
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
  constructor(
    private http: HttpClient,
    private fireStoreService: AngularFirestore
  ) {}
  getCompanyInfo(symbol = 'IBM') {
    return this.request({ function: 'OVERVIEW', symbol });
  }

  searchTicker(keywords: string): Observable<TickerSearchResult[]> {
    return this.request({ function: 'SYMBOL_SEARCH', keywords }).pipe(
      map((data) =>
        data.bestMatches
          .sort((d) => +d['9. matchScore'])
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

  getStockData(symbol = 'IBM'): Observable<TickerData[]> {
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
