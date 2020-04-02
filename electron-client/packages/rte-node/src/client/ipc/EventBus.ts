import * as U from '@m-fe/utils';
import { dialog } from 'electron';
import { ipcMain } from 'electron-better-ipc';

import { IPC_EVENT_TYPE, IpcEvent } from 'rte-core';

import { ClientContext } from '../ClientContext';

/** 这里以类的形式提供事件处理，是为了方便注入上下文 */
export class EventBus {
  constructor(private context: ClientContext) {}

  init() {
    this.onNativeUi();
    this.onLocalConfig();
  }

  /** 原生界面相关的一些操作 */
  onNativeUi() {
    // 选择本地文件夹
    ipcMain.answerRenderer('select-dirs', async _e => {
      const result = await dialog.showOpenDialog(this.context.mainWindow, {
        properties: ['openDirectory'],
      });

      return result.filePaths;
    });
  }

  /** 与本地配置相关的事件 */
  onLocalConfig() {
    ipcMain.answerRenderer(
      'get-local-config' as IPC_EVENT_TYPE,
      async (_e: IpcEvent) => {
        return JSON.stringify(this.context.localConfigMgt.config);
      },
    );

    ipcMain.answerRenderer(
      'set-local-config' as IPC_EVENT_TYPE,
      async (e: IpcEvent) => {
        try {
          await this.context.localConfigMgt.updateConfig(
            U.parseJson(e.message),
          );
          return 'ok';
        } catch (_e) {
          return 'error';
        }
      },
    );

    ipcMain.answerRenderer('select-dirs', async () => {
      const result = await dialog.showOpenDialog(this.context.mainWindow, {
        properties: ['openDirectory'],
      });

      return result.filePaths;
    });
  }
}
