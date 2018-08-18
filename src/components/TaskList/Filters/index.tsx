import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Breadcrumb } from 'semantic-ui-react';
const { Divider, Section } = Breadcrumb;

import { ITaskStore } from '../../../stores/TaskStore';
import styled from '../../../styled';

export interface IProps {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class Filters extends React.Component<IProps> {
  public render() {
    return (
      <Breadcrumbs size='large'>

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

      </Breadcrumbs>
    );
  }

  private applyFilter = (filter: string) => (e): void => this.props.tasks.applyFilter(filter);
  private isFilterActive = (filter: string) => this.props.tasks.activeFilter === filter;
}

const Breadcrumbs = styled(Breadcrumb)`
  margin-bottom: 20px !important;
`;

const Filter = styled(Section)`
  color: ${(props) => props.active && '#000'} !important;
`;

export default Filters;
