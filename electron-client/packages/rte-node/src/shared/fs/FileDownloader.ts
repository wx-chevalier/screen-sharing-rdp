import * as crypto from '@ravshansbox/browser-crypto';
import fs from 'fs-extra';

/** 验证某个文件是否符合 MD5 */
export function verifyFile(filePath: string, md5: string): Promise<boolean> {
  return new Promise((resolve, _) => {
    try {
      const hash = crypto.createHash('md5');
      const input = fs.createReadStream(filePath);
      const digest = () => {
        const data = input.read();
        if (data) hash.update(data);
        else {
          input.removeListener('readable', digest);
          const fileMD5 = hash.digest('hex').toLowerCase();
          resolve(md5.toLowerCase() === fileMD5);
        }
      };
      input.on('readable', digest);
    } catch (error) {
      resolve(false);
    }
  });
}

export class DownloadService {
  download() {}
}
