import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';

import { AppState } from '@/ducks';

import { DeviceConfig } from '../DeviceConfig';
import { DeviceOperation } from '../DeviceOperation';

import * as styles from './index.less';

export interface DeviceHomeProps extends RouteComponentProps {}

export interface DeviceHomeState {}

export class DeviceHomeComp extends React.PureComponent<
  DeviceHomeProps,
  DeviceHomeState
> {
  constructor(props: DeviceHomeProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <Switch>
            <Route
              key="device-config"
              path="/device/config"
              exact={true}
              component={DeviceConfig}
            />
            <Route
              key="device-operation"
              path="/device"
              component={DeviceOperation}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export const DeviceHome = connect(
  (_state: AppState) => ({}),
  {},
)(withRouter(DeviceHomeComp));
