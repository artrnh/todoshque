import * as React from 'react';
import { hot } from 'react-hot-loader';

import { RouteComponentProps } from 'react-router-dom';

import { Route, Switch } from 'react-router-dom';

const App: React.SFC<RouteComponentProps<any>> = (props) => {
  return (
    <div>Ну че</div>
  );
};

export default hot(module)(App);
