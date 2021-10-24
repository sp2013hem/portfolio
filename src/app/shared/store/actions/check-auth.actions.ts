import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';

export const loadCheckAuths = createAction('[CheckAuth] Load CheckAuths');

export const loadCheckAuthsSuccess = createAction(
  '[CheckAuth] Load CheckAuths Success',
  props<{ user: UserModel }>()
);

export const loadCheckAuthsFailure = createAction(
  '[CheckAuth] Load CheckAuths Failure',
  props<{ error: string }>()
);
