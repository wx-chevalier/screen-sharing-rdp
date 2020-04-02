import { APP_NAME_TYPE, App } from 'rte-core';

import { AppExecutor, AppInstaller } from '../app';

/** 应用的管理器 */
export interface AppSitter {
  app: App;
  installer: AppInstaller;
  executor: AppExecutor;
}

// 存放某个应用对应的
export type AppSitterMap = Record<APP_NAME_TYPE, AppSitter>;
