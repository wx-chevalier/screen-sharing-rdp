import * as React from 'react';
import { Redirect, Route } from 'react-router';

import { IAuthorityType } from './permissions';
import { Authorized } from './Authorized';

interface AuthorizedRoutePops {
  currentAuthority: string;
  component: React.ComponentClass<any, any>;
  render: (props: any) => React.ReactNode;
  redirectPath: string;
  authority: IAuthorityType;
}

export const AuthorizedRoute: React.SFC<AuthorizedRoutePops> = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={
      <Route
        {...rest}
        render={() => <Redirect to={{ pathname: redirectPath }} />}
      />
    }
  >
    <Route
      {...rest}
      render={(props: any) =>
        Component ? <Component {...props} /> : render(props)
      }
    />
  </Authorized>
);
