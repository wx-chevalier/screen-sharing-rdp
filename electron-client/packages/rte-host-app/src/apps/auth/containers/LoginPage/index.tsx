import cn from 'classnames';
import React from 'react';

import styles from './index.less';

export interface LoginPageProps {
  className?: string;
  style?: Record<string, string | number>;
}

export const LoginPage = ({ className, style }: LoginPageProps) => {
  return (
    <div className={cn(className, styles.container)} style={style}>
      LoginPage
    </div>
  );
};
