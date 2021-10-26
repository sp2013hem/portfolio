import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSignInWithGoogle } from '../../../shared/store/actions/sign-in-with-google.actions';
import { State } from '../../../shared/store/reducers/auth.reducer';
import { getAuthSignInLoading } from '../../../shared/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authSignInLoading$ = this.authStore.select(getAuthSignInLoading);
  signIn() {
    return this.authStore.dispatch(
      loadSignInWithGoogle({ processingSignIn: true })
    );
  }
  constructor(private authStore: Store<State>) {}

  ngOnInit(): void {}
}
