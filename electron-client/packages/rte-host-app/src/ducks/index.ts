import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { ReducersMapObject, combineReducers } from 'redux';

import { IState as CommonState, reducer as commonReducer } from './common';

export interface AppState {
  common: CommonState;
}

export const configReducer = (partialReducers: ReducersMapObject = {}) => (
  history: History,
) =>
  combineReducers({
    common: commonReducer,

    router: connectRouter(history),
    ...partialReducers,
  });
