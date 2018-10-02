import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Breadcrumb } from 'semantic-ui-react';
const { Divider, Section } = Breadcrumb;
import styled from 'styled-components';

import { ITaskStore } from '../../../stores/TaskStore';

export interface IProps {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class Filters extends React.Component<IProps> {
  public render() {
    return (
      <Breadcrumb size='large'>

        <Filter active={this.isFilterActive('all')} onClick={this.applyFilter('all')}>
          View All
        </Filter>

        <Divider icon='bolt' />

        <Filter active={this.isFilterActive('active')} onClick={this.applyFilter('active')}>
          Active
        </Filter>

        <Divider icon='bolt' />

        <Filter active={this.isFilterActive('completed')} onClick={this.applyFilter('completed')}>
          Completed
        </Filter>

      </Breadcrumb>
    );
  }

  private applyFilter = (filter: string) => (e: React.MouseEvent): void => this.props.tasks.applyFilter(filter);
  private isFilterActive = (filter: string) => this.props.tasks.activeFilter === filter;
}

const Filter = styled(Section)`
  color: ${(props) => props.active && '#000'} !important;
`;

export default Filters;
