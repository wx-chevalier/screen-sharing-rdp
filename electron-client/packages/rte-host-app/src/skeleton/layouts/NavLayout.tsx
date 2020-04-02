import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
} from '@ant-design/pro-layout';
import * as React from 'react';
import { Link } from 'react-router-dom';

import BlueLogo from '@/assets/logo_blue.svg';
import ULogo from '@/assets/logo_u.svg';
import { formatMessage } from '@/i18n';
import { checkPermissions } from '@/skeleton/auth';
import { getAuthority, setAuthority } from '@/skeleton/auth/authority';

import { RightContent } from '../components/GlobalHeader/RightContent';

import { NavContext } from './NavContext';

import * as styles from './index.less';

export interface NavLayoutProps extends ProLayoutProps {
  matchedPath?: string;
}

/**
 * use AuthorizedWrapper check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return checkPermissions(item.authority, localItem, null) as MenuDataItem;
  });

const defaultRenderCollapsedButton = (collapsed?: boolean) =>
  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;

const footerRender: NavLayoutProps['footerRender'] = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        left: '45vw',
        fontSize: 10,
      }}
    >
      <div>© 2019-2020 Unionfab 版权所有ICP 证：</div>
      <a href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action">
        沪ICP备17023219号
      </a>
    </div>
  );
};

export const NavLayout: React.FC<NavLayoutProps> = props => {
  const { children, matchedPath } = props;
  const [authority, _setAuthority] = React.useState(getAuthority());

  const [collapsed, toggleCollapse] = React.useState(true);

  const handleMenuCollapse = (payload: boolean): void => {
    toggleCollapse(payload);
  };

  return (
    <NavContext.Provider
      value={{
        authority: authority,
        onAuthorityChange: (a: string[]) => {
          setAuthority(a);
          _setAuthority(a);
        },
      }}
    >
      <ProLayout
        {...props}
        collapsed={collapsed}
        logo={
          collapsed ? (
            <ULogo style={{ transform: 'scale(0.2)' }} />
          ) : (
            <BlueLogo style={{ transform: 'scale(0.2)' }} />
          )
        }
        route={{
          name: 'Root',
          routes: [],
        }}
        title="优联云·运营平台"
        siderWidth={240}
        navTheme={'light'}
        menuDataRender={menuDataRender}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          // 判断是否选中
          if ((matchedPath || '').startsWith(menuItemProps.path)) {
            return (
              <div
                className={
                  collapsed ? styles.selectedMenuCollapsed : styles.selectedMenu
                }
              >
                {defaultDom}
              </div>
            );
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        collapsedButtonRender={_collapsed => {
          return (
            <span>
              <span>{defaultRenderCollapsedButton(_collapsed)}</span>
              <span style={{ marginLeft: 8, fontSize: 16 }}>
                优联云·运营平台
              </span>
            </span>
          );
        }}
        breadcrumbRender={(routers = []) => {
          return [
            {
              path: '/',
              breadcrumbName: formatMessage({
                id: 'menu.home',
                defaultMessage: 'Home',
              }),
            },
            ...routers,
          ];
        }}
        itemRender={(route, _, routes, paths) => {
          const first = routes.indexOf(route) === 0;

          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        onCollapse={handleMenuCollapse}
      >
        {children}
      </ProLayout>
    </NavContext.Provider>
  );
};
