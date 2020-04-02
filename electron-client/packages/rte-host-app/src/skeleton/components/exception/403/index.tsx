import { Button, Result } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { formatMessage } from '@/i18n';

export const Exception403 = () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({
      id: 'exception-403.description.403',
      defaultMessage: "Sorry, you don't have access to this page.",
    })}
    extra={
      <Link to="/">
        <Button type="primary">
          {formatMessage({
            id: 'exception-403.exception.back',
            defaultMessage: 'Back Home',
          })}
        </Button>
      </Link>
    }
  />
);
