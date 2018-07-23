import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Header, Icon } from 'semantic-ui-react';

import TaskList from './components/TaskList';
import Layout from './hoc/Layout';

const App: React.SFC = () => {
  return (
    <Layout>
      <Header as='h1'>
        <Icon name='tasks' />
        <Header.Content>Ultimate todoshque</Header.Content>
      </Header>
      <TaskList />
    </Layout>
  );
};

export default hot(module)(App);
