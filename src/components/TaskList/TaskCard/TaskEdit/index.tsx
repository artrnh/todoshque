import * as React from 'react';

import * as _ from 'lodash';
import { action, computed, observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as moment from 'moment';
import { Field, Form as FinalForm } from 'react-final-form';
import { Button, Form, Icon, Modal, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

import { ITaskEditFormFields, ITaskStore } from '../../../../stores/TaskStore';

export interface IProps {
  id: string;
  title: string;
  description: string;
  createdAt: moment.Moment;
  completed: boolean;
  completedAt: moment.Moment;
  trigger: JSX.Element;

  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class TaskEdit extends React.Component<IProps> {
  @computed
  get currentTask() {
    return this.props.tasks.items.find((task) => task.id === this.props.id);
  }

  public render() {
    const { title, trigger, description, id, tasks } = this.props;

    // Magic
    console.log(tasks.editingModalOpened);

    return (
      <FinalForm
        onSubmit={this.handleSubmit(id)}
        initialValues={{ title, description }}
        render={({ handleSubmit, values, form }) => (
          <Modal
            trigger={trigger}
            centered={false}
            open={tasks.editingModalOpened}
            onClose={tasks.toggleEditingModal}
          >

            <Modal.Header>
              {title}
            </Modal.Header>

            <Modal.Content>
              <Modal.Description>

                <Form onSubmit={handleSubmit}>
                  <Field
                    name='description'
                    render={({ input }) => (
                      <Form.Field>
                        <label>Description</label>
                        <TextArea
                          {...input}
                          placeholder='Add description...'
                          autoHeight
                        />
                      </Form.Field>
                    )}
                  />

                  {this.renderSaveButtons(values, form.reset)}

                </Form>

              </Modal.Description>
            </Modal.Content>

          </Modal>
        )}
      />
    );
  }

  private renderSaveButtons(values, reset) {
    if (this.currentTask.description === values.description) return null;

    return (
      <>
        <Button
          htmltype='submit'
          color='green'
        >
          Сохранить
        </Button>

        <CancelIcon
          onClick={reset}
          name='close'
          size='large'
          color='grey'
          link
        />
      </>
    );
  }

  private handleSubmit = (id: string) => (fields: ITaskEditFormFields) => {
    const { editTask, toggleEditingModal } = this.props.tasks;
    editTask(id, fields);
    toggleEditingModal();
  }
}

const CancelIcon = styled(Icon)`
  margin-left: 5px !important;
`;

export default TaskEdit;
