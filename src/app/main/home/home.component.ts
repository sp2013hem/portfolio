import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AuthSelectors } from 'src/app/auth/store';
import { PortfolioActions, PortfolioSelectors } from '../store';
const today = new Date().getHours();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, OnInit {
  greeting = (today < 12
    ? 'good morning'
    : today < 18
    ? 'good afternoon'
    : 'good evening'
  ).capitalize();
  panelOpenState;
  _$ = this.store
    .select(AuthSelectors.isAuthenticated)
    .pipe(filter((d) => !d))
    .subscribe(() => this.router.navigate(['/login']));

  processingMyPortfolios$ = this.store.select(
    PortfolioSelectors.processingMyPortfolios
  );
  user$ = this.store.select(AuthSelectors.UserInfo);
  portfolios$ = this.store.select(PortfolioSelectors.Portfolios);

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(PortfolioActions.RequestMyPortfolios());
  }
  ngOnDestroy() {
    this._$.unsubscribe();
  }
}
