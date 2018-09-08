import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Card } from 'semantic-ui-react';

import { ITaskStore } from '../../stores/TaskStore';
import styled from '../../styled';
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
  public componentDidMount() {
    this.props.tasks.loadItems();
  }

  public render() {
    return (
      <>
        <AddTask />
        {this.renderHeader()}
        <Card.Group>
          {this.renderTasks()}
        </Card.Group>
      </>
    );
  }

  private renderHeader = (): React.ReactNode => {
    if (this.props.tasks.isEmpty) return null;

    return (
      <Header>
        <Filters />
        <Search />
      </Header>
    );
  }

  private renderTasks = (): React.ReactNode[] => {
    return this.props.tasks.filteredItems.map((task) => (
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
  }
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export default TaskList;
