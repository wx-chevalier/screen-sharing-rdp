import { BaseEntity } from '@m-fe/utils';

import { App } from './App';

export class AppSeries extends BaseEntity {
  name: string;

  key: string;

  apps: App[];

  order: number;

  description: string;
}
