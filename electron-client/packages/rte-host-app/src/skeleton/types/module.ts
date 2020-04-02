import { MenuDataItem } from '@ant-design/pro-layout';
import { ComponentType } from 'react';

export interface ResolvedModule {
  default: ComponentType<any>;
  reducer?: object;
}

export interface Module {
  id: string;
  getName: () => string;
  type: 'page' | 'module' | 'app' | 'widget' | 'extension';

  getMenu?: () => MenuDataItem;
  component?: React.ComponentType;
  loader?: () => Promise<ResolvedModule>;
}
