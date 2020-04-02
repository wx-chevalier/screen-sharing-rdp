import * as childProcess from 'child_process';
import { dialog } from 'electron';
import log from 'electron-log';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

import { App } from 'rte-core';

/** 执行某个文件 */
export const execFile = async (
  exePath: string,
  uninstall?: boolean,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (uninstall) {
      exePath = path.join(exePath, '..', 'uninst.exe');
    }

    if (!fs.existsSync(exePath)) {
      dialog.showErrorBox('运行失败', `执行失败：路径 ${exePath} 不存在！`);
      reject(new Error(`执行失败：路径 ${exePath} 不存在！`));

      return;
    }

    childProcess.execFile(exePath, (err, stdout, __) => {
      if (err) {
        dialog.showErrorBox('运行失败', `执行失败：执行 ${exePath} 发生错误！`);
        log.error(err);

        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
};

/** 执行某个命令 */
export const execCmd = async (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (process.platform !== 'win32') {
      dialog.showErrorBox('无法执行', '只能在 Windows 平台执行操作');
      return reject(new Error('只能在 Windows 平台执行操作'));
    }

    childProcess.exec(
      command,
      { timeout: 10000, shell: 'cmd.exe' },
      (err, stdout) => {
        if (err) {
          dialog.showErrorBox(
            '执行失败',
            `执行失败：执行 ${command} 发生错误！`,
          );
          log.error(`执行失败：执行 ${command} 发生错误！`, err, stdout);
          return reject(err);
        } else {
          resolve(stdout);
        }
      },
    );
  });
};

export class AppExecutor {
  constructor(public app: App) {}
}
