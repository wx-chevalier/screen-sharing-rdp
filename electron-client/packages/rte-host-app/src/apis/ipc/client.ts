import * as S from 'ufc-schema';

import { IpcEvent, LocalConfig } from 'rte-core';

import { callMain } from './base';

/** 获取本地配置 */
export async function getLocalConfig() {
  const resp = await callMain<string>('get-local-config');

  return new LocalConfig(S.parseJson(resp));
}

/** 更新本地配置 */
export async function updateLocalConfig(localConfig: LocalConfig) {
  const status = await callMain(
    'set-local-config',
    new IpcEvent({
      // 对于 LocalConfig 类，比较大，因此都是序列化之后传递
      message: JSON.stringify(localConfig),
    }),
  );

  return status === 'ok';
}
