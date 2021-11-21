import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  EntriesCreatedFailed,
  EntriesCreatedRequested,
  EntriesCreatedSuccess,
  EntriesDeleteFailed,
  EntriesDeleteRequested,
  EntriesDeleteSuccess,
  EntriesEditFailed,
  EntriesEditRequested,
  EntriesEditSuccess,
  GetEntriesFailed,
  GetEntriesRequest,
  GetEntriesSuccess,
} from './entries.actions';

import { of, zip } from 'rxjs';
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
    private stocks: StocksAPI,
    private entries: EntriesAPI,
    private store: Store
  ) {}

  addTickers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EntriesCreatedRequested),
      withLatestFrom(
        this.store.select(AuthSelectors.UserInfo).pipe(filter((d) => !!d))
      ),
      switchMap((action) => {
        return this.entries
          .create(action[0].payload, action[1].uid, action[0].pid)
          .pipe(
            mergeMap(() => [
              EntriesCreatedSuccess({
                processingAddEntry: false,
                created: true,
              }),
              GetEntriesRequest({ pid: action[0].pid }),
            ]),
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

  editTickers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EntriesEditRequested),
      withLatestFrom(
        this.store.select(AuthSelectors.UserInfo).pipe(filter((d) => !!d))
      ),
      switchMap((action) => {
        
        return this.entries
          .edit(action[0].payload, action[1].uid, action[0].pid, action[0].eid)
          .pipe(
            map(() => {
              
              return EntriesEditSuccess({
                updatedEntry: { ...action[0].payload, uid: action[0].eid },
                processingEditEntry: false,
                edited: true,
              });
            }),
            catchError((err) => {
              this.snackBar.open(err?.error || err);
              return of(
                EntriesEditFailed({
                  processingEditEntry: false,
                  edited: false,
                  error: err,
                })
              );
            })
          );
      })
    );
  });

  deleteTickers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EntriesDeleteRequested),
      withLatestFrom(
        this.store.select(AuthSelectors.UserInfo).pipe(filter((d) => !!d))
      ),
      switchMap((action) => {
        
        return this.entries
          .delete(action[1].uid, action[0].pid, action[0].eid)
          .pipe(
            map(() => {
              
              return EntriesDeleteSuccess({
                uid: action[0].eid,
                processingDeleteEntry: false,
                deleted: true,
              });
            }),
            catchError((err) => {
              this.snackBar.open(err?.error || err);
              return of(
                EntriesDeleteFailed({
                  processingDeleteEntry: false,
                  deleted: false,
                  error: err,
                })
              );
            })
          );
      })
    );
  });

  entries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GetEntriesRequest),
      withLatestFrom(
        this.store.select(AuthSelectors.UserInfo).pipe(filter((d) => !!d))
      ),
      switchMap((action) => {
        return this.entries.get(action[1].uid, action[0].pid).pipe(
          switchMap((entries) => {
            if (!entries.length) {
              return of(
                GetEntriesSuccess({
                  processingEntries: false,
                  entries: [],
                  getError: null,
                })
              );
            }
            return zip(
              ...[...new Set(entries.map((entry) => entry.ticker))].map(
                (ticker) => this.stocks.getQuote(ticker)
              )
            ).pipe(
              map((data) => {
                const mergeEntries = entries
                  .map((entry) => {
                    const d = data.find((d) => d.ticker === entry.ticker);
                    return d ? { ...d, ...entry } : null;
                  })
                  .filter((d) => !!d);
                return GetEntriesSuccess({
                  processingEntries: false,
                  entries: mergeEntries,
                  getError: null,
                });
              })
            );
          }),
          catchError((err) => {
            this.snackBar.open(err?.error || err);
            return of(
              GetEntriesFailed({
                processingEntries: false,
                getError: err?.error || err,
              })
            );
          })
        );
      })
    );
  });
}
