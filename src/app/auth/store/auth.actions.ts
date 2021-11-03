import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';
import { type } from 'src/app/store/util.';

const TYPES = {
  TRIGGER_AUTH_CHECK: type('[Auth Page] Auth State Requested'),
  AUTH_CHECK_SUCCESS: type('[Auth Page] Auth State Succes'),
  AUTH_CHECK_FAILED: type('[Auth Page] Auth State Failed'),

  LOGIN_REQUESTED: type('[Auth Page] Login Requested'),
  LOGIN_SUCCESS: type('[Auth API] Login Successful'),
  AUTH_ERROR: type('[Auth API] Auth Error'),

  LOGOUT: type('[Auth Page] Logout'),
};

export const TriggerAuthCheckAction = createAction(TYPES.TRIGGER_AUTH_CHECK);

export const AuthCheckSuccessAction = createAction(
  TYPES.AUTH_CHECK_SUCCESS,
  props<{ user: UserModel; error: null; processingAuth: false }>()
);

export const AuthCheckFailedAction = createAction(
  TYPES.AUTH_CHECK_FAILED,
  props<{ user: null; error: string; processingAuth: false }>()
);

export const LoginRequestedAction = createAction(TYPES.LOGIN_REQUESTED);

export const LoginSuccessAction = createAction(
  TYPES.LOGIN_SUCCESS,
  props<{ processingLogin: false; user: UserModel; error: null }>()
);

export const LoginFailedAction = createAction(
  TYPES.AUTH_ERROR,
  props<{
    processingAuth: false;
    processingLogin: false;
    user: null;
    error: string;
  }>()
);

export const logoutAction = createAction(TYPES.LOGOUT);
