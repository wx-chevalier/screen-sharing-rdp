import { Spin } from 'antd';
import * as React from 'react';

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
export const PageLoading: React.FC = () => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
);
