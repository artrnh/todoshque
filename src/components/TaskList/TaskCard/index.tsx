import * as React from 'react';

import { inject } from 'mobx-react';
import * as moment from 'moment';
import { Button, ButtonProps, Card, Checkbox, Icon } from 'semantic-ui-react';
const { Content, Header, Meta, Description } = Card;

import { ITaskStore } from '../../../stores/TaskStore';
import styled from '../../../styled';

export interface IProps {
  id: number;
  title: string;
  description?: string;
  createdAt: moment.Moment;
  tasks?: ITaskStore;
}

@inject('tasks')
class TaskCard extends React.Component<IProps> {
  public render() {
    return (
      <Card fluid>
        <Content>
          <Header style={{ fontSize: 20 }}>

            <Checkbox />

            <TaskTitle>
              {this.props.title}
            </TaskTitle>

            <Button
              onClick={this.deleteTask}
              floated='right'
              color='red'
              icon
              compact
              circular
            >
              <Icon name='delete' />
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
          <Meta>Created {this.props.createdAt.fromNow()}</Meta>
          {this.props.description && <Description>{this.props.description}</Description>}
        </Content>
      </Card>
    );
  }

  private deleteTask = (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    this.props.tasks.deleteTask(this.props.id);
  }
}

const TaskTitle = styled.h3`
  display: inline-block;
  margin: 0;
  padding: 0 10px;
`;

export default TaskCard;
