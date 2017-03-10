import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, onEnter } from 'react-router';
import { DatePicker, message } from 'yo-component';
import 'yo-component/dist/antd.css';
import reducer from './reducers/reducer';
import LinkChart from './linkchart/LinkChart';
import MyMenu from './layouts/MyMenu';
import Tabs from './pages/Tabs';
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

render(
  <Provider store={store} >
    <div>
    <Router history={browserHistory}>
      <Route path="/" component={MyMenu} >
        <IndexRoute component={LinkChart} />
        <Route path="myworkflow" component={Tabs} />
      </Route>
    </Router>
    {/*<DevTools />*/}
    </div>
  </Provider>,
  document.getElementById("root")
);