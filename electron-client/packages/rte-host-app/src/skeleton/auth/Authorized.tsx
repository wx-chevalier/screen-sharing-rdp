import * as React from 'react';

import { IAuthorityType, checkPermissions } from './permissions';

interface AuthorizedProps {
  authority: IAuthorityType;
  noMatch?: React.ReactNode;
}

export const Authorized: React.FunctionComponent<AuthorizedProps> = ({
  children,
  authority,
  noMatch = null,
}) => {
  const childrenRender: React.ReactNode =
    typeof children === 'undefined' ? null : children;
  const dom = checkPermissions(authority, childrenRender, noMatch);
  return <>{dom}</>;
};
