import { interval } from 'rxjs';
import { mergeAll, scan, throttle, window } from 'rxjs/operators';

import { FileEvent } from 'rte-core';

import { DirMonitor, FileIntervalMonitor } from '../../shared';
import { PrinterReporter } from '../base/PrinterReporter';

import { RsconParser } from './RsconParser';

/** 用于监控 Rscon 的设备数据 */
export class RsconReporter extends PrinterReporter {
  rsconBaseDir = '/Users/zhangzixiong/Downloads/RsCon';

  dirMonitor: DirMonitor;
  sysMonitor: FileIntervalMonitor;
  rsconParser = new RsconParser();

  /** 初始化 Reporter */
  init() {
    this.initLogReporter();
    this.initSysStatusReporter();
  }

  close() {
    if (this.dirMonitor) {
      this.dirMonitor.close();
    }

    if (this.sysMonitor) {
      this.sysMonitor.close();
    }
  }

  /** 日志定期监控 */
  private initLogReporter() {
    let logMap: Record<string, FileEvent> = {};

    this.dirMonitor = new DirMonitor(`${this.rsconBaseDir}/Log`, 'gbk');

    const observable = this.dirMonitor
      .watch()
      .pipe(throttle(() => interval(100)));

    const windowedObservable = observable.pipe(window(interval(1000)));
    const count = windowedObservable.pipe(scan(acc => acc + 1, 0));
    count.subscribe(() => {
      this.parseLogsWithinWindow({ ...logMap });

      // 重置日志记录项
      logMap = {};
    });

    windowedObservable.pipe(mergeAll()).subscribe(e => {
      logMap[e.path] = e;
    });
  }

  /** 处理某个事件窗口内的所有日志 */
  private parseLogsWithinWindow(logMap: Record<string, FileEvent>) {
    Object.keys(logMap).forEach(async e => {
      const tels = await this.rsconParser.parseLog(logMap[e]);

      this.reportTelemetries(tels);
    });
  }

  /** 定期读取系统文件，并且读取数据解析、上报 */
  private initSysStatusReporter() {
    this.sysMonitor = new FileIntervalMonitor(
      `${this.rsconBaseDir}/Config/SysStatus.ini`,
      5000,
    );

    this.sysMonitor.watch().subscribe(async _f => {
      // const tels = await this.rsconParser.parseSysStatus(f.message);
      // this.reportTelemetries(tels);
    });
  }

  /** 定时上报系统的 Para 文件，每天上报一次 */
  // private _initParaReporter() {}
}
