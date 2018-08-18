import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Card } from 'semantic-ui-react';

import { ITaskStore } from '../../stores/TaskStore';
import AddTask from './AddTask';
import Filters from './Filters';
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
        <Filters />
        <Card.Group>
          {this.renderTasks()}
        </Card.Group>
      </>
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

export default TaskList;
