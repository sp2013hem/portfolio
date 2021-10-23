import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INTERVALS, TICKER, TickerData } from '../models/stocks.model';
declare var Stocks: any;

@Injectable({ providedIn: 'root' })
export class StocksAPI {
  self = new Stocks(environment.key);

  getStockData(
    symbol: TICKER,
    interval: INTERVALS,
    amount: number
  ): Observable<TickerData> {
    return from(
      this.self.timeSeries({ symbol, interval, amount }) as Promise<TickerData>
    );
  }
}
