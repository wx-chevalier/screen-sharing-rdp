import { Progress } from 'antd';
import React, { Component } from 'react';

import { App } from 'rte-core';

import { AppMgt } from '../../services/AppMgt';

import * as styles from './index.less';

const icons = {};

interface InstallableAppViewProps {
  app: App;
}

interface InstallableAppViewState {
  appMgt: AppMgt;
}

export class InstallableAppView extends Component<
  InstallableAppViewProps,
  InstallableAppViewState
> {
  constructor(props: InstallableAppViewProps) {
    super(props);

    this.state = {
      appMgt: new AppMgt(props.app),
    };
  }

  render() {
    const { appMgt } = this.state;

    const { downloading, downloadProgess } = appMgt;

    const { label, icon, isInstalled, hidden, order } = appMgt.app;

    if (hidden) {
      return null;
    }
    let button: JSX.Element;
    if (downloading) {
      button = (
        <div className={`${styles.productButton} ${styles.buttonDownloading}`}>
          <Progress
            percent={downloadProgess}
            showInfo={true}
            strokeWidth={18}
          />
        </div>
      );
    } else if (isInstalled) {
      button = (
        <div
          className={`${styles.productButton} ${styles.buttonRun}`}
          onClick={() => appMgt.run()}
        >
          <span>打开</span>
        </div>
      );
    } else if (!appMgt.app.url) {
      button = (
        <div className={`${styles.productButton} ${styles.buttonDisabled}`}>
          <span>即将上线</span>
        </div>
      );
    } else {
      button = (
        <div
          className={`${styles.productButton} ${styles.buttonDownload}`}
          onClick={() => appMgt.install()}
        >
          <span>安装</span>
        </div>
      );
    }

    return (
      <div className={styles.productContainer} style={{ order: order }}>
        <div
          className={styles.productIcon}
          style={{ backgroundImage: `url(${icons[icon]})` }}
          onClick={() => isInstalled && appMgt.run()}
        />
        <div className={styles.productName}>{label}</div>
        {button}
      </div>
    );
  }
}
