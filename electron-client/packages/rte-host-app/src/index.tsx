import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConnectedRouter } from 'connected-react-router';
import dayjs from 'dayjs';
import timeZone from 'dayjs-ext/plugin/timeZone';
import zh from 'dayjs/locale/zh-cn';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import badMutable from 'dayjs/plugin/badMutable';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isMoment from 'dayjs/plugin/isMoment';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import * as smoothscroll from 'smoothscroll-polyfill';

import App from './skeleton/containers/App';
import { history } from './skeleton/env/history';
import store from './skeleton/env/store';

import './skeleton/styles/reset.less';

smoothscroll.polyfill();

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(badMutable);
dayjs.extend(customParseFormat);
dayjs.extend(isMoment);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(timeZone);
dayjs.extend(utc);

dayjs.locale(zh);

if (!window.gConfig) {
  window.gConfig = {};
}

ReactDOM.render(
  <IntlProvider locale="en">
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Helmet>
            <title>UFCON</title>
          </Helmet>
          <App />
        </ConnectedRouter>
      </Provider>
    </ConfigProvider>
  </IntlProvider>,
  document.getElementById('root'),
);
