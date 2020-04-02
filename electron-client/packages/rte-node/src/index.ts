/* eslint-disable @typescript-eslint/no-var-requires */

import { app } from 'electron';
import log from 'electron-log';

import { ClientContext } from './client/ClientContext';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('electron-debug')({ showDevTools: true });
}

process.on('uncaughtException', error => {
  // Handle the error
  log.error(error);
});

const url =
  process.env.ELECTRON_START_URL || `file://${__dirname}/assets/index.html`;

const clientContext = new ClientContext(app, url);
clientContext.init();
