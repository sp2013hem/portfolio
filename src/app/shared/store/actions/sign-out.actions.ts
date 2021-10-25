import { createAction, props } from '@ngrx/store';

export const loadSignOuts = createAction(
  '[SignOut] Load SignOuts',
  props<{ processingSignOut: true }>()
);

export const loadSignOutsSuccess = createAction(
  '[SignOut] Load SignOuts Success',
  props<{ processingSignOut: true }>()
);

export const loadSignOutsFailure = createAction(
  '[SignOut] Load SignOuts Failure',
  props<{ processingSignOut: true; error: string }>()
);
