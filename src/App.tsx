import * as React from 'react';

import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

import Layout from 'Common/Layout';
import TaskEdit from 'Pages/TaskEdit';
import TaskList from 'Pages/TaskList';

const App: React.SFC = () => (
  <Layout
    render={() => (
      <>
        <Header as="h1">
          <Icon name="tasks" />
          <Header.Content>Ultimate todoshque</Header.Content>
        </Header>

        <Route exact path="/" render={() => <Redirect to="/tasks" />} />
        <Route path="/tasks" component={TaskList} />
        <Route path="/tasks/:id" component={TaskEdit} />
      </>
    )}
  />
);

export default hot(module)(App);
