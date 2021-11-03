import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AuthSelectors } from 'src/app/auth/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  $ = this.store
    .select(AuthSelectors.isAuthenticated)
    .pipe(filter((d) => !d))
    .subscribe(() => this.router.navigate(['/login']));
  user$ = this.store.select(AuthSelectors.UserInfo);

  constructor(private router: Router, private store: Store) {}

  ngOnDestroy() {
    this.$.unsubscribe();
  }
}
