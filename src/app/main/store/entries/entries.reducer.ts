import { Actions } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import { Entry, EntryPayload } from 'src/app/core/models/stocks.model';
import {
  EntriesCreatedFailed,
  EntriesCreatedRequested,
  EntriesCreatedSuccess,
  EntriesDeleteFailed,
  EntriesDeleteRequested,
  EntriesDeleteSuccess,
  EntriesEditFailed,
  EntriesEditRequested,
  EntriesEditSuccess,
  GetEntriesFailed,
  GetEntriesRequest,
  GetEntriesSuccess,
} from './entries.actions';

export const ENTRIES_FEATURE_KEY = 'entries';

export interface EntriesState {
  processingAddEntry: boolean;
  processingEditEntry: boolean;
  error: string | null;
  entries: Entry[];
  getError: string | null;
  processingEntries: boolean;
  deleted: boolean;
  processingDeleteEntry: boolean;
  created: boolean;
  edited: boolean;
  pid: string | null;
}

export const initialState: EntriesState = {
  processingAddEntry: false,
  processingEditEntry: false,
  processingEntries: true,
  error: null,
  created: false,
  edited: false,
  entries: [],
  getError: null,
  pid: null,
  deleted: false,
  processingDeleteEntry: false,
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

  on(EntriesEditRequested, (state) => ({
    ...state,
    processingEditEntry: true,
  })),
  on(EntriesEditSuccess, (state, action) => {
    const entries = state.entries.map((entry) => {
      if (entry.uid === action.updatedEntry.uid)
        entry = { ...entry, ...action.updatedEntry };

      return entry;
    });
    return {
      ...state,
      entries,
      edited: action.edited,
      processingEditEntry: false,
      error: null,
    };
  }),
  on(EntriesEditFailed, (state, action) => ({
    ...state,
    processingEditEntry: false,
    error: action.error,
    edited: action.edited,
  })),

  on(EntriesDeleteRequested, (state) => ({
    ...state,
    processingDeleteEntry: true,
  })),
  on(EntriesDeleteSuccess, (state, action) => {
    const entries = state.entries.filter((entry) => entry.uid !== action.uid);
    return {
      ...state,
      entries,
      deleted: action.deleted,
      processingDeleteEntry: false,
      error: null,
    };
  }),
  on(EntriesDeleteFailed, (state, action) => ({
    ...state,
    processingDeleteEntry: false,
    error: action.error,
    deleted: action.deleted,
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
