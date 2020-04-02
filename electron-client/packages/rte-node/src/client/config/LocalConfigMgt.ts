import * as U from '@m-fe/utils';
import * as fs from 'fs-extra';
import * as S from 'ufc-schema';

import { LocalConfig } from 'rte-core';

import { configDir } from '../../shared';
import { ClientContext } from '../ClientContext';

import { current } from './version';

/** 本地配置存取 */
export class LocalConfigMgt {
  private configFilePath = `${configDir}/config.json`;

  // 这里定义的是全局默认的配置，它会在
  public config: LocalConfig = new LocalConfig({
    clientApp: current,
    printer: new S.D3Printer({
      ctrlAgent: 'RSCON',
    }),
  });

  constructor(public context: ClientContext) {}

  init() {
    this.loadConfig();
  }

  loadConfig() {
    // 加载配置文件信息
    if (fs.existsSync(this.configFilePath)) {
      // 如果存在，则读取并且进行构造
      const _jsonObj = fs.readJsonSync(this.configFilePath);

      const jsonObj: Partial<LocalConfig> =
        typeof _jsonObj === 'string' ? U.parseJson(_jsonObj) : _jsonObj;

      this.config = new LocalConfig(jsonObj);
    } else {
      fs.ensureDirSync(configDir);
      // 否则将当前的默认值写入到文件中
      fs.writeJSON(this.configFilePath, JSON.stringify(this.config));
    }
  }

  /** 更新当前配置，暂定为全量更新全量写入 */
  async updateConfig(config: LocalConfig) {
    this.config = config;
    fs.ensureDirSync(configDir);
    await fs.writeJSON(this.configFilePath, JSON.stringify(this.config));
  }
}
