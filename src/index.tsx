import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'mobx-react';
import 'semantic-ui-css/semantic.min.css';
import 'Utils/firebase';

import App from './App';
import stores from './stores';

render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
