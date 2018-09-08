import * as React from 'react';

import { inject, observer } from 'mobx-react';
import * as moment from 'moment';
import { Field, Form as FinalForm } from 'react-final-form';
import { Form, Modal, TextArea } from 'semantic-ui-react';

export interface IProps {
  id: string;
  title: string;
  description: string;
  createdAt: moment.Moment;
  completed: boolean;
  completedAt: moment.Moment;
  trigger: JSX.Element;
}

@inject('tasks')
@observer
class TaskEdit extends React.Component<IProps> {
  public render() {
    const { title, trigger, description } = this.props;

    return (
      <Modal trigger={trigger} centered={false}>

        <Modal.Header>
          {title}
        </Modal.Header>

        <Modal.Content>
          <Modal.Description>

            <FinalForm
              onSubmit={() => null}
              render={() => (
                <Form>
                  <Field
                    name='description'
                    render={({ input }) => (
                      <TextArea
                        {...input}
                        placeholder='Add description...'
                        autoHeight
                      />
                    )}
                  />
                </Form>
              )}
            />

          </Modal.Description>
        </Modal.Content>

      </Modal>
    );
  }
}

export default TaskEdit;
