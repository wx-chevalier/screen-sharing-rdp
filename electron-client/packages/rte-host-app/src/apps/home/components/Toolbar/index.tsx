import React from 'react';

import * as styles from './index.less';

export const Toolbar = (props: any) => {
  return <div className={styles.toolbarContainer}>{props.children}</div>;
};
