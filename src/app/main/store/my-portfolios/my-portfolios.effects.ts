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
import { PortfoliosAPI } from '../../services/portfolios.service';
import {
  CreatePortfolioFailed,
  CreatePortfolioSuccess,
  DeletePortfolioFailed,
  DeletePortfolioSuccess,
  Empty,
  MyPortfoliosFailed,
  MyPortfoliosSuccess,
  RequestCreatePortfolio,
  RequestDeletePortfolio,
  RequestMyPortfolios,
} from './my-portfolios.actions';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class Effects {
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private actions$: Actions,
    private stocks: PortfoliosAPI,
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

  deletePortfolio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RequestDeletePortfolio),
      withLatestFrom(
        this.store.select(AuthSelectors.UserInfo).pipe(filter((d) => !!d))
      ),
      switchMap(([action, user]) => {
        return this.stocks.deletePortfolio(user.uid, action.uid).pipe(
          map(() => {
            return DeletePortfolioSuccess({
              processingDelete: false,
              uid: action.uid,
            });
          }),
          catchError((err) => {
            this.snackBar.open(err?.error || err);
            return of(
              DeletePortfolioFailed({
                processingDelete: false,
                error: err?.error || err,
              })
            );
          })
        );
      })
    );
  });
}
