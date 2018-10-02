import * as React from 'react';

import * as _ from 'lodash';
import { inject, observer } from 'mobx-react';
import * as moment from 'moment';
import { Field, Form as FinalForm } from 'react-final-form';
import { Button, Form, Modal, TextArea } from 'semantic-ui-react';
import { ITaskStore } from '../../../../stores/TaskStore';

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
  public render() {
    const { title, trigger, description, id } = this.props;

    return (
      <FinalForm
        onSubmit={this.props.tasks.editTask(id)}
        initialValues={{ title, description }}
        render={({ handleSubmit }) => (
          <Modal trigger={trigger} centered={false}>

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

                  <Button htmltype='submit'>
                    Сохранить
                  </Button>

                </Form>

              </Modal.Description>
            </Modal.Content>

          </Modal>
        )}
      />
    );
  }
}

export default TaskEdit;
