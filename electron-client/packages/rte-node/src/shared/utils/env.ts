import dayjs from 'dayjs';
import { app } from 'electron';
import * as log from 'electron-log';
import * as fs from 'fs';
import * as path from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const __DEV__ = NODE_ENV === 'development' || NODE_ENV === 'dev';

export const exeDir = path.dirname(app.getPath('exe'));

export const extraDir = __DEV__
  ? path.join(__dirname, '../../../extra')
  : path.join(exeDir, './resources/extra');

console.log(extraDir);

export const logDir = __DEV__
  ? path.join(__dirname, './logs')
  : path.join(exeDir, './resources/logs');

export const configDir = __DEV__
  ? path.join(__dirname, './configs')
  : path.join(exeDir, './resources/configs');

// 配置日志
log.transports.console.format = '{h}:{i}:{s} {text}';
// 默认日志大小设置为 100MB
log.transports.file.maxSize = 1048576 * 100;
log.transports.file.archiveLog = file => {
  file = file.toString();
  const info = path.parse(file);

  try {
    fs.renameSync(
      file,
      path.join(
        info.dir,
        info.name + '.' + dayjs().format('YYYY-MM-DD') + '.old' + info.ext,
      ),
    );
  } catch (e) {
    console.warn('Could not rotate log', e);
  }
};

log.transports.file.file = `${logDir}/main.log`;

log.info(
  '>>>app initializing>>>current dirs: ',
  `extraDir-${extraDir} | `,
  `logDir-${logDir} | `,
  `configDir-${configDir} |`,
);
