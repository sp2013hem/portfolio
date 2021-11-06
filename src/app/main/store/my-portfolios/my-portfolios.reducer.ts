import { Action, createReducer, on } from '@ngrx/store';
import { Portfolio, TickerData } from 'src/app/core/models/stocks.model';
import {
  CreatePortfolioFailed,
  CreatePortfolioSuccess,
  DeletePortfolioFailed,
  DeletePortfolioSuccess,
  Empty,
  MyPortfoliosFailed,
  MyPortfoliosSuccess,
  RequestCreatePortfolio,
  RequestDeletePortfolio,
  RequestMyPortfolios,

} from './my-portfolios.actions';

export const PORTFOLIO_FEATURE_KEY = 'portfolio';

export interface PortfolioState {
  portfolios: Portfolio[] | null;
  processingPortfolios: boolean;
  processingCreatePortfolio: boolean;
  processingDelete: boolean;
  created: boolean;
  error: string | null;
}

export const initialState: PortfolioState = {
  portfolios: null,
  processingPortfolios: false,
  processingCreatePortfolio: false,
  processingDelete: false,
  created: false,
  error: null,
};

export const Reducer = createReducer<PortfolioState, Action>(
  initialState,
  on(RequestMyPortfolios, (state) => ({
    ...state,
    created: null,
    processingPortfolios: true,
  })),
  on(MyPortfoliosSuccess, (state, action) => {
    return {
      ...state,
      portfolios: [...action.portfolios],
      processingPortfolios: false,
      error: null,
    };
  }),
  on(MyPortfoliosFailed, (state, action) => ({
    ...state,
    processingPortfolios: false,
    portfolios: null,
    error: action.error,
  })),

  on(RequestCreatePortfolio, (state) => ({
    ...state,
    processingCreatePortfolio: true,
  })),
  on(CreatePortfolioSuccess, (state) => {
    return {
      ...state,
      created: true,
      processingCreatePortfolio: false,
      error: null,
    };
  }),
  on(CreatePortfolioFailed, (state, action) => ({
    ...state,
    processingCreatePortfolio: false,
    created: false,
    error: action.error,
  })),

  on(RequestDeletePortfolio, (state) => ({
    ...state,
    processingDelete: true,
  })),
  on(DeletePortfolioSuccess, (state, action) => {
    return {
      ...state,
      portfolios: state.portfolios.filter((d) => d.uid !== action.uid),
      processingDelete: false,
      error: null,
    };
  }),
  on(DeletePortfolioFailed, (state, action) => ({
    ...state,
    processingDelete: false,
    error: action.error,
  })),

  on(Empty, (state) => state)
);
