import { Button, Result } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import * as S from 'ufc-schema';

import { AppState } from '@/ducks';
import { PageHeader, history } from '@/skeleton';
import { LocalConfig } from 'rte-core';

import * as styles from './index.less';

export interface DeviceOperationProps extends RouteComponentProps {
  localConfig: LocalConfig;
}

export interface DeviceOperationState {}

export class DeviceOperationComp extends React.PureComponent<
  DeviceOperationProps,
  DeviceOperationState
> {
  constructor(props: DeviceOperationProps) {
    super(props);

    this.state = {};
    console.log(S);
  }

  /** 渲染空白配置 */
  renderEmpty() {
    return (
      <Result
        title="该设备尚未配置"
        extra={
          <Button
            type="primary"
            key="console"
            onClick={() => {
              history.push('/device/config');
            }}
          >
            点击前往配置
          </Button>
        }
      />
    );
  }

  /** 渲染实时设备状态 */
  renderDeviceStatus() {
    const { localConfig } = this.props;

    return (
      <div className={styles.status}>
        <PageHeader
          title={
            localConfig.printer.name || localConfig.printer.code || '设备状态'
          }
        />
      </div>
    );
  }

  render() {
    const { localConfig } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.body}>
          {localConfig && localConfig.hasPrinterConfigured
            ? this.renderDeviceStatus()
            : this.renderEmpty()}
        </div>
      </div>
    );
  }
}

export const DeviceOperation = connect(
  (_state: AppState) => ({ localConfig: _state.common.localConfig }),
  {},
)(withRouter(DeviceOperationComp));
