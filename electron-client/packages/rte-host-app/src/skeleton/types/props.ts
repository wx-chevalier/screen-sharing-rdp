import { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

/**
 * Represents the base props of a `React` component;
 */
export interface BaseReactProps {
  /**
   * The class name of the component.
   */
  className?: string;
  style?: Record<string, string | number>;
  children?: ReactNode;
}

/**
 * Represents the base props of a `React` route component;
 */
export interface BaseReactRouteProps
  extends BaseReactProps,
    RouteComponentProps {}

declare const ButtonTypes: [
  'default',
  'primary',
  'ghost',
  'dashed',
  'danger',
  'link',
];
export declare type ButtonType = typeof ButtonTypes[number];
declare const ButtonShapes: ['circle', 'circle-outline', 'round'];
export declare type ButtonShape = typeof ButtonShapes[number];
declare const ButtonSizes: ['large', 'default', 'small'];
export declare type ButtonSize = typeof ButtonSizes[number];

export interface IButtonProps extends BaseReactProps {
  type?: ButtonType;
  icon?: string;
  shape?: ButtonShape;
  size?: ButtonSize;
  loading?:
    | boolean
    | {
        delay?: number;
      };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}
