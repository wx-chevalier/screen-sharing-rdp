import { Spin } from 'antd';
import cn from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { ResolvedModule } from '@/skeleton/types';

const { PureComponent, Suspense, lazy } = React;

interface IProps extends RouteComponentProps {
  appId: string;
  appLoader: () => Promise<ResolvedModule>;
  className?: string;
  fallback?: JSX.Element;
  onAppendReducer: (reducer: { [key: string]: object | undefined }) => void;
}

interface IState {
  appError?: any;
}

// 应用缓存
const appCache = {};

/**
 * 应用懒加载与容错的容器
 */
class AppContainer extends PureComponent<IProps, IState> {
  static defaultProps = {
    fallback: <Spin />,
  };

  state: IState = {};

  loadApp() {
    const { appLoader, appId, onAppendReducer } = this.props;

    if (appCache[appId]) {
      return appCache[appId];
    }

    const app = lazy(() =>
      appLoader().then(appModule => {
        if ('reducer' in appModule) {
          onAppendReducer({
            [appId]: appModule.reducer,
          });
        }

        return appModule;
      }),
    );

    appCache[appId] = app;

    return app;
  }

  componentDidCatch(error: object, errorInfo: object) {
    this.setState({ appError: { error, errorInfo } });
  }

  renderErrorPage() {
    const { appError } = this.state;

    return <div type="-1" {...appError} />;
  }

  render() {
    const { className, fallback, appId } = this.props;
    const { appError } = this.state;

    if (appError) {
      return this.renderErrorPage();
    }

    const App = this.loadApp();

    return (
      <div className={cn(className)}>
        <Suspense fallback={fallback || <Spin />}>
          <App appId={appId} />
        </Suspense>
      </div>
    );
  }
}

export default withRouter(AppContainer);
