import { Button, Descriptions, Divider, Input, Tabs } from 'antd';
import produce from 'immer';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { selectDir, updateLocalConfig } from '@/apis';
import { AppState } from '@/ducks';
import { commonActions } from '@/ducks/common';
import { PageHeader, history } from '@/skeleton';
import { LocalConfig } from 'rte-core';

import * as styles from './index.less';
// import * as S from 'ufc-schema';

export interface DeviceConfigProps extends RouteComponentProps {
  localConfig: LocalConfig;
}

export interface DeviceConfigState {
  isDirty: boolean;
  isEditing: boolean;
  localConfig: LocalConfig;
}

export class DeviceConfigComp extends React.PureComponent<
  DeviceConfigProps,
  DeviceConfigState
> {
  constructor(props: DeviceConfigProps) {
    super(props);

    this.state = {
      isDirty: false,
      isEditing: false,
      localConfig: props.localConfig,
    };
  }

  /** 保存到本地配置中 */
  onUpdatLocalConfig(onDraftModifier: (draft: LocalConfig) => void) {
    this.setState({
      isDirty: true,
      localConfig: produce(this.state.localConfig, onDraftModifier),
    });
  }

  onSaveLocalConfig = async () => {
    await updateLocalConfig(this.state.localConfig);

    // 将本地的 LocalConfig 保存
    this.setState({ isDirty: false });
  };

  /** 设备信息的配置 */
  renderDeviceInfo() {
    const { localConfig, isEditing } = this.state;

    console.log(localConfig);

    return (
      <div className={styles.info}>
        <Descriptions title="铭牌参数" column={1}>
          <Descriptions.Item label="设备厂商">联泰</Descriptions.Item>
          <Descriptions.Item label="设备型号">Lite600</Descriptions.Item>
          <Descriptions.Item label="设备编号">
            {isEditing ? (
              <Input
                value={localConfig.printer.code}
                onChange={e => {
                  this.onUpdatLocalConfig(draft => {
                    draft.printer.code = e.target.value;
                  });
                }}
              />
            ) : (
              localConfig.printer.code
            )}
          </Descriptions.Item>
          <Descriptions.Item label="设备名称">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="控制软件">
            <span>RSCON</span>
            <Divider type="vertical" />
            <span>{localConfig.ctrlAgentBaseDir || '尚未选择软件路径'}</span>
            <Button
              onClick={async () => {
                const paths = await selectDir();

                this.onUpdatLocalConfig(draft => {
                  draft.ctrlAgentBaseDir = paths[0];
                });
              }}
            >
              配置软件路径
            </Button>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="生产参数" column={1}>
          <Descriptions.Item label="使用材料">-</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }

  render() {
    const { isDirty } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <PageHeader
            title="设备配置"
            extra={
              <div style={{ marginRight: 16 }}>
                <Button
                  onClick={() => {
                    this.setState({ isEditing: true });
                  }}
                  style={{ marginRight: 16 }}
                >
                  编辑
                </Button>
                <Button disabled={!isDirty} onClick={this.onSaveLocalConfig}>
                  保存
                </Button>
              </div>
            }
            onBack={() => {
              history.push('/device');
            }}
          />

          <div className={styles.tabs}>
            <Tabs>
              <Tabs.TabPane tab="设备信息" key="info">
                {this.renderDeviceInfo()}
              </Tabs.TabPane>
              <Tabs.TabPane tab="网关配置" key="gateway" />
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export const DeviceConfig = connect(
  (_state: AppState) => ({
    localConfig: _state.common.localConfig,
  }),
  {
    loadLocalConfig: commonActions.loadLocalConfig,
  },
)(withRouter(DeviceConfigComp));
