import * as React from 'react';

import { checkIsInstantiation } from '../types/comp';

import { checkPermissions } from './permissions';

/**
 * 默认不能访问任何页面
 * default is "NULL"
 */
const Exception403 = () => 403;

/**
 * 用于判断是否拥有权限访问此 view 权限
 * authority 支持传入 string, () => boolean | Promise
 * e.g. 'user' 只有 user 用户能访问
 * e.g. 'user,admin' user 和 admin 都能访问
 * e.g. ()=>boolean 返回true能访问,返回false不能访问
 * e.g. Promise  then 能访问   catch不能访问
 * e.g. authority support incoming string, () => boolean | Promise
 * e.g. 'user' only user user can access
 * e.g. 'user, admin' user and admin can access
 * e.g. () => boolean true to be able to visit, return false can not be accessed
 * e.g. Promise then can not access the visit to catch
 * @param {string | function | Promise} authority
 * @param {ReactNode} error 非必需参数
 */
export const withAuth = (authority: string, error?: React.ReactNode) => {
  /**
   * conversion into a class
   * 防止传入字符串时找不到staticContext造成报错
   * String parameters can cause staticContext not found error
   */
  let classError: boolean | React.FunctionComponent = false;
  if (error) {
    classError = (() => error) as React.FunctionComponent;
  }

  if (!authority) {
    throw new Error('authority is required');
  }

  return function decideAuthority(
    target: React.ComponentClass | React.ReactNode,
  ) {
    const component = checkPermissions(
      authority,
      target,
      classError || Exception403,
    );
    return checkIsInstantiation(component);
  };
};
