import * as PortfolioActions from './my-portfolios/my-portfolios.actions';
import * as PortfolioSelectors from './my-portfolios/my-portfolios.selectors';
import {
  Reducer as PortfolioReducer,
  PORTFOLIO_FEATURE_KEY,
  PortfolioState,
} from './my-portfolios/my-portfolios.reducer';
import { Effects as PortfolioEffects } from './my-portfolios/my-portfolios.effects';

import * as StocksActions from './stocks/stocks.actions';
import * as StocksSelectors from './stocks/stocks.selectors';
import {
  Reducer as StocksReducer,
  STOCKS_FEATURE_KEY,
  StocksState,
} from './stocks/stocks.reducer';
import { Effects as StocksEffects } from './stocks/stocks.effects';

import * as EntriesActions from './entries/entries.actions';
import * as EntriesSelectors from './entries/entries.selectors';
import {
  Reducer as EntriesReducer,
  ENTRIES_FEATURE_KEY,
  EntriesState,
} from './entries/entries.reducer';
import { Effects as EntriesEffects } from './entries/entries.effects';

export {
  PortfolioActions,
  PortfolioSelectors,
  PORTFOLIO_FEATURE_KEY,
  PortfolioState,
  PortfolioEffects,
  PortfolioReducer,
  StocksActions,
  StocksSelectors,
  STOCKS_FEATURE_KEY,
  StocksState,
  StocksEffects,
  StocksReducer,
  EntriesActions,
  EntriesSelectors,
  ENTRIES_FEATURE_KEY,
  EntriesState,
  EntriesEffects,
  EntriesReducer,
};
