import * as React from 'react';
import { render } from 'react-dom';

import { Provider as MobxProvider } from 'mobx-react';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { RouteComponentProps, Router } from 'react-router-dom';

import App from './App';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);

render(
  <MobxProvider {...stores}>
    <Router history={history}>
      <App {...({} as RouteComponentProps<any>)} />
    </Router>
  </MobxProvider>,
  document.getElementById('root'),
);
