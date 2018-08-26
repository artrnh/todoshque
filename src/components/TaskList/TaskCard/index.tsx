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
    return (this.renderCard());
  }

  private renderCard = (): React.ReactNode => {
    const { completed, description, title, completedAt, createdAt } = this.props;

    if (completed) {
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
              >
                <Icon name='check' color='green' />
              </Button>

              <TaskTitle completed>
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
                disabled
              >
                <Icon name='pencil' />
              </Button>

            </Header>

            <Moment>
              Completed {completedAt.fromNow()}
            </Moment>

            {description && <CompletedDescription>{description}</CompletedDescription>}

            <Label color='green' attached='bottom'>Completed</Label>

          </Content>
        </Card>
      );
    } else {
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
                color='green'
              >
                <Icon name='check' />
              </Button>

              <TaskTitle>
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
              >
                <Icon name='pencil' />
              </Button>

            </Header>

            <Moment>
              Created {createdAt.fromNow()}
            </Moment>

            {description && <Description>{description}</Description>}

          </Content>
        </Card>
      );
    }
  }

  private deleteTask = (): void => this.props.tasks.deleteTask(this.props.id);

  private completeTask = (): void => this.props.tasks.toggleTask(this.props.id);
}

interface ITaskTitle {
  completed?: boolean;
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

const CompletedDescription = styled(Description)`
  color: grey !important;
  text-decoration: line-through;
  text-decoration-color: green;
`;

export default TaskCard;
