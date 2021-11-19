import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Entry } from 'src/app/core/models/stocks.model';
import { MainState } from '../../main.module';

import { ENTRIES_FEATURE_KEY } from './entries.reducer';

const featureSelector = createFeatureSelector<MainState>('main');

export const entriesFeatureSelector = createSelector(
  featureSelector,
  (state) => state[ENTRIES_FEATURE_KEY]
);

export const entryCreated = createSelector(
  entriesFeatureSelector,
  (state) => state.created
);

export const entries = createSelector(entriesFeatureSelector, (state) => {
  const groupedByTicker = groupedBy(state.entries, 'ticker');
  const summary = Object.keys(groupedByTicker).map((ticker) =>
    getSummaryOfEntries(groupedByTicker[ticker])
  );
  return summary;
});

export const searchProcessing = createSelector(
  entriesFeatureSelector,
  (state) => state.processingAddEntry
);

export const processingEntries = createSelector(
  entriesFeatureSelector,
  (state) => state.processingEntries
);

const groupedBy = function <T>(data: T, by: string): Record<string, T> {
  const store = {};
  data.forEach((d) => {
    if (!store[d[by]]) {
      store[d[by]] = [];
    }
    store[d[by]].push(d);
  });
  return store;
};

const getSummaryOfEntries = function (data: Entry[]): Entry | null {
  const buys = data.filter((d) => d.type === 'BUY');
  const sells = data.filter((d) => d.type === 'SELL');

  const buyTotalQty = buys.reduce((a, c) => a + c.quantity, 0);
  const buyTotalCost = buys.reduce(
    (a, c) => a + c.price * c.quantity - c.fees,
    0
  );
  const buyTotal = buyTotalCost / buyTotalQty;

  const sellTotalQty = sells.reduce((a, c) => a + c.quantity, 0);
  const sellTotalCost = sells.reduce(
    (a, c) => a + c.price * c.quantity - c.fees,
    0
  );
  const quantity = buyTotalQty - sellTotalQty;
  if (quantity === 0) {
    // remaining
    const sellTotal = sellTotalCost / sellTotalQty;
    const profit = sellTotal - buyTotal;
    const currentWorth = 0;
    return { ...data[0], quantity, profit, currentWorth };
  } else {
    const currentWorth = data[0].currentPrice * quantity;
    const profit = currentWorth - buyTotalCost;
    return { ...data[0], quantity, profit, currentWorth };
  }
};
