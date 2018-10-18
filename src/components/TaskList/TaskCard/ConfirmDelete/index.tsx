import * as React from 'react';

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export interface IProps {
  trigger: React.ReactNode;
  opened: boolean;

  deleteTask(): void;
  toggleConfirm(): void;
}

const ConfirmDelete: React.SFC<IProps> = ({
  trigger,
  deleteTask,
  opened,
  toggleConfirm,
}) => (
  <Modal
    trigger={trigger}
    basic
    size="small"
    open={opened}
    onClose={toggleConfirm}
  >
    <Header icon="trash" content="Are you sure?" />
    <Modal.Content>
      <p>This action cannot be undone.</p>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={toggleConfirm} basic inverted>
        <Icon name="remove" /> Cancel
      </Button>
      <Button onClick={deleteTask} color="red" inverted>
        <Icon name="checkmark" /> Delete
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ConfirmDelete;
