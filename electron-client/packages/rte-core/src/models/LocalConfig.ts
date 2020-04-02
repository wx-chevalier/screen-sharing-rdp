import * as U from '@m-fe/utils';
import * as S from 'ufc-schema';

import { App } from './App';

export class LocalConfig extends U.BaseEntity<LocalConfig> {
  // 应用本身的配置
  clientApp: App;

  // 关联的打印设备
  printer: S.D3Printer;

  // 本地的一些其他配置
  // 本地控制软件的根目录
  ctrlAgentBaseDir: string;

  get hasPrinterConfigured() {
    // 判断是否设置过控制软件的版本和地址
    return !!this.ctrlAgentBaseDir && !!this.printer.code;
  }

  constructor(data: Partial<LocalConfig> = {}) {
    super(data);

    if (this.clientApp) {
      this.clientApp = new App(this.clientApp);
    }

    if (this.printer) {
      this.printer = new S.D3Printer(this.printer);
    }
  }
}
