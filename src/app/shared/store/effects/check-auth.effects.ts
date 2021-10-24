import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import {
  loadCheckAuths,
  loadCheckAuthsFailure,
  loadCheckAuthsSuccess,
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
      ofType(loadCheckAuths),
      mergeMap(() =>
        this.authService.checkAuth().pipe(
          map((user) =>
            user
              ? loadCheckAuthsSuccess({ user })
              : loadCheckAuthsFailure({ error: 'user rejected' })
          ),
          catchError((error) => of(loadCheckAuthsFailure({ error })))
        )
      )
    )
  );

  checkAuthSucces$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadCheckAuthsSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
}
