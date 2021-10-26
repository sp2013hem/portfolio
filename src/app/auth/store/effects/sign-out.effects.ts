import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  loadSignOut,
  loadSignOutFailure,
  loadSignOutSuccess,
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
      ofType(loadSignOut),
      mergeMap(() =>
        this.authService.signOutWithGoogle().pipe(
          map(() => loadSignOutSuccess({ processingSignOut: true })),
          catchError((error) =>
            of(loadSignOutFailure({ processingSignOut: true, error }))
          )
        )
      )
    )
  );

  signOutWithGoogleSucces$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadSignOutSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
