import cn from 'classnames';
import React from 'react';

import styles from './index.less';

export interface CopyrightProps {
  className?: string;
  style?: Record<string, string | number>;
}

export const Copyright = ({ className, style }: CopyrightProps) => {
  return (
    <div className={cn(className, styles.container)} style={style}>
      © 2019-2020 Unionfab 版权所有
      <span style={{ marginLeft: 16 }}>
        ICP 证：
        <a href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action">
          沪ICP备17023219号
        </a>
      </span>
    </div>
  );
};
