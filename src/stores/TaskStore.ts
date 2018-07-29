import { uniqueId } from 'lodash';
import { action, observable } from 'mobx';

export interface IAddTaskFormFields {
  addTask: string;
}

export interface ITask {
  id: number;
  title: string;
}

export interface ITaskStore {
  items: ITask[];

  addTask(fields: IAddTaskFormFields): void;
}

class TaskStore implements ITaskStore {
  @observable public items: ITask[] = [];

  @action.bound
  public addTask(fields: IAddTaskFormFields) {
    this.items.push({
      id: Number(uniqueId()),
      title: fields.addTask,
    });
  }
}

export default TaskStore;
