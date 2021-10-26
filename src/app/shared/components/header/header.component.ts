import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../auth/store/reducers/auth.reducer';
import { getAuthUser } from '../../../auth/store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authStore.select(getAuthUser);
  constructor(private authStore: Store<AuthState>) {}

  ngOnInit(): void {}
}
