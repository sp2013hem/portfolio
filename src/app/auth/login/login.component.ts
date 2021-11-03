import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AuthActions, AuthSelectors } from '../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  $ = this.store
    .select(AuthSelectors.isAuthenticated)
    .pipe(filter((d) => !!d))
    .subscribe(() => this.router.navigate(['/']));
  loginProcessing$ = this.store.select(AuthSelectors.loginProcessing);

  login() {
    this.store.dispatch(AuthActions.LoginRequestedAction());
  }
  constructor(private router: Router, private store: Store) {}

  ngOnDestroy() {
    this.$.unsubscribe();
  }
}
