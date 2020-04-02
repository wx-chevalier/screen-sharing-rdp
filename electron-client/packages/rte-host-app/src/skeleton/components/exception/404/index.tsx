import { Button, Result } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { formatMessage } from '@/i18n';

export const Exception404 = () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({
      id: 'exception-404.description.404',
      defaultMessage: 'Sorry, the page you visited does not exist.',
    })}
    extra={
      <Link to="/">
        <div>
          <div style={{ marginBottom: 16 }} />
          <Button type="primary">
            {formatMessage({
              id: 'exception-404.exception.back',
              defaultMessage: 'Back Home',
            })}
          </Button>
        </div>
      </Link>
    }
  />
);
