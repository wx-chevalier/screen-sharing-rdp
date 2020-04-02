import dayjs from 'dayjs';
import * as S from 'ufc-schema';

import { FileEvent } from 'rte-core';

import { getSFromHMS, getStrByIndexAfterSplit } from '../../shared';

/** Rscon 的日志解析 */
export class RsconParser {
  /** 解析日志文件 */
  async parseLog(fileEvent: FileEvent): Promise<S.UtkPrinterTelemetry[]> {
    // 解析错误日志
    if ((fileEvent.path || '').indexOf('Error') > -1) {
      return this.parseErrorLog(fileEvent);
    }

    if ((fileEvent.path || '').indexOf('OperationLog') > -1) {
      return this.parseOperationLog(fileEvent);
    }

    // 默认的日志解析
    return this.parseRLog(fileEvent);
  }

  /** 解析错误日志 */
  parseErrorLog(fileEvent: FileEvent) {
    return [
      new S.UtkPrinterTelemetry({
        key: 'warnAndErrorLog',
        value: fileEvent.message,
        type: 'FLOAT',
        ts: S.now(),
      }),
    ];
  }

  /** 解析操作日志 */
  parseOperationLog(fileEvent: FileEvent) {
    return [
      new S.UtkPrinterTelemetry({
        key: 'log',
        value: getStrByIndexAfterSplit(fileEvent.message, ' "', 1)
          .replace('"', '')
          .trim(),
        type: 'FLOAT',
        ts: S.now(),
      }),
    ];
  }

  parseRLog(fileEvent: FileEvent) {
    const fields = fileEvent.message
      .split(' ')
      .filter((m: string) => !!m && m !== '\t');

    // 当前时间
    const ts = dayjs(`${fields[0]} ${fields[1]}`).valueOf();
    const currentHeight = new S.UtkPrinterTelemetry({
      key: 'currentHeight',
      value: fields[2],
      type: 'FLOAT',
      ts,
    });

    const laserPower = new S.UtkPrinterTelemetry({
      key: 'laserPower',
      value: fields[3],
      type: 'FLOAT',
      ts,
    });

    const liquidLevel = new S.UtkPrinterTelemetry({
      key: 'liquidLevel',
      value: fields[4],
      type: 'FLOAT',
      ts,
    });

    const recoatingPosition = new S.UtkPrinterTelemetry({
      key: 'recoatingPosition',
      value: fields[5],
      type: 'FLOAT',
      ts,
    });

    const zAxisPosition = new S.UtkPrinterTelemetry({
      key: 'zAxisPosition',
      value: fields[6],
      type: 'FLOAT',
      ts,
    });

    const plungerPosition = new S.UtkPrinterTelemetry({
      key: 'plungerPosition',
      value: fields[7],
      type: 'FLOAT',
      ts,
    });

    return [
      currentHeight,
      laserPower,
      liquidLevel,
      recoatingPosition,
      zAxisPosition,
      plungerPosition,
    ];
  }

  /** 解析系统状态日志 */
  async parseSysStatus(
    _sysStatusContent: string,
  ): Promise<S.UtkPrinterTelemetry[]> {
    const lines = _sysStatusContent
      .split('\n')
      .filter(l => !!l)
      .map(l => l.trim());

    const tels: S.UtkPrinterTelemetry[] = [];

    if (lines[0] !== '[SYSSTATUS]') {
      return [];
    }

    const ts = S.now();

    // currentHeight
    tels.push(
      new S.UtkPrinterTelemetry({
        key: 'currentHeight',
        value: lines[2].split('=')[1],
        type: 'FLOAT',
        ts,
      }),
    );

    // 当前状态，由于这里不能判断是否有异常出现，因此仅上报是否正在打印中
    const bFinished = lines[6].split('=')[1] === 'true';
    if (!bFinished) {
      tels.push(
        new S.UtkPrinterTelemetry({
          key: 'status',
          value: 'PRINTING',
          type: 'FLOAT',
          ts,
        }),
      );

      // makeTime
      tels.push(
        new S.UtkPrinterTelemetry({
          key: 'makeTime',
          value: getSFromHMS(lines[7].split('=')[1]),
          type: 'FLOAT',
          ts,
        }),
      );

      // leftMakeTime
      tels.push(
        new S.UtkPrinterTelemetry({
          key: 'leftMakeTime',
          value: getSFromHMS(lines[8].split('=')[1]),
          type: 'FLOAT',
          ts,
        }),
      );
    }

    return tels;
  }
}
