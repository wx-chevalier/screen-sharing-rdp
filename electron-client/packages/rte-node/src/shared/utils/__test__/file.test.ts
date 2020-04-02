import { readGbkLastLines } from '../../fs/FileReader';

describe('', () => {
  it('', async done => {
    // const str = await readLastLine(
    //   '/Users/zhangzixiong/Downloads/Log/OperationLog.txt',
    //   3,
    // );

    const res = await readGbkLastLines(
      '/Users/zhangzixiong/Downloads/Log/OperationLog.txt',
      10,
    );

    console.log(res);

    done();
  });
});
