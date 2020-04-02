// 从时间字符串中计算出秒数 13 : 28 : 44
export function getSFromHMS(hms: string) {
  const hmsList = hms.replace(/ /g, '').split(':');

  return (
    Number(hmsList[0]) * 3600 + Number(hmsList[1]) * 60 + Number(hmsList[2])
  );
}

export function getStrByIndexAfterSplit(
  str: string,
  separator: string,
  index: number,
) {
  const splittedStrs = str.split(separator);

  return splittedStrs[index] || '';
}
