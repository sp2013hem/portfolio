import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MainState } from '../../main.module';

import { PORTFOLIO_FEATURE_KEY } from './my-portfolios.reducer';

const featureSelector = createFeatureSelector<MainState>('main');

export const portfolioFeatureSelector = createSelector(
  featureSelector,
  (state) => state[PORTFOLIO_FEATURE_KEY]
);

export const Portfolios = createSelector(
  portfolioFeatureSelector,
  (state) => state.portfolios
);

export const CreatedPortfolio = createSelector(
  portfolioFeatureSelector,
  (state) => state.created
);

export const isAuthCheckProcessing = createSelector(
  portfolioFeatureSelector,
  (state) => state.processingPortfolios
);
export const processingMyPortfolios = createSelector(
  portfolioFeatureSelector,
  (state) => state.processingPortfolios
);

export const processingCreatePortfolio = createSelector(
  portfolioFeatureSelector,
  (state) => state.processingCreatePortfolio
);

export const processingDeletePortfolio = createSelector(
  portfolioFeatureSelector,
  (state) => state.processingDelete
);
