import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AuthActions, AuthSelectors } from './auth/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  processingAuth$ = this.store.select(AuthSelectors.isAuthCheckProcessing);
  user$ = this.store.select(AuthSelectors.UserInfo);
  isAuthenticated$ = this.store.select(AuthSelectors.isAuthenticated);
  logout() {
    this.store.dispatch(AuthActions.logoutAction());
  }
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.TriggerAuthCheckAction());
  }
}
