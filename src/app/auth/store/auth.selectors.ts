import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

const authFeatureSelector = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const isAuthCheckProcessing = createSelector(
  authFeatureSelector,
  (state) => state.processingAuth
);

export const loginProcessing = createSelector(
  authFeatureSelector,
  (state) => state.processingLogin
);
export const isAuthenticated = createSelector(
  authFeatureSelector,
  isAuthCheckProcessing,
  (state, isAuthCheckProcessing) => !!state.user // user auth = user variable & auth process completed
);

export const UserInfo = createSelector(
  authFeatureSelector,
  (state) => state.user
);
