import { Subject } from 'rxjs';

import { App, AppEvent } from 'rte-core';

import { Monitor } from '../fs';

export class AppMonitor extends Monitor<AppEvent> {
  constructor(public app: App) {
    super();
  }

  public watch(): Subject<AppEvent> {
    return null;
  }

  public close() {}
}
