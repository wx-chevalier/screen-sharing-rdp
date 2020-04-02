import { createActions, handleActions } from 'redux-actions';
import { handle } from 'redux-pack-fsa';

import { getLocalConfig } from '@/apis';
import { LocalConfig } from 'rte-core';

export interface IState {
  localConfig: LocalConfig;
}

const initialState: IState = {
  localConfig: new LocalConfig(),
};

export const actions = createActions({
  async loadLocalConfig() {
    return getLocalConfig();
  },

  async error() {
    throw new Error('Error');
  },
});

export const commonActions = actions;

export const reducer = handleActions<IState, any>(
  {
    [actions.loadLocalConfig.toString()](state: IState, action) {
      const { payload } = action;

      return handle(state, action, {
        start: (prevState: IState) => ({
          ...prevState,
          isLoading: true,
        }),
        finish: (prevState: IState) => ({ ...prevState, isLoading: false }),
        success: (prevState: IState) => ({
          ...prevState,
          localConfig: payload,
        }),
      });
    },

    [actions.error.toString()](state: IState, action) {
      const { payload } = action;
      return handle(state, action, {
        failure: (prevState: IState) => ({ ...prevState, error: payload }),
      });
    },
  },
  initialState,
);
