import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  loadCheckAuth,
  loadCheckAuthFailure,
  loadCheckAuthSuccess,
} from '../actions/check-auth.actions';

@Injectable()
export class CheckAuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCheckAuth),
      mergeMap(() =>
        this.authService.checkAuth().pipe(
          map((user) =>
            user
              ? loadCheckAuthSuccess({ user })
              : loadCheckAuthFailure({ error: 'user rejected' })
          ),
          catchError((error) => of(loadCheckAuthFailure({ error })))
        )
      )
    )
  );

  checkAuthSucces$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadCheckAuthSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
}
