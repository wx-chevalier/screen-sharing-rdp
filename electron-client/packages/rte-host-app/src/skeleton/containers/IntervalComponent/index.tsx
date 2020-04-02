import React from 'react';

export abstract class IntervalComponent<P, S> extends React.PureComponent<
  P,
  S
> {
  intervalHandler: any;
  interval: number;

  componentDidMount() {
    this.onInterval();

    this.intervalHandler = setInterval(() => {
      this.onInterval();
    }, this.interval || 15 * 1000);
  }

  componentWillUnmount() {
    if (this.intervalHandler) {
      clearInterval(this.intervalHandler);
    }
  }

  onInterval: Function;
}
