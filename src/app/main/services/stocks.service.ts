import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { delay, map, mapTo, switchMap, tap } from 'rxjs/operators';
import {
  INTERVALS,
  TICKER,
  TickerData,
  FunctionTypes,
  Portfolio,
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
  // self = new Stocks(environment.key);
  constructor(
    private http: HttpClient,
    private fireStoreService: AngularFirestore
  ) {}
  getCompanyInfo(symbol = 'IBM') {
    return this.request({ function: 'OVERVIEW', symbol });
  }

  searchTicker(keywords = 'microso') {
    return this.request({ function: 'SYMBOL_SEARCH', keywords });
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

  request(params: params) {
    return this.http.get(
      DEFAULT_URL +
        Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&')
    );
  }

  getPortfolios(uid: string): Observable<Portfolio[]> {
    // return of([
    //   { isMain: true, name: Math.random().toString(), uid: Math.random().toString() },
    //   { isMain: false, name: '21', uid: Math.random().toString() },
    //   { isMain: false, name: 'IB', uid: Math.random().toString() },
    // ]).pipe(delay(2000));
    return this.fireStoreService
      .collection(`/users/${uid}/portfolios`)
      .get()
      .pipe(
        map((snap) =>
          snap.docs.map((doc) => {
            return { uid: doc.id, ...(doc.data() as object) } as Portfolio;
          })
        )
      );
  }

  createPortfolio(
    data: { name: string; isMain: boolean },
    uid: string
  ): Observable<boolean> {
    // return of(true).pipe(delay(2000));
    return from(
      this.fireStoreService
        .collection(`/users/${uid}/portfolios`)
        .doc(this.fireStoreService.createId())
        .set(data)
    ).pipe(mapTo(true));
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

  // TSLA$: Observable<TickerData> = this.stocksAPI.getStockData(
  //   'TSLA',
  //   'daily',
  //   10
  // );
  // MSFT$: Observable<TickerData> = this.stocksAPI.getStockData(
  //   'MSFT',
  //   'daily',
  //   10
  // );
  // V$: Observable<TickerData> = this.stocksAPI.getStockData('V', 'daily', 10);
}
