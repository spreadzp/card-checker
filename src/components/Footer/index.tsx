import * as React from 'react';
import * as style from './style.css';

export namespace Footer {
  export interface Props {
  }

  export interface State {
  }
}

export class Footer extends React.Component<Footer.Props, Footer.State> {
  render() {
    return (
      <footer className={style.normal}>
      </footer>
    );
  }
}
