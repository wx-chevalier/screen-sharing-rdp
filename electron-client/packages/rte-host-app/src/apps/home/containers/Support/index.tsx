import { HeartOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { shell } from 'electron';
import React, { Component } from 'react';

import * as styles from './index.less';

interface SupportState {
  expandButton: boolean;
}

enum QQGroup {
  JL,
  SG,
}

export class Support extends Component<{}, SupportState> {
  state = {
    expandButton: false,
  };

  getQQ(group: QQGroup): string {
    const KEY = 'kefu_qq' + group;
    let qq = localStorage.getItem(KEY);
    if (!qq) {
      let qqList: string[] | null;
      switch (group) {
        case QQGroup.JL:
          qqList = ['3014437365'];
          break;
        case QQGroup.SG:
          qqList = ['79157865', '1007008187'];
          break;
        default:
          qqList = null;
      }
      if (!qqList || qqList.length === 0) {
        return '';
      }
      const randomIndex = Math.floor(Math.random() * qqList.length);
      qq = qqList[randomIndex];
      localStorage.setItem(KEY, qq);
    }
    return qq;
  }

  handleOpenQQ = (group: QQGroup): void => {
    const qq = this.getQQ(group);
    if (!qq) {
      alert('客服不在线');
      return;
    }
    console.log(qq);
    shell.openExternal(
      `http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`,
    );
  };

  render() {
    const { expandButton } = this.state;
    const sgc = expandButton
      ? classnames(styles.consultButton, styles.sgButton)
      : styles.consultButton;
    const jlc = styles.consultButton
      ? classnames(styles.consultButton, styles.jlButton)
      : styles.consultButton;
    return (
      <div className={styles.consultContainer}>
        <div className={styles.tips}>
          <ul className={styles.tipsList}>
            <li>
              <p>
                <HeartOutlined />
              </p>
            </li>
          </ul>
        </div>
        <div
          className={styles.openQq}
          onClick={() => this.setState({ expandButton: !expandButton })}
          style={{ opacity: expandButton ? 0.3 : 1 }}
        >
          <div className={styles.qqIcon} />
          <span>在线咨询</span>
        </div>
        <div className={sgc} onClick={() => this.handleOpenQQ(QQGroup.SG)}>
          QQ 1
        </div>
        <div className={jlc} onClick={() => this.handleOpenQQ(QQGroup.JL)}>
          QQ 2
        </div>
      </div>
    );
  }
}
