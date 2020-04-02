import interact from 'interactjs';
import React from 'react';

const options = ['draggable', 'resizable', 'gesturable', 'dropzone'];
const events = [
  // Interact Events
  'DragStart',
  'DragMove',
  'DragInertiaStart',
  'DragEnd',
  'ResizeStart',
  'ResizeMove',
  'ResizeInertiaStart',
  'ResizeEnd',
  'GestureStart',
  'GestureMove',
  'GestureEnd',
  // Drop Events
  'DropActivate',
  'DropdEactivate',
  'DragEnter',
  'DragLeave',
  'DropMove',
  'Drop',
  // Pointer Events
  'Down',
  'Move',
  'Up',
  'Cancel',
  'Tap',
  'DoubleTap',
  'Hold',
];

const getDisplayName = (BaseComponent: React.ComponentType<any>) =>
  BaseComponent.displayName || 'Component';

export interface InjectedProps {
  getRef: React.Ref<any> | React.LegacyRef<any>;
}
export interface InteractProps {
  draggable?: Interact.DraggableOptions | boolean;
  resizable?: Interact.ResizableOptions | boolean;
  gesturable?: Interact.ResizableOptions | boolean;
  dropzone?: Interact.DropzoneOptions | boolean;
  onDragStart?: Interact.ListenersArg;
  onDragMove?: Interact.ListenersArg;
  onDragEnd?: Interact.ListenersArg;
  onResizeStart?: Interact.ListenersArg;
  onResizeMove?: Interact.ListenersArg;
  onResizeInertiaStart?: Interact.ListenersArg;
  onResizeEnd?: Interact.ListenersArg;
  onGestureStart?: Interact.ListenersArg;
  onGestureMove?: Interact.ListenersArg;
  onGestureEnd?: Interact.ListenersArg;
  onDropActivate?: Interact.ListenersArg;
  onDropdEactivate?: Interact.ListenersArg;
  onDragEnter?: Interact.ListenersArg;
  onDragLeave?: Interact.ListenersArg;
  onDropMove?: Interact.ListenersArg;
  onDrop?: Interact.ListenersArg;
  onDown?: Interact.ListenersArg;
  onMove?: Interact.ListenersArg;
  onUp?: Interact.ListenersArg;
  onCancel?: Interact.ListenersArg;
  onTap?: Interact.ListenersArg;
  onDoubleTap?: Interact.ListenersArg;
  onHold?: Interact.ListenersArg;
}

export const reactable = <RefType, BaseProps extends object>(
  BaseComponent: React.ComponentType<BaseProps & InjectedProps>,
) => {
  type HocProps = Omit<BaseProps, keyof InjectedProps> & InteractProps;

  return class Reactable extends React.PureComponent<HocProps> {
    static displayName = `reactable(${getDisplayName(BaseComponent)})`;
    interactable: Interact.Interactable;
    node = React.createRef<RefType>();

    // componentDidMount of parent is called after all his children is mounted
    componentDidMount() {
      if (!this.node.current) {
        console.error(' you should apply getRef props in the dom element'); // eslint-disable-line
        return;
      }
      this.interactable = interact(this.node.current as any);
      options.forEach(option => {
        if (option in this.props) {
          this.interactable[option](this.props[option]);
        }
      });
      events.forEach(event => {
        const handler = this.props[`on${event}`];
        if (typeof handler === 'function') {
          this.interactable.on(event.toLowerCase(), handler);
        }
      });
    }

    componentWillUnmount() {
      this.interactable.unset();
    }

    baseProps(props: any) {
      const baseProps = { ...props };
      options.forEach(option => delete baseProps[option]);
      events.forEach(event => delete baseProps[`on${event}`]);
      return baseProps;
    }

    render() {
      return (
        <BaseComponent {...this.baseProps(this.props)} getRef={this.node} />
      );
    }
  };
};
