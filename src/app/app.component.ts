import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { TickerData } from './core/models/stocks.model';
import { StocksAPI } from './core/services/stocks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$ = this.authService.checkAuth();
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
  constructor(private stocksAPI: StocksAPI, private authService: AuthService) {}
}
