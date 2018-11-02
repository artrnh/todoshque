import * as React from 'react';

import { FormApi } from 'final-form';
import * as _ from 'lodash';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { Field, Form as FinalForm } from 'react-final-form';
import { RouteComponentProps } from 'react-router';
import { Button, Form, Icon, Loader, Modal, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

import { ITask, ITaskEditFormFields, ITaskStore } from 'Stores/TaskStore';
import { normalizeFFValues } from 'Utils/index';

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
    this.toggleModal(form, false);
  };

  private toggleModal = (form: FormApi, state = true) => () => {
    if (!state) this.props.routing.push('/tasks');
    this.props.tasks.changeEditingModalState(state);
    form.reset();
  };

  private renderSaveButtons(
    values: ITaskEditFormFields,
    reset: () => void,
  ): React.ReactNode | null {
    if (this.currentTask.description === values.description) return null;

    return (
      <>
        <Button htmltype="submit" color="green">
          Сохранить
        </Button>

        <CancelIcon
          onClick={reset}
          name="close"
          size="large"
          color="grey"
          link
        />
      </>
    );
  }

  public render() {
    if (!this.currentTask) {
      return <Loader size="massive">Loading...</Loader>;
    }

    const { title, description, id } = this.currentTask;
    const { editingModalOpened } = this.props.tasks;

    return (
      <FinalForm
        onSubmit={this.handleSubmit(id)}
        initialValues={{ description }}
        render={({ handleSubmit, values, form }) => (
          <Modal
            centered={false}
            open={editingModalOpened}
            onClose={this.toggleModal(form, false)}
          >
            <Modal.Header>{title}</Modal.Header>

            <Modal.Content>
              <Modal.Description>
                <Form onSubmit={handleSubmit}>
                  <Field
                    name="description"
                    render={({ input }) => (
                      <Form.Field>
                        <label>Description</label>
                        <TextArea
                          {...input}
                          placeholder="Add description..."
                          autoHeight
                        />
                      </Form.Field>
                    )}
                  />

                  {this.renderSaveButtons(
                    values as ITaskEditFormFields,
                    form.reset,
                  )}
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )}
      />
    );
  }
}

const CancelIcon = styled(Icon)`
  margin-left: 5px !important;
`;

export default TaskEdit;