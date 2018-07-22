import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Header as Title, Icon } from 'semantic-ui-react';
import styled from './styled';

import TaskList from './components/TaskList';
import Layout from './hoc/Layout';

const App: React.SFC = () => {
  return (
    <Layout>
      <Header>
        <Title as='h1'>
          <Icon name='tasks' />
          <Title.Content>Ultimate todoshque</Title.Content>
        </Title>
        <CodeLink href='https://github.com/artrnh'>
          <Icon name='github alternate' size='huge' />
        </CodeLink>
      </Header>
      <TaskList />
    </Layout>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const CodeLink = styled.a`
  color: rgba(0, 0, 0, .87);
`;

export default hot(module)(App);
