import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

import { ITaskStore } from 'Stores/TaskStore';
import media from 'Utils/media';

export interface IProps {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class Search extends React.Component<IProps> {
  private searchTasks = (e: React.ChangeEvent<HTMLInputElement>): void =>
    this.props.tasks.searchTasks(e.target.value);

  public render() {
    return (
      <SearchInput
        onChange={this.searchTasks}
        placeholder="Search..."
        icon="search"
        transparent
      />
    );
  }
}

const SearchInput = styled(Input)`
  ${media.phone`
    width: 100%;
    margin-top: 10px;
  `};
`;

export default Search;
