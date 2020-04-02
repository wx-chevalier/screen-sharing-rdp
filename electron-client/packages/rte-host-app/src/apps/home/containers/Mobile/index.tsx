import React from 'react';

import * as styles from './index.less';

export const Mobile = () => (
  <div className={styles.mobileContainer}>
    <div className={styles.qrcodeWrapper}>
      <div className={styles.qrcode} />
    </div>
  </div>
);
