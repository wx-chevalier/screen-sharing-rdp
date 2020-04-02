import * as path from 'path';
import * as winston from 'winston';

import { __DEV__ } from './env';

const { format, transports } = winston;

const errorStackFormat = format(info => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }
  return info;
});

const formats = [
  format.label({
    label: path.basename(`${module.parent}/${module.filename}`),
  }),
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.printf(
    info =>
      `${info.label}[${info.level}]: ${info.timestamp} --- ${info.message}`,
  ),
];

const customTransports = [
  // 生产环境下区分 Error 与其他
  new transports.File({
    filename: path.resolve('logs/error.log'),
    level: 'error',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
  new transports.File({
    filename: path.resolve('logs/info.log'),
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
] as any[];

// 开发环境下添加 Console
if (__DEV__) {
  customTransports.push(
    new transports.Console({
      handleExceptions: true,
      format: format.combine(errorStackFormat(), ...formats, format.colorize()),
    }),
  );
}

export const loggerConfig = {
  level: __DEV__ ? 'debug' : 'info',
  format: format.combine(...formats),
  exitOnError: false,
  transports: customTransports,
};
