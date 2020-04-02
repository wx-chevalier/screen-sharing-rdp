import {
  ApiOutlined,
  AppstoreOutlined,
  CompassOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import React from 'react';
import { RouteProps } from 'react-router-dom';

import { DeviceHome } from '@/apps/device/containers/DeviceHome';
import { Workspace } from '@/apps/operator/containers/Workspace';

import { SoftwareMesh } from '../SoftwareMesh';
import { Support } from '../Support';

export interface MenuConfig {
  menuProps: {
    disabled?: boolean;
    text: string;
    icon: string;
  };
  routeProps: RouteProps;
}

export const menuConfigs: MenuConfig[] = [
  {
    menuProps: {
      disabled: false,
      text: '工作区',
      icon: ((<AppstoreOutlined />) as unknown) as string,
    },
    routeProps: {
      path: '/workspace',
      component: Workspace,
      exact: true,
    },
  },
  {
    menuProps: {
      disabled: false,
      text: '设备管理',
      icon: ((<ApiOutlined />) as unknown) as string,
    },
    routeProps: {
      path: '/device',
      component: DeviceHome,
      exact: true,
    },
  },
  {
    menuProps: {
      disabled: false,
      text: '软件工具',
      icon: ((<CompassOutlined />) as unknown) as string,
    },
    routeProps: {
      path: '/software',
      component: SoftwareMesh,
      exact: true,
    },
  },
  {
    menuProps: {
      disabled: false,
      text: '联系我们',
      icon: ((<MessageOutlined />) as unknown) as string,
    },
    routeProps: {
      path: '/support',
      component: Support,
    },
  },
];
