import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';
import {
  AuthCheckFailedAction,
  AuthCheckSuccessAction,
  LoginFailedAction,
  LoginRequestedAction,
  LoginSuccessAction,
  TriggerAuthCheckAction,
} from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: UserModel | null;
  processingLogin: boolean;
  processingAuth: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  processingLogin: false,
  processingAuth: false,
  error: null,
};

export const Reducer = createReducer<AuthState, Action>(
  initialState,
  on(TriggerAuthCheckAction, (state) => ({
    ...state,
    processingAuth: true,
  })),
  on(AuthCheckSuccessAction, (state, action) => {
    return {
      ...state,
      user: { ...action.user },
      processingAuth: false,
      error: null,
    };
  }),
  on(AuthCheckFailedAction, (state, action) => ({
    ...state,
    processingAuth: false,
    user: null,
    error: action.error,
  })),
  on(LoginRequestedAction, (state, action) => ({
    ...state,
    processingLogin: true,
  })),
  on(LoginSuccessAction, (state, action) => ({
    ...state,
    processingLogin: false,
    user: action.user,
    error: null,
  })),
  on(LoginFailedAction, (state, action) => ({
    ...state,
    processingLogin: false,
    user: null,
    error: action.error,
  }))
);
