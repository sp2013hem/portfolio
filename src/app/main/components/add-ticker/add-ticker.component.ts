import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import {
  CurrencyMap,
  EntryPayload,
  TickerSearchResult,
} from 'src/app/core/models/stocks.model';
import { EntriesAPI } from '../../services/entries.service';
import {
  PortfolioActions,
  PortfolioSelectors,
  StocksActions,
  StocksSelectors,
} from '../../store';

type BuyorSell = 'BUY' | 'SELL';

@Component({
  selector: 'app-add-ticker',
  templateUrl: './add-ticker.component.html',
  styleUrls: ['./add-ticker.component.scss'],
})
export class AddTickerComponent implements OnInit {
  _$: Record<string, Subscription> = {};
  first: FormGroup;
  second: FormGroup;
  buyOrSell: BuyorSell = 'BUY';
  currencies = CurrencyMap;

  stockResults$ = this.store.select(StocksSelectors.stocks);
  processing$ = this.store.select(StocksSelectors.searchProcessing);

  submit() {
    if (!!this.first.valid && !!this.second.valid) {
      const payload: EntryPayload = {
        ...this.first.value,
        ...this.second.value,
      };
      this._$.submit = this.api
        .createEntry(payload, '4EZJvi86mNOB2VIdIjtiHWHLpcb2', this.uid)
        .subscribe({ next: () => this.dialogRef.close() });
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private api: EntriesAPI,
    @Inject(MAT_DIALOG_DATA) public uid: string,
    public dialogRef?: MatDialogRef<AddTickerComponent>
  ) {}
  ngOnInit() {
    this.first = this.formBuilder.group({
      ticker: [null, Validators.required],
    });
    this.second = this.formBuilder.group({
      date: [new Date(), Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      fees: [null, Validators.required],
      currency: ['USD', Validators.required],
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
