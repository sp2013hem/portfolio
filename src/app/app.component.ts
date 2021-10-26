import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCheckAuth } from './store/actions/check-auth.actions';
import { State } from './store/reducers/auth.reducer';
import {
  getAuthUser,
  getSignOutLoading,
} from './store/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$ = this.authStore.select(getAuthUser);
  signOutLoading$ = this.authStore.select(getSignOutLoading);

  constructor(private authStore: Store<State>) {}
  ngOnInit(): void {
    this.authStore.dispatch(loadCheckAuth());
  }
}
