import { ClientContext } from '../client/ClientContext';

import { RsconReporter } from './rscon/RsconReporter';

export class PrinterManager {
  rsconReporter: RsconReporter = new RsconReporter();

  constructor(public context: ClientContext) {}

  // 根据当前设备配置的情况，判断是应该启用哪个 Reporter
  init() {
    // 这里根据本地配置的情况，选择启用哪个 Reporter
    this.rsconReporter.init();
  }
}
