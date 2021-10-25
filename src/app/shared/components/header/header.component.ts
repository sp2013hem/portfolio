import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSignOuts } from '../../store/actions/sign-out.actions';
import { State } from '../../store/reducers/auth.reducer';
import { getAuthUser } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authStore.select(getAuthUser);
  signOut() {
    this.authStore.dispatch(loadSignOuts({ processingSignOut: true }));
  }
  constructor(private authStore: Store<State>) {}

  ngOnInit(): void {}
}
