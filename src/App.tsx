import * as React from 'react';

import { hot } from 'react-hot-loader';
import { Header, Icon } from 'semantic-ui-react';

import Layout from 'Components/Layout';
import TaskList from 'Components/TaskList';

const App: React.SFC = () => (
  <Layout
    render={() => (
      <>
        <Header as='h1'>
          <Icon name='tasks' />
          <Header.Content>Ultimate todoshque</Header.Content>
        </Header>
        <TaskList />
      </>
    )}
  />
);

export default hot(module)(App);
