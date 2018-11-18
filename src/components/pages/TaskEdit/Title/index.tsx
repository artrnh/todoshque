import * as React from 'react';

import { FormApi } from 'final-form';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Field } from 'react-final-form';
import { Form, Input, Modal } from 'semantic-ui-react';
import styled from 'styled-components';

export interface IProps {
  name: string;
  form: FormApi;
}

@observer
class Title extends React.Component<IProps> {
  @observable
  private editing: boolean = false;
  private input = React.createRef<Input>();

  public componentDidUpdate() {
    if (this.editing && this.input.current) this.input.current.focus();
  }

  @action.bound
  private toggleEditing() {
    this.editing = !this.editing;
    if (!this.editing) this.props.form.submit();
  }

  private submit = e => {
    if (e.key === 'Enter') {
      this.props.form.submit();
      this.toggleEditing();
    }
  };

  private renderText = () => (
    <TitleText onClick={this.toggleEditing}>{this.props.name}</TitleText>
  );

  private renderInput = () => (
    <Field
      name="name"
      render={({ input }) => (
        <Form.Field>
          <EditingInput
            {...input}
            ref={this.input}
            onBlur={this.toggleEditing}
            onKeyPress={this.submit}
            fluid
          />
        </Form.Field>
      )}
    />
  );

  public render() {
    return (
      <Modal.Header>
        {this.editing ? this.renderInput() : this.renderText()}
      </Modal.Header>
    );
  }
}

const TitleText = styled.h1`
  display: inline-block;
  font: inherit;
  border: 1px solid white;
`;

const EditingInput = styled(Input)`
  &.ui.input > input {
    padding: 0 !important;
    font-size: 20px;
    line-height: 1.285em;
    font-weight: bold;
  }
`;

export default Title;
