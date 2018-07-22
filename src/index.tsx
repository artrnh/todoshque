import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'mobx-react';
import 'semantic-ui-css/semantic.min.css';

import App from './App';

const stores = {};

render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
