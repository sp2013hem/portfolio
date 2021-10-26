import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSignOut } from '../../../store/actions/sign-out.actions';
import { State } from '../../../store/reducers/auth.reducer';
import { getAuthUser } from '../../../store/selectors/auth.selectors';

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
  constructor(private authStore: Store<State>) {}

  ngOnInit(): void {}
}
