import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { Input } from 'semantic-ui-react';
import styled from '../../../styled';

const AddTask: React.SFC = () => (
  <Form
    onSubmit={(fields) => console.log(fields)}
    render={({ handleSubmit }) => (
      <AddTaskForm onSubmit={handleSubmit}>
        <Field
          name='addTask'
          render={({ input }) => (
            <Input
              {...input}
              style={{ width: '100%' }}
              size='huge'
              placeholder='What needs to be done?'
            />
          )}
        />
      </AddTaskForm>
    )}
  />
);

const AddTaskForm = styled.form`
  margin-bottom: 20px;
`;

export default AddTask;
