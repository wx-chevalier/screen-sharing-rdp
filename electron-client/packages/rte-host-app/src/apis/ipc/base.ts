import { ipcRenderer } from 'electron-better-ipc';

import { IPC_EVENT_TYPE, IpcEvent } from 'rte-core';

/** 调用远端函数 */
export async function callMain<R = string>(
  type: IPC_EVENT_TYPE,
  e: IpcEvent = new IpcEvent(),
) {
  return ipcRenderer.callMain<IpcEvent, R>(type, e);
}
