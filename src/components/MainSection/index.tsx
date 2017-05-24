import * as React from 'react';
import * as style from './style.css';
import { NumberCardInput } from '../NumberCardInput';

export namespace MainSection {
  export interface Props {
  }

  export interface State {
  }
}

export class MainSection extends React.Component<MainSection.Props, MainSection.State> {

  constructor(props?: MainSection.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <section>
        <NumberCardInput/>
      </section>
    );
  }
}
