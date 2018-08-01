import { uniqueId } from 'lodash';
import { action, observable } from 'mobx';
import * as moment from 'moment';

export interface IAddTaskFormFields {
  addTask: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}

export interface ITaskStore {
  items: ITask[];

  addTask(fields: IAddTaskFormFields): void;
  deleteTask(id: number): void;
}

class TaskStore implements ITaskStore {
  @observable public items: ITask[] = [];

  @action.bound
  public addTask(fields: IAddTaskFormFields) {
    if (!fields.addTask.trim()) return;

    this.items.push({
      id: Number(uniqueId()),
      title: fields.addTask.trim(),
      description: '',
      createdAt: moment(),
      updatedAt: moment(),
    });
  }

  @action.bound
  public deleteTask(id: number) {
    const deletedTaskIndex = this.items.findIndex((item) => item.id === id);
    this.items.splice(deletedTaskIndex, 1);
  }
}

export default TaskStore;
