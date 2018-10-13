import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Card } from 'semantic-ui-react';
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
class TaskList extends React.Component<IProps> {
  public static Header;

  public componentDidMount() {
    this.props.tasks.loadItems();
  }

  private renderTasks = (): React.ReactNode[] => {
    return this.props.tasks.filteredItems.map(task => (
      <TaskCard
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        createdAt={task.createdAt}
        completed={task.completed}
        completedAt={task.completedAt}
      />
    ));
  };

  public render() {
    return (
      <>
        <AddTask />
        <TaskList.Header isEmpty={this.props.tasks.isEmpty} />
        <Card.Group>{this.renderTasks()}</Card.Group>
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export default TaskList;
