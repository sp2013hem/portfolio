import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, State } from '../reducers/auth.reducer';

const authFeatureSelector = createFeatureSelector<State>(AUTH_FEATURE_KEY);

export const getAuthUser = createSelector(
  authFeatureSelector,
  (state) => state.user
);

export const getAuthLoading = createSelector(
  authFeatureSelector,
  (state) => state.loading
);

export const getAuthError = createSelector(
  authFeatureSelector,
  (state) => state.error
);
