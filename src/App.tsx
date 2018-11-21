import * as React from 'react';

import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

import Layout from 'Common/Layout';
import TaskList from 'Pages/TaskList';

const App: React.SFC = () => (
  <Layout
    render={() => (
      <>
        <Header as="h1">
          <Icon name="tasks" />
          <Header.Content>Ultimate todoshque</Header.Content>
        </Header>

        <Switch>
          <Route path="/tasks" component={TaskList} />
          <Route render={() => <Redirect to="/tasks" />} />
        </Switch>
      </>
    )}
  />
);

export default hot(module)(App);
