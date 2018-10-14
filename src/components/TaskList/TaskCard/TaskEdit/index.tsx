import * as React from 'react';

import { FormApi } from 'final-form';
import * as _ from 'lodash';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Field, Form as FinalForm } from 'react-final-form';
import { Button, Form, Icon, Modal, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

import { ITask, ITaskEditFormFields, ITaskStore } from 'Stores/TaskStore';
import { normalizeFFValues } from 'Utils/index';

export interface IProps extends ITask {
  trigger: React.ReactNode;
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class TaskEdit extends React.Component<IProps> {
  @computed
  get currentTask(): ITask {
    return this.props.tasks.items.find(task => task.id === this.props.id);
  }

  private handleSubmit = (id: string) => (
    fields: ITaskEditFormFields,
    form: FormApi,
  ): void => {
    const { editTask, toggleEditingModal } = this.props.tasks;

    editTask(id, normalizeFFValues(form));
    toggleEditingModal();
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
    const { title, trigger, description, id } = this.props;
    const { editingModalOpened, toggleEditingModal } = this.props.tasks;

    return (
      <FinalForm
        onSubmit={this.handleSubmit(id)}
        initialValues={{ description }}
        render={({ handleSubmit, values, form }) => (
          <Modal
            trigger={trigger}
            centered={false}
            open={editingModalOpened}
            onClose={toggleEditingModal}
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
