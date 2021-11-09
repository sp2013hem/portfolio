import { createAction, props } from '@ngrx/store';
import { Entry, EntryPayload } from 'src/app/core/models/stocks.model';
import { type } from 'src/app/store/util.';

const TYPES = {
  ENTRY_CREATION_REQUESTED: type('[Entries] Entries Creation Requested'),
  ENTRY_CREATION_SUCCESS: type('[Entries] Entries Success'),
  ENTRY_CREATION_FAILED: type('[Entries] Entries Failed'),

  GET_ENTRIES_REQUESTED: type('[Entries Page] Get Entriess Requested'),
  GET_ENTRIES_SUCCESS: type('[Entries Page] Get Entriess Succes'),
  GET_ENTRIES_FAILED: type('[Entries Page] Get Entriess Failed'),
};

export const EntriesCreatedRequested = createAction(
  TYPES.ENTRY_CREATION_REQUESTED,
  props<{ payload: EntryPayload; pid: string }>()
);
export const EntriesCreatedSuccess = createAction(
  TYPES.ENTRY_CREATION_SUCCESS,
  props<{ created: true; processingAddEntry: false }>()
);
export const EntriesCreatedFailed = createAction(
  TYPES.ENTRY_CREATION_FAILED,
  props<{ created: false; error: string; processingAddEntry: false }>()
);

export const GetEntriesRequest = createAction(
  TYPES.GET_ENTRIES_REQUESTED,
  props<{ pid: string }>()
);

export const GetEntriesSuccess = createAction(
  TYPES.GET_ENTRIES_SUCCESS,
  props<{ entries: Entry[]; getError: null; processingEntries: false }>()
);

export const GetEntriesFailed = createAction(
  TYPES.GET_ENTRIES_FAILED,
  props<{ getError: string; processingEntries: false }>()
);
