import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  signOut() {
    return this.authService
      .signOutWithGoogle()
      .pipe(tap(() => this.router.navigate(['/login'])))
      .subscribe();
  }
  constructor(
    private router: Router,
    private stocksAPI: StocksAPI,
    private authService: AuthService
  ) {}
}
