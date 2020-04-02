import { BaseEntity } from '@m-fe/utils';

export class Event<T = string> extends BaseEntity {
  type: string;
  message: T;
}

export class FileEvent extends Event {
  type: 'add' | 'change';
  path: string;
}

export class AppEvent extends Event {
  type:
    | 'running'
    // 僵尸进程
    | 'zombie';
  path: string;
}
