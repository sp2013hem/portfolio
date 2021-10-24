import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCheckAuths } from './shared/store/actions/check-auth.actions';
import { loadSignOuts } from './shared/store/actions/sign-out.actions';
import { State } from './shared/store/reducers/auth.reducer';
import {
  getAuthLoading,
  getAuthUser,
} from './shared/store/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$ = this.authStore.select(getAuthUser);
  authLoading$ = this.authStore.select(getAuthLoading);

  signOut() {
    this.authStore.dispatch(loadSignOuts());
  }
  constructor(private authStore: Store<State>) {}
  ngOnInit(): void {
    this.authStore.dispatch(loadCheckAuths());
  }
}
