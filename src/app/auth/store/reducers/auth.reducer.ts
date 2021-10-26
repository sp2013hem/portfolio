import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';
import {
  loadCheckAuth,
  loadCheckAuthFailure,
  loadCheckAuthSuccess,
} from '../actions/check-auth.actions';
import {
  loadSignInWithGoogle,
  loadSignInWithGoogleFailure,
  loadSignInWithGoogleSuccess,
} from '../actions/sign-in-with-google.actions';
import {
  loadSignOut,
  loadSignOutFailure,
  loadSignOutSuccess,
} from '../actions/sign-out.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: UserModel | null;
  processingSignIn: boolean;
  error: string | null;
  processingSignOut: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  processingSignIn: false,
  processingSignOut: false,
};

export const authReducer = createReducer<AuthState, Action>(
  initialState,
  on(loadCheckAuth, (state) => ({ ...state })),
  on(loadCheckAuthSuccess, (state, action) => ({
    ...state,
    user: action.user,
  })),
  on(loadCheckAuthFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(loadSignInWithGoogle, (state) => ({ ...state, processingSignIn: true })),
  on(loadSignInWithGoogleSuccess, (state, action) => ({
    ...state,
    processingSignIn: false,
    user: action.user,
  })),
  on(loadSignInWithGoogleFailure, (state, action) => ({
    ...state,
    processingSignIn: false,
    error: action.error,
  })),
  on(loadSignOut, (state) => ({
    ...state,
    processingSignOut: true,
  })),
  on(loadSignOutSuccess, (state) => ({
    ...state,
    user: null,
    processingSignOut: false,
  })),
  on(loadSignOutFailure, (state, action) => ({
    ...state,
    error: action.error,
    processingSignOut: false,
  }))
);
