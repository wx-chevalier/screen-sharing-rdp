import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';

import { LoginPage } from '@/apps/auth/containers/LoginPage';
import { Home } from '@/apps/home/containers/Home';
import { Exception403 } from '@/skeleton';

export interface IAppProps extends RouteComponentProps {}

export interface IAppState {}

export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route exact={true} path="/auth/login" component={LoginPage} />
        <Route exact={true} path="/403" component={() => <Exception403 />} />
        <Route path="/" component={Home} />
      </Switch>
    );
  }
}

export default connect(_state => ({}), {})(withRouter(App));
