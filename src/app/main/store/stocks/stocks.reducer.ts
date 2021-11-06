import { Action, createReducer, on } from '@ngrx/store';
import { TickerSearchResult } from 'src/app/core/models/stocks.model';
import {
  SearchStocksFailed,
  SearchStocksRequested,
  SearchStocksSucces,
} from './stocks.actions';

export const STOCKS_FEATURE_KEY = 'stocks';

export interface StocksState {
  processingSearch: boolean;
  searchError: string | null;
  stocks: TickerSearchResult[];
}

export const initialState: StocksState = {
  processingSearch: false,
  searchError: null,
  stocks: [],
};

export const Reducer = createReducer<StocksState, Action>(
  initialState,
  on(SearchStocksRequested, (state) => ({
    ...state,
    processingSearch: true,
  })),
  on(SearchStocksSucces, (state, action) => {
    return {
      ...state,
      stocks: [...action.stocks],
      processingSearch: false,
      searchError: null,
    };
  }),
  on(SearchStocksFailed, (state, action) => ({
    ...state,
    processingSearch: false,
    searchError: action.searchError,
  }))
);
