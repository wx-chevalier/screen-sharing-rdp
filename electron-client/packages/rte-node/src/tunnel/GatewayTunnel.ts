import * as S from 'ufc-schema';

/** 上传某个打印机的 Attr 信息 */
export function postPrinterAttr(printer: S.UtkPrinter, attr: S.UtkPrinterAttr) {
  console.log(printer, attr);
}

/** 上传某个打印机的 Telemetry 信息 */
export function postPrinterTelemetries(
  printer: S.UtkPrinter,
  tels: S.UtkPrinterTelemetry[],
) {
  console.log(printer, JSON.stringify(tels));
}
