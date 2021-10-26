import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from '../reducers/auth.reducer';

const authFeatureSelector = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const getAuthUser = createSelector(
  authFeatureSelector,
  (state) => state.user
);

export const getAuthSignInLoading = createSelector(
  authFeatureSelector,
  (state) => state.processingSignIn
);

export const getAuthError = createSelector(
  authFeatureSelector,
  (state) => state.error
);

export const getSignOutLoading = createSelector(
  authFeatureSelector,
  (state) => state.processingSignOut
);
