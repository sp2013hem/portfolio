import { Action, createReducer, on } from '@ngrx/store';
import { Entry, EntryPayload } from 'src/app/core/models/stocks.model';
import {
  EntriesCreatedFailed,
  EntriesCreatedRequested,
  EntriesCreatedSuccess,
} from './entries.actions';

export const ENTRIES_FEATURE_KEY = 'entries';

export interface EntriesState {
  processingAddEntry: boolean;
  error: string | null;
  // payload: EntryPayload | null;
  created: boolean;
}

export const initialState: EntriesState = {
  processingAddEntry: false,
  error: null,
  created: false,
  // payload: null,
};

export const Reducer = createReducer<EntriesState, Action>(
  initialState,
  on(EntriesCreatedRequested, (state) => ({
    ...state,
    processingAddEntry: true,
  })),
  on(EntriesCreatedSuccess, (state, action) => {
    return {
      ...state,
      created: action.created,
      processingAddEntry: false,
      error: null,
    };
  }),
  on(EntriesCreatedFailed, (state, action) => ({
    ...state,
    processingAddEntry: false,
    error: action.error,
    created: action.created,
  }))
);
