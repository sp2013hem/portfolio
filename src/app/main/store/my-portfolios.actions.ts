import { createAction, props } from '@ngrx/store';
import { Portfolio } from 'src/app/core/models/stocks.model';
import { type } from 'src/app/store/util.';

const TYPES = {
  MY_PORTFOLIO_REQUESTED: type('[Porfolio Page] My Porfolios Requested'),
  MY_PORTFOLIO_SUCCESS: type('[Porfolio Page] My Porfolios Succes'),
  MY_PORTFOLIO_FAILED: type('[Porfolio Page] My Porfolios Failed'),

  CREATE_PORTFOLIO_REQUESTED: type(
    '[Porfolio Page] Create Porfolios Requested'
  ),
  CREATE_PORTFOLIO_SUCCESS: type('[Porfolio Page] Create Porfolios Succes'),
  CREATE_PORTFOLIO_FAILED: type('[Porfolio Page] Create Porfolios Failed'),

  DELETE_PORTFOLIO_REQUESTED: type(
    '[Porfolio Page] Delete Porfolios Requested'
  ),
  DELETE_PORTFOLIO_SUCCESS: type('[Porfolio Page] Delete Porfolios Succes'),
  DELETE_PORTFOLIO_FAILED: type('[Porfolio Page] Delete Porfolios Failed'),
  EMPTY: type('EMPTY'),
};

export const RequestMyPortfolios = createAction(TYPES.MY_PORTFOLIO_REQUESTED);

export const MyPortfoliosSuccess = createAction(
  TYPES.MY_PORTFOLIO_SUCCESS,
  props<{ portfolios: Portfolio[]; error: null; processingPortfolios: false }>()
);

export const MyPortfoliosFailed = createAction(
  TYPES.MY_PORTFOLIO_FAILED,
  props<{ error: string; processingPortfolios: false }>()
);

export const RequestCreatePortfolio = createAction(
  TYPES.CREATE_PORTFOLIO_REQUESTED,
  props<{ payload: { isMain: boolean; name: string; caption: string } }>()
);

export const CreatePortfolioSuccess = createAction(
  TYPES.CREATE_PORTFOLIO_SUCCESS,
  props<{
    created: true;
    error: null;
    processingCreatePortfolio: false;
  }>()
);

export const CreatePortfolioFailed = createAction(
  TYPES.CREATE_PORTFOLIO_FAILED,
  props<{ created: false; error: string; processingCreatePortfolio: false }>()
);

export const RequestDeletePortfolio = createAction(
  TYPES.DELETE_PORTFOLIO_REQUESTED,
  props<{ uid: string; processingDelete?: true }>()
);

export const DeletePortfolioSuccess = createAction(
  TYPES.DELETE_PORTFOLIO_SUCCESS,
  props<{ uid: string; processingDelete: false }>()
);

export const DeletePortfolioFailed = createAction(
  TYPES.DELETE_PORTFOLIO_FAILED,
  props<{ error: string; processingDelete: false }>()
);
export const Empty = createAction(TYPES.EMPTY);
