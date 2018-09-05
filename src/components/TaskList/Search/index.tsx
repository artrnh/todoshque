import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Input } from 'semantic-ui-react';
import { ITaskStore } from '../../../stores/TaskStore';

export interface IProps {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class Search extends React.Component<IProps> {
  public render() {
    return (
      <Input
        onChange={this.searchTasks}
        placeholder='Search...'
        icon='search'
        transparent
      />
    );
  }

  private searchTasks = (e: React.ChangeEvent<HTMLInputElement>): void => this.props.tasks.searchTasks(e.target.value);
}

export default Search;
