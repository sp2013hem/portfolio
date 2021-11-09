import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MainState } from '../../main.module';

import { ENTRIES_FEATURE_KEY } from './entries.reducer';

const featureSelector = createFeatureSelector<MainState>('main');

export const entriesFeatureSelector = createSelector(
  featureSelector,
  (state) => state[ENTRIES_FEATURE_KEY]
);

export const entries = createSelector(
  entriesFeatureSelector,
  (state) => state.created
);

export const searchProcessing = createSelector(
  entriesFeatureSelector,
  (state) => state.processingAddEntry
);
