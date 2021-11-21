import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  BuyorSell,
  CurrencyMap,
  Entry,
  EntryPayload,
} from 'src/app/core/models/stocks.model';
import { StocksActions, StocksSelectors } from '../../store';

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
    if (this.entry.uid) {
      if (!!this.second.valid) {
        const payload: EntryPayload = {
          ...this.second.value,
          type: this.buyOrSell,
        };
        this.dialogRef.close(payload);
      }
    } else {
      if (!!this.first.valid && !!this.second.valid) {
        const payload: EntryPayload = {
          ...this.first.value,
          ...this.second.value,
          type: this.buyOrSell,
        };
        this.dialogRef.close(payload);
      }
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public entry: Entry,
    public dialogRef?: MatDialogRef<AddTickerComponent>
  ) {}
  ngOnInit() {
    const e: Entry | undefined = this.entry || <Entry>{};
    if (!e) {
      this.first = this.formBuilder.group({
        ticker: [null, Validators.required],
      });
      this._$.query = this.first
        .get('ticker')
        .valueChanges.pipe(debounceTime(300))
        .subscribe({
          next: (key) =>
            this.store.dispatch(StocksActions.SearchStocksRequested({ key })),
        });
    } else {
      this.buyOrSell = e.type;
    }
    this.second = this.formBuilder.group({
      date: [
        (e.date?.toDate && e.date?.toDate()) || new Date(),
        Validators.required,
      ],
      price: [e.price || null, Validators.required],
      quantity: [e.quantity || null, Validators.required],
      fees: [e.fees || null, Validators.required],
      currency: [e.currency || 'USD', Validators.required],
    });
  }
  ngOnDestroy() {
    this._$.forEach((value) => value?.unsubscribe());
  }
}
