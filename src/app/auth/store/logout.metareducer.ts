import { ActionReducer, Action } from '@ngrx/store';
import { logoutAction } from './auth.actions';

export function logoutMetareducer(reducer: ActionReducer<any>) {
  return function (state: any, action: Action) {
    if (action.type === logoutAction.type) {
      return reducer(undefined, action);
    }

    return reducer(state, action);
  };
}
