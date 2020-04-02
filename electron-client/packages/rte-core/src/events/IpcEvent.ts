import { App } from '../models';

import { Event } from './Event';

export type IPC_EVENT_TYPE =
  // 全局配置相关
  | 'get-local-config'
  | 'set-local-config'
  // App 相关
  | 'search-app-location'
  | 'run-app'
  // 设备相关
  | 'select-dirs';

export class IpcEvent<T = string> extends Event<T> {
  type: IPC_EVENT_TYPE;

  app: App;
}
