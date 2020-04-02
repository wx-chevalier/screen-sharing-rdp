import { Subject } from 'rxjs';

/** 通用的监视器 */
export abstract class Monitor<T> {
  public abstract watch(): Subject<T>;
  public abstract close(): void;
}
