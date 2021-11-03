import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import {
  AuthCheckFailedAction,
  AuthCheckSuccessAction,
  LoginFailedAction,
  LoginRequestedAction,
  LoginSuccessAction,
  logoutAction,
  TriggerAuthCheckAction,
} from './auth.actions';

@Injectable()
export class Effects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private auth: AuthService
  ) {}

  authCheck$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TriggerAuthCheckAction),
      switchMap(() => {
        return this.auth.checkAuth().pipe(
          map((user) =>
            user
              ? AuthCheckSuccessAction({
                  processingAuth: false,
                  user,
                  error: null,
                })
              : AuthCheckFailedAction({
                  processingAuth: false,
                  user: null,
                  error: 'something went wrong',
                })
          ),
          catchError((error) =>
            of(
              AuthCheckFailedAction({
                processingAuth: false,
                error,
                user: null,
              })
            )
          )
        );
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginRequestedAction),
      switchMap(() =>
        this.auth.login().pipe(
          map((user) =>
            user
              ? LoginSuccessAction({
                  processingLogin: false,
                  user,
                  error: null,
                })
              : LoginFailedAction({
                  processingLogin: false,
                  processingAuth: false,
                  user: null,
                  error: 'login failed',
                })
          ),
          catchError((err) =>
            of(
              LoginFailedAction({
                processingLogin: false,
                processingAuth: false,
                error: err?.error || err,
                user: null,
              })
            )
          )
        )
      )
    );
  });
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        mergeMap(() => {
          return this.auth
            .logout()
            .pipe(tap(() => this.router.navigate(['/login'])));
        })
      );
    },
    { dispatch: false }
  );
}
