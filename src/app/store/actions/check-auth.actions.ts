import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';

export const loadCheckAuth = createAction('[CheckAuth] Load CheckAuths');

export const loadCheckAuthSuccess = createAction(
  '[CheckAuth] Load CheckAuths Success',
  props<{ user: UserModel }>()
);

export const loadCheckAuthFailure = createAction(
  '[CheckAuth] Load CheckAuths Failure',
  props<{ error: string }>()
);
