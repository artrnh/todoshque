import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { Input } from 'semantic-ui-react';

const AddTask: React.SFC = () => (
  <Form
    onSubmit={(fields) => console.log(fields)}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field
          name='addTask'
          render={({ input }) => (
            <Input style={{ width: '100%' }} {...input} size='huge' placeholder='What needs to be done?' />
          )}
        />
      </form>
    )}
  />
);

export default AddTask;
