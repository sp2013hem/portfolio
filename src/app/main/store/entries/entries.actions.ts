import { createAction, props } from '@ngrx/store';
import { Entry, EntryPayload } from 'src/app/core/models/stocks.model';
import { type } from 'src/app/store/util.';

const TYPES = {
  ENTRY_CREATION_REQUESTED: type('[Entries] Entries Creation Requested'),
  ENTRY_CREATION_SUCCESS: type('[Entries] Entries Success'),
  ENTRY_CREATION_FAILED: type('[Entries] Entries Failed'),
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
