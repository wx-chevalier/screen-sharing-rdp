import { LeftOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import { ipcRenderer } from 'electron-better-ipc';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppState } from '@/ducks';
import { commonActions } from '@/ducks/common';
import { PageLoading, history } from '@/skeleton';
import { LocalConfig } from 'rte-core';

import { Menu } from '../../components/Menu';

import { menuConfigs } from './manifest';

import * as styles from './index.less';

export interface HomeProps extends RouteComponentProps {
  localConfig: LocalConfig;

  loadLocalConfig: () => void;
}

export interface HomeState {
  downloadProgress?: number;

  sideExpand: boolean;
}

export class HomeComp extends React.PureComponent<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      sideExpand: true,
    };

    ipcRenderer.on('update-download-progress', (_: any, percent: number) => {
      this.setState({
        downloadProgress: percent,
      });
    });
  }

  componentDidMount() {
    this.props.loadLocalConfig();
  }

  renderMask(): JSX.Element {
    const downloadProgress = this.state.downloadProgress;
    return (
      <div className={`${styles.updateMask} ${styles.flexContainer}`}>
        <p className={styles.updateTip}>当前版本过低，正在下载最新版...</p>
        <Progress percent={downloadProgress} strokeWidth={12} />
      </div>
    );
  }

  render() {
    const { location, localConfig } = this.props;
    const { downloadProgress, sideExpand } = this.state;

    // 默认跳转到软件管理的页面
    const currentPath =
      location.pathname === '/' ? '/software' : location.pathname;

    if (!localConfig || !localConfig.clientApp) {
      return (
        <div
          className={styles.container}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <PageLoading />
          <h3 style={{ marginTop: 16 }}>加载本地配置中</h3>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div
          className={
            sideExpand ? styles.appContainerExpand : styles.appContainerUnExpand
          }
        >
          <div className={styles.sideBar}>
            <div className={styles.logoBox}>
              <div
                className={sideExpand ? styles.logoExpand : styles.logoUnExpand}
              />
            </div>
            <Menu
              defaultKey={history.location.pathname}
              onSelect={path => history.push(String(path))}
            >
              {menuConfigs
                .filter(m => !m.menuProps.disabled)
                .map(m => {
                  const { icon, text } = m.menuProps;
                  const { path } = m.routeProps;
                  const isSelected = currentPath.startsWith(
                    m.routeProps.path as string,
                  );

                  return (
                    <Menu.Item key={path as string} isSelected={isSelected}>
                      <span
                        className={
                          sideExpand ? styles.iconExpand : styles.iconUnExpand
                        }
                      >
                        {icon}
                      </span>
                      <span
                        className={
                          sideExpand ? styles.textShow : styles.textHidden
                        }
                        style={{ marginLeft: 6 }}
                      >
                        {text}
                      </span>
                    </Menu.Item>
                  );
                })}
            </Menu>

            <div className={styles.version}>
              <div
                className={styles.sideExpand}
                onClick={() => this.setState({ sideExpand: !sideExpand })}
              >
                <LeftOutlined
                  className={
                    sideExpand ? styles.arrowExpand : styles.arrowUnExpand
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.content}>
            {menuConfigs.map(m => {
              const isSelected = currentPath.startsWith(
                m.routeProps.path as string,
              );

              return (
                <div
                  className={styles.subApp}
                  key={m.routeProps.path as string}
                  style={{
                    opacity: isSelected ? 1 : 0,
                    zIndex: isSelected ? 1 : -1,
                  }}
                >
                  <m.routeProps.component {...this.props} />
                </div>
              );
            })}
          </div>
          {downloadProgress ? this.renderMask() : null}
        </div>
      </div>
    );
  }
}

export const Home = connect(
  (_state: AppState) => ({
    localConfig: _state.common.localConfig,
  }),
  {
    loadLocalConfig: commonActions.loadLocalConfig,
  },
)(withRouter(HomeComp));
