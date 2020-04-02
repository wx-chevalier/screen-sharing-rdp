import { BrowserWindow, dialog } from 'electron';

import UpdateService from './UpdateService';

/** 负责处理客户端升级相关的事项 */
export class ClientUpdater {
  constructor(
    public mainWindow: BrowserWindow,
    public updateService: UpdateService = new UpdateService(),
  ) {}

  // 检查更新
  checkUpdate() {
    this.updateService.checkUpdate(
      progress => {
        this.mainWindow.webContents.send(
          'update-download-progress',
          progress.percent.toFixed(2),
        );
      },
      () => {
        dialog.showMessageBox(this.mainWindow, {
          title: '安装更新',
          message: '新版本下载完成，请点击确定安装新版本。',
        });

        this.updateService.installUpdate();
      },
    );
  }
}
