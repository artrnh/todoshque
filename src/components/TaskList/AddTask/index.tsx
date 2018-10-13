import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Field, Form } from 'react-final-form';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

import { ITaskStore } from 'Stores/TaskStore';

export interface IProps {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class AddTask extends React.Component<IProps> {
  private handleSubmit = ({ handleSubmit, form }) => (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    handleSubmit(e);
    form.reset();
  };

  public render() {
    return (
      <Form
        onSubmit={this.props.tasks.addTask}
        render={({ handleSubmit, form }) => (
          <AddTaskForm onSubmit={this.handleSubmit({ handleSubmit, form })}>
            <Field
              name="addTask"
              render={({ input }) => (
                <Input
                  {...input}
                  fluid
                  size="huge"
                  placeholder="What needs to be done?"
                />
              )}
            />
          </AddTaskForm>
        )}
      />
    );
  }
}

const AddTaskForm = styled.form`
  margin-bottom: 20px;
`;

export default AddTask;
