import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { Breadcrumb } from 'semantic-ui-react';
const { Divider, Section } = Breadcrumb;
import styled from 'styled-components';

import { FilterTypes, ITaskStore } from 'Stores/TaskStore';

export interface IProps {
  tasks?: ITaskStore;
}

@inject('tasks')
@observer
class Filters extends React.Component<IProps> {
  private applyFilter = (filter: string) => (e: React.MouseEvent): void =>
    this.props.tasks.applyFilter(filter);

  private isFilterActive = (filter: string): boolean =>
    this.props.tasks.activeFilter === filter;

  public render() {
    return (
      <Breadcrumb size="large">
        <Filter
          active={this.isFilterActive(FilterTypes.All)}
          onClick={this.applyFilter(FilterTypes.All)}
        >
          View All
        </Filter>

        <Divider icon="bolt" />

        <Filter
          active={this.isFilterActive(FilterTypes.Active)}
          onClick={this.applyFilter(FilterTypes.Active)}
        >
          Active
        </Filter>

        <Divider icon="bolt" />

        <Filter
          active={this.isFilterActive(FilterTypes.Completed)}
          onClick={this.applyFilter(FilterTypes.Completed)}
        >
          Completed
        </Filter>
      </Breadcrumb>
    );
  }
}

const Filter = styled(Section)`
  color: ${props => props.active && '#000'} !important;
`;

export default Filters;
