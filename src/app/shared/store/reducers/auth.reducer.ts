import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';
import {
  loadCheckAuths,
  loadCheckAuthsFailure,
  loadCheckAuthsSuccess,
} from '../actions/check-auth.actions';
import {
  loadSignInWithGoogles,
  loadSignInWithGooglesFailure,
  loadSignInWithGooglesSuccess,
} from '../actions/sign-in-with-google.actions';
import {
  loadSignOuts,
  loadSignOutsFailure,
  loadSignOutsSuccess,
} from '../actions/sign-out.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  user: UserModel | null;
  processingSignIn: boolean;
  error: string | null;
  processingSignOut: boolean;
}

export const initialState: State = {
  user: null,
  error: null,
  processingSignIn: false,
  processingSignOut: false,
};

export const reducer = createReducer<State, Action>(
  initialState,
  on(loadCheckAuths, (state) => ({ ...state })),
  on(loadCheckAuthsSuccess, (state, action) => ({
    ...state,
    user: action.user,
  })),
  on(loadCheckAuthsFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(loadSignInWithGoogles, (state) => ({ ...state, processingSignIn: true })),
  on(loadSignInWithGooglesSuccess, (state, action) => ({
    ...state,
    processingSignIn: false,
    user: action.user,
  })),
  on(loadSignInWithGooglesFailure, (state, action) => ({
    ...state,
    processingSignIn: false,
    error: action.error,
  })),
  on(loadSignOuts, (state) => ({
    ...state,
    processingSignOut: true,
  })),
  on(loadSignOutsSuccess, (state) => ({
    ...state,
    user: null,
    processingSignOut: false,
  })),
  on(loadSignOutsFailure, (state, action) => ({
    ...state,
    error: action.error,
    processingSignOut: false,
  }))
);
