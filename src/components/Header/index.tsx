import * as React from 'react';

import * as style from './style.css';

export namespace Header {
  export interface Props {
  }

  export interface State {
    card: number;
  }
}

export class Header extends React.Component<Header.Props, Header.State> {

  constructor(props?: Header.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <header>
        <h2>Checking card</h2>
      </header>
    );
  }
}
