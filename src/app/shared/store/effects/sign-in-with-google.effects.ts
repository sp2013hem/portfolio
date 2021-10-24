import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import {
  loadSignInWithGoogles,
  loadSignInWithGooglesFailure,
  loadSignInWithGooglesSuccess,
} from '../actions/sign-in-with-google.actions';

@Injectable()
export class SignInWithGoogleEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  signInWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSignInWithGoogles),
      mergeMap(() =>
        this.authService.signInWithGoogle().pipe(
          map((user) =>
            user
              ? loadSignInWithGooglesSuccess({ user })
              : loadSignInWithGooglesFailure({ error: 'login failed' })
          ),
          catchError((error) => of(loadSignInWithGooglesFailure({ error })))
        )
      )
    )
  );

  signInWithGoogleSucces$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadSignInWithGooglesSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
}
