import React from 'react';

import { App, AppSeries } from 'rte-core';

import { InstallableAppView } from '../InstallableAppView';

import * as styles from './index.less';

export interface InstallableAppSeriesView {
  name: string;
  id: string;
  children: App[];
}

interface InstallableAppSeriesViewProps {
  data: AppSeries;
}

export const InstallableAppSeriesView = (
  props: InstallableAppSeriesViewProps,
): JSX.Element => {
  const appSeries = props.data;
  return (
    <div className={styles.productLineContainer}>
      <p className={styles.productLineName}>{appSeries.name}</p>
      <div className={styles.productList} id={appSeries.key}>
        {appSeries.apps.map(p => (
          <InstallableAppView app={p} key={p.key} />
        ))}
      </div>
    </div>
  );
};
