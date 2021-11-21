import { createAction, props } from '@ngrx/store';
import { Entry, EntryPayload } from 'src/app/core/models/stocks.model';
import { type } from 'src/app/store/util.';

const TYPES = {
  ENTRY_CREATION_REQUESTED: type('[Entries] Entry Creation Requested'),
  ENTRY_CREATION_SUCCESS: type('[Entries] Entry Success'),
  ENTRY_CREATION_FAILED: type('[Entries] Entry Failed'),

  ENTRY_EDIT_REQUESTED: type('[Entries] Entry Edit Requested'),
  ENTRY_EDIT_SUCCESS: type('[Entries] Entry Edit Success'),
  ENTRY_EDIT_FAILED: type('[Entries] Entry Edit Failed'),

  ENTRY_DELETE_REQUESTED: type('[Entries] Entry Delete Requested'),
  ENTRY_DELETE_SUCCESS: type('[Entries] Entry Delete Success'),
  ENTRY_DELETE_FAILED: type('[Entries] Entry Delete Failed'),

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

export const EntriesEditRequested = createAction(
  TYPES.ENTRY_EDIT_REQUESTED,
  props<{ payload: EntryPayload; pid: string; eid: string }>()
);
export const EntriesEditSuccess = createAction(
  TYPES.ENTRY_EDIT_SUCCESS,
  props<{
    updatedEntry: EntryPayload & { uid: string };
    edited: true;
    processingEditEntry: false;
  }>()
);
export const EntriesEditFailed = createAction(
  TYPES.ENTRY_EDIT_FAILED,
  props<{ edited: false; error: string; processingEditEntry: false }>()
);

export const EntriesDeleteRequested = createAction(
  TYPES.ENTRY_DELETE_REQUESTED,
  props<{ pid: string; eid: string }>()
);
export const EntriesDeleteSuccess = createAction(
  TYPES.ENTRY_DELETE_SUCCESS,
  props<{
    deleted: true;
    processingDeleteEntry: false;
    uid: string;
  }>()
);
export const EntriesDeleteFailed = createAction(
  TYPES.ENTRY_DELETE_FAILED,
  props<{ deleted: false; error: string; processingDeleteEntry: false }>()
);
