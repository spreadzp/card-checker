import * as React from 'react';
import * as style from './style.css';
import { RouteComponentProps } from 'react-router';
import { Header, MainSection } from '../../components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
  }

  export interface State {
  }
}

export class App extends React.Component<App.Props, App.State> {

  render() {
    return (
      <div className={style.normal}>
        <Header />
        <MainSection />
      </div>
    );
  }
}
