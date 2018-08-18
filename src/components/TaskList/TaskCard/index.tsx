import * as React from 'react';

import { inject } from 'mobx-react';
import * as moment from 'moment';
import { Button, Card, Icon, Label } from 'semantic-ui-react';
const { Content, Header, Meta, Description } = Card;

import { ITaskStore } from '../../../stores/TaskStore';
import styled from '../../../styled';

export interface IProps {
  id: string;
  title: string;
  description?: string;
  createdAt: moment.Moment;
  completed: boolean;
  completedAt?: moment.Moment;
  tasks?: ITaskStore;
}

@inject('tasks')
class TaskCard extends React.Component<IProps> {
  public render() {
    const { completed, title } = this.props;

    return (
      <Card fluid>
        <Content>
          <Header>

            <Button
              onClick={this.completeTask}
              floated='left'
              icon
              compact
              circular
              color={completed ? null : 'green'}
            >
              <Icon name='check' color={completed ? 'green' : null} />
            </Button>

            <TaskTitle completed={completed}>
              {title}
            </TaskTitle>

            <Button
              onClick={this.deleteTask}
              floated='right'
              color='red'
              icon
              compact
              circular
            >
              <Icon name='trash' />
            </Button>

            <Button
              floated='right'
              color='green'
              icon
              compact
              circular
              disabled={completed}
            >
              <Icon name='pencil' />
            </Button>

            {completed && <Label color='green' attached='bottom'>Completed</Label>}

          </Header>

          {this.renderMoment()}
          {this.renderDescription()}

        </Content>
      </Card>
    );
  }

  private deleteTask = (): void => this.props.tasks.deleteTask(this.props.id);

  private completeTask = (): void => this.props.tasks.toggleTask(this.props.id);

  private renderMoment = (): React.ReactNode => {
    const { completed, completedAt, createdAt } = this.props;

    const word = completed ? 'Completed' : 'Created';
    const fromNow = completed ? completedAt.fromNow() : createdAt.fromNow();

    return (
      <Moment>
        {`${word} ${fromNow}`}
      </Moment>
    );
  }

  private renderDescription = (): React.ReactNode => {
    const { completed, description } = this.props;

    if (!description) return null;

    const style = {
      color: completed && 'grey',
      textDecoration: completed && 'line-through',
      textDecorationColor: 'green',
    };

    return (
      <Description style={style}>
        {description}
      </Description>
    );
  }
}

interface ITaskTitle {
  completed: boolean;
}

const TaskTitle = styled.h3<ITaskTitle>`
  display: inline-block;
  margin: 0;
  padding: 0 10px;

  color: ${(props) => props.completed && 'grey'};
`;

const Moment = styled(Meta)`
  margin-left: 45px;
`;

export default TaskCard;
