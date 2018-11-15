import * as React from 'react';

import { FormApi } from 'final-form';
import * as _ from 'lodash';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Field, FormProps } from 'react-final-form';
import styled from 'styled-components';

import {
  Button,
  Form,
  Icon,
  Modal,
  Segment,
  TextArea,
} from 'semantic-ui-react';

import { ITask } from 'Models/Task';
import { ITaskEditFormFields } from 'Stores/TaskStore';

export interface IProps {
  currentTask: ITask;
  values: ITaskEditFormFields;
  form: FormApi;

  handleSubmit(event: React.FormEvent<HTMLFormElement>, data: FormProps): void;
}

@observer
class Description extends React.Component<IProps> {
  @observable
  private editing: boolean = false;
  @observable
  private hovered: boolean = false;
  private textarea = React.createRef<TextArea>();

  public componentDidUpdate() {
    if (this.editing && this.textarea.current) this.textarea.current.focus();
  }

  @action.bound
  private toggleEditing() {
    this.editing = !this.editing;
    this.hovered = false;
  }

  @action.bound
  private toggleHovered() {
    this.hovered = !this.hovered;
  }

  private renderText = () => (
    <DescriptionText
      secondary={this.hovered}
      onMouseOver={this.toggleHovered}
      onMouseOut={this.toggleHovered}
      onClick={this.toggleEditing}
    >
      {this.props.currentTask.description ||
        'Add a more detailed description...'}
    </DescriptionText>
  );

  private renderTextArea = () => (
    <Form onSubmit={this.props.handleSubmit}>
      <Field
        name="description"
        render={({ input }) => (
          <Form.Field>
            <TextArea
              {...input}
              ref={this.textarea}
              onBlur={this.toggleEditing}
              placeholder="Add a more detailed description..."
              autoHeight
            />
          </Form.Field>
        )}
      />

      <Button onMouseDown={this.props.form.submit} color="green">
        Save
      </Button>

      <CancelIcon
        onMouseDown={this.props.form.reset}
        name="close"
        size="large"
        color="grey"
        link
      />
    </Form>
  );

  public render() {
    return (
      <Modal.Description>
        <FlexWrapper>
          <Icon name="align left" size="large" color="grey" />
          <Label>Description</Label>
        </FlexWrapper>

        {this.editing ? this.renderTextArea() : this.renderText()}
      </Modal.Description>
    );
  }
}

const FlexWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
`;

const DescriptionText = styled(Segment)`
  cursor: pointer;
  box-shadow: none !important;
  &:hover {
    border: 1px solid #85b7d9;
  }
`;

const CancelIcon = styled(Icon)`
  margin-left: 5px !important;
`;

const Label = styled.span`
  margin-left: 5px;
  font-size: 16px;
  font-weight: bolder;
`;

export default Description;
