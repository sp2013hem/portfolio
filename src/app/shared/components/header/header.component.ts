import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/reducers/auth.reducer';
import { getAuthUser } from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authStore.select(getAuthUser);
  constructor(private authStore: Store<State>) {}

  ngOnInit(): void {}
}
