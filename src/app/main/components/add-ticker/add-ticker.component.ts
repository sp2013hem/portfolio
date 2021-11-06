import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { TickerSearchResult } from 'src/app/core/models/stocks.model';
import {
  PortfolioActions,
  PortfolioSelectors,
  StocksActions,
  StocksSelectors,
} from '../../store';

@Component({
  selector: 'app-add-ticker',
  templateUrl: './add-ticker.component.html',
  styleUrls: ['./add-ticker.component.scss'],
})
export class AddTickerComponent implements OnInit {
  _$: Record<string, Subscription> = {};
  first: FormGroup;
  second: FormGroup;
  stockResults$ = this.store.select(StocksSelectors.stocks);
  processing$ = this.store.select(StocksSelectors.searchProcessing);

  submit() {
    // if (!!this.form.valid) {
    //   this.store.dispatch(
    //     PortfolioActions.RequestCreatePortfolio({ payload: this.form.value })
    //   );
    // }
  }
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<AddTickerComponent>,
    @Inject(MAT_DIALOG_DATA) public uid: string
  ) {}
  ngOnInit() {
    this.first = this.formBuilder.group({
      ticker: [null, Validators.required],
    });
    this.second = this.formBuilder.group({
      ctrl: ['', Validators.required],
    });
    this._$.query = this.first
      .get('ticker')
      .valueChanges.pipe(debounceTime(300))
      .subscribe({
        next: (res) =>
          this.store.dispatch(
            StocksActions.SearchStocksRequested({ key: res })
          ),
      });
  }
  ngOnDestroy() {
    this._$.forEach((value) => value?.unsubscribe());
  }
}
