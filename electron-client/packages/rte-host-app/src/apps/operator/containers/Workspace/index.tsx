import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { Toolbar } from '@/apps/home/components/Toolbar';
import { AppState } from '@/ducks';

import { UfcCloud } from '../UfcCloud';

import * as styles from './index.less';
// import * as S from 'ufc-schema';

export interface WorkspaceProps extends RouteComponentProps {}

export interface WorkspaceState {}

export class WorkspaceComp extends React.PureComponent<
  WorkspaceProps,
  WorkspaceState
> {
  constructor(props: WorkspaceProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.container}>
        <Toolbar>
          <div />
        </Toolbar>
        <UfcCloud />
      </div>
    );
  }
}

export const Workspace = connect(
  (_state: AppState) => ({}),
  {},
)(withRouter(WorkspaceComp));
