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
  completed: boolean;
  completedAt: moment.Moment;
}

export interface ITaskStore {
  items: ITask[];

  addTask(fields: IAddTaskFormFields): void;
  deleteTask(id: number): void;
  completeTask(id: number): void;
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
      completed: false,
      completedAt: null,
    });
  }

  @action.bound
  public deleteTask(id: number) {
    const deletedTaskIndex = this.items.findIndex((task) => task.id === id);
    this.items.splice(deletedTaskIndex, 1);
  }

  @action.bound
  public completeTask(id: number) {
    const selectedTask = this.items.find((task) => task.id === id);
    selectedTask.completed = !selectedTask.completed;
    selectedTask.completedAt = moment();
  }
}

export default TaskStore;
