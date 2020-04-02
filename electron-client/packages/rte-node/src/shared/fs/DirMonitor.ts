import * as U from '@m-fe/utils';
import * as chokidar from 'chokidar';
import { Subject } from 'rxjs';

import { FileEvent } from 'rte-core';

import { Monitor } from '../base/Monitor';

import { readGbkLastLines } from './FileReader';
import { FileTailer } from './FileTailer';

/** 日志监视器 */
export class DirMonitor extends Monitor<FileEvent> {
  // 这里选择为每个文件添加单独的监控器
  tailerMap: Record<string, FileTailer> = {};

  constructor(public logDir: string, public encoding: string = 'utf8') {
    super();
  }

  watch(): Subject<FileEvent> {
    const subject = new Subject<FileEvent>();
    const watcher = chokidar.watch(this.logDir);

    watcher
      .on('add', async _path => {
        // 这里忽略 add 事件，仅考虑 change 事件
      })
      .on('change', async path => {
        if (!this.tailerMap[path]) {
          // 首先读取该文件的最后一行返回
          const lastLine = await readGbkLastLines(path);

          subject.next(
            new FileEvent({
              type: 'change',
              path,
              message: U.isValidArray(lastLine)
                ? lastLine[0]
                : JSON.stringify(lastLine),
            }),
          );

          this.tailerMap[path] = new FileTailer(path, subject, {
            encoding: this.encoding,
          });
          // 开始监控
          this.tailerMap[path].watch();
        }
      });

    return subject;
  }

  /** 停止监控所有的文件 */
  async close() {
    for (const p of Object.keys(this.tailerMap)) {
      this.tailerMap[p].close();
    }

    this.tailerMap = {};
  }
}
