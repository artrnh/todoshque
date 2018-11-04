import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Card, Loader, Message } from 'semantic-ui-react';
import styled from 'styled-components';

import { ITaskStore } from 'Stores/TaskStore';
import AddTask from './AddTask';
import Filters from './Filters';
import Search from './Search';
import TaskCard from './TaskCard';

export interface IProps {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class TaskList extends React.Component<IProps & RouteComponentProps<{}>> {
  public static Header;
  public static Empty;

  public componentDidMount() {
    this.props.tasks.loadItems();
  }

  private renderTasks = (): React.ReactNode | React.ReactNode[] => {
    if (this.props.tasks.loading) {
      return <Spinner active size="massive" inline="centered" />;
    }

    if (this.props.tasks.isEmpty) {
      return <TaskList.Empty />;
    }

    return (
      <Card.Group>
        {this.props.tasks.filteredItems.map(task => (
          <TaskCard key={task.id} {...task} />
        ))}
      </Card.Group>
    );
  };

  public render() {
    return (
      <>
        <AddTask />
        <TaskList.Header isEmpty={this.props.tasks.isEmpty} />
        {this.renderTasks()}
      </>
    );
  }
}

TaskList.Header = ({ isEmpty }: { isEmpty: boolean }) =>
  isEmpty ? null : (
    <Header>
      <Filters />
      <Search />
    </Header>
  );

TaskList.Empty = () => (
  <EmptyMessage info>
    <Message.Header>There's no tasks here!</Message.Header>
    <p>Does this mean that you have already done everything?</p>
  </EmptyMessage>
);

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const EmptyMessage = styled(Message)`
  margin: 0 !important;
`;

const Spinner = styled(Loader)`
  margin-top: 50px !important;
`;

export default TaskList;
