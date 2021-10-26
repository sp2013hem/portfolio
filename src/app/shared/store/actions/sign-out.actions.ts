import { createAction, props } from '@ngrx/store';

export const loadSignOut = createAction(
  '[SignOut] Load SignOuts',
  props<{ processingSignOut: true }>()
);

export const loadSignOutSuccess = createAction(
  '[SignOut] Load SignOuts Success',
  props<{ processingSignOut: true }>()
);

export const loadSignOutFailure = createAction(
  '[SignOut] Load SignOuts Failure',
  props<{ processingSignOut: true; error: string }>()
);
