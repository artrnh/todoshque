import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

import { ITaskStore } from '../../../stores/TaskStore';
import media from '../../../utils/media';

export interface IProps {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class Search extends React.Component<IProps> {
  public render() {
    return (
      <SearchInput
        onChange={this.searchTasks}
        placeholder='Search...'
        icon='search'
        transparent
      />
    );
  }

  private searchTasks = (e: React.ChangeEvent<HTMLInputElement>): void => this.props.tasks.searchTasks(e.target.value);
}

const SearchInput = styled(Input)`
  ${media.phone`
    width: 100%;
    margin-top: 10px;
  `}
`;

export default Search;
