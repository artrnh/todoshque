import * as React from 'react';

import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { Button, ButtonProps, Card, Icon, Label } from 'semantic-ui-react';
const { Content, Header, Meta, Description } = Card;
import styled from 'styled-components';

import { ITask } from 'Models/Task';
import { ITaskStore } from 'Stores/TaskStore';
import ConfirmDelete from './ConfirmDelete';

export interface IProps extends ITask {
  tasks?: ITaskStore;
  routing?: RouterStore;
}

@inject('routing', 'tasks')
@observer
class TaskCard extends React.Component<IProps> {
  public static Btn;
  public static Date;
  public static Description;

  @observable
  private confirmOpened: boolean = false;

  @action.bound
  private toggleConfirm() {
    this.confirmOpened = !this.confirmOpened;
  }

  private deleteTask = (): void => {
    this.props.tasks.deleteTask(this.props.id);
    this.toggleConfirm();
  };

  private completeTask = (): void => this.props.tasks.toggleTask(this.props.id);

  private redirectToEdit = (): void => {
    this.props.routing.push(`/tasks/${this.props.id}`);
    this.props.tasks.changeEditingModalState();
  };

  public render() {
    const { completed, completedAt, createdAt, name, description } = this.props;

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

            <TaskName completed={completed}>{name}</TaskName>

            <ConfirmDelete
              deleteTask={this.deleteTask}
              toggleConfirm={this.toggleConfirm}
              opened={this.confirmOpened}
              trigger={
                <TaskCard.Btn
                  onClick={this.toggleConfirm}
                  floated="right"
                  color="red"
                >
                  <Icon name="trash" />
                </TaskCard.Btn>
              }
            />

            <TaskCard.Btn
              floated="right"
              color="green"
              disabled={completed}
              onClick={this.redirectToEdit}
            >
              <Icon name="pencil" />
            </TaskCard.Btn>

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

const TaskName = styled.h3<{ completed: boolean }>`
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
