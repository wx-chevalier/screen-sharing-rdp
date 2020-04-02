import { DownloadOutlined } from '@ant-design/icons';
import { Popover, Typography } from 'antd';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './index.less';

export const firstUpperCase = (pathString: string): string =>
  pathString
    .replace('.', '')
    .split(/\/|-/)
    .map((s): string =>
      s.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase()),
    )
    .filter((s): boolean => !!s)
    .join('');

// when click block copy, send block text to ga
const onBlockCopy = (label: string) => {
  const ga = window && window.ga;
  if (ga) {
    ga('send', 'event', {
      eventCategory: 'block',
      eventAction: 'copy',
      eventLabel: label,
    });
  }
};

const BlockCodeView: React.SFC<{
  text: string;
}> = ({ text }) => {
  return (
    <div className={styles['copy-block-view']}>
      <Typography.Paragraph
        copyable={{
          text,
          onCopy: () => onBlockCopy(text),
        }}
        style={{
          display: 'flex',
        }}
      >
        <pre>
          <code className={styles['copy-block-code']}>{text}</code>
        </pre>
      </Typography.Paragraph>
    </div>
  );
};

export default () => {
  const divDom = useRef<HTMLDivElement>(null);
  return (
    <Popover
      title={
        <FormattedMessage
          id="app.preview.down.block"
          defaultMessage="下载此页面到本地项目"
        />
      }
      placement="topLeft"
      content={<BlockCodeView text={'Test text'} />}
      trigger="click"
      getPopupContainer={dom => (divDom.current ? divDom.current : dom)}
    >
      <div className={styles['copy-block']} ref={divDom}>
        <DownloadOutlined />
      </div>
    </Popover>
  );
};
