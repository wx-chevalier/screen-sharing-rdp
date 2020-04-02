import { merge } from 'lodash';
import { useCallback, useState } from 'react';

import { DeepPartial } from '@/schema/helpers';

export const useLiteState = <T extends {}>(
  initialState?: T | (() => T),
): [T, (newState: DeepPartial<T>) => void] => {
  const [state, setState] = useState(initialState);
  const setLiteState = useCallback(
    (newState: DeepPartial<T> | null) => {
      if (newState == null) {
        setState(newState as null);
        return;
      }
      setState(merge({}, state, newState));
    },
    [state],
  );
  return [state, setLiteState];
};
