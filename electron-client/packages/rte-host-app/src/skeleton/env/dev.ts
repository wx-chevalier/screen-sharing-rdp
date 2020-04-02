import MobileDetect from 'mobile-detect';

window.gConfig = {};

// 如果是在本地开发，则默认为开发环境服务器
export const HOST = __DEV__
  ? 'https://api.unionfab.com'
  : window.gConfig.HOST
  ? `https://${window.gConfig.HOST}`
  : 'https://api.test.unionfab.com';

export const UFI_HOST = `https://${(window.gConfig || {}).UFI_HOST}`;

export const NODE_HOST = __DEV__
  ? 'https://node-api.unionfab.com'
  : window.gConfig.HOST
  ? `https://${window.gConfig.NODE_HOST}`
  : 'https://node-api.test.unionfab.com';

export const WITH_AUTH = true;

const md = new MobileDetect(window.navigator.userAgent);

export const isMobile = !!md.mobile();
