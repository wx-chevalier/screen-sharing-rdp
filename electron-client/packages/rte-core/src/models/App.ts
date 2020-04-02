import * as S from '@m-fe/utils';

export type APP_NAME_TYPE = 'UFCON' | 'RSCON_SIMULATE';

/** 应用定义 */
export class App extends S.BaseEntity<App> {
  // 是否隐藏
  hidden: boolean;

  // 全名
  name: APP_NAME_TYPE;

  // 默认快捷方式名
  lnk: string;

  // id
  key: string;

  // 版本
  version: string;

  // 简称
  label: string;

  // 下载链接
  url: string;

  // 图标
  icon: string;

  // exe 文件名称
  exe: string;
  // 是否为安装包
  isInstaller: boolean;

  // 安装包 md5，用于验证版本
  md5: string;

  order: number;

  // 本机路径
  location = '';
  regeditLocation: string;

  get isInstalled() {
    return !!this.location;
  }
}
