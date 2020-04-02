import { ipcRenderer } from 'electron';

import { callMain } from '@/apis';
import { App, IpcEvent } from 'rte-core';

/** App 管理器，用来判断某个 App 是否已经安装、安装地址等信息 */
export class AppMgt {
  downloadProgess = 0;

  downloading = false;

  constructor(public app: App) {
    // 安装完毕后，缓存好 Installer 的地址
    ipcRenderer.on(`get-installer-${this.key}`, (_event: any, path: string) => {
      localStorage.setItem(`installer-${this.key}`, path);
    });
  }

  get key() {
    return this.app.key;
  }

  setProgress = (_: any, percent: number) => {
    if (percent >= 100 || percent < 0) {
      this.downloading = false;
      this.downloadProgess = 0;
    } else {
      this.downloading = true;
      this.downloadProgess = percent;
    }
  };

  async getLocation(): Promise<string> {
    if (this.app.location) {
      return this.app.location;
    }

    const location = await callMain(
      'search-app-location',
      new IpcEvent({ app: this.app }),
    );

    this.app.location = location;
  }

  async run(): Promise<string> {
    if (!this.app.location) {
      return;
    }
    return await callMain('run-app', new IpcEvent({}));
  }

  install() {
    if (!this.app.url) {
      alert('抱歉, 产品即将上线。');
      return;
    }

    const cachePath = localStorage.getItem(`installer-${this.key}`);
    this.downloading = true;

    ipcRenderer.on(`download-progress-${this.key}`, this.setProgress);
    ipcRenderer.once(`download-complete-${this.key}`, () => {
      ipcRenderer.removeListener(
        `download-progress-${this.key}`,
        this.setProgress,
      );
      this.downloading = false;
    });
    ipcRenderer.once(`get-location-${this.key}`, (_: any, location: string) => {
      this.app.location = location;
    });

    // 触发后端开启下载监听
    ipcRenderer.send('begin-download', this, cachePath);
  }
}
