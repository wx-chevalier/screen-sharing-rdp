import {
  App as ElectronApp,
  BrowserWindow,
  Menu,
  Tray,
  nativeImage,
} from 'electron';
import * as path from 'path';

import { __DEV__ } from '../../shared';

/** 初始化应用及界面 */
export class ClientUI {
  mainWindow: BrowserWindow;
  tray: Tray;

  constructor(
    public app: ElectronApp,
    public url: string,
    private onReady: () => void,
  ) {}

  init() {
    const shouldQuit = this.checkSingleInstance();
    if (shouldQuit) {
      this.app.quit();
      return;
    }
    this.initWindow();
    this.initTray();
    this.registerQuit();
  }

  // 单实例检查
  private checkSingleInstance() {
    const isSecondInstance = !this.app.requestSingleInstanceLock();
    if (isSecondInstance) {
      const window = this.mainWindow;
      // Someone tried to run a second instance, we should focus our window.
      if (window) {
        if (window.isMinimized()) {
          window.restore();
        }
        window.show();
        window.focus();
      }
    }

    return isSecondInstance;
  }

  // 初始化窗口
  private initWindow() {
    this.app.on('ready', () => {
      const window = (this.mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        resizable: true,
        show: false,
        movable: true,
        webPreferences: {
          nodeIntegration: true,
        },
      }));

      window.once('ready-to-show', () => {
        window.show();
        this.onReady();
      });

      window.loadURL(this.url);

      // 判断是否为开发环境，如果是开发环境则加载开发工具
      if (__DEV__) {
        BrowserWindow.addDevToolsExtension(
          path.join(__dirname, '../public/react-devtools'),
        );
      }
    });
  }

  // 处理退出行为
  private registerQuit() {
    this.app.on('window-all-closed', () => {
      this.app.quit();
    });
  }

  // 初始化托盘
  private initTray() {
    // 创建系统托盘图标
    this.app.on('ready', () => {
      const iconPath = __DEV__
        ? path.join(__dirname, '../public/icon.ico')
        : path.join(__dirname, './assets/favicon.ico');

      const icon = nativeImage.createFromPath(iconPath);

      try {
        const tray = (this.tray = new Tray(icon));
        const contextMenu = Menu.buildFromTemplate([
          {
            label: '显示',
            click: () => {
              this.mainWindow.show();
            },
          },
          {
            label: '退出',
            click: () => {
              this.app.quit();
            },
          },
        ]);
        tray.on('click', () => this.mainWindow.show());
        tray.setToolTip('JustApp');
        tray.setContextMenu(contextMenu);
      } catch (e) {
        console.error(e);
      }
    });
  }
}
