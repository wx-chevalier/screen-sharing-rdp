import * as fs from 'fs-extra';
import { Subject, interval } from 'rxjs';

import { FileEvent } from 'rte-core';

import { Monitor } from '../base/Monitor';

export class FileIntervalMonitor extends Monitor<FileEvent> {
  constructor(private filePath: string, private duration: number = 5000) {
    super();
  }

  public watch(): Subject<FileEvent> {
    const subject = new Subject<FileEvent>();

    interval(this.duration).subscribe(async () => {
      const content = await fs.readFile(this.filePath);

      subject.next(
        new FileEvent({
          path: this.filePath,
          message: content.toString(),
        }),
      );
    });

    return subject;
  }
  public close() {}
}
