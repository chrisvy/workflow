import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, onEnter } from 'react-router';
import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css';
import Reducer from './redux/reducer';
// import Menu from './layouts/menu';
// import Context from './layouts/context';
import MyMenu from './layouts/MyMenu';
import Tabs from './containers/myoverflow';

const store = createStore(Reducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('Selected Date: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>Date: {this.state.date.toString()}</div>
      </div>
    );
  }
}

render(
  <Provider store={store} >
    <div>
    <Router history={browserHistory}>
      <Route path="/" component={MyMenu} >
        <IndexRoute component={App} />
        <Route path="myoverflow" component={Tabs} />
      </Route>
    </Router>
    {/*<DevTools />*/}
    </div>
  </Provider>,
  document.getElementById("root")
);