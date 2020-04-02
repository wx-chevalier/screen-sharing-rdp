import * as S from 'ufc-schema';

import {
  postPrinterAttr,
  postPrinterTelemetries,
} from '../../tunnel/GatewayTunnel';

export class PrinterReporter {
  // 关联的打印设备对象
  printer: S.UtkPrinter;

  /** 上报设备属性数据 */
  protected reportAttr(attr: S.UtkPrinterAttr) {
    postPrinterAttr(this.printer, attr);
  }

  /** 上报遥测数据 */
  protected reportTelemetries(tels: S.UtkPrinterTelemetry[]) {
    postPrinterTelemetries(this.printer, tels);
  }
}
