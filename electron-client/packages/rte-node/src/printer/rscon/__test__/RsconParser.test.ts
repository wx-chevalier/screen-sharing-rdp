import { FileEvent } from 'rte-core';

import { RsconParser } from '../RsconParser';

describe('RsconParser', () => {
  let parser: RsconParser;

  beforeEach(() => {
    parser = new RsconParser();
  });

  // it('parseLog', async () => {
  //   const tels = await parser.parseLog(
  //     new FileEvent({
  //       message:
  //         '2017-05-10 10:01:46.540 	 120 	 301 	 49.495 	 1.00361 	 1.2 	 1.4225 ',
  //     }),
  //   );
  //   console.log(JSON.stringify(tels));
  // });

  it('parseOperationLog', async () => {
    const tels = await parser.parseLog(
      new FileEvent({
        path: 'OperationLog.txt',
        message:
          '2019-11-12 08:33:05.566 Execution 1 "11-12 08:33:05  进入就绪状态." ',
      }),
    );
    console.log(JSON.stringify(tels));
  });

  // it('parseSysStatus', async () => {
  //   const tels = await parser.parseSysStatus(`
  //     [SYSSTATUS]
  //     fPos_ZLBalance=@Variant(\0\0\0\x87\0\0\0\0)
  //     nCurHei=2440
  //     fPos_X=@Variant(\0\0\0\x87\x43h\xf5\xc3)
  //     fPos_Z=@Variant(\0\0\0\x87\x41\xc3\x33\x33)
  //     fPos_ZL=@Variant(\0\0\0\x87\0\0\0\0)
  //     bFinished=false
  //     strBuildTime=00 : 15 : 24
  //     strLeftTime=37 : 10 : 54
  //   `);

  //   console.log(JSON.stringify(tels));
  // });
});
