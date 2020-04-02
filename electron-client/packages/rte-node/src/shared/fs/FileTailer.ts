import * as chokidar from 'chokidar';
import * as fs from 'fs-extra';
import * as iconv from 'iconv-lite';
import * as os from 'os';
import { Subject } from 'rxjs';

import { FileEvent } from 'rte-core';

import { Monitor } from '../base/Monitor';

const watcher = Symbol('watcher');
const fd = Symbol('fd');

/** 定期文件的尾部定时读取 */
export class FileTailer extends Monitor<FileEvent> {
  constructor(
    public filePath: string,
    public subject: Subject<FileEvent>,
    public options: {
      alwaysStat?: boolean;
      ignoreInitial?: boolean;
      persistent?: boolean;
      encoding?: string;
    } = {
      alwaysStat: true,
      ignoreInitial: false,
      persistent: true,
      encoding: 'utf8',
    },
  ) {
    super();

    this[watcher] = undefined;
    this[fd] = undefined;
  }

  watch() {
    let lastSize = 0;

    this[watcher] = chokidar
      .watch(this.filePath, this.options)
      .on('add', async (path, _stats) => {
        let stats = _stats;
        if (!stats) {
          stats = await fs.stat(path);
        }

        lastSize = stats.size;
      })
      .on('change', async (path, _stats) => {
        let stats = _stats;
        if (!stats) {
          stats = await fs.stat(path);
        }

        const diff = stats.size - lastSize;
        if (diff <= 0) {
          lastSize = stats.size;
          return;
        }
        const buffer = Buffer.alloc(diff);
        this[fd] = fs.openSync(path, 'r');
        fs.read(this[fd], buffer, 0, diff, lastSize, err => {
          if (err) {
            return;
          }
          fs.closeSync(this[fd]);

          (this.options.encoding === 'utf8'
            ? buffer.toString()
            : iconv.decode(buffer, 'gbk')
          )
            .split(os.EOL)
            .forEach((line, idx, ar) => {
              if (idx < ar.length && line) {
                this.subject.next(
                  new FileEvent({
                    type: 'change',
                    path: this.filePath,
                    message: line,
                  }),
                );
              }
            });
        });
        lastSize = stats.size;
      })
      .on('unlink', () => {
        lastSize = 0;
        this.closeFile();
      });

    return this.subject;
  }

  close() {
    if (this[watcher]) {
      this[watcher].unwatch(this.filePath);
      this[watcher].close();
      this[watcher] = undefined;
    }
    this.closeFile();
  }

  closeFile() {
    if (this[fd]) {
      fs.close(this[fd], err => {
        if (err) {
          return;
        }
        this[fd] = undefined;
      });
    }
  }
}
