import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  SearchStocksFailed,
  SearchStocksRequested,
  SearchStocksSucces,
} from './stocks.actions';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthSelectors } from 'src/app/auth/store';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { StocksAPI } from '../../services/stocks.service';
import { TickerData } from 'src/app/core/models/stocks.model';

@Injectable()
export class Effects {
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private actions$: Actions,
    private stocks: StocksAPI,
    private store: Store
  ) {}

  searchTickers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchStocksRequested),
      switchMap((action) => {
        return this.stocks.searchTicker(action.key).pipe(
          map((stocks) => {
            return SearchStocksSucces({
              processingSearch: false,
              searchError: null,
              stocks,
            });
          }),
          catchError((err) => {
            this.snackBar.open(err?.error || err);
            return of(
              SearchStocksFailed({
                processingSearch: false,
                searchError: err?.error || err,
              })
            );
          })
        );
      })
    );
  });
}
