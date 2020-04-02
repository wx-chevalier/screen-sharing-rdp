import cn from 'classnames';
import React from 'react';

import { i18nFormat } from '@/i18n';
import { StyleObject } from '@/skeleton';

import styles from './index.less';

export const ColoredLabel = ({
  children,
  className,
  ...restProps
}: {
  children: any;
  className?: string;
  [key: string]: any;
}) => (
  <span className={cn(className, styles.coloredLabel)} {...restProps}>
    {children}
  </span>
);

export interface TitleWrapperProps {
  label: any;
  highlight?: React.ReactNode;
  unit?: string;
  className?: string;
  style?: StyleObject;
}

export const TitleWrapper = ({
  label,
  highlight,
  unit,
  className,
  style,
}: TitleWrapperProps) => {
  return (
    <span className={cn(className, styles.titleWrapper)} style={style}>
      {label}
      {highlight !== undefined && highlight !== null ? ': ' : ''}
      <ColoredLabel>{highlight}</ColoredLabel>
      {unit && <span style={{ marginLeft: 4 }}>{unit}</span>}
    </span>
  );
};

export const EmptyPlaceholder = ({
  className,
  style,
}: {
  className?: string;
  style?: Record<string, string | number>;
}) => {
  return (
    <div className={cn(className, styles.emptyPlaceholder)} style={style}>
      {i18nFormat('暂无内容2')}
    </div>
  );
};
