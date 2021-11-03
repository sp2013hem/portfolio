import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
} from '@ngrx/store';
import {
  AuthMetareducers,
  AuthReducer,
  AuthState,
  AUTH_FEATURE_KEY,
} from '../auth/store';

export interface AppState {
  [AUTH_FEATURE_KEY]: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  [AUTH_FEATURE_KEY]: AuthReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [AuthMetareducers];
