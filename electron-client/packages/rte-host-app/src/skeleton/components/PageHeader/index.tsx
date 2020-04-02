import { PageHeader as AntdPageHeader } from 'antd';
import { PageHeaderProps as AntdPageHeaderProps } from 'antd/es/page-header';
import React from 'react';

import styles from './index.less';

export interface PageHeaderProps extends AntdPageHeaderProps {}

export function PageHeader(props: PageHeaderProps) {
  return (
    <div className={styles.container}>
      <AntdPageHeader {...props} />
    </div>
  );
}
