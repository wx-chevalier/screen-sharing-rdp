/** Mock i18n 相关操作，详情参考 */

export function i18nFormat(id: string) {
  return id;
}

export function formatMessage({
  id,
  defaultMessage,
}: {
  id: string;
  defaultMessage?: string;
}) {
  return defaultMessage || id;
}

export function setLocale(...args: any) {
  console.log(args);
}

export function getLocale() {
  return 'zh-CN';
}
