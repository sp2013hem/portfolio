import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import {
  loadSignOuts,
  loadSignOutsFailure,
  loadSignOutsSuccess,
} from '../actions/sign-out.actions';

@Injectable()
export class SignOutEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  signOutWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSignOuts),
      mergeMap(() =>
        this.authService.signOutWithGoogle().pipe(
          map(() => loadSignOutsSuccess({ processingSignOut: true })),
          catchError((error) =>
            of(loadSignOutsFailure({ processingSignOut: true, error }))
          )
        )
      )
    )
  );

  signOutWithGoogleSucces$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadSignOutsSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
