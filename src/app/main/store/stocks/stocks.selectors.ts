import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MainState } from '../../main.module';

import { STOCKS_FEATURE_KEY } from './stocks.reducer';

const featureSelector = createFeatureSelector<MainState>('main');

export const stocksFeatureSelector = createSelector(
  featureSelector,
  (state) => state[STOCKS_FEATURE_KEY]
);

export const stocks = createSelector(
  stocksFeatureSelector,
  (state) => state.stocks
);

export const searchProcessing = createSelector(
  stocksFeatureSelector,
  (state) => state.processingSearch
);
