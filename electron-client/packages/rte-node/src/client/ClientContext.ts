import { App as ElectronApp } from 'electron';
import * as log from 'electron-log';

import { PrinterManager } from '../printer/PrinterManager';
import { __DEV__ } from '../shared';

import { LocalConfigMgt } from './config/LocalConfigMgt';
import { EventBus } from './ipc/EventBus';
import { ClientUI } from './ui/ClientUI';
import { ClientUpdater } from './update/ClientUpdater';

export class ClientContext {
  clientUI: ClientUI;
  clientUpdater: ClientUpdater;
  printerManager: PrinterManager = new PrinterManager(this);
  localConfigMgt: LocalConfigMgt = new LocalConfigMgt(this);
  eventBus: EventBus = new EventBus(this);

  get mainWindow() {
    return this.clientUI.mainWindow;
  }

  init() {
    // 初始化界面
    this.clientUI.init();

    // 加载本地配置
    this.localConfigMgt.init();

    // 检测应用版本
    this.clientUpdater = new ClientUpdater(this.clientUI.mainWindow);
    this.clientUpdater.checkUpdate();

    // 启用 EventBus
    this.eventBus.init();

    // 启用日志监测
    this.printerManager.init();
  }

  constructor(public app: ElectronApp, public url: string) {
    this.clientUI = new ClientUI(app, url, () => {
      log.info('>>>ClientContext>>>init app');
    });
  }
}
