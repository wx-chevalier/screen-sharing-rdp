import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
// import * as S from 'ufc-schema';

import { AppState } from '@/ducks';

import * as styles from './index.less';

export interface UfcCloudProps extends RouteComponentProps {}

export interface UfcCloudState {}

export class UfcCloudComp extends React.PureComponent<
  UfcCloudProps,
  UfcCloudState
> {
  constructor(props: UfcCloudProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.container}>
        <iframe
          src="http://cloud.unionfab.com/"
          className={styles.iframe}
          frameBorder={0}
        />
      </div>
    );
  }
}

export const UfcCloud = connect(
  (_state: AppState) => ({}),
  {},
)(withRouter(UfcCloudComp));
