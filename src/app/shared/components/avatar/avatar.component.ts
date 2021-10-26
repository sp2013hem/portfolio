import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSignOut } from '../../../auth/store/actions/sign-out.actions';
import { AuthState } from '../../../auth/store/reducers/auth.reducer';
import { getAuthUser } from '../../../auth/store/selectors/auth.selectors';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  user$ = this.authStore.select(getAuthUser);
  signOut() {
    this.authStore.dispatch(loadSignOut({ processingSignOut: true }));
  }
  constructor(private authStore: Store<AuthState>) {}

  ngOnInit(): void {}
}
