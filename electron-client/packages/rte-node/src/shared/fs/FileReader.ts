import fs from 'fs-extra';
import iconv from 'iconv-lite';

/**
 * Read in the last `n` lines of a file
 * @param  {string}   filePath - file (direct or relative path to file.)
 * @param  {int}      lineCnt    - max number of lines to read in.
 * @param  {encoding} encoding        - specifies the character encoding to be used, or 'buffer'. defaults to 'utf8'.
 *
 * @return {promise}  a promise resolved with the lines or rejected with an error.
 */
export async function readLastLines(
  filePath: string,
  lineCnt = 1,
  encoding = 'utf8',
): Promise<string | Buffer> {
  const NEW_LINE_CHARACTERS = ['\n'];

  const readPreviousChar = (
    stat: fs.Stats,
    file: number,
    currentCharacterCount: number,
  ) => {
    return fs
      .read(file, Buffer.alloc(1), 0, 1, stat.size - 1 - currentCharacterCount)
      .then(bytesReadAndBuffer => {
        return String(bytesReadAndBuffer.buffer);
      });
  };

  return new Promise((resolve, reject) => {
    const self: {
      stat?: fs.Stats;
      file?: number;
    } = {
      stat: null,
      file: null,
    };

    const isExist = fs.existsSync(filePath);

    if (!isExist) {
      throw new Error('file does not exist');
    }

    const promises: Array<Promise<any>> = [];

    // Load file Stats.
    promises.push(fs.stat(filePath).then(stat => (self.stat = stat)));

    // Open file for reading.
    promises.push(fs.open(filePath, 'r').then(file => (self.file = file)));

    return Promise.all(promises)
      .then(() => {
        let chars = 0;
        let lineCount = 0;
        let lines = '';

        const doWhileLoop = (): Promise<any> | void => {
          if (lines.length > self.stat.size) {
            lines = lines.substring(lines.length - self.stat.size);
          }

          if (lines.length >= self.stat.size || lineCount >= lineCnt) {
            if (NEW_LINE_CHARACTERS.includes(lines.substring(0, 1))) {
              lines = lines.substring(1);
            }
            fs.close(self.file);

            if (encoding === 'buffer') {
              return resolve(Buffer.from(lines, 'binary'));
            }

            return resolve(Buffer.from(lines, 'binary').toString(encoding));
          }

          return readPreviousChar(self.stat, self.file, chars)
            .then(nextCharacter => {
              lines = nextCharacter + lines;
              if (
                NEW_LINE_CHARACTERS.includes(nextCharacter) &&
                lines.length > 1
              ) {
                lineCount++;
              }
              chars++;
            })
            .then(doWhileLoop);
        };
        return doWhileLoop();
      })
      .catch(reason => {
        if (self.file !== null) {
          fs.close(self.file).catch(() => {
            // We might get here if the encoding is invalid.
            // Since we are already rejecting, let's ignore this error.
          });
        }
        return reject(reason);
      });
  });
}

/** 读取 GBK 编码文件中的最后数行 */
export async function readGbkLastLines(filePath: string, lineCnt = 1) {
  const content = await fs.readFile(filePath);

  // 获取 GBK 编码
  const gbkContent = iconv.decode(content, 'GBK');

  // 返回最后 N 行
  const splittedContent = gbkContent.split('\n').filter(c => c && c !== '\r');

  return splittedContent.slice(
    splittedContent.length - lineCnt,
    splittedContent.length,
  );
}
