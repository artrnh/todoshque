import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Field, FieldRenderProps, Form, FormRenderProps } from 'react-final-form';
import { Input } from 'semantic-ui-react';

import { ITaskStore } from '../../../stores/TaskStore';

type AddTaskInput = (props: FieldRenderProps) => React.ReactNode;

const AddTaskInput: AddTaskInput = ({ input }) => (
  <Input
    {...input}
    fluid
    size='huge'
    placeholder='What needs to be done?'
  />
);

type AddTaskForm = (props: FormRenderProps) => React.ReactNode;

const AddTaskForm: AddTaskForm = ({ handleSubmit, form }) => {
  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    handleSubmit(e);
    form.reset();
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ marginBottom: 20 }}
    >
      <Field
        name='addTask'
        render={AddTaskInput}
      />
    </form>
  );
};

export interface IProps {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class AddTask extends React.Component<IProps> {
  public render() {
    return (
      <Form
        onSubmit={this.props.tasks.addTask}
        render={AddTaskForm}
      />
    );
  }
}

export default AddTask;
