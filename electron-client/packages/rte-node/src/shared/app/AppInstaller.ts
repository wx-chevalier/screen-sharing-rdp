/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { dialog, ipcMain } from 'electron';
import * as log from 'electron-log';
import * as fs from 'fs';
import * as path from 'path';

import { App } from 'rte-core';

import { ClientContext } from '../../client/ClientContext';
import { verifyFile } from '../fs/FileDownloader';
import { extraDir } from '../utils';

import { execFile } from './AppExecutor';

/** 应用安装器 */
export class AppInstaller {
  constructor(public app: App, private context: ClientContext) {}

  startDownload() {
    const { mainWindow: window } = this.context.clientUI;

    ipcMain.on(
      'begin-download',
      async (dEvent: any, app: App, cachePath: string | null) => {
        const { key, url, md5, isInstaller } = app;

        const endDownload = () =>
          dEvent.sender.send(`download-complete-${key}`, null);

        // 如果已经存在，则直接执行
        if (cachePath && fs.existsSync(cachePath)) {
          const isLatest = await verifyFile(cachePath, md5);
          if (isLatest && isInstaller) {
            execFile(cachePath);
            endDownload();
            return;
          } else {
            // 否则清空缓存
            try {
              fs.unlinkSync(cachePath);
            } catch (error) {}
          }
        }

        // 监控是否要下载完毕
        window.webContents.session.once('will-download', (_, item, __) => {
          const totalBytes = item.getTotalBytes();
          item.on('updated', (_, state) => {
            if (state === 'interrupted') {
            } else if (state === 'progressing') {
              if (item.isPaused()) {
                console.log('Download is paused');
              } else {
                const percent = item.getReceivedBytes() / totalBytes;
                console.log(`Received bytes: ${item.getReceivedBytes()}`, key);
                dEvent.sender.send(
                  `download-progress-${key}`,
                  Math.floor(percent * 100),
                );
              }
            }
          });

          item.once('done', (_, state) => {
            if (state === 'completed') {
              console.log('Download successfully');

              // 记录安装包位置
              const savePath = item.getSavePath();
              dEvent.sender.send(`get-installer-${key}`, savePath);

              if (isInstaller) {
                execFile(savePath);
              }
            } else {
              console.log(`Download failed ${state}`);
              dialog.showErrorBox(
                '下载失败',
                `文件 ${item.getFilename()} 下载失败`,
              );
            }
            endDownload();
          });
        });

        // 执行下载操作
        window.webContents.downloadURL(url);
      },
    );
  }

  /** 启用监听 */
  onDownload() {}

  searchLocation = async (rPath: string, exe: string): Promise<string> => {
    return new Promise<string>((resolve, _) => {
      const vbsDir = path.join(extraDir, './regedit/vbs');
      if (process.platform !== 'win32') {
        return resolve('');
      }

      const HKEY_LOCAL_MACHINE = 'HKLM';
      const cmpletePath = path.join(HKEY_LOCAL_MACHINE, rPath);

      const regedit = require('regedit');
      regedit.setExternalVBSLocation(vbsDir);
      regedit.arch.list32(cmpletePath, (err: Error, result: any) => {
        if (!err) {
          try {
            const installPath: string =
              result[cmpletePath].values.InstallPath.value;
            const exePath: string = path.join(installPath, exe);
            if (!fs.existsSync(exePath)) {
              resolve('');
            } else {
              resolve(exePath);
            }
          } catch (error) {
            resolve('');
          }
        } else {
          log.error('regedit error', err, cmpletePath);
          resolve('');
        }
      });
    });
  };
}
