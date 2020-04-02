import classnames from 'classnames';
import React, { Component } from 'react';

import * as styles from './index.less';

type Key = React.Key | null;

interface MenuItemProps {
  isSelected?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const MenuItem = (props: MenuItemProps) => {
  const cl: string = props.isSelected
    ? classnames(styles.memuItemContainer, styles.menuItemSelected)
    : styles.memuItemContainer;
  return (
    <div className={cl} onClick={props.onClick}>
      <div className={styles.menuItemContent}>{props.children}</div>
    </div>
  );
};

interface MenuProps {
  defaultKey?: string;
  selectedKey?: string;
  onSelect?: (key: Key) => void;
}

interface MenuState {
  selectedKey: Key;
}

export class Menu extends Component<MenuProps, MenuState> {
  static Item = MenuItem;

  constructor(props: MenuProps) {
    super(props);
    let selectedKey: Key = null;
    if ('defaultKey' in props) {
      selectedKey = props.defaultKey!;
    }
    if ('selectedKey' in props) {
      selectedKey = props.selectedKey!;
    }
    this.state = {
      selectedKey: selectedKey,
    };
  }

  componentWillReceiveProps(newProps: MenuProps) {
    if ('selectedKey' in newProps) {
      this.setState({
        selectedKey: newProps.selectedKey!,
      });
    }
  }

  handleItemClick = (key: Key) => {
    if (!('selectedKey' in this.props)) {
      this.setState({
        selectedKey: key,
      });
    }
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(key);
    }
  };

  render() {
    return (
      <div className={styles.menuContainer}>
        {React.Children.map(
          this.props.children,
          (item: React.ReactElement<MenuItemProps>) => {
            return React.cloneElement(item, {
              isSelected: this.state.selectedKey === item.key,
              onClick: () => this.handleItemClick(item.key),
            } as MenuItemProps);
          },
        )}
      </div>
    );
  }
}
