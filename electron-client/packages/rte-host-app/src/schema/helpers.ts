import _ from 'lodash';

export const ifExist = <T>(
  toCheck: T | null | undefined,
  truthyValue: T = toCheck,
  fallback?: T,
) => (toCheck ? truthyValue : ((fallback || '') as T));

export type DeepPartial<T> = {
  [key in keyof T]?: DeepPartial<T[key]>;
};

export type Type<T> = new (...args: unknown[]) => T;

/** 分组并且填充 */
export function chunkWithFill(
  array: any[],
  size: number,
  fillObj: any,
): any[][] {
  const chunkedArray = _.chunk(array, size);
  const lastChunk = chunkedArray[chunkedArray.length - 1];

  if (fillObj !== undefined && lastChunk.length < size) {
    lastChunk.push(
      ...Array.from({
        length: size - lastChunk.length,
      }).map(() => fillObj),
    );
  }

  return chunkedArray;
}

/** 添加或删除 */
export function addOrRemove(arr: any[], obj: any) {
  if (!arr || !Array.isArray(arr)) {
    return arr;
  }

  // 存在则删除
  if (arr.indexOf(obj) > -1) {
    return arr.filter(a => a !== obj);
  }

  return [...arr, obj];
}

/** 插入到某个数组中 */
export const insertArray = (arr: any[], index: number, newItem: any) => [
  ...arr.slice(0, index),

  newItem,

  ...arr.slice(index),
];

/** 格式化百分比 */
export function formatPercent(percent: number) {
  return `${(percent * 100).toFixed(2)}%`;
}

/** 将某个对象转化为 KV */
export function transformToKV(obj: object) {
  const kvEntries: {
    key: string;
    type: string;
    value: string | number;
  }[] = [];

  Object.keys(obj).forEach(k => {
    let type;

    if (typeof obj[k] === 'number') {
      type = 'LONG';
    } else {
      type = 'STRING';
    }

    kvEntries.push({
      key: k,
      type,
      value: obj[k],
    });
  });

  return kvEntries;
}
