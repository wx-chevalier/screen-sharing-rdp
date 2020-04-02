import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import * as S from 'ufc-schema';

import { AppState } from '@/ducks';

import * as styles from './index.less';

export interface WorkOrderMeshProps extends RouteComponentProps {}

export interface WorkOrderMeshState {}

export class WorkOrderMeshComp extends React.PureComponent<
  WorkOrderMeshProps,
  WorkOrderMeshState
> {
  constructor(props: WorkOrderMeshProps) {
    super(props);

    this.state = {};
    console.log(S);
  }

  render() {
    return <div className={styles.container}>WorkOrderMesh</div>;
  }
}

export const WorkOrderMesh = connect(
  (_state: AppState) => ({}),
  {},
)(withRouter(WorkOrderMeshComp));
