import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

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
import { StocksAPI } from '../services/stocks.service';
import {
  CreatePortfolioFailed,
  CreatePortfolioSuccess,
  MyPortfoliosFailed,
  MyPortfoliosSuccess,
  RequestCreatePortfolio,
  RequestMyPortfolios,
} from './stocks.actions';

@Injectable()
export class Effects {
  constructor(
    private snackBar: MatSnackBar,
    private actions$: Actions,
    private stocks: StocksAPI,
    private store: Store
  ) {}

  portfolios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RequestMyPortfolios),
      withLatestFrom(
        this.store.select(AuthSelectors.UserInfo).pipe(filter((d) => !!d))
      ),
      switchMap((action) => {
        return this.stocks.getPortfolios(action[1]?.uid).pipe(
          map((portfolios) =>
            MyPortfoliosSuccess({
              processingPortfolios: false,
              portfolios,
              error: null,
            })
          ),
          catchError((err) => {
            this.snackBar.open(err?.error || err);
            return of(
              MyPortfoliosFailed({
                processingPortfolios: false,
                error: err?.error || err,
              })
            );
          })
        );
      })
    );
  });

  createPortfolio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RequestCreatePortfolio),
      withLatestFrom(
        this.store.select(AuthSelectors.UserInfo).pipe(filter((d) => !!d))
      ),
      mergeMap((action) => {
        return this.stocks
          .createPortfolio(action[0].payload, action[1]?.uid)
          .pipe(
            map(() => {
              this.snackBar.open(
                'New Portfolio Created! Start adding your stocks to track perfomance.',
                null,
                { duration: 3000 }
              );
              return CreatePortfolioSuccess({
                processingCreatePortfolio: false,
                created: true,
                error: null,
              });
            }),
            catchError((err) => {
              this.snackBar.open(err?.error || err);
              return of(
                CreatePortfolioFailed({
                  processingCreatePortfolio: false,
                  created: false,
                  error: err?.error || err,
                })
              );
            })
          );
      })
    );
  });
}
