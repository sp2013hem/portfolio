import { Actions } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import { Entry, EntryPayload } from 'src/app/core/models/stocks.model';
import {
  EntriesCreatedFailed,
  EntriesCreatedRequested,
  EntriesCreatedSuccess,
  GetEntriesFailed,
  GetEntriesRequest,
  GetEntriesSuccess,
} from './entries.actions';

export const ENTRIES_FEATURE_KEY = 'entries';

export interface EntriesState {
  processingAddEntry: boolean;
  error: string | null;
  entries: Entry[];
  getError: string | null;
  processingEntries: boolean;
  created: boolean;
  pid: string | null;
}

export const initialState: EntriesState = {
  processingAddEntry: false,
  processingEntries: true,
  error: null,
  created: false,
  entries: [],
  getError: null,
  pid: null,
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
  })),
  on(GetEntriesRequest, (state, action) => ({
    ...state,
    processingEntries: true,
    pid: action.pid,
  })),
  on(GetEntriesSuccess, (state, action) => {
    return {
      ...state,
      entries: [...action.entries],
      processingEntries: false,
      getError: null,
    };
  }),
  on(GetEntriesFailed, (state, action) => ({
    ...state,
    processingEntries: false,
    getError: null,
    error: action.getError,
  }))
);
