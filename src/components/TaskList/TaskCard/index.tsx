import * as React from 'react';

import { Card } from 'semantic-ui-react';

export interface IProps {
  title: string;
}

const TaskCard = (props: IProps) => (
  <Card
    header={props.title}
    fluid
  />
);

export default TaskCard;
