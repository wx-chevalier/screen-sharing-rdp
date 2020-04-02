import dayjs, { Dayjs } from 'dayjs';

export type Dateable = string | number | Dayjs | undefined;

/** 格式化为标准时间形式 */
export function formatDate(m: Dateable) {
  if (!m || !dayjs(m).isValid()) {
    return '-';
  }
  return dayjs(m).format('YYYY-MM-DD');
}

/** 格式化为标准时间形式 */
export function formatDatetime(m: Dateable) {
  if (!m || !dayjs(m).isValid()) {
    return '-';
  }
  return dayjs(m).format('YYYY-MM-DD HH:mm:ss');
}

/** 简略些时间格式 */
export function formatDatetimeAsShort(m: Dateable) {
  if (!m) {
    return '-';
  }

  return dayjs(m).format('MM/DD HH:mm');
}

export function formatTime(m: Dateable) {
  if (!m) {
    return '-';
  }

  return dayjs(m).format('HH:mm');
}

/**
 * 获取两个日期间的 Duration
 * @param m1 日期较小值
 * @param m2 日期较大值
 * @param len number 可选参数，保留时间描述位数
 * @param strip boolean 可选参数，剩余时间
 */

export function formatDurationWithRange(
  m1: Dateable,
  m2: Dateable,
  options: { len?: number; strip?: boolean } = {},
) {
  if (!m1 || !m2) {
    return '-';
  }

  return formatDuration(dayjs(m2).valueOf() - dayjs(m1).valueOf(), options);
}

const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = MILLISECONDS_SECOND * 60;
const MILLISECONDS_HOUR = MILLISECONDS_MINUTE * 60;
const MILLISECONDS_DAY = MILLISECONDS_HOUR * 24;

/**
 * 将某个时间差格式化展示为字符串
 */
export function formatDuration(
  // 这里的 duration 指的是毫秒
  duration: number,
  { len = 10, strip = false }: { len?: number; strip?: boolean } = {},
) {
  if (!duration) {
    return '-';
  }

  let str = '';

  let usedBit = 0;

  const days = Math.floor(duration / MILLISECONDS_DAY);
  const hours = Math.floor((duration % MILLISECONDS_DAY) / MILLISECONDS_HOUR);
  const minutes = Math.floor(
    (duration % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE,
  );
  const seconds = Math.floor(
    (duration % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND,
  );

  if (days !== 0 && usedBit < len) {
    str = `${days}d`;
    usedBit++;
  }

  if (hours !== 0 && usedBit < len) {
    str = `${str} ${hours}h`;
    usedBit++;
  }

  if (minutes !== 0 && usedBit < len) {
    str = `${str} ${minutes}m`;
    usedBit++;
  }

  if (seconds !== 0 && usedBit < len) {
    str = `${str} ${seconds}s`;
  }

  return strip ? str.replace(' ', '') : str;
}
