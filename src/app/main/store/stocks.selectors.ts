import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState, PORTFOLIO_FEATURE_KEY } from './stocks.reducer';

const portfolioFeatureSelector = createFeatureSelector<PortfolioState>(
  PORTFOLIO_FEATURE_KEY
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

export const Portfolios = createSelector(
  portfolioFeatureSelector,
  (state) => state.portfolios
);

export const CreatedPortfolio = createSelector(
  portfolioFeatureSelector,
  (state) => state.created
);
