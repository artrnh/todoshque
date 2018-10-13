import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Button, ButtonProps, Card, Icon, Label } from 'semantic-ui-react';
const { Content, Header, Meta, Description } = Card;
import styled from 'styled-components';

import { ITask, ITaskStore } from 'Stores/TaskStore';
import TaskEdit from './TaskEdit';

export interface IProps extends ITask {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class TaskCard extends React.Component<IProps> {
  public static Btn;
  public static Date;
  public static Description;

  private deleteTask = (): void => this.props.tasks.deleteTask(this.props.id);

  private completeTask = (): void => this.props.tasks.toggleTask(this.props.id);

  public render() {
    const {
      completed,
      completedAt,
      createdAt,
      title,
      tasks,
      description,
    } = this.props;

    return (
      <Card fluid>
        <Content>
          <Header>
            <TaskCard.Btn
              onClick={this.completeTask}
              floated="left"
              color={completed ? null : 'green'}
            >
              <Icon name="check" color={completed ? 'green' : null} />
            </TaskCard.Btn>

            <TaskTitle completed={completed}>{title}</TaskTitle>

            <TaskCard.Btn onClick={this.deleteTask} floated="right" color="red">
              <Icon name="trash" />
            </TaskCard.Btn>

            <TaskEdit
              {...this.props}
              trigger={
                <TaskCard.Btn
                  floated="right"
                  color="green"
                  disabled={completed}
                  onClick={tasks.toggleEditingModal}
                >
                  <Icon name="pencil" />
                </TaskCard.Btn>
              }
            />

            {completed && (
              <Label color="green" attached="bottom">
                Completed
              </Label>
            )}
          </Header>

          <TaskCard.Date
            completed={completed}
            completedAt={completedAt}
            createdAt={createdAt}
          />
          <TaskCard.Description
            description={description}
            completed={completed}
          />
        </Content>
      </Card>
    );
  }
}

TaskCard.Btn = (props: ButtonProps): React.ReactNode => (
  <Button icon compact circular {...props}>
    {props.children}
  </Button>
);

TaskCard.Description = ({
  completed,
  description,
}: IProps): React.ReactNode | null => {
  if (!description) return null;

  return completed ? (
    <CompletedDescription>{description}</CompletedDescription>
  ) : (
    <Description>{description}</Description>
  );
};

TaskCard.Date = ({
  completed,
  completedAt,
  createdAt,
}: IProps): React.ReactNode => {
  const word = completed ? 'Completed' : 'Created';
  const fromNow = completed ? completedAt.fromNow() : createdAt.fromNow();

  return <Moment>{`${word} ${fromNow}`}</Moment>;
};

const TaskTitle = styled.h3<{ completed: boolean }>`
  display: inline-block;
  margin: 0;
  padding: 0 10px;

  color: ${props => props.completed && 'grey'};
`;

const CompletedDescription = styled(Description)`
  color: grey !important;
  text-decoration: line-through;
`;

const Moment = styled(Meta)`
  margin-left: 45px;
`;

export default TaskCard;
