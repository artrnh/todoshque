import * as React from 'react';

import { FormApi } from 'final-form';
import * as _ from 'lodash';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { Form as FinalForm } from 'react-final-form';
import { RouteComponentProps } from 'react-router';
import { Form, Modal } from 'semantic-ui-react';

import { ITask } from 'Models/Task';
import { ITaskEditFormFields, ITaskStore } from 'Stores/TaskStore';
import { normalizeFFValues } from 'Utils/index';
import Description from './Description';
import Title from './Title';

export interface IProps extends ITask {
  trigger: React.ReactNode;
  tasks?: ITaskStore;
  routing?: RouterStore;
}

@inject('routing', 'tasks')
@observer
class TaskEdit extends React.Component<
  IProps & RouteComponentProps<{ id: string }>
> {
  public componentDidMount() {
    const { editingModalOpened, changeEditingModalState } = this.props.tasks;
    if (!editingModalOpened) changeEditingModalState(true);
  }

  @computed
  get currentTask(): ITask {
    return this.props.tasks.items.find(
      task => task.id === this.props.match.params.id,
    );
  }

  private handleSubmit = (id: string) => (
    fields: ITaskEditFormFields,
    form: FormApi,
  ): void => {
    this.props.tasks.editTask(id, normalizeFFValues(form));
  };

  private toggleModal = (reset: () => void, state = true) => () => {
    if (!state) this.props.routing.push('/tasks');
    this.props.tasks.changeEditingModalState(state);
    reset();
  };

  public render() {
    if (!this.currentTask) return null;

    const { name, description, id } = this.currentTask;
    const { editingModalOpened } = this.props.tasks;

    return (
      <FinalForm
        onSubmit={this.handleSubmit(id)}
        initialValues={{ name, description }}
        render={({ handleSubmit, values, form }) => (
          <Form onSubmit={handleSubmit}>
            <Modal
              open={editingModalOpened}
              onClose={this.toggleModal(form.reset, false)}
              centered={false}
            >
              <Title name={name} form={form} />

              <Modal.Content>
                <Description
                  currentTask={this.currentTask}
                  values={values as ITaskEditFormFields}
                  form={form}
                  handleSubmit={handleSubmit}
                />
              </Modal.Content>
            </Modal>
          </Form>
        )}
      />
    );
  }
}

export default TaskEdit;
