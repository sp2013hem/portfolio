import { createAction, props } from '@ngrx/store';
import { TickerData, TickerSearchResult } from 'src/app/core/models/stocks.model';
import { type } from 'src/app/store/util.';

const TYPES = {
  SEARCH_STOCKS_REQUESTED: type('[Porfolio Page] Search Stocks Requested'),
  SEARCH_STOCKS_SUCCESS: type('[Porfolio Page] Search Stocks Succes'),
  SEARCH_STOCKS_FAILED: type('[Porfolio Page] Search Stocks Failed'),
};

export const SearchStocksRequested = createAction(
  TYPES.SEARCH_STOCKS_REQUESTED,
  props<{ key: string; processingSearch?: true }>()
);
export const SearchStocksSucces = createAction(
  TYPES.SEARCH_STOCKS_SUCCESS,
  props<{
    processingSearch: false;
    searchError: null;
    stocks: TickerSearchResult[];
  }>()
);
export const SearchStocksFailed = createAction(
  TYPES.SEARCH_STOCKS_FAILED,
  props<{ processingSearch: false; searchError: string }>()
);
