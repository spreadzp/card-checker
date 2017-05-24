import * as React from 'react';
//import * as TodoActions from '../../actions/todos';
import * as style from './style.css';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
//import { RootState } from '../../reducers';
import { Header, MainSection } from '../../components';

export namespace App {
  export interface Props extends RouteComponentProps<void> { 
  }

  export interface State {
    /* empty */
  }
}

@connect()
export class App extends React.Component<App.Props, App.State> {

  render() { 
    return (
      <div className={style.normal}>
        <Header/>
        <MainSection/> 
      </div>
    );
  }
}

// function mapStateToProps(state: RootState) {
//   return {
//     todos: state.todos
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions as any, dispatch)
//   };
// }
