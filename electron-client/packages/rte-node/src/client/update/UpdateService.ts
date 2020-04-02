import { autoUpdater } from 'electron-updater';

export interface ProgressInfo {
  total: number;
  delta: number;
  transferred: number;
  percent: number;
  bytesPerSecond: number;
}

export abstract class AbstractUpdateService {
  abstract checkUpdate(
    onDownloading: (progress: ProgressInfo) => void,
    onDownloaded: () => void,
  ): void;
  abstract installUpdate(): void;

  downloadUpdate() {}
}

export default class UpdateService extends AbstractUpdateService {
  checkUpdate(
    onDownloading: (progress: ProgressInfo) => void,
    onDownloaded: () => void,
  ) {
    autoUpdater.on('download-progress', onDownloading);
    autoUpdater.on('update-downloaded', onDownloaded);
    autoUpdater.checkForUpdatesAndNotify();
  }

  installUpdate() {
    setImmediate(() => autoUpdater.quitAndInstall(true, true));
  }
}
