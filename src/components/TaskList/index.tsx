import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Card } from 'semantic-ui-react';

import { ITaskStore } from '../../stores/TaskStore';
import AddTask from './AddTask';
import TaskCard from './TaskCard';

export interface IProps {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class TaskList extends React.Component<IProps> {
  public render() {
    return (
      <>
        <AddTask />
        <Card.Group>
          {this.renderTasks()}
        </Card.Group>
      </>
    );
  }

  private renderTasks() {
    return this.props.tasks.items.map((task) => (
      <TaskCard
        title={task.title}
      />
    ));
  }
}

export default TaskList;
