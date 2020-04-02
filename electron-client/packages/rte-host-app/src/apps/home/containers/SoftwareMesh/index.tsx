import React, { Component } from 'react';

import { AppSeries } from 'rte-core';

import { InstallableAppSeriesView } from '../../components/InstallableAppSeriesView';

import * as styles from './index.less';

interface SoftwareMeshProps {}

export class SoftwareMesh extends Component<SoftwareMeshProps, {}> {
  componentDidMount() {}

  render() {
    return (
      <div className={styles.homeContainer}>
        <div className={styles.banner}>
          <div className={styles.slogonBig}>
            <p>简单、易操作</p>
            <p>生成文件全面、清晰</p>
            <p>智能查错</p>
          </div>
          <div className={styles.slogonSmall}>
            <p>专用工具软件，兼容性强，支持XP/WIN7/WIN8/WIN10环境下运行。</p>
          </div>
        </div>
        <div className={styles.tools}>
          {[].map((pl: AppSeries) => (
            <InstallableAppSeriesView data={pl} key={pl.name} />
          ))}
        </div>
      </div>
    );
  }
}
