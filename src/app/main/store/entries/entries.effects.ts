import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  EntriesCreatedFailed,
  EntriesCreatedRequested,
  EntriesCreatedSuccess,
} from './entries.actions';

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
import { EntriesAPI } from '../../services/entries.service';

@Injectable()
export class Effects {
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private actions$: Actions,
    private entries: EntriesAPI,
    private store: Store
  ) {}

  searchTickers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EntriesCreatedRequested),
      withLatestFrom(
        this.store.select(AuthSelectors.UserInfo).pipe(filter((d) => !!d))
      ),
      switchMap((action) => {
        return this.entries
          .createEntry(action[0].payload, action[1].uid, action[0].pid)
          .pipe(
            map((entries) => {
              return EntriesCreatedSuccess({
                processingAddEntry: false,
                created: true,
              });
            }),
            catchError((err) => {
              this.snackBar.open(err?.error || err);
              return of(
                EntriesCreatedFailed({
                  processingAddEntry: false,
                  created: false,
                  error: err,
                })
              );
            })
          );
      })
    );
  });
}
