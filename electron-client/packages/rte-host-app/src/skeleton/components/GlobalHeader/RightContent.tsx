import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import * as React from 'react';

import { getGlobalUser } from '@/apis/auth';
import { formatMessage } from '@/i18n';

import HeaderSearch from '../HeaderSearch';
import SelectLang from '../LangSelector';

import { NoticeIconView } from './NoticeIconView';
import { UserDropdown as User } from './UserDropdown';

import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
export interface RightContentProps {
  theme?: SiderTheme;
  layout?: 'sidemenu' | 'topmenu';
}

export const RightContent: React.SFC<RightContentProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder={formatMessage({
          id: 'component.globalHeader.search',
        })}
        dataSource={[
          formatMessage({
            id: 'component.globalHeader.search.example1',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example2',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example3',
          }),
        ]}
        onSearch={value => {
          console.log('input', value);
        }}
        onPressEnter={value => {
          console.log('enter', value);
        }}
      />
      <Tooltip
        title={formatMessage({
          id: 'component.globalHeader.help',
        })}
      >
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <NoticeIconView />
      <User
        currentUser={{
          name: getGlobalUser().nickname,
          avatar: 'https://i.pravatar.cc/300',
        }}
      />
      <SelectLang className={styles.action} />
    </div>
  );
};
