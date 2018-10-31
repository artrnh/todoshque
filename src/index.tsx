import * as React from 'react';
import { render } from 'react-dom';

import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import 'Utils/firebase';

import App from './App';
import allStores from './stores';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

const stores = {
  routing: routingStore,
  ...allStores,
};

render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
