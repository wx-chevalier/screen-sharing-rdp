import { Button, Result } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { formatMessage } from '@/i18n';

export default () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({
      id: 'exception-500.description.500',
      defaultMessage: 'Sorry, the server is reporting an error.',
    })}
    extra={
      <Link to="/">
        <Button type="primary">
          {formatMessage({
            id: 'exception-500.exception.back',
            defaultMessage: 'Back Home',
          })}
        </Button>
      </Link>
    }
  />
);
