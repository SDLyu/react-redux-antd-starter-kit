import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';

import configureStore from './store/configureStore';

import App from './containers/app/App';
import Home from './containers/home/Home';
import Register from './containers/register/Register';
import Login from './containers/login/Login';
import Explore from './containers/explore/Explore';

import Profile from './containers/profile/Profile';
import Record from './containers/record/Record';
import Following from './containers/following/Following';

import RestrictPage from './containers/misc/RestrictPage';
import NotFound from './containers/misc/NotFound';

import './index.css';

const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/explore" component={Explore}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>

          <Route component={RestrictPage}>
              <Route path="/profile" component={Profile}/>
              <Route path="/record" component={Record}/>
              <Route path="/following" component={Following}/>
          </Route>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
);
