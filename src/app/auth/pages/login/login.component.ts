import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCheckAuths } from '../../../shared/store/actions/check-auth.actions';
import { loadSignInWithGoogles } from '../../../shared/store/actions/sign-in-with-google.actions';
import { State } from '../../../shared/store/reducers/auth.reducer';
import { getAuthLoading } from '../../../shared/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authLoading$ = this.authStore.select(getAuthLoading);
  signIn() {
    return this.authStore.dispatch(loadSignInWithGoogles());
  }
  constructor(private authStore: Store<State>) {}

  ngOnInit(): void {
    this.authStore.dispatch(loadCheckAuths());
  }
}
