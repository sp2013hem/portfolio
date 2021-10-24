import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';

export const loadSignInWithGoogles = createAction(
  '[SignInWithGoogle] Load SignInWithGoogles'
);

export const loadSignInWithGooglesSuccess = createAction(
  '[SignInWithGoogle] Load SignInWithGoogles Success',
  props<{ user: UserModel }>()
);

export const loadSignInWithGooglesFailure = createAction(
  '[SignInWithGoogle] Load SignInWithGoogles Failure',
  props<{ error: string }>()
);
