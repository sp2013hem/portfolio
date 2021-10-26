import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';

export const loadSignInWithGoogle = createAction(
  '[SignInWithGoogle] Load SignInWithGoogles',
  props<{ processingSignIn: true }>()
);

export const loadSignInWithGoogleSuccess = createAction(
  '[SignInWithGoogle] Load SignInWithGoogles Success',
  props<{ processingSignIn: false; user: UserModel }>()
);

export const loadSignInWithGoogleFailure = createAction(
  '[SignInWithGoogle] Load SignInWithGoogles Failure',
  props<{ processingSignIn: false; error: string }>()
);
