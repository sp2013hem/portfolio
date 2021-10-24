import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TickerData } from './core/models/stocks.model';
import { StocksAPI } from './core/services/stocks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedIn = location.pathname !== '/login';
  TSLA$: Observable<TickerData> = this.stocksAPI.getStockData(
    'TSLA',
    'daily',
    10
  );
  MSFT$: Observable<TickerData> = this.stocksAPI.getStockData(
    'MSFT',
    'daily',
    10
  );
  V$: Observable<TickerData> = this.stocksAPI.getStockData('V', 'daily', 10);
  constructor(private stocksAPI: StocksAPI) {}
}
