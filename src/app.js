import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, onEnter } from 'react-router';
import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css';
import reducer from './reducers/reducer';
// import Menu from './layouts/menu';
// import Context from './layouts/context';
import MyMenu from './layouts/MyMenu';
import Tabs from './layouts/Tabs';
import MyTabs from './tabs/index';
import DevTools from './containers/DevTools';

const initialState = {}
const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunk
  ),
  DevTools.instrument()
)

const store = createStore(
  reducer,
  initialState,
  createStoreWithMiddleware
)
// const store = createStore(reducer);

render(
  <Provider store={store} >
    <div>
    <Router history={browserHistory}>
      <Route path="/" component={MyMenu} >
        <IndexRoute component={MyTabs} />
        <Route path="myworkflow" component={Tabs} />
      </Route>
    </Router>
    {/*<DevTools />*/}
    </div>
  </Provider>,
  document.getElementById("root")
);